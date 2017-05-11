class FreshDetailController < ApplicationController
	def index
		now_time = Time.now
		if params[:code].to_s.length == 4
			#按鲜烟品种统计
			@by_breed = FreshTobacco.find_by_sql ['select f.breed,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位统计
		  	@by_part = FreshTobacco.find_by_sql ['select f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟成熟度统计
		  	@by_maturity = FreshTobacco.find_by_sql ['select sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ?',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟类型统计
		  	@by_type = FreshTobacco.find_by_sql ['select f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	
		  	#按鲜烟品种、成熟度
		  	@by_breed_maturity = FreshTobacco.find_by_sql ['select f.breed,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟品种、类型
		  	@by_breed_type = FreshTobacco.find_by_sql ['select f.breed,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.breed,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟品种、部位
		  	@by_breed_part = FreshTobacco.find_by_sql ['select f.breed,f.part,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.breed,f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位、类型
		  	@by_part_type = FreshTobacco.find_by_sql ['select f.part,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.part,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位、成熟度
		  	@by_part_maturity = FreshTobacco.find_by_sql ['select f.part,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
			
			@city = City.find_by_sql ['select c.title,c.code from cities c where c.code = ?',params[:code].to_s]
			respond_to do |format|
			   format.html
			   format.json { render json:{ city: @city,
			   							   by_breed: @by_breed,
			    	                       by_part: @by_part,
			    	                       by_maturity: @by_maturity,
			    	                       by_type: @by_type,
			    	                       by_breed_maturity: @by_breed_maturity,
			    	                       by_breed_type: @by_breed_type,
			    	                       by_breed_part: @by_breed_part,
			    	                       by_part_type: @by_part_type,
			    	                       by_part_maturity: @by_part_maturity }}
			end

		elsif params[:code].to_s.length == 6
			#按鲜烟品种统计
		  	@by_breed = FreshTobacco.find_by_sql ['select f.breed,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位统计
		  	@by_part = FreshTobacco.find_by_sql ['select f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟成熟度统计
		  	@by_maturity = FreshTobacco.find_by_sql ['select sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ?',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟类型统计
		  	@by_type = FreshTobacco.find_by_sql ['select f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	
		  	#按鲜烟品种、成熟度
		  	@by_breed_maturity = FreshTobacco.find_by_sql ['select f.breed,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟品种、类型
		  	@by_breed_type = FreshTobacco.find_by_sql ['select f.breed,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.breed,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟品种、部位
		  	@by_breed_part = FreshTobacco.find_by_sql ['select f.breed,f.part,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.breed,f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位、类型
		  	@by_part_type = FreshTobacco.find_by_sql ['select f.part,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.part,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
		  	#按鲜烟部位、成熟度
		  	@by_part_maturity = FreshTobacco.find_by_sql ['select f.part,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
			
			@county = County.find_by_sql ['select c.title,c.code from counties c where c.code = ?',params[:code].to_s]	
			respond_to do |format|
			   format.html
			   format.json { render json:{ county: @county,
			   							   by_breed: @by_breed,
			    	                       by_part: @by_part,
			    	                       by_maturity: @by_maturity,
			    	                       by_type: @by_type,
			    	                       by_breed_maturity: @by_breed_maturity,
			    	                       by_breed_type: @by_breed_type,
			    	                       by_breed_part: @by_breed_part,
			    	                       by_part_type: @by_part_type,
			    	                       by_part_maturity: @by_part_maturity }}
			end

		elsif params[:code].to_s.length == 10
			

			if params[:type] == "maturity"
				if params[:room_no] == "0"
					@fresh_sum = FreshTobacco.find_by_sql ['select r.room_no,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no order by cast(r.room_no as int)',params[:station_code]]
					@maturity = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ fresh_sum: @fresh_sum,
					   							   maturity: @maturity }}
					end
				else
					@fresh_sum = FreshTobacco.find_by_sql ['select r.room_no,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no order by cast(r.room_no as int)',params[:station_code],params[:room_no]]
					@maturity = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ fresh_sum: @fresh_sum,
					   							   maturity: @maturity }}
					end
				end
				
			elsif params[:type] == "breed"
				if params[:room_no] == "0"
					@breed = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.breed,sum(cast(average_weight as float) * packing_amount),f.id from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,f.breed,c.party_b,c.work_started,c.work_finished,f.id order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ breed: @breed }}
					end
				else
					@breed = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.breed,sum(cast(average_weight as float) * packing_amount),f.id from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,f.breed,c.party_b,c.work_started,c.work_finished,f.id order by cast(r.room_no as int)',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ breed: @breed }}
					end
				end
			elsif params[:type] == "type"
				if params[:room_no] == "0"
					@type = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,c.party_b,c.work_started,c.work_finished,f.tobacco_type order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ type: @type }}
					end
				else
					@type = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,c.party_b,c.work_started,c.work_finished,f.tobacco_type order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ type: @type }}
					end
				end
			elsif params[:type] == "water_content"
				if params[:room_no] == "0"
					@water_content = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.water_content,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id  left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,f.water_content,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ water_content: @water_content }}
					end
				else
					@water_content = FreshTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.water_content,sum(cast(average_weight as float) * packing_amount) from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id  left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,f.water_content,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ water_content: @water_content }}
					end
				end
			elsif params[:f_id]
				@images = FreshTobacco.find_by_sql ["SELECt f.id,'system/fresh_tobaccos/images/000/'||'00'||f.id/1000||'/'||substr('0000'||f.id%1000,length('0000'||f.id%1000)-2,4)||'/original' as files,f.image_file_name FROM public.fresh_tobaccos f left join public.tasks t  on t.id=f.task_id where 1=1 and f.id= ?",params[:f_id]]
				respond_to do |format|
				   format.html
				   format.json { render json:{ images: @images }}
				end
			else
				#按鲜烟品种统计
				@by_breed = FreshTobacco.find_by_sql ['select f.breed,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟部位统计
			  	@by_part = FreshTobacco.find_by_sql ['select f.part,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟成熟度统计
			  	@by_maturity = FreshTobacco.find_by_sql ['select sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ?',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟类型统计
			  	@by_type = FreshTobacco.find_by_sql ['select f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as weight_sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	
			  	#按鲜烟品种、成熟度
			  	@by_breed_maturity = FreshTobacco.find_by_sql ['select f.breed,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.breed',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟品种、类型
			  	@by_breed_type = FreshTobacco.find_by_sql ['select f.breed,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.breed,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟品种、部位
			  	@by_breed_part = FreshTobacco.find_by_sql ['select f.breed,f.part,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.breed,f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟部位、类型
			  	@by_part_type = FreshTobacco.find_by_sql ['select f.part,f.tobacco_type,sum(cast(average_weight as float) * packing_amount) as sum from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.part,f.tobacco_type',params[:code].to_s,now_time.year.to_s+'-01-01']
			  	#按鲜烟部位、成熟度
			  	@by_part_maturity = FreshTobacco.find_by_sql ['select f.part,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_immature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_immature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_mature,sum((cast(p.average_weight as float) * p.packing_amount) * (f.weight_of_over_mature/(f.weight_of_immature + f.weight_of_mature + f.weight_of_over_mature))) as weight_of_over_mature from packings p left join fresh_tobaccos f on f.task_id = p.task_id left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? and p.created_at >= ? group by f.part',params[:code].to_s,now_time.year.to_s+'-01-01']
				

				@station = Station.find_by_sql ['select s.title,s.code from stations s where s.code =?',params[:code].to_s]
				@rooms = Room.find_by_sql ['select r.id,r.room_no,r.address,r.station_id from rooms r left join stations s on s.id = r.station_id where s.code = ? order by r.address',params[:code].to_s]
				respond_to do |format|
				   format.html
				   format.json { render json:{ station: @station,
				   					           by_breed: @by_breed,
				    	                       by_part: @by_part,
				    	                       by_maturity: @by_maturity,
				    	                       by_type: @by_type,
				    	                       by_breed_maturity: @by_breed_maturity,
				    	                       by_breed_type: @by_breed_type,
				    	                       by_breed_part: @by_breed_part,
				    	                       by_part_type: @by_part_type,
				    	                       by_part_maturity: @by_part_maturity,
				    	                       rooms: @rooms }}
				end
			end
					
					
		end	
	end
end
