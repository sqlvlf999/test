(function(){
	var detail_code = $(".detail_code").text();
	$.ajax({
		type:"get",
		url:"/dry_detail/"+detail_code,
		dataType:'json',
		success:function(data){
			console.log(data);
			if(detail_code.length == 4){
				$(".active").text(data.city[0].title+"干烟数据统计");
			}else if(detail_code.length == 6){
				$(".active").text(data.county[0].title+"干烟数据统计");
			}else if(detail_code.length == 10){
				$(".active").text(data.station[0].title+"干烟数据统计");
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

			initData(data);
		}
	})
})()

/*
 * 烤房数据统计
 */
function room_analysis(e,room_no,detail_code){
	var data = {
		station_code:detail_code,
		room_no:room_no
	};
	if($(e).hasClass("sum")){
		data.type = 'sum';
		$.ajax({
			type:"get",
			url:"/dry_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				var breed_data = [[data.dry_sum[0]]];
				for(var i=1; i<data.dry_sum.length; i++){
					if(data.dry_sum[i].room_no == breed_data[breed_data.length-1][breed_data[breed_data.length-1].length-1].room_no){
						breed_data[breed_data.length-1].push(data.dry_sum[i]);
					}else{
						breed_data.push([data.dry_sum[i]])
					}
				}
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="5">第一烤</th><th colspan="5">第二烤</th><th colspan="5">第三烤</th><th colspan="5">第四烤</th><th colspan="5">第五烤</th><th colspan="5">第六烤</th></tr><tr><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th><th>烟农</th><th>时间</th><th>品种</th><th>重量</th><th>照片</th></tr></thead></table></div>');
				$("#room_analysis").DataTable({
				  paging: true,//分页
			      ordering: true,//是否启用排序
			      searching: false,//搜索
			      scrollX:true,
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
			        		return'<button class="img">查看<span style="display:none;">'+data[4].id+'</span></button>';
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
			        		return '<button class="img">查看<span style="display:none;">'+data[5].id+'</span></button>';
			        	}else{
			        		return " ";
			        	}
			        }}       
			      ],
			      initComplete: function(data) {
			      	$(".img").on('click',function(){
			      		var d_id = $(this).find('span').text();
			      		$.ajax({
			      			type:"get",
							url:"/dry_detail/"+detail_code,
							dataType:'json',
							data:{
								d_id: d_id
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
	}else if($(e).hasClass("part")){
		data.type = 'part';
		$.ajax({
			type:"get",
			url:"/dry_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);

				var part_data = [[data.part[0]]];
				for(var i=1; i<data.part.length; i++){
					if(data.part[i].room_no == part_data[part_data.length-1][part_data[part_data.length-1].length-1].room_no){
						part_data[part_data.length-1].push(data.part[i]);
					}else{
						part_data.push([data.part[i]])
					}
				}



				console.log(part_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="3">烤房编号</th><th colspan="6">第一烤</th><th colspan="6">第二烤</th><th colspan="6">第三烤</th><th colspan="6">第四烤</th><th colspan="6">第五烤</th><th colspan="6">第六烤</th></tr><tr><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th><th colspan="2">上部叶</th><th colspan="2">中部叶</th><th colspan="2">下部叶</th></tr><tr><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th><th>重量</th><th>占比</th></tr></thead></table></div>');
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
			      data:part_data,
			      columns:[
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	return data[0].room_no;
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[0].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[0].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[0].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		if($.trim(data[0].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[1].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[1].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[1].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		if($.trim(data[1].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[2].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[2].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[2].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		if($.trim(data[2].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[3].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[3].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[3].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		if($.trim(data[3].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[4].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[4].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[4].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		if($.trim(data[4].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "上部叶"){
				        		return 0;
				        	}else{
				        		return data[5].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "上部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "中部叶"){
				        		return 0;
				        	}else{
				        		return data[5].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "中部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "下部叶"){
				        		return 0;
				        	}else{
				        		return data[5].sum;
				        	}
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		if($.trim(data[5].part) != "下部叶"){
				        		return '0.00%';
				        	}else{
				        		return '100%';
				        	}
			        	}else{
			        		return "";
			        	}
			        }},    
			      ]
				});
			}
		});
	}else if($(e).hasClass("quality")){
		data.type = 'quality';
		$.ajax({
			type:"get",
			url:"/dry_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="3">烤房编号</th><th colspan="4">第一烤</th><th colspan="4">第二烤</th><th colspan="4">第三烤</th><th colspan="4">第四烤</th><th colspan="4">第五烤</th><th colspan="4">第六烤</th></tr><tr><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th><th colspan="1">正组</th><th colspan="1">青烟</th><th colspan="1">杂色</th><th colspan="1">不列级</th></tr><tr><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th><th>重量</th></tr></thead></table></div>');
				var quality_data = [[data.quality[0]]];
				for(var i=1; i<data.quality.length; i++){
					if(data.quality[i].room_no == quality_data[quality_data.length-1][quality_data[quality_data.length-1].length-1].room_no){
						quality_data[quality_data.length-1].push(data.quality[i]);
					}else{
						quality_data.push([data.quality[i]])
					}
				}



				console.log(quality_data);
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
			      data:quality_data,
			      columns:[
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	return data[0].room_no;
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return parseFloat(data[0].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return parseFloat(data[0].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return parseFloat(data[0].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[0]){
			        		return parseFloat(data[0].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return parseFloat(data[1].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return parseFloat(data[1].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return parseFloat(data[1].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[1]){
			        		return parseFloat(data[1].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return parseFloat(data[2].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return parseFloat(data[2].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return parseFloat(data[2].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[2]){
			        		return parseFloat(data[2].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return parseFloat(data[3].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return parseFloat(data[3].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return parseFloat(data[3].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[3]){
			        		return parseFloat(data[3].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return parseFloat(data[4].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return parseFloat(data[4].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return parseFloat(data[4].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[4]){
			        		return parseFloat(data[4].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return parseFloat(data[5].zz).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return parseFloat(data[5].q).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return parseFloat(data[5].zs).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }},
			        {data:'[]',sWidth:"40px",render:function(data,index,row){
			        	if(data[5]){
			        		return parseFloat(data[5].wq).toFixed(2);
			        	}else{
			        		return " ";
			        	}
			        }}    
			      ]
				});
			}
		});
	}else if($(e).hasClass("breed")){
		data.type = 'breed';
		$.ajax({
			type:"get",
			url:"/dry_detail/"+detail_code,
			dataType:'json',
			data:data,
			success:function(data){
				console.log(data);

				var breed_data = [[data.breed[0]]];
				for(var i=1; i<data.breed.length; i++){
					if(data.breed[i].room_no == breed_data[breed_data.length-1][breed_data[breed_data.length-1].length-1].room_no){
						breed_data[breed_data.length-1].push(data.breed[i]);
					}else{
						breed_data.push([data.breed[i]])
					}
				}



				console.log(breed_data);
				$("#room_details").remove();
				$(".room_row").find(".box-body").append('<div class="col-md-12" id="room_details"><table class="table table-striped table-hover" id="room_analysis"><thead><tr><th rowspan="2">烤房编号</th><th colspan="2">第一烤</th><th colspan="2">第二烤</th><th colspan="2">第三烤</th><th colspan="2">第四烤</th><th colspan="2">第五烤</th><th colspan="2">第六烤</th></tr><tr><th>品种</th><th>重量</th><th>品种</th><th>重量</th><th>品种</th><th>重量</th><th>品种</th><th>重量</th><th>品种</th><th>重量</th><th>品种</th><th>重量</th></tr></thead></table></div>');
				
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
			        {data:'[]',render:function(data,index,row){
			        	return data[0].room_no;
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[0]){
				        	return data[0].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[0]){
				        	return data[0].sum;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[1]){
				        	return data[1].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[1]){
				        	return data[1].sum;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[2]){
				        	return data[2].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[2]){
				        	return data[2].sum;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[3]){
				        	return data[3].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[3]){
				        	return data[3].sum;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[4]){
				        	return data[4].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[4]){
				        	return data[4].sum;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[5]){
				        	return data[5].breed;
			        	}else{
			        		return "";
			        	}
			        }},
			        {data:'[]',render:function(data,index,row){
			        	if(data[5]){
				        	return data[5].sum;
			        	}else{
			        		return "";
			        	}
			        }} 
			      ]
				});
			}
		});
	}
}

/*
 * 市县级表格数据统计
 */
function initData(data){
			/*
			 * 定义统计数据
			 */
			var breed_sum = 0;  //干烟总量
			var breed_statistic = [];  //品种统计数据
			var quality_statistic = [];  //品质统计数据
			var part_statistic = [];  //部位统计数据
			var tTrolleys_data = [];  //表格数据
			var tTrolleys2_data = [];  //表格数据

			/*
			 * 按烟品种统计数据
			 */
			for(var i=0; i<data.by_breed.length; i++){
				var map = {};
				map.name = data.by_breed[i].breed;
				map.y = parseInt(data.by_breed[i].sum);
				breed_statistic.push(map);
				breed_sum += parseInt(data.by_breed[i].sum);
			}
			breed_statistic[0].sliced = true;
			breed_statistic[0].selected = true;

			//按部位统计数据
			for(var i=0;i<data.by_part.length;i++){
				var map = {};
				map.name = data.by_part[i].part;
				map.y = parseInt(data.by_part[i].sum);
				part_statistic.push(map);
			}
			part_statistic[0].sliced = true;
			part_statistic[0].selected = true;

			//按质量统计数据
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

			//初始化统计图表
			initChart( breed_sum, breed_statistic, part_statistic, quality_statistic );

			//表格数据统计
			for(var i=0;i<data.by_breed.length;i++){
				var map = {};
				map.breed = data.by_breed[i].breed;
				map.weight_sum = parseInt(data.by_breed[i].sum);
				tTrolleys_data.push(map);
				$(".breed_tr").append("<th>"+breed_statistic[i].name+"</th>");
			}

			for(var i=0;i<data.by_part.length;i++){
				var map = {};
				map.part = data.by_part[i].part;
				map.weight_sum = parseInt(data.by_part[i].sum);
				var breed = [];
				for(var j=0;j<data.by_breed.length;j++){
					breed.push({
						name: data.by_breed[j].breed,
						sum: 0
					})
				}
				map.breed = breed;
				tTrolleys2_data.push(map);
			}

			//tTrolleys表格数据总计
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
						if($.trim(data.by_breed_part[i].part) == "上部叶"){
							tTrolleys_data[j].up_leaf_sum = data.by_breed_part[i].sum;
						}else if($.trim(data.by_breed_part[i].part) == "中部叶"){
							tTrolleys_data[j].middle_leaf_sum = data.by_breed_part[i].sum;
						}else if($.trim(data.by_breed_part[i].part) == "下部叶"){
							tTrolleys_data[j].down_leaf_sum = data.by_breed_part[i].sum;
						}
					}
				}

			}
			console.log(tTrolleys_data)
			//tTrolleys2表格数据总计
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
			console.log(tTrolleys2_data);
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
			
			console.log(tTrolleys2_data)
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