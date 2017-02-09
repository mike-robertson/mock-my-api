'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  addEndpoints: function addEndpoints(_ref) {
    var _this = this;

    var _ref$defaultHeaders = _ref.defaultHeaders,
        defaultHeaders = _ref$defaultHeaders === undefined ? [] : _ref$defaultHeaders,
        _ref$endpoints = _ref.endpoints,
        endpoints = _ref$endpoints === undefined ? [] : _ref$endpoints;

    this.server.use(function (req, res, next) {
      defaultHeaders.forEach(function (_ref2) {
        var name = _ref2.name,
            value = _ref2.value;

        res.setHeader(name, value);
      });
      next();
    });
    endpoints.forEach(function (_ref3) {
      var path = _ref3.path,
          data = _ref3.data,
          _ref3$method = _ref3.method,
          method = _ref3$method === undefined ? 'GET' : _ref3$method;

      var dataFn = data;
      if (typeof data !== 'function') {
        dataFn = function dataFn(req, res) {
          res.status(200).json(data);
        };
      }
      _this.server[method.toLowerCase()](path, dataFn);
    });
  },
  init: function init(config) {
    this.server = (0, _express2.default)();
    this.addEndpoints(config);
  },
  start: function start() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3001;

    this.server.listen(port);
  }
};

exports.default = api;