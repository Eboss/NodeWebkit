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
		console.log(name)
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