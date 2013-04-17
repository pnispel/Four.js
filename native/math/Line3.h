#ifndef LINE3_H
#define LINE3_H

class Vector3;
class Matrix4;

class Line3 {

public:
	Vector3 * start;
	Vector3 * end;

	

public:
	Line3();
	Line3( Vector3 * startVec, Vector3 * endVec );

	Line3 * set ( Vector3 * s, Vector3 * e );
	Line3 * copy ( Line3 * line );
	Vector3 * center ( Vector3 * optionalTarget );
	Vector3 * delta ( Vector3 * optionalTarget );
	double distance ();
	double distanceSquared ();
	Vector3 * at ( double t, Vector3 * optionalTarget );

	double closestPointToPointParameter ( Vector3 * point, bool clampToLine );
	//double closestPointToPointParameter ( Vector3 * point, Line * clampToLine );
	Vector3 * closestPointToPoint ( Vector3 * point, bool clampToLine, Vector3 * optionalTarget );

	Line3 * applyMatrix4 ( Matrix4 * matrix);
	bool equals ( Line3 * other );

	Line3 * clone();

	virtual bool instanceOf ( int type ) {

		if ( type == 43 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 