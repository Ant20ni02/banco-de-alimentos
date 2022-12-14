const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.getUsersData = (req,res) =>{
    const idUser = req.params.idUser;
    const  mensaje = "ID incorrecto"
    const sql = `SELECT * FROM User_ WHERE idUser = ?`;

    conexion.query(sql, [idUser],(error, results, fields) =>{
        if(error)
            res.send(error);

        else{
            if(results[0] == undefined)
                res.json({
                    mensaje
                })
            
            console.log(results);
            res.json(results[0]);
        }
    })
}

module.exports.changeUserStatus = (req,res) =>{
    const idUser = req.params.idUser;
    let mensaje = "isActive state updated";

    const sql = `SELECT  isActive FROM User_ WHERE idUser = ?`
    const query = `UPDATE User_ SET isActive = ? WHERE idUser = ?`
    
    conexion.query(sql, [idUser], (error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            if(results[0] !=undefined){
                let isActive = results[0].isActive;
                //console.log(typeof isActive);

                if(isActive === 0){
                    mensaje = "Usuario Activado";
                    isActive = 1;
                }
                else{
                    mensaje = "Usuario desactivado"
                    isActive = 0;
                }

                conexion.query(query, [isActive,idUser], (error,results,fields) =>{
                    if(error)
                        res.send(error)
                    else{
                        res.json({
                            mensaje
                        })
                    }

                })

            }
            else{
                mensaje = "El id del usuario es incorrecto"
                res.json({
                    mensaje
                })
            }

        }


    })


}


module.exports.getAllVolunteers = (req,res) =>{
    const petition = `SELECT * FROM User_ WHERE userType = "voluntario"`

    conexion.query(petition,(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }

    })

}

module.exports.getActiveVolunteers = (req,res) =>{
    const sql = `SELECT * FROM User_ WHERE ((userType = "Voluntario") AND (isActive = 1))`

    conexion.query(sql,(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }

    })

}

module.exports.getInactiveVolunteers = (req,res) =>{
    const sql = `SELECT * FROM User_ WHERE ((userType = "Voluntario") AND (isActive = 0))`

    conexion.query(sql,(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }

    })

}

module.exports.deleteUser = (req,res) =>{
    const idUser = req.params.idUser;
    const sql = `DELETE FROM User_ WHERE idUser = ?`

    conexion.query(sql, [idUser],(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }
    })
}

module.exports.updateProfilePicture = (req, res) =>{
    const idUser = req.body.idUser;
    const img = req.body.img;
    const sql = `UPDATE User_ SET img = ?  WHERE idUser = ?  `;

    conexion.query(sql, [img, idUser],(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }
    })
}

module.exports.getNamePhoto = (req, res) =>{
    const idUser = req.params.idUser;
    const sql = `SELECT firstName, lastName, img from User_ WHERE idUser = ?  `;

    conexion.query(sql, [idUser],(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }
    })
}