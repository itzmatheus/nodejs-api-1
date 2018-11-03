module.exports = {

    dev: {
        database: {
            host: 'localhost',
            port: 5432,
            name: 'spoiler',
            dialect: 'postgres',
            user: 'postgres',
            password: '123456'
        }
    },
    prod: {
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    }

}