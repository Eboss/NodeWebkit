var app = angular.module('login',[])
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
app.controller('loginCtrl',function($scope,$http) {
	var request = window.indexedDB.open("attendance");
	request.onupgradeneeded = function() {
	  var db = request.result;
	  var store = db.createObjectStore("login", {keyPath: "uname"});
	  var uname = store.createIndex("uname", "uname", {unique: true});
	  var password = store.createIndex("password", "password");
	};
	request.onsuccess = function() {
	  db = request.result;
	};
	$scope.login = function(name,password) {
		var tx = db.transaction("employee", "readonly");
		var req = tx.objectStore("employee").openCursor();
		req.onsuccess = function(event) {
		    var cursor = req.result;
		}
		console.log(name)
	}
	$scope.signup = function(name,password) {
		var tx = db.transaction("login", "readwrite");
		var store = tx.objectStore("login");
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