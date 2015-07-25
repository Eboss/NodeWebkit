var app = angular.module('login',['ngRoute'])
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
	console.log($scope.login_signup)
	var request = window.indexedDB.open("attendance");
	request.onupgradeneeded = function() {
	  var db = request.result;
	  var store = db.createObjectStore("login", {keyPath: "uname"});
	  var uname = store.createIndex("uname", "uname", {unique: true});
	  var password = store.createIndex("password", "password");
	};
	request.onsuccess = function() {
	  db = request.result;
	  var tx = db.transaction("login", "readonly");
	  var req = tx.objectStore("login").count();
      req.onsuccess = function(event) {
		  $scope.login_signup = req.result;
		  console.log($scope.login_signup)
		  $scope.$apply();
		   	// window.location = 'login.html';
		 };
	};
	$scope.login = function(name,password) {
		var tx = db.transaction("login", "readonly");
		var req = tx.objectStore("login").openCursor();
		console.log(req)
		req.onsuccess = function(event) {
		    var cursor = req.result.value;
		    console.log(name)
		    if(cursor.uname == name && cursor.password == password) {
		    	$scope.staff_name = name;
		    	window.location = 'templates/attendance.html'
		    }
		    else {
		    	alert('Please check Your username and Password!')		    	
		    }
		}
	}
	$scope.signup = function(name,password) {
		var tx = db.transaction("login", "readwrite");
		var store = tx.objectStore("login");
		console.log('store',store)
		var request = store.put({uname: name, password: password});
		request.onerror = function() {
		  console.log(request.error);
		};
		request.onsuccess = function(event) {
		  console.log(request);
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