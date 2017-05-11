(function($){
	
	$.ajax({
		type:"get",
		url:"/packings",
		dataType:'json',
		success:function(data){
			console.log(data);
			var code = $(".code").text();
			if(code.length == 2){
				$(".active").html("全省装烟数据统计");
			}else if(code.length == 4){
				$(".active").html(data.city_name[0].title+"市装烟数据统计");
			}

			/*
			 * 定义统计数据
			 */
			var packing_weight = 0;  //装烟量
			var packing_sum = 0;  //编烟竿数
			var packing_rooms = 0;
			var packing_category = [];  //分类编烟统计
			var packing_type = [];  //竿夹内均匀性统计
			var status = [];  //分类装烟情况
			var uniformity = [];  //装烟均匀性统计
			var tTrolleys_data = [];
			var has_same = false;
			var _x = null;
			var map = {};

			/*
			 * 装烟量
			 */
			for(var i=0;i<data.packing_weight.length;i++){
				packing_weight += parseFloat(data.packing_weight[i].sum);
			}

			/*
			 * 编烟竿数
			 */
			for(var i=0;i<data.packing_sum.length;i++){
				packing_sum += parseFloat(data.packing_sum[i].sum);
			}

			/*
			 * 装烟房数
			 */
			packing_rooms = data.packing_rooms[0].sum;

			/*
			 * 分类编烟统计
			 */
			map = {};
			map.name = $.trim(data.by_category[0].category);
			map.y = parseInt(data.by_category[0].packing_sum);
			packing_category.push(map);
			for(var i=1;i<data.by_category.length;i++){
				has_same = false;
				_x = null;
				for(var j=0; j<packing_category.length; j++){
					if($.trim(packing_category[j].name) == $.trim(data.by_category[i].category)){
						has_same = true;
						_x = j;
					}
				}
				if(has_same){
					packing_category[_x].y += parseInt(data.by_category[i].packing_sum);
				}else {
					map = {};
					map.name = $.trim(data.by_category[i].category);
					map.y = parseInt(data.by_category[i].packing_sum);
					packing_category.push(map);
				}
			}
			packing_category[0].sliced = true;
			packing_category[0].selected = true;

			/*
			 * 竿夹内均匀性统计
			 */
			packing_type.push({
				name: "均匀",
				y: 0
			});
			packing_type.push({
				name: "不均匀",
				y: 0,
				sliced: true,
				selected: true
			})
			for(var i=0;i<data.by_packing_type.length;i++){
				var map = {};
				if($.trim(data.by_packing_type[i].packing_type) == "各竿/夹量基本一致"){
					packing_type[0].y += data.by_packing_type[i].sum;
				} else if($.trim(data.by_packing_type[i].packing_type) == "各竿/夹量不一致") {
					packing_type[1].y += data.by_packing_type[i].sum;
				}
			}

			/*
			 * 分类装烟情况
			 */
			for(var i=0;i<data.by_status.length;i++){
				var map = {};
				if(data.by_status[i].status == "f"){
					map.name = "不正确";
					map.y = data.by_status[i].sum;
					status.push(map);
				}else{
					map.name = "正确";
					map.y = data.by_status[i].sum;
					map.sliced = true;
					map.selected = true;
					status.push(map);
				}
			}

			/*
			 * 装烟均匀性统计
			 */
			map = {};
			map.name = $.trim(data.by_uniformity[0].uniformity);
			map.y = parseInt(data.by_uniformity[0].sum);
			uniformity.push(map);
			for(var i=1;i<data.by_uniformity.length;i++){
				has_same = false;
				_x = null;
				for(var j=0; j<uniformity.length; j++){
					if($.trim(uniformity[j].name) == $.trim(data.by_uniformity[i].uniformity)){
						has_same = true;
						_x = j;
					}
				}
				if(has_same){
					uniformity[_x].y += parseInt(data.by_uniformity[i].sum);
				}else {
					map = {};
					map.name = $.trim(data.by_uniformity[i].uniformity);
					map.y = parseInt(data.by_uniformity[i].sum);
					uniformity.push(map);
				}
			}
			uniformity[0].sliced = true;
			uniformity[0].selected = true;

			/*
			 * 表格数据初始化
			 */
			for(var i=0;i<data.packing_weight_by_counties.length;i++){
				var map = {};
				map.title = data.packing_weight_by_counties[i].title;
				map.weight = parseFloat(data.packing_weight_by_counties[i].weight);
				map.sum = parseFloat(data.packing_weight_by_counties[i].sum);
				tTrolleys_data.push(map);
			}

			//tTrolleys表格数据总计
			for(var j=0;j<tTrolleys_data.length;j++){
				for(var i=0;i<data.by_category_counties.length;i++){
					if(tTrolleys_data[j].title == data.by_category_counties[i].title){
						if(data.by_category_counties[i].category == "混编"){
							tTrolleys_data[j].mixed = data.by_category_counties[i].sum;
						}else{
							tTrolleys_data[j].homogeny = data.by_category_counties[i].sum;
						}
					}
				}

				for(var i=0;i<data.by_type_counties.length;i++){
					if(tTrolleys_data[j].title == data.by_type_counties[i].title){
						if(data.by_type_counties[i].packing_type == "各竿/夹量基本一致"){
							tTrolleys_data[j].packing_uniformity = data.by_type_counties[i].sum;
						}else{
							tTrolleys_data[j].packing_ununiformity = data.by_type_counties[i].sum;
						}
					}
				}

				for(var i=0;i<data.by_status_counties.length;i++){
					if(tTrolleys_data[j].title == data.by_status_counties[i].title){
						if(data.by_status_counties[i].status == "f"){
							tTrolleys_data[j].f = data.by_status_counties[i].sum;
						}else{
							tTrolleys_data[j].t = data.by_status_counties[i].sum;
						}
					}
				}

				for(var i=0;i<data.by_uniformity_counties.length;i++){
					if(tTrolleys_data[j].title == data.by_uniformity_counties[i].title){
						if(data.by_uniformity_counties[i].uniformity == "前稀后密"){
							tTrolleys_data[j].front_less = data.by_uniformity_counties[i].sum;
						}else if(data.by_uniformity_counties[i].uniformity == "前密后稀"){
							tTrolleys_data[j].tail_less = data.by_uniformity_counties[i].sum;
						}else{
							tTrolleys_data[j].uniformity = data.by_uniformity_counties[i].sum;
						}
					}
				}

				for(var i=0;i<data.counties_code.length;i++){
					if(tTrolleys_data[j].title == data.counties_code[i].title){
						tTrolleys_data[j].code = data.counties_code[i].code;
					}
				}
			}
			initChart(packing_weight, packing_rooms, packing_sum, packing_category, packing_type, uniformity, status);
			initTable(tTrolleys_data);
		}
	})
	
})(jQuery)

function initTable(tTrolleys_data){
	//初始化datatable
	$("#tTrolleys").DataTable({
	  	paging: false,//分页
      	ordering: false,//是否启用排序
      	searching: false,//搜索
      	language: {
        	search: '',//右上角的搜索文本，可以写html标签
        	zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
        	//下面三者构成了总体的左下角的内容。
        	info: "",//左下角的信息显示，大写的词为关键字。
        	infoEmpty: "",//筛选为空时左下角的显示。
        	infoFiltered: ""//筛选之后的左下角筛选提示，
     	},
      	data:tTrolleys_data,
      	columns:[
        	{data:'title'},
        	{data:'weight',render:function(data,type,row){
        		return parseFloat(data).toFixed(2);
        	}},
        	{data:'sum'},
        	{data:'homogeny',render:function(data,type,row){
        		if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
        	{data:'mixed',render:function(data,type,row){
          		if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
        	{data:'packing_uniformity',render:function(data,type,full){
            	if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
        	{data:'packing_ununiformity',render:function(data,type,row){
            	if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
        	{data:'t',render:function(data,type,row){
            	if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
        	{data:'f',render:function(data,type,full){
            	if(data){
        			return parseFloat(data).toFixed(2);
        		}else{
        			return "0";
        		}
        	}},
	        {data:'uniformity',render:function(data,type,row){
	            if(data){
	        		return parseFloat(data).toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'tail_less',render:function(data,type,full){
	            if(data){
	        		return parseFloat(data).toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'front_less',render:function(data,type,full){
	            if(data){
	        		return parseFloat(data).toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }}
      	]
	});
}

function initChart(packing_weight, packing_rooms, packing_sum, packing_category, packing_type, uniformity, status){
	
	$('#container').highcharts({  //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'  //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '编装烟统计'  //指定图表标题
        },
        credits: { enabled: false},
        xAxis: {
            categories: ['鲜烟量','编烟杆数']  //指定x轴分组
        },
        yAxis: {
            title: {
                text: ''  //指定y轴的标题
            },
            labels: {
             	formatter:function(){
                	//return this.value+'t';
                	return '';
             	}
            }
        },
        legend: {
        	enabled:false
        },
        series: [{  //指定数据列
        	name:'统计',
            data: [{
            	name:'鲜烟量(公斤)',
            	y:parseInt(packing_weight)
            },{
            	name:'编烟杆数(杆)',
            	y:parseInt(packing_sum)
            }] 
        }]
    });

    $('#container_room').highcharts({  //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'  //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: ''  //指定图表标题
        },
        credits: { enabled: false},
        xAxis: {
            categories: ['装烟房数']  //指定x轴分组
        },
        yAxis: {
            title: {
                text: ''  //指定y轴的标题
            },
            labels: {
             	formatter:function(){
                	//return this.value+'t';
                	return '';
             	}
            }
        },
        legend: {
        	enabled:false
        },
        series: [{  //指定数据列
        	name:'统计',
            data: [{
            	name:'装烟房数(房)',
            	y:parseInt(packing_rooms)
            }] 
        }]
    });

	$('#container2').highcharts({
            title: {
                text: '分类编烟统计(杆)'
            },
            credits: { enabled: false},
            tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}竿</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
       		},
           
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '杆数',
                data: packing_category
            }]
        });

	$('#container3').highcharts({
            title: {
                text: '竿/夹内均<br/>匀性统计(杆)'
            },
            credits: { enabled: false},
            tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}竿</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
       		},
           
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '杆数',
                data: packing_type
            }]
        });

	$('#container4').highcharts({
            title: {
                text: '分类装烟情况'
            },
            credits: { enabled: false},
            tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
       		},
           
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: status
            }]
        });

	$('#container5').highcharts({
            title: {
                text: '装烟均匀性统计'
            },
            credits: { enabled: false},
            tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
       		},
           
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: uniformity
            }]
        });
}
