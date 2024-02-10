var PAGE_MODULE =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/contentScripts/_main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/contentScripts/_main.js":
/*!************************************!*\
  !*** ./js/contentScripts/_main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_toast */ "./js/contentScripts/_toast.js");


let currentSelectedText = '';

function isInputElement(el) {
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'SELECT' ||
    el.tagName === 'TEXTAREA' ||
    el.isContentEditable
  );
}

function inputFieldHasFocus() {
  return isInputElement(document.activeElement);
}

function getSelectedText() {
  return window.getSelection().toString();
}

function displayToast(msg) {
  Object(_toast__WEBPACK_IMPORTED_MODULE_0__["showToast"])(`Copied: "${msg}"`);
}

function copySelectedTextIfApplicable() {
  if (!inputFieldHasFocus()) {
    let selectedText = getSelectedText();

    //check that selectedText is truthy to ensure we have something to copy AND check
    //that selectedText != currentSelectedText so that I don't do unnecessary work (of
    //double copying and also showing the toast twice for the same text); in other
    //words, if there is text already selected on the page, then it has already been
    //copied and the user has already been shown a toast about it, so don't show it again
    // console.log(`selectedText="${selectedText}; currentSelectedText="${currentSelectedText}"`);
    if (selectedText && selectedText !== currentSelectedText) {
      //copy the selected text
      document.execCommand('copy');

      //display toast
      displayToast(selectedText);
    }

    currentSelectedText = selectedText;
  }
}

function handleMouseUp(event) {
  copySelectedTextIfApplicable();
}

function handleKeyUp(event) {
  copySelectedTextIfApplicable();
}

function handleCopyEvent(event) {
  const selectedText = getSelectedText();

  //if there is no selected text on the page, then copy the url
  if (!selectedText) {
    let url = window.location.href;

    //put the url in an anchor tag so that it's copied as a link to the clipboard (so that
    //when it's pasted, it gets pasted as a link (instead of just plaintext))
    event.clipboardData.setData('text/html', `<a href="${url}">${url}</a>`);

    //fallback to plaintext if the above doesn't work (per MDN recommendation)
    event.clipboardData.setData('text/plain', url);

    //display toast
    displayToast(url);

    //prevent default to prevent the browser from executing a "copy" command
    event.preventDefault();
  }
}

(function main() {
  //add event listeners
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('copy', handleCopyEvent);
})();


/***/ }),

/***/ "./js/contentScripts/_toast.js":
/*!*************************************!*\
  !*** ./js/contentScripts/_toast.js ***!
  \*************************************/
/*! exports provided: showToast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return showToast; });
const ELEMENT_ID = 'crx_toast';

function createToastElement(body) {
  //create the element
  let div = document.createElement('div');
  div.id = ELEMENT_ID;
  div.innerHTML = body;

  //add the click listener to remove it when clicked
  // div.addEventListener('click', removeToastElement);

  //add it to the page
  document.body.appendChild(div);
}

function removeToastElement() {
  let element = document.getElementById(ELEMENT_ID);
  if (element) {
    element.remove();
  }
}

function showToast(msg) {
  //remove previous toast element if it exists (which will happen if text has
  //previously been selected on the page before)
  removeToastElement();

  //create new toast element
  createToastElement(msg);
}

//Remove the toast element so that it doesn't interfere with interacting with other things on the page
document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fadeout') {
    removeToastElement();
  }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QQUdFX01PRFVMRS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QQUdFX01PRFVMRS8uL2pzL2NvbnRlbnRTY3JpcHRzL19tYWluLmpzIiwid2VicGFjazovL1BBR0VfTU9EVUxFLy4vanMvY29udGVudFNjcmlwdHMvX3RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBcUM7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsd0RBQVMsYUFBYSxJQUFJO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUVBQXlFO0FBQ3pFO0FBQ0E7QUFDQSxvQ0FBb0MsY0FBYyx3QkFBd0Isb0JBQW9CO0FBQzlGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RCxJQUFJLElBQUksSUFBSTs7QUFFckU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbEZEO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoianMvY29udGVudFNjcmlwdHMvX21haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9jb250ZW50U2NyaXB0cy9fbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gJy4vX3RvYXN0JztcblxubGV0IGN1cnJlbnRTZWxlY3RlZFRleHQgPSAnJztcblxuZnVuY3Rpb24gaXNJbnB1dEVsZW1lbnQoZWwpIHtcbiAgcmV0dXJuIChcbiAgICBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8XG4gICAgZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgfHxcbiAgICBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnIHx8XG4gICAgZWwuaXNDb250ZW50RWRpdGFibGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gaW5wdXRGaWVsZEhhc0ZvY3VzKCkge1xuICByZXR1cm4gaXNJbnB1dEVsZW1lbnQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGVkVGV4dCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5VG9hc3QobXNnKSB7XG4gIHNob3dUb2FzdChgQ29waWVkOiBcIiR7bXNnfVwiYCk7XG59XG5cbmZ1bmN0aW9uIGNvcHlTZWxlY3RlZFRleHRJZkFwcGxpY2FibGUoKSB7XG4gIGlmICghaW5wdXRGaWVsZEhhc0ZvY3VzKCkpIHtcbiAgICBsZXQgc2VsZWN0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cbiAgICAvL2NoZWNrIHRoYXQgc2VsZWN0ZWRUZXh0IGlzIHRydXRoeSB0byBlbnN1cmUgd2UgaGF2ZSBzb21ldGhpbmcgdG8gY29weSBBTkQgY2hlY2tcbiAgICAvL3RoYXQgc2VsZWN0ZWRUZXh0ICE9IGN1cnJlbnRTZWxlY3RlZFRleHQgc28gdGhhdCBJIGRvbid0IGRvIHVubmVjZXNzYXJ5IHdvcmsgKG9mXG4gICAgLy9kb3VibGUgY29weWluZyBhbmQgYWxzbyBzaG93aW5nIHRoZSB0b2FzdCB0d2ljZSBmb3IgdGhlIHNhbWUgdGV4dCk7IGluIG90aGVyXG4gICAgLy93b3JkcywgaWYgdGhlcmUgaXMgdGV4dCBhbHJlYWR5IHNlbGVjdGVkIG9uIHRoZSBwYWdlLCB0aGVuIGl0IGhhcyBhbHJlYWR5IGJlZW5cbiAgICAvL2NvcGllZCBhbmQgdGhlIHVzZXIgaGFzIGFscmVhZHkgYmVlbiBzaG93biBhIHRvYXN0IGFib3V0IGl0LCBzbyBkb24ndCBzaG93IGl0IGFnYWluXG4gICAgLy8gY29uc29sZS5sb2coYHNlbGVjdGVkVGV4dD1cIiR7c2VsZWN0ZWRUZXh0fTsgY3VycmVudFNlbGVjdGVkVGV4dD1cIiR7Y3VycmVudFNlbGVjdGVkVGV4dH1cImApO1xuICAgIGlmIChzZWxlY3RlZFRleHQgJiYgc2VsZWN0ZWRUZXh0ICE9PSBjdXJyZW50U2VsZWN0ZWRUZXh0KSB7XG4gICAgICAvL2NvcHkgdGhlIHNlbGVjdGVkIHRleHRcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG5cbiAgICAgIC8vZGlzcGxheSB0b2FzdFxuICAgICAgZGlzcGxheVRvYXN0KHNlbGVjdGVkVGV4dCk7XG4gICAgfVxuXG4gICAgY3VycmVudFNlbGVjdGVkVGV4dCA9IHNlbGVjdGVkVGV4dDtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGV2ZW50KSB7XG4gIGNvcHlTZWxlY3RlZFRleHRJZkFwcGxpY2FibGUoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5VXAoZXZlbnQpIHtcbiAgY29weVNlbGVjdGVkVGV4dElmQXBwbGljYWJsZSgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDb3B5RXZlbnQoZXZlbnQpIHtcbiAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cbiAgLy9pZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IG9uIHRoZSBwYWdlLCB0aGVuIGNvcHkgdGhlIHVybFxuICBpZiAoIXNlbGVjdGVkVGV4dCkge1xuICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgIC8vcHV0IHRoZSB1cmwgaW4gYW4gYW5jaG9yIHRhZyBzbyB0aGF0IGl0J3MgY29waWVkIGFzIGEgbGluayB0byB0aGUgY2xpcGJvYXJkIChzbyB0aGF0XG4gICAgLy93aGVuIGl0J3MgcGFzdGVkLCBpdCBnZXRzIHBhc3RlZCBhcyBhIGxpbmsgKGluc3RlYWQgb2YganVzdCBwbGFpbnRleHQpKVxuICAgIGV2ZW50LmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgYDxhIGhyZWY9XCIke3VybH1cIj4ke3VybH08L2E+YCk7XG5cbiAgICAvL2ZhbGxiYWNrIHRvIHBsYWludGV4dCBpZiB0aGUgYWJvdmUgZG9lc24ndCB3b3JrIChwZXIgTUROIHJlY29tbWVuZGF0aW9uKVxuICAgIGV2ZW50LmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHVybCk7XG5cbiAgICAvL2Rpc3BsYXkgdG9hc3RcbiAgICBkaXNwbGF5VG9hc3QodXJsKTtcblxuICAgIC8vcHJldmVudCBkZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBleGVjdXRpbmcgYSBcImNvcHlcIiBjb21tYW5kXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG4oZnVuY3Rpb24gbWFpbigpIHtcbiAgLy9hZGQgZXZlbnQgbGlzdGVuZXJzXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVLZXlVcCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBoYW5kbGVDb3B5RXZlbnQpO1xufSkoKTtcbiIsImNvbnN0IEVMRU1FTlRfSUQgPSAnY3J4X3RvYXN0JztcblxuZnVuY3Rpb24gY3JlYXRlVG9hc3RFbGVtZW50KGJvZHkpIHtcbiAgLy9jcmVhdGUgdGhlIGVsZW1lbnRcbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaWQgPSBFTEVNRU5UX0lEO1xuICBkaXYuaW5uZXJIVE1MID0gYm9keTtcblxuICAvL2FkZCB0aGUgY2xpY2sgbGlzdGVuZXIgdG8gcmVtb3ZlIGl0IHdoZW4gY2xpY2tlZFxuICAvLyBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUb2FzdEVsZW1lbnQpO1xuXG4gIC8vYWRkIGl0IHRvIHRoZSBwYWdlXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVG9hc3RFbGVtZW50KCkge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEVMRU1FTlRfSUQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dUb2FzdChtc2cpIHtcbiAgLy9yZW1vdmUgcHJldmlvdXMgdG9hc3QgZWxlbWVudCBpZiBpdCBleGlzdHMgKHdoaWNoIHdpbGwgaGFwcGVuIGlmIHRleHQgaGFzXG4gIC8vcHJldmlvdXNseSBiZWVuIHNlbGVjdGVkIG9uIHRoZSBwYWdlIGJlZm9yZSlcbiAgcmVtb3ZlVG9hc3RFbGVtZW50KCk7XG5cbiAgLy9jcmVhdGUgbmV3IHRvYXN0IGVsZW1lbnRcbiAgY3JlYXRlVG9hc3RFbGVtZW50KG1zZyk7XG59XG5cbi8vUmVtb3ZlIHRoZSB0b2FzdCBlbGVtZW50IHNvIHRoYXQgaXQgZG9lc24ndCBpbnRlcmZlcmUgd2l0aCBpbnRlcmFjdGluZyB3aXRoIG90aGVyIHRoaW5ncyBvbiB0aGUgcGFnZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUuYW5pbWF0aW9uTmFtZSA9PT0gJ2ZhZGVvdXQnKSB7XG4gICAgcmVtb3ZlVG9hc3RFbGVtZW50KCk7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==