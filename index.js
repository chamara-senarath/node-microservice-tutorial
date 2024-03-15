import express from 'express';
import createServiceRegistry from './serviceRegistry.js';
const app = express()
const port = 3000

const serviceRegistry = createServiceRegistry(console);


app.get('/', (_, res) => {
    res.send('Hey, Try registering a new service')
})

// Register new service
app.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res) => {
    const { serviceName, serviceVersion, servicePort } = req.params;
    const serviceIp = req.socket.remoteAddress.includes('::') ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;
    const serviceKey = serviceRegistry.register(serviceName, serviceVersion, serviceIp, servicePort);
    res.json({ serviceKey });
})

// Access a service
app.get('/find/:serviceName/:serviceVersion', (req, res) => {
    const { serviceName, serviceVersion } = req.params;
    const service = serviceRegistry.getCandidate(serviceName, serviceVersion);
    if (!service) return res.status(404).json({ result: 'Service not found' });
    return res.json(service);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})