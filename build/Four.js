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
assert(STATICTOP == STACK_MAX); assert(STACK_MAX == TOTAL_STACK);
STATICTOP += 2548;
assert(STATICTOP < TOTAL_MEMORY);
var __ZTVN10__cxxabiv120__si_class_type_infoE;
var __ZTVN10__cxxabiv117__class_type_infoE;
var __ZTISt9exception;
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,60,9,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,72,9,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* memory initializer */ allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150,0,0,0,148,2,0,0,94,2,0,0,120,1,0,0,74,2,0,0,86,1,0,0,192,1,0,0,192,0,0,0,184,0,0,0,186,0,0,0,114,0,0,0,106,0,0,0,38,2,0,0,144,2,0,0,232,1,0,0,20,2,0,0,76,0,0,0,26,2,0,0,238,1,0,0,228,1,0,0,156,0,0,0,168,0,0,0,114,1,0,0,2,0,0,0,176,0,0,0,38,1,0,0,152,2,0,0,112,2,0,0,248,0,0,0,46,1,0,0,170,0,0,0,106,1,0,0,80,2,0,0,50,0,0,0,246,0,0,0,34,1,0,0,182,0,0,0,40,1,0,0,80,0,0,0,50,1,0,0,30,0,0,0,86,2,0,0,210,1,0,0,124,2,0,0,138,0,0,0,126,0,0,0,36,1,0,0,154,0,0,0,166,1,0,0,6,1,0,0,162,1,0,0,224,1,0,0,30,2,0,0,138,2,0,0,136,0,0,0,132,0,0,0,4,0,0,0,70,0,0,0,62,0,0,0,34,2,0,0,166,0,0,0,18,1,0,0,46,2,0,0,6,2,0,0,26,1,0,0,124,1,0,0,80,1,0,0,70,2,0,0,164,1,0,0,244,0,0,0,124,0,0,0,52,2,0,0,98,2,0,0,178,1,0,0,62,1,0,0,76,2,0,0,134,1,0,0,114,2,0,0,110,1,0,0,18,0,0,0,154,2,0,0,98,0,0,0,60,2,0,0,252,0,0,0,190,0,0,0,96,2,0,0,252,1,0,0,78,2,0,0,134,2,0,0,196,1,0,0,16,0,0,0,194,0,0,0,160,1,0,0,136,1,0,0,58,0,0,0,232,0,0,0,78,0,0,0,128,0,0,0,52,0,0,0,106,2,0,0,204,0,0,0,54,0,0,0,8,2,0,0,10,0,0,0,152,1,0,0,172,1,0,0,128,2,0,0,48,0,0,0,180,1,0,0,100,0,0,0,20,0,0,0,2,2,0,0,254,1,0,0,8,1,0,0,28,0,0,0,200,0,0,0,90,2,0,0,140,0,0,0,0,2,0,0,24,2,0,0,198,0,0,0,20,1,0,0,112,1,0,0,216,0,0,0,0,1,0,0,62,2,0,0,16,1,0,0,154,1,0,0,108,2,0,0,132,2,0,0,22,1,0,0,122,1,0,0,66,2,0,0,186,1,0,0,204,1,0,0,142,2,0,0,56,0,0,0,48,1,0,0,146,2,0,0,46,0,0,0,122,0,0,0,156,2,0,0,226,1,0,0,194,1,0,0,30,1,0,0,12,0,0,0,82,2,0,0,60,1,0,0,82,0,0,0,58,1,0,0,230,1,0,0,64,2,0,0,72,0,0,0,74,0,0,0,220,0,0,0,68,1,0,0,238,0,0,0,220,1,0,0,88,2,0,0,84,0,0,0,100,2,0,0,118,0,0,0,248,1,0,0,202,0,0,0,64,0,0,0,170,1,0,0,208,0,0,0,56,2,0,0,120,2,0,0,92,1,0,0,76,1,0,0,118,1,0,0,72,2,0,0,44,2,0,0,48,2,0,0,134,0,0,0,32,2,0,0,66,1,0,0,182,1,0,0,88,1,0,0,240,0,0,0,146,0,0,0,210,0,0,0,14,1,0,0,236,0,0,0,162,0,0,0,150,2,0,0,102,1,0,0,130,1,0,0,82,1,0,0,152,0,0,0,32,1,0,0,84,2,0,0,236,1,0,0,54,1,0,0,26,0,0,0,200,1,0,0,156,1,0,0,36,2,0,0,188,1,0,0,174,1,0,0,172,0,0,0,24,0,0,0,88,0,0,0,90,1,0,0,24,1,0,0,190,1,0,0,104,0,0,0,50,2,0,0,102,0,0,0,110,0,0,0,218,1,0,0,60,0,0,0,160,0,0,0,226,0,0,0,96,0,0,0,94,0,0,0,216,1,0,0,168,1,0,0,176,1,0,0,242,0,0,0,28,2,0,0,8,0,0,0,32,0,0,0,116,1,0,0,222,0,0,0,74,1,0,0,148,1,0,0,222,1,0,0,120,0,0,0,42,1,0,0,250,1,0,0,128,1,0,0,86,0,0,0,4,1,0,0,206,0,0,0,138,1,0,0,40,2,0,0,118,2,0,0,144,1,0,0,68,0,0,0,234,1,0,0,90,0,0,0,112,0,0,0,12,1,0,0,108,0,0,0,92,0,0,0,36,0,0,0,34,0,0,0,126,1,0,0,22,0,0,0,4,2,0,0,6,0,0,0,208,1,0,0,144,0,0,0,198,1,0,0,164,0,0,0,104,1,0,0,188,0,0,0,240,1,0,0,2,1,0,0,102,2,0,0,44,0,0,0,96,1,0,0,42,0,0,0,110,2,0,0,148,0,0,0,206,1,0,0,214,0,0,0,174,0,0,0,116,0,0,0,54,2,0,0,150,1,0,0,246,1,0,0,234,0,0,0,158,0,0,0,68,2,0,0,28,1,0,0,18,2,0,0,180,0,0,0,254,0,0,0,130,2,0,0,44,1,0,0,196,0,0,0,140,1,0,0,10,2,0,0,146,1,0,0,12,2,0,0,202,1,0,0,108,1,0,0,158,1,0,0,40,0,0,0,178,0,0,0,98,1,0,0,42,2,0,0,244,1,0,0,94,1,0,0,10,1,0,0,122,2,0,0,130,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,9,80,0,126,2,0,0,16,2,0,0,84,1,0,0,0,0,0,0,0,0,0,0,96,9,80,0,38,0,0,0,0,0,0,0,0,0,0,0,104,9,80,0,212,1,0,0,0,0,0,0,0,0,0,0,112,9,80,0,132,1,0,0,0,0,0,0,0,0,0,0,120,9,80,0,70,1,0,0,0,0,0,0,0,0,0,0,128,9,80,0,218,0,0,0,0,0,0,0,0,0,0,0,136,9,80,0,212,0,0,0,0,0,0,0,0,0,0,0,144,9,80,0,58,2,0,0,0,0,0,0,0,0,0,0,152,9,80,0,56,1,0,0,0,0,0,0,0,0,0,0,160,9,80,0,142,1,0,0,0,0,0,0,0,0,0,0,168,9,80,0,228,0,0,0,0,0,0,0,0,0,0,0,176,9,80,0,66,0,0,0,0,0,0,0,0,0,0,0,184,9,80,0,116,2,0,0,0,0,0,0,0,0,0,0,192,9,80,0,230,0,0,0,0,0,0,0,0,0,0,0,200,9,80,0,14,2,0,0,0,0,0,0,0,0,0,0,208,9,80,0,142,0,0,0,0,0,0,0,0,0,0,0,216,9,80,0,72,1,0,0,0,0,0,0,0,0,0,0,224,9,80,0,184,1,0,0,0,0,0,0,0,0,0,0,232,9,80,0,104,2,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,56,84,114,105,97,110,103,108,101,0,0,0,55,86,101,99,116,111,114,52,0,0,0,0,55,86,101,99,116,111,114,51,0,0,0,0,55,86,101,99,116,111,114,50,0,0,0,0,55,77,97,116,114,105,120,52,0,0,0,0,55,77,97,116,114,105,120,51,0,0,0,0,55,70,114,117,115,116,117,109,0,0,0,0,54,86,101,114,116,101,120,0,54,83,112,108,105,110,101,0,54,83,112,104,101,114,101,0,53,80,108,97,110,101,0,0,53,76,105,110,101,51,0,0,53,67,111,108,111,114,0,0,52,66,111,120,51,0,0,0,52,66,111,120,50,0,0,0,51,82,97,121,0,0,0,0,50,85,86,0,49,48,81,117,97,116,101,114,110,105,111,110,0,0,0,0,0,0,0,0,232,7,80,0,0,0,0,0,248,7,80,0,0,0,0,0,0,0,0,0,8,8,80,0,72,9,80,0,0,0,0,0,48,8,80,0,84,9,80,0,0,0,0,0,84,8,80,0,40,9,80,0,0,0,0,0,120,8,80,0,0,0,0,0,132,8,80,0,0,0,0,0,144,8,80,0,0,0,0,0,156,8,80,0,0,0,0,0,168,8,80,0,0,0,0,0,180,8,80,0,0,0,0,0,192,8,80,0,0,0,0,0,204,8,80,0,0,0,0,0,212,8,80,0,0,0,0,0,220,8,80,0,0,0,0,0,228,8,80,0,0,0,0,0,236,8,80,0,0,0,0,0,244,8,80,0,0,0,0,0,252,8,80,0,0,0,0,0,4,9,80,0,0,0,0,0,12,9,80,0,0,0,0,0,20,9,80,0,0,0,0,0,24,9,80,0,0,0,0,0], "i8", ALLOC_NONE, TOTAL_STACK)
function runPostSets() {
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(8))>>2)]=(470);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(12))>>2)]=(648);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(16))>>2)]=(604);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(20))>>2)]=(498);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(24))>>2)]=(250);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(28))>>2)]=(334);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(32))>>2)]=(224);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(36))>>2)]=(320);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(8))>>2)]=(356);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(12))>>2)]=(534);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(16))>>2)]=(604);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(20))>>2)]=(498);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(24))>>2)]=(250);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(28))>>2)]=(14);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(32))>>2)]=(308);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(36))>>2)]=(652);
HEAP32[((5245224)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245232)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5245240)>>2)]=__ZTISt9exception;
HEAP32[((5245244)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5245256)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5245268)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5245280)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245288)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245296)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245304)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245312)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245320)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245328)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245336)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245344)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245352)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245360)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245368)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245376)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245384)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245392)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245400)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245408)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5245416)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
}
if (!awaitingMemoryInitializer) runPostSets();
  function _Infinity() {
  		return Infinity;
  	}
  function ___gxx_personality_v0() {
    }
  var _floor=Math.floor;
  var _sqrt=Math.sqrt;
  function _srand(seed) {}
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function _rand() {
      return Math.floor(Math.random()*0x80000000);
    }
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  var _cos=Math.cos;
  var _sin=Math.sin;
  function _fmax(x, y) {
      return isNaN(x) ? y : isNaN(y) ? x : Math.max(x, y);
    }
  var _acos=Math.acos;
  var _fabs=Math.abs;
  function __ZNSt9exceptionD2Ev(){}
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i64=_memset;
  function _abort() {
      ABORT = true;
      throw 'abort() at ' + (new Error().stack);
    }
  var _llvm_memset_p0i8_i32=_memset;
  function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      if (!___setErrNo.ret) ___setErrNo.ret = allocate([0], 'i32', ALLOC_STATIC);
      HEAP32[((___setErrNo.ret)>>2)]=value
      return value;
    }function ___errno_location() {
      return ___setErrNo.ret;
    }var ___errno=___errno_location;
  var ERRNO_CODES={E2BIG:7,EACCES:13,EADDRINUSE:98,EADDRNOTAVAIL:99,EAFNOSUPPORT:97,EAGAIN:11,EALREADY:114,EBADF:9,EBADMSG:74,EBUSY:16,ECANCELED:125,ECHILD:10,ECONNABORTED:103,ECONNREFUSED:111,ECONNRESET:104,EDEADLK:35,EDESTADDRREQ:89,EDOM:33,EDQUOT:122,EEXIST:17,EFAULT:14,EFBIG:27,EHOSTUNREACH:113,EIDRM:43,EILSEQ:84,EINPROGRESS:115,EINTR:4,EINVAL:22,EIO:5,EISCONN:106,EISDIR:21,ELOOP:40,EMFILE:24,EMLINK:31,EMSGSIZE:90,EMULTIHOP:72,ENAMETOOLONG:36,ENETDOWN:100,ENETRESET:102,ENETUNREACH:101,ENFILE:23,ENOBUFS:105,ENODATA:61,ENODEV:19,ENOENT:2,ENOEXEC:8,ENOLCK:37,ENOLINK:67,ENOMEM:12,ENOMSG:42,ENOPROTOOPT:92,ENOSPC:28,ENOSR:63,ENOSTR:60,ENOSYS:38,ENOTCONN:107,ENOTDIR:20,ENOTEMPTY:39,ENOTRECOVERABLE:131,ENOTSOCK:88,ENOTSUP:95,ENOTTY:25,ENXIO:6,EOVERFLOW:75,EOWNERDEAD:130,EPERM:1,EPIPE:32,EPROTO:71,EPROTONOSUPPORT:93,EPROTOTYPE:91,ERANGE:34,EROFS:30,ESPIPE:29,ESRCH:3,ESTALE:116,ETIME:62,ETIMEDOUT:110,ETXTBSY:26,EWOULDBLOCK:11,EXDEV:18};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 8: return PAGE_SIZE;
        case 54:
        case 56:
        case 21:
        case 61:
        case 63:
        case 22:
        case 67:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 69:
        case 28:
        case 101:
        case 70:
        case 71:
        case 29:
        case 30:
        case 199:
        case 75:
        case 76:
        case 32:
        case 43:
        case 44:
        case 80:
        case 46:
        case 47:
        case 45:
        case 48:
        case 49:
        case 42:
        case 82:
        case 33:
        case 7:
        case 108:
        case 109:
        case 107:
        case 112:
        case 119:
        case 121:
          return 200809;
        case 13:
        case 104:
        case 94:
        case 95:
        case 34:
        case 35:
        case 77:
        case 81:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 94:
        case 95:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 120:
        case 40:
        case 16:
        case 79:
        case 19:
          return -1;
        case 92:
        case 93:
        case 5:
        case 72:
        case 6:
        case 74:
        case 92:
        case 93:
        case 96:
        case 97:
        case 98:
        case 99:
        case 102:
        case 103:
        case 105:
          return 1;
        case 38:
        case 66:
        case 50:
        case 51:
        case 4:
          return 1024;
        case 15:
        case 64:
        case 41:
          return 32;
        case 55:
        case 37:
        case 17:
          return 2147483647;
        case 18:
        case 1:
          return 47839;
        case 59:
        case 57:
          return 99;
        case 68:
        case 58:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 14: return 32768;
        case 73: return 32767;
        case 39: return 16384;
        case 60: return 1000;
        case 106: return 700;
        case 52: return 256;
        case 62: return 255;
        case 2: return 100;
        case 65: return 64;
        case 36: return 20;
        case 100: return 16;
        case 20: return 6;
        case 53: return 4;
        case 10: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We need to make sure no one else allocates unfreeable memory!
      // We must control this entirely. So we don't even need to do
      // unfreeable allocations - the HEAP is ours, from STATICTOP up.
      // TODO: We could in theory slice off the top of the HEAP when
      //       sbrk gets a negative increment in |bytes|...
      var self = _sbrk;
      if (!self.called) {
        STATICTOP = alignMemoryPage(STATICTOP); // make sure we start out aligned
        self.called = true;
        _sbrk.DYNAMIC_START = STATICTOP;
      }
      var ret = STATICTOP;
      if (bytes != 0) Runtime.staticAlloc(bytes);
      return ret;  // Previous break location.
    }
  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }
  function _llvm_eh_exception() {
      return HEAP32[((_llvm_eh_exception.buf)>>2)];
    }
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  function ___resumeException(ptr) {
      if (HEAP32[((_llvm_eh_exception.buf)>>2)] == 0) HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = HEAP32[((_llvm_eh_exception.buf)>>2)];
      if (throwntype == -1) throwntype = HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm.setTempRet0(typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm.setTempRet0(throwntype),thrown)|0);
    }function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=type
      HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=destructor
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }
  function ___cxa_call_unexpected(exception) {
      Module.printErr('Unexpected exception thrown, this is not properly supported - aborting');
      ABORT = true;
      throw exception;
    }
  function _llvm_trap() {
      throw 'trap! ' + new Error().stack;
    }
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
___setErrNo(0);
_llvm_eh_exception.buf = allocate(12, "void*", ALLOC_STATIC);
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
var Math_min = Math.min;
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module.dynCall_viiiii(index,a1,a2,a3,a4,a5);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_vif(index,a1,a2) {
  try {
    Module.dynCall_vif(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiffffff(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    return Module.dynCall_iiffffff(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_vi(index,a1) {
  try {
    Module.dynCall_vi(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module.dynCall_vii(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiffff(index,a1,a2,a3,a4,a5) {
  try {
    return Module.dynCall_iiffff(index,a1,a2,a3,a4,a5);
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
function invoke_iiff(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiff(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_fff(index,a1,a2) {
  try {
    return Module.dynCall_fff(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    return Module.dynCall_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iifi(index,a1,a2,a3) {
  try {
    return Module.dynCall_iifi(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiffffffffffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17) {
  try {
    return Module.dynCall_iiffffffffffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iifff(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iifff(index,a1,a2,a3,a4);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ffff(index,a1,a2,a3) {
  try {
    return Module.dynCall_ffff(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiii(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ifffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    return Module.dynCall_ifffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iffffffffffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) {
  try {
    return Module.dynCall_iffffffffffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ffffff(index,a1,a2,a3,a4,a5) {
  try {
    return Module.dynCall_ffffff(index,a1,a2,a3,a4,a5);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_fii(index,a1,a2) {
  try {
    return Module.dynCall_fii(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiif(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiif(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_fiii(index,a1,a2,a3) {
  try {
    return Module.dynCall_fiii(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    return Module.dynCall_iiiiiii(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iif(index,a1,a2) {
  try {
    return Module.dynCall_iif(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ff(index,a1) {
  try {
    return Module.dynCall_ff(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_fi(index,a1) {
  try {
    return Module.dynCall_fi(index,a1);
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
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_f(index) {
  try {
    return Module.dynCall_f(index);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_i(index) {
  try {
    return Module.dynCall_i(index);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iifffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  try {
    return Module.dynCall_iifffffffff(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iiiii(index,a1,a2,a3,a4);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ifff(index,a1,a2,a3) {
  try {
    return Module.dynCall_ifff(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iff(index,a1,a2) {
  try {
    return Module.dynCall_iff(index,a1,a2);
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
function invoke_iffff(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iffff(index,a1,a2,a3,a4);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module.dynCall_viiii(index,a1,a2,a3,a4);
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
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.__ZTISt9exception|0;var n=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var o=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var p=+env.NaN;var q=+env.Infinity;var r=0;var s=0;var t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0.0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=global.Math.floor;var N=global.Math.abs;var O=global.Math.sqrt;var P=global.Math.pow;var Q=global.Math.cos;var R=global.Math.sin;var S=global.Math.tan;var T=global.Math.acos;var U=global.Math.asin;var V=global.Math.atan;var W=global.Math.atan2;var X=global.Math.exp;var Y=global.Math.log;var Z=global.Math.ceil;var _=global.Math.imul;var $=env.abort;var aa=env.assert;var ab=env.asmPrintInt;var ac=env.asmPrintFloat;var ad=env.copyTempDouble;var ae=env.copyTempFloat;var af=env.min;var ag=env.invoke_viiiii;var ah=env.invoke_vif;var ai=env.invoke_iiffffff;var aj=env.invoke_vi;var ak=env.invoke_vii;var al=env.invoke_iiffff;var am=env.invoke_ii;var an=env.invoke_iiff;var ao=env.invoke_fff;var ap=env.invoke_iiiiiiii;var aq=env.invoke_iifi;var ar=env.invoke_iiffffffffffffffff;var as=env.invoke_iifff;var at=env.invoke_ffff;var au=env.invoke_iiii;var av=env.invoke_ifffffffff;var aw=env.invoke_iffffffffffffffff;var ax=env.invoke_ffffff;var ay=env.invoke_fii;var az=env.invoke_iiif;var aA=env.invoke_fiii;var aB=env.invoke_iiiiiii;var aC=env.invoke_iif;var aD=env.invoke_ff;var aE=env.invoke_fi;var aF=env.invoke_iii;var aG=env.invoke_viiiiii;var aH=env.invoke_f;var aI=env.invoke_i;var aJ=env.invoke_iifffffffff;var aK=env.invoke_iiiii;var aL=env.invoke_ifff;var aM=env.invoke_iff;var aN=env.invoke_v;var aO=env.invoke_iffff;var aP=env.invoke_viiii;var aQ=env._rand;var aR=env._sysconf;var aS=env.___cxa_throw;var aT=env._abort;var aU=env._llvm_eh_exception;var aV=env._Infinity;var aW=env._fabs;var aX=env._floor;var aY=env.___setErrNo;var aZ=env._sqrt;var a_=env.___cxa_find_matching_catch;var a$=env.___cxa_allocate_exception;var a0=env._sin;var a1=env._srand;var a2=env._fmax;var a3=env.___resumeException;var a4=env.___cxa_is_number_type;var a5=env.___cxa_does_inherit;var a6=env.__ZSt18uncaught_exceptionv;var a7=env._cos;var a8=env._sbrk;var a9=env.__ZNSt9exceptionD2Ev;var ba=env.___errno_location;var bb=env.___gxx_personality_v0;var bc=env.___cxa_call_unexpected;var bd=env._llvm_trap;var be=env._time;var bf=env._acos;
// EMSCRIPTEN_START_FUNCS
function bQ(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+3>>2<<2;return b|0}function bR(){return i|0}function bS(a){a=a|0;i=a}function bT(a){a=a|0;r=a}function bU(a){a=a|0;C=a}function bV(a){a=a|0;D=a}function bW(a){a=a|0;E=a}function bX(a){a=a|0;F=a}function bY(a){a=a|0;G=a}function bZ(a){a=a|0;H=a}function b_(a){a=a|0;I=a}function b$(a){a=a|0;J=a}function b0(a){a=a|0;K=a}function b1(a){a=a|0;L=a}function b2(a,b){a=a|0;b=b|0;return(b|0)==40|0}function b3(a,b){a=a|0;b=b|0;return(b|0)==41|0}function b4(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0.0,i=0.0,j=0;c[a>>2]=5244832;b=a+4|0;d=hI(28)|0;e=d;f=+aV();g=+aV();i=+aV();c[d>>2]=5244656;j=d+4|0;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=d+12|0;h[k>>3]=g,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=d+20|0;h[k>>3]=i,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;c[b>>2]=e;e=a+8|0;a=hI(28)|0;b=a;i=-0.0- +aV();g=+aV();f=-0.0-g;g=-0.0- +aV();c[a>>2]=5244656;j=a+4|0;h[k>>3]=i,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=a+12|0;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=a+20|0;h[k>>3]=g,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;c[e>>2]=b;return}function b5(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0,i=0,j=0,l=0,m=0,n=0;d=c[b>>2]|0;if((d|0)<=0){e=+aV();f=a+4|0;g=(c[f>>2]|0)+20|0;h[k>>3]=e,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=(c[f>>2]|0)+12|0;h[k>>3]=e,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=(c[f>>2]|0)+4|0;h[k>>3]=e,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;e=-0.0- +aV();g=a+8|0;f=(c[g>>2]|0)+20|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=(c[g>>2]|0)+12|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=(c[g>>2]|0)+4|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}f=d;d=c[b+4>>2]|0;g=a+8|0;i=c[g>>2]|0;j=d+4|0;e=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);l=i+4|0;h[k>>3]=e,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=d+12|0;e=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);m=i+12|0;h[k>>3]=e,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=d+20|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);d=i+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+4|0;i=c[d>>2]|0;e=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=i+4|0;h[k>>3]=e,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;e=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=i+12|0;h[k>>3]=e,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=i+20|0;h[k>>3]=e,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=f+1|0;if((m|0)>2){n=2}else{return a|0}while(1){f=c[b+(n<<2)>>2]|0;i=f+4|0;e=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=c[d>>2]|0;l=i+12|0;do{if(e<(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])){j=i+4|0;h[k>>3]=e,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0}else{j=(c[g>>2]|0)+4|0;if(e<=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])){break}h[k>>3]=e,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0}}while(0);i=f+12|0;e=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=(c[d>>2]|0)+12|0;do{if(e<(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3])){h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0}else{l=(c[g>>2]|0)+12|0;if(e<=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])){break}h[k>>3]=e,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0}}while(0);i=f+20|0;e=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=(c[d>>2]|0)+20|0;do{if(e<(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3])){h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0}else{l=(c[g>>2]|0)+20|0;if(e<=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])){break}h[k>>3]=e,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0}}while(0);i=n+1|0;if((i|0)==(m|0)){break}else{n=i}}return a|0}function b6(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0.0,j=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0;d=hI(28)|0;c[d>>2]=5244656;e=d+4|0;f=e;hK(e|0,0,16);e=b+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;e=b+12|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;j=b+20|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=d+20|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;d=c[a+4>>2]|0;b=c[a+8>>2]|0;a=d+4|0;m=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);do{if(g<m){h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=m}else{a=b+4|0;o=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);if(g<=o){n=g;break}h[k>>3]=o,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=o}}while(0);a=d+12|0;m=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);do{if(i<m){h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=m}else{a=b+12|0;o=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);if(i<=o){p=i;break}h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=o}}while(0);a=d+20|0;m=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);do{if(l<m){h[k>>3]=m,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;q=m}else{a=b+20|0;o=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);if(l<=o){q=l;break}h[k>>3]=o,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;q=o}}while(0);m=n-g;h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;g=p-i;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;i=q-l;h[k>>3]=i,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return+(+O(+(m*m+g*g+i*i)))}function b7(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5244720;b=hI(16)|0;c[b>>2]=5244784;d=hI(28)|0;e=b;c[d>>2]=5244656;hK(d+4|0,0,24);c[b+4>>2]=d;d=b+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+4>>2]=e;e=hI(16)|0;c[e>>2]=5244784;d=hI(28)|0;b=e;c[d>>2]=5244656;hK(d+4|0,0,24);c[e+4>>2]=d;d=e+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+8>>2]=b;b=hI(16)|0;c[b>>2]=5244784;d=hI(28)|0;e=b;c[d>>2]=5244656;hK(d+4|0,0,24);c[b+4>>2]=d;d=b+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+12>>2]=e;e=hI(16)|0;c[e>>2]=5244784;d=hI(28)|0;b=e;c[d>>2]=5244656;hK(d+4|0,0,24);c[e+4>>2]=d;d=e+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+16>>2]=b;b=hI(16)|0;c[b>>2]=5244784;d=hI(28)|0;e=b;c[d>>2]=5244656;hK(d+4|0,0,24);c[b+4>>2]=d;d=b+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+20>>2]=e;e=hI(16)|0;c[e>>2]=5244784;d=hI(28)|0;b=e;c[d>>2]=5244656;hK(d+4|0,0,24);c[e+4>>2]=d;d=e+8|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;c[a+24>>2]=b;return}function b8(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0;d=hI(28)|0;c[d>>2]=5244656;hK(d+4|0,0,24);e=hI(28)|0;c[e>>2]=5244656;hK(e+4|0,0,24);f=hI(28)|0;c[f>>2]=5244656;hK(f+4|0,0,24);g=hI(28)|0;c[g>>2]=5244656;hK(g+4|0,0,24);i=hI(28)|0;c[i>>2]=5244656;hK(i+4|0,0,24);j=hI(28)|0;c[j>>2]=5244656;hK(j+4|0,0,24);l=hI(28)|0;c[l>>2]=5244656;hK(l+4|0,0,24);m=c[a+4>>2]|0;n=m+4|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=m+12|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=m+20|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);m=d+4|0;t=d+12|0;u=d+20|0;d=b+4|0;v=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+36|0;w=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+68|0;x=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+100|0;y=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);z=v*o+w*q+x*s+y;h[k>>3]=z,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=b+12|0;z=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+44|0;A=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+76|0;B=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+108|0;C=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);D=z*o+A*q+B*s+C;h[k>>3]=D,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;t=b+20|0;D=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=b+52|0;E=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=b+84|0;F=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=b+116|0;G=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);H=D*o+E*q+F*s+G;h[k>>3]=H,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;H=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);u=c[a+8>>2]|0;a=u+20|0;q=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);t=e+4|0;b=e+12|0;m=e+20|0;o=v*H+w*s+x*q+y;h[k>>3]=o,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;o=z*H+A*s+B*q+C;h[k>>3]=o,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;o=D*H+E*s+F*q+G;h[k>>3]=o,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);m=u+12|0;q=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);b=f+4|0;t=f+12|0;e=f+20|0;H=v*o+w*q+x*s+y;h[k>>3]=H,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;H=z*o+A*q+B*s+C;h[k>>3]=H,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;H=D*o+E*q+F*s+G;h[k>>3]=H,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;H=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);q=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);n=g+4|0;e=g+12|0;t=g+20|0;o=v*H+w*s+x*q+y;h[k>>3]=o,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;o=z*H+A*s+B*q+C;h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;o=D*H+E*s+F*q+G;h[k>>3]=o,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;t=u+4|0;o=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);u=i+4|0;e=i+12|0;n=i+20|0;H=v*o+w*q+x*s+y;h[k>>3]=H,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;H=z*o+A*q+B*s+C;h[k>>3]=H,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;H=D*o+E*q+F*s+G;h[k>>3]=H,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;H=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);q=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=j+4|0;p=j+12|0;n=j+20|0;o=v*H+w*s+x*q+y;h[k>>3]=o,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;o=z*H+A*s+B*q+C;h[k>>3]=o,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;o=D*H+E*s+F*q+G;h[k>>3]=o,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;o=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);q=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);r=l+4|0;m=l+12|0;t=l+20|0;H=v*o+w*q+x*s+y;h[k>>3]=H,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;H=z*o+A*q+B*s+C;h[k>>3]=H,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;H=D*o+E*q+F*s+G;h[k>>3]=H,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;bd();return 0}function b9(a,b){a=a|0;b=b|0;return(b|0)==42|0}function ca(a,b){a=a|0;b=b|0;return(b|0)==43|0}function cb(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0,R=0.0,S=0.0,T=0.0,U=0.0,V=0.0;e=b+4|0;b=e|0;f=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+4|0;g=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+8|0;i=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+12|0;j=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+16|0;l=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+20|0;m=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+24|0;n=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+28|0;n=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+32|0;n=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+36|0;o=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+40|0;p=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+44|0;q=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+48|0;r=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+52|0;s=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+56|0;t=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+60|0;t=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+64|0;t=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+68|0;u=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+72|0;v=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+76|0;w=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+80|0;x=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+84|0;y=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+88|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+92|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+96|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+100|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+104|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+108|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+112|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+116|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+120|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=e+124|0;e=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=a+4|0;e=b|0;z=b;b=z|0;A=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+4|0;B=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+8|0;b=z+12|0;b=z+16|0;b=z+20|0;b=z+24|0;C=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+28|0;D=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+32|0;E=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+36|0;E=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+40|0;E=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+44|0;E=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+48|0;E=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+52|0;F=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+56|0;G=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+60|0;G=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+64|0;G=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;b=z+68|0;z=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0;H=(c[k>>2]=x,c[k+4>>2]=y,+h[k>>3]);I=(c[k>>2]=p,c[k+4>>2]=q,+h[k>>3]);J=(c[k>>2]=r,c[k+4>>2]=s,+h[k>>3]);K=(c[k>>2]=v,c[k+4>>2]=w,+h[k>>3]);L=H*I-J*K;h[k>>3]=L,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;M=-0.0-H;N=(c[k>>2]=i,c[k+4>>2]=j,+h[k>>3]);O=(c[k>>2]=l,c[k+4>>2]=m,+h[k>>3]);P=N*M+O*K;m=a+12|0;h[k>>3]=P,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;Q=J*N-O*I;l=a+20|0;h[k>>3]=Q,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;R=(c[k>>2]=n,c[k+4>>2]=o,+h[k>>3]);S=(c[k>>2]=t,c[k+4>>2]=u,+h[k>>3]);T=R*M+J*S;u=a+28|0;h[k>>3]=T,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;M=(c[k>>2]=f,c[k+4>>2]=g,+h[k>>3]);U=H*M-O*S;g=a+36|0;h[k>>3]=U,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;H=M*(-0.0-J)+O*R;f=a+44|0;h[k>>3]=H,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;J=K*R-I*S;t=a+52|0;h[k>>3]=J,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;V=M*(-0.0-K)+N*S;o=a+60|0;h[k>>3]=V,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;S=I*M-N*R;n=a+68|0;h[k>>3]=S,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;R=M*(c[k>>2]=A,c[k+4>>2]=B,+h[k>>3]);M=R+N*(c[k>>2]=C,c[k+4>>2]=D,+h[k>>3]);N=M+O*(c[k>>2]=E,c[k+4>>2]=F,+h[k>>3]);if(N==0.0){F=a+4|0;h[k>>3]=1.0,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;O=1.0;h[k>>3]=O,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}else{M=1.0/N;F=a+4|0;N=L*M;h[k>>3]=N,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;N=T*M;h[k>>3]=N,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;N=J*M;h[k>>3]=N,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;N=P*M;h[k>>3]=N,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;N=U*M;h[k>>3]=N,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;N=V*M;h[k>>3]=N,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;N=Q*M;h[k>>3]=N,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;N=H*M;h[k>>3]=N,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;O=S*M;h[k>>3]=O,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}return 0}function cc(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0.0,ar=0.0,as=0.0,at=0.0,au=0.0,av=0.0,aw=0.0,ax=0.0,ay=0.0,az=0.0,aA=0.0,aB=0.0,aC=0.0,aD=0.0,aE=0.0,aF=0.0,aG=0.0,aH=0.0,aI=0.0,aJ=0.0,aK=0.0,aL=0.0,aM=0.0,aN=0.0,aO=0.0,aP=0.0,aQ=0.0,aR=0.0,aS=0.0,aT=0.0,aU=0.0,aV=0.0,aW=0.0;f=b+4|0;b=f|0;g=f+4|0;i=f+8|0;j=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+12|0;l=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+16|0;m=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+20|0;n=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+24|0;o=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+28|0;p=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+32|0;q=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+36|0;r=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+40|0;s=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+44|0;t=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+48|0;u=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+52|0;v=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+56|0;w=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+60|0;x=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+64|0;y=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+68|0;z=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+72|0;A=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+76|0;B=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+80|0;C=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+84|0;D=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+88|0;E=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+92|0;F=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+96|0;G=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+100|0;H=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+104|0;I=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+108|0;J=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+112|0;K=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+116|0;L=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+120|0;M=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+124|0;f=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=e+4|0;e=i|0;N=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+4|0;O=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+8|0;P=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+12|0;Q=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+16|0;R=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+20|0;S=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+24|0;T=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+28|0;U=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+32|0;V=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+36|0;W=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+40|0;X=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+44|0;Y=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+48|0;Z=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+52|0;_=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+56|0;$=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+60|0;aa=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+64|0;ab=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+68|0;ac=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+72|0;ad=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+76|0;ae=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+80|0;af=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+84|0;ag=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+88|0;ah=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+92|0;ai=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+96|0;aj=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+100|0;ak=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+104|0;al=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+108|0;am=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+112|0;an=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+116|0;ao=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+120|0;ap=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=i+124|0;i=d[e]|d[e+1|0]<<8|d[e+2|0]<<16|d[e+3|0]<<24|0;e=d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0;aq=(c[k>>2]=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0,c[k+4>>2]=e,+h[k>>3]);ar=(c[k>>2]=q,c[k+4>>2]=r,+h[k>>3]);as=(c[k>>2]=y,c[k+4>>2]=z,+h[k>>3]);at=(c[k>>2]=G,c[k+4>>2]=H,+h[k>>3]);au=(c[k>>2]=j,c[k+4>>2]=l,+h[k>>3]);av=(c[k>>2]=s,c[k+4>>2]=t,+h[k>>3]);aw=(c[k>>2]=A,c[k+4>>2]=B,+h[k>>3]);ax=(c[k>>2]=I,c[k+4>>2]=J,+h[k>>3]);ay=(c[k>>2]=m,c[k+4>>2]=n,+h[k>>3]);az=(c[k>>2]=u,c[k+4>>2]=v,+h[k>>3]);aA=(c[k>>2]=C,c[k+4>>2]=D,+h[k>>3]);aB=(c[k>>2]=K,c[k+4>>2]=L,+h[k>>3]);aC=(c[k>>2]=o,c[k+4>>2]=p,+h[k>>3]);aD=(c[k>>2]=w,c[k+4>>2]=x,+h[k>>3]);aE=(c[k>>2]=E,c[k+4>>2]=F,+h[k>>3]);aF=(c[k>>2]=M,c[k+4>>2]=f,+h[k>>3]);aG=(c[k>>2]=N,c[k+4>>2]=O,+h[k>>3]);aH=(c[k>>2]=V,c[k+4>>2]=W,+h[k>>3]);aI=(c[k>>2]=ab,c[k+4>>2]=ac,+h[k>>3]);aJ=(c[k>>2]=aj,c[k+4>>2]=ak,+h[k>>3]);aK=(c[k>>2]=P,c[k+4>>2]=Q,+h[k>>3]);aL=(c[k>>2]=X,c[k+4>>2]=Y,+h[k>>3]);aM=(c[k>>2]=ad,c[k+4>>2]=ae,+h[k>>3]);aN=(c[k>>2]=al,c[k+4>>2]=am,+h[k>>3]);aO=(c[k>>2]=R,c[k+4>>2]=S,+h[k>>3]);aP=(c[k>>2]=Z,c[k+4>>2]=_,+h[k>>3]);aQ=(c[k>>2]=af,c[k+4>>2]=ag,+h[k>>3]);aR=(c[k>>2]=an,c[k+4>>2]=ao,+h[k>>3]);aS=(c[k>>2]=T,c[k+4>>2]=U,+h[k>>3]);aT=(c[k>>2]=$,c[k+4>>2]=aa,+h[k>>3]);aU=(c[k>>2]=ah,c[k+4>>2]=ai,+h[k>>3]);aV=(c[k>>2]=ap,c[k+4>>2]=i,+h[k>>3]);aW=aq*aG+ar*aK+as*aO+at*aS;i=a+4|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aq*aH+ar*aL+as*aP+at*aT;i=a+36|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aq*aI+ar*aM+as*aQ+at*aU;i=a+68|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aq*aJ+ar*aN+as*aR+at*aV;i=a+100|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=au*aG+av*aK+aw*aO+ax*aS;i=a+12|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=au*aH+av*aL+aw*aP+ax*aT;i=a+44|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=au*aI+av*aM+aw*aQ+ax*aU;i=a+76|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=au*aJ+av*aN+aw*aR+ax*aV;i=a+108|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=ay*aG+az*aK+aA*aO+aB*aS;i=a+20|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=ay*aH+az*aL+aA*aP+aB*aT;i=a+52|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=ay*aI+az*aM+aA*aQ+aB*aU;i=a+84|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=ay*aJ+az*aN+aA*aR+aB*aV;i=a+116|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aC*aG+aD*aK+aE*aO+aF*aS;i=a+28|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aC*aH+aD*aL+aE*aP+aF*aT;i=a+60|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aC*aI+aD*aM+aE*aQ+aF*aU;i=a+92|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;aW=aC*aJ+aD*aN+aE*aR+aF*aV;i=a+124|0;h[k>>3]=aW,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cd(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0,m=0,n=0.0,o=0,p=0.0,q=0.0,r=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+28|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=c[a+4>>2]|0;j=i-e;b=d+4|0;l=c[b>>2]|0;m=l+4|0;h[k>>3]=j,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=l+12|0;h[k>>3]=j,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=l+20|0;h[k>>3]=j,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=d+8|0;h[k>>3]=j,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;d=c[b>>2]|0;b=d+4|0;j=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);l=d+12|0;n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);o=d+20|0;p=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);q=1.0/+O(+(j*j+n*n+p*p));r=j*q;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;r=n*q;h[k>>3]=r,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;r=p*q;h[k>>3]=r,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;r=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*q;h[k>>3]=r,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=c[a+8>>2]|0;r=i+e;o=m+4|0;l=c[o>>2]|0;b=l+4|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=l+12|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=l+20|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=m+8|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;m=c[o>>2]|0;o=m+4|0;r=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);l=m+12|0;e=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);d=m+20|0;q=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);p=1.0/+O(+(r*r+e*e+q*q));n=r*p;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;n=e*p;h[k>>3]=n,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;n=q*p;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*p;h[k>>3]=n,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[a+12>>2]|0;n=i+f;d=b+4|0;l=c[d>>2]|0;o=l+4|0;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=l+12|0;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=l+20|0;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=b+8|0;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;b=c[d>>2]|0;d=b+4|0;n=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);l=b+12|0;p=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);m=b+20|0;q=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);e=1.0/+O(+(n*n+p*p+q*q));r=n*e;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;r=p*e;h[k>>3]=r,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;r=q*e;h[k>>3]=r,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;r=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3])*e;h[k>>3]=r,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=c[a+16>>2]|0;r=i-f;m=o+4|0;l=c[m>>2]|0;d=l+4|0;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=l+12|0;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=l+20|0;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=o+8|0;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;o=c[m>>2]|0;m=o+4|0;r=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);l=o+12|0;f=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);b=o+20|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);q=1.0/+O(+(r*r+f*f+e*e));p=r*q;h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;p=f*q;h[k>>3]=p,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;p=e*q;h[k>>3]=p,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;p=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*q;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=c[a+20>>2]|0;p=i-g;b=d+4|0;l=c[b>>2]|0;m=l+4|0;h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=l+12|0;h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=l+20|0;h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=d+8|0;h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;d=c[b>>2]|0;b=d+4|0;p=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);l=d+12|0;q=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);o=d+20|0;e=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);f=1.0/+O(+(p*p+q*q+e*e));r=p*f;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;r=q*f;h[k>>3]=r,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;r=e*f;h[k>>3]=r,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;r=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*f;h[k>>3]=r,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=c[a+24>>2]|0;r=i+g;o=m+4|0;l=c[o>>2]|0;b=l+4|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=l+12|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=l+20|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=m+8|0;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;m=c[o>>2]|0;o=m+4|0;r=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);l=m+12|0;g=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);d=m+20|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=1.0/+O(+(r*r+g*g+i*i));e=r*f;h[k>>3]=e,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;e=g*f;h[k>>3]=e,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;e=i*f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*f;h[k>>3]=e,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function ce(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0,j=0,l=0.0;b=hI(28)|0;d=b;b7(d);e=c[b+4>>2]|0;f=c[a+4>>2]|0;g=c[e+4>>2]|0;i=c[f+4>>2]|0;j=i+4|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=g+4|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=i+12|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=g+12|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=i+20|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=g+20|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=f+8|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=e+8|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=c[b+8>>2]|0;e=c[a+8>>2]|0;f=c[j+4>>2]|0;g=c[e+4>>2]|0;i=g+4|0;l=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+4|0;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+12|0;l=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+12|0;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+20|0;l=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+20|0;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=e+8|0;l=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=j+8|0;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=c[b+12>>2]|0;j=c[a+12>>2]|0;e=c[i+4>>2]|0;f=c[j+4>>2]|0;g=f+4|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+4|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+12|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+12|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+20|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+20|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=j+8|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=i+8|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=c[b+16>>2]|0;i=c[a+16>>2]|0;j=c[g+4>>2]|0;e=c[i+4>>2]|0;f=e+4|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=j+4|0;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=j+12|0;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=j+20|0;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=i+8|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=g+8|0;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[b+20>>2]|0;g=c[a+20>>2]|0;i=c[f+4>>2]|0;j=c[g+4>>2]|0;e=j+4|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+4|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=j+12|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+12|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=j+20|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+20|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=g+8|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+8|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=c[b+24>>2]|0;b=c[a+24>>2]|0;a=c[e+4>>2]|0;f=c[b+4>>2]|0;g=f+4|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+4|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+12|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+12|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+20|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+20|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+8|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+8|0;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return d|0}function cf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0;f=hI(28)|0;c[f>>2]=5244656;g=f+4|0;i=g;j=g;c[j>>2]=0;c[j+4>>2]=0;j=hI(28)|0;c[j>>2]=5244656;g=j+4|0;l=g;m=g;c[m>>2]=0;c[m+4>>2]=0;m=a+4|0;g=c[m>>2]|0;n=b+4|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=g+4|0;p=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);q=o-p;h[k>>3]=q,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=b+12|0;o=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=g+12|0;r=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);s=o-r;n=f+12|0;h[k>>3]=s,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=b+20|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=g+20|0;t=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);u=o-t;g=f+20|0;h[k>>3]=u,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=c[a+8>>2]|0;a=g+4|0;o=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-p;h[k>>3]=o,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=g+12|0;p=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])-r;a=j+12|0;h[k>>3]=p,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=g+20|0;r=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-t;g=j+20|0;h[k>>3]=r,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;t=(o*q+p*s+r*u)/(o*o+p*p+r*r);do{if(d){if(t<0.0){v=0.0;break}v=t>1.0?1.0:t}else{v=t}}while(0);d=e+4|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;t=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);r=t-(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=e+12|0;h[k>>3]=r,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;t=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);p=t-(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=e+20|0;t=o*v;h[k>>3]=t,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;o=r*v;h[k>>3]=o,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;r=p*v;h[k>>3]=r,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;a=c[m>>2]|0;m=a+4|0;v=t+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);h[k>>3]=v,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;v=o+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=v,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=a+20|0;v=r+(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);h[k>>3]=v,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return e|0}function cg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0.0,s=0.0,t=0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0;f=hI(28)|0;c[f>>2]=5244656;g=f+4|0;i=g;hK(g|0,0,24);j=hI(28)|0;c[j>>2]=5244656;l=j+4|0;m=l;hK(l|0,0,24);l=hI(28)|0;c[l>>2]=5244656;n=l+4|0;o=n;hK(n|0,0,16);p=b+4|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);p=d+4|0;r=q-(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);h[k>>3]=r,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;p=b+12|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);p=d+12|0;s=q-(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);p=l+12|0;h[k>>3]=s,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;t=b+20|0;q=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=d+20|0;u=q-(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=l+20|0;h[k>>3]=u,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;q=+O(+(r*r+s*s+u*u));if(q!=0.0){v=r/q;h[k>>3]=v,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;r=s/q;h[k>>3]=r,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;s=u/q;h[k>>3]=s,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;w=v+1.0e-4;x=s;y=v;z=r}else{hK(n|0,0,24);w=1.0e-4;x=0.0;y=0.0;z=0.0}if(+O(+(y*y+z*z+x*x))==0.0){h[k>>3]=1.0,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;A=1.0}else{A=x}t=e+12|0;x=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=e+20|0;r=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=x*A-r*z;h[k>>3]=v,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;t=e+4|0;s=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);q=r*y-s*A;t=f+12|0;h[k>>3]=q,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;u=s*z-x*y;e=f+20|0;h[k>>3]=u,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;B=+O(+(v*v+q*q+u*u));if(B!=0.0){C=v/B;h[k>>3]=C,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;v=q/B;h[k>>3]=v,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;q=u/B;h[k>>3]=q,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;D=C;E=v;F=q}else{hK(g|0,0,24);D=0.0;E=0.0;F=0.0}do{if(+O(+(D*D+E*E+F*F))==0.0){h[k>>3]=w,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;q=x*A-r*z;h[k>>3]=q,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;v=r*w-s*A;h[k>>3]=v,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;C=s*z-x*w;h[k>>3]=C,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;B=+O(+(q*q+v*v+C*C));if(B!=0.0){u=q/B;h[k>>3]=u,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;q=v/B;h[k>>3]=q,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;v=C/B;h[k>>3]=v,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;G=w;H=u;I=q;J=v;break}else{hK(g|0,0,24);G=w;H=0.0;I=0.0;J=0.0;break}}else{G=y;H=D;I=E;J=F}}while(0);F=z*J-A*I;h[k>>3]=F,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;F=A*H-G*J;m=j+12|0;h[k>>3]=F,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;F=G*I-z*H;m=j+20|0;h[k>>3]=F,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+4|0;h[k>>3]=H,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+36|0;h[k>>3]=H,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+68|0;h[k>>3]=H,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+12|0;h[k>>3]=I,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+44|0;h[k>>3]=I,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+76|0;h[k>>3]=I,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+20|0;h[k>>3]=J,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+52|0;h[k>>3]=J,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=a+84|0;h[k>>3]=J,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;return a|0}function ch(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,j=0.0,l=0.0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0,w=0.0,x=0,y=0.0,z=0,A=0.0,B=0,C=0.0,D=0,E=0.0,F=0,G=0.0,H=0,I=0.0,J=0,K=0.0,L=0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0,R=0.0,S=0.0,T=0.0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0.0,_=0.0,$=0.0,aa=0.0,ab=0.0,ac=0.0,ad=0.0,ae=0.0,af=0.0,ag=0.0,ah=0.0,ai=0.0,aj=0.0,ak=0.0,al=0.0,am=0.0,an=0.0,ao=0.0,ap=0.0;b=i;i=i+120|0;d=b|0;e=d|0;f=a+4|0;g=f|0;hJ(d|0,f|0,128);j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);f=a+36|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);d=a+68|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);n=a+100|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+12|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=a+44|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=a+76|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=a+108|0;w=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);x=a+20|0;y=(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3]);z=a+52|0;A=(c[k>>2]=c[z>>2]|0,c[k+4>>2]=c[z+4>>2]|0,+h[k>>3]);B=a+84|0;C=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);D=a+116|0;E=(c[k>>2]=c[D>>2]|0,c[k+4>>2]=c[D+4>>2]|0,+h[k>>3]);F=a+28|0;G=(c[k>>2]=c[F>>2]|0,c[k+4>>2]=c[F+4>>2]|0,+h[k>>3]);H=a+60|0;I=(c[k>>2]=c[H>>2]|0,c[k+4>>2]=c[H+4>>2]|0,+h[k>>3]);J=a+92|0;K=(c[k>>2]=c[J>>2]|0,c[k+4>>2]=c[J+4>>2]|0,+h[k>>3]);L=a+124|0;M=(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3]);N=u*E;O=w*C;P=w*A;Q=s*E;R=u*A;S=s*C;T=N*I-O*I+P*K-Q*K-R*M+S*M;h[k>>3]=T,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;U=o*C;V=m*E;W=o*A;X=l*E;Y=m*A;Z=l*C;_=U*I-V*I-W*K+X*K+Y*M-Z*M;h[k>>3]=_,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;$=m*w;aa=o*u;ab=o*s;ac=l*w;ad=m*s;ae=l*u;af=$*I-aa*I+ab*K-ac*K-ad*M+ae*M;h[k>>3]=af,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;ag=aa*A-$*A-ab*C+ac*C+ad*E-ae*E;h[k>>3]=ag,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;ah=w*y;ai=q*E;aj=u*y;ak=q*C;al=O*G-N*G-ah*K+ai*K+aj*M-ak*M;h[k>>3]=al,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;N=o*y;O=j*E;am=m*y;an=j*C;ao=V*G-U*G+N*K-O*K-am*M+an*M;h[k>>3]=ao,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;U=o*q;o=j*w;w=m*q;m=j*u;u=aa*G-$*G-U*K+o*K+w*M-m*M;h[k>>3]=u,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;V=$*y-aa*y+U*C-o*C-w*E+m*E;h[k>>3]=V,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;aa=s*y;$=q*A;ap=Q*G-P*G+ah*I-ai*I-aa*M+$*M;h[k>>3]=ap,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;ai=l*y;ah=j*A;P=W*G-X*G-N*I+O*I+ai*M-ah*M;h[k>>3]=P,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;O=l*q;q=j*s;s=ac*G-ab*G+U*I-o*I-O*M+q*M;h[k>>3]=s,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;M=ab*y-ac*y-U*A+o*A+O*E-q*E;h[k>>3]=M,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;E=R*G-S*G-aj*I+ak*I+aa*K-$*K;h[k>>3]=E,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;$=Z*G-Y*G+am*I-an*I-ai*K+ah*K;h[k>>3]=$,c[H>>2]=c[k>>2]|0,c[H+4>>2]=c[k+4>>2]|0;ah=ad*G-ae*G-w*I+m*I+O*K-q*K;h[k>>3]=ah,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;K=ae*y-ad*y+w*A-m*A-O*C+q*C;h[k>>3]=K,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;C=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*T+_*0.0+af*0.0+ag*0.0;if(C==0.0){e=a+4|0;h[k>>3]=1.0,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[H>>2]=c[k>>2]|0,c[H+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;q=1.0;h[k>>3]=q,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;i=b;return a|0}else{O=1.0/C;e=a+4|0;C=T*O;h[k>>3]=C,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;C=_*O;h[k>>3]=C,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;C=af*O;h[k>>3]=C,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;C=ag*O;h[k>>3]=C,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;C=al*O;h[k>>3]=C,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;C=ao*O;h[k>>3]=C,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;C=u*O;h[k>>3]=C,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;C=V*O;h[k>>3]=C,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;C=ap*O;h[k>>3]=C,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;C=P*O;h[k>>3]=C,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;C=s*O;h[k>>3]=C,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;C=M*O;h[k>>3]=C,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;C=E*O;h[k>>3]=C,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;C=$*O;h[k>>3]=C,c[H>>2]=c[k>>2]|0,c[H+4>>2]=c[k+4>>2]|0;C=ah*O;h[k>>3]=C,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;q=K*O;h[k>>3]=q,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;i=b;return a|0}return 0}function ci(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0,t=0;d=hI(36)|0;e=d;c[d>>2]=5244640;f=a+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+4|0;i=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+36|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+12|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+68|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+20|0;n=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+100|0;o=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+28|0;p=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);q=g*i+j*l+m*n+o*p;f=d+4|0;h[k>>3]=q,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;q=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*i;f=a+44|0;o=q+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*l;f=a+76|0;q=o+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*n;f=a+108|0;o=q+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*p;f=d+12|0;h[k>>3]=o,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;o=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*i;f=a+52|0;q=o+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*l;f=a+84|0;o=q+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*n;f=a+116|0;q=o+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*p;f=d+20|0;h[k>>3]=q,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;if(p==0.0){r=1.0;s=d+28|0;t=s;h[k>>3]=r,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;return e|0}f=a+28|0;q=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*i;f=a+60|0;i=q+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*l;f=a+92|0;l=i+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*n;f=a+124|0;r=l+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*p;s=d+28|0;t=s;h[k>>3]=r,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;return e|0}function cj(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0.0,P=0.0,Q=0.0,R=0.0,S=0.0,T=0.0,U=0.0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0.0,_=0.0,$=0.0,aa=0.0,ab=0.0,ac=0.0,ad=0.0,ae=0.0,af=0.0,ag=0.0,ah=0.0,ai=0.0,aj=0.0,ak=0.0,al=0.0,am=0.0,an=0.0,ao=0.0,ap=0.0,aq=0.0,ar=0.0,as=0.0,at=0.0,au=0.0,av=0.0,aw=0.0,ax=0.0,ay=0.0,az=0.0,aA=0.0,aB=0.0,aC=0.0,aD=0.0,aE=0.0,aF=0.0;e=a+4|0;f=b+4|0;b=f|0;g=f+4|0;i=f+8|0;j=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+12|0;l=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+16|0;m=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+20|0;n=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+24|0;o=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+28|0;p=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+32|0;q=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+36|0;r=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+40|0;s=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+44|0;t=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+48|0;u=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+52|0;v=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+56|0;w=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+60|0;x=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+64|0;y=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+68|0;z=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+72|0;A=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+76|0;B=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+80|0;C=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+84|0;D=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+88|0;E=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+92|0;F=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+96|0;G=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+100|0;H=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+104|0;I=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+108|0;J=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+112|0;K=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+116|0;L=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+120|0;M=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=f+124|0;f=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;i=d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0;N=(c[k>>2]=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0,c[k+4>>2]=i,+h[k>>3]);O=(c[k>>2]=q,c[k+4>>2]=r,+h[k>>3]);P=(c[k>>2]=y,c[k+4>>2]=z,+h[k>>3]);Q=(c[k>>2]=G,c[k+4>>2]=H,+h[k>>3]);R=(c[k>>2]=j,c[k+4>>2]=l,+h[k>>3]);S=(c[k>>2]=s,c[k+4>>2]=t,+h[k>>3]);T=(c[k>>2]=A,c[k+4>>2]=B,+h[k>>3]);U=(c[k>>2]=I,c[k+4>>2]=J,+h[k>>3]);V=(c[k>>2]=m,c[k+4>>2]=n,+h[k>>3]);W=(c[k>>2]=u,c[k+4>>2]=v,+h[k>>3]);X=(c[k>>2]=C,c[k+4>>2]=D,+h[k>>3]);Y=(c[k>>2]=K,c[k+4>>2]=L,+h[k>>3]);Z=(c[k>>2]=o,c[k+4>>2]=p,+h[k>>3]);_=(c[k>>2]=w,c[k+4>>2]=x,+h[k>>3]);$=(c[k>>2]=E,c[k+4>>2]=F,+h[k>>3]);aa=(c[k>>2]=M,c[k+4>>2]=f,+h[k>>3]);ab=T*Y;ac=U*X;ad=U*W;ae=S*Y;af=T*W;ag=S*X;ah=ab*_-ac*_+ad*$-ae*$-af*aa+ag*aa;h[k>>3]=ah,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;ai=Q*X;aj=P*Y;ak=Q*W;al=O*Y;am=P*W;an=O*X;ao=ai*_-aj*_-ak*$+al*$+am*aa-an*aa;f=a+36|0;h[k>>3]=ao,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;ap=P*U;aq=Q*T;ar=Q*S;as=O*U;at=P*S;au=O*T;av=ap*_-aq*_+ar*$-as*$-at*aa+au*aa;M=a+68|0;h[k>>3]=av,c[M>>2]=c[k>>2]|0,c[M+4>>2]=c[k+4>>2]|0;aw=aq*W-ap*W-ar*X+as*X+at*Y-au*Y;F=a+100|0;h[k>>3]=aw,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;ax=U*V;ay=R*Y;az=T*V;aA=R*X;aB=ac*Z-ab*Z-ax*$+ay*$+az*aa-aA*aa;E=a+12|0;h[k>>3]=aB,c[E>>2]=c[k>>2]|0,c[E+4>>2]=c[k+4>>2]|0;ab=Q*V;ac=N*Y;aC=P*V;aD=N*X;aE=aj*Z-ai*Z+ab*$-ac*$-aC*aa+aD*aa;x=a+44|0;h[k>>3]=aE,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;ai=Q*R;Q=N*U;U=P*R;P=N*T;T=aq*Z-ap*Z-ai*$+Q*$+U*aa-P*aa;w=a+76|0;h[k>>3]=T,c[w>>2]=c[k>>2]|0,c[w+4>>2]=c[k+4>>2]|0;aj=ap*V-aq*V+ai*X-Q*X-U*Y+P*Y;p=a+108|0;h[k>>3]=aj,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;aq=S*V;ap=R*W;aF=ae*Z-ad*Z+ax*_-ay*_-aq*aa+ap*aa;o=a+20|0;h[k>>3]=aF,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;ay=O*V;ax=N*W;ad=ak*Z-al*Z-ab*_+ac*_+ay*aa-ax*aa;L=a+52|0;h[k>>3]=ad,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;ac=O*R;O=N*S;S=as*Z-ar*Z+ai*_-Q*_-ac*aa+O*aa;K=a+84|0;h[k>>3]=S,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;aa=ar*V-as*V-ai*W+Q*W+ac*Y-O*Y;D=a+116|0;h[k>>3]=aa,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;Y=af*Z-ag*Z-az*_+aA*_+aq*$-ap*$;C=a+28|0;h[k>>3]=Y,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;ap=an*Z-am*Z+aC*_-aD*_-ay*$+ax*$;v=a+60|0;h[k>>3]=ap,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;ax=at*Z-au*Z-U*_+P*_+ac*$-O*$;u=a+92|0;h[k>>3]=ax,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;$=au*V-at*V+U*W-P*W-ac*X+O*X;n=a+124|0;h[k>>3]=$,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;X=N*ah+R*ao+V*av+Z*aw;if(X==0.0){h[k>>3]=1.0,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[M>>2]=c[k>>2]|0,c[M+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[E>>2]=c[k>>2]|0,c[E+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[w>>2]=c[k>>2]|0,c[w+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;h[k>>3]=0.0,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;Z=1.0;h[k>>3]=Z,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}else{V=1.0/X;X=ah*V;h[k>>3]=X,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;X=ao*V;h[k>>3]=X,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;X=av*V;h[k>>3]=X,c[M>>2]=c[k>>2]|0,c[M+4>>2]=c[k+4>>2]|0;X=aw*V;h[k>>3]=X,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;X=aB*V;h[k>>3]=X,c[E>>2]=c[k>>2]|0,c[E+4>>2]=c[k+4>>2]|0;X=aE*V;h[k>>3]=X,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;X=T*V;h[k>>3]=X,c[w>>2]=c[k>>2]|0,c[w+4>>2]=c[k+4>>2]|0;X=aj*V;h[k>>3]=X,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;X=aF*V;h[k>>3]=X,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;X=ad*V;h[k>>3]=X,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;X=S*V;h[k>>3]=X,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;X=aa*V;h[k>>3]=X,c[D>>2]=c[k>>2]|0,c[D+4>>2]=c[k+4>>2]|0;X=Y*V;h[k>>3]=X,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;X=ap*V;h[k>>3]=X,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;X=ax*V;h[k>>3]=X,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;Z=$*V;h[k>>3]=Z,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}return 0}function ck(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0.0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0,w=0.0,x=0.0,y=0.0,z=0.0,A=0,B=0,C=0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);do{if(f==1.0){e=b+12|0;if((c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])!=0.0){break}e=b+20|0;if((c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])!=0.0){break}e=a+36|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=a+44|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=a+52|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+60|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+68|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=a+76|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=a+84|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=a+92|0;w=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);x=+Q(+d);y=+R(+d);z=x*g+y*q;h[k>>3]=z,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;z=x*j+y*s;h[k>>3]=z,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;z=x*m+y*u;h[k>>3]=z,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;z=x*o+y*w;h[k>>3]=z,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;z=x*q-y*g;h[k>>3]=z,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;z=x*s-y*j;h[k>>3]=z,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;z=x*u-y*m;h[k>>3]=z,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;z=x*w-y*o;h[k>>3]=z,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;return a|0}}while(0);v=f==0.0;L117:do{if(v){t=b+12|0;do{if((c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3])==1.0){r=b+20|0;if((c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3])!=0.0){if(v){break}else{A=117;break L117}}r=a+4|0;z=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);p=a+12|0;o=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);n=a+20|0;y=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);l=a+28|0;w=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);i=a+68|0;x=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);e=a+76|0;m=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);B=a+84|0;u=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);C=a+92|0;j=(c[k>>2]=c[C>>2]|0,c[k+4>>2]=c[C+4>>2]|0,+h[k>>3]);s=+Q(+d);g=+R(+d);q=s*z-g*x;h[k>>3]=q,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;q=s*o-g*m;h[k>>3]=q,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;q=s*y-g*u;h[k>>3]=q,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;q=s*w-g*j;h[k>>3]=q,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;q=s*x+g*z;h[k>>3]=q,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;q=s*m+g*o;h[k>>3]=q,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;q=s*u+g*y;h[k>>3]=q,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;q=s*j+g*w;h[k>>3]=q,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;return a|0}}while(0);t=b+12|0;q=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);if(q!=0.0){D=q;break}t=b+20|0;if((c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3])!=1.0){D=q;break}t=a+4|0;q=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);C=a+12|0;w=(c[k>>2]=c[C>>2]|0,c[k+4>>2]=c[C+4>>2]|0,+h[k>>3]);B=a+20|0;g=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);e=a+28|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=a+36|0;s=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=a+44|0;y=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+52|0;u=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+60|0;o=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);m=+Q(+d);z=+R(+d);x=m*q+z*s;h[k>>3]=x,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;x=m*w+z*y;h[k>>3]=x,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;x=m*g+z*u;h[k>>3]=x,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;x=m*j+z*o;h[k>>3]=x,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;x=m*s-z*q;h[k>>3]=x,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;x=m*y-z*w;h[k>>3]=x,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;x=m*u-z*g;h[k>>3]=x,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;x=m*o-z*j;h[k>>3]=x,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;return a|0}else{A=117}}while(0);if((A|0)==117){A=b+12|0;D=(c[k>>2]=c[A>>2]|0,c[k+4>>2]=c[A+4>>2]|0,+h[k>>3])}A=b+20|0;x=(c[k>>2]=c[A>>2]|0,c[k+4>>2]=c[A+4>>2]|0,+h[k>>3]);j=+O(+(f*f+D*D+x*x));z=f/j;f=D/j;D=x/j;j=z*z;x=f*f;o=D*D;m=+Q(+d);g=+R(+d);d=1.0-m;u=z*f*d;w=z*D*d;y=f*D*d;d=z*g;z=f*g;f=D*g;g=j+(1.0-j)*m;j=u+f;D=w-z;q=u-f;f=x+(1.0-x)*m;x=y+d;u=w+z;z=y-d;d=o+(1.0-o)*m;A=a+4|0;m=(c[k>>2]=c[A>>2]|0,c[k+4>>2]=c[A+4>>2]|0,+h[k>>3]);b=a+12|0;o=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);v=a+20|0;y=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);p=a+28|0;w=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);n=a+36|0;s=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);l=a+44|0;E=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);i=a+52|0;F=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);e=a+60|0;G=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);B=a+68|0;H=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);C=a+76|0;I=(c[k>>2]=c[C>>2]|0,c[k+4>>2]=c[C+4>>2]|0,+h[k>>3]);t=a+84|0;J=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);r=a+92|0;K=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);L=g*m+j*s+D*H;h[k>>3]=L,c[A>>2]=c[k>>2]|0,c[A+4>>2]=c[k+4>>2]|0;L=g*o+j*E+D*I;h[k>>3]=L,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;L=g*y+j*F+D*J;h[k>>3]=L,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;L=g*w+j*G+D*K;h[k>>3]=L,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;L=q*m+f*s+x*H;h[k>>3]=L,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;L=q*o+f*E+x*I;h[k>>3]=L,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;L=q*y+f*F+x*J;h[k>>3]=L,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;L=q*w+f*G+x*K;h[k>>3]=L,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;L=u*m+z*s+d*H;h[k>>3]=L,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;L=u*o+z*E+d*I;h[k>>3]=L,c[C>>2]=c[k>>2]|0,c[C+4>>2]=c[k+4>>2]|0;L=u*y+z*F+d*J;h[k>>3]=L,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;L=u*w+z*G+d*K;h[k>>3]=L,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;return a|0}function cl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0;f=hI(132)|0;g=f;c[f>>2]=5244688;i=f+4|0;j=i;hK(i|0,0,112);i=f+124|0;l=f+84|0;m=f+44|0;n=hI(132)|0;o=n;c[n>>2]=5244688;p=n+4|0;q=p;hK(p|0,0,112);p=n+124|0;r=n+84|0;s=n+44|0;t=f+36|0;u=f+68|0;v=f+100|0;h[k>>3]=0.0,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=f+12|0;w=f+76|0;x=f+108|0;h[k>>3]=0.0,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;x=f+20|0;y=f+52|0;z=f+116|0;h[k>>3]=0.0,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;z=f+28|0;h[k>>3]=0.0,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;z=f+60|0;h[k>>3]=0.0,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;z=f+92|0;h[k>>3]=0.0,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=d+4|0;A=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+12|0;B=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+20|0;C=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+28|0;D=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);E=A+A;F=B+B;G=C+C;H=A*E;I=A*F;J=A*G;A=B*F;K=B*G;B=C*G;C=D*E;E=D*F;F=D*G;G=1.0-(A+B);h[k>>3]=G,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;G=I-F;h[k>>3]=G,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;G=J+E;h[k>>3]=G,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;G=I+F;h[k>>3]=G,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;G=1.0-(H+B);h[k>>3]=G,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;G=K-C;h[k>>3]=G,c[w>>2]=c[k>>2]|0,c[w+4>>2]=c[k+4>>2]|0;G=J-E;h[k>>3]=G,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;G=K+C;h[k>>3]=G,c[y>>2]=c[k>>2]|0,c[y+4>>2]=c[k+4>>2]|0;G=1.0-(H+A);h[k>>3]=G,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=e+4|0;G=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=e+12|0;A=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=e+20|0;H=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=G,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;q=n+36|0;h[k>>3]=0.0,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;q=n+68|0;h[k>>3]=0.0,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;q=n+100|0;h[k>>3]=0.0,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;q=n+12|0;h[k>>3]=0.0,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;h[k>>3]=A,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;s=n+76|0;h[k>>3]=0.0,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;s=n+108|0;h[k>>3]=0.0,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;s=n+20|0;h[k>>3]=0.0,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;s=n+52|0;h[k>>3]=0.0,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;h[k>>3]=H,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;r=n+116|0;h[k>>3]=0.0,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;r=n+28|0;h[k>>3]=0.0,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;r=n+60|0;h[k>>3]=0.0,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;r=n+92|0;h[k>>3]=0.0,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;cc(a,g,o);o=b+4|0;H=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);o=a+100|0;h[k>>3]=H,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=b+12|0;H=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);o=a+108|0;h[k>>3]=H,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=b+20|0;H=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);o=a+116|0;h[k>>3]=H,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;return a|0}function cm(a,b){a=a|0;b=b|0;return(b|0)==45|0}function cn(a,b){a=a|0;b=b|0;return(b|0)==44|0}function co(a,b){a=a|0;b=b|0;return(b|0)==55|0}function cp(a,b){a=a|0;b=b|0;return(b|0)==46|0}function cq(a,b){a=a|0;b=b|0;return(b|0)==47|0}function cr(a,b){a=a|0;b=b|0;return(b|0)==54|0}function cs(a,b){a=a|0;b=b|0;return(b|0)==53|0}function ct(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0,i=0.0,j=0.0;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);do{if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}else{g=d+4|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=j){break}h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}}while(0);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);do{if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}else{g=d+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=j){break}h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}}while(0);e=a+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}g=d+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=i){return a|0}h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function cu(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+28|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+52|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+36|0;n=m+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+60|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+44|0;e=m+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+68|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;h[k>>3]=g,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cv(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0.0,v=0,w=0.0,x=0,y=0.0,z=0.0,A=0.0,B=0,C=0.0,D=0.0,E=0.0,F=0,G=0.0,H=0.0,I=0,J=0,K=0,L=0,M=0.0,N=0.0,P=0.0,Q=0.0,R=0.0,S=0.0;f=hI(28)|0;c[f>>2]=5244656;g=f+4|0;i=g;hK(g|0,0,16);g=hI(28)|0;c[g>>2]=5244656;j=g+4|0;l=j;hK(j|0,0,16);j=hI(28)|0;c[j>>2]=5244656;m=j+4|0;n=m;hK(m|0,0,16);m=hI(132)|0;o=m;c[m>>2]=5244688;p=m+4|0;q=p;hK(p|0,0,112);p=m+124|0;r=m+84|0;s=m+44|0;t=a+4|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=a+12|0;w=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);x=a+20|0;y=(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3]);h[k>>3]=u,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=f+12|0;h[k>>3]=w,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=f+20|0;h[k>>3]=y,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=a+36|0;z=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);f=a+44|0;A=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);B=a+52|0;C=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);h[k>>3]=z,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=g+12|0;h[k>>3]=A,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=g+20|0;h[k>>3]=C,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=a+68|0;D=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);g=a+76|0;E=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);F=a+84|0;G=(c[k>>2]=c[F>>2]|0,c[k+4>>2]=c[F+4>>2]|0,+h[k>>3]);h[k>>3]=D,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=j+12|0;h[k>>3]=E,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=j+20|0;h[k>>3]=G,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;H=+O(+(u*u+w*w+y*y));n=e+4|0;h[k>>3]=H,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;H=+O(+(z*z+A*A+C*C));j=e+12|0;h[k>>3]=H,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;H=+O(+(D*D+E*E+G*G));I=e+20|0;h[k>>3]=H,c[I>>2]=c[k>>2]|0,c[I+4>>2]=c[k+4>>2]|0;e=a+100|0;H=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);J=b+4|0;h[k>>3]=H,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;J=a+108|0;H=(c[k>>2]=c[J>>2]|0,c[k+4>>2]=c[J+4>>2]|0,+h[k>>3]);K=b+12|0;h[k>>3]=H,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;K=a+116|0;H=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);L=b+20|0;h[k>>3]=H,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;H=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);G=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);E=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);D=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);C=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);A=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);z=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);y=(c[k>>2]=c[J>>2]|0,c[k+4>>2]=c[J+4>>2]|0,+h[k>>3]);w=(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3]);u=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);M=(c[k>>2]=c[F>>2]|0,c[k+4>>2]=c[F+4>>2]|0,+h[k>>3]);N=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);K=a+28|0;P=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);K=a+60|0;Q=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);K=a+92|0;R=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);K=a+124|0;S=(c[k>>2]=c[K>>2]|0,c[k+4>>2]=c[K+4>>2]|0,+h[k>>3]);K=m+36|0;F=m+68|0;B=m+100|0;h[k>>3]=D,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;B=m+12|0;x=m+76|0;J=m+108|0;h[k>>3]=y,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;J=m+20|0;g=m+52|0;f=m+116|0;h[k>>3]=N,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=m+28|0;h[k>>3]=P,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=m+60|0;h[k>>3]=Q,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=m+92|0;h[k>>3]=R,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;h[k>>3]=S,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;S=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);R=H/S;h[k>>3]=R,c[q>>2]=c[k>>2]|0,c[q+4>>2]=c[k+4>>2]|0;R=C/S;h[k>>3]=R,c[B>>2]=c[k>>2]|0,c[B+4>>2]=c[k+4>>2]|0;R=w/S;h[k>>3]=R,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;R=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);S=G/R;h[k>>3]=S,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;S=A/R;h[k>>3]=S,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;S=u/R;h[k>>3]=S,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;S=(c[k>>2]=c[I>>2]|0,c[k+4>>2]=c[I+4>>2]|0,+h[k>>3]);R=E/S;h[k>>3]=R,c[F>>2]=c[k>>2]|0,c[F+4>>2]=c[k+4>>2]|0;R=z/S;h[k>>3]=R,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;R=M/S;h[k>>3]=R,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;cA(d,o);return a|0}function cw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,l=0,m=0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0;f=hI(28)|0;c[f>>2]=5244656;g=f+4|0;i=g;j=g;c[j>>2]=0;c[j+4>>2]=0;j=hI(28)|0;c[j>>2]=5244656;l=j+4|0;m=l;hK(l|0,0,16);l=e+4|0;n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=d+4|0;o=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);p=n-o;l=e+12|0;n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=d+12|0;q=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);r=n-q;l=f+12|0;s=e+20|0;n=(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3]);s=d+20|0;t=(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3]);u=n-t;s=f+20|0;f=b+4|0;n=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);v=n-o;h[k>>3]=v,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=b+12|0;o=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);w=o-q;m=j+12|0;h[k>>3]=w,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;m=b+20|0;q=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);x=q-t;m=j+20|0;h[k>>3]=x,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;t=r*x-u*w;h[k>>3]=t,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;y=u*v-p*x;h[k>>3]=y,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;x=p*w-r*v;h[k>>3]=x,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;v=+O(+(t*t+y*y+x*x));if(v!=0.0){r=t/v;h[k>>3]=r,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;t=y/v;h[k>>3]=t,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;y=x/v;h[k>>3]=y,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;v=y;y=r;r=t;t=n*y;x=o*r;w=t+x;p=q*v;u=w+p;z=-0.0-u;s=a+8|0;h[k>>3]=z,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;return a|0}else{hK(g|0,0,24);v=0.0;y=0.0;r=0.0;t=n*y;x=o*r;w=t+x;p=q*v;u=w+p;z=-0.0-u;s=a+8|0;h[k>>3]=z,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;return a|0}return 0}function cx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0;d=hI(28)|0;c[d>>2]=5244656;e=d+4|0;f=e;hK(e|0,0,16);e=hI(28)|0;g=e;c[e>>2]=5244656;i=e+4|0;j=i;hK(i|0,0,24);i=c[b+8>>2]|0;l=c[b+4>>2]|0;b=i+4|0;m=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=l+4|0;n=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);o=m-n;h[k>>3]=o,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=i+12|0;p=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=l+12|0;q=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);r=p-q;f=d+12|0;h[k>>3]=r,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=i+20|0;s=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=l+20|0;t=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);u=s-t;f=d+20|0;h[k>>3]=u,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+4>>2]|0;d=f+4|0;v=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+12|0;w=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+20|0;x=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);y=v*o+w*r+x*u;if(y==0.0){d=a+8|0;if(v*n+w*q+x*t+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])==0.0){z=0;return z|0}h[k>>3]=m,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;d=e+12|0;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=e+20|0;h[k>>3]=s,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;z=g;return z|0}else{d=a+8|0;s=(-0.0-(n*v+q*w+t*x+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])))/y;if(s<0.0|s>1.0){z=0;return z|0}d=e+12|0;a=e+20|0;y=r*s;r=u*s;u=o*s+n;h[k>>3]=u,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;u=y+q;h[k>>3]=u,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;u=r+t;h[k>>3]=u,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;z=g;return z|0}return 0}function cy(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0,w=0.0,x=0,y=0.0,z=0,A=0.0,B=0,C=0.0,D=0,E=0.0,F=0,G=0.0,H=0,I=0.0,J=0,K=0.0,L=0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=hI(28)|0;c[d>>2]=5244656;e=d+4|0;f=e;g=e;c[g>>2]=0;c[g+4>>2]=0;g=hI(132)|0;e=g;c[g>>2]=5244688;i=g+4|0;j=i;hK(i|0,0,112);i=g+124|0;l=g+84|0;m=g+44|0;n=b+4|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=b+36|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=b+68|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=b+100|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=b+12|0;w=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3]);x=b+44|0;y=(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3]);z=b+76|0;A=(c[k>>2]=c[z>>2]|0,c[k+4>>2]=c[z+4>>2]|0,+h[k>>3]);B=b+108|0;C=(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);D=b+20|0;E=(c[k>>2]=c[D>>2]|0,c[k+4>>2]=c[D+4>>2]|0,+h[k>>3]);F=b+52|0;G=(c[k>>2]=c[F>>2]|0,c[k+4>>2]=c[F+4>>2]|0,+h[k>>3]);H=b+84|0;I=(c[k>>2]=c[H>>2]|0,c[k+4>>2]=c[H+4>>2]|0,+h[k>>3]);J=b+116|0;K=(c[k>>2]=c[J>>2]|0,c[k+4>>2]=c[J+4>>2]|0,+h[k>>3]);L=b+28|0;M=(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3]);L=b+60|0;N=(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3]);L=b+92|0;O=(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3]);L=b+124|0;P=(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;L=g+36|0;h[k>>3]=q,c[L>>2]=c[k>>2]|0,c[L+4>>2]=c[k+4>>2]|0;b=g+68|0;h[k>>3]=s,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;Q=g+100|0;h[k>>3]=u,c[Q>>2]=c[k>>2]|0,c[Q+4>>2]=c[k+4>>2]|0;R=g+12|0;h[k>>3]=w,c[R>>2]=c[k>>2]|0,c[R+4>>2]=c[k+4>>2]|0;h[k>>3]=y,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;S=g+76|0;h[k>>3]=A,c[S>>2]=c[k>>2]|0,c[S+4>>2]=c[k+4>>2]|0;T=g+108|0;h[k>>3]=C,c[T>>2]=c[k>>2]|0,c[T+4>>2]=c[k+4>>2]|0;U=g+20|0;h[k>>3]=E,c[U>>2]=c[k>>2]|0,c[U+4>>2]=c[k+4>>2]|0;V=g+52|0;h[k>>3]=G,c[V>>2]=c[k>>2]|0,c[V+4>>2]=c[k+4>>2]|0;h[k>>3]=I,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;W=g+116|0;h[k>>3]=K,c[W>>2]=c[k>>2]|0,c[W+4>>2]=c[k+4>>2]|0;X=g+28|0;h[k>>3]=M,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;X=g+60|0;h[k>>3]=N,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;X=g+92|0;h[k>>3]=O,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=ch(e)|0;e=i+12|0;P=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);X=i+36|0;O=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;X=i+20|0;P=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);e=i+68|0;O=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=i+52|0;P=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);X=i+76|0;O=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;X=i+28|0;P=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);e=i+100|0;O=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=i+60|0;P=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);X=i+108|0;O=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;X=i+92|0;P=(c[k>>2]=c[X>>2]|0,c[k+4>>2]=c[X+4>>2]|0,+h[k>>3]);e=i+116|0;O=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=O,c[X>>2]=c[k>>2]|0,c[X+4>>2]=c[k+4>>2]|0;h[k>>3]=P,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=a+4|0;X=c[e>>2]|0;i=X+4|0;P=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=X+12|0;O=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+12|0;g=X+20|0;N=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+20|0;M=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])*P;K=M+(c[k>>2]=c[L>>2]|0,c[k+4>>2]=c[L+4>>2]|0,+h[k>>3])*O;M=K+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*N;K=M+(c[k>>2]=c[Q>>2]|0,c[k+4>>2]=c[Q+4>>2]|0,+h[k>>3]);h[k>>3]=K,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;M=(c[k>>2]=c[R>>2]|0,c[k+4>>2]=c[R+4>>2]|0,+h[k>>3])*P;I=M+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*O;M=I+(c[k>>2]=c[S>>2]|0,c[k+4>>2]=c[S+4>>2]|0,+h[k>>3])*N;I=M+(c[k>>2]=c[T>>2]|0,c[k+4>>2]=c[T+4>>2]|0,+h[k>>3]);h[k>>3]=I,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;M=(c[k>>2]=c[U>>2]|0,c[k+4>>2]=c[U+4>>2]|0,+h[k>>3])*P;P=M+(c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3])*O;O=P+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*N;N=O+(c[k>>2]=c[W>>2]|0,c[k+4>>2]=c[W+4>>2]|0,+h[k>>3]);h[k>>3]=N,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=hI(28)|0;c[g>>2]=5244656;W=g+4|0;l=c[e>>2]|0;e=l+4|0;O=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=l+12|0;P=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=g+12|0;V=l+20|0;M=(c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3]);V=g+20|0;g=a+8|0;G=-0.0-(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);E=O*G;O=P*G;P=M*G;G=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3])*E;M=G+(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3])*O;G=M+(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3])*P;M=G+(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);h[k>>3]=M,c[W>>2]=c[k>>2]|0,c[W+4>>2]=c[k+4>>2]|0;G=(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3])*E;C=G+(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3])*O;G=C+(c[k>>2]=c[z>>2]|0,c[k+4>>2]=c[z+4>>2]|0,+h[k>>3])*P;C=G+(c[k>>2]=c[B>>2]|0,c[k+4>>2]=c[B+4>>2]|0,+h[k>>3]);h[k>>3]=C,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;G=(c[k>>2]=c[D>>2]|0,c[k+4>>2]=c[D+4>>2]|0,+h[k>>3])*E;E=G+(c[k>>2]=c[F>>2]|0,c[k+4>>2]=c[F+4>>2]|0,+h[k>>3])*O;O=E+(c[k>>2]=c[H>>2]|0,c[k+4>>2]=c[H+4>>2]|0,+h[k>>3])*P;P=O+(c[k>>2]=c[J>>2]|0,c[k+4>>2]=c[J+4>>2]|0,+h[k>>3]);h[k>>3]=P,c[V>>2]=c[k>>2]|0,c[V+4>>2]=c[k+4>>2]|0;O=-0.0-(M*K+C*I+P*N);h[k>>3]=O,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}function cz(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0.0,g=0,i=0.0,j=0,l=0.0,m=0,n=0.0,o=0,p=0.0,q=0,r=0.0,s=0,t=0.0,u=0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=a+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=a+20|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);m=a+28|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);o=b+28|0;p=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);q=b+4|0;r=(c[k>>2]=c[q>>2]|0,c[k+4>>2]=c[q+4>>2]|0,+h[k>>3]);s=b+12|0;t=n*p+f*r+i*(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3]);u=b+20|0;v=t+l*(c[k>>2]=c[u>>2]|0,c[k+4>>2]=c[u+4>>2]|0,+h[k>>3]);if(v<0.0){t=-0.0-p;h[k>>3]=t,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;p=-0.0-(c[k>>2]=c[q>>2]|0,c[k+4>>2]=c[q+4>>2]|0,+h[k>>3]);h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;w=-0.0-(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3]);h[k>>3]=w,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;x=-0.0-(c[k>>2]=c[u>>2]|0,c[k+4>>2]=c[u+4>>2]|0,+h[k>>3]);h[k>>3]=x,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;y=-0.0-v;z=t;A=p;B=w;C=x}else{h[k>>3]=r,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;x=(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3]);h[k>>3]=x,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;w=(c[k>>2]=c[u>>2]|0,c[k+4>>2]=c[u+4>>2]|0,+h[k>>3]);h[k>>3]=w,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;p=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3]);h[k>>3]=p,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;y=v;z=p;A=r;B=x;C=w}if(y>=1.0){h[k>>3]=n,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}w=+T(+y);x=+O(+(1.0-y*y));if(+N(+x)<.001){y=(n+z)*.5;h[k>>3]=y,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;y=(f+A)*.5;h[k>>3]=y,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;y=(i+B)*.5;h[k>>3]=y,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;y=(l+C)*.5;h[k>>3]=y,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}else{y=+R(+((1.0-d)*w))/x;r=+R(+(w*d))/x;x=n*y+z*r;h[k>>3]=x,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;x=f*y+A*r;h[k>>3]=x,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;x=i*y+B*r;h[k>>3]=x,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;x=l*y+C*r;h[k>>3]=x,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}return 0}function cA(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+36|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+68|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+52|0;l=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+84|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);n=e+l+m;if(n>0.0){o=.5/+O(+(n+1.0));n=.25/o;d=a+28|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=o*(0.0-0.0);d=a+4|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=(g-j)*o;d=a+12|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=(i-f)*o;d=a+20|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}if(e>l&e>m){n=+O(+(e+1.0-l-m))*2.0;o=(0.0-0.0)/n;d=a+28|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;o=n*.25;d=a+4|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;o=(f+i)/n;d=a+12|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;o=(g+j)/n;d=a+20|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}if(l<=m){return a|0}o=+O(+(m+1.0-e-l))*2.0;l=(i-f)/o;d=a+28|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=(g+j)/o;d=a+4|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=(0.0+0.0)/o;d=a+12|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=o*.25;d=a+20|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cB(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function cC(a,b,d,e){a=a|0;b=+b;d=+d;e=+e;var f=0;f=a+4|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function cD(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cE(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cF(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cG(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+100|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+108|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+116|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cH(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cI(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0,i=0.0,j=0,l=0,m=0.0,n=0;e=b+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=d+20|0;i=f*(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);l=d+12|0;m=i-f*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+4|0;h[k>>3]=m,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;m=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=d+4|0;f=m*(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);d=b+4|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);i=f-m*(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+12|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);m=i*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);f=m-i*(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=a+20|0;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function cJ(a){a=a|0;var b=0,d=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function cK(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;l=b+100|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;n=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+44|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+76|0;n=m+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;d=b+108|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+52|0;e=m+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+84|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;f=b+116|0;j=g+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cL(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cM(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cN(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cO(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e>g){h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+12|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(g>e){h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e<=g){return a|0}h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cP(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0.0,g=0.0,i=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=g+(f-g)*d;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);f=g+(i-g)*d;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=g+(f-g)*d;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function cQ(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;i=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+(f*f+g*g+i*i)}function cR(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cS(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function cT(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cU(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+20|0;m=g*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=b+12|0;o=m-j*(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+4|0;o=j*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);j=o-e*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;j=e*(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);e=j-g*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cV(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cW(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(d*d+e*e+f*f)}function cX(a,b){a=a|0;b=b|0;var d=0,e=0.0;if((b|0)==2){d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+e}else if((b|0)==1){d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+e}else if((b|0)==0){b=a+4|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+e}else{e=0.0;return+e}return 0.0}function cY(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e<g){h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+12|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(g<e){h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e>=g){return a|0}h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cZ(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function c_(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;do{if(e==(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+12|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){break}f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+20|0;if(g==(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=1}else{break}return i|0}}while(0);i=0;return i|0}function c$(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function c0(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function c1(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function c2(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0,n=0.0,o=0.0,p=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=b+28|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*e;m=b+60|0;o=n+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*g;m=b+92|0;n=o+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*j;m=b+124|0;o=1.0/(n+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]));n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;p=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;n=p+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;l=b+100|0;p=(n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]))*o;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;p=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+44|0;n=p+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+76|0;p=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;d=b+108|0;n=(p+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]))*o;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;n=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+52|0;e=n+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+84|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;f=b+116|0;j=(g+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]))*o;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function c3(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function c4(){var a=0;a=hI(28)|0;c[a>>2]=5244656;hK(a+4|0,0,24);return a|0}function c5(a,b,d){a=+a;b=+b;d=+d;var e=0,f=0,g=0;e=hI(28)|0;f=e;c[e>>2]=5244656;g=e+4|0;h[k>>3]=a,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+12|0;h[k>>3]=b,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+20|0;h[k>>3]=d,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return f|0}function c6(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0;d=a+4|0;if(b!=0.0){e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;f=a+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}else{hK(d|0,0,24);return a|0}return 0}function c7(a){a=a|0;var b=0,d=0.0,e=0.0;b=a+4|0;d=+N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));b=a+12|0;e=d+ +N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));b=a+20|0;return+(e+ +N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])))}function c8(a){a=a|0;var b=0,d=0.0,e=0,f=0.0,g=0,i=0.0,j=0.0,l=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=a+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=+O(+(d*d+f*f+i*i));if(j!=0.0){l=d/j;h[k>>3]=l,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;l=f/j;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;l=i/j;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}else{hK(b|0,0,24);return a|0}return 0}function c9(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;i=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+(+O(+(f*f+g*g+i*i)))}function da(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0,j=0,l=0.0,m=0,n=0.0,o=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;i=a+12|0;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;j=a+20|0;h[k>>3]=g,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;l=+O(+(e*e+f*f+g*g));m=b+36|0;g=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+44|0;f=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+52|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;h[k>>3]=e,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;n=+O(+(g*g+f*f+e*e));m=b+68|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+76|0;f=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+84|0;g=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);o=+O(+(e*e+f*f+g*g));h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;h[k>>3]=o,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function db(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=b+12|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+44|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+76|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=b+20|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+52|0;e=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+84|0;m=e+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;e=+O(+(m*m+g*g+j*j));if(e!=0.0){n=m/e;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=g/e;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=j/e;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}else{hK(d|0,0,24);return a|0}return 0}function dc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0.0;b=hI(28)|0;d=b;c[b>>2]=5244656;e=b+4|0;f=e;c[f>>2]=0;c[f+4>>2]=0;f=a+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return d|0}function dd(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0.0,m=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=+O(+(e*e+g*g+j*j));if(!(l!=0.0&l!=b)){return a|0}m=b/l;l=e*m;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=g*m;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;l=j*m;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function de(a){a=a|0;if((a|0)==0){return}hF(a);return}function df(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(+O(+(d*d+e*e+f*f)))}function dg(a,b){a=a|0;b=b|0;return 1}function dh(a,b,c){a=a|0;b=+b;c=+c;return a|0}function di(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+12|0;n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+20|0;o=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+28|0;p=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);q=p*e+n*j-o*g;r=o*j;s=p*g+n*e-r;t=n*g;g=p*j+t-o*e;j=e*(-0.0-p)-t-r;r=-0.0-m;m=-0.0-o;o=-0.0-n;n=q*p+j*r+s*m-g*o;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=s*p+j*o+g*r-q*m;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=g*p+j*m+q*o-s*r;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function dj(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=f+e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;return+(g+e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]))}function dk(a,b,d){a=a|0;b=b|0;d=+d;var e=0;if((b<<24>>24|0)==122){e=a+20|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}else if((b<<24>>24|0)==121){e=a+12|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}else if((b<<24>>24|0)==120){b=a+4|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}else{return a|0}return 0}function dl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;c[a+4>>2]=b;c[a+8>>2]=d;c[a+12>>2]=e;c[a+16>>2]=f;c[a+20>>2]=g;c[a+24>>2]=h;return a|0}function dm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0.0,o=0.0,p=0.0;d=b+4|0;e=b+12|0;f=b+20|0;b=0;while(1){if((b|0)>=6){g=1;i=307;break}j=c[a+4+(b<<2)>>2]|0;l=c[j+4>>2]|0;m=l+4|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);o=n*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);m=l+12|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);p=o+n*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);m=l+20|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);o=p+n*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);m=j+8|0;if(o+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])<0.0){g=0;i=308;break}else{b=b+1|0}}if((i|0)==307){return g|0}else if((i|0)==308){return g|0}return 0}function dn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0.0;d=c[a+4>>2]|0;e=c[b+4>>2]|0;f=c[d+4>>2]|0;g=c[e+4>>2]|0;i=g+4|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+4|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+12|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+12|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f+20|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=e+8|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+8|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=c[a+8>>2]|0;d=c[b+8>>2]|0;e=c[i+4>>2]|0;f=c[d+4>>2]|0;g=f+4|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+4|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+12|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+20|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+20|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=d+8|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=i+8|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=c[a+12>>2]|0;i=c[b+12>>2]|0;d=c[g+4>>2]|0;e=c[i+4>>2]|0;f=e+4|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=i+8|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=g+8|0;h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+16>>2]|0;g=c[b+16>>2]|0;i=c[f+4>>2]|0;d=c[g+4>>2]|0;e=d+4|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+4|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+12|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+12|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+20|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=i+20|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=g+8|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+8|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=c[a+20>>2]|0;f=c[b+20>>2]|0;g=c[e+4>>2]|0;i=c[f+4>>2]|0;d=i+4|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=g+4|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=i+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=g+12|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=i+20|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=g+20|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=f+8|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=e+8|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=c[a+24>>2]|0;e=c[b+24>>2]|0;b=c[d+4>>2]|0;f=c[e+4>>2]|0;g=f+4|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+4|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+12|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+20|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+20|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+8|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+8|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}function dp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0,p=0.0,q=0.0;d=c[b+4>>2]|0;e=b+8|0;f=-0.0-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;b=d+12|0;g=d+20|0;d=0;while(1){if((d|0)>=6){i=1;j=314;break}l=c[a+4+(d<<2)>>2]|0;m=c[l+4>>2]|0;n=m+4|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=o*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);n=m+12|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);q=p+o*(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);n=m+20|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=q+o*(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);n=l+8|0;if(p+(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3])<f){i=0;j=315;break}else{d=d+1|0}}if((j|0)==315){return i|0}else if((j|0)==314){return i|0}return 0}function dq(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dr(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=e*e;d=a+4|0;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);e=f*f;d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=e*e;d=a+20|0;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function ds(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function dt(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function du(a,b,d,e){a=a|0;b=+b;d=+d;e=+e;var f=0;f=a+4|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function dv(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dw(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dx(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function dy(a){a=a|0;var b=0,d=0.0,e=0,f=0.0,g=0,i=0.0,j=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=a+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=d*d;h[k>>3]=j,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;j=f*f;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;j=i*i;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}function dz(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dA(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dB(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dC(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dD(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dE(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dF(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dG(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dH(a){a=a|0;var b=0;b=a+28|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dI(a,b){a=a|0;b=+b;var d=0;d=a+28|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dJ(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dK(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dL(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dM(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function dN(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function dO(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;e=c[a+4>>2]|0;f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+8>>2]|0;e=d+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+12|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+20|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function dP(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,i=0,j=0.0,l=0,m=0.0;d=c[a+4>>2]|0;e=c[a+8>>2]|0;a=d+4|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+4|0;g=f+(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+4|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;i=d+12|0;f=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=e+12|0;j=f+(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=b+12|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;l=d+20|0;f=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=e+20|0;m=f+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+20|0;f=g*.5;h[k>>3]=f,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;f=j*.5;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;f=m*.5;h[k>>3]=f,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;return b|0}function dQ(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function dR(a){a=a|0;if((a|0)==0){return}hF(a);return}function dS(){var a=0;a=hI(4)|0;c[a>>2]=5244624;return a|0}function dT(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function dU(a){a=a|0;if((a|0)==0){return}hF(a);return}function dV(){var a=0;a=hI(28)|0;b7(a);return a|0}function dW(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=hI(28)|0;c[h>>2]=5244720;c[h+4>>2]=a;c[h+8>>2]=b;c[h+12>>2]=d;c[h+16>>2]=e;c[h+20>>2]=f;c[h+24>>2]=g;return h|0}function dX(a){a=a|0;return ce(a)|0}function dY(a,b){a=a|0;b=b|0;return cd(a,b)|0}function dZ(a){a=a|0;var b=0,d=0.0;b=a+4|0;d=+O(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;d=+O(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;d=+O(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function d_(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function d$(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=~~+M(+(+(b>>>0>>>0)));e=+(((d>>>16&255)>>>0)/255>>>0>>>0>>>0);b=a+4|0;h[k>>3]=e,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;e=+(((d>>>8&255)>>>0)/255>>>0>>>0>>>0);b=a+12|0;h[k>>3]=e,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;e=+(((d&255)>>>0)/255>>>0>>>0>>>0);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function d0(a){a=a|0;if((a|0)==0){return}hF(a);return}function d1(){var a=0;a=hI(28)|0;c[a>>2]=5244816;hK(a+4|0,0,24);return a|0}function d2(a,b,d){a=+a;b=+b;d=+d;var e=0,f=0,g=0;e=hI(28)|0;f=e;c[e>>2]=5244816;g=e+4|0;h[k>>3]=a,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+12|0;h[k>>3]=b,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+20|0;h[k>>3]=d,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return f|0}function d3(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0.0,i=0.0;b=hI(28)|0;d=b;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);c[b>>2]=5244816;e=b+4|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return d|0}function d4(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function d5(a){a=a|0;if((a|0)==0){return}hF(a);return}function d6(){var a=0;a=hI(36)|0;c[a>>2]=5244640;return a|0}function d7(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function d8(){var a=0;a=hI(20)|0;c[a>>2]=5244672;hK(a+4|0,0,16);return a|0}function d9(a,b){a=+a;b=+b;var d=0,e=0,f=0;d=hI(20)|0;e=d;c[d>>2]=5244672;f=d+4|0;h[k>>3]=a,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=d+12|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return e|0}function ea(a){a=a|0;if((a|0)==0){return}hF(a);return}function eb(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function ec(a){a=a|0;if((a|0)==0){return}hF(a);return}function ed(){var a=0;a=hI(4)|0;c[a>>2]=5244880;return a|0}function ee(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function ef(a){a=a|0;var b=0,d=0,e=0.0,f=0.0,g=0.0,i=0.0;b=c[a+4>>2]|0;d=c[a+8>>2]|0;a=b+4|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+4|0;f=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+12|0;g=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+20|0;i=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);return+(+O(+(f*f+g*g+i*i)))}function eg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0.0,j=0,l=0.0,m=0.0,n=0,o=0.0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=c[a+4>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=d+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=d+20|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);d=b+4|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;n=b+36|0;o=m+(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3])*i;p=b+68|0;m=o+(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3])*l;q=b+100|0;o=m+(c[k>>2]=c[q>>2]|0,c[k+4>>2]=c[q+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*f;r=b+44|0;m=o+(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3])*i;s=b+76|0;o=m+(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3])*l;t=b+108|0;m=o+(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);h[k>>3]=m,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+20|0;m=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])*f;u=b+52|0;f=m+(c[k>>2]=c[u>>2]|0,c[k+4>>2]=c[u+4>>2]|0,+h[k>>3])*i;v=b+84|0;i=f+(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3])*l;w=b+116|0;l=i+(c[k>>2]=c[w>>2]|0,c[k+4>>2]=c[w+4>>2]|0,+h[k>>3]);h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=c[a+8>>2]|0;b=j+4|0;l=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);x=j+12|0;i=(c[k>>2]=c[x>>2]|0,c[k+4>>2]=c[x+4>>2]|0,+h[k>>3]);y=j+20|0;f=(c[k>>2]=c[y>>2]|0,c[k+4>>2]=c[y+4>>2]|0,+h[k>>3]);m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*l;o=m+(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3])*i;m=o+(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3])*f;o=m+(c[k>>2]=c[q>>2]|0,c[k+4>>2]=c[q+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*l;m=o+(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3])*i;o=m+(c[k>>2]=c[s>>2]|0,c[k+4>>2]=c[s+4>>2]|0,+h[k>>3])*f;m=o+(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);h[k>>3]=m,c[x>>2]=c[k>>2]|0,c[x+4>>2]=c[k+4>>2]|0;m=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])*l;l=m+(c[k>>2]=c[u>>2]|0,c[k+4>>2]=c[u+4>>2]|0,+h[k>>3])*i;i=l+(c[k>>2]=c[v>>2]|0,c[k+4>>2]=c[v+4>>2]|0,+h[k>>3])*f;f=i+(c[k>>2]=c[w>>2]|0,c[k+4>>2]=c[w+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[y>>2]=c[k>>2]|0,c[y+4>>2]=c[k+4>>2]|0;return a|0}function eh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0,j=0.0;d=c[b+4>>2]|0;e=c[a+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=c[b+8>>2]|0;b=c[a+8>>2]|0;a=b+4|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=f+4|0;do{if(g==(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){d=b+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+12|0;if(j!=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){break}d=b+20|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+20|0;if(j==(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){i=1}else{break}return i|0}}while(0);i=0;return i|0}function ei(a){a=a|0;return c[a+8>>2]|0}function ej(a){a=a|0;return c[a+4>>2]|0}function ek(a,b){a=a|0;b=b|0;c[a+8>>2]=b;return}function el(a,b){a=a|0;b=b|0;c[a+4>>2]=b;return}function em(a,b,d){a=a|0;b=+b;d=d|0;var e=0,f=0,g=0,i=0.0,j=0.0,l=0,m=0.0,n=0,o=0.0;e=c[a+8>>2]|0;f=a+4|0;a=c[f>>2]|0;g=e+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+4|0;j=i-(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+4|0;h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;l=e+12|0;i=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=a+12|0;m=i-(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=d+12|0;h[k>>3]=m,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;n=e+20|0;i=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=a+20|0;o=i-(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=d+20|0;i=j*b;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;j=m*b;h[k>>3]=j,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;m=o*b;h[k>>3]=m,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;a=c[f>>2]|0;f=a+4|0;b=i+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);h[k>>3]=b,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+12|0;b=j+(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);h[k>>3]=b,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=a+20|0;b=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=b,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return d|0}function en(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0;d=c[a+8>>2]|0;e=c[a+4>>2]|0;a=d+4|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+4|0;g=f-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+4|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+12|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+12|0;f=g-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;h[k>>3]=f,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+20|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+20|0;g=f-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return b|0}function eo(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0;d=c[a+4>>2]|0;e=c[b+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+8>>2]|0;d=c[b+8>>2]|0;b=d+4|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+4|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=d+12|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+12|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=d+20|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+20|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function ep(a){a=a|0;var b=0,d=0,e=0.0,f=0.0,g=0.0,i=0.0;b=c[a+4>>2]|0;d=c[a+8>>2]|0;a=b+4|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+4|0;f=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+12|0;g=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+20|0;i=e-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);return+(f*f+g*g+i*i)}function eq(a){a=a|0;return c[a+4>>2]|0}function er(a){a=a|0;return c[a+4>>2]|0}function es(a,b){a=a|0;b=+b;var d=0;d=a+8|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function et(a){a=a|0;var b=0;b=a+8|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function eu(a,b){a=a|0;b=b|0;c[a+4>>2]=b;return}function ev(a,b,d,e,f){a=a|0;b=+b;d=+d;e=+e;f=+f;var g=0;g=a+4|0;h[k>>3]=b,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+12|0;h[k>>3]=d,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+20|0;h[k>>3]=e,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+28|0;h[k>>3]=f,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}function ew(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function ex(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function ey(a){a=a|0;var b=0;b=a+28|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function ez(a){a=a|0;var b=0,d=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function eA(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function eB(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function eC(a,b){a=a|0;b=+b;var d=0;d=a+28|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function eD(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+20|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+28|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;m=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;n=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+28|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);p=f*o+j*l+g*n-i*m;e=a+4|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=g*o+j*m+i*l-f*n;e=a+12|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=i*o+j*n+f*m-g*l;e=a+20|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=j*o-f*l-g*m-i*n;e=a+28|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function eE(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function eF(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,g=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+28|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(d*d+e*e+f*f+g*g)}function eG(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function eH(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;if(e!=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){f=0;return f|0}d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;if(e!=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){f=0;return f|0}d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;if(e!=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){f=0;return f|0}d=b+28|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+28|0;f=e==(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return f|0}function eI(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,i=0,j=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0;e=hI(28)|0;c[e>>2]=5244656;f=e+4|0;g=f;i=f;c[i>>2]=0;c[i+4>>2]=0;i=hI(28)|0;c[i>>2]=5244656;f=i+4|0;j=f;l=f;c[l>>2]=0;c[l+4>>2]=0;l=c[a+4>>2]|0;f=b+4|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=l+4|0;n=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);o=m-n;h[k>>3]=o,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+12|0;m=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=l+12|0;p=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);q=m-p;g=e+12|0;h[k>>3]=q,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+20|0;m=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=l+20|0;r=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);s=m-r;g=e+20|0;h[k>>3]=s,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=c[a+8>>2]|0;a=g+4|0;m=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-n;h[k>>3]=m,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=g+12|0;n=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])-p;j=i+12|0;h[k>>3]=n,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=g+20|0;p=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])-r;j=i+20|0;h[k>>3]=p,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;r=(m*o+n*q+p*s)/(m*m+n*n+p*p);if(!d){t=r;return+t}if(r<0.0){t=0.0;return+t}t=r>1.0?1.0:r;return+t}function eJ(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0.0;b=hI(12)|0;d=b;c[b>>2]=5244800;e=hI(28)|0;c[e>>2]=5244656;hK(e+4|0,0,24);f=b+4|0;c[f>>2]=e;e=hI(28)|0;c[e>>2]=5244656;hK(e+4|0,0,24);g=b+8|0;c[g>>2]=e;e=c[f>>2]|0;f=c[a+4>>2]|0;b=f+4|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=e+4|0;h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=f+12|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=e+12|0;h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=f+20|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=e+20|0;h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[g>>2]|0;g=c[a+8>>2]|0;a=g+4|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+4|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=g+12|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=g+20|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return d|0}function eK(){var a=0,b=0;a=hI(12)|0;c[a>>2]=5244800;b=hI(28)|0;c[b>>2]=5244656;hK(b+4|0,0,24);c[a+4>>2]=b;b=hI(28)|0;c[b>>2]=5244656;hK(b+4|0,0,24);c[a+8>>2]=b;return a|0}function eL(a,b){a=a|0;b=b|0;var d=0;d=hI(12)|0;c[d>>2]=5244800;c[d+4>>2]=a;c[d+8>>2]=b;return d|0}function eM(a){a=a|0;if((a|0)==0){return}hF(a);return}function eN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cf(a,b,c,d)|0}function eO(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function eP(a){a=a|0;if((a|0)==0){return}hF(a);return}function eQ(){var a=0;a=hI(4)|0;c[a>>2]=5244736;return a|0}function eR(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function eS(a){a=a|0;if((a|0)==0){return}hF(a);return}function eT(){var a=0;a=hI(4)|0;c[a>>2]=5244752;return a|0}function eU(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function eV(a){a=a|0;if((a|0)==0){return}hF(a);return}function eW(){var a=0;a=hI(16)|0;c[a>>2]=5244768;return a|0}function eX(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function eY(a,b,d){a=a|0;b=b|0;d=+d;var e=0.0,f=0,g=0.0;e=d*.5;d=+R(+e);f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*d;f=a+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*d;f=a+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*d;f=a+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;g=+Q(+e);f=a+28|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function eZ(a){a=a|0;var b=0,d=0.0,e=0,f=0.0,g=0,i=0.0,j=0,l=0.0,m=0.0,n=0.0,o=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=a+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=a+28|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);m=+O(+(d*d+f*f+i*i+l*l));if(m==0.0){hK(b|0,0,24);n=1.0;h[k>>3]=n,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}else{o=1.0/m;m=d*o;h[k>>3]=m,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;m=f*o;h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;m=i*o;h[k>>3]=m,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;n=l*o;h[k>>3]=n,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}return 0}function e_(a,b,c){a=a|0;b=b|0;c=+c;return cz(a,b,c)|0}function e$(a){a=a|0;var b=0,d=0.0,e=0,f=0.0,g=0,i=0.0,j=0,l=0.0,m=0.0,n=0.0,o=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;g=a+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;j=a+28|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);m=+O(+(d*d+f*f+i*i+l*l));if(m==0.0){hK(b|0,0,24);n=1.0;h[k>>3]=n,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}else{o=1.0/m;m=d*o;h[k>>3]=m,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;m=f*o;h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;m=i*o;h[k>>3]=m,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;n=l*o;h[k>>3]=n,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}return 0}function e0(){var a=0,b=0,d=0;a=hI(36)|0;b=a;c[a>>2]=5244896;d=a+28|0;hK(a+4|0,0,24);h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return b|0}function e1(a,b,d,e){a=+a;b=+b;d=+d;e=+e;var f=0,g=0,i=0;f=hI(36)|0;g=f;c[f>>2]=5244896;i=f+4|0;h[k>>3]=a,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=f+12|0;h[k>>3]=b,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=f+20|0;h[k>>3]=d,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=f+28|0;h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return g|0}function e2(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0.0,i=0.0,j=0.0;b=hI(36)|0;d=b;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+28|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);c[b>>2]=5244896;e=b+4|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+28|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return d|0}function e3(a,b,c){a=a|0;b=b|0;c=+c;return a|0}function e4(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+28|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+28|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function e5(a,b){a=a|0;b=b|0;c[a+4>>2]=b;return}function e6(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,i=0.0,j=0.0,l=0.0,m=0.0;e=b+4|0;f=b+12|0;g=b+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+4|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);l=j*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);m=l+j*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;j=-0.0-(m+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*i);f=a+8|0;h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function e7(a){a=a|0;var b=0,d=0.0,e=0;b=a+8|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[a+4>>2]|0;e=b+4|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function e8(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,i=0.0;d=c[a+4>>2]|0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;i=g+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=i+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+8|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])-g;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function e9(a){a=a|0;return c[a+4>>2]|0}function fa(a){a=a|0;var b=0;b=a+8|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function fb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0;d=c[b+4>>2]|0;e=c[a+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=b+8|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+8|0;i=g==(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);return i|0}function fc(a,b,d,e,f){a=a|0;b=+b;d=+d;e=+e;f=+f;var g=0,i=0;g=c[a+4>>2]|0;i=g+4|0;h[k>>3]=b,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+12|0;h[k>>3]=d,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=g+20|0;h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=a+8|0;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function fd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0;d=c[a+4>>2]|0;e=c[b+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+8|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+8|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function fe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0;d=c[b+4>>2]|0;e=c[a+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;i=g*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+12|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;l=i+j*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+20|0;i=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;m=l+i*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+8|0;l=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);n=m+l;f=c[b+8>>2]|0;b=f+4|0;m=g*(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+12|0;g=m+j*(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+20|0;j=g+i*(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])+l;if(n<0.0&j>0.0){o=1;return o|0}if(j>=0.0){o=0;return o|0}o=n>0.0;return o|0}function ff(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,i=0.0;d=c[b+4>>2]|0;b=c[a+4>>2]|0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;i=g+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=i+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+8|0;return+(g+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]))}function fg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,i=0.0;d=c[a+4>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+4|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+12|0;i=g+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+20|0;g=i+f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+8|0;return+(g+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]))}function fh(a,b){a=a|0;b=+b;var d=0;d=a+8|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function fi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;e=c[a+4>>2]|0;f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+8>>2]|0;e=d+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+12|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+20|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=f+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function fj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0.0,j=0;d=c[a+4>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f>i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}e=d+12|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);j=b+12|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);if(i>f){h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}e=d+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);d=b+20|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);if(f>i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}e=c[a+8>>2]|0;b=e+4|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);f=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(i<f){h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0}b=e+12|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);i=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);if(f<i){h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0}b=e+20|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);if(i>=f){return a|0}h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function fk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0,i=0.0,j=0,l=0.0,m=0,n=0.0,o=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+12|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;j=b+20|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=d+20|0;h[k>>3]=l,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;b=c[a+4>>2]|0;m=c[a+8>>2]|0;a=b+4|0;n=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);do{if(f<n){h[k>>3]=n,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}else{a=m+4|0;o=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);if(f<=o){break}h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}}while(0);e=b+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);do{if(i<f){h[k>>3]=f,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0}else{e=m+12|0;n=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);if(i<=n){break}h[k>>3]=n,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0}}while(0);g=b+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(l<i){h[k>>3]=i,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return d|0}g=m+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(l<=i){return d|0}h[k>>3]=i,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return d|0}function fl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0;d=c[b+8>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=c[a+4>>2]|0;g=e+4|0;if(f<(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])){i=0;return i|0}g=c[b+4>>2]|0;b=g+4|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=c[a+8>>2]|0;a=b+4|0;if(f>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){i=0;return i|0}a=d+12|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+12|0;if(f<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){i=0;return i|0}a=g+12|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;if(f>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){i=0;return i|0}a=d+20|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+20|0;if(f<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){i=0;return i|0}a=g+20|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;if(f>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){i=0;return i|0}i=1;return i|0}function fm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0;d=c[a+8>>2]|0;e=c[a+4>>2]|0;a=d+4|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+4|0;g=f-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+4|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+12|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+12|0;f=g-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+12|0;h[k>>3]=f,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+20|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+20|0;g=f-(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+20|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return b|0}function fn(a){a=a|0;return c[a+8>>2]|0}function fo(a,b){a=a|0;b=+b;var d=0,e=0,f=0.0;d=c[a+4>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])-b;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])-b;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=d+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])-b;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=c[a+8>>2]|0;d=e+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=e+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=e+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function fp(a){a=a|0;if((a|0)==0){return}hF(a);return}function fq(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,g=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+28|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(+O(+(d*d+e*e+f*f+g*g)))}function fr(a,b){a=a|0;b=b|0;return cA(a,b)|0}function fs(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function ft(a,b){a=a|0;b=b|0;return cy(a,b)|0}function fu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0.0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=c[d>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+4|0;i=g*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+12|0;j=i+g*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+20|0;i=j+g*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+8|0;g=i+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=hI(28)|0;a=f;c[f>>2]=5244656;b=f+4|0;e=c[d>>2]|0;d=e+4|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=e+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+12|0;l=e+20|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=f+20|0;n=i*g;h[k>>3]=n,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;n=j*g;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=m*g;h[k>>3]=n,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;return a|0}function fv(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0.0,j=0.0,l=0,m=0.0,n=0.0,o=0.0;b=hI(28)|0;d=b;c[b>>2]=5244656;e=b+4|0;f=c[a+4>>2]|0;g=f+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=f+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+12|0;l=f+20|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+20|0;b=a+8|0;n=-0.0-(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);o=i*n;h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;o=j*n;h[k>>3]=o,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;o=m*n;h[k>>3]=o,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;return d|0}function fw(a){a=a|0;var b=0,d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0.0,m=0.0;b=c[a+4>>2]|0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=b+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=1.0/+O(+(e*e+g*g+j*j));m=e*l;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=g*l;h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;m=j*l;h[k>>3]=m,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=a+8|0;m=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3])*l;h[k>>3]=m,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function fx(a,b){a=a|0;b=b|0;return cx(a,b)|0}function fy(){var a=0,b=0,d=0;a=hI(16)|0;c[a>>2]=5244784;b=hI(28)|0;d=a;c[b>>2]=5244656;hK(b+4|0,0,24);c[a+4>>2]=b;b=a+8|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return d|0}function fz(a,b){a=a|0;b=+b;var d=0,e=0;d=hI(16)|0;e=d;c[d>>2]=5244784;c[d+4>>2]=a;a=d+8|0;h[k>>3]=b,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return e|0}function fA(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0.0,j=0,l=0.0,m=0,n=0,o=0,p=0.0,q=0.0;d=a+4|0;e=c[d>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+4|0;i=g*(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);j=e+12|0;g=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=b+12|0;l=i+g*(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);m=e+20|0;g=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+20|0;i=l+g*(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);b=a+8|0;g=i+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=hI(28)|0;a=b;c[b>>2]=5244656;e=b+4|0;n=c[d>>2]|0;d=n+4|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=n+12|0;l=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;o=n+20|0;n=b+20|0;p=(c[k>>2]=c[o>>2]|0,c[k+4>>2]=c[o+4>>2]|0,+h[k>>3])*g;q=i*g-(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=l*g-(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);g=p-(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);p=q*-1.0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;p=i*-1.0;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;p=g*-1.0;h[k>>3]=p,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}function fB(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0,j=0.0;b=hI(16)|0;c[b>>2]=5244784;d=hI(28)|0;e=b;c[d>>2]=5244656;f=d+4|0;hK(f|0,0,24);c[b+4>>2]=d;g=b+8|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;b=c[a+4>>2]|0;i=b+4|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=f;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=b+12|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+12|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=b+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=d+20|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;i=a+8|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return e|0}function fC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cw(a,b,c,d)|0}function fD(a){a=a|0;if((a|0)==0){return}hF(a);return}function fE(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function fF(a,b){a=a|0;b=b|0;return b8(a,b)|0}function fG(a,b){a=a|0;b=b|0;return b5(a,b)|0}function fH(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0,j=0.0,l=0.0,m=0.0,n=0.0;d=hI(28)|0;e=d;f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=c[a+4>>2]|0;i=f+4|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=c[a+8>>2]|0;a=i+4|0;l=(g-j)/((c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-j);a=b+12|0;j=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=f+12|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=i+12|0;m=(j-g)/((c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-g);a=b+20|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=f+20|0;j=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=i+20|0;n=(g-j)/((c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])-j);c[d>>2]=5244656;a=d+4|0;h[k>>3]=l,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+12|0;h[k>>3]=m,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=d+20|0;h[k>>3]=n,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return e|0}function fI(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0,j=0.0;d=c[a+4>>2]|0;e=c[b+4>>2]|0;f=d+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=e+4|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);if(g<j){h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0}f=d+12|0;j=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=e+12|0;g=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);if(j<g){h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0}f=d+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);d=e+20|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);if(g<j){h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0}f=c[a+8>>2]|0;d=c[b+8>>2]|0;b=f+4|0;j=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=d+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);if(j>g){h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0}b=f+12|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=d+12|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);if(g>j){h[k>>3]=j,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0}b=f+20|0;j=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);f=d+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(j<=g){return a|0}h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function fJ(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0,j=0,l=0.0,m=0,n=0;d=c[a+4>>2]|0;e=d+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=c[b+4>>2]|0;g=e+4|0;do{if(f<=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])){i=c[b+8>>2]|0;j=i+4|0;l=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=c[a+8>>2]|0;m=j+4|0;if(l>(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])){break}m=d+12|0;l=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=e+12|0;if(l>(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])){break}m=i+12|0;l=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=j+12|0;if(l>(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])){break}m=d+20|0;l=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=e+20|0;if(l>(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])){break}m=i+20|0;l=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=j+20|0;if(l>(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])){break}else{n=1}return n|0}}while(0);n=0;return n|0}function fK(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0.0,j=0;d=c[a+4>>2]|0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=d+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])+f;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=d+12|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])+i;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);b=d+20|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])+f;h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[a+8>>2]|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])+i;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;f=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])+f;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;i=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])+i;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function fL(a){a=a|0;var b=0,d=0,e=0.0,f=0;b=c[a+8>>2]|0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=c[a+4>>2]|0;a=d+4|0;if(e<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){f=1;return f|0}a=b+12|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+12|0;if(e<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){f=1;return f|0}a=b+20|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+20|0;f=e<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);return f|0}function fM(a,b){a=a|0;b=b|0;c[a+4>>2]=b;return}function fN(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,i=0,j=0.0;d=c[b+4>>2]|0;e=c[a+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=0;return i|0}f=c[b+8>>2]|0;b=c[a+8>>2]|0;a=b+4|0;g=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=f+4|0;do{if(g==(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){d=b+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+12|0;if(j!=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){break}d=b+20|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=f+20|0;if(j==(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){i=1}else{break}return i|0}}while(0);i=0;return i|0}function fO(a){a=a|0;return c[a+4>>2]|0}function fP(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0,i=0.0,j=0;d=c[a+4>>2]|0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=d+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])-f;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=d+12|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])-i;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);b=d+20|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])-f;h[k>>3]=i,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[a+8>>2]|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3])+i;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;f=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3])+f;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;i=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3])+i;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function fQ(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0;d=c[a+4>>2]|0;e=c[b+4>>2]|0;f=e+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+4|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=c[a+8>>2]|0;d=c[b+8>>2]|0;b=d+4|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+4|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=d+12|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+12|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=d+20|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=f+20|0;h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function fR(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,i=0,j=0.0,l=0,m=0.0;d=c[a+8>>2]|0;e=c[a+4>>2]|0;a=d+4|0;f=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=e+4|0;g=f+(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=b+4|0;h[k>>3]=g,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;i=d+12|0;f=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=e+12|0;j=f+(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);i=b+12|0;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;l=d+20|0;f=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=e+20|0;m=f+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+20|0;f=g*.5;h[k>>3]=f,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;f=j*.5;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;f=m*.5;h[k>>3]=f,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;return b|0}function fS(a,b){a=a|0;b=b|0;c[a+8>>2]=b;return}function fT(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=c[a+4>>2]|0;f=d+4|0;if(e<(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){g=0;return g|0}f=c[a+8>>2]|0;a=f+4|0;if(e>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){g=0;return g|0}a=b+12|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+12|0;if(e<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){g=0;return g|0}a=f+12|0;if(e>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){g=0;return g|0}a=b+20|0;e=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=d+20|0;if(e<(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){g=0;return g|0}a=f+20|0;if(e>(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3])){g=0;return g|0}g=1;return g|0}function fU(a,b,d,e,f,g,i,j,l,m,n,o,p,q,r,s,t){a=a|0;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;j=+j;l=+l;m=+m;n=+n;o=+o;p=+p;q=+q;r=+r;s=+s;t=+t;var u=0;u=a+4|0;h[k>>3]=b,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+36|0;h[k>>3]=d,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+68|0;h[k>>3]=e,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+100|0;h[k>>3]=f,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+12|0;h[k>>3]=g,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+44|0;h[k>>3]=i,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+76|0;h[k>>3]=j,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+108|0;h[k>>3]=l,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+20|0;h[k>>3]=m,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+52|0;h[k>>3]=n,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+84|0;h[k>>3]=o,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+116|0;h[k>>3]=p,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+28|0;h[k>>3]=q,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+60|0;h[k>>3]=r,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+92|0;h[k>>3]=s,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;u=a+124|0;h[k>>3]=t,c[u>>2]=c[k>>2]|0,c[u+4>>2]=c[k+4>>2]|0;return a|0}function fV(a,b,d,e){a=a|0;b=+b;d=+d;e=+e;var f=0;f=a+4|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+36|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+68|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+100|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+44|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+76|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+108|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+52|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+84|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+116|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+28|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+60|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+92|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+124|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function fW(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0.0;b=hI(12)|0;d=b;b4(d);e=c[b+4>>2]|0;f=c[a+4>>2]|0;g=f+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+4|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+12|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=f+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+20|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=c[b+8>>2]|0;b=c[a+8>>2]|0;a=b+4|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=g+4|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=b+12|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=g+12|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=b+20|0;i=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);a=g+20|0;h[k>>3]=i,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;return d|0}function fX(a){a=a|0;var b=0.0,d=0,e=0;b=+aV();d=a+4|0;e=(c[d>>2]|0)+20|0;h[k>>3]=b,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=(c[d>>2]|0)+12|0;h[k>>3]=b,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=(c[d>>2]|0)+4|0;h[k>>3]=b,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;b=-0.0- +aV();e=a+8|0;d=(c[e>>2]|0)+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=(c[e>>2]|0)+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=(c[e>>2]|0)+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function fY(a){a=a|0;if((a|0)==0){return}hF(a);return}function fZ(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0,p=0.0,q=0.0,r=0,s=0.0;d=hI(28)|0;c[d>>2]=5244656;e=d+4|0;f=e;g=e;c[g>>2]=0;c[g+4>>2]=0;g=hI(28)|0;e=g;c[g>>2]=5244656;i=g+4|0;j=i;hK(i|0,0,24);i=a+8|0;l=c[i>>2]|0;m=a+4|0;a=c[m>>2]|0;n=l+4|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=a+4|0;p=o+(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);h[k>>3]=p,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;n=l+12|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=a+12|0;q=o+(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);n=g+12|0;h[k>>3]=q,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;r=l+20|0;o=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);r=a+20|0;s=o+(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);r=g+20|0;o=p*.5;h[k>>3]=o,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;o=q*.5;h[k>>3]=o,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;o=s*.5;h[k>>3]=o,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;c[b+4>>2]=e;e=c[i>>2]|0;i=c[m>>2]|0;m=e+4|0;o=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=i+4|0;s=o-(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);h[k>>3]=s,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+12|0;o=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=i+12|0;q=o-(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+12|0;h[k>>3]=q,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=e+20|0;o=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=i+20|0;p=o-(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=d+20|0;h[k>>3]=p,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;o=+O(+(s*s+q*q+p*p))*.5;f=b+8|0;h[k>>3]=o,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return b|0}function f_(){var a=0;a=hI(12)|0;b4(a);return a|0}function f$(a,b){a=a|0;b=b|0;var d=0;d=hI(12)|0;c[d>>2]=5244832;c[d+4>>2]=a;c[d+8>>2]=b;return d|0}function f0(a,b){a=a|0;b=b|0;return+(+b6(a,b))}function f1(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,i=0.0,j=0.0,l=0,m=0.0,n=0.0,o=0.0,p=0,q=0.0,r=0.0;e=hI(28)|0;c[e>>2]=5244656;f=e+4|0;g=d+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=d+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=e+12|0;l=d+20|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=e+20|0;n=i*.5;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;i=j*.5;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;j=m*.5;h[k>>3]=j,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;l=c[a+4>>2]|0;g=b+4|0;m=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);f=l+4|0;h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;e=b+12|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);d=l+12|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;p=b+20|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);b=l+20|0;r=m-n;h[k>>3]=r,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;r=o-i;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;r=q-j;h[k>>3]=r,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=c[a+8>>2]|0;r=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+4|0;h[k>>3]=r,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;q=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=b+12|0;h[k>>3]=q,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;o=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);p=b+20|0;m=r+n;h[k>>3]=m,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;m=q+i;h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;m=o+j;h[k>>3]=m,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;return a|0}function f2(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0;b=hI(132)|0;d=b;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+36|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+68|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+100|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+44|0;m=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+76|0;n=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+108|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;p=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+52|0;q=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+84|0;r=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+116|0;s=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+28|0;t=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+60|0;u=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+92|0;v=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+124|0;w=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);c[b>>2]=5244688;e=b+4|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+36|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+68|0;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+100|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+44|0;h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+76|0;h[k>>3]=n,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+108|0;h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+52|0;h[k>>3]=q,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+84|0;h[k>>3]=r,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+116|0;h[k>>3]=s,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+28|0;h[k>>3]=t,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+60|0;h[k>>3]=u,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+92|0;h[k>>3]=v,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+124|0;h[k>>3]=w,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return d|0}function f3(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function f4(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,P=0.0;e=hI(28)|0;c[e>>2]=5244656;f=e+4|0;g=b+4|0;b=g|0;i=g+4|0;j=g+8|0;l=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+12|0;m=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+16|0;n=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+20|0;o=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+24|0;p=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+28|0;p=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+32|0;p=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+36|0;q=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+40|0;r=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+44|0;s=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+48|0;t=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+52|0;u=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+56|0;v=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+60|0;v=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+64|0;v=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+68|0;w=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+72|0;x=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+76|0;y=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+80|0;z=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+84|0;A=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+88|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+92|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+96|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+100|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+104|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+108|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+112|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+116|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+120|0;B=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=g+124|0;g=d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0;j=d[i]|d[i+1|0]<<8|d[i+2|0]<<16|d[i+3|0]<<24|0;C=(c[k>>2]=d[b]|d[b+1|0]<<8|d[b+2|0]<<16|d[b+3|0]<<24|0,c[k+4>>2]=j,+h[k>>3]);D=(c[k>>2]=l,c[k+4>>2]=m,+h[k>>3]);E=(c[k>>2]=n,c[k+4>>2]=o,+h[k>>3]);o=e+12|0;n=e+20|0;F=1.0/+O(+(C*C+D*D+E*E));G=(c[k>>2]=p,c[k+4>>2]=q,+h[k>>3]);H=(c[k>>2]=r,c[k+4>>2]=s,+h[k>>3]);I=(c[k>>2]=t,c[k+4>>2]=u,+h[k>>3]);J=1.0/+O(+(G*G+H*H+I*I));K=(c[k>>2]=v,c[k+4>>2]=w,+h[k>>3]);L=(c[k>>2]=x,c[k+4>>2]=y,+h[k>>3]);M=(c[k>>2]=z,c[k+4>>2]=A,+h[k>>3]);h[k>>3]=K,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;h[k>>3]=L,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;h[k>>3]=M,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;N=1.0/+O(+(K*K+L*L+M*M));P=C*F;n=a+4|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=D*F;n=a+12|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=E*F;n=a+20|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=G*J;n=a+36|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=H*J;n=a+44|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=I*J;n=a+52|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=K*N;n=a+68|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=L*N;n=a+76|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;P=M*N;n=a+84|0;h[k>>3]=P,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}function f5(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cg(a,b,c,d)|0}function f6(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return a|0}function f7(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+68|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+76|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+52|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+84|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+60|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+92|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function f8(a,b,d,e){a=a|0;b=+b;d=+d;e=+e;var f=0;f=a+4|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+36|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+68|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+100|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+44|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+76|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+108|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+52|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+84|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+116|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+28|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+60|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+92|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+124|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function f9(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+28|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);j=e+e;l=f+f;m=g+g;n=e*j;o=e*l;p=e*m;e=f*l;q=f*m;f=g*m;g=i*j;j=i*l;l=i*m;m=1.0-(e+f);d=a+4|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=o-l;d=a+36|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=p+j;d=a+68|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=o+l;d=a+12|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=1.0-(n+f);d=a+44|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=q-g;d=a+76|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=p-j;d=a+20|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=q+g;d=a+52|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;m=1.0-(n+e);d=a+84|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function ga(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=a+36|0;j=i+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;d=a+68|0;i=j+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=a+100|0;j=i+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=a+44|0;i=j+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;d=a+76|0;j=i+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=a+108|0;i=j+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=a+52|0;j=i+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;d=a+84|0;i=j+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=a+116|0;j=i+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=a+60|0;e=j+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;d=a+92|0;f=e+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=a+124|0;g=f+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function gb(a,b,d,e,f,g,i){a=a|0;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;var j=0.0,l=0.0,m=0.0,n=0.0,o=0;j=d-b;l=e-f;m=i-g;n=(d+b)/j;b=(e+f)/l;f=(i+g)/m;g=2.0/j;o=a+4|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+36|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+68|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;g=-0.0-n;o=a+100|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+12|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;g=2.0/l;o=a+44|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+76|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;g=-0.0-b;o=a+108|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+20|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+52|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;g=-2.0/m;o=a+84|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;g=-0.0-f;o=a+116|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+28|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+60|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+92|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+124|0;h[k>>3]=1.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;return a|0}function gc(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+36|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+68|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+100|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+44|0;j=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+76|0;l=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+108|0;m=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;n=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+52|0;o=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+84|0;p=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+116|0;q=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+28|0;r=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+60|0;s=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+92|0;t=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+124|0;u=g*l;v=f*m;w=g*j;x=e*m;y=e*l;z=d*l;l=d*m;m=g*i;g=f*i;A=d*j;d=e*i;return+(r*(u*o-v*o-w*p+x*p+f*j*q-y*q)+s*(z*q-l*p+m*p-g*q+v*n-u*n)+t*(l*o-A*q-m*o+d*q+w*n-x*n)+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*(j*(-0.0-f)*n-z*o+A*p+g*o-d*p+y*n))}function gd(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+68|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+100|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+76|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+108|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+52|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+84|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+116|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+60|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+92|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+124|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function ge(a){a=a|0;var b=0,d=0.0,e=0,f=0.0;b=a+12|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+36|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=a+20|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);b=a+68|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+52|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+76|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=a+28|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);b=a+100|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+60|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+108|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=a+92|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);b=a+116|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function gf(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+100|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+100|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+108|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+108|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+116|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+116|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function gg(a,b,d,e,f,g,i){a=a|0;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;var j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0;j=g*2.0;l=d-b;m=j/l;n=f-e;o=j/n;j=(d+b)/l;l=(f+e)/n;n=i-g;e=(-0.0-(i+g))/n;f=i*-2.0*g/n;p=a+4|0;h[k>>3]=m,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+36|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+68|0;h[k>>3]=j,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+100|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+12|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+44|0;h[k>>3]=o,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+76|0;h[k>>3]=l,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+108|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+20|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+52|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+84|0;h[k>>3]=e,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+116|0;h[k>>3]=f,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+28|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+60|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+92|0;h[k>>3]=-1.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;p=a+124|0;h[k>>3]=0.0,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;return a|0}function gh(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+100|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+108|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+116|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function gi(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+36|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+68|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+100|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+44|0;l=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+76|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+108|0;n=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;o=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+52|0;p=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+84|0;q=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+116|0;r=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+28|0;s=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+60|0;t=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+92|0;u=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+124|0;v=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+68|0;h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+100|0;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+76|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+108|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+52|0;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+84|0;h[k>>3]=q,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+116|0;h[k>>3]=r,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;h[k>>3]=s,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+60|0;h[k>>3]=t,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+92|0;h[k>>3]=u,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+124|0;h[k>>3]=v,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function gj(a,b,c){a=a|0;b=b|0;c=+c;return ck(a,b,c)|0}function gk(a){a=a|0;return ch(a)|0}function gl(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0.0,w=0.0;d=a+36|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+44|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+52|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=a+60|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+68|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+76|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=a+84|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=a+92|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=+Q(+b);w=+R(+b);b=v*e+w*o;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;b=v*g+w*q;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;b=v*j+w*s;h[k>>3]=b,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;b=v*m+w*u;h[k>>3]=b,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;b=v*o-w*e;h[k>>3]=b,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;b=v*q-w*g;h[k>>3]=b,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;b=v*s-w*j;h[k>>3]=b,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;b=v*u-w*m;h[k>>3]=b,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;return a|0}function gm(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0.0,w=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=a+28|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+68|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+76|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=a+84|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=a+92|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=+Q(+b);w=+R(+b);b=v*e-w*o;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;b=v*g-w*q;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;b=v*j-w*s;h[k>>3]=b,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;b=v*m-w*u;h[k>>3]=b,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;b=v*o+w*e;h[k>>3]=b,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;b=v*q+w*g;h[k>>3]=b,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;b=v*s+w*j;h[k>>3]=b,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;b=v*u+w*m;h[k>>3]=b,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;return a|0}function gn(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0,p=0,q=0.0,r=0,s=0.0,t=0,u=0.0,v=0.0,w=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=a+28|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+36|0;o=(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);p=a+44|0;q=(c[k>>2]=c[p>>2]|0,c[k+4>>2]=c[p+4>>2]|0,+h[k>>3]);r=a+52|0;s=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);t=a+60|0;u=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);v=+Q(+b);w=+R(+b);b=v*e+w*o;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;b=v*g+w*q;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;b=v*j+w*s;h[k>>3]=b,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;b=v*m+w*u;h[k>>3]=b,c[l>>2]=c[k>>2]|0,c[l+4>>2]=c[k+4>>2]|0;b=v*o-w*e;h[k>>3]=b,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;b=v*q-w*g;h[k>>3]=b,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0;b=v*s-w*j;h[k>>3]=b,c[r>>2]=c[k>>2]|0,c[r+4>>2]=c[k+4>>2]|0;b=v*u-w*m;h[k>>3]=b,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;return a|0}function go(a,b,c){a=a|0;b=b|0;c=c|0;return cc(a,b,c)|0}function gp(a,b){a=a|0;b=b|0;return cj(a,b)|0}function gq(a,b){a=a|0;b=+b;var d=0.0,e=0.0,f=0;d=+Q(+b);e=+R(+b);b=-0.0-e;f=a+4|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+36|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+68|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+100|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+44|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+76|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+108|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+52|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+84|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+116|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+28|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+60|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+92|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+124|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function gr(a,b){a=a|0;b=+b;var d=0.0,e=0.0,f=0;d=+Q(+b);e=+R(+b);b=-0.0-e;f=a+4|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+36|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+68|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+100|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+44|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+76|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+108|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+52|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+84|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+116|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+28|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+60|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+92|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+124|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function gs(a,b){a=a|0;b=+b;var d=0.0,e=0.0,f=0;d=+Q(+b);e=+R(+b);b=-0.0-e;f=a+4|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+36|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+68|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+100|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+44|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+76|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+108|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+52|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+84|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+116|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+28|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+60|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+92|0;h[k>>3]=0.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+124|0;h[k>>3]=1.0,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function gt(a,b,d){a=a|0;b=b|0;d=+d;var e=0.0,f=0.0,g=0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0;e=+Q(+d);f=+R(+d);d=1.0-e;g=b+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=b+20|0;l=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);m=d*i;n=d*j;o=m*i+e;p=m*j;q=f*l;r=p-q;s=m*l;m=f*j;t=s+m;u=p+q;q=n*j+e;j=n*l;n=f*i;i=j-n;f=s-m;m=j+n;n=d*l*l+e;g=a+4|0;h[k>>3]=o,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+36|0;h[k>>3]=r,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+68|0;h[k>>3]=t,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+100|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+12|0;h[k>>3]=u,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+44|0;h[k>>3]=q,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+76|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+108|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+20|0;h[k>>3]=f,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+52|0;h[k>>3]=m,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+84|0;h[k>>3]=n,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+116|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+28|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+60|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+92|0;h[k>>3]=0.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=a+124|0;h[k>>3]=1.0,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}function gu(a,b){a=a|0;b=b|0;return ci(a,b)|0}function gv(a){a=a|0;if((a|0)==0){return}hF(a);return}function gw(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function gx(a,b){a=a|0;b=b|0;return a|0}function gy(a){a=+a;return+.001}function gz(a,b){a=a|0;b=b|0;return 1}function gA(a){a=a|0;return-1|0}function gB(a){a=+a;return+.001}function gC(a){a=+a;return+.001}function gD(a,b){a=+a;b=+b;return+.001}function gE(a){a=a|0;return}function gF(a){a=a|0;return}function gG(a){a=a|0;return}function gH(a){a=a|0;return}function gI(a,b,c){a=+a;b=+b;c=+c;var d=0.0;if(a<b){d=b}else{d=a>c?c:a}return+d}function gJ(a,b,c){a=+a;b=+b;c=+c;var d=0.0,e=0.0;do{if(a>b){if(a>=c){d=1.0;break}e=(a-b)/(c-b);d=e*e*(3.0-e*2.0)}else{d=0.0}}while(0);return+d}function gK(a,b){a=+a;b=+b;return+(a<b?b:a)}function gL(a,b,c,d,e){a=+a;b=+b;c=+c;d=+d;e=+e;return+((a-b)*(e-d)/(c-b)+d)}function gM(a,b,c){a=+a;b=+b;c=+c;var d=0.0,e=0.0;if(a<=b){d=0.0;return+d}if(a>=c){d=1.0;return+d}e=(a-b)/(c-b);d=e*e*e*(e*(e*6.0+-15.0)+10.0);return+d}function gN(a,b){a=a|0;b=b|0;return(b|0)==39|0}function gO(a,b){a=a|0;b=b|0;return(b|0)==48|0}function gP(a,b){a=a|0;b=b|0;return(b|0)==49|0}function gQ(a,b){a=a|0;b=b|0;return(b|0)==50|0}function gR(a,b){a=a|0;b=b|0;return(b|0)==56|0}function gS(a,b){a=a|0;b=b|0;return(b|0)==52|0}function gT(a,b){a=a|0;b=b|0;return(b|0)==51|0}function gU(a){a=a|0;var b=0;b=a+4|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+36|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+68|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+100|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+44|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+76|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+108|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+52|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+84|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+116|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+28|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+60|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+92|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+124|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function gV(a,b,d,e,f){a=a|0;b=+b;d=+d;e=+e;f=+f;var g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0;b=e*.0010000003333334668;g=(-0.0-b)*d;i=b*d;d=e*2.0;j=i-g;l=d/j;m=b+b;n=d/m;d=(i+g)/j;j=(b-b)/m;m=f-e;b=(-0.0-(f+e))/m;g=f*-2.0*e/m;o=a+4|0;h[k>>3]=l,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+36|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+68|0;h[k>>3]=d,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+100|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+12|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+44|0;h[k>>3]=n,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+76|0;h[k>>3]=j,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+108|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+20|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+52|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+84|0;h[k>>3]=b,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+116|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+28|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+60|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+92|0;h[k>>3]=-1.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=a+124|0;h[k>>3]=0.0,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;return a|0}function gW(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);g=d*e*f;i=d*f*e;j=e*f*d;return+(g-i-g+j+i-j)}function gX(a,b,d,e,f,g,i,j,l,m){a=a|0;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;j=+j;l=+l;m=+m;var n=0;n=a+4|0;h[k>>3]=b,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+28|0;h[k>>3]=d,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+52|0;h[k>>3]=e,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+12|0;h[k>>3]=f,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+36|0;h[k>>3]=g,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+60|0;h[k>>3]=i,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+20|0;h[k>>3]=j,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+44|0;h[k>>3]=l,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;n=a+68|0;h[k>>3]=m,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;return a|0}function gY(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+52|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+60|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+68|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function gZ(a){a=a|0;var b=0,d=0.0,e=0,f=0.0;b=a+12|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+28|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=a+20|0;d=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);b=a+52|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+44|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+60|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);h[k>>3]=f,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function g_(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+28|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+52|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+36|0;j=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+60|0;l=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+44|0;n=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+68|0;o=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+28|0;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+52|0;h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;h[k>>3]=i,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;h[k>>3]=j,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+60|0;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+68|0;h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function g$(a){a=a|0;var b=0;b=a+4|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+28|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+52|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+36|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+60|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+44|0;h[k>>3]=0.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+68|0;h[k>>3]=1.0,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function g0(a,b){a=a|0;b=b|0;c[a+4>>2]=b;return}function g1(a){a=a|0;return c[a+8>>2]|0}function g2(a,b){a=a|0;b=b|0;c[a+8>>2]=b;return}function g3(a){a=a|0;return c[a+4>>2]|0}function g4(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function g5(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cl(a,b,c,d)|0}function g6(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+36|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+44|0;i=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+52|0;j=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+68|0;l=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+76|0;m=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+84|0;n=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(+O(+(+a2(+(d*d+e*e+f*f),+(+a2(+(g*g+i*i+j*j),+(l*l+m*m+n*n)))))))}function g7(){var a=0,b=0,d=0,e=0;a=hI(132)|0;b=a;c[a>>2]=5244688;d=a+4|0;e=d;hK(d|0,0,120);d=a+124|0;h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+84|0;h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+44|0;h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return b|0}function g8(a,b,d,e,f,g,i,j,l,m,n,o,p,q,r,s){a=+a;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;j=+j;l=+l;m=+m;n=+n;o=+o;p=+p;q=+q;r=+r;s=+s;var t=0,u=0,v=0;t=hI(132)|0;u=t;c[t>>2]=5244688;v=t+4|0;h[k>>3]=a,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+36|0;h[k>>3]=b,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+68|0;h[k>>3]=d,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+100|0;h[k>>3]=e,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+12|0;h[k>>3]=f,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+44|0;h[k>>3]=g,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+76|0;h[k>>3]=i,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+108|0;h[k>>3]=j,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+20|0;h[k>>3]=l,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+52|0;h[k>>3]=m,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+84|0;h[k>>3]=n,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+116|0;h[k>>3]=o,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+28|0;h[k>>3]=p,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+60|0;h[k>>3]=q,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+92|0;h[k>>3]=r,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;v=t+124|0;h[k>>3]=s,c[v>>2]=c[k>>2]|0,c[v+4>>2]=c[k+4>>2]|0;return u|0}function g9(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cv(a,b,c,d)|0}function ha(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function hb(a){a=a|0;if((a|0)==0){return}hF(a);return}function hc(){var a=0;a=hI(4)|0;c[a>>2]=5244864;return a|0}function hd(a,b){a=a|0;b=b|0;b=hI(4)|0;c[b>>2]=5244864;return b|0}function he(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0;b=hI(76)|0;d=b;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+28|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+52|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;j=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+36|0;l=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+60|0;m=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;n=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+44|0;o=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+68|0;p=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);c[b>>2]=5244704;e=b+4|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+28|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+52|0;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+36|0;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+60|0;h[k>>3]=m,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;h[k>>3]=n,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+44|0;h[k>>3]=o,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+68|0;h[k>>3]=p,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return d|0}function hf(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function hg(a){a=a|0;if((a|0)==0){return}hF(a);return}function hh(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0;d=cb(a,b)|0;b=d+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);f=d+28|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=d+20|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);b=d+52|0;g=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;h[k>>3]=e,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=d+44|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);f=d+60|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function hi(a,b){a=a|0;b=b|0;return cb(a,b)|0}function hj(){var a=0,b=0,d=0,e=0;a=hI(76)|0;b=a;c[a>>2]=5244704;d=a+4|0;e=d;hK(d|0,0,64);d=a+68|0;h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+36|0;h[k>>3]=1.0,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=1.0,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return b|0}function hk(a,b,d,e,f,g,i,j,l){a=+a;b=+b;d=+d;e=+e;f=+f;g=+g;i=+i;j=+j;l=+l;var m=0,n=0,o=0;m=hI(76)|0;n=m;c[m>>2]=5244704;o=m+4|0;h[k>>3]=a,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+28|0;h[k>>3]=b,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+52|0;h[k>>3]=d,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+12|0;h[k>>3]=e,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+36|0;h[k>>3]=f,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+60|0;h[k>>3]=g,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+20|0;h[k>>3]=i,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+44|0;h[k>>3]=j,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;o=m+68|0;h[k>>3]=l,c[o>>2]=c[k>>2]|0,c[o+4>>2]=c[k+4>>2]|0;return n|0}function hl(a){a=a|0;if((a|0)==0){return}hF(a|0);return}function hm(){a1(be(0)|0);aQ();return+100.0}function hn(){return hI(1)|0}function ho(a,b){a=a|0;b=b|0;return bF[c[c[a>>2]>>2]&1023](a,b)|0}function hp(a){a=a|0;if((a|0)==0){return}hF(a);return}function hq(){var a=0;a=hI(12)|0;c[a>>2]=5244848;return a|0}function hr(a,b){a=a|0;b=b|0;b=hI(12)|0;c[b>>2]=5244848;return b|0}function hs(a){a=a|0;hF(a);return}function ht(a){a=a|0;hF(a);return}function hu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+56|0;f=e|0;do{if((a|0)==(b|0)){g=1}else{if((b|0)==0){g=0;break}h=hy(b,5245268,5245256,-1)|0;j=h;if((h|0)==0){g=0;break}hK(f|0,0,56);c[f>>2]=j;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;bP[c[(c[h>>2]|0)+28>>2]&1023](j,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;break}c[d>>2]=c[f+16>>2]|0;g=1}}while(0);i=e;return g|0}function hv(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;bP[c[(c[g>>2]|0)+28>>2]&1023](g,d,e,f);return}g=d+16|0;b=c[g>>2]|0;if((b|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function hw(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}g=d+28|0;if((c[g>>2]|0)==1){return}c[g>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function hx(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;i=g}else{i=b}if(!((c[d+48>>2]|0)==1&(i|0)==1)){return}a[d+54|0]=1;return}function hy(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+56|0;g=f|0;h=c[a>>2]|0;j=a+(c[h-8>>2]|0)|0;k=c[h-4>>2]|0;h=k;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;e=g+16|0;b=g+20|0;a=g+24|0;l=g+28|0;m=g+32|0;n=g+40|0;hK(e|0,0,39);if((k|0)==(d|0)){c[g+48>>2]=1;bG[c[(c[k>>2]|0)+20>>2]&1023](h,g,j,j,1,0);i=f;return((c[a>>2]|0)==1?j:0)|0}bg[c[(c[k>>2]|0)+24>>2]&1023](h,g,j,1,0);j=c[g+36>>2]|0;do{if((j|0)==1){if((c[a>>2]|0)!=1){if((c[n>>2]|0)!=0){o=0;break}if((c[l>>2]|0)!=1){o=0;break}if((c[m>>2]|0)!=1){o=0;break}}o=c[e>>2]|0}else if((j|0)==0){if((c[n>>2]|0)!=1){o=0;break}if((c[l>>2]|0)!=1){o=0;break}o=(c[m>>2]|0)==1?c[b>>2]|0:0}else{o=0}}while(0);i=f;return o|0}function hz(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)!=(c[d>>2]|0)){h=c[b+8>>2]|0;bg[c[(c[h>>2]|0)+24>>2]&1023](h,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;l=c[b+8>>2]|0;bG[c[(c[l>>2]|0)+20>>2]&1023](l,d,e,e,1,g);do{if((a[k]&1)<<24>>24==0){m=0;n=919}else{if((a[j]&1)<<24>>24==0){m=1;n=919;break}else{break}}}while(0);L1005:do{if((n|0)==919){c[h>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){n=922;break}a[d+54|0]=1;if(m){break L1005}else{break}}else{n=922}}while(0);if((n|0)==922){if(m){break}}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function hA(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;if((b|0)!=(c[d+8>>2]|0)){i=c[b+8>>2]|0;bG[c[(c[i>>2]|0)+20>>2]&1023](i,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;j=g}else{j=h}if(!((c[d+48>>2]|0)==1&(j|0)==1)){return}a[d+54|0]=1;return}function hB(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0;do{if(a>>>0<245){if(a>>>0<11){b=16}else{b=a+11&-8}d=b>>>3;e=c[1311030]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=5244160+(h<<2)|0;j=5244160+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[1311030]=e&(1<<g^-1)}else{if(l>>>0<(c[1311034]|0)>>>0){aT();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{aT();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[1311032]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=5244160+(p<<2)|0;m=5244160+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[1311030]=e&(1<<r^-1)}else{if(l>>>0<(c[1311034]|0)>>>0){aT();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{aT();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[1311032]|0;if((l|0)!=0){q=c[1311035]|0;d=l>>>2&1073741822;f=5244160+(d<<2)|0;k=c[1311030]|0;h=1<<(l>>>3);do{if((k&h|0)==0){c[1311030]=k|h;s=f;t=5244160+(d+2<<2)|0}else{l=5244160+(d+2<<2)|0;g=c[l>>2]|0;if(g>>>0>=(c[1311034]|0)>>>0){s=g;t=l;break}aT();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[1311032]=m;c[1311035]=e;n=i;return n|0}d=c[1311031]|0;if((d|0)==0){o=b;break}h=(d&-d)-1|0;d=h>>>12&16;k=h>>>(d>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;l=r>>>(p>>>0);r=l>>>1&1;g=c[5244424+((h|d|k|p|r)+(l>>>(r>>>0))<<2)>>2]|0;r=g;l=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;l=k?u:l;p=k?g:p}r=l;i=c[1311034]|0;if(r>>>0<i>>>0){aT();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){aT();return 0}e=c[l+24>>2]|0;f=c[l+12>>2]|0;L1103:do{if((f|0)==(l|0)){q=l+20|0;g=c[q>>2]|0;do{if((g|0)==0){k=l+16|0;d=c[k>>2]|0;if((d|0)==0){v=0;break L1103}else{w=k;x=d;break}}else{w=q;x=g}}while(0);while(1){g=x+20|0;q=c[g>>2]|0;if((q|0)!=0){w=g;x=q;continue}q=x+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=q;x=g}}if(w>>>0<i>>>0){aT();return 0}else{c[w>>2]=0;v=x;break}}else{g=c[l+8>>2]|0;if(g>>>0<i>>>0){aT();return 0}q=g+12|0;if((c[q>>2]|0)!=(l|0)){aT();return 0}d=f+8|0;if((c[d>>2]|0)==(l|0)){c[q>>2]=f;c[d>>2]=g;v=f;break}else{aT();return 0}}}while(0);L1125:do{if((e|0)!=0){f=l+28|0;i=5244424+(c[f>>2]<<2)|0;do{if((l|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[1311031]=c[1311031]&(1<<c[f>>2]^-1);break L1125}else{if(e>>>0<(c[1311034]|0)>>>0){aT();return 0}g=e+16|0;if((c[g>>2]|0)==(l|0)){c[g>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L1125}}}while(0);if(v>>>0<(c[1311034]|0)>>>0){aT();return 0}c[v+24>>2]=e;f=c[l+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[l+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16){e=p+b|0;c[l+4>>2]=e|3;f=r+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[l+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b|0)>>2]=p;f=c[1311032]|0;if((f|0)!=0){e=c[1311035]|0;i=f>>>2&1073741822;g=5244160+(i<<2)|0;d=c[1311030]|0;q=1<<(f>>>3);do{if((d&q|0)==0){c[1311030]=d|q;y=g;z=5244160+(i+2<<2)|0}else{f=5244160+(i+2<<2)|0;k=c[f>>2]|0;if(k>>>0>=(c[1311034]|0)>>>0){y=k;z=f;break}aT();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=g}c[1311032]=p;c[1311035]=m}i=l+8|0;if((i|0)==0){o=b;break}else{n=i}return n|0}else{if(a>>>0>4294967231){o=-1;break}i=a+11|0;q=i&-8;d=c[1311031]|0;if((d|0)==0){o=q;break}r=-q|0;f=i>>>8;do{if((f|0)==0){A=0}else{if(q>>>0>16777215){A=31;break}i=(f+1048320|0)>>>16&8;k=f<<i;h=(k+520192|0)>>>16&4;j=k<<h;k=(j+245760|0)>>>16&2;B=(14-(h|i|k)|0)+(j<<k>>>15)|0;A=q>>>((B+7|0)>>>0)&1|B<<1}}while(0);f=c[5244424+(A<<2)>>2]|0;L1173:do{if((f|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}l=0;m=r;p=f;g=q<<F;e=0;while(1){B=c[p+4>>2]&-8;k=B-q|0;if(k>>>0<m>>>0){if((B|0)==(q|0)){C=p;D=k;E=p;break L1173}else{G=p;H=k}}else{G=l;H=m}k=c[p+20>>2]|0;B=c[p+16+(g>>>31<<2)>>2]|0;j=(k|0)==0|(k|0)==(B|0)?e:k;if((B|0)==0){C=G;D=H;E=j;break L1173}else{l=G;m=H;p=B;g=g<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){f=2<<A;r=d&(f|-f);if((r|0)==0){o=q;break}f=(r&-r)-1|0;r=f>>>12&16;e=f>>>(r>>>0);f=e>>>5&8;g=e>>>(f>>>0);e=g>>>2&4;p=g>>>(e>>>0);g=p>>>1&2;m=p>>>(g>>>0);p=m>>>1&1;I=c[5244424+((f|r|e|g|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}L1188:do{if((I|0)==0){J=D;K=C}else{p=I;m=D;g=C;while(1){e=(c[p+4>>2]&-8)-q|0;r=e>>>0<m>>>0;f=r?e:m;e=r?p:g;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=f;g=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=f;K=e;break L1188}else{p=r;m=f;g=e}}}}while(0);if((K|0)==0){o=q;break}if(J>>>0>=((c[1311032]|0)-q|0)>>>0){o=q;break}d=K;g=c[1311034]|0;if(d>>>0<g>>>0){aT();return 0}m=d+q|0;p=m;if(d>>>0>=m>>>0){aT();return 0}e=c[K+24>>2]|0;f=c[K+12>>2]|0;L1201:do{if((f|0)==(K|0)){r=K+20|0;l=c[r>>2]|0;do{if((l|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break L1201}else{M=j;N=B;break}}else{M=r;N=l}}while(0);while(1){l=N+20|0;r=c[l>>2]|0;if((r|0)!=0){M=l;N=r;continue}r=N+16|0;l=c[r>>2]|0;if((l|0)==0){break}else{M=r;N=l}}if(M>>>0<g>>>0){aT();return 0}else{c[M>>2]=0;L=N;break}}else{l=c[K+8>>2]|0;if(l>>>0<g>>>0){aT();return 0}r=l+12|0;if((c[r>>2]|0)!=(K|0)){aT();return 0}B=f+8|0;if((c[B>>2]|0)==(K|0)){c[r>>2]=f;c[B>>2]=l;L=f;break}else{aT();return 0}}}while(0);L1223:do{if((e|0)!=0){f=K+28|0;g=5244424+(c[f>>2]<<2)|0;do{if((K|0)==(c[g>>2]|0)){c[g>>2]=L;if((L|0)!=0){break}c[1311031]=c[1311031]&(1<<c[f>>2]^-1);break L1223}else{if(e>>>0<(c[1311034]|0)>>>0){aT();return 0}l=e+16|0;if((c[l>>2]|0)==(K|0)){c[l>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L1223}}}while(0);if(L>>>0<(c[1311034]|0)>>>0){aT();return 0}c[L+24>>2]=e;f=c[K+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[L+16>>2]=f;c[f+24>>2]=L;break}}}while(0);f=c[K+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[L+20>>2]=f;c[f+24>>2]=L;break}}}while(0);do{if(J>>>0<16){e=J+q|0;c[K+4>>2]=e|3;f=d+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[K+4>>2]=q|3;c[d+(q|4)>>2]=J|1;c[d+(J+q|0)>>2]=J;if(J>>>0<256){f=J>>>2&1073741822;e=5244160+(f<<2)|0;g=c[1311030]|0;l=1<<(J>>>3);do{if((g&l|0)==0){c[1311030]=g|l;O=e;P=5244160+(f+2<<2)|0}else{B=5244160+(f+2<<2)|0;r=c[B>>2]|0;if(r>>>0>=(c[1311034]|0)>>>0){O=r;P=B;break}aT();return 0}}while(0);c[P>>2]=p;c[O+12>>2]=p;c[d+(q+8|0)>>2]=O;c[d+(q+12|0)>>2]=e;break}f=m;l=J>>>8;do{if((l|0)==0){Q=0}else{if(J>>>0>16777215){Q=31;break}g=(l+1048320|0)>>>16&8;B=l<<g;r=(B+520192|0)>>>16&4;j=B<<r;B=(j+245760|0)>>>16&2;k=(14-(r|g|B)|0)+(j<<B>>>15)|0;Q=J>>>((k+7|0)>>>0)&1|k<<1}}while(0);l=5244424+(Q<<2)|0;c[d+(q+28|0)>>2]=Q;c[d+(q+20|0)>>2]=0;c[d+(q+16|0)>>2]=0;e=c[1311031]|0;k=1<<Q;if((e&k|0)==0){c[1311031]=e|k;c[l>>2]=f;c[d+(q+24|0)>>2]=l;c[d+(q+12|0)>>2]=f;c[d+(q+8|0)>>2]=f;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}k=J<<R;e=c[l>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(J|0)){break}S=e+16+(k>>>31<<2)|0;l=c[S>>2]|0;if((l|0)==0){T=1106;break}else{k=k<<1;e=l}}if((T|0)==1106){if(S>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[S>>2]=f;c[d+(q+24|0)>>2]=e;c[d+(q+12|0)>>2]=f;c[d+(q+8|0)>>2]=f;break}}k=e+8|0;l=c[k>>2]|0;B=c[1311034]|0;if(e>>>0<B>>>0){aT();return 0}if(l>>>0<B>>>0){aT();return 0}else{c[l+12>>2]=f;c[k>>2]=f;c[d+(q+8|0)>>2]=l;c[d+(q+12|0)>>2]=e;c[d+(q+24|0)>>2]=0;break}}}while(0);d=K+8|0;if((d|0)==0){o=q;break}else{n=d}return n|0}}while(0);K=c[1311032]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[1311035]|0;if(S>>>0>15){R=J;c[1311035]=R+o|0;c[1311032]=S;c[R+(o+4|0)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[1311032]=0;c[1311035]=0;c[J+4>>2]=K|3;S=J+(K+4|0)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[1311033]|0;if(o>>>0<J>>>0){S=J-o|0;c[1311033]=S;J=c[1311036]|0;K=J;c[1311036]=K+o|0;c[K+(o+4|0)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[1310720]|0)==0){J=aR(8)|0;if((J-1&J|0)==0){c[1310722]=J;c[1310721]=J;c[1310723]=-1;c[1310724]=2097152;c[1310725]=0;c[1311141]=0;c[1310720]=be(0)&-16^1431655768;break}else{aT();return 0}}}while(0);J=o+48|0;S=c[1310722]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[1311140]|0;do{if((O|0)!=0){P=c[1311138]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L1315:do{if((c[1311141]&4|0)==0){O=c[1311036]|0;L1317:do{if((O|0)==0){T=1136}else{L=O;P=5244568;while(1){U=P|0;N=c[U>>2]|0;if(N>>>0<=L>>>0){V=P+4|0;if((N+(c[V>>2]|0)|0)>>>0>L>>>0){break}}N=c[P+8>>2]|0;if((N|0)==0){T=1136;break L1317}else{P=N}}if((P|0)==0){T=1136;break}L=R-(c[1311033]|0)&Q;if(L>>>0>=2147483647){W=0;break}e=a8(L|0)|0;f=(e|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=f?e:-1;Y=f?L:0;Z=L;_=e;T=1145;break}}while(0);do{if((T|0)==1136){O=a8(0)|0;if((O|0)==-1){W=0;break}q=O;e=c[1310721]|0;L=e-1|0;if((L&q|0)==0){aa=S}else{aa=(S-q|0)+(L+q&-e)|0}e=c[1311138]|0;q=e+aa|0;if(!(aa>>>0>o>>>0&aa>>>0<2147483647)){W=0;break}L=c[1311140]|0;if((L|0)!=0){if(q>>>0<=e>>>0|q>>>0>L>>>0){W=0;break}}L=a8(aa|0)|0;q=(L|0)==(O|0);X=q?O:-1;Y=q?aa:0;Z=aa;_=L;T=1145;break}}while(0);L1337:do{if((T|0)==1145){L=-Z|0;if((X|0)!=-1){ab=Y;ac=X;T=1156;break L1315}do{if((_|0)!=-1&Z>>>0<2147483647&Z>>>0<J>>>0){q=c[1310722]|0;O=(K-Z|0)+q&-q;if(O>>>0>=2147483647){ad=Z;break}if((a8(O|0)|0)==-1){a8(L|0);W=Y;break L1337}else{ad=O+Z|0;break}}else{ad=Z}}while(0);if((_|0)==-1){W=Y}else{ab=ad;ac=_;T=1156;break L1315}}}while(0);c[1311141]=c[1311141]|4;ae=W;T=1153;break}else{ae=0;T=1153}}while(0);do{if((T|0)==1153){if(S>>>0>=2147483647){break}W=a8(S|0)|0;_=a8(0)|0;if(!((_|0)!=-1&(W|0)!=-1&W>>>0<_>>>0)){break}ad=_-W|0;_=ad>>>0>(o+40|0)>>>0;Y=_?W:-1;if((Y|0)==-1){break}else{ab=_?ad:ae;ac=Y;T=1156;break}}}while(0);do{if((T|0)==1156){ae=(c[1311138]|0)+ab|0;c[1311138]=ae;if(ae>>>0>(c[1311139]|0)>>>0){c[1311139]=ae}ae=c[1311036]|0;L1357:do{if((ae|0)==0){S=c[1311034]|0;if((S|0)==0|ac>>>0<S>>>0){c[1311034]=ac}c[1311142]=ac;c[1311143]=ab;c[1311145]=0;c[1311039]=c[1310720]|0;c[1311038]=-1;S=0;while(1){Y=S<<1;ad=5244160+(Y<<2)|0;c[5244160+(Y+3<<2)>>2]=ad;c[5244160+(Y+2<<2)>>2]=ad;ad=S+1|0;if((ad|0)==32){break}else{S=ad}}S=ac+8|0;if((S&7|0)==0){af=0}else{af=-S&7}S=(ab-40|0)-af|0;c[1311036]=ac+af|0;c[1311033]=S;c[ac+(af+4|0)>>2]=S|1;c[ac+(ab-36|0)>>2]=40;c[1311037]=c[1310724]|0}else{S=5244568;while(1){if((S|0)==0){break}ag=c[S>>2]|0;ah=S+4|0;ai=c[ah>>2]|0;if((ac|0)==(ag+ai|0)){T=1169;break}S=c[S+8>>2]|0}do{if((T|0)==1169){if((c[S+12>>2]&8|0)!=0){break}ad=ae;if(!(ad>>>0>=ag>>>0&ad>>>0<ac>>>0)){break}c[ah>>2]=ai+ab|0;ad=c[1311036]|0;Y=(c[1311033]|0)+ab|0;_=ad;W=ad+8|0;if((W&7|0)==0){aj=0}else{aj=-W&7}W=Y-aj|0;c[1311036]=_+aj|0;c[1311033]=W;c[_+(aj+4|0)>>2]=W|1;c[_+(Y+4|0)>>2]=40;c[1311037]=c[1310724]|0;break L1357}}while(0);if(ac>>>0<(c[1311034]|0)>>>0){c[1311034]=ac}S=ac+ab|0;Y=5244568;while(1){if((Y|0)==0){break}ak=Y|0;if((c[ak>>2]|0)==(S|0)){T=1180;break}Y=c[Y+8>>2]|0}do{if((T|0)==1180){if((c[Y+12>>2]&8|0)!=0){break}c[ak>>2]=ac;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+ab|0;S=ac+8|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ac+(ab+8|0)|0;if((S&7|0)==0){am=0}else{am=-S&7}S=ac+(am+ab|0)|0;_=S;W=al+o|0;ad=ac+W|0;Z=ad;K=(S-(ac+al|0)|0)-o|0;c[ac+(al+4|0)>>2]=o|3;do{if((_|0)==(c[1311036]|0)){J=(c[1311033]|0)+K|0;c[1311033]=J;c[1311036]=Z;c[ac+(W+4|0)>>2]=J|1}else{if((_|0)==(c[1311035]|0)){J=(c[1311032]|0)+K|0;c[1311032]=J;c[1311035]=Z;c[ac+(W+4|0)>>2]=J|1;c[ac+(J+W|0)>>2]=J;break}J=ab+4|0;X=c[ac+(J+am|0)>>2]|0;if((X&3|0)==1){aa=X&-8;V=X>>>3;L1404:do{if(X>>>0<256){U=c[ac+((am|8)+ab|0)>>2]|0;Q=c[ac+((ab+12|0)+am|0)>>2]|0;R=5244160+((X>>>2&1073741822)<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[1311034]|0)>>>0){aT();return 0}if((c[U+12>>2]|0)==(_|0)){break}aT();return 0}}while(0);if((Q|0)==(U|0)){c[1311030]=c[1311030]&(1<<V^-1);break}do{if((Q|0)==(R|0)){an=Q+8|0}else{if(Q>>>0<(c[1311034]|0)>>>0){aT();return 0}L=Q+8|0;if((c[L>>2]|0)==(_|0)){an=L;break}aT();return 0}}while(0);c[U+12>>2]=Q;c[an>>2]=U}else{R=S;L=c[ac+((am|24)+ab|0)>>2]|0;P=c[ac+((ab+12|0)+am|0)>>2]|0;L1425:do{if((P|0)==(R|0)){O=am|16;q=ac+(J+O|0)|0;e=c[q>>2]|0;do{if((e|0)==0){f=ac+(O+ab|0)|0;N=c[f>>2]|0;if((N|0)==0){ao=0;break L1425}else{ap=f;aq=N;break}}else{ap=q;aq=e}}while(0);while(1){e=aq+20|0;q=c[e>>2]|0;if((q|0)!=0){ap=e;aq=q;continue}q=aq+16|0;e=c[q>>2]|0;if((e|0)==0){break}else{ap=q;aq=e}}if(ap>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[ap>>2]=0;ao=aq;break}}else{e=c[ac+((am|8)+ab|0)>>2]|0;if(e>>>0<(c[1311034]|0)>>>0){aT();return 0}q=e+12|0;if((c[q>>2]|0)!=(R|0)){aT();return 0}O=P+8|0;if((c[O>>2]|0)==(R|0)){c[q>>2]=P;c[O>>2]=e;ao=P;break}else{aT();return 0}}}while(0);if((L|0)==0){break}P=ac+((ab+28|0)+am|0)|0;U=5244424+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=ao;if((ao|0)!=0){break}c[1311031]=c[1311031]&(1<<c[P>>2]^-1);break L1404}else{if(L>>>0<(c[1311034]|0)>>>0){aT();return 0}Q=L+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=ao}else{c[L+20>>2]=ao}if((ao|0)==0){break L1404}}}while(0);if(ao>>>0<(c[1311034]|0)>>>0){aT();return 0}c[ao+24>>2]=L;R=am|16;P=c[ac+(R+ab|0)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[ao+16>>2]=P;c[P+24>>2]=ao;break}}}while(0);P=c[ac+(J+R|0)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[ao+20>>2]=P;c[P+24>>2]=ao;break}}}while(0);ar=ac+((aa|am)+ab|0)|0;as=aa+K|0}else{ar=_;as=K}J=ar+4|0;c[J>>2]=c[J>>2]&-2;c[ac+(W+4|0)>>2]=as|1;c[ac+(as+W|0)>>2]=as;if(as>>>0<256){J=as>>>2&1073741822;V=5244160+(J<<2)|0;X=c[1311030]|0;P=1<<(as>>>3);do{if((X&P|0)==0){c[1311030]=X|P;at=V;au=5244160+(J+2<<2)|0}else{L=5244160+(J+2<<2)|0;U=c[L>>2]|0;if(U>>>0>=(c[1311034]|0)>>>0){at=U;au=L;break}aT();return 0}}while(0);c[au>>2]=Z;c[at+12>>2]=Z;c[ac+(W+8|0)>>2]=at;c[ac+(W+12|0)>>2]=V;break}J=ad;P=as>>>8;do{if((P|0)==0){av=0}else{if(as>>>0>16777215){av=31;break}X=(P+1048320|0)>>>16&8;aa=P<<X;L=(aa+520192|0)>>>16&4;U=aa<<L;aa=(U+245760|0)>>>16&2;Q=(14-(L|X|aa)|0)+(U<<aa>>>15)|0;av=as>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);P=5244424+(av<<2)|0;c[ac+(W+28|0)>>2]=av;c[ac+(W+20|0)>>2]=0;c[ac+(W+16|0)>>2]=0;V=c[1311031]|0;Q=1<<av;if((V&Q|0)==0){c[1311031]=V|Q;c[P>>2]=J;c[ac+(W+24|0)>>2]=P;c[ac+(W+12|0)>>2]=J;c[ac+(W+8|0)>>2]=J;break}if((av|0)==31){aw=0}else{aw=25-(av>>>1)|0}Q=as<<aw;V=c[P>>2]|0;while(1){if((c[V+4>>2]&-8|0)==(as|0)){break}ax=V+16+(Q>>>31<<2)|0;P=c[ax>>2]|0;if((P|0)==0){T=1253;break}else{Q=Q<<1;V=P}}if((T|0)==1253){if(ax>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[ax>>2]=J;c[ac+(W+24|0)>>2]=V;c[ac+(W+12|0)>>2]=J;c[ac+(W+8|0)>>2]=J;break}}Q=V+8|0;P=c[Q>>2]|0;aa=c[1311034]|0;if(V>>>0<aa>>>0){aT();return 0}if(P>>>0<aa>>>0){aT();return 0}else{c[P+12>>2]=J;c[Q>>2]=J;c[ac+(W+8|0)>>2]=P;c[ac+(W+12|0)>>2]=V;c[ac+(W+24|0)>>2]=0;break}}}while(0);n=ac+(al|8)|0;return n|0}}while(0);Y=ae;W=5244568;while(1){ad=c[W>>2]|0;if(ad>>>0<=Y>>>0){Z=c[W+4>>2]|0;if((ad+Z|0)>>>0>Y>>>0){ay=ad;az=Z;break}}Z=c[W+8>>2]|0;if((Z|0)==0){T=1265;break}else{W=Z}}if((T|0)==1265){$(4);ay=0;az=aA}W=ay+az|0;Z=ay+(az-39|0)|0;if((Z&7|0)==0){aB=0}else{aB=-Z&7}Z=ay+((az-47|0)+aB|0)|0;ad=Z>>>0<(ae+16|0)>>>0?Y:Z;Z=ad+8|0;K=ac+8|0;if((K&7|0)==0){aC=0}else{aC=-K&7}K=(ab-40|0)-aC|0;c[1311036]=ac+aC|0;c[1311033]=K;c[ac+(aC+4|0)>>2]=K|1;c[ac+(ab-36|0)>>2]=40;c[1311037]=c[1310724]|0;c[ad+4>>2]=27;hJ(Z|0,5244568,16);c[1311142]=ac;c[1311143]=ab;c[1311145]=0;c[1311144]=Z;Z=ad+28|0;c[Z>>2]=7;L1525:do{if((ad+32|0)>>>0<W>>>0){K=Z;while(1){_=K+4|0;c[_>>2]=7;if((K+8|0)>>>0<W>>>0){K=_}else{break L1525}}}}while(0);if((ad|0)==(Y|0)){break}W=ad-ae|0;Z=Y+(W+4|0)|0;c[Z>>2]=c[Z>>2]&-2;c[ae+4>>2]=W|1;c[Y+W>>2]=W;if(W>>>0<256){Z=W>>>2&1073741822;K=5244160+(Z<<2)|0;_=c[1311030]|0;S=1<<(W>>>3);do{if((_&S|0)==0){c[1311030]=_|S;aD=K;aE=5244160+(Z+2<<2)|0}else{P=5244160+(Z+2<<2)|0;Q=c[P>>2]|0;if(Q>>>0>=(c[1311034]|0)>>>0){aD=Q;aE=P;break}aT();return 0}}while(0);c[aE>>2]=ae;c[aD+12>>2]=ae;c[ae+8>>2]=aD;c[ae+12>>2]=K;break}Z=ae;S=W>>>8;do{if((S|0)==0){aF=0}else{if(W>>>0>16777215){aF=31;break}_=(S+1048320|0)>>>16&8;Y=S<<_;ad=(Y+520192|0)>>>16&4;P=Y<<ad;Y=(P+245760|0)>>>16&2;Q=(14-(ad|_|Y)|0)+(P<<Y>>>15)|0;aF=W>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);S=5244424+(aF<<2)|0;c[ae+28>>2]=aF;c[ae+20>>2]=0;c[ae+16>>2]=0;K=c[1311031]|0;Q=1<<aF;if((K&Q|0)==0){c[1311031]=K|Q;c[S>>2]=Z;c[ae+24>>2]=S;c[ae+12>>2]=ae;c[ae+8>>2]=ae;break}if((aF|0)==31){aG=0}else{aG=25-(aF>>>1)|0}Q=W<<aG;K=c[S>>2]|0;while(1){if((c[K+4>>2]&-8|0)==(W|0)){break}aH=K+16+(Q>>>31<<2)|0;S=c[aH>>2]|0;if((S|0)==0){T=1289;break}else{Q=Q<<1;K=S}}if((T|0)==1289){if(aH>>>0<(c[1311034]|0)>>>0){aT();return 0}else{c[aH>>2]=Z;c[ae+24>>2]=K;c[ae+12>>2]=ae;c[ae+8>>2]=ae;break}}Q=K+8|0;W=c[Q>>2]|0;S=c[1311034]|0;if(K>>>0<S>>>0){aT();return 0}if(W>>>0<S>>>0){aT();return 0}else{c[W+12>>2]=Z;c[Q>>2]=Z;c[ae+8>>2]=W;c[ae+12>>2]=K;c[ae+24>>2]=0;break}}}while(0);ae=c[1311033]|0;if(ae>>>0<=o>>>0){break}W=ae-o|0;c[1311033]=W;ae=c[1311036]|0;Q=ae;c[1311036]=Q+o|0;c[Q+(o+4|0)>>2]=W|1;c[ae+4>>2]=o|3;n=ae+8|0;return n|0}}while(0);c[ba()>>2]=12;n=0;return n|0}function hC(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[1311034]|0;if(b>>>0<e>>>0){aT()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){aT()}h=f&-8;i=a+(h-8|0)|0;j=i;L1578:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){aT()}if((n|0)==(c[1311035]|0)){p=a+(h-4|0)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[1311032]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4|0)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256){s=c[a+(l+8|0)>>2]|0;t=c[a+(l+12|0)>>2]|0;u=5244160+((k>>>2&1073741822)<<2)|0;do{if((s|0)!=(u|0)){if(s>>>0<e>>>0){aT()}if((c[s+12>>2]|0)==(n|0)){break}aT()}}while(0);if((t|0)==(s|0)){c[1311030]=c[1311030]&(1<<p^-1);q=n;r=o;break}do{if((t|0)==(u|0)){v=t+8|0}else{if(t>>>0<e>>>0){aT()}k=t+8|0;if((c[k>>2]|0)==(n|0)){v=k;break}aT()}}while(0);c[s+12>>2]=t;c[v>>2]=s;q=n;r=o;break}u=m;p=c[a+(l+24|0)>>2]|0;k=c[a+(l+12|0)>>2]|0;L1612:do{if((k|0)==(u|0)){w=a+(l+20|0)|0;x=c[w>>2]|0;do{if((x|0)==0){y=a+(l+16|0)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break L1612}else{B=y;C=z;break}}else{B=w;C=x}}while(0);while(1){x=C+20|0;w=c[x>>2]|0;if((w|0)!=0){B=x;C=w;continue}w=C+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=w;C=x}}if(B>>>0<e>>>0){aT()}else{c[B>>2]=0;A=C;break}}else{x=c[a+(l+8|0)>>2]|0;if(x>>>0<e>>>0){aT()}w=x+12|0;if((c[w>>2]|0)!=(u|0)){aT()}z=k+8|0;if((c[z>>2]|0)==(u|0)){c[w>>2]=k;c[z>>2]=x;A=k;break}else{aT()}}}while(0);if((p|0)==0){q=n;r=o;break}k=a+(l+28|0)|0;m=5244424+(c[k>>2]<<2)|0;do{if((u|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[1311031]=c[1311031]&(1<<c[k>>2]^-1);q=n;r=o;break L1578}else{if(p>>>0<(c[1311034]|0)>>>0){aT()}s=p+16|0;if((c[s>>2]|0)==(u|0)){c[s>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L1578}}}while(0);if(A>>>0<(c[1311034]|0)>>>0){aT()}c[A+24>>2]=p;u=c[a+(l+16|0)>>2]|0;do{if((u|0)!=0){if(u>>>0<(c[1311034]|0)>>>0){aT()}else{c[A+16>>2]=u;c[u+24>>2]=A;break}}}while(0);u=c[a+(l+20|0)>>2]|0;if((u|0)==0){q=n;r=o;break}if(u>>>0<(c[1311034]|0)>>>0){aT()}else{c[A+20>>2]=u;c[u+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){aT()}A=a+(h-4|0)|0;e=c[A>>2]|0;if((e&1|0)==0){aT()}do{if((e&2|0)==0){if((j|0)==(c[1311036]|0)){C=(c[1311033]|0)+r|0;c[1311033]=C;c[1311036]=q;c[q+4>>2]=C|1;if((q|0)==(c[1311035]|0)){c[1311035]=0;c[1311032]=0}if(C>>>0<=(c[1311037]|0)>>>0){return}hH(0);return}if((j|0)==(c[1311035]|0)){C=(c[1311032]|0)+r|0;c[1311032]=C;c[1311035]=q;c[q+4>>2]=C|1;c[d+C>>2]=C;return}C=(e&-8)+r|0;B=e>>>3;L1683:do{if(e>>>0<256){v=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=5244160+((e>>>2&1073741822)<<2)|0;do{if((v|0)!=(b|0)){if(v>>>0<(c[1311034]|0)>>>0){aT()}if((c[v+12>>2]|0)==(j|0)){break}aT()}}while(0);if((g|0)==(v|0)){c[1311030]=c[1311030]&(1<<B^-1);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[1311034]|0)>>>0){aT()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}aT()}}while(0);c[v+12>>2]=g;c[D>>2]=v}else{b=i;f=c[a+(h+16|0)>>2]|0;u=c[a+(h|4)>>2]|0;L1685:do{if((u|0)==(b|0)){p=a+(h+12|0)|0;k=c[p>>2]|0;do{if((k|0)==0){m=a+(h+8|0)|0;s=c[m>>2]|0;if((s|0)==0){E=0;break L1685}else{F=m;G=s;break}}else{F=p;G=k}}while(0);while(1){k=G+20|0;p=c[k>>2]|0;if((p|0)!=0){F=k;G=p;continue}p=G+16|0;k=c[p>>2]|0;if((k|0)==0){break}else{F=p;G=k}}if(F>>>0<(c[1311034]|0)>>>0){aT()}else{c[F>>2]=0;E=G;break}}else{k=c[a+h>>2]|0;if(k>>>0<(c[1311034]|0)>>>0){aT()}p=k+12|0;if((c[p>>2]|0)!=(b|0)){aT()}s=u+8|0;if((c[s>>2]|0)==(b|0)){c[p>>2]=u;c[s>>2]=k;E=u;break}else{aT()}}}while(0);if((f|0)==0){break}u=a+(h+20|0)|0;v=5244424+(c[u>>2]<<2)|0;do{if((b|0)==(c[v>>2]|0)){c[v>>2]=E;if((E|0)!=0){break}c[1311031]=c[1311031]&(1<<c[u>>2]^-1);break L1683}else{if(f>>>0<(c[1311034]|0)>>>0){aT()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L1683}}}while(0);if(E>>>0<(c[1311034]|0)>>>0){aT()}c[E+24>>2]=f;b=c[a+(h+8|0)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[1311034]|0)>>>0){aT()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12|0)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[1311034]|0)>>>0){aT()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=C|1;c[d+C>>2]=C;if((q|0)!=(c[1311035]|0)){H=C;break}c[1311032]=C;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);if(H>>>0<256){r=H>>>2&1073741822;d=5244160+(r<<2)|0;e=c[1311030]|0;A=1<<(H>>>3);do{if((e&A|0)==0){c[1311030]=e|A;I=d;J=5244160+(r+2<<2)|0}else{E=5244160+(r+2<<2)|0;h=c[E>>2]|0;if(h>>>0>=(c[1311034]|0)>>>0){I=h;J=E;break}aT()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=d;return}d=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}J=(I+1048320|0)>>>16&8;r=I<<J;A=(r+520192|0)>>>16&4;e=r<<A;r=(e+245760|0)>>>16&2;E=(14-(A|J|r)|0)+(e<<r>>>15)|0;K=H>>>((E+7|0)>>>0)&1|E<<1}}while(0);I=5244424+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;E=c[1311031]|0;r=1<<K;do{if((E&r|0)==0){c[1311031]=E|r;c[I>>2]=d;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}e=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(e>>>31<<2)|0;A=c[M>>2]|0;if((A|0)==0){N=1468;break}else{e=e<<1;J=A}}if((N|0)==1468){if(M>>>0<(c[1311034]|0)>>>0){aT()}else{c[M>>2]=d;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}e=J+8|0;C=c[e>>2]|0;A=c[1311034]|0;if(J>>>0<A>>>0){aT()}if(C>>>0<A>>>0){aT()}else{c[C+12>>2]=d;c[e>>2]=d;c[q+8>>2]=C;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[1311038]|0)-1|0;c[1311038]=q;if((q|0)==0){O=5244576}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[1311038]=-1;return}function hD(a){a=a|0;return 5244104}function hE(a){a=a|0;return}function hF(a){a=a|0;if((a|0)!=0){hC(a)}return}function hG(a){a=a|0;hF(a);return}function hH(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;do{if((c[1310720]|0)==0){b=aR(8)|0;if((b-1&b|0)==0){c[1310722]=b;c[1310721]=b;c[1310723]=-1;c[1310724]=2097152;c[1310725]=0;c[1311141]=0;c[1310720]=be(0)&-16^1431655768;break}else{aT();return 0}}}while(0);if(a>>>0>=4294967232){d=0;e=d&1;return e|0}b=c[1311036]|0;if((b|0)==0){d=0;e=d&1;return e|0}f=c[1311033]|0;do{if(f>>>0>(a+40|0)>>>0){g=c[1310722]|0;h=_(((((((-40-a|0)-1|0)+f|0)+g|0)>>>0)/(g>>>0)>>>0)-1|0,g);i=b;j=5244568;while(1){k=c[j>>2]|0;if(k>>>0<=i>>>0){if((k+(c[j+4>>2]|0)|0)>>>0>i>>>0){l=j;break}}k=c[j+8>>2]|0;if((k|0)==0){l=0;break}else{j=k}}if((c[l+12>>2]&8|0)!=0){break}j=a8(0)|0;i=l+4|0;if((j|0)!=((c[l>>2]|0)+(c[i>>2]|0)|0)){break}k=a8(-(h>>>0>2147483646?-2147483648-g|0:h)|0)|0;m=a8(0)|0;if(!((k|0)!=-1&m>>>0<j>>>0)){break}k=j-m|0;if((j|0)==(m|0)){break}c[i>>2]=(c[i>>2]|0)-k|0;c[1311138]=(c[1311138]|0)-k|0;i=c[1311036]|0;n=(c[1311033]|0)-k|0;k=i;o=i+8|0;if((o&7|0)==0){p=0}else{p=-o&7}o=n-p|0;c[1311036]=k+p|0;c[1311033]=o;c[k+(p+4|0)>>2]=o|1;c[k+(n+4|0)>>2]=40;c[1311037]=c[1310724]|0;d=(j|0)!=(m|0);e=d&1;return e|0}}while(0);if((c[1311033]|0)>>>0<=(c[1311037]|0)>>>0){d=0;e=d&1;return e|0}c[1311037]=-1;d=0;e=d&1;return e|0}function hI(a){a=a|0;var b=0,d=0,e=0;b=(a|0)==0?1:a;while(1){d=hB(b)|0;if((d|0)!=0){e=1552;break}a=(A=c[1311356]|0,c[1311356]=A+0,A);if((a|0)==0){break}bN[a&1023]()}if((e|0)==1552){return d|0}d=a$(4)|0;c[d>>2]=5244600;aS(d|0,5245232,638);return 0}function hJ(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2]|0;b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function hK(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function hL(b){b=b|0;var c=0;c=b;while(a[c]|0!=0){c=c+1|0}return c-b|0}function hM(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;bg[a&1023](b|0,c|0,d|0,e|0,f|0)}function hN(a,b,c){a=a|0;b=b|0;c=+c;bh[a&1023](b|0,+c)}function hO(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;return bi[a&1023](b|0,+c,+d,+e,+f,+g,+h)|0}function hP(a,b){a=a|0;b=b|0;bj[a&1023](b|0)}function hQ(a,b,c){a=a|0;b=b|0;c=c|0;bk[a&1023](b|0,c|0)}function hR(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;return bl[a&1023](b|0,+c,+d,+e,+f)|0}function hS(a,b){a=a|0;b=b|0;return bm[a&1023](b|0)|0}function hT(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;return bn[a&1023](b|0,+c,+d)|0}function hU(a,b,c){a=a|0;b=+b;c=+c;return+bo[a&1023](+b,+c)}function hV(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return bp[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0)|0}function hW(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;return bq[a&1023](b|0,+c,d|0)|0}function hX(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;k=+k;l=+l;m=+m;n=+n;o=+o;p=+p;q=+q;r=+r;return br[a&1023](b|0,+c,+d,+e,+f,+g,+h,+i,+j,+k,+l,+m,+n,+o,+p,+q,+r)|0}function hY(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=+e;return bs[a&1023](b|0,+c,+d,+e)|0}function hZ(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;return+bt[a&1023](+b,+c,+d)}function h_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return bu[a&1023](b|0,c|0,d|0)|0}function h$(a,b,c,d,e,f,g,h,i,j){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;return bv[a&1023](+b,+c,+d,+e,+f,+g,+h,+i,+j)|0}function h0(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;k=+k;l=+l;m=+m;n=+n;o=+o;p=+p;q=+q;return bw[a&1023](+b,+c,+d,+e,+f,+g,+h,+i,+j,+k,+l,+m,+n,+o,+p,+q)|0}function h1(a,b,c,d,e,f){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;return+bx[a&1023](+b,+c,+d,+e,+f)}function h2(a,b,c){a=a|0;b=b|0;c=c|0;return+by[a&1023](b|0,c|0)}function h3(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return bz[a&1023](b|0,c|0,+d)|0}function h4(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return+bA[a&1023](b|0,c|0,d|0)}function h5(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return bB[a&1023](b|0,c|0,d|0,e|0,f|0,g|0)|0}function h6(a,b,c){a=a|0;b=b|0;c=+c;return bC[a&1023](b|0,+c)|0}function h7(a,b){a=a|0;b=+b;return+bD[a&1023](+b)}function h8(a,b){a=a|0;b=b|0;return+bE[a&1023](b|0)}function h9(a,b,c){a=a|0;b=b|0;c=c|0;return bF[a&1023](b|0,c|0)|0}function ia(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;bG[a&1023](b|0,c|0,d|0,e|0,f|0,g|0)}function ib(a){a=a|0;return+bH[a&1023]()}function ic(a){a=a|0;return bI[a&1023]()|0}function id(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;k=+k;return bJ[a&1023](b|0,+c,+d,+e,+f,+g,+h,+i,+j,+k)|0}function ie(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return bK[a&1023](b|0,c|0,d|0,e|0)|0}function ig(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;return bL[a&1023](+b,+c,+d)|0}function ih(a,b,c){a=a|0;b=+b;c=+c;return bM[a&1023](+b,+c)|0}function ii(a){a=a|0;bN[a&1023]()}function ij(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;return bO[a&1023](+b,+c,+d,+e)|0}function ik(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;bP[a&1023](b|0,c|0,d|0,e|0)}function il(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;$(0)}function im(a,b){a=a|0;b=+b;$(1)}function io(a,b,c,d,e,f,g){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;$(2);return 0}function ip(a){a=a|0;$(3)}function iq(a,b){a=a|0;b=b|0;$(4)}function ir(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;$(5);return 0}function is(a){a=a|0;$(6);return 0}function it(a,b,c){a=a|0;b=+b;c=+c;$(7);return 0}function iu(a,b){a=+a;b=+b;$(8);return 0.0}function iv(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;$(9);return 0}function iw(a,b,c){a=a|0;b=+b;c=c|0;$(10);return 0}function ix(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;k=+k;l=+l;m=+m;n=+n;o=+o;p=+p;q=+q;$(11);return 0}function iy(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;$(12);return 0}function iz(a,b,c){a=+a;b=+b;c=+c;$(13);return 0.0}function iA(a,b,c){a=a|0;b=b|0;c=c|0;$(14);return 0}function iB(a,b,c,d,e,f,g,h,i){a=+a;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;$(15);return 0}function iC(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){a=+a;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;k=+k;l=+l;m=+m;n=+n;o=+o;p=+p;$(16);return 0}function iD(a,b,c,d,e){a=+a;b=+b;c=+c;d=+d;e=+e;$(17);return 0.0}function iE(a,b){a=a|0;b=b|0;$(18);return 0.0}function iF(a,b,c){a=a|0;b=b|0;c=+c;$(19);return 0}function iG(a,b,c){a=a|0;b=b|0;c=c|0;$(20);return 0.0}function iH(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;$(21);return 0}function iI(a,b){a=a|0;b=+b;$(22);return 0}function iJ(a){a=+a;$(23);return 0.0}function iK(a){a=a|0;$(24);return 0.0}function iL(a,b){a=a|0;b=b|0;$(25);return 0}function iM(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;$(26)}function iN(){$(27);return 0.0}function iO(){$(28);return 0}function iP(a,b,c,d,e,f,g,h,i,j){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;h=+h;i=+i;j=+j;$(29);return 0}function iQ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$(30);return 0}function iR(a,b,c){a=+a;b=+b;c=+c;$(31);return 0}function iS(a,b){a=+a;b=+b;$(32);return 0}function iT(){$(33)}function iU(a,b,c,d){a=+a;b=+b;c=+c;d=+d;$(34);return 0}function iV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$(35)}
// EMSCRIPTEN_END_FUNCS
var bg=[il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,hz,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,hw,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il,il];var bh=[im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,dI,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,eB,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,dN,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,dJ,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,eE,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,eG,im,im,im,im,im,im,im,im,im,im,im,im,im,dD,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,cV,im,im,im,dz,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,fh,im,im,im,im,im,dK,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,eC,im,im,im,im,im,im,im,cM,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,cL,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,dC,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,dw,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,es,im,im,im,im,im,im,im,im,im,im,im,dB,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im,im];var bi=[io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,gg,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,gb,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io,io];var bj=[ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,gv,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,eM,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,hl,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ea,ip,ip,ip,ip,ip,ip,ip,ip,ip,hg,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,fD,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,dR,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,hp,ip,gG,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,eV,ip,d0,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,de,ip,ip,ip,gH,ip,ip,ip,fY,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,gF,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ec,ip,ip,ip,ip,ip,ip,ip,hG,ip,ip,ip,ip,ip,hs,ip,ip,ip,ip,ip,ip,ip,dU,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,eP,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,d5,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,gE,ip,ip,ip,ip,ip,ip,ip,fp,ip,hb,ip,ip,ip,ip,ip,eS,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,hE,ip,ip,ip,ip,ip,ip,ip,ip,ip,ht,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip,ip];var bk=[iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,fS,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,eu,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,fM,iq,iq,iq,g2,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,e5,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,el,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,g0,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,ek,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq,iq];var bl=[ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ev,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,fc,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,gV,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir,ir];var bm=[is,is,is,is,dX,is,gU,is,is,is,is,is,is,is,is,is,is,is,is,is,eJ,is,is,is,is,is,is,is,ei,is,is,is,is,is,is,is,ge,is,is,is,is,is,he,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,c8,is,is,is,is,is,is,is,is,is,is,is,fL,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,fO,is,is,is,is,is,fX,is,is,is,is,is,gZ,is,is,is,gk,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,dc,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,ej,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,f2,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,g3,is,is,is,is,is,is,is,is,is,is,is,is,is,fW,is,is,is,g$,is,ez,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,e$,is,is,is,is,is,is,is,e9,is,is,is,is,is,is,is,is,is,e7,is,is,is,is,is,is,is,hD,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,fw,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,gA,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,fn,is,is,is,is,is,is,is,d3,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,fB,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,er,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,e2,is,is,is,is,is,is,is,is,is,is,is,cJ,is,is,is,is,is,is,is,is,is,is,is,g1,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,dZ,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,eq,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,eZ,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,dy,is,is,is,is,is,fv,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is];var bn=[it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,dh,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it,it];var bo=[iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,gK,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,gD,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu,iu];var bp=[iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,dl,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv,iv];var bq=[iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,em,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw,iw];var br=[ix,ix,ix,ix,ix,ix,ix,ix,fU,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix,ix];var bs=[iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,fV,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,cC,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,f8,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,du,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy,iy];var bt=[iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,gJ,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,gM,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,gI,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz,iz];var bu=[iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,eD,iA,iA,iA,iA,iA,c0,iA,iA,iA,iA,iA,go,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,gw,iA,iA,iA,iA,iA,ct,iA,fi,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,hu,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,e6,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,f1,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,fk,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,cI,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,ds,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,cS,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,c3,iA,iA,iA,dO,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA,iA];var bv=[iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,hk,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB,iB];var bw=[iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,g8,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC,iC];var bx=[iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,gL,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD,iD];var by=[iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,cX,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,c9,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,dj,iE,cQ,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,fg,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,f0,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,ff,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE,iE];var bz=[iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,e3,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,gt,iF,iF,iF,iF,iF,iF,iF,iF,iF,eY,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,dk,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,e_,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,cP,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,gj,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF,iF];var bA=[iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,eI,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG,iG];var bB=[iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,dW,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH,iH];var bC=[iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gs,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gd,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,c6,iI,iI,iI,iI,iI,iI,iI,cH,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gY,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,cZ,iI,iI,iI,iI,iI,iI,iI,gl,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gn,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gr,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,fo,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gm,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,fz,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,dd,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,gq,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI,iI];var bD=[iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,gy,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,gC,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,gB,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ,iJ];var bE=[iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,eA,iK,iK,iK,iK,iK,dA,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,et,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dM,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,gc,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,fq,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,df,iK,iK,iK,iK,iK,iK,iK,iK,iK,gW,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,g6,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dE,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,ep,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dL,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dq,iK,iK,iK,cT,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dv,iK,iK,iK,iK,iK,eF,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,fa,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,ef,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,cF,iK,ey,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,ex,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dG,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,cD,iK,iK,iK,iK,iK,cW,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dF,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,dH,iK,iK,iK,iK,iK,iK,iK,iK,iK,c7,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,ew,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK,iK];var bF=[iL,iL,da,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,gh,iL,fK,iL,fG,iL,iL,iL,c2,iL,f4,iL,gf,iL,iL,iL,gT,iL,iL,iL,iL,iL,iL,iL,iL,iL,dP,iL,iL,iL,iL,iL,eb,iL,iL,iL,iL,iL,fR,iL,dY,iL,iL,iL,cp,iL,iL,iL,dg,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,e4,iL,iL,iL,iL,iL,iL,iL,iL,iL,f$,iL,iL,iL,d4,iL,eg,iL,fQ,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,dr,iL,di,iL,iL,iL,hr,iL,iL,iL,fA,iL,iL,iL,iL,iL,iL,iL,gN,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,cO,iL,iL,iL,fZ,iL,fe,iL,iL,iL,dn,iL,iL,iL,iL,iL,fJ,iL,iL,iL,db,iL,ho,iL,iL,iL,c_,iL,iL,iL,iL,iL,iL,iL,iL,iL,cG,iL,iL,iL,iL,iL,iL,iL,iL,iL,fs,iL,iL,iL,iL,iL,ft,iL,iL,iL,cn,iL,iL,iL,iL,iL,cm,iL,iL,iL,iL,iL,iL,iL,iL,iL,gP,iL,b3,iL,iL,iL,g_,iL,iL,iL,iL,iL,fb,iL,iL,iL,iL,iL,cY,iL,iL,iL,iL,iL,iL,iL,iL,iL,eO,iL,ha,iL,f9,iL,iL,iL,eh,iL,iL,iL,gu,iL,fd,iL,iL,iL,dp,iL,en,iL,eU,iL,iL,iL,d$,iL,iL,iL,iL,iL,fF,iL,iL,iL,iL,iL,iL,iL,c$,iL,iL,iL,iL,iL,cU,iL,iL,iL,c1,iL,iL,iL,fl,iL,gR,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,cs,iL,gO,iL,f7,iL,iL,iL,iL,iL,iL,iL,fE,iL,iL,iL,cE,iL,iL,iL,iL,iL,iL,iL,iL,iL,hd,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,eo,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,cr,iL,dx,iL,iL,iL,gp,iL,iL,iL,gQ,iL,iL,iL,iL,iL,iL,iL,hh,iL,ee,iL,eR,iL,iL,iL,iL,iL,d7,iL,iL,iL,iL,iL,dQ,iL,fT,iL,iL,iL,iL,iL,fI,iL,iL,iL,iL,iL,iL,iL,iL,iL,gS,iL,iL,iL,iL,iL,fN,iL,iL,iL,iL,iL,iL,iL,iL,iL,fm,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,co,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,dT,iL,iL,iL,cN,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,hi,iL,fr,iL,iL,iL,iL,iL,eL,iL,iL,iL,iL,iL,gi,iL,d_,iL,iL,iL,iL,iL,iL,iL,b2,iL,iL,iL,iL,iL,cK,iL,iL,iL,iL,iL,iL,iL,f3,iL,iL,iL,e8,iL,dm,iL,fH,iL,iL,iL,ga,iL,iL,iL,iL,iL,iL,iL,iL,iL,fP,iL,iL,iL,gx,iL,fu,iL,b9,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,fx,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,fj,iL,iL,iL,eH,iL,iL,iL,iL,iL,cu,iL,iL,iL,dt,iL,iL,iL,iL,iL,cq,iL,iL,iL,iL,iL,hf,iL,iL,iL,iL,iL,ca,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,gz,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,eX,iL,cB,iL,iL,iL,cR,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL,iL];var bG=[iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,hx,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,hA,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM,iM];var bH=[iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,hm,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN,iN];var bI=[iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,ed,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,hn,iO,iO,iO,hc,iO,iO,iO,iO,iO,iO,iO,d8,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,f_,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,dV,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,hj,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,c4,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,eQ,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,d1,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,g7,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,dS,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,eW,iO,iO,iO,iO,iO,iO,iO,iO,iO,d6,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,eK,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,fy,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,e0,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,hq,iO,iO,iO,iO,iO,iO,iO,iO,iO,eT,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO,iO];var bJ=[iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,gX,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP,iP];var bK=[iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,eN,iQ,iQ,iQ,iQ,iQ,iQ,iQ,f6,iQ,iQ,iQ,fC,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,f5,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,g5,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,g9,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ,iQ];var bL=[iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,c5,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,d2,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR,iR];var bM=[iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,d9,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS,iS];var bN=[iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT,iT];var bO=[iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,e1,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU,iU];var bP=[iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,hv,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,g4,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV,iV];return{_emscripten_bind_Vector3__getScaleFromMatrix_p1:da,_emscripten_bind_Matrix3__getInverse_p1:hi,_strlen:hL,_emscripten_bind_Matrix4__set_p16:fU,_emscripten_bind_UV__UV_p0:ed,_emscripten_bind_Line3____destroy___p0:eM,_emscripten_bind_Vector4__set_w_p1:dI,_emscripten_bind_Box3__get_min_p0:fO,_emscripten_bind_Line3__clone_p0:eJ,_emscripten_bind_Matrix4__setPosition_p1:gh,_emscripten_bind_Box3__translate_p1:fK,_emscripten_bind_Line3__get_end_p0:ei,_emscripten_bind_Vector3__applyProjection_p1:c2,_emscripten_bind_Matrix4__extractRotation_p1:f4,_emscripten_bind_Matrix4__transpose_p0:ge,_emscripten_bind_Frustum____destroy___p0:dU,_emscripten_bind_MATH__MATH_p0:hn,_emscripten_bind_Matrix3__clone_p0:he,_emscripten_bind_Ray__Ray_p0:hc,_emscripten_bind_Quaternion__set_p4:ev,_emscripten_bind_Box3__expandByScalar_p1:fo,_emscripten_bind_Vector3__get_p1:cX,_emscripten_bind_Vector3__length_p0:df,_emscripten_bind_Vector2__Vector2_p0:d8,_emscripten_bind_UV__instanceOf_p1:eb,_emscripten_bind_Sphere__get_radius_p0:et,_emscripten_bind_Quaternion__slerp_p2:e_,_emscripten_bind_Line3__set_end_p1:ek,_emscripten_bind_Plane__set_p2:e3,_emscripten_bind_Color__set_r_p1:dz,_emscripten_bind_Matrix4__makeRotationZ_p1:gs,_emscripten_bind_Frustum__intersectsObject_p1:dg,_memcpy:hJ,_emscripten_bind_Line3__Line3_p2:eL,_emscripten_bind_Quaternion__multiplyQuaternions_p2:eD,_emscripten_bind_Matrix4__Matrix4_p0:g7,_emscripten_bind_Vector3__get_z_p0:cF,_emscripten_bind_Quaternion__set_z_p1:eB,_emscripten_bind_Quaternion__copy_p1:e4,_emscripten_bind_Matrix4__multiplyMatrices_p2:go,_emscripten_bind_Box3__empty_p0:fL,_emscripten_bind_Matrix4__determinant_p0:gc,_emscripten_bind_Matrix4__multiplyScalar_p1:gd,_emscripten_bind_Box3__Box3_p2:f$,_emscripten_bind_Matrix4__instanceOf_p1:f3,_emscripten_bind_Box3__Box3_p0:f_,_emscripten_bind_Vector4__instanceOf_p1:d4,_emscripten_bind_Vector3__cross_p1:cU,_emscripten_bind_Quaternion__Quaternion_p0:e0,_emscripten_bind_Box3__copy_p1:fQ,_emscripten_bind_Color__get_b_p0:dA,_emscripten_bind_Matrix4____destroy___p0:gv,_emscripten_bind_Box3__makeEmpty_p0:fX,_emscripten_bind_Matrix4__makeRotationAxis_p2:gt,_emscripten_bind_Vector3__addScalar_p1:cH,_emscripten_bind_Matrix3__transpose_p0:gZ,_emscripten_bind_Quaternion__length_p0:fq,_emscripten_bind_Frustum__clone_p0:dX,_emscripten_bind_Matrix4__invert_p0:gk,_emscripten_bind_Quaternion__setFromAxisAngle_p2:eY,_emscripten_bind_Color__copyGammaToLinear_p1:dr,_emscripten_bind_Vector3__applyQuaternion_p1:di,_emscripten_bind_Vector2__set_y_p1:dN,_emscripten_bind_Box2__Box2_p2:hr,_emscripten_bind_Box2__Box2_p0:hq,_free:hC,_emscripten_bind_Frustum__Frustum_p0:dV,_emscripten_bind_Box3__setFromPoints_p1:fG,_emscripten_bind_MATH__clampBottom_p2:gK,_emscripten_bind_Box3__set_p2:fi,_emscripten_bind_Matrix4__setRotationFromEuler_p2:gw,_emscripten_bind_Matrix4__compose_p3:g5,_emscripten_bind_Matrix3__determinant_p0:gW,_emscripten_bind_Vector3__clamp_p2:ct,_emscripten_bind_Matrix4__makeScale_p3:fV,_emscripten_bind_Vector3__setFromChar_p2:dk,_emscripten_bind_Vector3__min_p1:cO,_emscripten_bind_Matrix3__Matrix3_p0:hj,_emscripten_bind_Plane__isIntersectionLine_p1:fe,_emscripten_bind_Vector4__set_y_p1:dC,_emscripten_bind_Matrix4__getMaxScaleOnAxis_p0:g6,_emscripten_bind_Frustum__setFromMatrix_p1:dY,_emscripten_bind_Vector3__clone_p0:dc,_emscripten_bind_Box2____destroy___p0:hp,_emscripten_bind_Matrix3__multiplyScalar_p1:gY,_emscripten_bind_Vector3__transformDirection_p1:db,_emscripten_bind_Box2__instanceOf_p1:ho,_emscripten_bind_MATH____destroy___p0:hl,_emscripten_bind_Vector3__equals_p1:c_,_emscripten_bind_MATH__sign_p1:gA,_emscripten_bind_Matrix4__makeTranslation_p3:f8,_emscripten_bind_Matrix4__Matrix4_p16:g8,_emscripten_bind_Vector4__get_x_p0:dE,_emscripten_bind_Vector3__getPositionFromMatrix_p1:cG,_emscripten_bind_Vector4__set_x_p1:dJ,_emscripten_bind_MATH__smoothstep_p3:gJ,_emscripten_bind_Line3__closestPointToPoint_p3:eN,_emscripten_bind_Line3__get_start_p0:ej,_emscripten_bind_Plane__instanceOf_p1:fs,_emscripten_bind_Vector2____destroy___p0:ea,_emscripten_bind_Matrix4__multiplyToArray_p3:f6,_emscripten_bind_Plane__applyMatrix4_p1:ft,_emscripten_bind_Matrix4__clone_p0:f2,_emscripten_bind_Color__set_b_p1:dw,_emscripten_bind_Matrix3____destroy___p0:hg,_emscripten_bind_Line3__distanceSquared_p0:ep,_emscripten_bind_Vector3____destroy___p0:de,_emscripten_bind_Vector3__addVectors_p2:c0,_emscripten_bind_Box3__set_max_p1:fS,_emscripten_bind_Matrix4__extractPosition_p1:gf,_emscripten_bind_Box3__setFromCenterAndSize_p2:f1,_emscripten_bind_Matrix3__copy_p1:g_,_emscripten_bind_Quaternion__set_w_p1:eC,_emscripten_bind_Quaternion__set_y_p1:eG,_emscripten_bind_Plane__equals_p1:fb,_emscripten_bind_MATH__randDouble_p2:gD,_emscripten_bind_Color__get_r_p0:dq,_emscripten_bind_Vector3__max_p1:cY,_emscripten_bind_Vector3__get_y_p0:cT,_emscripten_bind_Vector4__set_z_p1:dD,_emscripten_bind_MATH__randDoubleSpread_p1:gy,_emscripten_bind_Vertex__instanceOf_p1:eO,_emscripten_bind_Box3__distanceToPoint_p1:f0,_emscripten_bind_Matrix4__setRotationFromQuaternion_p1:f9,_emscripten_bind_Triangle____destroy___p0:dR,_emscripten_bind_Line3__equals_p1:eh,_emscripten_bind_Box2__get_min_p0:g3,_emscripten_bind_Matrix4__crossVector_p1:gu,_emscripten_bind_Plane__copy_p1:fd,_emscripten_bind_Sphere__set_center_p1:eu,_emscripten_bind_Frustum__intersectsSphere_p1:dp,_emscripten_bind_Line3__delta_p1:en,_emscripten_bind_Sphere__instanceOf_p1:eU,_emscripten_bind_Box3__clone_p0:fW,_emscripten_bind_Color__set_p1:d$,_emscripten_bind_Matrix3__identity_p0:g$,_emscripten_bind_Quaternion__conjugate_p0:ez,_emscripten_bind_Box3__applyMatrix4_p1:fF,_emscripten_bind_Color__addColors_p2:ds,_emscripten_bind_Vector3__multiplyScalar_p1:cZ,_emscripten_bind_Vector3__distanceToSquared_p1:cQ,_emscripten_bind_Vector3__distanceTo_p1:c9,_emscripten_bind_Matrix4__rotateX_p1:gl,_emscripten_bind_MATH__random16_p0:hm,_emscripten_bind_Sphere__getCenter_p0:eq,_emscripten_bind_Plane__orthoPoint_p1:fu,_emscripten_bind_Quaternion____destroy___p0:fp,_emscripten_bind_Plane__setFromCoplanerPoints_p3:fC,_emscripten_bind_Color__add_p1:dt,_emscripten_bind_Vector2__get_x_p0:dL,_emscripten_bind_Quaternion__inverse_p0:e$,_emscripten_bind_Vector2__set_p2:dh,_emscripten_bind_Color__get_g_p0:dv,_emscripten_bind_Plane__get_normal_p0:e9,_emscripten_bind_Quaternion__lengthSquared_p0:eF,_emscripten_bind_Box3__isIntersectionBox_p1:fl,_emscripten_bind_Matrix4__scale_p1:f7,_emscripten_bind_Plane__negate_p0:e7,_emscripten_bind_Plane__projectPoint_p1:fA,_emscripten_bind_Color__Color_p0:d1,_emscripten_bind_Box3__instanceOf_p1:fE,_emscripten_bind_Vector3__divide_p1:cE,_emscripten_bind_Plane__get_constant_p0:fa,_emscripten_bind_Box3__set_min_p1:fM,_emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2:e6,_emscripten_bind_Box2__set_max_p1:g2,_emscripten_bind_Box3__containsBox_p1:fJ,_emscripten_bind_Sphere__Sphere_p0:eW,_emscripten_bind_Plane__distanceToPoint_p1:fg,_emscripten_bind_Quaternion__get_x_p0:eA,_emscripten_bind_Line3__Line3_p0:eK,_emscripten_bind_Vector3__set_x_p1:cV,_emscripten_bind_MATH__mapLinear_p5:gL,_emscripten_bind_Ray__instanceOf_p1:ha,_emscripten_bind_Line3__copy_p1:eo,_emscripten_bind_Vertex__Vertex_p0:eQ,_emscripten_bind_Vector3__lerp_p2:cP,_emscripten_bind_Matrix4__lookAt_p3:f5,_emscripten_bind_Plane__normalize_p0:fw,_emscripten_bind_Vector3__set_p3:cC,_emscripten_bind_Sphere____destroy___p0:eV,_emscripten_bind_Color____destroy___p0:d0,_memset:hK,_emscripten_bind_Matrix4__rotateZ_p1:gn,_emscripten_bind_Matrix3__Matrix3_p9:hk,_emscripten_bind_Plane__set_constant_p1:fh,_emscripten_bind_Matrix4__makeFrustum_p6:gg,_emscripten_bind_Color__copy_p1:dx,_emscripten_bind_Vector2__set_x_p1:dK,_emscripten_bind_Matrix4__getInverse_p1:gp,_emscripten_bind_Vector3__Vector3_p0:c4,_emscripten_bind_Box3__getBoundingSphere_p1:fZ,_emscripten_bind_Matrix4__makeRotationX_p1:gr,_emscripten_bind_MATH__degToRad_p1:gC,_emscripten_bind_Vector3__Vector3_p3:c5,_emscripten_bind_Matrix3__getNormalMatrix_p1:hh,_emscripten_bind_Line3__instanceOf_p1:ee,_emscripten_bind_Spline__instanceOf_p1:eR,_emscripten_bind_Box3__get_max_p0:fn,_emscripten_bind_MATH__smootherstep_p3:gM,_emscripten_bind_Vector2__instanceOf_p1:d7,_emscripten_bind_Triangle__Triangle_p0:dS,_emscripten_bind_Color__clone_p0:d3,_emscripten_bind_Triangle__instanceOf_p1:dQ,_emscripten_bind_Matrix4__translate_p1:ga,_emscripten_bind_Plane__coplanerPoint_p0:fv,_emscripten_bind_Plane__set_normal_p1:e5,_emscripten_bind_Line3__distance_p0:ef,_emscripten_bind_Box3__intersect_p1:fI,_emscripten_bind_Line3__closestPointToPointParameter_p2:eI,_emscripten_bind_Plane__clone_p0:fB,_emscripten_bind_Box3__equals_p1:fN,_emscripten_bind_Vector2__get_y_p0:dM,_emscripten_bind_Quaternion__get_w_p0:ey,_emscripten_bind_Vector4__Vector4_p0:d6,_emscripten_bind_Matrix4__makePerspective_p4:gV,_emscripten_bind_Box3__size_p1:fm,_emscripten_bind_Plane____destroy___p0:fD,_emscripten_bind_Box2__get_max_p0:g1,_emscripten_bind_Matrix3__transposeIntoArray_p1:gx,_emscripten_bind_Line3__at_p2:em,_emscripten_bind_Vector3__applyMatrix3_p1:cu,_emscripten_bind_Box3____destroy___p0:fY,_emscripten_bind_Quaternion__clone_p0:e2,_emscripten_bind_Matrix4__rotateByAxis_p2:gj,_emscripten_bind_Frustum__instanceOf_p1:dT,_malloc:hB,_emscripten_bind_Quaternion__get_z_p0:ex,_emscripten_bind_Vector3__sub_p1:cN,_emscripten_bind_Vector3__dot_p1:dj,_emscripten_bind_Vector3__negate_p0:cJ,_emscripten_bind_Matrix4__makeOrthographic_p6:gb,_emscripten_bind_Vector3__set_z_p1:cM,_emscripten_bind_Matrix4__decompose_p3:g9,_emscripten_bind_Vector3__multiply_p1:c$,_emscripten_bind_Quaternion__setFromRotationMatrix_p1:fr,_emscripten_bind_Matrix4__rotateY_p1:gm,_emscripten_bind_Vector4____destroy___p0:d5,_emscripten_bind_Vector4__get_z_p0:dG,_emscripten_bind_Line3__set_start_p1:el,_emscripten_bind_Frustum__Frustum_p6:dW,_emscripten_bind_Matrix4__copy_p1:gi,_emscripten_bind_Color__instanceOf_p1:d_,_emscripten_bind_UV____destroy___p0:ec,_emscripten_bind_MATH__radToDeg_p1:gB,_emscripten_bind_Frustum__copy_p1:dn,_emscripten_bind_MATH__clamp_p3:gI,_emscripten_bind_Vector3__applyMatrix4_p1:cK,_emscripten_bind_Box3__getParameter_p1:fH,_emscripten_bind_Quaternion__instanceOf_p1:eX,_emscripten_bind_Vector3__set_y_p1:cL,_emscripten_bind_Matrix3__set_p9:gX,_emscripten_bind_Plane__translate_p1:e8,_emscripten_bind_Frustum__containsPoint_p1:dm,_emscripten_bind_Line3__center_p1:dP,_emscripten_bind_Color__set_g_p1:dB,_emscripten_bind_Vector3__crossVectors_p2:cI,_emscripten_bind_Spline__Spline_p0:eT,_emscripten_bind_Box2__set_min_p1:g0,_emscripten_bind_Quaternion__get_y_p0:ew,_emscripten_bind_Color__convertLinearToGamma_p0:dZ,_emscripten_bind_Plane__Plane_p2:fz,_emscripten_bind_Box3__expandByVector_p1:fP,_emscripten_bind_Vector3__subVectors_p2:c3,_emscripten_bind_Quaternion__Quaternion_p4:e1,_emscripten_bind_Vector3__normalize_p0:c8,_emscripten_bind_Box3__clampPoint_p2:fk,_emscripten_bind_Vertex____destroy___p0:eP,_emscripten_bind_Line3__applyMatrix4_p1:eg,_emscripten_bind_Vector3__divideScalar_p1:c6,_emscripten_bind_Vector3__copy_p1:c1,_emscripten_bind_Color__Color_p3:d2,_emscripten_bind_Plane__intersectLine_p1:fx,_emscripten_bind_Vector3__get_x_p0:cD,_emscripten_bind_Vector3__lengthSquared_p0:cW,_emscripten_bind_Quaternion__set_x_p1:eE,_emscripten_bind_Box3__expandByPoint_p1:fj,_emscripten_bind_Box3__containsPoint_p1:fT,_emscripten_bind_Vector3__setLength_p1:dd,_emscripten_bind_Quaternion__equals_p1:eH,_emscripten_bind_Vector4__get_y_p0:dF,_emscripten_bind_Ray__Ray_p2:hd,_emscripten_bind_Ray____destroy___p0:hb,_emscripten_bind_Vector2__Vector2_p2:d9,_emscripten_bind_Spline____destroy___p0:eS,_emscripten_bind_Matrix3__instanceOf_p1:hf,_emscripten_bind_Vector3__multiplyVectors_p2:cS,_emscripten_bind_Color__convertGammaToLinear_p0:dy,_emscripten_bind_Plane__setComponents_p4:fc,_emscripten_bind_Quaternion__normalize_p0:eZ,_emscripten_bind_Matrix4__makeRotationY_p1:gq,_emscripten_bind_Color__setRGB_p3:du,_emscripten_bind_Sphere__get_center_p0:er,_emscripten_bind_Box3__center_p1:fR,_emscripten_bind_Line3__set_p2:dO,_emscripten_bind_Vector4__get_w_p0:dH,_emscripten_bind_Matrix4__identity_p0:gU,_emscripten_bind_Frustum__set_p6:dl,_emscripten_bind_Sphere__set_radius_p1:es,_emscripten_bind_Plane__Plane_p0:fy,_emscripten_bind_Vector3__instanceOf_p1:cB,_emscripten_bind_Plane__distanceToSphere_p1:ff,_emscripten_bind_Vector3__add_p1:cR,_emscripten_bind_MATH__randInt_p2:gz,_emscripten_bind_Vector3__lengthManhattan_p0:c7,stackAlloc:bQ,stackSave:bR,stackRestore:bS,setThrew:bT,setTempRet0:bU,setTempRet1:bV,setTempRet2:bW,setTempRet3:bX,setTempRet4:bY,setTempRet5:bZ,setTempRet6:b_,setTempRet7:b$,setTempRet8:b0,setTempRet9:b1,dynCall_viiiii:hM,dynCall_vif:hN,dynCall_iiffffff:hO,dynCall_vi:hP,dynCall_vii:hQ,dynCall_iiffff:hR,dynCall_ii:hS,dynCall_iiff:hT,dynCall_fff:hU,dynCall_iiiiiiii:hV,dynCall_iifi:hW,dynCall_iiffffffffffffffff:hX,dynCall_iifff:hY,dynCall_ffff:hZ,dynCall_iiii:h_,dynCall_ifffffffff:h$,dynCall_iffffffffffffffff:h0,dynCall_ffffff:h1,dynCall_fii:h2,dynCall_iiif:h3,dynCall_fiii:h4,dynCall_iiiiiii:h5,dynCall_iif:h6,dynCall_ff:h7,dynCall_fi:h8,dynCall_iii:h9,dynCall_viiiiii:ia,dynCall_f:ib,dynCall_i:ic,dynCall_iifffffffff:id,dynCall_iiiii:ie,dynCall_ifff:ig,dynCall_iff:ih,dynCall_v:ii,dynCall_iffff:ij,dynCall_viiii:ik}})
// EMSCRIPTEN_END_ASM
({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, { abort: abort, assert: assert, asmPrintInt: asmPrintInt, asmPrintFloat: asmPrintFloat, copyTempDouble: copyTempDouble, copyTempFloat: copyTempFloat, min: Math_min, invoke_viiiii: invoke_viiiii, invoke_vif: invoke_vif, invoke_iiffffff: invoke_iiffffff, invoke_vi: invoke_vi, invoke_vii: invoke_vii, invoke_iiffff: invoke_iiffff, invoke_ii: invoke_ii, invoke_iiff: invoke_iiff, invoke_fff: invoke_fff, invoke_iiiiiiii: invoke_iiiiiiii, invoke_iifi: invoke_iifi, invoke_iiffffffffffffffff: invoke_iiffffffffffffffff, invoke_iifff: invoke_iifff, invoke_ffff: invoke_ffff, invoke_iiii: invoke_iiii, invoke_ifffffffff: invoke_ifffffffff, invoke_iffffffffffffffff: invoke_iffffffffffffffff, invoke_ffffff: invoke_ffffff, invoke_fii: invoke_fii, invoke_iiif: invoke_iiif, invoke_fiii: invoke_fiii, invoke_iiiiiii: invoke_iiiiiii, invoke_iif: invoke_iif, invoke_ff: invoke_ff, invoke_fi: invoke_fi, invoke_iii: invoke_iii, invoke_viiiiii: invoke_viiiiii, invoke_f: invoke_f, invoke_i: invoke_i, invoke_iifffffffff: invoke_iifffffffff, invoke_iiiii: invoke_iiiii, invoke_ifff: invoke_ifff, invoke_iff: invoke_iff, invoke_v: invoke_v, invoke_iffff: invoke_iffff, invoke_viiii: invoke_viiii, _rand: _rand, _sysconf: _sysconf, ___cxa_throw: ___cxa_throw, _abort: _abort, _llvm_eh_exception: _llvm_eh_exception, _Infinity: _Infinity, _fabs: _fabs, _floor: _floor, ___setErrNo: ___setErrNo, _sqrt: _sqrt, ___cxa_find_matching_catch: ___cxa_find_matching_catch, ___cxa_allocate_exception: ___cxa_allocate_exception, _sin: _sin, _srand: _srand, _fmax: _fmax, ___resumeException: ___resumeException, ___cxa_is_number_type: ___cxa_is_number_type, ___cxa_does_inherit: ___cxa_does_inherit, __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv, _cos: _cos, _sbrk: _sbrk, __ZNSt9exceptionD2Ev: __ZNSt9exceptionD2Ev, ___errno_location: ___errno_location, ___gxx_personality_v0: ___gxx_personality_v0, ___cxa_call_unexpected: ___cxa_call_unexpected, _llvm_trap: _llvm_trap, _time: _time, _acos: _acos, STACKTOP: STACKTOP, STACK_MAX: STACK_MAX, tempDoublePtr: tempDoublePtr, ABORT: ABORT, NaN: NaN, Infinity: Infinity, __ZTISt9exception: __ZTISt9exception, __ZTVN10__cxxabiv120__si_class_type_infoE: __ZTVN10__cxxabiv120__si_class_type_infoE, __ZTVN10__cxxabiv117__class_type_infoE: __ZTVN10__cxxabiv117__class_type_infoE }, buffer);
var _emscripten_bind_Vector3__getScaleFromMatrix_p1 = Module["_emscripten_bind_Vector3__getScaleFromMatrix_p1"] = asm._emscripten_bind_Vector3__getScaleFromMatrix_p1;
var _emscripten_bind_Matrix3__getInverse_p1 = Module["_emscripten_bind_Matrix3__getInverse_p1"] = asm._emscripten_bind_Matrix3__getInverse_p1;
var _strlen = Module["_strlen"] = asm._strlen;
var _emscripten_bind_Matrix4__set_p16 = Module["_emscripten_bind_Matrix4__set_p16"] = asm._emscripten_bind_Matrix4__set_p16;
var _emscripten_bind_UV__UV_p0 = Module["_emscripten_bind_UV__UV_p0"] = asm._emscripten_bind_UV__UV_p0;
var _emscripten_bind_Line3____destroy___p0 = Module["_emscripten_bind_Line3____destroy___p0"] = asm._emscripten_bind_Line3____destroy___p0;
var _emscripten_bind_Vector4__set_w_p1 = Module["_emscripten_bind_Vector4__set_w_p1"] = asm._emscripten_bind_Vector4__set_w_p1;
var _emscripten_bind_Box3__get_min_p0 = Module["_emscripten_bind_Box3__get_min_p0"] = asm._emscripten_bind_Box3__get_min_p0;
var _emscripten_bind_Line3__clone_p0 = Module["_emscripten_bind_Line3__clone_p0"] = asm._emscripten_bind_Line3__clone_p0;
var _emscripten_bind_Matrix4__setPosition_p1 = Module["_emscripten_bind_Matrix4__setPosition_p1"] = asm._emscripten_bind_Matrix4__setPosition_p1;
var _emscripten_bind_Box3__translate_p1 = Module["_emscripten_bind_Box3__translate_p1"] = asm._emscripten_bind_Box3__translate_p1;
var _emscripten_bind_Line3__get_end_p0 = Module["_emscripten_bind_Line3__get_end_p0"] = asm._emscripten_bind_Line3__get_end_p0;
var _emscripten_bind_Vector3__applyProjection_p1 = Module["_emscripten_bind_Vector3__applyProjection_p1"] = asm._emscripten_bind_Vector3__applyProjection_p1;
var _emscripten_bind_Matrix4__extractRotation_p1 = Module["_emscripten_bind_Matrix4__extractRotation_p1"] = asm._emscripten_bind_Matrix4__extractRotation_p1;
var _emscripten_bind_Matrix4__transpose_p0 = Module["_emscripten_bind_Matrix4__transpose_p0"] = asm._emscripten_bind_Matrix4__transpose_p0;
var _emscripten_bind_Frustum____destroy___p0 = Module["_emscripten_bind_Frustum____destroy___p0"] = asm._emscripten_bind_Frustum____destroy___p0;
var _emscripten_bind_MATH__MATH_p0 = Module["_emscripten_bind_MATH__MATH_p0"] = asm._emscripten_bind_MATH__MATH_p0;
var _emscripten_bind_Matrix3__clone_p0 = Module["_emscripten_bind_Matrix3__clone_p0"] = asm._emscripten_bind_Matrix3__clone_p0;
var _emscripten_bind_Ray__Ray_p0 = Module["_emscripten_bind_Ray__Ray_p0"] = asm._emscripten_bind_Ray__Ray_p0;
var _emscripten_bind_Quaternion__set_p4 = Module["_emscripten_bind_Quaternion__set_p4"] = asm._emscripten_bind_Quaternion__set_p4;
var _emscripten_bind_Box3__expandByScalar_p1 = Module["_emscripten_bind_Box3__expandByScalar_p1"] = asm._emscripten_bind_Box3__expandByScalar_p1;
var _emscripten_bind_Vector3__get_p1 = Module["_emscripten_bind_Vector3__get_p1"] = asm._emscripten_bind_Vector3__get_p1;
var _emscripten_bind_Vector3__length_p0 = Module["_emscripten_bind_Vector3__length_p0"] = asm._emscripten_bind_Vector3__length_p0;
var _emscripten_bind_Vector2__Vector2_p0 = Module["_emscripten_bind_Vector2__Vector2_p0"] = asm._emscripten_bind_Vector2__Vector2_p0;
var _emscripten_bind_UV__instanceOf_p1 = Module["_emscripten_bind_UV__instanceOf_p1"] = asm._emscripten_bind_UV__instanceOf_p1;
var _emscripten_bind_Sphere__get_radius_p0 = Module["_emscripten_bind_Sphere__get_radius_p0"] = asm._emscripten_bind_Sphere__get_radius_p0;
var _emscripten_bind_Quaternion__slerp_p2 = Module["_emscripten_bind_Quaternion__slerp_p2"] = asm._emscripten_bind_Quaternion__slerp_p2;
var _emscripten_bind_Line3__set_end_p1 = Module["_emscripten_bind_Line3__set_end_p1"] = asm._emscripten_bind_Line3__set_end_p1;
var _emscripten_bind_Plane__set_p2 = Module["_emscripten_bind_Plane__set_p2"] = asm._emscripten_bind_Plane__set_p2;
var _emscripten_bind_Color__set_r_p1 = Module["_emscripten_bind_Color__set_r_p1"] = asm._emscripten_bind_Color__set_r_p1;
var _emscripten_bind_Matrix4__makeRotationZ_p1 = Module["_emscripten_bind_Matrix4__makeRotationZ_p1"] = asm._emscripten_bind_Matrix4__makeRotationZ_p1;
var _emscripten_bind_Frustum__intersectsObject_p1 = Module["_emscripten_bind_Frustum__intersectsObject_p1"] = asm._emscripten_bind_Frustum__intersectsObject_p1;
var _memcpy = Module["_memcpy"] = asm._memcpy;
var _emscripten_bind_Line3__Line3_p2 = Module["_emscripten_bind_Line3__Line3_p2"] = asm._emscripten_bind_Line3__Line3_p2;
var _emscripten_bind_Quaternion__multiplyQuaternions_p2 = Module["_emscripten_bind_Quaternion__multiplyQuaternions_p2"] = asm._emscripten_bind_Quaternion__multiplyQuaternions_p2;
var _emscripten_bind_Matrix4__Matrix4_p0 = Module["_emscripten_bind_Matrix4__Matrix4_p0"] = asm._emscripten_bind_Matrix4__Matrix4_p0;
var _emscripten_bind_Vector3__get_z_p0 = Module["_emscripten_bind_Vector3__get_z_p0"] = asm._emscripten_bind_Vector3__get_z_p0;
var _emscripten_bind_Quaternion__set_z_p1 = Module["_emscripten_bind_Quaternion__set_z_p1"] = asm._emscripten_bind_Quaternion__set_z_p1;
var _emscripten_bind_Quaternion__copy_p1 = Module["_emscripten_bind_Quaternion__copy_p1"] = asm._emscripten_bind_Quaternion__copy_p1;
var _emscripten_bind_Matrix4__multiplyMatrices_p2 = Module["_emscripten_bind_Matrix4__multiplyMatrices_p2"] = asm._emscripten_bind_Matrix4__multiplyMatrices_p2;
var _emscripten_bind_Box3__empty_p0 = Module["_emscripten_bind_Box3__empty_p0"] = asm._emscripten_bind_Box3__empty_p0;
var _emscripten_bind_Matrix4__determinant_p0 = Module["_emscripten_bind_Matrix4__determinant_p0"] = asm._emscripten_bind_Matrix4__determinant_p0;
var _emscripten_bind_Matrix4__multiplyScalar_p1 = Module["_emscripten_bind_Matrix4__multiplyScalar_p1"] = asm._emscripten_bind_Matrix4__multiplyScalar_p1;
var _emscripten_bind_Box3__Box3_p2 = Module["_emscripten_bind_Box3__Box3_p2"] = asm._emscripten_bind_Box3__Box3_p2;
var _emscripten_bind_Matrix4__instanceOf_p1 = Module["_emscripten_bind_Matrix4__instanceOf_p1"] = asm._emscripten_bind_Matrix4__instanceOf_p1;
var _emscripten_bind_Box3__Box3_p0 = Module["_emscripten_bind_Box3__Box3_p0"] = asm._emscripten_bind_Box3__Box3_p0;
var _emscripten_bind_Vector4__instanceOf_p1 = Module["_emscripten_bind_Vector4__instanceOf_p1"] = asm._emscripten_bind_Vector4__instanceOf_p1;
var _emscripten_bind_Vector3__cross_p1 = Module["_emscripten_bind_Vector3__cross_p1"] = asm._emscripten_bind_Vector3__cross_p1;
var _emscripten_bind_Quaternion__Quaternion_p0 = Module["_emscripten_bind_Quaternion__Quaternion_p0"] = asm._emscripten_bind_Quaternion__Quaternion_p0;
var _emscripten_bind_Box3__copy_p1 = Module["_emscripten_bind_Box3__copy_p1"] = asm._emscripten_bind_Box3__copy_p1;
var _emscripten_bind_Color__get_b_p0 = Module["_emscripten_bind_Color__get_b_p0"] = asm._emscripten_bind_Color__get_b_p0;
var _emscripten_bind_Matrix4____destroy___p0 = Module["_emscripten_bind_Matrix4____destroy___p0"] = asm._emscripten_bind_Matrix4____destroy___p0;
var _emscripten_bind_Box3__makeEmpty_p0 = Module["_emscripten_bind_Box3__makeEmpty_p0"] = asm._emscripten_bind_Box3__makeEmpty_p0;
var _emscripten_bind_Matrix4__makeRotationAxis_p2 = Module["_emscripten_bind_Matrix4__makeRotationAxis_p2"] = asm._emscripten_bind_Matrix4__makeRotationAxis_p2;
var _emscripten_bind_Vector3__addScalar_p1 = Module["_emscripten_bind_Vector3__addScalar_p1"] = asm._emscripten_bind_Vector3__addScalar_p1;
var _emscripten_bind_Matrix3__transpose_p0 = Module["_emscripten_bind_Matrix3__transpose_p0"] = asm._emscripten_bind_Matrix3__transpose_p0;
var _emscripten_bind_Quaternion__length_p0 = Module["_emscripten_bind_Quaternion__length_p0"] = asm._emscripten_bind_Quaternion__length_p0;
var _emscripten_bind_Frustum__clone_p0 = Module["_emscripten_bind_Frustum__clone_p0"] = asm._emscripten_bind_Frustum__clone_p0;
var _emscripten_bind_Matrix4__invert_p0 = Module["_emscripten_bind_Matrix4__invert_p0"] = asm._emscripten_bind_Matrix4__invert_p0;
var _emscripten_bind_Quaternion__setFromAxisAngle_p2 = Module["_emscripten_bind_Quaternion__setFromAxisAngle_p2"] = asm._emscripten_bind_Quaternion__setFromAxisAngle_p2;
var _emscripten_bind_Color__copyGammaToLinear_p1 = Module["_emscripten_bind_Color__copyGammaToLinear_p1"] = asm._emscripten_bind_Color__copyGammaToLinear_p1;
var _emscripten_bind_Vector3__applyQuaternion_p1 = Module["_emscripten_bind_Vector3__applyQuaternion_p1"] = asm._emscripten_bind_Vector3__applyQuaternion_p1;
var _emscripten_bind_Vector2__set_y_p1 = Module["_emscripten_bind_Vector2__set_y_p1"] = asm._emscripten_bind_Vector2__set_y_p1;
var _emscripten_bind_Box2__Box2_p2 = Module["_emscripten_bind_Box2__Box2_p2"] = asm._emscripten_bind_Box2__Box2_p2;
var _emscripten_bind_Box2__Box2_p0 = Module["_emscripten_bind_Box2__Box2_p0"] = asm._emscripten_bind_Box2__Box2_p0;
var _free = Module["_free"] = asm._free;
var _emscripten_bind_Frustum__Frustum_p0 = Module["_emscripten_bind_Frustum__Frustum_p0"] = asm._emscripten_bind_Frustum__Frustum_p0;
var _emscripten_bind_Box3__setFromPoints_p1 = Module["_emscripten_bind_Box3__setFromPoints_p1"] = asm._emscripten_bind_Box3__setFromPoints_p1;
var _emscripten_bind_MATH__clampBottom_p2 = Module["_emscripten_bind_MATH__clampBottom_p2"] = asm._emscripten_bind_MATH__clampBottom_p2;
var _emscripten_bind_Box3__set_p2 = Module["_emscripten_bind_Box3__set_p2"] = asm._emscripten_bind_Box3__set_p2;
var _emscripten_bind_Matrix4__setRotationFromEuler_p2 = Module["_emscripten_bind_Matrix4__setRotationFromEuler_p2"] = asm._emscripten_bind_Matrix4__setRotationFromEuler_p2;
var _emscripten_bind_Matrix4__compose_p3 = Module["_emscripten_bind_Matrix4__compose_p3"] = asm._emscripten_bind_Matrix4__compose_p3;
var _emscripten_bind_Matrix3__determinant_p0 = Module["_emscripten_bind_Matrix3__determinant_p0"] = asm._emscripten_bind_Matrix3__determinant_p0;
var _emscripten_bind_Vector3__clamp_p2 = Module["_emscripten_bind_Vector3__clamp_p2"] = asm._emscripten_bind_Vector3__clamp_p2;
var _emscripten_bind_Matrix4__makeScale_p3 = Module["_emscripten_bind_Matrix4__makeScale_p3"] = asm._emscripten_bind_Matrix4__makeScale_p3;
var _emscripten_bind_Vector3__setFromChar_p2 = Module["_emscripten_bind_Vector3__setFromChar_p2"] = asm._emscripten_bind_Vector3__setFromChar_p2;
var _emscripten_bind_Vector3__min_p1 = Module["_emscripten_bind_Vector3__min_p1"] = asm._emscripten_bind_Vector3__min_p1;
var _emscripten_bind_Matrix3__Matrix3_p0 = Module["_emscripten_bind_Matrix3__Matrix3_p0"] = asm._emscripten_bind_Matrix3__Matrix3_p0;
var _emscripten_bind_Plane__isIntersectionLine_p1 = Module["_emscripten_bind_Plane__isIntersectionLine_p1"] = asm._emscripten_bind_Plane__isIntersectionLine_p1;
var _emscripten_bind_Vector4__set_y_p1 = Module["_emscripten_bind_Vector4__set_y_p1"] = asm._emscripten_bind_Vector4__set_y_p1;
var _emscripten_bind_Matrix4__getMaxScaleOnAxis_p0 = Module["_emscripten_bind_Matrix4__getMaxScaleOnAxis_p0"] = asm._emscripten_bind_Matrix4__getMaxScaleOnAxis_p0;
var _emscripten_bind_Frustum__setFromMatrix_p1 = Module["_emscripten_bind_Frustum__setFromMatrix_p1"] = asm._emscripten_bind_Frustum__setFromMatrix_p1;
var _emscripten_bind_Vector3__clone_p0 = Module["_emscripten_bind_Vector3__clone_p0"] = asm._emscripten_bind_Vector3__clone_p0;
var _emscripten_bind_Box2____destroy___p0 = Module["_emscripten_bind_Box2____destroy___p0"] = asm._emscripten_bind_Box2____destroy___p0;
var _emscripten_bind_Matrix3__multiplyScalar_p1 = Module["_emscripten_bind_Matrix3__multiplyScalar_p1"] = asm._emscripten_bind_Matrix3__multiplyScalar_p1;
var _emscripten_bind_Vector3__transformDirection_p1 = Module["_emscripten_bind_Vector3__transformDirection_p1"] = asm._emscripten_bind_Vector3__transformDirection_p1;
var _emscripten_bind_Box2__instanceOf_p1 = Module["_emscripten_bind_Box2__instanceOf_p1"] = asm._emscripten_bind_Box2__instanceOf_p1;
var _emscripten_bind_MATH____destroy___p0 = Module["_emscripten_bind_MATH____destroy___p0"] = asm._emscripten_bind_MATH____destroy___p0;
var _emscripten_bind_Vector3__equals_p1 = Module["_emscripten_bind_Vector3__equals_p1"] = asm._emscripten_bind_Vector3__equals_p1;
var _emscripten_bind_MATH__sign_p1 = Module["_emscripten_bind_MATH__sign_p1"] = asm._emscripten_bind_MATH__sign_p1;
var _emscripten_bind_Matrix4__makeTranslation_p3 = Module["_emscripten_bind_Matrix4__makeTranslation_p3"] = asm._emscripten_bind_Matrix4__makeTranslation_p3;
var _emscripten_bind_Matrix4__Matrix4_p16 = Module["_emscripten_bind_Matrix4__Matrix4_p16"] = asm._emscripten_bind_Matrix4__Matrix4_p16;
var _emscripten_bind_Vector4__get_x_p0 = Module["_emscripten_bind_Vector4__get_x_p0"] = asm._emscripten_bind_Vector4__get_x_p0;
var _emscripten_bind_Vector3__getPositionFromMatrix_p1 = Module["_emscripten_bind_Vector3__getPositionFromMatrix_p1"] = asm._emscripten_bind_Vector3__getPositionFromMatrix_p1;
var _emscripten_bind_Vector4__set_x_p1 = Module["_emscripten_bind_Vector4__set_x_p1"] = asm._emscripten_bind_Vector4__set_x_p1;
var _emscripten_bind_MATH__smoothstep_p3 = Module["_emscripten_bind_MATH__smoothstep_p3"] = asm._emscripten_bind_MATH__smoothstep_p3;
var _emscripten_bind_Line3__closestPointToPoint_p3 = Module["_emscripten_bind_Line3__closestPointToPoint_p3"] = asm._emscripten_bind_Line3__closestPointToPoint_p3;
var _emscripten_bind_Line3__get_start_p0 = Module["_emscripten_bind_Line3__get_start_p0"] = asm._emscripten_bind_Line3__get_start_p0;
var _emscripten_bind_Plane__instanceOf_p1 = Module["_emscripten_bind_Plane__instanceOf_p1"] = asm._emscripten_bind_Plane__instanceOf_p1;
var _emscripten_bind_Vector2____destroy___p0 = Module["_emscripten_bind_Vector2____destroy___p0"] = asm._emscripten_bind_Vector2____destroy___p0;
var _emscripten_bind_Matrix4__multiplyToArray_p3 = Module["_emscripten_bind_Matrix4__multiplyToArray_p3"] = asm._emscripten_bind_Matrix4__multiplyToArray_p3;
var _emscripten_bind_Plane__applyMatrix4_p1 = Module["_emscripten_bind_Plane__applyMatrix4_p1"] = asm._emscripten_bind_Plane__applyMatrix4_p1;
var _emscripten_bind_Matrix4__clone_p0 = Module["_emscripten_bind_Matrix4__clone_p0"] = asm._emscripten_bind_Matrix4__clone_p0;
var _emscripten_bind_Color__set_b_p1 = Module["_emscripten_bind_Color__set_b_p1"] = asm._emscripten_bind_Color__set_b_p1;
var _emscripten_bind_Matrix3____destroy___p0 = Module["_emscripten_bind_Matrix3____destroy___p0"] = asm._emscripten_bind_Matrix3____destroy___p0;
var _emscripten_bind_Line3__distanceSquared_p0 = Module["_emscripten_bind_Line3__distanceSquared_p0"] = asm._emscripten_bind_Line3__distanceSquared_p0;
var _emscripten_bind_Vector3____destroy___p0 = Module["_emscripten_bind_Vector3____destroy___p0"] = asm._emscripten_bind_Vector3____destroy___p0;
var _emscripten_bind_Vector3__addVectors_p2 = Module["_emscripten_bind_Vector3__addVectors_p2"] = asm._emscripten_bind_Vector3__addVectors_p2;
var _emscripten_bind_Box3__set_max_p1 = Module["_emscripten_bind_Box3__set_max_p1"] = asm._emscripten_bind_Box3__set_max_p1;
var _emscripten_bind_Matrix4__extractPosition_p1 = Module["_emscripten_bind_Matrix4__extractPosition_p1"] = asm._emscripten_bind_Matrix4__extractPosition_p1;
var _emscripten_bind_Box3__setFromCenterAndSize_p2 = Module["_emscripten_bind_Box3__setFromCenterAndSize_p2"] = asm._emscripten_bind_Box3__setFromCenterAndSize_p2;
var _emscripten_bind_Matrix3__copy_p1 = Module["_emscripten_bind_Matrix3__copy_p1"] = asm._emscripten_bind_Matrix3__copy_p1;
var _emscripten_bind_Quaternion__set_w_p1 = Module["_emscripten_bind_Quaternion__set_w_p1"] = asm._emscripten_bind_Quaternion__set_w_p1;
var _emscripten_bind_Quaternion__set_y_p1 = Module["_emscripten_bind_Quaternion__set_y_p1"] = asm._emscripten_bind_Quaternion__set_y_p1;
var _emscripten_bind_Plane__equals_p1 = Module["_emscripten_bind_Plane__equals_p1"] = asm._emscripten_bind_Plane__equals_p1;
var _emscripten_bind_MATH__randDouble_p2 = Module["_emscripten_bind_MATH__randDouble_p2"] = asm._emscripten_bind_MATH__randDouble_p2;
var _emscripten_bind_Color__get_r_p0 = Module["_emscripten_bind_Color__get_r_p0"] = asm._emscripten_bind_Color__get_r_p0;
var _emscripten_bind_Vector3__max_p1 = Module["_emscripten_bind_Vector3__max_p1"] = asm._emscripten_bind_Vector3__max_p1;
var _emscripten_bind_Vector3__get_y_p0 = Module["_emscripten_bind_Vector3__get_y_p0"] = asm._emscripten_bind_Vector3__get_y_p0;
var _emscripten_bind_Vector4__set_z_p1 = Module["_emscripten_bind_Vector4__set_z_p1"] = asm._emscripten_bind_Vector4__set_z_p1;
var _emscripten_bind_MATH__randDoubleSpread_p1 = Module["_emscripten_bind_MATH__randDoubleSpread_p1"] = asm._emscripten_bind_MATH__randDoubleSpread_p1;
var _emscripten_bind_Vertex__instanceOf_p1 = Module["_emscripten_bind_Vertex__instanceOf_p1"] = asm._emscripten_bind_Vertex__instanceOf_p1;
var _emscripten_bind_Box3__distanceToPoint_p1 = Module["_emscripten_bind_Box3__distanceToPoint_p1"] = asm._emscripten_bind_Box3__distanceToPoint_p1;
var _emscripten_bind_Matrix4__setRotationFromQuaternion_p1 = Module["_emscripten_bind_Matrix4__setRotationFromQuaternion_p1"] = asm._emscripten_bind_Matrix4__setRotationFromQuaternion_p1;
var _emscripten_bind_Triangle____destroy___p0 = Module["_emscripten_bind_Triangle____destroy___p0"] = asm._emscripten_bind_Triangle____destroy___p0;
var _emscripten_bind_Line3__equals_p1 = Module["_emscripten_bind_Line3__equals_p1"] = asm._emscripten_bind_Line3__equals_p1;
var _emscripten_bind_Box2__get_min_p0 = Module["_emscripten_bind_Box2__get_min_p0"] = asm._emscripten_bind_Box2__get_min_p0;
var _emscripten_bind_Matrix4__crossVector_p1 = Module["_emscripten_bind_Matrix4__crossVector_p1"] = asm._emscripten_bind_Matrix4__crossVector_p1;
var _emscripten_bind_Plane__copy_p1 = Module["_emscripten_bind_Plane__copy_p1"] = asm._emscripten_bind_Plane__copy_p1;
var _emscripten_bind_Sphere__set_center_p1 = Module["_emscripten_bind_Sphere__set_center_p1"] = asm._emscripten_bind_Sphere__set_center_p1;
var _emscripten_bind_Frustum__intersectsSphere_p1 = Module["_emscripten_bind_Frustum__intersectsSphere_p1"] = asm._emscripten_bind_Frustum__intersectsSphere_p1;
var _emscripten_bind_Line3__delta_p1 = Module["_emscripten_bind_Line3__delta_p1"] = asm._emscripten_bind_Line3__delta_p1;
var _emscripten_bind_Sphere__instanceOf_p1 = Module["_emscripten_bind_Sphere__instanceOf_p1"] = asm._emscripten_bind_Sphere__instanceOf_p1;
var _emscripten_bind_Box3__clone_p0 = Module["_emscripten_bind_Box3__clone_p0"] = asm._emscripten_bind_Box3__clone_p0;
var _emscripten_bind_Color__set_p1 = Module["_emscripten_bind_Color__set_p1"] = asm._emscripten_bind_Color__set_p1;
var _emscripten_bind_Matrix3__identity_p0 = Module["_emscripten_bind_Matrix3__identity_p0"] = asm._emscripten_bind_Matrix3__identity_p0;
var _emscripten_bind_Quaternion__conjugate_p0 = Module["_emscripten_bind_Quaternion__conjugate_p0"] = asm._emscripten_bind_Quaternion__conjugate_p0;
var _emscripten_bind_Box3__applyMatrix4_p1 = Module["_emscripten_bind_Box3__applyMatrix4_p1"] = asm._emscripten_bind_Box3__applyMatrix4_p1;
var _emscripten_bind_Color__addColors_p2 = Module["_emscripten_bind_Color__addColors_p2"] = asm._emscripten_bind_Color__addColors_p2;
var _emscripten_bind_Vector3__multiplyScalar_p1 = Module["_emscripten_bind_Vector3__multiplyScalar_p1"] = asm._emscripten_bind_Vector3__multiplyScalar_p1;
var _emscripten_bind_Vector3__distanceToSquared_p1 = Module["_emscripten_bind_Vector3__distanceToSquared_p1"] = asm._emscripten_bind_Vector3__distanceToSquared_p1;
var _emscripten_bind_Vector3__distanceTo_p1 = Module["_emscripten_bind_Vector3__distanceTo_p1"] = asm._emscripten_bind_Vector3__distanceTo_p1;
var _emscripten_bind_Matrix4__rotateX_p1 = Module["_emscripten_bind_Matrix4__rotateX_p1"] = asm._emscripten_bind_Matrix4__rotateX_p1;
var _emscripten_bind_MATH__random16_p0 = Module["_emscripten_bind_MATH__random16_p0"] = asm._emscripten_bind_MATH__random16_p0;
var _emscripten_bind_Sphere__getCenter_p0 = Module["_emscripten_bind_Sphere__getCenter_p0"] = asm._emscripten_bind_Sphere__getCenter_p0;
var _emscripten_bind_Plane__orthoPoint_p1 = Module["_emscripten_bind_Plane__orthoPoint_p1"] = asm._emscripten_bind_Plane__orthoPoint_p1;
var _emscripten_bind_Quaternion____destroy___p0 = Module["_emscripten_bind_Quaternion____destroy___p0"] = asm._emscripten_bind_Quaternion____destroy___p0;
var _emscripten_bind_Plane__setFromCoplanerPoints_p3 = Module["_emscripten_bind_Plane__setFromCoplanerPoints_p3"] = asm._emscripten_bind_Plane__setFromCoplanerPoints_p3;
var _emscripten_bind_Color__add_p1 = Module["_emscripten_bind_Color__add_p1"] = asm._emscripten_bind_Color__add_p1;
var _emscripten_bind_Vector2__get_x_p0 = Module["_emscripten_bind_Vector2__get_x_p0"] = asm._emscripten_bind_Vector2__get_x_p0;
var _emscripten_bind_Quaternion__inverse_p0 = Module["_emscripten_bind_Quaternion__inverse_p0"] = asm._emscripten_bind_Quaternion__inverse_p0;
var _emscripten_bind_Vector2__set_p2 = Module["_emscripten_bind_Vector2__set_p2"] = asm._emscripten_bind_Vector2__set_p2;
var _emscripten_bind_Color__get_g_p0 = Module["_emscripten_bind_Color__get_g_p0"] = asm._emscripten_bind_Color__get_g_p0;
var _emscripten_bind_Plane__get_normal_p0 = Module["_emscripten_bind_Plane__get_normal_p0"] = asm._emscripten_bind_Plane__get_normal_p0;
var _emscripten_bind_Quaternion__lengthSquared_p0 = Module["_emscripten_bind_Quaternion__lengthSquared_p0"] = asm._emscripten_bind_Quaternion__lengthSquared_p0;
var _emscripten_bind_Box3__isIntersectionBox_p1 = Module["_emscripten_bind_Box3__isIntersectionBox_p1"] = asm._emscripten_bind_Box3__isIntersectionBox_p1;
var _emscripten_bind_Matrix4__scale_p1 = Module["_emscripten_bind_Matrix4__scale_p1"] = asm._emscripten_bind_Matrix4__scale_p1;
var _emscripten_bind_Plane__negate_p0 = Module["_emscripten_bind_Plane__negate_p0"] = asm._emscripten_bind_Plane__negate_p0;
var _emscripten_bind_Plane__projectPoint_p1 = Module["_emscripten_bind_Plane__projectPoint_p1"] = asm._emscripten_bind_Plane__projectPoint_p1;
var _emscripten_bind_Color__Color_p0 = Module["_emscripten_bind_Color__Color_p0"] = asm._emscripten_bind_Color__Color_p0;
var _emscripten_bind_Box3__instanceOf_p1 = Module["_emscripten_bind_Box3__instanceOf_p1"] = asm._emscripten_bind_Box3__instanceOf_p1;
var _emscripten_bind_Vector3__divide_p1 = Module["_emscripten_bind_Vector3__divide_p1"] = asm._emscripten_bind_Vector3__divide_p1;
var _emscripten_bind_Plane__get_constant_p0 = Module["_emscripten_bind_Plane__get_constant_p0"] = asm._emscripten_bind_Plane__get_constant_p0;
var _emscripten_bind_Box3__set_min_p1 = Module["_emscripten_bind_Box3__set_min_p1"] = asm._emscripten_bind_Box3__set_min_p1;
var _emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2 = Module["_emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2"] = asm._emscripten_bind_Plane__setFromNormalAndCoplanerPoint_p2;
var _emscripten_bind_Box2__set_max_p1 = Module["_emscripten_bind_Box2__set_max_p1"] = asm._emscripten_bind_Box2__set_max_p1;
var _emscripten_bind_Box3__containsBox_p1 = Module["_emscripten_bind_Box3__containsBox_p1"] = asm._emscripten_bind_Box3__containsBox_p1;
var _emscripten_bind_Sphere__Sphere_p0 = Module["_emscripten_bind_Sphere__Sphere_p0"] = asm._emscripten_bind_Sphere__Sphere_p0;
var _emscripten_bind_Plane__distanceToPoint_p1 = Module["_emscripten_bind_Plane__distanceToPoint_p1"] = asm._emscripten_bind_Plane__distanceToPoint_p1;
var _emscripten_bind_Quaternion__get_x_p0 = Module["_emscripten_bind_Quaternion__get_x_p0"] = asm._emscripten_bind_Quaternion__get_x_p0;
var _emscripten_bind_Line3__Line3_p0 = Module["_emscripten_bind_Line3__Line3_p0"] = asm._emscripten_bind_Line3__Line3_p0;
var _emscripten_bind_Vector3__set_x_p1 = Module["_emscripten_bind_Vector3__set_x_p1"] = asm._emscripten_bind_Vector3__set_x_p1;
var _emscripten_bind_MATH__mapLinear_p5 = Module["_emscripten_bind_MATH__mapLinear_p5"] = asm._emscripten_bind_MATH__mapLinear_p5;
var _emscripten_bind_Ray__instanceOf_p1 = Module["_emscripten_bind_Ray__instanceOf_p1"] = asm._emscripten_bind_Ray__instanceOf_p1;
var _emscripten_bind_Line3__copy_p1 = Module["_emscripten_bind_Line3__copy_p1"] = asm._emscripten_bind_Line3__copy_p1;
var _emscripten_bind_Vertex__Vertex_p0 = Module["_emscripten_bind_Vertex__Vertex_p0"] = asm._emscripten_bind_Vertex__Vertex_p0;
var _emscripten_bind_Vector3__lerp_p2 = Module["_emscripten_bind_Vector3__lerp_p2"] = asm._emscripten_bind_Vector3__lerp_p2;
var _emscripten_bind_Matrix4__lookAt_p3 = Module["_emscripten_bind_Matrix4__lookAt_p3"] = asm._emscripten_bind_Matrix4__lookAt_p3;
var _emscripten_bind_Plane__normalize_p0 = Module["_emscripten_bind_Plane__normalize_p0"] = asm._emscripten_bind_Plane__normalize_p0;
var _emscripten_bind_Vector3__set_p3 = Module["_emscripten_bind_Vector3__set_p3"] = asm._emscripten_bind_Vector3__set_p3;
var _emscripten_bind_Sphere____destroy___p0 = Module["_emscripten_bind_Sphere____destroy___p0"] = asm._emscripten_bind_Sphere____destroy___p0;
var _emscripten_bind_Color____destroy___p0 = Module["_emscripten_bind_Color____destroy___p0"] = asm._emscripten_bind_Color____destroy___p0;
var _memset = Module["_memset"] = asm._memset;
var _emscripten_bind_Matrix4__rotateZ_p1 = Module["_emscripten_bind_Matrix4__rotateZ_p1"] = asm._emscripten_bind_Matrix4__rotateZ_p1;
var _emscripten_bind_Matrix3__Matrix3_p9 = Module["_emscripten_bind_Matrix3__Matrix3_p9"] = asm._emscripten_bind_Matrix3__Matrix3_p9;
var _emscripten_bind_Plane__set_constant_p1 = Module["_emscripten_bind_Plane__set_constant_p1"] = asm._emscripten_bind_Plane__set_constant_p1;
var _emscripten_bind_Matrix4__makeFrustum_p6 = Module["_emscripten_bind_Matrix4__makeFrustum_p6"] = asm._emscripten_bind_Matrix4__makeFrustum_p6;
var _emscripten_bind_Color__copy_p1 = Module["_emscripten_bind_Color__copy_p1"] = asm._emscripten_bind_Color__copy_p1;
var _emscripten_bind_Vector2__set_x_p1 = Module["_emscripten_bind_Vector2__set_x_p1"] = asm._emscripten_bind_Vector2__set_x_p1;
var _emscripten_bind_Matrix4__getInverse_p1 = Module["_emscripten_bind_Matrix4__getInverse_p1"] = asm._emscripten_bind_Matrix4__getInverse_p1;
var _emscripten_bind_Vector3__Vector3_p0 = Module["_emscripten_bind_Vector3__Vector3_p0"] = asm._emscripten_bind_Vector3__Vector3_p0;
var _emscripten_bind_Box3__getBoundingSphere_p1 = Module["_emscripten_bind_Box3__getBoundingSphere_p1"] = asm._emscripten_bind_Box3__getBoundingSphere_p1;
var _emscripten_bind_Matrix4__makeRotationX_p1 = Module["_emscripten_bind_Matrix4__makeRotationX_p1"] = asm._emscripten_bind_Matrix4__makeRotationX_p1;
var _emscripten_bind_MATH__degToRad_p1 = Module["_emscripten_bind_MATH__degToRad_p1"] = asm._emscripten_bind_MATH__degToRad_p1;
var _emscripten_bind_Vector3__Vector3_p3 = Module["_emscripten_bind_Vector3__Vector3_p3"] = asm._emscripten_bind_Vector3__Vector3_p3;
var _emscripten_bind_Matrix3__getNormalMatrix_p1 = Module["_emscripten_bind_Matrix3__getNormalMatrix_p1"] = asm._emscripten_bind_Matrix3__getNormalMatrix_p1;
var _emscripten_bind_Line3__instanceOf_p1 = Module["_emscripten_bind_Line3__instanceOf_p1"] = asm._emscripten_bind_Line3__instanceOf_p1;
var _emscripten_bind_Spline__instanceOf_p1 = Module["_emscripten_bind_Spline__instanceOf_p1"] = asm._emscripten_bind_Spline__instanceOf_p1;
var _emscripten_bind_Box3__get_max_p0 = Module["_emscripten_bind_Box3__get_max_p0"] = asm._emscripten_bind_Box3__get_max_p0;
var _emscripten_bind_MATH__smootherstep_p3 = Module["_emscripten_bind_MATH__smootherstep_p3"] = asm._emscripten_bind_MATH__smootherstep_p3;
var _emscripten_bind_Vector2__instanceOf_p1 = Module["_emscripten_bind_Vector2__instanceOf_p1"] = asm._emscripten_bind_Vector2__instanceOf_p1;
var _emscripten_bind_Triangle__Triangle_p0 = Module["_emscripten_bind_Triangle__Triangle_p0"] = asm._emscripten_bind_Triangle__Triangle_p0;
var _emscripten_bind_Color__clone_p0 = Module["_emscripten_bind_Color__clone_p0"] = asm._emscripten_bind_Color__clone_p0;
var _emscripten_bind_Triangle__instanceOf_p1 = Module["_emscripten_bind_Triangle__instanceOf_p1"] = asm._emscripten_bind_Triangle__instanceOf_p1;
var _emscripten_bind_Matrix4__translate_p1 = Module["_emscripten_bind_Matrix4__translate_p1"] = asm._emscripten_bind_Matrix4__translate_p1;
var _emscripten_bind_Plane__coplanerPoint_p0 = Module["_emscripten_bind_Plane__coplanerPoint_p0"] = asm._emscripten_bind_Plane__coplanerPoint_p0;
var _emscripten_bind_Plane__set_normal_p1 = Module["_emscripten_bind_Plane__set_normal_p1"] = asm._emscripten_bind_Plane__set_normal_p1;
var _emscripten_bind_Line3__distance_p0 = Module["_emscripten_bind_Line3__distance_p0"] = asm._emscripten_bind_Line3__distance_p0;
var _emscripten_bind_Box3__intersect_p1 = Module["_emscripten_bind_Box3__intersect_p1"] = asm._emscripten_bind_Box3__intersect_p1;
var _emscripten_bind_Line3__closestPointToPointParameter_p2 = Module["_emscripten_bind_Line3__closestPointToPointParameter_p2"] = asm._emscripten_bind_Line3__closestPointToPointParameter_p2;
var _emscripten_bind_Plane__clone_p0 = Module["_emscripten_bind_Plane__clone_p0"] = asm._emscripten_bind_Plane__clone_p0;
var _emscripten_bind_Box3__equals_p1 = Module["_emscripten_bind_Box3__equals_p1"] = asm._emscripten_bind_Box3__equals_p1;
var _emscripten_bind_Vector2__get_y_p0 = Module["_emscripten_bind_Vector2__get_y_p0"] = asm._emscripten_bind_Vector2__get_y_p0;
var _emscripten_bind_Quaternion__get_w_p0 = Module["_emscripten_bind_Quaternion__get_w_p0"] = asm._emscripten_bind_Quaternion__get_w_p0;
var _emscripten_bind_Vector4__Vector4_p0 = Module["_emscripten_bind_Vector4__Vector4_p0"] = asm._emscripten_bind_Vector4__Vector4_p0;
var _emscripten_bind_Matrix4__makePerspective_p4 = Module["_emscripten_bind_Matrix4__makePerspective_p4"] = asm._emscripten_bind_Matrix4__makePerspective_p4;
var _emscripten_bind_Box3__size_p1 = Module["_emscripten_bind_Box3__size_p1"] = asm._emscripten_bind_Box3__size_p1;
var _emscripten_bind_Plane____destroy___p0 = Module["_emscripten_bind_Plane____destroy___p0"] = asm._emscripten_bind_Plane____destroy___p0;
var _emscripten_bind_Box2__get_max_p0 = Module["_emscripten_bind_Box2__get_max_p0"] = asm._emscripten_bind_Box2__get_max_p0;
var _emscripten_bind_Matrix3__transposeIntoArray_p1 = Module["_emscripten_bind_Matrix3__transposeIntoArray_p1"] = asm._emscripten_bind_Matrix3__transposeIntoArray_p1;
var _emscripten_bind_Line3__at_p2 = Module["_emscripten_bind_Line3__at_p2"] = asm._emscripten_bind_Line3__at_p2;
var _emscripten_bind_Vector3__applyMatrix3_p1 = Module["_emscripten_bind_Vector3__applyMatrix3_p1"] = asm._emscripten_bind_Vector3__applyMatrix3_p1;
var _emscripten_bind_Box3____destroy___p0 = Module["_emscripten_bind_Box3____destroy___p0"] = asm._emscripten_bind_Box3____destroy___p0;
var _emscripten_bind_Quaternion__clone_p0 = Module["_emscripten_bind_Quaternion__clone_p0"] = asm._emscripten_bind_Quaternion__clone_p0;
var _emscripten_bind_Matrix4__rotateByAxis_p2 = Module["_emscripten_bind_Matrix4__rotateByAxis_p2"] = asm._emscripten_bind_Matrix4__rotateByAxis_p2;
var _emscripten_bind_Frustum__instanceOf_p1 = Module["_emscripten_bind_Frustum__instanceOf_p1"] = asm._emscripten_bind_Frustum__instanceOf_p1;
var _malloc = Module["_malloc"] = asm._malloc;
var _emscripten_bind_Quaternion__get_z_p0 = Module["_emscripten_bind_Quaternion__get_z_p0"] = asm._emscripten_bind_Quaternion__get_z_p0;
var _emscripten_bind_Vector3__sub_p1 = Module["_emscripten_bind_Vector3__sub_p1"] = asm._emscripten_bind_Vector3__sub_p1;
var _emscripten_bind_Vector3__dot_p1 = Module["_emscripten_bind_Vector3__dot_p1"] = asm._emscripten_bind_Vector3__dot_p1;
var _emscripten_bind_Vector3__negate_p0 = Module["_emscripten_bind_Vector3__negate_p0"] = asm._emscripten_bind_Vector3__negate_p0;
var _emscripten_bind_Matrix4__makeOrthographic_p6 = Module["_emscripten_bind_Matrix4__makeOrthographic_p6"] = asm._emscripten_bind_Matrix4__makeOrthographic_p6;
var _emscripten_bind_Vector3__set_z_p1 = Module["_emscripten_bind_Vector3__set_z_p1"] = asm._emscripten_bind_Vector3__set_z_p1;
var _emscripten_bind_Matrix4__decompose_p3 = Module["_emscripten_bind_Matrix4__decompose_p3"] = asm._emscripten_bind_Matrix4__decompose_p3;
var _emscripten_bind_Vector3__multiply_p1 = Module["_emscripten_bind_Vector3__multiply_p1"] = asm._emscripten_bind_Vector3__multiply_p1;
var _emscripten_bind_Quaternion__setFromRotationMatrix_p1 = Module["_emscripten_bind_Quaternion__setFromRotationMatrix_p1"] = asm._emscripten_bind_Quaternion__setFromRotationMatrix_p1;
var _emscripten_bind_Matrix4__rotateY_p1 = Module["_emscripten_bind_Matrix4__rotateY_p1"] = asm._emscripten_bind_Matrix4__rotateY_p1;
var _emscripten_bind_Vector4____destroy___p0 = Module["_emscripten_bind_Vector4____destroy___p0"] = asm._emscripten_bind_Vector4____destroy___p0;
var _emscripten_bind_Vector4__get_z_p0 = Module["_emscripten_bind_Vector4__get_z_p0"] = asm._emscripten_bind_Vector4__get_z_p0;
var _emscripten_bind_Line3__set_start_p1 = Module["_emscripten_bind_Line3__set_start_p1"] = asm._emscripten_bind_Line3__set_start_p1;
var _emscripten_bind_Frustum__Frustum_p6 = Module["_emscripten_bind_Frustum__Frustum_p6"] = asm._emscripten_bind_Frustum__Frustum_p6;
var _emscripten_bind_Matrix4__copy_p1 = Module["_emscripten_bind_Matrix4__copy_p1"] = asm._emscripten_bind_Matrix4__copy_p1;
var _emscripten_bind_Color__instanceOf_p1 = Module["_emscripten_bind_Color__instanceOf_p1"] = asm._emscripten_bind_Color__instanceOf_p1;
var _emscripten_bind_UV____destroy___p0 = Module["_emscripten_bind_UV____destroy___p0"] = asm._emscripten_bind_UV____destroy___p0;
var _emscripten_bind_MATH__radToDeg_p1 = Module["_emscripten_bind_MATH__radToDeg_p1"] = asm._emscripten_bind_MATH__radToDeg_p1;
var _emscripten_bind_Frustum__copy_p1 = Module["_emscripten_bind_Frustum__copy_p1"] = asm._emscripten_bind_Frustum__copy_p1;
var _emscripten_bind_MATH__clamp_p3 = Module["_emscripten_bind_MATH__clamp_p3"] = asm._emscripten_bind_MATH__clamp_p3;
var _emscripten_bind_Vector3__applyMatrix4_p1 = Module["_emscripten_bind_Vector3__applyMatrix4_p1"] = asm._emscripten_bind_Vector3__applyMatrix4_p1;
var _emscripten_bind_Box3__getParameter_p1 = Module["_emscripten_bind_Box3__getParameter_p1"] = asm._emscripten_bind_Box3__getParameter_p1;
var _emscripten_bind_Quaternion__instanceOf_p1 = Module["_emscripten_bind_Quaternion__instanceOf_p1"] = asm._emscripten_bind_Quaternion__instanceOf_p1;
var _emscripten_bind_Vector3__set_y_p1 = Module["_emscripten_bind_Vector3__set_y_p1"] = asm._emscripten_bind_Vector3__set_y_p1;
var _emscripten_bind_Matrix3__set_p9 = Module["_emscripten_bind_Matrix3__set_p9"] = asm._emscripten_bind_Matrix3__set_p9;
var _emscripten_bind_Plane__translate_p1 = Module["_emscripten_bind_Plane__translate_p1"] = asm._emscripten_bind_Plane__translate_p1;
var _emscripten_bind_Frustum__containsPoint_p1 = Module["_emscripten_bind_Frustum__containsPoint_p1"] = asm._emscripten_bind_Frustum__containsPoint_p1;
var _emscripten_bind_Line3__center_p1 = Module["_emscripten_bind_Line3__center_p1"] = asm._emscripten_bind_Line3__center_p1;
var _emscripten_bind_Color__set_g_p1 = Module["_emscripten_bind_Color__set_g_p1"] = asm._emscripten_bind_Color__set_g_p1;
var _emscripten_bind_Vector3__crossVectors_p2 = Module["_emscripten_bind_Vector3__crossVectors_p2"] = asm._emscripten_bind_Vector3__crossVectors_p2;
var _emscripten_bind_Spline__Spline_p0 = Module["_emscripten_bind_Spline__Spline_p0"] = asm._emscripten_bind_Spline__Spline_p0;
var _emscripten_bind_Box2__set_min_p1 = Module["_emscripten_bind_Box2__set_min_p1"] = asm._emscripten_bind_Box2__set_min_p1;
var _emscripten_bind_Quaternion__get_y_p0 = Module["_emscripten_bind_Quaternion__get_y_p0"] = asm._emscripten_bind_Quaternion__get_y_p0;
var _emscripten_bind_Color__convertLinearToGamma_p0 = Module["_emscripten_bind_Color__convertLinearToGamma_p0"] = asm._emscripten_bind_Color__convertLinearToGamma_p0;
var _emscripten_bind_Plane__Plane_p2 = Module["_emscripten_bind_Plane__Plane_p2"] = asm._emscripten_bind_Plane__Plane_p2;
var _emscripten_bind_Box3__expandByVector_p1 = Module["_emscripten_bind_Box3__expandByVector_p1"] = asm._emscripten_bind_Box3__expandByVector_p1;
var _emscripten_bind_Vector3__subVectors_p2 = Module["_emscripten_bind_Vector3__subVectors_p2"] = asm._emscripten_bind_Vector3__subVectors_p2;
var _emscripten_bind_Quaternion__Quaternion_p4 = Module["_emscripten_bind_Quaternion__Quaternion_p4"] = asm._emscripten_bind_Quaternion__Quaternion_p4;
var _emscripten_bind_Vector3__normalize_p0 = Module["_emscripten_bind_Vector3__normalize_p0"] = asm._emscripten_bind_Vector3__normalize_p0;
var _emscripten_bind_Box3__clampPoint_p2 = Module["_emscripten_bind_Box3__clampPoint_p2"] = asm._emscripten_bind_Box3__clampPoint_p2;
var _emscripten_bind_Vertex____destroy___p0 = Module["_emscripten_bind_Vertex____destroy___p0"] = asm._emscripten_bind_Vertex____destroy___p0;
var _emscripten_bind_Line3__applyMatrix4_p1 = Module["_emscripten_bind_Line3__applyMatrix4_p1"] = asm._emscripten_bind_Line3__applyMatrix4_p1;
var _emscripten_bind_Vector3__divideScalar_p1 = Module["_emscripten_bind_Vector3__divideScalar_p1"] = asm._emscripten_bind_Vector3__divideScalar_p1;
var _emscripten_bind_Vector3__copy_p1 = Module["_emscripten_bind_Vector3__copy_p1"] = asm._emscripten_bind_Vector3__copy_p1;
var _emscripten_bind_Color__Color_p3 = Module["_emscripten_bind_Color__Color_p3"] = asm._emscripten_bind_Color__Color_p3;
var _emscripten_bind_Plane__intersectLine_p1 = Module["_emscripten_bind_Plane__intersectLine_p1"] = asm._emscripten_bind_Plane__intersectLine_p1;
var _emscripten_bind_Vector3__get_x_p0 = Module["_emscripten_bind_Vector3__get_x_p0"] = asm._emscripten_bind_Vector3__get_x_p0;
var _emscripten_bind_Vector3__lengthSquared_p0 = Module["_emscripten_bind_Vector3__lengthSquared_p0"] = asm._emscripten_bind_Vector3__lengthSquared_p0;
var _emscripten_bind_Quaternion__set_x_p1 = Module["_emscripten_bind_Quaternion__set_x_p1"] = asm._emscripten_bind_Quaternion__set_x_p1;
var _emscripten_bind_Box3__expandByPoint_p1 = Module["_emscripten_bind_Box3__expandByPoint_p1"] = asm._emscripten_bind_Box3__expandByPoint_p1;
var _emscripten_bind_Box3__containsPoint_p1 = Module["_emscripten_bind_Box3__containsPoint_p1"] = asm._emscripten_bind_Box3__containsPoint_p1;
var _emscripten_bind_Vector3__setLength_p1 = Module["_emscripten_bind_Vector3__setLength_p1"] = asm._emscripten_bind_Vector3__setLength_p1;
var _emscripten_bind_Quaternion__equals_p1 = Module["_emscripten_bind_Quaternion__equals_p1"] = asm._emscripten_bind_Quaternion__equals_p1;
var _emscripten_bind_Vector4__get_y_p0 = Module["_emscripten_bind_Vector4__get_y_p0"] = asm._emscripten_bind_Vector4__get_y_p0;
var _emscripten_bind_Ray__Ray_p2 = Module["_emscripten_bind_Ray__Ray_p2"] = asm._emscripten_bind_Ray__Ray_p2;
var _emscripten_bind_Ray____destroy___p0 = Module["_emscripten_bind_Ray____destroy___p0"] = asm._emscripten_bind_Ray____destroy___p0;
var _emscripten_bind_Vector2__Vector2_p2 = Module["_emscripten_bind_Vector2__Vector2_p2"] = asm._emscripten_bind_Vector2__Vector2_p2;
var _emscripten_bind_Spline____destroy___p0 = Module["_emscripten_bind_Spline____destroy___p0"] = asm._emscripten_bind_Spline____destroy___p0;
var _emscripten_bind_Matrix3__instanceOf_p1 = Module["_emscripten_bind_Matrix3__instanceOf_p1"] = asm._emscripten_bind_Matrix3__instanceOf_p1;
var _emscripten_bind_Vector3__multiplyVectors_p2 = Module["_emscripten_bind_Vector3__multiplyVectors_p2"] = asm._emscripten_bind_Vector3__multiplyVectors_p2;
var _emscripten_bind_Color__convertGammaToLinear_p0 = Module["_emscripten_bind_Color__convertGammaToLinear_p0"] = asm._emscripten_bind_Color__convertGammaToLinear_p0;
var _emscripten_bind_Plane__setComponents_p4 = Module["_emscripten_bind_Plane__setComponents_p4"] = asm._emscripten_bind_Plane__setComponents_p4;
var _emscripten_bind_Quaternion__normalize_p0 = Module["_emscripten_bind_Quaternion__normalize_p0"] = asm._emscripten_bind_Quaternion__normalize_p0;
var _emscripten_bind_Matrix4__makeRotationY_p1 = Module["_emscripten_bind_Matrix4__makeRotationY_p1"] = asm._emscripten_bind_Matrix4__makeRotationY_p1;
var _emscripten_bind_Color__setRGB_p3 = Module["_emscripten_bind_Color__setRGB_p3"] = asm._emscripten_bind_Color__setRGB_p3;
var _emscripten_bind_Sphere__get_center_p0 = Module["_emscripten_bind_Sphere__get_center_p0"] = asm._emscripten_bind_Sphere__get_center_p0;
var _emscripten_bind_Box3__center_p1 = Module["_emscripten_bind_Box3__center_p1"] = asm._emscripten_bind_Box3__center_p1;
var _emscripten_bind_Line3__set_p2 = Module["_emscripten_bind_Line3__set_p2"] = asm._emscripten_bind_Line3__set_p2;
var _emscripten_bind_Vector4__get_w_p0 = Module["_emscripten_bind_Vector4__get_w_p0"] = asm._emscripten_bind_Vector4__get_w_p0;
var _emscripten_bind_Matrix4__identity_p0 = Module["_emscripten_bind_Matrix4__identity_p0"] = asm._emscripten_bind_Matrix4__identity_p0;
var _emscripten_bind_Frustum__set_p6 = Module["_emscripten_bind_Frustum__set_p6"] = asm._emscripten_bind_Frustum__set_p6;
var _emscripten_bind_Sphere__set_radius_p1 = Module["_emscripten_bind_Sphere__set_radius_p1"] = asm._emscripten_bind_Sphere__set_radius_p1;
var _emscripten_bind_Plane__Plane_p0 = Module["_emscripten_bind_Plane__Plane_p0"] = asm._emscripten_bind_Plane__Plane_p0;
var _emscripten_bind_Vector3__instanceOf_p1 = Module["_emscripten_bind_Vector3__instanceOf_p1"] = asm._emscripten_bind_Vector3__instanceOf_p1;
var _emscripten_bind_Plane__distanceToSphere_p1 = Module["_emscripten_bind_Plane__distanceToSphere_p1"] = asm._emscripten_bind_Plane__distanceToSphere_p1;
var _emscripten_bind_Vector3__add_p1 = Module["_emscripten_bind_Vector3__add_p1"] = asm._emscripten_bind_Vector3__add_p1;
var _emscripten_bind_MATH__randInt_p2 = Module["_emscripten_bind_MATH__randInt_p2"] = asm._emscripten_bind_MATH__randInt_p2;
var _emscripten_bind_Vector3__lengthManhattan_p0 = Module["_emscripten_bind_Vector3__lengthManhattan_p0"] = asm._emscripten_bind_Vector3__lengthManhattan_p0;
var dynCall_viiiii = Module["dynCall_viiiii"] = asm.dynCall_viiiii;
var dynCall_vif = Module["dynCall_vif"] = asm.dynCall_vif;
var dynCall_iiffffff = Module["dynCall_iiffffff"] = asm.dynCall_iiffffff;
var dynCall_vi = Module["dynCall_vi"] = asm.dynCall_vi;
var dynCall_vii = Module["dynCall_vii"] = asm.dynCall_vii;
var dynCall_iiffff = Module["dynCall_iiffff"] = asm.dynCall_iiffff;
var dynCall_ii = Module["dynCall_ii"] = asm.dynCall_ii;
var dynCall_iiff = Module["dynCall_iiff"] = asm.dynCall_iiff;
var dynCall_fff = Module["dynCall_fff"] = asm.dynCall_fff;
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = asm.dynCall_iiiiiiii;
var dynCall_iifi = Module["dynCall_iifi"] = asm.dynCall_iifi;
var dynCall_iiffffffffffffffff = Module["dynCall_iiffffffffffffffff"] = asm.dynCall_iiffffffffffffffff;
var dynCall_iifff = Module["dynCall_iifff"] = asm.dynCall_iifff;
var dynCall_ffff = Module["dynCall_ffff"] = asm.dynCall_ffff;
var dynCall_iiii = Module["dynCall_iiii"] = asm.dynCall_iiii;
var dynCall_ifffffffff = Module["dynCall_ifffffffff"] = asm.dynCall_ifffffffff;
var dynCall_iffffffffffffffff = Module["dynCall_iffffffffffffffff"] = asm.dynCall_iffffffffffffffff;
var dynCall_ffffff = Module["dynCall_ffffff"] = asm.dynCall_ffffff;
var dynCall_fii = Module["dynCall_fii"] = asm.dynCall_fii;
var dynCall_iiif = Module["dynCall_iiif"] = asm.dynCall_iiif;
var dynCall_fiii = Module["dynCall_fiii"] = asm.dynCall_fiii;
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = asm.dynCall_iiiiiii;
var dynCall_iif = Module["dynCall_iif"] = asm.dynCall_iif;
var dynCall_ff = Module["dynCall_ff"] = asm.dynCall_ff;
var dynCall_fi = Module["dynCall_fi"] = asm.dynCall_fi;
var dynCall_iii = Module["dynCall_iii"] = asm.dynCall_iii;
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm.dynCall_viiiiii;
var dynCall_f = Module["dynCall_f"] = asm.dynCall_f;
var dynCall_i = Module["dynCall_i"] = asm.dynCall_i;
var dynCall_iifffffffff = Module["dynCall_iifffffffff"] = asm.dynCall_iifffffffff;
var dynCall_iiiii = Module["dynCall_iiiii"] = asm.dynCall_iiiii;
var dynCall_ifff = Module["dynCall_ifff"] = asm.dynCall_ifff;
var dynCall_iff = Module["dynCall_iff"] = asm.dynCall_iff;
var dynCall_v = Module["dynCall_v"] = asm.dynCall_v;
var dynCall_iffff = Module["dynCall_iffff"] = asm.dynCall_iffff;
var dynCall_viiii = Module["dynCall_viiii"] = asm.dynCall_viiii;
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

FOUR.test = "testing bitch";


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
