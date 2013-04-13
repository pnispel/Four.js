
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
********************************************************************/