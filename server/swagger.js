import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: `localhost:${process.env.PORT || 3000}`,
};

const outputFile = './swagger-output.json';
const routes = ['./routes/user.router.js', './routes/post.router.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);