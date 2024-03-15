import express from 'express';
import { config } from 'process';
import { registerService, unregisterService } from './serviceHandler.js';
const app = express()
const port = 3002

config.name = "service1"
config.version = "1.1.0"

app.get('/', (_, res) => {
    res.send('Hello I am service 1')
})

app.listen(port, () => {
    registerService(port.toString())
})

process.on('uncaughtException', async () => {
    await unregisterService(port.toString());
    process.exit(0);
});

process.on('SIGINT', async () => {
    await unregisterService(port.toString());
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await unregisterService(port.toString());
    process.exit(0);
});