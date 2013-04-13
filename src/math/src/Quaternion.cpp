#include "../Quaternion.h"
#include "../Matrix.h"
#include "../Vector.h"
#include <math.h>

Quaternion::Quaternion () : x(0), y(0), z(0), w(1) {}

Quaternion::Quaternion ( double qx, double qy, double qz, double qw ) : x(qx), y(qy), z(qz), w(qw) {}

Quaternion * Quaternion::set ( double qx, double qy, double qz, double qw ) {

	x = qx;
	y = qy;
	z = qz;
	w = qw;

	return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::copy ( Quaternion * q ) {

	x = q->x;
	y = q->y;
	z = q->z;
	w = q->w;

	return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::setFromAxisAngle ( Vector3 * axis, double angle ) {

	double halfAngle = angle / 2;
	double s = sin( halfAngle );

	x = axis->x * s;
	y = axis->y * s;
	z = axis->z * s;
	w = cos( halfAngle );

	return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::inverse () {

	conjugate()->normalize();

	return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::conjugate () {

	x *= -1;
	y *= -1;
	z *= -1;

	return this;

}

//----------------------------------------------------------------//

double Quaternion::length () {

	return sqrt( x * x + y * y + z * z + w * w );

}

//----------------------------------------------------------------//

double Quaternion::lengthSquared () {

	return x * x + y * y + z * z + w * w;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::normalize () {

	double l = length();

		if ( l == 0 ) {

			x = 0;
			y = 0;
			z = 0;
			w = 1;

		} else {

			l = 1 / l;

			x = x * l;
			y = y * l;
			z = z * l;
			w = w * l;

		}

		return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::multiplyQuaternions ( Quaternion * a, Quaternion * b ) {

	double qax = a->x, qay = a->y, qaz = a->z, qaw = a->w;
	double qbx = b->x, qby = b->y, qbz = b->z, qbw = b->w;

	x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
	y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
	z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
	w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

	return this;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::slerp ( Quaternion * qb, double t ) {

	double qx = x, qy = y, qz = z, qw = w;

	// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

	double cosHalfTheta = qw * qb->w + qx * qb->x + qy * qb->y + qz * qb->z;

	if ( cosHalfTheta < 0 ) {

		w = -qb->w;
		x = -qb->x;
		y = -qb->y;
		z = -qb->z;

		cosHalfTheta = -cosHalfTheta;

	} else {

		copy( qb );

	}

	if ( cosHalfTheta >= 1.0 ) {

		w = qw;
		x = qx;
		y = qy;
		z = qz;

		return this;

	}

	double halfTheta = acos( cosHalfTheta );
	double sinHalfTheta = sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

	if ( fabs( sinHalfTheta ) < 0.001 ) {

		w = 0.5 * ( qw + w );
		x = 0.5 * ( qx + x );
		y = 0.5 * ( qy + y );
		z = 0.5 * ( qz + z );

		return this;

	}

	double ratioA = sin( ( 1 - t ) * halfTheta ) / sinHalfTheta;
	double ratioB = sin( t * halfTheta ) / sinHalfTheta;

	w = ( qw * ratioA + w * ratioB );
	x = ( qx * ratioA + x * ratioB );
	y = ( qy * ratioA + y * ratioB );
	z = ( qz * ratioA + z * ratioB );

	return this;

}

//----------------------------------------------------------------//

bool Quaternion::equals ( Quaternion * q ) {

	return ( ( q->x == x ) && ( q->y == y ) && ( q->z == z ) && ( q->w == w ) );

}

//----------------------------------------------------------------//

Quaternion * Quaternion::clone () {

	Quaternion * ret = new Quaternion( x, y, z, w );

	return ret;

}

//----------------------------------------------------------------//

Quaternion * Quaternion::setFromRotationMatrix ( Matrix4 * m ) {

	double * e = m->data;
	double m11, m12, m13, m21, m22, m23, m31, m32, m33, trace, s;

	m11 = e[0]; m12 = e[4]; m13 = e[8];
	m21 = e[1]; m22 = e[5]; m33 = e[9];
	m31 = e[2]; m22 = e[6]; m33 = e[10];

	trace = m11 + m22 + m33;

	if ( trace > 0 ) {

		s = 0.5 / sqrt( trace + 1.0 );

		w = 0.25 / s;
		x = ( m32 - m23 ) * s;
		y = ( m13 - m31 ) * s;
		z = ( m21 - m12 ) * s;
 
	} else if ( m11 > m22 && m11 > m33 ) {

		s = 2.0 * sqrt( 1.0 + m11 - m22 - m33 );

		w = ( m32 - m23 ) / s;
		x = 0.25 * s;
		y = ( m12 + m21 ) / s;
		z = ( m13 + m31 ) / s;

	} else if ( m22 > m33 ) {

		s = 2.0 * sqrt( 1.0 + m33 - m11 - m22 );

		w = ( m21 - m12 ) / s;
		x = ( m13 + m31 ) / s;
		y = ( m23 + m32 ) / s;
		z = 0.25 * s;

	}

	return this;

}