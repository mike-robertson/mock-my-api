import express from 'express';

const api = {
  addEndpoints({ defaultHeaders = [], endpoints = [] }) {
    this.server.use((req, res, next) => {
      defaultHeaders.forEach(({ name, value }) => {
        res.setHeader(name, value)
      });
      next();
    });
    endpoints.forEach(({ path, data, method = 'GET' }) => {
      let dataFn = data;
      if (typeof data !== 'function') {
        dataFn = (req, res) => {
          res.status(200)
            .json(data);
        }
      }
      this.server[method.toLowerCase()](path, dataFn);
    });
  },
  init(config) {
    this.server = express();
    this.addEndpoints(config);
  },
  start(port = 3001) {
    this.server.listen(port);
  }
};

export default api;
