
#ifndef PERSPECTIVECAMERA_H
#define PERSPECTIVECAMERA_H

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

#include "Camera.h"

// --------------------------------------------------------------------
// ***        P E R S P E C T I V E   C A M E R A
// --------------------------------------------------------------------

class PerspectiveCamera : public Camera {


public:

	double fov;
	double aspect;
	double near;
	double far;
	double fullWidth;
	double fullHeight;
	double x;
	double y;
	double width;
	double height;

public: 
	PerspectiveCamera ( double dfov = 50, double daspect = 1, double dnear = 0.1, double dfar = 2000 );

	void setLens ( double focalLength, double frameHeight );
	void setViewOffset ( double fullWidth, double fullHeight, double x, double y, double width, double height );
	void updateProjectionMatrix ();

	virtual bool instanceOf ( int type ) {

		if ( type == 1 || type == 10 || type == 3 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
