class DryDetailController < ApplicationController
	def index
		if params[:code].to_s.length == 4
			
			@by_breed = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? group by trim(f.breed)",params[:code].to_s]
		    @by_quality = DryTobacco.find_by_sql ["select sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ?",params[:code].to_s]
		    @by_part = DryTobacco.find_by_sql	["select trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? group by trim(f.part)",params[:code].to_s]
		    @by_breed_part = DryTobacco.find_by_sql ["select trim(f.breed) as breed,trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code = ? group by trim(f.breed),trim(f.part)",params[:code].to_s]
		    @by_breed_quality = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by trim(f.breed)",params[:code].to_s]
		    @by_part_quality = DryTobacco.find_by_sql ["select trim(f.part) as part,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id left join cities ci on ci.id = c.city_id where ci.code like ? group by trim(f.part)",params[:code].to_s]
			@city = City.find_by_sql ['select c.title,c.code from cities c where c.code = ?',params[:code].to_s]
			respond_to do |format|
			   format.html
			   format.json { render json:{ city: @city,
			   							   by_breed: @by_breed,
		    							   by_quality: @by_quality,
		    							   by_part: @by_part,
		    							   by_breed_part: @by_breed_part,
		    							   by_breed_quality: @by_breed_quality,
		    							   by_part_quality: @by_part_quality }}
			end

		elsif params[:code].to_s.length == 6
			@by_breed = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? group by trim(f.breed)",params[:code].to_s]
		    @by_quality = DryTobacco.find_by_sql ["select sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ?",params[:code].to_s]
		    @by_part = DryTobacco.find_by_sql	["select trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? group by trim(f.part)",params[:code].to_s]
		    @by_breed_part = DryTobacco.find_by_sql ["select trim(f.breed) as breed,trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code = ? group by trim(f.breed),trim(f.part)",params[:code].to_s]
		    @by_breed_quality = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by trim(f.breed)",params[:code].to_s]
		    @by_part_quality = DryTobacco.find_by_sql ["select trim(f.part) as part,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where c.code like ? group by trim(f.part)",params[:code].to_s]		    
			@county = County.find_by_sql ['select c.title,c.code from counties c where c.code = ?',params[:code].to_s]	
			respond_to do |format|
			   format.html
			   format.json { render json:{ county: @county,
			                               by_breed: @by_breed,
		    							   by_quality: @by_quality,
		    							   by_part: @by_part,
		    							   by_breed_part: @by_breed_part,
		    							   by_breed_quality: @by_breed_quality,
		    							   by_part_quality: @by_part_quality }}
			end

		elsif params[:code].to_s.length == 10
			if params[:type] == "sum"
				if params[:room_no] == "0"
					@dry_sum = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.breed,sum(d.weight * p.packing_amount) as sum,d.id from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,f.breed,c.party_b,c.work_started,c.work_finished,d.id order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ dry_sum: @dry_sum }}
					end
				else
					@dry_sum = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.breed,sum(d.weight * p.packing_amount) as sum,d.id from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,f.breed,c.party_b,c.work_started,c.work_finished,d.id order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ dry_sum: @dry_sum }}
					end
				end
				
			elsif params[:type] == "part"
				if params[:room_no] == "0"
					@part = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.part,sum(cast(d.weight as float) * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id  left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,f.part,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ part: @part }}
					end
				else
					@part = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.part,sum(cast(d.weight as float) * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id  left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,f.part,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ part: @part  }}
					end
				end
			elsif params[:type] == "quality"
				if params[:room_no] == "0"
					@quality = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id  where s.code = ? group by r.room_no,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ quality: @quality }}
					end
				else
					@quality = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join contracts c on c.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id  where s.code = ? and room_no = ? group by r.room_no,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ quality: @quality }}
					end
				end
			elsif params[:type] == "breed"
				if params[:room_no] == "0"
					@breed = DryTobacco.find_by_sql ['select r.room_no,c.party_b,c.work_started,c.work_finished,f.breed,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join contracts c on c.task_id = t.id left join stations s on s.id = r.station_id where s.code = ? group by r.room_no,f.breed,c.party_b,c.work_started,c.work_finished order by cast(r.room_no as int),c.work_started',params[:station_code]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ breed: @breed }}
					end
				else
					@breed = DryTobacco.find_by_sql ['select r.room_no,f.breed,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id where s.code = ? and r.room_no = ? group by r.room_no,f.breed order by cast(r.room_no as int)',params[:station_code],params[:room_no]]
					respond_to do |format|
					   format.html
					   format.json { render json:{ breed: @breed }}
					end
				end
			elsif params[:d_id]
				@images = FreshTobacco.find_by_sql ["SELECt d.id,'system/dry_tobaccos/images/000/'||'00'||d.id/1000||'/'||substr('0000'||d.id%1000,length('0000'||d.id%1000)-2,4)||'/original' as files,d.image_file_name FROM public.dry_tobaccos d left join public.tasks t  on t.id=d.task_id where 1=1 and d.id= ?",params[:d_id]]
				respond_to do |format|
				   format.html
				   format.json { render json:{ images: @images }}
				end
			else
				@by_breed = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? group by trim(f.breed)",params[:code].to_s]
			    @by_quality = DryTobacco.find_by_sql ["select sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ?",params[:code].to_s]
			    @by_part = DryTobacco.find_by_sql	["select trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? group by trim(f.part)",params[:code].to_s]
			    @by_breed_part = DryTobacco.find_by_sql ["select trim(f.breed) as breed,trim(f.part) as part,sum(d.weight * p.packing_amount) as sum from dry_tobaccos d left join packings p on p.task_id = d.task_id left join fresh_tobaccos f on f.task_id = d.task_id left join tasks t on t.id = d.task_id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code = ? group by trim(f.breed),trim(f.part)",params[:code].to_s]
			    @by_breed_quality = DryTobacco.find_by_sql ["select trim(f.breed) as breed,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by trim(f.breed)",params[:code].to_s]
			    @by_part_quality = DryTobacco.find_by_sql ["select trim(f.part) as part,sum(dd.weight_zz)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as zz,sum(dd.weight_wq)/sum(amount_weight) * sum(d.weight * p.packing_amount)/3 as wq,sum(dd.weight_q)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as q,sum(dd.weight_zs)/sum(amount_weight) *sum(d.weight * p.packing_amount)/3 as zs from dry_details dd left join dry_tobaccos d on d.id = dd.dry_tobacco_id left join packings p on p.task_id = d.task_id left join tasks t on t.id = d.task_id left join fresh_tobaccos f on f.task_id = t.id left join rooms r on r.id = t.room_id left join stations s on s.id = r.station_id left join counties c on c.id = s.county_id where s.code like ? group by trim(f.part)",params[:code].to_s]
				@station = Station.find_by_sql ['select s.title,s.code from stations s where s.code =?',params[:code].to_s]
				@rooms = Room.find_by_sql ['select r.id,r.room_no,r.address,r.station_id from rooms r left join stations s on s.id = r.station_id where s.code = ? order by r.address',params[:code].to_s]
				respond_to do |format|
				   format.html
				   format.json { render json:{ station: @station,
				                               by_breed: @by_breed,
			    							   by_quality: @by_quality,
			    							   by_part: @by_part,
			    							   by_breed_part: @by_breed_part,
			    							   by_breed_quality: @by_breed_quality,
			    							   by_part_quality: @by_part_quality,
			    							   rooms:@rooms }}
				end
			end


			
		end	
	end
end
