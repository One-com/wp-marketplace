import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from '../ErrorState';
import { useMarketplace } from '../../context/MarketplaceContext';
import { defaultContextValues } from '../../__test-utils__/renderWithProviders';

jest.mock( '../../context/MarketplaceContext', () => ( {
	...jest.requireActual( '../../context/MarketplaceContext' ),
	useMarketplace: jest.fn(),
} ) );

describe( 'ErrorState', () => {
	beforeEach( () => {
		jest.clearAllMocks();
		useMarketplace.mockReturnValue( defaultContextValues );
	} );

	it( 'renders error content with heading and message', () => {
		const { container } = render( <ErrorState /> );
		// react-i18next warns about missing instance on first use
		expect( console ).toHaveWarned();
		expect( container.querySelector( 'h5' ) ).toBeInTheDocument();
		expect( container.querySelector( 'p' ) ).toBeInTheDocument();
	} );

	it( 'renders a refresh button', () => {
		render( <ErrorState /> );
		expect( screen.getByRole( 'button' ) ).toBeInTheDocument();
	} );

	it( 'calls window.location.reload on button click', () => {
		const originalLocation = window.location;
		delete window.location;
		window.location = { reload: jest.fn() };

		render( <ErrorState /> );
		fireEvent.click( screen.getByRole( 'button' ) );
		expect( window.location.reload ).toHaveBeenCalled();

		window.location = originalLocation;
	} );
} );
