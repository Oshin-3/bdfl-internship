var express = require("express");
var app = express();
const fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "hiring-tracker.csgmjsgvcgjf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "friends1137"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


/*Authenticate login page*/
app.post("/api/authenticate", (req, res, next) => {

  var creds = req.body;
  var sql_cred = `SELECT * FROM hiring_tracker.credentials WHERE credentials.username = '${creds.username}' && credentials.password = '${creds.password}'`;
  con.query(sql_cred, function( err, result){
    if (err) {
      throw err;

    }
    else if (result.length !== 0) {
      res.json({"status": "success"});
    }
    else {
      res.json({"status": "failure"});
    }
  });

});

/*Add request to the table*/
app.post("/api/addRequest", (req, res, next) => {

  var newReq = req.body;
  var sql_insert = `INSERT INTO hiring_tracker.hiring_requests
                    (projectname, projectmanager, resources, designation, status, minYear, minMonth, maxYear, maxMonth, type, skills, durationYear, durationMonth, probability, salaryMin, salaryMax, poc, hiringStatus, hrComments, actions)
                    VALUES
                    ('${newReq.projectname}','${newReq.projectmanager}','${newReq.resources}','${newReq.designation}','${newReq.status}','${newReq.minYear}','${newReq.minMonth}','${newReq.maxYear}','${newReq.maxMonth}','${newReq.type}','${newReq.skills}','${newReq.durationYear}','${newReq.durationMonth}','${newReq.probability}','${newReq.salaryMin}','${newReq.salaryMax}','${newReq.poc}','${newReq.hiringStatus}','${newReq.hrComments}','${newReq.actions}');`;

  con.query(sql_insert, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {
      console.log("Result: "+ result);
      res.json({"status": "success"});
    }
  });
});

/*get the requested data*/
app.get("/api/getRequestDetails", (req, res, next) => {

  // let rawdata = fs.readFileSync('../database/data.json');
  // let data = JSON.parse(rawdata);
    // res.json(data);
  var sql_get = `SELECT * FROM hiring_tracker.hiring_requests`;

  con.query(sql_get, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {

      res.json({result});
    }
  });

});

/*update the data in table*/
app.put("/api/updateRequest", (req, res, next) => {

  // var updateObj = req.body;
  //
  // console.log(updateObj);
  //
  // let rawdata = fs.readFileSync('../database/data.json');
  // let data = JSON.parse(rawdata);
  //
  // var oldObjIdx;
  // var oldObj = data.find(function(obj, ind){
  //   if( updateObj.requestId == obj.requestId ) {
  //     oldObjIdx = ind;
  //     return true;
  //   }
  // });
  // if( oldObj !== undefined ) {
  //   data[oldObjIdx] = updateObj;
  //   let newdata = JSON.stringify(data);
  //   fs.writeFileSync('../database/data.json', newdata);
  //   res.json({"status": "success"});
  // } else {
  //   res.json({"status": "failure"});
  // }
  var newReq = req.body;
  var sql_update = `UPDATE hiring_tracker.hiring_requests
                    SET
                    hiring_requests.projectname = '${newReq.projectname}', hiring_requests.projectmanager = '${newReq.projectmanager}', hiring_requests.resources = '${newReq.resources}', hiring_requests.designation = '${newReq.designation}', hiring_requests.status = '${newReq.status}', hiring_requests.minYear = '${newReq.minYear}', hiring_requests.minMonth = '${newReq.minMonth}', hiring_requests.maxYear = '${newReq.maxYear}', hiring_requests.maxMonth = '${newReq.maxMonth}', hiring_requests.type = '${newReq.type}', hiring_requests.skills = '${newReq.skills}', hiring_requests.durationYear = '${newReq.durationYear}', hiring_requests.durationMonth = '${newReq.durationMonth}', hiring_requests.probability = '${newReq.probability}', hiring_requests.salaryMin = '${newReq.salaryMin}', hiring_requests.salaryMax = '${newReq.salaryMax}', hiring_requests.poc = '${newReq.poc}', hiring_requests.hiringStatus = '${newReq.hiringStatus}', hiring_requests.hrComments = '${newReq.hrComments}'
                    WHERE hiring_requests.requestId = '${newReq.requestId}'`;

  con.query(sql_update, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {

      res.json({"status": "success"});
    }
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
