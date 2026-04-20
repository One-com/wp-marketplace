import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '../DeleteModal';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';
import { makeInstalledPlugin } from '../../__test-utils__/fixtures/plugins';
import { mockUiI18n } from '../../__test-utils__/fixtures/uiI18n';

jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

const openModal = ( plugin, extraContext = {} ) => {
	useMarketplace.mockReturnValue( {
		...defaultContextValues,
		deleteModalState: { isOpen: true, plugin },
		closeDeleteModal: jest.fn(),
		handlePluginAction: jest.fn(),
		uiI18n: mockUiI18n,
		...extraContext,
	} );
	return render( <DeleteModal /> );
};

describe( 'DeleteModal', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders nothing when modal is closed', () => {
		useMarketplace.mockReturnValue( {
			...defaultContextValues,
			deleteModalState: { isOpen: false, plugin: null },
		} );
		const { baseElement } = render( <DeleteModal /> );
		expect( baseElement.querySelector( '.gv-modal' ) ).not.toBeInTheDocument();
	} );

	it( 'renders modal dialog when open', () => {
		const plugin = makeInstalledPlugin();
		openModal( plugin );
		expect( screen.getByRole( 'dialog' ) ).toBeInTheDocument();
	} );

	it( 'renders Cancel and Delete buttons', () => {
		const plugin = makeInstalledPlugin();
		openModal( plugin );
		expect( screen.getByText( 'Cancel' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Delete' ) ).toBeInTheDocument();
	} );

	it( 'calls closeDeleteModal when cancel is clicked', () => {
		const closeDeleteModal = jest.fn();
		const plugin = makeInstalledPlugin();
		openModal( plugin, { closeDeleteModal } );

		fireEvent.click( screen.getByText( 'Cancel' ) );
		expect( closeDeleteModal ).toHaveBeenCalled();
	} );

	it( 'calls handlePluginAction with delete and closes modal on confirm', () => {
		const closeDeleteModal = jest.fn();
		const handlePluginAction = jest.fn();
		const plugin = makeInstalledPlugin();
		openModal( plugin, { closeDeleteModal, handlePluginAction } );

		fireEvent.click( screen.getByText( 'Delete' ) );
		expect( handlePluginAction ).toHaveBeenCalledWith( 'delete', plugin, 'addons' );
		expect( closeDeleteModal ).toHaveBeenCalled();
	} );

	it( 'closes modal on Escape key', () => {
		const closeDeleteModal = jest.fn();
		const plugin = makeInstalledPlugin();
		openModal( plugin, { closeDeleteModal } );

		fireEvent.keyDown( document, { key: 'Escape' } );
		expect( closeDeleteModal ).toHaveBeenCalled();
	} );

	it( 'has a close button in the modal', () => {
		const plugin = makeInstalledPlugin();
		openModal( plugin );
		const closeBtn = screen.getByLabelText( 'Close' );
		expect( closeBtn ).toBeInTheDocument();
	} );
} );
