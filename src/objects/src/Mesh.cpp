#include "../Mesh.h"
#include "../../core/Geometry.h"
#include "../../core/Object3D.h"
#include "../../materials/Material.h"
#include "../../materials/MeshBasicMaterial.h"

Mesh::Mesh ( Geometry * g ) : Object3D() {

	geometry = g;
	material = new MeshBasicMaterial();

}

Mesh::Mesh ( Geometry * g, Material * m ) : Object3D() {

	geometry = g;
	material = m;

}


//FIXME:
/*void updateMorphTargets () {

	if ( geometry->morphTargets.size() > 0 ) {

		morphTargetBase = -1;
		morphTargetForcedOrder = [];
		morphTargetInfluences = [];
		morphTargetDictionary = {};

		for ( var m = 0, m < geometry->morphTargets.size() ; m ++ ) {

			morphTargetInfluences.push( 0 );
			morphTargetDictionary[ geometry->morphTargets[ m ]->name ] = m;

		}

	}

}*/

//FIXME:
//getMorphTargetIndexByName
