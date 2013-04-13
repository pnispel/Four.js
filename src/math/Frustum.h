#ifndef FRUSTUM_H
#define FRUSTUM_H

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

class Plane;
class Object3D;
class Sphere;
class Vector3;
class Matrix4;

class Frustum {

public:
	Plane * planes[6];
	

public:
	Frustum();
	Frustum( Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 );

	Frustum * set(  Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 );

	Frustum * copy ( Frustum * other );

	Frustum * setFromMatrix ( Matrix4 * m );

	bool intersectsObject ( Object3D * object );
	bool intersectsSphere ( Sphere * sphere );
	bool containsPoint ( Vector3 * point );

	Frustum * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 42 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 