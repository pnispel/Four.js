
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Matrix.cpp
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Matrix3 and Matrix4 source files
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "../Plane.h"
#include "../Vector.h"
#include "../Matrix.h"
#include "../Line3.h"
#include "../Sphere.h"

Plane::Plane( Vector3 * n, double c ) 
	: normal( n )
	, constant( c )
	{}

Plane::Plane() 
	: normal( new Vector3 )
	, constant( 0 )
	{}

//----------------------------------------------------------------//

Plane * Plane::set ( Vector3 * normal, double constant ) {

	normal->copy( normal );
	constant = constant;

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::setComponents ( double x, double y, double z, double w ) {

	normal->set( x, y, z );
	constant = w;

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::setFromNormalAndCoplanerPoint ( Vector3 * normal, Vector3 * point ) {

	normal->copy( normal );
	constant = -point->dot( normal );

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::setFromCoplanerPoints ( Vector3 * a, Vector3 * b, Vector3 * c ) {

	Vector3 * v1 = new Vector3();
	Vector3 * v2 = new Vector3();

	Vector3 * norm = v1->subVectors( c, b )->cross( v2->subVectors( a, b ) )->normalize();

	setFromNormalAndCoplanerPoint( norm, a );

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::copy ( Plane * p ) {

	normal->copy( p->normal );
	constant = p->constant;

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::normalize () {

	double inv = 1.0 / normal->length();
	normal->multiplyScalar( inv );
	constant *= inv;

	return this;

}

//----------------------------------------------------------------//

Plane * Plane::negate () {

	constant *= -1;
	normal->negate();

	return this;
}

//----------------------------------------------------------------//

double Plane::distanceToPoint ( Vector3 * point ) {

	return normal->dot( point ) + constant;

}

//----------------------------------------------------------------//

double Plane::distanceToSphere ( Sphere * sphere ) {

	return distanceToPoint( sphere->getCenter() );

}

//----------------------------------------------------------------//

Vector3 * Plane::projectPoint ( Vector3 * point ) {

	return orthoPoint( point )->sub( point )->negate();
}

//----------------------------------------------------------------//

Vector3 * Plane::orthoPoint ( Vector3 * point ) {

	double perp = distanceToPoint( point );

	Vector3 * result = new Vector3();

	return result->copy( normal )->multiplyScalar( perp );

}

//----------------------------------------------------------------//

bool Plane::isIntersectionLine ( Line3 * line ) {

	double startSign = distanceToPoint( line->start );
	double endSign = distanceToPoint( line->end );

	return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

}

//----------------------------------------------------------------//

Vector3 * Plane::intersectLine ( Line3 * line ) {

	Vector3 * v1 = new Vector3();
	Vector3 * ret = new Vector3();

	Vector3 * direction = line->delta( v1 );

	double denominator = normal->dot( direction );

	if ( denominator == 0 ) {

		if ( distanceToPoint( line->start ) ) {

			return ret->copy( line->end );

		}

		return NULL;

	}

	double t = - ( line->start->dot( normal ) + constant ) / denominator;

	if ( t < 0 || t > 1 ) {

		return NULL;

	}

	return ret->copy( direction )->multiplyScalar( t )->add( line->start );
}

//----------------------------------------------------------------//

Vector3 * Plane::coplanerPoint () {

	Vector3 * ret = new Vector3();
	return ret->copy( normal )->multiplyScalar( -constant );

}

//----------------------------------------------------------------//


Plane * Plane::applyMatrix4 ( Matrix4 * matrix ) {

	Vector3 * v1 = new Vector3();

	//FIXME: supposed to be Matrix3
	Matrix4 * norm = new Matrix4();
	norm->copy( matrix )->invert()->transpose();

	//FIXME: supposed to be Matrix3
	Vector3 * newNormal = v1->copy( normal )->applyMatrix4( norm );

	Vector3 * newPoint = coplanerPoint();
	newPoint->applyMatrix4( matrix );

	setFromNormalAndCoplanerPoint( newNormal, newPoint );

	return this;
}

//----------------------------------------------------------------//

Plane * Plane::translate ( Vector3 * offset ) {

	constant -= offset->dot( normal );

	return this;
}

//----------------------------------------------------------------//

bool Plane::equals ( Plane * plane ) {

	return plane->normal->equals( normal ) && ( plane->constant == constant );

}

//----------------------------------------------------------------//

Plane * Plane::clone () {

	Plane * ret = new Plane();

	return ret->copy( this );

}


/********************************************************************
***         E N D    O F    F I L E
********************************************************************/
