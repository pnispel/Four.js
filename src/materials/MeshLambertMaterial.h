
#ifndef MESHLAMBERTMATERIAL_H
#define MESHLAMBERTMATERIAL_H

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

class MeshLambertMaterial {


public:

public: 
	MeshLambertMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 32 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 