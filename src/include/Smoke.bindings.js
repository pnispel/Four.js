
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

Vector2.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector2____destroy___p0(this.ptr);
}

function Vector2() {
    this.ptr = _emscripten_bind_Vector2__Vector2_p0();
  Vector2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector2;
}
Vector2.prototype.__cache__ = {};
Module['Vector2'] = Vector2;

Vector3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiplyScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector3____destroy___p0(this.ptr);
}

Vector3.prototype['set'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Vector3__set_p3(this.ptr, arg0, arg1, arg2), Module['Vector3']);
}

Vector3.prototype['sub'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__sub_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__clone_p0(this.ptr), Module['Vector3']);
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

Vector3.prototype['add'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__add_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['getX'] = function() {
    return _emscripten_bind_Vector3__getX_p0(this.ptr);
}

Vector3.prototype['getY'] = function() {
    return _emscripten_bind_Vector3__getY_p0(this.ptr);
}

Vector3.prototype['getZ'] = function() {
    return _emscripten_bind_Vector3__getZ_p0(this.ptr);
}

Vector3.prototype['multiply'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiply_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__copy_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['setX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__setX_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['setY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__setY_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['setZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__setZ_p1(this.ptr, arg0), Module['Vector3']);
}

Vector4.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector4____destroy___p0(this.ptr);
}

function Vector4() {
    this.ptr = _emscripten_bind_Vector4__Vector4_p0();
  Vector4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector4;
}
Vector4.prototype.__cache__ = {};
Module['Vector4'] = Vector4;

Matrix4.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix4____destroy___p0(this.ptr);
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

Matrix4.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
    return wrapPointer(_emscripten_bind_Matrix4__set_p16(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15), Module['Matrix4']);
}

Matrix3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__clone_p0(this.ptr), Module['Matrix3']);
}

Matrix3.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix3____destroy___p0(this.ptr);
}

Matrix3.prototype['determinant'] = function() {
    return _emscripten_bind_Matrix3__determinant_p0(this.ptr);
}

Matrix3.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    return wrapPointer(_emscripten_bind_Matrix3__set_p9(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8), Module['Matrix3']);
}

Matrix3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__multiplyScalar_p1(this.ptr, arg0), Module['Matrix3']);
}

Matrix3.prototype['transpose'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__transpose_p0(this.ptr), Module['Matrix3']);
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

Box3.prototype['__destroy__'] = function() {
    _emscripten_bind_Box3____destroy___p0(this.ptr);
}

function Box3() {
    this.ptr = _emscripten_bind_Box3__Box3_p0();
  Box3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box3;
}
Box3.prototype.__cache__ = {};
Module['Box3'] = Box3;

Box2.prototype['__destroy__'] = function() {
    _emscripten_bind_Box2____destroy___p0(this.ptr);
}

function Box2() {
    this.ptr = _emscripten_bind_Box2__Box2_p0();
  Box2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box2;
}
Box2.prototype.__cache__ = {};
Module['Box2'] = Box2;
