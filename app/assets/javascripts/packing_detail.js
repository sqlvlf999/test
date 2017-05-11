(function(){
	var detail_code = $(".detail_code").text();
	$.ajax({
		type:"get",
		url:"/packing_detail/"+detail_code,
		dataType:'json',
		success:function(data){
			console.log(data);
			if(detail_code.length == 4){
				$(".active").text(data.city[0].title+"装烟数据统计");
			}else if(detail_code.length == 6){
				$(".active").text(data.county[0].title+"装烟数据统计");
			}else if(detail_code.length == 10){
				$(".active").text(data.station[0].title+"装烟数据统计");
				$(".room_row").css({display:""});
				//获取烤房数据
				for(var i=0;i<data.rooms.length;i++){
					var opt = "<option value='"+data.rooms[i].room_no+"'>"+data.rooms[i].address+"</option>"
					$(".rooms_select").append(opt);
					
				}
				var opt = "<option selected='selected' value='"+0+"'>"+"全部烤房"+"</option>";
				$(".rooms_select").append(opt);
				$(".btn").click(function(){
					var room_no = $(".rooms_select").val();
					room_analysis(this,room_no,detail_code);
				})
			}

			console.log(data);
			var packing_weight = 0;
			var packing_sum = 0;
			var packing_rooms = 0;
			var packing_category = [];
			var packing_type = [];
			var uniformity = [];
			var status = [];
			var tTrolleys_data = [];
			/*
			 * 装烟量
			 */
			for(var i=0;i<data.packing_weight.length;i++){
				packing_weight = parseFloat(data.packing_weight[i].sum);
			}

			/*
			 * 编烟竿数
			 */
			for(var i=0;i<data.packing_sum.length;i++){
				packing_sum = parseFloat(data.packing_sum[i].sum);
			}
			/*
			 * 装烟房数
			 */
			packing_rooms = data.packing_rooms[0].sum;

			for(var i=0;i<data.packing_weight_by_counties.length;i++){
				var map = {};
				map.title = data.packing_weight_by_counties[i].title;
				map.weight = parseFloat(data.packing_weight_by_counties[i].weight);
				map.sum = parseFloat(data.packing_weight_by_counties[i].sum);
				tTrolleys_data.push(map);
			}

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

			//初始化表格数据
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
			console.log(tTrolleys_data)

			initChart(packing_weight, packing_sum, packing_rooms, packing_category, packing_type, uniformity, status);
			initTable(tTrolleys_data);


		}
	});

})()
function room_analysis(e,room_no,detail_code){
	var data = {
		station_code:detail_code,
		room_no:room_no
	};
	if($(e).hasClass("sum")){
		data.type = 'sum';
		$.ajax({
			type:"get",
			url:"/packing_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var breed_data = [[data.sum[0]]];
				for(var i=1; i<data.sum.length; i++){
					if(data.sum[i].room_no == breed_data[breed_data.length-1][breed_data[breed_data.length-1].length-1].room_no){
						breed_data[breed_data.length-1].push(data.sum[i]);
					}else{
						breed_data.push([data.sum[i]])
					}
					
				}
				console.log(breed_data)
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="6">第一烤</th><th colspan="6">第二烤</th><th colspan="6">第三烤</th><th colspan="6">第四烤</th><th colspan="6">第五烤</th><th colspan="6">第六烤</th></tr><tr><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>装烟量</th><th>竿数</th><th>照片</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      scrollX: true,
			      language: {
			        search: '',//右上角的搜索文本，可以写html标签
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "",//左下角的信息显示，大写的词为关键字。
			        infoEmpty: "",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			      },
			      data:breed_data,
			      columns:[
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	return data[0].room_no;
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return data[0].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return data[0].work_started + " 至 " + data[0].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return data[0].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return data[0].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return data[0].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return '<button class="img">查看<span style="display:none;">'+data[0].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return data[1].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return data[1].work_started + " 至 " + data[1].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return data[1].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return data[1].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return data[1].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return '<button class="img">查看<span style="display:none;">'+data[1].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }}, 
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return data[2].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return data[2].work_started + " 至 " + data[2].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return data[2].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return data[2].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return data[2].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return '<button class="img">查看<span style="display:none;">'+data[2].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return data[3].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return data[3].work_started + " 至 " + data[3].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return data[3].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return data[3].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return data[3].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return '<button class="img">查看<span style="display:none;">'+data[3].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return data[4].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return data[4].work_started + " 至 " + data[4].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return data[4].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return data[4].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return data[4].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return '<button class="img">查看<span style="display:none;">'+data[4].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return data[5].party_b;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return data[5].work_started + " 至 " + data[5].work_finished;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return data[5].breed;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return data[5].sum;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return data[5].packing_amount;
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return '<button class="img">查看<span style="display:none;">'+data[5].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }}

			      ],
			      initComplete: function(data) {
			      	$(".img").on('click',function(){
			      		var p_id = $(this).find('span').text();
			      		$.ajax({
			      			type:"get",
							url:"/packing_detail/"+detail_code,
							dataType:'json',
							data:{
								p_id: p_id
							},
							success:function(data){
								console.log(data)
								var a_hrefs = $("#Modal").find("a");
								var imgs = $("#Modal").find("img");
								var images = data.images;
								for(var i=0;i<imgs.length;i++){
									$(imgs[i]).attr("src","http://120.25.101.68:9090/"+images[i].files+"/"+images[i].image_file_name)
									$(a_hrefs[i]).attr("href","http://120.25.101.68:9090/"+images[i].files+"/"+images[i].image_file_name)
								}
								$("#Modal").modal('toggle');
							}
			      		})
		        		
		        	});
			      }
				});
			}
		});
		
	}else if($(e).hasClass("category")){
		data.type = 'category';
		$.ajax({
			type:"get",
			url:"/packing_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var analysis_data = [];
				var map = {};
				map.room_no = data.category[0].room_no;
				map.same = 0;
				map.mix = 0;
				if($.trim(data.category[0].category) == "同杆/夹同质"){
					map.same = data.category[0].sum;
				}else if($.trim(data.category[0].category) == "混编"){
					map.mix = data.category[0].sum;
				}
				analysis_data.push(map);
				for(var i=1; i<data.category.length; i++){
					var status = false;
					var _x = null;
					for(var j=0; j<analysis_data.length; j++){
						if(data.category[i].room_no == analysis_data[j].room_no){
							status = true;
							_x = j;
						}
					}
					if(status){
						if($.trim(data.category[i].category) == "同杆/夹同质"){
							analysis_data[_x].same += data.category[i].sum;
						}else if($.trim(data.category[i].category) == "混编"){
							analysis_data[_x].mix += data.category[i].sum;
						}
					}else{
						var map = {};
						map.room_no = data.category[i].room_no;
						map.same = 0;
						map.mix = 0;
						if($.trim(data.category[i].category) == "同杆/夹同质"){
							map.same = data.category[i].sum;
						}else if($.trim(data.category[i].category) == "混编"){
							map.mix = data.category[i].sum;
						}
						analysis_data.push(map);
					}
				}
				console.log(analysis_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="2">同杆/夹同质</th><th colspan="2">混编</th></tr><tr><th>总重</th><th>占比</th><th>总重</th><th>占比</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      language: {
			        search: '',//右上角的搜索文本，可以写html标签
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "",//左下角的信息显示，大写的词为关键字。
			        infoEmpty: "",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			      },
			      data:analysis_data,
			      columns:[
			        {data:'room_no'},
			        {data:'same',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'same',render:function(data,type,full){
			        	var sum = full.same+full.mix;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }},
			        {data:'mix',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'mix',render:function(data,type,full){
			        	var sum = full.same+full.mix;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }}     
			      ]
				});
			}
		});
	}else if($(e).hasClass("uniformity")){
		data.type = 'uniformity';
		$.ajax({
			type:"get",
			url:"/packing_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var analysis_data = [];
				var map = {};
				map.room_no = data.uniformity[0].room_no;
				map.junyun = 0;
				map.m_x = 0;
				map.x_m = 0;
				if($.trim(data.uniformity[0].uniformity) == "均匀"){
					map.junyun = data.uniformity[0].sum;
				}else if($.trim(data.uniformity[0].uniformity) == "前密后稀"){
					map.m_x = data.uniformity[0].sum;
				}else if($.trim(data.uniformity[0].uniformity) == "前稀后密"){
					map.x_m = data.uniformity[0].sum;
				}
				analysis_data.push(map);
				for(var i=1; i<data.uniformity.length; i++){
					var status = false;
					var _x = null;
					for(var j=0; j<analysis_data.length; j++){
						if(data.uniformity[i].room_no == analysis_data[j].room_no){
							status = true;
							_x = j;
						}
					}
					if(status){
						if($.trim(data.uniformity[i].uniformity) == "均匀"){
							analysis_data[_x].junyun += data.uniformity[i].sum;
						}else if($.trim(data.uniformity[i].uniformity) == "前密后稀"){
							analysis_data[_x].m_x += data.uniformity[i].sum;
						}else if($.trim(data.uniformity[i].uniformity) == "前稀后密"){
							analysis_data[_x].x_m += data.uniformity[i].sum;
						}
					}else{
						var map = {};
						map.room_no = data.uniformity[i].room_no;
						map.junyun = 0;
						map.m_x = 0;
						map.x_m = 0;
						if($.trim(data.uniformity[i].uniformity) == "均匀"){
							map.junyun = data.uniformity[i].sum;
						}else if($.trim(data.uniformity[i].uniformity) == "前密后稀"){
							map.m_x = data.uniformity[i].sum;
						}else if($.trim(data.uniformity[i].uniformity) == "前稀后密"){
							map.x_m = data.uniformity[i].sum;
						}
						analysis_data.push(map);
					}
				}
				console.log(analysis_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="2">均匀</th><th colspan="2">前密后稀</th><th colspan="2">前稀后密</th></tr><tr><th>总重</th><th>占比</th><th>总重</th><th>占比</th><th>总重</th><th>占比</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      language: {
			        search: '',//右上角的搜索文本，可以写html标签
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "",//左下角的信息显示，大写的词为关键字。
			        infoEmpty: "",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			      },
			      data:analysis_data,
			      columns:[
			        {data:'room_no'},
			        {data:'junyun',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'junyun',render:function(data,type,full){
			        	var sum = full.junyun+full.m_x+full.x_m;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }},
			        {data:'m_x',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'m_x',render:function(data,type,full){
			        	var sum = full.junyun+full.m_x+full.x_m;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }},
			        {data:'x_m',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'x_m',render:function(data,type,full){
			        	var sum = full.junyun+full.m_x+full.x_m;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }}       
			      ]
				});
			}
		});
	}else if($(e).hasClass("packing_type")){
		data.type = 'packing_type';
		$.ajax({
			type:"get",
			url:"/packing_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var analysis_data = [];
				var map = {};
				map.room_no = data.packing_type[0].room_no;
				map.yizhi = 0;
				map.buyizhi = 0;
				if($.trim(data.packing_type[0].packing_type) == "各竿/夹量基本一致"){
					map.yizhi = data.packing_type[0].sum;
				}else if($.trim(data.packing_type[0].packing_type) == "各竿/夹量不一致"){
					map.buyizhi = data.packing_type[0].sum;
				}
				analysis_data.push(map);
				for(var i=1; i<data.packing_type.length; i++){
					var status = false;
					var _x = null;
					for(var j=0; j<analysis_data.length; j++){
						if(data.packing_type[i].room_no == analysis_data[j].room_no){
							status = true;
							_x = j;
						}
					}
					if(status){
						if($.trim(data.packing_type[i].packing_type) == "各竿/夹量基本一致"){
							analysis_data[_x].yizhi += data.packing_type[i].sum;
						}else if($.trim(data.packing_type[i].packing_type) == "各竿/夹量不一致"){
							analysis_data[_x].buyizhi += data.packing_type[i].sum;
						}
					}else{
						var map = {};
						map.room_no = data.packing_type[i].room_no;
						map.yizhi = 0;
						map.buyizhi = 0;
						if($.trim(data.packing_type[i].packing_type) == "各竿/夹量基本一致"){
							map.yizhi = data.packing_type[i].sum;
						}else if($.trim(data.packing_type[i].packing_type) == "各竿/夹量不一致"){
							map.buyizhi = data.packing_type[i].sum;
						}
						analysis_data.push(map);
					}
				}
				console.log(analysis_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="2">均匀</th><th colspan="2">不均匀</th></tr><tr><th>总重</th><th>占比</th><th>总重</th><th>占比</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      language: {
			        search: '',//右上角的搜索文本，可以写html标签
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "",//左下角的信息显示，大写的词为关键字。
			        infoEmpty: "",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			      },
			      data:analysis_data,
			      columns:[
			        {data:'room_no'},
			        {data:'yizhi',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'yizhi',render:function(data,type,full){

			        	var sum = full.yizhi+full.buyizhi;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }},
			        {data:'buyizhi',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'buyizhi',render:function(data,type,full){
			        	var sum = full.yizhi+full.buyizhi;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }}     
			      ]
				});
			}
		});
	}else if($(e).hasClass("status")){
		data.type = 'status';
		$.ajax({
			type:"get",
			url:"/packing_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var analysis_data = [];
				var map = {};
				map.room_no = data.status[0].room_no;
				map.true = 0;
				map.notrue = 0;
				if($.trim(data.status[0].status) == "f"){
					map.true = data.status[0].sum;
				}else if($.trim(data.status[0].status) == "t"){
					map.notrue = data.status[0].sum;
				}
				analysis_data.push(map);
				for(var i=1; i<data.status.length; i++){
					var status = false;
					var _x = null;
					for(var j=0; j<analysis_data.length; j++){
						if(data.status[i].room_no == analysis_data[j].room_no){
							status = true;
							_x = j;
						}
					}
					if(status){
						if($.trim(data.status[i].status) == "f"){
							analysis_data[_x].true += data.status[i].sum;
						}else if($.trim(data.status[i].status) == "t"){
							analysis_data[_x].notrue += data.status[i].sum;
						}
					}else{
						var map = {};
						map.room_no = data.status[i].room_no;
						map.true = 0;
						map.notrue = 0;
						if($.trim(data.status[i].status) == "f"){
							map.true = data.status[i].sum;
						}else if($.trim(data.status[i].status) == "t"){
							map.notrue = data.status[i].sum;
						}
						analysis_data.push(map);
					}
				}
				console.log(analysis_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="2">正确</th><th colspan="2">错误</th></tr><tr><th>总重</th><th>占比</th><th>总重</th><th>占比</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      language: {
			        search: '',//右上角的搜索文本，可以写html标签
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "",//左下角的信息显示，大写的词为关键字。
			        infoEmpty: "",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			      },
			      data:analysis_data,
			      columns:[
			        {data:'room_no'},
			        {data:'true',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'true',render:function(data,type,full){

			        	var sum = full.true+full.notrue;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }},
			        {data:'notrue',render:function(data){
			        	return data.toFixed(2);
			        }},
			        {data:'notrue',render:function(data,type,full){
			        	var sum = full.true+full.notrue;
			        	var p = (data/sum*100).toFixed(2);
			        	return p+'%';
			        }}       
			      ]
				});
			}
		});
	}

}

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
	            		return data;
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

function initChart(packing_weight, packing_sum, packing_rooms, packing_category, packing_type, uniformity, status){
	
	$('#container').highcharts({  //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'  //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '编装烟统计'  //指定图表标题
        },
        credits: { enabled: false},
        xAxis: {
            categories: ['装烟量','杆数']  //指定x轴分组
        },
        yAxis: {
            title: {
                text: ''  //指定y轴的标题
            },
            labels: {
             	formatter:function(){
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
            	y:packing_sum
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
            	y:packing_rooms
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