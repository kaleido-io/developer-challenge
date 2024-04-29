const { Pool } = require('pg');

const pool = new Pool({
    user: 'skram',
    host: 'localhost',
    database: 'skramsportsdb',
    password: 'Baseball-Diamond3-Hotdog',
    port: 5432,
});

process.on('SIGINT', () => {
    pool.end();
    console.log('\nPool has ended');
    process.exit(0);
});

export default pool;
