
#ifndef TRIANGLE_H
#define TRIANGLE_H

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
// ***        T R I A N G L E
// --------------------------------------------------------------------

class Triangle {


public:

public: 
	Triangle () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 51 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
