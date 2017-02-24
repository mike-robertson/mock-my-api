import express from 'express';
import bodyParser from 'body-parser';
const errorDefault = { status: 500, body: { error: 'error' } };
const defaultResponseFn = data => (req, res) => {
  res.status(200)
    .json(data);
};
const errorFn = ({
  status = errorDefault.status,
  body = errorDefault.body,
} = errorDefault) =>
  (req, res) => {
    res.status(status)
      .json(body);
  };

const composeResponse = (errorRate, cb, err) => errorRate === 1 || errorRate > Math.random() ? err : cb;

const calculateDelayAmount = delay =>
  typeof delay === 'number'
    ? delay
    : Math.random() * (delay.max - delay.min) + delay.min;

const api = {
  addEndpoints({ defaultHeaders = [], endpoints = [] }) {
    this.server.use((req, res, next) => {
      defaultHeaders.forEach(({ name, value }) => {
        res.setHeader(name, value)
      });
      next();
    });
    endpoints.forEach(({
      path,
      data,
      method = 'GET',
      delay = 0,
      errorRate = 0,
      errorResponse,
    }) => {
      // let dataFn = data;
      let dataFn;
      if (typeof data === 'function') {
        dataFn = (...args) => {
          setTimeout(
            composeResponse(
              errorRate,
              data.bind(null, ...args),
              errorFn(errorResponse).bind(null, ...args)
            ),
            calculateDelayAmount(delay)
          );
        };
      } else {
        dataFn = (...args) => {
          setTimeout(
            composeResponse(
              errorRate,
              defaultResponseFn(data).bind(null, ...args),
              errorFn(errorResponse).bind(null, ...args)
            ),
            calculateDelayAmount(delay)
          );
        }
      }
      this.server[method.toLowerCase()](path, dataFn);
    });
  },
  init(config) {
    this.server = express();
    this.server.use(bodyParser.json())
    this.addEndpoints(config);
  },
  start(port = 3001) {
    this.server.listen(port);
  }
};

export default api;
