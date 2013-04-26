// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
try {
  this['Module'] = Module;
} catch(e) {
  this['Module'] = Module = {};
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function(filename) { return Module['read'](filename, true) };
  Module['load'] = function(f) {
    globalEval(read(f));
  };
  if (!Module['arguments']) {
    Module['arguments'] = process['argv'].slice(2);
  }
}
if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  Module['read'] = read;
  Module['readBinary'] = function(f) {
    return read(f, 'binary');
  };
  if (!Module['arguments']) {
    if (typeof scriptArgs != 'undefined') {
      Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) {
  if (!Module['print']) {
    Module['print'] = function(x) {
      console.log(x);
    };
  }
  if (!Module['printErr']) {
    Module['printErr'] = function(x) {
      console.log(x);
    };
  }
}
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (!Module['arguments']) {
    if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WORKER) {
  // We can do very little here...
  var TRY_USE_DUMP = false;
  if (!Module['print']) {
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  Module['load'] = importScripts;
}
if (!ENVIRONMENT_IS_WORKER && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_SHELL) {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
if (!Module['preRun']) Module['preRun'] = [];
if (!Module['postRun']) Module['postRun'] = [];
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      var logg = log2(quantum);
      return '((((' +target + ')+' + (quantum-1) + ')>>' + logg + ')<<' + logg + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (/^\[\d+\ x\ (.*)\]/.test(type)) return true; // [15 x ?] blocks. Like structs
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type, quantumSize) {
    if (Runtime.QUANTUM_SIZE == 1) return 1;
    var size = {
      '%i1': 1,
      '%i8': 1,
      '%i16': 2,
      '%i32': 4,
      '%i64': 8,
      "%float": 4,
      "%double": 8
    }['%'+type]; // add '%' since float and double confuse Closure compiler as keys, and also spidermonkey as a compiler will remove 's from '_i8' etc
    if (!size) {
      if (type.charAt(type.length-1) == '*') {
        size = Runtime.QUANTUM_SIZE; // A pointer
      } else if (type[0] == 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 == 0);
        size = bits/8;
      }
    }
    return size;
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    type.flatIndexes = type.fields.map(function(field) {
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = size;
      } else if (Runtime.isStructType(field)) {
        size = Types.types[field].flatSize;
        alignSize = Types.types[field].alignSize;
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else {
        throw 'Unclear type in struct: ' + field + ', in ' + type.name_ + ' :: ' + dump(Types.types[type.name_]);
      }
      alignSize = type.packed ? 1 : Math.min(alignSize, Runtime.QUANTUM_SIZE);
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  addFunction: function (func, sig) {
    //assert(sig); // TODO: support asm
    var table = FUNCTION_TABLE; // TODO: support asm
    var ret = table.length;
    table.push(func);
    table.push(0);
    return ret;
  },
  removeFunction: function (index) {
    var table = FUNCTION_TABLE; // TODO: support asm
    table[index] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function() {
        Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xff;
      if (needed) {
        buffer.push(code);
        needed--;
      }
      if (buffer.length == 0) {
        if (code < 128) return String.fromCharCode(code);
        buffer.push(code);
        if (code > 191 && code < 224) {
          needed = 1;
        } else {
          needed = 2;
        }
        return '';
      }
      if (needed > 0) return '';
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var ret;
      if (c1 > 191 && c1 < 224) {
        ret = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      } else {
        ret = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = ((((STACKTOP)+3)>>2)<<2); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = ((((STATICTOP)+3)>>2)<<2); if (STATICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 4))*(quantum ? quantum : 4); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+(((low)>>>(0))))+((+(((high)>>>(0))))*(+(4294967296)))) : ((+(((low)>>>(0))))+((+(((high)|(0))))*(+(4294967296))))); return ret; },
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var setjmpId = 1; // Used in setjmp/longjmp
var setjmpLabels = {};
var ABORT = false;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function abort(text) {
  Module.print(text + ':\n' + (new Error).stack);
  ABORT = true;
  throw "Assertion: " + text;
}
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = globalScope['Module']['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length+1);
      writeStringToMemory(value, ret);
      return ret;
    } else if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,Math.min(Math.floor((value)/(+(4294967296))), (+(4294967295)))>>>0],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': (HEAPF64[(tempDoublePtr)>>3]=value,HEAP32[((ptr)>>2)]=((HEAP32[((tempDoublePtr)>>2)])|0),HEAP32[(((ptr)+(4))>>2)]=((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)); break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return (HEAP32[((tempDoublePtr)>>2)]=HEAP32[((ptr)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((ptr)+(4))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_NONE = 3; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    HEAPU8.set(new Uint8Array(slab), ret);
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return ((x+4095)>>12)<<12;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STACK_ROOT, STACKTOP, STACK_MAX;
var STATICTOP;
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value, or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(!!Int32Array && !!Float64Array && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
STACK_ROOT = STACKTOP = Runtime.alignMemory(1);
STACK_MAX = TOTAL_STACK; // we lose a little stack here, but TOTAL_STACK is nice and round so use that as the max
var tempDoublePtr = Runtime.alignMemory(allocate(12, 'i8', ALLOC_STACK), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
STATICTOP = STACK_MAX;
assert(STATICTOP < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
var nullString = allocate(intArrayFromString('(null)'), 'i8', ALLOC_STACK);
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATINIT__ = []; // functions called during startup
var __ATMAIN__ = []; // functions called when main() is to be run
var __ATEXIT__ = []; // functions called during shutdown
var runtimeInitialized = false;
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math.imul) Math.imul = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyTracking = {};
var calledInit = false, calledRun = false;
var runDependencyWatcher = null;
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 6000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    } 
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!calledRun && shouldRunNow) run();
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
function addPreRun(func) {
  if (!Module['preRun']) Module['preRun'] = [];
  else if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
  Module['preRun'].push(func);
}
var awaitingMemoryInitializer = false;
function loadMemoryInitializer(filename) {
  function applyData(data) {
    HEAPU8.set(data, TOTAL_STACK);
    runPostSets();
  }
  // always do this asynchronously, to keep shell and web as similar as possible
  addPreRun(function() {
    if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
      applyData(Module['readBinary'](filename));
    } else {
      Browser.asyncLoad(filename, function(data) {
        applyData(data);
      }, function(data) {
        throw 'could not load memory initializer ' + filename;
      });
    }
  });
  awaitingMemoryInitializer = false;
}
// === Body ===
/* no memory initializer */
function runPostSets() {
}
if (!awaitingMemoryInitializer) runPostSets();
  Module["_memcpy"] = _memcpy;
  Module["_memset"] = _memset;
  function _malloc(bytes) {
      /* Over-allocate to make sure it is byte-aligned by 8.
       * This will leak memory, but this is only the dummy
       * implementation (replaced by dlmalloc normally) so
       * not an issue.
       */
      var ptr = Runtime.staticAlloc(bytes + 8);
      return (ptr+8) & 0xFFFFFFF8;
    }
  function _free(){}
  Module["_strlen"] = _strlen;
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (Browser.initted) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : console.log("warning: cannot create object URLs");
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        function getMimetype(name) {
          return {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'bmp': 'image/bmp',
            'ogg': 'audio/ogg',
            'wav': 'audio/wav',
            'mp3': 'audio/mpeg'
          }[name.substr(name.lastIndexOf('.')+1)];
        }
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
        var imagePlugin = {};
        imagePlugin['canHandle'] = function(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/.exec(name);
        };
        imagePlugin['handle'] = function(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            setTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'];
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule) {
        var ctx;
        try {
          if (useWebGL) {
            ctx = canvas.getContext('experimental-webgl', {
              alpha: false
            });
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas - ' + e);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        this.lockPointer = lockPointer;
        this.resizeCanvas = resizeCanvas;
        if (typeof this.lockPointer === 'undefined') this.lockPointer = true;
        if (typeof this.resizeCanvas === 'undefined') this.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!this.fullScreenHandlersInstalled) {
          this.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen(); 
      },requestAnimationFrame:function (func) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                         window['mozRequestAnimationFrame'] ||
                                         window['webkitRequestAnimationFrame'] ||
                                         window['msRequestAnimationFrame'] ||
                                         window['oRequestAnimationFrame'] ||
                                         window['setTimeout'];
        }
        window.requestAnimationFrame(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      }};
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
var Math_min = Math.min;
function invoke_vi(index,a1) {
  try {
    Module.dynCall_vi(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ii(index,a1) {
  try {
    return Module.dynCall_ii(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module.dynCall_iii(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_v(index) {
  try {
    Module.dynCall_v(index);
  } catch(e) {
    asm.setThrew(1);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=+env.NaN;var n=+env.Infinity;var o=0;var p=0;var q=0,r=0,s=0,t=0,u=0.0,v=0,w=0,x=0,y=0.0;var z=0;var A=0;var B=0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=global.Math.floor;var K=global.Math.abs;var L=global.Math.sqrt;var M=global.Math.pow;var N=global.Math.cos;var O=global.Math.sin;var P=global.Math.tan;var Q=global.Math.acos;var R=global.Math.asin;var S=global.Math.atan;var T=global.Math.atan2;var U=global.Math.exp;var V=global.Math.log;var W=global.Math.ceil;var X=global.Math.imul;var Y=env.abort;var Z=env.assert;var _=env.asmPrintInt;var $=env.asmPrintFloat;var aa=env.copyTempDouble;var ab=env.copyTempFloat;var ac=env.min;var ad=env.invoke_vi;var ae=env.invoke_ii;var af=env.invoke_iii;var ag=env.invoke_v;var ah=env._malloc;var ai=env._free;
// EMSCRIPTEN_START_FUNCS
function an(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+3>>2<<2;return b|0}function ao(){return i|0}function ap(a){a=a|0;i=a}function aq(a){a=a|0;o=a}function ar(a){a=a|0;z=a}function as(a){a=a|0;A=a}function at(a){a=a|0;B=a}function au(a){a=a|0;C=a}function av(a){a=a|0;D=a}function aw(a){a=a|0;E=a}function ax(a){a=a|0;F=a}function ay(a){a=a|0;G=a}function az(a){a=a|0;H=a}function aA(a){a=a|0;I=a}function aB(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2]|0;b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function aC(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function aD(b){b=b|0;var c=0;c=b;while(a[c]|0!=0){c=c+1|0}return c-b|0}function aE(a,b){a=a|0;b=b|0;aj[a&1](b|0)}function aF(a,b){a=a|0;b=b|0;return ak[a&1](b|0)|0}function aG(a,b,c){a=a|0;b=b|0;c=c|0;return al[a&1](b|0,c|0)|0}function aH(a){a=a|0;am[a&1]()}function aI(a){a=a|0;Y(0)}function aJ(a){a=a|0;Y(1);return 0}function aK(a,b){a=a|0;b=b|0;Y(2);return 0}function aL(){Y(3)}
// EMSCRIPTEN_END_FUNCS
var aj=[aI,aI];var ak=[aJ,aJ];var al=[aK,aK];var am=[aL,aL];return{stackAlloc:an,stackSave:ao,stackRestore:ap,setThrew:aq,setTempRet0:ar,setTempRet1:as,setTempRet2:at,setTempRet3:au,setTempRet4:av,setTempRet5:aw,setTempRet6:ax,setTempRet7:ay,setTempRet8:az,setTempRet9:aA,dynCall_vi:aE,dynCall_ii:aF,dynCall_iii:aG,dynCall_v:aH}})
// EMSCRIPTEN_END_ASM
({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, { abort: abort, assert: assert, asmPrintInt: asmPrintInt, asmPrintFloat: asmPrintFloat, copyTempDouble: copyTempDouble, copyTempFloat: copyTempFloat, min: Math_min, invoke_vi: invoke_vi, invoke_ii: invoke_ii, invoke_iii: invoke_iii, invoke_v: invoke_v, _malloc: _malloc, _free: _free, STACKTOP: STACKTOP, STACK_MAX: STACK_MAX, tempDoublePtr: tempDoublePtr, ABORT: ABORT, NaN: NaN, Infinity: Infinity }, buffer);
var dynCall_vi = Module["dynCall_vi"] = asm.dynCall_vi;
var dynCall_ii = Module["dynCall_ii"] = asm.dynCall_ii;
var dynCall_iii = Module["dynCall_iii"] = asm.dynCall_iii;
var dynCall_v = Module["dynCall_v"] = asm.dynCall_v;
Runtime.stackAlloc = function(size) { return asm.stackAlloc(size) };
Runtime.stackSave = function() { return asm.stackSave() };
Runtime.stackRestore = function(top) { asm.stackRestore(top) };
// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;
// === Auto-generated postamble setup entry stuff ===
Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(!Module['preRun'] || Module['preRun'].length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_STATIC) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_STATIC));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_STATIC);
  var ret;
  var initialStackTop = STACKTOP;
  try {
    ret = Module['_main'](argc, argv, 0);
  }
  catch(e) {
    if (e.name == 'ExitStatus') {
      return e.status;
    } else if (e == 'SimulateInfiniteLoop') {
      Module['noExitRuntime'] = true;
    } else {
      throw e;
    }
  } finally {
    STACKTOP = initialStackTop;
  }
  return ret;
}
function run(args) {
  args = args || Module['arguments'];
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return 0;
  }
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    var toRun = Module['preRun'];
    Module['preRun'] = [];
    for (var i = toRun.length-1; i >= 0; i--) {
      toRun[i]();
    }
    if (runDependencies > 0) {
      // a preRun added a dependency, run will be called later
      return 0;
    }
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    var ret = 0;
    calledRun = true;
    if (Module['_main'] && shouldRunNow) {
      ret = Module.callMain(args);
      if (!Module['noExitRuntime']) {
        exitRuntime();
      }
    }
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
      while (Module['postRun'].length > 0) {
        Module['postRun'].pop()();
      }
    }
    return ret;
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
    return 0;
  } else {
    return doRun();
  }
}
Module['run'] = Module.run = run;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
  // {{MODULE_ADDITIONS}}

FOUR = Module;

//FIXME: should be done by the user
var canvas = document.createElement('canvas');
document.body.appendChild( canvas );

Module.canvas = canvas;
var FOUR = (function (FOUR) { 

FOUR.Camera = function () {
	FOUR.Actor.call( this );
};

return FOUR;
}(FOUR || {}));
// Bindings utilities

var Object__cache = {}; // we do it this way so we do not modify |Object|
function wrapPointer(ptr, __class__) {
  var cache = __class__ ? __class__.prototype.__cache__ : Object__cache;
  var ret = cache[ptr];
  if (ret) return ret;
  __class__ = __class__ || Object;
  ret = Object.create(__class__.prototype);
  ret.ptr = ptr;
  ret.__class__ = __class__;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  if (obj.__class__ !== Object) {
    delete obj.__class__.prototype.__cache__[obj.ptr];
  } else {
    delete Object__cache[obj.ptr];
  }
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

function customizeVTable(object, replacementPairs) {
  // Does not handle multiple inheritance
  // Does not work with asm.js

  // Find out vtable size
  var vTable = getValue(object.ptr, 'void*');
  // This assumes our modification where we null-terminate vtables
  var size = 0;
  while (getValue(vTable + Runtime.QUANTUM_SIZE*size, 'void*')) {
    size++;
  }

  // Prepare replacement lookup table and add replacements to FUNCTION_TABLE
  // There is actually no good way to do this! So we do the following hack:
  // We create a fake vtable with canary functions, to detect which actual
  // function is being called
  var vTable2 = _malloc(size*Runtime.QUANTUM_SIZE);
  setValue(object.ptr, vTable2, 'void*');
  var canaryValue;
  var functions = FUNCTION_TABLE.length;
  for (var i = 0; i < size; i++) {
    var index = FUNCTION_TABLE.length;
    (function(j) {
      FUNCTION_TABLE.push(function() {
        canaryValue = j;
      });
    })(i);
    FUNCTION_TABLE.push(0);
    setValue(vTable2 + Runtime.QUANTUM_SIZE*i, index, 'void*');
  }
  var args = [{ptr: 0}];
  replacementPairs.forEach(function(pair) {
    // We need the wrapper function that converts arguments to not fail. Keep adding arguments til it works.
    while(1) {
      try {
        pair['original'].apply(object, args);
        break;
      } catch(e) {
        args.push(args[0]);
      }
    }
    pair.originalIndex = getValue(vTable + canaryValue*Runtime.QUANTUM_SIZE, 'void*');
  });
  FUNCTION_TABLE = FUNCTION_TABLE.slice(0, functions);

  // Do the replacements

  var replacements = {};
  replacementPairs.forEach(function(pair) {
    var replacementIndex = FUNCTION_TABLE.length;
    FUNCTION_TABLE.push(pair['replacement']);
    FUNCTION_TABLE.push(0);
    replacements[pair.originalIndex] = replacementIndex;
  });

  // Copy and modify vtable
  for (var i = 0; i < size; i++) {
    var value = getValue(vTable + Runtime.QUANTUM_SIZE*i, 'void*');
    if (value in replacements) value = replacements[value];
    setValue(vTable2 + Runtime.QUANTUM_SIZE*i, value, 'void*');
  }
  return object;
}
Module['customizeVTable'] = customizeVTable;

// Converts a value into a C-style string.
function ensureString(value) {
  if (typeof value == 'number') return value;
  return allocate(intArrayFromString(value), 'i8', ALLOC_STACK);
}

Vector3.prototype['clamp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__clamp_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector3__instanceOf_p1(this.ptr, arg0);
}

Vector3.prototype['applyMatrix3'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix3_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['set'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Vector3__set_p3(this.ptr, arg0, arg1, arg2), Module['Vector3']);
}

Vector3.prototype['get_x'] = function() {
    return _emscripten_bind_Vector3__get_x_p0(this.ptr);
}

Vector3.prototype['divide'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__divide_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['get_z'] = function() {
    return _emscripten_bind_Vector3__get_z_p0(this.ptr);
}

Vector3.prototype['getPositionFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__getPositionFromMatrix_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

function Vector3(arg0, arg1, arg2) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Vector3__Vector3_p0();
  else 
    this.ptr = _emscripten_bind_Vector3__Vector3_p3(arg0, arg1, arg2);
  Vector3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector3;
}
Vector3.prototype.__cache__ = {};
Module['Vector3'] = Vector3;

Vector3.prototype['addScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__addScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['divideScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__divideScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['crossVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__crossVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['lengthManhattan'] = function() {
    return _emscripten_bind_Vector3__lengthManhattan_p0(this.ptr);
}

Vector3.prototype['negate'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__negate_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__normalize_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector3__set_y_p1(this.ptr, arg0);
}

Vector3.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Vector3__set_z_p1(this.ptr, arg0);
}

Vector3.prototype['sub'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__sub_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['min'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__min_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['distanceTo'] = function(arg0) {
    return _emscripten_bind_Vector3__distanceTo_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['lerp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__lerp_p2(this.ptr, arg0.ptr, arg1), Module['Vector3']);
}

Vector3.prototype['getScaleFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__getScaleFromMatrix_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['transformDirection'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__transformDirection_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['distanceToSquared'] = function(arg0) {
    return _emscripten_bind_Vector3__distanceToSquared_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['add'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__add_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['multiplyVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__multiplyVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['get_y'] = function() {
    return _emscripten_bind_Vector3__get_y_p0(this.ptr);
}

Vector3.prototype['cross'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__cross_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Vector3__clone_p0(this.ptr), Module['Vector3']);
}

Vector3.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector3__set_x_p1(this.ptr, arg0);
}

Vector3.prototype['lengthSquared'] = function() {
    return _emscripten_bind_Vector3__lengthSquared_p0(this.ptr);
}

Vector3.prototype['get'] = function(arg0) {
    return _emscripten_bind_Vector3__get_p1(this.ptr, arg0);
}

Vector3.prototype['max'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__max_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiplyScalar_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Vector3__equals_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['multiply'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__multiply_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['addVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__addVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__copy_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['applyProjection'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyProjection_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['setLength'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__setLength_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector3____destroy___p0(this.ptr);
}

Vector3.prototype['subVectors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__subVectors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Vector3.prototype['length'] = function() {
    return _emscripten_bind_Vector3__length_p0(this.ptr);
}

Vector3.prototype['applyQuaternion'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__applyQuaternion_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Vector3.prototype['dot'] = function(arg0) {
    return _emscripten_bind_Vector3__dot_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['setFromChar'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__setFromChar_p2(this.ptr, arg0, arg1), Module['Vector3']);
}

Triangle.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Triangle__instanceOf_p1(this.ptr, arg0);
}

Triangle.prototype['__destroy__'] = function() {
    _emscripten_bind_Triangle____destroy___p0(this.ptr);
}

function Triangle() {
    this.ptr = _emscripten_bind_Triangle__Triangle_p0();
  Triangle.prototype.__cache__[this.ptr] = this;
  this.__class__ = Triangle;
}
Triangle.prototype.__cache__ = {};
Module['Triangle'] = Triangle;

Frustum.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Frustum__instanceOf_p1(this.ptr, arg0);
}

Frustum.prototype['__destroy__'] = function() {
    _emscripten_bind_Frustum____destroy___p0(this.ptr);
}

Frustum.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Frustum__set_p6(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr, arg3.ptr, arg4.ptr, arg5.ptr), Module['Frustum']);
}

function Frustum(arg0, arg1, arg2, arg3, arg4, arg5) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Frustum__Frustum_p0();
  else 
    this.ptr = _emscripten_bind_Frustum__Frustum_p6(arg0.ptr, arg1.ptr, arg2.ptr, arg3.ptr, arg4.ptr, arg5.ptr);
  Frustum.prototype.__cache__[this.ptr] = this;
  this.__class__ = Frustum;
}
Frustum.prototype.__cache__ = {};
Module['Frustum'] = Frustum;

Frustum.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Frustum__clone_p0(this.ptr), Module['Frustum']);
}

Frustum.prototype['intersectsObject'] = function(arg0) {
    return _emscripten_bind_Frustum__intersectsObject_p1(this.ptr, arg0);
}

Frustum.prototype['setFromMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Frustum__setFromMatrix_p1(this.ptr, arg0.ptr), Module['Frustum']);
}

Frustum.prototype['containsPoint'] = function(arg0) {
    return _emscripten_bind_Frustum__containsPoint_p1(this.ptr, arg0.ptr);
}

Frustum.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Frustum__copy_p1(this.ptr, arg0.ptr), Module['Frustum']);
}

Frustum.prototype['intersectsSphere'] = function(arg0) {
    return _emscripten_bind_Frustum__intersectsSphere_p1(this.ptr, arg0.ptr);
}

Color.prototype['convertLinearToGamma'] = function() {
    return wrapPointer(_emscripten_bind_Color__convertLinearToGamma_p0(this.ptr), Module['Color']);
}

Color.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Color__instanceOf_p1(this.ptr, arg0);
}

Color.prototype['set'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__set_p1(this.ptr, arg0), Module['Color']);
}

Color.prototype['__destroy__'] = function() {
    _emscripten_bind_Color____destroy___p0(this.ptr);
}

function Color(arg0, arg1, arg2) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Color__Color_p0();
  else 
    this.ptr = _emscripten_bind_Color__Color_p3(arg0, arg1, arg2);
  Color.prototype.__cache__[this.ptr] = this;
  this.__class__ = Color;
}
Color.prototype.__cache__ = {};
Module['Color'] = Color;

Color.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Color__clone_p0(this.ptr), Module['Color']);
}

Color.prototype['get_r'] = function() {
    return _emscripten_bind_Color__get_r_p0(this.ptr);
}

Color.prototype['copyGammaToLinear'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__copyGammaToLinear_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['addColors'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Color__addColors_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Color']);
}

Color.prototype['add'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__add_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['setRGB'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Color__setRGB_p3(this.ptr, arg0, arg1, arg2), Module['Color']);
}

Color.prototype['get_g'] = function() {
    return _emscripten_bind_Color__get_g_p0(this.ptr);
}

Color.prototype['set_b'] = function(arg0) {
    _emscripten_bind_Color__set_b_p1(this.ptr, arg0);
}

Color.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Color__copy_p1(this.ptr, arg0.ptr), Module['Color']);
}

Color.prototype['convertGammaToLinear'] = function() {
    return wrapPointer(_emscripten_bind_Color__convertGammaToLinear_p0(this.ptr), Module['Color']);
}

Color.prototype['set_r'] = function(arg0) {
    _emscripten_bind_Color__set_r_p1(this.ptr, arg0);
}

Color.prototype['get_b'] = function() {
    return _emscripten_bind_Color__get_b_p0(this.ptr);
}

Color.prototype['set_g'] = function(arg0) {
    _emscripten_bind_Color__set_g_p1(this.ptr, arg0);
}

Vector4.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector4__instanceOf_p1(this.ptr, arg0);
}

Vector4.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector4__set_y_p1(this.ptr, arg0);
}

Vector4.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Vector4__set_z_p1(this.ptr, arg0);
}

Vector4.prototype['get_x'] = function() {
    return _emscripten_bind_Vector4__get_x_p0(this.ptr);
}

Vector4.prototype['get_y'] = function() {
    return _emscripten_bind_Vector4__get_y_p0(this.ptr);
}

Vector4.prototype['get_z'] = function() {
    return _emscripten_bind_Vector4__get_z_p0(this.ptr);
}

Vector4.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector4____destroy___p0(this.ptr);
}

Vector4.prototype['get_w'] = function() {
    return _emscripten_bind_Vector4__get_w_p0(this.ptr);
}

function Vector4() {
    this.ptr = _emscripten_bind_Vector4__Vector4_p0();
  Vector4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector4;
}
Vector4.prototype.__cache__ = {};
Module['Vector4'] = Vector4;

Vector4.prototype['set_w'] = function(arg0) {
    _emscripten_bind_Vector4__set_w_p1(this.ptr, arg0);
}

Vector4.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector4__set_x_p1(this.ptr, arg0);
}

UV.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_UV__instanceOf_p1(this.ptr, arg0);
}

UV.prototype['__destroy__'] = function() {
    _emscripten_bind_UV____destroy___p0(this.ptr);
}

function UV() {
    this.ptr = _emscripten_bind_UV__UV_p0();
  UV.prototype.__cache__[this.ptr] = this;
  this.__class__ = UV;
}
UV.prototype.__cache__ = {};
Module['UV'] = UV;

Line3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Line3__instanceOf_p1(this.ptr, arg0);
}

Line3.prototype['distance'] = function() {
    return _emscripten_bind_Line3__distance_p0(this.ptr);
}

Line3.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Line3__set_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Line3']);
}

Line3.prototype['center'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__center_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Line3.prototype['closestPointToPointParameter'] = function(arg0, arg1) {
    return _emscripten_bind_Line3__closestPointToPointParameter_p2(this.ptr, arg0.ptr, arg1);
}

Line3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Line3']);
}

Line3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Line3__clone_p0(this.ptr), Module['Line3']);
}

function Line3(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Line3__Line3_p0();
  else 
    this.ptr = _emscripten_bind_Line3__Line3_p2(arg0.ptr, arg1.ptr);
  Line3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Line3;
}
Line3.prototype.__cache__ = {};
Module['Line3'] = Line3;

Line3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Line3__equals_p1(this.ptr, arg0.ptr);
}

Line3.prototype['get_end'] = function() {
    return wrapPointer(_emscripten_bind_Line3__get_end_p0(this.ptr), Module['Vector3']);
}

Line3.prototype['get_start'] = function() {
    return wrapPointer(_emscripten_bind_Line3__get_start_p0(this.ptr), Module['Vector3']);
}

Line3.prototype['set_end'] = function(arg0) {
    _emscripten_bind_Line3__set_end_p1(this.ptr, arg0.ptr);
}

Line3.prototype['__destroy__'] = function() {
    _emscripten_bind_Line3____destroy___p0(this.ptr);
}

Line3.prototype['set_start'] = function(arg0) {
    _emscripten_bind_Line3__set_start_p1(this.ptr, arg0.ptr);
}

Line3.prototype['at'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Line3__at_p2(this.ptr, arg0, arg1.ptr), Module['Vector3']);
}

Line3.prototype['closestPointToPoint'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Line3__closestPointToPoint_p3(this.ptr, arg0.ptr, arg1, arg2.ptr), Module['Vector3']);
}

Line3.prototype['delta'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__delta_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Line3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Line3__copy_p1(this.ptr, arg0.ptr), Module['Line3']);
}

Line3.prototype['distanceSquared'] = function() {
    return _emscripten_bind_Line3__distanceSquared_p0(this.ptr);
}

Vertex.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vertex__instanceOf_p1(this.ptr, arg0);
}

Vertex.prototype['__destroy__'] = function() {
    _emscripten_bind_Vertex____destroy___p0(this.ptr);
}

function Vertex() {
    this.ptr = _emscripten_bind_Vertex__Vertex_p0();
  Vertex.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vertex;
}
Vertex.prototype.__cache__ = {};
Module['Vertex'] = Vertex;

Actor.prototype['addChild'] = function() {
    return wrapPointer(_emscripten_bind_Actor__addChild_p0(this.ptr), Module['Actor']);
}

Actor.prototype['get_position'] = function() {
    return wrapPointer(_emscripten_bind_Actor__get_position_p0(this.ptr), Module['Vector3']);
}

Actor.prototype['__destroy__'] = function() {
    _emscripten_bind_Actor____destroy___p0(this.ptr);
}

Actor.prototype['get_parent'] = function() {
    return wrapPointer(_emscripten_bind_Actor__get_parent_p0(this.ptr), Module['Actor']);
}

Actor.prototype['createChild'] = function() {
    return wrapPointer(_emscripten_bind_Actor__createChild_p0(this.ptr), Module['Actor']);
}

function Actor() {
    this.ptr = _emscripten_bind_Actor__Actor_p0();
  Actor.prototype.__cache__[this.ptr] = this;
  this.__class__ = Actor;
}
Actor.prototype.__cache__ = {};
Module['Actor'] = Actor;

Actor.prototype['set_position'] = function(arg0) {
    _emscripten_bind_Actor__set_position_p1(this.ptr, arg0.ptr);
}

Actor.prototype['set_parent'] = function(arg0) {
    _emscripten_bind_Actor__set_parent_p1(this.ptr, arg0.ptr);
}

Spline.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Spline__instanceOf_p1(this.ptr, arg0);
}

Spline.prototype['__destroy__'] = function() {
    _emscripten_bind_Spline____destroy___p0(this.ptr);
}

function Spline() {
    this.ptr = _emscripten_bind_Spline__Spline_p0();
  Spline.prototype.__cache__[this.ptr] = this;
  this.__class__ = Spline;
}
Spline.prototype.__cache__ = {};
Module['Spline'] = Spline;

Sphere.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Sphere__instanceOf_p1(this.ptr, arg0);
}

Sphere.prototype['__destroy__'] = function() {
    _emscripten_bind_Sphere____destroy___p0(this.ptr);
}

Sphere.prototype['getCenter'] = function() {
    return wrapPointer(_emscripten_bind_Sphere__getCenter_p0(this.ptr), Module['Vector3']);
}

function Sphere() {
    this.ptr = _emscripten_bind_Sphere__Sphere_p0();
  Sphere.prototype.__cache__[this.ptr] = this;
  this.__class__ = Sphere;
}
Sphere.prototype.__cache__ = {};
Module['Sphere'] = Sphere;

Sphere.prototype['get_center'] = function() {
    return wrapPointer(_emscripten_bind_Sphere__get_center_p0(this.ptr), Module['Vector3']);
}

Sphere.prototype['set_radius'] = function(arg0) {
    _emscripten_bind_Sphere__set_radius_p1(this.ptr, arg0);
}

Sphere.prototype['get_radius'] = function() {
    return _emscripten_bind_Sphere__get_radius_p0(this.ptr);
}

Sphere.prototype['set_center'] = function(arg0) {
    _emscripten_bind_Sphere__set_center_p1(this.ptr, arg0.ptr);
}

Quaternion.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Quaternion__instanceOf_p1(this.ptr, arg0);
}

Quaternion.prototype['set'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Quaternion__set_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Quaternion']);
}

Quaternion.prototype['setFromAxisAngle'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__setFromAxisAngle_p2(this.ptr, arg0.ptr, arg1), Module['Quaternion']);
}

Quaternion.prototype['get_y'] = function() {
    return _emscripten_bind_Quaternion__get_y_p0(this.ptr);
}

Quaternion.prototype['get_z'] = function() {
    return _emscripten_bind_Quaternion__get_z_p0(this.ptr);
}

Quaternion.prototype['get_w'] = function() {
    return _emscripten_bind_Quaternion__get_w_p0(this.ptr);
}

Quaternion.prototype['conjugate'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__conjugate_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['get_x'] = function() {
    return _emscripten_bind_Quaternion__get_x_p0(this.ptr);
}

Quaternion.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__normalize_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['slerp'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__slerp_p2(this.ptr, arg0.ptr, arg1), Module['Quaternion']);
}

Quaternion.prototype['set_z'] = function(arg0) {
    _emscripten_bind_Quaternion__set_z_p1(this.ptr, arg0);
}

Quaternion.prototype['inverse'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__inverse_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['set_w'] = function(arg0) {
    _emscripten_bind_Quaternion__set_w_p1(this.ptr, arg0);
}

function Quaternion(arg0, arg1, arg2, arg3) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Quaternion__Quaternion_p0();
  else 
    this.ptr = _emscripten_bind_Quaternion__Quaternion_p4(arg0, arg1, arg2, arg3);
  Quaternion.prototype.__cache__[this.ptr] = this;
  this.__class__ = Quaternion;
}
Quaternion.prototype.__cache__ = {};
Module['Quaternion'] = Quaternion;

Quaternion.prototype['multiplyQuaternions'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Quaternion__multiplyQuaternions_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Quaternion']);
}

Quaternion.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Quaternion__set_x_p1(this.ptr, arg0);
}

Quaternion.prototype['lengthSquared'] = function() {
    return _emscripten_bind_Quaternion__lengthSquared_p0(this.ptr);
}

Quaternion.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Quaternion__set_y_p1(this.ptr, arg0);
}

Quaternion.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Quaternion__clone_p0(this.ptr), Module['Quaternion']);
}

Quaternion.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Quaternion__equals_p1(this.ptr, arg0.ptr);
}

Quaternion.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Quaternion__copy_p1(this.ptr, arg0.ptr), Module['Quaternion']);
}

Quaternion.prototype['__destroy__'] = function() {
    _emscripten_bind_Quaternion____destroy___p0(this.ptr);
}

Quaternion.prototype['length'] = function() {
    return _emscripten_bind_Quaternion__length_p0(this.ptr);
}

Quaternion.prototype['setFromRotationMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Quaternion__setFromRotationMatrix_p1(this.ptr, arg0.ptr), Module['Quaternion']);
}

Plane.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Plane__instanceOf_p1(this.ptr, arg0);
}

Plane.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Plane__set_p2(this.ptr, arg0.ptr, arg1), Module['Plane']);
}

Plane.prototype['set_normal'] = function(arg0) {
    _emscripten_bind_Plane__set_normal_p1(this.ptr, arg0.ptr);
}

Plane.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['orthoPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__orthoPoint_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Plane.prototype['coplanerPoint'] = function() {
    return wrapPointer(_emscripten_bind_Plane__coplanerPoint_p0(this.ptr), Module['Vector3']);
}

Plane.prototype['setFromNormalAndCoplanerPoint'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Plane']);
}

Plane.prototype['negate'] = function() {
    return wrapPointer(_emscripten_bind_Plane__negate_p0(this.ptr), Module['Plane']);
}

Plane.prototype['normalize'] = function() {
    return wrapPointer(_emscripten_bind_Plane__normalize_p0(this.ptr), Module['Plane']);
}

Plane.prototype['intersectLine'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__intersectLine_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

function Plane(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Plane__Plane_p0();
  else 
    this.ptr = _emscripten_bind_Plane__Plane_p2(arg0.ptr, arg1);
  Plane.prototype.__cache__[this.ptr] = this;
  this.__class__ = Plane;
}
Plane.prototype.__cache__ = {};
Module['Plane'] = Plane;

Plane.prototype['projectPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__projectPoint_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Plane.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__translate_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['get_normal'] = function() {
    return wrapPointer(_emscripten_bind_Plane__get_normal_p0(this.ptr), Module['Vector3']);
}

Plane.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Plane__clone_p0(this.ptr), Module['Plane']);
}

Plane.prototype['get_constant'] = function() {
    return _emscripten_bind_Plane__get_constant_p0(this.ptr);
}

Plane.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Plane__equals_p1(this.ptr, arg0.ptr);
}

Plane.prototype['setComponents'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Plane__setComponents_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Plane']);
}

Plane.prototype['setFromCoplanerPoints'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Plane__setFromCoplanerPoints_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Plane']);
}

Plane.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Plane__copy_p1(this.ptr, arg0.ptr), Module['Plane']);
}

Plane.prototype['__destroy__'] = function() {
    _emscripten_bind_Plane____destroy___p0(this.ptr);
}

Plane.prototype['isIntersectionLine'] = function(arg0) {
    return _emscripten_bind_Plane__isIntersectionLine_p1(this.ptr, arg0.ptr);
}

Plane.prototype['distanceToSphere'] = function(arg0) {
    return _emscripten_bind_Plane__distanceToSphere_p1(this.ptr, arg0.ptr);
}

Plane.prototype['distanceToPoint'] = function(arg0) {
    return _emscripten_bind_Plane__distanceToPoint_p1(this.ptr, arg0.ptr);
}

Plane.prototype['set_constant'] = function(arg0) {
    _emscripten_bind_Plane__set_constant_p1(this.ptr, arg0);
}

Box3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Box3__instanceOf_p1(this.ptr, arg0);
}

Box3.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__set_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Box3']);
}

Box3.prototype['applyMatrix4'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__applyMatrix4_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['expandByPoint'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByPoint_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['clampPoint'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__clampPoint_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Vector3']);
}

Box3.prototype['isIntersectionBox'] = function(arg0) {
    return _emscripten_bind_Box3__isIntersectionBox_p1(this.ptr, arg0.ptr);
}

Box3.prototype['setFromPoints'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__setFromPoints_p1(this.ptr, arg0), Module['Box3']);
}

Box3.prototype['size'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__size_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['get_max'] = function() {
    return wrapPointer(_emscripten_bind_Box3__get_max_p0(this.ptr), Module['Vector3']);
}

Box3.prototype['getParameter'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__getParameter_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['expandByScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByScalar_p1(this.ptr, arg0), Module['Box3']);
}

Box3.prototype['intersect'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__intersect_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['containsBox'] = function(arg0) {
    return _emscripten_bind_Box3__containsBox_p1(this.ptr, arg0.ptr);
}

Box3.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__translate_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['empty'] = function() {
    return _emscripten_bind_Box3__empty_p0(this.ptr);
}

Box3.prototype['set_min'] = function(arg0) {
    _emscripten_bind_Box3__set_min_p1(this.ptr, arg0.ptr);
}

Box3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Box3__clone_p0(this.ptr), Module['Box3']);
}

Box3.prototype['equals'] = function(arg0) {
    return _emscripten_bind_Box3__equals_p1(this.ptr, arg0.ptr);
}

Box3.prototype['get_min'] = function() {
    return wrapPointer(_emscripten_bind_Box3__get_min_p0(this.ptr), Module['Vector3']);
}

Box3.prototype['expandByVector'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__expandByVector_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__copy_p1(this.ptr, arg0.ptr), Module['Box3']);
}

Box3.prototype['makeEmpty'] = function() {
    return wrapPointer(_emscripten_bind_Box3__makeEmpty_p0(this.ptr), Module['Box3']);
}

Box3.prototype['__destroy__'] = function() {
    _emscripten_bind_Box3____destroy___p0(this.ptr);
}

Box3.prototype['center'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__center_p1(this.ptr, arg0.ptr), Module['Vector3']);
}

Box3.prototype['getBoundingSphere'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Box3__getBoundingSphere_p1(this.ptr, arg0.ptr), Module['Sphere']);
}

Box3.prototype['set_max'] = function(arg0) {
    _emscripten_bind_Box3__set_max_p1(this.ptr, arg0.ptr);
}

function Box3(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Box3__Box3_p0();
  else 
    this.ptr = _emscripten_bind_Box3__Box3_p2(arg0.ptr, arg1.ptr);
  Box3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box3;
}
Box3.prototype.__cache__ = {};
Module['Box3'] = Box3;

Box3.prototype['distanceToPoint'] = function(arg0) {
    return _emscripten_bind_Box3__distanceToPoint_p1(this.ptr, arg0.ptr);
}

Box3.prototype['containsPoint'] = function(arg0) {
    return _emscripten_bind_Box3__containsPoint_p1(this.ptr, arg0.ptr);
}

Box3.prototype['setFromCenterAndSize'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Box3__setFromCenterAndSize_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Box3']);
}

Matrix4.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__clone_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Matrix4__instanceOf_p1(this.ptr, arg0);
}

Matrix4.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
    return wrapPointer(_emscripten_bind_Matrix4__set_p16(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15), Module['Matrix4']);
}

Matrix4.prototype['extractRotation'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__extractRotation_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['lookAt'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__lookAt_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeScale'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__makeScale_p3(this.ptr, arg0, arg1, arg2), Module['Matrix4']);
}

Matrix4.prototype['scale'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__scale_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeTranslation'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__makeTranslation_p3(this.ptr, arg0, arg1, arg2), Module['Matrix4']);
}

Matrix4.prototype['rotateByAxis'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateByAxis_p2(this.ptr, arg0.ptr, arg1), Module['Matrix4']);
}

Matrix4.prototype['invert'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__invert_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['rotateX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateX_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['rotateY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateY_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['rotateZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__rotateZ_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['multiplyMatrices'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyMatrices_p2(this.ptr, arg0.ptr, arg1.ptr), Module['Matrix4']);
}

Matrix4.prototype['setRotationFromQuaternion'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__setRotationFromQuaternion_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['multiplyToArray'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyToArray_p3(this.ptr, arg0.ptr, arg1.ptr, arg2), Module['Matrix4']);
}

Matrix4.prototype['getInverse'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__getInverse_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['translate'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__translate_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeRotationY'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationY_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeRotationX'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationX_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeRotationZ'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationZ_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['makeOrthographic'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Matrix4__makeOrthographic_p6(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5), Module['Matrix4']);
}

Matrix4.prototype['determinant'] = function() {
    return _emscripten_bind_Matrix4__determinant_p0(this.ptr);
}

Matrix4.prototype['makeRotationAxis'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Matrix4__makeRotationAxis_p2(this.ptr, arg0.ptr, arg1), Module['Matrix4']);
}

Matrix4.prototype['crossVector'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__crossVector_p1(this.ptr, arg0.ptr), Module['Vector4']);
}

Matrix4.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix4____destroy___p0(this.ptr);
}

Matrix4.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__multiplyScalar_p1(this.ptr, arg0), Module['Matrix4']);
}

Matrix4.prototype['transpose'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__transpose_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['extractPosition'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__extractPosition_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['makeFrustum'] = function(arg0, arg1, arg2, arg3, arg4, arg5) {
    return wrapPointer(_emscripten_bind_Matrix4__makeFrustum_p6(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5), Module['Matrix4']);
}

Matrix4.prototype['setPosition'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__setPosition_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix4__copy_p1(this.ptr, arg0.ptr), Module['Matrix4']);
}

Matrix4.prototype['identity'] = function() {
    return wrapPointer(_emscripten_bind_Matrix4__identity_p0(this.ptr), Module['Matrix4']);
}

Matrix4.prototype['compose'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__compose_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Matrix4.prototype['setRotationFromEuler'] = function(arg0, arg1) {
var stack = Runtime.stackSave();
try {
    return wrapPointer(_emscripten_bind_Matrix4__setRotationFromEuler_p2(this.ptr, arg0.ptr, ensureString(arg1)), Module['Matrix4']);
} finally { Runtime.stackRestore(stack) }
}

Matrix4.prototype['makePerspective'] = function(arg0, arg1, arg2, arg3) {
    return wrapPointer(_emscripten_bind_Matrix4__makePerspective_p4(this.ptr, arg0, arg1, arg2, arg3), Module['Matrix4']);
}

Matrix4.prototype['getMaxScaleOnAxis'] = function() {
    return _emscripten_bind_Matrix4__getMaxScaleOnAxis_p0(this.ptr);
}

function Matrix4(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Matrix4__Matrix4_p0();
  else 
    this.ptr = _emscripten_bind_Matrix4__Matrix4_p16(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
  Matrix4.prototype.__cache__[this.ptr] = this;
  this.__class__ = Matrix4;
}
Matrix4.prototype.__cache__ = {};
Module['Matrix4'] = Matrix4;

Matrix4.prototype['decompose'] = function(arg0, arg1, arg2) {
    return wrapPointer(_emscripten_bind_Matrix4__decompose_p3(this.ptr, arg0.ptr, arg1.ptr, arg2.ptr), Module['Matrix4']);
}

Ray.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Ray__instanceOf_p1(this.ptr, arg0);
}

Ray.prototype['__destroy__'] = function() {
    _emscripten_bind_Ray____destroy___p0(this.ptr);
}

function Ray(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Ray__Ray_p0();
  else 
    this.ptr = _emscripten_bind_Ray__Ray_p2(arg0.ptr, arg1.ptr);
  Ray.prototype.__cache__[this.ptr] = this;
  this.__class__ = Ray;
}
Ray.prototype.__cache__ = {};
Module['Ray'] = Ray;

Matrix3.prototype['clone'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__clone_p0(this.ptr), Module['Matrix3']);
}

Matrix3.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Matrix3__instanceOf_p1(this.ptr, arg0);
}

Matrix3.prototype['determinant'] = function() {
    return _emscripten_bind_Matrix3__determinant_p0(this.ptr);
}

Matrix3.prototype['set'] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    return wrapPointer(_emscripten_bind_Matrix3__set_p9(this.ptr, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8), Module['Matrix3']);
}

Matrix3.prototype['__destroy__'] = function() {
    _emscripten_bind_Matrix3____destroy___p0(this.ptr);
}

Matrix3.prototype['multiplyScalar'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__multiplyScalar_p1(this.ptr, arg0), Module['Matrix3']);
}

Matrix3.prototype['transpose'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__transpose_p0(this.ptr), Module['Matrix3']);
}

Matrix3.prototype['transposeIntoArray'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__transposeIntoArray_p1(this.ptr, arg0), Module['Matrix3']);
}

Matrix3.prototype['getNormalMatrix'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__getNormalMatrix_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

Matrix3.prototype['getInverse'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__getInverse_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

Matrix3.prototype['copy'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Matrix3__copy_p1(this.ptr, arg0.ptr), Module['Matrix3']);
}

function Matrix3(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Matrix3__Matrix3_p0();
  else 
    this.ptr = _emscripten_bind_Matrix3__Matrix3_p9(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
  Matrix3.prototype.__cache__[this.ptr] = this;
  this.__class__ = Matrix3;
}
Matrix3.prototype.__cache__ = {};
Module['Matrix3'] = Matrix3;

Matrix3.prototype['identity'] = function() {
    return wrapPointer(_emscripten_bind_Matrix3__identity_p0(this.ptr), Module['Matrix3']);
}

MATH.prototype['clamp'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__clamp_p3(arg0, arg1, arg2);
}

MATH.prototype['__destroy__'] = function() {
    _emscripten_bind_MATH____destroy___p0(this.ptr);
}

MATH.prototype['randDoubleSpread'] = function(arg0) {
    return _emscripten_bind_MATH__randDoubleSpread_p1(arg0);
}

MATH.prototype['randInt'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__randInt_p2(arg0, arg1);
}

MATH.prototype['random16'] = function() {
    return _emscripten_bind_MATH__random16_p0();
}

MATH.prototype['smoothstep'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__smoothstep_p3(arg0, arg1, arg2);
}

MATH.prototype['sign'] = function(arg0) {
    return _emscripten_bind_MATH__sign_p1(arg0);
}

MATH.prototype['radToDeg'] = function(arg0) {
    return _emscripten_bind_MATH__radToDeg_p1(arg0);
}

MATH.prototype['degToRad'] = function(arg0) {
    return _emscripten_bind_MATH__degToRad_p1(arg0);
}

MATH.prototype['randDouble'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__randDouble_p2(arg0, arg1);
}

MATH.prototype['clampBottom'] = function(arg0, arg1) {
    return _emscripten_bind_MATH__clampBottom_p2(arg0, arg1);
}

MATH.prototype['mapLinear'] = function(arg0, arg1, arg2, arg3, arg4) {
    return _emscripten_bind_MATH__mapLinear_p5(arg0, arg1, arg2, arg3, arg4);
}

MATH.prototype['smootherstep'] = function(arg0, arg1, arg2) {
    return _emscripten_bind_MATH__smootherstep_p3(arg0, arg1, arg2);
}

function MATH() {
    this.ptr = _emscripten_bind_MATH__MATH_p0();
  MATH.prototype.__cache__[this.ptr] = this;
  this.__class__ = MATH;
}
MATH.prototype.__cache__ = {};
Module['MATH'] = MATH;

Box2.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Box2__instanceOf_p1(this.ptr, arg0);
}

Box2.prototype['__destroy__'] = function() {
    _emscripten_bind_Box2____destroy___p0(this.ptr);
}

Box2.prototype['set_min'] = function(arg0) {
    _emscripten_bind_Box2__set_min_p1(this.ptr, arg0.ptr);
}

Box2.prototype['get_max'] = function() {
    return wrapPointer(_emscripten_bind_Box2__get_max_p0(this.ptr), Module['Vector2']);
}

Box2.prototype['set_max'] = function(arg0) {
    _emscripten_bind_Box2__set_max_p1(this.ptr, arg0.ptr);
}

Box2.prototype['get_min'] = function() {
    return wrapPointer(_emscripten_bind_Box2__get_min_p0(this.ptr), Module['Vector2']);
}

function Box2(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Box2__Box2_p0();
  else 
    this.ptr = _emscripten_bind_Box2__Box2_p2(arg0.ptr, arg1.ptr);
  Box2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Box2;
}
Box2.prototype.__cache__ = {};
Module['Box2'] = Box2;

Vector2.prototype['instanceOf'] = function(arg0) {
    return _emscripten_bind_Vector2__instanceOf_p1(this.ptr, arg0);
}

Vector2.prototype['set_x'] = function(arg0) {
    _emscripten_bind_Vector2__set_x_p1(this.ptr, arg0);
}

Vector2.prototype['set'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector2__set_p2(this.ptr, arg0, arg1), Module['Vector2']);
}

Vector2.prototype['get_x'] = function() {
    return _emscripten_bind_Vector2__get_x_p0(this.ptr);
}

Vector2.prototype['get_y'] = function() {
    return _emscripten_bind_Vector2__get_y_p0(this.ptr);
}

Vector2.prototype['set_y'] = function(arg0) {
    _emscripten_bind_Vector2__set_y_p1(this.ptr, arg0);
}

function Vector2(arg0, arg1) {
  if (arg0 === undefined)
    this.ptr = _emscripten_bind_Vector2__Vector2_p0();
  else 
    this.ptr = _emscripten_bind_Vector2__Vector2_p2(arg0, arg1);
  Vector2.prototype.__cache__[this.ptr] = this;
  this.__class__ = Vector2;
}
Vector2.prototype.__cache__ = {};
Module['Vector2'] = Vector2;

Vector2.prototype['__destroy__'] = function() {
    _emscripten_bind_Vector2____destroy___p0(this.ptr);
}
