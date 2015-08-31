var app = angular.module('login',['ngRoute','ngCookies'])
app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
});
app.run(function($http, $cookies) {
    console.log($cookies)
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}); 
app.config(['$routeProvider',
 function($routeProvider) {
    $routeProvider.
       when('signup', {
          templateUrl: 'signup.htm',
          controller: 'loginCtrl'
       }).
       when('login', {
          templateUrl: 'login.htm',
          controller: 'loginCtrl'
       }).
       otherwise({
          redirectTo: ''
       });
 }]);
app.controller('loginCtrl',function($scope,$http,$location) {
	$scope.login_signup = 0;
	var request = window.indexedDB.open("attendance");
	request.onupgradeneeded = function() {
	  var db = request.result;
	  var store = db.createObjectStore("login", {keyPath: "uname"});
	  var uname = store.createIndex("uname", "uname", {unique: true});
	  var password = store.createIndex("password", "password");
	  var staff_name = store.createIndex("staff_name","staff_name");
	  var email = store.createIndex("email","email");
	  var mobile = store.createIndex("mobile","mobile");
	  var role = store.createIndex("role","role");
	  var address = store.createIndex("address","address");
	};
	request.onsuccess = function() {
	  db = request.result;
	  var tx = db.transaction("login", "readonly");
	  var req = tx.objectStore("login").count();
      req.onsuccess = function(event) {
		  $scope.login_signup = req.result;
		  console.log(req)
		  $scope.$apply();
		   	// window.location = 'login.html';
		 };
	};
	$scope.login = function(name,password) {
		var data = {
			name: name,
		    password: password,
		}

		if($scope.login_signup == 0) {
			$http.post('http://localhost:8000/login_app/', {
		    data : data,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			console.log('value',response)
			if(response.status=='success') {
				var tx = db.transaction("login", "readwrite");
				var store = tx.objectStore("login");
				if(response.user_data.length !=0) {
					var data = response.user_data[0] 
					var request = store.put({uname: name, password: password,staff_name: data.name,email: data.email,mobile: data.mobile,role:data.role,address:data.address});
				}
				else {
					var request = store.put({uname: name, password: password,staff_name: response.user_data});
				}
				request.onerror = function() {
				  console.log(request.error);
				};
				request.onsuccess = function(event) {
				  console.log(request,'val');
				  window.location = 'templates/home.html';
				};
				tx.onabort = function() {
				  console.log(tx.error);
				};
			}
			else if(response.status=='failed') {
				alert("Username Password didn't Match!")
			}
		})
		}
		else if($scope.login_signup != 0) {
			var tx = db.transaction("login", "readonly");
			var req = tx.objectStore("login").openCursor();
			console.log(req)
			req.onsuccess = function(event) {
			    var cursor = req.result.value;
			    console.log(name)
			    if(cursor.uname == name && cursor.password == password) {
			    	$scope.staff_name = name;
			    	window.location = 'templates/home.html'
			    }
			    else {
			    	alert('Please check Your username and Password!')		    	
			    }
			}
		}
	}
	$scope.signup = function(name,password) {
		console.log('signup')
		var tx = db.transaction("login", "readwrite");
		var store = tx.objectStore("login");
		console.log('store',store)
		var request = store.put({uname: name, password: password});
		request.onerror = function() {
		  console.log(request.error);
		};
		request.onsuccess = function(event) {
		  console.log(request);
		  window.location = 'login.html'
		};
		tx.onabort = function() {
		  console.log(tx.error);

		};
	}
	
})


// request.onupgradeneeded = function() {
// 	  var db = request.result;
// 	  var store = db.createObjectStore("student", {keyPath: "studentid", autoIncrement : true});
// 	  var idIndex = store.createIndex("studentid", "studentid", {unique: true});
// 	  var nameIndex = store.createIndex("name", "name");
// 	  var courseIndex = store.createIndex("course", "course");
// 	  var yearIndex = store.createIndex("year", "year");
// 	  var attendanceIndex = store.createIndex("attendance", "attendance");
// 	  var dateIndex = store.createIndex("date", "date");
// 	};