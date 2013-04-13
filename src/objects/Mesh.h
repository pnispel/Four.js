
#ifndef MESH_H
#define MESH_H

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

class Geometry;
class Material;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Mesh : public Object3D {


public:

public: 
	Mesh ( Geometry * geometry );
	Mesh ( Geometry * geometry, Material * material );

	//FIXME:
	//void updateMorphTargets ();

	//FIXME:
	//getMorphTargetIndexByName

	virtual bool instanceOf ( int type ) {

        if ( type == 60 || type == 10 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
