
// Bindings utilities

var Object__cache = {}; // we do it this way so we do not modify |Object|
function wrapPointer(ptr, __class__) {
  var cache = __class__ ? __class__.prototype.__cache__ : Object__cache;
  var ret = cache[ptr];
  if (ret) return ret;
  __class__ = __class__ || Object;
  ret = Object.create(__class__.prototype);
  ret.ptr = ptr;
  ret.__class__ = __class__;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  if (obj.__class__ !== Object) {
    delete obj.__class__.prototype.__cache__[obj.ptr];
  } else {
    delete Object__cache[obj.ptr];
  }
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

function customizeVTable(object, replacementPairs) {
  // Does not handle multiple inheritance
  // Does not work with asm.js

  // Find out vtable size
  var vTable = getValue(object.ptr, 'void*');
  // This assumes our modification where we null-terminate vtables
  var size = 0;
  while (getValue(vTable + Runtime.QUANTUM_SIZE*size, 'void*')) {
    size++;
  }

  // Prepare replacement lookup table and add replacements to FUNCTION_TABLE
  // There is actually no good way to do this! So we do the following hack:
  // We create a fake vtable with canary functions, to detect which actual
  // function is being called
  var vTable2 = _malloc(size*Runtime.QUANTUM_SIZE);
  setValue(object.ptr, vTable2, 'void*');
  var canaryValue;
  var functions = FUNCTION_TABLE.length;
  for (var i = 0; i < size; i++) {
    var index = FUNCTION_TABLE.length;
    (function(j) {
      FUNCTION_TABLE.push(function() {
        canaryValue = j;
      });
    })(i);
    FUNCTION_TABLE.push(0);
    setValue(vTable2 + Runtime.QUANTUM_SIZE*i, index, 'void*');
  }
  var args = [{ptr: 0}];
  replacementPairs.forEach(function(pair) {
    // We need the wrapper function that converts arguments to not fail. Keep adding arguments til it works.
    while(1) {
      try {
        pair['original'].apply(object, args);
        break;
      } catch(e) {
        args.push(args[0]);
      }
    }
    pair.originalIndex = getValue(vTable + canaryValue*Runtime.QUANTUM_SIZE, 'void*');
  });
  FUNCTION_TABLE = FUNCTION_TABLE.slice(0, functions);

  // Do the replacements

  var replacements = {};
  replacementPairs.forEach(function(pair) {
    var replacementIndex = FUNCTION_TABLE.length;
    FUNCTION_TABLE.push(pair['replacement']);
    FUNCTION_TABLE.push(0);
    replacements[pair.originalIndex] = replacementIndex;
  });

  // Copy and modify vtable
  for (var i = 0; i < size; i++) {
    var value = getValue(vTable + Runtime.QUANTUM_SIZE*i, 'void*');
    if (value in replacements) value = replacements[value];
    setValue(vTable2 + Runtime.QUANTUM_SIZE*i, value, 'void*');
  }
  return object;
}
Module['customizeVTable'] = customizeVTable;

// Converts a value into a C-style string.
function ensureString(value) {
  if (typeof value == 'number') return value;
  return allocate(intArrayFromString(value), 'i8', ALLOC_STACK);
}

Vector3.prototype['clamp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__clamp_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector3__instanceOf_p1(this.ptr, arg0);
}

Vector3.prototype['applyMatrix3'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix3_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['set'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Vector3__set_p3(this.ptr, arg0, arg1, arg2), Module['Vector3']);
}

Vector3.prototype['get_x'] = function() {
    return _emscripten_bind_Vector3__get_x_p0(this.ptr);
}

Vector3.prototype['divide'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__divide_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['get_z'] = function() {
    return _emscripten_bind_Vector3__get_z_p0(this.ptr);
}

Vector3.prototype['getPositionFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__getPositionFromMatrix_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

function Vector3(arg0, arg1, arg2) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Vector3__Vector3_p0();
  else 
    this.ptr = _emscripten_bind_Vector3__Vector3_p3(arg0, arg1, arg2);
  Vector3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector3;
}
Vector3.prototype.__cache__ = {};
Module['Vector3'] = Vector3;

Vector3.prototype['addScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__addScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['divideScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__divideScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['crossVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__crossVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['lengthManhattan'] = function() {
    return _emscripten_bind_Vector3__lengthManhattan_p0(this.ptr);
}

Vector3.prototype['negate'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__negate_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__normalize_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector3__set_y_p1(this.ptr, arg0);
}

Vector3.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Vector3__set_z_p1(this.ptr, arg0);
}

Vector3.prototype['sub'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__sub_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['min'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__min_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['distanceTo'] = function(arg0) {
    return _emscripten_bind_Vector3__distanceTo_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['lerp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__lerp_p2(this.ptr, arg0.ptr, arg1), Module['Vector3']);
}

Vector3.prototype['getScaleFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__getScaleFromMatrix_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['transformDirection'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__transformDirection_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['distanceToSquared'] = function(arg0) {
    return _emscripten_bind_Vector3__distanceToSquared_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['add'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__add_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['multiplyVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__multiplyVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['get_y'] = function() {
    return _emscripten_bind_Vector3__get_y_p0(this.ptr);
}

Vector3.prototype['cross'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__cross_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__clone_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector3__set_x_p1(this.ptr, arg0);
}

Vector3.prototype['lengthSquared'] = function() {
    return _emscripten_bind_Vector3__lengthSquared_p0(this.ptr);
}

Vector3.prototype['get'] = function(arg0) {
    return _emscripten_bind_Vector3__get_p1(this.ptr, arg0);
}

Vector3.prototype['max'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__max_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiplyScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Vector3__equals_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['multiply'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiply_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['addVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__addVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__copy_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['applyProjection'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyProjection_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['setLength'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__setLength_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector3____destroy___p0(this.ptr);
}

Vector3.prototype['subVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__subVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['length'] = function() {
    return _emscripten_bind_Vector3__length_p0(this.ptr);
}

Vector3.prototype['applyQuaternion'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyQuaternion_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['dot'] = function(arg0) {
    return _emscripten_bind_Vector3__dot_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['setFromChar'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__setFromChar_p2(this.ptr, arg0, arg1), Module['Vector3']);
}

Triangle.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Triangle__instanceOf_p1(this.ptr, arg0);
}

Triangle.prototype['__destroy__'] = function() {
    _emscripten_bind_Triangle____destroy___p0(this.ptr);
}

function Triangle() {
    this.ptr = _emscripten_bind_Triangle__Triangle_p0();
  Triangle.prototype.__cache__[this.ptr] = this;
  this.__class__ = Triangle;
}
Triangle.prototype.__cache__ = {};
Module['Triangle'] = Triangle;

Frustum.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Frustum__instanceOf_p1(this.ptr, arg0);
}

Frustum.prototype['__destroy__'] = function() {
    _emscripten_bind_Frustum____destroy___p0(this.ptr);
}

Frustum.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Frustum__set_p6(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr, arg3.ptr, arg4.ptr, arg5.ptr), Module['Frustum']);
}

function Frustum(arg0, arg1, arg2, arg3, arg4, arg5) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Frustum__Frustum_p0();
  else 
    this.ptr = _emscripten_bind_Frustum__Frustum_p6(arg0.ptr, arg1.ptr, arg2.ptr, arg3.ptr, arg4.ptr, arg5.ptr);
  Frustum.prototype.__cache__[this.ptr] = this;
  this.__class__ = Frustum;
}
Frustum.prototype.__cache__ = {};
Module['Frustum'] = Frustum;

Frustum.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Frustum__clone_p0(this.ptr), Module['Frustum']);
}

Frustum.prototype['intersectsObject'] = function(arg0) {
    return _emscripten_bind_Frustum__intersectsObject_p1(this.ptr, arg0);
}

Frustum.prototype['setFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Frustum__setFromMatrix_p1(this.ptr, arg0.ptr), Module['Frustum']);
}

Frustum.prototype['containsPoint'] = function(arg0) {
    return _emscripten_bind_Frustum__containsPoint_p1(this.ptr, arg0.ptr);
}

Frustum.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Frustum__copy_p1(this.ptr, arg0.ptr), Module['Frustum']);
}

Frustum.prototype['intersectsSphere'] = function(arg0) {
    return _emscripten_bind_Frustum__intersectsSphere_p1(this.ptr, arg0.ptr);
}

Color.prototype['convertLinearToGamma'] = function() {
    return wrapPointer(_emscripten_bind_Color__convertLinearToGamma_p0(this.ptr), Module['Color']);
}

Color.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Color__instanceOf_p1(this.ptr, arg0);
}

Color.prototype['set'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__set_p1(this.ptr, arg0), Module['Color']);
}

Color.prototype['__destroy__'] = function() {
    _emscripten_bind_Color____destroy___p0(this.ptr);
}

function Color(arg0, arg1, arg2) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Color__Color_p0();
  else 
    this.ptr = _emscripten_bind_Color__Color_p3(arg0, arg1, arg2);
  Color.prototype.__cache__[this.ptr] = this;
  this.__class__ = Color;
}
Color.prototype.__cache__ = {};
Module['Color'] = Color;

Color.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Color__clone_p0(this.ptr), Module['Color']);
}

Color.prototype['get_r'] = function() {
    return _emscripten_bind_Color__get_r_p0(this.ptr);
}

Color.prototype['copyGammaToLinear'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__copyGammaToLinear_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['addColors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Color__addColors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Color']);
}

Color.prototype['add'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__add_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['setRGB'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Color__setRGB_p3(this.ptr, arg0, arg1, arg2), Module['Color']);
}

Color.prototype['get_g'] = function() {
    return _emscripten_bind_Color__get_g_p0(this.ptr);
}

Color.prototype['set_b'] = function(arg0) {
    _emscripten_bind_Color__set_b_p1(this.ptr, arg0);
}

Color.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__copy_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['convertGammaToLinear'] = function() {
    return wrapPointer(_emscripten_bind_Color__convertGammaToLinear_p0(this.ptr), Module['Color']);
}

Color.prototype['set_r'] = function(arg0) {
    _emscripten_bind_Color__set_r_p1(this.ptr, arg0);
}

Color.prototype['get_b'] = function() {
    return _emscripten_bind_Color__get_b_p0(this.ptr);
}

Color.prototype['set_g'] = function(arg0) {
    _emscripten_bind_Color__set_g_p1(this.ptr, arg0);
}

Vector4.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector4__instanceOf_p1(this.ptr, arg0);
}

Vector4.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector4__set_y_p1(this.ptr, arg0);
}

Vector4.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Vector4__set_z_p1(this.ptr, arg0);
}

Vector4.prototype['get_x'] = function() {
    return _emscripten_bind_Vector4__get_x_p0(this.ptr);
}

Vector4.prototype['get_y'] = function() {
    return _emscripten_bind_Vector4__get_y_p0(this.ptr);
}

Vector4.prototype['get_z'] = function() {
    return _emscripten_bind_Vector4__get_z_p0(this.ptr);
}

Vector4.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector4____destroy___p0(this.ptr);
}

Vector4.prototype['get_w'] = function() {
    return _emscripten_bind_Vector4__get_w_p0(this.ptr);
}

function Vector4() {
    this.ptr = _emscripten_bind_Vector4__Vector4_p0();
  Vector4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector4;
}
Vector4.prototype.__cache__ = {};
Module['Vector4'] = Vector4;

Vector4.prototype['set_w'] = function(arg0) {
    _emscripten_bind_Vector4__set_w_p1(this.ptr, arg0);
}

Vector4.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector4__set_x_p1(this.ptr, arg0);
}

Vector2.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector2__instanceOf_p1(this.ptr, arg0);
}

Vector2.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector2__set_x_p1(this.ptr, arg0);
}

Vector2.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector2__set_p2(this.ptr, arg0, arg1), Module['Vector2']);
}

Vector2.prototype['get_x'] = function() {
    return _emscripten_bind_Vector2__get_x_p0(this.ptr);
}

Vector2.prototype['get_y'] = function() {
    return _emscripten_bind_Vector2__get_y_p0(this.ptr);
}

Vector2.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector2__set_y_p1(this.ptr, arg0);
}

function Vector2(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Vector2__Vector2_p0();
  else 
    this.ptr = _emscripten_bind_Vector2__Vector2_p2(arg0, arg1);
  Vector2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector2;
}
Vector2.prototype.__cache__ = {};
Module['Vector2'] = Vector2;

Vector2.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector2____destroy___p0(this.ptr);
}

UV.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_UV__instanceOf_p1(this.ptr, arg0);
}

UV.prototype['__destroy__'] = function() {
    _emscripten_bind_UV____destroy___p0(this.ptr);
}

function UV() {
    this.ptr = _emscripten_bind_UV__UV_p0();
  UV.prototype.__cache__[this.ptr] = this;
  this.__class__ = UV;
}
UV.prototype.__cache__ = {};
Module['UV'] = UV;

Line3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Line3__instanceOf_p1(this.ptr, arg0);
}

Line3.prototype['distance'] = function() {
    return _emscripten_bind_Line3__distance_p0(this.ptr);
}

Line3.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Line3__set_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Line3']);
}

Line3.prototype['center'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__center_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Line3.prototype['closestPointToPointParameter'] = function(arg0, arg1) {
    return _emscripten_bind_Line3__closestPointToPointParameter_p2(this.ptr, arg0.ptr, arg1);
}

Line3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Line3']);
}

Line3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Line3__clone_p0(this.ptr), Module['Line3']);
}

function Line3(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Line3__Line3_p0();
  else 
    this.ptr = _emscripten_bind_Line3__Line3_p2(arg0.ptr, arg1.ptr);
  Line3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Line3;
}
Line3.prototype.__cache__ = {};
Module['Line3'] = Line3;

Line3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Line3__equals_p1(this.ptr, arg0.ptr);
}

Line3.prototype['get_end'] = function() {
    return wrapPointer(_emscripten_bind_Line3__get_end_p0(this.ptr), Module['Vector3']);
}

Line3.prototype['get_start'] = function() {
    return wrapPointer(_emscripten_bind_Line3__get_start_p0(this.ptr), Module['Vector3']);
}

Line3.prototype['set_end'] = function(arg0) {
    _emscripten_bind_Line3__set_end_p1(this.ptr, arg0.ptr);
}

Line3.prototype['__destroy__'] = function() {
    _emscripten_bind_Line3____destroy___p0(this.ptr);
}

Line3.prototype['set_start'] = function(arg0) {
    _emscripten_bind_Line3__set_start_p1(this.ptr, arg0.ptr);
}

Line3.prototype['at'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Line3__at_p2(this.ptr, arg0, arg1.ptr), Module['Vector3']);
}

Line3.prototype['closestPointToPoint'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Line3__closestPointToPoint_p3(this.ptr, arg0.ptr, arg1, arg2.ptr), Module['Vector3']);
}

Line3.prototype['delta'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__delta_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Line3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__copy_p1(this.ptr, arg0.ptr), Module['Line3']);
}

Line3.prototype['distanceSquared'] = function() {
    return _emscripten_bind_Line3__distanceSquared_p0(this.ptr);
}

Vertex.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vertex__instanceOf_p1(this.ptr, arg0);
}

Vertex.prototype['__destroy__'] = function() {
    _emscripten_bind_Vertex____destroy___p0(this.ptr);
}

function Vertex() {
    this.ptr = _emscripten_bind_Vertex__Vertex_p0();
  Vertex.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vertex;
}
Vertex.prototype.__cache__ = {};
Module['Vertex'] = Vertex;

Spline.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Spline__instanceOf_p1(this.ptr, arg0);
}

Spline.prototype['__destroy__'] = function() {
    _emscripten_bind_Spline____destroy___p0(this.ptr);
}

function Spline() {
    this.ptr = _emscripten_bind_Spline__Spline_p0();
  Spline.prototype.__cache__[this.ptr] = this;
  this.__class__ = Spline;
}
Spline.prototype.__cache__ = {};
Module['Spline'] = Spline;

Sphere.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Sphere__instanceOf_p1(this.ptr, arg0);
}

Sphere.prototype['__destroy__'] = function() {
    _emscripten_bind_Sphere____destroy___p0(this.ptr);
}

Sphere.prototype['getCenter'] = function() {
    return wrapPointer(_emscripten_bind_Sphere__getCenter_p0(this.ptr), Module['Vector3']);
}

function Sphere() {
    this.ptr = _emscripten_bind_Sphere__Sphere_p0();
  Sphere.prototype.__cache__[this.ptr] = this;
  this.__class__ = Sphere;
}
Sphere.prototype.__cache__ = {};
Module['Sphere'] = Sphere;

Sphere.prototype['get_center'] = function() {
    return wrapPointer(_emscripten_bind_Sphere__get_center_p0(this.ptr), Module['Vector3']);
}

Sphere.prototype['set_radius'] = function(arg0) {
    _emscripten_bind_Sphere__set_radius_p1(this.ptr, arg0);
}

Sphere.prototype['get_radius'] = function() {
    return _emscripten_bind_Sphere__get_radius_p0(this.ptr);
}

Sphere.prototype['set_center'] = function(arg0) {
    _emscripten_bind_Sphere__set_center_p1(this.ptr, arg0.ptr);
}

Quaternion.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Quaternion__instanceOf_p1(this.ptr, arg0);
}

Quaternion.prototype['set'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Quaternion__set_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Quaternion']);
}

Quaternion.prototype['setFromAxisAngle'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__setFromAxisAngle_p2(this.ptr, arg0.ptr, arg1), Module['Quaternion']);
}

Quaternion.prototype['get_y'] = function() {
    return _emscripten_bind_Quaternion__get_y_p0(this.ptr);
}

Quaternion.prototype['get_z'] = function() {
    return _emscripten_bind_Quaternion__get_z_p0(this.ptr);
}

Quaternion.prototype['get_w'] = function() {
    return _emscripten_bind_Quaternion__get_w_p0(this.ptr);
}

Quaternion.prototype['conjugate'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__conjugate_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['get_x'] = function() {
    return _emscripten_bind_Quaternion__get_x_p0(this.ptr);
}

Quaternion.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__normalize_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['slerp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__slerp_p2(this.ptr, arg0.ptr, arg1), Module['Quaternion']);
}

Quaternion.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Quaternion__set_z_p1(this.ptr, arg0);
}

Quaternion.prototype['inverse'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__inverse_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['set_w'] = function(arg0) {
    _emscripten_bind_Quaternion__set_w_p1(this.ptr, arg0);
}

function Quaternion(arg0, arg1, arg2, arg3) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Quaternion__Quaternion_p0();
  else 
    this.ptr = _emscripten_bind_Quaternion__Quaternion_p4(arg0, arg1, arg2, arg3);
  Quaternion.prototype.__cache__[this.ptr] = this;
  this.__class__ = Quaternion;
}
Quaternion.prototype.__cache__ = {};
Module['Quaternion'] = Quaternion;

Quaternion.prototype['multiplyQuaternions'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__multiplyQuaternions_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Quaternion']);
}

Quaternion.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Quaternion__set_x_p1(this.ptr, arg0);
}

Quaternion.prototype['lengthSquared'] = function() {
    return _emscripten_bind_Quaternion__lengthSquared_p0(this.ptr);
}

Quaternion.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Quaternion__set_y_p1(this.ptr, arg0);
}

Quaternion.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__clone_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Quaternion__equals_p1(this.ptr, arg0.ptr);
}

Quaternion.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Quaternion__copy_p1(this.ptr, arg0.ptr), Module['Quaternion']);
}

Quaternion.prototype['__destroy__'] = function() {
    _emscripten_bind_Quaternion____destroy___p0(this.ptr);
}

Quaternion.prototype['length'] = function() {
    return _emscripten_bind_Quaternion__length_p0(this.ptr);
}

Quaternion.prototype['setFromRotationMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Quaternion__setFromRotationMatrix_p1(this.ptr, arg0.ptr), Module['Quaternion']);
}

Plane.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Plane__instanceOf_p1(this.ptr, arg0);
}

Plane.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Plane__set_p2(this.ptr, arg0.ptr, arg1), Module['Plane']);
}

Plane.prototype['set_normal'] = function(arg0) {
    _emscripten_bind_Plane__set_normal_p1(this.ptr, arg0.ptr);
}

Plane.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['orthoPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__orthoPoint_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Plane.prototype['coplanerPoint'] = function() {
    return wrapPointer(_emscripten_bind_Plane__coplanerPoint_p0(this.ptr), Module['Vector3']);
}

Plane.prototype['setFromNormalAndCoplanerPoint'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Plane']);
}

Plane.prototype['negate'] = function() {
    return wrapPointer(_emscripten_bind_Plane__negate_p0(this.ptr), Module['Plane']);
}

Plane.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Plane__normalize_p0(this.ptr), Module['Plane']);
}

Plane.prototype['intersectLine'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__intersectLine_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

function Plane(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Plane__Plane_p0();
  else 
    this.ptr = _emscripten_bind_Plane__Plane_p2(arg0.ptr, arg1);
  Plane.prototype.__cache__[this.ptr] = this;
  this.__class__ = Plane;
}
Plane.prototype.__cache__ = {};
Module['Plane'] = Plane;

Plane.prototype['projectPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__projectPoint_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Plane.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__translate_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['get_normal'] = function() {
    return wrapPointer(_emscripten_bind_Plane__get_normal_p0(this.ptr), Module['Vector3']);
}

Plane.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Plane__clone_p0(this.ptr), Module['Plane']);
}

Plane.prototype['get_constant'] = function() {
    return _emscripten_bind_Plane__get_constant_p0(this.ptr);
}

Plane.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Plane__equals_p1(this.ptr, arg0.ptr);
}

Plane.prototype['setComponents'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Plane__setComponents_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Plane']);
}

Plane.prototype['setFromCoplanerPoints'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Plane__setFromCoplanerPoints_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Plane']);
}

Plane.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__copy_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['__destroy__'] = function() {
    _emscripten_bind_Plane____destroy___p0(this.ptr);
}

Plane.prototype['isIntersectionLine'] = function(arg0) {
    return _emscripten_bind_Plane__isIntersectionLine_p1(this.ptr, arg0.ptr);
}

Plane.prototype['distanceToSphere'] = function(arg0) {
    return _emscripten_bind_Plane__distanceToSphere_p1(this.ptr, arg0.ptr);
}

Plane.prototype['distanceToPoint'] = function(arg0) {
    return _emscripten_bind_Plane__distanceToPoint_p1(this.ptr, arg0.ptr);
}

Plane.prototype['set_constant'] = function(arg0) {
    _emscripten_bind_Plane__set_constant_p1(this.ptr, arg0);
}

Box3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Box3__instanceOf_p1(this.ptr, arg0);
}

Box3.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__set_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Box3']);
}

Box3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['expandByPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByPoint_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['clampPoint'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__clampPoint_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Box3.prototype['isIntersectionBox'] = function(arg0) {
    return _emscripten_bind_Box3__isIntersectionBox_p1(this.ptr, arg0.ptr);
}

Box3.prototype['setFromPoints'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__setFromPoints_p1(this.ptr, arg0), Module['Box3']);
}

Box3.prototype['size'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__size_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['get_max'] = function() {
    return wrapPointer(_emscripten_bind_Box3__get_max_p0(this.ptr), Module['Vector3']);
}

Box3.prototype['getParameter'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__getParameter_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['expandByScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByScalar_p1(this.ptr, arg0), Module['Box3']);
}

Box3.prototype['intersect'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__intersect_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['containsBox'] = function(arg0) {
    return _emscripten_bind_Box3__containsBox_p1(this.ptr, arg0.ptr);
}

Box3.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__translate_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['empty'] = function() {
    return _emscripten_bind_Box3__empty_p0(this.ptr);
}

Box3.prototype['set_min'] = function(arg0) {
    _emscripten_bind_Box3__set_min_p1(this.ptr, arg0.ptr);
}

Box3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Box3__clone_p0(this.ptr), Module['Box3']);
}

Box3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Box3__equals_p1(this.ptr, arg0.ptr);
}

Box3.prototype['get_min'] = function() {
    return wrapPointer(_emscripten_bind_Box3__get_min_p0(this.ptr), Module['Vector3']);
}

Box3.prototype['expandByVector'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByVector_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__copy_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['makeEmpty'] = function() {
    return wrapPointer(_emscripten_bind_Box3__makeEmpty_p0(this.ptr), Module['Box3']);
}

Box3.prototype['__destroy__'] = function() {
    _emscripten_bind_Box3____destroy___p0(this.ptr);
}

Box3.prototype['center'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__center_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['getBoundingSphere'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__getBoundingSphere_p1(this.ptr, arg0.ptr), Module['Sphere']);
}

Box3.prototype['set_max'] = function(arg0) {
    _emscripten_bind_Box3__set_max_p1(this.ptr, arg0.ptr);
}

function Box3(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Box3__Box3_p0();
  else 
    this.ptr = _emscripten_bind_Box3__Box3_p2(arg0.ptr, arg1.ptr);
  Box3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box3;
}
Box3.prototype.__cache__ = {};
Module['Box3'] = Box3;

Box3.prototype['distanceToPoint'] = function(arg0) {
    return _emscripten_bind_Box3__distanceToPoint_p1(this.ptr, arg0.ptr);
}

Box3.prototype['containsPoint'] = function(arg0) {
    return _emscripten_bind_Box3__containsPoint_p1(this.ptr, arg0.ptr);
}

Box3.prototype['setFromCenterAndSize'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__setFromCenterAndSize_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Box3']);
}

Matrix4.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__clone_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Matrix4__instanceOf_p1(this.ptr, arg0);
}

Matrix4.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
    return wrapPointer(_emscripten_bind_Matrix4__set_p16(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15), Module['Matrix4']);
}

Matrix4.prototype['extractRotation'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__extractRotation_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['lookAt'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__lookAt_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeScale'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__makeScale_p3(this.ptr, arg0, arg1, arg2), Module['Matrix4']);
}

Matrix4.prototype['scale'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__scale_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeTranslation'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__makeTranslation_p3(this.ptr, arg0, arg1, arg2), Module['Matrix4']);
}

Matrix4.prototype['rotateByAxis'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateByAxis_p2(this.ptr, arg0.ptr, arg1), Module['Matrix4']);
}

Matrix4.prototype['invert'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__invert_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['rotateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateX_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['rotateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateY_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['rotateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateZ_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['multiplyMatrices'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyMatrices_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Matrix4']);
}

Matrix4.prototype['setRotationFromQuaternion'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__setRotationFromQuaternion_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['multiplyToArray'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyToArray_p3(this.ptr, arg0.ptr, arg1.ptr, arg2), Module['Matrix4']);
}

Matrix4.prototype['getInverse'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__getInverse_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__translate_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeRotationY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationY_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeRotationX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationX_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeRotationZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationZ_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeOrthographic'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Matrix4__makeOrthographic_p6(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5), Module['Matrix4']);
}

Matrix4.prototype['determinant'] = function() {
    return _emscripten_bind_Matrix4__determinant_p0(this.ptr);
}

Matrix4.prototype['makeRotationAxis'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationAxis_p2(this.ptr, arg0.ptr, arg1), Module['Matrix4']);
}

Matrix4.prototype['crossVector'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__crossVector_p1(this.ptr, arg0.ptr), Module['Vector4']);
}

Matrix4.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix4____destroy___p0(this.ptr);
}

Matrix4.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyScalar_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['transpose'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__transpose_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['extractPosition'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__extractPosition_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeFrustum'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Matrix4__makeFrustum_p6(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5), Module['Matrix4']);
}

Matrix4.prototype['setPosition'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__setPosition_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__copy_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['identity'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__identity_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['compose'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__compose_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Matrix4.prototype['setRotationFromEuler'] = function(arg0, arg1) {
var stack = Runtime.stackSave();
try {
    return wrapPointer(_emscripten_bind_Matrix4__setRotationFromEuler_p2(this.ptr, arg0.ptr, ensureString(arg1)), Module['Matrix4']);
} finally { Runtime.stackRestore(stack) }
}

Matrix4.prototype['makePerspective'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Matrix4__makePerspective_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Matrix4']);
}

Matrix4.prototype['getMaxScaleOnAxis'] = function() {
    return _emscripten_bind_Matrix4__getMaxScaleOnAxis_p0(this.ptr);
}

function Matrix4(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Matrix4__Matrix4_p0();
  else 
    this.ptr = _emscripten_bind_Matrix4__Matrix4_p16(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
  Matrix4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Matrix4;
}
Matrix4.prototype.__cache__ = {};
Module['Matrix4'] = Matrix4;

Matrix4.prototype['decompose'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__decompose_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Ray.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Ray__instanceOf_p1(this.ptr, arg0);
}

Ray.prototype['__destroy__'] = function() {
    _emscripten_bind_Ray____destroy___p0(this.ptr);
}

function Ray(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Ray__Ray_p0();
  else 
    this.ptr = _emscripten_bind_Ray__Ray_p2(arg0.ptr, arg1.ptr);
  Ray.prototype.__cache__[this.ptr] = this;
  this.__class__ = Ray;
}
Ray.prototype.__cache__ = {};
Module['Ray'] = Ray;

Matrix3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__clone_p0(this.ptr), Module['Matrix3']);
}

Matrix3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Matrix3__instanceOf_p1(this.ptr, arg0);
}

Matrix3.prototype['determinant'] = function() {
    return _emscripten_bind_Matrix3__determinant_p0(this.ptr);
}

Matrix3.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    return wrapPointer(_emscripten_bind_Matrix3__set_p9(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8), Module['Matrix3']);
}

Matrix3.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix3____destroy___p0(this.ptr);
}

Matrix3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__multiplyScalar_p1(this.ptr, arg0), Module['Matrix3']);
}

Matrix3.prototype['transpose'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__transpose_p0(this.ptr), Module['Matrix3']);
}

Matrix3.prototype['transposeIntoArray'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__transposeIntoArray_p1(this.ptr, arg0), Module['Matrix3']);
}

Matrix3.prototype['getNormalMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__getNormalMatrix_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

Matrix3.prototype['getInverse'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__getInverse_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

Matrix3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__copy_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

function Matrix3(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Matrix3__Matrix3_p0();
  else 
    this.ptr = _emscripten_bind_Matrix3__Matrix3_p9(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
  Matrix3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Matrix3;
}
Matrix3.prototype.__cache__ = {};
Module['Matrix3'] = Matrix3;

Matrix3.prototype['identity'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__identity_p0(this.ptr), Module['Matrix3']);
}

MATH.prototype['clamp'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__clamp_p3(arg0, arg1, arg2);
}

MATH.prototype['__destroy__'] = function() {
    _emscripten_bind_MATH____destroy___p0(this.ptr);
}

MATH.prototype['randDoubleSpread'] = function(arg0) {
    return _emscripten_bind_MATH__randDoubleSpread_p1(arg0);
}

MATH.prototype['randInt'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__randInt_p2(arg0, arg1);
}

MATH.prototype['random16'] = function() {
    return _emscripten_bind_MATH__random16_p0();
}

MATH.prototype['smoothstep'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__smoothstep_p3(arg0, arg1, arg2);
}

MATH.prototype['sign'] = function(arg0) {
    return _emscripten_bind_MATH__sign_p1(arg0);
}

MATH.prototype['radToDeg'] = function(arg0) {
    return _emscripten_bind_MATH__radToDeg_p1(arg0);
}

MATH.prototype['degToRad'] = function(arg0) {
    return _emscripten_bind_MATH__degToRad_p1(arg0);
}

MATH.prototype['randDouble'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__randDouble_p2(arg0, arg1);
}

MATH.prototype['clampBottom'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__clampBottom_p2(arg0, arg1);
}

MATH.prototype['mapLinear'] = function(arg0, arg1, arg2, arg3, arg4) {
    return _emscripten_bind_MATH__mapLinear_p5(arg0, arg1, arg2, arg3, arg4);
}

MATH.prototype['smootherstep'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__smootherstep_p3(arg0, arg1, arg2);
}

function MATH() {
    this.ptr = _emscripten_bind_MATH__MATH_p0();
  MATH.prototype.__cache__[this.ptr] = this;
  this.__class__ = MATH;
}
MATH.prototype.__cache__ = {};
Module['MATH'] = MATH;

Box2.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Box2__instanceOf_p1(this.ptr, arg0);
}

Box2.prototype['__destroy__'] = function() {
    _emscripten_bind_Box2____destroy___p0(this.ptr);
}

Box2.prototype['set_min'] = function(arg0) {
    _emscripten_bind_Box2__set_min_p1(this.ptr, arg0.ptr);
}

Box2.prototype['get_max'] = function() {
    return wrapPointer(_emscripten_bind_Box2__get_max_p0(this.ptr), Module['Vector2']);
}

Box2.prototype['set_max'] = function(arg0) {
    _emscripten_bind_Box2__set_max_p1(this.ptr, arg0.ptr);
}

Box2.prototype['get_min'] = function() {
    return wrapPointer(_emscripten_bind_Box2__get_min_p0(this.ptr), Module['Vector2']);
}

function Box2(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Box2__Box2_p0();
  else 
    this.ptr = _emscripten_bind_Box2__Box2_p2(arg0.ptr, arg1.ptr);
  Box2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box2;
}
Box2.prototype.__cache__ = {};
Module['Box2'] = Box2;
