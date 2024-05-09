const Queue = require('bull');
const { redisPort, redisHost } = process.env;

const csvUploadQueue = new Queue("csvQueue", {
    redis: {
        port: redisPort,
        host: redisHost
    }
});

module.exports = csvUploadQueue;