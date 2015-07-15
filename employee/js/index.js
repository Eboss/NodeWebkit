
var app = angular.module('empapp',[]);
app.controller('empappctrl',function ($scope,$http){
	
	var request = indexedDB.open("empentry");

	request.onupgradeneeded = function() {
	  // The database did not previously exist, so create object stores and indexes.
	  var db = request.result;
	  var store = db.createObjectStore("employee", {keyPath: "employeeid"});
	  var titleIndex = store.createIndex("employeeid", "employeeid", {unique: true});
	  var authorIndex = store.createIndex("Designation", "Designation");
	  var salaryIndex = store.createIndex("salary", "salary");
	};

	request.onsuccess = function() {
	  db = request.result;
	};

	$scope.check_login = function(name,password) {
		if(name == 'admin' && password == '123') {
			window.location.href = "../employee/templates/entry.html"
		}
		else { alert('username or password not match!')}
	}


	$scope.UploadOfflineData = function (){
		//Uploading code
    
	}


	$scope.hostReachable = function (){
	    var xhr = new XMLHttpRequest();
	    var file = "https://www.google.co.in";
	     
	    try {
	    	xhr.open('HEAD', file, false);
	        xhr.send();
	         
	        if (xhr.status >= 200 && xhr.status < 304) {
	            $scope.reachability = 1;
	            $scope.UploadOfflineData();
	        } else {
	            $scope.reachability = 0;
	        }
	    } catch (e) {
	    	$scope.reachability = 0;
	    }
	}


	$scope.fetch_db = function(id,designation,salary) {

		var tx = db.transaction("employee", "readwrite");
		var store = tx.objectStore("employee");
		var request = store.put({Designation: designation, salary: salary, employeeid:id});
		request.onerror = function() {
		  // The uniqueness constraint of the "by_title" index failed.
		  report(request.error);
		  // Could call request.preventDefault() to prevent the transaction from aborting.
		};
		tx.onabort = function() {
		  // Otherwise the transaction will automatically abort due the failed request.
		  report(tx.error);
		};
	}



})

