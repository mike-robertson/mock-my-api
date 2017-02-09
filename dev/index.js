import api from '../src';

const testApi = Object.create(api);
testApi.init({
  endpoints: [
    {
      path: '/',
      data: { test: 'test' }
    }, {
      path: '/test/:id',
      data: (req, res) => {
        res.json({
          test: req.params.id
        })
      }
    }
  ]
});
testApi.start();
