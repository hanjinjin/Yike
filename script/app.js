var app=angular.module("app",["ngRoute"]);
// 配置路由
app.config(["$routeProvider",function($routeProvider){
  $routeProvider.when("/today",{
     controller:'todaycontroller',
     templateUrl:'./views/today.html',

  }).when("/older",{
    controller:'olderController',
    templateUrl:"./views/older.html",
  })
}])
app.controller("todaycontroller",["$scope","$http","$filter","$rootScope",function($scope,$http,$filter,$rootScope){
   
   $rootScope.loading = false;
   var date=$filter("date");
   $rootScope.title="今日一刻";
   var today=date(new Date(),"yyyy-MM-dd");

   $http({
      url:"./api/today.php",
      method:"get",
      params:{
        today:today
      }
   }).success(function(data){
       console.log(data);
        $rootScope.loading = true;

        $scope.posts=data.posts;
        $scope.date = data.date;
      })
}])
//往期内容
app.controller('olderController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){
    $rootScope.loading = false;
     // var date=$filter("date");
     $rootScope.title = '往期内容';
     // var today=date(new Date()-5,"yyyy-MM-dd");
               $http({
                        url:'./api/older.php',
                         method:"get",
                         params:{
                            day:-5
                         }
                    }).success(function(data){
                    console.log(data);
                    $rootScope.loading = true;
                    $scope.posts=data.posts;
                    $scope.date = data.date;
                 }); 
    
             
}]);
app.run(["$rootScope",function($rootScope){
    //点击事件
    //开始时设置为false,并不让导航栏向右跑
    $rootScope.collapse=false;
      $rootScope.loading = false;
    $rootScope.toggle=function(){
        $rootScope.collapse=!$rootScope.collapse;
        //获取所有的dd标签，添加运动
        var dds=document.querySelectorAll('dd');
        // 如果collapse为true的话，
        var time=0;
         if($rootScope.collapse){
             for (var i = 0;i<dds.length;i++){
                //添加运动效果，就是改变过度时间并且给他加上运动
                dds[i].style.transform='translate(0)';
                time = (i+1)*0.15+'s';
                dds[i].style.transition='all' + ' ' +time;
            }
        }else{
             for (var i = 0;i<dds.length;i++){
                //添加运动效果，就是改变过度时间并且给他加上运动
                dds[i].style.transform='translate(-100%)';
                time = (dds.length-i)*0.15+'s';
                dds[i].style.transition='all' + ' ' +time;
            }
        }
    }
}])
console.log(1)
app.controller("navController",["$scope",function($scope){
  console.log(1)
  $scope.list=[
        {"text":"今日一刻","link":"#/today","icon":"icon-home"},
        {"text":"往期内容","link":"#/older","icon":"icon-file-empty"},
        {"text":"热门作者","link":"#/author","icon":"icon-pencil"},
        {"text":"栏目浏览","link":"#/category","icon":"icon-menu"},
        {"text":"我的喜欢","link":"#/favourite","icon":"icon-heart"},
        {"text":"设置","link":"#/settings","icon":"icon-cog"}
    ];
}])
