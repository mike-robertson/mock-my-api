## mock-my-api
A simple api mocking util for when you need something simple, quickly. It spins up a server using express.

### Example

```javascript
import mockApi from 'mock-my-api';

const myMock = Object.create(mockApi);
myMock.init({
  endpoints: [
    {
      path: '/path/with/:params',
      data: { test: 'myResponse' },
      method: 'GET',
    }, {
      path: '/path/again/:id',
      // You can also pass a function which behaves as a normal express callback for an endpoint.
      data: (req, res) => {
        res.json({ test: req.params.id });
      },
      delay: {  // number or { min: number, max: number } - default: 0 - unit: ms
        min: 500,
        max: 2000
      }
    }, {
      path: '/something',
      data: { test: 'something' },
      errorRate: 0.5, // 0 - 1
      errorResponse: { // { status: number, body: anything } - default: { status: 500, body: { error: 'error' } }
        status: 500, // number - default: 500
        body: { // body - default: { error: 'error' }
          error: 'Error!'
        }
      },
    }
  ],
  defaultHeaders: [
    {
      name: 'Access-Control-Allow-Origin',
      value: '*',
    },
  ],
});

myMock.start(3000); // Port number goes here. Defaults to 3001.
```
