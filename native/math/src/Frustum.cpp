#include "../Frustum.h"
#include "../Plane.h"
#include "../Matrix.h"
#include "../Vector.h"
#include "../Sphere.h"
//#include "../../core/Object3D.h"

Frustum::Frustum () {

	planes[0] = new Plane();
	planes[1] = new Plane();
	planes[2] = new Plane();
	planes[3] = new Plane();
	planes[4] = new Plane();
	planes[5] = new Plane();

}

Frustum::Frustum( Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 ) {

	planes[0] = p0;
	planes[1] = p1;
	planes[2] = p2;
	planes[3] = p3;
	planes[4] = p4;
	planes[5] = p5;

}

Frustum * Frustum::set( Plane * p0, Plane * p1, Plane * p2, Plane * p3, Plane * p4, Plane * p5 ) {

	planes[0] = p0;
	planes[1] = p1;
	planes[2] = p2;
	planes[3] = p3;
	planes[4] = p4;
	planes[5] = p5;

	return this;

}

Frustum * Frustum::copy ( Frustum * other ) {

	for ( int i = 0; i < 6; i++ ) {

		planes[i]->copy( other->planes[i] );

	}

	return this;

}

Frustum * Frustum::setFromMatrix ( Matrix4 * m ) {

	double * me = m->data;

	double me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
	double me4 = me[0], me5 = me[1], me6 = me[2], me7 = me[3];
	double me8 = me[0], me9 = me[1], me10 = me[2], me11 = me[3];
	double me12 = me[0], me13 = me[1], me14 = me[2], me15 = me[3];

	planes[ 0 ]->setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 )->normalize();
	planes[ 1 ]->setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 )->normalize();
	planes[ 2 ]->setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 )->normalize();
	planes[ 3 ]->setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 )->normalize();
	planes[ 4 ]->setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 )->normalize();
	planes[ 5 ]->setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 )->normalize();

	return this;

}

//TODO: implement
bool Frustum::intersectsObject ( Object3D * object ) {

	/*Vector3 * center = new Vector3();

	Matrix4 * matrix = object->matrixWorld;
	double negRadius = - object->geometry->boundingSphere->radius * matrix->getMaxScaleOnAxis();

	center->getPositionFromMatrix( matrix );

	for ( int i = 0; i < 6; i++ ) {

		double distance = planes[i]->distanceToPoint( center );

		if ( distance < negRadius ) {

			return false;

		}

	}*/

	return true;
}

//TODO: implement
bool Frustum::intersectsSphere ( Sphere * sphere ) {

	Vector3 * center = sphere->center;
	double negRadius = -sphere->radius;

	for ( int i = 0; i < 6; i++ ) {

		double distance = planes[i]->distanceToPoint( center );

		if ( distance < negRadius ) {

			return false;

		}

	}

	return true;
}

//TODO: implement
bool Frustum::containsPoint ( Vector3 * point ) {

	for ( int i = 0; i < 6; i++ ) {

		if ( planes[i]->distanceToPoint( point ) < 0 ) {

			return false;

		}

	}
	
	return true;
}

Frustum * Frustum::clone () {
	
	Frustum * ret = new Frustum();
	return ret->copy( this );

}

