module Api
	module V1

		class ArbitrationsController < ApiController

			def create
				arbitration = Arbitration.new(arbitration_params)
				if arbitration.done(3)
					return render json: { code: 200 }
				end
				render json: { code: 400, errors: arbitration.errors }
			end

			private
			
			def arbitration_params
        json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:arbitration).permit(:task_id, :farmer, :officer,
        	                                       :tobacco, :baking_team, :reason,
        	                                       :farmer_rep, :issue_weight,
        	                                       :compensate_per_kg)
			end
		end
		
	end
end
