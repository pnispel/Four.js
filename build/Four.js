//(function() {

if(!Math.imul) {
    Math.imul = function(x, y) { return x * y; };
}

var MB = 1024 * 1024;
var SIZE = 256 * MB;
var STACK_SIZE = 2 * MB;
var HEAP_SIZE = SIZE - STACK_SIZE;
var buffer = window.asmBuffer = new ArrayBuffer(SIZE);

var asm = (function (global, env, buffer) {
    "use asm";

    /*var malloc = env.malloc;
var free = env.free;
var abs = env.abs;*/

    var stackSize = env.STACK_SIZE|0;
    var heapSize = env.HEAP_SIZE|0;
    var totalSize = env.TOTAL_SIZE|0;
    var assertEqual = env.assertEqual;
    var print = env.print;
    var start = env.start;
    var end = env.end;

    var U1 = new global.Uint8Array(buffer);
    var I1 = new global.Int8Array(buffer);
    var U2 = new global.Uint16Array(buffer);
    var I2 = new global.Int16Array(buffer);
    var U4 = new global.Uint32Array(buffer);
    var I4 = new global.Int32Array(buffer);
    var F4 = new global.Float32Array(buffer);
    var F8 = new global.Float64Array(buffer);

    var acos = global.Math.acos;
    var asin = global.Math.asin;
    var atan = global.Math.atan;
    var cos = global.Math.cos;
    var sin = global.Math.sin;
    var tan = global.Math.tan;
    var ceil = global.Math.ceil;
    var floor = global.Math.floor;
    var exp = global.Math.exp;
    var log = global.Math.log;
    var sqrt = global.Math.sqrt;
    var abs = global.Math.abs;
    var atan2 = global.Math.atan2;
    var pow = global.Math.pow;
    var imul = global.Math.imul;

    var base = 0;
    var freep = 0;
    var nUnitsMin = 1024;

var globalSP = 64;
function main() {
  var $SP = 0;
  U4[1] = totalSize - 64;
  U4[0] = 4;
}
  function Vector3$Vector3(thisPtr, x, y, z) {
    thisPtr = thisPtr | 0;
    x = +x;
    y = +y;
    z = +z;
    var $SP = 0;
    F8[(thisPtr) >> 3] = x;
    F8[((thisPtr) + 8 | 0) >> 3] = y;
    F8[((thisPtr) + 16 | 0) >> 3] = z;
    return thisPtr | 0;
  }
  function Vector3$destroy(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    free(thisPtr | 0);
  }
  function Vector3$set(thisPtr, x, y, z) {
    thisPtr = thisPtr | 0;
    x = +x;
    y = +y;
    z = +z;
    var $SP = 0;
    F8[(thisPtr) >> 3] = x;
    F8[((thisPtr) + 8 | 0) >> 3] = y;
    F8[((thisPtr) + 16 | 0) >> 3] = z;
    return thisPtr | 0;
  }
  function Vector3$get(thisPtr, index) {
    thisPtr = thisPtr | 0;
    index = index | 0;
    var $SP = 0;
    if ((index | 0) == 0) {
      return +(+F8[(thisPtr) >> 3]);
    } else if ((index | 0) == 1) {
      return +(+F8[((thisPtr) + 8 | 0) >> 3]);
    } else if ((index | 0) == 2) {
      return +(+F8[((thisPtr) + 16 | 0) >> 3]);
    }
    return +0;
  }
  function Vector3$add(thisPtr, vector) {
    thisPtr = thisPtr | 0;
    vector = vector | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] + +F8[(vector) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] + +F8[((vector) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] + +F8[((vector) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$sub(thisPtr, vector) {
    thisPtr = thisPtr | 0;
    vector = vector | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[(thisPtr) >> 3] - +F8[(vector) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((thisPtr) + 8 | 0) >> 3] - +F8[((vector) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[((thisPtr) + 16 | 0) >> 3] - +F8[((vector) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$addVectors(thisPtr, a, b) {
    thisPtr = thisPtr | 0;
    a = a | 0;
    b = b | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[(a) >> 3] + +F8[(b) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((a) + 8 | 0) >> 3] + +F8[((b) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[((a) + 16 | 0) >> 3] + +F8[((b) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$subVectors(thisPtr, a, b) {
    thisPtr = thisPtr | 0;
    a = a | 0;
    b = b | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[(a) >> 3] - +F8[(b) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((a) + 8 | 0) >> 3] - +F8[((b) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[((a) + 16 | 0) >> 3] - +F8[((b) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$multiplyVectors(thisPtr, a, b) {
    thisPtr = thisPtr | 0;
    a = a | 0;
    b = b | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[(a) >> 3] * +F8[(b) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((a) + 8 | 0) >> 3] * +F8[((b) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[((a) + 16 | 0) >> 3] * +F8[((b) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$applyMatrix3(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, e = 0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    e = +((m) >> 3) | 0;
    F8[(thisPtr) >> 3] = F8[(e + 0 * 8) >> 3] * vx + F8[(e + 3 * 8) >> 3] * vy + F8[(e + 6 * 8) >> 3] * vz;
    F8[((thisPtr) + 8 | 0) >> 3] = F8[(e + 1 * 8) >> 3] * vx + F8[(e + 4 * 8) >> 3] * vy + F8[(e + 7 * 8) >> 3] * vz;
    F8[((thisPtr) + 16 | 0) >> 3] = F8[(e + 2 * 8) >> 3] * vx + F8[(e + 5 * 8) >> 3] * vy + F8[(e + 8 * 8) >> 3] * vz;
    return thisPtr | 0;
  }
  function Vector3$applyMatrix4(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, e = 0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    e = +((m) >> 3) | 0;
    F8[(thisPtr) >> 3] = F8[(e + 0 * 8) >> 3] * vx + F8[(e + 4 * 8) >> 3] * vy + F8[(e + 8 * 8) >> 3] * vz + F8[(e + 12 * 8) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = F8[(e + 1 * 8) >> 3] * vx + F8[(e + 5 * 8) >> 3] * vy + F8[(e + 9 * 8) >> 3] * vz + F8[(e + 13 * 8) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = F8[(e + 2 * 8) >> 3] * vx + F8[(e + 6 * 8) >> 3] * vy + F8[(e + 10 * 8) >> 3] * vz + F8[(e + 14 * 8) >> 3];
    return thisPtr | 0;
  }
  function Vector3$applyProjection(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, e = 0, d = 0.0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    e = +((m) >> 3) | 0;
    d = +1 / (F8[(e + 3 * 8) >> 3] * vx + F8[(e + 7 * 8) >> 3] * vy + F8[(e + 11 * 8) >> 3] * vz + F8[(e + 15 * 8) >> 3]);
    F8[(thisPtr) >> 3] = (F8[(e + 0 * 8) >> 3] * vx + F8[(e + 4 * 8) >> 3] * vy + F8[(e + 8 * 8) >> 3] * vz + F8[(e + 12 * 8) >> 3]) * d;
    F8[((thisPtr) + 8 | 0) >> 3] = (F8[(e + 1 * 8) >> 3] * vx + F8[(e + 5 * 8) >> 3] * vy + F8[(e + 9 * 8) >> 3] * vz + F8[(e + 13 * 8) >> 3]) * d;
    F8[((thisPtr) + 16 | 0) >> 3] = (F8[(e + 2 * 8) >> 3] * vx + F8[(e + 6 * 8) >> 3] * vy + F8[(e + 10 * 8) >> 3] * vz + F8[(e + 14 * 8) >> 3]) * d;
    return thisPtr | 0;
  }
  function Vector3$applyQuaternion(thisPtr, q) {
    thisPtr = thisPtr | 0;
    q = q | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, qx = 0.0, qy = 0.0, qz = 0.0, qw = 0.0, ix = 0.0, iy = 0.0, iz = 0.0, iw = 0.0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    qx = +F8[(q) >> 3];
    qy = +F8[((q) + 8 | 0) >> 3];
    qz = +F8[((q) + 16 | 0) >> 3];
    qw = +F8[((q) + 24 | 0) >> 3];
    ix = qw * vx + qy * vz - qz * vy;
    iy = qw * vy + qy * vx - qz * vz;
    iz = qw * vz + qy * vy - qz * vx;
    iw = -qw * vx - qy * vy - qz * vz;
    F8[(thisPtr) >> 3] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    F8[((thisPtr) + 8 | 0) >> 3] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    F8[((thisPtr) + 16 | 0) >> 3] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return thisPtr | 0;
  }
  function Vector3$addScalar(thisPtr, scalar) {
    thisPtr = thisPtr | 0;
    scalar = +scalar;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] + scalar;
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] + scalar;
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] + scalar;
    return thisPtr | 0;
  }
  function Vector3$multiplyScalar(thisPtr, scalar) {
    thisPtr = thisPtr | 0;
    scalar = +scalar;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] * scalar;
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] * scalar;
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] * scalar;
    return thisPtr | 0;
  }
  function Vector3$divideScalar(thisPtr, s) {
    thisPtr = thisPtr | 0;
    s = +s;
    var $SP = 0;
    if (+s != 0) {
      F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] / s;
      F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] / s;
      F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] / s;
    } else {
      F8[(thisPtr) >> 3] = +0;
      F8[((thisPtr) + 8 | 0) >> 3] = +0;
      F8[((thisPtr) + 16 | 0) >> 3] = +0;
    }
    return thisPtr | 0;
  }
  function Vector3$multiply(thisPtr, vector) {
    thisPtr = thisPtr | 0;
    vector = vector | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] * +F8[(vector) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] * +F8[((vector) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] * +F8[((vector) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$divide(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] / +F8[(v) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] / +F8[((v) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] / +F8[((v) + 16 | 0) >> 3];
    return thisPtr | 0;
  }
  function Vector3$transformDirection(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, e = 0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    e = +((m) >> 3) | 0;
    F8[(thisPtr) >> 3] = F8[(e + 0 * 8) >> 3] * vx + F8[(e + 4 * 8) >> 3] * vy + F8[(e + 8 * 8) >> 3] * vz;
    F8[((thisPtr) + 8 | 0) >> 3] = F8[(e + 1 * 8) >> 3] * vx + F8[(e + 5 * 8) >> 3] * vy + F8[(e + 9 * 8) >> 3] * vz;
    F8[((thisPtr) + 16 | 0) >> 3] = F8[(e + 2 * 8) >> 3] * vx + F8[(e + 6 * 8) >> 3] * vy + F8[(e + 10 * 8) >> 3] * vz;
    Vector3$normalize(thisPtr | 0);
    return thisPtr | 0;
  }
  function Vector3$min(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    if (+(+F8[(thisPtr) >> 3]) > +(+F8[(v) >> 3])) {
      F8[(thisPtr) >> 3] = +F8[(v) >> 3];
    }
    if (+(+F8[((thisPtr) + 8 | 0) >> 3]) > +(+F8[((v) + 8 | 0) >> 3])) {
      F8[((thisPtr) + 8 | 0) >> 3] = +F8[((v) + 8 | 0) >> 3];
    }
    if (+(+F8[((thisPtr) + 16 | 0) >> 3]) > +(+F8[((v) + 16 | 0) >> 3])) {
      F8[((thisPtr) + 16 | 0) >> 3] = +F8[((v) + 16 | 0) >> 3];
    }
    return thisPtr | 0;
  }
  function Vector3$max(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    if (+(+F8[(thisPtr) >> 3]) < +(+F8[(v) >> 3])) {
      F8[(thisPtr) >> 3] = +F8[(v) >> 3];
    }
    if (+(+F8[((thisPtr) + 8 | 0) >> 3]) < +(+F8[((v) + 8 | 0) >> 3])) {
      F8[((thisPtr) + 8 | 0) >> 3] = +F8[((v) + 8 | 0) >> 3];
    }
    if (+(+F8[((thisPtr) + 16 | 0) >> 3]) < +(+F8[((v) + 16 | 0) >> 3])) {
      F8[((thisPtr) + 16 | 0) >> 3] = +F8[((v) + 16 | 0) >> 3];
    }
    return thisPtr | 0;
  }
  function Vector3$clamp(thisPtr, min, max) {
    thisPtr = thisPtr | 0;
    min = min | 0;
    max = max | 0;
    var $SP = 0;
    if (+(+F8[(thisPtr) >> 3]) < +(+F8[(min) >> 3])) {
      F8[(thisPtr) >> 3] = +F8[(min) >> 3];
    } else if (+(+F8[(thisPtr) >> 3]) > +(+F8[(max) >> 3])) {
      F8[(thisPtr) >> 3] = +F8[(max) >> 3];
    }
    if (+(+F8[((thisPtr) + 8 | 0) >> 3]) < +(+F8[((min) + 8 | 0) >> 3])) {
      F8[((thisPtr) + 8 | 0) >> 3] = +F8[((min) + 8 | 0) >> 3];
    } else if (+(+F8[((thisPtr) + 8 | 0) >> 3]) > +(+F8[((max) + 8 | 0) >> 3])) {
      F8[((thisPtr) + 8 | 0) >> 3] = +F8[((max) + 8 | 0) >> 3];
    }
    if (+(+F8[((thisPtr) + 16 | 0) >> 3]) < +(+F8[((min) + 16 | 0) >> 3])) {
      F8[((thisPtr) + 16 | 0) >> 3] = +F8[((min) + 16 | 0) >> 3];
    } else if (+(+F8[((thisPtr) + 16 | 0) >> 3]) > +(+F8[((max) + 16 | 0) >> 3])) {
      F8[((thisPtr) + 16 | 0) >> 3] = +F8[((max) + 16 | 0) >> 3];
    }
    return thisPtr | 0;
  }
  function Vector3$negate(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    return Vector3$multiplyScalar(thisPtr | 0, +(-1 | 0)) | 0;
  }
  function Vector3$dot(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    return +(+F8[(thisPtr) >> 3] * +F8[(v) >> 3] + +F8[((thisPtr) + 8 | 0) >> 3] * +F8[((v) + 8 | 0) >> 3] + +F8[((thisPtr) + 16 | 0) >> 3] * +F8[((v) + 16 | 0) >> 3]);
  }
  function Vector3$lengthSquared(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    return +(+F8[(thisPtr) >> 3] * +F8[(thisPtr) >> 3] + +F8[((thisPtr) + 8 | 0) >> 3] * +F8[((thisPtr) + 8 | 0) >> 3] + +F8[((thisPtr) + 16 | 0) >> 3] * +F8[((thisPtr) + 16 | 0) >> 3]);
  }
  function Vector3$length(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    return +sqrt(+(+F8[(thisPtr) >> 3] * +F8[(thisPtr) >> 3] + +F8[((thisPtr) + 8 | 0) >> 3] * +F8[((thisPtr) + 8 | 0) >> 3] + +F8[((thisPtr) + 16 | 0) >> 3] * +F8[((thisPtr) + 16 | 0) >> 3]));
  }
  function Vector3$lengthManhattan(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    return +(+(abs(+F8[(thisPtr) >> 3]) + abs(+F8[((thisPtr) + 8 | 0) >> 3]) + abs(+F8[((thisPtr) + 16 | 0) >> 3])));
  }
  function Vector3$normalize(thisPtr) {
    thisPtr = thisPtr | 0;
    var $SP = 0;
    return Vector3$divideScalar(thisPtr | 0, Vector3$length(thisPtr | 0)) | 0;
  }
  function Vector3$setLength(thisPtr, l) {
    thisPtr = thisPtr | 0;
    l = +l;
    var oldLength = 0.0, $SP = 0;
    oldLength = Vector3$length(thisPtr | 0);
    if (+oldLength != 0 && +oldLength != +l) {
      Vector3$multiplyScalar(thisPtr | 0, l / oldLength);
    }
    return thisPtr | 0;
  }
  function Vector3$lerp(thisPtr, v, alpha) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    alpha = +alpha;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(thisPtr) >> 3] + (+F8[(v) >> 3] - +F8[(thisPtr) >> 3]) * alpha;
    F8[((thisPtr) + 8 | 0) >> 3] = F8[((thisPtr) + 8 | 0) >> 3] + (+F8[((v) + 8 | 0) >> 3] - +F8[((thisPtr) + 8 | 0) >> 3]) * alpha;
    F8[((thisPtr) + 16 | 0) >> 3] = F8[((thisPtr) + 16 | 0) >> 3] + (+F8[((v) + 16 | 0) >> 3] - +F8[((thisPtr) + 16 | 0) >> 3]) * alpha;
    return thisPtr | 0;
  }
  function Vector3$cross(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var vx = 0.0, vy = 0.0, vz = 0.0, $SP = 0;
    vx = +F8[(thisPtr) >> 3];
    vy = +F8[((thisPtr) + 8 | 0) >> 3];
    vz = +F8[((thisPtr) + 16 | 0) >> 3];
    F8[(thisPtr) >> 3] = vy * +F8[((v) + 16 | 0) >> 3] - vz * +F8[((v) + 8 | 0) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = vz * +F8[(v) >> 3] - vx * +F8[((v) + 16 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = vx * +F8[((v) + 8 | 0) >> 3] - vy * +F8[(v) >> 3];
    return thisPtr | 0;
  }
  function Vector3$crossVectors(thisPtr, a, b) {
    thisPtr = thisPtr | 0;
    a = a | 0;
    b = b | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[((a) + 8 | 0) >> 3] * +F8[((b) + 16 | 0) >> 3] - +F8[((a) + 16 | 0) >> 3] * +F8[((b) + 8 | 0) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((a) + 16 | 0) >> 3] * +F8[(b) >> 3] - +F8[(a) >> 3] * +F8[((b) + 16 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[(a) >> 3] * +F8[((b) + 8 | 0) >> 3] - +F8[((a) + 8 | 0) >> 3] * +F8[(b) >> 3];
    return thisPtr | 0;
  }
  function Vector3$distanceTo(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    return +sqrt(+Vector3$distanceToSquared(thisPtr | 0, v | 0));
  }
  function Vector3$distanceToSquared(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var dx = 0.0, dy = 0.0, dz = 0.0, $SP = 0;
    dx = +F8[(thisPtr) >> 3] - +F8[(v) >> 3];
    dy = +F8[((thisPtr) + 8 | 0) >> 3] - +F8[((v) + 8 | 0) >> 3];
    dz = +F8[((thisPtr) + 16 | 0) >> 3] - +F8[((v) + 16 | 0) >> 3];
    return +(dx * dx + dy * dy + dz * dz);
  }
  function Vector3$getPositionFromMatrix(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = F8[(+((m) >> 3) + 12 * 8) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = F8[(+((m) >> 3) + 13 * 8) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = F8[(+((m) >> 3) + 14 * 8) >> 3];
    return thisPtr | 0;
  }
  function Vector3$getScaleFromMatrix(thisPtr, m) {
    thisPtr = thisPtr | 0;
    m = m | 0;
    var sx = 0.0, sy = 0.0, sz = 0.0, $SP = 0;
    sx = Vector3$length(Vector3$set(thisPtr | 0, F8[(+((m) >> 3) + 0 * 8) >> 3], F8[(+((m) >> 3) + 1 * 8) >> 3], F8[(+((m) >> 3) + 2 * 8) >> 3]) | 0);
    sy = Vector3$length(Vector3$set(thisPtr | 0, F8[(+((m) >> 3) + 4 * 8) >> 3], F8[(+((m) >> 3) + 5 * 8) >> 3], F8[(+((m) >> 3) + 6 * 8) >> 3]) | 0);
    sz = Vector3$length(Vector3$set(thisPtr | 0, F8[(+((m) >> 3) + 8 * 8) >> 3], F8[(+((m) >> 3) + 9 * 8) >> 3], F8[(+((m) >> 3) + 10 * 8) >> 3]) | 0);
    F8[(thisPtr) >> 3] = sx;
    F8[((thisPtr) + 8 | 0) >> 3] = sy;
    F8[((thisPtr) + 16 | 0) >> 3] = sz;
    return thisPtr | 0;
  }
  function Vector3$equals(thisPtr, v) {
    thisPtr = thisPtr | 0;
    v = v | 0;
    var $SP = 0;
    if (+(+F8[(v) >> 3]) == +(+F8[(thisPtr) >> 3]) && +(+F8[((v) + 8 | 0) >> 3]) == +(+F8[((thisPtr) + 8 | 0) >> 3]) && +(+F8[((v) + 16 | 0) >> 3]) == +(+F8[((thisPtr) + 16 | 0) >> 3])) {
      return 1;
    }
    return 0;
  }
  function Vector3$clone(thisPtr) {
    thisPtr = thisPtr | 0;
    var _ = 0, clone = 0, $SP = 0;
    clone = (Vector3$Vector3((_ = malloc(24) | 0) | 0, +0, +0, +0), _) | 0;
    F8[(clone) >> 3] = +F8[(thisPtr) >> 3];
    F8[((clone) + 8 | 0) >> 3] = +F8[((thisPtr) + 8 | 0) >> 3];
    F8[((clone) + 16 | 0) >> 3] = +F8[((thisPtr) + 16 | 0) >> 3];
    return clone | 0;
  }
  function Vector3$copy(thisPtr, vector) {
    thisPtr = thisPtr | 0;
    vector = vector | 0;
    var $SP = 0;
    F8[(thisPtr) >> 3] = +F8[(vector) >> 3];
    F8[((thisPtr) + 8 | 0) >> 3] = +F8[((vector) + 8 | 0) >> 3];
    F8[((thisPtr) + 16 | 0) >> 3] = +F8[((vector) + 16 | 0) >> 3];
    return thisPtr | 0;
  }

    function memcpy(dest, src, num) {
        dest = dest|0; src = src|0; num = num|0;
        var ret = 0;
        ret = dest|0;
        if ((dest&3) == (src&3)) {
            while (dest & 3) {
                if ((num|0) == 0) return ret|0;
                U1[(dest)]=U1[(src)];
                dest = (dest+1)|0;
                src = (src+1)|0;
                num = (num-1)|0;
            }
            while ((num|0) >= 4) {
                U4[((dest)>>2)]=U4[((src)>>2)];
                dest = (dest+4)|0;
                src = (src+4)|0;
                num = (num-4)|0;
            }
        }
        while ((num|0) > 0) {
            U1[(dest)]=U1[(src)];
            dest = (dest+1)|0;
            src = (src+1)|0;
            num = (num-1)|0;
        }
        return ret|0;
    }

    function memset(ptr, value, num) {
        ptr = ptr|0; value = value|0; num = num|0;
        var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
        stop = (ptr + num)|0;
        if ((num|0) >= 20) {
            // This is unaligned, but quite large, so work hard to get to aligned settings
            value = value & 0xff;
            unaligned = ptr & 3;
            value4 = value | (value << 8) | (value << 16) | (value << 24);
            stop4 = stop & ~3;
            if (unaligned) {
                unaligned = (ptr + 4 - unaligned)|0;
                while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
                    U1[(ptr)]=value;
                    ptr = (ptr+1)|0;
                }
            }
            while ((ptr|0) < (stop4|0)) {
                U4[((ptr)>>2)]=value4;
                ptr = (ptr+4)|0;
            }
        }
        while ((ptr|0) < (stop|0)) {
            U1[(ptr)]=value;
            ptr = (ptr+1)|0;
        }
    }

    
    function reset() {
      var $SP = 0;
      U4[((($SP) + 32 | 0) + 0 * 4) >> 2] = 4;
      U4[((($SP) + 32 | 0) + 1 * 4) >> 2] = totalSize >>> 0;
      base = 2 | 0;
      freep = 0;
    }

    function sbrk(nBytes) {
      nBytes = nBytes | 0;
      var nWords = 0, j = 0, address = 0, $SP = 0;
      nWords = (nBytes | 0 | 0) / 4 | 0 | 0;
      j = (U4[((($SP) + 32 | 0) + 0 * 4) >> 2] >>> 0 >>> 0) + (nWords | 0 | 0) | 0 | 0;
      if ((j | 0) > (heapSize | 0 | 0)) {
        //print(int("anull sbrk"));
        return 0;
      }
      address = U4[((($SP) + 32 | 0) + 0 * 4) >> 2] | 0;
      U4[(($SP) + 32 + 0 * 4) >> 2] = ((U4[(($SP) + 32 + 0 * 4) >> 2] >>> 0) + (nWords | 0) | 0) >>> 0;
      //print("address = " + address);
      return address | 0;
    }
    function morecore(nUnits) {
      nUnits = nUnits | 0;
      var buffer = 0, header = 0, $SP = 0;
      if (nUnits >>> 0 < nUnitsMin >>> 0) {
        nUnits = nUnitsMin;
      }
      buffer = sbrk(imul(nUnits | 0, 8)) | 0;
      if ((~~buffer | 0) == 0) {
        return 0;
      }
      header = buffer | 0 | 0;
      U4[((header) + 4 | 0) >> 2] = nUnits;
      free(header + 1 * 8 | 0 | 0);
      return freep | 0;
    }
    function malloc(nBytes) {
      nBytes = nBytes | 0;
      var _ = 0, p = 0, prevp = 0, nUnits = 0, i = 0, $SP = 0;
      nUnits = (((((nBytes | 0 | 0) + 8 | 0 | 0 | 0 | 0) - 1 | 0 | 0 | 0 | 0) / 8 | 0 | 0 | 0 | 0) + 1 | 0 | 0) >>> 0;
      if ((prevp = freep | 0) == 0) {
        U4[(base) >> 2] = (freep = (prevp = base | 0) | 0) | 0;
        U4[((base) + 4 | 0) >> 2] = 0;
      }
      i = 0;
      for (p = U4[(prevp) >> 2] | 0 | 0; (i | 0) < 10; prevp = p | 0, p = U4[(p) >> 2] | 0 | 0, (_ = i, i = (i | 0) + 1 | 0, _)) {
        //print("hue with psize = " + p->size + " and nUnits = " + nUnits );
        if ((U4[((p) + 4 | 0) >> 2] | 0) >>> 0 >= nUnits >>> 0) {
          if ((U4[((p) + 4 | 0) >> 2] | 0) >>> 0 == nUnits >>> 0) {
            U4[(prevp) >> 2] = U4[(p) >> 2] | 0;
          } else {
            U4[((p) + 4 | 0) >> 2] = ((U4[((p) + 4 | 0) >> 2] >>> 0) - (nUnits >>> 0) | 0) >>> 0;
            //console.log(" p pre-resize = " + p + " as uint " + uint(p) + " as double " + double(p) )
            //p + (U4[((p) + 4 | 0) >> 2] | 0) * 8
            p = (~~p | 0) + (imul(U4[((p) + 4 | 0) >> 2] | 0, 8) | 0) | 0 | 0;
            U4[((p) + 4 | 0) >> 2] = nUnits;
          }
          freep = prevp | 0;
          //print(" about to return p = " + p);
          //print("     returning " + (byte*)(p + 1));
          return p + 1 * 8 | 0 | 0;
        }
        if (~~p >>> 0 == ~~freep >>> 0) {
          //print("grabbing morecore");
          if ((p = morecore(nUnits) | 0) == 0) {
            return 0;
          }
        }
      }
      return 0;
    }
    function free(ap) {
      ap = ap | 0;
      var bp = 0, p = 0, comp1 = 0, comp2 = 0, i = 0, $SP = 0;
      bp = (ap | 0) - 1 * 8 | 0 | 0;
      i = 0;
      for (p = freep | 0; (i | 0) == 0; p = U4[(p) >> 2] | 0 | 0) {
        if (~~bp >>> 0 > ~~p >>> 0) {
          if (~~bp >>> 0 < ~~(U4[(p) >> 2] | 0) >>> 0) {
            break;
          }
        }
        //!(bp > p && bp < p->next)
        if (~~p >>> 0 >= ~~(U4[(p) >> 2] | 0) >>> 0) {
          if (~~bp >>> 0 > ~~p >>> 0) {
            break;
          } else if (~~bp >>> 0 < ~~(U4[(p) >> 2] | 0) >>> 0) {
            break;
          }
        }
      }
      comp1 = (~~bp | 0) + (imul(U4[((bp) + 4 | 0) >> 2] | 0, 8) | 0) | 0 | 0;
      comp2 = (~~p | 0) + (imul(U4[((p) + 4 | 0) >> 2] | 0, 8) | 0) | 0 | 0;
      if (~~comp1 >>> 0 == ~~(U4[(p) >> 2] | 0) >>> 0) {
        U4[((bp) + 4 | 0) >> 2] = ((U4[((bp) + 4 | 0) >> 2] >>> 0) + ((U4[((U4[(p) >> 2] | 0) + 4 | 0) >> 2] | 0) >>> 0) | 0) >>> 0;
        U4[(bp) >> 2] = U4[(U4[(p) >> 2] | 0) >> 2] | 0;
      } else {
        U4[(bp) >> 2] = U4[(p) >> 2] | 0;
      }
      if (~~comp2 >>> 0 == ~~bp >>> 0) {
        U4[((p) + 4 | 0) >> 2] = ((U4[((p) + 4 | 0) >> 2] >>> 0) + ((U4[((bp) + 4 | 0) >> 2] | 0) >>> 0) | 0) >>> 0;
        U4[(p) >> 2] = U4[(bp) >> 2] | 0;
      } else {
        U4[(p) >> 2] = bp | 0;
      }
      freep = p | 0;
    }

    return { main: main,
 reset:  reset,
 malloc:  malloc,
Vector3$Vector3: Vector3$Vector3,
Vector3$destroy: Vector3$destroy,
Vector3$set: Vector3$set,
Vector3$get: Vector3$get,
Vector3$add: Vector3$add,
Vector3$sub: Vector3$sub,
Vector3$addVectors: Vector3$addVectors,
Vector3$subVectors: Vector3$subVectors,
Vector3$multiplyVectors: Vector3$multiplyVectors,
Vector3$applyMatrix3: Vector3$applyMatrix3,
Vector3$applyMatrix4: Vector3$applyMatrix4,
Vector3$applyProjection: Vector3$applyProjection,
Vector3$applyQuaternion: Vector3$applyQuaternion,
Vector3$addScalar: Vector3$addScalar,
Vector3$multiplyScalar: Vector3$multiplyScalar,
Vector3$divideScalar: Vector3$divideScalar,
Vector3$multiply: Vector3$multiply,
Vector3$divide: Vector3$divide,
Vector3$transformDirection: Vector3$transformDirection,
Vector3$min: Vector3$min,
Vector3$max: Vector3$max,
Vector3$clamp: Vector3$clamp,
Vector3$negate: Vector3$negate,
Vector3$dot: Vector3$dot,
Vector3$lengthSquared: Vector3$lengthSquared,
Vector3$length: Vector3$length,
Vector3$lengthManhattan: Vector3$lengthManhattan,
Vector3$normalize: Vector3$normalize,
Vector3$setLength: Vector3$setLength,
Vector3$lerp: Vector3$lerp,
Vector3$cross: Vector3$cross,
Vector3$crossVectors: Vector3$crossVectors,
Vector3$distanceTo: Vector3$distanceTo,
Vector3$distanceToSquared: Vector3$distanceToSquared,
Vector3$getPositionFromMatrix: Vector3$getPositionFromMatrix,
Vector3$getScaleFromMatrix: Vector3$getScaleFromMatrix,
Vector3$equals: Vector3$equals,
Vector3$clone: Vector3$clone,
Vector3$copy: Vector3$copy };

})({ Uint8Array: Uint8Array,
     Int8Array: Int8Array,
     Uint16Array: Uint16Array,
     Int16Array: Int16Array,
     Uint32Array: Uint32Array,
     Int32Array: Int32Array,
     Float32Array: Float32Array,
     Float64Array: Float64Array,
     Math: Math },
   { HEAP_SIZE: HEAP_SIZE,
     STACK_SIZE: STACK_SIZE,
     TOTAL_SIZE: SIZE,
     assertEqual: assertEqual,
     print: _print,
     start: start,
     end: end },
   buffer);

function assertEqual(val1, val2) {
  var err = true;
  var msg;
  if(val1 | 0 !== val1) {
    if(Math.abs(val1 - val2) < .00000001) {
      err = false;
    }
    else {
      msg = 'eps';
    }
  }
  else if(val1 === val2) {
    err = false;
  }

  if(err) {
    throw new Error(val1 + ' does not equal ' + val2);
  }
}

function _print(arg/* arg1, arg2, ..., argN */) {
    console.log(arg);
    //var func = ((typeof console !== 'undefined' && console.log) || print);
    //func.apply(null, arguments);
}

var _time;
function start() {
  _time = Date.now();
}

function end() {
  return Date.now() - _time;
}

asm.reset(); asm.main();
//})();
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

function Vector3(x, y, z) { 
this.ptr = asm.Vector3$Vector3( asm.malloc(24), x, y, z);
this.__class__ = Vector3;
Vector3.prototype.__cache__[this.ptr] = this;
}

Vector3.prototype.__cache__ = {};

Vector3.prototype.destroy = function () { 
  return asm.Vector3$destroy( this.ptr );
}

Vector3.prototype.set = function (x, y, z) { 
  return wrapPointer( asm.Vector3$set( this.ptr, x, y, z ), Vector3 );
}

Vector3.prototype.get = function (index) { 
  return asm.Vector3$get( this.ptr, index );
}

Vector3.prototype.add = function (vector) { 
  return wrapPointer( asm.Vector3$add( this.ptr, vector.ptr ), Vector3 );
}

Vector3.prototype.sub = function (vector) { 
  return wrapPointer( asm.Vector3$sub( this.ptr, vector.ptr ), Vector3 );
}

Vector3.prototype.addVectors = function (a, b) { 
  return wrapPointer( asm.Vector3$addVectors( this.ptr, a.ptr, b.ptr ), Vector3 );
}

Vector3.prototype.subVectors = function (a, b) { 
  return wrapPointer( asm.Vector3$subVectors( this.ptr, a.ptr, b.ptr ), Vector3 );
}

Vector3.prototype.multiplyVectors = function (a, b) { 
  return wrapPointer( asm.Vector3$multiplyVectors( this.ptr, a.ptr, b.ptr ), Vector3 );
}

Vector3.prototype.applyMatrix3 = function (m) { 
  return wrapPointer( asm.Vector3$applyMatrix3( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.applyMatrix4 = function (m) { 
  return wrapPointer( asm.Vector3$applyMatrix4( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.applyProjection = function (m) { 
  return wrapPointer( asm.Vector3$applyProjection( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.applyQuaternion = function (q) { 
  return wrapPointer( asm.Vector3$applyQuaternion( this.ptr, q.ptr ), Vector3 );
}

Vector3.prototype.addScalar = function (scalar) { 
  return wrapPointer( asm.Vector3$addScalar( this.ptr, scalar ), Vector3 );
}

Vector3.prototype.multiplyScalar = function (scalar) { 
  return wrapPointer( asm.Vector3$multiplyScalar( this.ptr, scalar ), Vector3 );
}

Vector3.prototype.divideScalar = function (s) { 
  return wrapPointer( asm.Vector3$divideScalar( this.ptr, s ), Vector3 );
}

Vector3.prototype.multiply = function (vector) { 
  return wrapPointer( asm.Vector3$multiply( this.ptr, vector.ptr ), Vector3 );
}

Vector3.prototype.divide = function (v) { 
  return wrapPointer( asm.Vector3$divide( this.ptr, v.ptr ), Vector3 );
}

Vector3.prototype.transformDirection = function (m) { 
  return wrapPointer( asm.Vector3$transformDirection( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.min = function (v) { 
  return wrapPointer( asm.Vector3$min( this.ptr, v.ptr ), Vector3 );
}

Vector3.prototype.max = function (v) { 
  return wrapPointer( asm.Vector3$max( this.ptr, v.ptr ), Vector3 );
}

Vector3.prototype.clamp = function (min, max) { 
  return wrapPointer( asm.Vector3$clamp( this.ptr, min.ptr, max.ptr ), Vector3 );
}

Vector3.prototype.negate = function () { 
  return wrapPointer( asm.Vector3$negate( this.ptr ), Vector3 );
}

Vector3.prototype.dot = function (v) { 
  return asm.Vector3$dot( this.ptr, v.ptr );
}

Vector3.prototype.lengthSquared = function () { 
  return asm.Vector3$lengthSquared( this.ptr );
}

Vector3.prototype.length = function () { 
  return asm.Vector3$length( this.ptr );
}

Vector3.prototype.lengthManhattan = function () { 
  return asm.Vector3$lengthManhattan( this.ptr );
}

Vector3.prototype.normalize = function () { 
  return wrapPointer( asm.Vector3$normalize( this.ptr ), Vector3 );
}

Vector3.prototype.setLength = function (l) { 
  return wrapPointer( asm.Vector3$setLength( this.ptr, l ), Vector3 );
}

Vector3.prototype.lerp = function (v, alpha) { 
  return wrapPointer( asm.Vector3$lerp( this.ptr, v.ptr, alpha ), Vector3 );
}

Vector3.prototype.cross = function (v) { 
  return wrapPointer( asm.Vector3$cross( this.ptr, v.ptr ), Vector3 );
}

Vector3.prototype.crossVectors = function (a, b) { 
  return wrapPointer( asm.Vector3$crossVectors( this.ptr, a.ptr, b.ptr ), Vector3 );
}

Vector3.prototype.distanceTo = function (v) { 
  return asm.Vector3$distanceTo( this.ptr, v.ptr );
}

Vector3.prototype.distanceToSquared = function (v) { 
  return asm.Vector3$distanceToSquared( this.ptr, v.ptr );
}

Vector3.prototype.getPositionFromMatrix = function (m) { 
  return wrapPointer( asm.Vector3$getPositionFromMatrix( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.getScaleFromMatrix = function (m) { 
  return wrapPointer( asm.Vector3$getScaleFromMatrix( this.ptr, m.ptr ), Vector3 );
}

Vector3.prototype.equals = function (v) { 
  return asm.Vector3$equals( this.ptr, v.ptr );
}

Vector3.prototype.clone = function () { 
  return wrapPointer( asm.Vector3$clone( this.ptr ), Vector3 );
}

Vector3.prototype.copy = function (vector) { 
  return wrapPointer( asm.Vector3$copy( this.ptr, vector.ptr ), Vector3 );
}


