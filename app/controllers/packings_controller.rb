class PackingsController < ApplicationController

	def index
	  if session[:code].to_s.length == 2
	  	  #@packing_weight= Packing.find_by_sql ["select ci.title,sum(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by ci.title","%"+session[:code].to_s+"%"]
		  #@packing_amount = Packing.find_by_sql ["select ci.title,SUM(packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by ci.title","%"+session[:code].to_s+"%"]
		  
		  @packing_weight = StandardDatum.find_by_sql ['select sum(fresh_weight) from standard_data s where s.code like ?',"%"+session[:code].to_s+"%"]
		  #编烟杆数
		  @packing_amount = StandardDatum.find_by_sql ['SELECT SUM(p.packing_amount) as sum FROM packings p LEFT JOIN fresh_tobaccos f ON f.task_id = P .task_id LEFT JOIN tasks T ON T . ID = P .task_id LEFT JOIN rooms r ON r. ID = T .room_id LEFT JOIN stations s ON s. ID = r.station_id LEFT JOIN counties C ON C . ID = s.county_id WHERE s.code like ? ',"%"+session[:code].to_s+"%"] 
		  #装烟房数
		  @packing_rooms = Packing.find_by_sql ['select COUNT(*) as sum from (select distinct r.station_id,r.room_no from  tasks t left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id WHERE s.code like ? order by r.room_no )a;',"%"+session[:code].to_s+"%"]

		  @by_category = Packing.find_by_sql ["select p.category,sum(p.packing_amount) as packing_sum from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.category","%"+session[:code].to_s+"%"]
		  @by_uniformity = Packing.find_by_sql ["select p.uniformity,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.uniformity","%"+session[:code].to_s+"%"]
		  @by_packing_type = Packing.find_by_sql ["select p.packing_type,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.packing_type","%"+session[:code].to_s+"%"]
		  @by_status = Packing.find_by_sql ["select r.status,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by r.status","%"+session[:code].to_s+"%"]
		  
		  @packing_weight_by_counties = Packing.find_by_sql ['select ci.title,SUM(p.packing_amount) as sum,SUM(p.packing_amount * cast(p.average_weight as Float)) as weight from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by ci.title',"%"+session[:code].to_s+"%"]
		  @by_category_counties = Packing.find_by_sql ['select p.category,ci.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.category,ci.title',"%"+session[:code].to_s+"%"]
		  @by_type_counties = Packing.find_by_sql ['select p.packing_type,ci.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.packing_type,ci.title',"%"+session[:code].to_s+"%"]
		  @by_status_counties = Packing.find_by_sql ['select ci.title,r.status,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by r.status,ci.title',"%"+session[:code].to_s+"%"]
		  @by_uniformity_counties = Packing.find_by_sql ['select p.uniformity,ci.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by p.uniformity,ci.title',"%"+session[:code].to_s+"%"]
		  @counties_code = County.find_by_sql ["select * from cities c where c.code like ?","%"+session[:code].to_s+"%"]
		  respond_to do |format|
		    format.html
		    format.json { render json: { by_category: @by_category, 
		    	                         packing_sum: @packing_amount,
		    	                         packing_weight: @packing_weight,
		    	                         by_uniformity: @by_uniformity,
		    	                         by_packing_type: @by_packing_type,
		    	                         by_status: @by_status,
		    	                         packing_weight_by_counties: @packing_weight_by_counties,
		    	                         by_category_counties: @by_category_counties,
		    	                         by_type_counties: @by_type_counties,
		    	                         by_status_counties: @by_status_counties,
		    	                         by_uniformity_counties: @by_uniformity_counties,
		    	                         counties_code:@counties_code,
		    	                         packing_rooms:@packing_rooms }}
		  end
	  elsif session[:code].to_s.length == 4
	  	  @counties_code = County.find_by_sql ["select * from counties c where c.code like ?","%"+session[:code].to_s+"%"]
	  	  
	  	  #@packing_weight= Packing.find_by_sql ["select c.title,sum(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by c.title","%"+session[:code].to_s+"%"]
		  @packing_weight = StandardDatum.find_by_sql ['select sum(fresh_weight) from standard_data s where s.code like ?',"%"+session[:code].to_s+"%"]
		  #@packing_amount = Packing.find_by_sql ["select c.title,SUM(packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by c.title","%"+session[:code].to_s+"%"]
		  @packing_amount = StandardDatum.find_by_sql ['select sum(d_poles_per_room + d_poles_per_room + d_poles_per_room) from standard_data c where c.code like ?',"%"+session[:code].to_s+"%"] 
		  #烤房状态
		  @packing_rooms = Packing.find_by_sql ['select COUNT(*) as sum from (select distinct r.station_id,r.room_no from  tasks t left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id WHERE s.code like ? order by r.room_no )a;',"%"+session[:code].to_s+"%"]

		  @by_category = Packing.find_by_sql ["select p.category,sum(p.packing_amount) as packing_sum from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by p.category","%"+session[:code].to_s+"%"]
		  @by_uniformity = Packing.find_by_sql ["select p.uniformity,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by p.uniformity","%"+session[:code].to_s+"%"]
		  @by_packing_type = Packing.find_by_sql ["select p.packing_type,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by p.packing_type","%"+session[:code].to_s+"%"]
		  @by_status = Packing.find_by_sql ["select r.status,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by r.status","%"+session[:code].to_s+"%"]
		  
		  @packing_weight_by_counties = Packing.find_by_sql ['select c.title,SUM(p.packing_amount) as sum,SUM(p.packing_amount * cast(p.average_weight as Float)) as weight from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by c.title',"%"+session[:code].to_s+"%"]
		  @by_category_counties = Packing.find_by_sql ['select p.category,c.title,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by p.category,c.title',"%"+session[:code].to_s+"%"]
		  @by_type_counties = Packing.find_by_sql ['select p.packing_type,c.title,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by p.packing_type,c.title',"%"+session[:code].to_s+"%"]
		  @by_status_counties = Packing.find_by_sql ['select c.title,r.status,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = ci.id where ci.code like ? group by r.status,c.title',"%"+session[:code].to_s+"%"]
		  @by_uniformity_counties = Packing.find_by_sql ['select p.uniformity,c.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = ci.id where ci.code like ? group by p.uniformity,c.title',"%"+session[:code].to_s+"%"]
		  @city_name = City.find_by_sql ['select c.title from cities c where c.code = ?',session[:code].to_s]
		  respond_to do |format|
		    format.html
		    format.json { render json: { by_category: @by_category, 
		    	                         packing_sum: @packing_amount,
		    	                         packing_weight: @packing_weight,
		    	                         by_uniformity: @by_uniformity,
		    	                         by_packing_type: @by_packing_type,
		    	                         by_status: @by_status,
		    	                         packing_weight_by_counties: @packing_weight_by_counties,
		    	                         by_category_counties: @by_category_counties,
		    	                         by_type_counties: @by_type_counties,
		    	                         by_status_counties: @by_status_counties,
		    	                         by_uniformity_counties: @by_uniformity_counties,
		    	                         counties_code:@counties_code,
		    	                         city_name: @city_name,
		    	                         packing_rooms:@packing_rooms  }}
		  end
	  elsif session[:code].to_s.length == 6
	  	  @packing_weight= Packing.find_by_sql ["select s.title,SUM(pd.weight) from packing_details pd left join packings p on p.id = pd.packing_id left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by s.title","%"+session[:code].to_s+"%"]
		  @packing_amount = Packing.find_by_sql ["select s.title,SUM(packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by s.title","%"+session[:code].to_s+"%"]
		  #烤房状态
		  @packing_rooms = Packing.find_by_sql ['select COUNT(*) as sum from (select distinct r.station_id,r.room_no from  tasks t left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id WHERE s.code like ? order by r.room_no )a;',"%"+session[:code].to_s+"%"]

		  @by_category = Packing.find_by_sql ["select category,SUM(p.packing_amount) as packing_sum from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.category","%"+session[:code].to_s+"%"]
		  @by_uniformity = Packing.find_by_sql ["select p.uniformity,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.uniformity","%"+session[:code].to_s+"%"]
		  @by_packing_type = Packing.find_by_sql ["select p.packing_type,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on t.room_id = r.id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.packing_type","%"+session[:code].to_s+"%"]
		  @by_status = Packing.find_by_sql ["select r.status,SUM(p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by r.status","%"+session[:code].to_s+"%"]
		  
		  @packing_weight_by_counties = Packing.find_by_sql ['select s.title,SUM(p.packing_amount) as sum,SUM(p.packing_amount * cast(p.average_weight as Float)) as weight from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by s.title',"%"+session[:code].to_s+"%"]
		  @by_category_counties = Packing.find_by_sql ['select p.category,s.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.category,s.title',"%"+session[:code].to_s+"%"]
		  @by_type_counties = Packing.find_by_sql ['select p.packing_type,s.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.packing_type,s.title',"%"+session[:code].to_s+"%"]
		  @by_status_counties = Packing.find_by_sql ['select s.title,r.status,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by r.status,s.title',"%"+session[:code].to_s+"%"]
		  @by_uniformity_counties = Packing.find_by_sql ['select p.uniformity,s.title,SUM(cast(p.average_weight as float) * p.packing_amount) from packings p left join tasks t on t.id = p.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by p.uniformity,s.title',"%"+session[:code].to_s+"%"]
		  @counties_code = County.find_by_sql ["select * from stations s where s.code like ?","%"+session[:code].to_s+"%"]
		  respond_to do |format|
		    format.html
		    format.json { render json: { by_category: @by_category, 
		    	                         packing_sum: @packing_amount,
		    	                         packing_weight: @packing_weight,
		    	                         by_uniformity: @by_uniformity,
		    	                         by_packing_type: @by_packing_type,
		    	                         by_status: @by_status,
		    	                         packing_weight_by_counties: @packing_weight_by_counties,
		    	                         by_category_counties: @by_category_counties,
		    	                         by_type_counties: @by_type_counties,
		    	                         by_status_counties: @by_status_counties,
		    	                         by_uniformity_counties: @by_uniformity_counties,
		    	                         counties_code:@counties_code,
		    	                         packing_rooms:@packing_rooms  }}
		  end
	  end
	end
end
