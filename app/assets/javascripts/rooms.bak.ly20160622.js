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
            for (var i = 0; i < data.stations.length; i++) {
                $("#stations").append("<option value='" + data.stations[i].id + "''>" + data.stations[i].title + "</option>")
            }
        }
    }) $("#search_btn").click(function() {
        var addresses = $("#addresses").val();
        var stations = $("#stations").val();
        var protocolStartDate = $("#protocolStartDate").val();
        var protocolEndDate = $("#protocolEndDate").val();
        //console.log(addresses+"",stations+"",protocolStartDate+"",protocolEndDate+"")
        if (addresses == "" || stations == "" || protocolStartDate == "" || protocolEndDate == "") {
            alert("请输入完整搜索条件");
        } else {
            $(".row1").animate({
                'margin-top': 0
            }) $(".line").append('<div class="row"><div class="col-md-12"><div id="chartContainer" style="height: 400px; width: 100%;"></div></div></div>') var url = "http://120.25.101.68:8081/stations/" + stations + "/addresses/" + addresses + "/status?startTime=" + protocolStartDate + "&endTime=" + protocolEndDate;
            $("#searchModal").modal('toggle');
            $.ajax({
                type: "get",
                url: url,
                /*"http://120.25.101.68:8081/stations/6/addresses/00001/status?startTime=2016-6-1&endTime=2016-7-1"*/
                dataType: 'json',
                success: function(data) {
                    var opt = "<div class='col-md-12' style='height:50px;'><span>开始日期:" + protocolStartDate + "</span><span>结束日期:" + protocolEndDate + "</span></div>"$(".date-info").html(opt);
                    $("#searchModal").modal('toggle');
                    var data = data.result;
                    var dryPoints = [];
                    var wetPoints = [];
                    var windPoints = [];
                    var hSpeedPoints = [];
                    var lSpeedPoints = [];
//                    console.log(data[5524]);
//                    console.log(data.length);
//                    for (var i = 0; i < data.length; i++) {
//                        if (i > 5500) {
//                            console.log(data[i].createdAt)
//                        }
//                    }
                    for (var i = 0; i < data.length; i += 59) {
                        var s = data[i].alarm;
                        var ss = data[i].normal;
                        var alarm = s.split(",");
                        var normal = ss.split(",");
                        var wetball = (parseFloat(alarm[6]) * 256 + parseFloat(alarm[7])) / 10;
                        var dryball = (parseFloat(alarm[4]) * 256 + parseFloat(alarm[5])) / 10;
                        var wind_door_status = getBits(normal[10], 0);
                        var high_speed = getBits(normal[10], 6);
                        var low_speed = getBits(normal[10], 7);
                        var dateTime = data[i].createdAt.split('.')[0];
                        var date = dateTime.split('T')[0];
                        var time = dateTime.split('T')[1];
                        var object = {
                            createdAt: data[i].createdAt.split('.')[0],
                            dry: dryball,
                            wet: wetball
                        };
                        var createdAt = (new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2], time.split(':')[0], time.split(':')[1] - 1, time.split(':')[2])).getTime();
                        dryPoints.push({
                            x: createdAt,
                            y: dryball
                        });
                        wetPoints.push({
                            x: createdAt,
                            y: wetball
                        });
                        windPoints.push({
                            x: createdAt,
                            y: wind_door_status
                        });
                        hSpeedPoints.push({
                            x: createdAt,
                            y: high_speed
                        });
                        lSpeedPoints.push({
                            x: createdAt,
                            y: low_speed
                        });
                    }

                    var chart = new CanvasJS.Chart("chartContainer", {
                        culture: "es",
                        animationEnabled: true,
                        axisX: {
                            gridColor: "Silver",
                            tickColor: "silver",
                            interval: 1,
                            intervalType: "munite",
                            valueFormatString: "YYYY-MM-DD HH:mm:ss",
                            labelAngle: -50
                        },
                        toolTip: {
                            shared: true,
                            contentFormatter: function(e) {
                                var content = " ";
                                for (var i = 0; i < e.entries.length; i++) {
                                    content += e.entries[i].dataSeries.name + " " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                    content += "<br/>";
                                    if (i == e.entries.length - 1) {
                                        //console.log(e.entries[i].dataPoint.x)
                                        //console.log(format(e.entries[i].dataPoint.x, 'yyyy-MM-dd HH:mm:ss'))
                                        var opt = "<strong>" + format(e.entries[i].dataPoint.x, 'yyyy-MM-dd HH:mm:ss') + "</strong>"opt += "<br/>" + content
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
                        legend: {
                            verticalAlign: "center",
                            horizontalAlign: "right"
                        },
                        data: [{
                            type: "line",
                            visible: true,
                            showInLegend: true,
                            lineThickness: 2,
                            markerSize: 1,
                            name: "干球实际温度",
                            markerType: "square",
                            color: "#F08080",
                            valueFormatString: "YYYY-MM-DD:HH:mm:ss",
                            dataPoints: dryPoints
                        },
                        {
                            type: "line",
                            visible: true,
                            showInLegend: true,
                            name: "湿球实际温度",
                            color: "#20B2AA",
                            lineThickness: 2,
                            markerSize: 1,
                            xValueType: "dateTime",
                            dataPoints: wetPoints
                        },
                        {
                            type: "line",
                            visible: false,
                            showInLegend: true,
                            name: "风门状态",
                            color: "#CD2626",
                            lineThickness: 2,
                            markerSize: 1,
                            xValueType: "dateTime",
                            dataPoints: windPoints
                        },
                        {
                            type: "line",
                            visible: false,
                            showInLegend: true,
                            name: "循环风机高速",
                            color: "#CD8C95",
                            lineThickness: 2,
                            markerSize: 1,
                            xValueType: "dateTime",
                            dataPoints: hSpeedPoints
                        },
                        {
                            type: "line",
                            visible: false,
                            showInLegend: true,
                            name: "循环风机低速",
                            color: "#EEEE00",
                            lineThickness: 2,
                            markerSize: 1,
                            xValueType: "dateTime",
                            dataPoints: lSpeedPoints
                        }],
                        legend: {
                            cursor: "pointer",
                            itemclick: function(e) {
                                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                    e.dataSeries.visible = false;
                                } else {
                                    e.dataSeries.visible = true;
                                }
                                chart.render();
                            }
                        }
                    });
                    chart.render();
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