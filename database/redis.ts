import {createClient} from 'redis';
import { REDIS_URL } from '../helpper/env';

const createRedisClient = async () => {
    try {
        const client = createClient({ url: REDIS_URL });
        console.log(REDIS_URL)
        await client.connect();
        client.on('error', function (error) {
            console.log('----redis connect failed!----')
        })
        client.on('connect',function(){
            console.log('----redis connect successfully!----')
        })
        return client
    } catch (e) {
        console.log(e)
    }
}
const redisClient = createRedisClient();

export { redisClient, };