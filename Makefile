export PATH := /usr/local/bin:$(PATH)

define NATIVE_LIBS 
--js-library native/library.js
endef

define JS
js/Four.js \
js/actor/Camera.js
endef

define NATIVE_HEADERS
native/library.h
endef

define NATIVE_SRC
native/library.cpp
endef

build: 
	# BUILDING BINDINGS
	python emscripten/tools/bindings_generator.py native/Four.bindings $(NATIVE_HEADERS) -- '{"ignored":"ClassType,Four"}'

	# APPEND THE BINDINGS WITH THE INCLUDES
	echo "#include <stdio.h> \n#include \"Four.bindings.fixed.h\""|cat - native/Four.bindings.cpp > /tmp/out && mv /tmp/out native/Four.bindings.cpp

	# ------------------------------------------------------------
	## 	R E P L A C E   B I N D I N G   H E A D E R S 
	# ------------------------------------------------------------

	# ------------------------------------------------------------
	## 	B U I L D   S O U R C E
	# ------------------------------------------------------------

	python emscripten/emcc -O2 -s ASM_JS=1 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.js 
	#python emscripten/em++ -O2 -s ASM_JS=1 -s EXPORT_BINDINGS=1 $(NATIVE_SRC) $(NATIVE_LIBS) -o build/Four.html --compression emscripten/third_party/lzma.js/lzma-native,emscripten/third_party/lzma.js/lzma-decoder.js,LZMA.decompress

	cat $(JS) >> build/Four.js
	cat native/Four.bindings.js >> build/Four.js

	uglifyjs --no-seqs build/Four.js > build/Four.min.js

.PHONY: lint docs build