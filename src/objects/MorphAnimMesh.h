
#ifndef MORPHANIMMESH_H
#define MORPHANIMMESH_H

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

class MorphAnimMesh {


public:

public: 
	MorphAnimMesh () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 61 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
