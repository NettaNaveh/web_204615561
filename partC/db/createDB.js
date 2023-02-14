const path = require('path');
const csv = require('csvtojson');
const sql = require("./db");


//create tables
const CreateCustomersTable = (req,res)=> {
    const Q1 = "CREATE TABLE Customers (CustomerId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, firstName varchar(255) NOT NULL, lastName varchar(255) NOT NULL, email varchar(255) NOT NULL)";
    sql.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('created Customers table');
        res.send("Customers table created");
        return;
    })
};

const CreateOrdersTables = (req, res)=>{
    const Q2 = "CREATE TABLE Orders (customer_id int NOT NULL, vegetable varchar(255) NOT NULL, quantity decimal(10,0) NOT NULL, price decimal(10,0) NOT NULL)";
    sql.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Orders table"});
            return;
        }
        console.log('created Orders table');
        res.send("Orders table created");
        return;
    })
};

const CreateVegtablesTable = (req,res)=> {
    const Q3 = "CREATE TABLE Vegtables (VegtableId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, price integer NOT NULL, category varchar(255) NOT NULL, image nvarchar(100))";
    sql.query(Q3,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating vegtables table"});
            return;
        }
        console.log('created Vegtables table');
        res.send("Vegtables table created");
        return;
    })
};


//insert data
const InsertData_Customers = (req,res)=>{
    var Q4 = "INSERT INTO Customers SET ?";
    const csvFilePath= path.join(__dirname, "CustomersData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "firstName": element.firstName,
            "lastName": element.lastName,
            "email": element.email,
        };
        sql.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                return;
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read in items table");
};

const InsertData_Orders = (req,res)=>{
    var Q5 = "INSERT INTO Orders SET ?";
    const csvFilePath= path.join(__dirname, "OrdersData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewItemEntry = {
            "customer_id": element.customer_id,
            "vegetable": element.vegetable,
            "quantity": element.quantity,
            "price": element.price
        }
        //console.log("try insert item: " + NewItemEntry);
        sql.query(Q5, NewItemEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data into Orders table", err);
            }
            console.log("created row sucssefuly in Orders table " + mysqlres);
        });
    });
    })
};

const InsertData_Vegtables = (req,res)=>{
    var Q6 = "INSERT INTO Vegtables SET ?";
    const csvFilePath= path.join(__dirname, "VegtablesData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewItemEntry = {
            "name": element.name,
            "price": element.price,
            "category": element.category,
            "image": element.image
        }
        //console.log("try insert item: " + NewItemEntry);
        sql.query(Q6, NewItemEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data into Vegtables table", err);
            }
            console.log("created row sucssefuly in Vegtables table " + mysqlres);
        });
    });
    })
    res.send("data read in Vegtables table");
};

//select

const ShowCustomersTable = (req,res)=>{
    var Q7 = "SELECT * FROM Customers";
    sql.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Customers table ", err);
            res.send("error in showing Customers table ");
            return;
        }
        console.log("showing Customers table");
        res.send(mySQLres);
        return;
    })
};

const ShowOrdersTable = (req,res)=>{
    var Q8 = "SELECT * FROM Orders";
    sql.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Orders table ", err);
            res.send("error in showing Orders table ");
            return;
        }
        console.log("showing Orders table");
        res.send(mySQLres);
        return;
    })
};

const ShowVegtablesTable = (req,res)=>{
    var Q9 = "SELECT * FROM Vegtables";
    sql.query(Q9, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Vegtables table ", err);
            res.send("error in showing Vegtables table ");
            return;
        }
        console.log("showing Vegtables table");
        res.send(mySQLres);
        return;
    })
};

//drop
const DropCustomersTable = (req, res)=>{
    var Q10 = "DROP TABLE Customers";
    sql.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Customers table ", err);
            res.status(400).send({message: "error on dropping Customers table" + err});
            return;
        }
        console.log("Customers table drpped");
        res.send("Customers table drpped");
        return;
    })
};

const DropOrdersTable = (req, res)=>{
    var Q11 = "DROP TABLE Orders";
    sql.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Orders table ", err);
            res.status(400).send({message: "error on dropping Orders table" + err});
            return;
        }
        console.log("Orders table drpped");
        res.send("Orders table drpped");
        return;
    })
};

const DropVegtablesTable = (req, res)=>{
    var Q12 = "DROP TABLE Vegtables";
    sql.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Vegtables table ", err);
            res.status(400).send({message: "error on dropping Vegtables table" + err});
            return;
        }
        console.log("Vegtables table drpped");
        res.send("Vegtables table drpped");
        return;
    })
};

module.exports = {CreateCustomersTable, CreateOrdersTables, CreateVegtablesTable,
    InsertData_Customers, InsertData_Orders, InsertData_Vegtables,
    ShowCustomersTable,ShowOrdersTable, ShowVegtablesTable,
    DropCustomersTable,DropOrdersTable,DropVegtablesTable};