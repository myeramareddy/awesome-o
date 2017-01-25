
angular.module('appMain').service('memStorageService', function ($q) {
    var _this = this;
    this.data = [];

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var todo = {
            id: id,
            content: newContent,
            createdAt: new Date().toDateString() + " " + new Date().toLocaleTimeString()
        };
        this.data.push(todo);
        this.sync();
    }

    this.sync = function() {
        chrome.storage.local.set({allMems: this.data}, function() {
            if(chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
                return;
            } else {
                console.log('Data stored in local chrome.storage');
            }
        });
    }

    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

    this.findAll = function(callback) {
        chrome.storage.local.get('allMems', function(keys) {
            //callback when chrome.get finishes getting array
            if (keys.allMems != null) {
                //set class.data to the returned objects
                _this.data = keys.allMems;
                //send this back to whoever called me
                //console.log(_this.data);
                callback(_this.data);
            }
        });
    }

});

//http://stackoverflow.com/questions/20181323/passing-data-between-controllers-in-angular-js

//keys -> allMems -> data -> todo -> id
//                               -> content
//                               -> createdAt

