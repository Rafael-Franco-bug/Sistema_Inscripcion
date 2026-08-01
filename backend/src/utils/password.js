const crypto = require('crypto');

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

/**
 * Genera un hash de contraseña con formato "iteraciones.salt.hashHex".
 * Usa PBKDF2 nativo de Node (no requiere instalar bcrypt).
 */
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const derived = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);
  return `${ITERATIONS}.${salt}.${derived.toString('hex')}`;
}

/**
 * Verifica una contraseña contra un hash almacenado con el formato de arriba.
 */
function verifyPassword(password, storedHash) {
  if (!storedHash || storedHash.split('.').length !== 3) return false;
  const [iterationsStr, salt, hashHex] = storedHash.split('.');
  const iterations = parseInt(iterationsStr, 10);
  const derived = crypto.pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST);
  const storedBuffer = Buffer.from(hashHex, 'hex');
  if (storedBuffer.length !== derived.length) return false;
  return crypto.timingSafeEqual(derived, storedBuffer);
}

module.exports = { hashPassword, verifyPassword };
