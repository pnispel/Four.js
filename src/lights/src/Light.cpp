#include "../Light.h"
#include "../../math/Color.h"

Light::Light ( unsigned int hex ) : Object3D() {

	color = new Color();

	color->set( hex );

}