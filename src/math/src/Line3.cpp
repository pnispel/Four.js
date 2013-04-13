#include "../Line3.h"
#include "../Vector.h"
#include "../Matrix.h"
#include "../Math.h"

Line3::Line3() 
	: start( new Vector3 ), end( new Vector3 ) {}

Line3::Line3( Vector3 * startVec, Vector3 * endVec ) 
	: start( startVec ), end( endVec ) {}

Line3 * Line3::set ( Vector3 * s, Vector3 * e ) {

	start->copy( s );
	end->copy( e );

	return this;

}

//----------------------------------------------------------------//

Line3 * Line3::copy ( Line3 * line ) {

	start->copy( line->start );
	end->copy( line->end );

	return this;

}

//----------------------------------------------------------------//

Vector3 * Line3::center ( Vector3 * optionalTarget = new Vector3 ) {

	return optionalTarget->addVectors( start, end )->multiplyScalar( 0.5 );

}

//----------------------------------------------------------------//

Vector3 * Line3::delta ( Vector3 * optionalTarget = new Vector3 ) {

	return optionalTarget->subVectors( end, start );

}

//----------------------------------------------------------------//

double Line3::distanceSquared () {

	return start->distanceToSquared( end );

}

//----------------------------------------------------------------//

double Line3::distance () {

	return start->distanceTo( end );

}

//----------------------------------------------------------------//

Vector3 * Line3::at ( double t, Vector3 * optionalTarget = new Vector3 ) {

	return delta( optionalTarget )->multiplyScalar( t )->add( start );

}

//----------------------------------------------------------------//

double Line3::closestPointToPointParameter ( Vector3 * point, bool clampToLine = false ) {

	Vector3 * startP = new Vector3();
	Vector3 * startEnd = new Vector3();

	startP->subVectors( point, start );
	startEnd->subVectors( end, start );

	double startEnd2 = startEnd->dot( startEnd );
	double startEnd_startP = startEnd->dot( startP );

	double t = startEnd_startP / startEnd2;

	if ( clampToLine == true ) {

		t = MATH::clamp( t, 0, 1 );

	}

	return t;

}

//----------------------------------------------------------------//

Vector3 * Line3::closestPointToPoint ( Vector3 * point, bool clampToLine = false, Vector3 * optionalTarget = new Vector3 ) {

	double t = closestPointToPointParameter( point, clampToLine );

	return delta( optionalTarget )->multiplyScalar( t )->add( start );

}

//----------------------------------------------------------------//

Line3 * Line3::applyMatrix4 ( Matrix4 * matrix ) {

	start->applyMatrix4( matrix );
	end->applyMatrix4( matrix );

	return this;

}

//----------------------------------------------------------------//

bool Line3::equals ( Line3 * other ) {

	return other->start->equals( start ) && other->end->equals( end );

}

//----------------------------------------------------------------//

Line3 * Line3::clone() {

	Line3 * ret = new Line3();

	return ret->copy( this );

}

