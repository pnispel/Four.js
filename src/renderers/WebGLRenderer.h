
#ifndef WEBGLRENDERER_H
#define WEBGLRENDERER_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: WebGLRenderer.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains WebGLRenderer header
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

#ifdef __APPLE__
#include <OpenGL/gl.h>
#include <Glut/glut.h>
#else
#include <GL/gl.h>
#include <GL/glut.h>
#endif

class GLLowLevelRenderer;
class GLMeshRenderer;
class GLParticleRenderer;
class GLLineRenderer;
class GLRibbonRenderer;
class GLShaderBuilder;
class Scene;
class Camera;
class Frustum;
class Color;
class Material;
class Geometry;
class WebGLObject;
class GeometryGroup;
class Texture;
class RenderTarget;
class Shader;
class Fog;
class Light;

/********************************************************************
***         S C E N E   D E F I N I T I O N
********************************************************************/

class WebGLRenderer {

	enum Precision {
		HIGH,
		MEDIUM,
		LOW
	};

	struct PrecisionResult {
		int range;
		int precision;
	};

	PrecisionResult _vertexShaderPrecisionHighpFloat;
	PrecisionResult _vertexShaderPrecisionMediumpFloat;
	PrecisionResult _vertexShaderPrecisionLowpFloat;
	PrecisionResult _fragmentShaderPrecisionHighpFloat;
	PrecisionResult _fragmentShaderPrecisionMediumpFloat;
	PrecisionResult _fragmentShaderPrecisionLowpFloat;
	PrecisionResult _vertexShaderPrecisionHighpInt;
	PrecisionResult _vertexShaderPrecisionMediumpInt;
	PrecisionResult _vertexShaderPrecisionLowpInt;
	PrecisionResult _fragmentShaderPrecisionHighpInt;
	PrecisionResult _fragmentShaderPrecisionMediumpInt;
	PrecisionResult _fragmentShaderPrecisionLowpInt;


	// ----------------------------------------
	// ** 	G P U    C A P A B I L I T I E S
	// ----------------------------------------

	int _maxTextures;
	int _maxVertexTextures;
	int _maxTextureSize;
	int _maxCubemapSize;

	int _maxAnisotropy;

	bool _supportsVertexTextures;
	bool _supportsBoneTextures;

	//FIXME: compressedTextureFormats	


	// ----------------------------------------
	// ** 	I N T E R N A L   P R O P S
	// ----------------------------------------

	//CHECK: probably not ints....
	Group< int > _programs;
	int _programs_counter;

	// ----------------------------------------
	// ** 	I N T E R N A L   S T A T E   C A C H E
	// ----------------------------------------

	// internal state cache

	int _currentProgram;
	int _currentFramebuffer;
	int _currentMaterialId;
	int _currentGeometryGroupHash;
	Camera * _currentCamera;
	int _geometryGroupCounter;

	int _usedTextureUnits;

	// GL state cache

	int _oldDoubleSided;
	int _oldFlipSided;

	int _oldBlending;

	int _oldBlendEquation;
	int _oldBlendSrc;
	int _oldBlendDst;

	bool _oldDepthTest;
	bool _oldDepthWrite;

	bool _oldPolygonOffset;
	double _oldPolygonOffsetFactor;
	double _oldPolygonOffsetUnits;

	int _oldLineWidth;

	int _viewportX;
	int _viewportY;
	int _viewportWidth;
	int _viewportHeight;
	int _currentWidth;
	int _currentHeight;

	//FIXME:
	//_enabledAttributes = {},

	// frustum

	Frustum * _frustum;

	 // camera matrices cache

	Matrix4 * _projScreenMatrix;
	Matrix4 * _projScreenMatrixPS;

	Vector3 * _vector3;

	// light arrays cache

	Vector3 * _direction;

	bool _lightsNeedUpdate;

	//FIXME:
	//_lights = {

	//	ambient: [ 0, 0, 0 ],
	//	directional: { length: 0, colors: new Array(), positions: new Array() },
	//	point: { length: 0, colors: new Array(), positions: new Array(), distances: new Array() },
	//	spot: { length: 0, colors: new Array(), positions: new Array(), distances: new Array(), directions: new Array(), anglesCos: new Array(), exponents: new Array() },
	//	hemi: { length: 0, skyColors: new Array(), groundColors: new Array(), positions: new Array() }

	//};


public: 
	int devicePixelRatio;

	// ----------------------------------------
	// ** 	P A R A M E T E R S
	// ----------------------------------------

	int _precision;
	bool _alpha;
	bool _premultipliedAlpha;
	bool _antialias;
	bool _stencil;
	bool _preserveDrawingBuffer;
	Color * _clearColor;
	double _clearAlpha;

	// ----------------------------------------
	// ** 	C L E A R I N G
	// ----------------------------------------

	bool autoClear;
	bool autoClearColor;
	bool autoClearDepth;
	bool autoClearStencil;

	// ----------------------------------------
	// ** 	S C E N E   G R A P H
	// ----------------------------------------

	bool sortObjects;
	bool autoUpdateObjects;
	bool autoUpdateScene;

	// ----------------------------------------
	// ** 	P H Y S I C A L   S H A D I N G
	// ----------------------------------------

	bool gammaInput;
	bool gammaOutput;
	bool physicallyBasedShading;

	// ----------------------------------------
	// ** 	S H A D O W   M A P
	// ----------------------------------------

	bool shadowMapEnabled;
	bool shadowMapAutoUpdate;
	int shadowMapType;
	int shadowMapCullFace;
	bool shadowMapDebug;
	bool shadowMapCascade;

	// ----------------------------------------
	// ** 	M O R P H S
	// ----------------------------------------

	int maxMorphTarget;
	int maxMorphNormals;

	// ----------------------------------------
	// ** 	F L A G S
	// ----------------------------------------

	bool autoScaleCubemaps;

	// ----------------------------------------
	// ** 	C U S T O M   R E N D E R   P L U G I N S
	// ----------------------------------------

	//FIXME:
	//this.renderPluginsPre = [];
	//this.renderPluginsPost = [];

	// ----------------------------------------
	// ** 	I N F O
	// ----------------------------------------

	//FIXME:

	//this.info = {

	//	memory: {
	//		programs: 0,
	//		geometries: 0,
	//		textures: 0
	//	},

	//	render: {
	//		calls: 0,
	//		vertices: 0,
	//		faces: 0,
	//		points: 0
	//	}

	//}


public: 
	WebGLRenderer ();

	void setSize ( int width, int height );
	void setViewport ( int x, int y, int width, int height );

	void setScissor ( int x, int y, int width, int height );
	void enableScissorTest ( bool enable );

	void setClearColorHex ( unsigned long hex, double alpha );
	void setClearColorRGBA ( double r, double g, double b, double alpha );
	void setClearColor ( Color * color, double alpha );

	void clear ();
	void clear ( bool color, bool depth, bool stencil );

	void render ( Scene * scene, Camera * camera, bool force );

	void initWebGLObjects ( Scene * scene );

	void initMaterial ( Material * material, Group< Light * > lights, Fog * fog, Object3D * object );
	void updateShadowMap ( Scene * scene, Camera * camera );
	void renderImmediateObject ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object );
	void setRenderTarget ( RenderTarget * renderTarget );

private:
	void createParticleBuffers ( Geometry * geometry );
	void createLineBuffers ( Geometry * geometry );
	void createRibbonBuffers ( Geometry * geometry );
	void createMeshBuffers ( GeometryGroup * group );

	void onGeometryDispose ( );
	void onTextureDispose ();
	void onRenderTargetDispose ();
	void onMaterialDispose ();

	void deallocateGeometry ( Geometry * geometry );
	void deallocateTexture ( Texture * texture );
	void deallocateRenderTarget ( RenderTarget * renderTarget );
	void deallocateMaterial ( Material * material );

	void deleteCustomAttributesBuffers ( Geometry * geometry );

	void initCustomAttributes ( Geometry * geometry, Object3D * object );

	void initParticleBuffers ( Geometry * geometry, Object3D * object );
	void initLineBuffers ( Geometry * geometry, Object3D * object );
	void initRibbonBuffers ( Geometry * geometry, Object3D * object );
	void initMeshBuffers ( GeometryGroup * group, Object3D * object );

	Material * getBufferMaterial ( Object3D * object, GeometryGroup * geometryGroup );

	bool materialNeedsSmoothNormals ( Material * material );
	int bufferGuessNormalType ( Material * material );

	Group< Color * > bufferGuessVertexColorType ( Material * material );

	bool bufferGuessUVType ( Material * material );

	void initDirectBuffers ( Geometry * geometry );

	void setParticleBuffers ( Geometry * geometry, GLuint hint, Object3D * object );
	void setLineBuffers ( Geometry * geometry, GLuint hint );
	void setRibbonBuffers ( Geometry * geometry, GLuint hint );
	void setMeshBuffers ( GeometryGroup * group, Object3D * object, GLuint hint, bool dispose, Material * material );

	void setDirectBuffers ( Geometry * geometry, GLuint hint, bool dispose );

	void renderBufferImmediate ( Object3D * object, GLuint program, Material * material );
	void renderBufferDirect ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, Geometry * geometry, Object3D * object );
	void renderBuffer ( Camera * camera, Group< Light * > * lights, Fog * fog, Material * material, GeometryGroup * geometryGroup, Object3D * object );

	void enableAttribute ( GLenum attribute );
	void disableAttributes ();

	void setupMorphTargets ( Material * material, GeometryGroup * geometryGroup, Object3D * object );

	//FIXME:
	//void painterSortStable ( ) {}
	//void numericalSort ( ) {}

	//FIXME:
	//void renderPlugins () {}

	//FIXME: from char to Four::Materialtype
	void renderObjects ( Group< WebGLObject * > renderList, bool reverse, int materialType, Camera * camera,
						 Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial );

	void renderObjectsImmediate ( Group< WebGLObject * > renderList, int materialType, Camera * camera,
						 		  Group< Light * > lights, Fog * fog, bool useBlending, Material * overrideMaterial);

	void unrollImmediateBufferMaterial ( WebGLObject * webglObject );
	void unrollBufferMaterial ( WebGLObject * webglObject );

	void sortFacesByMaterial ( Geometry * geometry, Material * material );

	void addObject ( Object3D * object, Scene * scene );
	void addBuffer ( Group<WebGLObject *> objlist, GeometryGroup * buffer, Object3D * object ) {}

	void addBufferImmediate ( Group< WebGLObject * > objlist, Object3D * object );

	void updateObject ( Object3D * object );

	bool areCustomAttributesDirty ( Material * material );;
	void clearCustomAttributes ( Material * material );;

	void removeObject ( Object3D * object, Scene * scene );

	//FIXME:
	//void removeInstances ( )
	//void removeInstancesDirect ( )

	void setMaterialShaders( Material * material, Group< Shader * > shaders );;
	GLuint setProgram ( Camera * camera, Group< Light * > lights, Fog * fog, Material * material, Object3D * object );




	void setDepthTest ( bool depthTest );
	void setDepthWrite ( bool depthWrite );

	void setPolygonOffset ( bool polygonOffset, double factor, double units );

	void setupMatrices ( Object3D * object, Camera * camera );

	void setBlending( int blending, int blendEquation, int blendSrc, int blendDst );




	void setCubeTexture ( Texture * texture, GLenum slot );

	void setCubeTextureDynamic ( Texture * texture, GLenum slot );

	void setupFrameBuffer ( GLuint framebuffer, RenderTarget * renderTarget, GLuint textureTarget );
	void setupRenderBuffer( GLuint renderbuffer, GLenum target );

	void updateRenderTargetMipmap ( RenderTarget * renderTarget );

	void filterFallback ( int f );

	void paramFourToGL ( int p );
	void allocateBones ( Object3D * object );

	void allocateLights ( Group< Light * > lights );
	void allocateShadows ( Group< Light * > lights );

	void initGL ();
	void setDefaultGLState ();

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/