
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Clock.cpp
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Clock source
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include "../Clock.h"

void Clock::start () {

	isRunning = true;

	startTime = clock();

}

//----------------------------------------------------------------//

void Clock::stop () {

	getElapsedTime();
	isRunning = false;

}

//----------------------------------------------------------------//

double Clock::getElapsedTime () {

	getDelta();
	return elapsedTime;

}

//----------------------------------------------------------------//

double Clock::getDelta () {

	double diff = 0;

	if ( autoStart && isRunning == false ) {

		start();

	}

	if ( isRunning == true ) {

		clock_t newTime = clock();

		diff = 0.001 * (newTime - oldTime);
		oldTime = newTime;

		elapsedTime += diff;

	}

	return diff;

}

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/