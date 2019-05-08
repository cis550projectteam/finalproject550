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
    var las_buy=[{"RegionName":"89135","RecentPrice":"245.39","avg2014":174.494,"avg2015":183.736,"avg2016":197.759,"avg2017":222.824,"avg2018":242.15,"population":24144,"avgstar":"3.86","RecentPTR":"17.68","state":"Nevada","city":"Las Vegas"},{"RegionName":"89134","RecentPrice":"212.20","avg2014":150.688,"avg2015":157.813,"avg2016":171.292,"avg2017":184.895,"avg2018":206.145,"population":24040,"avgstar":"4.02","RecentPTR":"17.36","state":"Nevada","city":"Las Vegas"},{"RegionName":"89144","RecentPrice":"209.29","avg2014":148.644,"avg2015":156.995,"avg2016":164.134,"avg2017":178.986,"avg2018":199.152,"population":18714,"avgstar":"3.81","RecentPTR":"17.26","state":"Nevada","city":"Las Vegas"},{"RegionName":"89123","RecentPrice":"183.51","avg2014":121.339,"avg2015":132.932,"avg2016":140.332,"avg2017":155.28,"avg2018":176.991,"population":56300,"avgstar":"3.72","RecentPTR":"16.86","state":"Nevada","city":"Las Vegas"},{"RegionName":"89113","RecentPrice":"179.51","avg2014":123.441,"avg2015":133.042,"avg2016":141.682,"avg2017":152.995,"avg2018":175.668,"population":23800,"avgstar":"3.81","RecentPTR":"16.81","state":"Nevada","city":"Las Vegas"},{"RegionName":"89117","RecentPrice":"176.12","avg2014":124.697,"avg2015":134.102,"avg2016":145.076,"avg2017":156.275,"avg2018":170.458,"population":55416,"avgstar":"3.84","RecentPTR":"17.04","state":"Nevada","city":"Las Vegas"},{"RegionName":"89103","RecentPrice":"175.43","avg2014":101.724,"avg2015":121.665,"avg2016":133.372,"avg2017":150.424,"avg2018":167.447,"population":50519,"avgstar":"3.67","RecentPTR":"12.51","state":"Nevada","city":"Las Vegas"},{"RegionName":"89102","RecentPrice":"170.95","avg2014":100.56,"avg2015":111.353,"avg2016":127.888,"avg2017":149.276,"avg2018":167.639,"population":35759,"avgstar":"3.60","RecentPTR":"13.97","state":"Nevada","city":"Las Vegas"},{"RegionName":"89183","RecentPrice":"169.99","avg2014":110.216,"avg2015":119.596,"avg2016":128.847,"avg2017":144.95,"avg2018":166.333,"population":36005,"avgstar":"3.64","RecentPTR":"16.48","state":"Nevada","city":"Las Vegas"},{"RegionName":"89141","RecentPrice":"169.59","avg2014":123.089,"avg2015":130.088,"avg2016":138.258,"avg2017":151.226,"avg2018":165.604,"population":25150,"avgstar":"3.99","RecentPTR":"17.32","state":"Nevada","city":"Las Vegas"},{"RegionName":"89147","RecentPrice":"167.23","avg2014":113.399,"avg2015":122.729,"avg2016":132.09,"avg2017":143.81,"avg2018":167.115,"population":49778,"avgstar":"3.94","RecentPTR":"16.62","state":"Nevada","city":"Las Vegas"},{"RegionName":"89148","RecentPrice":"166.20","avg2014":118.471,"avg2015":128.533,"avg2016":134.683,"avg2017":148.383,"avg2018":164.3,"population":39712,"avgstar":"3.85","RecentPTR":"17.30","state":"Nevada","city":"Las Vegas"},{"RegionName":"89118","RecentPrice":"165.04","avg2014":102.279,"avg2015":116.474,"avg2016":132.615,"avg2017":142.936,"avg2018":160.871,"population":19318,"avgstar":"3.92","RecentPTR":"14.57","state":"Nevada","city":"Las Vegas"},{"RegionName":"89149","RecentPrice":"164.93","avg2014":108.566,"avg2015":119.672,"avg2016":129.678,"avg2017":141.948,"avg2018":161.761,"population":31143,"avgstar":"3.60","RecentPTR":"16.55","state":"Nevada","city":"Las Vegas"},{"RegionName":"89139","RecentPrice":"164.42","avg2014":113.644,"avg2015":118.942,"avg2016":126.498,"avg2017":137.856,"avg2018":159.533,"population":30477,"avgstar":"3.79","RecentPTR":"17.12","state":"Nevada","city":"Las Vegas"},{"RegionName":"89129","RecentPrice":"163.19","avg2014":108.573,"avg2015":115.218,"avg2016":122.979,"avg2017":138.329,"avg2018":158.846,"population":51252,"avgstar":"3.77","RecentPTR":"16.62","state":"Nevada","city":"Las Vegas"},{"RegionName":"89128","RecentPrice":"162.89","avg2014":100.573,"avg2015":110.845,"avg2016":122.842,"avg2017":138.562,"avg2018":159.023,"population":35669,"avgstar":"3.66","RecentPTR":"16.03","state":"Nevada","city":"Las Vegas"},{"RegionName":"89178","RecentPrice":"162.58","avg2014":113.117,"avg2015":120.744,"avg2016":128.462,"avg2017":138.998,"avg2018":158.265,"population":27588,"avgstar":"4.11","RecentPTR":"17.17","state":"Nevada","city":"Las Vegas"},{"RegionName":"89146","RecentPrice":"162.17","avg2014":101.696,"avg2015":112.104,"avg2016":121.362,"avg2017":137.162,"avg2018":157.88,"population":19071,"avgstar":"3.81","RecentPTR":"15.51","state":"Nevada","city":"Las Vegas"},{"RegionName":"89130","RecentPrice":"161.65","avg2014":104.962,"avg2015":112.948,"avg2016":123.718,"avg2017":140.101,"avg2018":158.447,"population":33015,"avgstar":"3.69","RecentPTR":"16.52","state":"Nevada","city":"Las Vegas"},{"RegionName":"89131","RecentPrice":"160.32","avg2014":111.706,"avg2015":120.329,"avg2016":126.918,"avg2017":140.977,"avg2018":157.178,"population":43072,"avgstar":"3.69","RecentPTR":"17.08","state":"Nevada","city":"Las Vegas"},{"RegionName":"89145","RecentPrice":"160.30","avg2014":104.13,"avg2015":116.737,"avg2016":126.603,"avg2017":145.048,"avg2018":164.554,"population":23186,"avgstar":"3.76","RecentPTR":"16.04","state":"Nevada","city":"Las Vegas"},{"RegionName":"89104","RecentPrice":"159.22","avg2014":82.2761,"avg2015":92.2869,"avg2016":104.929,"avg2017":124.89,"avg2018":152.351,"population":39909,"avgstar":"3.63","RecentPTR":"13.35","state":"Nevada","city":"Las Vegas"},{"RegionName":"89166","RecentPrice":"158.52","avg2014":110.103,"avg2015":115.38,"avg2016":123.464,"avg2017":136.149,"avg2018":151.167,"population":13209,"avgstar":"4.17","RecentPTR":"16.52","state":"Nevada","city":"Las Vegas"},{"RegionName":"89108","RecentPrice":"156.25","avg2014":86.2534,"avg2015":96.2724,"avg2016":106.677,"avg2017":125.287,"avg2018":150.81,"population":70123,"avgstar":"3.40","RecentPTR":"15.26","state":"Nevada","city":"Las Vegas"},{"RegionName":"89107","RecentPrice":"153.23","avg2014":80.8044,"avg2015":91.7297,"avg2016":100.677,"avg2017":124.422,"avg2018":146.251,"population":36282,"avgstar":"3.44","RecentPTR":"12.71","state":"Nevada","city":"Las Vegas"},{"RegionName":"89122","RecentPrice":"152.74","avg2014":91.7538,"avg2015":100.584,"avg2016":110.087,"avg2017":123.777,"avg2018":145.696,"population":45720,"avgstar":"3.30","RecentPTR":"14.84","state":"Nevada","city":"Las Vegas"},{"RegionName":"89142","RecentPrice":"150.70","avg2014":86.4911,"avg2015":98.3599,"avg2016":107.569,"avg2017":123.968,"avg2018":143.527,"population":33731,"avgstar":"3.75","RecentPTR":"15.19","state":"Nevada","city":"Las Vegas"},{"RegionName":"89120","RecentPrice":"148.51","avg2014":91.8526,"avg2015":104.197,"avg2016":113.904,"avg2017":129.448,"avg2018":149.333,"population":23311,"avgstar":"3.84","RecentPTR":"16.12","state":"Nevada","city":"Las Vegas"},{"RegionName":"89110","RecentPrice":"147.00","avg2014":80.3104,"avg2015":92.8428,"avg2016":104.441,"avg2017":116.514,"avg2018":140.648,"population":70994,"avgstar":"3.49","RecentPTR":"14.99","state":"Nevada","city":"Las Vegas"},{"RegionName":"89156","RecentPrice":"145.60","avg2014":85.9326,"avg2015":94.1704,"avg2016":103.632,"avg2017":119.417,"avg2018":139.739,"population":27794,"avgstar":"3.00","RecentPTR":"15.16","state":"Nevada","city":"Las Vegas"},{"RegionName":"89121","RecentPrice":"141.71","avg2014":78.6283,"avg2015":88.3856,"avg2016":99.0427,"avg2017":113.897,"avg2018":134.03,"population":64096,"avgstar":"3.46","RecentPTR":"14.38","state":"Nevada","city":"Las Vegas"},{"RegionName":"89169","RecentPrice":"138.00","avg2014":96.4327,"avg2015":101.418,"avg2016":110.316,"avg2017":120.919,"avg2018":141.545,"population":23304,"avgstar":"3.33","RecentPTR":"11.32","state":"Nevada","city":"Las Vegas"}];
	var las_rent=[{"RegionName":"89169","RecentPrice":"1.72","avg2014":1.60832,"avg2015":1.54686,"avg2016":1.63355,"avg2017":1.61769,"avg2018":1.63519,"population":23304,"avgstar":"3.33","RecentPTR":"11.32","state":"Nevada","city":"Las Vegas"},{"RegionName":"89109","RecentPrice":"1.54","avg2014":1.50975,"avg2015":1.49842,"avg2016":1.54364,"avg2017":1.51349,"avg2018":1.56825,"population":7770,"avgstar":"3.63","RecentPTR":"12.48","state":"Nevada","city":"Las Vegas"},{"RegionName":"89103","RecentPrice":"1.21","avg2014":0.850376,"avg2015":0.923348,"avg2016":0.958887,"avg2017":1.08208,"avg2018":1.16478,"population":50519,"avgstar":"3.67","RecentPTR":"12.51","state":"Nevada","city":"Las Vegas"},{"RegionName":"89113","RecentPrice":"1.07","avg2014":0.796763,"avg2015":0.80454,"avg2016":0.842564,"avg2017":0.897519,"avg2018":1.00671,"population":23800,"avgstar":"3.81","RecentPTR":"16.81","state":"Nevada","city":"Las Vegas"},{"RegionName":"89123","RecentPrice":"1.06","avg2014":0.821501,"avg2015":0.854699,"avg2016":0.885355,"avg2017":0.956848,"avg2018":1.02497,"population":56300,"avgstar":"3.72","RecentPTR":"16.86","state":"Nevada","city":"Las Vegas"},{"RegionName":"89134","RecentPrice":"1.04","avg2014":0.811962,"avg2015":0.853157,"avg2016":0.896758,"avg2017":0.946997,"avg2018":1.00615,"population":24040,"avgstar":"4.02","RecentPTR":"17.36","state":"Nevada","city":"Las Vegas"},{"RegionName":"89144","RecentPrice":"1.04","avg2014":0.847595,"avg2015":0.879662,"avg2016":0.904888,"avg2017":0.954435,"avg2018":1.02961,"population":18714,"avgstar":"3.81","RecentPTR":"17.26","state":"Nevada","city":"Las Vegas"},{"RegionName":"89118","RecentPrice":"1.04","avg2014":0.784263,"avg2015":0.825016,"avg2016":0.875975,"avg2017":0.977565,"avg2018":0.999161,"population":19318,"avgstar":"3.92","RecentPTR":"14.57","state":"Nevada","city":"Las Vegas"},{"RegionName":"89135","RecentPrice":"1.00","avg2014":0.838609,"avg2015":0.870777,"avg2016":0.89931,"avg2017":0.933965,"avg2018":0.989681,"population":24144,"avgstar":"3.86","RecentPTR":"17.68","state":"Nevada","city":"Las Vegas"},{"RegionName":"89117","RecentPrice":"0.99","avg2014":0.748937,"avg2015":0.785706,"avg2016":0.820719,"avg2017":0.873504,"avg2018":0.956996,"population":55416,"avgstar":"3.84","RecentPTR":"17.04","state":"Nevada","city":"Las Vegas"},{"RegionName":"89145","RecentPrice":"0.99","avg2014":0.763714,"avg2015":0.792256,"avg2016":0.82549,"avg2017":0.908831,"avg2018":0.940752,"population":23186,"avgstar":"3.76","RecentPTR":"16.04","state":"Nevada","city":"Las Vegas"},{"RegionName":"89107","RecentPrice":"0.98","avg2014":0.699454,"avg2015":0.723934,"avg2016":0.769248,"avg2017":0.831934,"avg2018":0.94213,"population":36282,"avgstar":"3.44","RecentPTR":"12.71","state":"Nevada","city":"Las Vegas"},{"RegionName":"89138","RecentPrice":"0.97","avg2014":0.798959,"avg2015":0.833293,"avg2016":0.851273,"avg2017":0.911771,"avg2018":0.964611,"population":12118,"avgstar":"4.65","RecentPTR":"17.63","state":"Nevada","city":"Las Vegas"},{"RegionName":"89128","RecentPrice":"0.97","avg2014":0.747451,"avg2015":0.773723,"avg2016":0.835211,"avg2017":0.908851,"avg2018":0.937898,"population":35669,"avgstar":"3.66","RecentPTR":"16.03","state":"Nevada","city":"Las Vegas"},{"RegionName":"89120","RecentPrice":"0.96","avg2014":0.841303,"avg2015":0.841303,"avg2016":0.751687,"avg2017":0.842325,"avg2018":0.929896,"population":23311,"avgstar":"3.84","RecentPTR":"16.12","state":"Nevada","city":"Las Vegas"},{"RegionName":"89183","RecentPrice":"0.95","avg2014":0.741621,"avg2015":0.762517,"avg2016":0.809756,"avg2017":0.852581,"avg2018":0.926935,"population":36005,"avgstar":"3.64","RecentPTR":"16.48","state":"Nevada","city":"Las Vegas"},{"RegionName":"89147","RecentPrice":"0.95","avg2014":0.749459,"avg2015":0.777781,"avg2016":0.811362,"avg2017":0.861249,"avg2018":0.92206,"population":49778,"avgstar":"3.94","RecentPTR":"16.62","state":"Nevada","city":"Las Vegas"},{"RegionName":"89108","RecentPrice":"0.91","avg2014":0.709545,"avg2015":0.735917,"avg2016":0.751387,"avg2017":0.834723,"avg2018":0.874192,"population":70123,"avgstar":"3.40","RecentPTR":"15.26","state":"Nevada","city":"Las Vegas"},{"RegionName":"89166","RecentPrice":"0.91","avg2014":0.686343,"avg2015":0.71025,"avg2016":0.729562,"avg2017":0.776794,"avg2018":0.841371,"population":13209,"avgstar":"4.17","RecentPTR":"16.52","state":"Nevada","city":"Las Vegas"},{"RegionName":"89142","RecentPrice":"0.90","avg2014":0.704414,"avg2015":0.719641,"avg2016":0.754532,"avg2017":0.819123,"avg2018":0.86531,"population":33731,"avgstar":"3.75","RecentPTR":"15.19","state":"Nevada","city":"Las Vegas"},{"RegionName":"89130","RecentPrice":"0.89","avg2014":0.696612,"avg2015":0.712139,"avg2016":0.740515,"avg2017":0.789019,"avg2018":0.856327,"population":33015,"avgstar":"3.69","RecentPTR":"16.52","state":"Nevada","city":"Las Vegas"},{"RegionName":"89121","RecentPrice":"0.89","avg2014":0.657244,"avg2015":0.687701,"avg2016":0.710139,"avg2017":0.766211,"avg2018":0.850967,"population":64096,"avgstar":"3.46","RecentPTR":"14.38","state":"Nevada","city":"Las Vegas"},{"RegionName":"89122","RecentPrice":"0.89","avg2014":0.676971,"avg2015":0.696328,"avg2016":0.717882,"avg2017":0.770425,"avg2018":0.83202,"population":45720,"avgstar":"3.30","RecentPTR":"14.84","state":"Nevada","city":"Las Vegas"},{"RegionName":"89104","RecentPrice":"0.88","avg2014":0.841079,"avg2015":0.841079,"avg2016":0.841079,"avg2017":0.812069,"avg2018":0.870088,"population":39909,"avgstar":"3.63","RecentPTR":"13.35","state":"Nevada","city":"Las Vegas"},{"RegionName":"89129","RecentPrice":"0.87","avg2014":0.708156,"avg2015":0.730835,"avg2016":0.752481,"avg2017":0.790669,"avg2018":0.848556,"population":51252,"avgstar":"3.77","RecentPTR":"16.62","state":"Nevada","city":"Las Vegas"},{"RegionName":"89141","RecentPrice":"0.87","avg2014":0.691984,"avg2015":0.704087,"avg2016":0.718997,"avg2017":0.764873,"avg2018":0.813056,"population":25150,"avgstar":"3.99","RecentPTR":"17.32","state":"Nevada","city":"Las Vegas"},{"RegionName":"89149","RecentPrice":"0.86","avg2014":0.681302,"avg2015":0.706776,"avg2016":0.74339,"avg2017":0.799676,"avg2018":0.846304,"population":31143,"avgstar":"3.60","RecentPTR":"16.55","state":"Nevada","city":"Las Vegas"},{"RegionName":"89156","RecentPrice":"0.86","avg2014":0.652647,"avg2015":0.663502,"avg2016":0.705311,"avg2017":0.77614,"avg2018":0.839402,"population":27794,"avgstar":"3.00","RecentPTR":"15.16","state":"Nevada","city":"Las Vegas"},{"RegionName":"89110","RecentPrice":"0.85","avg2014":0.683741,"avg2015":0.692222,"avg2016":0.709709,"avg2017":0.76099,"avg2018":0.819178,"population":70994,"avgstar":"3.49","RecentPTR":"14.99","state":"Nevada","city":"Las Vegas"},{"RegionName":"89178","RecentPrice":"0.85","avg2014":0.674187,"avg2015":0.69376,"avg2016":0.719328,"avg2017":0.743691,"avg2018":0.797426,"population":27588,"avgstar":"4.11","RecentPTR":"17.17","state":"Nevada","city":"Las Vegas"},{"RegionName":"89139","RecentPrice":"0.83","avg2014":0.682489,"avg2015":0.701403,"avg2016":0.722886,"avg2017":0.75234,"avg2018":0.804919,"population":30477,"avgstar":"3.79","RecentPTR":"17.12","state":"Nevada","city":"Las Vegas"},{"RegionName":"89131","RecentPrice":"0.82","avg2014":0.673456,"avg2015":0.697156,"avg2016":0.713951,"avg2017":0.750628,"avg2018":0.799802,"population":43072,"avgstar":"3.69","RecentPTR":"17.08","state":"Nevada","city":"Las Vegas"},{"RegionName":"89148","RecentPrice":"0.82","avg2014":0.703619,"avg2015":0.721894,"avg2016":0.738078,"avg2017":0.777169,"avg2018":0.82204,"population":39712,"avgstar":"3.85","RecentPTR":"17.30","state":"Nevada","city":"Las Vegas"},{"RegionName":"89143","RecentPrice":"0.81","avg2014":0.756518,"avg2015":0.756518,"avg2016":0.699482,"avg2017":0.763406,"avg2018":0.806665,"population":12786,"avgstar":"3.67","RecentPTR":"16.69","state":"Nevada","city":"Las Vegas"}]
	if(city==="Las Vegas" && bor==="BUY"){
		$scope.statesInfo=las_buy;
	}
	else if(city==="Las Vegas" && bor==="RENT"){
		$scope.statesInfo=las_rent;
	}
	else{
		var request = $http.get('/userPreferencecache/' + state + '/' + city + '/' + bor); 
		request.success(function(response) {
    // success
	    if(response.length===0){
			var request = $http.get('/userPreference/' + state + '/' + city + '/' + bor); 
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
	    }
	    else{
           var jsonStr = JSON.stringify(response);
           console.log(jsonStr);
           $scope.statesInfo = response;
          // console.log("$scope.userInfo",$scope.userInfo);
	    }
		});
		
        request.error(function(response) {
    // failed
            console.log('err');
           });
		
	
        
  
		
	
	}
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
      var setprice = document.getElementById('price');
      var price = String(response[0].RecentPrice);
      setprice.value = price;
      console.log("user location success " + lat);
      console.log('price fetched '+price)
      console.log('service',service_type);
      var zipcode = document
      function initMap() {
        var Latlng = {lat: lat , lng: lng}
        console.log(Latlng)
        var mapInstance =  new google.maps.LatLng(lat, lng)
        map = new google.maps.Map(document.getElementById('map'), {
          center: Latlng,
          zoom: 17
        });
        var marker = new google.maps.Marker({
          position: Latlng,
          map: map,
          title: price
        });
        infowindow = new google.maps.InfoWindow()
        // map.event.addListener(marker, 'click', function(e) {
        //     infowindow.setContent(marker.getTitle());
        //     infowindow.open(map);
        // });        
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