const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})
const sub = redisClient.duplicate();

const fibonaci = index => {
    if (index > 2) return 1
    return fibonaci(index - 1) + fibonaci(index - 2)
}

sub.on("message", (channel, message) => {
    redisClient.hset("values", message, fibonaci(parseInt(message)));
})

sub.subscribe("insert");