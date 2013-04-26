export PATH := /usr/local/bin:$(PATH)

define JS
endef

define LLJS
src/Four.ljs \
src/math/Quaternion.ljs \
src/math/Vector3.ljs \
src/math/Matrix3.ljs \
src/math/Matrix4.ljs 
endef

define EXPORTED_FUNCS
malloc,\
reset,\
main
endef

build: 
	# -------------------------------------------------------
	# ** 	C O N C A T   A L L   L L J S

	cat $(LLJS) > temp.ljs

	# -------------------------------------------------------
	# ** 	C O M P I L E   L L J S   A S M

	./LLJS/bin/ljc -o build/Four.js -b temp.ljs

	# -------------------------------------------------------
	# ** 	C O N C A T   J S   F I L E S

	cat $(JS) >> build/Four.js

	# -------------------------------------------------------
	# ** 	M I N I F Y

	uglifyjs --no-seqs build/Four.js > build/Four.min.js

	# -------------------------------------------------------
	# ** 	C L E A N   U P

.PHONY: build
