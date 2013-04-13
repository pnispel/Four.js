
#ifndef PROJECTOR_H
#define PROJECTOR_H

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
// ***        P R O J E C T O R
// --------------------------------------------------------------------

class Projector {


public:

public: 
	Projector () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 11 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 