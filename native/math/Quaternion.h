class Matrix4;
class Vector3;

#ifndef SMOKE_QUATERNION_H
#define SMOKE_QUATERNION_H

class Quaternion {

public:
	double x;
	double y;
	double z;
	double w;

public:
	Quaternion();
	Quaternion ( double qx, double qy, double qz, double qw );
	
	Quaternion * set ( double qx, double qy, double qz, double qw );
	Quaternion * copy ( Quaternion * q );
	Quaternion * setFromRotationMatrix ( Matrix4 * m );
	Quaternion * setFromAxisAngle ( Vector3 * axis, double angle );
	Quaternion * inverse ();
	Quaternion * conjugate ();
	double length ();
	double lengthSquared ();
	Quaternion * normalize ();
	Quaternion * multiplyQuaternions ( Quaternion * a, Quaternion * b );
	Quaternion * slerp ( Quaternion * qb, double t );
	bool equals ( Quaternion * other );
	Quaternion * clone ();
	
	/*unimplemented : Quaternion * setFromEuler( Vector3 * v ); */

	virtual bool instanceOf ( int type ) {

		if ( type == 47 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 