module Api
	module V1
		class FreshTobaccosController < ApiController

			def create
				fresh = FreshTobacco.new(fresh_params)
				if fresh.done
					return render json: { code: 200 }
				end
				render json: { code: 400, errors: fresh.errors }
			end

			def update
				fresh = FreshTobacco.find_by_task_id(params[:task_id])
				if fresh
				  if fresh.update_attributes(fresh_params)
				  	return render json: { code: 200 }
				  end
				  return render json: { code: 400 }
				end
				render json: { code: 404, error: 'Can not find fresh tobacco' }
			end

			private

      def fresh_params
        json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:fresh_tobacco).permit(:task_id, :breed, :part, :quality,
        	                                         :tobacco_type, :water_content,
        	                                         :leafs_of_immature, :weight_of_immature,
        	                                         :leafs_of_mature, :weight_of_mature,
        	                                         :leafs_of_over_mature, :weight_of_over_mature,
        	                                         :uuid, :farmer_name, :image_data,
        	                                         :fresh_images_attributes => [:image_data],
        	                                         :fresh_details_attributes =>  
        	                                           [:image_data, :leafs_of_mature, :leafs_of_immature,
        	                                            :leafs_of_over_mature, :type_id])
      end

		end
	end
end