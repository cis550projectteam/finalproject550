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

router.get('/crimeVisualize', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'crimeVisualize.html'));
});

router.get('/googleMap', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'googleMap.html'));
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

  var query = "REPLACE INTO User (username,pword) VALUES (" + "'" + req.body.username + "'" + ", " + "'" + req.body.password + "')"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  //;
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

//Q2-a In the "Users" section, show all the registered users one below the other
router.get('/users', function(req, res) {
  // console.log("Here goes the body:");
  // console.log(req.body); //will show the print result in your terminal
  var query = "select username from User";
  // console.log("Here goes the query:");
  // console.log(query); 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query user name error',err);
    else {
      res.json(rows);
    }
  });
});

//Q2-b In the "Top Movies" section, display all the Genres as buttons
// when the user clicks on any genre, show top 10 movies in that genre 
// ordered first by highest "rating" and then highest "vote_count"
//Q2-b --> show movie genres
router.get('/movieGenres', function(req, res) {
  var query = "select distinct genre from Genres;";
  // console.log("Printing movie genres' query");
  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query movie genres error',err);
    else {
      res.json(rows);
    }
  });
});
//Q2-b --> send clicked genre in the url
router.get('/topMovies/:genreClicked', function(req, res) {

  var genreInput = req.params.genreClicked;    // if you have a custom parameter
  var query = "select title, rating, vote_count from Genres g JOIN Movies m on g.movie_id = m.id where genre = '" + genreInput + "' order by rating DESC,vote_count DESC limit 10;";
  // console.log("here comes the genreClicked query");
  // console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

//Q3 step1 --> get recommended movie genres
router.get('/recommendedMovieGenres/:inputMovieId', function(req, res) {
  var input = req.params.inputMovieId;
  // var query = "select title from Movies where id = " + input;
  var query = "select distinct genre from Genres g join Movies m on g.movie_id=m.id where m.id=" + input + ";";
  // console.log("here comes the recommended movies query");
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

// //Q3 step2 --> get recommended movie genres
// router.get('/recommendedMovies/:inputGenre', function(req, res) {
//   var input = req.params.inputGenre;
//   // var query = "select distinct genre from Genres g join Movies m on g.movie_id=m.id where m.id=" + input + ";";
//   var query = "select m.id, genre from Genres g join Movies m on g.movie_id = m.id where genre = " + input + ";";
//   // console.log("here comes the recommended movies query");
//   console.log("Q3 step2 query", query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }
//   });
// });

//Q4 --> show a “top voted” movie in each Genre category for that year.
router.get('/bestOfYear/:inputYear', function(req, res) {
  var input = req.params.inputYear
  var query1 = "select temp1.genre, title, max_vote_count\
  from (select * from (Genres g JOIN Movies m on g.movie_id = m.id) where release_year = " + input +") temp1 inner join\
  (select genre, max(vote_count) max_vote_count from (Genres g JOIN Movies m on g.movie_id = m.id) where release_year = "+ input + " group by genre) temp2\
  on temp1.genre=temp2.genre and temp1.vote_count = temp2.max_vote_count order by temp1.genre;"
  console.log("here comes the best of query");
  console.log(query1);
  connection.query(query1, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});


// Q6 --> external API
router.get('/queryPosters', function(req, res) {
  var query = "select imdb_id from Movies order by RAND() LIMIT 14"
  // console.log("here comes the question 6 router query", query)
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
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
