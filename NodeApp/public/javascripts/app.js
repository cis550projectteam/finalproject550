var app = angular.module('angularjsNodejsTutorial', []);

app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })
    
    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard";
      }
    });
    
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});

app.controller('registerController', function($scope, $http) {
  $scope.verifyRegister = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/register',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password,
		'state':  $scope.state
      }
    })
    
    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/";
      }
    });
    
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});

//Q2-a controller 
app.controller('userController', function($scope, $http) {

  // Angular function
  var request = $http.get('/users')
    request.success(function(response) {
      // success
      $scope.userInfo = response;
      // console.log("$scope.userInfo",$scope.userInfo);
    });
    
    request.error(function(response) {
      // failed
      console.log('err');
    });

});

//Q2-b controller 
app.controller('moviesController', function($scope, $http) {
  // get the genres
  var request = $http.get('/movieGenres')
    request.success(function(response) {
      // success
      console.log(response);
      $scope.movieGenres = response;
    });
    
    request.error(function(response) {
      // failed
      console.log('err');
    });

    // get top 10 movies
    $scope.getTopMovies = function(mGenre){
      var request = $http.get('/topMovies/' + mGenre); 

    request.success(function(response){
        $scope.top10movies = response;});
    request.error(function(response) {
          // failed
      console.log('err');
      });
    };
});

//Q3 Controller
app.controller('recommendationsController', function($scope, $http){
  // console.log("here comes the recommendations controller");
  // function
  $scope.getRecommendedMovies = function(){
    var movieID = document.getElementById("inputMovieID").value;
    var request = $http.get('/recommendedMovieGenres/' + movieID); 

  request.success(function(response){
      console.log(response);
      $scope.thisMovieGenres = response;

      // var returnRecommend = []
      // if (response.length <= 10){
      //   for (var k = 0; k < response.length; k++){
      //     var thisGenre = response[k].genre;
      //     var request1 = $http.get('/recommendedMovies/' + thisGenre);
      //     request1.success(function(response) {
      //       console.log(response)
      //         returnRecommend.push(response);     
      //     });
      //     request1.error(function(response) {
      //       console.log('err');
      //     });
      //   }
      //   var thisGenre = response[0].genre;
      //   for (var l = 0; l < 10 - response.length;l++){
      //     var request2 = $http.get('/recommendedMovies/' + thisGenre);
      //     request2.success(function(response) {
      //       console.log(response)
      //         returnRecommend.push(response);     
      //     });
      //     request2.error(function(response) {
      //       console.log('err');
      //     });
      //   }
      // }
      // else{
      //   for (var k = 0; k < 10; k++){
      //     var thisGenre = response[k].genre;
      //     var request1 = $http.get('/recommendedMovies/' + thisGenre);
      //     request1.success(function(response) {
      //       console.log(response)
      //         returnRecommend.push(response);     
      //     });
      //     request1.error(function(response) {
      //       console.log('err');
      //     });
      //   }
      // }
      // console.log(returnRecommend)
      // $scope.returnRecommendation = returnRecommend

      // var request1 = $http.get('/recommendedMovies/' + movieID); 
      //   // request success
      //   request1.success(function(response){
      //   // local_randomMovies.push(response);     
      //   });
      //   // request failure
      //   request1.error(function(response) {
      //     console.log('err');
      //   });
    });
  request.error(function(response) {
        // failed
    console.log('err');
    });
  };
});

//Q4 Controller
app.controller('bestofController', function($scope, $http){
  console.log("here comes the bestof controller");
  // function
  $scope.getBestOf = function(){
    console.log("hello");
    // console.log($year);
    var selections = document.getElementById('selected_year');
    var year = selections.options[selections.selectedIndex].text;
    console.log(year);
    // var inputYear = document.getElementById("selectYear").value;
    // var inputYear = angular.element('[ng-model="selectedName"]');
    // console.log("inputYear in controller",inputYear);
    var request = $http.get('/bestOfYear/' + year);  

    request.success(function(response){
        $scope.bestOfYearMovies = response;});
    request.error(function(response) {
        // failed
      console.log('err');
    });
  };
});

//Q6 Controller
app.controller('postersController', function($scope, $http){
  
  // console.log("here comes the posters controller");
  // request for getting the random imdb_id
  // console.log("request for getting the random imdb_id")
  var request = $http.get('/queryPosters')
    request.success(function(response) {
      // success
      // console.log(response);
      $scope.imdb_randomid = response;
      var local_randomMovies = []; 
      for (var k = 0; k < 14; k++)
      {
        var id = $scope.imdb_randomid[k].imdb_id;
        var request1 = $http.get('http://www.omdbapi.com/?i=' + id +'&apikey=ad85d6d4');
       // request success
       request1.success(function(response){
        local_randomMovies.push(response);     
        });
       // request failure
       request1.error(function(response) {
         console.log('err');
       });
      }
      $scope.randomMovies = local_randomMovies;
    });
    request.error(function(response) {
      // failed
      console.log('err');
  });

  
});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
