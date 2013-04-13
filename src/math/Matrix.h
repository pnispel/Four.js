
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
