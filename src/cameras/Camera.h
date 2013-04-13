
#ifndef CAMERA_H
#define CAMERA_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: Camera.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Camera header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "../core/Object3D.h"

class Matrix4;

// --------------------------------------------------------------------
// ***         S C E N E   D E F I N I T I O N
// --------------------------------------------------------------------

class Camera : public Object3D {

public:
	Matrix4 * matrixWorldInverse;
	Matrix4 * projectionMatrix;
	Matrix4 * projectionMatrixInverse;

public: 
	Camera();

	void lookAt ( Vector3 * vector );

	virtual bool instanceOf ( int type ) {

		if ( type == 1 || type == 10 ) { return true; }
		return false;

	}

};

#endif

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------
