//// src/cameras/Camera.h

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

#include "core/Object3D.h"

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
//// src/cameras/OrthographicCamera.h

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

#include "cameras/Camera.h"

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
//// src/cameras/PerspectiveCamera.h

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

#include "cameras/Camera.h"

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
//// src/core/BufferGeometry.h

#ifndef BUFFERGEOMETRY_H
#define BUFFERGEOMETRY_H

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

#include "core/EventDispatcher.h"

// --------------------------------------------------------------------
// ***        B U F F E R   G E O M E T R Y
// --------------------------------------------------------------------

class BufferGeometry : public EventDispatcher {


public:

public: 
	BufferGeometry () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 4 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/core/Clock.h

#ifndef CLOCK_H
#define CLOCK_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Clock.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Clock header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include <ctime>
#include <sys/time.h>

/********************************************************************
***         C L O C K    D E F I N I T I O N
********************************************************************/

class Clock {

	clock_t startTime;
	clock_t oldTime;
	double elapsedTime;

	bool autoStart;
	bool isRunning;

public: 
	Clock( bool shouldStart ){ autoStart = shouldStart; oldTime = 0; }
	Clock(){ autoStart = true; oldTime = 0; }

	bool running () { return isRunning; }

	void start ();
	void stop ();
	double getElapsedTime ();
	double getDelta ();

	virtual bool instanceOf ( int type ) {

		if ( type == 5 ) { return true; }
		return false;

	}

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************///// src/core/EventDispatcher.h

#ifndef EVENTDISPATCHER_H
#define EVENTDISPATCHER_H

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

#include "core/Group.h"

// --------------------------------------------------------------------
// ***        E V E N T   D I S P A T C H E R
// --------------------------------------------------------------------

class EventDispatcher {

public:


public: 
	EventDispatcher () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 6 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/core/Face.h

#ifndef FACE3_H
#define FACE3_H

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

#include "core/Group.h"

class Vector3;
class Color;

// ----------------------------------------------------------------------------
// **       F A C E 
// ----------------------------------------------------------------------------

class Face {

public: 
	int a;
	int b;
	int c;
	int d;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;

public:
	Face() {};

	Face * clone () { return this;}

	virtual bool instanceOf ( int type ) {
		return true;
	}

};


/********************************************************************
***         F A C E 3
********************************************************************/

class Face3 : public Face {

public:
	int a;
	int b;
	int c;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;


public: 
	Face3 ();
	Face3 ( int ma, int mb, int mc );
	Face3 ( int ma, int mb, int mc, Vector3 * mnormal, Color * mcolor, int mmaterialIndex );
	Face3 ( int ma, int mb, int mc, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex );

	Face3 * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 7 ) { return true; }
		return false;

	}

};

#endif 


#ifndef FACE4_H
#define FACE4_H

/********************************************************************
***         F A C E 4 
********************************************************************/

class Face4 : public Face {

public:
	int a;
	int b;
	int c;
	int d;

	Vector3 * normal;
	Group<Vector3 *> vertexNormals;

	Color * color;
	Group<Color *> vertexColors;

	int materialIndex;

	Group<Vector3 *> vertexTangents;

	Vector3 * centroid;

public: 
    Face4 ();
    Face4 ( int ma, int mb, int mc, int md );
	Face4 ( int ma, int mb, int mc, int md, Vector3 * mnormal, Color * mcolor, int mmaterialIndex );
	Face4 ( int ma, int mb, int mc, int md, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex );

	Face4 * clone ();

    virtual bool instanceOf ( int type ) {

		if ( type == 8 ) { return true; }
		return false;

	}

};

/********************************************************************
***         E N D    O F    C L A S S
********************************************************************/
#endif 
//// src/core/Geometry.h

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

#include "core/EventDispatcher.h"
#include "core/Group.h"

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
//// src/core/Object3D.h

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
#include "core/Group.h"

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
#endif //// src/core/Projector.h

#ifndef PROJECTOR_H
#define PROJECTOR_H

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


// --------------------------------------------------------------------
// ***        P R O J E C T O R
// --------------------------------------------------------------------

class Projector {


public:

public: 
	Projector () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 11 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/core/Raycaster.h

#ifndef RAYCASTER_H
#define RAYCASTER_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Raycaster {


public:

public: 
	Raycaster () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 12 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/core/Group.h
#ifndef GROUP_H
#define GROUP_H

template <typename Object>
class Group
{  
  public:

    explicit Group( int initSize = 0)
            : theSize( initSize ), theCapacity( initSize + SPARE_CAPACITY )
    { objects = new Object[ theCapacity ]; }
    
    Group(const Group & rhs ): objects(0)
    { operator=(rhs); }

    ~Group()
    { delete [] objects; }

    const Group & operator=(const Group & rhs)
    {
        if(this != &rhs)
        {
            delete[] objects;
            theSize = rhs.size();
            theCapacity = rhs.theCapacity;
            
            objects = new Object[capacity()];
            for(int k = 0; k < size(); k++)
                objects[k] = rhs.objects[k];
            
        }

        return *this;
    }

    void resize(int newSize)
    {
        if(newSize > theCapacity)
            reserve(newSize * 2 + 1);
        theSize = newSize;
    }

    int indexOf( const Object& x ) {

        for ( int i = 0; i < theSize; i++ ) {

            if ( objects[ i ]->id == x->id ) {

                return i;

            }

        }

        return -1;

    }

    void reserve(int newCapacity)
    {
        if(newCapacity < theSize)
            return;

        Object *oldArray = objects;

        objects = new Object[newCapacity];
        for(int k = 0; k < theSize; k++)
            objects[k] = oldArray[k];

        theCapacity = newCapacity;

        delete [] oldArray;
    }

    Object & operator[](int index)
    { return objects[index]; }
    
    const Object& operator[](int index) const
    { return objects[index]; }

    bool empty() const
    { return size() == 0; }
    
    int size() const
    { return theSize; }
    
    int capacity() const
    { return theCapacity; }

    void erase(unsigned int erase_index)                { erase(erase_index,erase_index+1);}
    void erase(unsigned int start, unsigned int end)    /* end NOT inclusive so => [start, end) */
    {
        if (end > theSize)
        {   end     = theSize;
        }
        if (start > end)
        {   start   = end;
        }
        unsigned int dst    = start;
        unsigned int src    = end;
        for(;(src < theSize) && (dst < end);++dst, ++src)
        {
            // Move Elements down;
            objects[dst] = objects[src];
        }
        unsigned int count = start - end;
        for(;count != 0; --count)
        {
            // Remove old Elements
            --theSize;
            // Remember we need to manually call the destructor
            objects[theSize].~Object();
        }
    }


    void push_back(const Object& x)
    {
        if(theSize == theCapacity)
            reserve(2 * theCapacity + 1);
        objects[theSize++] = x;
    }

    void pop_back()
    { theSize--; }

    const Object& back() const
    { return objects[theSize - 1]; }

    typedef Object* iterator;
    typedef const Object* const_iterator;

    iterator begin()
    { return &objects[0]; }
    const_iterator begin() const
    { return &objects[0]; }

    iterator end()
    { return &objects[size() - 1]; }
    const_iterator end() const
    { return &objects[size() - 1]; }

    enum { SPARE_CAPACITY = 16 };  
  private:
    int theSize;
    int theCapacity;
    Object* objects;
};

#endif//// src/geometries/CubeGeometry.h

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

#include "core/Geometry.h"

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
//// src/lights/AmbientLight.h

#ifndef AMBIENTLIGHT_H
#define AMBIENTLIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class AmbientLight : public Light {


public:

public: 
	AmbientLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 13 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/AreaLight.h

#ifndef AREALIGHT_H
#define AREALIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class AreaLight : public Light {


public:

public: 
	AreaLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 14 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/DirectionalLight.h

#ifndef DIRECTIONALLIGHT_H
#define DIRECTIONALLIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class DirectionalLight : public Light {


public:

public: 
	DirectionalLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 15 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/HemisphereLight.h

#ifndef HEMISPHERELIGHT_H
#define HEMISPHERELIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class HemisphereLight : public Light {


public:

public: 
	HemisphereLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 16 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/Light.h

#ifndef LIGHT_H
#define LIGHT_H

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

#include "core/Object3D.h"

class Color;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Light : public Object3D {


public:

	Color * color;

public: 
	Light ( unsigned int hex );

	virtual bool instanceOf ( int type ) {

		if ( type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/PointLight.h

#ifndef POINTLIGHT_H
#define POINTLIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class PointLight : public Light {

public:
	double intensity;
	double distance;

public: 
	PointLight ( unsigned int hex, double intensity, double distance ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 18 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/lights/SpotLight.h

#ifndef SPOTLIGHT_H
#define SPOTLIGHT_H

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

#include "lights/Light.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class SpotLight : public Light {


public:

public: 
	SpotLight ( unsigned int hex ) : Light( hex ) {}

	virtual bool instanceOf ( int type ) {

		if ( type == 19 || type == 17 || type == 10 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/LineBasicMaterial.h

#ifndef LINEBASICMATERIAL_H
#define LINEBASICMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class LineBasicMaterial {


public:

public: 
	LineBasicMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 26 ) { return true; }
		return false;

	}


};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/LineDashedMaterial.h

#ifndef LINEDASHEDMATERIAL_H
#define LINEDASHEDMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class LineDashedMaterial {


public:

public: 
	LineDashedMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 27 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/Material.h

#ifndef MATERIAL_H
#define MATERIAL_H

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

#include "core/EventDispatcher.h"
#include "core/Group.h"

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Material : public EventDispatcher{


public:
	int id;
	char * name;

	int side;
	double opacity;
	bool transparent;

	int blending;

	int blendSrc;
	int blendDst;
	int blendEquation;

	bool depthTest;
	bool depthWrite;

	bool polygonOffset;
	double polygonOffsetFactor;
	double polygonOffsetUnits;

	double alphaTest;

	bool overdraw;

	bool visible;
	bool needsUpdate;

	//FOR MESH FACE
	Group< Material * > materials;

public: 
	Material();

	Material * clone () { return this;}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshBasicMaterial.h

#ifndef MESHBASICMATERIAL_H
#define MESHBASICMATERIAL_H

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

#include "materials/Material.h"

class Color;
class Texture;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshBasicMaterial : public Material {

public:

	Color * color;
	Texture * map;
	//lightMap = null;

	//specularMap = null;

	//envMap = null;
	int combine;
	int reflectivity;
	double refractionRatio;

	bool fog;

	int shading;

	bool wireframe;
	int wireframeLinewidth;
	//wireframeLinecap = 'round';
	//wireframeLinejoin = 'round';

	int vertexColors;

	bool skinning;
	bool morphTargets;

public: 
	MeshBasicMaterial ();

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 29 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshDepthMaterial.h

#ifndef MESHDEPTHMATERIAL_H
#define MESHDEPTHMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshDepthMaterial {


public:

public: 
	MeshDepthMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 30 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshFaceMaterial.h

#ifndef MESHFACEMATERIAL_H
#define MESHFACEMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshFaceMaterial {


public:

public: 
	MeshFaceMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 31 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshLambertMaterial.h

#ifndef MESHLAMBERTMATERIAL_H
#define MESHLAMBERTMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshLambertMaterial {


public:

public: 
	MeshLambertMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 32 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshNormalMaterial.h

#ifndef MESHNORMALMATERIAL_H
#define MESHNORMALMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshNormalMaterial {


public:

public: 
	MeshNormalMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 33 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/MeshPhongMaterial.h

#ifndef MESHPHONGMATERIAL_H
#define MESHPHONGMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MeshPhongMaterial {


public:

public: 
	MeshPhongMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 34 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/ParticleBasicMaterial.h

#ifndef PARTICLEBASICMATERIAL_H
#define PARTICLEBASICMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class ParticleBasicMaterial {


public:

public: 
	ParticleBasicMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 35 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/ParticleCanvasMaterial.h

#ifndef PARTICLECANVASMATERIAL_H
#define PARTICLECANVASMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class ParticleCanvasMaterial {


public:

public: 
	ParticleCanvasMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 36 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/ShaderMaterial.h

#ifndef SHADERMATERIAL_H
#define SHADERMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class ShaderMaterial {


public:

public: 
	ShaderMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 37 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/materials/SpriteMaterial.h

#ifndef SPRITEMATERIAL_H
#define SPRITEMATERIAL_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class SpriteMaterial {


public:

public: 
	SpriteMaterial () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 28 || type == 6  || type == 38 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/math/Box.h

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

#ifndef BOX2_H
#define BOX2_H

class Vector2;

// --------------------------------------------------------------------
// ***         B O X 2 
// --------------------------------------------------------------------

class Box2 {


public:
	Vector2 * min;
	Vector2 * max;

public: 
	Box2 () {


	}
	Box2 ( Vector2 * minVec, Vector2 * maxVec ) {}

	/*
	Box2 * set ( Vector2 * minVec, Vector2 * maxVec );
	Box2 * setFromPoints ( void ** points );
	//Box2 * setFromPoints ( const double * points );
	Box2 * setFromCenterAndSize ( Vector2 * center, double size );
	Box2 * copy ( Box2 * other );
	Box2 * makeEmpty ();
	bool empty ();
	Vector2 * center( Vector2 * target );
	Vector2 * size ( Vector2 * target );

	Box2 * expandByPoint ( Vector2 * point );
	Box2 * expandByVector ( Vector2 * vector );
	Box2 * expandByScalar ( double scalar );

	bool containsPoint ( Vector2 * point );
	bool containsBox ( Box2 * box );

	Vector2 * getParameter ( Vector2 * point );

	bool isIntersectionBox ( Box2 * box );
	Vector2 * clampPoint ( Vector2 * point, Vector2 * optionalTarget );

	double distanceToPoint ( Vector2 * point );
	Box2 * intersect ( Box2 * box );
	Box2 * union ( Box2 * box );
	Box2 * translate ( Vector2 * offset );

	bool equals ( Box2 * box );

	Box2 * clone ();
	*/

	virtual bool instanceOf ( int type ) {

		if ( type == 39 ) { return true; }
		return false;

	}

};

#endif 


#ifndef SMOKE_BOX3_H
#define SMOKE_BOX3_H

class Vector3;
class Matrix4;
class Sphere;

// --------------------------------------------------------------------
// ***         B O X 3 
// --------------------------------------------------------------------

class Box3 {

public:
	Vector3 * min;
	Vector3 * max;

public: 
    Box3();
    Box3( Vector3 * minVec, Vector3 * maxVec );

    Box3 * set ( Vector3 * minVec, Vector3 * maxVec );
	Box3 * setFromPoints ( void ** points );
	//Box2 * setFromPoints ( const double * points );
	Box3 * setFromCenterAndSize ( Vector3 * center, Vector3 * size );
	Box3 * copy ( Box3 * other );
	Box3 * makeEmpty ();
	bool empty ();
	Vector3 * center( Vector3 * target );
	Vector3 * size ( Vector3 * target );

	Box3 * expandByPoint ( Vector3 * point );
	Box3 * expandByVector ( Vector3 * vector );
	Box3 * expandByScalar ( double scalar );

	bool containsPoint ( Vector3 * point );
	bool containsBox ( Box3 * box );

	Vector3 * getParameter ( Vector3 * point );

	bool isIntersectionBox ( Box3 * box );
	Vector3 * clampPoint ( Vector3 * point, Vector3 * optionalTarget );

	double distanceToPoint ( Vector3 * point );
	Box3 * intersect ( Box3 * box );
	/* keyword : Box3 * union ( Box3 * box ); */
	Box3 * translate ( Vector3 * offset );

	bool equals ( Box3 * box );

	Box3 * clone ();

	Box3 * applyMatrix4 ( Matrix4 * matrix );
	Sphere * getBoundingSphere ( Sphere * optionalTarget );

	virtual bool instanceOf ( int type ) {

		if ( type == 40 ) { return true; }
		return false;

	}

};

#endif 

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

//// src/math/Color.h

#ifndef COLOR_H
#define COLOR_H

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

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Color {


public:
	double r;
	double g;
	double b;

public: 
	Color ();

	Color ( double mr, double mg, double mb );

	Color * set ( unsigned int hex );

	Color * setRGB ( double ir, double ig, double ib );

	Color * copy ( Color * color );

	Color * copyGammaToLinear ( Color * color );

	Color * convertGammaToLinear ();

	Color * convertLinearToGamma ();

	Color * add ( Color * color );

	Color * addColors ( Color * c1, Color * c2 );

	Color * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 41 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/math/Frustum.h
#ifndef FRUSTUM_H
#define FRUSTUM_H

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

class Plane;
class Object3D;
class Sphere;
class Vector3;
class Matrix4;

class Frustum {

public:
	Plane * planes[6];
	

public:
	Frustum();
	Frustum( Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 );

	Frustum * set(  Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 );

	Frustum * copy ( Frustum * other );

	Frustum * setFromMatrix ( Matrix4 * m );

	bool intersectsObject ( Object3D * object );
	bool intersectsSphere ( Sphere * sphere );
	bool containsPoint ( Vector3 * point );

	Frustum * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 42 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif //// src/math/Line3.h
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
#endif //// src/math/Math.h
#ifndef MATH_H
#define MATH_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Line3.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: 
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

class MATH {

public:
	MATH(){}

	static double clamp ( double x, double a, double b );
	static double clampBottom ( double x, double a );
	static double mapLinear ( double x, double a1, double a2, double b1, double b2 );
	static double smoothstep ( double x, double min, double max );
	static double smootherstep ( double x, double min, double max );
	static double random16 ();
	static int randInt ( int low, int high );
	static double randDouble ( double low, double high );
	static double randDoubleSpread ( double range );
	static int sign ( int x );
	static int sign ( double x );
	static double degToRad ( double degrees );
	static double radToDeg ( double radians );

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif //// src/math/Matrix.h

class Vector3;
class Vector4;
class Quaternion;
class Matrix4;


#ifndef SMOKE_MATRIX3_H
#define SMOKE_MATRIX3_H


/********************************************************************
***         M A T R I X 3
********************************************************************/

class Matrix3 {

public:
	double data[9];

public:

	Matrix3();

	Matrix3 (
		const double n11, const double n12, const double n13,
		const double n21, const double n22, const double n23,
		const double n31, const double n32, const double n33 
	);

	Matrix3 * set (
		const double n11, const double n12, const double n13,
		const double n21, const double n22, const double n23,
		const double n31, const double n32, const double n33 
	);

	Matrix3 * identity ();
	
	Matrix3 * multiplyScalar( double scalar );
	double determinant();
	Matrix3 * transpose();
	Matrix3 * getNormalMatrix( Matrix4 * matrix );
	
	Matrix3 * getInverse ( Matrix4 * matrix );

	Matrix3 * copy ( Matrix3 * m );
	Matrix3 * clone();

	/*unimplemented : double * multiplyVector3Array( ) { return 0.001; }*/
	/*unimplemented*/Matrix3 * transposeIntoArray ( double * array ) { return this;}

	virtual bool instanceOf ( int type ) {

		if ( type == 44 ) { return true; }
		return false;

	}

};

#endif 


#ifndef SMOKE_MATRIX4_H
#define SMOKE_MATRIX4_H

/********************************************************************
***         M A T R I X 4
********************************************************************/

class Matrix4 {

public:
	double data[16];

public: 
    Matrix4();

    Matrix4 (
		const double n11, const double n12, const double n13, const double n14, 
		const double n21, const double n22, const double n23, const double n24, 
		const double n31, const double n32, const double n33, const double n34, 
		const double n41, const double n42, const double n43, const double n44
	);

	Matrix4 * set (
		const double n11, const double n12, const double n13, const double n14, 
		const double n21, const double n22, const double n23, const double n24, 
		const double n31, const double n32, const double n33, const double n34, 
		const double n41, const double n42, const double n43, const double n44
	);

	/*unimplemented*/Matrix4 * setRotationFromEuler ( Vector3 * v, char * order ) { return this; }
	/*unimplemented*/Matrix4 * multiplyToArray ( Matrix4 * a, Matrix4 * b, double * array ) { return this;}
	/*unimplemented : double * multiplyVector3Array( ) { return 0.001; }*/
	/*unimplemented : double * flattenToArray ( double * array ) { return 0.001; }*/
	/*unimplemented : double * flattenToArrayOffset ( double * array ) { return 0.001; }*/

	Matrix4 * setRotationFromQuaternion ( Quaternion * q );
	Vector4 * crossVector ( Vector4 * v );
	double determinant();
	Matrix4 * setPosition ( Vector3 * v );
	Matrix4 * getInverse ( Matrix4 * m );
	Matrix4 * extractPosition ( Matrix4 * m );
	Matrix4 * extractRotation ( Matrix4 * m );
	Matrix4 * translate ( Vector3 * v );
	Matrix4 * rotateX ( double angle );
	Matrix4 * rotateY ( double angle );
	Matrix4 * rotateZ ( double angle );
	Matrix4 * rotateByAxis ( Vector3 * axis, double angle );
	Matrix4 * scale ( Vector3 * v );
	double getMaxScaleOnAxis ();
	Matrix4 * makeTranslation ( double x, double y, double z );
	Matrix4 * makeRotationX ( double theta );
	Matrix4 * makeRotationY ( double theta );
	Matrix4 * makeRotationZ ( double theta );
	Matrix4 * makeRotationAxis ( Vector3 * axis, double angle );
	Matrix4 * makeScale ( double x, double y, double z );
	Matrix4 * makeFrustum ( double left, double right, double bottom, double top, double near, double far );
	Matrix4 * makePerspective ( double fov, double aspect, double near, double far );
	Matrix4 * makeOrthographic ( double left, double right, double top, double bottom, double near, double far );
	Matrix4 * compose ( Vector3 * position, Quaternion * quaternion, Vector3 * scale );
	Matrix4 * decompose ( Vector3 * position, Quaternion * quaternion, Vector3 * scale );
	
	Matrix4 * multiplyMatrices ( Matrix4 * a, Matrix4 * b );
	Matrix4 * lookAt ( Vector3 * eye, Vector3 * target, Vector3 * up );
	
	Matrix4 * invert ();
	Matrix4 * identity ();
	Matrix4 * transpose ();
	Matrix4 * multiplyScalar ( double s );

	Matrix4 * copy ( Matrix4 * m );
	Matrix4 * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 45 ) { return true; }
		return false;

	}

};

#endif 

/********************************************************************
***         E N D    O F    F I L E
********************************************************************/
//// src/math/Plane.h
#ifndef PLANE_H
#define PLANE_H


class Vector3;
class Matrix4;
class Line3;
class Sphere;

class Plane {

public:
	Vector3 * normal;
	double constant;

public:
	Plane( Vector3 * n, double c );
	Plane();

	Plane * set ( Vector3 * normal, double constant );
	Plane * setComponents ( double x, double y, double z, double w );
	Plane * setFromNormalAndCoplanerPoint ( Vector3 * normal, Vector3 * point );
	Plane * setFromCoplanerPoints ( Vector3 * a, Vector3 * b, Vector3 * c );
	Plane * copy ( Plane * p );
	Plane * normalize ();
	Plane * negate ();
	double distanceToPoint ( Vector3 * point );
	double distanceToSphere ( Sphere * sphere );
	Vector3 * projectPoint ( Vector3 * point ); // optional target
	Vector3 * orthoPoint ( Vector3 * point ); // optional target
	bool isIntersectionLine ( Line3 * line );
	Vector3 * intersectLine ( Line3 * line ); // Optional Target
	Vector3 * coplanerPoint (); // OptionalTarget

	Plane * applyMatrix4 ( Matrix4 * matrix ); // optional normal matrix

	Plane * translate ( Vector3 * offset );
	bool equals ( Plane * plane );

	Plane * clone ();

	virtual bool instanceOf ( int type ) {

		if ( type == 46 ) { return true; }
		return false;

	}

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif //// src/math/Quaternion.h
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
#endif //// src/math/Ray.h
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

#endif //// src/math/Sphere.h
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
#endif //// src/math/Spline.h

#ifndef SPLINE_H
#define SPLINE_H

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


// --------------------------------------------------------------------
// ***        S P L I N E
// --------------------------------------------------------------------

class Spline {


public:

public: 
	Spline () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 50 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/math/Triangle.h

#ifndef TRIANGLE_H
#define TRIANGLE_H

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


// --------------------------------------------------------------------
// ***        T R I A N G L E
// --------------------------------------------------------------------

class Triangle {


public:

public: 
	Triangle () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 51 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/math/UV.h

#ifndef UV_H
#define UV_H

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


// --------------------------------------------------------------------
// ***        U V
// --------------------------------------------------------------------

class UV {


public:

public: 
	UV () {}

	virtual bool instanceOf ( int type ) {

		if ( type == 52 ) { return true; }
		return false;

	}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/math/Vector.h

/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Vector.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Vector2, Vector3 and Vector4 headers
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include <stdio.h>
#include <math.h>

class Matrix4;
class Matrix3;
class Quaternion;

#ifndef SMOKE_VECTOR2_H
#define SMOKE_VECTOR2_H

/********************************************************************
***         V E C T O R 2    D E F I N I T I O N
********************************************************************/

class Vector2 {

public:

    double x;
    double y;

    

public: 
	Vector2();
    Vector2( double vx, double vy );

    Vector2 * set ( double x, double y ) { return this;}

    virtual bool instanceOf ( int type ) {

        if ( type == 53 ) { return true; }
        return false;

    }

};

#endif 

#ifndef SMOKE_VECTOR3_H
#define SMOKE_VECTOR3_H

/********************************************************************
***         V E C T O R 3    D E F I N I T I O N
********************************************************************/

class Vector3 {

public:
	double x;
    double y;
    double z;

   

public: 

	Vector3();
	Vector3( double vx, double vy, double vz);

    Vector3 * set ( double x, double y, double z ) { this->x = x; this->y = y; this->z = z; return this; }

    double get ( int index );

    Vector3 * add ( Vector3 * vector );
    Vector3 * sub ( Vector3 * vector );

    Vector3 * addVectors ( Vector3 * a, Vector3 * b );
    Vector3 * subVectors ( Vector3 * a, Vector3 * b );
    Vector3 * multiplyVectors ( Vector3 * a, Vector3 * b );
    Vector3 * crossVectors ( Vector3 * a, Vector3 * b );

    Vector3 * applyMatrix3 ( Matrix3 * m );
    Vector3 * applyMatrix4 ( Matrix4 * m );
    Vector3 * applyProjection ( Matrix4 * m );
    Vector3 * applyQuaternion ( Quaternion * q );

    Vector3 * addScalar ( double scalar );
    Vector3 * multiplyScalar ( double scalar );
    Vector3 * divideScalar ( double scalar );

    Vector3 * multiply ( Vector3 * vector );
    Vector3 * divide ( Vector3 * v );

    Vector3 * transformDirection ( Matrix4 * m );

    Vector3 * min ( Vector3 * v );
    Vector3 * max ( Vector3 * v );

    Vector3 * clamp ( Vector3 * min, Vector3 * max );

    Vector3 * negate ();

    Vector3 * setFromChar ( char c, double val ) {

        if ( c == 'x' ) {

           x = val;

        } else if ( c == 'y' ) {

            y = val;

        } else if ( c == 'z' ) {

            z = val;

        }

        return this;

    }

    double dot ( Vector3 * v );

    double lengthSquared ();
    double length ();
    double lengthManhattan ();

    Vector3 * normalize ();

    Vector3 * setLength ( double l );

    Vector3 * lerp ( Vector3 * v, double alpha );

    Vector3 * cross( Vector3 * v );

    //double angleTo ( Vector3 * v );

    double distanceTo ( Vector3 * v );
    double distanceToSquared ( Vector3 * v );

    Vector3 * getPositionFromMatrix( Matrix4 * m );
    Vector3 * getScaleFromMatrix( Matrix4 * m );

    bool equals ( Vector3 * v );

    Vector3 * clone (); 
    Vector3 * copy ( Vector3 * vector ); 

    virtual bool instanceOf ( int type ) {

        if ( type == 54 ) { return true; }
        return false;

    }

};

#endif 

#ifndef SMOKE_VECTOR4_H
#define SMOKE_VECTOR4_H

/********************************************************************
***         V E C T O R 4    D E F I N I T I O N
********************************************************************/

class Vector4 {

public: 
    double x;
    double y;
    double z;
    double w;

    

public: 
	Vector4(){}

    virtual bool instanceOf ( int type ) {

        if ( type == 55 ) { return true; }
        return false;

    }

};

#endif 

/********************************************************************
***			E N D    O F    F I L E
********************************************************************///// src/math/Vertex.h

#ifndef VERTEX_H
#define VERTEX_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Vertex {


public:

public: 
	Vertex () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 56 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Bone.h

#ifndef BONE_H
#define BONE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Bone {


public:

public: 
	Bone () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 57 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/LOD.h

#ifndef LOD_H
#define LOD_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class LOD {


public:

public: 
	LOD () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 59 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Line.h

#ifndef LINE_H
#define LINE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Line {


public:

public: 
	Line () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 58 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Mesh.h

#ifndef MESH_H
#define MESH_H

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

#include "core/Object3D.h"

class Geometry;
class Material;

// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Mesh : public Object3D {


public:

public: 
	Mesh ( Geometry * geometry );
	Mesh ( Geometry * geometry, Material * material );

	//FIXME:
	//void updateMorphTargets ();

	//FIXME:
	//getMorphTargetIndexByName

	virtual bool instanceOf ( int type ) {

        if ( type == 60 || type == 10 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/MorphAnimMesh.h

#ifndef MORPHANIMMESH_H
#define MORPHANIMMESH_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class MorphAnimMesh {


public:

public: 
	MorphAnimMesh () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 61 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Particle.h

#ifndef PARTICLE_H
#define PARTICLE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Particle {


public:

public: 
	Particle () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 62 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/ParticleSystem.h

#ifndef PARTICLESYSTEM_H
#define PARTICLESYSTEM_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class ParticleSystem {


public:

public: 
	ParticleSystem () {}

	virtual bool instanceOf ( int type ) {

        if ( type == 63 ) { return true; }
        return false;

    }

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Ribbon.h

#ifndef RIBBON_H
#define RIBBON_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Ribbon {


public:

public: 
	Ribbon () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/SkinnedMesh.h

#ifndef SKINNEDMESH_H
#define SKINNEDMESH_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class SkinnedMesh {


public:

public: 
	SkinnedMesh () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/objects/Sprite.h

#ifndef SPRITE_H
#define SPRITE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Sprite {


public:

public: 
	Sprite () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/renderers/CanvasRenderer.h

#ifndef CANVASRENDERER_H
#define CANVASRENDERER_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class CanvasRenderer {


public:

public: 
	CanvasRenderer () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/renderers/WebGLRenderTarget.h

#ifndef WEBGLRENDERTARGET_H
#define WEBGLRENDERTARGET_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class WebGLRenderTarget {


public:

public: 
	WebGLRenderTarget () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/renderers/WebGLRenderTargetCube.h

#ifndef WEBGLRENDERTARGETCUBE_H
#define WEBGLRENDERTARGETCUBE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class WebGLRenderTargetCube {


public:

public: 
	WebGLRenderTargetCube () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/renderers/WebGLRenderer.h

#ifndef WEBGLRENDERER_H
#define WEBGLRENDERER_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: WebGLRenderer.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains WebGLRenderer header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "core/Object3D.h"
#include "core/Group.h"

#ifdef __APPLE__
#include <OpenGL/gl.h>
#include <Glut/glut.h>
#else
#include <GL/gl.h>
#include <GL/glut.h>
#endif

class GLLowLevelRenderer;
class GLMeshRenderer;
class GLParticleRenderer;
class GLLineRenderer;
class GLRibbonRenderer;
class GLShaderBuilder;
class Scene;
class Camera;
class Frustum;
class Color;
class Material;
class Geometry;
class WebGLObject;
class GeometryGroup;
class Texture;
class RenderTarget;
class Shader;
class Fog;
class Light;

/********************************************************************
***         S C E N E   D E F I N I T I O N
********************************************************************/

class WebGLRenderer {

	enum Precision {
		HIGH,
		MEDIUM,
		LOW
	};

	struct PrecisionResult {
		int range;
		int precision;
	};

	PrecisionResult _vertexShaderPrecisionHighpFloat;
	PrecisionResult _vertexShaderPrecisionMediumpFloat;
	PrecisionResult _vertexShaderPrecisionLowpFloat;
	PrecisionResult _fragmentShaderPrecisionHighpFloat;
	PrecisionResult _fragmentShaderPrecisionMediumpFloat;
	PrecisionResult _fragmentShaderPrecisionLowpFloat;
	PrecisionResult _vertexShaderPrecisionHighpInt;
	PrecisionResult _vertexShaderPrecisionMediumpInt;
	PrecisionResult _vertexShaderPrecisionLowpInt;
	PrecisionResult _fragmentShaderPrecisionHighpInt;
	PrecisionResult _fragmentShaderPrecisionMediumpInt;
	PrecisionResult _fragmentShaderPrecisionLowpInt;


	// ----------------------------------------
	// ** 	G P U    C A P A B I L I T I E S
	// ----------------------------------------

	int _maxTextures;
	int _maxVertexTextures;
	int _maxTextureSize;
	int _maxCubemapSize;

	int _maxAnisotropy;

	bool _supportsVertexTextures;
	bool _supportsBoneTextures;

	//FIXME: compressedTextureFormats	


	// ----------------------------------------
	// ** 	I N T E R N A L   P R O P S
	// ----------------------------------------

	//CHECK: probably not ints....
	Group< int > _programs;
	int _programs_counter;

	// ----------------------------------------
	// ** 	I N T E R N A L   S T A T E   C A C H E
	// ----------------------------------------

	// internal state cache

	int _currentProgram;
	int _currentFramebuffer;
	int _currentMaterialId;
	int _currentGeometryGroupHash;
	Camera * _currentCamera;
	int _geometryGroupCounter;

	int _usedTextureUnits;

	// GL state cache

	int _oldDoubleSided;
	int _oldFlipSided;

	int _oldBlending;

	int _oldBlendEquation;
	int _oldBlendSrc;
	int _oldBlendDst;

	bool _oldDepthTest;
	bool _oldDepthWrite;

	bool _oldPolygonOffset;
	double _oldPolygonOffsetFactor;
	double _oldPolygonOffsetUnits;

	int _oldLineWidth;

	int _viewportX;
	int _viewportY;
	int _viewportWidth;
	int _viewportHeight;
	int _currentWidth;
	int _currentHeight;

	//FIXME:
	//_enabledAttributes = {},

	// frustum

	Frustum * _frustum;

	 // camera matrices cache

	Matrix4 * _projScreenMatrix;
	Matrix4 * _projScreenMatrixPS;

	Vector3 * _vector3;

	// light arrays cache

	Vector3 * _direction;

	bool _lightsNeedUpdate;

	//FIXME:
	//_lights = {

	//	ambient: [ 0, 0, 0 ],
	//	directional: { length: 0, colors: new Array(), positions: new Array() },
	//	point: { length: 0, colors: new Array(), positions: new Array(), distances: new Array() },
	//	spot: { length: 0, colors: new Array(), positions: new Array(), distances: new Array(), directions: new Array(), anglesCos: new Array(), exponents: new Array() },
	//	hemi: { length: 0, skyColors: new Array(), groundColors: new Array(), positions: new Array() }

	//};


public: 
	int devicePixelRatio;

	// ----------------------------------------
	// ** 	P A R A M E T E R S
	// ----------------------------------------

	int _precision;
	bool _alpha;
	bool _premultipliedAlpha;
	bool _antialias;
	bool _stencil;
	bool _preserveDrawingBuffer;
	Color * _clearColor;
	double _clearAlpha;

	// ----------------------------------------
	// ** 	C L E A R I N G
	// ----------------------------------------

	bool autoClear;
	bool autoClearColor;
	bool autoClearDepth;
	bool autoClearStencil;

	// ----------------------------------------
	// ** 	S C E N E   G R A P H
	// ----------------------------------------

	bool sortObjects;
	bool autoUpdateObjects;
	bool autoUpdateScene;

	// ----------------------------------------
	// ** 	P H Y S I C A L   S H A D I N G
	// ----------------------------------------

	bool gammaInput;
	bool gammaOutput;
	bool physicallyBasedShading;

	// ----------------------------------------
	// ** 	S H A D O W   M A P
	// ----------------------------------------

	bool shadowMapEnabled;
	bool shadowMapAutoUpdate;
	int shadowMapType;
	int shadowMapCullFace;
	bool shadowMapDebug;
	bool shadowMapCascade;

	// ----------------------------------------
	// ** 	M O R P H S
	// ----------------------------------------

	int maxMorphTarget;
	int maxMorphNormals;

	// ----------------------------------------
	// ** 	F L A G S
	// ----------------------------------------

	bool autoScaleCubemaps;

	// ----------------------------------------
	// ** 	C U S T O M   R E N D E R   P L U G I N S
	// ----------------------------------------

	//FIXME:
	//this.renderPluginsPre = [];
	//this.renderPluginsPost = [];

	// ----------------------------------------
	// ** 	I N F O
	// ----------------------------------------

	//FIXME:

	//this.info = {

	//	memory: {
	//		programs: 0,
	//		geometries: 0,
	//		textures: 0
	//	},

	//	render: {
	//		calls: 0,
	//		vertices: 0,
	//		faces: 0,
	//		points: 0
	//	}

	//}


public: 
	WebGLRenderer ();

	void setSize ( int width, int height );
	void setViewport ( int x, int y, int width, int height );

	void setScissor ( int x, int y, int width, int height );
	void enableScissorTest ( bool enable );

	void setClearColorHex ( unsigned long hex, double alpha );
	void setClearColorRGBA ( double r, double g, double b, double alpha );
	void setClearColor ( Color * color, double alpha );

	void clear ();
	void clear ( bool color, bool depth, bool stencil );

	void render ( Scene * scene, Camera * camera, bool force );

	void initWebGLObjects ( Scene * scene );

	void initMaterial ( Material * material, Group< Light * > lights, Fog * fog, Object3D * object );
	void updateShadowMap ( Scene * scene, Camera * camera );
	void renderImmediateObject ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object );
	void setRenderTarget ( RenderTarget * renderTarget );

private:
	void createParticleBuffers ( Geometry * geometry );
	void createLineBuffers ( Geometry * geometry );
	void createRibbonBuffers ( Geometry * geometry );
	void createMeshBuffers ( GeometryGroup * group );

	void onGeometryDispose ( );
	void onTextureDispose ();
	void onRenderTargetDispose ();
	void onMaterialDispose ();

	void deallocateGeometry ( Geometry * geometry );
	void deallocateTexture ( Texture * texture );
	void deallocateRenderTarget ( RenderTarget * renderTarget );
	void deallocateMaterial ( Material * material );

	void deleteCustomAttributesBuffers ( Geometry * geometry );

	void initCustomAttributes ( Geometry * geometry, Object3D * object );

	void initParticleBuffers ( Geometry * geometry, Object3D * object );
	void initLineBuffers ( Geometry * geometry, Object3D * object );
	void initRibbonBuffers ( Geometry * geometry, Object3D * object );
	void initMeshBuffers ( GeometryGroup * group, Object3D * object );

	Material * getBufferMaterial ( Object3D * object, GeometryGroup * geometryGroup );

	bool materialNeedsSmoothNormals ( Material * material );
	int bufferGuessNormalType ( Material * material );

	Group< Color * > bufferGuessVertexColorType ( Material * material );

	bool bufferGuessUVType ( Material * material );

	void initDirectBuffers ( Geometry * geometry );

	void setParticleBuffers ( Geometry * geometry, GLuint hint, Object3D * object );
	void setLineBuffers ( Geometry * geometry, GLuint hint );
	void setRibbonBuffers ( Geometry * geometry, GLuint hint );
	void setMeshBuffers ( GeometryGroup * group, Object3D * object, GLuint hint, bool dispose, Material * material );

	void setDirectBuffers ( Geometry * geometry, GLuint hint, bool dispose );

	void renderBufferImmediate ( Object3D * object, GLuint program, Material * material );
	void renderBufferDirect ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, Geometry * geometry, Object3D * object );
	void renderBuffer ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, GeometryGroup * geometryGroup, Object3D * object );

	void enableAttribute ( GLenum attribute );
	void disableAttributes ();

	void setupMorphTargets ( Material * material, GeometryGroup * geometryGroup, Object3D * object );

	//FIXME:
	//void painterSortStable ( ) {}
	//void numericalSort ( ) {}

	//FIXME:
	//void renderPlugins () {}

	//FIXME: from char to Four::Materialtype
	void renderObjects ( Group< WebGLObject * > renderList, bool reverse, int materialType, Camera * camera,
						 Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial );

	void renderObjectsImmediate ( Group< WebGLObject * > renderList, int materialType, Camera * camera,
						 		  Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial);

	void unrollImmediateBufferMaterial ( WebGLObject * webglObject );
	void unrollBufferMaterial ( WebGLObject * webglObject );

	void sortFacesByMaterial ( Geometry * geometry, Material * material );

	void addObject ( Object3D * object, Scene * scene );
	void addBuffer ( Group<WebGLObject *> objlist, GeometryGroup * buffer, Object3D * object ) {}

	void addBufferImmediate ( Group< WebGLObject * > objlist, Object3D * object );

	void updateObject ( Object3D * object );

	bool areCustomAttributesDirty ( Material * material );;
	void clearCustomAttributes ( Material * material );;

	void removeObject ( Object3D * object, Scene * scene );

	//FIXME:
	//void removeInstances ( )
	//void removeInstancesDirect ( )

	void setMaterialShaders( Material * material, Group< Shader * > shaders );;
	GLuint setProgram ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object );




	void setDepthTest ( bool depthTest );
	void setDepthWrite ( bool depthWrite );

	void setPolygonOffset ( bool polygonOffset, double factor, double units );

	void setupMatrices ( Object3D * object, Camera * camera );

	void setBlending( int blending, int blendEquation, int blendSrc, int blendDst );




	void setCubeTexture ( Texture * texture, GLenum slot );

	void setCubeTextureDynamic ( Texture * texture, GLenum slot );

	void setupFrameBuffer ( GLuint framebuffer, RenderTarget * renderTarget, GLuint textureTarget );
	void setupRenderBuffer( GLuint renderbuffer, GLenum target );

	void updateRenderTargetMipmap ( RenderTarget * renderTarget );

	void filterFallback ( int f );

	void paramFourToGL ( int p );
	void allocateBones ( Object3D * object );

	void allocateLights ( Group< Light * > lights );
	void allocateShadows ( Group< Light * > lights );

	void initGL ();
	void setDefaultGLState ();

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************///// src/renderers/WebGLRenderer2.h
//// src/renderers/WebGLShaders.h
//// src/renderers/webgl/LowLevelRenderer.h
//// src/renderers/webgl/ShaderBuilder.h
//// src/renderers/webgl/objects/LineRenderer.h
//// src/renderers/webgl/objects/MeshRenderer.h
//// src/renderers/webgl/objects/Object3DRenderer.h
//// src/renderers/webgl/objects/ParticleRenderer.h
//// src/renderers/webgl/objects/RibbonRenderer.h
//// src/scenes/Fog.h

#ifndef COLOR_H
#define COLOR_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Color {


public:

public: 
	Color () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/scenes/FogExp2.h

#ifndef FOGEXP2_H
#define FOGEXP2_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class FogExp2 {


public:

public: 
	FogExp2 () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/scenes/Scene.h

#ifndef SCENE_H
#define SCENE_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: Scene.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Scene header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "core/Object3D.h"
#include "core/Group.h"

class Light;
class Fog;
class Material;
class Vector3;
class Geometry;
class GeometryGroup;

class WebGLObject {

public: 
	int id;
	int z;

	WebGLObject ( GeometryGroup * buff, Object3D * obj ) {

		buffer = buff;
		object = obj;
		opaque = NULL;
		transparent = NULL;
		render = false;

	}

	WebGLObject ( Object3D * obj ) {

		object = obj;
		opaque = NULL;
		transparent = NULL;
		render = false;

	}

	Material * getMaterialByType ( int type ) {

		if ( type == 3001 ) {

			//Opaque
			return opaque;

		} else if ( type == 3002 ) {

			//Transparent
			return transparent;

		}

	}

	Object3D * object;
	//CHECK: may not always be vectors
	GeometryGroup * buffer;
	Material * opaque;
	Material * transparent;
	bool render;

};

/********************************************************************
***         S C E N E   D E F I N I T I O N
********************************************************************/

class Scene : public Object3D {

public:

	Group< WebGLObject * > __webglObjects;
	Group< WebGLObject * > __webglObjectsImmediate;
	
	//FIXME:
	//Group< Sprite * > __webglObjects;
	//Group< Flare * > __webglObjects;

public:
	
	Fog * fog;
	Material * overrideMaterial;

	bool matrixAutoUpdate;

	Group< Object3D * > __objects;
	Group< Light * > __lights;

	Group< Object3D * > __objectsAdded;
	Group< Object3D * > __objectsRemoved;

public: 
	Scene();

	virtual void __addObject( Object3D * object );
	virtual void __removeObject( Object3D * object );

	virtual bool instanceOf ( int type ) {

        if ( type == 73 ) { return true; }
        return false;

    }

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************///// src/textures/CompressedTexture.h

#ifndef COMPRESSEDTEXTURE_H
#define COMPRESSEDTEXTURE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class CompressedTexture {


public:

public: 
	CompressedTexture () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/textures/DataTexture.h

#ifndef DATATEXTURE_H
#define DATATEXTURE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class DataTexture {


public:

public: 
	DataTexture () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/textures/Texture.h

#ifndef TEXTURE_H
#define TEXTURE_H

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


// --------------------------------------------------------------------
// ***        C O L O R
// --------------------------------------------------------------------

class Texture {


public:

public: 
	Texture () {}

};

// --------------------------------------------------------------------
// ***         E N D   O F   F I L E
// --------------------------------------------------------------------

#endif 
//// src/library.h
class Four {

public:
	int GeometryIdCount;
	int ObjectIdCount;
	int MaterialIdCount;

	// --------------------------------------------------
	// ** 	G L   S T A T E   C O N S T A N T S
	// --------------------------------------------------

	static int const CullFaceNone = 0;
	static int const CullFaceBack = 1;
	static int const CullFaceFront = 2;
	static int const CullFaceFrontBack = 3;

	static int const FrontFaceDirectionCW = 0;
	static int const FrontFaceDirectionCCW = 1;

	// --------------------------------------------------
	// ** 	S H A D O W I N G   T Y P E S
	// --------------------------------------------------

	static int const BasicShadowMap = 0;
	static int const PCFShadowMap = 1;
	static int const PCFSoftShadowMap = 2;

	// --------------------------------------------------
	// ** 	M A T E R I A L   C O N S T A N T S
	// --------------------------------------------------

	static int const FrontSide = 0;
	static int const BackSide = 1;
	static int const DoubleSide = 2;

	static int const NoShading = 0;
	static int const FlatShading = 1;
	static int const SmoothShading = 2;

	static int const NoColors = 0;
	static int const FaceColors = 1;
	static int const VertexColors = 2;

	static int const NoBlending = 0;
	static int const NormalBlending = 1;
	static int const AdditiveBlending = 2;
	static int const SubtractiveBlending = 3;
	static int const MultiplyBlending = 4;
	static int const CustomBlending = 5;

	static int const AddEquation = 100;
	static int const SubtractEquation = 101;
	static int const ReverseSubtractEquation = 102;

	static int const ZeroFactor = 200;
	static int const OneFactor = 201;
	static int const SrcColorFactor = 202;
	static int const OneMinusSrcColorFactor = 203;
	static int const SrcAlphaFactor = 204;
	static int const OneMinusSrcAlphaFactor = 205;
	static int const DstAlphaFactor = 206;
	static int const OneMinusDstAlphaFactor = 207;

	static int const MultiplyOperation = 0;
	static int const MixOperation = 1;
	static int const AddOperation = 2;

	//FIXME:
	//THREE.UVMapping = function () {};

	//THREE.CubeReflectionMapping = function () {};
	//THREE.CubeRefractionMapping = function () {};

	//THREE.SphericalReflectionMapping = function () {};
	//THREE.SphericalRefractionMapping = function () {};

	static int const RepeatWrapping = 1000;
	static int const ClampToEdgeWrapping = 1001;
	static int const MirroredRepeatWrapping = 1002;

	static int const NearestFilter = 1003;
	static int const NearestMipMapNearestFilter = 1004;
	static int const NearestMipMapLinearFilter = 1005;
	static int const LinearFilter = 1006;
	static int const LinearMipMapNearestFilter = 1007;
	static int const LinearMipMapLinearFilter = 1008;

	static int const UnsignedByteType = 1009;
	static int const ByteType = 1010;
	static int const ShortType = 1011;
	static int const UnsignedShortType = 1012;
	static int const IntType = 1013;
	static int const UnsignedIntType = 1014;
	static int const FloatType = 1015;

	static int const UnsignedShort4444Type = 1016;
	static int const UnsignedShort5551Type = 1017;
	static int const UnsignedShort565Type = 1018;

	static int const AlphaFormat = 1019;
	static int const RGBFormat = 1020;
	static int const RGBAFormat = 1021;
	static int const LuminanceFormat = 1022;
	static int const LuminanceAlphaFormat = 1023;

	// Compressed texture formats

	static int const RGB_S3TC_DXT1_Format = 2001;
	static int const RGBA_S3TC_DXT1_Format = 2002;
	static int const RGBA_S3TC_DXT3_Format = 2003;
	static int const RGBA_S3TC_DXT5_Format = 2004;

	static int const Opaque = 3001;
	static int const Transparent = 3001;


	static Four& get() {

		static Four instance;

		return instance;

	}

private:
	Four(){ GeometryIdCount = 0; ObjectIdCount = 0; MaterialIdCount = 0; }

	Four( Four const & );
	void operator=( Four const& );

};

class ClassType {

public:
	ClassType() {};

	// --------------------------------------------------
	// ** 	C A M E R A S
	// --------------------------------------------------

	static int const Camera = 1;
	static int const OrthographicCamera = 2;
	static int const PerspectiveCamera = 3;

	// --------------------------------------------------
	// ** 	C O R E
	// --------------------------------------------------

	static int const BufferGeometry = 4;
	static int const Clock = 5;
	static int const EventDispatcher = 6;
	static int const Face3 = 7;
	static int const Face4 = 8;
	static int const Geometry = 9;
	static int const Object3D = 10;
	static int const Projector = 11;
	static int const Raycaster = 12;

	// --------------------------------------------------
	// ** 	E X T R A S
	// --------------------------------------------------

	// --------------------------------------------------
	// ** 	L I G H T S
	// --------------------------------------------------

	static int const AmbientLight = 13;
	static int const AreaLight = 14;
	static int const DirectionalLight = 15;
	static int const HemisphereLight = 16;
	static int const Light = 17;
	static int const PointLight = 18;
	static int const SpotLight = 19;

	// --------------------------------------------------
	// ** 	L O A D E R S
	// --------------------------------------------------

	static int const ImageLoader = 20;
	static int const JSONLoader = 21;
	static int const Loader = 22;
	static int const LoadingMonitor = 23;
	static int const SceneLoader = 24;
	static int const TextureLoader = 25;

	// --------------------------------------------------
	// ** 	M A T E R I A L S
	// --------------------------------------------------

	static int const LineBasicMaterial = 26;
	static int const LineDashedMaterial = 27;
	static int const Material = 28;
	static int const MeshBasicMaterial = 29;
	static int const MeshDepthMaterial = 30;
	static int const MeshFaceMaterial = 31;
	static int const MeshLambertMaterial = 32;
	static int const MeshNormalMaterial = 33;
	static int const MeshPhongMaterial = 34;
	static int const ParticleBasicMaterial = 35;
	static int const ParticleCanvasMaterial = 36;
	static int const ShaderMaterial = 37;
	static int const SpriteMaterial = 38;

	// --------------------------------------------------
	// ** 	M A T H 
	// --------------------------------------------------

	static int const Box2 = 39;
	static int const Box3 = 40;
	static int const Color = 41;
	static int const Frustum = 42;
	static int const Line3 = 43;
	static int const Matrix3 = 44;
	static int const Matrix4 = 45;
	static int const Plane = 46;
	static int const Quaternion = 47;
	static int const Ray = 48;
	static int const Sphere = 49;
	static int const Spline = 50;
	static int const Triangle = 51;
	static int const UV = 52;
	static int const Vector2 = 53;
	static int const Vector3 = 54;
	static int const Vector4 = 55;
	static int const Vertex = 56;

	// --------------------------------------------------
	// ** 	O B J E C T S
	// --------------------------------------------------

	static int const Bone = 57;
	static int const LOD = 58;
	static int const Line = 59;
	static int const Mesh = 60;
	static int const MorphAnimMesh = 61;
	static int const Particle = 62;
	static int const ParticleSystem = 63;
	static int const Ribbon = 64;
	static int const SkinnedMesh = 65;
	static int const Sprite = 66;

	// --------------------------------------------------
	// ** 	R E N D E R E R S
	// --------------------------------------------------

	static int const CanvasRenderer = 67;
	static int const WebGLRenderTarget = 68;
	static int const WebGLRenderTargetCube = 69;
	static int const WebGLRenderer = 70;

	// --------------------------------------------------
	// ** 	S C E N E S
	// --------------------------------------------------

	static int const Fog = 71;
	static int const FogExp2 = 72;
	static int const Scene = 73;

	// --------------------------------------------------
	// ** 	T E X T U R E S
	// --------------------------------------------------

	static int const CompressedTexture = 74;
	static int const DataTexture = 75;
	static int const Texture = 76;

};
