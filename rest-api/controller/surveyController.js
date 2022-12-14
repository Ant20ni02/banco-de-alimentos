const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.addSurvey = (req, res) =>{
    const idUser = req.body.idUser;
    const idFamily = req.body.idFamily;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    //const idQuestionList = req.body.idQuestionList;
    const currentDate = new Date();
    const clock = currentDate.getDate() +"-"+ (currentDate.getMonth() + 1 )+"-" + currentDate.getFullYear();
    const mensaje = ""

    const sql = `INSERT INTO Survey (idUser, idFamily, date_, latitude, longitude) VALUES(?,?,?,?,?)`;
    const sql2 = `SELECT LAST_INSERT_ID() AS idSurvey`;

    conexion.query(sql, [idUser,idFamily,clock,latitude,longitude], (error1, results1, fields1)=>{
        if(error1)
            res.send(error1);
        else{
            conexion.query(sql2, (error2, results2, fields2)=>{
                if(error2)
                    res.send(error2);
                else{
                    res.json(results2[0]);
                }
            })
        }
    })
}

module.exports.getSurveyById = (req,res) =>{
    const idSurvey = req.params.idSurvey;

    const query = `SELECT * FROM Survey WHERE idSurvey = ?`

    conexion.query(query,[idSurvey],(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)   
        }
    })


}

module.exports.countVolunteersSurveys = (req,res) =>{
    const sql1 = `SELECT COUNT(*) AS surveysCount FROM Survey`;
    const sql2 = `SELECT COUNT(*) AS volunteersCount FROM User_ WHERE userType = "voluntario"`;
    const sql3 = `SELECT COUNT(*) AS familiesCount FROM Family`;
    let finalResult = {surveysCount: 0, familiesCount:0, volunteersCount: 0,};

    conexion.query(sql1 ,(error,results,fields)=>{
        if(error)
            res.send(error)
        else{
            finalResult.surveysCount = results[0].surveysCount;
            conexion.query(sql2,(error,results,fields)=>{
                if(error)
                    res.send(error)
                else{
                    finalResult.volunteersCount = results[0].volunteersCount;
                    conexion.query(sql3,(error,results,fields)=>{
                        if(error)
                            res.send(error)
                        else{
                            finalResult.familiesCount = results[0].familiesCount;
                            res.json(finalResult);
                        }
                    })
                }
            })
        }
    })
    
    
    
    
}