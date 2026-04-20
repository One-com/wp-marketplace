import { normalizePlugins } from '../normalised-plugins';

describe( 'normalizePlugins', () => {
	it( 'returns empty fallback for null input', () => {
		expect( normalizePlugins( null ) ).toEqual( {
			plugins: [],
			uiI18n: {},
			locale: null,
		} );
		expect( console ).toHaveErrored();
	} );

	it( 'returns empty fallback for undefined input', () => {
		expect( normalizePlugins( undefined ) ).toEqual( {
			plugins: [],
			uiI18n: {},
			locale: null,
		} );
		expect( console ).toHaveErrored();
	} );

	it( 'returns empty fallback when data.catalog is missing', () => {
		expect( normalizePlugins( { data: {} } ) ).toEqual( {
			plugins: [],
			uiI18n: {},
			locale: null,
		} );
		expect( console ).toHaveErrored();
	} );

	it( 'returns empty plugins for empty catalog', () => {
		const result = normalizePlugins( {
			data: { catalog: [], uiI18n: { labels: {} }, locale: 'en_GB' },
		} );
		expect( result.plugins ).toEqual( [] );
		expect( result.locale ).toBe( 'en_GB' );
	} );

	it( 'normalizes a single plugin with all fields', () => {
		const raw = {
			data: {
				catalog: [ {
					name: 'Test Plugin',
					slug: 'test-plugin',
					thumbnail: 'icon.png',
					description: 'A test plugin.',
					download: 'https://example.com/test.zip',
					author: 'Author',
					licenseType: 'free',
					installed: true,
					activated: false,
					i18n: {},
				} ],
				uiI18n: {},
				locale: 'en_GB',
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins ).toHaveLength( 1 );
		expect( plugins[ 0 ].name ).toBe( 'Test Plugin' );
		expect( plugins[ 0 ].slug ).toBe( 'test-plugin' );
		expect( plugins[ 0 ].installed ).toBe( true );
		expect( plugins[ 0 ].activated ).toBe( false );
	} );

	it( 'prefers i18n.description over description field', () => {
		const raw = {
			data: {
				catalog: [ {
					slug: 'test',
					description: 'fallback desc',
					i18n: { description: 'i18n desc' },
				} ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].description ).toBe( 'i18n desc' );
	} );

	it( 'handles description as an object with en-gb key', () => {
		const raw = {
			data: {
				catalog: [ {
					slug: 'test',
					description: { 'en-gb': 'English desc', 'da-dk': 'Dansk' },
				} ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].description ).toBe( 'English desc' );
	} );

	it( 'normalizes author from object to string', () => {
		const raw = {
			data: {
				catalog: [ {
					slug: 'test',
					author: { name: 'John', url: 'https://john.com' },
				} ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].author ).toBe( 'John' );
		expect( plugins[ 0 ].authorUrl ).toBe( 'https://john.com' );
	} );

	it( 'normalizes author from string', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test', author: 'Jane' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].author ).toBe( 'Jane' );
		expect( plugins[ 0 ].authorUrl ).toBe( '' );
	} );

	it( 'handles price as object with amount and currency', () => {
		const raw = {
			data: {
				catalog: [ {
					slug: 'test',
					price: { amount: 9.99, currency: 'EUR' },
				} ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].priceAmount ).toBe( 9.99 );
		expect( plugins[ 0 ].priceCurrency ).toBe( 'EUR' );
	} );

	it( 'normalizes licenseType from snake_case', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test', license_type: 'premium' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].licenseType ).toBe( 'premium' );
	} );

	it( 'normalizes licenseType from camelCase', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test', licenseType: 'free' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].licenseType ).toBe( 'free' );
	} );

	it( 'deduplicates plugins by slug', () => {
		const raw = {
			data: {
				catalog: [
					{ slug: 'dupe', name: 'First' },
					{ slug: 'dupe', name: 'Second' },
					{ slug: 'unique', name: 'Unique' },
				],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins ).toHaveLength( 2 );
		expect( plugins[ 0 ].name ).toBe( 'First' );
		expect( plugins[ 1 ].name ).toBe( 'Unique' );
	} );

	it( 'defaults installed and activated to false', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].installed ).toBe( false );
		expect( plugins[ 0 ].activated ).toBe( false );
	} );

	it( 'passes through uiI18n and locale', () => {
		const uiI18n = { labels: { free: 'Gratis' } };
		const raw = {
			data: { catalog: [], uiI18n, locale: 'da_DK' },
		};
		const result = normalizePlugins( raw );
		expect( result.uiI18n ).toEqual( uiI18n );
		expect( result.locale ).toBe( 'da_DK' );
	} );

	it( 'normalizes download from alternative keys', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test', downloadUrl: 'https://example.com/dl.zip' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].download ).toBe( 'https://example.com/dl.zip' );
	} );

	it( 'includes new API keys with defaults', () => {
		const raw = {
			data: {
				catalog: [ { slug: 'test' } ],
				uiI18n: {},
			},
		};
		const { plugins } = normalizePlugins( raw );
		expect( plugins[ 0 ].version ).toBe( '' );
		expect( plugins[ 0 ].rating ).toBeNull();
		expect( plugins[ 0 ].ratingCount ).toBeNull();
		expect( plugins[ 0 ].activeInstalls ).toBeNull();
		expect( plugins[ 0 ].requiresDomain ).toBe( false );
		expect( plugins[ 0 ].requiresWpVersion ).toBe( '' );
		expect( plugins[ 0 ].requiresPhpVersion ).toBe( '' );
		expect( plugins[ 0 ].testedUpTo ).toBe( '' );
		expect( plugins[ 0 ].pluginLastUpdated ).toBeNull();
		expect( plugins[ 0 ].hasSubscription ).toBe( false );
		expect( plugins[ 0 ].subscriptions ).toEqual( [] );
	} );
} );
