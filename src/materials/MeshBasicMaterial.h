
#ifndef MESHBASICMATERIAL_H
#define MESHBASICMATERIAL_H

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

#include "Material.h"

class Color;
class Texture;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshBasicMaterial : public Material {

public:

	Color * color;
	Texture * map;
	//lightMap = null;

	//specularMap = null;

	//envMap = null;
	int combine;
	int reflectivity;
	double refractionRatio;

	bool fog;

	int shading;

	bool wireframe;
	int wireframeLinewidth;
	//wireframeLinecap = 'round';
	//wireframeLinejoin = 'round';

	int vertexColors;

	bool skinning;
	bool morphTargets;

public: 
	MeshBasicMaterial ();

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 29 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
