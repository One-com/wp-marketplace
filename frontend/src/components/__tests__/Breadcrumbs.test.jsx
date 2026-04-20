import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../Breadcrumbs';

describe( 'Breadcrumbs', () => {
	const defaultProps = {
		iconBase: 'https://example.com/icons/',
		label: 'Back',
		onClose: jest.fn(),
	};

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders the back button with label', () => {
		render( <Breadcrumbs { ...defaultProps } /> );
		expect( screen.getByText( 'Back' ) ).toBeInTheDocument();
	} );

	it( 'renders back arrow icon', () => {
		render( <Breadcrumbs { ...defaultProps } /> );
		const img = screen.getByAltText( 'Back' );
		expect( img ).toBeInTheDocument();
		expect( img.getAttribute( 'src' ) ).toContain( 'arrow_back' );
	} );

	it( 'renders children', () => {
		render(
			<Breadcrumbs { ...defaultProps }>
				<span data-testid="child">Child content</span>
			</Breadcrumbs>
		);
		expect( screen.getByTestId( 'child' ) ).toBeInTheDocument();
	} );

	it( 'renders navigation landmark', () => {
		render( <Breadcrumbs { ...defaultProps } /> );
		expect( screen.getByRole( 'navigation' ) ).toBeInTheDocument();
	} );

	it( 'has a clickable back element', () => {
		render( <Breadcrumbs { ...defaultProps } /> );
		const backBtn = screen.getByRole( 'button', { name: /go back/i } );
		expect( backBtn ).toBeInTheDocument();
		expect( backBtn.getAttribute( 'href' ) ).toBe( '#' );
	} );
} );
