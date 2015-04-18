// Copyright (c) 2015 Teerasej Jiraphatchandej

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.


// Database instance.
var db;

// Include dependency: ngCordova
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        // Important!!
        // 
        // Instantiate database file/connection after ionic platform is ready.
        // 
        db = $cordovaSQLite.openDB("nextflow.db");
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');


    });
})

.controller('NFController', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite) {

    $scope.save = function(newMessage) {

        // execute INSERT statement with parameter
        $cordovaSQLite.execute(db, 'INSERT INTO Messages (message) VALUES (?)', [newMessage])
            .then(function(result) {
                $scope.statusMessage = "Message saved successful, cheers!";
            }, function(error) {
                $scope.statusMessage = "Error on saving: " + error.message;
            })

    }

    $scope.load = function() {

        // Execute SELECT statement to load message from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
            .then(
                function(res) {

                    if (res.rows.length > 0) {

                        $scope.newMessage = res.rows.item(0).message;
                        $scope.statusMessage = "Message loaded successful, cheers!";
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
    }

}])
