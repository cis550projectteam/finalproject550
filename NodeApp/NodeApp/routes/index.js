var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'cis550.cwmlqizm5y8w.us-east-2.rds.amazonaws.com',
  user: 'cis550m',
  password: '12345678',
  database: 'cis550m'
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.get('/googleMap', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'googleMap.html'));
});

router.get('/crimeVis', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'crimeVis.html'));
});

// router.get('/cityImage', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'cityImage.html'));
// });

router.get('/cityImage', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});
// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
const CryptoJS = require('crypto-js');  

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); 
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); 
let encryptedHexStr = CryptoJS.enc.Hex.parse(req.body.password);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  var query = "select * from User where username=" + "'"+ req.body.username + "'" + "and pword=" + "'"+decryptedStr.toString() + "'"; 
  //;
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
	  if (rows.length != 0) {
            res.json({
              result: 'success'
            });
      
        }
		else{
			res.json({
              result: 'fail'
            });
      
		}
	}
   
});

});

// register uses POST request
router.post('/register', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  const CryptoJS = require('crypto-js');  

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); 
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); 
let encryptedHexStr = CryptoJS.enc.Hex.parse(req.body.password);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    
  var query = "select * from User where username="+"'" + req.body.username + "'"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  //;
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
	  if (rows.length == 0) {
		  var query="INSERT INTO User (username,pword,state) VALUES (" + "'" + req.body.username + "'" + " ,"+ "'" + decryptedStr.toString() +"'" + " ," +"'"+ req.body.state +"')";
		  connection.query(query, function(err, re, fields) {
			  console.log("rows");
			  res.json({
				  result:'success'
			  });
			  
		  });
         
	  }
	  else if(rows.length !=0){
		  res.json({
				  result:'fail'
			  });
	  }
    }
  });
});

//get the surrounding services of a zipcode
router.get('/getService/:input', function(req, res) {
  console.log(req.params.input);
  var zipcode=parseInt(req.params.input);
  var query = "select * from service where postal_code >="+ zipcode+"-5 AND "+"postal_code <="+ zipcode+"+5 order by stars DESC limit 15";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query movie genres error',err);
    else {
      res.json(rows);
    }
  });
});


//get the latitude and longitude of a zipcode for Google map
router.get('/getLocate/:input', function(req, res) {
  console.log(req.params.input);
  var zipcode = parseInt(req.params.input);
  var query = "select lat, lng, RecentPrice from zipcode JOIN price on price.RegionName = zipcode.zip where zip ="+ zipcode;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query map zipcode error',err);
    else {
      res.json(rows);
    }
  });
});


// //display the filtered result
// router.get('/userPreference/:inputState', function(req, res) {
//   var input = req.params.inputState;
//   console.log("required state",input);
//   var query = "select RecentPrice,2014_avg,2015_avg,2016_avg,2017_avg,2018_avg from price inner join zipcode where state_name = '" + input + "' limit 10;";
//   // console.log("here comes the recommended movies query");
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }
//   });
// });
//cache
router.get('/userPreferencecache/:state/:city/:bor', function(req, res) {
  var stateInput = req.params.state;
  var cityInput = req.params.city;
  var borInput = req.params.bor
  if(borInput=='BUY'){
	  var query="select * from cache where city = '" + cityInput + "' and state = '"+ stateInput +"'";
  }
  else{
	  var query="select * from cacher where city = '" + cityInput + "' and state = '"+ stateInput +"'";
  }
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query error',err);
    else {
		var x;
		for (x in rows){
	      rows[x].RecentPTR=parseFloat(Math.round(rows[x].RecentPTR* 100) / 100).toFixed(2);
	      rows[x].RecentPrice=parseFloat(Math.round(rows[x].RecentPrice* 100) / 100).toFixed(2);
		  rows[x].avgstar=parseFloat(Math.round(rows[x].avgstar* 100) / 100).toFixed(2);
	      
		}
      res.json(rows);
    }
  });
});

router.get('/userPreference/:state/:city/:bor', function(req, res) {
  var stateInput = req.params.state;
  var cityInput = req.params.city;
  var borInput = req.params.bor
  console.log(stateInput);
  console.log(cityInput);
  console.log(borInput);
  if(borInput=='BUY'){
    // var query = "select p.RegionName as RegionName,avg(RecentPrice)as RecentPrice, avg(population) as population, avg(s.stars) as avgstar, avg(t.RecentPTR) as ptr,\
	  //   avg(p.avg2014) as avg2014, avg(p.avg2015) as avg2015,avg(p.avg2016) as avg2016, avg(p.avg2017) as avg2017,avg(p.avg2018) as avg2018,\
		// avg(t.avg2014) as tavg2014, avg(t.avg2015) as tavg2015,avg(t.avg2016) as tavg2016, avg(t.avg2017) as tavg2017,avg(t.avg2018) as tavg2018\
    //    	from price p inner join zipcode z on p.RegionName=z.zip inner join PTR t on t.RegionName=p.RegionName left outer join service s on p.RegionName=s.postal_code \
    // where z.state_name='"+stateInput+"' and p.City = '"+cityInput+"' group by p.RegionName order by p.RecentPrice DESC;";
    var query = "Select temp3.RegionName, RecentPrice, temp3.avg2014,temp3.avg2015,temp3.avg2016,temp3.avg2017,temp3.avg2018, population, avgstar, PTR.RecentPTR, temp3.state, temp3.city\
    from\
    (Select p.RegionName as RegionName, p.RecentPrice as RecentPrice, p.avg2014, p.avg2015, p.avg2016, p.avg2017, p.avg2018, population, avgstar, temp2.state, temp2.city\
    from\
    (Select postal_code, avgstar, population, z.state_name as state, z.city\
    from\
    zipcode z join\
    (Select postal_code,avg(stars) as avgstar\
    from service\
    group by postal_code) temp on temp.postal_code = z.zip \
    Where city = '" + cityInput + "' and state_name = '"+ stateInput +"'\
    ) temp2 join price p on temp2.postal_code=p.RegionName\
    ) temp3 join PTR on temp3.RegionName=PTR.RegionName\
    Order by RecentPrice DESC\
    "
  }
  else{
  //   var query = "select r.RegionName as RegionName,avg(RecentPrice) as RecentPrice, avg(population) as population, avg(s.stars) as avgstar, avg(t.RecentPTR) as ptr,\
	// avg(r.avg2014) as avg2014,avg(r.avg2015) as avg2015, avg(r.avg2016) as avg2016,avg(r.avg2017) as avg2017, avg(r.avg2018) as avg2018 ,\
	// avg(t.avg2014) as tavg2014,avg(t.avg2015) as tavg2015, avg(t.avg2016) as tavg2016,avg(t.avg2017) as tavg2017, avg(t.avg2018) as tavg2018 \
	// from rent r inner join zipcode z on r.RegionName=z.zip inner join PTR t on t.RegionName=r.RegionName left outer join service s on r.RegionName=s.postal_code \
  // where z.state_name='"+stateInput+"' and r.City = '"+cityInput+"' group by r.RegionName order by r.RecentPrice DESC;";
  var query = "Select temp3.RegionName, RecentPrice, temp3.avg2014,temp3.avg2015,temp3.avg2016,temp3.avg2017,temp3.avg2018, population, avgstar, PTR.RecentPTR, temp3.state, temp3.city\
  from\
  (Select r.RegionName as RegionName, r.RecentPrice as RecentPrice, r.avg2014, r.avg2015, r.avg2016, r.avg2017, r.avg2018, population, avgstar, temp2.state, temp2.city\
  from\
  (Select postal_code, avgstar, population, z.state_name as state, z.city\
  from\
  zipcode z join\
  (Select postal_code,avg(stars) as avgstar\
  from service\
  group by postal_code) temp on temp.postal_code = z.zip \
  Where city = '" + cityInput + "' and state_name = '"+ stateInput +"'\
  ) temp2 join rent r on temp2.postal_code=r.RegionName\
  ) temp3 join PTR on temp3.RegionName=PTR.RegionName\
  Order by RecentPrice DESC\
  "
  }
 
 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query error',err);
    else {
		var x;
		for (x in rows){
	      rows[x].RecentPTR=parseFloat(Math.round(rows[x].RecentPTR* 100) / 100).toFixed(2);
	      rows[x].RecentPrice=parseFloat(Math.round(rows[x].RecentPrice* 100) / 100).toFixed(2);
		  rows[x].avgstar=parseFloat(Math.round(rows[x].avgstar* 100) / 100).toFixed(2);
	      
		}
      res.json(rows);
    }
  });
});

// // image search router
// router.get('/userPreference/:state/:city', function(req, res) {
//   var stateInput = req.params.state;
//   var cityInput = req.params.city;

// });

// router.get('/crime', function(req, res) {
//   var query = 'SELECT * from (SELECT crime_rate_per_100000 as crime, price, x.CountyName, x.State FROM crime_county, (SELECT CountyName, State, AVG(RecentPrice) as price FROM price group by CountyName) x WHERE crime_county.county = x.CountyName and crime_county.state = x.State ORDER BY price DESC LIMIT 1,100000) m order by crime desc limit 1, 100000';
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       console.log(rows);
//       res.json(rows);
//       console.log(res);
//     }
//   });
// })
router.get('/crime', function(req, res) {
  var query = 'SELECT * from (SELECT crime_rate_per_100000 as crime, price, x.CountyName, x.State FROM crime_county, (SELECT CountyName, State, AVG(RecentPrice) as price FROM price group by CountyName) x WHERE crime_county.county = x.CountyName and crime_county.state = x.State ORDER BY price DESC LIMIT 1,100000) m order by crime desc limit 1, 100000';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
      console.log(res);
    }
  });
});


router.get('/visState/:state', function(req, res) {
  var stateInput = req.params.state;
  console.log(stateInput);
  console.log("I AM HERE!")
  var query = "SELECT * from (SELECT crime_rate_per_100000 as crime, price, x.CountyName, x.State FROM crime_county, (SELECT CountyName, State, AVG(RecentPrice) as price FROM price group by CountyName) x WHERE crime_county.county = x.CountyName and crime_county.state = x.State ORDER BY price DESC LIMIT 1,100000) m where State ='"+stateInput+"' order by crime desc limit 1, 100000";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
      console.log(res);
    }
  });
});







// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
