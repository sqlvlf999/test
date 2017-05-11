(function($){
    
    initKnob();
    ajaxRequest();

})(jQuery)

function initKnob(){
    $(".knob1").knob({
        width: 80,
        height: 80,
        thickness: 0.1,
        readonly: "readonly",
        fgColor: "#E81527"
    });

    $(".knob2").knob({
        width: 80,
        height: 80,
        thickness: 0.1,
        readonly: "readonly",
        fgColor: "#1FECC7"
    });

    $(".knob3").knob({
        width: 80,
        height: 80,
        thickness: 0.1,
        readonly: "readonly",
        fgColor: "#A675E9"
    });
}


function ajaxRequest(){
    $.ajax({
        type:"get",
        url:"/dashboard",
        dataType:'json',
        success:function(data){
            var code = $(".code").text();
            if(code.length == 2){
                $(".name").html("湖南省总体数据统计");
            }else if(code.length == 4){
                $(".name").html(data.city_name[0].title+"总体数据统计");
            }else if(code.length == 6){
                $(".name").html(data.station_name[0].title+"总体数据统计");
            }
            console.log(data)
            $("#yuefen").text(data.time[0]+"年");
            $(".des").text("("+data.time[0]+"年1月1日 至 今日)");
            /*
             * 应用烤房
             */
            //$("#used_room").text(data.used_room[0].count);
            $("#used_room").text(data.used_room[0].sum);

            /*
             * 应用面积
             */
            //$("#used_area").text(parseFloat(data.used_area[0].sum).toFixed(2));
            $("#used_area").text(data.used_area);

            /*
             * 鲜烟总量
             */
            $("#fresh_sum").text(parseFloat(data.fresh_sum[0].sum).toFixed(2));

            /*
             * 干烟总量
             */
            if(data.dry_sum[0].sum == null){
                $("#dry_sum").text('0');
            }else{
                $("#dry_sum").text(parseFloat(data.dry_sum[0].sum).toFixed(2));
            }

            /*
             * 平均每座烤房已烘烤房数
             * 平均每房烘烤公斤数
             */
            if(data.time[0] >= 2017){
                $(".average_room").text("平均每座烤房已烤"+parseInt(data.average_room[0].sum)+"房");
            }else{
                $(".average_room").text("平均每座烤房已烤"+parseInt(data.average_room[0].sum/data.used_room[0].sum)+"房");
            }
            $(".average_sum").text("平均每房烘烤鲜烟"+(((data.fresh_sum[0].sum).toFixed(2))/data.average_room[0].sum).toFixed(2)+"公斤");

            $(".using_room").text("正在红烤房数 "+data.using_rooms[0].count);
            $(".over_room").text("烘烤已结束烤房数 "+data.over_rooms[0].count);

            /*
             * 鲜烟成熟度
             */
            
            //欠熟烟重量
            var immature_weight = parseInt(data.maturity[0].weight_of_immature);
            //适熟烟重量
            var mature_weight = parseInt(data.maturity[0].weight_of_mature);
            //过熟烟重量
            var over_mature_weight = parseInt(data.maturity[0].weight_of_over_mature);
            //欠熟+适熟+过熟总量
            //var leaf_sum =  parseFloat(data.fresh_sum[0].sum);
            var leaf_sum = immature_weight + mature_weight + over_mature_weight;
            //欠熟烟叶比例
            var immature_p = (immature_weight/leaf_sum *100).toFixed(2);
            //适熟烟叶比例
            var mature_p = (mature_weight/leaf_sum *100).toFixed(2);
            //过熟烟叶比例
            var over_mature_p = (over_mature_weight/leaf_sum *100).toFixed(2);
            $(".mature").html("适熟烟叶 "+ mature_weight +"—"+mature_p+"%");
            $(".over_mature").html("过熟烟叶 "+ over_mature_weight +"—"+over_mature_p+"%");
            $(".immature").html("欠熟烟叶 "+ immature_weight +"—"+immature_p+"%");
            
            /*
             * 各县正组青烟杂色统计
             */
            var zz = 0;
            var q = 0;
            var zs = 0;
            for(var i=0;i<data.every_c_d_per.length;i++){
                zz += parseFloat(data.every_c_d_per[i].zz);
                q  += parseFloat(data.every_c_d_per[i].q);
                zs += parseFloat(data.every_c_d_per[i].zs);
            }
            var zz_p = (zz/data.dry_sum[0].sum).toFixed(3);
            var q_p = (q/data.dry_sum[0].sum).toFixed(3);
            var zs_p = (zs/data.dry_sum[0].sum).toFixed(3);
            //console.log(zz,q,zs,zz_p,q_p,zs_p);
            $(".zz").html("正组 " + zz.toFixed(2) + "公斤 — " + (zz_p*100).toFixed(2) + "%");
            $(".q").html("青烟 " + q.toFixed(2) + "公斤 — " + (q_p*100).toFixed(2) + "%");
            $(".zs").html("杂色 " + zs.toFixed(2) + "公斤 — " + (zs_p*100).toFixed(2) + "%");
            //本月烘烤房数
            $(".this_m_bake_r").text(data.this_m_use_room[0].count);
            //本月应用面积
            $(".this_used_area").text(parseInt(data.this_m_use_area[0].sum+0));
            //本月采收
            if(data.this_m_get[0].sum != null){
               $(".this_m_get").text(parseFloat(data.this_m_get[0].sum).toFixed(2)); 
            }else{
                $(".this_m_get").text(0);
            }
            //本月烘烤
            if(data.this_m_baking_sum[0].sum == null){
                $(".this_m_baking_sum").text('0');
            }else{
                $(".this_m_baking_sum").text(parseFloat(data.this_m_baking_sum[0].sum).toFixed(2));
            }
            
            
            
            
            //正组、青烟、杂色烟比例情况统计
            //console.log(data.every_c_d_per[0]);
            var counties = [];
            var zz_data = {
                name:'正组',
                data:[]
            };
            var zs_data = {
                name:'青烟',
                data:[]
            };
            var q_data = {
                name:'杂色',
                data:[]
            };
            for(var i=0;i<data.every_c_d_per.length;i++){
                counties.push(data.every_c_d_per[i].title);
                zz_data.data.push(parseFloat(data.every_c_d_per[i].zz));
                zs_data.data.push(parseFloat(data.every_c_d_per[i].zs));
                q_data.data.push(parseFloat(data.every_c_d_per[i].q));
            }
            var p_data = [zz_data,zs_data,q_data];
            //console.log(p_data)


            $('#container').highcharts({ 
                chart: { type: 'column' }, 
                credits: { enabled: false},
                title: { text: '各县正组、青烟、杂色烟比例情况' }, 
                xAxis: { categories: counties }, 
                yAxis: { min: 0, 
                         title: { text: '' },
                         labels: {
                         formatter:function(){
                            //return this.value+'kg';
                            return '';
                         }
                        } 
                }, 
                tooltip: { headerFormat: '<span style="font-size:10px">{point.key}</span><table>', 
                           pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} 公斤</b></td></tr>',
                           footerFormat: '</table>', shared: true, useHTML: true 
                        }, 
                plotOptions: { column: { pointPadding: 0.02, borderWidth: 0 } }, 
                series: p_data
            });
        }
    });
}

