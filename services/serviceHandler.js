import { config } from "process";

export const registerService = (port) => {
    const url = `http://localhost:3000/register/${config.name}/${config.version}/${port}`;
    fetch(url, {
        method: 'PUT'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to register service: ${response.statusText}`);
            }
            console.log(`Service registered successfully at port ${port}`);
        })
        .catch(error => {
            console.error('Error registering service:', error);
        });

    console.log(
        `Hi there! I'm listening on port ${port}.`,
    );
}

export const unregisterService = async (port) => {
    const url = `http://localhost:3000/register/${config.name}/${config.version}/${port}`;
    return fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to unregister service');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error unregistering service:', error);
        });
};