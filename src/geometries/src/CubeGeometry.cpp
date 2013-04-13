#include "../CubeGeometry.h"
#include "../../math/Vector.h"
#include "../../core/Face.h"


void CubeGeometry::buildPlane ( const char u, const char v, int udir, int vdir, double width, double height, double depth, double materialIndex ) {

	char w;
	int ix, iy;
	int gridX = widthSegments;
	int gridY = heightSegments;
	double width_half = width / 2;
	double height_half = height / 2;
	int offset = vertices.size();

	if ( ( u == 'x' && v == 'y' ) || ( u == 'y' && v == 'x' ) ) {

		w = 'z';

	} else if ( ( u == 'x' && v == 'z' ) || ( u == 'z' && v == 'x' ) ) {

		w = 'y';
		gridY = depthSegments;

	} else if ( ( u == 'z' && v == 'y' ) || ( u == 'y' && v == 'z' ) ) {

		w = 'x';
		gridX = depthSegments;

	}

	int gridX1 = gridX + 1;
	int gridY1 = gridY + 1;
	double segment_width = width / gridX;
	double segment_height = height / gridY;
	Vector3 * normal = new Vector3();

	normal->setFromChar( w, depth > 0 ? 1 : - 1 );

	for ( iy = 0; iy < gridY1; iy ++ ) {

		for ( ix = 0; ix < gridX1; ix ++ ) {

			Vector3 * vector = new Vector3();

			vector->setFromChar( u, ( ix * segment_width - width_half ) * udir );
			vector->setFromChar( v, ( iy * segment_height - height_half ) * vdir );
			vector->setFromChar( w, depth );

			vertices.push_back( vector );

		}

	}

	for ( iy = 0; iy < gridY; iy++ ) {

		for ( ix = 0; ix < gridX; ix++ ) {

			double a = ix + gridX1 * iy;
			double b = ix + gridX1 * ( iy + 1 );
			double c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			double d = ( ix + 1 ) + gridX1 * iy;

			Face4 * face = new Face4( a + offset, b + offset, c + offset, d + offset );
			face->normal->copy( normal );

			face->vertexNormals.push_back( normal->clone() );
			face->vertexNormals.push_back( normal->clone() );
			face->vertexNormals.push_back( normal->clone() );
			face->vertexNormals.push_back( normal->clone() );

			face->materialIndex = materialIndex;

			faces.push_back( face );

			Group< Vector2 * > gr;
			gr.push_back( new Vector2( ix / gridX, 1 - iy / gridY ) );
			gr.push_back( new Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY ) );
			gr.push_back( new Vector2( ( ix + 1 ) / gridX, 1- ( iy + 1 ) / gridY ) );
			gr.push_back( new Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY ) );

			faceVertexUvs[ 0 ].push_back( gr );

		}

	}

}