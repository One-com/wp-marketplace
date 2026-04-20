import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingOverlay from '../LoadingOverlay';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';

jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

describe( 'LoadingOverlay', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders nothing when loadingAction is empty', () => {
		useMarketplace.mockReturnValue( {
			...defaultContextValues,
			loadingAction: '',
		} );
		const { container } = render( <LoadingOverlay /> );
		expect( container.innerHTML ).toBe( '' );
	} );

	it( 'renders overlay with loading message when loadingAction is set', () => {
		useMarketplace.mockReturnValue( {
			...defaultContextValues,
			loadingAction: 'Installing Yoast SEO...',
		} );
		render( <LoadingOverlay /> );
		expect( screen.getByText( 'Installing Yoast SEO...' ) ).toBeInTheDocument();
	} );
} );
