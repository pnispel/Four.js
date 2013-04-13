
#ifndef FACE3_H
#define FACE3_H

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

#include "Group.h"

class Vector3;
class Color;

// ----------------------------------------------------------------------------
// **       F A C E 
// ----------------------------------------------------------------------------

class Face {

public: 
	int a;
	int b;
	int c;
	int d;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;

public:
	Face() {};

	Face * clone () { return this;}

	virtual bool instanceOf ( int type ) {
		return true;
	}

};


/********************************************************************
***         F A C E 3
********************************************************************/

class Face3 : public Face {

public:
	int a;
	int b;
	int c;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;


public: 
	Face3 ();
	Face3 ( int ma, int mb, int mc );
	Face3 ( int ma, int mb, int mc, Vector3 * mnormal, Color * mcolor, int mmaterialIndex );
	Face3 ( int ma, int mb, int mc, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex );

	Face3 * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 7 ) { return true; }
		return false;

	}

};

#endif 


#ifndef FACE4_H
#define FACE4_H

/********************************************************************
***         F A C E 4 
********************************************************************/

class Face4 : public Face {

public:
	int a;
	int b;
	int c;
	int d;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;

public: 
    Face4 ();
    Face4 ( int ma, int mb, int mc, int md );
	Face4 ( int ma, int mb, int mc, int md, Vector3 * mnormal, Color * mcolor, int mmaterialIndex );
	Face4 ( int ma, int mb, int mc, int md, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex );

	Face4 * clone ();

    virtual bool instanceOf ( int type ) {

		if ( type == 8 ) { return true; }
		return false;

	}

};

/********************************************************************
***         E N D    O F    C L A S S
********************************************************************/
#endif 
