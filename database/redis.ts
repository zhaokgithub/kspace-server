import redis from 'redis';
import config from '../helper/config';

const createRedisClient = ()=>{
    const client = redis.createClient();
    client.on('error',function(error){

    })
    return client
}
const redisClient = createRedisClient();

export {redisClient,};