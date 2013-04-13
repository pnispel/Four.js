#include "../PerspectiveCamera.h"
#include "../../math/Math.h"
#include "../../math/Matrix.h"
#include <math.h>

PerspectiveCamera::PerspectiveCamera ( double dfov, double daspect, double dnear, double dfar ) : Camera() {

	fov = dfov;
	aspect = daspect;
	near = dnear;
	far = dfar;
	fullWidth = 0;

	updateProjectionMatrix();

}

void PerspectiveCamera::setLens ( double focalLength, double frameHeight = 24 ) {

	fov = 2 * MATH::radToDeg( atan( frameHeight / ( focalLength * 2 ) ) );
	updateProjectionMatrix();

}

void PerspectiveCamera::setViewOffset( double dfullWidth, double dfullHeight, double dx, double dy, double dwidth, double dheight ) {

	fullWidth = dfullWidth;
	fullHeight = dfullHeight;
	x = dx;
	y = dy;
	width = dwidth;
	height = dheight;

	updateProjectionMatrix();

}

void PerspectiveCamera::updateProjectionMatrix () {

	if ( fullWidth != 0 ) {

		double aspect = fullWidth / fullHeight;
		double top = tan( MATH::degToRad( fov * 0.5 ) ) * near;
		double bottom = -top;
		double left = aspect * bottom;
		double right = aspect * top;
		double width = fabs( right - left );
		double height = fabs( top - bottom );

		projectionMatrix->makeFrustum(
			left + x * width / fullWidth,
			left + ( x + width ) * width / fullWidth,
			top - ( y + height ) * height / fullHeight,
			top - y * height / fullHeight,
			near,
			far
		);

	} else {

		projectionMatrix->makePerspective( fov, aspect, near, far );

	}

}