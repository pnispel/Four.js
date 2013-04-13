#ifndef SPHERE_H
#define SPHERE_H

class Sphere {

public:
	Vector3 * center;
	double radius;

	

public:
	Sphere() {}

	Vector3 * getCenter() { return center; }

	virtual bool instanceOf ( int type ) {

		if ( type == 49 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 