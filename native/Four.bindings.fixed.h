//// native/math/Box.h

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

//// native/math/Color.h

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
//// native/math/Frustum.h
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
#endif //// native/math/Line3.h
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
#endif //// native/math/Math.h
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
#endif //// native/math/Matrix.h

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
//// native/math/Plane.h
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
#endif //// native/math/Quaternion.h
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
#endif //// native/math/Ray.h
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

#endif //// native/math/Sphere.h
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
#endif //// native/math/Spline.h

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
//// native/math/Triangle.h

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
//// native/math/UV.h

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
//// native/math/Vector.h

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
********************************************************************///// native/math/Vertex.h

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
