import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

export const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TLS: process.env.REDIS_TLS === 'true',
    CACHE_TTL: parseInt(process.env.CACHE_TTL || '60', 10),
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// Log para verificar
console.log('🔧 Config cargada:', {
    MONGO_URI: env.MONGO_URI,
    REDIS_HOST: env.REDIS_HOST,
    REDIS_PORT: env.REDIS_PORT,
    REDIS_URL: env.REDIS_URL ? 'DEFINIDA' : undefined,
});
