#include "../WebGLRenderer.h"
#include "../../math/Matrix.h"
#include "../../math/Vector.h"
#include "../../math/Color.h"
#include "../../math/Frustum.h"
#include "../../scenes/Scene.h"
#include "../../materials/Material.h"
#include "../../cameras/Camera.h"
#include "../../core/Geometry.h"
#include "../../lights/Light.h"
#include "../../library.h"

#include <math.h>


extern "C" {
	extern int getWidth();
	extern int getHeight();
	extern int length();
	extern void callback( const double * arr );
	extern void _PtrToDwordArray( const int * ptr, size_t size );
	extern void glGetShaderPrecisionFormat (GLenum shaderType, GLenum precisionType, int * range, int * precision );
	extern int glGetParameter( GLenum type );
	extern void resizeCanvas( int width, int height, int devicePixelRatio );
	extern void glGenBuffers( int size, GLuint * buffers );
}

void WebGLRenderer::addObject( Object3D * object, Scene * scene ) {

	GeometryGroup * geometryGroup;

	if ( object->__webglInit == false ) {

		printf("%s %d\n", "adding object testing light ", object->instanceOf( ClassType::Light ) );
		printf("%s %d\n", "adding object testing mesh  ", object->instanceOf( ClassType::Mesh ) );

		object->__webglInit = true;

		object->_modelViewMatrix = new Matrix4();
		object->_normalMatrix = new Matrix3();

		printf("%s\n", "1");

		if ( object->geometry != NULL && object->geometry->__webglInit == false ) {

			object->geometry->__webglInit = true;

			//FIXME:
			//object->geometry->addEventListener( 'dispose', onGeometryDispose );

		}

		printf("%s\n", "2");

		Geometry * geometry = object->geometry;

		if ( geometry == NULL ) {
			printf("%s\n", "o no");
			// fail silently for now

		} else if ( geometry->instanceOf( ClassType::BufferGeometry ) ) {

			initDirectBuffers( geometry );

		} else if ( object->instanceOf( ClassType::Mesh ) ) {

			printf("%s\n", "3");

			Material * material = object->material;

			if ( geometry->geometryGroupsList.size() == 0 ) {

				sortFacesByMaterial( geometry, material );

			}

			int length = geometry->geometryGroupsList.size();

			for ( int i = 0; i < 10; i++ ) {

				geometryGroup = geometry->geometryGroupsList[ i ];

				// initialise VBO on the first access

				if ( ! geometryGroup->__webglVertexBuffer ) {

					createMeshBuffers( geometryGroup );
					initMeshBuffers( geometryGroup, object );

					geometry->verticesNeedUpdate = true;
					geometry->morphTargetsNeedUpdate = true;
					geometry->elementsNeedUpdate = true;
					geometry->uvsNeedUpdate = true;
					geometry->normalsNeedUpdate = true;
					geometry->tangentsNeedUpdate = true;
					geometry->colorsNeedUpdate = true;

				}

			}
		//FIXME:
		} //else if ( object instanceof THREE.Ribbon ) {

		//	if ( ! geometry.__webglVertexBuffer ) {

		//		createRibbonBuffers( geometry );
		//		initRibbonBuffers( geometry, object );

		//		geometry.verticesNeedUpdate = true;
		//		geometry.colorsNeedUpdate = true;
		//		geometry.normalsNeedUpdate = true;

		//	}

		//} else if ( object instanceof THREE.Line ) {

		//	if ( ! geometry.__webglVertexBuffer ) {

		//		createLineBuffers( geometry );
		//		initLineBuffers( geometry, object );

		//		geometry.verticesNeedUpdate = true;
		//		geometry.colorsNeedUpdate = true;
		//		geometry.lineDistancesNeedUpdate = true;

		//	}

		//} else if ( object instanceof THREE.ParticleSystem ) {

		//	if ( ! geometry.__webglVertexBuffer ) {

		//		createParticleBuffers( geometry );
		//		initParticleBuffers( geometry, object );

		//		geometry.verticesNeedUpdate = true;
		//		geometry.colorsNeedUpdate = true;

		//	}

		//}

	}

	if ( object->__webglActive == false ) {

		if ( object->instanceOf( ClassType::Mesh ) ) {

			Geometry * geometry = object->geometry;

			if ( geometry->instanceOf( ClassType::BufferGeometry ) ) {

				addBuffer( scene->__webglObjects, (GeometryGroup*)geometry, object );

			} else if ( geometry->instanceOf( ClassType::Geometry ) ) {

				int length = geometry->geometryGroupsList.size();

				for ( int i = 0; i < length; i++ ) {

					geometryGroup = geometry->geometryGroupsList[ i ];
					addBuffer( scene->__webglObjects, geometryGroup, object );

				}

			}

		//FIXME:
		} //else if ( object instanceof THREE.Ribbon ||
		//			object instanceof THREE.Line ||
		//			object instanceof THREE.ParticleSystem ) {

		//	geometry = object.geometry;
		//	addBuffer( scene.__webglObjects, geometry, object );

		//} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

		//	addBufferImmediate( scene.__webglObjectsImmediate, object );

		//} else if ( object instanceof THREE.Sprite ) {

		//	scene.__webglSprites.push( object );

		//} else if ( object instanceof THREE.LensFlare ) {

		//	scene.__webglFlares.push( object );

		//}

		object->__webglActive = true;
	}

}

void WebGLRenderer::removeObject( Object3D * object, Scene * scene ) {

	

}

void WebGLRenderer::render( Scene * scene, Camera * camera, bool force = false )
{
	int i;

	WebGLObject * webglObject;
	Object3D * object;

	Group< WebGLObject * > renderList;

	Group< Light * > lights = scene->__lights;
	Fog * fog = scene->fog;

	// reset caching for this frame

	_currentMaterialId = -1;
	_lightsNeedUpdate = true;

	// update scene graph

	if ( autoUpdateScene == true ) {
		scene->updateMatrixWorld();
	}

	if ( camera->parent == NULL ) {
		camera->updateMatrixWorld();
	}

	camera->matrixWorldInverse->getInverse( camera->matrixWorld );

	_projScreenMatrix->multiplyMatrices( camera->projectionMatrix, camera->matrixWorldInverse );
	_frustum->setFromMatrix( _projScreenMatrix );

	if ( autoUpdateObjects ) {

		initWebGLObjects( scene );

	}

	//renderPlugins( this.renderPluginsPre, scene, camera );

	
	//_this.info.render.calls = 0;
	//	_this.info.render.vertices = 0;
	//	_this.info.render.faces = 0;
	//	_this.info.render.points = 0;
	

	//setRenderTarget( renderTarget );

	if ( autoClear ) {

		clear( autoClearColor, autoClearDepth, autoClearStencil );

	}

	renderList = scene->__webglObjects;

	for ( int i = 0; i < renderList.size(); i++ ) {

		webglObject = renderList[i];
		object = webglObject->object;

		webglObject->render = false;

		if ( object->visible == true ) {

			if ( ( !object->instanceOf( ClassType::Mesh ) && !object->instanceOf( ClassType::ParticleSystem ) ) ||
				 ( object->frustumCulled != true ) ||
				 ( _frustum->intersectsObject( object ) ) ) {

				setupMatrices( object, camera );

				unrollBufferMaterial( webglObject );

				webglObject->render = true;

				if ( sortObjects == true ) {

					if ( object->renderDepth ) {

						webglObject->z = object->renderDepth;

					} else {

						_vector3->getPositionFromMatrix( object->matrixWorld );
						_vector3->applyProjection( _projScreenMatrix );

						webglObject->z = _vector3->z;

					}

					webglObject->id = object->id;

				}

			}

		}

	}

	//FIXME:
	//if ( sortObjects == true ) {

	//	renderList->sort( painterSortStable );

	//}

	renderList = scene->__webglObjectsImmediate;

	for ( int i = 0; i < renderList.size(); i++ ) {

		webglObject = renderList[i];
		object = webglObject->object;

		if ( object->visible == true ) {

			setupMatrices( object, camera );

			unrollImmediateBufferMaterial( webglObject );

		}

	}

	if ( scene->overrideMaterial != NULL ) {

		Material * material = scene->overrideMaterial;

		setBlending( material->blending, material->blendEquation, material->blendSrc, material->blendDst );
		setDepthTest( material->depthTest );
		setDepthWrite( material->depthWrite );
		setPolygonOffset( material->polygonOffset, material->polygonOffsetFactor, material->polygonOffsetUnits );

		renderObjects( scene->__webglObjects, false, 0, camera, lights, fog, true, material );
		renderObjectsImmediate( scene->__webglObjectsImmediate, 0, camera, lights, fog, false, material );

	} else {

		Material * material = NULL;

		//FIXME:
		//setBlending( THREE.NoBlending );

		renderObjects( scene->__webglObjects, true, Four::Opaque, camera, lights, fog, false, material );
		renderObjectsImmediate( scene->__webglObjectsImmediate, Four::Opaque, camera, lights, fog, false, material );

		renderObjects( scene->__webglObjects, false, Four::Transparent, camera, lights, fog, true, material );
		renderObjectsImmediate( scene->__webglObjectsImmediate, Four::Transparent, camera, lights, fog, true, material );

	}

	//FIXME:
	//renderPlugins( renderPluginsPost, scene, camera );

	//FIXME:
	//if ( renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter ) {
		//updateRenderTargetMipmap( renderTarget );
	//}

	setDepthTest( true );
	setDepthWrite( true );

}

WebGLRenderer::WebGLRenderer () :
	_precision ( HIGH ),
	_alpha ( true ), 
	_premultipliedAlpha ( true ),
	_antialias ( false ),
	_stencil ( true ),
	_preserveDrawingBuffer ( false ),
	_clearColor ( new Color( ) ),
	_clearAlpha ( 0 ) {

	//FIXME:
	devicePixelRatio = 1;

	// ----------------------------------------
	// ** 	C L E A R I N G
	// ----------------------------------------

	autoClear = true;
	autoClearColor = true;
	autoClearDepth = true;
	autoClearStencil = true;

	// ----------------------------------------
	// ** 	S C E N E   G R A P H
	// ----------------------------------------

	sortObjects = true;
	autoUpdateObjects = true;
	autoUpdateScene = true;

	// ----------------------------------------
	// ** 	P H Y S I C A L   S H A D I N G
	// ----------------------------------------

	gammaInput = false;
	gammaOutput = false;
	physicallyBasedShading = false;

	// ----------------------------------------
	// ** 	S H A D O W   M A P
	// ----------------------------------------

	//FIXME:
	shadowMapEnabled = false;
	shadowMapAutoUpdate = true;
	shadowMapType = Four::PCFShadowMap;
	shadowMapCullFace = Four::CullFaceFront;
	shadowMapDebug = false;
	shadowMapCascade = false;

	// ----------------------------------------
	// ** 	M O R P H S
	// ----------------------------------------

	maxMorphTarget = 8;
	maxMorphNormals = 4;

	// ----------------------------------------
	// ** 	F L A G S
	// ----------------------------------------

	autoScaleCubemaps = true;

	_programs_counter = 0;

	// internal state cache

	_currentProgram = NULL;
	_currentFramebuffer = NULL;
	_currentMaterialId = -1;
	_currentGeometryGroupHash = NULL;
	_currentCamera = NULL;
	_geometryGroupCounter = 0;

	_usedTextureUnits = 0;

	// GL state cache

	_oldDoubleSided = -1;
	_oldFlipSided = -1;

	_oldBlending = -1;

	_oldBlendEquation = -1;
	_oldBlendSrc = -1;
	_oldBlendDst = -1;

	_oldDepthTest = -1;
	_oldDepthWrite = -1;

	_oldPolygonOffset = NULL;
	_oldPolygonOffsetFactor = NULL;
	_oldPolygonOffsetUnits = NULL;

	_oldLineWidth = NULL;

	_viewportX = 0;
	_viewportY = 0;
	_viewportWidth = 0;
	_viewportHeight = 0;
	_currentWidth = 0;
	_currentHeight = 0;

	//FIXME:
	//_enabledAttributes = {},

	// frustum

	_frustum = new Frustum();

	 // camera matrices cache

	_projScreenMatrix = new Matrix4();
	_projScreenMatrixPS = new Matrix4();

	_vector3 = new Vector3();

	// light arrays cache

	_direction = new Vector3();

	_lightsNeedUpdate = true;


	// ********************************
	// ********************************
	// ********************************
	// ********************************
	
	//glGetParameter();

	int argc = 0;
	char * argv[0];

	glutInit(&argc, argv);
	glutInitWindowSize( getWidth(), getHeight() );
  	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);

   	glutCreateWindow("SMOKE");


   	initGL();
   	setDefaultGLState();

   	_maxTextures = glGetParameter( GL_MAX_TEXTURE_IMAGE_UNITS );
	_maxVertexTextures = glGetParameter( GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS );
	_maxTextureSize = glGetParameter( GL_MAX_TEXTURE_SIZE );
	_maxCubemapSize = glGetParameter( GL_MAX_CUBE_MAP_TEXTURE_SIZE );

	_maxAnisotropy = GL_EXT_texture_filter_anisotropic;

	_supportsVertexTextures = ( _maxVertexTextures > 0 );
	_supportsBoneTextures = _supportsVertexTextures && GL_EXT_texture_array;

	//FIXME:
	//_compressedTextureFormats = _glExtensionCompressedTextureS3TC ? _gl.getParameter( _gl.COMPRESSED_TEXTURE_FORMATS ) : [];


	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_HIGH_FLOAT, &_vertexShaderPrecisionHighpFloat.range, &_vertexShaderPrecisionHighpFloat.precision );
	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_MEDIUM_FLOAT, &_vertexShaderPrecisionMediumpFloat.range, &_vertexShaderPrecisionMediumpFloat.precision );
	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_LOW_FLOAT, &_vertexShaderPrecisionLowpFloat.range, &_vertexShaderPrecisionLowpFloat.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_HIGH_FLOAT, &_fragmentShaderPrecisionHighpFloat.range, &_fragmentShaderPrecisionHighpFloat.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT, &_fragmentShaderPrecisionMediumpFloat.range, &_fragmentShaderPrecisionMediumpFloat.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_LOW_FLOAT, &_fragmentShaderPrecisionLowpFloat.range, &_fragmentShaderPrecisionLowpFloat.precision );
	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_HIGH_INT, &_vertexShaderPrecisionHighpInt.range, &_vertexShaderPrecisionHighpInt.precision );
	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_MEDIUM_INT, &_vertexShaderPrecisionMediumpInt.range, &_vertexShaderPrecisionMediumpInt.precision );
	glGetShaderPrecisionFormat( GL_VERTEX_SHADER, GL_LOW_INT, &_vertexShaderPrecisionLowpInt.range, &_vertexShaderPrecisionLowpInt.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_HIGH_INT, &_fragmentShaderPrecisionHighpInt.range, &_fragmentShaderPrecisionHighpInt.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_MEDIUM_INT, &_fragmentShaderPrecisionMediumpInt.range, &_fragmentShaderPrecisionMediumpInt.precision );
	glGetShaderPrecisionFormat( GL_FRAGMENT_SHADER, GL_LOW_INT, &_fragmentShaderPrecisionLowpInt.range, &_fragmentShaderPrecisionLowpInt.precision );

	//Precision check
	bool highpAvailable = _vertexShaderPrecisionHighpFloat.precision > 0 && _fragmentShaderPrecisionHighpFloat.precision > 0;
	bool mediumpAvailable = _vertexShaderPrecisionMediumpFloat.precision > 0 && _fragmentShaderPrecisionMediumpFloat.precision > 0;

	if ( _precision == HIGH && ! highpAvailable ) {

		if ( mediumpAvailable ) {

			_precision = MEDIUM;
			printf("%s\n", "WebGLRenderer: highp not supported, using mediump" );

		} else {

			_precision = LOW;
			printf("%s\n", "WebGLRenderer: highp and mediump not supported, using lowp" );

		}

	}

	if ( _precision == MEDIUM && ! mediumpAvailable ) {

		_precision = LOW;
		printf("%s\n", "WebGLRenderer: mediump not supported, using lowp" );

	}
		
}

// -------------------------------------------------------------------- //

void WebGLRenderer::setSize ( int width, int height ) {

	resizeCanvas( width, height, devicePixelRatio );

	setViewport( 0, 0, width * devicePixelRatio, height * devicePixelRatio );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setViewport ( int x, int y, int width, int height ) {

	_viewportX = x;
	_viewportY = y;

	_viewportWidth = width;
	_viewportHeight = height;

	glViewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setScissor ( int x, int y, int width, int height ) {

	glScissor( x, y, width, height );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::enableScissorTest ( bool enable ) {

	enable ? glEnable( GL_SCISSOR_TEST ) : glDisable( GL_SCISSOR_TEST );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setPolygonOffset ( bool polygonOffset, double factor, double units ) {

	if ( _oldPolygonOffset != polygonOffset ) {

		if ( polygonOffset ) {

			glEnable( GL_POLYGON_OFFSET_FILL );

		} else {

			glDisable( GL_POLYGON_OFFSET_FILL );

		}

		_oldPolygonOffset = polygonOffset;

	}

	if ( polygonOffset && ( _oldPolygonOffsetFactor != factor || _oldPolygonOffsetUnits != units ) ) {

		glPolygonOffset( factor, units );

		_oldPolygonOffsetFactor = factor;
		_oldPolygonOffsetUnits = units;

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setDepthTest ( bool depthTest ) {

	if ( _oldDepthTest != depthTest ) {

		if ( depthTest ) {

			glEnable( GL_DEPTH_TEST );

		} else {

			glDisable( GL_DEPTH_TEST );

		}

		_oldDepthTest = depthTest;

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setDepthWrite ( bool depthWrite ) {

	if ( _oldDepthWrite != depthWrite ) {

		glDepthMask( depthWrite );
		_oldDepthWrite = depthWrite;

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setClearColorHex ( unsigned long hex, double alpha ) {

	_clearColor->set( hex );
	_clearAlpha = alpha;

	glClearColor( _clearColor->r, _clearColor->g, _clearColor->b, _clearAlpha );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setClearColorRGBA ( double r, double g, double b, double alpha ) {

	_clearColor->setRGB( r, g, b );
	_clearAlpha = alpha;

	glClearColor( _clearColor->r, _clearColor->g, _clearColor->b, _clearAlpha );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setClearColor ( Color * color, double alpha ) {

	_clearColor->copy( color );
	_clearAlpha = alpha;

	glClearColor( _clearColor->r, _clearColor->g, _clearColor->b, _clearAlpha );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::clear () {

	glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT );
	glutSwapBuffers();

}

// -------------------------------------------------------------------- //

void WebGLRenderer::clear ( bool color, bool depth, bool stencil ) {

	GLbitfield bitz = 0;

	if ( color ) {

		bitz |= GL_COLOR_BUFFER_BIT;

	}

	if ( depth ) {

		bitz |= GL_DEPTH_BUFFER_BIT;

	}

	if ( stencil ) {

		bitz |= GL_STENCIL_BUFFER_BIT;

	}

	glClear( bitz );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::createParticleBuffers ( Geometry * geometry ) {

	GLuint * buffers = new GLuint[2];
	buffers[0] = geometry->__webglVertexBuffer;
	buffers[1] = geometry->__webglColorBuffer;

	glGenBuffers( 2, buffers );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setupMatrices ( Object3D * object, Camera * camera ) {

	object->_modelViewMatrix->multiplyMatrices( camera->matrixWorldInverse, object->matrixWorld );

	object->_normalMatrix->getInverse( object->_modelViewMatrix );
	object->_normalMatrix->transpose();

}

// -------------------------------------------------------------------- //

void WebGLRenderer::unrollBufferMaterial ( WebGLObject * webglObject ) {

	Object3D * object = webglObject->object;
	GeometryGroup * buffer = webglObject->buffer;

	Material * material;
	Material * meshMaterial;
	int materialIndex;

	meshMaterial = object->material;

	if ( meshMaterial->instanceOf( ClassType::MeshFaceMaterial ) ) {

		materialIndex = buffer->materialIndex;

		material = meshMaterial->materials[ materialIndex ];

		if ( material->transparent ) {

			webglObject->transparent = material;
			webglObject->opaque = NULL;

		} else {

			webglObject->opaque = material;
			webglObject->transparent = NULL;

		}

	} else {

		material = meshMaterial;

		if ( material ) {

			if ( material->transparent ) {

				webglObject->transparent = material;
				webglObject->opaque = NULL;

			} else {

				webglObject->opaque = material;
				webglObject->transparent = NULL;

			}

		}

	}

}

// -------------------------------------------------------------------- //

void unrollImmediateBufferMaterial ( WebGLObject * globject ) {

	Object3D * object = globject->object;
	Material * material = object->material;

	if ( material->transparent ) {

		globject->transparent = material;
		globject->opaque = NULL;

	} else {

		globject->opaque = material;
		globject->transparent = NULL;

	}

}

// -------------------------------------------------------------------- //

void addBuffer ( Group<WebGLObject *> * objlist, GeometryGroup * buffer, Object3D * object ) {

	WebGLObject * obj = new WebGLObject( buffer, object );

	objlist->push_back( obj );

}

// -------------------------------------------------------------------- //

void addBufferImmediate ( Group< WebGLObject * > * objlist, Object3D * object ) {

	WebGLObject * obj = new WebGLObject( object );

	objlist->push_back( obj );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::createLineBuffers ( Geometry * geometry ) {

	GLuint * buffers = new GLuint[3];

	buffers[0] = geometry->__webglVertexBuffer;
	buffers[1] = geometry->__webglColorBuffer;
	buffers[2] = geometry->__webglLineDistanceBuffer;

	glGenBuffers( 3, buffers );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::createRibbonBuffers ( Geometry * geometry ) {

	GLuint * buffers = new GLuint[3];

	buffers[0] = geometry->__webglVertexBuffer;
	buffers[1] = geometry->__webglColorBuffer;
	buffers[2] = geometry->__webglNormalBuffer;

	glGenBuffers( 3, buffers );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::createMeshBuffers ( GeometryGroup * group ) {

	GLuint * buffers = new GLuint[10];

	buffers[0] = group->__webglVertexBuffer;
	buffers[1] = group->__webglNormalBuffer;
	buffers[2] = group->__webglTangentBuffer;
	buffers[3] = group->__webglColorBuffer;
	buffers[4] = group->__webglUVBuffer;
	buffers[5] = group->__webglUV2Buffer;

	buffers[6] = group->__webglSkinIndicesBuffer;
	buffers[7] = group->__webglSkinWeightsBuffer;

	buffers[8] = group->__webglFaceBuffer;
	buffers[9] = group->__webglLineBuffer;

	glGenBuffers( 10, buffers );

	//FIXME:
	//var m, ml;

	//if ( geometryGroup.numMorphTargets ) {

	//	geometryGroup.__webglMorphTargetsBuffers = [];

	//	for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

	//		geometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );

	//	}

	//}

	//if ( geometryGroup.numMorphNormals ) {

	//	geometryGroup.__webglMorphNormalsBuffers = [];

	//	for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

	//		geometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );

	//	}

	//}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::initWebGLObjects ( Scene * scene ) {

	Object3D * added = scene->__objectsAdded.back();

	while ( scene->__objectsAdded.size() > 0 ) {

		addObject( added, scene );

		scene->__objectsAdded.pop_back();

		added = scene->__objectsAdded.back();

	}
	
	for ( int i = 0; i < scene->__objectsRemoved.size(); i++ ) {

		removeObject( scene->__objectsRemoved[0], scene );
		scene->__objectsRemoved.erase( 0 );

	}

	for ( int i = 0; i < scene->__webglObjects.size(); i++ ) {

		printf("%s\n", "webglobjects");
		updateObject( scene->__webglObjects[i]->object );

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::updateObject ( Object3D * object ) {

	Geometry * geometry = object->geometry;
	GeometryGroup * geometryGroup;
	Material * material;
	bool customAttributesDirty = false;

	if ( geometry->instanceOf( ClassType::BufferGeometry ) ) {

		setDirectBuffers( geometry, GL_DYNAMIC_DRAW, !geometry->dynamic );

	} else if ( object->instanceOf( ClassType::Mesh ) ) {

		for ( int i = 0; i < geometry->geometryGroupsList.size(); i++ ) {

			geometryGroup = geometry->geometryGroupsList[ i ];

			if ( geometry->buffersNeedUpdate ) {

				initMeshBuffers( geometryGroup, object );

			}

			//FIXME:
			//customAttributesDirty = material->attributes && areCustomAttributesDirty( material );

			if ( geometry->verticesNeedUpdate || geometry->morphTargetsNeedUpdate || geometry->elementsNeedUpdate ||
				 geometry->uvsNeedUpdate || geometry->normalsNeedUpdate ||
				 geometry->colorsNeedUpdate || geometry->tangentsNeedUpdate /*|| customAttributesDirty*/ ) {

				setMeshBuffers( geometryGroup, object, GL_DYNAMIC_DRAW, !geometry->dynamic, material );

			}

		}

		geometry->verticesNeedUpdate = false;
		geometry->morphTargetsNeedUpdate = false;
		geometry->elementsNeedUpdate = false;
		geometry->uvsNeedUpdate = false;
		geometry->normalsNeedUpdate = false;
		geometry->colorsNeedUpdate = false;
		geometry->tangentsNeedUpdate = false;

		geometry->buffersNeedUpdate = false;

	//END MESH
	} else if ( object->instanceOf( ClassType::Ribbon ) ) {

		material = getBufferMaterial( object, (GeometryGroup *)geometry );

		//FIXME:
		//customAttributesDirty = material->attributes && areCustomAttributesDirty( material );

		if ( geometry->verticesNeedUpdate || geometry->colorsNeedUpdate || geometry->normalsNeedUpdate /*|| customAttributesDirty*/ ) {

			setRibbonBuffers( geometry, GL_DYNAMIC_DRAW );

		}

		geometry->verticesNeedUpdate = false;
		geometry->colorsNeedUpdate = false;
		geometry->normalsNeedUpdate = false;

		//FIXME:
		//material->attributes && clearCustomAttributes( material );

	} else if ( object->instanceOf( ClassType::Line ) ) {

		material = getBufferMaterial( object, (GeometryGroup *)geometry );

		//FIXME:
		//customAttributesDirty = material->attributes && areCustomAttributesDirty( material );

		if ( geometry->verticesNeedUpdate || geometry->colorsNeedUpdate || geometry->lineDistancesNeedUpdate /*|| customAttributesDirty*/ ) {

			setLineBuffers( geometry, GL_DYNAMIC_DRAW );

		}

		geometry->verticesNeedUpdate = false;
		geometry->colorsNeedUpdate = false;
		geometry->lineDistancesNeedUpdate = false;

		//FIXME:
		//material->attributes && clearCustomAttributes( material );


	} else if ( object->instanceOf( ClassType::ParticleSystem ) ) {

		material = getBufferMaterial( object, (GeometryGroup *)geometry );

		//FIXME:
		//customAttributesDirty = material->attributes && areCustomAttributesDirty( material );

		if ( geometry->verticesNeedUpdate || geometry->colorsNeedUpdate || object->sortParticles /*|| customAttributesDirty*/ ) {

			setParticleBuffers( geometry, GL_DYNAMIC_DRAW, object );

		}

		geometry->verticesNeedUpdate = false;
		geometry->colorsNeedUpdate = false;

		//FIXME:
		//material->attributes && clearCustomAttributes( material );

	}
 
}

// -------------------------------------------------------------------- //

void WebGLRenderer::initGL () {

	//TODO: implement me

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setDefaultGLState () {

	glClearColor( 0.0f, 0.0f, 0.0f, 1.0f );
	glClearDepth( 1.0f );
	glClearStencil( 0.0f );

	glEnable( GL_DEPTH_TEST );
	glDepthFunc( GL_LEQUAL );

	glFrontFace( GL_CCW );
	glCullFace( GL_BACK );
	glEnable( GL_CULL_FACE );

	glEnable( GL_BLEND );
	glBlendEquation( GL_FUNC_ADD );
	glBlendFunc( GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA );

	glClearColor( _clearColor->r, _clearColor->g, _clearColor->b, _clearAlpha );

}

// -------------------------------------------------------------------- //

//FIXME:
void WebGLRenderer::initMaterial ( Material * material, Group< Light * > lights, Fog * fog, Object3D * object ) {

	if ( material->instanceOf( ClassType::MeshDepthMaterial ) ) {

	} else if ( material->instanceOf( ClassType::MeshNormalMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::MeshBasicMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::MeshLambertMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::MeshPhongMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::LineBasicMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::LineDashedMaterial ) ) {
		
	} else if ( material->instanceOf( ClassType::ParticleBasicMaterial ) ) {
		
	}
 
}

// -------------------------------------------------------------------- //

void WebGLRenderer::updateShadowMap ( Scene * scene, Camera * camera ) {

	_currentProgram = NULL;
	_oldBlending = -1;
	_oldDepthTest = -1;
	_oldDepthWrite = -1;
	_currentGeometryGroupHash = -1;
	_currentMaterialId = -1;
	_lightsNeedUpdate = true;
	_oldDoubleSided = -1;
	_oldFlipSided = -1;

	//FIXME:
	//this.shadowMapPlugin.update( scene, camera );

}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderImmediateObject ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object ) {

	GLuint program = setProgram( camera, lights, fog, material, object );

	_currentGeometryGroupHash = -1;

	//setMaterialFaces( material );

	//FIXME:
	//if ( object->immediateRenderCallback ) {

	///	object->immediateRenderCallback( program, _gl, _frustum );

	//} else {

		//object->render( function( object ) { _this.renderBufferImmediate( object, program, material ); } );

	//}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::setRenderTarget ( RenderTarget * renderTarget ) {

	/*var isCube = ( renderTarget instanceof THREE.WebGLRenderTargetCube );

	if ( renderTarget && ! renderTarget.__webglFramebuffer ) {

		if ( renderTarget.depthBuffer === undefined ) renderTarget.depthBuffer = true;
		if ( renderTarget.stencilBuffer === undefined ) renderTarget.stencilBuffer = true;

		renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

		renderTarget.__webglTexture = _gl.createTexture();

		_this.info.memory.textures ++;

		// Setup texture, create render and frame buffers

		var isTargetPowerOfTwo = isPowerOfTwo( renderTarget.width ) && isPowerOfTwo( renderTarget.height ),
			glFormat = paramThreeToGL( renderTarget.format ),
			glType = paramThreeToGL( renderTarget.type );

		if ( isCube ) {

			renderTarget.__webglFramebuffer = [];
			renderTarget.__webglRenderbuffer = [];

			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
			setTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget, isTargetPowerOfTwo );

			for ( var i = 0; i < 6; i ++ ) {

				renderTarget.__webglFramebuffer[ i ] = _gl.createFramebuffer();
				renderTarget.__webglRenderbuffer[ i ] = _gl.createRenderbuffer();

				_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

				setupFrameBuffer( renderTarget.__webglFramebuffer[ i ], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );
				setupRenderBuffer( renderTarget.__webglRenderbuffer[ i ], renderTarget );

			}

			if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

		} else {

			renderTarget.__webglFramebuffer = _gl.createFramebuffer();

			if ( renderTarget.shareDepthFrom ) {

				renderTarget.__webglRenderbuffer = renderTarget.shareDepthFrom.__webglRenderbuffer;

			} else {

				renderTarget.__webglRenderbuffer = _gl.createRenderbuffer();

			}

			_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
			setTextureParameters( _gl.TEXTURE_2D, renderTarget, isTargetPowerOfTwo );

			_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

			setupFrameBuffer( renderTarget.__webglFramebuffer, renderTarget, _gl.TEXTURE_2D );

			if ( renderTarget.shareDepthFrom ) {

				if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

					_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderTarget.__webglRenderbuffer );

				} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

					_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderTarget.__webglRenderbuffer );

				}

			} else {

				setupRenderBuffer( renderTarget.__webglRenderbuffer, renderTarget );

			}

			if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

		}

		// Release everything

		if ( isCube ) {

			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

		} else {

			_gl.bindTexture( _gl.TEXTURE_2D, null );

		}

		_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );
		_gl.bindFramebuffer( _gl.FRAMEBUFFER, null );

	}

	var framebuffer, width, height, vx, vy;

	if ( renderTarget ) {

		if ( isCube ) {

			framebuffer = renderTarget.__webglFramebuffer[ renderTarget.activeCubeFace ];

		} else {

			framebuffer = renderTarget.__webglFramebuffer;

		}

		width = renderTarget.width;
		height = renderTarget.height;

		vx = 0;
		vy = 0;

	} else {

		framebuffer = null;

		width = _viewportWidth;
		height = _viewportHeight;

		vx = _viewportX;
		vy = _viewportY;

	}

	if ( framebuffer !== _currentFramebuffer ) {

		_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
		_gl.viewport( vx, vy, width, height );

		_currentFramebuffer = framebuffer;

	}

	_currentWidth = width;
	_currentHeight = height;*/

}

// -------------------------------------------------------------------- //

void WebGLRenderer::deallocateGeometry ( Geometry * geometry ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::deallocateTexture ( Texture * texture ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::deallocateRenderTarget ( RenderTarget * renderTarget ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::deallocateMaterial ( Material * material ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::deleteCustomAttributesBuffers ( Geometry * geometry ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::initCustomAttributes ( Geometry * geometry, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void initParticleBuffers ( Geometry * geometry, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::initLineBuffers ( Geometry * geometry, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::initRibbonBuffers ( Geometry * geometry, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::initMeshBuffers ( GeometryGroup * group, Object3D * object ) {


}

// -------------------------------------------------------------------- //

Material * WebGLRenderer::getBufferMaterial ( Object3D * object, GeometryGroup * geometryGroup ) { Material * material; return material;


}

// -------------------------------------------------------------------- //

bool WebGLRenderer::materialNeedsSmoothNormals ( Material * material ) { return false;


}

// -------------------------------------------------------------------- //

int WebGLRenderer::bufferGuessNormalType ( Material * material ) { return 1;


}

// -------------------------------------------------------------------- //

Group< Color * > WebGLRenderer::bufferGuessVertexColorType ( Material * material ) { Group< Color * > colors; return colors;


}

// -------------------------------------------------------------------- //

bool WebGLRenderer::bufferGuessUVType ( Material * material ) { return false;


}

// -------------------------------------------------------------------- //

void WebGLRenderer::initDirectBuffers ( Geometry * geometry ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setParticleBuffers ( Geometry * geometry, GLuint hint, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setLineBuffers ( Geometry * geometry, GLuint hint ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setRibbonBuffers ( Geometry * geometry, GLuint hint ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setMeshBuffers ( GeometryGroup * group, Object3D * object, GLuint hint, bool dispose, Material * material ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setDirectBuffers ( Geometry * geometry, GLuint hint, bool dispose ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderBufferImmediate ( Object3D * object, GLuint program, Material * material ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderBufferDirect ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, Geometry * geometry, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderBuffer ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, GeometryGroup * geometryGroup, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::enableAttribute ( GLenum attribute ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::disableAttributes () {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setupMorphTargets ( Material * material, GeometryGroup * geometryGroup, Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderObjects ( Group< WebGLObject * > renderList, bool reverse, int materialType, Camera * camera,
					 Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial ) {

	WebGLObject * webglObject;
	Object3D * object;
	GeometryGroup * buffer;
	Material * material;

	int start, end, delta;

	if ( reverse ) {

		start = renderList.size() - 1;
		end = -1;
		delta = -1;

	} else {

		start = 0;
		end = renderList.size();
		delta = 1;

	}

	for ( int i = start; i != end; i += delta ) {

		webglObject = renderList[ i ];

		if ( webglObject->render ) {

			object = webglObject->object;
			buffer = webglObject->buffer;

			if ( overrideMaterial != NULL ) {

				material = overrideMaterial;

			} else {

				material = webglObject->getMaterialByType( materialType );

				if ( material == NULL ) continue;

				if ( useBlending ) setBlending( material->blending, material->blendEquation, material->blendSrc, material->blendDst);

				setDepthTest( material->depthTest );
				setDepthWrite( material->depthWrite );
				setPolygonOffset( material->polygonOffset, material->polygonOffsetFactor, material->polygonOffsetUnits );

			}

			//setMaterialFaces( material );

			//FIXME:
			//if ( buffer->instanceOf( ClassType::BufferGeometry ) ) {

				//renderBufferDirect( camera, lights, fog, material, buffer, object );

			//} else {

			renderBuffer( camera, lights, fog, material, buffer, object );

			//}

		}

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::renderObjectsImmediate ( Group< WebGLObject * > renderList, int materialType, Camera * camera,
					 		  Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial) {

	WebGLObject * webglObject;
	Object3D * object;
	Material * material;
	GLuint program;

	for ( int i = 0; i < renderList.size(); i++ ) {

		webglObject = renderList[ i ];
		object = webglObject->object;

		if ( object->visible ) {

			if ( overrideMaterial != NULL ) {

				material = overrideMaterial;

			} else {

				material = webglObject->getMaterialByType( materialType );

				if ( material == NULL ) continue;

				if ( useBlending ) setBlending( material->blending, material->blendEquation, material->blendSrc, material->blendDst );

				setDepthTest( material->depthTest );
				setDepthWrite( material->depthWrite );
				setPolygonOffset( material->polygonOffset, material->polygonOffsetFactor, material->polygonOffsetUnits );

			}

			renderImmediateObject( camera, lights, fog, material, object );

		}

	}

}

// -------------------------------------------------------------------- //

void WebGLRenderer::unrollImmediateBufferMaterial ( WebGLObject * webglObject ) {

	

}

// -------------------------------------------------------------------- //

void WebGLRenderer::sortFacesByMaterial ( Geometry * geometry, Material * material ) {


}

// -------------------------------------------------------------------- //

bool WebGLRenderer::areCustomAttributesDirty ( Material * material ) { return false;


}

// -------------------------------------------------------------------- //

void WebGLRenderer::clearCustomAttributes ( Material * material ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setMaterialShaders( Material * material, Group< Shader * > shaders ) {


}

// -------------------------------------------------------------------- //

GLuint WebGLRenderer::setProgram ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object ) { return 0;


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setBlending( int blending, int blendEquation, int blendSrc, int blendDst ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setupFrameBuffer ( GLuint framebuffer, RenderTarget * renderTarget, GLuint textureTarget ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::setupRenderBuffer( GLuint renderbuffer, GLenum target ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::updateRenderTargetMipmap ( RenderTarget * renderTarget ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::filterFallback ( int f ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::paramFourToGL ( int p ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::allocateBones ( Object3D * object ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::allocateLights ( Group< Light * > lights ) {


}

// -------------------------------------------------------------------- //

void WebGLRenderer::allocateShadows ( Group< Light * > lights ) {


}

// -------------------------------------------------------------------- //


