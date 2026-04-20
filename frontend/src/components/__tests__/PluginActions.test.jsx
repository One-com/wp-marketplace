import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PluginActions from '../PluginActions';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';
import { makeFreePlugin, makeInstalledPlugin, makeActivatedPlugin, makePremiumPlugin } from '../../__test-utils__/fixtures/plugins';

// Mock the context hook
jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

// Mock tracking and helpers — they have side effects
jest.mock( '../../utils/mixpanelTracking' );
jest.mock( '../../utils/redirectUrlHelper', () => ( {
	getPluginRedirectUrl: jest.fn().mockReturnValue( 'admin.php?page=test' ),
	navigateToPluginUrl: jest.fn(),
} ) );
jest.mock( '../../utils/pollingHelper', () => ( {
	startPolling: jest.fn().mockReturnValue( jest.fn() ),
} ) );

const renderWithContext = ( plugin, contextOverrides = {} ) => {
	useMarketplace.mockReturnValue( {
		...defaultContextValues,
		...contextOverrides,
	} );
	return render( <PluginActions plugin={ plugin } /> );
};

describe( 'PluginActions', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders Install button for uninstalled free plugin', () => {
		renderWithContext( makeFreePlugin() );
		expect( screen.getByRole( 'button', { name: /install/i } ) ).toBeInTheDocument();
	} );

	it( 'renders Activate button for installed but not activated plugin', () => {
		renderWithContext( makeInstalledPlugin() );
		expect( screen.getByRole( 'button', { name: /activate/i } ) ).toBeInTheDocument();
	} );

	it( 'renders Manage button for installed and activated plugin', () => {
		renderWithContext( makeActivatedPlugin() );
		expect( screen.getByRole( 'button', { name: /manage/i } ) ).toBeInTheDocument();
	} );

	it( 'renders Buy now button for premium plugin on non-onecom brand', () => {
		renderWithContext(
			makePremiumPlugin( { installed: false } ),
			{ isOnecomBrand: false }
		);
		expect( screen.getByRole( 'button', { name: /buy now/i } ) ).toBeInTheDocument();
	} );

	it( 'disables button during pluginInAction', () => {
		const plugin = makeInstalledPlugin();
		renderWithContext( plugin, {
			pluginInAction: { [ plugin.slug ]: true },
			uiI18n: { notifications: { activating: 'Activating {0}' } },
		} );
		const btn = screen.getByRole( 'button' );
		expect( btn ).toBeDisabled();
		expect( btn ).toHaveTextContent( /activating/i );
	} );

	it( 'calls handlePluginAction on install click', () => {
		const handlePluginAction = jest.fn();
		const plugin = makeFreePlugin();
		renderWithContext( plugin, { handlePluginAction } );

		fireEvent.click( screen.getByRole( 'button', { name: /install/i } ) );
		expect( handlePluginAction ).toHaveBeenCalledWith( 'install', plugin, 'product_detail' );
	} );

	it( 'calls handlePluginAction on activate click', () => {
		const handlePluginAction = jest.fn();
		const plugin = makeInstalledPlugin();
		renderWithContext( plugin, { handlePluginAction } );

		fireEvent.click( screen.getByRole( 'button', { name: /activate/i } ) );
		expect( handlePluginAction ).toHaveBeenCalledWith( 'activate', plugin, 'product_detail' );
	} );

	it( 'shows pending procurement message when pendingProcurements has entry', () => {
		const plugin = makePremiumPlugin( { installed: false } );
		renderWithContext( plugin, {
			isOnecomBrand: false,
			pendingProcurements: { [ plugin.slug ]: { subscriptionId: 'sub-1', timestamp: 123 } },
		} );
		expect( screen.getByText( /purchase is being processed/i ) ).toBeInTheDocument();
	} );

	it( 'renders Install button with secondary class for rank-math', () => {
		const plugin = makeFreePlugin( { slug: 'seo-by-rank-math' } );
		renderWithContext( plugin );
		const btn = screen.getByRole( 'button', { name: /install/i } );
		expect( btn.className ).toContain( 'gv-button-secondary' );
	} );

	it( 'renders Install button with primary class for non-rank-math', () => {
		const plugin = makeFreePlugin( { slug: 'some-plugin' } );
		renderWithContext( plugin );
		const btn = screen.getByRole( 'button', { name: /install/i } );
		expect( btn.className ).toContain( 'gv-button-primary' );
	} );
} );
