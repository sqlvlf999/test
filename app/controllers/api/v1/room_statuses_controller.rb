module Api
	module V1
		class RoomStatusesController < ApiController

			def create
				status = RoomStatus.new(status_params)
				if status.done
					return render json: { code: 200 }
				end
				render json: { code: 400, errors: status.errors }
			end


      private

      def status_params
        json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:room_status).permit(:ac, :fan, :air_inlet, :blower, :other,
                                                 :heating, :kettle, :task_id)
      end

		end
	end
end