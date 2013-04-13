
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

/*
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// -- Unimplemented Methods : 
// -- 
// -- multiplyVector3Array
// --
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
*/

#include "../Matrix.h"
#include "../Vector.h"
#include "../Math.h"
#include "../Quaternion.h"
#include "../../library.h"

#include <math.h>
#include <string.h>

/********************************************************************
***         M A T R I X 3    I M P L E M E N T A T I O N
********************************************************************/

Matrix3::Matrix3 () { 

	for ( int i = 0; i < 9; i++ ) {
		data[i] = 0;
	}

	data[0] = data[4] = data[8] = 1;

}

//----------------------------------------------------------------//

Matrix3::Matrix3 (
	const double n11, const double n12, const double n13,
	const double n21, const double n22, const double n23,
	const double n31, const double n32, const double n33 
) { 

	data[0] = n11; data[3] = n12; data[6] = n13;
	data[1] = n21; data[4] = n22; data[7] = n23;
	data[2] = n31; data[5] = n32; data[8] = n33;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::set (
	const double n11, const double n12, const double n13,
	const double n21, const double n22, const double n23,
	const double n31, const double n32, const double n33 
) {

	data[0] = n11; data[3] = n12; data[6] = n13;
	data[1] = n21; data[4] = n22; data[7] = n23;
	data[2] = n31; data[5] = n32; data[8] = n33;

	return this;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::identity () {

	set (

		1, 0, 0,
		0, 1, 0,
		0, 0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::getNormalMatrix ( Matrix4 * matrix ) {

	getInverse( matrix )->transpose();

	return this;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::copy ( Matrix3 * m ) {

	set (

		m->data[0], m->data[3], m->data[6],
		m->data[1], m->data[4], m->data[7],
		m->data[2], m->data[5], m->data[8]

	);

	return this;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::multiplyScalar ( double s ) {

	data[0] *= s; data[3] *= s; data[6] *= s;
	data[1] *= s; data[4] *= s; data[7] *= s;
	data[2] *= s; data[5] *= s; data[8] *= s;

	return this;

}

//----------------------------------------------------------------//

double Matrix3::determinant () {
	
	double a, b, c, d, e, f, g, h, i;

	a = data[0]; b = data[1]; c = data[2];
	d = data[0]; e = data[1]; f = data[2];
	g = data[0]; h = data[1]; i = data[2];

	return a*e*i - a*f*h - b*d*i + b*f*g + c*d*h - c*e*g;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::transpose () {
	
	double tmp;
	
	tmp = data[1]; data[1] = data[3]; data[3] = tmp;
	tmp = data[2]; data[2] = data[6]; data[6] = tmp;
	tmp = data[5]; data[5] = data[7]; data[7] = tmp;

	return this;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::clone () {

	Matrix3 * ret = new Matrix3(

		data[0], data[3], data[6],
		data[1], data[4], data[7],
		data[2], data[5], data[8]

	);

	return ret;

}

//----------------------------------------------------------------//

Matrix3 * Matrix3::getInverse ( Matrix4 * matrix ) {

	double me[16];
	memcpy (me, matrix->data, sizeof (matrix->data));

	double te[9];
	memcpy (te, data, sizeof (data));

	data[ 0 ] =   me[10] * me[5] - me[6] * me[9];
	data[ 1 ] = - me[10] * me[1] + me[2] * me[9];
	data[ 2 ] =   me[6] * me[1] - me[2] * me[5];
	data[ 3 ] = - me[10] * me[4] + me[6] * me[8];
	data[ 4 ] =   me[10] * me[0] - me[2] * me[8];
	data[ 5 ] = - me[6] * me[0] + me[2] * me[4];
	data[ 6 ] =   me[9] * me[4] - me[5] * me[8];
	data[ 7 ] = - me[9] * me[0] + me[1] * me[8];
	data[ 8 ] =   me[5] * me[0] - me[1] * me[4];

	double det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

	if ( det == 0 ) {

		identity();

		return this;

	}

	multiplyScalar( 1.0 / det );

	return this;

}


/********************************************************************
***         M A T R I X 4    I M P L E M E N T A T I O N
********************************************************************/

Matrix4::Matrix4 () { 

	for ( int i = 0; i < 16; i++ ) {
		data[i] = 0;
	}

	data[0] = data[5] = data[10] = data[15] = 1;

}


Matrix4::Matrix4 (
	const double n11, const double n12, const double n13, const double n14, 
	const double n21, const double n22, const double n23, const double n24, 
	const double n31, const double n32, const double n33, const double n34, 
	const double n41, const double n42, const double n43, const double n44
) {

	data[0] = n11; data[4] = n12; data[8] = n13; data[12] = n14;
	data[1] = n21; data[5] = n22; data[9] = n23; data[13] = n24;
	data[2] = n31; data[6] = n32; data[10] = n33; data[14] = n34;
	data[3] = n41; data[7] = n42; data[11] = n43; data[15] = n44;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::set (
	const double n11, const double n12, const double n13, const double n14, 
	const double n21, const double n22, const double n23, const double n24, 
	const double n31, const double n32, const double n33, const double n34, 
	const double n41, const double n42, const double n43, const double n44
) {

	data[0] = n11; data[4] = n12; data[8] = n13; data[12] = n14;
	data[1] = n21; data[5] = n22; data[9] = n23; data[13] = n24;
	data[2] = n31; data[6] = n32; data[10] = n33; data[14] = n34;
	data[3] = n41; data[7] = n42; data[11] = n43; data[15] = n44;

	return this;

}

//----------------------------------------------------------------//

//FIXME: still works like matrix3
Matrix4 * Matrix4::copy ( Matrix4 * m ) {

	set (

		m->data[0], m->data[4], m->data[8], m->data[12],
		m->data[1], m->data[5], m->data[9], m->data[13],
		m->data[2], m->data[6], m->data[10], m->data[14],
		m->data[3], m->data[7], m->data[11], m->data[15]

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::multiplyMatrices ( Matrix4 * a, Matrix4 * b ) {

	double ae[16];
	double be[16];

	memcpy (ae, a->data, sizeof (a->data));
	memcpy (be, b->data, sizeof (b->data));

	double a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
	double a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
	double a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
	double a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

	double b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
	double b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
	double b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
	double b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

	data[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	data[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	data[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	data[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

	data[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	data[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	data[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	data[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

	data[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	data[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	data[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	data[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

	data[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	data[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	data[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	data[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::lookAt ( Vector3 * eye, Vector3 * target, Vector3 * up ) {

	Vector3 * x = new Vector3();
	Vector3 * y = new Vector3();
	Vector3 * z = new Vector3();

	z->subVectors( eye, target )->normalize();

	if ( z->length() == 0 ) {

		z->z = 1;

	}

	x->crossVectors( up, z )->normalize();

	if ( x->length() == 0 ) {

		double vx = z->x;
		vx += .0001;

		z->x = vx;

		x->crossVectors( up, z )->normalize();

	}

	y->crossVectors( z, x );

	//FIXME: this doesnt look right
	data[0] = x->x; data[4] = x->x; data[8] = x->x;
	data[1] = x->y; data[5] = x->y; data[9] = x->y;
	data[2] = x->z; data[6] = x->z; data[10] = x->z;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::clone () {

	Matrix4 * ret = new Matrix4(

		data[0], data[4], data[8], data[12],
		data[1], data[5], data[9], data[13],
		data[2], data[6], data[10], data[14],
		data[3], data[7], data[11], data[15]

	);

	return ret;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::identity () {

	set (

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1


	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::multiplyScalar ( double s ) {

	data[0] *= s; data[4] *= s; data[8] *= s; data[12] *= s;
	data[1] *= s; data[5] *= s; data[9] *= s; data[13] *= s;
	data[2] *= s; data[6] *= s; data[10] *= s; data[14] *= s;
	data[3] *= s; data[7] *= s; data[11] *= s; data[15] *= s;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::transpose () {

	double tmp;

	tmp = data[1]; data[1] = data[4]; data[4] = tmp;
	tmp = data[2]; data[2] = data[8]; data[8] = tmp;
	tmp = data[6]; data[6] = data[9]; data[9] = tmp;

	tmp = data[3]; data[3] = data[12]; data[12] = tmp;
	tmp = data[7]; data[7] = data[13]; data[13] = tmp;
	tmp = data[11]; data[11] = data[14]; data[14] = tmp;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::invert () {
	//FIXME: this may not be correct

	double te[15];
	memcpy (te, data, sizeof (data));

	double n11 = data[0], n12 = data[4], n13 = data[8], n14 = data[12];
	double n21 = data[1], n22 = data[5], n23 = data[9], n24 = data[13];
	double n31 = data[2], n32 = data[6], n33 = data[10], n34 = data[14];
	double n41 = data[3], n42 = data[7], n43 = data[11], n44 = data[15];

	data[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
	data[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
	data[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
	data[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
	data[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
	data[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
	data[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
	data[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
	data[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
	data[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
	data[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
	data[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
	data[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
	data[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
	data[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
	data[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

	double det = te[ 0 ] * data[ 0 ] + te[ 1 ] * data[ 4 ] + te[ 2 ] * data[ 8 ] + te[ 3 ] * data[ 12 ];

	if ( det == 0 ) {

		identity();

		return this;

	}

	multiplyScalar( 1 / det );

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::setRotationFromQuaternion ( Quaternion * q ) {

	double x = q->x, y = q->y, z = q->z, w = q->w;
	double x2 = x + x, y2 = y + y, z2 = z + z;
	double xx = x * x2, xy = x * y2, xz = x * z2;
	double yy = y * y2, yz = y * z2, zz = z * z2;
	double wx = w * x2, wy = w * y2, wz = w * z2;

	data[0] = 1 - ( yy + zz );
	data[4] = xy - wz;
	data[8] = xz + wy;

	data[1] = xy + wz;
	data[5] = 1 - ( xx + zz );
	data[9] = yz - wx;

	data[2] = xz - wy;
	data[6] = yz + wx;
	data[10] = 1 - ( xx + yy );

	return this;

}

//----------------------------------------------------------------//

Vector4 * Matrix4::crossVector ( Vector4 * a ) {

	Vector4 * v = new Vector4();

	v->x = data[0] * a->x + data[4] * a->y + data[8] * a->z + data[12] * a->w;
	v->y = data[1] * a->x + data[5] * a->y + data[9] * a->z + data[13] * a->w;
	v->z = data[2] * a->x + data[6] * a->y + data[10] * a->z + data[14] * a->w;

	v->w = ( a->w ) ? data[3] * a->x + data[7] * a->y + data[11] * a->z + data[15] * a->w : 1;

	return v;

}

//----------------------------------------------------------------//

double Matrix4::determinant() {

	double n11 = data[0], n12 = data[4], n13 = data[8], n14 = data[12];
	double n21 = data[1], n22 = data[5], n23 = data[9], n24 = data[13];
	double n31 = data[2], n32 = data[6], n33 = data[10], n34 = data[14];
	double n41 = data[3], n42 = data[7], n43 = data[11], n44 = data[15];

	//TODO: make this more efficient
	//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

	return (
		n41 * (
			+n14 * n23 * n32
			-n13 * n24 * n32
			-n14 * n22 * n33
			+n12 * n24 * n33
			+n13 * n22 * n34
			-n12 * n23 * n34
		) +
		n42 * (
			+n11 * n23 * n34
			-n11 * n24 * n33
			+n14 * n21 * n33
			-n13 * n21 * n34
			+n13 * n24 * n31
			-n14 * n23 * n31
		) +
		n43 * (
			+n11 * n24 * n32
			-n11 * n22 * n34
			-n14 * n21 * n32
			+n12 * n21 * n34
			+n14 * n22 * n31
			-n12 * n24 * n31
		) +
		n44 * (
			-n13 * n22 * n31
			-n11 * n23 * n32
			+n11 * n22 * n33
			+n13 * n21 * n32
			-n12 * n21 * n33
			+n12 * n23 * n31
		)

	);

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::setPosition ( Vector3 * v ) {

	data[12] = v->x;
	data[13] = v->y;
	data[14] = v->z;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::getInverse ( Matrix4 * m ) {

	double te[16];
	double me[16];

	memcpy (te, data, sizeof (data));
	memcpy (me, m->data, sizeof (m->data));

	double n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
	double n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
	double n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
	double n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

	data[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
	data[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
	data[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
	data[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
	data[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
	data[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
	data[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
	data[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
	data[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
	data[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
	data[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
	data[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
	data[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
	data[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
	data[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
	data[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

	double det = me[ 0 ] * data[ 0 ] + me[ 1 ] * data[ 4 ] + me[ 2 ] * data[ 8 ] + me[ 3 ] * data[ 12 ];

	if ( det == 0 ) {

		identity();

		return this;
	}

	multiplyScalar( 1 / det );

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::extractPosition ( Matrix4 * m ) {

	data[12] = m->data[12];
	data[13] = m->data[13];
	data[14] = m->data[14];

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::extractRotation ( Matrix4 * m ) {

	Vector3 * v1 = new Vector3();

	double me[16];

	memcpy (me, m->data, sizeof (m->data));

	double scaleX = 1 / v1->set( me[0], me[1], me[2] )->length();
	double scaleY = 1 / v1->set( me[4], me[5], me[6] )->length();
	double scaleZ = 1 / v1->set( me[8], me[9], me[10] )->length();

	data[0] = me[0] * scaleX;
	data[1] = me[1] * scaleX;
	data[2] = me[2] * scaleX;

	data[4] = me[4] * scaleY;
	data[5] = me[5] * scaleY;
	data[6] = me[6] * scaleY;

	data[8] = me[8] * scaleZ;
	data[9] = me[9] * scaleZ;
	data[10] = me[10] * scaleZ;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::translate ( Vector3 * v ) {

	double x = v->x, y = v->y, z = v->z;

	data[12] = data[0] * x + data[4] * y + data[8] * z + data[12];
	data[13] = data[1] * x + data[5] * y + data[9] * z + data[13];
	data[14] = data[2] * x + data[6] * y + data[10] * z + data[14];
	data[15] = data[3] * x + data[7] * y + data[11] * z + data[15];

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::rotateX ( double angle ) {

	double m12 = data[4];
	double m22 = data[5];
	double m32 = data[6];
	double m42 = data[7];
	double m13 = data[8];
	double m23 = data[9];
	double m33 = data[10];
	double m43 = data[11];
	double c = cos( angle );
	double s = sin( angle );

	data[4] = c * m12 + s * m13;
	data[5] = c * m22 + s * m23;
	data[6] = c * m32 + s * m33;
	data[7] = c * m42 + s * m43;

	data[8] = c * m13 - s * m12;
	data[9] = c * m23 - s * m22;
	data[10] = c * m33 - s * m32;
	data[11] = c * m43 - s * m42;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::rotateY ( double angle ) {

	double m11 = data[0];
	double m21 = data[1];
	double m31 = data[2];
	double m41 = data[3];
	double m13 = data[8];
	double m23 = data[9];
	double m33 = data[10];
	double m43 = data[11];
	double c = cos( angle );
	double s = sin( angle );

	data[0] = c * m11 - s * m13;
	data[1] = c * m21 - s * m23;
	data[2] = c * m31 - s * m33;
	data[3] = c * m41 - s * m43;

	data[8] = c * m13 + s * m11;
	data[9] = c * m23 + s * m21;
	data[10] = c * m33 + s * m31;
	data[11] = c * m43 + s * m41;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::rotateZ ( double angle ) {

	double m11 = data[0];
	double m21 = data[1];
	double m31 = data[2];
	double m41 = data[3];
	double m12 = data[4];
	double m22 = data[5];
	double m32 = data[6];
	double m42 = data[7];
	double c = cos( angle );
	double s = sin( angle );

	data[0] = c * m11 + s * m12;
	data[1] = c * m21 + s * m22;
	data[2] = c * m31 + s * m32;
	data[3] = c * m41 + s * m42;

	data[4] = c * m12 - s * m11;
	data[5] = c * m22 - s * m21;
	data[6] = c * m32 - s * m31;
	data[7] = c * m42 - s * m41;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::rotateByAxis ( Vector3 * axis, double angle ) {

	// optimize by checking axis

	if ( axis->x == 1 && axis->y == 0 && axis->z == 0 ) {

		return rotateX( angle );

	} else if ( axis->x == 0 && axis->y == 1 && axis->z == 0 ) {

		return rotateY( angle );

	} else if ( axis->x == 0 && axis->y == 0 && axis->z == 1 ) {

		return rotateZ( angle );

	}

	double x = axis->x, y = axis->y, z = axis->z;
	double n = sqrt(x * x + y * y + z * z);

	x /= n;
	y /= n;
	z /= n;

	double xx = x * x, yy = y * y, zz = z * z;
	double c = cos( angle );
	double s = sin( angle );
	double oneMinusCosine = 1 - c;
	double xy = x * y * oneMinusCosine;
	double xz = x * z * oneMinusCosine;
	double yz = y * z * oneMinusCosine;
	double xs = x * s;
	double ys = y * s;
	double zs = z * s;

	double r11 = xx + (1 - xx) * c;
	double r21 = xy + zs;
	double r31 = xz - ys;
	double r12 = xy - zs;
	double r22 = yy + (1 - yy) * c;
	double r32 = yz + xs;
	double r13 = xz + ys;
	double r23 = yz - xs;
	double r33 = zz + (1 - zz) * c;

	double m11 = data[0], m21 = data[1], m31 = data[2], m41 = data[3];
	double m12 = data[4], m22 = data[5], m32 = data[6], m42 = data[7];
	double m13 = data[8], m23 = data[9], m33 = data[10], m43 = data[11];

	data[0] = r11 * m11 + r21 * m12 + r31 * m13;
	data[1] = r11 * m21 + r21 * m22 + r31 * m23;
	data[2] = r11 * m31 + r21 * m32 + r31 * m33;
	data[3] = r11 * m41 + r21 * m42 + r31 * m43;

	data[4] = r12 * m11 + r22 * m12 + r32 * m13;
	data[5] = r12 * m21 + r22 * m22 + r32 * m23;
	data[6] = r12 * m31 + r22 * m32 + r32 * m33;
	data[7] = r12 * m41 + r22 * m42 + r32 * m43;

	data[8] = r13 * m11 + r23 * m12 + r33 * m13;
	data[9] = r13 * m21 + r23 * m22 + r33 * m23;
	data[10] = r13 * m31 + r23 * m32 + r33 * m33;
	data[11] = r13 * m41 + r23 * m42 + r33 * m43;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::scale ( Vector3 * v ) {

	double x = v->x, y = v->y, z = v->z;

	data[0] *= x; data[4] *= y; data[8] *= z;
	data[1] *= x; data[5] *= y; data[9] *= z;
	data[2] *= x; data[6] *= y; data[10] *= z;
	data[3] *= x; data[7] *= y; data[11] *= z;

	return this;

}

//----------------------------------------------------------------//

double Matrix4::getMaxScaleOnAxis () {

	double scaleXSq = data[0] * data[0] + data[1] * data[1] + data[2] * data[2];
	double scaleYSq = data[4] * data[4] + data[5] * data[5] + data[6] * data[6];
	double scaleZSq = data[8] * data[8] + data[9] * data[9] + data[10] * data[10];

	return sqrt( fmax( scaleXSq, fmax( scaleYSq, scaleZSq ) ) );

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeTranslation ( double x, double y, double z ) {

	set(

		1, 0, 0, x,
		0, 1, 0, y,
		0, 0, 1, z,
		0, 0, 0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeRotationX ( double theta ) {

	double c = cos( theta ), s = sin( theta );

	set(

		1, 0,  0, 0,
		0, c, -s, 0,
		0, s,  c, 0,
		0, 0,  0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeRotationY ( double theta ) {

	double c = cos( theta ), s = sin( theta );

	set(

		 c, 0, s, 0,
		 0, 1, 0, 0,
		-s, 0, c, 0,
		 0, 0, 0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeRotationZ ( double theta ) {

	double c = cos( theta ), s = sin( theta );

	set(

		c, -s, 0, 0,
		s,  c, 0, 0,
		0,  0, 1, 0,
		0,  0, 0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeRotationAxis ( Vector3 * axis, double angle ) {

	// Based on http://www.gamedev.net/reference/articles/article1199.asp

	double c = cos( angle );
	double s = sin( angle );
	double t = 1 - c;
	double x = axis->x, y = axis->y, z = axis->z;
	double tx = t * x, ty = t * y;

	set(

		tx * x + c, tx * y - s * z, tx * z + s * y, 0,
		tx * y + s * z, ty * y + c, ty * z - s * x, 0,
		tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
		0, 0, 0, 1

	);

	 return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeScale ( double x, double y, double z ) {

	set(

		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1

	);

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeFrustum ( double left, double right, double bottom, double top, double near, double far ) {

	double x = 2 * near / ( right - left );
	double y = 2 * near / ( top - bottom );

	double a = ( right + left ) / ( right - left );
	double b = ( top + bottom ) / ( top - bottom );
	double c = - ( far + near ) / ( far - near );
	double d = - 2 * far * near / ( far - near );

	data[0] = x;	data[4] = 0;	data[8] = a;	data[12] = 0;
	data[1] = 0;	data[5] = y;	data[9] = b;	data[13] = 0;
	data[2] = 0;	data[6] = 0;	data[10] = c;	data[14] = d;
	data[3] = 0;	data[7] = 0;	data[11] = - 1;	data[15] = 0;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makePerspective ( double fov, double aspect, double near, double far ) {

	double ymax = near * tan( MATH::degToRad( fov * 0.5 ) );
	double ymin = - ymax;
	double xmin = ymin * aspect;
	double xmax = ymax * aspect;

	return makeFrustum( xmin, xmax, ymin, ymax, near, far );

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::makeOrthographic ( double left, double right, double top, double bottom, double near, double far ) {

	double w = right - left;
	double h = top - bottom;
	double p = far - near;

	double x = ( right + left ) / w;
	double y = ( top + bottom ) / h;
	double z = ( far + near ) / p;

	data[0] = 2 / w;	data[4] = 0;	data[8] = 0;	data[12] = -x;
	data[1] = 0;	data[5] = 2 / h;	data[9] = 0;	data[13] = -y;
	data[2] = 0;	data[6] = 0;	data[10] = -2/p;	data[14] = -z;
	data[3] = 0;	data[7] = 0;	data[11] = 0;	data[15] = 1;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::compose ( Vector3 * position, Quaternion * quaternion, Vector3 * scale ) {

	Matrix4 * mRotation = new Matrix4();
	Matrix4 * mScale = new Matrix4();

	mRotation->identity();
	mRotation->setRotationFromQuaternion( quaternion );

	mScale->makeScale( scale->x, scale->y, scale->z );

	this->multiplyMatrices( mRotation, mScale );

	data[12] = position->x;
	data[13] = position->y;
	data[14] = position->z;

	return this;

}

//----------------------------------------------------------------//

Matrix4 * Matrix4::decompose ( Vector3 * position, Quaternion * quaternion, Vector3 * scale ) {

	Vector3 * x = new Vector3();
	Vector3 * y = new Vector3();
	Vector3 * z = new Vector3();
	Matrix4 * matrix = new Matrix4();

	// grab the axis vectors
	x->set( data[0], data[1], data[2] );
	y->set( data[4], data[5], data[6] );
	z->set( data[8], data[9], data[10] );

	//position = ( position::type == ClassType::Vector3 ) ? position : new THREE.Vector3();
	//quaternion = ( quaternion::type == ClassType::Quaternion ) ? quaternion : new THREE.Quaternion();
	//scale = ( scale::type == ClassType::Vector3 ) ? scale : new THREE.Vector3();

	scale->x = x->length();
	scale->y = y->length();
	scale->z = z->length();

	position->x = data[12];
	position->y = data[13];
	position->z = data[14];

	// scale the rotation part

	matrix->copy( this );

	matrix->data[0] /= scale->x;
	matrix->data[1] /= scale->x;
	matrix->data[2] /= scale->x;

	matrix->data[4] /= scale->y;
	matrix->data[5] /= scale->y;
	matrix->data[6] /= scale->y;

	matrix->data[8] /= scale->z;
	matrix->data[9] /= scale->z;
	matrix->data[10] /= scale->z;

	quaternion->setFromRotationMatrix( matrix );

	//FIXME: supposed to return an array
	//return [ position, quaternion, scale ];
	return this;

}



/********************************************************************
***         E N D    O F    F I L E
********************************************************************/
