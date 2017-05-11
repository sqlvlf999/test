module Api
	module V1
		class PackingsController < ApiController

			def create
				packing = Packing.new(packing_params)
				if packing.done
					return render json: {code: 200}
				end
				render json: {code: 400, msg: 'can not create packing'}
			end

			private
			def packing_params
				json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:packing).permit(:task_id, :category, :average_weight, :category_state,
        	                                   :packing_amount, :packing_type, :rod_uniformity,
        	                                   :uniformity, :packing_other, 
        	                                   :packing_images_attributes => [:image_data])
			end

		end
	end
	
end
