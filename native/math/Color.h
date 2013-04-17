
#ifndef COLOR_H
#define COLOR_H

/*
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// --
// -- File Name: SMOKE.Matrix.cpp
// --
// -- Author: Paul Nispel
// --
// -- Creation Date: 2/24/2013
// --
// -- Description: Contains Matrix3 and Matrix4 source files
// --
// ----------------------------------------------------------------------------
// --
// -- Copyright Paul Nispel 2013
// --
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
*/

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Color {


public:
	double r;
	double g;
	double b;

public: 
	Color ();

	Color ( double mr, double mg, double mb );

	Color * set ( unsigned int hex );

	Color * setRGB ( double ir, double ig, double ib );

	Color * copy ( Color * color );

	Color * copyGammaToLinear ( Color * color );

	Color * convertGammaToLinear ();

	Color * convertLinearToGamma ();

	Color * add ( Color * color );

	Color * addColors ( Color * c1, Color * c2 );

	Color * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 41 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
