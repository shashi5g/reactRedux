exports.id = "main";
exports.modules = {

/***/ "./src/components/FilterByAttribute/FilterByAttribute.jsx":
/*!****************************************************************!*\
  !*** ./src/components/FilterByAttribute/FilterByAttribute.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ \"./src/components/FilterByAttribute/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/my-app/src/components/FilterByAttribute/FilterByAttribute.jsx\";\n\n\n\n\n\nclass Filter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {\n      filterList: []\n    };\n    this.handleFilterBrand = this.handleFilterBrand.bind(this);\n  }\n\n  componentDidMount() {\n    this.setState((state, props) => ({\n      filterList: props.filterList\n    }));\n  }\n\n  handleFilterBrand(e) {\n    const name = e.target.name;\n    const isChecked = e.target.checked;\n    this.setState({\n      [name]: isChecked\n    });\n    const filterList = this.props.filterList;\n    const filterListCont = filterList && filterList.filter(item => {\n      if (item && item.name === name) {\n        item.isChecked = e.target.checked;\n      }\n\n      return item;\n    });\n\n    if (e.target.checked) {\n      this.props.setCheckbox(filterListCont);\n      const type = filterList && filterList.filter(item => {\n        let type = '';\n\n        if (item && item.name === name) {\n          type = item.type;\n        }\n\n        return type;\n      });\n      let queryParams = '';\n      queryParams = queryParams + \"\".concat(type, \"=\").concat(name);\n      const url = \"https://rickandmortyapi.com/api/character/\";\n      const modifyUrl = queryParams ? \"\".concat(url, \"?\").concat(type.type, \"=\").concat(name) : '';\n      this.props.history.push(\"search/?\".concat(type.type, \"=\").concat(name));\n      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(modifyUrl).then(response => {\n        console.log(\"response.data\", response.data);\n      }).catch(error => {\n        console.error('axios error', error); // eslint-disable-line no-console\n      });\n    } else {\n      this.props.removeCheckbox(filterList);\n    }\n  }\n\n  render() {\n    const filterList = this.state.filterList;\n    const species = filterList && filterList.filter(item => {\n      return item.type === 'Species';\n    });\n    const gender = filterList && filterList.filter(item => {\n      return item.type === 'Gender';\n    });\n    const origin = filterList && filterList.filter(item => {\n      return item.type === 'Origin';\n    });\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 75\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 76\n      },\n      __self: this\n    }, \"Filter\"), species.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"species\",\n      key: Math.random(),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78\n      },\n      __self: this\n    }, species[0].type), species.length && species.map((item, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 80\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"checkbox\",\n        name: item.name,\n        id: item.name,\n        value: item.name,\n        checked: item.isChecked,\n        onChange: e => this.handleFilterBrand(e),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 81\n        },\n        __self: this\n      }), item.label);\n    })), gender.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"species\",\n      key: Math.random(),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 89\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 90\n      },\n      __self: this\n    }, gender[0].type), gender.length && gender.map((item, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 92\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"checkbox\",\n        name: item.name,\n        id: item.name,\n        value: item.name,\n        checked: item.isChecked,\n        onChange: e => this.handleFilterBrand(e),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 93\n        },\n        __self: this\n      }), item.label);\n    })), origin.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"species\",\n      key: Math.random(),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 101\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 102\n      },\n      __self: this\n    }, origin[0].type), origin.length && origin.map((item, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 104\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"checkbox\",\n        name: item.name,\n        id: item.name,\n        value: item.name,\n        checked: item.isChecked,\n        onChange: e => this.handleFilterBrand(e),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 105\n        },\n        __self: this\n      }), item.label);\n    })));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(Filter));\n\n//# sourceURL=webpack:///./src/components/FilterByAttribute/FilterByAttribute.jsx?");

/***/ }),

/***/ "./src/components/FilterByAttribute/style.css":
/*!****************************************************!*\
  !*** ./src/components/FilterByAttribute/style.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"h2{\\n    margin-bottom: 15px;\\n}\\n.left h3{\\n    display: block;\\n    font-size: 24px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: black;\\n}\\n.species,.gender,.origin{\\n    padding: 20px;\\n    border: 1px solid gray;\\n    margin-bottom: 30px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/FilterByAttribute/style.css?");

/***/ })

};