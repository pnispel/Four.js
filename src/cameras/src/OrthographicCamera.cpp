#include "../OrthographicCamera.h"
#include "../../math/Matrix.h"

OrthographicCamera::OrthographicCamera ( double dleft, double dright, double dtop, double dbottom, double dnear = 0, double dfar = 0) : Camera() {

	left = dleft;
	right = dright;
	top = dtop;
	bottom = dbottom;
	near = dnear;
	far = dfar;

	updateProjectionMatrix();

}

void OrthographicCamera::updateProjectionMatrix () {

	projectionMatrix->makeOrthographic( left, right, top, bottom, near, far );

}