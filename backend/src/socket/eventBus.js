// src/socket/eventBus.js
import { crearConexionRedis } from '../config/redis.js';

const CANAL = 'taskflow:eventos';

// Publicador (lo usa el backend y el worker)
export const publisher = crearConexionRedis();

// Suscriptor (solo lo usa el backend para reenviar a Socket.IO)
export const subscriber = crearConexionRedis();

export const publicarEvento = async (evento, payload) => {
    await publisher.publish(CANAL, JSON.stringify({ evento, payload }));
};

export const suscribirEventos = (callback) => {
    subscriber.subscribe(CANAL, (err) => {
        if (err) console.error('❌ Error suscribiendo a Redis:', err.message);
        else console.log(`📡 Suscrito al canal ${CANAL}`);
    });

    subscriber.on('message', (canal, mensaje) => {
        if (canal !== CANAL) return;
        try {
            const { evento, payload } = JSON.parse(mensaje);
            callback(evento, payload);
        } catch (error) {
            console.error('❌ Error parseando evento:', error.message);
        }
    });
};

export { CANAL };