
#ifndef ORTHOGRAPHICCAMERA_H
#define ORTHOGRAPHICCAMERA_H

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
// ***        O R T H O G R A P I C   C A M E R A
// --------------------------------------------------------------------

class OrthographicCamera : public Camera {


public:
	double left;
	double right;
	double top;
	double bottom;
	double near;
	double far;

public: 
	OrthographicCamera ( double dleft, double dright, double dtop, double dbottom, double dnear, double dfar );

	void updateProjectionMatrix ();

	virtual bool instanceOf ( int type ) {

		if ( type == 1 || type == 10 || type == 2 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
