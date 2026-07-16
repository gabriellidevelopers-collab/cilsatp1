const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Encripta una contraseña
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} Contraseña encriptada
 */
async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error en encryptPassword:', error);
    throw new Error('Error al encriptar la contraseña');
  }
}

/**
 * Compara una contraseña en texto plano con una encriptada
 * @param {string} password - Contraseña en texto plano
 * @param {string} hashedPassword - Contraseña encriptada
 * @returns {Promise<boolean>} true si coinciden, false si no
 */
async function comparePasswords(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error en comparePasswords:', error);
    throw new Error('Error al comparar contraseñas');
  }
}

module.exports = {
  encryptPassword,
  comparePasswords
};
