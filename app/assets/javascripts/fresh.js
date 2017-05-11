(function(){
	$.ajax({
		type:"get",
		url:"/fresh",
		dataType:'json',
		success:function(data){
			console.log(data);
			var code = $(".code").text();
			if(code.length == 2){
				$(".active").html("全省鲜烟数据统计");
			}else if(code.length == 4){
				$(".active").html(data.city_name[0].title+"市鲜烟数据统计");
			}
			initData(data);
		}
	})
})()

function initData(data){
	/*
	 * 定义统计数据
	 */
	var breed_sum = 0;  //鲜烟总量
	var breed_statistic = []; //品种统计数,饼状图
	var part_statistic = [];  //部位统计数据,饼状图
	var type_statistic = [];  //类型统计数据
	var maturity_statistic = [];  //成熟度统计数据
	var tTrolleys_data = [];  //表格数据
	var tTrolleys2_data = [];  //表格数据
	var has_same = false;
	var _x = null;
	var map = {};

	/*
	 * 按烟品种统计数据
	 */
	map.name = $.trim(data.by_breed[0].breed);
	map.breed = $.trim(data.by_breed[0].breed);  //品种统计表格初始化
	map.y = parseInt(data.by_breed[0].weight_sum);
	map.weight_sum = parseInt(data.by_breed[0].weight_sum);  //品种统计表格初始化
	map.up_leaf_sum = 0;  //品种统计表格初始化
	map.middle_leaf_sum = 0;  //品种统计表格初始化
	map.down_leaf_sum = 0;  //品种统计表格初始化
	map.aridity = 0;  //品种统计表格初始化
	map.greenup = 0;  //品种统计表格初始化
	map.normal = 0;  //品种统计表格初始化
	breed_statistic.push(map);
	tTrolleys_data.push(map);  //品种统计表格初始化
	for(var i=1;i<data.by_breed.length;i++){
		has_same = false;
		_x = null;
		for(var j=0; j<breed_statistic.length; j++){
			if($.trim(breed_statistic[j].name) == $.trim(data.by_breed[i].breed)){
				has_same = true;
				_x = j;
			}
		}
		if(has_same){
			breed_statistic[_x].y += parseInt(data.by_breed[i].weight_sum);
			tTrolleys_data[_x].weight_sum += parseInt(data.by_breed[i].weight_sum);  //品种统计表格初始化
		}else {
			map = {};
			map.breed = $.trim(data.by_breed[i].breed);  //品种统计表格初始化
			map.name = $.trim(data.by_breed[i].breed);
			map.y = parseInt(data.by_breed[i].weight_sum);
			map.weight_sum = parseInt(data.by_breed[i].weight_sum);  //品种统计表格初始化
			map.up_leaf_sum = 0;  //品种统计表格初始化
			map.middle_leaf_sum = 0;  //品种统计表格初始化
			map.down_leaf_sum = 0;  //品种统计表格初始化
			map.aridity = 0;  //品种统计表格初始化
			map.greenup = 0;  //品种统计表格初始化
			map.normal = 0;  //品种统计表格初始化
			breed_statistic.push(map);
			tTrolleys_data.push(map);  //品种统计表格初始化
		}
		//breed_sum += parseInt(data.by_breed[i].weight_sum);  //统计鲜烟总量
	}
	breed_statistic[0].sliced = true;
	breed_statistic[0].selected = true;
	breed_sum += parseInt(data.fresh_sum[0].sum);  //统计鲜烟总量

	/*
	 * 按部位统计数据
	 */
	map = {};
	map.name = $.trim(data.by_part[0].part);
	map.y = parseInt(data.by_part[0].weight_sum);
	part_statistic.push(map);
	for(var i=1;i<data.by_part.length;i++){
		has_same = false;
		_x = null;
		for(var j=0; j<part_statistic.length; j++){
			if($.trim(part_statistic[j].name) == $.trim(data.by_part[i].part)){
				has_same = true;
				_x = j;
			}
		}
		if(has_same){
			part_statistic[_x].y += parseInt(data.by_part[i].weight_sum);
		}else{
			map = {};
			map.name = $.trim(data.by_part[i].part);
			map.y = parseInt(data.by_part[i].weight_sum);
			part_statistic.push(map);
		}
	}
	part_statistic[0].sliced = true;
	part_statistic[0].selected = true;


	/*
	 * 按类型统计数据
	 */
	map = {};
	map.name = $.trim(data.by_type[0].tobacco_type);
	map.y = parseInt(data.by_type[0].weight_sum);
	type_statistic.push(map);
	for(var i=1;i<data.by_type.length;i++){
		has_same = false;
		_x = null;
		for(var j=0; j<type_statistic.length; j++){
			if($.trim(type_statistic[j].name) == $.trim(data.by_type[i].tobacco_type)){
				has_same = true;
				_x = j;
			}
		}
		if(has_same){
			type_statistic[_x].y += parseInt(data.by_type[i].weight_sum);
		}else{
			map = {};
			map.name = $.trim(data.by_type[i].tobacco_type);
			map.y = parseInt(data.by_type[i].weight_sum);
			type_statistic.push(map);
		}
	}
	type_statistic[0].sliced = true;
	type_statistic[0].selected = true;


	/*
	 * 按成熟度统计数据
	 */
	var maturity = ["欠熟","适熟","过熟"];
	for(var i=0;i<maturity.length;i++){
		map = {};
		map.name = maturity[i];
		if(maturity[i] == "欠熟"){
			map.y = parseInt(data.by_maturity[0].weight_of_immature);
			maturity_statistic.push(map);
		}else if(maturity[i] == "过熟"){
			map.y = parseInt(data.by_maturity[0].weight_of_over_mature);
			maturity_statistic.push(map);
		}else if(maturity[i] == "适熟"){
			map.y = parseInt(data.by_maturity[0].weight_of_mature);
			map.sliced = true;
			map.selected = true;
			maturity_statistic.push(map);
		}
	}
	
	//初始化统计图
	initChart( breed_sum, breed_statistic, part_statistic, maturity_statistic, type_statistic);
	
	
	//tTrolleys2表格数据初始化
	for(var i=0;i<part_statistic.length;i++){
		map = {};
		map.part = part_statistic[i].name;
		map.weight_sum = parseInt(part_statistic[i].y);
		map.aridity = 0;
		map.greenup = 0;
		map.normal = 0;
		map.weight_of_mature = 0;
		map.weight_of_immature = 0;
		map.weight_of_over_mature = 0;
		var breed = [];
		for(var j=0;j<breed_statistic.length;j++){
			breed.push({
				name: breed_statistic[j].breed,
				sum: 0
			})
		}
		map.breed = breed;
		tTrolleys2_data.push(map);
	}
	for(var i=0;i<breed_statistic.length;i++){
		$(".breed_tr").append("<th>"+breed_statistic[i].breed+"</th>");
	}
	console.log(tTrolleys2_data);

	/*
	 * tTrolleys表格数据总计
	 */
	for(var j=0;j<tTrolleys_data.length;j++){
		for(var i=0;i<data.by_breed_maturity.length;i++){
			if($.trim(data.by_breed_maturity[i].breed) == tTrolleys_data[j].breed){
				if(data.by_breed_maturity[i].weight_of_mature){
					tTrolleys_data[j].weight_of_mature = data.by_breed_maturity[i].weight_of_mature;
				}else{
					tTrolleys_data[j].weight_of_mature = 0;
				}

				if(data.by_breed_maturity[i].weight_of_immature){
					tTrolleys_data[j].weight_of_immature = data.by_breed_maturity[i].weight_of_immature;
				}else{
					tTrolleys_data[j].weight_of_immature = 0;
				}

				if(data.by_breed_maturity[i].weight_of_over_mature){
					tTrolleys_data[j].weight_of_over_mature = data.by_breed_maturity[i].weight_of_over_mature;
				}else{
					tTrolleys_data[j].weight_of_over_mature = 0;
				}
			}
		}

		for(var i=0;i<data.by_breed_part.length;i++){
			if($.trim(data.by_breed_part[i].breed) == tTrolleys_data[j].breed){
				if($.trim(data.by_breed_part[i].part) == "上部叶"){
					tTrolleys_data[j].up_leaf_sum += parseFloat(parseFloat(data.by_breed_part[i].weight_sum).toFixed(2));
				}else if($.trim(data.by_breed_part[i].part) == "中部叶"){
					tTrolleys_data[j].middle_leaf_sum += parseFloat(parseFloat(data.by_breed_part[i].weight_sum).toFixed(2));
				}else if($.trim(data.by_breed_part[i].part) == "下部叶"){
					tTrolleys_data[j].down_leaf_sum += parseFloat(parseFloat(data.by_breed_part[i].weight_sum).toFixed(2));
				}
			}
		}

		for(var i=0;i<data.by_breed_type.length;i++){
			if($.trim(data.by_breed_type[i].breed) == tTrolleys_data[j].breed){
				if($.trim(data.by_breed_type[i].tobacco_type) == "干旱"){
					tTrolleys_data[j].aridity += parseFloat(parseFloat(data.by_breed_type[i].weight_sum).toFixed(2));
				}else if($.trim(data.by_breed_type[i].tobacco_type) == "返青"){
					tTrolleys_data[j].greenup += parseFloat(parseFloat(data.by_breed_type[i].weight_sum).toFixed(2));
				}else if($.trim(data.by_breed_type[i].tobacco_type) == "正常"){
					tTrolleys_data[j].normal += parseFloat(parseFloat(data.by_breed_type[i].weight_sum).toFixed(2));
				}
			}
		}
	}
	
	/*
	 * tTrolleys2表格数据总计
	 */
	for(var j=0;j<tTrolleys2_data.length;j++){
		for(var i=0;i<data.by_part_maturity.length;i++){
			if($.trim(data.by_part_maturity[i].part) == tTrolleys2_data[j].part){
				tTrolleys2_data[j].weight_of_mature += parseFloat(parseFloat(data.by_part_maturity[i].weight_of_mature).toFixed(2));
				tTrolleys2_data[j].weight_of_immature += parseFloat(parseFloat(data.by_part_maturity[i].weight_of_immature).toFixed(2));
				tTrolleys2_data[j].weight_of_over_mature += parseFloat(parseFloat(data.by_part_maturity[i].weight_of_over_mature).toFixed(2));
				
			}
		}

		for(var i=0;i<data.by_breed_part.length;i++){
			if($.trim(data.by_breed_part[i].part) == tTrolleys2_data[j].part){
				for(var k=0;k<tTrolleys2_data[j].breed.length;k++){
					if($.trim(data.by_breed_part[i].breed) == tTrolleys2_data[j].breed[k].name){
						tTrolleys2_data[j].breed[k].sum += parseFloat(parseFloat(data.by_breed_part[i].weight_sum).toFixed(2));
					}
				}
			}
		}

		for(var i=0;i<data.by_part_type.length;i++){
			if($.trim(data.by_part_type[i].part) == tTrolleys2_data[j].part){
				if($.trim(data.by_part_type[i].tobacco_type) == "干旱"){
					tTrolleys2_data[j].aridity += parseFloat(parseFloat((data.by_part_type[i].weight_sum)).toFixed(2));
				}else if($.trim(data.by_part_type[i].tobacco_type) == "返青"){
					tTrolleys2_data[j].greenup += parseFloat(parseFloat((data.by_part_type[i].weight_sum)).toFixed(2));
				}else if($.trim(data.by_part_type[i].tobacco_type) == "正常"){
					tTrolleys2_data[j].normal += parseFloat(parseFloat((data.by_part_type[i].weight_sum)).toFixed(2));
				}
			}
		}
	}
	
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
        {data:'breed'},
        {data:'weight_sum'},
        {data:'weight_of_immature',render:function(data,type,full){
            if(data){
            	return data;
            }else{
            	return "0";
            }
        }},
        {data:'weight_of_mature',render:function(data,type,row){
        	if(data){
        		return data;
        	}else{
        		return "0";
        	}
        }},
        {data:'weight_of_over_mature',render:function(data,type,row){
          	if(data){
        		return data;
        	}else{
        		return "0";
        	}
        }},
        {data:'up_leaf_sum',render:function(data,type,full){
            if(data){
        		return data;
        	}else{
        		return "0";
        	}
        }},
        {data:'middle_leaf_sum',render:function(data,type,row){
            if(data){
        		return data;
        	}else{
        		return "0";
        	}
        }},
        {data:'down_leaf_sum',render:function(data,type,row){
            if(data){
        		return data;
        	}else{
        		return "0";
        	}
        }},
        {data:'normal',render:function(data,type,full){
            if(data){
        		return data.toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'greenup',render:function(data,type,row){
            if(data){
        		return data.toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'aridity',render:function(data,type,full){
            if(data){
        		return data.toFixed(2);
        	}else{
        		return "0";
        	}
        }}
      ]
	});
	
	initTable2(tTrolleys2_data)
}

function initTable2(tTrolleys2_data){
	if(tTrolleys2_data[0].breed.length == 1){
		$("#tTrolleys2").DataTable({
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
	      pagingType: "full_numbers",//分页样式的类型
	      data:tTrolleys2_data,
	      initComplete:function(data){
	      	/*for(var i=0;i<data.by_breed.length;i++){
				var map = {};
				map.breed = data.by_breed[i].breed;
				map.weight_sum = parseInt(data.by_breed[i].weight_sum);
				tTrolleys_data.push(map);
				$(".breed_tr").append("<th>"+data.by_breed[i].breed+"</th>");
			}*/
	      },
	      columns:[
	        {data:'part'},
	        {data:'weight_sum'},
	        {data:'weight_of_immature',render:function(data,type,full){
	            if(data){
	            	return data.toFixed(2);
	            }else{
	            	return "0";
	            }
	        }},
	        {data:'weight_of_mature',render:function(data,type,row){
	        	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'weight_of_over_mature',render:function(data,type,row){
	          	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'normal',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'greenup',render:function(data,type,row){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'aridity',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'breed',render:function(data,type,full){
	            return data[0].sum
	        }}/*,
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	if(data[1]){
	        		return data[1].sum
	        	}else{
	        		return "";
	        	}
	        }}*/
	      ]
		});
	}else if(tTrolleys2_data[0].breed.length == 2){
		$("#tTrolleys2").DataTable({
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
	      pagingType: "full_numbers",//分页样式的类型
	      data:tTrolleys2_data,
	      createdRow: function ( row, data, index ) {
	        
	      },
	      columns:[
	        {data:'part'},
	        {data:'weight_sum'},
	        {data:'weight_of_immature',render:function(data,type,full){
	            if(data){
	            	return data.toFixed(2);
	            }else{
	            	return "0";
	            }
	        }},
	        {data:'weight_of_mature',render:function(data,type,row){
	        	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'weight_of_over_mature',render:function(data,type,row){
	          	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'normal',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'greenup',render:function(data,type,row){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'aridity',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'breed',render:function(data,type,full){
	            return data[0].sum
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	if(data[1]){
	        		return data[1].sum
	        	}else{
	        		return "";
	        	}
	        }}
	      ]
		});
		
	}else if(tTrolleys2_data[0].breed.length == 3){
		$("#tTrolleys2").DataTable({
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
	      pagingType: "full_numbers",//分页样式的类型
	      data:tTrolleys2_data,
	      initComplete:function(data){
	      	
	      },
	      createdRow: function ( row, data, index ) {
	        
	        //console.log(data.breed)
	        for(var i=0;i<data.breed.length;i++){
	        
	        }
	        
	      },
	      columns:[
	        {data:'part'},
	        {data:'weight_sum'},
	        {data:'weight_of_immature',render:function(data,type,full){
	            if(data){
	            	return data.toFixed(2);
	            }else{
	            	return "0";
	            }
	        }},
	        {data:'weight_of_mature',render:function(data,type,row){
	        	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'weight_of_over_mature',render:function(data,type,row){
	          	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'normal',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'greenup',render:function(data,type,row){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'aridity',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'breed',render:function(data,type,full){
	            return data[0].sum
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	return data[1].sum
	        	
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	return data[2].sum;
	        }}
	      ]
		});
		
	}else if(tTrolleys2_data[0].breed.length == 4){
		$("#tTrolleys2").DataTable({
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
	      pagingType: "full_numbers",//分页样式的类型
	      data:tTrolleys2_data,
	      initComplete:function(data){
	      	
	      },
	      createdRow: function ( row, data, index ) {
	        
	        
	      },
	      columns:[
	        {data:'part'},
	        {data:'weight_sum'},
	        {data:'weight_of_immature',render:function(data,type,full){
	            if(data){
	            	return data.toFixed(2);
	            }else{
	            	return "0";
	            }
	        }},
	        {data:'weight_of_mature',render:function(data,type,row){
	        	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'weight_of_over_mature',render:function(data,type,row){
	          	if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'normal',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'greenup',render:function(data,type,row){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'aridity',render:function(data,type,full){
	            if(data){
	        		return data.toFixed(2);
	        	}else{
	        		return "0";
	        	}
	        }},
	        {data:'breed',render:function(data,type,full){
	            return data[0].sum
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	return data[1].sum
	        	
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	return data[2].sum;
	        }},
	        {data:'breed',render:function(data,type,full){
	        	//console.log(data[1])
	        	return data[3].sum;
	        }}
	      ]
		});
	}
	 
}

function initChart( breed_sum, breed_statistic, part_statistic, maturity_statistic, type_statistic){
	$('#container').highcharts({  //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'  //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '鲜烟总量'  //指定图表标题
        },
        axisY: {        
	    	suffix: " kg"
	    },
        credits: { enabled: false},
        xAxis: {
            categories: ['鲜烟总量']  //指定x轴分组
        },
        yAxis: {
            title: {
                text: ''  //指定y轴的标题
            },
            labels: {
             	formatter:function(){
                	return this.value/1000+'t';
             	}
            }
        },

        legend: {
        	enabled:false
        },
        series: [{  //指定数据列
            name: '鲜烟总量(公斤)',  //数据列名
            data: [breed_sum]  //数据
        }]
    });

	$('#container2').highcharts({
            title: {
                text: '鲜烟品种'
            },
            credits: { enabled: false},
            
           	tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
        	},
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: breed_statistic
            }]
        });

	$('#container3').highcharts({
            title: {
                text: '鲜烟部位'
            },
            credits: { enabled: false},
            tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
        	},
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: part_statistic
            }]
        });

	$('#container4').highcharts({
            title: {
                text: '鲜烟成熟度'
            },
            credits: { enabled: false},
            
           	tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
        	},
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: maturity_statistic
            }]
        });

	$('#container5').highcharts({
            title: {
                text: '鲜烟类型'
            },
            credits: { enabled: false},
            
           	tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
        	},
            plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
            series: [{
                type: 'pie',
                name: '重量(公斤)',
                data: type_statistic
            }]
        });
}
