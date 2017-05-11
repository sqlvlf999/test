class FreshController < ApplicationController
	def index
		now_time = Time.now
	 	if session[:code].to_s.length == 4
	 		if(now_time.year.to_s == '2016')
	 			#鲜烟总量
	 			@fresh_sum = StandardDatum.find_by_sql ['select sum(fresh_weight) from standard_data s where s.code like ?',"%"+session[:code].to_s+"%"]
	 		else
	 			#鲜烟总量
	 			@fresh_sum = Packing.find_by_sql ['select sum((cast(s.average_weight as FLOAT) *s.packing_amount)) sum from packings s LEFT JOIN tasks t on t."id"=s.task_id LEFT JOIN rooms r ON r. ID = t .room_id LEFT JOIN stations q on q."id"=r.station_id where s.created_at >= ? and q.code like ?',now_time.year.to_s+'-01-01',"%"+session[:code].to_s+"%"]
	 		end
	 		#按鲜烟品种统计
	 		@by_breed = FreshTobacco.find_by_sql ["select f.breed,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.breed","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位统计
		    @by_part = FreshTobacco.find_by_sql ["select f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.part","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟成熟度统计
		    @by_maturity = FreshTobacco.find_by_sql ["select sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ?","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟类型统计
		    @by_type = FreshTobacco.find_by_sql ["select f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.tobacco_type","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    
		    #按鲜烟品种、成熟度
		    @by_breed_maturity = FreshTobacco.find_by_sql ["select f.breed,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.breed","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟品种、类型
		    @by_breed_type = FreshTobacco.find_by_sql ["select f.breed,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.breed,f.tobacco_type","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟品种、部位
		    @by_breed_part = FreshTobacco.find_by_sql ['select f.breed,f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.breed,f.part',"%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位、类型
		    @by_part_type = FreshTobacco.find_by_sql ['select f.part,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.part,f.tobacco_type',"%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位、成熟度
		    @by_part_maturity = FreshTobacco.find_by_sql ["select f.part,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? and p.created_at >= ? group by f.part","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
			
			@city_name = City.find_by_sql ['select c.title from cities c where c.code = ?',session[:code].to_s]
			respond_to do |format|
		    	format.html
		    	format.json { render json: { by_breed: @by_breed,
		                                 	 by_part: @by_part,
		                                     by_maturity: @by_maturity,
		                                 	 by_type: @by_type,
		                                 	 by_breed_maturity: @by_breed_maturity,
		                                 	 by_breed_type: @by_breed_type,
		                                 	 by_breed_part: @by_breed_part,
		                                 	 by_part_type: @by_part_type,
		                                 	 by_part_maturity: @by_part_maturity,
		                                 	 city_name: @city_name,
		                                 	 fresh_sum: @fresh_sum }}
		  	end
	 	elsif session[:code].to_s.length == 2
	 		if(now_time.year.to_s == '2016')
	 			#鲜烟总量
	 			@fresh_sum = StandardDatum.find_by_sql ['select sum(fresh_weight) from standard_data s where s.code like ?',"%"+session[:code].to_s+"%"]
	 		else
	 			#鲜烟总量
	 			@fresh_sum = Packing.find_by_sql ['select sum((cast(s.average_weight as FLOAT) *s.packing_amount)) sum from packings s LEFT JOIN tasks t on t."id"=s.task_id LEFT JOIN rooms r ON r. ID = t .room_id LEFT JOIN stations q on q."id"=r.station_id where s.created_at >= ? and q.code like ?',now_time.year.to_s+'-01-01',"%"+session[:code].to_s+"%"]
	 		end
	 		#按鲜烟品种统计
	 		@by_breed = FreshTobacco.find_by_sql ["select f.breed,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.breed","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位统计
		    @by_part = FreshTobacco.find_by_sql ["select f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.part","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟成熟度统计
		    @by_maturity = FreshTobacco.find_by_sql ["select sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ?","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟类型统计
		    @by_type = FreshTobacco.find_by_sql ["select f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.tobacco_type","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    
		    #按鲜烟品种、成熟度
		    @by_breed_maturity = FreshTobacco.find_by_sql ["select f.breed,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.breed","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟品种、类型
		    @by_breed_type = FreshTobacco.find_by_sql ["select f.breed,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.breed,f.tobacco_type order by f.breed desc","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟品种、部位
		    @by_breed_part = FreshTobacco.find_by_sql ['select f.breed,f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.breed,f.part order by f.breed desc',"%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位、类型
		    @by_part_type = FreshTobacco.find_by_sql ['select f.part,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.part,f.tobacco_type order by f.part desc',"%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
		    #按鲜烟部位、成熟度
		    @by_part_maturity = FreshTobacco.find_by_sql ["select f.part,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? and p.created_at >= ? group by f.part","%"+session[:code].to_s+"%",now_time.year.to_s+'-01-01']
			
		  	respond_to do |format|
		    	format.html
		    	format.json { render json: { by_breed: @by_breed,
		                                 	 by_part: @by_part,
		                                     by_maturity: @by_maturity,
		                                 	 by_type: @by_type,
		                                 	 by_breed_maturity: @by_breed_maturity,
		                                 	 by_breed_type: @by_breed_type,
		                                 	 by_breed_part: @by_breed_part,
		                                 	 by_part_type: @by_part_type,
		                                 	 by_part_maturity: @by_part_maturity,
		                                 	 fresh_sum: @fresh_sum }}
		  	end
	 	end
	 			
	  
	end
end
