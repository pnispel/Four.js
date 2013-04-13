export PATH := /usr/local/bin:$(PATH)

define NATIVE_LIBS 
--js-library src/library.js
endef

define JS
src/Core.js
endef

define NATIVE_HEADERS
src/cameras/Camera.h \
src/cameras/OrthographicCamera.h \
src/cameras/PerspectiveCamera.h \
\
src/core/BufferGeometry.h \
src/core/Clock.h \
src/core/EventDispatcher.h \
src/core/Face.h \
src/core/Geometry.h \
src/core/Object3D.h \
src/core/Projector.h \
src/core/Raycaster.h \
src/core/Group.h \
\
src/geometries/CubeGeometry.h \
\
src/lights/AmbientLight.h \
src/lights/AreaLight.h \
src/lights/DirectionalLight.h \
src/lights/HemisphereLight.h \
src/lights/Light.h \
src/lights/PointLight.h \
src/lights/SpotLight.h \
\
src/materials/LineBasicMaterial.h \
src/materials/LineDashedMaterial.h \
src/materials/Material.h \
src/materials/MeshBasicMaterial.h \
src/materials/MeshDepthMaterial.h \
src/materials/MeshFaceMaterial.h \
src/materials/MeshLambertMaterial.h \
src/materials/MeshNormalMaterial.h \
src/materials/MeshPhongMaterial.h \
src/materials/ParticleBasicMaterial.h \
src/materials/ParticleCanvasMaterial.h \
src/materials/ShaderMaterial.h \
src/materials/SpriteMaterial.h \
\
src/math/Box.h \
src/math/Color.h \
src/math/Frustum.h \
src/math/Line3.h \
src/math/Math.h \
src/math/Matrix.h \
src/math/Plane.h \
src/math/Quaternion.h \
src/math/Ray.h \
src/math/Sphere.h \
src/math/Spline.h \
src/math/Triangle.h \
src/math/UV.h \
src/math/Vector.h \
src/math/Vertex.h \
\
src/objects/Bone.h \
src/objects/LOD.h \
src/objects/Line.h \
src/objects/Mesh.h \
src/objects/MorphAnimMesh.h \
src/objects/Particle.h \
src/objects/ParticleSystem.h \
src/objects/Ribbon.h \
src/objects/SkinnedMesh.h \
src/objects/Sprite.h \
\
src/renderers/CanvasRenderer.h \
src/renderers/WebGLRenderTarget.h \
src/renderers/WebGLRenderTargetCube.h \
src/renderers/WebGLRenderer.h \
src/renderers/WebGLRenderer2.h \
src/renderers/WebGLShaders.h \
src/renderers/webgl/LowLevelRenderer.h \
src/renderers/webgl/ShaderBuilder.h \
src/renderers/webgl/objects/LineRenderer.h \
src/renderers/webgl/objects/MeshRenderer.h \
src/renderers/webgl/objects/Object3DRenderer.h \
src/renderers/webgl/objects/ParticleRenderer.h \
src/renderers/webgl/objects/RibbonRenderer.h \
\
src/scenes/Fog.h \
src/scenes/FogExp2.h \
src/scenes/Scene.h \
\
src/textures/CompressedTexture.h \
src/textures/DataTexture.h \
src/textures/Texture.h \
\
src/library.h
endef

define NATIVE_SRC
src/cameras/src/Camera.cpp \
src/cameras/src/OrthographicCamera.cpp \
src/cameras/src/PerspectiveCamera.cpp \
\
src/core/src/BufferGeometry.cpp \
src/core/src/Clock.cpp \
src/core/src/EventDispatcher.cpp \
src/core/src/Face.cpp \
src/core/src/Geometry.cpp \
src/core/src/Object3D.cpp \
src/core/src/Projector.cpp \
src/core/src/Raycaster.cpp \
\
src/geometries/src/CubeGeometry.cpp \
\
src/lights/src/AmbientLight.cpp \
src/lights/src/AreaLight.cpp \
src/lights/src/DirectionalLight.cpp \
src/lights/src/HemisphereLight.cpp \
src/lights/src/Light.cpp \
src/lights/src/PointLight.cpp \
src/lights/src/SpotLight.cpp \
\
src/materials/src/LineBasicMaterial.cpp \
src/materials/src/LineDashedMaterial.cpp \
src/materials/src/Material.cpp \
src/materials/src/MeshBasicMaterial.cpp \
src/materials/src/MeshDepthMaterial.cpp \
src/materials/src/MeshFaceMaterial.cpp \
src/materials/src/MeshLambertMaterial.cpp \
src/materials/src/MeshNormalMaterial.cpp \
src/materials/src/MeshPhongMaterial.cpp \
src/materials/src/ParticleBasicMaterial.cpp \
src/materials/src/ParticleCanvasMaterial.cpp \
src/materials/src/ShaderMaterial.cpp \
src/materials/src/SpriteMaterial.cpp \
\
src/math/src/Box.cpp \
src/math/src/Color.cpp \
src/math/src/Frustum.cpp \
src/math/src/Line3.cpp \
src/math/src/Math.cpp \
src/math/src/Matrix.cpp \
src/math/src/Plane.cpp \
src/math/src/Quaternion.cpp \
src/math/src/Ray.cpp \
src/math/src/Sphere.cpp \
src/math/src/Spline.cpp \
src/math/src/Triangle.cpp \
src/math/src/UV.cpp \
src/math/src/Vector.cpp \
src/math/src/Vertex.cpp \
\
src/objects/src/Bone.cpp \
src/objects/src/LOD.cpp \
src/objects/src/Line.cpp \
src/objects/src/Mesh.cpp \
src/objects/src/MorphAnimMesh.cpp \
src/objects/src/Particle.cpp \
src/objects/src/ParticleSystem.cpp \
src/objects/src/Ribbon.cpp \
src/objects/src/SkinnedMesh.cpp \
src/objects/src/Sprite.cpp \
\
src/renderers/src/CanvasRenderer.cpp \
src/renderers/src/WebGLRenderTarget.cpp \
src/renderers/src/WebGLRenderTargetCube.cpp \
src/renderers/src/WebGLRenderer.cpp \
src/renderers/src/WebGLRenderer2.cpp \
src/renderers/src/WebGLShaders.cpp \
src/renderers/webgl/src/LowLevelRenderer.cpp \
src/renderers/webgl/src/ShaderBuilder.cpp \
src/renderers/webgl/objects/src/LineRenderer.cpp \
src/renderers/webgl/objects/src/MeshRenderer.cpp \
src/renderers/webgl/objects/src/Object3DRenderer.cpp \
src/renderers/webgl/objects/src/ParticleRenderer.cpp \
src/renderers/webgl/objects/src/RibbonRenderer.cpp \
\
src/scenes/src/Fog.cpp \
src/scenes/src/FogExp2.cpp \
src/scenes/src/Scene.cpp \
\
src/textures/src/CompressedTexture.cpp \
src/textures/src/DataTexture.cpp \
src/textures/src/Texture.cpp \
\
src/Four.bindings.cpp \
src/library.cpp
endef

build: 
	# BUILDING BINDINGS
	python emscripten/tools/bindings_generator.py src/Four.bindings $(NATIVE_HEADERS) -- '{"ignored":"ClassType,Four"}'

	# APPEND THE BINDINGS WITH THE INCLUDES
	echo "#include <stdio.h> \n#include \"Four.bindings.fixed.h\""|cat - src/Four.bindings.cpp > /tmp/out && mv /tmp/out src/Four.bindings.cpp

	# ------------------------------------------------------------
	## 	R E P L A C E   B I N D I N G   H E A D E R S 
	# ------------------------------------------------------------

	# ../math --> math
	sed -e 's/\.\.\/math/math/g' src/Four.bindings.all.h > src/Four.bindings.fixed.h

	# ../core --> core
	sed -e 's/\.\.\/core/core/g' src/Four.bindings.fixed.h > src/Four.bindings.all.h

	# ../library.h --> library.h
	sed -e 's/\.\.\/library\.h/library\.h/g' src/Four.bindings.all.h > src/Four.bindings.fixed.h

	# Camera.h --> cameras/Camera.h
	sed -e 's/"Camera\.h/"cameras\/Camera\.h/g' src/Four.bindings.fixed.h > src/Four.bindings.all.h

	# EventDispatcher.h --> core/EventDispatcher.h
	sed -e 's/"EventDispatcher\.h/"core\/EventDispatcher\.h/g' src/Four.bindings.all.h > src/Four.bindings.fixed.h

	# Light.h --> lights/Light.h
	sed -e 's/"Light\.h/"lights\/Light\.h/g' src/Four.bindings.fixed.h > src/Four.bindings.all.h

	# Material.h --> materials/Material.h
	sed -e 's/"Material\.h/"materials\/Material\.h/g' src/Four.bindings.all.h > src/Four.bindings.fixed.h

	# Group.h --> core/Group.h ** Make sure to have the quote before 
	sed -e 's/"Group\.h/"core\/Group\.h/g' src/Four.bindings.fixed.h > src/Four.bindings.all.h

	# Move back to bindings fixed
	cat src/Four.bindings.all.h > src/Four.bindings.fixed.h

	# ------------------------------------------------------------
	## 	B U I L D   S O U R C E
	# ------------------------------------------------------------

	python emscripten/emcc -O2 -s ASM_JS=1 --minify 0 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.js 
	#python emscripten/em++ -O2 -s ASM_JS=1 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.html --compression emscripten/third_party/lzma.js/lzma-native,emscripten/third_party/lzma.js/lzma-decoder.js,LZMA.decompress

	cat $(JS) >> build/Four.js
	cat src/Four.bindings.js >> build/Four.js

	uglifyjs --no-seqs build/Four.js > build/Four.min.js

.PHONY: lint docs build