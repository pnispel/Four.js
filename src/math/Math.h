#ifndef MATH_H
#define MATH_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Line3.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: 
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

class MATH {

public:
	MATH(){}

	static double clamp ( double x, double a, double b );
	static double clampBottom ( double x, double a );
	static double mapLinear ( double x, double a1, double a2, double b1, double b2 );
	static double smoothstep ( double x, double min, double max );
	static double smootherstep ( double x, double min, double max );
	static double random16 ();
	static int randInt ( int low, int high );
	static double randDouble ( double low, double high );
	static double randDoubleSpread ( double range );
	static int sign ( int x );
	static int sign ( double x );
	static double degToRad ( double degrees );
	static double radToDeg ( double radians );

};

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/
#endif 