//// native/library.h
class Four {

public:
	int GeometryIdCount;
	int ObjectIdCount;
	int MaterialIdCount;

	// --------------------------------------------------
	// ** 	G L   S T A T E   C O N S T A N T S
	// --------------------------------------------------

	static int const CullFaceNone = 0;
	static int const CullFaceBack = 1;
	static int const CullFaceFront = 2;
	static int const CullFaceFrontBack = 3;

	static int const FrontFaceDirectionCW = 0;
	static int const FrontFaceDirectionCCW = 1;

	// --------------------------------------------------
	// ** 	S H A D O W I N G   T Y P E S
	// --------------------------------------------------

	static int const BasicShadowMap = 0;
	static int const PCFShadowMap = 1;
	static int const PCFSoftShadowMap = 2;

	// --------------------------------------------------
	// ** 	M A T E R I A L   C O N S T A N T S
	// --------------------------------------------------

	static int const FrontSide = 0;
	static int const BackSide = 1;
	static int const DoubleSide = 2;

	static int const NoShading = 0;
	static int const FlatShading = 1;
	static int const SmoothShading = 2;

	static int const NoColors = 0;
	static int const FaceColors = 1;
	static int const VertexColors = 2;

	static int const NoBlending = 0;
	static int const NormalBlending = 1;
	static int const AdditiveBlending = 2;
	static int const SubtractiveBlending = 3;
	static int const MultiplyBlending = 4;
	static int const CustomBlending = 5;

	static int const AddEquation = 100;
	static int const SubtractEquation = 101;
	static int const ReverseSubtractEquation = 102;

	static int const ZeroFactor = 200;
	static int const OneFactor = 201;
	static int const SrcColorFactor = 202;
	static int const OneMinusSrcColorFactor = 203;
	static int const SrcAlphaFactor = 204;
	static int const OneMinusSrcAlphaFactor = 205;
	static int const DstAlphaFactor = 206;
	static int const OneMinusDstAlphaFactor = 207;

	static int const MultiplyOperation = 0;
	static int const MixOperation = 1;
	static int const AddOperation = 2;

	//FIXME:
	//THREE.UVMapping = function () {};

	//THREE.CubeReflectionMapping = function () {};
	//THREE.CubeRefractionMapping = function () {};

	//THREE.SphericalReflectionMapping = function () {};
	//THREE.SphericalRefractionMapping = function () {};

	static int const RepeatWrapping = 1000;
	static int const ClampToEdgeWrapping = 1001;
	static int const MirroredRepeatWrapping = 1002;

	static int const NearestFilter = 1003;
	static int const NearestMipMapNearestFilter = 1004;
	static int const NearestMipMapLinearFilter = 1005;
	static int const LinearFilter = 1006;
	static int const LinearMipMapNearestFilter = 1007;
	static int const LinearMipMapLinearFilter = 1008;

	static int const UnsignedByteType = 1009;
	static int const ByteType = 1010;
	static int const ShortType = 1011;
	static int const UnsignedShortType = 1012;
	static int const IntType = 1013;
	static int const UnsignedIntType = 1014;
	static int const FloatType = 1015;

	static int const UnsignedShort4444Type = 1016;
	static int const UnsignedShort5551Type = 1017;
	static int const UnsignedShort565Type = 1018;

	static int const AlphaFormat = 1019;
	static int const RGBFormat = 1020;
	static int const RGBAFormat = 1021;
	static int const LuminanceFormat = 1022;
	static int const LuminanceAlphaFormat = 1023;

	// Compressed texture formats

	static int const RGB_S3TC_DXT1_Format = 2001;
	static int const RGBA_S3TC_DXT1_Format = 2002;
	static int const RGBA_S3TC_DXT3_Format = 2003;
	static int const RGBA_S3TC_DXT5_Format = 2004;

	static int const Opaque = 3001;
	static int const Transparent = 3001;


	static Four& get() {

		static Four instance;

		return instance;

	}

private:
	Four(){ GeometryIdCount = 0; ObjectIdCount = 0; MaterialIdCount = 0; }

	Four( Four const & );
	void operator=( Four const& );

};

class ClassType {

public:
	ClassType() {};

	// --------------------------------------------------
	// ** 	C A M E R A S
	// --------------------------------------------------

	static int const Camera = 1;
	static int const OrthographicCamera = 2;
	static int const PerspectiveCamera = 3;

	// --------------------------------------------------
	// ** 	C O R E
	// --------------------------------------------------

	static int const BufferGeometry = 4;
	static int const Clock = 5;
	static int const EventDispatcher = 6;
	static int const Face3 = 7;
	static int const Face4 = 8;
	static int const Geometry = 9;
	static int const Object3D = 10;
	static int const Projector = 11;
	static int const Raycaster = 12;

	// --------------------------------------------------
	// ** 	E X T R A S
	// --------------------------------------------------

	// --------------------------------------------------
	// ** 	L I G H T S
	// --------------------------------------------------

	static int const AmbientLight = 13;
	static int const AreaLight = 14;
	static int const DirectionalLight = 15;
	static int const HemisphereLight = 16;
	static int const Light = 17;
	static int const PointLight = 18;
	static int const SpotLight = 19;

	// --------------------------------------------------
	// ** 	L O A D E R S
	// --------------------------------------------------

	static int const ImageLoader = 20;
	static int const JSONLoader = 21;
	static int const Loader = 22;
	static int const LoadingMonitor = 23;
	static int const SceneLoader = 24;
	static int const TextureLoader = 25;

	// --------------------------------------------------
	// ** 	M A T E R I A L S
	// --------------------------------------------------

	static int const LineBasicMaterial = 26;
	static int const LineDashedMaterial = 27;
	static int const Material = 28;
	static int const MeshBasicMaterial = 29;
	static int const MeshDepthMaterial = 30;
	static int const MeshFaceMaterial = 31;
	static int const MeshLambertMaterial = 32;
	static int const MeshNormalMaterial = 33;
	static int const MeshPhongMaterial = 34;
	static int const ParticleBasicMaterial = 35;
	static int const ParticleCanvasMaterial = 36;
	static int const ShaderMaterial = 37;
	static int const SpriteMaterial = 38;

	// --------------------------------------------------
	// ** 	M A T H 
	// --------------------------------------------------

	static int const Box2 = 39;
	static int const Box3 = 40;
	static int const Color = 41;
	static int const Frustum = 42;
	static int const Line3 = 43;
	static int const Matrix3 = 44;
	static int const Matrix4 = 45;
	static int const Plane = 46;
	static int const Quaternion = 47;
	static int const Ray = 48;
	static int const Sphere = 49;
	static int const Spline = 50;
	static int const Triangle = 51;
	static int const UV = 52;
	static int const Vector2 = 53;
	static int const Vector3 = 54;
	static int const Vector4 = 55;
	static int const Vertex = 56;

	// --------------------------------------------------
	// ** 	O B J E C T S
	// --------------------------------------------------

	static int const Bone = 57;
	static int const LOD = 58;
	static int const Line = 59;
	static int const Mesh = 60;
	static int const MorphAnimMesh = 61;
	static int const Particle = 62;
	static int const ParticleSystem = 63;
	static int const Ribbon = 64;
	static int const SkinnedMesh = 65;
	static int const Sprite = 66;

	// --------------------------------------------------
	// ** 	R E N D E R E R S
	// --------------------------------------------------

	static int const CanvasRenderer = 67;
	static int const WebGLRenderTarget = 68;
	static int const WebGLRenderTargetCube = 69;
	static int const WebGLRenderer = 70;

	// --------------------------------------------------
	// ** 	S C E N E S
	// --------------------------------------------------

	static int const Fog = 71;
	static int const FogExp2 = 72;
	static int const Scene = 73;

	// --------------------------------------------------
	// ** 	T E X T U R E S
	// --------------------------------------------------

	static int const CompressedTexture = 74;
	static int const DataTexture = 75;
	static int const Texture = 76;

};