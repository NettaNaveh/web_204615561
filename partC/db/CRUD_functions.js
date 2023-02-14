const sql = require("./db");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const url = require('url');



// Customers
// const FindCustomer = (req, res) => {
//     // check if body is empty
//     if (!req.body) {
//         res.status(400).send({
//             message: "content can not be empty"
//         });
//         return;
//     }
//     //if body not empty - create new customer
//     const Customer = req.query.FindName;
//     console.log(Customer);
//     //insert query
//     sql.query("SELECT * FROM customers where firstName like ?", Customer + "%", (err, results, fields) => {
//         if (err) {
//             console.log("error is: " + err);
//             res.status(400).send({
//                 message: "error in finding customer " + err
//             });
//             return;
//         }
//         // if not query error
//         console.log("new customer created ", createNewCustomer);
//         res.send(results)
//         //res.send({message: "new customer created successfully"});
//         return;
//     });
// };
// module.exports = {
//     FindCustomer
// };


const manageAndConfirmOrder= (req,res)=>{

    var cart = JSON.parse(req.query.cart);
    var fName= req.query.fName;
    var lName= req.query.lName;
    var email= req.query.email;
    var insertID=-1;
    const newCustomer = {
            "firstName": fName,
            "lastName": lName,
            "email": email,
    };
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, mysqlres1) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({
                message: "error in creating customer: " + err
            });
            return;
        }
        insertID=mysqlres1.insertId;
        console.log("created customer: ", {id: mysqlres1.insertId, ...newCustomer});
        cart.forEach(e=>{
            const newveggie = {
                "customer_id":mysqlres1.insertId,
                "vegetable": e.name,
                "quantity": e.qty,
                "price": e.price,
            };
            sql.query("INSERT INTO orders SET ?", newveggie, (err, mysqlres2) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).send({
                    message: "error in creating customer: " + err
                });
                return;
            }
            });
        });
    });
    res.render('order_confirmation',{
        V1: fName +' '+ lName,
        V2:"| Your order has been received by the system, we are preparing it for you, You can pick it up from the farm during our business hours, Payment must be made upon collection, Please note, cash payment only!"
    });
}
const getAllVegetables = (req, res, next)=> {
    sql.query("SELECT * FROM Vegtables", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({
                message: "error in getting all customers: " + err
            });
            return;
        }
        console.log("got all Vegetables...");
        var gv=[];
        var lettuce=[];
        var herb=[];
        var mushrooms=[];

        mysqlres.forEach(e=>{
            if(e.category==="Garden vegetables")
            {
                gv.push(e);
            }
            else if(e.category==="Lettuce")
            {
                lettuce.push(e);
            }
             else if(e.category==="Herbs")
            {
                herb.push(e);
            }
            else if(e.category==="Mushrooms")
            {
                 mushrooms.push(e);
            }
        });

        res.render('vegetables', {
            gv: gv,
            lettuce:lettuce,
            herb:herb,
            mushrooms:mushrooms
        });

        return;
    });
};


const getAllCustomers = (req, res)=> {
    sql.query("SELECT * FROM customers", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({
                message: "error in getting all customers: " + err
            });
            return;
        }
        console.log("got all customers...");
        //res.send(mysqlres);
        res.render('order_confirmation', {
            V1: 'SQL resault:',
            V2:'',
            V3:mysqlres
        })
        return;
    });
};


const createNewCustomer = function(req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newCustomer = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,

    };
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({
                message: "error in creating customer: " + err
            });
            return;
        }
        console.log("created customer: ", {
            id: mysqlres.insertId,
            ...newCustomer
        });
        res.send({
            message: "new customer created successfully"
        });
        return;
    });
     res.sendFile(path.join(__dirname,"../html/landing_page.html"));
};





module.exports = {
    getAllCustomers,createNewCustomer, getAllVegetables,manageAndConfirmOrder
};