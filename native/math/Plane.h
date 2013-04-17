#ifndef PLANE_H
#define PLANE_H


class Vector3;
class Matrix4;
class Line3;
class Sphere;

class Plane {

public:
	Vector3 * normal;
	double constant;

public:
	Plane( Vector3 * n, double c );
	Plane();

	Plane * set ( Vector3 * normal, double constant );
	Plane * setComponents ( double x, double y, double z, double w );
	Plane * setFromNormalAndCoplanerPoint ( Vector3 * normal, Vector3 * point );
	Plane * setFromCoplanerPoints ( Vector3 * a, Vector3 * b, Vector3 * c );
	Plane * copy ( Plane * p );
	Plane * normalize ();
	Plane * negate ();
	double distanceToPoint ( Vector3 * point );
	double distanceToSphere ( Sphere * sphere );
	Vector3 * projectPoint ( Vector3 * point ); // optional target
	Vector3 * orthoPoint ( Vector3 * point ); // optional target
	bool isIntersectionLine ( Line3 * line );
	Vector3 * intersectLine ( Line3 * line ); // Optional Target
	Vector3 * coplanerPoint (); // OptionalTarget

	Plane * applyMatrix4 ( Matrix4 * matrix ); // optional normal matrix

	Plane * translate ( Vector3 * offset );
	bool equals ( Plane * plane );

	Plane * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 46 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 