
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

Projector.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Projector__instanceOf_p1(this.ptr, arg0);
}

Projector.prototype['__destroy__'] = function() {
    _emscripten_bind_Projector____destroy___p0(this.ptr);
}

function Projector() {
    this.ptr = _emscripten_bind_Projector__Projector_p0();
  Projector.prototype.__cache__[this.ptr] = this;
  this.__class__ = Projector;
}
Projector.prototype.__cache__ = {};
Module['Projector'] = Projector;

MeshLambertMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshLambertMaterial__instanceOf_p1(this.ptr, arg0);
}

MeshLambertMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshLambertMaterial____destroy___p0(this.ptr);
}

function MeshLambertMaterial() {
    this.ptr = _emscripten_bind_MeshLambertMaterial__MeshLambertMaterial_p0();
  MeshLambertMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshLambertMaterial;
}
MeshLambertMaterial.prototype.__cache__ = {};
Module['MeshLambertMaterial'] = MeshLambertMaterial;

Clock.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Clock__instanceOf_p1(this.ptr, arg0);
}

Clock.prototype['__destroy__'] = function() {
    _emscripten_bind_Clock____destroy___p0(this.ptr);
}

Clock.prototype['getDelta'] = function() {
    return _emscripten_bind_Clock__getDelta_p0(this.ptr);
}

Clock.prototype['start'] = function() {
    _emscripten_bind_Clock__start_p0(this.ptr);
}

function Clock(arg0) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Clock__Clock_p0();
  else 
    this.ptr = _emscripten_bind_Clock__Clock_p1(arg0);
  Clock.prototype.__cache__[this.ptr] = this;
  this.__class__ = Clock;
}
Clock.prototype.__cache__ = {};
Module['Clock'] = Clock;

Clock.prototype['stop'] = function() {
    _emscripten_bind_Clock__stop_p0(this.ptr);
}

Clock.prototype['getElapsedTime'] = function() {
    return _emscripten_bind_Clock__getElapsedTime_p0(this.ptr);
}

Clock.prototype['running'] = function() {
    return _emscripten_bind_Clock__running_p0(this.ptr);
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

HemisphereLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_HemisphereLight__instanceOf_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_material_p0(this.ptr), Module['Material']);
}

HemisphereLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_scale_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_HemisphereLight__get_receiveShadow_p0(this.ptr);
}

HemisphereLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_renderDepth_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

HemisphereLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

HemisphereLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_castShadow_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_target_p0(this.ptr), Module['Object3D']);
}

HemisphereLight.prototype['add'] = function(arg0) {
    _emscripten_bind_HemisphereLight__add_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

HemisphereLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

HemisphereLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

HemisphereLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

HemisphereLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_HemisphereLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

HemisphereLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_HemisphereLight__get_renderDepth_p0(this.ptr);
}

HemisphereLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_up_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

HemisphereLight.prototype['get_name'] = function() {
    return _emscripten_bind_HemisphereLight__get_name_p0(this.ptr);
}

HemisphereLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_geometry_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_color_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_HemisphereLight____removeObject_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_HemisphereLight__traverse_p1(this.ptr, arg0);
}

HemisphereLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_HemisphereLight__get_useQuaternion_p0(this.ptr);
}

HemisphereLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_HemisphereLight__lookAt_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_HemisphereLight__remove_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_orientation_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set___webglActive_p1(this.ptr, arg0);
}

HemisphereLight.prototype['hasParent'] = function() {
    return _emscripten_bind_HemisphereLight__hasParent_p0(this.ptr);
}

HemisphereLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_target_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_matrix_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_sortParticles_p1(this.ptr, arg0);
}

HemisphereLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

HemisphereLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_visible_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

HemisphereLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_id_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

HemisphereLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

HemisphereLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_up_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

HemisphereLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_scale_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

HemisphereLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_HemisphereLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

HemisphereLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_parent_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_receiveShadow_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_parent_p0(this.ptr), Module['Object3D']);
}

HemisphereLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['get_id'] = function() {
    return _emscripten_bind_HemisphereLight__get_id_p0(this.ptr);
}

HemisphereLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_HemisphereLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_HemisphereLight__updateMatrixWorld_p1(this.ptr, arg0);
}

HemisphereLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_rotation_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_material_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_HemisphereLight__get_sortParticles_p0(this.ptr);
}

HemisphereLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_HemisphereLight__get___webglInit_p0(this.ptr);
}

HemisphereLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

HemisphereLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_color_p0(this.ptr), Module['Color']);
}

HemisphereLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_HemisphereLight__get_castShadow_p0(this.ptr);
}

function HemisphereLight(arg0) {
    this.ptr = _emscripten_bind_HemisphereLight__HemisphereLight_p1(arg0);
  HemisphereLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = HemisphereLight;
}
HemisphereLight.prototype.__cache__ = {};
Module['HemisphereLight'] = HemisphereLight;

HemisphereLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_HemisphereLight__get_rotationAutoUpdate_p0(this.ptr);
}

HemisphereLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_position_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_velocity_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_HemisphereLight__get___webglActive_p0(this.ptr);
}

HemisphereLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_HemisphereLight__updateMatrix_p0(this.ptr);
}

HemisphereLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_HemisphereLight__get_frustumCulled_p0(this.ptr);
}

HemisphereLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_frustumCulled_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__get_position_p0(this.ptr), Module['Vector3']);
}

HemisphereLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set___webglInit_p1(this.ptr, arg0);
}

HemisphereLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_HemisphereLight__clone_p0(this.ptr), Module['Object3D']);
}

HemisphereLight.prototype['get_visible'] = function() {
    return _emscripten_bind_HemisphereLight__get_visible_p0(this.ptr);
}

HemisphereLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_useQuaternion_p1(this.ptr, arg0);
}

HemisphereLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_HemisphereLight__get_matrixAutoUpdate_p0(this.ptr);
}

HemisphereLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_HemisphereLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

HemisphereLight.prototype['__destroy__'] = function() {
    _emscripten_bind_HemisphereLight____destroy___p0(this.ptr);
}

HemisphereLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_HemisphereLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

HemisphereLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_HemisphereLight____addObject_p1(this.ptr, arg0.ptr);
}

HemisphereLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_HemisphereLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

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

Texture.prototype['__destroy__'] = function() {
    _emscripten_bind_Texture____destroy___p0(this.ptr);
}

function Texture() {
    this.ptr = _emscripten_bind_Texture__Texture_p0();
  Texture.prototype.__cache__[this.ptr] = this;
  this.__class__ = Texture;
}
Texture.prototype.__cache__ = {};
Module['Texture'] = Texture;

Scene.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Scene__instanceOf_p1(this.ptr, arg0);
}

Scene.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_material_p0(this.ptr), Module['Material']);
}

Scene.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_Scene__set_scale_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_Scene__get_receiveShadow_p0(this.ptr);
}

Scene.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_Scene__set_renderDepth_p1(this.ptr, arg0);
}

Scene.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

Scene.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_Scene__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_Scene__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

Scene.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_orientation_p0(this.ptr), Module['Quaternion']);
}

Scene.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_Scene__set_castShadow_p1(this.ptr, arg0);
}

Scene.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_target_p0(this.ptr), Module['Object3D']);
}

Scene.prototype['add'] = function(arg0) {
    _emscripten_bind_Scene__add_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_rotation_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

Scene.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

Scene.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

Scene.prototype['get_overrideMaterial'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_overrideMaterial_p0(this.ptr), Module['Material']);
}

Scene.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

Scene.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_Scene__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

Scene.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_Scene__get_renderDepth_p0(this.ptr);
}

Scene.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_up_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_matrix_p0(this.ptr), Module['Matrix4']);
}

Scene.prototype['get_name'] = function() {
    return _emscripten_bind_Scene__get_name_p0(this.ptr);
}

Scene.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_Scene__set_geometry_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_Scene__set_forceAccum_p1(this.ptr, arg0.ptr);
}

Scene.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_Scene____removeObject_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_Scene__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

Scene.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_Scene__set_acceleration_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_Scene__get_useQuaternion_p0(this.ptr);
}

Scene.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_Scene__lookAt_p1(this.ptr, arg0.ptr);
}

Scene.prototype['remove'] = function(arg0) {
    _emscripten_bind_Scene__remove_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_Scene__set_orientation_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_Scene__set___webglActive_p1(this.ptr, arg0);
}

Scene.prototype['hasParent'] = function() {
    return _emscripten_bind_Scene__hasParent_p0(this.ptr);
}

Scene.prototype['set_target'] = function(arg0) {
    _emscripten_bind_Scene__set_target_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_fog'] = function() {
    return _emscripten_bind_Scene__get_fog_p0(this.ptr);
}

Scene.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_Scene__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_Scene__set_matrix_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_Scene__set_sortParticles_p1(this.ptr, arg0);
}

Scene.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_Scene__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

Scene.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Scene__set_visible_p1(this.ptr, arg0);
}

Scene.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

Scene.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Scene__set_id_p1(this.ptr, arg0);
}

Scene.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

Scene.prototype['traverse'] = function(arg0) {
    _emscripten_bind_Scene__traverse_p1(this.ptr, arg0);
}

Scene.prototype['set_up'] = function(arg0) {
    _emscripten_bind_Scene__set_up_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_velocity_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Scene.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_scale_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_geometry_p0(this.ptr), Module['Geometry']);
}

Scene.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Scene__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

Scene.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Scene__get___webglInit_p0(this.ptr);
}

Scene.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_Scene__set_receiveShadow_p1(this.ptr, arg0);
}

Scene.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_parent_p0(this.ptr), Module['Object3D']);
}

Scene.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['get_id'] = function() {
    return _emscripten_bind_Scene__get_id_p0(this.ptr);
}

Scene.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_Scene__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_Scene__updateMatrixWorld_p1(this.ptr, arg0);
}

Scene.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_Scene__set_rotation_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_material'] = function(arg0) {
    _emscripten_bind_Scene__set_material_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_Scene__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_Scene__get_sortParticles_p0(this.ptr);
}

Scene.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Scene__set_parent_p1(this.ptr, arg0.ptr);
}

Scene.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

Scene.prototype['get_castShadow'] = function() {
    return _emscripten_bind_Scene__get_castShadow_p0(this.ptr);
}

Scene.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_Scene__get_rotationAutoUpdate_p0(this.ptr);
}

Scene.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Scene__set_position_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_Scene__set_velocity_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_acceleration_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['get___webglActive'] = function() {
    return _emscripten_bind_Scene__get___webglActive_p0(this.ptr);
}

Scene.prototype['updateMatrix'] = function() {
    _emscripten_bind_Scene__updateMatrix_p0(this.ptr);
}

Scene.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_Scene__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

Scene.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_Scene__get_frustumCulled_p0(this.ptr);
}

Scene.prototype['set_fog'] = function(arg0) {
    _emscripten_bind_Scene__set_fog_p1(this.ptr, arg0);
}

Scene.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_Scene__set_frustumCulled_p1(this.ptr, arg0);
}

Scene.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Scene__get_position_p0(this.ptr), Module['Vector3']);
}

Scene.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Scene__set___webglInit_p1(this.ptr, arg0);
}

Scene.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Scene__clone_p0(this.ptr), Module['Object3D']);
}

Scene.prototype['get_visible'] = function() {
    return _emscripten_bind_Scene__get_visible_p0(this.ptr);
}

Scene.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_Scene__set_useQuaternion_p1(this.ptr, arg0);
}

Scene.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_Scene__get_matrixAutoUpdate_p0(this.ptr);
}

Scene.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Scene__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Scene.prototype['__destroy__'] = function() {
    _emscripten_bind_Scene____destroy___p0(this.ptr);
}

Scene.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Scene__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Scene.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_Scene____addObject_p1(this.ptr, arg0.ptr);
}

Scene.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_Scene__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

function Scene() {
    this.ptr = _emscripten_bind_Scene__Scene_p0();
  Scene.prototype.__cache__[this.ptr] = this;
  this.__class__ = Scene;
}
Scene.prototype.__cache__ = {};
Module['Scene'] = Scene;

Scene.prototype['set_overrideMaterial'] = function(arg0) {
    _emscripten_bind_Scene__set_overrideMaterial_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Object3D__instanceOf_p1(this.ptr, arg0);
}

Object3D.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_Object3D__get_useQuaternion_p0(this.ptr);
}

Object3D.prototype['traverse'] = function(arg0) {
    _emscripten_bind_Object3D__traverse_p1(this.ptr, arg0);
}

Object3D.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_geometry_p0(this.ptr), Module['Geometry']);
}

Object3D.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_Object3D__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

Object3D.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_Object3D__set_acceleration_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_castShadow'] = function() {
    return _emscripten_bind_Object3D__get_castShadow_p0(this.ptr);
}

Object3D.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

Object3D.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_Object3D__set_scale_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_Object3D__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

Object3D.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_Object3D__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

Object3D.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['set_up'] = function(arg0) {
    _emscripten_bind_Object3D__set_up_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_Object3D__get_sortParticles_p0(this.ptr);
}

function Object3D() {
    this.ptr = _emscripten_bind_Object3D__Object3D_p0();
  Object3D.prototype.__cache__[this.ptr] = this;
  this.__class__ = Object3D;
}
Object3D.prototype.__cache__ = {};
Module['Object3D'] = Object3D;

Object3D.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_Object3D__set_renderDepth_p1(this.ptr, arg0);
}

Object3D.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_Object3D__set_receiveShadow_p1(this.ptr, arg0);
}

Object3D.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_Object3D__lookAt_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_name'] = function() {
    return _emscripten_bind_Object3D__get_name_p0(this.ptr);
}

Object3D.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_velocity_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_Object3D__set_frustumCulled_p1(this.ptr, arg0);
}

Object3D.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Object3D__set_position_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_Object3D__set_geometry_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_Object3D__set_orientation_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_Object3D__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_Object3D__set___webglActive_p1(this.ptr, arg0);
}

Object3D.prototype['hasParent'] = function() {
    return _emscripten_bind_Object3D__hasParent_p0(this.ptr);
}

Object3D.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Object3D.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

Object3D.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_position_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_scale_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_Object3D__get_rotationAutoUpdate_p0(this.ptr);
}

Object3D.prototype['set_target'] = function(arg0) {
    _emscripten_bind_Object3D__set_target_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_acceleration_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_Object3D__set_castShadow_p1(this.ptr, arg0);
}

Object3D.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_target_p0(this.ptr), Module['Object3D']);
}

Object3D.prototype['add'] = function(arg0) {
    _emscripten_bind_Object3D__add_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get___webglActive'] = function() {
    return _emscripten_bind_Object3D__get___webglActive_p0(this.ptr);
}

Object3D.prototype['updateMatrix'] = function() {
    _emscripten_bind_Object3D__updateMatrix_p0(this.ptr);
}

Object3D.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_Object3D__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

Object3D.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_Object3D__get_frustumCulled_p0(this.ptr);
}

Object3D.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Object3D__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

Object3D.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Object3D__get___webglInit_p0(this.ptr);
}

Object3D.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_rotation_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['__destroy__'] = function() {
    _emscripten_bind_Object3D____destroy___p0(this.ptr);
}

Object3D.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_Object3D__get_receiveShadow_p0(this.ptr);
}

Object3D.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

Object3D.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

Object3D.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

Object3D.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_Object3D__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

Object3D.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Object3D__set___webglInit_p1(this.ptr, arg0);
}

Object3D.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__clone_p0(this.ptr), Module['Object3D']);
}

Object3D.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_Object3D__set_useQuaternion_p1(this.ptr, arg0);
}

Object3D.prototype['get_visible'] = function() {
    return _emscripten_bind_Object3D__get_visible_p0(this.ptr);
}

Object3D.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_Object3D__set_velocity_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_parent_p0(this.ptr), Module['Object3D']);
}

Object3D.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['get_id'] = function() {
    return _emscripten_bind_Object3D__get_id_p0(this.ptr);
}

Object3D.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_Object3D__get_renderDepth_p0(this.ptr);
}

Object3D.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_Object3D__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_Object3D__updateMatrixWorld_p1(this.ptr, arg0);
}

Object3D.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_Object3D__get_matrixAutoUpdate_p0(this.ptr);
}

Object3D.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_material_p0(this.ptr), Module['Material']);
}

Object3D.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_matrix_p0(this.ptr), Module['Matrix4']);
}

Object3D.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Object3D.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_Object3D__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_Object3D__set_rotation_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Object3D__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Object3D.prototype['set_material'] = function(arg0) {
    _emscripten_bind_Object3D__set_material_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_Object3D____addObject_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_orientation_p0(this.ptr), Module['Quaternion']);
}

Object3D.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Object3D__set_visible_p1(this.ptr, arg0);
}

Object3D.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

Object3D.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_Object3D__get_up_p0(this.ptr), Module['Vector3']);
}

Object3D.prototype['remove'] = function(arg0) {
    _emscripten_bind_Object3D__remove_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Object3D__set_parent_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_Object3D__set_matrix_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_Object3D__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Object3D__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

Object3D.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_Object3D__set_sortParticles_p1(this.ptr, arg0);
}

Object3D.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_Object3D__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_Object3D__set_forceAccum_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_Object3D____removeObject_p1(this.ptr, arg0.ptr);
}

Object3D.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Object3D__set_id_p1(this.ptr, arg0);
}

Camera.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Camera__instanceOf_p1(this.ptr, arg0);
}

Camera.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_material_p0(this.ptr), Module['Material']);
}

Camera.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_Camera__set_scale_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_Camera__get_receiveShadow_p0(this.ptr);
}

Camera.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_Camera__set_renderDepth_p1(this.ptr, arg0);
}

Camera.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_Camera__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_Camera__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

Camera.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_orientation_p0(this.ptr), Module['Quaternion']);
}

Camera.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_Camera__set_castShadow_p1(this.ptr, arg0);
}

Camera.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_target_p0(this.ptr), Module['Object3D']);
}

Camera.prototype['add'] = function(arg0) {
    _emscripten_bind_Camera__add_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_rotation_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['get_projectionMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_projectionMatrix_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

Camera.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

Camera.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

Camera.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_Camera__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

Camera.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_Camera__get_renderDepth_p0(this.ptr);
}

Camera.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_up_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_matrix_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['get_name'] = function() {
    return _emscripten_bind_Camera__get_name_p0(this.ptr);
}

Camera.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_Camera__set_geometry_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_Camera__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

Camera.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_Camera____removeObject_p1(this.ptr, arg0.ptr);
}

Camera.prototype['traverse'] = function(arg0) {
    _emscripten_bind_Camera__traverse_p1(this.ptr, arg0);
}

Camera.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_Camera__set_acceleration_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_Camera__get_useQuaternion_p0(this.ptr);
}

Camera.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

function Camera() {
    this.ptr = _emscripten_bind_Camera__Camera_p0();
  Camera.prototype.__cache__[this.ptr] = this;
  this.__class__ = Camera;
}
Camera.prototype.__cache__ = {};
Module['Camera'] = Camera;

Camera.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_Camera__lookAt_p1(this.ptr, arg0.ptr);
}

Camera.prototype['remove'] = function(arg0) {
    _emscripten_bind_Camera__remove_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_Camera__set_orientation_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_Camera__set___webglActive_p1(this.ptr, arg0);
}

Camera.prototype['hasParent'] = function() {
    return _emscripten_bind_Camera__hasParent_p0(this.ptr);
}

Camera.prototype['set_target'] = function(arg0) {
    _emscripten_bind_Camera__set_target_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_projectionMatrixInverse'] = function(arg0) {
    _emscripten_bind_Camera__set_projectionMatrixInverse_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_projectionMatrix'] = function(arg0) {
    _emscripten_bind_Camera__set_projectionMatrix_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_Camera__set_matrix_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_Camera__set_sortParticles_p1(this.ptr, arg0);
}

Camera.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_Camera__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

Camera.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_Camera__set_forceAccum_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Camera__set_visible_p1(this.ptr, arg0);
}

Camera.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

Camera.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Camera__set_id_p1(this.ptr, arg0);
}

Camera.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_Camera__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

Camera.prototype['set_up'] = function(arg0) {
    _emscripten_bind_Camera__set_up_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_velocity_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Camera.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_scale_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['get_projectionMatrixInverse'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_projectionMatrixInverse_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_geometry_p0(this.ptr), Module['Geometry']);
}

Camera.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Camera__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

Camera.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Camera__get___webglInit_p0(this.ptr);
}

Camera.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_Camera__set_receiveShadow_p1(this.ptr, arg0);
}

Camera.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_parent_p0(this.ptr), Module['Object3D']);
}

Camera.prototype['set_matrixWorldInverse'] = function(arg0) {
    _emscripten_bind_Camera__set_matrixWorldInverse_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['get_id'] = function() {
    return _emscripten_bind_Camera__get_id_p0(this.ptr);
}

Camera.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_Camera__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_Camera__updateMatrixWorld_p1(this.ptr, arg0);
}

Camera.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_Camera__set_rotation_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_material'] = function(arg0) {
    _emscripten_bind_Camera__set_material_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_Camera__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_Camera__get_sortParticles_p0(this.ptr);
}

Camera.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Camera__set_parent_p1(this.ptr, arg0.ptr);
}

Camera.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

Camera.prototype['get_castShadow'] = function() {
    return _emscripten_bind_Camera__get_castShadow_p0(this.ptr);
}

Camera.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_Camera__get_rotationAutoUpdate_p0(this.ptr);
}

Camera.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Camera__set_position_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_matrixWorldInverse'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_matrixWorldInverse_p0(this.ptr), Module['Matrix4']);
}

Camera.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_Camera__set_velocity_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_acceleration_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['get___webglActive'] = function() {
    return _emscripten_bind_Camera__get___webglActive_p0(this.ptr);
}

Camera.prototype['updateMatrix'] = function() {
    _emscripten_bind_Camera__updateMatrix_p0(this.ptr);
}

Camera.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_Camera__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

Camera.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_Camera__get_frustumCulled_p0(this.ptr);
}

Camera.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_Camera__set_frustumCulled_p1(this.ptr, arg0);
}

Camera.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Camera__get_position_p0(this.ptr), Module['Vector3']);
}

Camera.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Camera__set___webglInit_p1(this.ptr, arg0);
}

Camera.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Camera__clone_p0(this.ptr), Module['Object3D']);
}

Camera.prototype['get_visible'] = function() {
    return _emscripten_bind_Camera__get_visible_p0(this.ptr);
}

Camera.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_Camera__set_useQuaternion_p1(this.ptr, arg0);
}

Camera.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_Camera__get_matrixAutoUpdate_p0(this.ptr);
}

Camera.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Camera__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Camera.prototype['__destroy__'] = function() {
    _emscripten_bind_Camera____destroy___p0(this.ptr);
}

Camera.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Camera__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Camera.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_Camera____addObject_p1(this.ptr, arg0.ptr);
}

Camera.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_Camera__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

MorphAnimMesh.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MorphAnimMesh__instanceOf_p1(this.ptr, arg0);
}

MorphAnimMesh.prototype['__destroy__'] = function() {
    _emscripten_bind_MorphAnimMesh____destroy___p0(this.ptr);
}

function MorphAnimMesh() {
    this.ptr = _emscripten_bind_MorphAnimMesh__MorphAnimMesh_p0();
  MorphAnimMesh.prototype.__cache__[this.ptr] = this;
  this.__class__ = MorphAnimMesh;
}
MorphAnimMesh.prototype.__cache__ = {};
Module['MorphAnimMesh'] = MorphAnimMesh;

ParticleBasicMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_ParticleBasicMaterial__instanceOf_p1(this.ptr, arg0);
}

ParticleBasicMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_ParticleBasicMaterial____destroy___p0(this.ptr);
}

function ParticleBasicMaterial() {
    this.ptr = _emscripten_bind_ParticleBasicMaterial__ParticleBasicMaterial_p0();
  ParticleBasicMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = ParticleBasicMaterial;
}
ParticleBasicMaterial.prototype.__cache__ = {};
Module['ParticleBasicMaterial'] = ParticleBasicMaterial;

Face3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Face3__instanceOf_p1(this.ptr, arg0);
}

Face3.prototype['get_materialIndex'] = function() {
    return _emscripten_bind_Face3__get_materialIndex_p0(this.ptr);
}

Face3.prototype['set_centroid'] = function(arg0) {
    _emscripten_bind_Face3__set_centroid_p1(this.ptr, arg0.ptr);
}

Face3.prototype['set_normal'] = function(arg0) {
    _emscripten_bind_Face3__set_normal_p1(this.ptr, arg0.ptr);
}

Face3.prototype['__destroy__'] = function() {
    _emscripten_bind_Face3____destroy___p0(this.ptr);
}

Face3.prototype['get_centroid'] = function() {
    return wrapPointer(_emscripten_bind_Face3__get_centroid_p0(this.ptr), Module['Vector3']);
}

Face3.prototype['get_normal'] = function() {
    return wrapPointer(_emscripten_bind_Face3__get_normal_p0(this.ptr), Module['Vector3']);
}

Face3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Face3__clone_p0(this.ptr), Module['Face3']);
}

Face3.prototype['set_materialIndex'] = function(arg0) {
    _emscripten_bind_Face3__set_materialIndex_p1(this.ptr, arg0);
}

Face3.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_Face3__get_color_p0(this.ptr), Module['Color']);
}

Face3.prototype['set_color'] = function(arg0) {
    _emscripten_bind_Face3__set_color_p1(this.ptr, arg0.ptr);
}

function Face3(arg0, arg1, arg2, arg3, arg4, arg5) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Face3__Face3_p0();
  else   if (arg3 === undefined)
    this.ptr = _emscripten_bind_Face3__Face3_p3(arg0, arg1, arg2);
  else 
    this.ptr = _emscripten_bind_Face3__Face3_p6(arg0, arg1, arg2, arg3.ptr, arg4.ptr, arg5);
  Face3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Face3;
}
Face3.prototype.__cache__ = {};
Module['Face3'] = Face3;

Face3.prototype['get_d'] = function() {
    return _emscripten_bind_Face3__get_d_p0(this.ptr);
}

Face3.prototype['set_a'] = function(arg0) {
    _emscripten_bind_Face3__set_a_p1(this.ptr, arg0);
}

Face3.prototype['set_b'] = function(arg0) {
    _emscripten_bind_Face3__set_b_p1(this.ptr, arg0);
}

Face3.prototype['set_c'] = function(arg0) {
    _emscripten_bind_Face3__set_c_p1(this.ptr, arg0);
}

Face3.prototype['set_d'] = function(arg0) {
    _emscripten_bind_Face3__set_d_p1(this.ptr, arg0);
}

Face3.prototype['get_a'] = function() {
    return _emscripten_bind_Face3__get_a_p0(this.ptr);
}

Face3.prototype['get_b'] = function() {
    return _emscripten_bind_Face3__get_b_p0(this.ptr);
}

Face3.prototype['get_c'] = function() {
    return _emscripten_bind_Face3__get_c_p0(this.ptr);
}

Mesh.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Mesh__instanceOf_p1(this.ptr, arg0);
}

Mesh.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_Mesh__get_useQuaternion_p0(this.ptr);
}

Mesh.prototype['traverse'] = function(arg0) {
    _emscripten_bind_Mesh__traverse_p1(this.ptr, arg0);
}

Mesh.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_geometry_p0(this.ptr), Module['Geometry']);
}

Mesh.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_Mesh__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

Mesh.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_Mesh__set_acceleration_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get_castShadow'] = function() {
    return _emscripten_bind_Mesh__get_castShadow_p0(this.ptr);
}

Mesh.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

Mesh.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_Mesh__set_scale_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_Mesh__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

Mesh.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_Mesh__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

Mesh.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['set_up'] = function(arg0) {
    _emscripten_bind_Mesh__set_up_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_Mesh__set_castShadow_p1(this.ptr, arg0);
}

Mesh.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_Mesh__set_renderDepth_p1(this.ptr, arg0);
}

Mesh.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_Mesh__set_receiveShadow_p1(this.ptr, arg0);
}

Mesh.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_Mesh__lookAt_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get_name'] = function() {
    return _emscripten_bind_Mesh__get_name_p0(this.ptr);
}

Mesh.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_velocity_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_Mesh__set_frustumCulled_p1(this.ptr, arg0);
}

Mesh.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Mesh__set_position_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_Mesh__set_geometry_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_Mesh__set_orientation_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_Mesh__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_Mesh__set___webglActive_p1(this.ptr, arg0);
}

Mesh.prototype['hasParent'] = function() {
    return _emscripten_bind_Mesh__hasParent_p0(this.ptr);
}

Mesh.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Mesh.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

Mesh.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_position_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_scale_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_Mesh__get_rotationAutoUpdate_p0(this.ptr);
}

Mesh.prototype['set_target'] = function(arg0) {
    _emscripten_bind_Mesh__set_target_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_acceleration_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_Mesh__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

Mesh.prototype['get___webglActive'] = function() {
    return _emscripten_bind_Mesh__get___webglActive_p0(this.ptr);
}

Mesh.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_target_p0(this.ptr), Module['Object3D']);
}

Mesh.prototype['add'] = function(arg0) {
    _emscripten_bind_Mesh__add_p1(this.ptr, arg0.ptr);
}

function Mesh(arg0, arg1) {
  if (arg1 === undefined)
    this.ptr = _emscripten_bind_Mesh__Mesh_p1(arg0.ptr);
  else 
    this.ptr = _emscripten_bind_Mesh__Mesh_p2(arg0.ptr, arg1.ptr);
  Mesh.prototype.__cache__[this.ptr] = this;
  this.__class__ = Mesh;
}
Mesh.prototype.__cache__ = {};
Module['Mesh'] = Mesh;

Mesh.prototype['updateMatrix'] = function() {
    _emscripten_bind_Mesh__updateMatrix_p0(this.ptr);
}

Mesh.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_Mesh__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

Mesh.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_Mesh__get_frustumCulled_p0(this.ptr);
}

Mesh.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Mesh__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

Mesh.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Mesh__get___webglInit_p0(this.ptr);
}

Mesh.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_rotation_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_Mesh__get_sortParticles_p0(this.ptr);
}

Mesh.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_Mesh__get_receiveShadow_p0(this.ptr);
}

Mesh.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

Mesh.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

Mesh.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

Mesh.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_Mesh__set_rotation_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Mesh__set___webglInit_p1(this.ptr, arg0);
}

Mesh.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__clone_p0(this.ptr), Module['Object3D']);
}

Mesh.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_Mesh__set_useQuaternion_p1(this.ptr, arg0);
}

Mesh.prototype['get_visible'] = function() {
    return _emscripten_bind_Mesh__get_visible_p0(this.ptr);
}

Mesh.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_Mesh__set_velocity_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_parent_p0(this.ptr), Module['Object3D']);
}

Mesh.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['get_id'] = function() {
    return _emscripten_bind_Mesh__get_id_p0(this.ptr);
}

Mesh.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_Mesh__get_renderDepth_p0(this.ptr);
}

Mesh.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_Mesh__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_Mesh__updateMatrixWorld_p1(this.ptr, arg0);
}

Mesh.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_Mesh__get_matrixAutoUpdate_p0(this.ptr);
}

Mesh.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_material_p0(this.ptr), Module['Material']);
}

Mesh.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_matrix_p0(this.ptr), Module['Matrix4']);
}

Mesh.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Mesh.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_Mesh__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['__destroy__'] = function() {
    _emscripten_bind_Mesh____destroy___p0(this.ptr);
}

Mesh.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Mesh__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Mesh.prototype['set_material'] = function(arg0) {
    _emscripten_bind_Mesh__set_material_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_Mesh____addObject_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_orientation_p0(this.ptr), Module['Quaternion']);
}

Mesh.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Mesh__set_visible_p1(this.ptr, arg0);
}

Mesh.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

Mesh.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_Mesh__get_up_p0(this.ptr), Module['Vector3']);
}

Mesh.prototype['remove'] = function(arg0) {
    _emscripten_bind_Mesh__remove_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Mesh__set_parent_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_Mesh__set_matrix_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_Mesh__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Mesh__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

Mesh.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_Mesh__set_sortParticles_p1(this.ptr, arg0);
}

Mesh.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_Mesh__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_Mesh__set_forceAccum_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_Mesh____removeObject_p1(this.ptr, arg0.ptr);
}

Mesh.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Mesh__set_id_p1(this.ptr, arg0);
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

WebGLRenderer.prototype['set_shadowMapCascade'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapCascade_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['render'] = function(arg0, arg1, arg2) {
    _emscripten_bind_WebGLRenderer__render_p3(this.ptr, arg0.ptr, arg1.ptr, arg2);
}

WebGLRenderer.prototype['get_gammaInput'] = function() {
    return _emscripten_bind_WebGLRenderer__get_gammaInput_p0(this.ptr);
}

WebGLRenderer.prototype['set_autoScaleCubemaps'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoScaleCubemaps_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_sortObjects'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_sortObjects_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_maxMorphTarget'] = function() {
    return _emscripten_bind_WebGLRenderer__get_maxMorphTarget_p0(this.ptr);
}

WebGLRenderer.prototype['get_autoClearDepth'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoClearDepth_p0(this.ptr);
}

WebGLRenderer.prototype['get_devicePixelRatio'] = function() {
    return _emscripten_bind_WebGLRenderer__get_devicePixelRatio_p0(this.ptr);
}

WebGLRenderer.prototype['set_autoUpdateObjects'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoUpdateObjects_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_physicallyBasedShading'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_physicallyBasedShading_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get__stencil'] = function() {
    return _emscripten_bind_WebGLRenderer__get__stencil_p0(this.ptr);
}

WebGLRenderer.prototype['get_autoClearStencil'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoClearStencil_p0(this.ptr);
}

WebGLRenderer.prototype['get_autoClear'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoClear_p0(this.ptr);
}

WebGLRenderer.prototype['set_autoClearDepth'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoClearDepth_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_shadowMapEnabled'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapEnabled_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_maxMorphNormals'] = function() {
    return _emscripten_bind_WebGLRenderer__get_maxMorphNormals_p0(this.ptr);
}

WebGLRenderer.prototype['set_shadowMapType'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapType_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_autoScaleCubemaps'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoScaleCubemaps_p0(this.ptr);
}

WebGLRenderer.prototype['set__precision'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__precision_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['initMaterial'] = function(arg0, arg1, arg2, arg3) {
    _emscripten_bind_WebGLRenderer__initMaterial_p4(this.ptr, arg0.ptr, arg1, arg2, arg3.ptr);
}

WebGLRenderer.prototype['get__alpha'] = function() {
    return _emscripten_bind_WebGLRenderer__get__alpha_p0(this.ptr);
}

WebGLRenderer.prototype['set_maxMorphNormals'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_maxMorphNormals_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_shadowMapCullFace'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapCullFace_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_gammaInput'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_gammaInput_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_gammaOutput'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_gammaOutput_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_autoUpdateScene'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoUpdateScene_p0(this.ptr);
}

WebGLRenderer.prototype['set__stencil'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__stencil_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set__antialias'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__antialias_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_sortObjects'] = function() {
    return _emscripten_bind_WebGLRenderer__get_sortObjects_p0(this.ptr);
}

WebGLRenderer.prototype['get__premultipliedAlpha'] = function() {
    return _emscripten_bind_WebGLRenderer__get__premultipliedAlpha_p0(this.ptr);
}

WebGLRenderer.prototype['get_physicallyBasedShading'] = function() {
    return _emscripten_bind_WebGLRenderer__get_physicallyBasedShading_p0(this.ptr);
}

WebGLRenderer.prototype['get__precision'] = function() {
    return _emscripten_bind_WebGLRenderer__get__precision_p0(this.ptr);
}

WebGLRenderer.prototype['setViewport'] = function(arg0, arg1, arg2, arg3) {
    _emscripten_bind_WebGLRenderer__setViewport_p4(this.ptr, arg0, arg1, arg2, arg3);
}

WebGLRenderer.prototype['initWebGLObjects'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__initWebGLObjects_p1(this.ptr, arg0.ptr);
}

WebGLRenderer.prototype['set__alpha'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__alpha_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_shadowMapEnabled'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapEnabled_p0(this.ptr);
}

WebGLRenderer.prototype['set_devicePixelRatio'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_devicePixelRatio_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_maxMorphTarget'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_maxMorphTarget_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['__destroy__'] = function() {
    _emscripten_bind_WebGLRenderer____destroy___p0(this.ptr);
}

WebGLRenderer.prototype['renderImmediateObject'] = function(arg0, arg1, arg2, arg3, arg4) {
    _emscripten_bind_WebGLRenderer__renderImmediateObject_p5(this.ptr, arg0.ptr, arg1, arg2, arg3.ptr, arg4.ptr);
}

WebGLRenderer.prototype['get_autoClearColor'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoClearColor_p0(this.ptr);
}

WebGLRenderer.prototype['setClearColor'] = function(arg0, arg1) {
    _emscripten_bind_WebGLRenderer__setClearColor_p2(this.ptr, arg0.ptr, arg1);
}

WebGLRenderer.prototype['set__clearColor'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__clearColor_p1(this.ptr, arg0.ptr);
}

WebGLRenderer.prototype['set_autoClearStencil'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoClearStencil_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_shadowMapAutoUpdate'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapAutoUpdate_p0(this.ptr);
}

WebGLRenderer.prototype['get_shadowMapDebug'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapDebug_p0(this.ptr);
}

WebGLRenderer.prototype['set_autoClearColor'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoClearColor_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set__preserveDrawingBuffer'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__preserveDrawingBuffer_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_shadowMapDebug'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapDebug_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['setScissor'] = function(arg0, arg1, arg2, arg3) {
    _emscripten_bind_WebGLRenderer__setScissor_p4(this.ptr, arg0, arg1, arg2, arg3);
}

WebGLRenderer.prototype['setClearColorHex'] = function(arg0, arg1) {
    _emscripten_bind_WebGLRenderer__setClearColorHex_p2(this.ptr, arg0, arg1);
}

WebGLRenderer.prototype['get__antialias'] = function() {
    return _emscripten_bind_WebGLRenderer__get__antialias_p0(this.ptr);
}

WebGLRenderer.prototype['get_shadowMapCullFace'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapCullFace_p0(this.ptr);
}

WebGLRenderer.prototype['get_gammaOutput'] = function() {
    return _emscripten_bind_WebGLRenderer__get_gammaOutput_p0(this.ptr);
}

WebGLRenderer.prototype['setClearColorRGBA'] = function(arg0, arg1, arg2, arg3) {
    _emscripten_bind_WebGLRenderer__setClearColorRGBA_p4(this.ptr, arg0, arg1, arg2, arg3);
}

WebGLRenderer.prototype['updateShadowMap'] = function(arg0, arg1) {
    _emscripten_bind_WebGLRenderer__updateShadowMap_p2(this.ptr, arg0.ptr, arg1.ptr);
}

WebGLRenderer.prototype['set__premultipliedAlpha'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__premultipliedAlpha_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get_shadowMapType'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapType_p0(this.ptr);
}

WebGLRenderer.prototype['set_autoClear'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoClear_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set__clearAlpha'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set__clearAlpha_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['clear'] = function(arg0, arg1, arg2) {
  if (arg0 === undefined)
    _emscripten_bind_WebGLRenderer__clear_p0(this.ptr);
  else 
    _emscripten_bind_WebGLRenderer__clear_p3(this.ptr, arg0, arg1, arg2);
}

WebGLRenderer.prototype['set_autoUpdateScene'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_autoUpdateScene_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['setRenderTarget'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__setRenderTarget_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['set_shadowMapAutoUpdate'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__set_shadowMapAutoUpdate_p1(this.ptr, arg0);
}

function WebGLRenderer() {
    this.ptr = _emscripten_bind_WebGLRenderer__WebGLRenderer_p0();
  WebGLRenderer.prototype.__cache__[this.ptr] = this;
  this.__class__ = WebGLRenderer;
}
WebGLRenderer.prototype.__cache__ = {};
Module['WebGLRenderer'] = WebGLRenderer;

WebGLRenderer.prototype['get__clearAlpha'] = function() {
    return _emscripten_bind_WebGLRenderer__get__clearAlpha_p0(this.ptr);
}

WebGLRenderer.prototype['get__clearColor'] = function() {
    return wrapPointer(_emscripten_bind_WebGLRenderer__get__clearColor_p0(this.ptr), Module['Color']);
}

WebGLRenderer.prototype['get_autoUpdateObjects'] = function() {
    return _emscripten_bind_WebGLRenderer__get_autoUpdateObjects_p0(this.ptr);
}

WebGLRenderer.prototype['enableScissorTest'] = function(arg0) {
    _emscripten_bind_WebGLRenderer__enableScissorTest_p1(this.ptr, arg0);
}

WebGLRenderer.prototype['get__preserveDrawingBuffer'] = function() {
    return _emscripten_bind_WebGLRenderer__get__preserveDrawingBuffer_p0(this.ptr);
}

WebGLRenderer.prototype['get_shadowMapCascade'] = function() {
    return _emscripten_bind_WebGLRenderer__get_shadowMapCascade_p0(this.ptr);
}

WebGLRenderer.prototype['setSize'] = function(arg0, arg1) {
    _emscripten_bind_WebGLRenderer__setSize_p2(this.ptr, arg0, arg1);
}

WebGLObject.prototype['__destroy__'] = function() {
    _emscripten_bind_WebGLObject____destroy___p0(this.ptr);
}

WebGLObject.prototype['set_z'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_z_p1(this.ptr, arg0);
}

WebGLObject.prototype['getMaterialByType'] = function(arg0) {
    return wrapPointer(_emscripten_bind_WebGLObject__getMaterialByType_p1(this.ptr, arg0), Module['Material']);
}

WebGLObject.prototype['get_z'] = function() {
    return _emscripten_bind_WebGLObject__get_z_p0(this.ptr);
}

WebGLObject.prototype['get_transparent'] = function() {
    return wrapPointer(_emscripten_bind_WebGLObject__get_transparent_p0(this.ptr), Module['Material']);
}

WebGLObject.prototype['get_object'] = function() {
    return wrapPointer(_emscripten_bind_WebGLObject__get_object_p0(this.ptr), Module['Object3D']);
}

WebGLObject.prototype['set_buffer'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_buffer_p1(this.ptr, arg0.ptr);
}

WebGLObject.prototype['set_transparent'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_transparent_p1(this.ptr, arg0.ptr);
}

function WebGLObject(arg0, arg1) {
  if (arg1 === undefined)
    this.ptr = _emscripten_bind_WebGLObject__WebGLObject_p1(arg0.ptr);
  else 
    this.ptr = _emscripten_bind_WebGLObject__WebGLObject_p2(arg0.ptr, arg1.ptr);
  WebGLObject.prototype.__cache__[this.ptr] = this;
  this.__class__ = WebGLObject;
}
WebGLObject.prototype.__cache__ = {};
Module['WebGLObject'] = WebGLObject;

WebGLObject.prototype['set_opaque'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_opaque_p1(this.ptr, arg0.ptr);
}

WebGLObject.prototype['get_id'] = function() {
    return _emscripten_bind_WebGLObject__get_id_p0(this.ptr);
}

WebGLObject.prototype['get_opaque'] = function() {
    return wrapPointer(_emscripten_bind_WebGLObject__get_opaque_p0(this.ptr), Module['Material']);
}

WebGLObject.prototype['get_render'] = function() {
    return _emscripten_bind_WebGLObject__get_render_p0(this.ptr);
}

WebGLObject.prototype['set_object'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_object_p1(this.ptr, arg0.ptr);
}

WebGLObject.prototype['set_render'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_render_p1(this.ptr, arg0);
}

WebGLObject.prototype['set_id'] = function(arg0) {
    _emscripten_bind_WebGLObject__set_id_p1(this.ptr, arg0);
}

WebGLObject.prototype['get_buffer'] = function() {
    return wrapPointer(_emscripten_bind_WebGLObject__get_buffer_p0(this.ptr), Module['GeometryGroup']);
}

ParticleSystem.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_ParticleSystem__instanceOf_p1(this.ptr, arg0);
}

ParticleSystem.prototype['__destroy__'] = function() {
    _emscripten_bind_ParticleSystem____destroy___p0(this.ptr);
}

function ParticleSystem() {
    this.ptr = _emscripten_bind_ParticleSystem__ParticleSystem_p0();
  ParticleSystem.prototype.__cache__[this.ptr] = this;
  this.__class__ = ParticleSystem;
}
ParticleSystem.prototype.__cache__ = {};
Module['ParticleSystem'] = ParticleSystem;

function EventDispatcher() {
    this.ptr = _emscripten_bind_EventDispatcher__EventDispatcher_p0();
  EventDispatcher.prototype.__cache__[this.ptr] = this;
  this.__class__ = EventDispatcher;
}
EventDispatcher.prototype.__cache__ = {};
Module['EventDispatcher'] = EventDispatcher;

EventDispatcher.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_EventDispatcher__instanceOf_p1(this.ptr, arg0);
}

EventDispatcher.prototype['__destroy__'] = function() {
    _emscripten_bind_EventDispatcher____destroy___p0(this.ptr);
}

FogExp2.prototype['__destroy__'] = function() {
    _emscripten_bind_FogExp2____destroy___p0(this.ptr);
}

function FogExp2() {
    this.ptr = _emscripten_bind_FogExp2__FogExp2_p0();
  FogExp2.prototype.__cache__[this.ptr] = this;
  this.__class__ = FogExp2;
}
FogExp2.prototype.__cache__ = {};
Module['FogExp2'] = FogExp2;

BufferGeometry.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_BufferGeometry__instanceOf_p1(this.ptr, arg0);
}

BufferGeometry.prototype['__destroy__'] = function() {
    _emscripten_bind_BufferGeometry____destroy___p0(this.ptr);
}

function BufferGeometry() {
    this.ptr = _emscripten_bind_BufferGeometry__BufferGeometry_p0();
  BufferGeometry.prototype.__cache__[this.ptr] = this;
  this.__class__ = BufferGeometry;
}
BufferGeometry.prototype.__cache__ = {};
Module['BufferGeometry'] = BufferGeometry;

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
    return _emscripten_bind_Frustum__intersectsObject_p1(this.ptr, arg0.ptr);
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

DataTexture.prototype['__destroy__'] = function() {
    _emscripten_bind_DataTexture____destroy___p0(this.ptr);
}

function DataTexture() {
    this.ptr = _emscripten_bind_DataTexture__DataTexture_p0();
  DataTexture.prototype.__cache__[this.ptr] = this;
  this.__class__ = DataTexture;
}
DataTexture.prototype.__cache__ = {};
Module['DataTexture'] = DataTexture;

Material.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Material__instanceOf_p1(this.ptr, arg0);
}

Material.prototype['get_blendSrc'] = function() {
    return _emscripten_bind_Material__get_blendSrc_p0(this.ptr);
}

Material.prototype['set_polygonOffset'] = function(arg0) {
    _emscripten_bind_Material__set_polygonOffset_p1(this.ptr, arg0);
}

Material.prototype['get_depthTest'] = function() {
    return _emscripten_bind_Material__get_depthTest_p0(this.ptr);
}

Material.prototype['get_blending'] = function() {
    return _emscripten_bind_Material__get_blending_p0(this.ptr);
}

Material.prototype['get_name'] = function() {
    return _emscripten_bind_Material__get_name_p0(this.ptr);
}

Material.prototype['get_side'] = function() {
    return _emscripten_bind_Material__get_side_p0(this.ptr);
}

Material.prototype['get_needsUpdate'] = function() {
    return _emscripten_bind_Material__get_needsUpdate_p0(this.ptr);
}

Material.prototype['get_depthWrite'] = function() {
    return _emscripten_bind_Material__get_depthWrite_p0(this.ptr);
}

Material.prototype['get_blendDst'] = function() {
    return _emscripten_bind_Material__get_blendDst_p0(this.ptr);
}

Material.prototype['get_alphaTest'] = function() {
    return _emscripten_bind_Material__get_alphaTest_p0(this.ptr);
}

Material.prototype['set_blendDst'] = function(arg0) {
    _emscripten_bind_Material__set_blendDst_p1(this.ptr, arg0);
}

Material.prototype['get_transparent'] = function() {
    return _emscripten_bind_Material__get_transparent_p0(this.ptr);
}

function Material() {
    this.ptr = _emscripten_bind_Material__Material_p0();
  Material.prototype.__cache__[this.ptr] = this;
  this.__class__ = Material;
}
Material.prototype.__cache__ = {};
Module['Material'] = Material;

Material.prototype['set_transparent'] = function(arg0) {
    _emscripten_bind_Material__set_transparent_p1(this.ptr, arg0);
}

Material.prototype['get_overdraw'] = function() {
    return _emscripten_bind_Material__get_overdraw_p0(this.ptr);
}

Material.prototype['set_opacity'] = function(arg0) {
    _emscripten_bind_Material__set_opacity_p1(this.ptr, arg0);
}

Material.prototype['set_depthWrite'] = function(arg0) {
    _emscripten_bind_Material__set_depthWrite_p1(this.ptr, arg0);
}

Material.prototype['set_depthTest'] = function(arg0) {
    _emscripten_bind_Material__set_depthTest_p1(this.ptr, arg0);
}

Material.prototype['get_opacity'] = function() {
    return _emscripten_bind_Material__get_opacity_p0(this.ptr);
}

Material.prototype['get_polygonOffsetUnits'] = function() {
    return _emscripten_bind_Material__get_polygonOffsetUnits_p0(this.ptr);
}

Material.prototype['set_needsUpdate'] = function(arg0) {
    _emscripten_bind_Material__set_needsUpdate_p1(this.ptr, arg0);
}

Material.prototype['get_blendEquation'] = function() {
    return _emscripten_bind_Material__get_blendEquation_p0(this.ptr);
}

Material.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Material__clone_p0(this.ptr), Module['Material']);
}

Material.prototype['get_visible'] = function() {
    return _emscripten_bind_Material__get_visible_p0(this.ptr);
}

Material.prototype['get_polygonOffsetFactor'] = function() {
    return _emscripten_bind_Material__get_polygonOffsetFactor_p0(this.ptr);
}

Material.prototype['get_id'] = function() {
    return _emscripten_bind_Material__get_id_p0(this.ptr);
}

Material.prototype['set_alphaTest'] = function(arg0) {
    _emscripten_bind_Material__set_alphaTest_p1(this.ptr, arg0);
}

Material.prototype['__destroy__'] = function() {
    _emscripten_bind_Material____destroy___p0(this.ptr);
}

Material.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Material__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Material.prototype['get_polygonOffset'] = function() {
    return _emscripten_bind_Material__get_polygonOffset_p0(this.ptr);
}

Material.prototype['set_polygonOffsetFactor'] = function(arg0) {
    _emscripten_bind_Material__set_polygonOffsetFactor_p1(this.ptr, arg0);
}

Material.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Material__set_visible_p1(this.ptr, arg0);
}

Material.prototype['set_overdraw'] = function(arg0) {
    _emscripten_bind_Material__set_overdraw_p1(this.ptr, arg0);
}

Material.prototype['set_blendSrc'] = function(arg0) {
    _emscripten_bind_Material__set_blendSrc_p1(this.ptr, arg0);
}

Material.prototype['set_blendEquation'] = function(arg0) {
    _emscripten_bind_Material__set_blendEquation_p1(this.ptr, arg0);
}

Material.prototype['set_blending'] = function(arg0) {
    _emscripten_bind_Material__set_blending_p1(this.ptr, arg0);
}

Material.prototype['set_side'] = function(arg0) {
    _emscripten_bind_Material__set_side_p1(this.ptr, arg0);
}

Material.prototype['set_polygonOffsetUnits'] = function(arg0) {
    _emscripten_bind_Material__set_polygonOffsetUnits_p1(this.ptr, arg0);
}

Material.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Material__set_id_p1(this.ptr, arg0);
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

LineDashedMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_LineDashedMaterial__instanceOf_p1(this.ptr, arg0);
}

LineDashedMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_LineDashedMaterial____destroy___p0(this.ptr);
}

function LineDashedMaterial() {
    this.ptr = _emscripten_bind_LineDashedMaterial__LineDashedMaterial_p0();
  LineDashedMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = LineDashedMaterial;
}
LineDashedMaterial.prototype.__cache__ = {};
Module['LineDashedMaterial'] = LineDashedMaterial;

MeshBasicMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshBasicMaterial__instanceOf_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_polygonOffsetFactor'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_polygonOffsetFactor_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_morphTargets'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_morphTargets_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_skinning'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_skinning_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_polygonOffset'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_polygonOffset_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_vertexColors'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_vertexColors_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_blending'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_blending_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_side'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_side_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_reflectivity'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_reflectivity_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_needsUpdate'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_needsUpdate_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_refractionRatio'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_refractionRatio_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_depthWrite'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_depthWrite_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_wireframe'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_wireframe_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_map'] = function() {
    return wrapPointer(_emscripten_bind_MeshBasicMaterial__get_map_p0(this.ptr), Module['Texture']);
}

MeshBasicMaterial.prototype['get_blendDst'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_blendDst_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_alphaTest'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_alphaTest_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_blendDst'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_blendDst_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_morphTargets'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_morphTargets_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_refractionRatio'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_refractionRatio_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_blendEquation'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_blendEquation_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_transparent'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_transparent_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_skinning'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_skinning_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_overdraw'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_overdraw_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_opacity'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_opacity_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_reflectivity'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_reflectivity_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_fog'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_fog_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_depthWrite'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_depthWrite_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_vertexColors'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_vertexColors_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_fog'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_fog_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_depthTest'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_depthTest_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_MeshBasicMaterial__get_color_p0(this.ptr), Module['Color']);
}

MeshBasicMaterial.prototype['get_blendSrc'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_blendSrc_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_shading'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_shading_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_polygonOffsetUnits'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_polygonOffsetUnits_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_wireframe'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_wireframe_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_needsUpdate'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_needsUpdate_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_transparent'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_transparent_p0(this.ptr);
}

function MeshBasicMaterial() {
    this.ptr = _emscripten_bind_MeshBasicMaterial__MeshBasicMaterial_p0();
  MeshBasicMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshBasicMaterial;
}
MeshBasicMaterial.prototype.__cache__ = {};
Module['MeshBasicMaterial'] = MeshBasicMaterial;

MeshBasicMaterial.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_MeshBasicMaterial__clone_p0(this.ptr), Module['Material']);
}

MeshBasicMaterial.prototype['get_visible'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_visible_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_blendSrc'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_blendSrc_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_polygonOffsetFactor'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_polygonOffsetFactor_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_id'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_id_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_combine'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_combine_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_depthTest'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_depthTest_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_combine'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_combine_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_alphaTest'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_alphaTest_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshBasicMaterial____destroy___p0(this.ptr);
}

MeshBasicMaterial.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_MeshBasicMaterial__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

MeshBasicMaterial.prototype['get_polygonOffset'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_polygonOffset_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_map'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_map_p1(this.ptr, arg0.ptr);
}

MeshBasicMaterial.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_visible_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_overdraw'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_overdraw_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_shading'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_shading_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_wireframeLinewidth'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_wireframeLinewidth_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['get_name'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_name_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_opacity'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_opacity_p0(this.ptr);
}

MeshBasicMaterial.prototype['get_wireframeLinewidth'] = function() {
    return _emscripten_bind_MeshBasicMaterial__get_wireframeLinewidth_p0(this.ptr);
}

MeshBasicMaterial.prototype['set_blendEquation'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_blendEquation_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_blending'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_blending_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_side'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_side_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_color'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_color_p1(this.ptr, arg0.ptr);
}

MeshBasicMaterial.prototype['set_polygonOffsetUnits'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_polygonOffsetUnits_p1(this.ptr, arg0);
}

MeshBasicMaterial.prototype['set_id'] = function(arg0) {
    _emscripten_bind_MeshBasicMaterial__set_id_p1(this.ptr, arg0);
}

Sprite.prototype['__destroy__'] = function() {
    _emscripten_bind_Sprite____destroy___p0(this.ptr);
}

function Sprite() {
    this.ptr = _emscripten_bind_Sprite__Sprite_p0();
  Sprite.prototype.__cache__[this.ptr] = this;
  this.__class__ = Sprite;
}
Sprite.prototype.__cache__ = {};
Module['Sprite'] = Sprite;

ShaderMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_ShaderMaterial__instanceOf_p1(this.ptr, arg0);
}

ShaderMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_ShaderMaterial____destroy___p0(this.ptr);
}

function ShaderMaterial() {
    this.ptr = _emscripten_bind_ShaderMaterial__ShaderMaterial_p0();
  ShaderMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = ShaderMaterial;
}
ShaderMaterial.prototype.__cache__ = {};
Module['ShaderMaterial'] = ShaderMaterial;

OrthographicCamera.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_OrthographicCamera__instanceOf_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_material_p0(this.ptr), Module['Material']);
}

OrthographicCamera.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_scale_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_top'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_top_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_renderDepth_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_OrthographicCamera__get_receiveShadow_p0(this.ptr);
}

OrthographicCamera.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_orientation_p0(this.ptr), Module['Quaternion']);
}

OrthographicCamera.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_castShadow_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_target_p0(this.ptr), Module['Object3D']);
}

OrthographicCamera.prototype['add'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__add_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_rotation_p0(this.ptr), Module['Vector3']);
}

function OrthographicCamera(arg0, arg1, arg2, arg3, arg4, arg5) {
    this.ptr = _emscripten_bind_OrthographicCamera__OrthographicCamera_p6(arg0, arg1, arg2, arg3, arg4, arg5);
  OrthographicCamera.prototype.__cache__[this.ptr] = this;
  this.__class__ = OrthographicCamera;
}
OrthographicCamera.prototype.__cache__ = {};
Module['OrthographicCamera'] = OrthographicCamera;

OrthographicCamera.prototype['get_projectionMatrix'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_projectionMatrix_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

OrthographicCamera.prototype['set_far'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_far_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

OrthographicCamera.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_OrthographicCamera__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

OrthographicCamera.prototype['set_bottom'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_bottom_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_OrthographicCamera__get_renderDepth_p0(this.ptr);
}

OrthographicCamera.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_up_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_matrix_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['get_name'] = function() {
    return _emscripten_bind_OrthographicCamera__get_name_p0(this.ptr);
}

OrthographicCamera.prototype['get_top'] = function() {
    return _emscripten_bind_OrthographicCamera__get_top_p0(this.ptr);
}

OrthographicCamera.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_OrthographicCamera____removeObject_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['traverse'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__traverse_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_acceleration_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_OrthographicCamera__get_useQuaternion_p0(this.ptr);
}

OrthographicCamera.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__lookAt_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['remove'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__remove_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_geometry_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_orientation_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set___webglActive_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['hasParent'] = function() {
    return _emscripten_bind_OrthographicCamera__hasParent_p0(this.ptr);
}

OrthographicCamera.prototype['set_target'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_target_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_projectionMatrixInverse'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_projectionMatrixInverse_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_projectionMatrix'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_projectionMatrix_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_near'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_near_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrix_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_sortParticles_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_forceAccum_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_visible_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

OrthographicCamera.prototype['set_id'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_id_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_far'] = function() {
    return _emscripten_bind_OrthographicCamera__get_far_p0(this.ptr);
}

OrthographicCamera.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_up'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_up_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_velocity_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_scale_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['get_projectionMatrixInverse'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_projectionMatrixInverse_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_geometry_p0(this.ptr), Module['Geometry']);
}

OrthographicCamera.prototype['set_left'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_left_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

OrthographicCamera.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_parent_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_receiveShadow_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_parent_p0(this.ptr), Module['Object3D']);
}

OrthographicCamera.prototype['set_matrixWorldInverse'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_matrixWorldInverse_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['get_id'] = function() {
    return _emscripten_bind_OrthographicCamera__get_id_p0(this.ptr);
}

OrthographicCamera.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_OrthographicCamera__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_OrthographicCamera__updateMatrixWorld_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_rotation_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_material'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_material_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_OrthographicCamera__get_sortParticles_p0(this.ptr);
}

OrthographicCamera.prototype['get___webglInit'] = function() {
    return _emscripten_bind_OrthographicCamera__get___webglInit_p0(this.ptr);
}

OrthographicCamera.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

OrthographicCamera.prototype['get_bottom'] = function() {
    return _emscripten_bind_OrthographicCamera__get_bottom_p0(this.ptr);
}

OrthographicCamera.prototype['get_near'] = function() {
    return _emscripten_bind_OrthographicCamera__get_near_p0(this.ptr);
}

OrthographicCamera.prototype['get_left'] = function() {
    return _emscripten_bind_OrthographicCamera__get_left_p0(this.ptr);
}

OrthographicCamera.prototype['get_castShadow'] = function() {
    return _emscripten_bind_OrthographicCamera__get_castShadow_p0(this.ptr);
}

OrthographicCamera.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_OrthographicCamera__get_rotationAutoUpdate_p0(this.ptr);
}

OrthographicCamera.prototype['set_position'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_position_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_matrixWorldInverse'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_matrixWorldInverse_p0(this.ptr), Module['Matrix4']);
}

OrthographicCamera.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

OrthographicCamera.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_velocity_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_right'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_right_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_acceleration_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['get___webglActive'] = function() {
    return _emscripten_bind_OrthographicCamera__get___webglActive_p0(this.ptr);
}

OrthographicCamera.prototype['updateMatrix'] = function() {
    _emscripten_bind_OrthographicCamera__updateMatrix_p0(this.ptr);
}

OrthographicCamera.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_OrthographicCamera__get_frustumCulled_p0(this.ptr);
}

OrthographicCamera.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_frustumCulled_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_right'] = function() {
    return _emscripten_bind_OrthographicCamera__get_right_p0(this.ptr);
}

OrthographicCamera.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__get_position_p0(this.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set___webglInit_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_OrthographicCamera__clone_p0(this.ptr), Module['Object3D']);
}

OrthographicCamera.prototype['get_visible'] = function() {
    return _emscripten_bind_OrthographicCamera__get_visible_p0(this.ptr);
}

OrthographicCamera.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_useQuaternion_p1(this.ptr, arg0);
}

OrthographicCamera.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_OrthographicCamera__get_matrixAutoUpdate_p0(this.ptr);
}

OrthographicCamera.prototype['updateProjectionMatrix'] = function() {
    _emscripten_bind_OrthographicCamera__updateProjectionMatrix_p0(this.ptr);
}

OrthographicCamera.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_OrthographicCamera__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

OrthographicCamera.prototype['__destroy__'] = function() {
    _emscripten_bind_OrthographicCamera____destroy___p0(this.ptr);
}

OrthographicCamera.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_OrthographicCamera__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

OrthographicCamera.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_OrthographicCamera____addObject_p1(this.ptr, arg0.ptr);
}

OrthographicCamera.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_OrthographicCamera__set_torqueAccum_p1(this.ptr, arg0.ptr);
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

MeshPhongMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshPhongMaterial__instanceOf_p1(this.ptr, arg0);
}

function MeshPhongMaterial() {
    this.ptr = _emscripten_bind_MeshPhongMaterial__MeshPhongMaterial_p0();
  MeshPhongMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshPhongMaterial;
}
MeshPhongMaterial.prototype.__cache__ = {};
Module['MeshPhongMaterial'] = MeshPhongMaterial;

MeshPhongMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshPhongMaterial____destroy___p0(this.ptr);
}

function SkinnedMesh() {
    this.ptr = _emscripten_bind_SkinnedMesh__SkinnedMesh_p0();
  SkinnedMesh.prototype.__cache__[this.ptr] = this;
  this.__class__ = SkinnedMesh;
}
SkinnedMesh.prototype.__cache__ = {};
Module['SkinnedMesh'] = SkinnedMesh;

SkinnedMesh.prototype['__destroy__'] = function() {
    _emscripten_bind_SkinnedMesh____destroy___p0(this.ptr);
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

ParticleCanvasMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_ParticleCanvasMaterial__instanceOf_p1(this.ptr, arg0);
}

ParticleCanvasMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_ParticleCanvasMaterial____destroy___p0(this.ptr);
}

function ParticleCanvasMaterial() {
    this.ptr = _emscripten_bind_ParticleCanvasMaterial__ParticleCanvasMaterial_p0();
  ParticleCanvasMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = ParticleCanvasMaterial;
}
ParticleCanvasMaterial.prototype.__cache__ = {};
Module['ParticleCanvasMaterial'] = ParticleCanvasMaterial;

Particle.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Particle__instanceOf_p1(this.ptr, arg0);
}

Particle.prototype['__destroy__'] = function() {
    _emscripten_bind_Particle____destroy___p0(this.ptr);
}

function Particle() {
    this.ptr = _emscripten_bind_Particle__Particle_p0();
  Particle.prototype.__cache__[this.ptr] = this;
  this.__class__ = Particle;
}
Particle.prototype.__cache__ = {};
Module['Particle'] = Particle;

MeshFaceMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshFaceMaterial__instanceOf_p1(this.ptr, arg0);
}

MeshFaceMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshFaceMaterial____destroy___p0(this.ptr);
}

function MeshFaceMaterial() {
    this.ptr = _emscripten_bind_MeshFaceMaterial__MeshFaceMaterial_p0();
  MeshFaceMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshFaceMaterial;
}
MeshFaceMaterial.prototype.__cache__ = {};
Module['MeshFaceMaterial'] = MeshFaceMaterial;

Geometry.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Geometry__instanceOf_p1(this.ptr, arg0);
}

Geometry.prototype['computeTangents'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeTangents_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['set_uvsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_uvsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglUVBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglUVBuffer_p0(this.ptr);
}

Geometry.prototype['set_tangentsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_tangentsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['get_lineDistancesNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_lineDistancesNeedUpdate_p0(this.ptr);
}

Geometry.prototype['get___webglColorBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglColorBuffer_p0(this.ptr);
}

Geometry.prototype['computeMorphNormals'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeMorphNormals_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['get___webglVertexBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglVertexBuffer_p0(this.ptr);
}

Geometry.prototype['mergeVertices'] = function() {
    return _emscripten_bind_Geometry__mergeVertices_p0(this.ptr);
}

Geometry.prototype['get_buffersNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_buffersNeedUpdate_p0(this.ptr);
}

Geometry.prototype['set_normalsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_normalsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['set_morphTargetsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_morphTargetsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglUV2Buffer'] = function() {
    return _emscripten_bind_Geometry__get___webglUV2Buffer_p0(this.ptr);
}

Geometry.prototype['set_hasTangents'] = function(arg0) {
    _emscripten_bind_Geometry__set_hasTangents_p1(this.ptr, arg0);
}

Geometry.prototype['get_morphTargetsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_morphTargetsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['set___webglLineDistanceBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglLineDistanceBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglTangentBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglTangentBuffer_p0(this.ptr);
}

Geometry.prototype['set___webglNormalBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglNormalBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['set_buffersNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_buffersNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['get_uvsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_uvsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['set___webglColorBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglColorBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['computeLineDistances'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeLineDistances_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['get_hasTangents'] = function() {
    return _emscripten_bind_Geometry__get_hasTangents_p0(this.ptr);
}

Geometry.prototype['get_boundingSphere'] = function() {
    return _emscripten_bind_Geometry__get_boundingSphere_p0(this.ptr);
}

Geometry.prototype['set___webglUV2Buffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglUV2Buffer_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglNormalBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglNormalBuffer_p0(this.ptr);
}

Geometry.prototype['computeCentroids'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeCentroids_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['set_boundingBox'] = function(arg0) {
    _emscripten_bind_Geometry__set_boundingBox_p1(this.ptr, arg0);
}

Geometry.prototype['get_colorsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_colorsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['computeBoundingSphere'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeBoundingSphere_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['set___webglSkinIndicesBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglSkinIndicesBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Geometry__get___webglInit_p0(this.ptr);
}

Geometry.prototype['set_lineDistancesNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_lineDistancesNeedUpdate_p1(this.ptr, arg0);
}

function Geometry() {
    this.ptr = _emscripten_bind_Geometry__Geometry_p0();
  Geometry.prototype.__cache__[this.ptr] = this;
  this.__class__ = Geometry;
}
Geometry.prototype.__cache__ = {};
Module['Geometry'] = Geometry;

Geometry.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglInit_p1(this.ptr, arg0);
}

Geometry.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__clone_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['get___webglFaceBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglFaceBuffer_p0(this.ptr);
}

Geometry.prototype['get_dynamic'] = function() {
    return _emscripten_bind_Geometry__get_dynamic_p0(this.ptr);
}

Geometry.prototype['set___webglVertexBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglVertexBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['computeFaceNormals'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeFaceNormals_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['get_normalsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_normalsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['get___webglLineBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglLineBuffer_p0(this.ptr);
}

Geometry.prototype['set___webglLineBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglLineBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglSkinIndicesBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglSkinIndicesBuffer_p0(this.ptr);
}

Geometry.prototype['set_colorsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_colorsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['set___webglTangentBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglTangentBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['set_elementsNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_elementsNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['__destroy__'] = function() {
    _emscripten_bind_Geometry____destroy___p0(this.ptr);
}

Geometry.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Geometry__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Geometry.prototype['set_verticesNeedUpdate'] = function(arg0) {
    _emscripten_bind_Geometry__set_verticesNeedUpdate_p1(this.ptr, arg0);
}

Geometry.prototype['get_tangentsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_tangentsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['get_boundingBox'] = function() {
    return _emscripten_bind_Geometry__get_boundingBox_p0(this.ptr);
}

Geometry.prototype['computeBoundingBox'] = function() {
    return wrapPointer(_emscripten_bind_Geometry__computeBoundingBox_p0(this.ptr), Module['Geometry']);
}

Geometry.prototype['set_boundingSphere'] = function(arg0) {
    _emscripten_bind_Geometry__set_boundingSphere_p1(this.ptr, arg0);
}

Geometry.prototype['get___webglLineDistanceBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglLineDistanceBuffer_p0(this.ptr);
}

Geometry.prototype['get_id'] = function() {
    return _emscripten_bind_Geometry__get_id_p0(this.ptr);
}

Geometry.prototype['get_name'] = function() {
    return _emscripten_bind_Geometry__get_name_p0(this.ptr);
}

Geometry.prototype['set___webglSkinWeightsBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglSkinWeightsBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['set___webglFaceBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglFaceBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['computeVertexNormals'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Geometry__computeVertexNormals_p1(this.ptr, arg0), Module['Geometry']);
}

Geometry.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Geometry__applyMatrix_p1(this.ptr, arg0.ptr), Module['Geometry']);
}

Geometry.prototype['set_dynamic'] = function(arg0) {
    _emscripten_bind_Geometry__set_dynamic_p1(this.ptr, arg0);
}

Geometry.prototype['get_elementsNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_elementsNeedUpdate_p0(this.ptr);
}

Geometry.prototype['get___webglSkinWeightsBuffer'] = function() {
    return _emscripten_bind_Geometry__get___webglSkinWeightsBuffer_p0(this.ptr);
}

Geometry.prototype['set___webglUVBuffer'] = function(arg0) {
    _emscripten_bind_Geometry__set___webglUVBuffer_p1(this.ptr, arg0);
}

Geometry.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Geometry__set_id_p1(this.ptr, arg0);
}

Geometry.prototype['get_verticesNeedUpdate'] = function() {
    return _emscripten_bind_Geometry__get_verticesNeedUpdate_p0(this.ptr);
}

Light.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Light__instanceOf_p1(this.ptr, arg0);
}

Light.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_material_p0(this.ptr), Module['Material']);
}

Light.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_Light__set_scale_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_Light__get_receiveShadow_p0(this.ptr);
}

Light.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_Light__set_renderDepth_p1(this.ptr, arg0);
}

Light.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

Light.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_Light__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_Light__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

Light.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_orientation_p0(this.ptr), Module['Quaternion']);
}

Light.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_Light__set_castShadow_p1(this.ptr, arg0);
}

Light.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_target_p0(this.ptr), Module['Object3D']);
}

Light.prototype['add'] = function(arg0) {
    _emscripten_bind_Light__add_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_rotation_p0(this.ptr), Module['Vector3']);
}

Light.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

Light.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

Light.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

Light.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Light__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

Light.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_Light__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

Light.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_Light__get_renderDepth_p0(this.ptr);
}

Light.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_up_p0(this.ptr), Module['Vector3']);
}

Light.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_matrix_p0(this.ptr), Module['Matrix4']);
}

Light.prototype['get_name'] = function() {
    return _emscripten_bind_Light__get_name_p0(this.ptr);
}

Light.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_Light__set_geometry_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_color'] = function(arg0) {
    _emscripten_bind_Light__set_color_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_Light__set_forceAccum_p1(this.ptr, arg0.ptr);
}

Light.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_Light____removeObject_p1(this.ptr, arg0.ptr);
}

Light.prototype['traverse'] = function(arg0) {
    _emscripten_bind_Light__traverse_p1(this.ptr, arg0);
}

Light.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_Light__set_acceleration_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_Light__get_useQuaternion_p0(this.ptr);
}

Light.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

Light.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_Light__lookAt_p1(this.ptr, arg0.ptr);
}

Light.prototype['remove'] = function(arg0) {
    _emscripten_bind_Light__remove_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_Light__set_orientation_p1(this.ptr, arg0.ptr);
}

Light.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_Light__set___webglActive_p1(this.ptr, arg0);
}

Light.prototype['hasParent'] = function() {
    return _emscripten_bind_Light__hasParent_p0(this.ptr);
}

Light.prototype['set_target'] = function(arg0) {
    _emscripten_bind_Light__set_target_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_Light__set_sortParticles_p1(this.ptr, arg0);
}

Light.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_Light__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_Light__set_matrix_p1(this.ptr, arg0.ptr);
}

function Light(arg0) {
    this.ptr = _emscripten_bind_Light__Light_p1(arg0);
  Light.prototype.__cache__[this.ptr] = this;
  this.__class__ = Light;
}
Light.prototype.__cache__ = {};
Module['Light'] = Light;

Light.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_Light__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

Light.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_Light__set_visible_p1(this.ptr, arg0);
}

Light.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_Light__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

Light.prototype['set_id'] = function(arg0) {
    _emscripten_bind_Light__set_id_p1(this.ptr, arg0);
}

Light.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

Light.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_Light__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

Light.prototype['set_up'] = function(arg0) {
    _emscripten_bind_Light__set_up_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_velocity_p0(this.ptr), Module['Vector3']);
}

Light.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Light.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_scale_p0(this.ptr), Module['Vector3']);
}

Light.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_geometry_p0(this.ptr), Module['Geometry']);
}

Light.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Light__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

Light.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Light__set_parent_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_Light__set_receiveShadow_p1(this.ptr, arg0);
}

Light.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_parent_p0(this.ptr), Module['Object3D']);
}

Light.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

Light.prototype['get_id'] = function() {
    return _emscripten_bind_Light__get_id_p0(this.ptr);
}

Light.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_Light__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_Light__updateMatrixWorld_p1(this.ptr, arg0);
}

Light.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_Light__set_rotation_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_material'] = function(arg0) {
    _emscripten_bind_Light__set_material_p1(this.ptr, arg0.ptr);
}

Light.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_Light__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_Light__get_sortParticles_p0(this.ptr);
}

Light.prototype['get___webglInit'] = function() {
    return _emscripten_bind_Light__get___webglInit_p0(this.ptr);
}

Light.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

Light.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_color_p0(this.ptr), Module['Color']);
}

Light.prototype['get_castShadow'] = function() {
    return _emscripten_bind_Light__get_castShadow_p0(this.ptr);
}

Light.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_Light__get_rotationAutoUpdate_p0(this.ptr);
}

Light.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Light__set_position_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_Light__set_velocity_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_acceleration_p0(this.ptr), Module['Vector3']);
}

Light.prototype['get___webglActive'] = function() {
    return _emscripten_bind_Light__get___webglActive_p0(this.ptr);
}

Light.prototype['updateMatrix'] = function() {
    _emscripten_bind_Light__updateMatrix_p0(this.ptr);
}

Light.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_Light__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

Light.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_Light__get_frustumCulled_p0(this.ptr);
}

Light.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_Light__set_frustumCulled_p1(this.ptr, arg0);
}

Light.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Light__get_position_p0(this.ptr), Module['Vector3']);
}

Light.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_Light__set___webglInit_p1(this.ptr, arg0);
}

Light.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Light__clone_p0(this.ptr), Module['Object3D']);
}

Light.prototype['get_visible'] = function() {
    return _emscripten_bind_Light__get_visible_p0(this.ptr);
}

Light.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_Light__set_useQuaternion_p1(this.ptr, arg0);
}

Light.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_Light__get_matrixAutoUpdate_p0(this.ptr);
}

Light.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Light__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Light.prototype['__destroy__'] = function() {
    _emscripten_bind_Light____destroy___p0(this.ptr);
}

Light.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_Light__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

Light.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_Light____addObject_p1(this.ptr, arg0.ptr);
}

Light.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_Light__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

GeometryGroup.prototype['get_materialIndex'] = function() {
    return _emscripten_bind_GeometryGroup__get_materialIndex_p0(this.ptr);
}

GeometryGroup.prototype['get___webglUVBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglUVBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___webglColorBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglColorBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___webglFaceCount'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglFaceCount_p0(this.ptr);
}

GeometryGroup.prototype['get___webglVertexBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglVertexBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___webglSkinWeightsBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglSkinWeightsBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___webglUV2Buffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglUV2Buffer_p0(this.ptr);
}

GeometryGroup.prototype['set___webglLineDistanceBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglLineDistanceBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['get___webglTangentBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglTangentBuffer_p0(this.ptr);
}

GeometryGroup.prototype['set___inittedArrays'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___inittedArrays_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglNormalBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglNormalBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglColorBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglColorBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglUV2Buffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglUV2Buffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglUVBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglUVBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set_numMorphTargets'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set_numMorphTargets_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglLineBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglLineBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglSkinIndicesBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglSkinIndicesBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglLineCount'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglLineCount_p1(this.ptr, arg0);
}

GeometryGroup.prototype['get___webglNormalBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglNormalBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___webglFaceBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglFaceBuffer_p0(this.ptr);
}

function GeometryGroup() {
    this.ptr = _emscripten_bind_GeometryGroup__GeometryGroup_p0();
  GeometryGroup.prototype.__cache__[this.ptr] = this;
  this.__class__ = GeometryGroup;
}
GeometryGroup.prototype.__cache__ = {};
Module['GeometryGroup'] = GeometryGroup;

GeometryGroup.prototype['set_vertices'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set_vertices_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglVertexBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglVertexBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['get_id'] = function() {
    return _emscripten_bind_GeometryGroup__get_id_p0(this.ptr);
}

GeometryGroup.prototype['get___webglLineBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglLineBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get___inittedArrays'] = function() {
    return _emscripten_bind_GeometryGroup__get___inittedArrays_p0(this.ptr);
}

GeometryGroup.prototype['get___webglSkinIndicesBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglSkinIndicesBuffer_p0(this.ptr);
}

GeometryGroup.prototype['get_vertices'] = function() {
    return _emscripten_bind_GeometryGroup__get_vertices_p0(this.ptr);
}

GeometryGroup.prototype['set___webglFaceCount'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglFaceCount_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set___webglTangentBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglTangentBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['__destroy__'] = function() {
    _emscripten_bind_GeometryGroup____destroy___p0(this.ptr);
}

GeometryGroup.prototype['get_numMorphNormals'] = function() {
    return _emscripten_bind_GeometryGroup__get_numMorphNormals_p0(this.ptr);
}

GeometryGroup.prototype['get_numMorphTargets'] = function() {
    return _emscripten_bind_GeometryGroup__get_numMorphTargets_p0(this.ptr);
}

GeometryGroup.prototype['set___webglFaceBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglFaceBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['get___webglLineDistanceBuffer'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglLineDistanceBuffer_p0(this.ptr);
}

GeometryGroup.prototype['set___webglSkinWeightsBuffer'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set___webglSkinWeightsBuffer_p1(this.ptr, arg0);
}

GeometryGroup.prototype['get___webglLineCount'] = function() {
    return _emscripten_bind_GeometryGroup__get___webglLineCount_p0(this.ptr);
}

GeometryGroup.prototype['set_numMorphNormals'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set_numMorphNormals_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set_materialIndex'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set_materialIndex_p1(this.ptr, arg0);
}

GeometryGroup.prototype['set_id'] = function(arg0) {
    _emscripten_bind_GeometryGroup__set_id_p1(this.ptr, arg0);
}

LineBasicMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_LineBasicMaterial__instanceOf_p1(this.ptr, arg0);
}

LineBasicMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_LineBasicMaterial____destroy___p0(this.ptr);
}

function LineBasicMaterial() {
    this.ptr = _emscripten_bind_LineBasicMaterial__LineBasicMaterial_p0();
  LineBasicMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = LineBasicMaterial;
}
LineBasicMaterial.prototype.__cache__ = {};
Module['LineBasicMaterial'] = LineBasicMaterial;

Face.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Face__instanceOf_p1(this.ptr, arg0);
}

Face.prototype['get_materialIndex'] = function() {
    return _emscripten_bind_Face__get_materialIndex_p0(this.ptr);
}

Face.prototype['set_centroid'] = function(arg0) {
    _emscripten_bind_Face__set_centroid_p1(this.ptr, arg0.ptr);
}

Face.prototype['set_normal'] = function(arg0) {
    _emscripten_bind_Face__set_normal_p1(this.ptr, arg0.ptr);
}

Face.prototype['get_centroid'] = function() {
    return wrapPointer(_emscripten_bind_Face__get_centroid_p0(this.ptr), Module['Vector3']);
}

Face.prototype['get_normal'] = function() {
    return wrapPointer(_emscripten_bind_Face__get_normal_p0(this.ptr), Module['Vector3']);
}

Face.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Face__clone_p0(this.ptr), Module['Face']);
}

Face.prototype['set_materialIndex'] = function(arg0) {
    _emscripten_bind_Face__set_materialIndex_p1(this.ptr, arg0);
}

Face.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_Face__get_color_p0(this.ptr), Module['Color']);
}

function Face() {
    this.ptr = _emscripten_bind_Face__Face_p0();
  Face.prototype.__cache__[this.ptr] = this;
  this.__class__ = Face;
}
Face.prototype.__cache__ = {};
Module['Face'] = Face;

Face.prototype['__destroy__'] = function() {
    _emscripten_bind_Face____destroy___p0(this.ptr);
}

Face.prototype['set_color'] = function(arg0) {
    _emscripten_bind_Face__set_color_p1(this.ptr, arg0.ptr);
}

Face.prototype['get_d'] = function() {
    return _emscripten_bind_Face__get_d_p0(this.ptr);
}

Face.prototype['set_a'] = function(arg0) {
    _emscripten_bind_Face__set_a_p1(this.ptr, arg0);
}

Face.prototype['set_b'] = function(arg0) {
    _emscripten_bind_Face__set_b_p1(this.ptr, arg0);
}

Face.prototype['set_c'] = function(arg0) {
    _emscripten_bind_Face__set_c_p1(this.ptr, arg0);
}

Face.prototype['set_d'] = function(arg0) {
    _emscripten_bind_Face__set_d_p1(this.ptr, arg0);
}

Face.prototype['get_a'] = function() {
    return _emscripten_bind_Face__get_a_p0(this.ptr);
}

Face.prototype['get_b'] = function() {
    return _emscripten_bind_Face__get_b_p0(this.ptr);
}

Face.prototype['get_c'] = function() {
    return _emscripten_bind_Face__get_c_p0(this.ptr);
}

PointLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_PointLight__instanceOf_p1(this.ptr, arg0);
}

PointLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_material_p0(this.ptr), Module['Material']);
}

PointLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_PointLight__set_scale_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_PointLight__get_receiveShadow_p0(this.ptr);
}

PointLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_PointLight__set_renderDepth_p1(this.ptr, arg0);
}

PointLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

PointLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_PointLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_PointLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

PointLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

PointLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_PointLight__set_castShadow_p1(this.ptr, arg0);
}

PointLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_target_p0(this.ptr), Module['Object3D']);
}

PointLight.prototype['add'] = function(arg0) {
    _emscripten_bind_PointLight__add_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['get_distance'] = function() {
    return _emscripten_bind_PointLight__get_distance_p0(this.ptr);
}

PointLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

PointLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

PointLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

PointLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

PointLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_PointLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

PointLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_up_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

PointLight.prototype['get_name'] = function() {
    return _emscripten_bind_PointLight__get_name_p0(this.ptr);
}

PointLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_PointLight__set_geometry_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_PointLight__set_color_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_PointLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_PointLight____removeObject_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_PointLight__traverse_p1(this.ptr, arg0);
}

PointLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_PointLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

PointLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_PointLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_PointLight__get_useQuaternion_p0(this.ptr);
}

PointLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_PointLight__lookAt_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_PointLight__remove_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_PointLight__set_orientation_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_PointLight__set___webglActive_p1(this.ptr, arg0);
}

PointLight.prototype['hasParent'] = function() {
    return _emscripten_bind_PointLight__hasParent_p0(this.ptr);
}

PointLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_PointLight__set_target_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_distance'] = function(arg0) {
    _emscripten_bind_PointLight__set_distance_p1(this.ptr, arg0);
}

PointLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_PointLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_PointLight__set_matrix_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_PointLight__set_sortParticles_p1(this.ptr, arg0);
}

PointLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_PointLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

PointLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_PointLight__set_visible_p1(this.ptr, arg0);
}

PointLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

PointLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_PointLight__set_id_p1(this.ptr, arg0);
}

PointLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

PointLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_PointLight__get_renderDepth_p0(this.ptr);
}

PointLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_PointLight__set_up_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

PointLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_scale_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

PointLight.prototype['get_intensity'] = function() {
    return _emscripten_bind_PointLight__get_intensity_p0(this.ptr);
}

PointLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_PointLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

PointLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_PointLight__set_parent_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_PointLight__set_receiveShadow_p1(this.ptr, arg0);
}

PointLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_parent_p0(this.ptr), Module['Object3D']);
}

PointLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['get_id'] = function() {
    return _emscripten_bind_PointLight__get_id_p0(this.ptr);
}

function PointLight(arg0, arg1, arg2) {
    this.ptr = _emscripten_bind_PointLight__PointLight_p3(arg0, arg1, arg2);
  PointLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = PointLight;
}
PointLight.prototype.__cache__ = {};
Module['PointLight'] = PointLight;

PointLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_PointLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_PointLight__updateMatrixWorld_p1(this.ptr, arg0);
}

PointLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_PointLight__set_rotation_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_intensity'] = function(arg0) {
    _emscripten_bind_PointLight__set_intensity_p1(this.ptr, arg0);
}

PointLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_PointLight__set_material_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_PointLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_PointLight__get_sortParticles_p0(this.ptr);
}

PointLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_PointLight__get___webglInit_p0(this.ptr);
}

PointLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

PointLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_color_p0(this.ptr), Module['Color']);
}

PointLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_PointLight__get_castShadow_p0(this.ptr);
}

PointLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_PointLight__get_rotationAutoUpdate_p0(this.ptr);
}

PointLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_PointLight__set_position_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_PointLight__set_velocity_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_PointLight__get___webglActive_p0(this.ptr);
}

PointLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_PointLight__updateMatrix_p0(this.ptr);
}

PointLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_PointLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_PointLight__get_frustumCulled_p0(this.ptr);
}

PointLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_PointLight__set_frustumCulled_p1(this.ptr, arg0);
}

PointLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__get_position_p0(this.ptr), Module['Vector3']);
}

PointLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_PointLight__set___webglInit_p1(this.ptr, arg0);
}

PointLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_PointLight__clone_p0(this.ptr), Module['Object3D']);
}

PointLight.prototype['get_visible'] = function() {
    return _emscripten_bind_PointLight__get_visible_p0(this.ptr);
}

PointLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_PointLight__set_useQuaternion_p1(this.ptr, arg0);
}

PointLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_PointLight__get_matrixAutoUpdate_p0(this.ptr);
}

PointLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PointLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

PointLight.prototype['__destroy__'] = function() {
    _emscripten_bind_PointLight____destroy___p0(this.ptr);
}

PointLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_PointLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

PointLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_PointLight____addObject_p1(this.ptr, arg0.ptr);
}

PointLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_PointLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_DirectionalLight__instanceOf_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_material_p0(this.ptr), Module['Material']);
}

DirectionalLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_scale_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_DirectionalLight__get_receiveShadow_p0(this.ptr);
}

DirectionalLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_renderDepth_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

DirectionalLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

DirectionalLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_castShadow_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_target_p0(this.ptr), Module['Object3D']);
}

DirectionalLight.prototype['add'] = function(arg0) {
    _emscripten_bind_DirectionalLight__add_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

DirectionalLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

DirectionalLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

DirectionalLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

DirectionalLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_DirectionalLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

DirectionalLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_DirectionalLight__get_renderDepth_p0(this.ptr);
}

DirectionalLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_up_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

DirectionalLight.prototype['get_name'] = function() {
    return _emscripten_bind_DirectionalLight__get_name_p0(this.ptr);
}

DirectionalLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_geometry_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_color_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_DirectionalLight____removeObject_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_DirectionalLight__traverse_p1(this.ptr, arg0);
}

DirectionalLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_DirectionalLight__get_useQuaternion_p0(this.ptr);
}

DirectionalLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_DirectionalLight__lookAt_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_DirectionalLight__remove_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_orientation_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set___webglActive_p1(this.ptr, arg0);
}

DirectionalLight.prototype['hasParent'] = function() {
    return _emscripten_bind_DirectionalLight__hasParent_p0(this.ptr);
}

DirectionalLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_target_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_matrix_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_sortParticles_p1(this.ptr, arg0);
}

DirectionalLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

DirectionalLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_visible_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

DirectionalLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_id_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

DirectionalLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

DirectionalLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_up_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

DirectionalLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_scale_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

DirectionalLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_DirectionalLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

DirectionalLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_parent_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_receiveShadow_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_parent_p0(this.ptr), Module['Object3D']);
}

DirectionalLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['get_id'] = function() {
    return _emscripten_bind_DirectionalLight__get_id_p0(this.ptr);
}

DirectionalLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_DirectionalLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_DirectionalLight__updateMatrixWorld_p1(this.ptr, arg0);
}

DirectionalLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_rotation_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_material_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_DirectionalLight__get_sortParticles_p0(this.ptr);
}

DirectionalLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_DirectionalLight__get___webglInit_p0(this.ptr);
}

DirectionalLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

DirectionalLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_color_p0(this.ptr), Module['Color']);
}

DirectionalLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_DirectionalLight__get_castShadow_p0(this.ptr);
}

DirectionalLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_DirectionalLight__get_rotationAutoUpdate_p0(this.ptr);
}

DirectionalLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_position_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_velocity_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_DirectionalLight__get___webglActive_p0(this.ptr);
}

DirectionalLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_DirectionalLight__updateMatrix_p0(this.ptr);
}

DirectionalLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_DirectionalLight__get_frustumCulled_p0(this.ptr);
}

DirectionalLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_frustumCulled_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__get_position_p0(this.ptr), Module['Vector3']);
}

DirectionalLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set___webglInit_p1(this.ptr, arg0);
}

DirectionalLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_DirectionalLight__clone_p0(this.ptr), Module['Object3D']);
}

DirectionalLight.prototype['get_visible'] = function() {
    return _emscripten_bind_DirectionalLight__get_visible_p0(this.ptr);
}

DirectionalLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_useQuaternion_p1(this.ptr, arg0);
}

DirectionalLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_DirectionalLight__get_matrixAutoUpdate_p0(this.ptr);
}

function DirectionalLight(arg0) {
    this.ptr = _emscripten_bind_DirectionalLight__DirectionalLight_p1(arg0);
  DirectionalLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = DirectionalLight;
}
DirectionalLight.prototype.__cache__ = {};
Module['DirectionalLight'] = DirectionalLight;

DirectionalLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_DirectionalLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

DirectionalLight.prototype['__destroy__'] = function() {
    _emscripten_bind_DirectionalLight____destroy___p0(this.ptr);
}

DirectionalLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_DirectionalLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

DirectionalLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_DirectionalLight____addObject_p1(this.ptr, arg0.ptr);
}

DirectionalLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_DirectionalLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
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

MeshNormalMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshNormalMaterial__instanceOf_p1(this.ptr, arg0);
}

MeshNormalMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshNormalMaterial____destroy___p0(this.ptr);
}

function MeshNormalMaterial() {
    this.ptr = _emscripten_bind_MeshNormalMaterial__MeshNormalMaterial_p0();
  MeshNormalMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshNormalMaterial;
}
MeshNormalMaterial.prototype.__cache__ = {};
Module['MeshNormalMaterial'] = MeshNormalMaterial;

Line.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Line__instanceOf_p1(this.ptr, arg0);
}

Line.prototype['__destroy__'] = function() {
    _emscripten_bind_Line____destroy___p0(this.ptr);
}

function Line() {
    this.ptr = _emscripten_bind_Line__Line_p0();
  Line.prototype.__cache__[this.ptr] = this;
  this.__class__ = Line;
}
Line.prototype.__cache__ = {};
Module['Line'] = Line;

Bone.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Bone__instanceOf_p1(this.ptr, arg0);
}

Bone.prototype['__destroy__'] = function() {
    _emscripten_bind_Bone____destroy___p0(this.ptr);
}

function Bone() {
    this.ptr = _emscripten_bind_Bone__Bone_p0();
  Bone.prototype.__cache__[this.ptr] = this;
  this.__class__ = Bone;
}
Bone.prototype.__cache__ = {};
Module['Bone'] = Bone;

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

Raycaster.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Raycaster__instanceOf_p1(this.ptr, arg0);
}

function Raycaster() {
    this.ptr = _emscripten_bind_Raycaster__Raycaster_p0();
  Raycaster.prototype.__cache__[this.ptr] = this;
  this.__class__ = Raycaster;
}
Raycaster.prototype.__cache__ = {};
Module['Raycaster'] = Raycaster;

Raycaster.prototype['__destroy__'] = function() {
    _emscripten_bind_Raycaster____destroy___p0(this.ptr);
}

PerspectiveCamera.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_PerspectiveCamera__instanceOf_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_material_p0(this.ptr), Module['Material']);
}

PerspectiveCamera.prototype['set_fov'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_fov_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['setViewOffset'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    _emscripten_bind_PerspectiveCamera__setViewOffset_p6(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5);
}

PerspectiveCamera.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_scale_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_receiveShadow_p0(this.ptr);
}

PerspectiveCamera.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_renderDepth_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_orientation_p0(this.ptr), Module['Quaternion']);
}

PerspectiveCamera.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_castShadow_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_target_p0(this.ptr), Module['Object3D']);
}

PerspectiveCamera.prototype['add'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__add_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['setLens'] = function(arg0, arg1) {
    _emscripten_bind_PerspectiveCamera__setLens_p2(this.ptr, arg0, arg1);
}

PerspectiveCamera.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_rotation_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_projectionMatrix'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_projectionMatrix_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

PerspectiveCamera.prototype['set_far'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_far_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

PerspectiveCamera.prototype['set_aspect'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_aspect_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

PerspectiveCamera.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_up_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_matrix_p0(this.ptr), Module['Matrix4']);
}

function PerspectiveCamera(arg0, arg1, arg2, arg3) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_PerspectiveCamera__PerspectiveCamera_p0();
  else   if (arg1 === undefined)
    this.ptr = _emscripten_bind_PerspectiveCamera__PerspectiveCamera_p1(arg0);
  else   if (arg2 === undefined)
    this.ptr = _emscripten_bind_PerspectiveCamera__PerspectiveCamera_p2(arg0, arg1);
  else   if (arg3 === undefined)
    this.ptr = _emscripten_bind_PerspectiveCamera__PerspectiveCamera_p3(arg0, arg1, arg2);
  else 
    this.ptr = _emscripten_bind_PerspectiveCamera__PerspectiveCamera_p4(arg0, arg1, arg2, arg3);
  PerspectiveCamera.prototype.__cache__[this.ptr] = this;
  this.__class__ = PerspectiveCamera;
}
PerspectiveCamera.prototype.__cache__ = {};
Module['PerspectiveCamera'] = PerspectiveCamera;

PerspectiveCamera.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_name'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_name_p0(this.ptr);
}

PerspectiveCamera.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_geometry_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_forceAccum_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera____removeObject_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['traverse'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__traverse_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_acceleration_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_useQuaternion_p0(this.ptr);
}

PerspectiveCamera.prototype['get_aspect'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_aspect_p0(this.ptr);
}

PerspectiveCamera.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__lookAt_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['remove'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__remove_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_orientation_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set___webglActive_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['hasParent'] = function() {
    return _emscripten_bind_PerspectiveCamera__hasParent_p0(this.ptr);
}

PerspectiveCamera.prototype['get_fov'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_fov_p0(this.ptr);
}

PerspectiveCamera.prototype['set_target'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_target_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_projectionMatrixInverse'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_projectionMatrixInverse_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_sortParticles_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_projectionMatrix'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_projectionMatrix_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_height'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_height_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_near'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_near_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrix_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_fullWidth'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_fullWidth_p0(this.ptr);
}

PerspectiveCamera.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_visible_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

PerspectiveCamera.prototype['get_width'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_width_p0(this.ptr);
}

PerspectiveCamera.prototype['set_id'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_id_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_far'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_far_p0(this.ptr);
}

PerspectiveCamera.prototype['get_x'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_x_p0(this.ptr);
}

PerspectiveCamera.prototype['get_y'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_y_p0(this.ptr);
}

PerspectiveCamera.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_renderDepth_p0(this.ptr);
}

PerspectiveCamera.prototype['set_up'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_up_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_velocity_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['set_fullWidth'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_fullWidth_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_x'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_x_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_y'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_y_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_scale_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_projectionMatrixInverse'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_projectionMatrixInverse_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_geometry_p0(this.ptr), Module['Geometry']);
}

PerspectiveCamera.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

PerspectiveCamera.prototype['get___webglInit'] = function() {
    return _emscripten_bind_PerspectiveCamera__get___webglInit_p0(this.ptr);
}

PerspectiveCamera.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_receiveShadow_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_parent_p0(this.ptr), Module['Object3D']);
}

PerspectiveCamera.prototype['set_matrixWorldInverse'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_matrixWorldInverse_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_id'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_id_p0(this.ptr);
}

PerspectiveCamera.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_PerspectiveCamera__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_PerspectiveCamera__updateMatrixWorld_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_rotation_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_material'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_material_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_sortParticles_p0(this.ptr);
}

PerspectiveCamera.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_parent_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

PerspectiveCamera.prototype['get_near'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_near_p0(this.ptr);
}

PerspectiveCamera.prototype['get_castShadow'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_castShadow_p0(this.ptr);
}

PerspectiveCamera.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_rotationAutoUpdate_p0(this.ptr);
}

PerspectiveCamera.prototype['set_position'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_position_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_matrixWorldInverse'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_matrixWorldInverse_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

PerspectiveCamera.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_velocity_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_acceleration_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['get_height'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_height_p0(this.ptr);
}

PerspectiveCamera.prototype['get___webglActive'] = function() {
    return _emscripten_bind_PerspectiveCamera__get___webglActive_p0(this.ptr);
}

PerspectiveCamera.prototype['updateMatrix'] = function() {
    _emscripten_bind_PerspectiveCamera__updateMatrix_p0(this.ptr);
}

PerspectiveCamera.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

PerspectiveCamera.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_frustumCulled_p0(this.ptr);
}

PerspectiveCamera.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_frustumCulled_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_position_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set___webglInit_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__clone_p0(this.ptr), Module['Object3D']);
}

PerspectiveCamera.prototype['get_visible'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_visible_p0(this.ptr);
}

PerspectiveCamera.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_useQuaternion_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_matrixAutoUpdate_p0(this.ptr);
}

PerspectiveCamera.prototype['get_fullHeight'] = function() {
    return _emscripten_bind_PerspectiveCamera__get_fullHeight_p0(this.ptr);
}

PerspectiveCamera.prototype['updateProjectionMatrix'] = function() {
    _emscripten_bind_PerspectiveCamera__updateProjectionMatrix_p0(this.ptr);
}

PerspectiveCamera.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_PerspectiveCamera__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

PerspectiveCamera.prototype['__destroy__'] = function() {
    _emscripten_bind_PerspectiveCamera____destroy___p0(this.ptr);
}

PerspectiveCamera.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_PerspectiveCamera__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

PerspectiveCamera.prototype['set_width'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_width_p1(this.ptr, arg0);
}

PerspectiveCamera.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera____addObject_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

PerspectiveCamera.prototype['set_fullHeight'] = function(arg0) {
    _emscripten_bind_PerspectiveCamera__set_fullHeight_p1(this.ptr, arg0);
}

CompressedTexture.prototype['__destroy__'] = function() {
    _emscripten_bind_CompressedTexture____destroy___p0(this.ptr);
}

function CompressedTexture() {
    this.ptr = _emscripten_bind_CompressedTexture__CompressedTexture_p0();
  CompressedTexture.prototype.__cache__[this.ptr] = this;
  this.__class__ = CompressedTexture;
}
CompressedTexture.prototype.__cache__ = {};
Module['CompressedTexture'] = CompressedTexture;

LOD.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_LOD__instanceOf_p1(this.ptr, arg0);
}

LOD.prototype['__destroy__'] = function() {
    _emscripten_bind_LOD____destroy___p0(this.ptr);
}

function LOD() {
    this.ptr = _emscripten_bind_LOD__LOD_p0();
  LOD.prototype.__cache__[this.ptr] = this;
  this.__class__ = LOD;
}
LOD.prototype.__cache__ = {};
Module['LOD'] = LOD;

CanvasRenderer.prototype['__destroy__'] = function() {
    _emscripten_bind_CanvasRenderer____destroy___p0(this.ptr);
}

function CanvasRenderer() {
    this.ptr = _emscripten_bind_CanvasRenderer__CanvasRenderer_p0();
  CanvasRenderer.prototype.__cache__[this.ptr] = this;
  this.__class__ = CanvasRenderer;
}
CanvasRenderer.prototype.__cache__ = {};
Module['CanvasRenderer'] = CanvasRenderer;

CubeGeometry.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_CubeGeometry__instanceOf_p1(this.ptr, arg0);
}

CubeGeometry.prototype['computeTangents'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeTangents_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['set_uvsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_uvsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglUVBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglUVBuffer_p0(this.ptr);
}

CubeGeometry.prototype['get_heightSegments'] = function() {
    return _emscripten_bind_CubeGeometry__get_heightSegments_p0(this.ptr);
}

CubeGeometry.prototype['set_tangentsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_tangentsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_lineDistancesNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_lineDistancesNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['get_id'] = function() {
    return _emscripten_bind_CubeGeometry__get_id_p0(this.ptr);
}

CubeGeometry.prototype['get___webglColorBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglColorBuffer_p0(this.ptr);
}

CubeGeometry.prototype['computeMorphNormals'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeMorphNormals_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['set_depth'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_depth_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglVertexBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglVertexBuffer_p0(this.ptr);
}

CubeGeometry.prototype['mergeVertices'] = function() {
    return _emscripten_bind_CubeGeometry__mergeVertices_p0(this.ptr);
}

CubeGeometry.prototype['get_tangentsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_tangentsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['get_buffersNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_buffersNeedUpdate_p0(this.ptr);
}

function CubeGeometry(arg0, arg1, arg2) {
    this.ptr = _emscripten_bind_CubeGeometry__CubeGeometry_p3(arg0, arg1, arg2);
  CubeGeometry.prototype.__cache__[this.ptr] = this;
  this.__class__ = CubeGeometry;
}
CubeGeometry.prototype.__cache__ = {};
Module['CubeGeometry'] = CubeGeometry;

CubeGeometry.prototype['set_normalsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_normalsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_widthSegments'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_widthSegments_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglUV2Buffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglUV2Buffer_p0(this.ptr);
}

CubeGeometry.prototype['set_heightSegments'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_heightSegments_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_morphTargetsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_morphTargetsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['set___webglLineDistanceBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglLineDistanceBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglTangentBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglTangentBuffer_p0(this.ptr);
}

CubeGeometry.prototype['set___webglNormalBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglNormalBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_buffersNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_buffersNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_uvsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_uvsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['set___webglColorBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglColorBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_elementsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_elementsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['computeLineDistances'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeLineDistances_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['buildPlane'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    _emscripten_bind_CubeGeometry__buildPlane_p8(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
}

CubeGeometry.prototype['get_hasTangents'] = function() {
    return _emscripten_bind_CubeGeometry__get_hasTangents_p0(this.ptr);
}

CubeGeometry.prototype['get_boundingSphere'] = function() {
    return _emscripten_bind_CubeGeometry__get_boundingSphere_p0(this.ptr);
}

CubeGeometry.prototype['set___webglUV2Buffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglUV2Buffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_height'] = function() {
    return _emscripten_bind_CubeGeometry__get_height_p0(this.ptr);
}

CubeGeometry.prototype['set___webglUVBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglUVBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['computeCentroids'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeCentroids_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['computeVertexNormals'] = function(arg0) {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeVertexNormals_p1(this.ptr, arg0), Module['Geometry']);
}

CubeGeometry.prototype['set_boundingBox'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_boundingBox_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_hasTangents'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_hasTangents_p1(this.ptr, arg0);
}

CubeGeometry.prototype['computeBoundingSphere'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeBoundingSphere_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['set___webglSkinIndicesBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglSkinIndicesBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglInit'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglInit_p0(this.ptr);
}

CubeGeometry.prototype['set_lineDistancesNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_lineDistancesNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_morphTargetsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_morphTargetsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_height'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_height_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_depthSegments'] = function() {
    return _emscripten_bind_CubeGeometry__get_depthSegments_p0(this.ptr);
}

CubeGeometry.prototype['get___webglNormalBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglNormalBuffer_p0(this.ptr);
}

CubeGeometry.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglInit_p1(this.ptr, arg0);
}

CubeGeometry.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__clone_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['get___webglFaceBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglFaceBuffer_p0(this.ptr);
}

CubeGeometry.prototype['get_dynamic'] = function() {
    return _emscripten_bind_CubeGeometry__get_dynamic_p0(this.ptr);
}

CubeGeometry.prototype['set___webglVertexBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglVertexBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_colorsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_colorsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['computeFaceNormals'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeFaceNormals_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['get_normalsNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_normalsNeedUpdate_p0(this.ptr);
}

CubeGeometry.prototype['get___webglLineBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglLineBuffer_p0(this.ptr);
}

CubeGeometry.prototype['set___webglLineBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglLineBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglSkinIndicesBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglSkinIndicesBuffer_p0(this.ptr);
}

CubeGeometry.prototype['set_colorsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_colorsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set___webglTangentBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglTangentBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_elementsNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_elementsNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['__destroy__'] = function() {
    _emscripten_bind_CubeGeometry____destroy___p0(this.ptr);
}

CubeGeometry.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_CubeGeometry__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

CubeGeometry.prototype['set_verticesNeedUpdate'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_verticesNeedUpdate_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_width'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_width_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_boundingBox'] = function() {
    return _emscripten_bind_CubeGeometry__get_boundingBox_p0(this.ptr);
}

CubeGeometry.prototype['computeBoundingBox'] = function() {
    return wrapPointer(_emscripten_bind_CubeGeometry__computeBoundingBox_p0(this.ptr), Module['Geometry']);
}

CubeGeometry.prototype['set_boundingSphere'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_boundingSphere_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get___webglLineDistanceBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglLineDistanceBuffer_p0(this.ptr);
}

CubeGeometry.prototype['set___webglFaceBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglFaceBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_name'] = function() {
    return _emscripten_bind_CubeGeometry__get_name_p0(this.ptr);
}

CubeGeometry.prototype['set___webglSkinWeightsBuffer'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set___webglSkinWeightsBuffer_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_depthSegments'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_depthSegments_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_depth'] = function() {
    return _emscripten_bind_CubeGeometry__get_depth_p0(this.ptr);
}

CubeGeometry.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_CubeGeometry__applyMatrix_p1(this.ptr, arg0.ptr), Module['Geometry']);
}

CubeGeometry.prototype['set_id'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_id_p1(this.ptr, arg0);
}

CubeGeometry.prototype['set_dynamic'] = function(arg0) {
    _emscripten_bind_CubeGeometry__set_dynamic_p1(this.ptr, arg0);
}

CubeGeometry.prototype['get_width'] = function() {
    return _emscripten_bind_CubeGeometry__get_width_p0(this.ptr);
}

CubeGeometry.prototype['get___webglSkinWeightsBuffer'] = function() {
    return _emscripten_bind_CubeGeometry__get___webglSkinWeightsBuffer_p0(this.ptr);
}

CubeGeometry.prototype['get_widthSegments'] = function() {
    return _emscripten_bind_CubeGeometry__get_widthSegments_p0(this.ptr);
}

CubeGeometry.prototype['get_verticesNeedUpdate'] = function() {
    return _emscripten_bind_CubeGeometry__get_verticesNeedUpdate_p0(this.ptr);
}

Face4.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Face4__instanceOf_p1(this.ptr, arg0);
}

Face4.prototype['get_materialIndex'] = function() {
    return _emscripten_bind_Face4__get_materialIndex_p0(this.ptr);
}

Face4.prototype['set_centroid'] = function(arg0) {
    _emscripten_bind_Face4__set_centroid_p1(this.ptr, arg0.ptr);
}

Face4.prototype['set_normal'] = function(arg0) {
    _emscripten_bind_Face4__set_normal_p1(this.ptr, arg0.ptr);
}

Face4.prototype['get_centroid'] = function() {
    return wrapPointer(_emscripten_bind_Face4__get_centroid_p0(this.ptr), Module['Vector3']);
}

Face4.prototype['get_normal'] = function() {
    return wrapPointer(_emscripten_bind_Face4__get_normal_p0(this.ptr), Module['Vector3']);
}

Face4.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Face4__clone_p0(this.ptr), Module['Face4']);
}

Face4.prototype['set_materialIndex'] = function(arg0) {
    _emscripten_bind_Face4__set_materialIndex_p1(this.ptr, arg0);
}

Face4.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_Face4__get_color_p0(this.ptr), Module['Color']);
}

function Face4(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Face4__Face4_p0();
  else   if (arg4 === undefined)
    this.ptr = _emscripten_bind_Face4__Face4_p4(arg0, arg1, arg2, arg3);
  else 
    this.ptr = _emscripten_bind_Face4__Face4_p7(arg0, arg1, arg2, arg3, arg4.ptr, arg5.ptr, arg6);
  Face4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Face4;
}
Face4.prototype.__cache__ = {};
Module['Face4'] = Face4;

Face4.prototype['__destroy__'] = function() {
    _emscripten_bind_Face4____destroy___p0(this.ptr);
}

Face4.prototype['set_color'] = function(arg0) {
    _emscripten_bind_Face4__set_color_p1(this.ptr, arg0.ptr);
}

Face4.prototype['get_d'] = function() {
    return _emscripten_bind_Face4__get_d_p0(this.ptr);
}

Face4.prototype['set_a'] = function(arg0) {
    _emscripten_bind_Face4__set_a_p1(this.ptr, arg0);
}

Face4.prototype['set_b'] = function(arg0) {
    _emscripten_bind_Face4__set_b_p1(this.ptr, arg0);
}

Face4.prototype['set_c'] = function(arg0) {
    _emscripten_bind_Face4__set_c_p1(this.ptr, arg0);
}

Face4.prototype['set_d'] = function(arg0) {
    _emscripten_bind_Face4__set_d_p1(this.ptr, arg0);
}

Face4.prototype['get_a'] = function() {
    return _emscripten_bind_Face4__get_a_p0(this.ptr);
}

Face4.prototype['get_b'] = function() {
    return _emscripten_bind_Face4__get_b_p0(this.ptr);
}

Face4.prototype['get_c'] = function() {
    return _emscripten_bind_Face4__get_c_p0(this.ptr);
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

WebGLRenderTargetCube.prototype['__destroy__'] = function() {
    _emscripten_bind_WebGLRenderTargetCube____destroy___p0(this.ptr);
}

function WebGLRenderTargetCube() {
    this.ptr = _emscripten_bind_WebGLRenderTargetCube__WebGLRenderTargetCube_p0();
  WebGLRenderTargetCube.prototype.__cache__[this.ptr] = this;
  this.__class__ = WebGLRenderTargetCube;
}
WebGLRenderTargetCube.prototype.__cache__ = {};
Module['WebGLRenderTargetCube'] = WebGLRenderTargetCube;

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

AmbientLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_AmbientLight__instanceOf_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_material_p0(this.ptr), Module['Material']);
}

AmbientLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_scale_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_AmbientLight__get_receiveShadow_p0(this.ptr);
}

AmbientLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_renderDepth_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

AmbientLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

AmbientLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_castShadow_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_target_p0(this.ptr), Module['Object3D']);
}

AmbientLight.prototype['add'] = function(arg0) {
    _emscripten_bind_AmbientLight__add_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

AmbientLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

AmbientLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

AmbientLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

AmbientLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_AmbientLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

AmbientLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_AmbientLight__get_renderDepth_p0(this.ptr);
}

AmbientLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_up_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

AmbientLight.prototype['get_name'] = function() {
    return _emscripten_bind_AmbientLight__get_name_p0(this.ptr);
}

AmbientLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_geometry_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_color_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_AmbientLight____removeObject_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_AmbientLight__traverse_p1(this.ptr, arg0);
}

AmbientLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_AmbientLight__get_useQuaternion_p0(this.ptr);
}

AmbientLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_AmbientLight__lookAt_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_AmbientLight__remove_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_orientation_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_AmbientLight__set___webglActive_p1(this.ptr, arg0);
}

AmbientLight.prototype['hasParent'] = function() {
    return _emscripten_bind_AmbientLight__hasParent_p0(this.ptr);
}

AmbientLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_target_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_matrix_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_sortParticles_p1(this.ptr, arg0);
}

AmbientLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

AmbientLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_visible_p1(this.ptr, arg0);
}

AmbientLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

AmbientLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_id_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

AmbientLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

AmbientLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_up_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

AmbientLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_scale_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

AmbientLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_AmbientLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

AmbientLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_parent_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_receiveShadow_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_parent_p0(this.ptr), Module['Object3D']);
}

AmbientLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['get_id'] = function() {
    return _emscripten_bind_AmbientLight__get_id_p0(this.ptr);
}

AmbientLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_AmbientLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_AmbientLight__updateMatrixWorld_p1(this.ptr, arg0);
}

AmbientLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_rotation_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_material_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_AmbientLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_AmbientLight__get_sortParticles_p0(this.ptr);
}

AmbientLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_AmbientLight__get___webglInit_p0(this.ptr);
}

AmbientLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

AmbientLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_color_p0(this.ptr), Module['Color']);
}

AmbientLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_AmbientLight__get_castShadow_p0(this.ptr);
}

AmbientLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_AmbientLight__get_rotationAutoUpdate_p0(this.ptr);
}

AmbientLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_position_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_velocity_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_AmbientLight__get___webglActive_p0(this.ptr);
}

AmbientLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_AmbientLight__updateMatrix_p0(this.ptr);
}

AmbientLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_AmbientLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_AmbientLight__get_frustumCulled_p0(this.ptr);
}

AmbientLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_frustumCulled_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__get_position_p0(this.ptr), Module['Vector3']);
}

AmbientLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_AmbientLight__set___webglInit_p1(this.ptr, arg0);
}

AmbientLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_AmbientLight__clone_p0(this.ptr), Module['Object3D']);
}

AmbientLight.prototype['get_visible'] = function() {
    return _emscripten_bind_AmbientLight__get_visible_p0(this.ptr);
}

AmbientLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_useQuaternion_p1(this.ptr, arg0);
}

AmbientLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_AmbientLight__get_matrixAutoUpdate_p0(this.ptr);
}

AmbientLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AmbientLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

AmbientLight.prototype['__destroy__'] = function() {
    _emscripten_bind_AmbientLight____destroy___p0(this.ptr);
}

AmbientLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_AmbientLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

AmbientLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_AmbientLight____addObject_p1(this.ptr, arg0.ptr);
}

AmbientLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_AmbientLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

function AmbientLight(arg0) {
    this.ptr = _emscripten_bind_AmbientLight__AmbientLight_p1(arg0);
  AmbientLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = AmbientLight;
}
AmbientLight.prototype.__cache__ = {};
Module['AmbientLight'] = AmbientLight;

function Color() {
    this.ptr = _emscripten_bind_Color__Color_p0();
  Color.prototype.__cache__[this.ptr] = this;
  this.__class__ = Color;
}
Color.prototype.__cache__ = {};
Module['Color'] = Color;

Color.prototype['__destroy__'] = function() {
    _emscripten_bind_Color____destroy___p0(this.ptr);
}

SpriteMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_SpriteMaterial__instanceOf_p1(this.ptr, arg0);
}

SpriteMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_SpriteMaterial____destroy___p0(this.ptr);
}

function SpriteMaterial() {
    this.ptr = _emscripten_bind_SpriteMaterial__SpriteMaterial_p0();
  SpriteMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = SpriteMaterial;
}
SpriteMaterial.prototype.__cache__ = {};
Module['SpriteMaterial'] = SpriteMaterial;

MeshDepthMaterial.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_MeshDepthMaterial__instanceOf_p1(this.ptr, arg0);
}

MeshDepthMaterial.prototype['__destroy__'] = function() {
    _emscripten_bind_MeshDepthMaterial____destroy___p0(this.ptr);
}

function MeshDepthMaterial() {
    this.ptr = _emscripten_bind_MeshDepthMaterial__MeshDepthMaterial_p0();
  MeshDepthMaterial.prototype.__cache__[this.ptr] = this;
  this.__class__ = MeshDepthMaterial;
}
MeshDepthMaterial.prototype.__cache__ = {};
Module['MeshDepthMaterial'] = MeshDepthMaterial;

Ribbon.prototype['__destroy__'] = function() {
    _emscripten_bind_Ribbon____destroy___p0(this.ptr);
}

function Ribbon() {
    this.ptr = _emscripten_bind_Ribbon__Ribbon_p0();
  Ribbon.prototype.__cache__[this.ptr] = this;
  this.__class__ = Ribbon;
}
Ribbon.prototype.__cache__ = {};
Module['Ribbon'] = Ribbon;

AreaLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_AreaLight__instanceOf_p1(this.ptr, arg0);
}

AreaLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_material_p0(this.ptr), Module['Material']);
}

AreaLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_AreaLight__set_scale_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_AreaLight__get_receiveShadow_p0(this.ptr);
}

AreaLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_AreaLight__set_renderDepth_p1(this.ptr, arg0);
}

AreaLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

AreaLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_AreaLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_AreaLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

AreaLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

AreaLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_AreaLight__set_castShadow_p1(this.ptr, arg0);
}

AreaLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_target_p0(this.ptr), Module['Object3D']);
}

AreaLight.prototype['add'] = function(arg0) {
    _emscripten_bind_AreaLight__add_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

AreaLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

AreaLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

AreaLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

AreaLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_AreaLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

AreaLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_AreaLight__get_renderDepth_p0(this.ptr);
}

AreaLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_up_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

AreaLight.prototype['get_name'] = function() {
    return _emscripten_bind_AreaLight__get_name_p0(this.ptr);
}

AreaLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_AreaLight__set_geometry_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_AreaLight__set_color_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_AreaLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_AreaLight____removeObject_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_AreaLight__traverse_p1(this.ptr, arg0);
}

AreaLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_AreaLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_AreaLight__get_useQuaternion_p0(this.ptr);
}

AreaLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_AreaLight__lookAt_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_AreaLight__remove_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_AreaLight__set_orientation_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_AreaLight__set___webglActive_p1(this.ptr, arg0);
}

AreaLight.prototype['hasParent'] = function() {
    return _emscripten_bind_AreaLight__hasParent_p0(this.ptr);
}

AreaLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_AreaLight__set_target_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_AreaLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_AreaLight__set_matrix_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_AreaLight__set_sortParticles_p1(this.ptr, arg0);
}

AreaLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_AreaLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

AreaLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_AreaLight__set_visible_p1(this.ptr, arg0);
}

AreaLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

AreaLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_AreaLight__set_id_p1(this.ptr, arg0);
}

AreaLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

AreaLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_AreaLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

AreaLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_AreaLight__set_up_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

AreaLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_scale_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

AreaLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_AreaLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

AreaLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_AreaLight__set_parent_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_AreaLight__set_receiveShadow_p1(this.ptr, arg0);
}

AreaLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_parent_p0(this.ptr), Module['Object3D']);
}

AreaLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['get_id'] = function() {
    return _emscripten_bind_AreaLight__get_id_p0(this.ptr);
}

AreaLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_AreaLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_AreaLight__updateMatrixWorld_p1(this.ptr, arg0);
}

AreaLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_AreaLight__set_rotation_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_AreaLight__set_material_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_AreaLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_AreaLight__get_sortParticles_p0(this.ptr);
}

AreaLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_AreaLight__get___webglInit_p0(this.ptr);
}

AreaLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

AreaLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_color_p0(this.ptr), Module['Color']);
}

AreaLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_AreaLight__get_castShadow_p0(this.ptr);
}

AreaLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_AreaLight__get_rotationAutoUpdate_p0(this.ptr);
}

AreaLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_AreaLight__set_position_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_AreaLight__set_velocity_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_AreaLight__get___webglActive_p0(this.ptr);
}

AreaLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_AreaLight__updateMatrix_p0(this.ptr);
}

AreaLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_AreaLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_AreaLight__get_frustumCulled_p0(this.ptr);
}

AreaLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_AreaLight__set_frustumCulled_p1(this.ptr, arg0);
}

AreaLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__get_position_p0(this.ptr), Module['Vector3']);
}

AreaLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_AreaLight__set___webglInit_p1(this.ptr, arg0);
}

AreaLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_AreaLight__clone_p0(this.ptr), Module['Object3D']);
}

AreaLight.prototype['get_visible'] = function() {
    return _emscripten_bind_AreaLight__get_visible_p0(this.ptr);
}

AreaLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_AreaLight__set_useQuaternion_p1(this.ptr, arg0);
}

AreaLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_AreaLight__get_matrixAutoUpdate_p0(this.ptr);
}

AreaLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_AreaLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

AreaLight.prototype['__destroy__'] = function() {
    _emscripten_bind_AreaLight____destroy___p0(this.ptr);
}

AreaLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_AreaLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

AreaLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_AreaLight____addObject_p1(this.ptr, arg0.ptr);
}

AreaLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_AreaLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
}

function AreaLight(arg0) {
    this.ptr = _emscripten_bind_AreaLight__AreaLight_p1(arg0);
  AreaLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = AreaLight;
}
AreaLight.prototype.__cache__ = {};
Module['AreaLight'] = AreaLight;

function WebGLRenderTarget() {
    this.ptr = _emscripten_bind_WebGLRenderTarget__WebGLRenderTarget_p0();
  WebGLRenderTarget.prototype.__cache__[this.ptr] = this;
  this.__class__ = WebGLRenderTarget;
}
WebGLRenderTarget.prototype.__cache__ = {};
Module['WebGLRenderTarget'] = WebGLRenderTarget;

WebGLRenderTarget.prototype['__destroy__'] = function() {
    _emscripten_bind_WebGLRenderTarget____destroy___p0(this.ptr);
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

SpotLight.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_SpotLight__instanceOf_p1(this.ptr, arg0);
}

SpotLight.prototype['get_material'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_material_p0(this.ptr), Module['Material']);
}

SpotLight.prototype['set_scale'] = function(arg0) {
    _emscripten_bind_SpotLight__set_scale_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_receiveShadow'] = function() {
    return _emscripten_bind_SpotLight__get_receiveShadow_p0(this.ptr);
}

SpotLight.prototype['set_renderDepth'] = function(arg0) {
    _emscripten_bind_SpotLight__set_renderDepth_p1(this.ptr, arg0);
}

SpotLight.prototype['get_matrixWorld'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_matrixWorld_p0(this.ptr), Module['Matrix4']);
}

SpotLight.prototype['set_matrixRotationWorld'] = function(arg0) {
    _emscripten_bind_SpotLight__set_matrixRotationWorld_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_matrixWorldNeedsUpdate'] = function(arg0) {
    _emscripten_bind_SpotLight__set_matrixWorldNeedsUpdate_p1(this.ptr, arg0);
}

SpotLight.prototype['get_orientation'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_orientation_p0(this.ptr), Module['Quaternion']);
}

SpotLight.prototype['set_castShadow'] = function(arg0) {
    _emscripten_bind_SpotLight__set_castShadow_p1(this.ptr, arg0);
}

SpotLight.prototype['get_target'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_target_p0(this.ptr), Module['Object3D']);
}

SpotLight.prototype['add'] = function(arg0) {
    _emscripten_bind_SpotLight__add_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_rotation'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_rotation_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['translateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__translateX_p1(this.ptr, arg0), Module['Object3D']);
}

SpotLight.prototype['translateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__translateY_p1(this.ptr, arg0), Module['Object3D']);
}

SpotLight.prototype['translateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__translateZ_p1(this.ptr, arg0), Module['Object3D']);
}

SpotLight.prototype['get__modelViewMatrix'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get__modelViewMatrix_p0(this.ptr), Module['Matrix4']);
}

SpotLight.prototype['get_matrixWorldNeedsUpdate'] = function() {
    return _emscripten_bind_SpotLight__get_matrixWorldNeedsUpdate_p0(this.ptr);
}

SpotLight.prototype['get_renderDepth'] = function() {
    return _emscripten_bind_SpotLight__get_renderDepth_p0(this.ptr);
}

SpotLight.prototype['get_up'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_up_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['get_matrix'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_matrix_p0(this.ptr), Module['Matrix4']);
}

SpotLight.prototype['get_name'] = function() {
    return _emscripten_bind_SpotLight__get_name_p0(this.ptr);
}

SpotLight.prototype['set_geometry'] = function(arg0) {
    _emscripten_bind_SpotLight__set_geometry_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_color'] = function(arg0) {
    _emscripten_bind_SpotLight__set_color_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_forceAccum'] = function(arg0) {
    _emscripten_bind_SpotLight__set_forceAccum_p1(this.ptr, arg0.ptr);
}

function SpotLight(arg0) {
    this.ptr = _emscripten_bind_SpotLight__SpotLight_p1(arg0);
  SpotLight.prototype.__cache__[this.ptr] = this;
  this.__class__ = SpotLight;
}
SpotLight.prototype.__cache__ = {};
Module['SpotLight'] = SpotLight;

SpotLight.prototype['traverse'] = function(arg0) {
    _emscripten_bind_SpotLight__traverse_p1(this.ptr, arg0);
}

SpotLight.prototype['set_acceleration'] = function(arg0) {
    _emscripten_bind_SpotLight__set_acceleration_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_useQuaternion'] = function() {
    return _emscripten_bind_SpotLight__get_useQuaternion_p0(this.ptr);
}

SpotLight.prototype['get_torqueAccum'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_torqueAccum_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['lookAt'] = function(arg0) {
    _emscripten_bind_SpotLight__lookAt_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['remove'] = function(arg0) {
    _emscripten_bind_SpotLight__remove_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_orientation'] = function(arg0) {
    _emscripten_bind_SpotLight__set_orientation_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set___webglActive'] = function(arg0) {
    _emscripten_bind_SpotLight__set___webglActive_p1(this.ptr, arg0);
}

SpotLight.prototype['hasParent'] = function() {
    return _emscripten_bind_SpotLight__hasParent_p0(this.ptr);
}

SpotLight.prototype['set_target'] = function(arg0) {
    _emscripten_bind_SpotLight__set_target_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_matrixWorld'] = function(arg0) {
    _emscripten_bind_SpotLight__set_matrixWorld_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_matrix'] = function(arg0) {
    _emscripten_bind_SpotLight__set_matrix_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_sortParticles'] = function(arg0) {
    _emscripten_bind_SpotLight__set_sortParticles_p1(this.ptr, arg0);
}

SpotLight.prototype['set_rotationAutoUpdate'] = function(arg0) {
    _emscripten_bind_SpotLight__set_rotationAutoUpdate_p1(this.ptr, arg0);
}

SpotLight.prototype['set_visible'] = function(arg0) {
    _emscripten_bind_SpotLight__set_visible_p1(this.ptr, arg0);
}

SpotLight.prototype['get__normalMatrix'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get__normalMatrix_p0(this.ptr), Module['Matrix3']);
}

SpotLight.prototype['__removeObject'] = function(arg0) {
    _emscripten_bind_SpotLight____removeObject_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_id'] = function(arg0) {
    _emscripten_bind_SpotLight__set_id_p1(this.ptr, arg0);
}

SpotLight.prototype['get_matrixRotationWorld'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_matrixRotationWorld_p0(this.ptr), Module['Matrix4']);
}

SpotLight.prototype['set_matrixAutoUpdate'] = function(arg0) {
    _emscripten_bind_SpotLight__set_matrixAutoUpdate_p1(this.ptr, arg0);
}

SpotLight.prototype['set_up'] = function(arg0) {
    _emscripten_bind_SpotLight__set_up_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_velocity'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_velocity_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['localToWorld'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__localToWorld_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

SpotLight.prototype['get_scale'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_scale_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['get_geometry'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_geometry_p0(this.ptr), Module['Geometry']);
}

SpotLight.prototype['translate'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_SpotLight__translate_p2(this.ptr, arg0, arg1.ptr), Module['Object3D']);
}

SpotLight.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_SpotLight__set_parent_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_receiveShadow'] = function(arg0) {
    _emscripten_bind_SpotLight__set_receiveShadow_p1(this.ptr, arg0);
}

SpotLight.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_parent_p0(this.ptr), Module['Object3D']);
}

SpotLight.prototype['get_forceAccum'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_forceAccum_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['get_id'] = function() {
    return _emscripten_bind_SpotLight__get_id_p0(this.ptr);
}

SpotLight.prototype['updateMatrixWorld'] = function(arg0) {
  if (arg0 === undefined)
    _emscripten_bind_SpotLight__updateMatrixWorld_p0(this.ptr);
  else 
    _emscripten_bind_SpotLight__updateMatrixWorld_p1(this.ptr, arg0);
}

SpotLight.prototype['set_rotation'] = function(arg0) {
    _emscripten_bind_SpotLight__set_rotation_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_material'] = function(arg0) {
    _emscripten_bind_SpotLight__set_material_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set__modelViewMatrix'] = function(arg0) {
    _emscripten_bind_SpotLight__set__modelViewMatrix_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_sortParticles'] = function() {
    return _emscripten_bind_SpotLight__get_sortParticles_p0(this.ptr);
}

SpotLight.prototype['get___webglInit'] = function() {
    return _emscripten_bind_SpotLight__get___webglInit_p0(this.ptr);
}

SpotLight.prototype['applyMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__applyMatrix_p1(this.ptr, arg0.ptr), Module['Object3D']);
}

SpotLight.prototype['get_color'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_color_p0(this.ptr), Module['Color']);
}

SpotLight.prototype['get_castShadow'] = function() {
    return _emscripten_bind_SpotLight__get_castShadow_p0(this.ptr);
}

SpotLight.prototype['get_rotationAutoUpdate'] = function() {
    return _emscripten_bind_SpotLight__get_rotationAutoUpdate_p0(this.ptr);
}

SpotLight.prototype['set_position'] = function(arg0) {
    _emscripten_bind_SpotLight__set_position_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_velocity'] = function(arg0) {
    _emscripten_bind_SpotLight__set_velocity_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_acceleration'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_acceleration_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['get___webglActive'] = function() {
    return _emscripten_bind_SpotLight__get___webglActive_p0(this.ptr);
}

SpotLight.prototype['updateMatrix'] = function() {
    _emscripten_bind_SpotLight__updateMatrix_p0(this.ptr);
}

SpotLight.prototype['set__normalMatrix'] = function(arg0) {
    _emscripten_bind_SpotLight__set__normalMatrix_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['get_frustumCulled'] = function() {
    return _emscripten_bind_SpotLight__get_frustumCulled_p0(this.ptr);
}

SpotLight.prototype['set_frustumCulled'] = function(arg0) {
    _emscripten_bind_SpotLight__set_frustumCulled_p1(this.ptr, arg0);
}

SpotLight.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__get_position_p0(this.ptr), Module['Vector3']);
}

SpotLight.prototype['set___webglInit'] = function(arg0) {
    _emscripten_bind_SpotLight__set___webglInit_p1(this.ptr, arg0);
}

SpotLight.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_SpotLight__clone_p0(this.ptr), Module['Object3D']);
}

SpotLight.prototype['get_visible'] = function() {
    return _emscripten_bind_SpotLight__get_visible_p0(this.ptr);
}

SpotLight.prototype['set_useQuaternion'] = function(arg0) {
    _emscripten_bind_SpotLight__set_useQuaternion_p1(this.ptr, arg0);
}

SpotLight.prototype['get_matrixAutoUpdate'] = function() {
    return _emscripten_bind_SpotLight__get_matrixAutoUpdate_p0(this.ptr);
}

SpotLight.prototype['worldToLocal'] = function(arg0) {
    return wrapPointer(_emscripten_bind_SpotLight__worldToLocal_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

SpotLight.prototype['__destroy__'] = function() {
    _emscripten_bind_SpotLight____destroy___p0(this.ptr);
}

SpotLight.prototype['set_name'] = function(arg0) {
var stack = Runtime.stackSave();
try {
    _emscripten_bind_SpotLight__set_name_p1(this.ptr, ensureString(arg0));
} finally { Runtime.stackRestore(stack) }
}

SpotLight.prototype['__addObject'] = function(arg0) {
    _emscripten_bind_SpotLight____addObject_p1(this.ptr, arg0.ptr);
}

SpotLight.prototype['set_torqueAccum'] = function(arg0) {
    _emscripten_bind_SpotLight__set_torqueAccum_p1(this.ptr, arg0.ptr);
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
