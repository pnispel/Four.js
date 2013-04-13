
#ifndef CUBEGEOMETRY_H
#define CUBEGEOMETRY_H

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

#include "../core/Geometry.h"

// --------------------------------------------------------------------
// ***        C U B E   G E O M E T R Y
// --------------------------------------------------------------------

class CubeGeometry : public Geometry {

public:
	double height;
	double width;
	double depth;

	int widthSegments;
	int heightSegments;
	int depthSegments;

	void buildPlane ( const char u, const char v, int udir, int vdir, double width, double height, double depth, double materialIndex );


public: 
	CubeGeometry ( double h, double w, double d ) : Geometry() {

		height = h;
		width = w;
		depth = d;

		widthSegments = heightSegments = depthSegments = 1;

		double width_half = width / 2;
		double height_half = height / 2;
		double depth_half = depth / 2;

		buildPlane( 'z', 'y', - 1, - 1, depth, height, width_half, 0 ); // px
		buildPlane( 'z', 'y',   1, - 1, depth, height, - width_half, 1 ); // nx
		buildPlane( 'x', 'z',   1,   1, width, depth, height_half, 2 ); // py
		buildPlane( 'x', 'z',   1, - 1, width, depth, - height_half, 3 ); // ny
		buildPlane( 'x', 'y',   1, - 1, width, height, depth_half, 4 ); // pz
		buildPlane( 'x', 'y', - 1, - 1, width, height, - depth_half, 5 ); // nz

		computeCentroids();
		mergeVertices();

	}

	virtual bool instanceOf ( int type ) {

		if ( type == 13 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
