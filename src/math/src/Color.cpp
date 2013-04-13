#include "../Color.h"
#include <math.h>

Color::Color () {
	r = 0;
	g = 0;
	b = 0;
}

Color::Color ( double mr, double mg, double mb ) {

	r = mr;
	g = mg;
	b = mb;

}

Color * Color::set ( unsigned int hex ) {

	hex = floor( hex );

	r = ( hex >> 16 & 255 ) / 255;
	g = ( hex >> 8 & 255 ) / 255;
	b = ( hex & 255 ) / 255;

	return this;

}

Color * Color::setRGB ( double ir, double ig, double ib ) {

	r = ir;
	g = ig;
	b = ib;

	return this;

}

Color * Color::copy ( Color * color ) {

	r = color->r;
	g = color->g;
	b = color->b;

	return this;

}

Color * Color::copyGammaToLinear ( Color * color ) {

	r = color->r * color->r;
	g = color->g * color->g;
	b = color->b * color->b;

	return this;

}

Color * Color::convertGammaToLinear () {

	double mr = r, mg = g, mb = b;

	r = mr * mr;
	g = mg * mg;
	b = mb * mb;

	return this;

}

Color * Color::convertLinearToGamma () {

	r = sqrt( r );
	g = sqrt( g );
	b = sqrt( b );

	return this;

}

Color * Color::add ( Color * color ) {

	r += color->r;
	g += color->g;
	b += color->b;

	return this;

}

Color * Color::addColors ( Color * c1, Color * c2 ) {

	r = c1->r + c2->r;
	g = c1->g + c2->g;
	b = c1->b + c2->b;

	return this;

}

Color * Color::clone () {

	Color * clone = new Color( r, g, b );

	return clone;

}