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
STATICTOP += 1180;
assert(STATICTOP < TOTAL_MEMORY);
var __ZTVN10__cxxabiv120__si_class_type_infoE;
var __ZTVN10__cxxabiv117__class_type_infoE;
var __ZTISt9exception;
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,92,4,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,104,4,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* memory initializer */ allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,140,0,0,0,60,0,0,0,26,0,0,0,156,0,0,0,116,0,0,0,142,0,0,0,108,0,0,0,140,0,0,0,8,0,0,0,22,0,0,0,178,0,0,0,102,0,0,0,166,0,0,0,92,0,0,0,18,0,0,0,56,0,0,0,50,0,0,0,52,0,0,0,28,0,0,0,164,0,0,0,154,0,0,0,66,0,0,0,130,0,0,0,146,0,0,0,160,0,0,0,150,0,0,0,132,0,0,0,126,0,0,0,40,0,0,0,44,0,0,0,100,0,0,0,2,0,0,0,48,0,0,0,78,0,0,0,188,0,0,0,148,0,0,0,72,0,0,0,158,0,0,0,46,0,0,0,98,0,0,0,186,0,0,0,12,0,0,0,70,0,0,0,76,0,0,0,118,0,0,0,134,0,0,0,184,0,0,0,82,0,0,0,10,0,0,0,168,0,0,0,96,0,0,0,80,0,0,0,34,0,0,0,30,0,0,0,128,0,0,0,38,0,0,0,24,0,0,0,162,0,0,0,74,0,0,0,54,0,0,0,172,0,0,0,138,0,0,0,136,0,0,0,180,0,0,0,114,0,0,0,6,0,0,0,58,0,0,0,110,0,0,0,106,0,0,0,16,0,0,0,68,0,0,0,112,0,0,0,32,0,0,0,176,0,0,0,174,0,0,0,62,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,4,80,0,124,0,0,0,144,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,128,4,80,0,120,0,0,0,0,0,0,0,0,0,0,0,136,4,80,0,104,0,0,0,0,0,0,0,0,0,0,0,144,4,80,0,88,0,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,55,86,101,99,116,111,114,52,0,0,0,0,55,86,101,99,116,111,114,51,0,0,0,0,55,86,101,99,116,111,114,50,0,0,0,0,0,0,0,0,148,3,80,0,0,0,0,0,164,3,80,0,0,0,0,0,0,0,0,0,180,3,80,0,104,4,80,0,0,0,0,0,220,3,80,0,116,4,80,0,0,0,0,0,0,4,80,0,72,4,80,0,0,0,0,0,36,4,80,0,0,0,0,0,48,4,80,0,0,0,0,0,60,4,80,0,0,0,0,0], "i8", ALLOC_NONE, TOTAL_STACK)
function runPostSets() {
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(8))>>2)]=(122);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(12))>>2)]=(182);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(16))>>2)]=(170);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(20))>>2)]=(42);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(24))>>2)]=(20);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(28))>>2)]=(90);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(32))>>2)]=(36);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(36))>>2)]=(86);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(8))>>2)]=(94);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(12))>>2)]=(152);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(16))>>2)]=(170);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(20))>>2)]=(42);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(24))>>2)]=(20);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(28))>>2)]=(4);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(32))>>2)]=(84);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(36))>>2)]=(64);
HEAP32[((5243976)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5243984)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5243992)>>2)]=__ZTISt9exception;
HEAP32[((5243996)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5244008)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5244020)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5244032)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5244040)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5244048)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
}
if (!awaitingMemoryInitializer) runPostSets();
  function ___gxx_personality_v0() {
    }
  var _sqrt=Math.sqrt;
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  var _fabs=Math.abs;
  function __ZNSt9exceptionD2Ev(){}
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i64=_memset;
  function _abort() {
      ABORT = true;
      throw 'abort() at ' + (new Error().stack);
    }
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
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiii(index,a1,a2,a3);
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
function invoke_vif(index,a1,a2) {
  try {
    Module.dynCall_vif(index,a1,a2);
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
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module.dynCall_viiiii(index,a1,a2,a3,a4,a5);
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
function invoke_vi(index,a1) {
  try {
    Module.dynCall_vi(index,a1);
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
function invoke_ii(index,a1) {
  try {
    return Module.dynCall_ii(index,a1);
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
function invoke_iiff(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiff(index,a1,a2,a3);
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
function invoke_v(index) {
  try {
    Module.dynCall_v(index);
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
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6);
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
function invoke_iifff(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iifff(index,a1,a2,a3,a4);
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
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.__ZTISt9exception|0;var n=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var o=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var p=+env.NaN;var q=+env.Infinity;var r=0;var s=0;var t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0.0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=global.Math.floor;var N=global.Math.abs;var O=global.Math.sqrt;var P=global.Math.pow;var Q=global.Math.cos;var R=global.Math.sin;var S=global.Math.tan;var T=global.Math.acos;var U=global.Math.asin;var V=global.Math.atan;var W=global.Math.atan2;var X=global.Math.exp;var Y=global.Math.log;var Z=global.Math.ceil;var _=global.Math.imul;var $=env.abort;var aa=env.assert;var ab=env.asmPrintInt;var ac=env.asmPrintFloat;var ad=env.copyTempDouble;var ae=env.copyTempFloat;var af=env.min;var ag=env.invoke_iiii;var ah=env.invoke_fii;var ai=env.invoke_vif;var aj=env.invoke_viiii;var ak=env.invoke_viiiii;var al=env.invoke_i;var am=env.invoke_vi;var an=env.invoke_iff;var ao=env.invoke_ii;var ap=env.invoke_ifff;var aq=env.invoke_iiff;var ar=env.invoke_iif;var as=env.invoke_v;var at=env.invoke_fi;var au=env.invoke_viiiiii;var av=env.invoke_iii;var aw=env.invoke_iifff;var ax=env.invoke_iiif;var ay=env._sysconf;var az=env.___cxa_throw;var aA=env._abort;var aB=env._llvm_eh_exception;var aC=env._fabs;var aD=env.___setErrNo;var aE=env._sqrt;var aF=env.___cxa_find_matching_catch;var aG=env.___cxa_allocate_exception;var aH=env._time;var aI=env.___cxa_is_number_type;var aJ=env.___cxa_does_inherit;var aK=env.__ZSt18uncaught_exceptionv;var aL=env.___cxa_call_unexpected;var aM=env.__ZNSt9exceptionD2Ev;var aN=env.___errno_location;var aO=env.___gxx_personality_v0;var aP=env._sbrk;var aQ=env.___resumeException;
// EMSCRIPTEN_START_FUNCS
function a7(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+3>>2<<2;return b|0}function a8(){return i|0}function a9(a){a=a|0;i=a}function ba(a){a=a|0;r=a}function bb(a){a=a|0;C=a}function bc(a){a=a|0;D=a}function bd(a){a=a|0;E=a}function be(a){a=a|0;F=a}function bf(a){a=a|0;G=a}function bg(a){a=a|0;H=a}function bh(a){a=a|0;I=a}function bi(a){a=a|0;J=a}function bj(a){a=a|0;K=a}function bk(a){a=a|0;L=a}function bl(a,b,c){a=a|0;b=+b;c=+c;return a|0}function bm(a,b){a=a|0;b=b|0;return(b|0)==55|0}function bn(a,b){a=a|0;b=b|0;return(b|0)==54|0}function bo(a,b){a=a|0;b=b|0;return(b|0)==53|0}function bp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0,i=0.0,j=0.0;e=a+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+4|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);do{if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}else{g=d+4|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=j){break}h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}}while(0);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+12|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);do{if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}else{g=d+12|0;j=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=j){break}h[k>>3]=j,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0}}while(0);e=a+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=b+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<i){h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}g=d+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);if(f<=i){return a|0}h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function bq(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+28|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+52|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+36|0;n=m+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+60|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+44|0;e=m+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+68|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;h[k>>3]=g,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function br(a,b,d,e){a=a|0;b=+b;d=+d;e=+e;var f=0;f=a+4|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;h[k>>3]=d,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}function bs(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function bt(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bu(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function bv(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+100|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+108|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+116|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bw(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bx(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0,i=0.0,j=0,l=0,m=0.0,n=0;e=b+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=d+20|0;i=f*(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=b+20|0;f=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);l=d+12|0;m=i-f*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=a+4|0;h[k>>3]=m,c[n>>2]=c[k>>2]|0,c[n+4>>2]=c[k+4>>2]|0;m=(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=d+4|0;f=m*(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);d=b+4|0;m=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);i=f-m*(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);g=a+12|0;h[k>>3]=i,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;i=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);m=i*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);f=m-i*(c[k>>2]=c[j>>2]|0,c[k+4>>2]=c[j+4>>2]|0,+h[k>>3]);j=a+20|0;h[k>>3]=f,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function by(a){a=a|0;var b=0,d=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+12|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;b=a+20|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])*-1.0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}function bz(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;l=b+100|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;n=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+44|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+76|0;n=m+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;d=b+108|0;m=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=m,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;m=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+52|0;e=m+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+84|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;f=b+116|0;j=g+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function bA(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function bB(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function bC(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])-e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bD(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e>g){h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+12|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(g>e){h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e<=g){return a|0}h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bE(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0.0,g=0.0,i=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=g+(f-g)*d;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;i=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);f=g+(i-g)*d;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);i=g+(f-g)*d;h[k>>3]=i,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function bF(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;i=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+(f*f+g*g+i*i)}function bG(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])+e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function bH(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f*(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function bI(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function bJ(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0,o=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+20|0;m=g*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);n=b+12|0;o=m-j*(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+4|0;o=j*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);j=o-e*(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);h[k>>3]=j,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;j=e*(c[k>>2]=c[n>>2]|0,c[k+4>>2]=c[n+4>>2]|0,+h[k>>3]);e=j-g*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);h[k>>3]=e,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function bK(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function bL(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(d*d+e*e+f*f)}function bM(a,b){a=a|0;b=b|0;var d=0,e=0.0;if((b|0)==0){d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+e}else if((b|0)==1){d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+e}else if((b|0)==2){b=a+20|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+e}else{e=0.0;return+e}return 0.0}function bN(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bO(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bP(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bQ(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bR(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bS(){var a=0;a=cU(20)|0;c[a+8>>2]=0;c[a+12>>2]=16;c[a+16>>2]=cV(64)|0;return a|0}function bT(a,b){a=a|0;b=b|0;return a4[c[c[a>>2]>>2]&255](a,b)|0}function bU(){var a=0;a=cU(28)|0;c[a>>2]=5243772;cX(a+4|0,0,24);return a|0}function bV(a,b,d){a=+a;b=+b;d=+d;var e=0,f=0,g=0;e=cU(28)|0;f=e;c[e>>2]=5243772;g=e+4|0;h[k>>3]=a,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+12|0;h[k>>3]=b,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;g=e+20|0;h[k>>3]=d,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return f|0}function bW(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0;d=a+4|0;if(b!=0.0){e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;f=a+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])/b;h[k>>3]=e,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return a|0}else{cX(d|0,0,24);return a|0}return 0}function bX(a){a=a|0;var b=0,d=0.0,e=0.0;b=a+4|0;d=+N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));b=a+12|0;e=d+ +N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]));b=a+20|0;return+(e+ +N(+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])))}function bY(a){a=a|0;var b=0,d=0.0,e=0,f=0.0,g=0,i=0.0,j=0.0,l=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);e=a+12|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);g=a+20|0;i=(c[k>>2]=c[g>>2]|0,c[k+4>>2]=c[g+4>>2]|0,+h[k>>3]);j=+O(+(d*d+f*f+i*i));if(j!=0.0){l=d/j;h[k>>3]=l,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;l=f/j;h[k>>3]=l,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;l=i/j;h[k>>3]=l,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;return a|0}else{cX(b|0,0,24);return a|0}return 0}function bZ(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;i=e-(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);return+(+O(+(f*f+g*g+i*i)))}function b_(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0,i=0,j=0,l=0.0,m=0,n=0.0,o=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;i=a+12|0;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;j=a+20|0;h[k>>3]=g,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;l=+O(+(e*e+f*f+g*g));m=b+36|0;g=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+44|0;f=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+52|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=f,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;h[k>>3]=e,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;n=+O(+(g*g+f*f+e*e));m=b+68|0;e=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+76|0;f=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=b+84|0;g=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);o=+O(+(e*e+f*f+g*g));h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;h[k>>3]=o,c[j>>2]=c[k>>2]|0,c[j+4>>2]=c[k+4>>2]|0;return a|0}function b$(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=b+12|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+44|0;n=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+76|0;m=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=b+20|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+52|0;e=m+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+84|0;m=e+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;h[k>>3]=m,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;e=+O(+(m*m+g*g+j*j));if(e!=0.0){n=m/e;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=g/e;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=j/e;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}else{cX(d|0,0,24);return a|0}return 0}function b0(a){a=a|0;var b=0,d=0,e=0,f=0,g=0.0;b=cU(28)|0;d=b;c[b>>2]=5243772;e=b+4|0;f=e;c[f>>2]=0;c[f+4>>2]=0;f=a+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=e;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+12|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=a+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=b+20|0;h[k>>3]=g,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return d|0}function b1(a){a=a|0;return}function b2(a){a=a|0;return}function b3(a){a=a|0;return}function b4(a){a=a|0;return}function b5(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+4|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e<g){h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+12|0;g=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+12|0;e=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(g<e){h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0}d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);if(e>=g){return a|0}h[k>>3]=g,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function b6(a,b){a=a|0;b=+b;var d=0,e=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*b;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function b7(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;do{if(e==(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])){f=b+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+12|0;if(g!=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){break}f=b+20|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);f=a+20|0;if(g==(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])){i=1}else{break}return i|0}}while(0);i=0;return i|0}function b8(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*f;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;f=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;h[k>>3]=f,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function b9(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f+(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function ca(a,b){a=a|0;b=b|0;var d=0,e=0.0;d=b+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+4|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;h[k>>3]=e,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return a|0}function cb(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0,n=0.0,o=0.0,p=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=b+28|0;n=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*e;m=b+60|0;o=n+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*g;m=b+92|0;n=o+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3])*j;m=b+124|0;o=1.0/(n+(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]));n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*e;l=b+36|0;p=n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*g;l=b+68|0;n=p+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3])*j;l=b+100|0;p=(n+(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]))*o;h[k>>3]=p,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;d=b+12|0;p=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*e;d=b+44|0;n=p+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*g;d=b+76|0;p=n+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3])*j;d=b+108|0;n=(p+(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]))*o;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=b+20|0;n=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*e;f=b+52|0;e=n+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*g;f=b+84|0;g=e+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3])*j;f=b+116|0;j=(g+(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]))*o;h[k>>3]=j,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,g=0.0;e=b+4|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+4|0;g=f-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+4|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+12|0;g=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+12|0;f=g-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+12|0;h[k>>3]=f,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;e=b+20|0;f=(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=d+20|0;g=f-(c[k>>2]=c[e>>2]|0,c[k+4>>2]=c[e+4>>2]|0,+h[k>>3]);e=a+20|0;h[k>>3]=g,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}function cd(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0,t=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=b+4|0;m=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+12|0;n=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+20|0;o=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);l=b+28|0;p=(c[k>>2]=c[l>>2]|0,c[k+4>>2]=c[l+4>>2]|0,+h[k>>3]);q=p*e+n*j-o*g;r=o*j;s=p*g+n*e-r;t=n*g;g=p*j+t-o*e;j=e*(-0.0-p)-t-r;r=-0.0-m;m=-0.0-o;o=-0.0-n;n=q*p+j*r+s*m-g*o;h[k>>3]=n,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;n=s*p+j*o+g*r-q*m;h[k>>3]=n,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;n=g*p+j*m+q*o-s*r;h[k>>3]=n,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function ce(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0.0,g=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+4|0;f=e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+12|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+12|0;g=f+e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=a+20|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);d=b+20|0;return+(g+e*(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]))}function cf(a,b,d){a=a|0;b=b|0;d=+d;var e=0;if((b<<24>>24|0)==120){e=a+4|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}else if((b<<24>>24|0)==121){e=a+12|0;h[k>>3]=d,c[e>>2]=c[k>>2]|0,c[e+4>>2]=c[k+4>>2]|0;return a|0}else if((b<<24>>24|0)==122){b=a+20|0;h[k>>3]=d,c[b>>2]=c[k>>2]|0,c[b+4>>2]=c[k+4>>2]|0;return a|0}else{return a|0}return 0}function cg(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function ch(a,b){a=a|0;b=+b;var d=0;d=a+20|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function ci(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cj(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function ck(a){a=a|0;var b=0;b=a+20|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cl(a){a=a|0;var b=0;b=a+28|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cm(a,b){a=a|0;b=+b;var d=0;d=a+28|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cn(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function co(a,b){a=a|0;b=+b;var d=0;d=a+4|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cp(a){a=a|0;var b=0;b=a+4|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cq(a){a=a|0;var b=0;b=a+12|0;return+(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3])}function cr(a,b){a=a|0;b=+b;var d=0;d=a+12|0;h[k>>3]=b,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;return}function cs(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function ct(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0,g=0.0,i=0,j=0.0,l=0.0,m=0.0;d=a+4|0;e=(c[k>>2]=c[d>>2]|0,c[k+4>>2]=c[d+4>>2]|0,+h[k>>3]);f=a+12|0;g=(c[k>>2]=c[f>>2]|0,c[k+4>>2]=c[f+4>>2]|0,+h[k>>3]);i=a+20|0;j=(c[k>>2]=c[i>>2]|0,c[k+4>>2]=c[i+4>>2]|0,+h[k>>3]);l=+O(+(e*e+g*g+j*j));if(!(l!=0.0&l!=b)){return a|0}m=b/l;l=e*m;h[k>>3]=l,c[d>>2]=c[k>>2]|0,c[d+4>>2]=c[k+4>>2]|0;l=g*m;h[k>>3]=l,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;l=j*m;h[k>>3]=l,c[i>>2]=c[k>>2]|0,c[i+4>>2]=c[k+4>>2]|0;return a|0}function cu(a){a=a|0;if((a|0)==0){return}cR(a);return}function cv(a){a=a|0;var b=0,d=0.0,e=0.0,f=0.0;b=a+4|0;d=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+12|0;e=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);b=a+20|0;f=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);return+(+O(+(d*d+e*e+f*f)))}function cw(a,b){a=a|0;b=b|0;return a4[c[c[a>>2]>>2]&255](a,b)|0}function cx(a){a=a|0;if((a|0)==0){return}cR(a);return}function cy(){var a=0;a=cU(36)|0;c[a>>2]=5243756;return a|0}function cz(a,b){a=a|0;b=b|0;return a4[c[c[a>>2]>>2]&255](a,b)|0}function cA(a,b,c){a=a|0;b=+b;c=+c;return bl(a,0.0,0.0)|0}function cB(){var a=0;a=cU(20)|0;c[a>>2]=5243788;cX(a+4|0,0,16);return a|0}function cC(a,b){a=+a;b=+b;var d=0,e=0,f=0;d=cU(20)|0;e=d;c[d>>2]=5243788;f=d+4|0;h[k>>3]=a,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;f=d+12|0;h[k>>3]=b,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0;return e|0}function cD(a){a=a|0;if((a|0)==0){return}cR(a);return}function cE(a){a=a|0;cR(a);return}function cF(a){a=a|0;cR(a);return}function cG(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+56|0;f=e|0;do{if((a|0)==(b|0)){g=1}else{if((b|0)==0){g=0;break}h=cI(b,5244020,5244008,-1)|0;j=h;if((h|0)==0){g=0;break}cX(f|0,0,56);c[f>>2]=j;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;aU[c[(c[h>>2]|0)+28>>2]&255](j,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;break}c[d>>2]=c[f+16>>2]|0;g=1}}while(0);i=e;return g|0}function cH(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;aU[c[(c[g>>2]|0)+28>>2]&255](g,d,e,f);return}g=d+16|0;b=c[g>>2]|0;if((b|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function cI(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+56|0;g=f|0;h=c[a>>2]|0;j=a+(c[h-8>>2]|0)|0;k=c[h-4>>2]|0;h=k;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;e=g+16|0;b=g+20|0;a=g+24|0;l=g+28|0;m=g+32|0;n=g+40|0;cX(e|0,0,39);if((k|0)==(d|0)){c[g+48>>2]=1;a3[c[(c[k>>2]|0)+20>>2]&255](h,g,j,j,1,0);i=f;return((c[a>>2]|0)==1?j:0)|0}aV[c[(c[k>>2]|0)+24>>2]&255](h,g,j,1,0);j=c[g+36>>2]|0;do{if((j|0)==0){if((c[n>>2]|0)!=1){o=0;break}if((c[l>>2]|0)!=1){o=0;break}o=(c[m>>2]|0)==1?c[b>>2]|0:0}else if((j|0)==1){if((c[a>>2]|0)!=1){if((c[n>>2]|0)!=0){o=0;break}if((c[l>>2]|0)!=1){o=0;break}if((c[m>>2]|0)!=1){o=0;break}}o=c[e>>2]|0}else{o=0}}while(0);i=f;return o|0}function cJ(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)!=(c[d>>2]|0)){h=c[b+8>>2]|0;aV[c[(c[h>>2]|0)+24>>2]&255](h,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;l=c[b+8>>2]|0;a3[c[(c[l>>2]|0)+20>>2]&255](l,d,e,e,1,g);do{if((a[k]&1)<<24>>24==0){m=0;n=238}else{if((a[j]&1)<<24>>24==0){m=1;n=238;break}else{break}}}while(0);L259:do{if((n|0)==238){c[h>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){n=241;break}a[d+54|0]=1;if(m){break L259}else{break}}else{n=241}}while(0);if((n|0)==241){if(m){break}}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function cK(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}g=d+28|0;if((c[g>>2]|0)==1){return}c[g>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function cL(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;i=g}else{i=b}if(!((c[d+48>>2]|0)==1&(i|0)==1)){return}a[d+54|0]=1;return}function cM(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;if((b|0)!=(c[d+8>>2]|0)){i=c[b+8>>2]|0;a3[c[(c[i>>2]|0)+20>>2]&255](i,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;j=g}else{j=h}if(!((c[d+48>>2]|0)==1&(j|0)==1)){return}a[d+54|0]=1;return}function cN(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,az=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aI=0,aJ=0,aK=0;do{if(a>>>0<245){if(a>>>0<11){b=16}else{b=a+11&-8}d=b>>>3;e=c[1310813]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=5243292+(h<<2)|0;j=5243292+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[1310813]=e&(1<<g^-1)}else{if(l>>>0<(c[1310817]|0)>>>0){aA();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{aA();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[1310815]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=5243292+(p<<2)|0;m=5243292+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[1310813]=e&(1<<r^-1)}else{if(l>>>0<(c[1310817]|0)>>>0){aA();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{aA();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[1310815]|0;if((l|0)!=0){q=c[1310818]|0;d=l>>>2&1073741822;f=5243292+(d<<2)|0;k=c[1310813]|0;h=1<<(l>>>3);do{if((k&h|0)==0){c[1310813]=k|h;s=f;t=5243292+(d+2<<2)|0}else{l=5243292+(d+2<<2)|0;g=c[l>>2]|0;if(g>>>0>=(c[1310817]|0)>>>0){s=g;t=l;break}aA();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[1310815]=m;c[1310818]=e;n=i;return n|0}d=c[1310814]|0;if((d|0)==0){o=b;break}h=(d&-d)-1|0;d=h>>>12&16;k=h>>>(d>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;l=r>>>(p>>>0);r=l>>>1&1;g=c[5243556+((h|d|k|p|r)+(l>>>(r>>>0))<<2)>>2]|0;r=g;l=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;l=k?u:l;p=k?g:p}r=l;i=c[1310817]|0;if(r>>>0<i>>>0){aA();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){aA();return 0}e=c[l+24>>2]|0;f=c[l+12>>2]|0;L409:do{if((f|0)==(l|0)){q=l+20|0;g=c[q>>2]|0;do{if((g|0)==0){k=l+16|0;d=c[k>>2]|0;if((d|0)==0){v=0;break L409}else{w=k;x=d;break}}else{w=q;x=g}}while(0);while(1){g=x+20|0;q=c[g>>2]|0;if((q|0)!=0){w=g;x=q;continue}q=x+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=q;x=g}}if(w>>>0<i>>>0){aA();return 0}else{c[w>>2]=0;v=x;break}}else{g=c[l+8>>2]|0;if(g>>>0<i>>>0){aA();return 0}q=g+12|0;if((c[q>>2]|0)!=(l|0)){aA();return 0}d=f+8|0;if((c[d>>2]|0)==(l|0)){c[q>>2]=f;c[d>>2]=g;v=f;break}else{aA();return 0}}}while(0);L431:do{if((e|0)!=0){f=l+28|0;i=5243556+(c[f>>2]<<2)|0;do{if((l|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[1310814]=c[1310814]&(1<<c[f>>2]^-1);break L431}else{if(e>>>0<(c[1310817]|0)>>>0){aA();return 0}g=e+16|0;if((c[g>>2]|0)==(l|0)){c[g>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L431}}}while(0);if(v>>>0<(c[1310817]|0)>>>0){aA();return 0}c[v+24>>2]=e;f=c[l+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[l+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16){e=p+b|0;c[l+4>>2]=e|3;f=r+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[l+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b|0)>>2]=p;f=c[1310815]|0;if((f|0)!=0){e=c[1310818]|0;i=f>>>2&1073741822;g=5243292+(i<<2)|0;d=c[1310813]|0;q=1<<(f>>>3);do{if((d&q|0)==0){c[1310813]=d|q;y=g;z=5243292+(i+2<<2)|0}else{f=5243292+(i+2<<2)|0;k=c[f>>2]|0;if(k>>>0>=(c[1310817]|0)>>>0){y=k;z=f;break}aA();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=g}c[1310815]=p;c[1310818]=m}i=l+8|0;if((i|0)==0){o=b;break}else{n=i}return n|0}else{if(a>>>0>4294967231){o=-1;break}i=a+11|0;q=i&-8;d=c[1310814]|0;if((d|0)==0){o=q;break}r=-q|0;f=i>>>8;do{if((f|0)==0){A=0}else{if(q>>>0>16777215){A=31;break}i=(f+1048320|0)>>>16&8;k=f<<i;h=(k+520192|0)>>>16&4;j=k<<h;k=(j+245760|0)>>>16&2;B=(14-(h|i|k)|0)+(j<<k>>>15)|0;A=q>>>((B+7|0)>>>0)&1|B<<1}}while(0);f=c[5243556+(A<<2)>>2]|0;L479:do{if((f|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}l=0;m=r;p=f;g=q<<F;e=0;while(1){B=c[p+4>>2]&-8;k=B-q|0;if(k>>>0<m>>>0){if((B|0)==(q|0)){C=p;D=k;E=p;break L479}else{G=p;H=k}}else{G=l;H=m}k=c[p+20>>2]|0;B=c[p+16+(g>>>31<<2)>>2]|0;j=(k|0)==0|(k|0)==(B|0)?e:k;if((B|0)==0){C=G;D=H;E=j;break L479}else{l=G;m=H;p=B;g=g<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){f=2<<A;r=d&(f|-f);if((r|0)==0){o=q;break}f=(r&-r)-1|0;r=f>>>12&16;e=f>>>(r>>>0);f=e>>>5&8;g=e>>>(f>>>0);e=g>>>2&4;p=g>>>(e>>>0);g=p>>>1&2;m=p>>>(g>>>0);p=m>>>1&1;I=c[5243556+((f|r|e|g|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}L494:do{if((I|0)==0){J=D;K=C}else{p=I;m=D;g=C;while(1){e=(c[p+4>>2]&-8)-q|0;r=e>>>0<m>>>0;f=r?e:m;e=r?p:g;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=f;g=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=f;K=e;break L494}else{p=r;m=f;g=e}}}}while(0);if((K|0)==0){o=q;break}if(J>>>0>=((c[1310815]|0)-q|0)>>>0){o=q;break}d=K;g=c[1310817]|0;if(d>>>0<g>>>0){aA();return 0}m=d+q|0;p=m;if(d>>>0>=m>>>0){aA();return 0}e=c[K+24>>2]|0;f=c[K+12>>2]|0;L507:do{if((f|0)==(K|0)){r=K+20|0;l=c[r>>2]|0;do{if((l|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break L507}else{M=j;N=B;break}}else{M=r;N=l}}while(0);while(1){l=N+20|0;r=c[l>>2]|0;if((r|0)!=0){M=l;N=r;continue}r=N+16|0;l=c[r>>2]|0;if((l|0)==0){break}else{M=r;N=l}}if(M>>>0<g>>>0){aA();return 0}else{c[M>>2]=0;L=N;break}}else{l=c[K+8>>2]|0;if(l>>>0<g>>>0){aA();return 0}r=l+12|0;if((c[r>>2]|0)!=(K|0)){aA();return 0}B=f+8|0;if((c[B>>2]|0)==(K|0)){c[r>>2]=f;c[B>>2]=l;L=f;break}else{aA();return 0}}}while(0);L529:do{if((e|0)!=0){f=K+28|0;g=5243556+(c[f>>2]<<2)|0;do{if((K|0)==(c[g>>2]|0)){c[g>>2]=L;if((L|0)!=0){break}c[1310814]=c[1310814]&(1<<c[f>>2]^-1);break L529}else{if(e>>>0<(c[1310817]|0)>>>0){aA();return 0}l=e+16|0;if((c[l>>2]|0)==(K|0)){c[l>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L529}}}while(0);if(L>>>0<(c[1310817]|0)>>>0){aA();return 0}c[L+24>>2]=e;f=c[K+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[L+16>>2]=f;c[f+24>>2]=L;break}}}while(0);f=c[K+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[L+20>>2]=f;c[f+24>>2]=L;break}}}while(0);do{if(J>>>0<16){e=J+q|0;c[K+4>>2]=e|3;f=d+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[K+4>>2]=q|3;c[d+(q|4)>>2]=J|1;c[d+(J+q|0)>>2]=J;if(J>>>0<256){f=J>>>2&1073741822;e=5243292+(f<<2)|0;g=c[1310813]|0;l=1<<(J>>>3);do{if((g&l|0)==0){c[1310813]=g|l;O=e;P=5243292+(f+2<<2)|0}else{B=5243292+(f+2<<2)|0;r=c[B>>2]|0;if(r>>>0>=(c[1310817]|0)>>>0){O=r;P=B;break}aA();return 0}}while(0);c[P>>2]=p;c[O+12>>2]=p;c[d+(q+8|0)>>2]=O;c[d+(q+12|0)>>2]=e;break}f=m;l=J>>>8;do{if((l|0)==0){Q=0}else{if(J>>>0>16777215){Q=31;break}g=(l+1048320|0)>>>16&8;B=l<<g;r=(B+520192|0)>>>16&4;j=B<<r;B=(j+245760|0)>>>16&2;k=(14-(r|g|B)|0)+(j<<B>>>15)|0;Q=J>>>((k+7|0)>>>0)&1|k<<1}}while(0);l=5243556+(Q<<2)|0;c[d+(q+28|0)>>2]=Q;c[d+(q+20|0)>>2]=0;c[d+(q+16|0)>>2]=0;e=c[1310814]|0;k=1<<Q;if((e&k|0)==0){c[1310814]=e|k;c[l>>2]=f;c[d+(q+24|0)>>2]=l;c[d+(q+12|0)>>2]=f;c[d+(q+8|0)>>2]=f;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}k=J<<R;e=c[l>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(J|0)){break}S=e+16+(k>>>31<<2)|0;l=c[S>>2]|0;if((l|0)==0){T=465;break}else{k=k<<1;e=l}}if((T|0)==465){if(S>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[S>>2]=f;c[d+(q+24|0)>>2]=e;c[d+(q+12|0)>>2]=f;c[d+(q+8|0)>>2]=f;break}}k=e+8|0;l=c[k>>2]|0;B=c[1310817]|0;if(e>>>0<B>>>0){aA();return 0}if(l>>>0<B>>>0){aA();return 0}else{c[l+12>>2]=f;c[k>>2]=f;c[d+(q+8|0)>>2]=l;c[d+(q+12|0)>>2]=e;c[d+(q+24|0)>>2]=0;break}}}while(0);d=K+8|0;if((d|0)==0){o=q;break}else{n=d}return n|0}}while(0);K=c[1310815]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[1310818]|0;if(S>>>0>15){R=J;c[1310818]=R+o|0;c[1310815]=S;c[R+(o+4|0)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[1310815]=0;c[1310818]=0;c[J+4>>2]=K|3;S=J+(K+4|0)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[1310816]|0;if(o>>>0<J>>>0){S=J-o|0;c[1310816]=S;J=c[1310819]|0;K=J;c[1310819]=K+o|0;c[K+(o+4|0)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[1310720]|0)==0){J=ay(8)|0;if((J-1&J|0)==0){c[1310722]=J;c[1310721]=J;c[1310723]=-1;c[1310724]=2097152;c[1310725]=0;c[1310924]=0;c[1310720]=aH(0)&-16^1431655768;break}else{aA();return 0}}}while(0);J=o+48|0;S=c[1310722]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[1310923]|0;do{if((O|0)!=0){P=c[1310921]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L621:do{if((c[1310924]&4|0)==0){O=c[1310819]|0;L623:do{if((O|0)==0){T=495}else{L=O;P=5243700;while(1){U=P|0;N=c[U>>2]|0;if(N>>>0<=L>>>0){V=P+4|0;if((N+(c[V>>2]|0)|0)>>>0>L>>>0){break}}N=c[P+8>>2]|0;if((N|0)==0){T=495;break L623}else{P=N}}if((P|0)==0){T=495;break}L=R-(c[1310816]|0)&Q;if(L>>>0>=2147483647){W=0;break}e=aP(L|0)|0;f=(e|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=f?e:-1;Y=f?L:0;Z=L;_=e;T=504;break}}while(0);do{if((T|0)==495){O=aP(0)|0;if((O|0)==-1){W=0;break}q=O;e=c[1310721]|0;L=e-1|0;if((L&q|0)==0){aa=S}else{aa=(S-q|0)+(L+q&-e)|0}e=c[1310921]|0;q=e+aa|0;if(!(aa>>>0>o>>>0&aa>>>0<2147483647)){W=0;break}L=c[1310923]|0;if((L|0)!=0){if(q>>>0<=e>>>0|q>>>0>L>>>0){W=0;break}}L=aP(aa|0)|0;q=(L|0)==(O|0);X=q?O:-1;Y=q?aa:0;Z=aa;_=L;T=504;break}}while(0);L643:do{if((T|0)==504){L=-Z|0;if((X|0)!=-1){ab=Y;ac=X;T=515;break L621}do{if((_|0)!=-1&Z>>>0<2147483647&Z>>>0<J>>>0){q=c[1310722]|0;O=(K-Z|0)+q&-q;if(O>>>0>=2147483647){ad=Z;break}if((aP(O|0)|0)==-1){aP(L|0);W=Y;break L643}else{ad=O+Z|0;break}}else{ad=Z}}while(0);if((_|0)==-1){W=Y}else{ab=ad;ac=_;T=515;break L621}}}while(0);c[1310924]=c[1310924]|4;ae=W;T=512;break}else{ae=0;T=512}}while(0);do{if((T|0)==512){if(S>>>0>=2147483647){break}W=aP(S|0)|0;_=aP(0)|0;if(!((_|0)!=-1&(W|0)!=-1&W>>>0<_>>>0)){break}ad=_-W|0;_=ad>>>0>(o+40|0)>>>0;Y=_?W:-1;if((Y|0)==-1){break}else{ab=_?ad:ae;ac=Y;T=515;break}}}while(0);do{if((T|0)==515){ae=(c[1310921]|0)+ab|0;c[1310921]=ae;if(ae>>>0>(c[1310922]|0)>>>0){c[1310922]=ae}ae=c[1310819]|0;L663:do{if((ae|0)==0){S=c[1310817]|0;if((S|0)==0|ac>>>0<S>>>0){c[1310817]=ac}c[1310925]=ac;c[1310926]=ab;c[1310928]=0;c[1310822]=c[1310720]|0;c[1310821]=-1;S=0;while(1){Y=S<<1;ad=5243292+(Y<<2)|0;c[5243292+(Y+3<<2)>>2]=ad;c[5243292+(Y+2<<2)>>2]=ad;ad=S+1|0;if((ad|0)==32){break}else{S=ad}}S=ac+8|0;if((S&7|0)==0){af=0}else{af=-S&7}S=(ab-40|0)-af|0;c[1310819]=ac+af|0;c[1310816]=S;c[ac+(af+4|0)>>2]=S|1;c[ac+(ab-36|0)>>2]=40;c[1310820]=c[1310724]|0}else{S=5243700;while(1){if((S|0)==0){break}ag=c[S>>2]|0;ah=S+4|0;ai=c[ah>>2]|0;if((ac|0)==(ag+ai|0)){T=528;break}S=c[S+8>>2]|0}do{if((T|0)==528){if((c[S+12>>2]&8|0)!=0){break}ad=ae;if(!(ad>>>0>=ag>>>0&ad>>>0<ac>>>0)){break}c[ah>>2]=ai+ab|0;ad=c[1310819]|0;Y=(c[1310816]|0)+ab|0;_=ad;W=ad+8|0;if((W&7|0)==0){aj=0}else{aj=-W&7}W=Y-aj|0;c[1310819]=_+aj|0;c[1310816]=W;c[_+(aj+4|0)>>2]=W|1;c[_+(Y+4|0)>>2]=40;c[1310820]=c[1310724]|0;break L663}}while(0);if(ac>>>0<(c[1310817]|0)>>>0){c[1310817]=ac}S=ac+ab|0;Y=5243700;while(1){if((Y|0)==0){break}ak=Y|0;if((c[ak>>2]|0)==(S|0)){T=539;break}Y=c[Y+8>>2]|0}do{if((T|0)==539){if((c[Y+12>>2]&8|0)!=0){break}c[ak>>2]=ac;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+ab|0;S=ac+8|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ac+(ab+8|0)|0;if((S&7|0)==0){am=0}else{am=-S&7}S=ac+(am+ab|0)|0;_=S;W=al+o|0;ad=ac+W|0;Z=ad;K=(S-(ac+al|0)|0)-o|0;c[ac+(al+4|0)>>2]=o|3;do{if((_|0)==(c[1310819]|0)){J=(c[1310816]|0)+K|0;c[1310816]=J;c[1310819]=Z;c[ac+(W+4|0)>>2]=J|1}else{if((_|0)==(c[1310818]|0)){J=(c[1310815]|0)+K|0;c[1310815]=J;c[1310818]=Z;c[ac+(W+4|0)>>2]=J|1;c[ac+(J+W|0)>>2]=J;break}J=ab+4|0;X=c[ac+(J+am|0)>>2]|0;if((X&3|0)==1){aa=X&-8;V=X>>>3;L710:do{if(X>>>0<256){U=c[ac+((am|8)+ab|0)>>2]|0;Q=c[ac+((ab+12|0)+am|0)>>2]|0;R=5243292+((X>>>2&1073741822)<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[1310817]|0)>>>0){aA();return 0}if((c[U+12>>2]|0)==(_|0)){break}aA();return 0}}while(0);if((Q|0)==(U|0)){c[1310813]=c[1310813]&(1<<V^-1);break}do{if((Q|0)==(R|0)){an=Q+8|0}else{if(Q>>>0<(c[1310817]|0)>>>0){aA();return 0}L=Q+8|0;if((c[L>>2]|0)==(_|0)){an=L;break}aA();return 0}}while(0);c[U+12>>2]=Q;c[an>>2]=U}else{R=S;L=c[ac+((am|24)+ab|0)>>2]|0;P=c[ac+((ab+12|0)+am|0)>>2]|0;L731:do{if((P|0)==(R|0)){O=am|16;q=ac+(J+O|0)|0;e=c[q>>2]|0;do{if((e|0)==0){f=ac+(O+ab|0)|0;N=c[f>>2]|0;if((N|0)==0){ao=0;break L731}else{ap=f;aq=N;break}}else{ap=q;aq=e}}while(0);while(1){e=aq+20|0;q=c[e>>2]|0;if((q|0)!=0){ap=e;aq=q;continue}q=aq+16|0;e=c[q>>2]|0;if((e|0)==0){break}else{ap=q;aq=e}}if(ap>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[ap>>2]=0;ao=aq;break}}else{e=c[ac+((am|8)+ab|0)>>2]|0;if(e>>>0<(c[1310817]|0)>>>0){aA();return 0}q=e+12|0;if((c[q>>2]|0)!=(R|0)){aA();return 0}O=P+8|0;if((c[O>>2]|0)==(R|0)){c[q>>2]=P;c[O>>2]=e;ao=P;break}else{aA();return 0}}}while(0);if((L|0)==0){break}P=ac+((ab+28|0)+am|0)|0;U=5243556+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=ao;if((ao|0)!=0){break}c[1310814]=c[1310814]&(1<<c[P>>2]^-1);break L710}else{if(L>>>0<(c[1310817]|0)>>>0){aA();return 0}Q=L+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=ao}else{c[L+20>>2]=ao}if((ao|0)==0){break L710}}}while(0);if(ao>>>0<(c[1310817]|0)>>>0){aA();return 0}c[ao+24>>2]=L;R=am|16;P=c[ac+(R+ab|0)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[ao+16>>2]=P;c[P+24>>2]=ao;break}}}while(0);P=c[ac+(J+R|0)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[ao+20>>2]=P;c[P+24>>2]=ao;break}}}while(0);ar=ac+((aa|am)+ab|0)|0;as=aa+K|0}else{ar=_;as=K}J=ar+4|0;c[J>>2]=c[J>>2]&-2;c[ac+(W+4|0)>>2]=as|1;c[ac+(as+W|0)>>2]=as;if(as>>>0<256){J=as>>>2&1073741822;V=5243292+(J<<2)|0;X=c[1310813]|0;P=1<<(as>>>3);do{if((X&P|0)==0){c[1310813]=X|P;at=V;au=5243292+(J+2<<2)|0}else{L=5243292+(J+2<<2)|0;U=c[L>>2]|0;if(U>>>0>=(c[1310817]|0)>>>0){at=U;au=L;break}aA();return 0}}while(0);c[au>>2]=Z;c[at+12>>2]=Z;c[ac+(W+8|0)>>2]=at;c[ac+(W+12|0)>>2]=V;break}J=ad;P=as>>>8;do{if((P|0)==0){av=0}else{if(as>>>0>16777215){av=31;break}X=(P+1048320|0)>>>16&8;aa=P<<X;L=(aa+520192|0)>>>16&4;U=aa<<L;aa=(U+245760|0)>>>16&2;Q=(14-(L|X|aa)|0)+(U<<aa>>>15)|0;av=as>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);P=5243556+(av<<2)|0;c[ac+(W+28|0)>>2]=av;c[ac+(W+20|0)>>2]=0;c[ac+(W+16|0)>>2]=0;V=c[1310814]|0;Q=1<<av;if((V&Q|0)==0){c[1310814]=V|Q;c[P>>2]=J;c[ac+(W+24|0)>>2]=P;c[ac+(W+12|0)>>2]=J;c[ac+(W+8|0)>>2]=J;break}if((av|0)==31){aw=0}else{aw=25-(av>>>1)|0}Q=as<<aw;V=c[P>>2]|0;while(1){if((c[V+4>>2]&-8|0)==(as|0)){break}ax=V+16+(Q>>>31<<2)|0;P=c[ax>>2]|0;if((P|0)==0){T=612;break}else{Q=Q<<1;V=P}}if((T|0)==612){if(ax>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[ax>>2]=J;c[ac+(W+24|0)>>2]=V;c[ac+(W+12|0)>>2]=J;c[ac+(W+8|0)>>2]=J;break}}Q=V+8|0;P=c[Q>>2]|0;aa=c[1310817]|0;if(V>>>0<aa>>>0){aA();return 0}if(P>>>0<aa>>>0){aA();return 0}else{c[P+12>>2]=J;c[Q>>2]=J;c[ac+(W+8|0)>>2]=P;c[ac+(W+12|0)>>2]=V;c[ac+(W+24|0)>>2]=0;break}}}while(0);n=ac+(al|8)|0;return n|0}}while(0);Y=ae;W=5243700;while(1){ad=c[W>>2]|0;if(ad>>>0<=Y>>>0){Z=c[W+4>>2]|0;if((ad+Z|0)>>>0>Y>>>0){az=ad;aB=Z;break}}Z=c[W+8>>2]|0;if((Z|0)==0){T=624;break}else{W=Z}}if((T|0)==624){$(4);az=0;aB=aC}W=az+aB|0;Z=az+(aB-39|0)|0;if((Z&7|0)==0){aD=0}else{aD=-Z&7}Z=az+((aB-47|0)+aD|0)|0;ad=Z>>>0<(ae+16|0)>>>0?Y:Z;Z=ad+8|0;K=ac+8|0;if((K&7|0)==0){aE=0}else{aE=-K&7}K=(ab-40|0)-aE|0;c[1310819]=ac+aE|0;c[1310816]=K;c[ac+(aE+4|0)>>2]=K|1;c[ac+(ab-36|0)>>2]=40;c[1310820]=c[1310724]|0;c[ad+4>>2]=27;cW(Z|0,5243700,16);c[1310925]=ac;c[1310926]=ab;c[1310928]=0;c[1310927]=Z;Z=ad+28|0;c[Z>>2]=7;L831:do{if((ad+32|0)>>>0<W>>>0){K=Z;while(1){_=K+4|0;c[_>>2]=7;if((K+8|0)>>>0<W>>>0){K=_}else{break L831}}}}while(0);if((ad|0)==(Y|0)){break}W=ad-ae|0;Z=Y+(W+4|0)|0;c[Z>>2]=c[Z>>2]&-2;c[ae+4>>2]=W|1;c[Y+W>>2]=W;if(W>>>0<256){Z=W>>>2&1073741822;K=5243292+(Z<<2)|0;_=c[1310813]|0;S=1<<(W>>>3);do{if((_&S|0)==0){c[1310813]=_|S;aF=K;aG=5243292+(Z+2<<2)|0}else{P=5243292+(Z+2<<2)|0;Q=c[P>>2]|0;if(Q>>>0>=(c[1310817]|0)>>>0){aF=Q;aG=P;break}aA();return 0}}while(0);c[aG>>2]=ae;c[aF+12>>2]=ae;c[ae+8>>2]=aF;c[ae+12>>2]=K;break}Z=ae;S=W>>>8;do{if((S|0)==0){aI=0}else{if(W>>>0>16777215){aI=31;break}_=(S+1048320|0)>>>16&8;Y=S<<_;ad=(Y+520192|0)>>>16&4;P=Y<<ad;Y=(P+245760|0)>>>16&2;Q=(14-(ad|_|Y)|0)+(P<<Y>>>15)|0;aI=W>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);S=5243556+(aI<<2)|0;c[ae+28>>2]=aI;c[ae+20>>2]=0;c[ae+16>>2]=0;K=c[1310814]|0;Q=1<<aI;if((K&Q|0)==0){c[1310814]=K|Q;c[S>>2]=Z;c[ae+24>>2]=S;c[ae+12>>2]=ae;c[ae+8>>2]=ae;break}if((aI|0)==31){aJ=0}else{aJ=25-(aI>>>1)|0}Q=W<<aJ;K=c[S>>2]|0;while(1){if((c[K+4>>2]&-8|0)==(W|0)){break}aK=K+16+(Q>>>31<<2)|0;S=c[aK>>2]|0;if((S|0)==0){T=648;break}else{Q=Q<<1;K=S}}if((T|0)==648){if(aK>>>0<(c[1310817]|0)>>>0){aA();return 0}else{c[aK>>2]=Z;c[ae+24>>2]=K;c[ae+12>>2]=ae;c[ae+8>>2]=ae;break}}Q=K+8|0;W=c[Q>>2]|0;S=c[1310817]|0;if(K>>>0<S>>>0){aA();return 0}if(W>>>0<S>>>0){aA();return 0}else{c[W+12>>2]=Z;c[Q>>2]=Z;c[ae+8>>2]=W;c[ae+12>>2]=K;c[ae+24>>2]=0;break}}}while(0);ae=c[1310816]|0;if(ae>>>0<=o>>>0){break}W=ae-o|0;c[1310816]=W;ae=c[1310819]|0;Q=ae;c[1310819]=Q+o|0;c[Q+(o+4|0)>>2]=W|1;c[ae+4>>2]=o|3;n=ae+8|0;return n|0}}while(0);c[aN()>>2]=12;n=0;return n|0}function cO(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[1310817]|0;if(b>>>0<e>>>0){aA()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){aA()}h=f&-8;i=a+(h-8|0)|0;j=i;L884:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){aA()}if((n|0)==(c[1310818]|0)){p=a+(h-4|0)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[1310815]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4|0)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256){s=c[a+(l+8|0)>>2]|0;t=c[a+(l+12|0)>>2]|0;u=5243292+((k>>>2&1073741822)<<2)|0;do{if((s|0)!=(u|0)){if(s>>>0<e>>>0){aA()}if((c[s+12>>2]|0)==(n|0)){break}aA()}}while(0);if((t|0)==(s|0)){c[1310813]=c[1310813]&(1<<p^-1);q=n;r=o;break}do{if((t|0)==(u|0)){v=t+8|0}else{if(t>>>0<e>>>0){aA()}k=t+8|0;if((c[k>>2]|0)==(n|0)){v=k;break}aA()}}while(0);c[s+12>>2]=t;c[v>>2]=s;q=n;r=o;break}u=m;p=c[a+(l+24|0)>>2]|0;k=c[a+(l+12|0)>>2]|0;L918:do{if((k|0)==(u|0)){w=a+(l+20|0)|0;x=c[w>>2]|0;do{if((x|0)==0){y=a+(l+16|0)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break L918}else{B=y;C=z;break}}else{B=w;C=x}}while(0);while(1){x=C+20|0;w=c[x>>2]|0;if((w|0)!=0){B=x;C=w;continue}w=C+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=w;C=x}}if(B>>>0<e>>>0){aA()}else{c[B>>2]=0;A=C;break}}else{x=c[a+(l+8|0)>>2]|0;if(x>>>0<e>>>0){aA()}w=x+12|0;if((c[w>>2]|0)!=(u|0)){aA()}z=k+8|0;if((c[z>>2]|0)==(u|0)){c[w>>2]=k;c[z>>2]=x;A=k;break}else{aA()}}}while(0);if((p|0)==0){q=n;r=o;break}k=a+(l+28|0)|0;m=5243556+(c[k>>2]<<2)|0;do{if((u|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[1310814]=c[1310814]&(1<<c[k>>2]^-1);q=n;r=o;break L884}else{if(p>>>0<(c[1310817]|0)>>>0){aA()}s=p+16|0;if((c[s>>2]|0)==(u|0)){c[s>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L884}}}while(0);if(A>>>0<(c[1310817]|0)>>>0){aA()}c[A+24>>2]=p;u=c[a+(l+16|0)>>2]|0;do{if((u|0)!=0){if(u>>>0<(c[1310817]|0)>>>0){aA()}else{c[A+16>>2]=u;c[u+24>>2]=A;break}}}while(0);u=c[a+(l+20|0)>>2]|0;if((u|0)==0){q=n;r=o;break}if(u>>>0<(c[1310817]|0)>>>0){aA()}else{c[A+20>>2]=u;c[u+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){aA()}A=a+(h-4|0)|0;e=c[A>>2]|0;if((e&1|0)==0){aA()}do{if((e&2|0)==0){if((j|0)==(c[1310819]|0)){C=(c[1310816]|0)+r|0;c[1310816]=C;c[1310819]=q;c[q+4>>2]=C|1;if((q|0)==(c[1310818]|0)){c[1310818]=0;c[1310815]=0}if(C>>>0<=(c[1310820]|0)>>>0){return}cT(0);return}if((j|0)==(c[1310818]|0)){C=(c[1310815]|0)+r|0;c[1310815]=C;c[1310818]=q;c[q+4>>2]=C|1;c[d+C>>2]=C;return}C=(e&-8)+r|0;B=e>>>3;L990:do{if(e>>>0<256){v=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=5243292+((e>>>2&1073741822)<<2)|0;do{if((v|0)!=(b|0)){if(v>>>0<(c[1310817]|0)>>>0){aA()}if((c[v+12>>2]|0)==(j|0)){break}aA()}}while(0);if((g|0)==(v|0)){c[1310813]=c[1310813]&(1<<B^-1);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[1310817]|0)>>>0){aA()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}aA()}}while(0);c[v+12>>2]=g;c[D>>2]=v}else{b=i;f=c[a+(h+16|0)>>2]|0;u=c[a+(h|4)>>2]|0;L1011:do{if((u|0)==(b|0)){p=a+(h+12|0)|0;k=c[p>>2]|0;do{if((k|0)==0){m=a+(h+8|0)|0;s=c[m>>2]|0;if((s|0)==0){E=0;break L1011}else{F=m;G=s;break}}else{F=p;G=k}}while(0);while(1){k=G+20|0;p=c[k>>2]|0;if((p|0)!=0){F=k;G=p;continue}p=G+16|0;k=c[p>>2]|0;if((k|0)==0){break}else{F=p;G=k}}if(F>>>0<(c[1310817]|0)>>>0){aA()}else{c[F>>2]=0;E=G;break}}else{k=c[a+h>>2]|0;if(k>>>0<(c[1310817]|0)>>>0){aA()}p=k+12|0;if((c[p>>2]|0)!=(b|0)){aA()}s=u+8|0;if((c[s>>2]|0)==(b|0)){c[p>>2]=u;c[s>>2]=k;E=u;break}else{aA()}}}while(0);if((f|0)==0){break}u=a+(h+20|0)|0;v=5243556+(c[u>>2]<<2)|0;do{if((b|0)==(c[v>>2]|0)){c[v>>2]=E;if((E|0)!=0){break}c[1310814]=c[1310814]&(1<<c[u>>2]^-1);break L990}else{if(f>>>0<(c[1310817]|0)>>>0){aA()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L990}}}while(0);if(E>>>0<(c[1310817]|0)>>>0){aA()}c[E+24>>2]=f;b=c[a+(h+8|0)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[1310817]|0)>>>0){aA()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12|0)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[1310817]|0)>>>0){aA()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=C|1;c[d+C>>2]=C;if((q|0)!=(c[1310818]|0)){H=C;break}c[1310815]=C;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);if(H>>>0<256){r=H>>>2&1073741822;d=5243292+(r<<2)|0;e=c[1310813]|0;A=1<<(H>>>3);do{if((e&A|0)==0){c[1310813]=e|A;I=d;J=5243292+(r+2<<2)|0}else{E=5243292+(r+2<<2)|0;h=c[E>>2]|0;if(h>>>0>=(c[1310817]|0)>>>0){I=h;J=E;break}aA()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=d;return}d=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}J=(I+1048320|0)>>>16&8;r=I<<J;A=(r+520192|0)>>>16&4;e=r<<A;r=(e+245760|0)>>>16&2;E=(14-(A|J|r)|0)+(e<<r>>>15)|0;K=H>>>((E+7|0)>>>0)&1|E<<1}}while(0);I=5243556+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;E=c[1310814]|0;r=1<<K;do{if((E&r|0)==0){c[1310814]=E|r;c[I>>2]=d;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}e=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(e>>>31<<2)|0;A=c[M>>2]|0;if((A|0)==0){N=827;break}else{e=e<<1;J=A}}if((N|0)==827){if(M>>>0<(c[1310817]|0)>>>0){aA()}else{c[M>>2]=d;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}e=J+8|0;C=c[e>>2]|0;A=c[1310817]|0;if(J>>>0<A>>>0){aA()}if(C>>>0<A>>>0){aA()}else{c[C+12>>2]=d;c[e>>2]=d;c[q+8>>2]=C;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[1310821]|0)-1|0;c[1310821]=q;if((q|0)==0){O=5243708}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[1310821]=-1;return}function cP(a){a=a|0;return 5243236}function cQ(a){a=a|0;return}function cR(a){a=a|0;if((a|0)!=0){cO(a)}return}function cS(a){a=a|0;cR(a);return}function cT(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;do{if((c[1310720]|0)==0){b=ay(8)|0;if((b-1&b|0)==0){c[1310722]=b;c[1310721]=b;c[1310723]=-1;c[1310724]=2097152;c[1310725]=0;c[1310924]=0;c[1310720]=aH(0)&-16^1431655768;break}else{aA();return 0}}}while(0);if(a>>>0>=4294967232){d=0;e=d&1;return e|0}b=c[1310819]|0;if((b|0)==0){d=0;e=d&1;return e|0}f=c[1310816]|0;do{if(f>>>0>(a+40|0)>>>0){g=c[1310722]|0;h=_(((((((-40-a|0)-1|0)+f|0)+g|0)>>>0)/(g>>>0)>>>0)-1|0,g);i=b;j=5243700;while(1){k=c[j>>2]|0;if(k>>>0<=i>>>0){if((k+(c[j+4>>2]|0)|0)>>>0>i>>>0){l=j;break}}k=c[j+8>>2]|0;if((k|0)==0){l=0;break}else{j=k}}if((c[l+12>>2]&8|0)!=0){break}j=aP(0)|0;i=l+4|0;if((j|0)!=((c[l>>2]|0)+(c[i>>2]|0)|0)){break}k=aP(-(h>>>0>2147483646?-2147483648-g|0:h)|0)|0;m=aP(0)|0;if(!((k|0)!=-1&m>>>0<j>>>0)){break}k=j-m|0;if((j|0)==(m|0)){break}c[i>>2]=(c[i>>2]|0)-k|0;c[1310921]=(c[1310921]|0)-k|0;i=c[1310819]|0;n=(c[1310816]|0)-k|0;k=i;o=i+8|0;if((o&7|0)==0){p=0}else{p=-o&7}o=n-p|0;c[1310819]=k+p|0;c[1310816]=o;c[k+(p+4|0)>>2]=o|1;c[k+(n+4|0)>>2]=40;c[1310820]=c[1310724]|0;d=(j|0)!=(m|0);e=d&1;return e|0}}while(0);if((c[1310816]|0)>>>0<=(c[1310820]|0)>>>0){d=0;e=d&1;return e|0}c[1310820]=-1;d=0;e=d&1;return e|0}function cU(a){a=a|0;var b=0,d=0,e=0;b=(a|0)==0?1:a;while(1){d=cN(b)|0;if((d|0)!=0){e=911;break}a=(A=c[1311014]|0,c[1311014]=A+0,A);if((a|0)==0){break}a1[a&255]()}if((e|0)==911){return d|0}d=aG(4)|0;c[d>>2]=5243732;az(d|0,5243984,124);return 0}function cV(a){a=a|0;return cU(a)|0}function cW(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2]|0;b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function cX(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function cY(b){b=b|0;var c=0;c=b;while(a[c]|0!=0){c=c+1|0}return c-b|0}function cZ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return aR[a&255](b|0,c|0,d|0)|0}function c_(a,b,c){a=a|0;b=b|0;c=c|0;return+aS[a&255](b|0,c|0)}function c$(a,b,c){a=a|0;b=b|0;c=+c;aT[a&255](b|0,+c)}function c0(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;aU[a&255](b|0,c|0,d|0,e|0)}function c1(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;aV[a&255](b|0,c|0,d|0,e|0,f|0)}function c2(a){a=a|0;return aW[a&255]()|0}function c3(a,b){a=a|0;b=b|0;aX[a&255](b|0)}function c4(a,b,c){a=a|0;b=+b;c=+c;return aY[a&255](+b,+c)|0}function c5(a,b){a=a|0;b=b|0;return aZ[a&255](b|0)|0}function c6(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;return a_[a&255](+b,+c,+d)|0}function c7(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;return a$[a&255](b|0,+c,+d)|0}function c8(a,b,c){a=a|0;b=b|0;c=+c;return a0[a&255](b|0,+c)|0}function c9(a){a=a|0;a1[a&255]()}function da(a,b){a=a|0;b=b|0;return+a2[a&255](b|0)}function db(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;a3[a&255](b|0,c|0,d|0,e|0,f|0,g|0)}function dc(a,b,c){a=a|0;b=b|0;c=c|0;return a4[a&255](b|0,c|0)|0}function dd(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=+e;return a5[a&255](b|0,+c,+d,+e)|0}function de(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return a6[a&255](b|0,c|0,+d)|0}function df(a,b,c){a=a|0;b=b|0;c=c|0;$(0);return 0}function dg(a,b){a=a|0;b=b|0;$(1);return 0.0}function dh(a,b){a=a|0;b=+b;$(2)}function di(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$(3)}function dj(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;$(4)}function dk(){$(5);return 0}function dl(a){a=a|0;$(6)}function dm(a,b){a=+a;b=+b;$(7);return 0}function dn(a){a=a|0;$(8);return 0}function dp(a,b,c){a=+a;b=+b;c=+c;$(9);return 0}function dq(a,b,c){a=a|0;b=+b;c=+c;$(10);return 0}function dr(a,b){a=a|0;b=+b;$(11);return 0}function ds(){$(12)}function dt(a){a=a|0;$(13);return 0.0}function du(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;$(14)}function dv(a,b){a=a|0;b=b|0;$(15);return 0}function dw(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;$(16);return 0}function dx(a,b,c){a=a|0;b=b|0;c=+c;$(17);return 0}
// EMSCRIPTEN_END_FUNCS
var aR=[df,df,df,df,df,df,df,df,bp,df,df,df,df,df,df,df,df,df,df,df,cG,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,cc,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,bH,df,df,df,df,df,bx,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,b9,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df,df];var aS=[dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,bM,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,bZ,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,bF,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,ce,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg,dg];var aT=[dh,dh,dh,dh,dh,dh,cm,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,cr,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,cn,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,ch,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,bK,dh,dh,dh,dh,dh,dh,dh,co,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,bB,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,bA,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,cg,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh,dh];var aU=[di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,cs,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,cH,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di,di];var aV=[dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,cJ,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,cK,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj,dj];var aW=[dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,bO,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,bU,dk,dk,dk,dk,dk,dk,dk,dk,dk,bN,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,bS,dk,dk,dk,dk,dk,cy,dk,bQ,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,bR,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,bP,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,cB,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk,dk];var aX=[dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,b2,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,cD,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,b3,dl,cu,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,b4,dl,cQ,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,cx,dl,dl,dl,dl,dl,dl,dl,cS,dl,dl,dl,dl,dl,dl,dl,cE,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,b1,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,cF,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl,dl];var aY=[dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,cC,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm,dm];var aZ=[dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,cP,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,b0,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,by,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,bY,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn,dn];var a_=[dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,bV,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp,dp];var a$=[dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,cA,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,bl,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq,dq];var a0=[dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,bw,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,b6,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,bW,dr,dr,dr,ct,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr,dr];var a1=[ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds,ds];var a2=[dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,bu,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,cv,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,ci,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,bX,dt,cp,dt,dt,dt,bI,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,cq,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,ck,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,bs,dt,dt,dt,dt,dt,cj,dt,dt,dt,dt,dt,dt,dt,cl,dt,dt,dt,dt,dt,bL,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt,dt];var a3=[du,du,du,du,cL,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,cM,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du,du];var a4=[dv,dv,b_,dv,dv,dv,dv,dv,dv,dv,cb,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,bT,dv,cw,dv,dv,dv,dv,dv,cd,dv,dv,dv,dv,dv,dv,dv,dv,dv,bD,dv,dv,dv,dv,dv,dv,dv,b$,dv,dv,dv,dv,dv,dv,dv,bv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,b5,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,ca,dv,dv,dv,dv,dv,bo,dv,dv,dv,bt,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,bn,dv,dv,dv,dv,dv,cz,dv,dv,dv,dv,dv,dv,dv,b7,dv,bm,dv,dv,dv,dv,dv,bC,dv,dv,dv,dv,dv,dv,dv,b8,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,bz,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,bJ,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,bq,dv,dv,dv,dv,dv,dv,dv,dv,dv,bG,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv,dv];var a5=[dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,br,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw,dw];var a6=[dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,cf,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,bE,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx,dx];return{_emscripten_bind_Vector3__getScaleFromMatrix_p1:b_,_emscripten_bind_Vector4____destroy___p0:cx,_strlen:cY,_emscripten_bind_Vector4__get_z_p0:ck,_emscripten_bind_Vector3__Vector3_p0:bU,_emscripten_bind_Vector3__Vector3_p3:bV,_emscripten_bind_Vector4__set_w_p1:cm,_emscripten_bind__newActor:bR,_emscripten_bind_Vector3__transformDirection_p1:b$,_emscripten_bind_Vector3__divide_p1:bt,_emscripten_bind_Vector4__get_x_p0:ci,_emscripten_bind_Vector3__getPositionFromMatrix_p1:bv,_emscripten_bind_Vector3__clamp_p2:bp,_emscripten_bind_bind_newActor:bN,_emscripten_bind_Vector3__applyProjection_p1:cb,_emscripten_bind_Vector2____destroy___p0:cD,_emscripten_bind_Vector3____destroy___p0:cu,_emscripten_bind_Vector3__set_x_p1:bK,_emscripten_bind_Vector3__multiplyVectors_p2:bH,_emscripten_bind_Vector3__get_p1:bM,_emscripten_bind_Vector3__crossVectors_p2:bx,_emscripten_bind_Vector3__lerp_p2:bE,_emscripten_bind_Vector3__lengthManhattan_p0:bX,_emscripten_bind_Vector2__set_p2:cA,_emscripten_bind_tes_newActor:bP,_memset:cX,_emscripten_bind_Vector3__applyMatrix4_p1:bz,_emscripten_bind_Vector2__get_x_p0:cp,_memcpy:cW,_emscripten_bind_Vector2__set_x_p1:co,_emscripten_bind_Vector4__set_y_p1:cg,_emscripten_bind_newActor:bS,_emscripten_bind_Vector3__copy_p1:ca,_emscripten_bind_Vector3__get_z_p0:bu,_emscripten_bind_Vector4__Vector4_p0:cy,_emscripten_bind_Vector3__max_p1:b5,_emscripten_bind_Vector3__get_y_p0:bI,_emscripten_bind_Vector3__get_x_p0:bs,_emscripten_bind_Vector4__set_z_p1:ch,_emscripten_bind_Vector2__instanceOf_p1:cz,_emscripten_bind_Vector3__subVectors_p2:cc,_emscripten_bind_Vector4__instanceOf_p1:cw,_emscripten_bind_Vector3__setLength_p1:ct,_emscripten_bind_Vector3__set_p3:br,_emscripten_bind_test_newActor:bO,_emscripten_bind_Vector3__sub_p1:bC,_emscripten_bind_Vector4__get_y_p0:cj,_emscripten_bind_Vector3__divideScalar_p1:bW,_emscripten_bind_Vector3__distanceToSquared_p1:bF,_emscripten_bind_Vector3__addScalar_p1:bw,_emscripten_bind_Vector2__Vector2_p0:cB,_emscripten_bind_Vector3__applyQuaternion_p1:cd,_emscripten_bind_Vector2__get_y_p0:cq,_emscripten_bind_Vector3__addVectors_p2:b9,_emscripten_bind_Vector2__set_y_p1:cr,_emscripten_bind_te_newActor:bQ,_free:cO,_emscripten_bind_Vector3__equals_p1:b7,_emscripten_bind_Vector3__length_p0:cv,_emscripten_bind_Vector3__applyMatrix3_p1:bq,_emscripten_bind_Vector3__negate_p0:by,_emscripten_bind_Vector3__set_y_p1:bA,_emscripten_bind_Vector3__multiplyScalar_p1:b6,_emscripten_bind_Vector3__dot_p1:ce,_emscripten_bind_Vector4__set_x_p1:cn,_emscripten_bind_Vector4__get_w_p0:cl,_emscripten_bind_Vector3__multiply_p1:b8,_malloc:cN,_emscripten_bind_Vector3__normalize_p0:bY,_emscripten_bind_Vector3__cross_p1:bJ,_emscripten_bind_Vector3__setFromChar_p2:cf,_emscripten_bind_Vector3__min_p1:bD,_emscripten_bind_Vector3__set_z_p1:bB,_emscripten_bind_Vector3__instanceOf_p1:bT,_emscripten_bind_Vector3__lengthSquared_p0:bL,_emscripten_bind_Vector3__add_p1:bG,_emscripten_bind_Vector3__distanceTo_p1:bZ,_emscripten_bind_Vector3__clone_p0:b0,_emscripten_bind_Vector2__Vector2_p2:cC,stackAlloc:a7,stackSave:a8,stackRestore:a9,setThrew:ba,setTempRet0:bb,setTempRet1:bc,setTempRet2:bd,setTempRet3:be,setTempRet4:bf,setTempRet5:bg,setTempRet6:bh,setTempRet7:bi,setTempRet8:bj,setTempRet9:bk,dynCall_iiii:cZ,dynCall_fii:c_,dynCall_vif:c$,dynCall_viiii:c0,dynCall_viiiii:c1,dynCall_i:c2,dynCall_vi:c3,dynCall_iff:c4,dynCall_ii:c5,dynCall_ifff:c6,dynCall_iiff:c7,dynCall_iif:c8,dynCall_v:c9,dynCall_fi:da,dynCall_viiiiii:db,dynCall_iii:dc,dynCall_iifff:dd,dynCall_iiif:de}})
// EMSCRIPTEN_END_ASM
({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, { abort: abort, assert: assert, asmPrintInt: asmPrintInt, asmPrintFloat: asmPrintFloat, copyTempDouble: copyTempDouble, copyTempFloat: copyTempFloat, min: Math_min, invoke_iiii: invoke_iiii, invoke_fii: invoke_fii, invoke_vif: invoke_vif, invoke_viiii: invoke_viiii, invoke_viiiii: invoke_viiiii, invoke_i: invoke_i, invoke_vi: invoke_vi, invoke_iff: invoke_iff, invoke_ii: invoke_ii, invoke_ifff: invoke_ifff, invoke_iiff: invoke_iiff, invoke_iif: invoke_iif, invoke_v: invoke_v, invoke_fi: invoke_fi, invoke_viiiiii: invoke_viiiiii, invoke_iii: invoke_iii, invoke_iifff: invoke_iifff, invoke_iiif: invoke_iiif, _sysconf: _sysconf, ___cxa_throw: ___cxa_throw, _abort: _abort, _llvm_eh_exception: _llvm_eh_exception, _fabs: _fabs, ___setErrNo: ___setErrNo, _sqrt: _sqrt, ___cxa_find_matching_catch: ___cxa_find_matching_catch, ___cxa_allocate_exception: ___cxa_allocate_exception, _time: _time, ___cxa_is_number_type: ___cxa_is_number_type, ___cxa_does_inherit: ___cxa_does_inherit, __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv, ___cxa_call_unexpected: ___cxa_call_unexpected, __ZNSt9exceptionD2Ev: __ZNSt9exceptionD2Ev, ___errno_location: ___errno_location, ___gxx_personality_v0: ___gxx_personality_v0, _sbrk: _sbrk, ___resumeException: ___resumeException, STACKTOP: STACKTOP, STACK_MAX: STACK_MAX, tempDoublePtr: tempDoublePtr, ABORT: ABORT, NaN: NaN, Infinity: Infinity, __ZTISt9exception: __ZTISt9exception, __ZTVN10__cxxabiv120__si_class_type_infoE: __ZTVN10__cxxabiv120__si_class_type_infoE, __ZTVN10__cxxabiv117__class_type_infoE: __ZTVN10__cxxabiv117__class_type_infoE }, buffer);
var _emscripten_bind_Vector3__getScaleFromMatrix_p1 = Module["_emscripten_bind_Vector3__getScaleFromMatrix_p1"] = asm._emscripten_bind_Vector3__getScaleFromMatrix_p1;
var _emscripten_bind_Vector4____destroy___p0 = Module["_emscripten_bind_Vector4____destroy___p0"] = asm._emscripten_bind_Vector4____destroy___p0;
var _strlen = Module["_strlen"] = asm._strlen;
var _emscripten_bind_Vector4__get_z_p0 = Module["_emscripten_bind_Vector4__get_z_p0"] = asm._emscripten_bind_Vector4__get_z_p0;
var _emscripten_bind_Vector3__Vector3_p0 = Module["_emscripten_bind_Vector3__Vector3_p0"] = asm._emscripten_bind_Vector3__Vector3_p0;
var _emscripten_bind_Vector3__Vector3_p3 = Module["_emscripten_bind_Vector3__Vector3_p3"] = asm._emscripten_bind_Vector3__Vector3_p3;
var _emscripten_bind_Vector4__set_w_p1 = Module["_emscripten_bind_Vector4__set_w_p1"] = asm._emscripten_bind_Vector4__set_w_p1;
var _emscripten_bind__newActor = Module["_emscripten_bind__newActor"] = asm._emscripten_bind__newActor;
var _emscripten_bind_Vector3__transformDirection_p1 = Module["_emscripten_bind_Vector3__transformDirection_p1"] = asm._emscripten_bind_Vector3__transformDirection_p1;
var _emscripten_bind_Vector3__divide_p1 = Module["_emscripten_bind_Vector3__divide_p1"] = asm._emscripten_bind_Vector3__divide_p1;
var _emscripten_bind_Vector4__get_x_p0 = Module["_emscripten_bind_Vector4__get_x_p0"] = asm._emscripten_bind_Vector4__get_x_p0;
var _emscripten_bind_Vector3__getPositionFromMatrix_p1 = Module["_emscripten_bind_Vector3__getPositionFromMatrix_p1"] = asm._emscripten_bind_Vector3__getPositionFromMatrix_p1;
var _emscripten_bind_Vector3__clamp_p2 = Module["_emscripten_bind_Vector3__clamp_p2"] = asm._emscripten_bind_Vector3__clamp_p2;
var _emscripten_bind_bind_newActor = Module["_emscripten_bind_bind_newActor"] = asm._emscripten_bind_bind_newActor;
var _emscripten_bind_Vector3__applyProjection_p1 = Module["_emscripten_bind_Vector3__applyProjection_p1"] = asm._emscripten_bind_Vector3__applyProjection_p1;
var _emscripten_bind_Vector2____destroy___p0 = Module["_emscripten_bind_Vector2____destroy___p0"] = asm._emscripten_bind_Vector2____destroy___p0;
var _emscripten_bind_Vector3____destroy___p0 = Module["_emscripten_bind_Vector3____destroy___p0"] = asm._emscripten_bind_Vector3____destroy___p0;
var _emscripten_bind_Vector3__set_x_p1 = Module["_emscripten_bind_Vector3__set_x_p1"] = asm._emscripten_bind_Vector3__set_x_p1;
var _emscripten_bind_Vector3__multiplyVectors_p2 = Module["_emscripten_bind_Vector3__multiplyVectors_p2"] = asm._emscripten_bind_Vector3__multiplyVectors_p2;
var _emscripten_bind_Vector3__get_p1 = Module["_emscripten_bind_Vector3__get_p1"] = asm._emscripten_bind_Vector3__get_p1;
var _emscripten_bind_Vector3__crossVectors_p2 = Module["_emscripten_bind_Vector3__crossVectors_p2"] = asm._emscripten_bind_Vector3__crossVectors_p2;
var _emscripten_bind_Vector3__lerp_p2 = Module["_emscripten_bind_Vector3__lerp_p2"] = asm._emscripten_bind_Vector3__lerp_p2;
var _emscripten_bind_Vector3__lengthManhattan_p0 = Module["_emscripten_bind_Vector3__lengthManhattan_p0"] = asm._emscripten_bind_Vector3__lengthManhattan_p0;
var _emscripten_bind_Vector2__set_p2 = Module["_emscripten_bind_Vector2__set_p2"] = asm._emscripten_bind_Vector2__set_p2;
var _emscripten_bind_tes_newActor = Module["_emscripten_bind_tes_newActor"] = asm._emscripten_bind_tes_newActor;
var _memset = Module["_memset"] = asm._memset;
var _emscripten_bind_Vector3__applyMatrix4_p1 = Module["_emscripten_bind_Vector3__applyMatrix4_p1"] = asm._emscripten_bind_Vector3__applyMatrix4_p1;
var _emscripten_bind_Vector2__get_x_p0 = Module["_emscripten_bind_Vector2__get_x_p0"] = asm._emscripten_bind_Vector2__get_x_p0;
var _memcpy = Module["_memcpy"] = asm._memcpy;
var _emscripten_bind_Vector2__set_x_p1 = Module["_emscripten_bind_Vector2__set_x_p1"] = asm._emscripten_bind_Vector2__set_x_p1;
var _emscripten_bind_Vector4__set_y_p1 = Module["_emscripten_bind_Vector4__set_y_p1"] = asm._emscripten_bind_Vector4__set_y_p1;
var _emscripten_bind_newActor = Module["_emscripten_bind_newActor"] = asm._emscripten_bind_newActor;
var _emscripten_bind_Vector3__copy_p1 = Module["_emscripten_bind_Vector3__copy_p1"] = asm._emscripten_bind_Vector3__copy_p1;
var _emscripten_bind_Vector3__get_z_p0 = Module["_emscripten_bind_Vector3__get_z_p0"] = asm._emscripten_bind_Vector3__get_z_p0;
var _emscripten_bind_Vector4__Vector4_p0 = Module["_emscripten_bind_Vector4__Vector4_p0"] = asm._emscripten_bind_Vector4__Vector4_p0;
var _emscripten_bind_Vector3__max_p1 = Module["_emscripten_bind_Vector3__max_p1"] = asm._emscripten_bind_Vector3__max_p1;
var _emscripten_bind_Vector3__get_y_p0 = Module["_emscripten_bind_Vector3__get_y_p0"] = asm._emscripten_bind_Vector3__get_y_p0;
var _emscripten_bind_Vector3__get_x_p0 = Module["_emscripten_bind_Vector3__get_x_p0"] = asm._emscripten_bind_Vector3__get_x_p0;
var _emscripten_bind_Vector4__set_z_p1 = Module["_emscripten_bind_Vector4__set_z_p1"] = asm._emscripten_bind_Vector4__set_z_p1;
var _emscripten_bind_Vector2__instanceOf_p1 = Module["_emscripten_bind_Vector2__instanceOf_p1"] = asm._emscripten_bind_Vector2__instanceOf_p1;
var _emscripten_bind_Vector3__subVectors_p2 = Module["_emscripten_bind_Vector3__subVectors_p2"] = asm._emscripten_bind_Vector3__subVectors_p2;
var _emscripten_bind_Vector4__instanceOf_p1 = Module["_emscripten_bind_Vector4__instanceOf_p1"] = asm._emscripten_bind_Vector4__instanceOf_p1;
var _emscripten_bind_Vector3__setLength_p1 = Module["_emscripten_bind_Vector3__setLength_p1"] = asm._emscripten_bind_Vector3__setLength_p1;
var _emscripten_bind_Vector3__set_p3 = Module["_emscripten_bind_Vector3__set_p3"] = asm._emscripten_bind_Vector3__set_p3;
var _emscripten_bind_test_newActor = Module["_emscripten_bind_test_newActor"] = asm._emscripten_bind_test_newActor;
var _emscripten_bind_Vector3__sub_p1 = Module["_emscripten_bind_Vector3__sub_p1"] = asm._emscripten_bind_Vector3__sub_p1;
var _emscripten_bind_Vector4__get_y_p0 = Module["_emscripten_bind_Vector4__get_y_p0"] = asm._emscripten_bind_Vector4__get_y_p0;
var _emscripten_bind_Vector3__divideScalar_p1 = Module["_emscripten_bind_Vector3__divideScalar_p1"] = asm._emscripten_bind_Vector3__divideScalar_p1;
var _emscripten_bind_Vector3__distanceToSquared_p1 = Module["_emscripten_bind_Vector3__distanceToSquared_p1"] = asm._emscripten_bind_Vector3__distanceToSquared_p1;
var _emscripten_bind_Vector3__addScalar_p1 = Module["_emscripten_bind_Vector3__addScalar_p1"] = asm._emscripten_bind_Vector3__addScalar_p1;
var _emscripten_bind_Vector2__Vector2_p0 = Module["_emscripten_bind_Vector2__Vector2_p0"] = asm._emscripten_bind_Vector2__Vector2_p0;
var _emscripten_bind_Vector3__applyQuaternion_p1 = Module["_emscripten_bind_Vector3__applyQuaternion_p1"] = asm._emscripten_bind_Vector3__applyQuaternion_p1;
var _emscripten_bind_Vector2__get_y_p0 = Module["_emscripten_bind_Vector2__get_y_p0"] = asm._emscripten_bind_Vector2__get_y_p0;
var _emscripten_bind_Vector3__addVectors_p2 = Module["_emscripten_bind_Vector3__addVectors_p2"] = asm._emscripten_bind_Vector3__addVectors_p2;
var _emscripten_bind_Vector2__set_y_p1 = Module["_emscripten_bind_Vector2__set_y_p1"] = asm._emscripten_bind_Vector2__set_y_p1;
var _emscripten_bind_te_newActor = Module["_emscripten_bind_te_newActor"] = asm._emscripten_bind_te_newActor;
var _free = Module["_free"] = asm._free;
var _emscripten_bind_Vector3__equals_p1 = Module["_emscripten_bind_Vector3__equals_p1"] = asm._emscripten_bind_Vector3__equals_p1;
var _emscripten_bind_Vector3__length_p0 = Module["_emscripten_bind_Vector3__length_p0"] = asm._emscripten_bind_Vector3__length_p0;
var _emscripten_bind_Vector3__applyMatrix3_p1 = Module["_emscripten_bind_Vector3__applyMatrix3_p1"] = asm._emscripten_bind_Vector3__applyMatrix3_p1;
var _emscripten_bind_Vector3__negate_p0 = Module["_emscripten_bind_Vector3__negate_p0"] = asm._emscripten_bind_Vector3__negate_p0;
var _emscripten_bind_Vector3__set_y_p1 = Module["_emscripten_bind_Vector3__set_y_p1"] = asm._emscripten_bind_Vector3__set_y_p1;
var _emscripten_bind_Vector3__multiplyScalar_p1 = Module["_emscripten_bind_Vector3__multiplyScalar_p1"] = asm._emscripten_bind_Vector3__multiplyScalar_p1;
var _emscripten_bind_Vector3__dot_p1 = Module["_emscripten_bind_Vector3__dot_p1"] = asm._emscripten_bind_Vector3__dot_p1;
var _emscripten_bind_Vector4__set_x_p1 = Module["_emscripten_bind_Vector4__set_x_p1"] = asm._emscripten_bind_Vector4__set_x_p1;
var _emscripten_bind_Vector4__get_w_p0 = Module["_emscripten_bind_Vector4__get_w_p0"] = asm._emscripten_bind_Vector4__get_w_p0;
var _emscripten_bind_Vector3__multiply_p1 = Module["_emscripten_bind_Vector3__multiply_p1"] = asm._emscripten_bind_Vector3__multiply_p1;
var _malloc = Module["_malloc"] = asm._malloc;
var _emscripten_bind_Vector3__normalize_p0 = Module["_emscripten_bind_Vector3__normalize_p0"] = asm._emscripten_bind_Vector3__normalize_p0;
var _emscripten_bind_Vector3__cross_p1 = Module["_emscripten_bind_Vector3__cross_p1"] = asm._emscripten_bind_Vector3__cross_p1;
var _emscripten_bind_Vector3__setFromChar_p2 = Module["_emscripten_bind_Vector3__setFromChar_p2"] = asm._emscripten_bind_Vector3__setFromChar_p2;
var _emscripten_bind_Vector3__min_p1 = Module["_emscripten_bind_Vector3__min_p1"] = asm._emscripten_bind_Vector3__min_p1;
var _emscripten_bind_Vector3__set_z_p1 = Module["_emscripten_bind_Vector3__set_z_p1"] = asm._emscripten_bind_Vector3__set_z_p1;
var _emscripten_bind_Vector3__instanceOf_p1 = Module["_emscripten_bind_Vector3__instanceOf_p1"] = asm._emscripten_bind_Vector3__instanceOf_p1;
var _emscripten_bind_Vector3__lengthSquared_p0 = Module["_emscripten_bind_Vector3__lengthSquared_p0"] = asm._emscripten_bind_Vector3__lengthSquared_p0;
var _emscripten_bind_Vector3__add_p1 = Module["_emscripten_bind_Vector3__add_p1"] = asm._emscripten_bind_Vector3__add_p1;
var _emscripten_bind_Vector3__distanceTo_p1 = Module["_emscripten_bind_Vector3__distanceTo_p1"] = asm._emscripten_bind_Vector3__distanceTo_p1;
var _emscripten_bind_Vector3__clone_p0 = Module["_emscripten_bind_Vector3__clone_p0"] = asm._emscripten_bind_Vector3__clone_p0;
var _emscripten_bind_Vector2__Vector2_p2 = Module["_emscripten_bind_Vector2__Vector2_p2"] = asm._emscripten_bind_Vector2__Vector2_p2;
var dynCall_iiii = Module["dynCall_iiii"] = asm.dynCall_iiii;
var dynCall_fii = Module["dynCall_fii"] = asm.dynCall_fii;
var dynCall_vif = Module["dynCall_vif"] = asm.dynCall_vif;
var dynCall_viiii = Module["dynCall_viiii"] = asm.dynCall_viiii;
var dynCall_viiiii = Module["dynCall_viiiii"] = asm.dynCall_viiiii;
var dynCall_i = Module["dynCall_i"] = asm.dynCall_i;
var dynCall_vi = Module["dynCall_vi"] = asm.dynCall_vi;
var dynCall_iff = Module["dynCall_iff"] = asm.dynCall_iff;
var dynCall_ii = Module["dynCall_ii"] = asm.dynCall_ii;
var dynCall_ifff = Module["dynCall_ifff"] = asm.dynCall_ifff;
var dynCall_iiff = Module["dynCall_iiff"] = asm.dynCall_iiff;
var dynCall_iif = Module["dynCall_iif"] = asm.dynCall_iif;
var dynCall_v = Module["dynCall_v"] = asm.dynCall_v;
var dynCall_fi = Module["dynCall_fi"] = asm.dynCall_fi;
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm.dynCall_viiiiii;
var dynCall_iii = Module["dynCall_iii"] = asm.dynCall_iii;
var dynCall_iifff = Module["dynCall_iifff"] = asm.dynCall_iifff;
var dynCall_iiif = Module["dynCall_iiif"] = asm.dynCall_iiif;
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
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix3_p1(this.ptr, arg0), Module['Vector3']);
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
    return wrapPointer(_emscripten_bind_Vector3__getPositionFromMatrix_p1(this.ptr, arg0), Module['Vector3']);
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
    return wrapPointer(_emscripten_bind_Vector3__applyMatrix4_p1(this.ptr, arg0), Module['Vector3']);
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
    return wrapPointer(_emscripten_bind_Vector3__getScaleFromMatrix_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['transformDirection'] = function(arg0) {
    return wrapPointer(_emscripten_bind_Vector3__transformDirection_p1(this.ptr, arg0), Module['Vector3']);
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
    return wrapPointer(_emscripten_bind_Vector3__applyProjection_p1(this.ptr, arg0), Module['Vector3']);
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
    return wrapPointer(_emscripten_bind_Vector3__applyQuaternion_p1(this.ptr, arg0), Module['Vector3']);
}

Vector3.prototype['dot'] = function(arg0) {
    return _emscripten_bind_Vector3__dot_p1(this.ptr, arg0.ptr);
}

Vector3.prototype['setFromChar'] = function(arg0, arg1) {
    return wrapPointer(_emscripten_bind_Vector3__setFromChar_p2(this.ptr, arg0, arg1), Module['Vector3']);
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
