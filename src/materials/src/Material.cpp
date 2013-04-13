#include "../Material.h"
#include "../../library.h"

Material::Material () {

	id = Four::get().MaterialIdCount++;

	side = Four::FrontSide;

	opacity = 1;
	transparent = false;

	blending = Four::NormalBlending;

	blendSrc = Four::SrcAlphaFactor;
	blendDst = Four::OneMinusSrcAlphaFactor;
	blendEquation = Four::AddEquation;

	depthTest = true;
	depthWrite = true;

	polygonOffset = false;
	polygonOffsetFactor = 0;
	polygonOffsetUnits = 0;

	alphaTest = 0;

	overdraw = false; // Boolean for fixing antialiasing gaps in CanvasRenderer

	visible = true;

	needsUpdate = true;

}