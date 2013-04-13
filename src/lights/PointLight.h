
#ifndef POINTLIGHT_H
#define POINTLIGHT_H

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

class PointLight : public Light {

public:
	double intensity;
	double distance;

public: 
	PointLight ( unsigned int hex, double intensity, double distance ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 18 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
