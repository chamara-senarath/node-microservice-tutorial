  const createServiceRegistry = (log) => {
     const services = {};

     const register = (name, version, ip, port) => {
       const key = name + version + ip + port;
   
       if (!services[key]) {
         services[key] = {};
         services[key].timestamp = Math.floor(new Date() / 1000);
         services[key].ip = ip;
         services[key].port = port;
         services[key].name = name;
         services[key].version = version;
         log.debug(`Added services ${name}, version ${version} at ${ip}:${port}`);
       } else {
         services[key].timestamp = Math.floor(new Date() / 1000);
         log.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`);
       }
   
       return key;
     };

     return { register };
 }
  
 export default createServiceRegistry;