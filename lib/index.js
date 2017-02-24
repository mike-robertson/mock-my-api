'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorDefault = { status: 500, body: { error: 'error' } };
var defaultResponseFn = function defaultResponseFn(data) {
  return function (req, res) {
    res.status(200).json(data);
  };
};
var errorFn = function errorFn() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : errorDefault,
      _ref$status = _ref.status,
      status = _ref$status === undefined ? errorDefault.status : _ref$status,
      _ref$body = _ref.body,
      body = _ref$body === undefined ? errorDefault.body : _ref$body;

  return function (req, res) {
    res.status(status).json(body);
  };
};

var composeResponse = function composeResponse(errorRate, cb, err) {
  return errorRate === 1 || errorRate > Math.random() ? err : cb;
};

var calculateDelayAmount = function calculateDelayAmount(delay) {
  return typeof delay === 'number' ? delay : Math.random() * (delay.max - delay.min) + delay.min;
};

var api = {
  addEndpoints: function addEndpoints(_ref2) {
    var _this = this;

    var _ref2$defaultHeaders = _ref2.defaultHeaders,
        defaultHeaders = _ref2$defaultHeaders === undefined ? [] : _ref2$defaultHeaders,
        _ref2$endpoints = _ref2.endpoints,
        endpoints = _ref2$endpoints === undefined ? [] : _ref2$endpoints;

    this.server.use(function (req, res, next) {
      defaultHeaders.forEach(function (_ref3) {
        var name = _ref3.name,
            value = _ref3.value;

        res.setHeader(name, value);
      });
      next();
    });
    endpoints.forEach(function (_ref4) {
      var path = _ref4.path,
          data = _ref4.data,
          _ref4$method = _ref4.method,
          method = _ref4$method === undefined ? 'GET' : _ref4$method,
          _ref4$delay = _ref4.delay,
          delay = _ref4$delay === undefined ? 0 : _ref4$delay,
          _ref4$errorRate = _ref4.errorRate,
          errorRate = _ref4$errorRate === undefined ? 0 : _ref4$errorRate,
          errorResponse = _ref4.errorResponse;

      // let dataFn = data;
      var dataFn = void 0;
      if (typeof data === 'function') {
        dataFn = function dataFn() {
          var _errorFn;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          setTimeout(composeResponse(errorRate, data.bind.apply(data, [null].concat(args)), (_errorFn = errorFn(errorResponse)).bind.apply(_errorFn, [null].concat(args))), calculateDelayAmount(delay));
        };
      } else {
        dataFn = function dataFn() {
          var _defaultResponseFn, _errorFn2;

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          setTimeout(composeResponse(errorRate, (_defaultResponseFn = defaultResponseFn(data)).bind.apply(_defaultResponseFn, [null].concat(args)), (_errorFn2 = errorFn(errorResponse)).bind.apply(_errorFn2, [null].concat(args))), calculateDelayAmount(delay));
        };
      }
      _this.server[method.toLowerCase()](path, dataFn);
    });
  },
  init: function init(config) {
    this.server = (0, _express2.default)();
    this.server.user(_bodyParser2.default.json());
    this.addEndpoints(config);
  },
  start: function start() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3001;

    this.server.listen(port);
  }
};

exports.default = api;