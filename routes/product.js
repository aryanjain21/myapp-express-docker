const express = require("express");
const db = require('../db')
const utils = require('../utils')

const router = express.Router();

router.get("/", (request, response)=>{
    const connection = db.connect();
    const statement ='select * from product'
    connection.query(statement, (error, data)=>{
        connection.end();
        if(error==null)
        {
            response.send(JSON.stringify(data));
        }
        else
        {
            response.send(JSON.stringify(error));
        }
        
    })
})

router.post("/", (request, response)=>{
    const {title, descrption, price} = request.body;
    const connection = db.connect();
    const statement =`insert into product(title, descrption, price) values ('${title}', '${descrption}', ${price})`
    connection.query(statement, (error, data)=>{
        connection.end();
        response.send(utils.createResult(error, data))
    })
})

module.exports = router;