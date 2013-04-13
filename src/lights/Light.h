
#ifndef LIGHT_H
#define LIGHT_H

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

#include "../core/Object3D.h"

class Color;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Light : public Object3D {


public:

	Color * color;

public: 
	Light ( unsigned int hex );

	virtual bool instanceOf ( int type ) {

		if ( type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 