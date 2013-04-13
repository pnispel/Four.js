#include "../Box.h"
#include "../Vector.h"
#include "../Matrix.h"
#include "../Sphere.h"


extern "C" {
	extern void _PtrToDwordArray( void * ptr, size_t size );
	extern double Infinity();
}

/*
Box2::Box2( Vector2 * minVec, Vector2 * maxVec ) 
	: min( minVec )
	, max( maxVec ) {}

Box2::Box2() 
	: min( new Vector2( Infinity(), Infinity() ) )
	, max( new Vector2( -Infinity(), -Infinity() ) ) {}

Box2 * Box2::set ( Vector2 * minVec, Vector2 * maxVec ) { 

	min->copy( minVec );
	max->copy( maxVec );

	this; 
}

Box2 * Box2::setFromPoints ( void ** points ) { 
//Box2 * Box2::setFromPoints ( const float * points ) { 

	//int length = (int)points[0];
	//printf("%d\n", arrayPointerToInt( points[1] ));
	//_PtrToDwordArray(points, 4);
	//Vector3 * i = (Vector2 *) points[1];
	//Vector3 * j = (Vector3 *) points[2];
	//Vector3 * k = (Vector3 *) points[3];
	//printf("x is equal %lf\n", i->x);
	int length = (int)points[0];
	//printf("x pointer is equal %lf\n", points[1]->x);
	if ( length > 0 ) {

		Vector2 * point = (Vector2 *) points[1];
		max->copy( point );
		min->copy( point );

		for ( int i = 2; i < length + 1; i++ ) {

			point = (Vector2 *) points[i];

			if ( point->x < min->y ) {

				min->x = point->x;

			} else if ( point->x > max->x ) {

				max->x = point->x;

			}

			if ( point->y < min->y ) {

				min->y = point->y;

			} else if ( point->y > max->y ) {

				max->y = point->y;

			}

		}

	} else {

		makeEmpty();

	}

	return this; 
}

Box2 * Box2::setFromCenterAndSize ( Vector2 * center, Vector2 * size ){ 

	Vector2 * v1 = new Vector2();

	Vector2 * halfSize = v1->copy( size )->multiplyScalar( 0.5 );
	min->copy( center )->sub( halfSize );
	max->copy( center )->add( halfSize );

	return this; 

}

Box2 * Box2::copy ( Box2 * other ){ 

	min->copy( other->min );
	max->copy( other->max );

	return this; 

}

Box2 * Box2::makeEmpty (){ 

	min->x = min->y = Infinity();
	max->x = max->y = -Infinity();
	return this; 

}

bool Box2::empty (){ 

	return ( max->x < min->x ) || ( max->y < min->y ); 

}

Vector2 * Box2::center( Vector2 * target = new Vector2 ) {

	return target->addVectors( max, min )->multiplyScalar( 0.5 );

}

Vector2 * Box2::size ( Vector2 * target = new Vector2 ) {

	return target->subVectors( max, min );

}

Box2 * Box2::expandByPoint ( Vector2 * point ) {

	min->min( point );
	max->max( point );

	return this;

}

Box2 * Box2::expandByVector ( Vector2 * vector ) {

	min->sub( vector );
	max->add( vector );

	return this;

}

Box2 * Box2::expandByScalar ( double scalar ) {

	min->addScalar( -scalar );
	max->addScalar( scalar );

	return this;

}

bool Box2::containsPoint ( Vector2 * point ) {

	if ( point->x < min->x || point->x > max->x ||
		 point->y < min->y || point->y > max->y ) {

		return false;

	}

	return true;

}

bool Box2::containsBox ( Box2 * box ) {

	if ( ( min->x <= box->min->x ) && ( box->max->x <= max->x ) &&
		 ( min->y <= box->min->y ) && ( box->max->y <= max->y ) ) {

		return true;

	}

	return false;

}

Vector2 * Box2::getParameter ( Vector2 * point ) {

	return new Vector2(
		( point->x - min->x ) / ( max->x - min->x ),
		( point->y - min->y ) / ( max->y - min->y )
	);

} 

bool Box2::isIntersectionBox ( Box2 * box ) {

	if ( box->max->x < min->x || box->min->x > max->x ||
		 box->max->y < min->y || box->min->y > max->y ) {

		return false;

	}

	return true;

}

Vector2 * Box2::clampPoint ( Vector2 * point, Vector2 * optionalTarget = new Vector2 ) {

	return optionalTarget->copy( point )->clamp( min, max );

}

double Box2::distanceToPoint ( Vector2 * point ) {

	Vector2 * v1 = new Vector2();

	Vector2 * clampedPoint = v1->copy( point )->clamp( min, max );
	return clampedPoint->sub( point )->length();

}

Box2 * Box2::intersect ( Box2 * box ) {

	min->max( box->min );
	max->min( box->max );

	return this;

}

Box2 * Box2::union ( Box2 * box ) {

	min->min( box->min );
	max->max( box->max );

	return this;

}

Box2 * Box2::translate ( Vector2 * offset ) {

	min->add( offset );
	max->add( offset );

	return this;

}

bool Box2::equals ( Box2 * box ) {

	return box->min->equals( min ) && box->max->equals( max );

}

Box2 * Box2::clone () {

	Box2 * clone = new Box2();

	return clone->copy( this );

}
*/
/********************************************************************
***         B O X 3   I M P L E M E N T A T I O N
********************************************************************/

Box3::Box3( Vector3 * minVec, Vector3 * maxVec ) 
	: min( minVec )
	, max( maxVec ) {}

Box3::Box3() 
	: min( new Vector3( Infinity(), Infinity(), Infinity() ) )
	, max( new Vector3( -Infinity(), -Infinity(), -Infinity() ) ) {}

Box3 * Box3::set ( Vector3 * minVec, Vector3 * maxVec ) { 

	min->copy( minVec );
	max->copy( maxVec );

	return this; 
}

Box3 * Box3::setFromPoints ( void ** points ) { 

	int length = (int)points[0];

	if ( length > 0 ) {

		Vector3 * point = (Vector3 *) points[1];
		max->copy( point );
		min->copy( point );

		for ( int i = 2; i < length + 1; i++ ) {

			point = (Vector3 *) points[i];

			if ( point->x < min->y ) {

				min->x = point->x;

			} else if ( point->x > max->x ) {

				max->x = point->x;

			}

			if ( point->y < min->y ) {

				min->y = point->y;

			} else if ( point->y > max->y ) {

				max->y = point->y;

			}

			if ( point->z < min->z ) {

				min->z = point->z;

			} else if ( point->z > max->z ) {

				max->z = point->z;

			}

		}

	} else {

		makeEmpty();

	}

	return this; 
}

Box3 * Box3::setFromCenterAndSize ( Vector3 * center, Vector3 * size ){ 

	Vector3 * v1 = new Vector3();

	Vector3 * halfSize = v1->copy( size )->multiplyScalar( 0.5 );

	min->copy( center )->sub( halfSize );
	max->copy( center )->add( halfSize );

	return this; 

}

Box3 * Box3::copy ( Box3 * other ){ 

	min->copy( other->min );
	max->copy( other->max );

	return this; 

}

Box3 * Box3::makeEmpty (){ 

	min->x = min->y = min->z = Infinity();
	max->x = max->y = max->z = -Infinity();

	return this; 

}

bool Box3::empty (){ 

	return ( max->x < min->x ) || ( max->y < min->y ) || ( max->z < min->z ); 

}

Vector3 * Box3::center( Vector3 * target = new Vector3 ) {

	return target->addVectors( max, min )->multiplyScalar( 0.5 );

}

Vector3 * Box3::size ( Vector3 * target = new Vector3 ) {

	return target->subVectors( max, min );

}

Box3 * Box3::expandByPoint ( Vector3 * point ) {

	min->min( point );
	max->max( point );

	return this;

}

Box3 * Box3::expandByVector ( Vector3 * vector ) {

	min->sub( vector );
	max->add( vector );

	return this;

}

Box3 * Box3::expandByScalar ( double scalar ) {

	min->addScalar( -scalar );
	max->addScalar( scalar );

	return this;

}

bool Box3::containsPoint ( Vector3 * point ) {

	if ( point->x < min->x || point->x > max->x ||
		 point->y < min->y || point->y > max->y ||
		 point->z < min->z || point->z > max->z ) {

		return false;

	}

	return true;

}

bool Box3::containsBox ( Box3 * box ) {

	if ( ( min->x <= box->min->x ) && ( box->max->x <= max->x ) &&
		 ( min->y <= box->min->y ) && ( box->max->y <= max->y ) &&
		 ( min->z <= box->min->z ) && ( box->max->z <= max->z ) ) {

		return true;

	}

	return false;

}

Vector3 * Box3::getParameter ( Vector3 * point ) {

	return new Vector3(
		( point->x - min->x ) / ( max->x - min->x ),
		( point->y - min->y ) / ( max->y - min->y ),
		( point->z - min->z ) / ( max->z - min->z )
	);

} 

bool Box3::isIntersectionBox ( Box3 * box ) {

	if ( box->max->x < min->x || box->min->x > max->x ||
		 box->max->y < min->y || box->min->y > max->y || 
		 box->max->z < min->z || box->min->z > max->z  ) {

		return false;

	}

	return true;

}

Vector3 * Box3::clampPoint ( Vector3 * point, Vector3 * optionalTarget = new Vector3 ) {

	return optionalTarget->copy( point )->clamp( min, max );

}

double Box3::distanceToPoint ( Vector3 * point ) {

	Vector3 * v1 = new Vector3();

	Vector3 * clampedPoint = v1->copy( point )->clamp( min, max );
	return clampedPoint->sub( point )->length();

}

Sphere * Box3::getBoundingSphere ( Sphere * optionalTarget = new Sphere ) {

	Vector3 * v1 = new Vector3();

	optionalTarget->center = center();
	optionalTarget->radius = size( v1 )->length() * 0.5;

	return optionalTarget;

}

Box3 * Box3::intersect ( Box3 * box ) {

	min->max( box->min );
	max->min( box->max );

	return this;

}

/*Box3 * Box3::union ( Box3 * box ) {

	min->min( box->min );
	max->max( box->max );

	return this;

}*/

Box3 * Box3::translate ( Vector3 * offset ) {

	min->add( offset );
	max->add( offset );

	return this;

}

Box3 * Box3::applyMatrix4 ( Matrix4 * matrix ) {

	Vector3 * points[] = {

		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3(),
		new Vector3()

	};

	points[0]->set( min->x, min->y, min->z )->applyMatrix4( matrix ); // 000
	points[1]->set( min->x, min->y, max->z )->applyMatrix4( matrix ); // 001
	points[2]->set( min->x, max->y, min->z )->applyMatrix4( matrix ); // 010
	points[3]->set( min->x, max->y, max->z )->applyMatrix4( matrix ); // 011
	points[4]->set( max->x, min->y, min->z )->applyMatrix4( matrix ); // 100
	points[5]->set( max->x, min->y, max->z )->applyMatrix4( matrix ); // 101
	points[6]->set( max->x, max->y, min->z )->applyMatrix4( matrix ); // 110
	points[7]->set( max->x, max->y, max->z )->applyMatrix4( matrix );  // 111

	makeEmpty();
	setFromPoints( (void **)points );

	return this;

}

bool Box3::equals ( Box3 * box ) {

	return box->min->equals( min ) && box->max->equals( max );

}

Box3 * Box3::clone () {

	Box3 * clone = new Box3();

	return clone->copy( this );

}


