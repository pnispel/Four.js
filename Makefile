export PATH := /usr/local/bin:$(PATH)

define NATIVE_LIBS 
--js-library native/library.js
endef

define JS
js/Four.js \
js/actor/Camera.js
endef

define NATIVE_HEADERS
native/math/Box.h \
native/math/Color.h \
native/math/Frustum.h \
native/math/Line3.h \
native/math/Math.h \
native/math/Matrix.h \
native/math/Plane.h \
native/math/Quaternion.h \
native/math/Ray.h \
native/math/Sphere.h \
native/math/Spline.h \
native/math/Triangle.h \
native/math/UV.h \
native/math/Vector.h \
native/math/Vertex.h 
endef

define NATIVE_SRC
native/math/src/Box.cpp \
native/math/src/Color.cpp \
native/math/src/Frustum.cpp \
native/math/src/Line3.cpp \
native/math/src/Math.cpp \
native/math/src/Matrix.cpp \
native/math/src/Plane.cpp \
native/math/src/Quaternion.cpp \
native/math/src/Ray.cpp \
native/math/src/Sphere.cpp \
native/math/src/Spline.cpp \
native/math/src/Triangle.cpp \
native/math/src/UV.cpp \
native/math/src/Vector.cpp \
native/math/src/Vertex.cpp \
\
native/Four.bindings.cpp 
endef

#python emscripten/em++ -O2 -s ASM_JS=1 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.html --compression emscripten/third_party/lzma.js/lzma-native,emscripten/third_party/lzma.js/lzma-decoder.js,LZMA.decompress

build: 
	# BUILDING BINDINGS
	python emscripten/tools/bindings_generator.py native/Four.bindings $(NATIVE_HEADERS) -- '{"ignored":"ClassType,Four"}'

	# APPEND THE BINDINGS WITH THE INCLUDES
	echo "#include <stdio.h> \n#include \"Four.bindings.fixed.h\""|cat - native/Four.bindings.cpp > /tmp/out && mv /tmp/out native/Four.bindings.cpp

	# ------------------------------------------------------------
	## 	R E P L A C E   B I N D I N G   H E A D E R S 
	# ------------------------------------------------------------

	# ../math --> math
	sed -e 's/\.\.\/math/math/g' native/Four.bindings.all.h > native/Four.bindings.fixed.h

	# ../core --> core
	sed -e 's/\.\.\/core/core/g' native/Four.bindings.fixed.h > native/Four.bindings.all.h

	# ../library.h --> library.h
	sed -e 's/\.\.\/library\.h/library\.h/g' native/Four.bindings.all.h > native/Four.bindings.fixed.h

	# Camera.h --> cameras/Camera.h
	sed -e 's/"Camera\.h/"cameras\/Camera\.h/g' native/Four.bindings.fixed.h > native/Four.bindings.all.h

	# EventDispatcher.h --> core/EventDispatcher.h
	sed -e 's/"EventDispatcher\.h/"core\/EventDispatcher\.h/g' native/Four.bindings.all.h > native/Four.bindings.fixed.h

	# Light.h --> lights/Light.h
	sed -e 's/"Light\.h/"lights\/Light\.h/g' native/Four.bindings.fixed.h > native/Four.bindings.all.h

	# Material.h --> materials/Material.h
	sed -e 's/"Material\.h/"materials\/Material\.h/g' native/Four.bindings.all.h > native/Four.bindings.fixed.h

	# Group.h --> core/Group.h ** Make sure to have the quote before 
	sed -e 's/"Group\.h/"core\/Group\.h/g' native/Four.bindings.fixed.h > native/Four.bindings.all.h

	# Move back to bindings fixed
	cat native/Four.bindings.all.h > native/Four.bindings.fixed.h

	# ------------------------------------------------------------
	## 	B U I L D   S O U R C E
	# ------------------------------------------------------------

	python emscripten/emcc -O2 -s ASM_JS=1 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.js 
	
	cat $(JS) >> build/Four.js
	cat native/Four.bindings.js >> build/Four.js

	uglifyjs --no-seqs build/Four.js > build/Four.min.js

.PHONY: lint docs build