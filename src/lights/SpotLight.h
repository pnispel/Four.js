
#ifndef SPOTLIGHT_H
#define SPOTLIGHT_H

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

#include "Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class SpotLight : public Light {


public:

public: 
	SpotLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 19 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 