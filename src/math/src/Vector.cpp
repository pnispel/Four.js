
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Vector.cpp
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Vector2, Vector3 and Vector4 source files
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
#include "../Vector.h"
#include "../Matrix.h"
#include "../Quaternion.h"

/********************************************************************
***         V E C T O R 2    I M P L E M E N T A T I O N
********************************************************************/

Vector2::Vector2 () : x(0), y(0) {}
Vector2::Vector2 ( double vx, double vy) : x(vx), y(vy) {}

/********************************************************************
***         V E C T O R 3    I M P L E M E N T A T I O N
********************************************************************/

Vector3::Vector3 () : x(0), y(0), z(0) {}
Vector3::Vector3 ( double vx, double vy, double vz) : x(vx), y(vy), z(vz)  {}

double Vector3::get ( int index ) {

	switch ( index ) {

		case 0: return x; break;
		case 1: return y; break;
		case 2: return z; break;
		//TODO: throw an error;

	}

	return 0;

}

//----------------------------------------------------------------//

Vector3 * Vector3::add ( Vector3 * vector ) {

	this->x += vector->x;
	this->y += vector->y;
	this->z += vector->z;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::sub ( Vector3 * vector ) {

	this->x -= vector->x;
	this->y -= vector->y;
	this->z -= vector->z;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::addVectors ( Vector3 * a, Vector3 * b ) {

	x = a->x + b->x;
	y = a->y + b->y;
	z = a->z + b->z;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::subVectors ( Vector3 * a, Vector3 * b ) {

	x = a->x - b->x;
	y = a->y - b->y;
	z = a->z - b->z;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::multiplyVectors ( Vector3 * a, Vector3 * b ) {

	x = a->x * b->x;
	y = a->y * b->y;
	z = a->z * b->z;

	return this;

}

//----------------------------------------------------------------//


Vector3 * Vector3::applyMatrix3 ( Matrix3 * m ) {

	double vx = x;
	double vy = y;
	double vz = z;

	double * e = m->data;

	x = e[0] * vx + e[3] * vy + e[6] * vz;
	y = e[1] * vx + e[4] * vy + e[7] * vz;
	z = e[2] * vx + e[5] * vy + e[8] * vz;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::applyMatrix4 ( Matrix4 * m ) {

	double vx = x;
	double vy = y;
	double vz = z;

	double * e = m->data;

	x = e[0] * vx + e[4] * vy + e[8] * vz + e[12];
	y = e[1] * vx + e[5] * vy + e[9] * vz + e[13];
	z = e[2] * vx + e[6] * vy + e[10] * vz + e[14];

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::applyProjection ( Matrix4 * m ) {

	double vx = x;
	double vy = y;
	double vz = z;

	double * e = m->data;
	double d = 1 / ( e[3] * vx + e[7] * vy + e[11] * z + e[15] );

	x = ( e[0] * vx + e[4] * vy + e[8] * vz + e[12] ) * d;
	y = ( e[1] * vx + e[5] * vy + e[9] * vz + e[13] ) * d;
	z = ( e[2] * vx + e[6] * vy + e[10] * vz + e[14] ) * d;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::applyQuaternion ( Quaternion * q ) {

	double vx = x;
	double vy = y;
	double vz = z;

	double qx = q->x;
	double qy = q->y;
	double qz = q->z;
	double qw = q->w;

	double ix = qw * vx + qy * vz - qz * vy;
	double iy = qw * vy + qy * vx - qz * vz;
	double iz = qw * vz + qy * vy - qz * vx;
	double iw = -qw * vx - qy * vy - qz * vz;

	x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::addScalar ( double scalar ) {

	this->x += scalar;
	this->y += scalar;
	this->z += scalar;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::multiplyScalar ( double scalar ) {

	x *= scalar;
	y *= scalar;
	z *= scalar;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::divideScalar ( double s ) {

	if ( s != 0 ) {

		x /= s;
		y /= s;
		z /= s;

	} else {

		x = 0;
		y = 0;
		z = 0;

	}

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::multiply ( Vector3 * vector ) {

	this->x *= vector->x;
	this->y *= vector->y;
	this->z *= vector->z;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::divide ( Vector3 * v ) {

	x /= v->x;
	y /= v->y;
	z /= v->z;

	return this;

}

//----------------------------------------------------------------//


Vector3 * Vector3::transformDirection ( Matrix4 * m ) {

	double vx = x;
	double vy = y;
	double vz = z;

	double * e = m->data;

	x = e[0] * vx + e[4] * vy + e[8] * vz;
	x = e[1] * vx + e[5] * vy + e[9] * vz;
	x = e[2] * vx + e[6] * vy + e[10] * vz;

	normalize();

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::min ( Vector3 * v ) {

	if ( x > v->x ) {

		x = v->x;

	}

	if ( y > v->y ) {

		y = v->y;

	}

	if ( z > v->z ) {

		z = v->z;

	}

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::max ( Vector3 * v ) {

	if ( x < v->x ) {

		x = v->x;

	}

	if ( y < v->y ) {

		y = v->y;

	}

	if ( z < v->z ) {

		z = v->z;

	}

	return this;

}

//----------------------------------------------------------------//


Vector3 * Vector3::clamp ( Vector3 * min, Vector3 * max ) {

	if ( x < min->x ) {

		x = min->x;

	} else if ( x > max->x ) {

		x = max->x;

	}

	if ( y < min->y ) {

		y = min->y;

	} else if ( y > max->y ) {

		y = max->y;

	}

	if ( z < min->z ) {

		z = min->z;

	} else if ( z > max->z ) {

		z = max->z;

	}

	return this;

}

//----------------------------------------------------------------//


Vector3 * Vector3::negate () {

	return multiplyScalar( -1.000 );

}

//----------------------------------------------------------------//


double Vector3::dot ( Vector3 * v ) {

	return x * v->x + y * v->y + z * v->z;

}

//----------------------------------------------------------------//

double Vector3::lengthSquared () {

	return x * x + y * y + z * z;

}

//----------------------------------------------------------------//

double Vector3::length () {

	return sqrt( x * x + y * y + z * z );

}

//----------------------------------------------------------------//

double Vector3::lengthManhattan () {

	return fabs( x ) + fabs( y ) + fabs( z );

}

//----------------------------------------------------------------//

Vector3 * Vector3::normalize () {

	return divideScalar( length() );

}

//----------------------------------------------------------------//

Vector3 * Vector3::setLength ( double l ) {

	double oldLength = length();

	if ( oldLength != 0 && oldLength != l ) {

		multiplyScalar( l / oldLength );

	}

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::lerp ( Vector3 * v, double alpha ) {

	x += ( v->x - x ) * alpha;
	y += ( v->y - y ) * alpha;
	z += ( v->z - z ) * alpha;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::cross ( Vector3 * v ) {

	double vx = x;
	double vy = y;
	double vz = z;

	x = vy * v->z - vz * v->y;
	y = vz * v->x - vx * v->z;
	z = vx * v->y - vy * v->x;

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::crossVectors ( Vector3 * a, Vector3 * b ) {

	x = a->y * b->z - a->z * b->y;
	y = a->z * b->x - a->x * b->z;
	z = a->x * b->y - a->y * b->x;

	return this;

}

//----------------------------------------------------------------//

//TODO: implement

/*double Vector3::angleTo ( Vector3 * v ) {

	double theta = dot( v ) / ( length() * v->length() );

	return acos( )

}*/

//----------------------------------------------------------------//

double Vector3::distanceTo ( Vector3 * v ) {

	return sqrt( distanceToSquared( v ) );

}

//----------------------------------------------------------------//

double Vector3::distanceToSquared ( Vector3 * v ) {

	double dx = x - v->x;
	double dy = y - v->y;
	double dz = z - v->z;

	return dx * dx + dy * dy + dz * dz;

}

//----------------------------------------------------------------//

Vector3 * Vector3::getPositionFromMatrix( Matrix4 * m ) {

	x = m->data[12];
	y = m->data[13];
	z = m->data[14];

	return this;

}

//----------------------------------------------------------------//

Vector3 * Vector3::getScaleFromMatrix( Matrix4 * m ) {

	double sx = set( m->data[0], m->data[1], m->data[2] )->length();
	double sy = set( m->data[4], m->data[5], m->data[6] )->length();
	double sz = set( m->data[8], m->data[9], m->data[10] )->length();

	x = sx;
	y = sy;
	z = sz;

	return this;

}

//----------------------------------------------------------------//

bool Vector3::equals ( Vector3 * v ) {

	if ( v->x == x && v->y == y && v->z == z ) {

		return true;
		
	}

	return false;

}

//----------------------------------------------------------------//

Vector3 * Vector3::clone () {

	Vector3 * clone = new Vector3();
	clone->x = this->x;
	clone->y = this->y;
	clone->z = this->z;

	return clone;

}

//----------------------------------------------------------------//

Vector3 * Vector3::copy ( Vector3 * vector ) {

	this->x = vector->x;
	this->y = vector->y;
	this->z = vector->z;

	return this;

}

/********************************************************************
***         V E C T O R 4    I M P L E M E N T A T I O N
********************************************************************/


/********************************************************************
***         E N D    O F    F I L E
********************************************************************/
