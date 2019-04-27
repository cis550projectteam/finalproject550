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
      if (response.result == "success") {
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

//dashboard controller 
app.controller('userController', function($scope, $http) {    
    $scope.getInfo = function(){
      var selections = document.getElementById('selected_state');
      var city = document.getElementById("inputCity").value;
      var state = selections.options[selections.selectedIndex].text;
      var bor = document.getElementById("buy_or_rent").value;
      
      var request = $http.get('/userPreference/' + state + '/' + city + '/' + bor); 

      // var request = $http.get('/userPreference')
    request.success(function(response) {
      // success
      $scope.statesInfo = response;
      // console.log("$scope.userInfo",$scope.userInfo);
    });
    
    request.error(function(response) {
      // failed
      console.log('err');
    });
    };
	
	$scope.getService = function(input){
    
    var request = $http.get('/getService/'+input.RegionName );

      // var request = $http.get('/userPreference')
    request.success(function(response) {
      // success
      $scope.service = response;
      console.log("$scope.userInfo",$scope.userInfo);
    });
    
    request.error(function(response) {
      // failed
      console.log('err');
    });
    };
	
    
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