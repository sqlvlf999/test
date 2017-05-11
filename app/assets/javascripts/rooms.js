(function($) {
    $('#protocolStartDate').datepicker({
        format: 'yyyy-mm-dd'
    });
    $('#protocolEndDate').datepicker({
        format: 'yyyy-mm-dd'
    });

    
    
    
    $.ajax({
        type: "get",
        url: "/rooms",
        dataType: 'json',
        success: function(data) {
            $("#stations").append("<option></option>")
            for (var i = 0; i < data.stations.length; i++) {
                $("#stations").append("<option value='" + data.stations[i].id + "''>" + data.stations[i].title + "</option>")
            }
        }
    });

    $("#stations").change(function(){
        var station_id = $("#stations").val();
        $("#addresses").empty();
        var data = {
            station_id:station_id
        }
        $.ajax({
            type: "get",
            url: '/rooms',
            dataType: 'json',
            data: data,
            success: function(data){
                console.log(data);
                for(var i=0;i<data.rooms.length;i++){
                    $("#addresses").append("<option value='" + data.rooms[i].address + "''>" + data.rooms[i].address + "</option>");
                }
            }
        })
        
    })

    $("#search_btn").click(function() {
        //清楚上一次的元素
        $(".line").find("#room_line").remove();
        $("#date_range").remove();
        $(".standard_line").remove();
        //获取烤房号
        var addresses = $("#addresses").val();
        
        //获取工厂号
        var stations = $("#stations").val();
        
        //获取开始日期
        var protocolStartDate = $("#protocolStartDate").val();
        
        //获取结束日期
        var protocolEndDate = $("#protocolEndDate").val();

        
        
        //console.log(addresses+"",stations+"",protocolStartDate+"",protocolEndDate+"")
        if (addresses == "" || stations == "" || protocolStartDate == "" || protocolEndDate == "") {
            alert("请输入完整搜索条件");
        } else {
            //弹出等待提示框
            $("#searchModal").modal('toggle');

            //拼接url字符串
            var url = "http://120.25.101.68:8081/stations/" + stations + "/addresses/" + addresses + "/status?startTime=" + protocolStartDate + "&endTime=" + protocolEndDate;
            
            //ajax获取曲线数据
            $.ajax({
                type: "get",
                url: url,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    if(data.result.length == 0){
                        //remove等待提示框
                        $("#searchModal").modal('toggle');
                        alert("无搜索结果！");
                    }else{
                        //展开图表区域
                        $(".row1").animate({
                            'margin-top': 0
                        });
                        
                        //新建曲线区域
                        $(".line").append('<div class="row" id="room_line"><div class="col-md-12"><div id="chartContainer" style="height: 400px; width: 100%;"></div></div></div>');
                        
                        //建立可视化日期范围区域
                        var opt = "<div id='date_range' class='col-md-12' style='height:50px;'><span>开始日期:" + protocolStartDate + "</span><span>结束日期:" + protocolEndDate + "</span></div>";
                        $(".date-info").html(opt);

                        //建立目标曲线区域
                        var opt2 = '<div class="row standard_line"><div id="chartContainer2" style="height: 400px; width: 100%;"></div></div>';
                        $(".content").append(opt2);


                        //remove等待提示框
                        $("#searchModal").modal('toggle');

                        //获取曲线数据
                        var data = data.result;

                        //定义曲线点的容器
                        var dataPoints=[];

                        //定义开始时间
                        var StartDateTime; 
                        StartDateTime=new Date(protocolStartDate.split('-')[0], protocolStartDate.split('-')[1] - 1, protocolStartDate.split('-')[2], '00', '00', '00');

                        //定义结束时间
                        var EndDateTime;
                        EndDateTime=new Date(protocolEndDate.split('-')[0], protocolEndDate.split('-')[1]-1, protocolEndDate.split('-')[2], '23', '59', '59');
                        
                        //定义点的起始时间
                        var lastdate=0;

                        //定义干球曲线
                        var dry_ball_line = {
                            type: "spline",
                            visible: true,
                            showInLegend: true,
                            lineThickness: 1,
                            name: "干球实际温度",
                            markerSize: 1,
                            dataPoints: []
                        };
                        dataPoints.push(dry_ball_line);

                        //定义湿球曲线
                        var wet_ball_line = {
                            type: "spline",
                            visible: true,
                            showInLegend: true,
                            name: "湿球实际温度",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        };
                        dataPoints.push(wet_ball_line);

                        //定义循环风机高速曲线
                        var high_speed_line = {
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "循环风机高速",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        };
                        dataPoints.push(high_speed_line);

                        //定义循环风机低俗曲线
                        var low_speed_line = {
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "循环风机低速",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        }
                        dataPoints.push(low_speed_line);

                        //定义风门状态曲线
                        var wind_door_status_line ={
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "风门状态",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        }
                        dataPoints.push(wind_door_status_line);

                        //定义助燃风机状态
                        var combustion_fan_status_line = {
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "助燃风机状态",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        }
                        dataPoints.push(combustion_fan_status_line);

                        //标准干球温度曲线
                        var standard_dry_line = {
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "干球目标温度",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        }
                        dataPoints.push(standard_dry_line);

                        //标准湿球温度曲线
                        var standard_wet_line = {
                            type: "spline",
                            visible: false,
                            showInLegend: true,
                            name: "湿球目标温度",
                            lineThickness: 1,
                            markerSize: 1,
                            dataPoints: []
                        }
                        dataPoints.push(standard_wet_line);

                        for (var i = 0; i < data.length; i ++) {
                            /*
                             * 解析数据
                             */
                            var s = data[i].alarm;
                            var ss = data[i].normal;
                            var alarm = s.split(",");
                            var normal = ss.split(",");
                            var wetball = (parseFloat(alarm[6]) * 256 + parseFloat(alarm[7])) / 10;
                            var dryball = (parseFloat(alarm[4]) * 256 + parseFloat(alarm[5])) / 10;
                            var standard_dryball = (parseFloat(normal[0]) * 256 + parseFloat(normal[1])) / 10;
                            var standard_wetball = (parseFloat(normal[2]) * 256 + parseFloat(normal[3])) / 10;
                            var wind_door_status = getBits(normal[10], 0);
                            var combustion_fan_status = getBits(normal[10], 2);
                            var high_speed = getBits(normal[10], 6);
                            var low_speed = getBits(normal[10], 7);
                            var dateTime = data[i].createdAt.split('.')[0];
                            var date = dateTime.split('T')[0];
                            var time = dateTime.split('T')[1];
                            
                            var createdAt = (new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2], time.split(':')[0], time.split(':')[1] - 1, time.split(':')[2])).getTime() + 8*3600000;
                            if (dryball<1 || dryball>=80 || wetball<1 || wetball>=80)
                            {
                              continue;
                            }
                            if (lastdate==0){
                                lastdate=createdAt;
                                dataPoints[0].dataPoints.push({x: new Date(createdAt),y: dryball});
                                dataPoints[1].dataPoints.push({x: new Date(createdAt),y: wetball});
                                dataPoints[2].dataPoints.push({x: new Date(createdAt),y: high_speed});
                                dataPoints[3].dataPoints.push({x: new Date(createdAt),y: low_speed});
                                dataPoints[4].dataPoints.push({x: new Date(createdAt),y: wind_door_status});
                                dataPoints[5].dataPoints.push({x: new Date(createdAt),y: combustion_fan_status});

                                dataPoints[6].dataPoints.push({x: new Date(createdAt),y: standard_dryball});
                                dataPoints[7].dataPoints.push({x: new Date(createdAt),y: standard_wetball});
                            }
                            if (createdAt-lastdate>30000){
                                lastdate=createdAt;
                                dataPoints[0].dataPoints.push({x: new Date(createdAt),y: dryball});
                                dataPoints[1].dataPoints.push({x: new Date(createdAt),y: wetball});
                                dataPoints[2].dataPoints.push({x: new Date(createdAt),y: high_speed});
                                dataPoints[3].dataPoints.push({x: new Date(createdAt),y: low_speed});
                                dataPoints[4].dataPoints.push({x: new Date(createdAt),y: wind_door_status});
                                dataPoints[5].dataPoints.push({x: new Date(createdAt),y: combustion_fan_status});

                                dataPoints[6].dataPoints.push({x: new Date(createdAt),y: standard_dryball});
                                dataPoints[7].dataPoints.push({x: new Date(createdAt),y: standard_wetball});
                            }
                        } 
                        console.log(dataPoints);
                        var chart = new CanvasJS.Chart("chartContainer", {
                            culture: "es",
                            zoomEnabled:true,
                            animationEnabled: true,
                            exportEnabled: true,
                            axisX: {
                                interval: 1,
                                intervalType: "day",
                                labelFontSize: 5,
                                valueFormatString: "MM-DD",
                                labelAngle: -50,
                                minimum : StartDateTime,
                                maximum : EndDateTime,
                                viewportMinimum : StartDateTime,
                                viewportMaximum : EndDateTime
                            },
                            toolTip: {
                                shared: true,
                                contentFormatter: function(e) {
                                    var content = " ";
                                    for (var i = 0; i < e.entries.length; i++) {
                                        if(i == 2 || i == 3 || i == 4 || i == 5){
                                            content += e.entries[i].dataSeries.name + " ";
                                            if(e.entries[i].dataPoint.y == 1){
                                                content += "<strong>开启</strong><br/>"
                                            }else{
                                                content += "<strong>关闭</strong><br/>"
                                            }
                                        }else{
                                            content += e.entries[i].dataSeries.name + " " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                            content += "<br/>";
                                        }
                                        
                                        if (i == e.entries.length - 1) {
                                            //console.log(e.entries[i].dataPoint.x)
                                            //console.log(format(e.entries[i].dataPoint.x, 'yyyy-MM-dd HH:mm:ss'))
                                            var opt = "<strong>" + format(e.entries[i].dataPoint.x, 'yyyy-MM-dd HH:mm:ss') + "</strong>";
                                            opt += "<br/>" + content
                                        }
                                    }
                                    return opt;
                                }
                            },
                            theme: "theme2",
                            axisY: {
                                gridColor: "Silver",
                                tickColor: "silver",
                    
                            },
                            data: dataPoints,
                            legend: {
                                verticalAlign: "bottom",
                                cursor:"pointer",
                                fontSize: 14,
                                dockInsidePlotArea: false,
                                itemclick:function(e){
                                    var count = 0;
                                    for(var i=0;i<6;i++){
                                        if(chart.options.data[i].visible == true){
                                            count += 1;
                                        }
                                    }
                                    if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                        if(count > 1){
                                            e.dataSeries.visible = false; 
                                        }
                                    }
                                    else {
                                        e.dataSeries.visible = true;            
                                    }
                                    
                                    
                                    chart.render();
                                }
                            }
                        }); 
                        chart.render();

                        var chart2 = new CanvasJS.Chart("chartContainer2",{
                            culture: "es",
                            zoomEnabled:true,
                            animationEnabled: true,
                            exportEnabled: true,
                            title:{
                                text: $("#addresses").val()+"号烤房目标曲线",
                                fontSize: 20
                            },    
                            axisX:{
                                title: "时间线",
                                valueFormatString: "HH",
                                lineThickness: 1,
                                lineColor: "black",
                                labelFontColor: "black",
                                titleFontColor: "black"
                            },    
                            axisY:{ 
                                title: "温度",
                                includeZero: false,
                                suffix : "摄氏度",
                                lineColor: "#369EAD",
                                minimum : 30,
                                maximum : 70       
                            },
                            axisY2:{ 
                                title: "温度",
                                includeZero: false,
                                suffix : "摄氏度",
                                lineColor: "#C24642",
                                minimum : 30,
                                maximum : 70
                            },
                            legend: {
                                cursor:"pointer",
                                verticalAlign: "top",
                                fontSize: 14,
                                dockInsidePlotArea: true,
                                verticalAlign: "top",
                                itemclick:function(e){
                                  if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                    e.dataSeries.visible = false;
                                  }
                                  else {
                                    e.dataSeries.visible = true;            
                                  }
                                  chart2.render();
                                }
                            },
                            data: [{
                                type: "line",
                                showInLegend: true,
                                name:"干球目标曲线",
                                dataPoints: [
                                    { x: new Date(0 - 8*3600000), y: 36 },
                                    { x: new Date(2 * 3600000 - 8*3600000), y: 36 },
                                    { x: new Date(4 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(19 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(23 * 3600000 - 8*3600000), y: 40 },
                                    { x: new Date(25 * 3600000 - 8*3600000), y: 40 },
                                    { x: new Date(29 * 3600000 - 8*3600000), y: 42 },
                                    { x: new Date(31 * 3600000 - 8*3600000), y: 42 },
                                    { x: new Date(39 * 3600000 - 8*3600000), y: 46 },
                                    { x: new Date(43 * 3600000 - 8*3600000), y: 46 },
                                    { x: new Date(47 * 3600000 - 8*3600000), y: 48 },
                                    { x: new Date(49 * 3600000 - 8*3600000), y: 48 },
                                    { x: new Date(53 * 3600000 - 8*3600000), y: 50 },
                                    { x: new Date(55 * 3600000 - 8*3600000), y: 50 },
                                    { x: new Date(60 * 3600000 - 8*3600000), y: 54 },
                                    { x: new Date(65 * 3600000 - 8*3600000), y: 54 },
                                    { x: new Date(71 * 3600000 - 8*3600000), y: 60 },
                                    { x: new Date(73 * 3600000 - 8*3600000), y: 60 },
                                    { x: new Date(81 * 3600000 - 8*3600000), y: 68 },
                                    { x: new Date(93 * 3600000 - 8*3600000), y: 68 }
                                ]
                            },{
                                type: "line",
                                showInLegend: true,
                                name:"湿球目标曲线",
                                axisYType:"secondary",
                                dataPoints: [
                                    { x: new Date(0 - 8*3600000), y: 34 },
                                    { x: new Date(2 * 3600000 - 8*3600000), y: 34 },
                                    { x: new Date(4 * 3600000 - 8*3600000), y: 36 },
                                    { x: new Date(19 * 3600000 - 8*3600000), y: 36 },
                                    { x: new Date(23 * 3600000 - 8*3600000), y: 37 },
                                    { x: new Date(25 * 3600000 - 8*3600000), y: 37 },
                                    { x: new Date(29 * 3600000 - 8*3600000), y: 37.5 },
                                    { x: new Date(31 * 3600000 - 8*3600000), y: 37.5 },
                                    { x: new Date(39 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(43 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(47 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(49 * 3600000 - 8*3600000), y: 38 },
                                    { x: new Date(53 * 3600000 - 8*3600000), y: 39 },
                                    { x: new Date(55 * 3600000 - 8*3600000), y: 39 },
                                    { x: new Date(60 * 3600000 - 8*3600000), y: 39 },
                                    { x: new Date(65 * 3600000 - 8*3600000), y: 39 },
                                    { x: new Date(71 * 3600000 - 8*3600000), y: 40 },
                                    { x: new Date(73 * 3600000 - 8*3600000), y: 40 },
                                    { x: new Date(81 * 3600000 - 8*3600000), y: 42 },
                                    { x: new Date(93 * 3600000 - 8*3600000), y: 42 }
                                ]
                            }]
                        });
                        chart2.render();
                    }
                },
                error: function(){
                    //remove等待提示框
                    $("#searchModal").modal('toggle');
                    alert("无搜索结果！")
                }
            })
        }

    })

})(jQuery)

function getBits(s, y) {
    var j = parseInt(s);
    return (j >> y) & 0x01;
}
var format = function(time, format) {
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0': '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
    function(a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
        }
    })
}
