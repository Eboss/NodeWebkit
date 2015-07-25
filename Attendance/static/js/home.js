var app = angular.module('home',[])
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
app.controller('homeCtrl',function($scope,$http,$location) {
    $scope.staff_name = '';
    $scope.date = new Date();
    console.log($scope.date)
       $scope.attendanceData = {
        sessions: ['Session1', 'Session2', 'Session3', 'Session4', 'Session5', 'Session6', 'Session7', 'Session8', 'Session9', 'Session10'],
        studentsData: [{
            name: 'Student1',
            sessions: {
                'Session1': 'present',
                'Session2': 'present',
                'Session3': 'present',
                'Session4': 'present',
                'Session5': 'abbsent',
                'Session6': 'abbsent',
                'Session7': 'abbsent',
                'Session8': 'present',
                'Session9': 'present',
                'Session10': 'present'
            }
        }, {
            name: 'Student2',
            sessions: {
                'Session1': 'present',
                'Session2': 'present',
                'Session3': 'present',
                'Session4': 'present',
                'Session5': 'present',
                'Session6': 'present',
                'Session7': 'present',
                'Session8': 'present',
                'Session9': 'present',
                'Session10': 'present'
            }
        }, {
            name: 'Student3',
            sessions: {
                'Session1': 'present',
                'Session2': 'present',
                'Session3': 'present',
                'Session4': 'present',
                'Session5': 'present',
                'Session6': 'present',
                'Session7': 'present',
                'Session8': 'present',
                'Session9': 'present',
                'Session10': 'present'
            }
        }, {
            name: 'Student4',
            sessions: {
                'Session1': 'present',
                'Session2': 'present',
                'Session3': 'present',
                'Session4': 'present',
                'Session5': 'present',
                'Session6': 'present',
                'Session7': 'present',
                'Session8': 'present',
                'Session9': 'present',
                'Session10': 'present'
            }
        }, {
            name: 'Student5',
            sessions: {
                'Session1': 'present',
                'Session2': 'present',
                'Session3': 'present',
                'Session4': 'present',
                'Session5': 'present',
                'Session6': 'present',
                'Session7': 'present',
                'Session8': 'present',
                'Session9': 'present',
                'Session10': 'present'
            }
        }]
    };
 


    var request = window.indexedDB.open("attendance");
    request.onsuccess = function() {
      db = request.result;
      var tx = db.transaction("login", "readonly");
        var req = tx.objectStore("login").openCursor();
        req.onsuccess = function(event) {
            var cursor = req.result.value;
            $scope.staff_name = cursor.uname;        
            console.log('name', $scope.staff_name)
            $scope.$apply();    
        }
    }


})