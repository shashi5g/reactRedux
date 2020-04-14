exports.id = "main";
exports.modules = {

/***/ "./src/containers/Filters/Filters.jsx":
/*!********************************************!*\
  !*** ./src/containers/Filters/Filters.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_FilterByAttribute_FilterByAttribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/FilterByAttribute/FilterByAttribute */ \"./src/components/FilterByAttribute/FilterByAttribute.jsx\");\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action */ \"./src/containers/Filters/action.js\");\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selector */ \"./src/containers/Filters/selector.js\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/my-app/src/containers/Filters/Filters.jsx\";\n\n\n\n\n\n\nclass Filters extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FilterByAttribute_FilterByAttribute__WEBPACK_IMPORTED_MODULE_2__[\"default\"], Object.assign({}, this.props, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    }));\n  }\n\n}\n\nconst mapDispatchToProps = (dispatch, ownProps) => {\n  return {\n    loadList: data => {\n      dispatch(loadCharacterList(data));\n    },\n    setCheckbox: data => {\n      dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_3__[\"setCheckboxFilter\"])(data));\n    },\n    removeCheckbox: data => dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_3__[\"removeCheckboxFilter\"])(data))\n  };\n};\n\nconst mapStateToProps = state => {\n  return {\n    filterList: Object(_selector__WEBPACK_IMPORTED_MODULE_4__[\"getFilterLIst\"])(state)\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Filters));\n\n//# sourceURL=webpack:///./src/containers/Filters/Filters.jsx?");

/***/ })

};