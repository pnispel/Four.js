
#ifndef __ACTOR_H__
#define __ACTOR_H__

/*
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// --
// -- File Name: FOUR.Actor.h
// --
// -- Author(s): Paul Nispel
// --
// -- Creation Date: 4/17/2013
// --
// ----------------------------------------------------------------------------
// --
// -- Copyright Paul Nispel 2013
// --
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
*/

class Vector3;
class Component;

// ------------------------------------ //

#include "../core/Group.h"

// --------------------------------------------------------------------
// ***        A C T O R 
// --------------------------------------------------------------------

class Actor {


public: // ***	P U B L I C    V A R I A B L E S

	Actor * parent;	
	Vector3 * position;

	Group< Actor * > children;

public: // ***	P U B L I C    M E T H O D S

	Actor() {}

	Actor * createChild () { return this;}
	Actor * addChild () { return this;}

protected:


private:

};


#endif //__ACTOR_H__