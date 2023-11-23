import mysql from 'mysql2'

const processQuery = async(req, res)=>{

    const pool = mysql.createPool({
        connectionLimit: 100,
        host: "localhost",
        port: 3306,
        user: "root",
        password: "prajwal2210",
        database: "med_inventory" 
    })

    pool.getConnection(function(err, connection){
        //if not connected
        if(err) throw err;

        //if exists, use it and make query
        connection.query(req.body.query, async function(error, results, fields){
            //after use, return to pool
            connection.release();
            //if error in query
            if(error) throw error;
            //send back results
            return res.status(200).json({auth: true, results: results});
        })
    })

}
  
export default processQuery