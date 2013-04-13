#include "../Geometry.h"
#include "../Face.h"
#include "../../math/Matrix.h"
#include "../../math/Vector.h"
#include "../../math/Color.h"
#include "../../library.h"



Geometry * Geometry::applyMatrix ( Matrix4 * matrix ) {

	Matrix3 * normalMatrix = new Matrix3();
	normalMatrix->getInverse( matrix )->transpose();

	for ( int i = 0; i < vertices.size(); i++ ) {

		//CHECK: may need to be vertex
		Vector3 * vertex = vertices[ i ];
		vertex->applyMatrix4( matrix );

	}

	for ( int i = 0; i < faces.size(); i++ ) {

		Face * face = faces[ i ];
		face->normal->applyMatrix3( normalMatrix )->normalize();

		for ( int j = 0; j < face->vertexNormals.size(); j++ ) {

			face->vertexNormals[ j ]->applyMatrix3( normalMatrix )->normalize();

		}

		face->centroid->applyMatrix4( matrix );

	}

	return this;

}

// -------------------------------------------------------------------- //

Geometry * Geometry::computeCentroids () {

	for ( int i = 0; i < faces.size(); i++ ) {

		//FIXME: need to use generic Face type
		Face * face = faces[ i ];
		face->centroid->set( 0, 0, 0 );

		//FIXME: 
		if ( face->instanceOf( ClassType::Face3 ) ) {

			face->centroid->add( vertices[ face->a ] );
			face->centroid->add( vertices[ face->b ] );
			face->centroid->add( vertices[ face->c ] );
			face->centroid->divideScalar( 3 );

		} else if ( face->instanceOf( ClassType::Face4 )  ) {

			face->centroid->add( vertices[ face->a ] );
			face->centroid->add( vertices[ face->b ] );
			face->centroid->add( vertices[ face->c ] );
			face->centroid->add( vertices[ face->d ] );
			face->centroid->divideScalar( 4 );

		}

	}

	return this;
	
}

// -------------------------------------------------------------------- //

Geometry * Geometry::computeFaceNormals () {

	Vector3 * cb = new Vector3(), * ab = new Vector3();

	for ( int i = 0; i < faces.size() ; i++ ) {

		//CHECK:
		Face * face = faces[ i ];

		//CHECK: may need to be vertex
		Vector3 * vA = vertices[ face->a ];
		Vector3 * vB = vertices[ face->b ];
		Vector3 * vC = vertices[ face->c ];

		cb->subVectors( vC, vB );
		ab->subVectors( vA, vB );
		cb->cross( ab );

		cb->normalize();

		face->normal->copy( cb );

	}

	return this;

}

// -------------------------------------------------------------------- //

Geometry * Geometry::computeVertexNormals ( bool areaWeighted = false ) {

	Group< Vector3 * > vertexBuffer;
	Face * face;

	Group< Vector3 * > m_vertexNormals;

	// create internal buffers for reuse when calling this method repeatedly
	// (otherwise memory allocation / deallocation every frame is big resource hog)

	if ( __tmpVertices.size() == 0 ) {

		__tmpVertices.resize( vertices.size() );
		vertexBuffer = __tmpVertices;

		for ( int i = 0; i < vertices.size(); i++ ) {

			vertexBuffer[ i ] = new Vector3();

		}

		for ( int i = 0; i < faces.size(); i++ ) {

			face = faces[ i ];

			if ( face->instanceOf( ClassType::Face3 ) ) {

				m_vertexNormals.push_back( new Vector3 );
				m_vertexNormals.push_back( new Vector3 );
				m_vertexNormals.push_back( new Vector3 );

				face->vertexNormals = m_vertexNormals;

			} else if ( face->instanceOf( ClassType::Face4 ) ) {

				m_vertexNormals.push_back( new Vector3 );
				m_vertexNormals.push_back( new Vector3 );
				m_vertexNormals.push_back( new Vector3 );
				m_vertexNormals.push_back( new Vector3 );

				face->vertexNormals = m_vertexNormals;

			}

		}

	} else {

		vertexBuffer = __tmpVertices;

		for ( int i = 0; i < vertices.size(); i++ ) {

			vertexBuffer[ i ]->set( 0, 0, 0 );

		}

	}

	if ( areaWeighted ) {

		// vertex normals weighted by triangle areas
		// http://www.iquilezles.org/www/articles/normals/normals.htm

		Vector3 * vA;
		Vector3 * vB;
		Vector3 * vC;
		Vector3 * vD;

		Vector3 * cb = new Vector3(), * ab = new Vector3(),
				* db = new Vector3(), * dc = new Vector3(), * bc = new Vector3();

		for ( int i = 0; i < faces.size(); i++ ) {

			face = faces[ i ];

			if ( face->instanceOf( ClassType::Face3 ) ) {

				vA = vertices[ face->a ];
				vB = vertices[ face->b ];
				vC = vertices[ face->c ];

				cb->subVectors( vC, vB );
				ab->subVectors( vA, vB );
				cb->cross( ab );

				vertexBuffer[ face->a ]->add( cb );
				vertexBuffer[ face->b ]->add( cb );
				vertexBuffer[ face->c ]->add( cb );

			} else if ( face->instanceOf( ClassType::Face4 ) ) {

				vA = vertices[ face->a ];
				vB = vertices[ face->b ];
				vC = vertices[ face->c ];
				vD = vertices[ face->d ];

				// abd

				db->subVectors( vD, vB );
				ab->subVectors( vA, vB );
				db->cross( ab );

				vertexBuffer[ face->a ]->add( db );
				vertexBuffer[ face->b ]->add( db );
				vertexBuffer[ face->d ]->add( db );

				// bcd

				dc->subVectors( vD, vC );
				bc->subVectors( vB, vC );
				dc->cross( bc );

				vertexBuffer[ face->b ]->add( dc );
				vertexBuffer[ face->c ]->add( dc );
				vertexBuffer[ face->d ]->add( dc );

			}

		}

	} else {

		for ( int i = 0; i < faces.size(); i++ ) {

			face = faces[ i ];

			if ( face->instanceOf( ClassType::Face3 ) ) {

				vertexBuffer[ face->a ]->add( face->normal );
				vertexBuffer[ face->b ]->add( face->normal );
				vertexBuffer[ face->c ]->add( face->normal );

			} else if ( face->instanceOf( ClassType::Face4 ) ) {

				vertexBuffer[ face->a ]->add( face->normal );
				vertexBuffer[ face->b ]->add( face->normal );
				vertexBuffer[ face->c ]->add( face->normal );
				vertexBuffer[ face->d ]->add( face->normal );

			}

		}

	}

	for ( int i = 0; i < vertices.size(); i++ ) {

		vertexBuffer[ i ]->normalize();

	}

	for ( int i = 0; i < faces.size(); i++ ) {

		face = faces[ i ];

		if ( face->instanceOf( ClassType::Face3 ) ) {

			face->vertexNormals[ 0 ]->copy( vertexBuffer[ face->a ] );
			face->vertexNormals[ 1 ]->copy( vertexBuffer[ face->b ] );
			face->vertexNormals[ 2 ]->copy( vertexBuffer[ face->c ] );

		} else if ( face->instanceOf( ClassType::Face4 ) ) {

			face->vertexNormals[ 0 ]->copy( vertexBuffer[ face->a ] );
			face->vertexNormals[ 1 ]->copy( vertexBuffer[ face->b ] );
			face->vertexNormals[ 2 ]->copy( vertexBuffer[ face->c ] );
			face->vertexNormals[ 3 ]->copy( vertexBuffer[ face->d ] );

		}

	}

	return this;
	
}

// -------------------------------------------------------------------- //

Geometry * Geometry::computeMorphNormals () {

	//FIXME:
	/*Face * face;

	// save original normals
	// - create temp variables on first access
	//   otherwise just copy (for faster repeated calls)

	for ( int i = 0; i < faces.size(); i++ ) {

		face = this.faces[ i ];

		if ( ! face.__originalFaceNormal ) {

			face.__originalFaceNormal = face.normal.clone();

		} else {

			face.__originalFaceNormal.copy( face.normal );

		}

		if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

		for ( int j = 0; j < face->vertexNormals.size(); j++ ) {

			if ( ! face.__originalVertexNormals[ j ] ) {

				face.__originalVertexNormals[ j ] = face.vertexNormals[ j ].clone();

			} else {

				face.__originalVertexNormals[ j ].copy( face.vertexNormals[ j ] );

			}

		}

	}

	// use temp geometry to compute face and vertex normals for each morph

	var tmpGeo = new THREE.Geometry();
	tmpGeo.faces = this.faces;

	for ( int i = 0; i < morphTargets.size(); i++ ) {

		// create on first access

		if ( ! this.morphNormals[ i ] ) {

			this.morphNormals[ i ] = {};
			this.morphNormals[ i ].faceNormals = [];
			this.morphNormals[ i ].vertexNormals = [];

			var dstNormalsFace = this.morphNormals[ i ].faceNormals;
			var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

			var faceNormal, vertexNormals;

			for ( int j = 0; j < faces.size(); j++ ) {

				face = this.faces[ j ];

				faceNormal = new THREE.Vector3();

				if ( face->instanceOf( ClassType::Face3 ) ) {

					vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

				} else {

					vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3() };

				}

				dstNormalsFace.push( faceNormal );
				dstNormalsVertex.push( vertexNormals );

			}

		}

		var morphNormals = this.morphNormals[ i ];

		// set vertices to morph target

		tmpGeo.vertices = this.morphTargets[ i ].vertices;

		// compute morph normals

		tmpGeo.computeFaceNormals();
		tmpGeo.computeVertexNormals();

		// store morph normals

		var faceNormal, vertexNormals;

		for ( int j = 0; j < faces.size(); j++ ) {

			face = this.faces[ j ];

			faceNormal = morphNormals.faceNormals[ j ];
			vertexNormals = morphNormals.vertexNormals[ j ];

			faceNormal.copy( face.normal );

			if ( face->instanceOf( ClassType::Face3 ) ) {

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );

			} else {

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );
				vertexNormals.d.copy( face.vertexNormals[ 3 ] );

			}

		}

	}

	// restore original normals

	for ( int i = 0; i < faces.size(); i++ ) {

		face = this.faces[ i ];

		face.normal = face.__originalFaceNormal;
		face.vertexNormals = face.__originalVertexNormals;

	}*/

	return this;
	
}

// -------------------------------------------------------------------- //

//FIXME:
Geometry * Geometry::computeTangents () {

	// based on http://www.terathon.com/code/tangent.html
	// tangents go to vertices

	/*var f, fl, v, vl, i, il, vertexIndex,
		face, uv, vA, vB, vC, uvA, uvB, uvC,
		x1, x2, y1, y2, z1, z2,
		s1, s2, t1, t2, r, t, test,
		tan1 = [], tan2 = [],
		sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
		tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
		n = new THREE.Vector3(), w;

	for ( int i = 0; i < vertices.size(); i++ ) {

		tan1[ i ] = new THREE.Vector3();
		tan2[ i ] = new THREE.Vector3();

	}

	function handleTriangle( context, a, b, c, ua, ub, uc ) {

		vA = context.vertices[ a ];
		vB = context.vertices[ b ];
		vC = context.vertices[ c ];

		uvA = uv[ ua ];
		uvB = uv[ ub ];
		uvC = uv[ uc ];

		x1 = vB.x - vA.x;
		x2 = vC.x - vA.x;
		y1 = vB.y - vA.y;
		y2 = vC.y - vA.y;
		z1 = vB.z - vA.z;
		z2 = vC.z - vA.z;

		s1 = uvB.x - uvA.x;
		s2 = uvC.x - uvA.x;
		t1 = uvB.y - uvA.y;
		t2 = uvC.y - uvA.y;

		r = 1.0 / ( s1 * t2 - s2 * t1 );
		sdir.set( ( t2 * x1 - t1 * x2 ) * r,
				  ( t2 * y1 - t1 * y2 ) * r,
				  ( t2 * z1 - t1 * z2 ) * r );
		tdir.set( ( s1 * x2 - s2 * x1 ) * r,
				  ( s1 * y2 - s2 * y1 ) * r,
				  ( s1 * z2 - s2 * z1 ) * r );

		tan1[ a ].add( sdir );
		tan1[ b ].add( sdir );
		tan1[ c ].add( sdir );

		tan2[ a ].add( tdir );
		tan2[ b ].add( tdir );
		tan2[ c ].add( tdir );

	}

	for ( int i = 0; i < faces.size(); i++ ) {

		face = this.faces[ i ];
		uv = this.faceVertexUvs[ 0 ][ i ]; // use UV layer 0 for tangents

		if ( face instanceof THREE.Face3 ) {

			handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );

		} else if ( face instanceof THREE.Face4 ) {

			handleTriangle( this, face.a, face.b, face.d, 0, 1, 3 );
			handleTriangle( this, face.b, face.c, face.d, 1, 2, 3 );

		}

	}

	var faceIndex = [ 'a', 'b', 'c', 'd' ];

	for ( int i = 0; i < faces.size(); i++ ) {

		face = this.faces[ i ];

		for ( j = 0; j < face->vertexNormals.size(); j++ ) {

			n.copy( face.vertexNormals[ j ] );

			vertexIndex = face[ faceIndex[ j ] ];

			t = tan1[ vertexIndex ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( face.vertexNormals[ j ], t );
			test = tmp2.dot( tan2[ vertexIndex ] );
			w = (test < 0.0) ? -1.0 : 1.0;

			face.vertexTangents[ j ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );

		}

	}

	this.hasTangents = true;*/

	return this;
	
}

// -------------------------------------------------------------------- //

Geometry * Geometry::computeLineDistances () {

	double d = 0;
	Group< Vector3 * > vertexBuffer = vertices;

	for ( int i = 0; i < vertexBuffer.size(); i++ ) {

		if ( i > 0 ) {

			d += vertexBuffer[ i ]->distanceTo( vertexBuffer[ i - 1 ] );

		}

		lineDistances[ i ] = d;

	}

	return this;
	
}

// -------------------------------------------------------------------- //

//FIXME:
Geometry * Geometry::computeBoundingBox () {

	/*if ( this.boundingBox === null ) {

		this.boundingBox = new THREE.Box3();

	}

	this.boundingBox.setFromPoints( this.vertices );*/
	
	return this;

}

// -------------------------------------------------------------------- //

//FIXME:
Geometry * Geometry::computeBoundingSphere () {

	/*if ( this.boundingSphere === null ) {

		this.boundingSphere = new THREE.Sphere();

	}

	this.boundingSphere.setFromCenterAndPoints( this.boundingSphere.center, this.vertices );*/

	return this;
	
}

// -------------------------------------------------------------------- //

	/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */

//FIXME:
int Geometry::mergeVertices() {

	Group< Vector3 * > unique;
	Group< int > changes;

	Vector3 * v;

	double precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
	double precision = pow( 10, precisionPoints );
	Face * face;

	bool isUnique;

	Group< Vector2 * > u;

	// reset cache of vertices as it now will be changing.
	__tmpVertices.resize(0);

	for ( int i = 0; i < vertices.size(); i++ ) {

		isUnique = true;
		v = vertices[ i ];

		for ( int j = 0; j < unique.size(); j++ ) {

			//Found a duplicate
			if ( v->equals( unique[ i ] ) ) {

				isUnique = false;

				break;

			}

		}

		if ( isUnique ) {

			changes.resize( i );
			changes[i] = unique.size() - 1;

			unique.push_back( vertices[i] );

		}

	};


	// if faces are completely degenerate after merging vertices, we
	// have to remove them from the geometry.
	Group< int > faceIndicesToRemove;
	Group< int > indices;
	indices.resize( 4 );

	for( int i = 0; i < faces.size(); i++ ) {

		face = faces[ i ];

		if ( face->instanceOf( ClassType::Face3 ) ) {

			face->a = changes[ face->a ];
			face->b = changes[ face->b ];
			face->c = changes[ face->c ];

			indices[0] = face->a;
			indices[1] = face->b;
			indices[2] = face->c;

			int dupIndex = -1;

			// if any duplicate vertices are found in a Face3
			// we have to remove the face as nothing can be saved
			for ( int n = 0; n < 3; n++ ) {

				if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

					dupIndex = n;
					faceIndicesToRemove.push_back( i );
					break;

				}

			}

		} else if ( face->instanceOf( ClassType::Face4 ) ) {

			face->a = changes[ face->a ];
			face->b = changes[ face->b ];
			face->c = changes[ face->c ];
			face->d = changes[ face->d ];

			// check dups in (a, b, c, d) and convert to -> face3

			indices[0] = face->a;
			indices[1] = face->b;
			indices[2] = face->c;
			indices[3] = face->d;

			int dupIndex = -1;

			for ( int n = 0; n < 4; n++ ) {

				if ( indices[ n ] == indices[ ( n + 1 ) % 4 ] ) {

					// if more than one duplicated vertex is found
					// we can't generate any valid Face3's, thus
					// we need to remove this face complete.
					if ( dupIndex >= 0 ) {

						faceIndicesToRemove.push_back( i );

					}

					dupIndex = n;

				}
			}

			if ( dupIndex >= 0 ) {

				indices.erase( dupIndex );

				Face3 * newFace = new Face3( indices[0], indices[1], indices[2], face->normal, face->color, face->materialIndex );

				for ( int j = 0; j < faceVertexUvs.size(); j++ ) {

					u = faceVertexUvs[ j ][ i ];

					if ( u.size() > 0 ) {
						u.erase( dupIndex );
					}

				}

				if( face->vertexNormals.size() > 0) {

					newFace->vertexNormals = face->vertexNormals;
					newFace->vertexNormals.erase( dupIndex );

				}

				if( face->vertexColors.size() > 0 ) {

					newFace->vertexColors = face->vertexColors;
					newFace->vertexColors.erase( dupIndex );
				}

				faces[ i ] = newFace;
			}

		}

	}

	for ( int i = faceIndicesToRemove.size() - 1; i >= 0; i -- ) {

		faces.erase( i );

		for ( int j = 0; j < faceVertexUvs.size(); j++ ) {

			faceVertexUvs[ j ].erase( i );

		}

	}

	// Use unique set of vertices

	int diff = vertices.size() - unique.size();
	vertices = unique;

	return diff;
	
}

// -------------------------------------------------------------------- //

Geometry * Geometry::clone () {

	Geometry * geometry = new Geometry();

	Group< Vector3 * > vertexBuffer = vertices;

	for ( int i = 0; i < vertexBuffer.size(); i++ ) {

		geometry->vertices.push_back( vertexBuffer[ i ]->clone() );

	}

	Group< Face *> faceBuffer = faces;

	for ( int i = 0; i < faceBuffer.size(); i++ ) {

		geometry->faces.push_back( faceBuffer[ i ]->clone() );

	}

	Group< Group< Vector2 * > > uvBuffer = faceVertexUvs[ 0 ];

	for ( int i = 0; i < uvBuffer.size(); i++  ) {

		Group< Vector2 * > uv = uvBuffer[ i ];
		Group< Vector2 * > uvCopy;

		for ( int j = 0; j < uv.size(); j++ ) {

			uvCopy.push_back( new Vector2( uv[ j ]->x, uv[ j ]->y ) );

		}

		geometry->faceVertexUvs[ 0 ].push_back( uvCopy );

	}

	return geometry;
	
}
