import redis from 'redis';
import { REDIS_URL } from '../helpper/env';

const createRedisClient = async () => {
    try {
        const client = redis.createClient({ url: REDIS_URL });
        await client.connect();
        client.on('error', function (error) {

        })
        return client
    } catch (e) {
        console.log(e)
    }
}
const redisClient = createRedisClient();

export { redisClient, };