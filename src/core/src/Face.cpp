#include "../Face.h"
#include "../Group.h"
#include "../../math/Vector.h"
#include "../../math/Color.h"

Face3::Face3 () {

	a = 0;
	b = 0;
	c = 0;

	normal = new Vector3();
	color = new Color();

	materialIndex = 0;

	centroid = new Vector3();

}

Face3::Face3 ( int ma, int mb, int mc ) {

	a = ma;
	b = mb;
	c = mc;

	normal = new Vector3();
	color = new Color();

	materialIndex = 0;

	centroid = new Vector3();

}

Face3::Face3 ( int ma, int mb, int mc, Vector3 * mnormal, Color * mcolor, int mmaterialIndex ) {

	a = ma;
	b = mb;
	c = mc;

	normal = mnormal;
	color = mcolor;

	materialIndex = mmaterialIndex;

	centroid = new Vector3();

}

Face3::Face3 ( int ma, int mb, int mc, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex ) {

	a = ma;
	b = mb;
	c = mc;

	normal = NULL;
	color = NULL;

	vertexNormals = mvertexNormals;
	vertexColors = mvertexColors;

	materialIndex = mmaterialIndex;

	centroid = new Vector3();

}

Face3 * Face3::clone () {

	Face3 * face = new Face3( a, b, c );

	face->normal->copy( normal );
	face->color->copy( color );
	face->centroid->copy( centroid );

	face->materialIndex = materialIndex;

	for ( int i = 0; i < vertexNormals.size(); i++ ) { face->vertexNormals[i] = vertexNormals[i]->clone(); }
	for ( int i = 0; i < vertexColors.size(); i++ ) { face->vertexColors[i] = vertexColors[i]->clone(); }
	for ( int i = 0; i < vertexTangents.size(); i++ ) { face->vertexTangents[i] = vertexTangents[i]->clone(); }

	return face;

}

// --------------------------------------------------------------------
// ***        F A C E  4
// --------------------------------------------------------------------

Face4::Face4 () {

	a = 0;
	b = 0;
	c = 0;
	d = 0;

	normal = new Vector3();
	color = new Color();

	materialIndex = 0;

	centroid = new Vector3();

}

Face4::Face4 ( int ma, int mb, int mc, int md ) {

	a = ma;
	b = mb;
	c = mc;
	d = md;

	normal = new Vector3();
	color = new Color();

	materialIndex = 0;

	centroid = new Vector3();

}

Face4::Face4 ( int ma, int mb, int mc, int md, Vector3 * mnormal, Color * mcolor, int mmaterialIndex ) {

	a = ma;
	b = mb;
	c = mc;
	d = md;

	normal = mnormal;
	color = mcolor;

	materialIndex = mmaterialIndex;

	centroid = new Vector3();

}

Face4::Face4 ( int ma, int mb, int mc, int md, Group<Vector3 *> mvertexNormals, Group<Color *> mvertexColors, int mmaterialIndex ) {

	a = ma;
	b = mb;
	c = mc;
	d = md;

	normal = NULL;
	color = NULL;

	vertexNormals = mvertexNormals;
	vertexColors = mvertexColors;

	materialIndex = mmaterialIndex;

	centroid = new Vector3();

}

Face4 * Face4::clone () {

	Face4 * face = new Face4( a, b, c, d );

	face->normal->copy( normal );
	face->color->copy( color );
	face->centroid->copy( centroid );

	face->materialIndex = materialIndex;

	for ( int i = 0; i < vertexNormals.size(); i++ ) { face->vertexNormals[i] = vertexNormals[i]->clone(); }
	for ( int i = 0; i < vertexColors.size(); i++ ) { face->vertexColors[i] = vertexColors[i]->clone(); }
	for ( int i = 0; i < vertexTangents.size(); i++ ) { face->vertexTangents[i] = vertexTangents[i]->clone(); }

	return face;

}
