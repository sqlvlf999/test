//监狱法庭App应用模块
(function(){
	var mobileApp = angular.module('mobileApp',['mobileServices']).
	controller('prisonCourt',['$scope','getPrisonersData','selected',
		function($scope,getPrisonersData,selected){
			$scope.prisonerlist = getPrisonersData.prisonersData;
			$scope.nowID = 0;
			$scope.person = $scope.prisonerlist[$scope.nowID];

			$scope.window_height = $(window).height();
			$scope.window_width = $(window).width();

			$scope.side_bar_height = $scope.window_height;
			$scope.side_bar_width = $scope.window_width*0.2;

			$scope.list_bar_height = $scope.side_bar_height - $(".list_title").height()-30;

			$scope.contents_height = $scope.window_height;
			$scope.contents_width = $scope.window_width*0.8;

			$scope.content_title = $(".list_title").height();

			selected.print;
		}
	])
	//监狱法庭App服务模块
	var mobileServices = angular.module('mobileServices',[]).
		factory('getPrisonersData',function(){
			var prisonersData;
			$.ajax({
				type:"get",
			    url:"/prisoners/show",
			    dataType:'json',
			    async:false,
			    success:function(data){
			    	prisonersData=data;
				}
			});	
			return {
				prisonersData:prisonersData
			};
		}).
		factory('selected',function(){
			function print(){
				console.log($("#0"));
			}
			return {
				print:print
			};
			
		});
	//监狱法庭App指令模块
	var moblieDirective = angular.module('moblieDirective',[]);
	

})();
