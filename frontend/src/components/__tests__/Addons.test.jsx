import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Addons from '../Addons';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';
import { makeActivatedPlugin, makeInstalledPlugin, makeFreePlugin } from '../../__test-utils__/fixtures/plugins';

// Mock the context hook
jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

// Mock child components and side-effect imports
jest.mock( '../ProductDetail', () => {
	return function MockProductDetail() {
		return <div data-testid="product-detail">ProductDetail</div>;
	};
} );
jest.mock( '../ProductDetailRankMath', () => {
	return function MockProductDetailRankMath() {
		return <div data-testid="product-detail-rank-math">ProductDetailRankMath</div>;
	};
} );
jest.mock( '../ErrorToast', () => {
	return function MockErrorToast() {
		return null;
	};
} );
jest.mock( '../SuccessToast', () => {
	return function MockSuccessToast() {
		return null;
	};
} );
jest.mock( '../ErrorState', () => {
	return function MockErrorState() {
		return <div data-testid="error-state">ErrorState</div>;
	};
} );
jest.mock( '../WpVersionErrorState', () => {
	return function MockWpVersionErrorState() {
		return <div data-testid="wp-version-error">WpVersionErrorState</div>;
	};
} );
jest.mock( '../../utils/mixpanelTracking' );
jest.mock( '../../utils/redirectUrlHelper', () => ( {
	getPluginRedirectUrl: jest.fn().mockReturnValue( '' ),
	navigateToPluginUrl: jest.fn(),
} ) );
jest.mock( '../../utils/pollingHelper', () => ( {
	startPolling: jest.fn().mockReturnValue( jest.fn() ),
} ) );

beforeEach( () => {
	// Addons calls fetch() on mount to load the catalog
	global.fetch = jest.fn().mockResolvedValue( {
		ok: true,
		json: () => Promise.resolve( {
			success: true,
			data: { catalog: [], uiI18n: {}, locale: 'en_GB' },
		} ),
	} );
} );

afterEach( () => {
	delete global.fetch;
} );

const renderAddons = async ( contextOverrides = {} ) => {
	useMarketplace.mockReturnValue( {
		...defaultContextValues,
		catalogLoading: false,
		catalogError: false,
		isWpVersionSupported: jest.fn().mockReturnValue( true ),
		shouldShowPlugin: jest.fn().mockReturnValue( true ),
		shouldShowProvision: jest.fn().mockReturnValue( false ),
		isSpecialPlugin: jest.fn().mockReturnValue( false ),
		...contextOverrides,
	} );
	let result;
	await act( async () => {
		result = render( <Addons /> );
	} );
	return result;
};

describe( 'Addons', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders loading skeletons when catalogLoading is true', async () => {
		const { container } = await renderAddons( { catalogLoading: true } );
		expect( container.querySelectorAll( '.gv-skeleton' ).length ).toBeGreaterThan( 0 );
	} );

	it( 'renders error state when catalogError is true', async () => {
		await renderAddons( { catalogError: true } );
		expect( screen.getByTestId( 'error-state' ) ).toBeInTheDocument();
	} );

	it( 'renders WP version error when version is not supported', async () => {
		await renderAddons( {
			isWpVersionSupported: jest.fn().mockReturnValue( false ),
		} );
		expect( screen.getByTestId( 'wp-version-error' ) ).toBeInTheDocument();
	} );

	it( 'renders installed plugins in the table', async () => {
		const plugins = [
			makeActivatedPlugin( { name: 'Active Plugin', slug: 'active-plugin' } ),
			makeInstalledPlugin( { name: 'Installed Plugin', slug: 'installed-plugin' } ),
		];
		await renderAddons( { plugins } );
		// The source uses class= (not className) for the indicator span — expect the DOM warning
		expect( console ).toHaveErrored();
		expect( screen.getByText( 'Active Plugin' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Installed Plugin' ) ).toBeInTheDocument();
	} );

	it( 'does not render uninstalled plugins in the table', async () => {
		const plugins = [
			makeActivatedPlugin( { name: 'Active One', slug: 'active-one' } ),
			makeInstalledPlugin( { name: 'Installed Two', slug: 'installed-two' } ),
			makeFreePlugin( { name: 'Not Installed', slug: 'not-installed', installed: false } ),
		];
		await renderAddons( { plugins } );
		expect( screen.getByText( 'Active One' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Installed Two' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Not Installed' ) ).not.toBeInTheDocument();
	} );

	it( 'renders empty state when no plugins are installed', async () => {
		await renderAddons( { plugins: [] } );
		// Should not crash — renders container with no table rows
		expect( screen.queryByRole( 'table' ) ).not.toBeInTheDocument();
	} );
} );
