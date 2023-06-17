import {createClient} from 'redis';
import { REDIS_URL } from '../helpper/env';

const createRedisClient = async () => {
    try {
        if(!REDIS_URL)return;
        const client = createClient({ url: REDIS_URL,password:'123456' });
        console.log(REDIS_URL)
        client.on('error', function (error) {
            console.log('----redis connect failed!----')
        })
        client.on('connect',function(){
            console.log('----redis connect successfully!----')
        })
        await client.connect();
        return client
    } catch (e) {
        console.log(e)
    }
}
const redisClient = createRedisClient();

export { redisClient };