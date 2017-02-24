import api from '../src';

const testApi = Object.create(api);
testApi.init({
  endpoints: [
    {
      path: '/',
      data: { test: 'test' },
      errorRate: .5,
      errorResponse: {
        status: 503,
        body: { error: 'Service Unavailable' }
      },
      delay: {
        min: 0,
        max: 5000,
      }
    }, {
      path: '/test/:id',
      data: (req, res) => {
        res.json({
          test: req.params.id
        })
      },
      errorRate: 0,
      errorResponse: {
        status: 503,
        body: { error: 'Service Unavailable' }
      },
      delay: {
        min: 0,
        max: 5,
      }
    }
  ]
});
testApi.start();
