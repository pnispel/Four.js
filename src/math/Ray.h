#ifndef RAY_H
#define RAY_H

class Vector3;

class Ray {

public:

	

public:
	Ray() {}
	Ray( Vector3 * origin, Vector3 * direction ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 48 ) { return true; }
		return false;

	}

};

#endif 