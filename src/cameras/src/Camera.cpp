#include "../../library.h"

#include "../Camera.h"
#include "../../math/Quaternion.h"
#include "../../math/Matrix.h"
#include "../../math/Vector.h"

Camera::Camera() : Object3D() {

	matrixWorldInverse = new Matrix4();

	projectionMatrix = new Matrix4();
	projectionMatrixInverse = new Matrix4();

}

void Camera::lookAt ( Vector3 * vector ) {

	Matrix4 * m1 = new Matrix4();

	m1->lookAt( position, vector, up );

	if ( useQuaternion == true ) {

		orientation->setFromRotationMatrix( m1 );

	} else {

		//rotation->setEulerFromRotationMatrix( m1, eulerOrder );

	}

}