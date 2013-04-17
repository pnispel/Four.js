#include <stdio.h> 
#include "Four.bindings.fixed.h"
extern "C" {

Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__clamp_p2(Vector3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->clamp(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Vector3__instanceOf_p1(Vector3 * self, int arg0) {
  return self->instanceOf(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__applyMatrix3_p1(Vector3 * self, Matrix3 * arg0) {
  return self->applyMatrix3(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__set_p3(Vector3 * self, double arg0, double arg1, double arg2) {
  return self->set(arg0, arg1, arg2);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__get_x_p0(Vector3 * self) {
  return self->x;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__divide_p1(Vector3 * self, Vector3 * arg0) {
  return self->divide(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__get_z_p0(Vector3 * self) {
  return self->z;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__getPositionFromMatrix_p1(Vector3 * self, Matrix4 * arg0) {
  return self->getPositionFromMatrix(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Vector3__Vector3_p0() {
  return new Vector3();
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Vector3__Vector3_p3(double arg0, double arg1, double arg2) {
  return new Vector3(arg0, arg1, arg2);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__addScalar_p1(Vector3 * self, double arg0) {
  return self->addScalar(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__divideScalar_p1(Vector3 * self, double arg0) {
  return self->divideScalar(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__crossVectors_p2(Vector3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->crossVectors(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__lengthManhattan_p0(Vector3 * self) {
  return self->lengthManhattan();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__negate_p0(Vector3 * self) {
  return self->negate();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__applyMatrix4_p1(Vector3 * self, Matrix4 * arg0) {
  return self->applyMatrix4(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__normalize_p0(Vector3 * self) {
  return self->normalize();
}
void __attribute__((used, noinline)) emscripten_bind_Vector3__set_y_p1(Vector3 * self, double arg0) {
  self->y = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Vector3__set_z_p1(Vector3 * self, double arg0) {
  self->z = arg0;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__sub_p1(Vector3 * self, Vector3 * arg0) {
  return self->sub(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__min_p1(Vector3 * self, Vector3 * arg0) {
  return self->min(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__distanceTo_p1(Vector3 * self, Vector3 * arg0) {
  return self->distanceTo(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__lerp_p2(Vector3 * self, Vector3 * arg0, double arg1) {
  return self->lerp(arg0, arg1);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__getScaleFromMatrix_p1(Vector3 * self, Matrix4 * arg0) {
  return self->getScaleFromMatrix(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__transformDirection_p1(Vector3 * self, Matrix4 * arg0) {
  return self->transformDirection(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__distanceToSquared_p1(Vector3 * self, Vector3 * arg0) {
  return self->distanceToSquared(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__add_p1(Vector3 * self, Vector3 * arg0) {
  return self->add(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__multiplyVectors_p2(Vector3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->multiplyVectors(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__get_y_p0(Vector3 * self) {
  return self->y;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__cross_p1(Vector3 * self, Vector3 * arg0) {
  return self->cross(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__clone_p0(Vector3 * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Vector3__set_x_p1(Vector3 * self, double arg0) {
  self->x = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__lengthSquared_p0(Vector3 * self) {
  return self->lengthSquared();
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__get_p1(Vector3 * self, int arg0) {
  return self->get(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__max_p1(Vector3 * self, Vector3 * arg0) {
  return self->max(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__multiplyScalar_p1(Vector3 * self, double arg0) {
  return self->multiplyScalar(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Vector3__equals_p1(Vector3 * self, Vector3 * arg0) {
  return self->equals(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__multiply_p1(Vector3 * self, Vector3 * arg0) {
  return self->multiply(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__addVectors_p2(Vector3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->addVectors(arg0, arg1);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__copy_p1(Vector3 * self, Vector3 * arg0) {
  return self->copy(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__applyProjection_p1(Vector3 * self, Matrix4 * arg0) {
  return self->applyProjection(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__setLength_p1(Vector3 * self, double arg0) {
  return self->setLength(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Vector3____destroy___p0(Vector3 * self) {
  delete self;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__subVectors_p2(Vector3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->subVectors(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__length_p0(Vector3 * self) {
  return self->length();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__applyQuaternion_p1(Vector3 * self, Quaternion * arg0) {
  return self->applyQuaternion(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Vector3__dot_p1(Vector3 * self, Vector3 * arg0) {
  return self->dot(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Vector3__setFromChar_p2(Vector3 * self, char arg0, double arg1) {
  return self->setFromChar(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Triangle__instanceOf_p1(Triangle * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Triangle____destroy___p0(Triangle * self) {
  delete self;
}
Triangle * __attribute__((used, noinline)) emscripten_bind_Triangle__Triangle_p0() {
  return new Triangle();
}
bool __attribute__((used, noinline)) emscripten_bind_Frustum__instanceOf_p1(Frustum * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Frustum____destroy___p0(Frustum * self) {
  delete self;
}
Frustum* __attribute__((used, noinline)) emscripten_bind_Frustum__set_p6(Frustum * self, Plane * arg0, Plane * arg1, Plane * arg2, Plane * arg3, Plane * arg4, Plane * arg5) {
  return self->set(arg0, arg1, arg2, arg3, arg4, arg5);
}
Frustum * __attribute__((used, noinline)) emscripten_bind_Frustum__Frustum_p0() {
  return new Frustum();
}
Frustum * __attribute__((used, noinline)) emscripten_bind_Frustum__Frustum_p6(Plane * arg0, Plane * arg1, Plane * arg2, Plane * arg3, Plane * arg4, Plane * arg5) {
  return new Frustum(arg0, arg1, arg2, arg3, arg4, arg5);
}
Frustum* __attribute__((used, noinline)) emscripten_bind_Frustum__clone_p0(Frustum * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Frustum__intersectsObject_p1(Frustum * self, Object3D * arg0) {
  return self->intersectsObject(arg0);
}
Frustum* __attribute__((used, noinline)) emscripten_bind_Frustum__setFromMatrix_p1(Frustum * self, Matrix4 * arg0) {
  return self->setFromMatrix(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Frustum__containsPoint_p1(Frustum * self, Vector3 * arg0) {
  return self->containsPoint(arg0);
}
Frustum* __attribute__((used, noinline)) emscripten_bind_Frustum__copy_p1(Frustum * self, Frustum * arg0) {
  return self->copy(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Frustum__intersectsSphere_p1(Frustum * self, Sphere * arg0) {
  return self->intersectsSphere(arg0);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__convertLinearToGamma_p0(Color * self) {
  return self->convertLinearToGamma();
}
bool __attribute__((used, noinline)) emscripten_bind_Color__instanceOf_p1(Color * self, int arg0) {
  return self->instanceOf(arg0);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__set_p1(Color * self, unsigned int arg0) {
  return self->set(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Color____destroy___p0(Color * self) {
  delete self;
}
Color * __attribute__((used, noinline)) emscripten_bind_Color__Color_p0() {
  return new Color();
}
Color * __attribute__((used, noinline)) emscripten_bind_Color__Color_p3(double arg0, double arg1, double arg2) {
  return new Color(arg0, arg1, arg2);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__clone_p0(Color * self) {
  return self->clone();
}
double __attribute__((used, noinline)) emscripten_bind_Color__get_r_p0(Color * self) {
  return self->r;
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__copyGammaToLinear_p1(Color * self, Color * arg0) {
  return self->copyGammaToLinear(arg0);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__addColors_p2(Color * self, Color * arg0, Color * arg1) {
  return self->addColors(arg0, arg1);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__add_p1(Color * self, Color * arg0) {
  return self->add(arg0);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__setRGB_p3(Color * self, double arg0, double arg1, double arg2) {
  return self->setRGB(arg0, arg1, arg2);
}
double __attribute__((used, noinline)) emscripten_bind_Color__get_g_p0(Color * self) {
  return self->g;
}
void __attribute__((used, noinline)) emscripten_bind_Color__set_b_p1(Color * self, double arg0) {
  self->b = arg0;
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__copy_p1(Color * self, Color * arg0) {
  return self->copy(arg0);
}
Color* __attribute__((used, noinline)) emscripten_bind_Color__convertGammaToLinear_p0(Color * self) {
  return self->convertGammaToLinear();
}
void __attribute__((used, noinline)) emscripten_bind_Color__set_r_p1(Color * self, double arg0) {
  self->r = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Color__get_b_p0(Color * self) {
  return self->b;
}
void __attribute__((used, noinline)) emscripten_bind_Color__set_g_p1(Color * self, double arg0) {
  self->g = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Vector4__instanceOf_p1(Vector4 * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Vector4__set_y_p1(Vector4 * self, double arg0) {
  self->y = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Vector4__set_z_p1(Vector4 * self, double arg0) {
  self->z = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Vector4__get_x_p0(Vector4 * self) {
  return self->x;
}
double __attribute__((used, noinline)) emscripten_bind_Vector4__get_y_p0(Vector4 * self) {
  return self->y;
}
double __attribute__((used, noinline)) emscripten_bind_Vector4__get_z_p0(Vector4 * self) {
  return self->z;
}
void __attribute__((used, noinline)) emscripten_bind_Vector4____destroy___p0(Vector4 * self) {
  delete self;
}
double __attribute__((used, noinline)) emscripten_bind_Vector4__get_w_p0(Vector4 * self) {
  return self->w;
}
Vector4 * __attribute__((used, noinline)) emscripten_bind_Vector4__Vector4_p0() {
  return new Vector4();
}
void __attribute__((used, noinline)) emscripten_bind_Vector4__set_w_p1(Vector4 * self, double arg0) {
  self->w = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Vector4__set_x_p1(Vector4 * self, double arg0) {
  self->x = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Vector2__instanceOf_p1(Vector2 * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Vector2__set_x_p1(Vector2 * self, double arg0) {
  self->x = arg0;
}
Vector2* __attribute__((used, noinline)) emscripten_bind_Vector2__set_p2(Vector2 * self, double arg0, double arg1) {
  return self->set(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Vector2__get_x_p0(Vector2 * self) {
  return self->x;
}
double __attribute__((used, noinline)) emscripten_bind_Vector2__get_y_p0(Vector2 * self) {
  return self->y;
}
void __attribute__((used, noinline)) emscripten_bind_Vector2__set_y_p1(Vector2 * self, double arg0) {
  self->y = arg0;
}
Vector2 * __attribute__((used, noinline)) emscripten_bind_Vector2__Vector2_p0() {
  return new Vector2();
}
Vector2 * __attribute__((used, noinline)) emscripten_bind_Vector2__Vector2_p2(double arg0, double arg1) {
  return new Vector2(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Vector2____destroy___p0(Vector2 * self) {
  delete self;
}
bool __attribute__((used, noinline)) emscripten_bind_UV__instanceOf_p1(UV * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_UV____destroy___p0(UV * self) {
  delete self;
}
UV * __attribute__((used, noinline)) emscripten_bind_UV__UV_p0() {
  return new UV();
}
bool __attribute__((used, noinline)) emscripten_bind_Line3__instanceOf_p1(Line3 * self, int arg0) {
  return self->instanceOf(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Line3__distance_p0(Line3 * self) {
  return self->distance();
}
Line3* __attribute__((used, noinline)) emscripten_bind_Line3__set_p2(Line3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->set(arg0, arg1);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Line3__center_p1(Line3 * self, Vector3 * arg0) {
  return self->center(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Line3__closestPointToPointParameter_p2(Line3 * self, Vector3 * arg0, bool arg1) {
  return self->closestPointToPointParameter(arg0, arg1);
}
Line3* __attribute__((used, noinline)) emscripten_bind_Line3__applyMatrix4_p1(Line3 * self, Matrix4 * arg0) {
  return self->applyMatrix4(arg0);
}
Line3* __attribute__((used, noinline)) emscripten_bind_Line3__clone_p0(Line3 * self) {
  return self->clone();
}
Line3 * __attribute__((used, noinline)) emscripten_bind_Line3__Line3_p0() {
  return new Line3();
}
Line3 * __attribute__((used, noinline)) emscripten_bind_Line3__Line3_p2(Vector3 * arg0, Vector3 * arg1) {
  return new Line3(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Line3__equals_p1(Line3 * self, Line3 * arg0) {
  return self->equals(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Line3__get_end_p0(Line3 * self) {
  return self->end;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Line3__get_start_p0(Line3 * self) {
  return self->start;
}
void __attribute__((used, noinline)) emscripten_bind_Line3__set_end_p1(Line3 * self, Vector3 * arg0) {
  self->end = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Line3____destroy___p0(Line3 * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Line3__set_start_p1(Line3 * self, Vector3 * arg0) {
  self->start = arg0;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Line3__at_p2(Line3 * self, double arg0, Vector3 * arg1) {
  return self->at(arg0, arg1);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Line3__closestPointToPoint_p3(Line3 * self, Vector3 * arg0, bool arg1, Vector3 * arg2) {
  return self->closestPointToPoint(arg0, arg1, arg2);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Line3__delta_p1(Line3 * self, Vector3 * arg0) {
  return self->delta(arg0);
}
Line3* __attribute__((used, noinline)) emscripten_bind_Line3__copy_p1(Line3 * self, Line3 * arg0) {
  return self->copy(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Line3__distanceSquared_p0(Line3 * self) {
  return self->distanceSquared();
}
bool __attribute__((used, noinline)) emscripten_bind_Vertex__instanceOf_p1(Vertex * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Vertex____destroy___p0(Vertex * self) {
  delete self;
}
Vertex * __attribute__((used, noinline)) emscripten_bind_Vertex__Vertex_p0() {
  return new Vertex();
}
bool __attribute__((used, noinline)) emscripten_bind_Spline__instanceOf_p1(Spline * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Spline____destroy___p0(Spline * self) {
  delete self;
}
Spline * __attribute__((used, noinline)) emscripten_bind_Spline__Spline_p0() {
  return new Spline();
}
bool __attribute__((used, noinline)) emscripten_bind_Sphere__instanceOf_p1(Sphere * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Sphere____destroy___p0(Sphere * self) {
  delete self;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Sphere__getCenter_p0(Sphere * self) {
  return self->getCenter();
}
Sphere * __attribute__((used, noinline)) emscripten_bind_Sphere__Sphere_p0() {
  return new Sphere();
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Sphere__get_center_p0(Sphere * self) {
  return self->center;
}
void __attribute__((used, noinline)) emscripten_bind_Sphere__set_radius_p1(Sphere * self, double arg0) {
  self->radius = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Sphere__get_radius_p0(Sphere * self) {
  return self->radius;
}
void __attribute__((used, noinline)) emscripten_bind_Sphere__set_center_p1(Sphere * self, Vector3 * arg0) {
  self->center = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Quaternion__instanceOf_p1(Quaternion * self, int arg0) {
  return self->instanceOf(arg0);
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__set_p4(Quaternion * self, double arg0, double arg1, double arg2, double arg3) {
  return self->set(arg0, arg1, arg2, arg3);
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__setFromAxisAngle_p2(Quaternion * self, Vector3 * arg0, double arg1) {
  return self->setFromAxisAngle(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__get_y_p0(Quaternion * self) {
  return self->y;
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__get_z_p0(Quaternion * self) {
  return self->z;
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__get_w_p0(Quaternion * self) {
  return self->w;
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__conjugate_p0(Quaternion * self) {
  return self->conjugate();
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__get_x_p0(Quaternion * self) {
  return self->x;
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__normalize_p0(Quaternion * self) {
  return self->normalize();
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__slerp_p2(Quaternion * self, Quaternion * arg0, double arg1) {
  return self->slerp(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Quaternion__set_z_p1(Quaternion * self, double arg0) {
  self->z = arg0;
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__inverse_p0(Quaternion * self) {
  return self->inverse();
}
void __attribute__((used, noinline)) emscripten_bind_Quaternion__set_w_p1(Quaternion * self, double arg0) {
  self->w = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Quaternion__Quaternion_p0() {
  return new Quaternion();
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Quaternion__Quaternion_p4(double arg0, double arg1, double arg2, double arg3) {
  return new Quaternion(arg0, arg1, arg2, arg3);
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__multiplyQuaternions_p2(Quaternion * self, Quaternion * arg0, Quaternion * arg1) {
  return self->multiplyQuaternions(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Quaternion__set_x_p1(Quaternion * self, double arg0) {
  self->x = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__lengthSquared_p0(Quaternion * self) {
  return self->lengthSquared();
}
void __attribute__((used, noinline)) emscripten_bind_Quaternion__set_y_p1(Quaternion * self, double arg0) {
  self->y = arg0;
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__clone_p0(Quaternion * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Quaternion__equals_p1(Quaternion * self, Quaternion * arg0) {
  return self->equals(arg0);
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__copy_p1(Quaternion * self, Quaternion * arg0) {
  return self->copy(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Quaternion____destroy___p0(Quaternion * self) {
  delete self;
}
double __attribute__((used, noinline)) emscripten_bind_Quaternion__length_p0(Quaternion * self) {
  return self->length();
}
Quaternion* __attribute__((used, noinline)) emscripten_bind_Quaternion__setFromRotationMatrix_p1(Quaternion * self, Matrix4 * arg0) {
  return self->setFromRotationMatrix(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Plane__instanceOf_p1(Plane * self, int arg0) {
  return self->instanceOf(arg0);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__set_p2(Plane * self, Vector3 * arg0, double arg1) {
  return self->set(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Plane__set_normal_p1(Plane * self, Vector3 * arg0) {
  self->normal = arg0;
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__applyMatrix4_p1(Plane * self, Matrix4 * arg0) {
  return self->applyMatrix4(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Plane__orthoPoint_p1(Plane * self, Vector3 * arg0) {
  return self->orthoPoint(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Plane__coplanerPoint_p0(Plane * self) {
  return self->coplanerPoint();
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2(Plane * self, Vector3 * arg0, Vector3 * arg1) {
  return self->setFromNormalAndCoplanerPoint(arg0, arg1);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__negate_p0(Plane * self) {
  return self->negate();
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__normalize_p0(Plane * self) {
  return self->normalize();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Plane__intersectLine_p1(Plane * self, Line3 * arg0) {
  return self->intersectLine(arg0);
}
Plane * __attribute__((used, noinline)) emscripten_bind_Plane__Plane_p0() {
  return new Plane();
}
Plane * __attribute__((used, noinline)) emscripten_bind_Plane__Plane_p2(Vector3 * arg0, double arg1) {
  return new Plane(arg0, arg1);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Plane__projectPoint_p1(Plane * self, Vector3 * arg0) {
  return self->projectPoint(arg0);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__translate_p1(Plane * self, Vector3 * arg0) {
  return self->translate(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Plane__get_normal_p0(Plane * self) {
  return self->normal;
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__clone_p0(Plane * self) {
  return self->clone();
}
double __attribute__((used, noinline)) emscripten_bind_Plane__get_constant_p0(Plane * self) {
  return self->constant;
}
bool __attribute__((used, noinline)) emscripten_bind_Plane__equals_p1(Plane * self, Plane * arg0) {
  return self->equals(arg0);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__setComponents_p4(Plane * self, double arg0, double arg1, double arg2, double arg3) {
  return self->setComponents(arg0, arg1, arg2, arg3);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__setFromCoplanerPoints_p3(Plane * self, Vector3 * arg0, Vector3 * arg1, Vector3 * arg2) {
  return self->setFromCoplanerPoints(arg0, arg1, arg2);
}
Plane* __attribute__((used, noinline)) emscripten_bind_Plane__copy_p1(Plane * self, Plane * arg0) {
  return self->copy(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Plane____destroy___p0(Plane * self) {
  delete self;
}
bool __attribute__((used, noinline)) emscripten_bind_Plane__isIntersectionLine_p1(Plane * self, Line3 * arg0) {
  return self->isIntersectionLine(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Plane__distanceToSphere_p1(Plane * self, Sphere * arg0) {
  return self->distanceToSphere(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Plane__distanceToPoint_p1(Plane * self, Vector3 * arg0) {
  return self->distanceToPoint(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Plane__set_constant_p1(Plane * self, double arg0) {
  self->constant = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__instanceOf_p1(Box3 * self, int arg0) {
  return self->instanceOf(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__set_p2(Box3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->set(arg0, arg1);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__applyMatrix4_p1(Box3 * self, Matrix4 * arg0) {
  return self->applyMatrix4(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__expandByPoint_p1(Box3 * self, Vector3 * arg0) {
  return self->expandByPoint(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Box3__clampPoint_p2(Box3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->clampPoint(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__isIntersectionBox_p1(Box3 * self, Box3 * arg0) {
  return self->isIntersectionBox(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__setFromPoints_p1(Box3 * self, void * * arg0) {
  return self->setFromPoints(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Box3__size_p1(Box3 * self, Vector3 * arg0) {
  return self->size(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Box3__get_max_p0(Box3 * self) {
  return self->max;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Box3__getParameter_p1(Box3 * self, Vector3 * arg0) {
  return self->getParameter(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__expandByScalar_p1(Box3 * self, double arg0) {
  return self->expandByScalar(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__intersect_p1(Box3 * self, Box3 * arg0) {
  return self->intersect(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__containsBox_p1(Box3 * self, Box3 * arg0) {
  return self->containsBox(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__translate_p1(Box3 * self, Vector3 * arg0) {
  return self->translate(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__empty_p0(Box3 * self) {
  return self->empty();
}
void __attribute__((used, noinline)) emscripten_bind_Box3__set_min_p1(Box3 * self, Vector3 * arg0) {
  self->min = arg0;
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__clone_p0(Box3 * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__equals_p1(Box3 * self, Box3 * arg0) {
  return self->equals(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Box3__get_min_p0(Box3 * self) {
  return self->min;
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__expandByVector_p1(Box3 * self, Vector3 * arg0) {
  return self->expandByVector(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__copy_p1(Box3 * self, Box3 * arg0) {
  return self->copy(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__makeEmpty_p0(Box3 * self) {
  return self->makeEmpty();
}
void __attribute__((used, noinline)) emscripten_bind_Box3____destroy___p0(Box3 * self) {
  delete self;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Box3__center_p1(Box3 * self, Vector3 * arg0) {
  return self->center(arg0);
}
Sphere* __attribute__((used, noinline)) emscripten_bind_Box3__getBoundingSphere_p1(Box3 * self, Sphere * arg0) {
  return self->getBoundingSphere(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Box3__set_max_p1(Box3 * self, Vector3 * arg0) {
  self->max = arg0;
}
Box3 * __attribute__((used, noinline)) emscripten_bind_Box3__Box3_p0() {
  return new Box3();
}
Box3 * __attribute__((used, noinline)) emscripten_bind_Box3__Box3_p2(Vector3 * arg0, Vector3 * arg1) {
  return new Box3(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_Box3__distanceToPoint_p1(Box3 * self, Vector3 * arg0) {
  return self->distanceToPoint(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Box3__containsPoint_p1(Box3 * self, Vector3 * arg0) {
  return self->containsPoint(arg0);
}
Box3* __attribute__((used, noinline)) emscripten_bind_Box3__setFromCenterAndSize_p2(Box3 * self, Vector3 * arg0, Vector3 * arg1) {
  return self->setFromCenterAndSize(arg0, arg1);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__clone_p0(Matrix4 * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Matrix4__instanceOf_p1(Matrix4 * self, int arg0) {
  return self->instanceOf(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__set_p16(Matrix4 * self, const double arg0, const double arg1, const double arg2, const double arg3, const double arg4, const double arg5, const double arg6, const double arg7, const double arg8, const double arg9, const double arg10, const double arg11, const double arg12, const double arg13, const double arg14, const double arg15) {
  return self->set(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__extractRotation_p1(Matrix4 * self, Matrix4 * arg0) {
  return self->extractRotation(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__lookAt_p3(Matrix4 * self, Vector3 * arg0, Vector3 * arg1, Vector3 * arg2) {
  return self->lookAt(arg0, arg1, arg2);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeScale_p3(Matrix4 * self, double arg0, double arg1, double arg2) {
  return self->makeScale(arg0, arg1, arg2);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__scale_p1(Matrix4 * self, Vector3 * arg0) {
  return self->scale(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeTranslation_p3(Matrix4 * self, double arg0, double arg1, double arg2) {
  return self->makeTranslation(arg0, arg1, arg2);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__rotateByAxis_p2(Matrix4 * self, Vector3 * arg0, double arg1) {
  return self->rotateByAxis(arg0, arg1);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__invert_p0(Matrix4 * self) {
  return self->invert();
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__rotateX_p1(Matrix4 * self, double arg0) {
  return self->rotateX(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__rotateY_p1(Matrix4 * self, double arg0) {
  return self->rotateY(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__rotateZ_p1(Matrix4 * self, double arg0) {
  return self->rotateZ(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__multiplyMatrices_p2(Matrix4 * self, Matrix4 * arg0, Matrix4 * arg1) {
  return self->multiplyMatrices(arg0, arg1);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__setRotationFromQuaternion_p1(Matrix4 * self, Quaternion * arg0) {
  return self->setRotationFromQuaternion(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__multiplyToArray_p3(Matrix4 * self, Matrix4 * arg0, Matrix4 * arg1, double * arg2) {
  return self->multiplyToArray(arg0, arg1, arg2);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__getInverse_p1(Matrix4 * self, Matrix4 * arg0) {
  return self->getInverse(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__translate_p1(Matrix4 * self, Vector3 * arg0) {
  return self->translate(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeRotationY_p1(Matrix4 * self, double arg0) {
  return self->makeRotationY(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeRotationX_p1(Matrix4 * self, double arg0) {
  return self->makeRotationX(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeRotationZ_p1(Matrix4 * self, double arg0) {
  return self->makeRotationZ(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeOrthographic_p6(Matrix4 * self, double arg0, double arg1, double arg2, double arg3, double arg4, double arg5) {
  return self->makeOrthographic(arg0, arg1, arg2, arg3, arg4, arg5);
}
double __attribute__((used, noinline)) emscripten_bind_Matrix4__determinant_p0(Matrix4 * self) {
  return self->determinant();
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeRotationAxis_p2(Matrix4 * self, Vector3 * arg0, double arg1) {
  return self->makeRotationAxis(arg0, arg1);
}
Vector4* __attribute__((used, noinline)) emscripten_bind_Matrix4__crossVector_p1(Matrix4 * self, Vector4 * arg0) {
  return self->crossVector(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Matrix4____destroy___p0(Matrix4 * self) {
  delete self;
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__multiplyScalar_p1(Matrix4 * self, double arg0) {
  return self->multiplyScalar(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__transpose_p0(Matrix4 * self) {
  return self->transpose();
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__extractPosition_p1(Matrix4 * self, Matrix4 * arg0) {
  return self->extractPosition(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makeFrustum_p6(Matrix4 * self, double arg0, double arg1, double arg2, double arg3, double arg4, double arg5) {
  return self->makeFrustum(arg0, arg1, arg2, arg3, arg4, arg5);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__setPosition_p1(Matrix4 * self, Vector3 * arg0) {
  return self->setPosition(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__copy_p1(Matrix4 * self, Matrix4 * arg0) {
  return self->copy(arg0);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__identity_p0(Matrix4 * self) {
  return self->identity();
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__compose_p3(Matrix4 * self, Vector3 * arg0, Quaternion * arg1, Vector3 * arg2) {
  return self->compose(arg0, arg1, arg2);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__setRotationFromEuler_p2(Matrix4 * self, Vector3 * arg0, char * arg1) {
  return self->setRotationFromEuler(arg0, arg1);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__makePerspective_p4(Matrix4 * self, double arg0, double arg1, double arg2, double arg3) {
  return self->makePerspective(arg0, arg1, arg2, arg3);
}
double __attribute__((used, noinline)) emscripten_bind_Matrix4__getMaxScaleOnAxis_p0(Matrix4 * self) {
  return self->getMaxScaleOnAxis();
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Matrix4__Matrix4_p0() {
  return new Matrix4();
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Matrix4__Matrix4_p16(const double arg0, const double arg1, const double arg2, const double arg3, const double arg4, const double arg5, const double arg6, const double arg7, const double arg8, const double arg9, const double arg10, const double arg11, const double arg12, const double arg13, const double arg14, const double arg15) {
  return new Matrix4(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
}
Matrix4* __attribute__((used, noinline)) emscripten_bind_Matrix4__decompose_p3(Matrix4 * self, Vector3 * arg0, Quaternion * arg1, Vector3 * arg2) {
  return self->decompose(arg0, arg1, arg2);
}
bool __attribute__((used, noinline)) emscripten_bind_Ray__instanceOf_p1(Ray * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Ray____destroy___p0(Ray * self) {
  delete self;
}
Ray * __attribute__((used, noinline)) emscripten_bind_Ray__Ray_p0() {
  return new Ray();
}
Ray * __attribute__((used, noinline)) emscripten_bind_Ray__Ray_p2(Vector3 * arg0, Vector3 * arg1) {
  return new Ray(arg0, arg1);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__clone_p0(Matrix3 * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Matrix3__instanceOf_p1(Matrix3 * self, int arg0) {
  return self->instanceOf(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_Matrix3__determinant_p0(Matrix3 * self) {
  return self->determinant();
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__set_p9(Matrix3 * self, const double arg0, const double arg1, const double arg2, const double arg3, const double arg4, const double arg5, const double arg6, const double arg7, const double arg8) {
  return self->set(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
}
void __attribute__((used, noinline)) emscripten_bind_Matrix3____destroy___p0(Matrix3 * self) {
  delete self;
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__multiplyScalar_p1(Matrix3 * self, double arg0) {
  return self->multiplyScalar(arg0);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__transpose_p0(Matrix3 * self) {
  return self->transpose();
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__transposeIntoArray_p1(Matrix3 * self, double * arg0) {
  return self->transposeIntoArray(arg0);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__getNormalMatrix_p1(Matrix3 * self, Matrix4 * arg0) {
  return self->getNormalMatrix(arg0);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__getInverse_p1(Matrix3 * self, Matrix4 * arg0) {
  return self->getInverse(arg0);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__copy_p1(Matrix3 * self, Matrix3 * arg0) {
  return self->copy(arg0);
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Matrix3__Matrix3_p0() {
  return new Matrix3();
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Matrix3__Matrix3_p9(const double arg0, const double arg1, const double arg2, const double arg3, const double arg4, const double arg5, const double arg6, const double arg7, const double arg8) {
  return new Matrix3(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
}
Matrix3* __attribute__((used, noinline)) emscripten_bind_Matrix3__identity_p0(Matrix3 * self) {
  return self->identity();
}
double __attribute__((used, noinline)) emscripten_bind_MATH__clamp_p3(double arg0, double arg1, double arg2) {
  return MATH::clamp(arg0, arg1, arg2);
}
void __attribute__((used, noinline)) emscripten_bind_MATH____destroy___p0(MATH * self) {
  delete self;
}
double __attribute__((used, noinline)) emscripten_bind_MATH__randDoubleSpread_p1(double arg0) {
  return MATH::randDoubleSpread(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_MATH__randInt_p2(int arg0, int arg1) {
  return MATH::randInt(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__random16_p0() {
  return MATH::random16();
}
double __attribute__((used, noinline)) emscripten_bind_MATH__smoothstep_p3(double arg0, double arg1, double arg2) {
  return MATH::smoothstep(arg0, arg1, arg2);
}
int __attribute__((used, noinline)) emscripten_bind_MATH__sign_p1(int arg0) {
  return MATH::sign(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__radToDeg_p1(double arg0) {
  return MATH::radToDeg(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__degToRad_p1(double arg0) {
  return MATH::degToRad(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__randDouble_p2(double arg0, double arg1) {
  return MATH::randDouble(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__clampBottom_p2(double arg0, double arg1) {
  return MATH::clampBottom(arg0, arg1);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__mapLinear_p5(double arg0, double arg1, double arg2, double arg3, double arg4) {
  return MATH::mapLinear(arg0, arg1, arg2, arg3, arg4);
}
double __attribute__((used, noinline)) emscripten_bind_MATH__smootherstep_p3(double arg0, double arg1, double arg2) {
  return MATH::smootherstep(arg0, arg1, arg2);
}
MATH * __attribute__((used, noinline)) emscripten_bind_MATH__MATH_p0() {
  return new MATH();
}
bool __attribute__((used, noinline)) emscripten_bind_Box2__instanceOf_p1(Box2 * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Box2____destroy___p0(Box2 * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Box2__set_min_p1(Box2 * self, Vector2 * arg0) {
  self->min = arg0;
}
Vector2 * __attribute__((used, noinline)) emscripten_bind_Box2__get_max_p0(Box2 * self) {
  return self->max;
}
void __attribute__((used, noinline)) emscripten_bind_Box2__set_max_p1(Box2 * self, Vector2 * arg0) {
  self->max = arg0;
}
Vector2 * __attribute__((used, noinline)) emscripten_bind_Box2__get_min_p0(Box2 * self) {
  return self->min;
}
Box2 * __attribute__((used, noinline)) emscripten_bind_Box2__Box2_p0() {
  return new Box2();
}
Box2 * __attribute__((used, noinline)) emscripten_bind_Box2__Box2_p2(Vector2 * arg0, Vector2 * arg1) {
  return new Box2(arg0, arg1);
}

}
