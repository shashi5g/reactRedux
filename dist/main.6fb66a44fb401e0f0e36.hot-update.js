exports.id = "main";
exports.modules = {

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function escape(url, needQuotes) {\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || needQuotes) {\n    return '\"' + url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') + '\"';\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/url-escape.js?");

/***/ }),

/***/ "./src/components/index.css":
/*!**********************************!*\
  !*** ./src/components/index.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ \"./node_modules/css-loader/dist/runtime/url-escape.js\");\nvar ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './double-bubble-dark.png'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\n// Module\nexports.push([module.i, \"* {\\n    box-sizing: border-box;\\n    margin: 0;\\n    padding: 0;\\n  }\\n  img{\\n      width: 100%;\\n      max-width:100%;\\n  }\\n  .plp{\\n      width: 100%;\\n      display: flex\\n  }\\n  .left{\\n  \\n      width: 20%;\\n    padding-right: 50px;\\n  }\\n  .right{\\n      width: 80%;\\n  }\\n  .flex-wrapper {\\n    display: flex;\\n    flex-wrap: wrap;\\n     background-image: url(\" + ___CSS_LOADER_URL___0___ + \"); \\n    padding: 10px;\\n  }\\n\\n  .tiles-list{\\n\\n  }\\n  \\n  .flex-wrapper img{\\n\\n    display: block;\\n    border-radius: 10px 10px 0 0;\\n  }\\n  .flex-wrapper > li {\\n    width: 100%;\\n    max-width: 25%;\\n    padding: 10px;\\n    /* border: 1px solid pink; */\\n    list-style: none;\\n  }\\n\\n  h3{\\n    font-size: 30px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: #fff\\n}\\nspan{\\n    font-size: 15px;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: #fff;\\n}\\n.card{\\n  position: relative;\\n}\\n\\n.card-title{\\n  position: absolute;\\n  padding:10px;\\n  opacity: .5;\\n  bottom: 0;\\n  width: 100%;\\n  background: rgba(0,0,0,.7);\\n\\n}\\n.card-desc{\\n  background: rgba(0,0,0,.6);\\n  padding-top: 20px;\\n  padding-bottom: 30px;\\n  border-radius: 0 0 10px 10px;\\n  min-height: 300px;\\n}\\n\\n.card-desc li {\\n  list-style: none;\\n  padding: 10px;\\n  border-bottom: 1px solid rgba(0,0,0,.7);\\n  display: flex;\\n}\\n.card-desc li span{\\n  color:orange\\n}\\n.card-desc li span:first-child {\\n text-transform: uppercase;\\n flex: 1 1 0;\\n color: white;\\n}\\n.card-desc li span{\\n  margin-bottom: 0;\\n}\\n.card-desc li:last-child{\\n  border-bottom: 0;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/index.css?");

/***/ })

};