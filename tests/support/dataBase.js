const {Pool} = require('pg')

const DbConfig = {
    user: 'sklhcvjg',
    host: 'kesavan.db.elephantsql.com',
    database: 'sklhcvjg',
    password: 'ovhVrKAB1ps_h9uUN3D8aTu25KLE51ht',
    port: 5432
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    } 
}