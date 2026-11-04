// src/config/redis.js
import Redis from 'ioredis';
import { env } from './env.js';

const getRedisConfig = () => {
    if (env.REDIS_URL) {
        return env.REDIS_URL;
    }
    return {
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT) || 6379,
        password: env.REDIS_PASSWORD || undefined,
        tls: env.REDIS_TLS ? {} : undefined,
        maxRetriesPerRequest: null,
    };
};

const redisConfig = getRedisConfig();

export const redis = typeof redisConfig === 'string'
    ? new Redis(redisConfig, { maxRetriesPerRequest: null })
    : new Redis(redisConfig);

redis.on('connect', () => console.log('✅ Redis conectado'));
redis.on('error', (err) => console.error('❌ Error Redis:', err.message));

// Función para crear conexiones dedicadas (brpop, pub/sub, etc.)
export const crearConexionRedis = () => {
    const config = getRedisConfig();
    const conn = typeof config === 'string'
        ? new Redis(config, { maxRetriesPerRequest: null })
        : new Redis(config);
    conn.on('error', (err) => console.error('❌ Error Redis (dedicada):', err.message));
    return conn;
};
