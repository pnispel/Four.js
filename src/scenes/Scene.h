
#ifndef SCENE_H
#define SCENE_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: Scene.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Scene header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "../core/Object3D.h"
#include "../core/Group.h"

class Light;
class Fog;
class Material;
class Vector3;
class Geometry;
class GeometryGroup;

class WebGLObject {

public: 
	int id;
	int z;

	WebGLObject ( GeometryGroup * buff, Object3D * obj ) {

		buffer = buff;
		object = obj;
		opaque = NULL;
		transparent = NULL;
		render = false;

	}

	WebGLObject ( Object3D * obj ) {

		object = obj;
		opaque = NULL;
		transparent = NULL;
		render = false;

	}

	Material * getMaterialByType ( int type ) {

		if ( type == 3001 ) {

			//Opaque
			return opaque;

		} else if ( type == 3002 ) {

			//Transparent
			return transparent;

		}

	}

	Object3D * object;
	//CHECK: may not always be vectors
	GeometryGroup * buffer;
	Material * opaque;
	Material * transparent;
	bool render;

};

/********************************************************************
***         S C E N E   D E F I N I T I O N
********************************************************************/

class Scene : public Object3D {

public:

	Group< WebGLObject * > __webglObjects;
	Group< WebGLObject * > __webglObjectsImmediate;
	
	//FIXME:
	//Group< Sprite * > __webglObjects;
	//Group< Flare * > __webglObjects;

public:
	
	Fog * fog;
	Material * overrideMaterial;

	bool matrixAutoUpdate;

	Group< Object3D * > __objects;
	Group< Light * > __lights;

	Group< Object3D * > __objectsAdded;
	Group< Object3D * > __objectsRemoved;

public: 
	Scene();

	virtual void __addObject( Object3D * object );
	virtual void __removeObject( Object3D * object );

	virtual bool instanceOf ( int type ) {

        if ( type == 73 ) { return true; }
        return false;

    }

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/