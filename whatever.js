function Vector3(x, y, z) { 
this.ptr = asm.Vector3$Vector3( asm.malloc(24), x, y, z);
this.__class__ = "Vector3";
Vector3.prototype.__cache__[this.ptr] = this;
}

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

