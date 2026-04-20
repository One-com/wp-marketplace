import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetail from '../ProductDetail';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';
import { makeFreePlugin, makePremiumPlugin } from '../../__test-utils__/fixtures/plugins';

// Mock the context hook
jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

// Mock child components that have their own context dependencies
jest.mock( '../PluginActions', () => {
	return function MockPluginActions() {
		return <div data-testid="plugin-actions">PluginActions</div>;
	};
} );
jest.mock( '../SuccessNotice', () => {
	return function MockSuccessNotice() {
		return null;
	};
} );
jest.mock( '../ErrorToast', () => {
	return function MockErrorToast() {
		return null;
	};
} );
jest.mock( '../Breadcrumbs', () => {
	return function MockBreadcrumbs( { children } ) {
		return <nav data-testid="breadcrumbs">{ children }</nav>;
	};
} );
jest.mock( '../../utils/mixpanelTracking' );

const renderProductDetail = ( pluginOverrides = {}, contextOverrides = {} ) => {
	useMarketplace.mockReturnValue( {
		...defaultContextValues,
		...contextOverrides,
	} );
	const plugin = makeFreePlugin( {
		name: 'Test Plugin',
		slug: 'test-plugin',
		description: 'A great plugin for testing.',
		i18n: {
			subtitle: 'Plugin subtitle',
			description: 'i18n description override',
			// keyFeatureContent is required — metadata rows only render inside keyFeatures block
			keyFeatureContent1: 'Default feature',
		},
		...pluginOverrides,
	} );
	return render(
		<ProductDetail
			plugin={ plugin }
			onClose={ jest.fn() }
			usePortal={ false }
			loading={ false }
		/>
	);
};

describe( 'ProductDetail', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders skeleton when loading is true', () => {
		useMarketplace.mockReturnValue( defaultContextValues );
		const { container } = render(
			<ProductDetail
				plugin={ null }
				onClose={ jest.fn() }
				usePortal={ false }
				loading={ true }
			/>
		);
		expect( container.querySelectorAll( '.gv-skeleton' ).length ).toBeGreaterThan( 0 );
	} );

	it( 'returns null when plugin is null and not loading', () => {
		useMarketplace.mockReturnValue( defaultContextValues );
		const { container } = render(
			<ProductDetail
				plugin={ null }
				onClose={ jest.fn() }
				usePortal={ false }
				loading={ false }
			/>
		);
		expect( container.innerHTML ).toBe( '' );
	} );

	it( 'renders plugin title', () => {
		renderProductDetail();
		const headings = screen.getAllByText( 'Test Plugin' );
		expect( headings.length ).toBeGreaterThanOrEqual( 1 );
	} );

	it( 'renders plugin description from i18n', () => {
		renderProductDetail();
		expect( screen.getByText( 'i18n description override' ) ).toBeInTheDocument();
	} );

	it( 'renders PluginActions component', () => {
		renderProductDetail();
		expect( screen.getByTestId( 'plugin-actions' ) ).toBeInTheDocument();
	} );

	it( 'renders version row when plugin has version', () => {
		renderProductDetail( { version: '3.2.1' } );
		expect( screen.getByText( '3.2.1' ) ).toBeInTheDocument();
	} );

	it( 'does not render version row when version is empty', () => {
		renderProductDetail( { version: '' } );
		expect( screen.queryByText( /^Version:/ ) ).not.toBeInTheDocument();
	} );

	it( 'renders tested up to row', () => {
		renderProductDetail( { testedUpTo: '6.7' } );
		expect( screen.getByText( '6.7' ) ).toBeInTheDocument();
	} );

	it( 'renders PHP version row', () => {
		renderProductDetail( { requiresPhpVersion: '7.4' } );
		expect( screen.getByText( /7\.4/ ) ).toBeInTheDocument();
	} );

	it( 'renders WordPress version row', () => {
		renderProductDetail( { requiresWpVersion: '5.8' } );
		expect( screen.getByText( /5\.8/ ) ).toBeInTheDocument();
	} );

	it( 'renders rating row with converted score', () => {
		renderProductDetail( { rating: 80, ratingCount: 200 } );
		// 80/20 = 4.0
		expect( screen.getByText( /4\.0\/5/ ) ).toBeInTheDocument();
		expect( screen.getByText( /\(200\)/ ) ).toBeInTheDocument();
	} );

	it( 'does not render rating row when rating is null', () => {
		renderProductDetail( { rating: null } );
		expect( screen.queryByText( 'Rating' ) ).not.toBeInTheDocument();
	} );

	it( 'renders active installs row', () => {
		renderProductDetail( { activeInstalls: 500000 } );
		expect( screen.getByText( /500,000\+/ ) ).toBeInTheDocument();
	} );

	it( 'renders last updated row', () => {
		renderProductDetail( { pluginLastUpdated: '2026-03-15T10:30:00.000Z' } );
		// Should show relative time like "X weeks ago"
		expect( screen.getByText( /ago/ ) ).toBeInTheDocument();
	} );

	it( 'renders key features from i18n', () => {
		renderProductDetail( {
			i18n: {
				subtitle: 'Sub',
				description: 'Desc',
				keyFeatureContent1: 'Feature one',
				keyFeatureContent2: 'Feature two',
			},
		} );
		expect( screen.getByText( 'Feature one' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Feature two' ) ).toBeInTheDocument();
	} );

	it( 'renders benefits from i18n', () => {
		renderProductDetail( {
			i18n: {
				subtitle: 'Sub',
				description: 'Desc',
				keyBenefitContent1: 'Benefit one',
				keyBenefitContent2: 'Benefit two',
			},
		} );
		expect( screen.getByText( 'Benefit one' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Benefit two' ) ).toBeInTheDocument();
	} );

	it( 'renders core features from i18n', () => {
		renderProductDetail( {
			i18n: {
				subtitle: 'Sub',
				description: 'Desc',
				coreFeatureTitle1: 'Core Title',
				coreFeatureContent1: 'Core Desc',
			},
		} );
		expect( screen.getByText( 'Core Title' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Core Desc' ) ).toBeInTheDocument();
	} );

	it( 'shows "Free" price for free plugin', () => {
		renderProductDetail( { licenseType: 'free' }, {
			uiI18n: { labels: { free: 'Free' } },
		} );
		expect( screen.getByText( 'Free' ) ).toBeInTheDocument();
	} );
} );
