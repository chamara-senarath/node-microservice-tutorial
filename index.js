import express from 'express';
import createServiceRegistry from './serviceRegistry.js';
const app = express()
const port = 3000

const serviceRegistry = createServiceRegistry(console);
serviceRegistry.register("serviceName", "1.0", "127.0.0.1", 8080);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})