(function($){
	var code = $(".code").text();
	$.ajax({
		type:"get",
		url:"/dry",
		dataType:'json',
		success:function(data){
			console.log(data);
			if(code.length == 2){
				$(".active").html("全省干烟数据统计");
			}else if(code.length == 4){
				$(".active").html(data.city_name[0].title+"市干烟数据统计");
			}
			initData(data);
		}
	});
})(jQuery)

function initData(data){
	/*
	 * 定义统计数据
	 */
	var breed_sum = 0;  //干烟总量
	var breed_statistic = [];  //品种统计数据,饼状图
	var quality_statistic = [];  //品质统计数据,饼状图
	var part_statistic = [];  //部位统计数据,饼状图
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
	map.y = parseInt(data.by_breed[0].sum);
	map.weight_sum = parseInt(data.by_breed[0].sum);  //品种统计表格初始化
	breed_statistic.push(map);
	tTrolleys_data.push(map);  //品种统计表格初始化
	for(var i=1; i<data.by_breed.length; i++){
		has_same = false;
		_x = null;
		for(var j=0; j<breed_statistic.length; j++){
			if($.trim(breed_statistic[j].name) == $.trim(data.by_breed[i].breed)){
				has_same = true;
				_x = j;
			}
		}
		if(has_same){
			breed_statistic[_x].y += parseInt(data.by_breed[i].sum);
			tTrolleys_data[_x].weight_sum += parseInt(data.by_breed[i].sum);  //品种统计表格初始化
		}else {
			map = {};
			map.name = $.trim(data.by_breed[i].breed);
			map.breed = $.trim(data.by_breed[i].breed);  //品种统计表格初始化
			map.y = parseInt(data.by_breed[i].sum);
			map.weight_sum = parseInt(data.by_breed[i].sum);  //品种统计表格初始化
			breed_statistic.push(map);
			tTrolleys_data.push(map);  //品种统计表格初始化
		}
		//breed_sum += parseInt(data.by_breed[i].sum);
	}
	breed_statistic[0].sliced = true;
	breed_statistic[0].selected = true;
	breed_sum += parseInt(data.dry_sum[0].sum); //统计干烟总量

	/*
	 * 按部位统计数据
	 */
	map = {};
	map.name = $.trim(data.by_part[0].part);
	map.y = parseInt(data.by_part[0].sum);
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
			part_statistic[_x].y += parseInt(data.by_part[i].sum);
		}else{
			map = {};
			map.name = $.trim(data.by_part[i].part);
			map.y = parseInt(data.by_part[i].sum);
			part_statistic.push(map);
		}
	}
	part_statistic[0].sliced = true;
	part_statistic[0].selected = true;

	/*
	 * 按品质统计数据
	 */
	for(var i=0;i<3;i++){
		var map = {};
		if(i == 0){
			map.name = "正组";
			map.y = parseInt(data.by_quality[0].zz);
			quality_statistic.push(map);
		}else if(i == 1){
			map.name = "青烟";
			map.y = parseInt(data.by_quality[0].q);
			quality_statistic.push(map);
		}else if(i == 2){
			map.name = "杂色";
			map.y = parseInt(data.by_quality[0].zs);
			quality_statistic.push(map);
		}
		
	}
	quality_statistic[0].sliced = true;
	quality_statistic[0].selected = true;

	//初始化统计图
	initChart( breed_sum, breed_statistic, part_statistic, quality_statistic );

	//tTrolleys2表格数据初始化
	for(var i=0;i<part_statistic.length;i++){
		map = {};
		map.part = part_statistic[i].name;
		map.weight_sum = parseInt(part_statistic[i].y);
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

	/*
	 * tTrolleys表格数据总计
	 */
	for(var j=0; j<tTrolleys_data.length; j++){
		for(var i=0; i<data.by_breed_quality.length; i++){
			if(data.by_breed_quality[i].breed == tTrolleys_data[j].breed){
				tTrolleys_data[j].zz = data.by_breed_quality[i].zz;
				tTrolleys_data[j].q = data.by_breed_quality[i].q;
				tTrolleys_data[j].zs = data.by_breed_quality[i].zs;
			}
		}

		for(var i=0;i<data.by_breed_part.length;i++){
			if(data.by_breed_part[i].breed == tTrolleys_data[j].breed){
				if(data.by_breed_part[i].part == "上部叶"){
					tTrolleys_data[j].up_leaf_sum = data.by_breed_part[i].sum;
				}else if(data.by_breed_part[i].part == "中部叶"){
					tTrolleys_data[j].middle_leaf_sum = data.by_breed_part[i].sum;
				}else if(data.by_breed_part[i].part == "下部叶"){
					tTrolleys_data[j].down_leaf_sum = data.by_breed_part[i].sum;
				}
			}
		}

	}

	/*
	 * tTrolleys2表格数据总计
	 */
	for(var j=0;j<tTrolleys2_data.length;j++){
		for(var i=0; i<data.by_part_quality.length; i++){
			if(data.by_part_quality[i] == tTrolleys2_data[j].part){
				for(var k=0;k<tTrolleys2_data[j].breed.length;k++){
					if(data.by_breed_part[i].breed == tTrolleys2_data[j].breed[k].name){
						tTrolleys2_data[j].breed[k].sum = data.by_breed_part[i].sum;
					}
				}
			}
		}

		for(var i=0; i<data.by_part_quality.length; i++){
			if(data.by_part_quality[i].part == tTrolleys2_data[j].part){
				tTrolleys2_data[j].zz = parseFloat(data.by_part_quality[i].zz).toFixed(2);
				tTrolleys2_data[j].q = parseFloat(data.by_part_quality[i].q).toFixed(2);
				tTrolleys2_data[j].zs = parseFloat(data.by_part_quality[i].zs).toFixed(2);
			}
		}

		for(var i=0;i<data.by_breed_part.length;i++){
			if(data.by_breed_part[i].part == tTrolleys2_data[j].part){
				for(var k=0;k<tTrolleys2_data[j].breed.length;k++){
					if(data.by_breed_part[i].breed == tTrolleys2_data[j].breed[k].name){
						tTrolleys2_data[j].breed[k].sum = data.by_breed_part[i].sum;
					}
				}
			}
		}
	}

	/*
	 * 初始化datatable
	 */
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
        {data:'zz',render:function(data,type,full){
            if(data){
            	return parseFloat(data).toFixed(2);
            }else{
            	return "0";
            }
        }},
        {data:'q',render:function(data,type,row){
        	if(data){
        		return parseFloat(data).toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'zs',render:function(data,type,row){
        	if(data){
        		return parseFloat(data).toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'up_leaf_sum',render:function(data,type,full){
            if(data){
        		return parseFloat(data).toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'middle_leaf_sum',render:function(data,type,row){
            if(data){
        		return parseFloat(data).toFixed(2);
        	}else{
        		return "0";
        	}
        }},
        {data:'down_leaf_sum',render:function(data,type,row){
            if(data){
        		return parseFloat(data).toFixed(2);
        	}else{
        		return "0";
        	}
        }}
      ]
	});
	
	initTable2(tTrolleys2_data);
}

function initChart( breed_sum, breed_statistic, part_statistic, quality_statistic ){
	$('#container').highcharts({  //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'  //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '干烟总量'  //指定图表标题
        },
        credits: { enabled: false},
        xAxis: {
            categories: ['干烟总量']  //指定x轴分组
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
            name: '干烟总量(公斤)',  //数据列名
            data: [breed_sum]  //数据
        }]
    });

    $('#container2').highcharts({
        title: {
            text: '干烟品种'
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
            text: '干烟部位'
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
            text: '干烟品质'
        },
        credits: { enabled: false},
        tooltip: {
            	pointFormat: '{series.name}:<p>{point.y}公斤</p><br/> 比重:<p>{point.percentage:.1f}%</p>'
       		},
       
        plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
        series: [{
            type: 'pie',
            name: '重量(公斤)',
            data: quality_statistic
        }]
    });
}

function initTable2(tTrolleys2_data) {
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
	        columns:[
	        	{data:'part'},
	        	{data:'weight_sum'},
	        	{data:'zz',render:function(data,type,full){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'q',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'zs',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	return data[0].sum
	        	}}
	     	]
		});
	}else if(tTrolleys2_data[0].breed.length == 2) {
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
	        columns:[
	        	{data:'part'},
	        	{data:'weight_sum'},
	        	{data:'zz',render:function(data,type,full){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'q',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'zs',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	return data[0].sum
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[1]){
		        		return data[1].sum
		        	}else{
		        		return "";
		        	}
	        	}}
	     	]
		});

	}else if(tTrolleys2_data[0].breed.length == 3) {
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
	        columns:[
	        	{data:'part'},
	        	{data:'weight_sum'},
	        	{data:'zz',render:function(data,type,full){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'q',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'zs',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	return data[0].sum
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[1]){
		        		return data[1].sum
		        	}else{
		        		return "";
		        	}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[2]){
		        		return data[2].sum
		        	}else{
		        		return "";
		        	}
	        	}}
	     	]
		});
	}else if(tTrolleys2_data[0].breed.length == 4) {
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
	        columns:[
	        	{data:'part'},
	        	{data:'weight_sum'},
	        	{data:'zz',render:function(data,type,full){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'q',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'zs',render:function(data,type,row){
	            	if(data){
	        			return parseFloat(data).toFixed(2);
	        		}else{
	        			return "0";
	        		}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	return data[0].sum
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[1]){
		        		return data[1].sum
		        	}else{
		        		return "";
		        	}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[2]){
		        		return data[2].sum
		        	}else{
		        		return "";
		        	}
	        	}},
	        	{data:'breed',render:function(data,type,full){
	            	if(data[3]){
		        		return data[3].sum
		        	}else{
		        		return "";
		        	}
	        	}}
	     	]
		});
	}
}