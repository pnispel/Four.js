#include "../Actor.h"
#include "../../math/Vector.h"

extern "C" {

	Actor * __attribute__((used, noinline)) emscripten_bind_bind_newActor() {
  		return new Actor();
	}

	Actor * __attribute__((used, noinline)) emscripten_bind_test_newActor() {
  		return new Actor();
	}

	Actor * __attribute__((used, noinline)) emscripten_bind_tes_newActor() {
  		return new Actor();
	}

	Actor * __attribute__((used, noinline)) emscripten_bind_te_newActor() {
  		return new Actor();
	}

	Actor * __attribute__((used, noinline)) emscripten_bind__newActor() {
  		return new Actor();
	}

	Actor * __attribute__((used, noinline)) emscripten_bind_newActor() {
  		return new Actor();
	}
}