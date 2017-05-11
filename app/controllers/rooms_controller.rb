class RoomsController < ApplicationController
  layout "none", :only => [:list]  

	def index
		if params[:station_id]
			@rooms = Room.find_by_sql ['select address from rooms where station_id = ? order by address',params[:station_id]]
			respond_to do |format|
			    format.html
			    format.json { render json: { rooms: @rooms }}
			end
		else	
			puts session[:code]
			@stations = Station.find_by_sql ['select s.id,s.title from stations s where s.code like ?',"%"+session[:code].to_s+"%"]

			respond_to do |format|
			    format.html
			    format.json { render json: { stations: @stations }}
			end
		end
	end

	def list
		@stations = Station.all
		render 'list'
	end

	def details
		@fresh = Room.find_by_sql("select r.room_no, p.average_weight, p.packing_amount, p.created_at  from packings p left join tasks t on t.id = p.task_id
                               left join rooms r on r.id = t.room_id where station_id = #{params[:station_id]} order by r.room_no desc")
		render json: @fresh
	end

end
