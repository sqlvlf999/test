module Api
	module V1

		class GradingsController < ApiController

			def create
				grading = Grading.new(grading_params)
				if grading.done
					return render json: { code: 200 }
				end
				render json: { code: 400, errors: grading.errors }
			end

			private

			def grading_params
        json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:grading).permit(:task_id, :XF, :XL, :XV, :CF, :CL, :CV,
        	                                   :BF, :BL, :BR, :BV, :BK, :CFK, :GY,
        																		 :no_level)
      end

		end
		
	end
end