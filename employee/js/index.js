var app = angular.module('empapp',[]);
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
		console.log('???')
		if(name == 'admin' && password == '123') {
			window.location.href = "templates/entry.html"
		}
		else { alert('username or password not match!')}
	}


	$scope.UploadOfflineData = function (){
		var request = indexedDB.open("empentry");
		request.onsuccess = function(event) {
		var db = request.result;
		var tx = db.transaction("employee", "readonly");
		var req = tx.objectStore("employee").openCursor();
		req.onsuccess = function(event) {
		    var cursor = req.result;
		    if (cursor) {console.log('cursor',cursor.value);$scope.fetch_data=cursor.value;}
			else {console.log('null')}
		var data = {
			subject : cursor.value.Designation,
			student_name : cursor.value.salary,
			student_id : cursor.value.employeeid,
			username : 'admin',
		}
		console.log('data',data)
		$http({
		    method: 'POST',
		    url: 'http://10.0.1.34:8000/enter_attendance/',
		    data: data,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response) {
            console.log('Uploading???')
        })
    
	}
}}


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
		console.log('????')

		var tx = db.transaction("employee", "readwrite");
		var store = tx.objectStore("employee");
		console.log(store)
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

	$scope.showAlls = function() {
	var request = window.indexedDB.open("empentry");
	request.onsuccess = function(event) {
		var db = request.result;
		console.log('db',db)
		var tx = db.transaction("employee", "readonly");
		console.log('count')
		// var store = tx.objectStore("employee");
    	var req = tx.objectStore("employee").openCursor();
    	console.log(req)
    	for (var i=0;i<5;i++){
	    // req.onsuccess = function(event) {
	    // var cursor = req.result[1];
	    console.log(req.openCursor())
	 //    if (cursor) {console.log('cursor',cursor.value)}
		// else {console.log('null')}
		// }
	}

}
}
	$scope.showAll = function() {
		console.log('start')
	var request = getindexedDB.open("empentry");
	request.onsuccess = function(event) {
		var db = request.result;
		var allDownloadContent = []
		var objectStore = db.transaction("employee").objectStore("employee");
		// var tx = db.transaction("employee", "readonly");
		// var store = tx.objectStore("employee");
    	// var req = store.openCursor();
	    console.log('objectStore',objectStore)
	    objectStore.openCursor().onsuccess = function(event) {
	    var cursor = event.target.result;
	    console.log(cursor)
	    if (!!cursor == false) {
	    	console.log(req.result)
	    }
	    allDownloadContent.push(cursor);
	    cursor.continue;
	    console.log('data')
	    console.log(allDownloadContent)
	 //    if (cursor) {console.log('cursor',cursor.value);$scope.fetch_data=cursor.value;}
		// else {console.log('null')}
		}
	}

}



})


///
// to get db data from index db
// function showAll() {
//   document.getElementById("ourList").innerHTML = "";

//   var request = window.indexedDB.open("todos");
//   request.onsuccess = function(event) {
//     // Enumerate the entire object store.
//     var ul = document.createElement("ul");
//     var db = todoDB.indexedDB.db;
//     var trans = db.transaction("todo", 'readonly');
//     var request = trans.objectStore("todo").openCursor();

//     request.onsuccess = function(event) {
//       var cursor = request.result;

//       // If cursor is null then we've completed the enumeration - so update the DOM
//       if (cursor) {
//         var li = document.createElement("div");
//         li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.text;
//         ul.appendChild(li);
//         cursor.continue();
//       }
//       else {
//         document.getElementById("ourList").appendChild(ul);
//       }
//     }
//   }
// }

///

