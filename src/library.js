mergeInto(LibraryManager.library, {
	
	getHeight: function() {
	   	return window.innerHeight;
	},
	resizeCanvas: function ( width, height, devicePixelRatio ) {

		Module.canvas.width = width * devicePixelRatio;
		Module.canvas.height = height * devicePixelRatio;

		Module.canvas.style.width = width + 'px';
		Module.canvas.style.height = height + 'px';

	},
	getWidth: function () {
		return window.innerWidth;
	},
	length: function ( obj ) {
		return obj.length;
	},
	callback: function ( text ) {
		console.log( Pointer_stringify( text ) );
	},
	_PtrToDwordArray: function(ptr, size) {
		console.log("pointer is " + ptr);
		var a = [];
		for ( var i = 1; i < size + 1; i++ ) {
			//a.push(HEAP32[((ptr + i)>>2)]);
			console.log(getValue( ptr + 4*i, '*' ))
			a.push( SMOKE.wrapPointer( getValue( ptr + 4*i, '*' ), SMOKE.Vector3 ) );
			console.log(a[i-1].get_x());
		}
		console.log(a);
		obj = a;
	},
	Infinity: function () {
		return Infinity;
	},
	invokeCallback: function ( callbackID, ptr, type ) {

		var obj;

		switch ( type ) {

			case types.Object3D_TYPE : 

				obj = wrapPointer( ptr, SMOKE.Object3D );

				break;

		}

		function_map[ callbackID ].call( obj );

	}
});