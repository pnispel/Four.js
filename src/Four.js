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

function Vector3 ( arg0, arg1, arg2 ) {
	this.ptr = asm.Vector3$Vector3( asm.malloc(24), arg0 || 0, arg1 || 0, arg2 || 0 );
	this.__class__ = "Vector3";
	Vector3.prototype.__cache__[this.ptr] = this;
}

Vector3.prototype.set = function (arg0, arg1, arg2) {
	return wrapPointer( asm.Vector3$set(this.ptr, arg0 || 0, arg1 || 0, arg2 || 0), Vector3 );
};

Vector3.prototype.get = function (arg0) {
	return asm.Vector3$get(this.ptr, arg0 || 0);
};

Vector3.prototype.add = function (arg0) {
	return asm.Vector3$add(this.ptr, arg0.ptr);
};

Vector3.prototype.sub = function (arg0) {
	return asm.Vector3$sub(this.ptr, arg0.ptr);
};

Vector3.prototype.addVectors = function (arg0, arg1) {
	return asm.Vector3$addVectors(this.ptr, arg0.ptr, arg1.ptr);
};

Vector3.prototype.multiplyVectors = function (arg0, arg1) {
	return asm.Vector3$multiplyVectors(this.ptr, arg0.ptr, arg1.ptr);
};

Vector3.prototype.applyMatrix3 = function (arg0) {
	return asm.Vector3$applyMatrix3(this.ptr, arg0.ptr);
};

Vector3.prototype.applyMatrix4 = function (arg0) {
	return asm.Vector3$applyMatrix4(this.ptr, arg0.ptr);
};

Vector3.prototype.applyProjection = function (arg0) {
	return asm.Vector3$applyProjection(this.ptr, arg0.ptr);
};

Vector3.prototype.applyQuaternion = function (arg0) {
	return asm.Vector3$applyQuaternion(this.ptr, arg0.ptr);
};

Vector3.prototype.addScalar = function (arg0) {
	return asm.Vector3$addScalar(this.ptr, arg0);
};

Vector3.prototype.multiplyScalar = function (arg0) {
	return asm.Vector3$multiplyScalar(this.ptr, arg0);
};

Vector3.prototype.divideScalar = function (arg0) {
	return asm.Vector3$divideScalar(this.ptr, arg0);
};

Vector3.prototype.multiply = function (arg0) {
	return asm.Vector3$multiply(this.ptr, arg0.ptr);
};

Vector3.prototype.divide = function (arg0) {
	return asm.Vector3$divide(this.ptr, arg0.ptr);
};

Vector3.prototype.transformDirection = function (arg0) {
	return asm.Vector3$transformDirection(this.ptr, arg0.ptr);
};

Vector3.prototype.min = function (arg0) {
	return asm.Vector3$min(this.ptr, arg0.ptr);
};

Vector3.prototype.max = function (arg0) {
	return asm.Vector3$max(this.ptr, arg0.ptr);
};

Vector3.prototype.clamp = function (arg0, arg1) {
	return asm.Vector3$clamp(this.ptr, arg0.ptr, arg1.ptr);
};

Vector3.prototype.negate = function() {
	return asm.Vector3$negate(this.ptr);
};

Vector3.prototype.dot = function (arg0) {
	return asm.Vector3$dot(this.ptr, arg0.ptr);
};

Vector3.prototype.lengthSquared = function() {
	return asm.Vector3$lengthSquared(this.ptr);
};

Vector3.prototype.length = function() {
	return asm.Vector3$length(this.ptr);
};

Vector3.prototype.lengthManhattan = function() {
	return asm.Vector3$lengthManhattan(this.ptr);
};

Vector3.prototype.normalize = function() {
	return asm.Vector3$normalize(this.ptr);
};

Vector3.prototype.setLength = function (arg0) {
	return asm.Vector3$setLength(this.ptr, arg0);
};

Vector3.prototype.lerp = function (arg0, arg1) {
	return asm.Vector3$lerp(this.ptr, arg0.ptr, arg1);
};

Vector3.prototype.cross = function (arg0) {
	return asm.Vector3$cross(this.ptr, arg0.ptr);
};

Vector3.prototype.crossVectors = function (arg0, arg1) {
	return asm.Vector3$crossVectors(this.ptr, arg0.ptr, arg1.ptr);
};

Vector3.prototype.distanceTo = function (arg0) {
	return asm.Vector3$distanceTo(this.ptr, arg0.ptr);
};

Vector3.prototype.distanceToSquared = function (arg0) {
	return asm.Vector3$distanceToSquared(this.ptr, arg0.ptr);
};

Vector3.prototype.getPositionFromMatrix = function (arg0) {
	return asm.Vector3$getPositionFromMatrix(this.ptr, arg0.ptr);
};

Vector3.prototype.getScaleFromMatrix = function (arg0) {
	return asm.Vector3$getScaleFromMatrix(this.ptr, arg0.ptr);
};

Vector3.prototype.equals = function (arg0) {
	return asm.Vector3$equals(this.ptr, arg0.ptr);
};

Vector3.prototype.clone = function () {
	return asm.Vector3$clone(this.ptr);
};

Vector3.prototype.copy = function (arg0) {
	return asm.Vector3$copy(this.ptr, arg0.ptr);
};

Vector3.prototype.destroy = function() {
	asm.Vector3$destroy(this.ptr);
};

