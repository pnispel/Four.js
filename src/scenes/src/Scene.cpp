#include "../Scene.h"
#include "../../library.h"
#include "../../lights/Light.h"
#include "../../cameras/Camera.h"

Scene::Scene() : Object3D() {

	overrideMaterial = NULL;
	fog = NULL;

}

void Scene::__addObject ( Object3D * object ) {


	if ( object->instanceOf( ClassType::Light ) ) {

		if ( __lights.indexOf( (Light *)object ) == - 1 ) {

			__lights.push_back( (Light *)object );

		}

		if ( object->target != NULL && object->target->parent == NULL ) {

			add( object->target );

		}

	} else if ( !( object->instanceOf( ClassType::Camera ) || object->instanceOf( ClassType::Bone ) ) ) {

		if ( __objects.indexOf( object ) == - 1 ) {

			__objects.push_back( object );
			__objectsAdded.push_back( object );

			// check if previously removed

			int i = __objectsRemoved.indexOf( object );

			if ( i != -1 ) {

				__objectsRemoved.erase( i );

			}

		}

	}

	for ( int i = 0; i < object->children.size(); i++ ) {

		__addObject( object->children[ i ] );

	}


}

void Scene::__removeObject ( Object3D * object ) {


	if ( object->instanceOf( ClassType::Light ) ) {

		int i = __lights.indexOf( (Light *)object );

		if ( i != -1 ) {

			__lights.erase( i );

		}

	} else if ( !( object->instanceOf( ClassType::Camera ) ) ) {

		int i = __objects.indexOf( object );

		if( i != -1 ) {

			__objects.erase( i );
			__objectsRemoved.push_back( object );

			// check if previously added

			int ai = __objectsAdded.indexOf( object );

			if ( ai != -1 ) {

				__objectsAdded.erase( ai );

			}

		}

	}

	for ( int c = 0; c < object->children.size(); c++ ) {

		__removeObject( object->children[ c ] );

	}

}