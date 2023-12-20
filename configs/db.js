const { createClient } = require('redis');

/* Redis databse credentials for testing purpose only */
/* To be provided in env for production mode */
const client = createClient({
    password: 'WCRl9c0WbgNGnQO6QT4C2HVAp2An2xDH',
    socket: {
        host: 'redis-10532.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10532
    }
});

/* Connect to redis database */
(async () => {
    console.log("Connecting to the Redis");
    await client.connect();
})();

client.on("ready", () => {
    console.log("Connected!");
});

client.on("error", (err) => {
    console.log("Error in the Connection");
});

module.exports = client;
