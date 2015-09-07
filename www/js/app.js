(function(){

var app=angular.module('myreddit', ['ionic', 'angularMoment'])

app.controller('RedditCtrl', function($http, $scope) {
  
  $scope.stories =[];

  // $http.get('https://www.reddit.com/r/android/new/.json')
  //   .success(function(resp){
  //     angular.forEach(resp.data.children, function(child){
  //       console.log(child.data);
  //       $scope.stories.push(child.data);
  //     });
  //   });

  function loadStories(params, callback){
    var stories = []
    $http.get('https://www.reddit.com/r/android/new/.json', {params: params})
    .success(function(resp){
      angular.forEach(resp.data.children, function(child){
        console.log(child.data);
        stories.push(child.data);
      });
      callback(stories);
    });

  }

  $scope.loadOlderStories = function(){
    var params = {}
    if($scope.stories.length > 0){
      params['after'] = $scope.stories[$scope.stories.length -1].name
    }

    loadStories(params, function(olderStories){
      $scope.stories = $scope.stories.concat(olderStories);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
    // $http.get('https://www.reddit.com/r/android/new/.json', {params: params})
    // .success(function(resp){
    //   angular.forEach(resp.data.children, function(child){
    //     console.log(child.data);
    //     $scope.stories.push(child.data);
    //   });
      
    //   $scope.$broadcast('scroll.infiniteScrollComplete');

    // });
  }

  $scope.loadNewerStories = function(){
    var params = { 'before': $scope.stories[0].name}

    loadStories(params, function(newStories){
      $scope.stories = newStories.concat($scope.stories);
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());
