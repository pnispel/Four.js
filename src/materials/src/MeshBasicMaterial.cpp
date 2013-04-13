#include "../MeshBasicMaterial.h"
#include "../Material.h"
#include "../../math/Color.h"
#include "../../library.h"

MeshBasicMaterial::MeshBasicMaterial () : Material() {

	Color * color = new Color();
	color->setRGB( .4, .2, .1 );

	//lightMap = null;

	//specularMap = null;

	//envMap = null;
	combine = Four::MultiplyOperation;
	reflectivity = 1;
	refractionRatio = 0.98;

	fog = true;

	shading = Four::SmoothShading;

	wireframe = false;
	wireframeLinewidth = 1;
	//wireframeLinecap = 'round';
	//wireframeLinejoin = 'round';

	vertexColors = Four::NoColors;

	skinning = false;
	morphTargets = false;

}