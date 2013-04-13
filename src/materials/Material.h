
#ifndef MATERIAL_H
#define MATERIAL_H

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

#include "../core/EventDispatcher.h"
#include "../core/Group.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Material : public EventDispatcher{


public:
	int id;
	char * name;

	int side;
	double opacity;
	bool transparent;

	int blending;

	int blendSrc;
	int blendDst;
	int blendEquation;

	bool depthTest;
	bool depthWrite;

	bool polygonOffset;
	double polygonOffsetFactor;
	double polygonOffsetUnits;

	double alphaTest;

	bool overdraw;

	bool visible;
	bool needsUpdate;

	//FOR MESH FACE
	Group< Material * > materials;

public: 
	Material();

	Material * clone () { return this;}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
