
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

#ifndef BOX2_H
#define BOX2_H

class Vector2;

// --------------------------------------------------------------------
// ***         B O X 2 
// --------------------------------------------------------------------

class Box2 {


public:
	Vector2 * min;
	Vector2 * max;

public: 
	Box2 () {


	}
	Box2 ( Vector2 * minVec, Vector2 * maxVec ) {}

	/*
	Box2 * set ( Vector2 * minVec, Vector2 * maxVec );
	Box2 * setFromPoints ( void ** points );
	//Box2 * setFromPoints ( const double * points );
	Box2 * setFromCenterAndSize ( Vector2 * center, double size );
	Box2 * copy ( Box2 * other );
	Box2 * makeEmpty ();
	bool empty ();
	Vector2 * center( Vector2 * target );
	Vector2 * size ( Vector2 * target );

	Box2 * expandByPoint ( Vector2 * point );
	Box2 * expandByVector ( Vector2 * vector );
	Box2 * expandByScalar ( double scalar );

	bool containsPoint ( Vector2 * point );
	bool containsBox ( Box2 * box );

	Vector2 * getParameter ( Vector2 * point );

	bool isIntersectionBox ( Box2 * box );
	Vector2 * clampPoint ( Vector2 * point, Vector2 * optionalTarget );

	double distanceToPoint ( Vector2 * point );
	Box2 * intersect ( Box2 * box );
	Box2 * union ( Box2 * box );
	Box2 * translate ( Vector2 * offset );

	bool equals ( Box2 * box );

	Box2 * clone ();
	*/

	virtual bool instanceOf ( int type ) {

		if ( type == 39 ) { return true; }
		return false;

	}

};

#endif 


#ifndef SMOKE_BOX3_H
#define SMOKE_BOX3_H

class Vector3;
class Matrix4;
class Sphere;

// --------------------------------------------------------------------
// ***         B O X 3 
// --------------------------------------------------------------------

class Box3 {

public:
	Vector3 * min;
	Vector3 * max;

public: 
    Box3();
    Box3( Vector3 * minVec, Vector3 * maxVec );

    Box3 * set ( Vector3 * minVec, Vector3 * maxVec );
	Box3 * setFromPoints ( void ** points );
	//Box2 * setFromPoints ( const double * points );
	Box3 * setFromCenterAndSize ( Vector3 * center, Vector3 * size );
	Box3 * copy ( Box3 * other );
	Box3 * makeEmpty ();
	bool empty ();
	Vector3 * center( Vector3 * target );
	Vector3 * size ( Vector3 * target );

	Box3 * expandByPoint ( Vector3 * point );
	Box3 * expandByVector ( Vector3 * vector );
	Box3 * expandByScalar ( double scalar );

	bool containsPoint ( Vector3 * point );
	bool containsBox ( Box3 * box );

	Vector3 * getParameter ( Vector3 * point );

	bool isIntersectionBox ( Box3 * box );
	Vector3 * clampPoint ( Vector3 * point, Vector3 * optionalTarget );

	double distanceToPoint ( Vector3 * point );
	Box3 * intersect ( Box3 * box );
	/* keyword : Box3 * union ( Box3 * box ); */
	Box3 * translate ( Vector3 * offset );

	bool equals ( Box3 * box );

	Box3 * clone ();

	Box3 * applyMatrix4 ( Matrix4 * matrix );
	Sphere * getBoundingSphere ( Sphere * optionalTarget );

	virtual bool instanceOf ( int type ) {

		if ( type == 40 ) { return true; }
		return false;

	}

};

#endif 

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

