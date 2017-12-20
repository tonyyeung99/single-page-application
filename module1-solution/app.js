(function (){
  'use strict';

  var TD_CLASSES = ['highlight-red', 'highlight-green','highlight-transparent'];

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    var elmMenu = angular.element(document.getElementById("lunch-menu"));
    var elmChkResult = angular.element(document.getElementById("check-result"));
    var elements = [elmMenu, elmChkResult]
    $scope.lunchItems = "";
    $scope.checkResult = "";
    $scope.checkLunch = function(){
      if(!$scope.lunchItems){
        $scope.checkResult = "Please enter data first";
        changeHighlightClass(elements, 'highlight-red');
        return
      }
      var tokens = $scope.lunchItems.split(",");
      var result ="";
      var numberOfItems = numberOfNonEmpty(tokens);
      if(numberOfItems<=3){

        result = "Enjoy!";
      }else{
        result = "Too much!";
      }
      changeHighlightClass(elements, 'highlight-green');
      $scope.checkResult = result;
    }

    $scope.resetInputColor = function (){
      removeHighlightClass(elmMenu);
    }
  }

  function numberOfNonEmpty(items){
    var number = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if(item){
        number++;
      }
    }
    return number;
  }

  function changeHighlightClass(elements, stringClass){
    for (var i = 0; i < elements.length; i++) {
      removeHighlightClass(elements[i]);
      elements[i].addClass(stringClass);
    }
  }

  function removeHighlightClass(element){
    for (var i = 0; i < TD_CLASSES.length; i++) {
      if(element.hasClass(TD_CLASSES[i])){
        element.removeClass(TD_CLASSES[i]);
      }
    }
  }
})();
