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
      data: (req, res) => { // You can also pass a function which behaves as a normal express callback for an endpoint.
        res.json({ test: req.params.id });
      },
    },
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
