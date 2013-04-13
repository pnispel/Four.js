#include <stdio.h>
#include <math.h>
#include "../../math/Vector.h"
#include "../../math/Matrix.h"
#include "../../math/Quaternion.h"
#include "../Object3D.h"
#include "../../library.h"
#include "../../scenes/Scene.h"

extern "C" {
	extern void invokeCallback( int ID, void * ptr, int type );
}

Object3D::Object3D() {
	__webglInit = false;
	__webglActive = false;

	//FIXME:
	id = Four::get().ObjectIdCount++;

	parent = NULL;
	up = new Vector3();

	position = new Vector3();
	rotation = new Vector3();
	scale = new Vector3();

	velocity = new Vector3();
	acceleration = new Vector3();
	forceAccum = new Vector3();
	torqueAccum = new Vector3();

	renderDepth = 0;

	rotationAutoUpdate = true;

	matrix = new Matrix4();
	matrixWorld = new Matrix4();
	matrixRotationWorld = new Matrix4();

	matrixAutoUpdate = true;
	matrixWorldNeedsUpdate = true;

	orientation = new Quaternion();
	useQuaternion = false;

	visible = true;

	castShadow = false;
	receiveShadow = false;

	geometry = NULL;
	material = NULL;

}

Object3D * Object3D::applyMatrix ( Matrix4 * m ) {

	Matrix4 * m1 = new Matrix4();

	matrix->multiplyMatrices( m, matrix );

	position->getPositionFromMatrix( matrix );

	scale->getScaleFromMatrix( matrix );

	m1->extractRotation( matrix );

	if ( useQuaternion == true )  {

		orientation->setFromRotationMatrix( m1 );

	} else {

		//FIXME:
		//rotation->setEulerFromRotationMatrix( m1, eulerOrder );

	}

	return this;

}


Object3D * Object3D::translate ( double distance, Vector3 * axis ) {

	Vector3 * v1 = new Vector3();

	v1->copy( axis );

	if ( useQuaternion == true ) {

		v1->applyQuaternion( orientation );

	} else {

		//FIXME:
		//v1->applyEuler( rotation, eulerOrder );

	}

	v1->multiplyScalar( distance );

	position->add( v1 );

	return this;
}

Object3D * Object3D::translateX ( double distance ) {

	Vector3 * v1 = new Vector3( 1, 0, 0 );

	return translate( distance, v1 );

}
	
Object3D * Object3D::translateY ( double distance ) {

	Vector3 * v1 = new Vector3( 0, 1, 0 );

	return translate( distance, v1 );

}

Object3D * Object3D::translateZ ( double distance ) {

	Vector3 * v1 = new Vector3( 0, 0, 1 );

	return translate( distance, v1 );

}

Vector3 * Object3D::localToWorld ( Vector3 * vector ) {

	return vector->applyMatrix4( matrixWorld );
	
}

Vector3 * Object3D::worldToLocal ( Vector3 * vector ) {

	Matrix4 * m1 = new Matrix4();

	return vector->applyMatrix4( m1->getInverse( matrixWorld ) );

}

void Object3D::lookAt ( Vector3 * vector ) {

	Matrix4 * m1 = new Matrix4();

	m1->lookAt( vector, position, up );

	if ( useQuaternion == true )  {

		orientation->setFromRotationMatrix( m1 );

	} else {

		//FIXME:
		//rotation->setEulerFromRotationMatrix( m1, eulerOrder );

	}

}

void Object3D::add ( Object3D * object ) {

	if ( object->id == id ) {

		return;

	}

	//FIXME:
	//if ( object instanceof Object3D ) {}
	if ( object->parent != NULL ) {

		object->parent->remove( object );

	}

	object->parent = this;
	children.push_back( object );

	Object3D * scene = this;

	while ( scene->parent != NULL ) {

		scene = scene->parent;

	}

	//FIXME:
	if ( scene != NULL /*&& scene instanceof THREE.Scene*/ ) {

		scene->__addObject( object );

	}

}

void Object3D::remove ( Object3D * object ) {

	//CHECK: this MAY not work
	int index = object - children[0];

	if ( index != -1 ) {

		object->parent = NULL;
		children.erase( index );

		Object3D * scene = this;

		while ( scene->parent != NULL ) {

			scene = scene->parent;

		}

		if ( scene != NULL /*&& scene instanceof THREE.Scene*/ ) {

			scene->__removeObject( object );

		}

	}

}

void Object3D::traverse ( int callbackID ) {

	invokeCallback( callbackID, this, ClassType::Object3D );

	for ( int i = 0; i < children.size(); i++ ) {

		children[ i ]->traverse( callbackID );

	}

}

//FIXME:
/*void * Object3D::getDecendants ( std::vector<Object3D *> array ) {

	if ( array )

	return array;
}*/

void Object3D::updateMatrix () {

	matrix->setPosition( position );

	if ( useQuaternion == false ) {

		//FIXME:
		//matrix->setRotationFromEuler( rotation, eulerOrder );

	} else {

		matrix->setRotationFromQuaternion( orientation );

	}

	if ( scale->x != 1 || scale->y != 1 || scale->z != 1 ) {

		matrix->scale( scale );

	}

	matrixWorldNeedsUpdate = true;

}

void Object3D::updateMatrixWorld( bool force ) {

	if ( matrixAutoUpdate == true ) {

		updateMatrix();

	}

	if ( matrixWorldNeedsUpdate == true ) {

		if ( parent == NULL ) {

			matrixWorld->copy( matrix );

		} else {

			matrixWorld->multiplyMatrices( parent->matrixWorld, matrix );

		}

		matrixWorldNeedsUpdate = false;

	}

	//TOOD: recurse through children

}

Object3D * Object3D::clone () {

	Object3D * object = new Object3D();

	object->up->copy( up );
	object->position->copy( position );
	object->rotation->copy( rotation );
	object->scale->copy( scale );

	object->renderDepth = renderDepth;

	object->rotationAutoUpdate = rotationAutoUpdate;

	object->matrix->copy( matrix );
	object->matrixWorld->copy( matrixWorld );
	object->matrixRotationWorld->copy( matrixRotationWorld );

	object->matrixAutoUpdate = matrixAutoUpdate;
	object->matrixWorldNeedsUpdate = matrixWorldNeedsUpdate;

	object->orientation->copy( orientation );
	object->useQuaternion = useQuaternion;

	object->visible = visible;

	object->castShadow = castShadow;
	object->receiveShadow = receiveShadow;

	object->frustumCulled = frustumCulled;

	//TODO: recurse through children

	return object;

}