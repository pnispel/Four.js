
#ifndef OBJECT3D_H
#define OBJECT3D_H

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


class Quaternion;
class Vector3;
class Matrix3;
class Matrix4;
class Geometry;
class Material;

#include <stdio.h>
#include "Group.h"

// ----------------------------------------------------------------------------
// **       O B J E C T 3 D
// ----------------------------------------------------------------------------

class Object3D {

public:
	bool __webglInit;
	bool __webglActive;

	Matrix4 * _modelViewMatrix;
	Matrix3 * _normalMatrix;

public:
	int id;

	char * name;

	Object3D * parent;
	Group<Object3D *> children;

	Vector3 * up;

	Vector3 * position;
	Vector3 * rotation;
	Vector3 * scale;

	//FIXME: eulerorder

	Vector3 * velocity;
	Vector3 * acceleration;
	Vector3 * forceAccum;
	Vector3 * torqueAccum;

	int renderDepth;
	
	bool rotationAutoUpdate;

	Matrix4 * matrix;
	Matrix4 * matrixWorld;
	Matrix4 * matrixRotationWorld;

	bool matrixAutoUpdate;
	bool matrixWorldNeedsUpdate;

	Quaternion * orientation;
	bool useQuaternion;

	bool visible;

	bool receiveShadow;
	bool castShadow;

	bool frustumCulled;

	Geometry * geometry;
	Material * material;

	Object3D * target;

	bool sortParticles;

public:

	Object3D();

	Object3D * applyMatrix ( Matrix4 * m );

	Object3D * translate ( double distance, Vector3 * axis );

	Object3D * translateX ( double distance );
	Object3D * translateY ( double distance );
	Object3D * translateZ ( double distance );

	Vector3 * localToWorld ( Vector3 * vector );
	Vector3 * worldToLocal ( Vector3 * vector );

	void lookAt ( Vector3 * vector );
	void add ( Object3D * object );
	void remove ( Object3D * object );
	void traverse ( int callbackID );

	/*Object3D * getChildByName ( char * name, bool recursive );*/

	/*void * getDecendants ( Object3D * array );*/
	void updateMatrix ();
	void updateMatrixWorld ( bool force = false );
	Object3D * clone ();

	bool hasParent() { return parent != NULL; }

	virtual void __addObject( Object3D * object ) {}
	virtual void __removeObject( Object3D * object ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 10 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 