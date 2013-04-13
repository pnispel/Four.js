
#ifndef GEOMETRY_H
#define GEOMETRY_H

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

#include "EventDispatcher.h"
#include "Group.h"

#include "GL/gl.h"

class Vector3;
class Vector2;
class BoundingBox;
class BoundingSphere;
class Face;
class Color;
class Matrix4;

// ----------------------------------------------------------------------------
// **       G E O M E T R Y    G R O U P
// ----------------------------------------------------------------------------

class GeometryGroup {

public:
	Group < unsigned int > __faceArray;
	bool __inittedArrays;
	Group < unsigned int > __lineArray;

	Group < double > __normalArray;
	Group < double > __vertexArray;
	int __webglFaceCount;
	int __webglLineCount;

	GLuint __webglVertexBuffer;
	GLuint __webglColorBuffer;
	GLuint __webglLineDistanceBuffer;
	GLuint __webglNormalBuffer;
	GLuint __webglTangentBuffer;
	GLuint __webglUVBuffer;
	GLuint __webglUV2Buffer;
	GLuint __webglSkinIndicesBuffer;
	GLuint __webglSkinWeightsBuffer;
	GLuint __webglFaceBuffer;
	GLuint __webglLineBuffer;

	Group < int > faces3;
	Group < int > faces4;

	int id;
	int materialIndex;
	int numMorphNormals;
	int numMorphTargets;
	int vertices;

public:
	GeometryGroup() {

		bool __inittedArrays = false;

		int __webglFaceCount = 0;
		int __webglLineCount = 0;

		GLuint __webglVertexBuffer = 0;
		GLuint __webglColorBuffer = 0;
		GLuint __webglLineDistanceBuffer = 0;
		GLuint __webglNormalBuffer = 0;
		GLuint __webglTangentBuffer = 0;
		GLuint __webglUVBuffer = 0;
		GLuint __webglUV2Buffer = 0;
		GLuint __webglSkinIndicesBuffer = 0;
		GLuint __webglSkinWeightsBuffer = 0;
		GLuint __webglFaceBuffer = 0;
		GLuint __webglLineBuffer = 0;

		int id = 0;
		int materialIndex = 0;
		int numMorphNormals = 0;
		int numMorphTargets = 0;
		int vertices = 0;

	};

};

// ----------------------------------------------------------------------------
// **       G E O M E T R Y
// ----------------------------------------------------------------------------

class Geometry : public EventDispatcher {

public:
	bool __webglInit;

	GLuint __webglVertexBuffer;
	GLuint __webglColorBuffer;
	GLuint __webglLineDistanceBuffer;
	GLuint __webglNormalBuffer;
	GLuint __webglTangentBuffer;
	GLuint __webglUVBuffer;
	GLuint __webglUV2Buffer;
	GLuint __webglSkinIndicesBuffer;
	GLuint __webglSkinWeightsBuffer;
	GLuint __webglFaceBuffer;
	GLuint __webglLineBuffer;

	Group< GeometryGroup * > geometryGroupsList;

public:
	int id;

	char * name;

	//CHECK: may need to be vertexs
	Group< Vector3 * > __tmpVertices;
	Group< Vector3 * > vertices;
	Group< Color * > colors;
	Group< Vector3 * > normals;

	Group< Face * > faces;
	Group< Group< Vector2 * > > faceUvs;
	Group< Group< Group< Vector2 * > > > faceVertexUvs;

	//FIXME:
	//this.morphTarget = [];
	//this.morphColors = [];
	//this.morphNormals = [];

	//this.skinWeights = [];
	//this.skinIndices = [];

	Group< double > lineDistances;

	BoundingBox * boundingBox;
	BoundingSphere * boundingSphere;

	bool hasTangents;

	bool dynamic;

	bool verticesNeedUpdate;
	bool elementsNeedUpdate;
	bool uvsNeedUpdate;
	bool normalsNeedUpdate;
	bool tangentsNeedUpdate;
	bool colorsNeedUpdate;
	bool lineDistancesNeedUpdate;
	bool morphTargetsNeedUpdate;

	bool buffersNeedUpdate;

public: 
	Geometry() {
		__webglInit = false;
	}

	Geometry * applyMatrix ( Matrix4 * matrix );

	Geometry * computeCentroids ();
	Geometry * computeFaceNormals ();
	Geometry * computeVertexNormals ( bool areaWeighted );
	Geometry * computeMorphNormals ();
	Geometry * computeTangents ();
	Geometry * computeLineDistances ();
	Geometry * computeBoundingBox ();
	Geometry * computeBoundingSphere ();

	int mergeVertices();

	Geometry * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 9 ) { return true; }
		return false;

	}

};

// ----------------------------------------------------------------------------
// **       E N D    O F    F I L E
// ----------------------------------------------------------------------------
#endif 
