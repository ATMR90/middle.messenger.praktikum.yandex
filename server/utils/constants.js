require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  if (!process.env.PORT) {
    throw new Error('В режиме production наличие .env.PORT (переменной окружения) — обязательно');
  }
}

module.exports = {
	PORT: Number(process.env.PORT) || 80,
  NODE_ENV: process.env.NODE_ENV || 'development',
	DIST_DIR: process.env.DIST_DIR || 'dist',
};
