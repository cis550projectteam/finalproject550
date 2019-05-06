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
		alert("Welcome");
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard";
      }
	  else if(response.result === "fail"){
		  alert("Wrong usrname or password");
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
		alert("register succssfully!");
        window.location.href = "http://localhost:8081/";
      }
	  else if(response.result === "fail"){
		  alert("fail to register, please try again");
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
  var jsonStr = JSON.stringify(response);
  console.log(jsonStr);
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

app.controller('mapController', function($scope, $http) {
  var lat;
  var lng;
  var map;
  var service_type = "";
  console.log('service',service_type);
  $scope.getLocate = function(input){  

    var zipcode = document.getElementById("zipcode").value; 
    var request = $http.get('/getLocate/'+ zipcode);
    console.log("getting zip "+zipcode);
    // var request = $http.get('/userPreference')
    request.success(function(response) {
      // success
      lat = response[0].lat;
      lng = response[0].lng;
      console.log("user location success " + lat);

      console.log('service',service_type);

      function initMap() {
        var Latlng = {lat: lat , lng: lng}
        console.log(Latlng)
        var mapInstance =  new google.maps.LatLng(lat, lng)
        map = new google.maps.Map(document.getElementById('map'), {
          center: Latlng,
          zoom: 17
        });
        infowindow = new google.maps.InfoWindow()
        
        map.addListener('click', function(e) {
            infowindow.open(map);
        });

        var marker = new google.maps.Marker({
          position: Latlng,
          map: map,
        });
        
        service_type = document.getElementById("service_type").value;

        var request = {
            location: mapInstance,
            radius: '150',
            type: [service_type]
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

      }
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
          }
        }
      }
      function createMarker(place) {
        marks = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
          icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }
        });

        google.maps.event.addListener(marks,'click',function(e) {
            infowindow.setContent(marks.getTitle());
            infowindow.open(map,marks);
        });
      }
      initMap();

    });
    
      request.error(function(response) {
        // failed
        console.log('err');
      });
    };

      // var service_type = document.getElementById('service_type');
     

});



// app1 = angular.module('graphApp',[]);

// app1.controller('crimeController', function($scope, $http) {
//   $scope.width = 1000;
//   $scope.height = 500;
//   $scope.yAxis = "Price per sqr ft";
//   $scope.xAxis = "Crime per 100000";
//   // normal variables
//   // Angular function
//   $scope.getCrimePrice = function() {

//     var request = $http({
//       url:'/crime',
//       method: "GET"
//     })

//     request.success(function(response) {
//       console.log(response);
//       console.log("get here !!!!!!!!")
//       $scope.rawDataPoints = response;
//     });

//     request.error(function(err) {
//       console.log("error: ", err);
//     });

//   };
//   $scope.getCrimePrice();

//   $scope.max_crime = 1500;
//   $scope.max_price = 1100;

// });
app.controller('crimeController', function($scope, $http) {
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
     
      $scope.rawDataPoints = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });

  };
  $scope.getCrimePrice();
  $scope.parseInt = parseInt;

  $scope.max_crime = 1500;
  $scope.max_price = 1100;


  $scope.getState = function(){
    var selections = document.getElementById('selected_crime');
    var state = document.getElementById("selected_crime").value;
    console.log(selections);
    console.log(state);
    
    var request = $http.get('/visState/' + state); 

    // var request = $http.get('/userPreference')
  request.success(function(response) {
    // success
    $scope.selectedState = response;
     console.log("get here !!!!!!!!")
    // console.log("$scope.userInfo",$scope.userInfo);
  });
  
  request.error(function(response) {
    // failed
    console.log('err');
  });
};

});

app.controller('cityImageController', function($scope, $http) {    
  $scope.getImage = function(){
    var selections = document.getElementById('selected_state');
    var city = document.getElementById("inputCity").value;
    var state = selections.options[selections.selectedIndex].text;
    
    var request = $http.get('/cityImg/' + state + '/' + city); 

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

  //code from the microsoft tutorial
    // Cookie names for data being stored
API_KEY_COOKIE   = "14e08e1900ee442b967f50df0c1c875e"; //bing-search-api-key
CLIENT_ID_COOKIE = "shuairui"; //bing-search-client-id
// The Bing Image Search API endpoint
BING_ENDPOINT = "https://api.cognitive.microsoft.com/bing/v7.0/images/search";

try { //Try to use localStorage first
    localStorage.getItem;   

    window.retrieveValue = function (name) {
        return localStorage.getItem(name) || "";
    }
    window.storeValue = function(name, value) {
        localStorage.setItem(name, value);
    }
} catch (e) {
    //If the browser doesn't support localStorage, try a cookie
    window.retrieveValue = function (name) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var keyvalue = cookies[i].split("=");
            if (keyvalue[0].trim() === name) return keyvalue[1];
        }
        return "";
    }
    window.storeValue = function (name, value) {
        var expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        document.cookie = name + "=" + value.trim() + "; expires=" + expiry.toUTCString();
    }
}

// Get the stored API subscription key, or prompt if it's not found
$scope.getSubscriptionKey = function() {
  var key = retrieveValue(API_KEY_COOKIE);
  while (key.length !== 32) {
      key = prompt("Enter Bing Search API subscription key:", "").trim();
  }
  // always set the cookie in order to update the expiration date
  storeValue(API_KEY_COOKIE, key);
  return key;
}

  };
});