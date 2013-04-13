
#ifndef CLOCK_H
#define CLOCK_H
/*
 // *****************************************************************************
 // *****************************************************************************
 // **
 // ** File Name: SMOKE.Clock.h
 // **
 // ** Author: Paul Nispel
 // **
 // ** Creation Date: 2/24/2013
 // **
 // ** Description: Contains Clock header
 // **
 // *****************************************************************************
 // **
 // ** Copyright Paul Nispel 2013
 // **
 // *****************************************************************************
 // *****************************************************************************
 */

#include <ctime>
#include <sys/time.h>

/********************************************************************
***         C L O C K    D E F I N I T I O N
********************************************************************/

class Clock {

	clock_t startTime;
	clock_t oldTime;
	double elapsedTime;

	bool autoStart;
	bool isRunning;

public: 
	Clock( bool shouldStart ){ autoStart = shouldStart; oldTime = 0; }
	Clock(){ autoStart = true; oldTime = 0; }

	bool running () { return isRunning; }

	void start ();
	void stop ();
	double getElapsedTime ();
	double getDelta ();

	virtual bool instanceOf ( int type ) {

		if ( type == 5 ) { return true; }
		return false;

	}

};

#endif

/********************************************************************
***			E N D    O F    F I L E
********************************************************************/