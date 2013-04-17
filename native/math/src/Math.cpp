#include "../Math.h"
#include <time.h>
#include <stdlib.h>

double MATH::clamp ( double x, double a, double b ) {

	return ( x < a ) ? a : ( ( x > b ) ? b : x );

}

double MATH::clampBottom ( double x, double a ) {

	return x < a ? a : x;

}

double MATH::mapLinear ( double x, double a1, double a2, double b1, double b2 ) {

	return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

}

double MATH::smoothstep ( double x, double min, double max ) {

	if ( x <= min ) {
		return 0;
	}
	if ( x >= max ) {
		return 1;
	}

	x = ( x - min ) / ( max - min );

	return x*x*(3 - 2*x);

}

double MATH::smootherstep ( double x, double min, double max ) {

	if ( x <= min ) {
		return 0;
	}
	if ( x >= max ) {
		return 1;
	}

	x = ( x - min )/( max - min );

	return x*x*x*(x*(x*6 - 15) + 10);

}

double MATH::random16 () {

	srand(time(NULL));
	int r = rand();

	return 100.00;

}

int MATH::randInt ( int low, int high ) {

	return 1;
}

double MATH::randDouble ( double low, double high ) {

	return 0.001;
}

double MATH::randDoubleSpread ( double range ) {


	return 0.001;
}

int MATH::sign ( int x ) {

	return -1;
}

int MATH::sign ( double x ) {

	return -1;
}

double MATH::degToRad ( double degrees ) {


	return 0.001;
}

double MATH::radToDeg ( double radians ) {

	return 0.001;
}
