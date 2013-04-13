#include <stdio.h> 
#include "Four.bindings.fixed.h"
extern "C" {

bool __attribute__((used, noinline)) emscripten_bind_Projector__instanceOf_p1(Projector * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Projector____destroy___p0(Projector * self) {
  delete self;
}
Projector * __attribute__((used, noinline)) emscripten_bind_Projector__Projector_p0() {
  return new Projector();
}
bool __attribute__((used, noinline)) emscripten_bind_MeshLambertMaterial__instanceOf_p1(MeshLambertMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MeshLambertMaterial____destroy___p0(MeshLambertMaterial * self) {
  delete self;
}
MeshLambertMaterial * __attribute__((used, noinline)) emscripten_bind_MeshLambertMaterial__MeshLambertMaterial_p0() {
  return new MeshLambertMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Clock__instanceOf_p1(Clock * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Clock____destroy___p0(Clock * self) {
  delete self;
}
double __attribute__((used, noinline)) emscripten_bind_Clock__getDelta_p0(Clock * self) {
  return self->getDelta();
}
void __attribute__((used, noinline)) emscripten_bind_Clock__start_p0(Clock * self) {
  self->start();
}
Clock * __attribute__((used, noinline)) emscripten_bind_Clock__Clock_p0() {
  return new Clock();
}
Clock * __attribute__((used, noinline)) emscripten_bind_Clock__Clock_p1(bool arg0) {
  return new Clock(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Clock__stop_p0(Clock * self) {
  self->stop();
}
double __attribute__((used, noinline)) emscripten_bind_Clock__getElapsedTime_p0(Clock * self) {
  return self->getElapsedTime();
}
bool __attribute__((used, noinline)) emscripten_bind_Clock__running_p0(Clock * self) {
  return self->running();
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
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__instanceOf_p1(HemisphereLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_material_p0(HemisphereLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_scale_p1(HemisphereLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_receiveShadow_p0(HemisphereLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_renderDepth_p1(HemisphereLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_matrixWorld_p0(HemisphereLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_matrixRotationWorld_p1(HemisphereLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_matrixWorldNeedsUpdate_p1(HemisphereLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_orientation_p0(HemisphereLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_castShadow_p1(HemisphereLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_target_p0(HemisphereLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__add_p1(HemisphereLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_rotation_p0(HemisphereLight * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__translateX_p1(HemisphereLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__translateY_p1(HemisphereLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__translateZ_p1(HemisphereLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get__modelViewMatrix_p0(HemisphereLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_matrixWorldNeedsUpdate_p0(HemisphereLight * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_renderDepth_p0(HemisphereLight * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_up_p0(HemisphereLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_matrix_p0(HemisphereLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_name_p0(HemisphereLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_geometry_p1(HemisphereLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_color_p1(HemisphereLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_forceAccum_p1(HemisphereLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight____removeObject_p1(HemisphereLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__traverse_p1(HemisphereLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_acceleration_p1(HemisphereLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_useQuaternion_p0(HemisphereLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_torqueAccum_p0(HemisphereLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__lookAt_p1(HemisphereLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__remove_p1(HemisphereLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_orientation_p1(HemisphereLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set___webglActive_p1(HemisphereLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__hasParent_p0(HemisphereLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_target_p1(HemisphereLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_matrixWorld_p1(HemisphereLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_matrix_p1(HemisphereLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_sortParticles_p1(HemisphereLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_rotationAutoUpdate_p1(HemisphereLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_visible_p1(HemisphereLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get__normalMatrix_p0(HemisphereLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_id_p1(HemisphereLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_matrixRotationWorld_p0(HemisphereLight * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_matrixAutoUpdate_p1(HemisphereLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_up_p1(HemisphereLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_velocity_p0(HemisphereLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__localToWorld_p1(HemisphereLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_scale_p0(HemisphereLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_geometry_p0(HemisphereLight * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__translate_p2(HemisphereLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_parent_p1(HemisphereLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_receiveShadow_p1(HemisphereLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_parent_p0(HemisphereLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_forceAccum_p0(HemisphereLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_id_p0(HemisphereLight * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__updateMatrixWorld_p0(HemisphereLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__updateMatrixWorld_p1(HemisphereLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_rotation_p1(HemisphereLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_material_p1(HemisphereLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set__modelViewMatrix_p1(HemisphereLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_sortParticles_p0(HemisphereLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get___webglInit_p0(HemisphereLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__applyMatrix_p1(HemisphereLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_color_p0(HemisphereLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_castShadow_p0(HemisphereLight * self) {
  return self->castShadow;
}
HemisphereLight * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__HemisphereLight_p1(unsigned int arg0) {
  return new HemisphereLight(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_rotationAutoUpdate_p0(HemisphereLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_position_p1(HemisphereLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_velocity_p1(HemisphereLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_acceleration_p0(HemisphereLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get___webglActive_p0(HemisphereLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__updateMatrix_p0(HemisphereLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set__normalMatrix_p1(HemisphereLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_frustumCulled_p0(HemisphereLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_frustumCulled_p1(HemisphereLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_position_p0(HemisphereLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set___webglInit_p1(HemisphereLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__clone_p0(HemisphereLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_visible_p0(HemisphereLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_useQuaternion_p1(HemisphereLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_HemisphereLight__get_matrixAutoUpdate_p0(HemisphereLight * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_HemisphereLight__worldToLocal_p1(HemisphereLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight____destroy___p0(HemisphereLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_name_p1(HemisphereLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight____addObject_p1(HemisphereLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_HemisphereLight__set_torqueAccum_p1(HemisphereLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
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
void __attribute__((used, noinline)) emscripten_bind_Texture____destroy___p0(Texture * self) {
  delete self;
}
Texture * __attribute__((used, noinline)) emscripten_bind_Texture__Texture_p0() {
  return new Texture();
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__instanceOf_p1(Scene * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_Scene__get_material_p0(Scene * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_scale_p1(Scene * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_receiveShadow_p0(Scene * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_renderDepth_p1(Scene * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Scene__get_matrixWorld_p0(Scene * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_matrixRotationWorld_p1(Scene * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_matrixWorldNeedsUpdate_p1(Scene * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Scene__get_orientation_p0(Scene * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_castShadow_p1(Scene * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Scene__get_target_p0(Scene * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__add_p1(Scene * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_rotation_p0(Scene * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__translateX_p1(Scene * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__translateY_p1(Scene * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__translateZ_p1(Scene * self, double arg0) {
  return self->translateZ(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_Scene__get_overrideMaterial_p0(Scene * self) {
  return self->overrideMaterial;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Scene__get__modelViewMatrix_p0(Scene * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_matrixWorldNeedsUpdate_p0(Scene * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_Scene__get_renderDepth_p0(Scene * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_up_p0(Scene * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Scene__get_matrix_p0(Scene * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_Scene__get_name_p0(Scene * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_geometry_p1(Scene * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_forceAccum_p1(Scene * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene____removeObject_p1(Scene * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_matrixAutoUpdate_p1(Scene * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_acceleration_p1(Scene * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_useQuaternion_p0(Scene * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_torqueAccum_p0(Scene * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__lookAt_p1(Scene * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__remove_p1(Scene * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_orientation_p1(Scene * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set___webglActive_p1(Scene * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__hasParent_p0(Scene * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_target_p1(Scene * self, Object3D * arg0) {
  self->target = arg0;
}
Fog * __attribute__((used, noinline)) emscripten_bind_Scene__get_fog_p0(Scene * self) {
  return self->fog;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_matrixWorld_p1(Scene * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_matrix_p1(Scene * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_sortParticles_p1(Scene * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_rotationAutoUpdate_p1(Scene * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_visible_p1(Scene * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Scene__get__normalMatrix_p0(Scene * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_id_p1(Scene * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Scene__get_matrixRotationWorld_p0(Scene * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__traverse_p1(Scene * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_up_p1(Scene * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_velocity_p0(Scene * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Scene__localToWorld_p1(Scene * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_scale_p0(Scene * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Scene__get_geometry_p0(Scene * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__translate_p2(Scene * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get___webglInit_p0(Scene * self) {
  return self->__webglInit;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_receiveShadow_p1(Scene * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Scene__get_parent_p0(Scene * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_forceAccum_p0(Scene * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_Scene__get_id_p0(Scene * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__updateMatrixWorld_p0(Scene * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_Scene__updateMatrixWorld_p1(Scene * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_rotation_p1(Scene * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_material_p1(Scene * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set__modelViewMatrix_p1(Scene * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_sortParticles_p0(Scene * self) {
  return self->sortParticles;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_parent_p1(Scene * self, Object3D * arg0) {
  self->parent = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__applyMatrix_p1(Scene * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_castShadow_p0(Scene * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_rotationAutoUpdate_p0(Scene * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_position_p1(Scene * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_velocity_p1(Scene * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_acceleration_p0(Scene * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get___webglActive_p0(Scene * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__updateMatrix_p0(Scene * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set__normalMatrix_p1(Scene * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_frustumCulled_p0(Scene * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_fog_p1(Scene * self, Fog * arg0) {
  self->fog = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_frustumCulled_p1(Scene * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Scene__get_position_p0(Scene * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set___webglInit_p1(Scene * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Scene__clone_p0(Scene * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_visible_p0(Scene * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_useQuaternion_p1(Scene * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Scene__get_matrixAutoUpdate_p0(Scene * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Scene__worldToLocal_p1(Scene * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene____destroy___p0(Scene * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_name_p1(Scene * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Scene____addObject_p1(Scene * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_torqueAccum_p1(Scene * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
Scene * __attribute__((used, noinline)) emscripten_bind_Scene__Scene_p0() {
  return new Scene();
}
void __attribute__((used, noinline)) emscripten_bind_Scene__set_overrideMaterial_p1(Scene * self, Material * arg0) {
  self->overrideMaterial = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__instanceOf_p1(Object3D * self, int arg0) {
  return self->instanceOf(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_useQuaternion_p0(Object3D * self) {
  return self->useQuaternion;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__traverse_p1(Object3D * self, int arg0) {
  self->traverse(arg0);
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Object3D__get_geometry_p0(Object3D * self) {
  return self->geometry;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_matrixAutoUpdate_p1(Object3D * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_acceleration_p1(Object3D * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_castShadow_p0(Object3D * self) {
  return self->castShadow;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_matrixRotationWorld_p0(Object3D * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_scale_p1(Object3D * self, Vector3 * arg0) {
  self->scale = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_matrixWorldNeedsUpdate_p1(Object3D * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_matrixWorldNeedsUpdate_p0(Object3D * self) {
  return self->matrixWorldNeedsUpdate;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_torqueAccum_p0(Object3D * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_up_p1(Object3D * self, Vector3 * arg0) {
  self->up = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_sortParticles_p0(Object3D * self) {
  return self->sortParticles;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Object3D__Object3D_p0() {
  return new Object3D();
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_renderDepth_p1(Object3D * self, int arg0) {
  self->renderDepth = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_receiveShadow_p1(Object3D * self, bool arg0) {
  self->receiveShadow = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__lookAt_p1(Object3D * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
char * __attribute__((used, noinline)) emscripten_bind_Object3D__get_name_p0(Object3D * self) {
  return self->name;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_velocity_p0(Object3D * self) {
  return self->velocity;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_frustumCulled_p1(Object3D * self, bool arg0) {
  self->frustumCulled = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_position_p1(Object3D * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_geometry_p1(Object3D * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_orientation_p1(Object3D * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_matrixWorld_p1(Object3D * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set___webglActive_p1(Object3D * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__hasParent_p0(Object3D * self) {
  return self->hasParent();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Object3D__localToWorld_p1(Object3D * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_matrixWorld_p0(Object3D * self) {
  return self->matrixWorld;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_position_p0(Object3D * self) {
  return self->position;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_scale_p0(Object3D * self) {
  return self->scale;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_rotationAutoUpdate_p0(Object3D * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_target_p1(Object3D * self, Object3D * arg0) {
  self->target = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_acceleration_p0(Object3D * self) {
  return self->acceleration;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_castShadow_p1(Object3D * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Object3D__get_target_p0(Object3D * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__add_p1(Object3D * self, Object3D * arg0) {
  self->add(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get___webglActive_p0(Object3D * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__updateMatrix_p0(Object3D * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set__normalMatrix_p1(Object3D * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Object3D__get__modelViewMatrix_p0(Object3D * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_frustumCulled_p0(Object3D * self) {
  return self->frustumCulled;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__translate_p2(Object3D * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get___webglInit_p0(Object3D * self) {
  return self->__webglInit;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_rotation_p0(Object3D * self) {
  return self->rotation;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D____destroy___p0(Object3D * self) {
  delete self;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_receiveShadow_p0(Object3D * self) {
  return self->receiveShadow;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__translateX_p1(Object3D * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__translateY_p1(Object3D * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__translateZ_p1(Object3D * self, double arg0) {
  return self->translateZ(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_rotationAutoUpdate_p1(Object3D * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set___webglInit_p1(Object3D * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__clone_p0(Object3D * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_useQuaternion_p1(Object3D * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_visible_p0(Object3D * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_velocity_p1(Object3D * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Object3D__get_parent_p0(Object3D * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_forceAccum_p0(Object3D * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_Object3D__get_id_p0(Object3D * self) {
  return self->id;
}
int __attribute__((used, noinline)) emscripten_bind_Object3D__get_renderDepth_p0(Object3D * self) {
  return self->renderDepth;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__updateMatrixWorld_p0(Object3D * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__updateMatrixWorld_p1(Object3D * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Object3D__get_matrixAutoUpdate_p0(Object3D * self) {
  return self->matrixAutoUpdate;
}
Material * __attribute__((used, noinline)) emscripten_bind_Object3D__get_material_p0(Object3D * self) {
  return self->material;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_matrix_p0(Object3D * self) {
  return self->matrix;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Object3D__worldToLocal_p1(Object3D * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set__modelViewMatrix_p1(Object3D * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_rotation_p1(Object3D * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_name_p1(Object3D * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_material_p1(Object3D * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D____addObject_p1(Object3D * self, Object3D * arg0) {
  self->__addObject(arg0);
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Object3D__get_orientation_p0(Object3D * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_visible_p1(Object3D * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get__normalMatrix_p0(Object3D * self) {
  return self->_normalMatrix;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Object3D__get_up_p0(Object3D * self) {
  return self->up;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__remove_p1(Object3D * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_parent_p1(Object3D * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_matrix_p1(Object3D * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_matrixRotationWorld_p1(Object3D * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Object3D__applyMatrix_p1(Object3D * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_sortParticles_p1(Object3D * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_torqueAccum_p1(Object3D * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_forceAccum_p1(Object3D * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Object3D____removeObject_p1(Object3D * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Object3D__set_id_p1(Object3D * self, int arg0) {
  self->id = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__instanceOf_p1(Camera * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_Camera__get_material_p0(Camera * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_scale_p1(Camera * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_receiveShadow_p0(Camera * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_renderDepth_p1(Camera * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_matrixWorld_p0(Camera * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrixRotationWorld_p1(Camera * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrixWorldNeedsUpdate_p1(Camera * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Camera__get_orientation_p0(Camera * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_castShadow_p1(Camera * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Camera__get_target_p0(Camera * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__add_p1(Camera * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_rotation_p0(Camera * self) {
  return self->rotation;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_projectionMatrix_p0(Camera * self) {
  return self->projectionMatrix;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__translateX_p1(Camera * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__translateY_p1(Camera * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__translateZ_p1(Camera * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get__modelViewMatrix_p0(Camera * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_matrixWorldNeedsUpdate_p0(Camera * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_Camera__get_renderDepth_p0(Camera * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_up_p0(Camera * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_matrix_p0(Camera * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_Camera__get_name_p0(Camera * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_geometry_p1(Camera * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrixWorld_p1(Camera * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera____removeObject_p1(Camera * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__traverse_p1(Camera * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_acceleration_p1(Camera * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_useQuaternion_p0(Camera * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_torqueAccum_p0(Camera * self) {
  return self->torqueAccum;
}
Camera * __attribute__((used, noinline)) emscripten_bind_Camera__Camera_p0() {
  return new Camera();
}
void __attribute__((used, noinline)) emscripten_bind_Camera__lookAt_p1(Camera * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__remove_p1(Camera * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_orientation_p1(Camera * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set___webglActive_p1(Camera * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__hasParent_p0(Camera * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_target_p1(Camera * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_projectionMatrixInverse_p1(Camera * self, Matrix4 * arg0) {
  self->projectionMatrixInverse = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_projectionMatrix_p1(Camera * self, Matrix4 * arg0) {
  self->projectionMatrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrix_p1(Camera * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_sortParticles_p1(Camera * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_rotationAutoUpdate_p1(Camera * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_forceAccum_p1(Camera * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_visible_p1(Camera * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Camera__get__normalMatrix_p0(Camera * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_id_p1(Camera * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_matrixRotationWorld_p0(Camera * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrixAutoUpdate_p1(Camera * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_up_p1(Camera * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_velocity_p0(Camera * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Camera__localToWorld_p1(Camera * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_scale_p0(Camera * self) {
  return self->scale;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_projectionMatrixInverse_p0(Camera * self) {
  return self->projectionMatrixInverse;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Camera__get_geometry_p0(Camera * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__translate_p2(Camera * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get___webglInit_p0(Camera * self) {
  return self->__webglInit;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_receiveShadow_p1(Camera * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Camera__get_parent_p0(Camera * self) {
  return self->parent;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_matrixWorldInverse_p1(Camera * self, Matrix4 * arg0) {
  self->matrixWorldInverse = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_forceAccum_p0(Camera * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_Camera__get_id_p0(Camera * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__updateMatrixWorld_p0(Camera * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_Camera__updateMatrixWorld_p1(Camera * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_rotation_p1(Camera * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_material_p1(Camera * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set__modelViewMatrix_p1(Camera * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_sortParticles_p0(Camera * self) {
  return self->sortParticles;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_parent_p1(Camera * self, Object3D * arg0) {
  self->parent = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__applyMatrix_p1(Camera * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_castShadow_p0(Camera * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_rotationAutoUpdate_p0(Camera * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_position_p1(Camera * self, Vector3 * arg0) {
  self->position = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Camera__get_matrixWorldInverse_p0(Camera * self) {
  return self->matrixWorldInverse;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_velocity_p1(Camera * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_acceleration_p0(Camera * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get___webglActive_p0(Camera * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__updateMatrix_p0(Camera * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set__normalMatrix_p1(Camera * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_frustumCulled_p0(Camera * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_frustumCulled_p1(Camera * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Camera__get_position_p0(Camera * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set___webglInit_p1(Camera * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Camera__clone_p0(Camera * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_visible_p0(Camera * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_useQuaternion_p1(Camera * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Camera__get_matrixAutoUpdate_p0(Camera * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Camera__worldToLocal_p1(Camera * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera____destroy___p0(Camera * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_name_p1(Camera * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Camera____addObject_p1(Camera * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Camera__set_torqueAccum_p1(Camera * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MorphAnimMesh__instanceOf_p1(MorphAnimMesh * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MorphAnimMesh____destroy___p0(MorphAnimMesh * self) {
  delete self;
}
MorphAnimMesh * __attribute__((used, noinline)) emscripten_bind_MorphAnimMesh__MorphAnimMesh_p0() {
  return new MorphAnimMesh();
}
bool __attribute__((used, noinline)) emscripten_bind_ParticleBasicMaterial__instanceOf_p1(ParticleBasicMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_ParticleBasicMaterial____destroy___p0(ParticleBasicMaterial * self) {
  delete self;
}
ParticleBasicMaterial * __attribute__((used, noinline)) emscripten_bind_ParticleBasicMaterial__ParticleBasicMaterial_p0() {
  return new ParticleBasicMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Face3__instanceOf_p1(Face3 * self, int arg0) {
  return self->instanceOf(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_Face3__get_materialIndex_p0(Face3 * self) {
  return self->materialIndex;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_centroid_p1(Face3 * self, Vector3 * arg0) {
  self->centroid = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_normal_p1(Face3 * self, Vector3 * arg0) {
  self->normal = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face3____destroy___p0(Face3 * self) {
  delete self;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face3__get_centroid_p0(Face3 * self) {
  return self->centroid;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face3__get_normal_p0(Face3 * self) {
  return self->normal;
}
Face3* __attribute__((used, noinline)) emscripten_bind_Face3__clone_p0(Face3 * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_materialIndex_p1(Face3 * self, int arg0) {
  self->materialIndex = arg0;
}
Color * __attribute__((used, noinline)) emscripten_bind_Face3__get_color_p0(Face3 * self) {
  return self->color;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_color_p1(Face3 * self, Color * arg0) {
  self->color = arg0;
}
Face3 * __attribute__((used, noinline)) emscripten_bind_Face3__Face3_p0() {
  return new Face3();
}
Face3 * __attribute__((used, noinline)) emscripten_bind_Face3__Face3_p3(int arg0, int arg1, int arg2) {
  return new Face3(arg0, arg1, arg2);
}
Face3 * __attribute__((used, noinline)) emscripten_bind_Face3__Face3_p6(int arg0, int arg1, int arg2, Vector3 * arg3, Color * arg4, int arg5) {
  return new Face3(arg0, arg1, arg2, arg3, arg4, arg5);
}
int __attribute__((used, noinline)) emscripten_bind_Face3__get_d_p0(Face3 * self) {
  return self->d;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_a_p1(Face3 * self, int arg0) {
  self->a = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_b_p1(Face3 * self, int arg0) {
  self->b = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_c_p1(Face3 * self, int arg0) {
  self->c = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face3__set_d_p1(Face3 * self, int arg0) {
  self->d = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Face3__get_a_p0(Face3 * self) {
  return self->a;
}
int __attribute__((used, noinline)) emscripten_bind_Face3__get_b_p0(Face3 * self) {
  return self->b;
}
int __attribute__((used, noinline)) emscripten_bind_Face3__get_c_p0(Face3 * self) {
  return self->c;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__instanceOf_p1(Mesh * self, int arg0) {
  return self->instanceOf(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_useQuaternion_p0(Mesh * self) {
  return self->useQuaternion;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__traverse_p1(Mesh * self, int arg0) {
  self->traverse(arg0);
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Mesh__get_geometry_p0(Mesh * self) {
  return self->geometry;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_matrixAutoUpdate_p1(Mesh * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_acceleration_p1(Mesh * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_castShadow_p0(Mesh * self) {
  return self->castShadow;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_matrixRotationWorld_p0(Mesh * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_scale_p1(Mesh * self, Vector3 * arg0) {
  self->scale = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_matrixWorldNeedsUpdate_p1(Mesh * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_matrixWorldNeedsUpdate_p0(Mesh * self) {
  return self->matrixWorldNeedsUpdate;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_torqueAccum_p0(Mesh * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_up_p1(Mesh * self, Vector3 * arg0) {
  self->up = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_castShadow_p1(Mesh * self, bool arg0) {
  self->castShadow = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_renderDepth_p1(Mesh * self, int arg0) {
  self->renderDepth = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_receiveShadow_p1(Mesh * self, bool arg0) {
  self->receiveShadow = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__lookAt_p1(Mesh * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
char * __attribute__((used, noinline)) emscripten_bind_Mesh__get_name_p0(Mesh * self) {
  return self->name;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_velocity_p0(Mesh * self) {
  return self->velocity;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_frustumCulled_p1(Mesh * self, bool arg0) {
  self->frustumCulled = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_position_p1(Mesh * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_geometry_p1(Mesh * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_orientation_p1(Mesh * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_matrixWorld_p1(Mesh * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set___webglActive_p1(Mesh * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__hasParent_p0(Mesh * self) {
  return self->hasParent();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Mesh__localToWorld_p1(Mesh * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_matrixWorld_p0(Mesh * self) {
  return self->matrixWorld;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_position_p0(Mesh * self) {
  return self->position;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_scale_p0(Mesh * self) {
  return self->scale;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_rotationAutoUpdate_p0(Mesh * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_target_p1(Mesh * self, Object3D * arg0) {
  self->target = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_acceleration_p0(Mesh * self) {
  return self->acceleration;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_rotationAutoUpdate_p1(Mesh * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get___webglActive_p0(Mesh * self) {
  return self->__webglActive;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Mesh__get_target_p0(Mesh * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__add_p1(Mesh * self, Object3D * arg0) {
  self->add(arg0);
}
Mesh * __attribute__((used, noinline)) emscripten_bind_Mesh__Mesh_p1(Geometry * arg0) {
  return new Mesh(arg0);
}
Mesh * __attribute__((used, noinline)) emscripten_bind_Mesh__Mesh_p2(Geometry * arg0, Material * arg1) {
  return new Mesh(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__updateMatrix_p0(Mesh * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set__normalMatrix_p1(Mesh * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Mesh__get__modelViewMatrix_p0(Mesh * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_frustumCulled_p0(Mesh * self) {
  return self->frustumCulled;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__translate_p2(Mesh * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get___webglInit_p0(Mesh * self) {
  return self->__webglInit;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_rotation_p0(Mesh * self) {
  return self->rotation;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_sortParticles_p0(Mesh * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_receiveShadow_p0(Mesh * self) {
  return self->receiveShadow;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__translateX_p1(Mesh * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__translateY_p1(Mesh * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__translateZ_p1(Mesh * self, double arg0) {
  return self->translateZ(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_rotation_p1(Mesh * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set___webglInit_p1(Mesh * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__clone_p0(Mesh * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_useQuaternion_p1(Mesh * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_visible_p0(Mesh * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_velocity_p1(Mesh * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Mesh__get_parent_p0(Mesh * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_forceAccum_p0(Mesh * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_Mesh__get_id_p0(Mesh * self) {
  return self->id;
}
int __attribute__((used, noinline)) emscripten_bind_Mesh__get_renderDepth_p0(Mesh * self) {
  return self->renderDepth;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__updateMatrixWorld_p0(Mesh * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__updateMatrixWorld_p1(Mesh * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_Mesh__get_matrixAutoUpdate_p0(Mesh * self) {
  return self->matrixAutoUpdate;
}
Material * __attribute__((used, noinline)) emscripten_bind_Mesh__get_material_p0(Mesh * self) {
  return self->material;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_matrix_p0(Mesh * self) {
  return self->matrix;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Mesh__worldToLocal_p1(Mesh * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set__modelViewMatrix_p1(Mesh * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh____destroy___p0(Mesh * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_name_p1(Mesh * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_material_p1(Mesh * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh____addObject_p1(Mesh * self, Object3D * arg0) {
  self->__addObject(arg0);
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Mesh__get_orientation_p0(Mesh * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_visible_p1(Mesh * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get__normalMatrix_p0(Mesh * self) {
  return self->_normalMatrix;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Mesh__get_up_p0(Mesh * self) {
  return self->up;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__remove_p1(Mesh * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_parent_p1(Mesh * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_matrix_p1(Mesh * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_matrixRotationWorld_p1(Mesh * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Mesh__applyMatrix_p1(Mesh * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_sortParticles_p1(Mesh * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_torqueAccum_p1(Mesh * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_forceAccum_p1(Mesh * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Mesh____removeObject_p1(Mesh * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Mesh__set_id_p1(Mesh * self, int arg0) {
  self->id = arg0;
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
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapCascade_p1(WebGLRenderer * self, bool arg0) {
  self->shadowMapCascade = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__render_p3(WebGLRenderer * self, Scene * arg0, Camera * arg1, bool arg2) {
  self->render(arg0, arg1, arg2);
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_gammaInput_p0(WebGLRenderer * self) {
  return self->gammaInput;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoScaleCubemaps_p1(WebGLRenderer * self, bool arg0) {
  self->autoScaleCubemaps = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_sortObjects_p1(WebGLRenderer * self, bool arg0) {
  self->sortObjects = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_maxMorphTarget_p0(WebGLRenderer * self) {
  return self->maxMorphTarget;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoClearDepth_p0(WebGLRenderer * self) {
  return self->autoClearDepth;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_devicePixelRatio_p0(WebGLRenderer * self) {
  return self->devicePixelRatio;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoUpdateObjects_p1(WebGLRenderer * self, bool arg0) {
  self->autoUpdateObjects = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_physicallyBasedShading_p1(WebGLRenderer * self, bool arg0) {
  self->physicallyBasedShading = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__stencil_p0(WebGLRenderer * self) {
  return self->_stencil;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoClearStencil_p0(WebGLRenderer * self) {
  return self->autoClearStencil;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoClear_p0(WebGLRenderer * self) {
  return self->autoClear;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoClearDepth_p1(WebGLRenderer * self, bool arg0) {
  self->autoClearDepth = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapEnabled_p1(WebGLRenderer * self, bool arg0) {
  self->shadowMapEnabled = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_maxMorphNormals_p0(WebGLRenderer * self) {
  return self->maxMorphNormals;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapType_p1(WebGLRenderer * self, int arg0) {
  self->shadowMapType = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoScaleCubemaps_p0(WebGLRenderer * self) {
  return self->autoScaleCubemaps;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__precision_p1(WebGLRenderer * self, int arg0) {
  self->_precision = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__initMaterial_p4(WebGLRenderer * self, Material * arg0, Group< Light *> arg1, Fog * arg2, Object3D * arg3) {
  self->initMaterial(arg0, arg1, arg2, arg3);
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__alpha_p0(WebGLRenderer * self) {
  return self->_alpha;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_maxMorphNormals_p1(WebGLRenderer * self, int arg0) {
  self->maxMorphNormals = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapCullFace_p1(WebGLRenderer * self, int arg0) {
  self->shadowMapCullFace = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_gammaInput_p1(WebGLRenderer * self, bool arg0) {
  self->gammaInput = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_gammaOutput_p1(WebGLRenderer * self, bool arg0) {
  self->gammaOutput = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoUpdateScene_p0(WebGLRenderer * self) {
  return self->autoUpdateScene;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__stencil_p1(WebGLRenderer * self, bool arg0) {
  self->_stencil = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__antialias_p1(WebGLRenderer * self, bool arg0) {
  self->_antialias = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_sortObjects_p0(WebGLRenderer * self) {
  return self->sortObjects;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__premultipliedAlpha_p0(WebGLRenderer * self) {
  return self->_premultipliedAlpha;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_physicallyBasedShading_p0(WebGLRenderer * self) {
  return self->physicallyBasedShading;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__precision_p0(WebGLRenderer * self) {
  return self->_precision;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setViewport_p4(WebGLRenderer * self, int arg0, int arg1, int arg2, int arg3) {
  self->setViewport(arg0, arg1, arg2, arg3);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__initWebGLObjects_p1(WebGLRenderer * self, Scene * arg0) {
  self->initWebGLObjects(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__alpha_p1(WebGLRenderer * self, bool arg0) {
  self->_alpha = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapEnabled_p0(WebGLRenderer * self) {
  return self->shadowMapEnabled;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_devicePixelRatio_p1(WebGLRenderer * self, int arg0) {
  self->devicePixelRatio = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_maxMorphTarget_p1(WebGLRenderer * self, int arg0) {
  self->maxMorphTarget = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer____destroy___p0(WebGLRenderer * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__renderImmediateObject_p5(WebGLRenderer * self, Camera * arg0, Group< Light *> arg1, Fog * arg2, Material * arg3, Object3D * arg4) {
  self->renderImmediateObject(arg0, arg1, arg2, arg3, arg4);
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoClearColor_p0(WebGLRenderer * self) {
  return self->autoClearColor;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setClearColor_p2(WebGLRenderer * self, Color * arg0, double arg1) {
  self->setClearColor(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__clearColor_p1(WebGLRenderer * self, Color * arg0) {
  self->_clearColor = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoClearStencil_p1(WebGLRenderer * self, bool arg0) {
  self->autoClearStencil = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapAutoUpdate_p0(WebGLRenderer * self) {
  return self->shadowMapAutoUpdate;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapDebug_p0(WebGLRenderer * self) {
  return self->shadowMapDebug;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoClearColor_p1(WebGLRenderer * self, bool arg0) {
  self->autoClearColor = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__preserveDrawingBuffer_p1(WebGLRenderer * self, bool arg0) {
  self->_preserveDrawingBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapDebug_p1(WebGLRenderer * self, bool arg0) {
  self->shadowMapDebug = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setScissor_p4(WebGLRenderer * self, int arg0, int arg1, int arg2, int arg3) {
  self->setScissor(arg0, arg1, arg2, arg3);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setClearColorHex_p2(WebGLRenderer * self, unsigned long arg0, double arg1) {
  self->setClearColorHex(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__antialias_p0(WebGLRenderer * self) {
  return self->_antialias;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapCullFace_p0(WebGLRenderer * self) {
  return self->shadowMapCullFace;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_gammaOutput_p0(WebGLRenderer * self) {
  return self->gammaOutput;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setClearColorRGBA_p4(WebGLRenderer * self, double arg0, double arg1, double arg2, double arg3) {
  self->setClearColorRGBA(arg0, arg1, arg2, arg3);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__updateShadowMap_p2(WebGLRenderer * self, Scene * arg0, Camera * arg1) {
  self->updateShadowMap(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__premultipliedAlpha_p1(WebGLRenderer * self, bool arg0) {
  self->_premultipliedAlpha = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapType_p0(WebGLRenderer * self) {
  return self->shadowMapType;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoClear_p1(WebGLRenderer * self, bool arg0) {
  self->autoClear = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set__clearAlpha_p1(WebGLRenderer * self, double arg0) {
  self->_clearAlpha = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__clear_p0(WebGLRenderer * self) {
  self->clear();
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__clear_p3(WebGLRenderer * self, bool arg0, bool arg1, bool arg2) {
  self->clear(arg0, arg1, arg2);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_autoUpdateScene_p1(WebGLRenderer * self, bool arg0) {
  self->autoUpdateScene = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setRenderTarget_p1(WebGLRenderer * self, RenderTarget * arg0) {
  self->setRenderTarget(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__set_shadowMapAutoUpdate_p1(WebGLRenderer * self, bool arg0) {
  self->shadowMapAutoUpdate = arg0;
}
WebGLRenderer * __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__WebGLRenderer_p0() {
  return new WebGLRenderer();
}
double __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__clearAlpha_p0(WebGLRenderer * self) {
  return self->_clearAlpha;
}
Color * __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__clearColor_p0(WebGLRenderer * self) {
  return self->_clearColor;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_autoUpdateObjects_p0(WebGLRenderer * self) {
  return self->autoUpdateObjects;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__enableScissorTest_p1(WebGLRenderer * self, bool arg0) {
  self->enableScissorTest(arg0);
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get__preserveDrawingBuffer_p0(WebGLRenderer * self) {
  return self->_preserveDrawingBuffer;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__get_shadowMapCascade_p0(WebGLRenderer * self) {
  return self->shadowMapCascade;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderer__setSize_p2(WebGLRenderer * self, int arg0, int arg1) {
  self->setSize(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject____destroy___p0(WebGLObject * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_z_p1(WebGLObject * self, int arg0) {
  self->z = arg0;
}
Material* __attribute__((used, noinline)) emscripten_bind_WebGLObject__getMaterialByType_p1(WebGLObject * self, int arg0) {
  return self->getMaterialByType(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_z_p0(WebGLObject * self) {
  return self->z;
}
Material * __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_transparent_p0(WebGLObject * self) {
  return self->transparent;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_object_p0(WebGLObject * self) {
  return self->object;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_buffer_p1(WebGLObject * self, GeometryGroup * arg0) {
  self->buffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_transparent_p1(WebGLObject * self, Material * arg0) {
  self->transparent = arg0;
}
WebGLObject * __attribute__((used, noinline)) emscripten_bind_WebGLObject__WebGLObject_p1(Object3D * arg0) {
  return new WebGLObject(arg0);
}
WebGLObject * __attribute__((used, noinline)) emscripten_bind_WebGLObject__WebGLObject_p2(GeometryGroup * arg0, Object3D * arg1) {
  return new WebGLObject(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_opaque_p1(WebGLObject * self, Material * arg0) {
  self->opaque = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_id_p0(WebGLObject * self) {
  return self->id;
}
Material * __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_opaque_p0(WebGLObject * self) {
  return self->opaque;
}
bool __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_render_p0(WebGLObject * self) {
  return self->render;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_object_p1(WebGLObject * self, Object3D * arg0) {
  self->object = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_render_p1(WebGLObject * self, bool arg0) {
  self->render = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_WebGLObject__set_id_p1(WebGLObject * self, int arg0) {
  self->id = arg0;
}
GeometryGroup * __attribute__((used, noinline)) emscripten_bind_WebGLObject__get_buffer_p0(WebGLObject * self) {
  return self->buffer;
}
bool __attribute__((used, noinline)) emscripten_bind_ParticleSystem__instanceOf_p1(ParticleSystem * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_ParticleSystem____destroy___p0(ParticleSystem * self) {
  delete self;
}
ParticleSystem * __attribute__((used, noinline)) emscripten_bind_ParticleSystem__ParticleSystem_p0() {
  return new ParticleSystem();
}
EventDispatcher * __attribute__((used, noinline)) emscripten_bind_EventDispatcher__EventDispatcher_p0() {
  return new EventDispatcher();
}
bool __attribute__((used, noinline)) emscripten_bind_EventDispatcher__instanceOf_p1(EventDispatcher * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_EventDispatcher____destroy___p0(EventDispatcher * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_FogExp2____destroy___p0(FogExp2 * self) {
  delete self;
}
FogExp2 * __attribute__((used, noinline)) emscripten_bind_FogExp2__FogExp2_p0() {
  return new FogExp2();
}
bool __attribute__((used, noinline)) emscripten_bind_BufferGeometry__instanceOf_p1(BufferGeometry * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_BufferGeometry____destroy___p0(BufferGeometry * self) {
  delete self;
}
BufferGeometry * __attribute__((used, noinline)) emscripten_bind_BufferGeometry__BufferGeometry_p0() {
  return new BufferGeometry();
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
void __attribute__((used, noinline)) emscripten_bind_DataTexture____destroy___p0(DataTexture * self) {
  delete self;
}
DataTexture * __attribute__((used, noinline)) emscripten_bind_DataTexture__DataTexture_p0() {
  return new DataTexture();
}
bool __attribute__((used, noinline)) emscripten_bind_Material__instanceOf_p1(Material * self, int arg0) {
  return self->instanceOf(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_blendSrc_p0(Material * self) {
  return self->blendSrc;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_polygonOffset_p1(Material * self, bool arg0) {
  self->polygonOffset = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_depthTest_p0(Material * self) {
  return self->depthTest;
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_blending_p0(Material * self) {
  return self->blending;
}
char * __attribute__((used, noinline)) emscripten_bind_Material__get_name_p0(Material * self) {
  return self->name;
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_side_p0(Material * self) {
  return self->side;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_needsUpdate_p0(Material * self) {
  return self->needsUpdate;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_depthWrite_p0(Material * self) {
  return self->depthWrite;
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_blendDst_p0(Material * self) {
  return self->blendDst;
}
double __attribute__((used, noinline)) emscripten_bind_Material__get_alphaTest_p0(Material * self) {
  return self->alphaTest;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_blendDst_p1(Material * self, int arg0) {
  self->blendDst = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_transparent_p0(Material * self) {
  return self->transparent;
}
Material * __attribute__((used, noinline)) emscripten_bind_Material__Material_p0() {
  return new Material();
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_transparent_p1(Material * self, bool arg0) {
  self->transparent = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_overdraw_p0(Material * self) {
  return self->overdraw;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_opacity_p1(Material * self, double arg0) {
  self->opacity = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_depthWrite_p1(Material * self, bool arg0) {
  self->depthWrite = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_depthTest_p1(Material * self, bool arg0) {
  self->depthTest = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_Material__get_opacity_p0(Material * self) {
  return self->opacity;
}
double __attribute__((used, noinline)) emscripten_bind_Material__get_polygonOffsetUnits_p0(Material * self) {
  return self->polygonOffsetUnits;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_needsUpdate_p1(Material * self, bool arg0) {
  self->needsUpdate = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_blendEquation_p0(Material * self) {
  return self->blendEquation;
}
Material* __attribute__((used, noinline)) emscripten_bind_Material__clone_p0(Material * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_visible_p0(Material * self) {
  return self->visible;
}
double __attribute__((used, noinline)) emscripten_bind_Material__get_polygonOffsetFactor_p0(Material * self) {
  return self->polygonOffsetFactor;
}
int __attribute__((used, noinline)) emscripten_bind_Material__get_id_p0(Material * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_alphaTest_p1(Material * self, double arg0) {
  self->alphaTest = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material____destroy___p0(Material * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_name_p1(Material * self, char * arg0) {
  self->name = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Material__get_polygonOffset_p0(Material * self) {
  return self->polygonOffset;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_polygonOffsetFactor_p1(Material * self, double arg0) {
  self->polygonOffsetFactor = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_visible_p1(Material * self, bool arg0) {
  self->visible = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_overdraw_p1(Material * self, bool arg0) {
  self->overdraw = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_blendSrc_p1(Material * self, int arg0) {
  self->blendSrc = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_blendEquation_p1(Material * self, int arg0) {
  self->blendEquation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_blending_p1(Material * self, int arg0) {
  self->blending = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_side_p1(Material * self, int arg0) {
  self->side = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_polygonOffsetUnits_p1(Material * self, double arg0) {
  self->polygonOffsetUnits = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Material__set_id_p1(Material * self, int arg0) {
  self->id = arg0;
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
bool __attribute__((used, noinline)) emscripten_bind_LineDashedMaterial__instanceOf_p1(LineDashedMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_LineDashedMaterial____destroy___p0(LineDashedMaterial * self) {
  delete self;
}
LineDashedMaterial * __attribute__((used, noinline)) emscripten_bind_LineDashedMaterial__LineDashedMaterial_p0() {
  return new LineDashedMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__instanceOf_p1(MeshBasicMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_polygonOffsetFactor_p1(MeshBasicMaterial * self, double arg0) {
  self->polygonOffsetFactor = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_morphTargets_p1(MeshBasicMaterial * self, bool arg0) {
  self->morphTargets = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_skinning_p0(MeshBasicMaterial * self) {
  return self->skinning;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_polygonOffset_p1(MeshBasicMaterial * self, bool arg0) {
  self->polygonOffset = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_vertexColors_p1(MeshBasicMaterial * self, int arg0) {
  self->vertexColors = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_blending_p0(MeshBasicMaterial * self) {
  return self->blending;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_side_p0(MeshBasicMaterial * self) {
  return self->side;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_reflectivity_p1(MeshBasicMaterial * self, int arg0) {
  self->reflectivity = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_needsUpdate_p0(MeshBasicMaterial * self) {
  return self->needsUpdate;
}
double __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_refractionRatio_p0(MeshBasicMaterial * self) {
  return self->refractionRatio;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_depthWrite_p0(MeshBasicMaterial * self) {
  return self->depthWrite;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_wireframe_p0(MeshBasicMaterial * self) {
  return self->wireframe;
}
Texture * __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_map_p0(MeshBasicMaterial * self) {
  return self->map;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_blendDst_p0(MeshBasicMaterial * self) {
  return self->blendDst;
}
double __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_alphaTest_p0(MeshBasicMaterial * self) {
  return self->alphaTest;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_blendDst_p1(MeshBasicMaterial * self, int arg0) {
  self->blendDst = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_morphTargets_p0(MeshBasicMaterial * self) {
  return self->morphTargets;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_refractionRatio_p1(MeshBasicMaterial * self, double arg0) {
  self->refractionRatio = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_blendEquation_p0(MeshBasicMaterial * self) {
  return self->blendEquation;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_transparent_p1(MeshBasicMaterial * self, bool arg0) {
  self->transparent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_skinning_p1(MeshBasicMaterial * self, bool arg0) {
  self->skinning = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_overdraw_p0(MeshBasicMaterial * self) {
  return self->overdraw;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_opacity_p1(MeshBasicMaterial * self, double arg0) {
  self->opacity = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_reflectivity_p0(MeshBasicMaterial * self) {
  return self->reflectivity;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_fog_p0(MeshBasicMaterial * self) {
  return self->fog;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_depthWrite_p1(MeshBasicMaterial * self, bool arg0) {
  self->depthWrite = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_vertexColors_p0(MeshBasicMaterial * self) {
  return self->vertexColors;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_fog_p1(MeshBasicMaterial * self, bool arg0) {
  self->fog = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_depthTest_p1(MeshBasicMaterial * self, bool arg0) {
  self->depthTest = arg0;
}
Color * __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_color_p0(MeshBasicMaterial * self) {
  return self->color;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_blendSrc_p0(MeshBasicMaterial * self) {
  return self->blendSrc;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_shading_p0(MeshBasicMaterial * self) {
  return self->shading;
}
double __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_polygonOffsetUnits_p0(MeshBasicMaterial * self) {
  return self->polygonOffsetUnits;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_wireframe_p1(MeshBasicMaterial * self, bool arg0) {
  self->wireframe = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_needsUpdate_p1(MeshBasicMaterial * self, bool arg0) {
  self->needsUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_transparent_p0(MeshBasicMaterial * self) {
  return self->transparent;
}
MeshBasicMaterial * __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__MeshBasicMaterial_p0() {
  return new MeshBasicMaterial();
}
Material* __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__clone_p0(MeshBasicMaterial * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_visible_p0(MeshBasicMaterial * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_blendSrc_p1(MeshBasicMaterial * self, int arg0) {
  self->blendSrc = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_polygonOffsetFactor_p0(MeshBasicMaterial * self) {
  return self->polygonOffsetFactor;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_id_p0(MeshBasicMaterial * self) {
  return self->id;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_combine_p0(MeshBasicMaterial * self) {
  return self->combine;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_depthTest_p0(MeshBasicMaterial * self) {
  return self->depthTest;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_combine_p1(MeshBasicMaterial * self, int arg0) {
  self->combine = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_alphaTest_p1(MeshBasicMaterial * self, double arg0) {
  self->alphaTest = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial____destroy___p0(MeshBasicMaterial * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_name_p1(MeshBasicMaterial * self, char * arg0) {
  self->name = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_polygonOffset_p0(MeshBasicMaterial * self) {
  return self->polygonOffset;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_map_p1(MeshBasicMaterial * self, Texture * arg0) {
  self->map = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_visible_p1(MeshBasicMaterial * self, bool arg0) {
  self->visible = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_overdraw_p1(MeshBasicMaterial * self, bool arg0) {
  self->overdraw = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_shading_p1(MeshBasicMaterial * self, int arg0) {
  self->shading = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_wireframeLinewidth_p1(MeshBasicMaterial * self, int arg0) {
  self->wireframeLinewidth = arg0;
}
char * __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_name_p0(MeshBasicMaterial * self) {
  return self->name;
}
double __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_opacity_p0(MeshBasicMaterial * self) {
  return self->opacity;
}
int __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__get_wireframeLinewidth_p0(MeshBasicMaterial * self) {
  return self->wireframeLinewidth;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_blendEquation_p1(MeshBasicMaterial * self, int arg0) {
  self->blendEquation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_blending_p1(MeshBasicMaterial * self, int arg0) {
  self->blending = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_side_p1(MeshBasicMaterial * self, int arg0) {
  self->side = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_color_p1(MeshBasicMaterial * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_polygonOffsetUnits_p1(MeshBasicMaterial * self, double arg0) {
  self->polygonOffsetUnits = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_MeshBasicMaterial__set_id_p1(MeshBasicMaterial * self, int arg0) {
  self->id = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Sprite____destroy___p0(Sprite * self) {
  delete self;
}
Sprite * __attribute__((used, noinline)) emscripten_bind_Sprite__Sprite_p0() {
  return new Sprite();
}
bool __attribute__((used, noinline)) emscripten_bind_ShaderMaterial__instanceOf_p1(ShaderMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_ShaderMaterial____destroy___p0(ShaderMaterial * self) {
  delete self;
}
ShaderMaterial * __attribute__((used, noinline)) emscripten_bind_ShaderMaterial__ShaderMaterial_p0() {
  return new ShaderMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__instanceOf_p1(OrthographicCamera * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_material_p0(OrthographicCamera * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_scale_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->scale = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_top_p1(OrthographicCamera * self, double arg0) {
  self->top = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_renderDepth_p1(OrthographicCamera * self, int arg0) {
  self->renderDepth = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_receiveShadow_p0(OrthographicCamera * self) {
  return self->receiveShadow;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrixWorld_p0(OrthographicCamera * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrixRotationWorld_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrixWorldNeedsUpdate_p1(OrthographicCamera * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_orientation_p0(OrthographicCamera * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_castShadow_p1(OrthographicCamera * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_target_p0(OrthographicCamera * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__add_p1(OrthographicCamera * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_rotation_p0(OrthographicCamera * self) {
  return self->rotation;
}
OrthographicCamera * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__OrthographicCamera_p6(double arg0, double arg1, double arg2, double arg3, double arg4, double arg5) {
  return new OrthographicCamera(arg0, arg1, arg2, arg3, arg4, arg5);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_projectionMatrix_p0(OrthographicCamera * self) {
  return self->projectionMatrix;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__translateX_p1(OrthographicCamera * self, double arg0) {
  return self->translateX(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_far_p1(OrthographicCamera * self, double arg0) {
  self->far = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__translateZ_p1(OrthographicCamera * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get__modelViewMatrix_p0(OrthographicCamera * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrixWorldNeedsUpdate_p0(OrthographicCamera * self) {
  return self->matrixWorldNeedsUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_bottom_p1(OrthographicCamera * self, double arg0) {
  self->bottom = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_renderDepth_p0(OrthographicCamera * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_up_p0(OrthographicCamera * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrix_p0(OrthographicCamera * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_name_p0(OrthographicCamera * self) {
  return self->name;
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_top_p0(OrthographicCamera * self) {
  return self->top;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrixWorld_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera____removeObject_p1(OrthographicCamera * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__traverse_p1(OrthographicCamera * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_acceleration_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_useQuaternion_p0(OrthographicCamera * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_torqueAccum_p0(OrthographicCamera * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__lookAt_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__remove_p1(OrthographicCamera * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_geometry_p1(OrthographicCamera * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_orientation_p1(OrthographicCamera * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set___webglActive_p1(OrthographicCamera * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__hasParent_p0(OrthographicCamera * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_target_p1(OrthographicCamera * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_projectionMatrixInverse_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->projectionMatrixInverse = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_projectionMatrix_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->projectionMatrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_near_p1(OrthographicCamera * self, double arg0) {
  self->near = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrix_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_sortParticles_p1(OrthographicCamera * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_rotationAutoUpdate_p1(OrthographicCamera * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_forceAccum_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_visible_p1(OrthographicCamera * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get__normalMatrix_p0(OrthographicCamera * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_id_p1(OrthographicCamera * self, int arg0) {
  self->id = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_far_p0(OrthographicCamera * self) {
  return self->far;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrixRotationWorld_p0(OrthographicCamera * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrixAutoUpdate_p1(OrthographicCamera * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_up_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_velocity_p0(OrthographicCamera * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__localToWorld_p1(OrthographicCamera * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_scale_p0(OrthographicCamera * self) {
  return self->scale;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_projectionMatrixInverse_p0(OrthographicCamera * self) {
  return self->projectionMatrixInverse;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_geometry_p0(OrthographicCamera * self) {
  return self->geometry;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_left_p1(OrthographicCamera * self, double arg0) {
  self->left = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__translate_p2(OrthographicCamera * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_parent_p1(OrthographicCamera * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_receiveShadow_p1(OrthographicCamera * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_parent_p0(OrthographicCamera * self) {
  return self->parent;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_matrixWorldInverse_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->matrixWorldInverse = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_forceAccum_p0(OrthographicCamera * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_id_p0(OrthographicCamera * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__updateMatrixWorld_p0(OrthographicCamera * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__updateMatrixWorld_p1(OrthographicCamera * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_rotation_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_material_p1(OrthographicCamera * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set__modelViewMatrix_p1(OrthographicCamera * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_sortParticles_p0(OrthographicCamera * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get___webglInit_p0(OrthographicCamera * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__applyMatrix_p1(OrthographicCamera * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_bottom_p0(OrthographicCamera * self) {
  return self->bottom;
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_near_p0(OrthographicCamera * self) {
  return self->near;
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_left_p0(OrthographicCamera * self) {
  return self->left;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_castShadow_p0(OrthographicCamera * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_rotationAutoUpdate_p0(OrthographicCamera * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_position_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->position = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrixWorldInverse_p0(OrthographicCamera * self) {
  return self->matrixWorldInverse;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__translateY_p1(OrthographicCamera * self, double arg0) {
  return self->translateY(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_velocity_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->velocity = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_right_p1(OrthographicCamera * self, double arg0) {
  self->right = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_acceleration_p0(OrthographicCamera * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get___webglActive_p0(OrthographicCamera * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__updateMatrix_p0(OrthographicCamera * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set__normalMatrix_p1(OrthographicCamera * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_frustumCulled_p0(OrthographicCamera * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_frustumCulled_p1(OrthographicCamera * self, bool arg0) {
  self->frustumCulled = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_right_p0(OrthographicCamera * self) {
  return self->right;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_position_p0(OrthographicCamera * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set___webglInit_p1(OrthographicCamera * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__clone_p0(OrthographicCamera * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_visible_p0(OrthographicCamera * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_useQuaternion_p1(OrthographicCamera * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__get_matrixAutoUpdate_p0(OrthographicCamera * self) {
  return self->matrixAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__updateProjectionMatrix_p0(OrthographicCamera * self) {
  self->updateProjectionMatrix();
}
Vector3* __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__worldToLocal_p1(OrthographicCamera * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera____destroy___p0(OrthographicCamera * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_name_p1(OrthographicCamera * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera____addObject_p1(OrthographicCamera * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_OrthographicCamera__set_torqueAccum_p1(OrthographicCamera * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
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
bool __attribute__((used, noinline)) emscripten_bind_MeshPhongMaterial__instanceOf_p1(MeshPhongMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
MeshPhongMaterial * __attribute__((used, noinline)) emscripten_bind_MeshPhongMaterial__MeshPhongMaterial_p0() {
  return new MeshPhongMaterial();
}
void __attribute__((used, noinline)) emscripten_bind_MeshPhongMaterial____destroy___p0(MeshPhongMaterial * self) {
  delete self;
}
SkinnedMesh * __attribute__((used, noinline)) emscripten_bind_SkinnedMesh__SkinnedMesh_p0() {
  return new SkinnedMesh();
}
void __attribute__((used, noinline)) emscripten_bind_SkinnedMesh____destroy___p0(SkinnedMesh * self) {
  delete self;
}
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
bool __attribute__((used, noinline)) emscripten_bind_ParticleCanvasMaterial__instanceOf_p1(ParticleCanvasMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_ParticleCanvasMaterial____destroy___p0(ParticleCanvasMaterial * self) {
  delete self;
}
ParticleCanvasMaterial * __attribute__((used, noinline)) emscripten_bind_ParticleCanvasMaterial__ParticleCanvasMaterial_p0() {
  return new ParticleCanvasMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Particle__instanceOf_p1(Particle * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Particle____destroy___p0(Particle * self) {
  delete self;
}
Particle * __attribute__((used, noinline)) emscripten_bind_Particle__Particle_p0() {
  return new Particle();
}
bool __attribute__((used, noinline)) emscripten_bind_MeshFaceMaterial__instanceOf_p1(MeshFaceMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MeshFaceMaterial____destroy___p0(MeshFaceMaterial * self) {
  delete self;
}
MeshFaceMaterial * __attribute__((used, noinline)) emscripten_bind_MeshFaceMaterial__MeshFaceMaterial_p0() {
  return new MeshFaceMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__instanceOf_p1(Geometry * self, int arg0) {
  return self->instanceOf(arg0);
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeTangents_p0(Geometry * self) {
  return self->computeTangents();
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_uvsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->uvsNeedUpdate = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglUVBuffer_p0(Geometry * self) {
  return self->__webglUVBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_tangentsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->tangentsNeedUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_lineDistancesNeedUpdate_p0(Geometry * self) {
  return self->lineDistancesNeedUpdate;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglColorBuffer_p0(Geometry * self) {
  return self->__webglColorBuffer;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeMorphNormals_p0(Geometry * self) {
  return self->computeMorphNormals();
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglVertexBuffer_p0(Geometry * self) {
  return self->__webglVertexBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_Geometry__mergeVertices_p0(Geometry * self) {
  return self->mergeVertices();
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_buffersNeedUpdate_p0(Geometry * self) {
  return self->buffersNeedUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_normalsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->normalsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_morphTargetsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->morphTargetsNeedUpdate = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglUV2Buffer_p0(Geometry * self) {
  return self->__webglUV2Buffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_hasTangents_p1(Geometry * self, bool arg0) {
  self->hasTangents = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_morphTargetsNeedUpdate_p0(Geometry * self) {
  return self->morphTargetsNeedUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglLineDistanceBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglLineDistanceBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglTangentBuffer_p0(Geometry * self) {
  return self->__webglTangentBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglNormalBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglNormalBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_buffersNeedUpdate_p1(Geometry * self, bool arg0) {
  self->buffersNeedUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_uvsNeedUpdate_p0(Geometry * self) {
  return self->uvsNeedUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglColorBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglColorBuffer = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeLineDistances_p0(Geometry * self) {
  return self->computeLineDistances();
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_hasTangents_p0(Geometry * self) {
  return self->hasTangents;
}
BoundingSphere * __attribute__((used, noinline)) emscripten_bind_Geometry__get_boundingSphere_p0(Geometry * self) {
  return self->boundingSphere;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglUV2Buffer_p1(Geometry * self, GLuint arg0) {
  self->__webglUV2Buffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglNormalBuffer_p0(Geometry * self) {
  return self->__webglNormalBuffer;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeCentroids_p0(Geometry * self) {
  return self->computeCentroids();
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_boundingBox_p1(Geometry * self, BoundingBox * arg0) {
  self->boundingBox = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_colorsNeedUpdate_p0(Geometry * self) {
  return self->colorsNeedUpdate;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeBoundingSphere_p0(Geometry * self) {
  return self->computeBoundingSphere();
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglSkinIndicesBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglSkinIndicesBuffer = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglInit_p0(Geometry * self) {
  return self->__webglInit;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_lineDistancesNeedUpdate_p1(Geometry * self, bool arg0) {
  self->lineDistancesNeedUpdate = arg0;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Geometry__Geometry_p0() {
  return new Geometry();
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglInit_p1(Geometry * self, bool arg0) {
  self->__webglInit = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__clone_p0(Geometry * self) {
  return self->clone();
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglFaceBuffer_p0(Geometry * self) {
  return self->__webglFaceBuffer;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_dynamic_p0(Geometry * self) {
  return self->dynamic;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglVertexBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglVertexBuffer = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeFaceNormals_p0(Geometry * self) {
  return self->computeFaceNormals();
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_normalsNeedUpdate_p0(Geometry * self) {
  return self->normalsNeedUpdate;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglLineBuffer_p0(Geometry * self) {
  return self->__webglLineBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglLineBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglLineBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglSkinIndicesBuffer_p0(Geometry * self) {
  return self->__webglSkinIndicesBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_colorsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->colorsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglTangentBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglTangentBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_elementsNeedUpdate_p1(Geometry * self, bool arg0) {
  self->elementsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry____destroy___p0(Geometry * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_name_p1(Geometry * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_verticesNeedUpdate_p1(Geometry * self, bool arg0) {
  self->verticesNeedUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_tangentsNeedUpdate_p0(Geometry * self) {
  return self->tangentsNeedUpdate;
}
BoundingBox * __attribute__((used, noinline)) emscripten_bind_Geometry__get_boundingBox_p0(Geometry * self) {
  return self->boundingBox;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeBoundingBox_p0(Geometry * self) {
  return self->computeBoundingBox();
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_boundingSphere_p1(Geometry * self, BoundingSphere * arg0) {
  self->boundingSphere = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglLineDistanceBuffer_p0(Geometry * self) {
  return self->__webglLineDistanceBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_Geometry__get_id_p0(Geometry * self) {
  return self->id;
}
char * __attribute__((used, noinline)) emscripten_bind_Geometry__get_name_p0(Geometry * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglSkinWeightsBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglSkinWeightsBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglFaceBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglFaceBuffer = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__computeVertexNormals_p1(Geometry * self, bool arg0) {
  return self->computeVertexNormals(arg0);
}
Geometry* __attribute__((used, noinline)) emscripten_bind_Geometry__applyMatrix_p1(Geometry * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_dynamic_p1(Geometry * self, bool arg0) {
  self->dynamic = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_elementsNeedUpdate_p0(Geometry * self) {
  return self->elementsNeedUpdate;
}
GLuint __attribute__((used, noinline)) emscripten_bind_Geometry__get___webglSkinWeightsBuffer_p0(Geometry * self) {
  return self->__webglSkinWeightsBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set___webglUVBuffer_p1(Geometry * self, GLuint arg0) {
  self->__webglUVBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Geometry__set_id_p1(Geometry * self, int arg0) {
  self->id = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Geometry__get_verticesNeedUpdate_p0(Geometry * self) {
  return self->verticesNeedUpdate;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__instanceOf_p1(Light * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_Light__get_material_p0(Light * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_scale_p1(Light * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_receiveShadow_p0(Light * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_renderDepth_p1(Light * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Light__get_matrixWorld_p0(Light * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_matrixRotationWorld_p1(Light * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_matrixWorldNeedsUpdate_p1(Light * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_Light__get_orientation_p0(Light * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_castShadow_p1(Light * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Light__get_target_p0(Light * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_Light__add_p1(Light * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_rotation_p0(Light * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__translateX_p1(Light * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__translateY_p1(Light * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__translateZ_p1(Light * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Light__get__modelViewMatrix_p0(Light * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_matrixWorldNeedsUpdate_p0(Light * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_Light__get_renderDepth_p0(Light * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_up_p0(Light * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Light__get_matrix_p0(Light * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_Light__get_name_p0(Light * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_geometry_p1(Light * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_color_p1(Light * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_forceAccum_p1(Light * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light____removeObject_p1(Light * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__traverse_p1(Light * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_acceleration_p1(Light * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_useQuaternion_p0(Light * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_torqueAccum_p0(Light * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_Light__lookAt_p1(Light * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__remove_p1(Light * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_orientation_p1(Light * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set___webglActive_p1(Light * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__hasParent_p0(Light * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_target_p1(Light * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_sortParticles_p1(Light * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_matrixWorld_p1(Light * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_matrix_p1(Light * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
Light * __attribute__((used, noinline)) emscripten_bind_Light__Light_p1(unsigned int arg0) {
  return new Light(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_rotationAutoUpdate_p1(Light * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_visible_p1(Light * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_Light__get__normalMatrix_p0(Light * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_id_p1(Light * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_Light__get_matrixRotationWorld_p0(Light * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_matrixAutoUpdate_p1(Light * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_up_p1(Light * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_velocity_p0(Light * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Light__localToWorld_p1(Light * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_scale_p0(Light * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_Light__get_geometry_p0(Light * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__translate_p2(Light * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_parent_p1(Light * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_receiveShadow_p1(Light * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_Light__get_parent_p0(Light * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_forceAccum_p0(Light * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_Light__get_id_p0(Light * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_Light__updateMatrixWorld_p0(Light * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_Light__updateMatrixWorld_p1(Light * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_rotation_p1(Light * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_material_p1(Light * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set__modelViewMatrix_p1(Light * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_sortParticles_p0(Light * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get___webglInit_p0(Light * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__applyMatrix_p1(Light * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_Light__get_color_p0(Light * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_castShadow_p0(Light * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_rotationAutoUpdate_p0(Light * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_position_p1(Light * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_velocity_p1(Light * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_acceleration_p0(Light * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get___webglActive_p0(Light * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_Light__updateMatrix_p0(Light * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_Light__set__normalMatrix_p1(Light * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_frustumCulled_p0(Light * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_frustumCulled_p1(Light * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Light__get_position_p0(Light * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set___webglInit_p1(Light * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_Light__clone_p0(Light * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_visible_p0(Light * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_useQuaternion_p1(Light * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_Light__get_matrixAutoUpdate_p0(Light * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_Light__worldToLocal_p1(Light * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light____destroy___p0(Light * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_name_p1(Light * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Light____addObject_p1(Light * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Light__set_torqueAccum_p1(Light * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get_materialIndex_p0(GeometryGroup * self) {
  return self->materialIndex;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglUVBuffer_p0(GeometryGroup * self) {
  return self->__webglUVBuffer;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglColorBuffer_p0(GeometryGroup * self) {
  return self->__webglColorBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglFaceCount_p0(GeometryGroup * self) {
  return self->__webglFaceCount;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglVertexBuffer_p0(GeometryGroup * self) {
  return self->__webglVertexBuffer;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglSkinWeightsBuffer_p0(GeometryGroup * self) {
  return self->__webglSkinWeightsBuffer;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglUV2Buffer_p0(GeometryGroup * self) {
  return self->__webglUV2Buffer;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglLineDistanceBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglLineDistanceBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglTangentBuffer_p0(GeometryGroup * self) {
  return self->__webglTangentBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___inittedArrays_p1(GeometryGroup * self, bool arg0) {
  self->__inittedArrays = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglNormalBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglNormalBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglColorBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglColorBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglUV2Buffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglUV2Buffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglUVBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglUVBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set_numMorphTargets_p1(GeometryGroup * self, int arg0) {
  self->numMorphTargets = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglLineBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglLineBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglSkinIndicesBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglSkinIndicesBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglLineCount_p1(GeometryGroup * self, int arg0) {
  self->__webglLineCount = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglNormalBuffer_p0(GeometryGroup * self) {
  return self->__webglNormalBuffer;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglFaceBuffer_p0(GeometryGroup * self) {
  return self->__webglFaceBuffer;
}
GeometryGroup * __attribute__((used, noinline)) emscripten_bind_GeometryGroup__GeometryGroup_p0() {
  return new GeometryGroup();
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set_vertices_p1(GeometryGroup * self, int arg0) {
  self->vertices = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglVertexBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglVertexBuffer = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get_id_p0(GeometryGroup * self) {
  return self->id;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglLineBuffer_p0(GeometryGroup * self) {
  return self->__webglLineBuffer;
}
bool __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___inittedArrays_p0(GeometryGroup * self) {
  return self->__inittedArrays;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglSkinIndicesBuffer_p0(GeometryGroup * self) {
  return self->__webglSkinIndicesBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get_vertices_p0(GeometryGroup * self) {
  return self->vertices;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglFaceCount_p1(GeometryGroup * self, int arg0) {
  self->__webglFaceCount = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglTangentBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglTangentBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup____destroy___p0(GeometryGroup * self) {
  delete self;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get_numMorphNormals_p0(GeometryGroup * self) {
  return self->numMorphNormals;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get_numMorphTargets_p0(GeometryGroup * self) {
  return self->numMorphTargets;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglFaceBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglFaceBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglLineDistanceBuffer_p0(GeometryGroup * self) {
  return self->__webglLineDistanceBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set___webglSkinWeightsBuffer_p1(GeometryGroup * self, GLuint arg0) {
  self->__webglSkinWeightsBuffer = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_GeometryGroup__get___webglLineCount_p0(GeometryGroup * self) {
  return self->__webglLineCount;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set_numMorphNormals_p1(GeometryGroup * self, int arg0) {
  self->numMorphNormals = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set_materialIndex_p1(GeometryGroup * self, int arg0) {
  self->materialIndex = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_GeometryGroup__set_id_p1(GeometryGroup * self, int arg0) {
  self->id = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_LineBasicMaterial__instanceOf_p1(LineBasicMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_LineBasicMaterial____destroy___p0(LineBasicMaterial * self) {
  delete self;
}
LineBasicMaterial * __attribute__((used, noinline)) emscripten_bind_LineBasicMaterial__LineBasicMaterial_p0() {
  return new LineBasicMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Face__instanceOf_p1(Face * self, int arg0) {
  return self->instanceOf(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_Face__get_materialIndex_p0(Face * self) {
  return self->materialIndex;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_centroid_p1(Face * self, Vector3 * arg0) {
  self->centroid = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_normal_p1(Face * self, Vector3 * arg0) {
  self->normal = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face__get_centroid_p0(Face * self) {
  return self->centroid;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face__get_normal_p0(Face * self) {
  return self->normal;
}
Face* __attribute__((used, noinline)) emscripten_bind_Face__clone_p0(Face * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_materialIndex_p1(Face * self, int arg0) {
  self->materialIndex = arg0;
}
Color * __attribute__((used, noinline)) emscripten_bind_Face__get_color_p0(Face * self) {
  return self->color;
}
Face * __attribute__((used, noinline)) emscripten_bind_Face__Face_p0() {
  return new Face();
}
void __attribute__((used, noinline)) emscripten_bind_Face____destroy___p0(Face * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_color_p1(Face * self, Color * arg0) {
  self->color = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Face__get_d_p0(Face * self) {
  return self->d;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_a_p1(Face * self, int arg0) {
  self->a = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_b_p1(Face * self, int arg0) {
  self->b = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_c_p1(Face * self, int arg0) {
  self->c = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face__set_d_p1(Face * self, int arg0) {
  self->d = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Face__get_a_p0(Face * self) {
  return self->a;
}
int __attribute__((used, noinline)) emscripten_bind_Face__get_b_p0(Face * self) {
  return self->b;
}
int __attribute__((used, noinline)) emscripten_bind_Face__get_c_p0(Face * self) {
  return self->c;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__instanceOf_p1(PointLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_PointLight__get_material_p0(PointLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_scale_p1(PointLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_receiveShadow_p0(PointLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_renderDepth_p1(PointLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_matrixWorld_p0(PointLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_matrixRotationWorld_p1(PointLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_matrixWorldNeedsUpdate_p1(PointLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_PointLight__get_orientation_p0(PointLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_castShadow_p1(PointLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_PointLight__get_target_p0(PointLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__add_p1(PointLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_rotation_p0(PointLight * self) {
  return self->rotation;
}
double __attribute__((used, noinline)) emscripten_bind_PointLight__get_distance_p0(PointLight * self) {
  return self->distance;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__translateX_p1(PointLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__translateY_p1(PointLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__translateZ_p1(PointLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PointLight__get__modelViewMatrix_p0(PointLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_matrixWorldNeedsUpdate_p0(PointLight * self) {
  return self->matrixWorldNeedsUpdate;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_up_p0(PointLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_matrix_p0(PointLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_PointLight__get_name_p0(PointLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_geometry_p1(PointLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_color_p1(PointLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_forceAccum_p1(PointLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight____removeObject_p1(PointLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__traverse_p1(PointLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_matrixAutoUpdate_p1(PointLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_acceleration_p1(PointLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_useQuaternion_p0(PointLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_torqueAccum_p0(PointLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__lookAt_p1(PointLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__remove_p1(PointLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_orientation_p1(PointLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set___webglActive_p1(PointLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__hasParent_p0(PointLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_target_p1(PointLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_distance_p1(PointLight * self, double arg0) {
  self->distance = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_matrixWorld_p1(PointLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_matrix_p1(PointLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_sortParticles_p1(PointLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_rotationAutoUpdate_p1(PointLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_visible_p1(PointLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get__normalMatrix_p0(PointLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_id_p1(PointLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_matrixRotationWorld_p0(PointLight * self) {
  return self->matrixRotationWorld;
}
int __attribute__((used, noinline)) emscripten_bind_PointLight__get_renderDepth_p0(PointLight * self) {
  return self->renderDepth;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_up_p1(PointLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_velocity_p0(PointLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_PointLight__localToWorld_p1(PointLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_scale_p0(PointLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_PointLight__get_geometry_p0(PointLight * self) {
  return self->geometry;
}
double __attribute__((used, noinline)) emscripten_bind_PointLight__get_intensity_p0(PointLight * self) {
  return self->intensity;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__translate_p2(PointLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_parent_p1(PointLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_receiveShadow_p1(PointLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_PointLight__get_parent_p0(PointLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_forceAccum_p0(PointLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_PointLight__get_id_p0(PointLight * self) {
  return self->id;
}
PointLight * __attribute__((used, noinline)) emscripten_bind_PointLight__PointLight_p3(unsigned int arg0, double arg1, double arg2) {
  return new PointLight(arg0, arg1, arg2);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__updateMatrixWorld_p0(PointLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__updateMatrixWorld_p1(PointLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_rotation_p1(PointLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_intensity_p1(PointLight * self, double arg0) {
  self->intensity = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_material_p1(PointLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set__modelViewMatrix_p1(PointLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_sortParticles_p0(PointLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get___webglInit_p0(PointLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__applyMatrix_p1(PointLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_PointLight__get_color_p0(PointLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_castShadow_p0(PointLight * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_rotationAutoUpdate_p0(PointLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_position_p1(PointLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_velocity_p1(PointLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_acceleration_p0(PointLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get___webglActive_p0(PointLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__updateMatrix_p0(PointLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set__normalMatrix_p1(PointLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_frustumCulled_p0(PointLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_frustumCulled_p1(PointLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PointLight__get_position_p0(PointLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set___webglInit_p1(PointLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PointLight__clone_p0(PointLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_visible_p0(PointLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_useQuaternion_p1(PointLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PointLight__get_matrixAutoUpdate_p0(PointLight * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_PointLight__worldToLocal_p1(PointLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight____destroy___p0(PointLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_name_p1(PointLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PointLight____addObject_p1(PointLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PointLight__set_torqueAccum_p1(PointLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__instanceOf_p1(DirectionalLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_material_p0(DirectionalLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_scale_p1(DirectionalLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_receiveShadow_p0(DirectionalLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_renderDepth_p1(DirectionalLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_matrixWorld_p0(DirectionalLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_matrixRotationWorld_p1(DirectionalLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_matrixWorldNeedsUpdate_p1(DirectionalLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_orientation_p0(DirectionalLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_castShadow_p1(DirectionalLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_target_p0(DirectionalLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__add_p1(DirectionalLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_rotation_p0(DirectionalLight * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__translateX_p1(DirectionalLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__translateY_p1(DirectionalLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__translateZ_p1(DirectionalLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get__modelViewMatrix_p0(DirectionalLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_matrixWorldNeedsUpdate_p0(DirectionalLight * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_renderDepth_p0(DirectionalLight * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_up_p0(DirectionalLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_matrix_p0(DirectionalLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_name_p0(DirectionalLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_geometry_p1(DirectionalLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_color_p1(DirectionalLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_forceAccum_p1(DirectionalLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight____removeObject_p1(DirectionalLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__traverse_p1(DirectionalLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_acceleration_p1(DirectionalLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_useQuaternion_p0(DirectionalLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_torqueAccum_p0(DirectionalLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__lookAt_p1(DirectionalLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__remove_p1(DirectionalLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_orientation_p1(DirectionalLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set___webglActive_p1(DirectionalLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__hasParent_p0(DirectionalLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_target_p1(DirectionalLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_matrixWorld_p1(DirectionalLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_matrix_p1(DirectionalLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_sortParticles_p1(DirectionalLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_rotationAutoUpdate_p1(DirectionalLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_visible_p1(DirectionalLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get__normalMatrix_p0(DirectionalLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_id_p1(DirectionalLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_matrixRotationWorld_p0(DirectionalLight * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_matrixAutoUpdate_p1(DirectionalLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_up_p1(DirectionalLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_velocity_p0(DirectionalLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__localToWorld_p1(DirectionalLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_scale_p0(DirectionalLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_geometry_p0(DirectionalLight * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__translate_p2(DirectionalLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_parent_p1(DirectionalLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_receiveShadow_p1(DirectionalLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_parent_p0(DirectionalLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_forceAccum_p0(DirectionalLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_id_p0(DirectionalLight * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__updateMatrixWorld_p0(DirectionalLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__updateMatrixWorld_p1(DirectionalLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_rotation_p1(DirectionalLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_material_p1(DirectionalLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set__modelViewMatrix_p1(DirectionalLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_sortParticles_p0(DirectionalLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get___webglInit_p0(DirectionalLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__applyMatrix_p1(DirectionalLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_color_p0(DirectionalLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_castShadow_p0(DirectionalLight * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_rotationAutoUpdate_p0(DirectionalLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_position_p1(DirectionalLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_velocity_p1(DirectionalLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_acceleration_p0(DirectionalLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get___webglActive_p0(DirectionalLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__updateMatrix_p0(DirectionalLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set__normalMatrix_p1(DirectionalLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_frustumCulled_p0(DirectionalLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_frustumCulled_p1(DirectionalLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_position_p0(DirectionalLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set___webglInit_p1(DirectionalLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__clone_p0(DirectionalLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_visible_p0(DirectionalLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_useQuaternion_p1(DirectionalLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_DirectionalLight__get_matrixAutoUpdate_p0(DirectionalLight * self) {
  return self->matrixAutoUpdate;
}
DirectionalLight * __attribute__((used, noinline)) emscripten_bind_DirectionalLight__DirectionalLight_p1(unsigned int arg0) {
  return new DirectionalLight(arg0);
}
Vector3* __attribute__((used, noinline)) emscripten_bind_DirectionalLight__worldToLocal_p1(DirectionalLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight____destroy___p0(DirectionalLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_name_p1(DirectionalLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight____addObject_p1(DirectionalLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_DirectionalLight__set_torqueAccum_p1(DirectionalLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
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
bool __attribute__((used, noinline)) emscripten_bind_MeshNormalMaterial__instanceOf_p1(MeshNormalMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MeshNormalMaterial____destroy___p0(MeshNormalMaterial * self) {
  delete self;
}
MeshNormalMaterial * __attribute__((used, noinline)) emscripten_bind_MeshNormalMaterial__MeshNormalMaterial_p0() {
  return new MeshNormalMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_Line__instanceOf_p1(Line * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Line____destroy___p0(Line * self) {
  delete self;
}
Line * __attribute__((used, noinline)) emscripten_bind_Line__Line_p0() {
  return new Line();
}
bool __attribute__((used, noinline)) emscripten_bind_Bone__instanceOf_p1(Bone * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_Bone____destroy___p0(Bone * self) {
  delete self;
}
Bone * __attribute__((used, noinline)) emscripten_bind_Bone__Bone_p0() {
  return new Bone();
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
bool __attribute__((used, noinline)) emscripten_bind_Raycaster__instanceOf_p1(Raycaster * self, int arg0) {
  return self->instanceOf(arg0);
}
Raycaster * __attribute__((used, noinline)) emscripten_bind_Raycaster__Raycaster_p0() {
  return new Raycaster();
}
void __attribute__((used, noinline)) emscripten_bind_Raycaster____destroy___p0(Raycaster * self) {
  delete self;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__instanceOf_p1(PerspectiveCamera * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_material_p0(PerspectiveCamera * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_fov_p1(PerspectiveCamera * self, double arg0) {
  self->fov = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__setViewOffset_p6(PerspectiveCamera * self, double arg0, double arg1, double arg2, double arg3, double arg4, double arg5) {
  self->setViewOffset(arg0, arg1, arg2, arg3, arg4, arg5);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_scale_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_receiveShadow_p0(PerspectiveCamera * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_renderDepth_p1(PerspectiveCamera * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrixWorld_p0(PerspectiveCamera * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrixRotationWorld_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrixWorldNeedsUpdate_p1(PerspectiveCamera * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_orientation_p0(PerspectiveCamera * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_castShadow_p1(PerspectiveCamera * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_target_p0(PerspectiveCamera * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__add_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->add(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__setLens_p2(PerspectiveCamera * self, double arg0, double arg1) {
  self->setLens(arg0, arg1);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_rotation_p0(PerspectiveCamera * self) {
  return self->rotation;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_projectionMatrix_p0(PerspectiveCamera * self) {
  return self->projectionMatrix;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__translateX_p1(PerspectiveCamera * self, double arg0) {
  return self->translateX(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_far_p1(PerspectiveCamera * self, double arg0) {
  self->far = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__translateZ_p1(PerspectiveCamera * self, double arg0) {
  return self->translateZ(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_aspect_p1(PerspectiveCamera * self, double arg0) {
  self->aspect = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrixWorldNeedsUpdate_p0(PerspectiveCamera * self) {
  return self->matrixWorldNeedsUpdate;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_up_p0(PerspectiveCamera * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrix_p0(PerspectiveCamera * self) {
  return self->matrix;
}
PerspectiveCamera * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__PerspectiveCamera_p0() {
  return new PerspectiveCamera();
}
PerspectiveCamera * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__PerspectiveCamera_p1(double arg0) {
  return new PerspectiveCamera(arg0);
}
PerspectiveCamera * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__PerspectiveCamera_p2(double arg0, double arg1) {
  return new PerspectiveCamera(arg0, arg1);
}
PerspectiveCamera * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__PerspectiveCamera_p3(double arg0, double arg1, double arg2) {
  return new PerspectiveCamera(arg0, arg1, arg2);
}
PerspectiveCamera * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__PerspectiveCamera_p4(double arg0, double arg1, double arg2, double arg3) {
  return new PerspectiveCamera(arg0, arg1, arg2, arg3);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrixWorld_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
char * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_name_p0(PerspectiveCamera * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_geometry_p1(PerspectiveCamera * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_forceAccum_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera____removeObject_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__traverse_p1(PerspectiveCamera * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrixAutoUpdate_p1(PerspectiveCamera * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_acceleration_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_useQuaternion_p0(PerspectiveCamera * self) {
  return self->useQuaternion;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_aspect_p0(PerspectiveCamera * self) {
  return self->aspect;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__lookAt_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__remove_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_orientation_p1(PerspectiveCamera * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set___webglActive_p1(PerspectiveCamera * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__hasParent_p0(PerspectiveCamera * self) {
  return self->hasParent();
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_fov_p0(PerspectiveCamera * self) {
  return self->fov;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_target_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_projectionMatrixInverse_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->projectionMatrixInverse = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_sortParticles_p1(PerspectiveCamera * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_projectionMatrix_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->projectionMatrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_height_p1(PerspectiveCamera * self, double arg0) {
  self->height = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_near_p1(PerspectiveCamera * self, double arg0) {
  self->near = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrix_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_fullWidth_p0(PerspectiveCamera * self) {
  return self->fullWidth;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_rotationAutoUpdate_p1(PerspectiveCamera * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_visible_p1(PerspectiveCamera * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get__normalMatrix_p0(PerspectiveCamera * self) {
  return self->_normalMatrix;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_width_p0(PerspectiveCamera * self) {
  return self->width;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_id_p1(PerspectiveCamera * self, int arg0) {
  self->id = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_far_p0(PerspectiveCamera * self) {
  return self->far;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_x_p0(PerspectiveCamera * self) {
  return self->x;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_y_p0(PerspectiveCamera * self) {
  return self->y;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrixRotationWorld_p0(PerspectiveCamera * self) {
  return self->matrixRotationWorld;
}
int __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_renderDepth_p0(PerspectiveCamera * self) {
  return self->renderDepth;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_up_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_velocity_p0(PerspectiveCamera * self) {
  return self->velocity;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_fullWidth_p1(PerspectiveCamera * self, double arg0) {
  self->fullWidth = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_x_p1(PerspectiveCamera * self, double arg0) {
  self->x = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_y_p1(PerspectiveCamera * self, double arg0) {
  self->y = arg0;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__localToWorld_p1(PerspectiveCamera * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_scale_p0(PerspectiveCamera * self) {
  return self->scale;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_projectionMatrixInverse_p0(PerspectiveCamera * self) {
  return self->projectionMatrixInverse;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_geometry_p0(PerspectiveCamera * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__translate_p2(PerspectiveCamera * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get___webglInit_p0(PerspectiveCamera * self) {
  return self->__webglInit;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_receiveShadow_p1(PerspectiveCamera * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_parent_p0(PerspectiveCamera * self) {
  return self->parent;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_matrixWorldInverse_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->matrixWorldInverse = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_torqueAccum_p0(PerspectiveCamera * self) {
  return self->torqueAccum;
}
int __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_id_p0(PerspectiveCamera * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__updateMatrixWorld_p0(PerspectiveCamera * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__updateMatrixWorld_p1(PerspectiveCamera * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_rotation_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_material_p1(PerspectiveCamera * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set__modelViewMatrix_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_sortParticles_p0(PerspectiveCamera * self) {
  return self->sortParticles;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_parent_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->parent = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__applyMatrix_p1(PerspectiveCamera * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_near_p0(PerspectiveCamera * self) {
  return self->near;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_castShadow_p0(PerspectiveCamera * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_rotationAutoUpdate_p0(PerspectiveCamera * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_position_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->position = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrixWorldInverse_p0(PerspectiveCamera * self) {
  return self->matrixWorldInverse;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__translateY_p1(PerspectiveCamera * self, double arg0) {
  return self->translateY(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_velocity_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_acceleration_p0(PerspectiveCamera * self) {
  return self->acceleration;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_height_p0(PerspectiveCamera * self) {
  return self->height;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get___webglActive_p0(PerspectiveCamera * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__updateMatrix_p0(PerspectiveCamera * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set__normalMatrix_p1(PerspectiveCamera * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get__modelViewMatrix_p0(PerspectiveCamera * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_frustumCulled_p0(PerspectiveCamera * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_frustumCulled_p1(PerspectiveCamera * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_position_p0(PerspectiveCamera * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set___webglInit_p1(PerspectiveCamera * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__clone_p0(PerspectiveCamera * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_visible_p0(PerspectiveCamera * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_useQuaternion_p1(PerspectiveCamera * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_matrixAutoUpdate_p0(PerspectiveCamera * self) {
  return self->matrixAutoUpdate;
}
double __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_fullHeight_p0(PerspectiveCamera * self) {
  return self->fullHeight;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__updateProjectionMatrix_p0(PerspectiveCamera * self) {
  self->updateProjectionMatrix();
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__get_forceAccum_p0(PerspectiveCamera * self) {
  return self->forceAccum;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__worldToLocal_p1(PerspectiveCamera * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera____destroy___p0(PerspectiveCamera * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_name_p1(PerspectiveCamera * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_width_p1(PerspectiveCamera * self, double arg0) {
  self->width = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera____addObject_p1(PerspectiveCamera * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_torqueAccum_p1(PerspectiveCamera * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_PerspectiveCamera__set_fullHeight_p1(PerspectiveCamera * self, double arg0) {
  self->fullHeight = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CompressedTexture____destroy___p0(CompressedTexture * self) {
  delete self;
}
CompressedTexture * __attribute__((used, noinline)) emscripten_bind_CompressedTexture__CompressedTexture_p0() {
  return new CompressedTexture();
}
bool __attribute__((used, noinline)) emscripten_bind_LOD__instanceOf_p1(LOD * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_LOD____destroy___p0(LOD * self) {
  delete self;
}
LOD * __attribute__((used, noinline)) emscripten_bind_LOD__LOD_p0() {
  return new LOD();
}
void __attribute__((used, noinline)) emscripten_bind_CanvasRenderer____destroy___p0(CanvasRenderer * self) {
  delete self;
}
CanvasRenderer * __attribute__((used, noinline)) emscripten_bind_CanvasRenderer__CanvasRenderer_p0() {
  return new CanvasRenderer();
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__instanceOf_p1(CubeGeometry * self, int arg0) {
  return self->instanceOf(arg0);
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeTangents_p0(CubeGeometry * self) {
  return self->computeTangents();
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_uvsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->uvsNeedUpdate = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglUVBuffer_p0(CubeGeometry * self) {
  return self->__webglUVBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_heightSegments_p0(CubeGeometry * self) {
  return self->heightSegments;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_tangentsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->tangentsNeedUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_lineDistancesNeedUpdate_p0(CubeGeometry * self) {
  return self->lineDistancesNeedUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_id_p0(CubeGeometry * self) {
  return self->id;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglColorBuffer_p0(CubeGeometry * self) {
  return self->__webglColorBuffer;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeMorphNormals_p0(CubeGeometry * self) {
  return self->computeMorphNormals();
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_depth_p1(CubeGeometry * self, double arg0) {
  self->depth = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglVertexBuffer_p0(CubeGeometry * self) {
  return self->__webglVertexBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_CubeGeometry__mergeVertices_p0(CubeGeometry * self) {
  return self->mergeVertices();
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_tangentsNeedUpdate_p0(CubeGeometry * self) {
  return self->tangentsNeedUpdate;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_buffersNeedUpdate_p0(CubeGeometry * self) {
  return self->buffersNeedUpdate;
}
CubeGeometry * __attribute__((used, noinline)) emscripten_bind_CubeGeometry__CubeGeometry_p3(double arg0, double arg1, double arg2) {
  return new CubeGeometry(arg0, arg1, arg2);
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_normalsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->normalsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_widthSegments_p1(CubeGeometry * self, int arg0) {
  self->widthSegments = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglUV2Buffer_p0(CubeGeometry * self) {
  return self->__webglUV2Buffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_heightSegments_p1(CubeGeometry * self, int arg0) {
  self->heightSegments = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_morphTargetsNeedUpdate_p0(CubeGeometry * self) {
  return self->morphTargetsNeedUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglLineDistanceBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglLineDistanceBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglTangentBuffer_p0(CubeGeometry * self) {
  return self->__webglTangentBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglNormalBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglNormalBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_buffersNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->buffersNeedUpdate = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_uvsNeedUpdate_p0(CubeGeometry * self) {
  return self->uvsNeedUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglColorBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglColorBuffer = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_elementsNeedUpdate_p0(CubeGeometry * self) {
  return self->elementsNeedUpdate;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeLineDistances_p0(CubeGeometry * self) {
  return self->computeLineDistances();
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__buildPlane_p8(CubeGeometry * self, const char arg0, const char arg1, int arg2, int arg3, double arg4, double arg5, double arg6, double arg7) {
  self->buildPlane(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_hasTangents_p0(CubeGeometry * self) {
  return self->hasTangents;
}
BoundingSphere * __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_boundingSphere_p0(CubeGeometry * self) {
  return self->boundingSphere;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglUV2Buffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglUV2Buffer = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_height_p0(CubeGeometry * self) {
  return self->height;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglUVBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglUVBuffer = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeCentroids_p0(CubeGeometry * self) {
  return self->computeCentroids();
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeVertexNormals_p1(CubeGeometry * self, bool arg0) {
  return self->computeVertexNormals(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_boundingBox_p1(CubeGeometry * self, BoundingBox * arg0) {
  self->boundingBox = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_hasTangents_p1(CubeGeometry * self, bool arg0) {
  self->hasTangents = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeBoundingSphere_p0(CubeGeometry * self) {
  return self->computeBoundingSphere();
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglSkinIndicesBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglSkinIndicesBuffer = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglInit_p0(CubeGeometry * self) {
  return self->__webglInit;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_lineDistancesNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->lineDistancesNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_morphTargetsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->morphTargetsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_height_p1(CubeGeometry * self, double arg0) {
  self->height = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_depthSegments_p0(CubeGeometry * self) {
  return self->depthSegments;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglNormalBuffer_p0(CubeGeometry * self) {
  return self->__webglNormalBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglInit_p1(CubeGeometry * self, bool arg0) {
  self->__webglInit = arg0;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__clone_p0(CubeGeometry * self) {
  return self->clone();
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglFaceBuffer_p0(CubeGeometry * self) {
  return self->__webglFaceBuffer;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_dynamic_p0(CubeGeometry * self) {
  return self->dynamic;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglVertexBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglVertexBuffer = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_colorsNeedUpdate_p0(CubeGeometry * self) {
  return self->colorsNeedUpdate;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeFaceNormals_p0(CubeGeometry * self) {
  return self->computeFaceNormals();
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_normalsNeedUpdate_p0(CubeGeometry * self) {
  return self->normalsNeedUpdate;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglLineBuffer_p0(CubeGeometry * self) {
  return self->__webglLineBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglLineBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglLineBuffer = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglSkinIndicesBuffer_p0(CubeGeometry * self) {
  return self->__webglSkinIndicesBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_colorsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->colorsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglTangentBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglTangentBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_elementsNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->elementsNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry____destroy___p0(CubeGeometry * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_name_p1(CubeGeometry * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_verticesNeedUpdate_p1(CubeGeometry * self, bool arg0) {
  self->verticesNeedUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_width_p1(CubeGeometry * self, double arg0) {
  self->width = arg0;
}
BoundingBox * __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_boundingBox_p0(CubeGeometry * self) {
  return self->boundingBox;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__computeBoundingBox_p0(CubeGeometry * self) {
  return self->computeBoundingBox();
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_boundingSphere_p1(CubeGeometry * self, BoundingSphere * arg0) {
  self->boundingSphere = arg0;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglLineDistanceBuffer_p0(CubeGeometry * self) {
  return self->__webglLineDistanceBuffer;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglFaceBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglFaceBuffer = arg0;
}
char * __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_name_p0(CubeGeometry * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set___webglSkinWeightsBuffer_p1(CubeGeometry * self, GLuint arg0) {
  self->__webglSkinWeightsBuffer = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_depthSegments_p1(CubeGeometry * self, int arg0) {
  self->depthSegments = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_depth_p0(CubeGeometry * self) {
  return self->depth;
}
Geometry* __attribute__((used, noinline)) emscripten_bind_CubeGeometry__applyMatrix_p1(CubeGeometry * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_id_p1(CubeGeometry * self, int arg0) {
  self->id = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_CubeGeometry__set_dynamic_p1(CubeGeometry * self, bool arg0) {
  self->dynamic = arg0;
}
double __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_width_p0(CubeGeometry * self) {
  return self->width;
}
GLuint __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get___webglSkinWeightsBuffer_p0(CubeGeometry * self) {
  return self->__webglSkinWeightsBuffer;
}
int __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_widthSegments_p0(CubeGeometry * self) {
  return self->widthSegments;
}
bool __attribute__((used, noinline)) emscripten_bind_CubeGeometry__get_verticesNeedUpdate_p0(CubeGeometry * self) {
  return self->verticesNeedUpdate;
}
bool __attribute__((used, noinline)) emscripten_bind_Face4__instanceOf_p1(Face4 * self, int arg0) {
  return self->instanceOf(arg0);
}
int __attribute__((used, noinline)) emscripten_bind_Face4__get_materialIndex_p0(Face4 * self) {
  return self->materialIndex;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_centroid_p1(Face4 * self, Vector3 * arg0) {
  self->centroid = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_normal_p1(Face4 * self, Vector3 * arg0) {
  self->normal = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face4__get_centroid_p0(Face4 * self) {
  return self->centroid;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_Face4__get_normal_p0(Face4 * self) {
  return self->normal;
}
Face4* __attribute__((used, noinline)) emscripten_bind_Face4__clone_p0(Face4 * self) {
  return self->clone();
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_materialIndex_p1(Face4 * self, int arg0) {
  self->materialIndex = arg0;
}
Color * __attribute__((used, noinline)) emscripten_bind_Face4__get_color_p0(Face4 * self) {
  return self->color;
}
Face4 * __attribute__((used, noinline)) emscripten_bind_Face4__Face4_p0() {
  return new Face4();
}
Face4 * __attribute__((used, noinline)) emscripten_bind_Face4__Face4_p4(int arg0, int arg1, int arg2, int arg3) {
  return new Face4(arg0, arg1, arg2, arg3);
}
Face4 * __attribute__((used, noinline)) emscripten_bind_Face4__Face4_p7(int arg0, int arg1, int arg2, int arg3, Vector3 * arg4, Color * arg5, int arg6) {
  return new Face4(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
}
void __attribute__((used, noinline)) emscripten_bind_Face4____destroy___p0(Face4 * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_color_p1(Face4 * self, Color * arg0) {
  self->color = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Face4__get_d_p0(Face4 * self) {
  return self->d;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_a_p1(Face4 * self, int arg0) {
  self->a = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_b_p1(Face4 * self, int arg0) {
  self->b = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_c_p1(Face4 * self, int arg0) {
  self->c = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_Face4__set_d_p1(Face4 * self, int arg0) {
  self->d = arg0;
}
int __attribute__((used, noinline)) emscripten_bind_Face4__get_a_p0(Face4 * self) {
  return self->a;
}
int __attribute__((used, noinline)) emscripten_bind_Face4__get_b_p0(Face4 * self) {
  return self->b;
}
int __attribute__((used, noinline)) emscripten_bind_Face4__get_c_p0(Face4 * self) {
  return self->c;
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
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderTargetCube____destroy___p0(WebGLRenderTargetCube * self) {
  delete self;
}
WebGLRenderTargetCube * __attribute__((used, noinline)) emscripten_bind_WebGLRenderTargetCube__WebGLRenderTargetCube_p0() {
  return new WebGLRenderTargetCube();
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
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__instanceOf_p1(AmbientLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_material_p0(AmbientLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_scale_p1(AmbientLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_receiveShadow_p0(AmbientLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_renderDepth_p1(AmbientLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_matrixWorld_p0(AmbientLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_matrixRotationWorld_p1(AmbientLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_matrixWorldNeedsUpdate_p1(AmbientLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_orientation_p0(AmbientLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_castShadow_p1(AmbientLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_target_p0(AmbientLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__add_p1(AmbientLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_rotation_p0(AmbientLight * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__translateX_p1(AmbientLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__translateY_p1(AmbientLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__translateZ_p1(AmbientLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get__modelViewMatrix_p0(AmbientLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_matrixWorldNeedsUpdate_p0(AmbientLight * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_renderDepth_p0(AmbientLight * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_up_p0(AmbientLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_matrix_p0(AmbientLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_name_p0(AmbientLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_geometry_p1(AmbientLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_color_p1(AmbientLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_forceAccum_p1(AmbientLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight____removeObject_p1(AmbientLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__traverse_p1(AmbientLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_acceleration_p1(AmbientLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_useQuaternion_p0(AmbientLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_torqueAccum_p0(AmbientLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__lookAt_p1(AmbientLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__remove_p1(AmbientLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_orientation_p1(AmbientLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set___webglActive_p1(AmbientLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__hasParent_p0(AmbientLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_target_p1(AmbientLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_matrixWorld_p1(AmbientLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_matrix_p1(AmbientLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_sortParticles_p1(AmbientLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_rotationAutoUpdate_p1(AmbientLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_visible_p1(AmbientLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get__normalMatrix_p0(AmbientLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_id_p1(AmbientLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_matrixRotationWorld_p0(AmbientLight * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_matrixAutoUpdate_p1(AmbientLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_up_p1(AmbientLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_velocity_p0(AmbientLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_AmbientLight__localToWorld_p1(AmbientLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_scale_p0(AmbientLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_geometry_p0(AmbientLight * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__translate_p2(AmbientLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_parent_p1(AmbientLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_receiveShadow_p1(AmbientLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_parent_p0(AmbientLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_forceAccum_p0(AmbientLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_id_p0(AmbientLight * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__updateMatrixWorld_p0(AmbientLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__updateMatrixWorld_p1(AmbientLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_rotation_p1(AmbientLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_material_p1(AmbientLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set__modelViewMatrix_p1(AmbientLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_sortParticles_p0(AmbientLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get___webglInit_p0(AmbientLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__applyMatrix_p1(AmbientLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_color_p0(AmbientLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_castShadow_p0(AmbientLight * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_rotationAutoUpdate_p0(AmbientLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_position_p1(AmbientLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_velocity_p1(AmbientLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_acceleration_p0(AmbientLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get___webglActive_p0(AmbientLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__updateMatrix_p0(AmbientLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set__normalMatrix_p1(AmbientLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_frustumCulled_p0(AmbientLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_frustumCulled_p1(AmbientLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_position_p0(AmbientLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set___webglInit_p1(AmbientLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AmbientLight__clone_p0(AmbientLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_visible_p0(AmbientLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_useQuaternion_p1(AmbientLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AmbientLight__get_matrixAutoUpdate_p0(AmbientLight * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_AmbientLight__worldToLocal_p1(AmbientLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight____destroy___p0(AmbientLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_name_p1(AmbientLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight____addObject_p1(AmbientLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AmbientLight__set_torqueAccum_p1(AmbientLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
AmbientLight * __attribute__((used, noinline)) emscripten_bind_AmbientLight__AmbientLight_p1(unsigned int arg0) {
  return new AmbientLight(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_Color__Color_p0() {
  return new Color();
}
void __attribute__((used, noinline)) emscripten_bind_Color____destroy___p0(Color * self) {
  delete self;
}
bool __attribute__((used, noinline)) emscripten_bind_SpriteMaterial__instanceOf_p1(SpriteMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpriteMaterial____destroy___p0(SpriteMaterial * self) {
  delete self;
}
SpriteMaterial * __attribute__((used, noinline)) emscripten_bind_SpriteMaterial__SpriteMaterial_p0() {
  return new SpriteMaterial();
}
bool __attribute__((used, noinline)) emscripten_bind_MeshDepthMaterial__instanceOf_p1(MeshDepthMaterial * self, int arg0) {
  return self->instanceOf(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_MeshDepthMaterial____destroy___p0(MeshDepthMaterial * self) {
  delete self;
}
MeshDepthMaterial * __attribute__((used, noinline)) emscripten_bind_MeshDepthMaterial__MeshDepthMaterial_p0() {
  return new MeshDepthMaterial();
}
void __attribute__((used, noinline)) emscripten_bind_Ribbon____destroy___p0(Ribbon * self) {
  delete self;
}
Ribbon * __attribute__((used, noinline)) emscripten_bind_Ribbon__Ribbon_p0() {
  return new Ribbon();
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__instanceOf_p1(AreaLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_material_p0(AreaLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_scale_p1(AreaLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_receiveShadow_p0(AreaLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_renderDepth_p1(AreaLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_matrixWorld_p0(AreaLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_matrixRotationWorld_p1(AreaLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_matrixWorldNeedsUpdate_p1(AreaLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_orientation_p0(AreaLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_castShadow_p1(AreaLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_target_p0(AreaLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__add_p1(AreaLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_rotation_p0(AreaLight * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__translateX_p1(AreaLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__translateY_p1(AreaLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__translateZ_p1(AreaLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get__modelViewMatrix_p0(AreaLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_matrixWorldNeedsUpdate_p0(AreaLight * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_AreaLight__get_renderDepth_p0(AreaLight * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_up_p0(AreaLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_matrix_p0(AreaLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_name_p0(AreaLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_geometry_p1(AreaLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_color_p1(AreaLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_forceAccum_p1(AreaLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight____removeObject_p1(AreaLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__traverse_p1(AreaLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_acceleration_p1(AreaLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_useQuaternion_p0(AreaLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_torqueAccum_p0(AreaLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__lookAt_p1(AreaLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__remove_p1(AreaLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_orientation_p1(AreaLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set___webglActive_p1(AreaLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__hasParent_p0(AreaLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_target_p1(AreaLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_matrixWorld_p1(AreaLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_matrix_p1(AreaLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_sortParticles_p1(AreaLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_rotationAutoUpdate_p1(AreaLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_visible_p1(AreaLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get__normalMatrix_p0(AreaLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_id_p1(AreaLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_matrixRotationWorld_p0(AreaLight * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_matrixAutoUpdate_p1(AreaLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_up_p1(AreaLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_velocity_p0(AreaLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_AreaLight__localToWorld_p1(AreaLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_scale_p0(AreaLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_geometry_p0(AreaLight * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__translate_p2(AreaLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_parent_p1(AreaLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_receiveShadow_p1(AreaLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_parent_p0(AreaLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_forceAccum_p0(AreaLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_AreaLight__get_id_p0(AreaLight * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__updateMatrixWorld_p0(AreaLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__updateMatrixWorld_p1(AreaLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_rotation_p1(AreaLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_material_p1(AreaLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set__modelViewMatrix_p1(AreaLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_sortParticles_p0(AreaLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get___webglInit_p0(AreaLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__applyMatrix_p1(AreaLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_color_p0(AreaLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_castShadow_p0(AreaLight * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_rotationAutoUpdate_p0(AreaLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_position_p1(AreaLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_velocity_p1(AreaLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_acceleration_p0(AreaLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get___webglActive_p0(AreaLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__updateMatrix_p0(AreaLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set__normalMatrix_p1(AreaLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_frustumCulled_p0(AreaLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_frustumCulled_p1(AreaLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_AreaLight__get_position_p0(AreaLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set___webglInit_p1(AreaLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_AreaLight__clone_p0(AreaLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_visible_p0(AreaLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_useQuaternion_p1(AreaLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_AreaLight__get_matrixAutoUpdate_p0(AreaLight * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_AreaLight__worldToLocal_p1(AreaLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight____destroy___p0(AreaLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_name_p1(AreaLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight____addObject_p1(AreaLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_AreaLight__set_torqueAccum_p1(AreaLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
}
AreaLight * __attribute__((used, noinline)) emscripten_bind_AreaLight__AreaLight_p1(unsigned int arg0) {
  return new AreaLight(arg0);
}
WebGLRenderTarget * __attribute__((used, noinline)) emscripten_bind_WebGLRenderTarget__WebGLRenderTarget_p0() {
  return new WebGLRenderTarget();
}
void __attribute__((used, noinline)) emscripten_bind_WebGLRenderTarget____destroy___p0(WebGLRenderTarget * self) {
  delete self;
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
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__instanceOf_p1(SpotLight * self, int arg0) {
  return self->instanceOf(arg0);
}
Material * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_material_p0(SpotLight * self) {
  return self->material;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_scale_p1(SpotLight * self, Vector3 * arg0) {
  self->scale = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_receiveShadow_p0(SpotLight * self) {
  return self->receiveShadow;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_renderDepth_p1(SpotLight * self, int arg0) {
  self->renderDepth = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_matrixWorld_p0(SpotLight * self) {
  return self->matrixWorld;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_matrixRotationWorld_p1(SpotLight * self, Matrix4 * arg0) {
  self->matrixRotationWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_matrixWorldNeedsUpdate_p1(SpotLight * self, bool arg0) {
  self->matrixWorldNeedsUpdate = arg0;
}
Quaternion * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_orientation_p0(SpotLight * self) {
  return self->orientation;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_castShadow_p1(SpotLight * self, bool arg0) {
  self->castShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_target_p0(SpotLight * self) {
  return self->target;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__add_p1(SpotLight * self, Object3D * arg0) {
  self->add(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_rotation_p0(SpotLight * self) {
  return self->rotation;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__translateX_p1(SpotLight * self, double arg0) {
  return self->translateX(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__translateY_p1(SpotLight * self, double arg0) {
  return self->translateY(arg0);
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__translateZ_p1(SpotLight * self, double arg0) {
  return self->translateZ(arg0);
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get__modelViewMatrix_p0(SpotLight * self) {
  return self->_modelViewMatrix;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_matrixWorldNeedsUpdate_p0(SpotLight * self) {
  return self->matrixWorldNeedsUpdate;
}
int __attribute__((used, noinline)) emscripten_bind_SpotLight__get_renderDepth_p0(SpotLight * self) {
  return self->renderDepth;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_up_p0(SpotLight * self) {
  return self->up;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_matrix_p0(SpotLight * self) {
  return self->matrix;
}
char * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_name_p0(SpotLight * self) {
  return self->name;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_geometry_p1(SpotLight * self, Geometry * arg0) {
  self->geometry = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_color_p1(SpotLight * self, Color * arg0) {
  self->color = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_forceAccum_p1(SpotLight * self, Vector3 * arg0) {
  self->forceAccum = arg0;
}
SpotLight * __attribute__((used, noinline)) emscripten_bind_SpotLight__SpotLight_p1(unsigned int arg0) {
  return new SpotLight(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__traverse_p1(SpotLight * self, int arg0) {
  self->traverse(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_acceleration_p1(SpotLight * self, Vector3 * arg0) {
  self->acceleration = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_useQuaternion_p0(SpotLight * self) {
  return self->useQuaternion;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_torqueAccum_p0(SpotLight * self) {
  return self->torqueAccum;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__lookAt_p1(SpotLight * self, Vector3 * arg0) {
  self->lookAt(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__remove_p1(SpotLight * self, Object3D * arg0) {
  self->remove(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_orientation_p1(SpotLight * self, Quaternion * arg0) {
  self->orientation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set___webglActive_p1(SpotLight * self, bool arg0) {
  self->__webglActive = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__hasParent_p0(SpotLight * self) {
  return self->hasParent();
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_target_p1(SpotLight * self, Object3D * arg0) {
  self->target = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_matrixWorld_p1(SpotLight * self, Matrix4 * arg0) {
  self->matrixWorld = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_matrix_p1(SpotLight * self, Matrix4 * arg0) {
  self->matrix = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_sortParticles_p1(SpotLight * self, bool arg0) {
  self->sortParticles = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_rotationAutoUpdate_p1(SpotLight * self, bool arg0) {
  self->rotationAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_visible_p1(SpotLight * self, bool arg0) {
  self->visible = arg0;
}
Matrix3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get__normalMatrix_p0(SpotLight * self) {
  return self->_normalMatrix;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight____removeObject_p1(SpotLight * self, Object3D * arg0) {
  self->__removeObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_id_p1(SpotLight * self, int arg0) {
  self->id = arg0;
}
Matrix4 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_matrixRotationWorld_p0(SpotLight * self) {
  return self->matrixRotationWorld;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_matrixAutoUpdate_p1(SpotLight * self, bool arg0) {
  self->matrixAutoUpdate = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_up_p1(SpotLight * self, Vector3 * arg0) {
  self->up = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_velocity_p0(SpotLight * self) {
  return self->velocity;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_SpotLight__localToWorld_p1(SpotLight * self, Vector3 * arg0) {
  return self->localToWorld(arg0);
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_scale_p0(SpotLight * self) {
  return self->scale;
}
Geometry * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_geometry_p0(SpotLight * self) {
  return self->geometry;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__translate_p2(SpotLight * self, double arg0, Vector3 * arg1) {
  return self->translate(arg0, arg1);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_parent_p1(SpotLight * self, Object3D * arg0) {
  self->parent = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_receiveShadow_p1(SpotLight * self, bool arg0) {
  self->receiveShadow = arg0;
}
Object3D * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_parent_p0(SpotLight * self) {
  return self->parent;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_forceAccum_p0(SpotLight * self) {
  return self->forceAccum;
}
int __attribute__((used, noinline)) emscripten_bind_SpotLight__get_id_p0(SpotLight * self) {
  return self->id;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__updateMatrixWorld_p0(SpotLight * self) {
  self->updateMatrixWorld();
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__updateMatrixWorld_p1(SpotLight * self, bool arg0) {
  self->updateMatrixWorld(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_rotation_p1(SpotLight * self, Vector3 * arg0) {
  self->rotation = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_material_p1(SpotLight * self, Material * arg0) {
  self->material = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set__modelViewMatrix_p1(SpotLight * self, Matrix4 * arg0) {
  self->_modelViewMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_sortParticles_p0(SpotLight * self) {
  return self->sortParticles;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get___webglInit_p0(SpotLight * self) {
  return self->__webglInit;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__applyMatrix_p1(SpotLight * self, Matrix4 * arg0) {
  return self->applyMatrix(arg0);
}
Color * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_color_p0(SpotLight * self) {
  return self->color;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_castShadow_p0(SpotLight * self) {
  return self->castShadow;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_rotationAutoUpdate_p0(SpotLight * self) {
  return self->rotationAutoUpdate;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_position_p1(SpotLight * self, Vector3 * arg0) {
  self->position = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_velocity_p1(SpotLight * self, Vector3 * arg0) {
  self->velocity = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_acceleration_p0(SpotLight * self) {
  return self->acceleration;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get___webglActive_p0(SpotLight * self) {
  return self->__webglActive;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__updateMatrix_p0(SpotLight * self) {
  self->updateMatrix();
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set__normalMatrix_p1(SpotLight * self, Matrix3 * arg0) {
  self->_normalMatrix = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_frustumCulled_p0(SpotLight * self) {
  return self->frustumCulled;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_frustumCulled_p1(SpotLight * self, bool arg0) {
  self->frustumCulled = arg0;
}
Vector3 * __attribute__((used, noinline)) emscripten_bind_SpotLight__get_position_p0(SpotLight * self) {
  return self->position;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set___webglInit_p1(SpotLight * self, bool arg0) {
  self->__webglInit = arg0;
}
Object3D* __attribute__((used, noinline)) emscripten_bind_SpotLight__clone_p0(SpotLight * self) {
  return self->clone();
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_visible_p0(SpotLight * self) {
  return self->visible;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_useQuaternion_p1(SpotLight * self, bool arg0) {
  self->useQuaternion = arg0;
}
bool __attribute__((used, noinline)) emscripten_bind_SpotLight__get_matrixAutoUpdate_p0(SpotLight * self) {
  return self->matrixAutoUpdate;
}
Vector3* __attribute__((used, noinline)) emscripten_bind_SpotLight__worldToLocal_p1(SpotLight * self, Vector3 * arg0) {
  return self->worldToLocal(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight____destroy___p0(SpotLight * self) {
  delete self;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_name_p1(SpotLight * self, char * arg0) {
  self->name = arg0;
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight____addObject_p1(SpotLight * self, Object3D * arg0) {
  self->__addObject(arg0);
}
void __attribute__((used, noinline)) emscripten_bind_SpotLight__set_torqueAccum_p1(SpotLight * self, Vector3 * arg0) {
  self->torqueAccum = arg0;
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

}
