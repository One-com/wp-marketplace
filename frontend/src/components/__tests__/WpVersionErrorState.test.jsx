import React from 'react';
import { render, screen } from '@testing-library/react';
import WpVersionErrorState from '../WpVersionErrorState';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';

jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

describe( 'WpVersionErrorState', () => {
	beforeEach( () => {
		jest.clearAllMocks();
		useMarketplace.mockReturnValue( defaultContextValues );
	} );

	it( 'renders heading and message', () => {
		const { container } = render( <WpVersionErrorState /> );
		expect( container.querySelector( 'h5' ) ).toBeInTheDocument();
		expect( container.querySelector( 'p' ) ).toBeInTheDocument();
	} );

	it( 'renders an update button', () => {
		render( <WpVersionErrorState /> );
		// Renders a button (not a link) — content comes from uiI18n
		expect( screen.getByRole( 'button' ) ).toBeInTheDocument();
	} );
} );
