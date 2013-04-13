/*global Module*/
/*global HEAP32*/
/*global Pointer_stringify, writeStringToMemory*/
/*global requireRegisteredType*/

var _emval_handle_array = [];
var _emval_free_list = [];

// Public JS API

/** @expose */
Module.count_emval_handles = function() {
    return _emval_handle_array.length;
};

// Private C++ API

function __emval_register(value) {
    var handle = _emval_free_list.length ?
        _emval_free_list.pop() :
        _emval_handle_array.length;
    _emval_handle_array[handle] = {refcount: 1, value: value};
    return handle;
}

function __emval_incref(handle) {
    _emval_handle_array[handle].refcount += 1;
}

function __emval_decref(handle) {
    if (0 === --_emval_handle_array[handle].refcount) {
        delete _emval_handle_array[handle];
        _emval_free_list.push(handle);

        var actual_length = _emval_handle_array.length;
        while (actual_length > 0 && _emval_handle_array[actual_length - 1] === undefined) {
            --actual_length;
        }
        _emval_handle_array.length = actual_length;
    }
}

function __emval_new_object() {
    return __emval_register({});
}

function __emval_new_long(value) {
    return __emval_register(value);
}

function __emval_new_cstring(str) {
    return __emval_register(Pointer_stringify(str));
}

function __emval_get_property(handle, k) {
    k = Pointer_stringify(k);
    return __emval_register(_emval_handle_array[handle].value[k]);
}

function __emval_get_property_by_long(handle, k) {
    return __emval_register(_emval_handle_array[handle].value[k]);
}

function __emval_get_property_by_unsigned_long(handle, k) {
    return __emval_register(_emval_handle_array[handle].value[k]);
}

function __emval_set_property(handle, k, value) {
    k = Pointer_stringify(k);
    _emval_handle_array[handle].value[k] = _emval_handle_array[value].value;
}

function __emval_set_property_by_int(handle, k, value) {
    _emval_handle_array[handle].value[k] = _emval_handle_array[value].value;
}

function __emval_as(handle, returnType) {
    returnType = requireRegisteredType(returnType, 'emval::as');
    var destructors = [];
    // caller owns destructing
    return returnType.toWireType(destructors, _emval_handle_array[handle].value);
}

function __emval_call(handle, argCount, argTypes) {
    var args = Array.prototype.slice.call(arguments, 3);
    var fn = _emval_handle_array[handle].value;
    var a = new Array(argCount);
    for (var i = 0; i < argCount; ++i) {
        var argType = requireRegisteredType(
            HEAP32[(argTypes >> 2) + i],
            "parameter " + i);
        a[i] = argType.fromWireType(args[i]);
    }
    var rv = fn.apply(undefined, a);
    return __emval_register(rv);
}

function __emval_call_method(handle, name, argCount, argTypes) {
    name = Pointer_stringify(name);
    var args = Array.prototype.slice.call(arguments, 4);
    var obj = _emval_handle_array[handle].value;
    var a = new Array(argCount);
    for (var i = 0; i < argCount; ++i) {
        var argType = requireRegisteredType(
            HEAP32[(argTypes >> 2) + i],
            "parameter " + i);
        a[i] = argType.fromWireType(args[i]);
    }
    var rv = obj[name].apply(obj, a);
    return __emval_register(rv);
}
