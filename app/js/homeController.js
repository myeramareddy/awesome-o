'use strict';

angular.module('appMain').controller('homeController', function ($scope, $window, memStorageService, staticStuff) {

    $scope.memStorageService = memStorageService;
    $scope.addButtonClicked = false;

    $scope.staticStuff = staticStuff;
    $scope.randomMem = null;

    $scope.$watch('memStorageService.data', function() {
        $scope.memList = $scope.memStorageService.data;
    });

    $scope.memStorageService.findAll(function(data) {
        $scope.memList = data;
        $scope.$apply();
    });

    $scope.setAddButtonToTrue = function () {
        $scope.addButtonClicked = true;
    };

    $scope.setAddButtonToFalse = function () {
        $scope.addButtonClicked = false;
    };

    $scope.getRandomMemory = function () {
        var idx = getRandomInt(0,$scope.memList.length-1);
        $scope.randomMem = $scope.memList[idx];
        var c = $scope.memList[idx]; 
        return c
    };

    $scope.getRandomMemTitle = function () {
        var idx = getRandomInt(0,$scope.staticStuff.memSubtitleArr.length-1);
        var c = $scope.staticStuff.memSubtitleArr[idx]; 
        return c
    };

    $scope.getRandomAddPrompt = function () {
        var idx = getRandomInt(0,$scope.staticStuff.addNewPromptArr.length-1);
        var c = $scope.staticStuff.addNewPromptArr[idx]; 
        return c
    };

    $scope.closeWin = function() {
        $window.close();
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //https://codepen.io/kpourdeilami/pen/KDepk
    $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight -10; //replace # by sum(padding-top,padding-bottom)
        element.style.height =  scrollHeight + "px";    
    }
  
    function expand() {
        $scope.autoExpand('new-todo');
    }

    function isEmpty(value){
      return (value == null || value.length === 0);
    }

    $scope.isValEmpty = function(value) {
      return (value == null || value.length === 0);
    }

    function getNumOfMemories() {
        if($scope.memList == null) {
            return 0;
        } else {
            return $scope.memList.length;
        }
    }
    
    //http://stackoverflow.com/questions/28517563/form-input-is-undefined
    $scope.add = function() {
        var inputMem = $scope.newContent;
        if(!isEmpty(inputMem)) {
            memStorageService.add($scope.newContent);
            $scope.newContent = '';
        }
        $scope.addButtonClicked = false;
    }

    $scope.remove = function(todo) {
        memStorageService.remove(todo);
    }

    $scope.removeAll = function() {
        memStorageService.removeAll();   
    }
    
});



//https://ilikekillnerds.com/2014/11/constants-values-global-variables-in-angularjs-the-right-way/
angular.module('appMain').value("staticStuff", {
    memSubtitleArr : ["Think about this...","Remember this?","Ohhh yeaaa...","That's cool!"],
    addNewPromptArr : ["New awesome thing...","Something awesome..."]
});

