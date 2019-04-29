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
	  
	var dataX = [2014, 2015, 2016, 2017, 2018];
  var dataY = [];
  var dataZ=[];
  dataY.push(parseFloat(input.avg2014));
  dataY.push(parseFloat(input.avg2015));
  dataY.push(parseFloat(input.avg2016));
  dataY.push(parseFloat(input.avg2017));
  dataY.push(parseFloat(input.avg2018));
  /*
  dataZ.push(parseFloat(Math.round(input.tavg2014* 100) / 100).toFixed(2));
  dataZ.push(parseFloat(Math.round(input.tavg2015* 100) / 100).toFixed(2));
  dataZ.push(parseFloat(Math.round(input.tavg2016* 100) / 100).toFixed(2));
  dataZ.push(parseFloat(Math.round(input.tavg2017* 100) / 100).toFixed(2));
  dataZ.push(parseFloat(Math.round(input.tavg2018* 100) / 100).toFixed(2));
  **/
  console.log(dataY);
 
  // $('#container').highcharts
  var chart = Highcharts.chart('container', {
    title: {
        text: 'Average Median List Price Per Sq Ft ($)(Past 5 years)',//标题
        x: -20 //center 设置标题的位置
    },
    subtitle: {
        text: 'Source: https://www.zillow.com/research/data/', //副标题
        x: -20 //副标题位置
    },
    credits:{//右下角的文本
        enabled: false,
        position: {//位置设置
            align: 'right',
            x: -10,
            y: -10
        },
        href: "http://www.highcharts.com",//点击文本时的链接
        style: {
            color:'blue'
        },
        text: "Highcharts Demo"//显示的内容
    },
    xAxis: {//横轴的数据
        categories: dataX
    },
    yAxis: {//纵轴的数据
        title: {
            text: 'Price Per Sq Ft ($/ft^2)'
        },
        plotLines: [{
            value: 0,
            width: 1,
        }]
    },
    tooltip: {//鼠标移到图形上时显示的提示框
        valueSuffix: '$/ft^2'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false,//去掉右边的 name
        borderWidth: 0
    },
    series: [{
        name: 'Average Median Price',
        data: dataY
    }]
});
  
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


app.controller('mapController', function($scope, $http) {
  $scope.getService = function(input){  
    var request = $http.get('/getLocate/'+input.RegionName );

      // var request = $http.get('/userPreference')
    request.success(function(response) {
      // success
      $scope.location = response;
      console.log("$scope.userInfo",$scope.location);
    });
    
    request.error(function(response) {
      // failed
      console.log('err');
    });
    };
});



app1 = angular.module('graphApp',[]);

app1.controller('crimeController', function($scope, $http) {
  $scope.width = 1000;
  $scope.height = 500;
  $scope.yAxis = "Price per sqr ft";
  $scope.xAxis = "Crime per 100000";
  // normal variables
  // Angular function
  $scope.getCrimePrice = function() {

    var request = $http({
      url:'/crime',
      method: "GET"
    })

    request.success(function(response) {
      console.log(response);
      console.log("get here !!!!!!!!")
      $scope.rawDataPoints = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });

  };
  $scope.getCrimePrice();

  $scope.max_crime = 1500;
  $scope.max_price = 1100;

});