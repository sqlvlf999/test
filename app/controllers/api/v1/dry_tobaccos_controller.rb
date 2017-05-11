module Api
	module V1

		class DryTobaccosController < ApiController

			def create 
				dry_tobacco = DryTobacco.new(dry_tobacco_params)
				if dry_tobacco.done
					dry_tobacco.task.room.update_attributes(status: true)
					return render json: {code: 200}
				end
				render json: { code: 400, error: dry_tobacco.errors }
			end

			def show 
				dry_tobacco = DryTobacco.find_by_task_id(params[:task_id])
				if dry_tobacco
					return render json: {code: 200, dry_tobacco: dry_tobacco}
				end
				render json: {code: 404, error: "Can not find"}
			end

			private 
			def dry_tobacco_params
        json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
        json_params.require(:dry_tobacco).permit(:task_id, :weight, :has_issue,
        	                                       :issue, :image_data,
        	                                       :dry_details_attributes =>  
        	                                          [:image_data, :amount_weight,
        	                                          	:amount_leafs, :leafs_zz,
        	                                          	:weight_zz, :weight_wq,
        	                                          	:leafs_wq, :leafs_q, :weight_q,
        	                                          	:weight_zs, :leafs_zs])
			end

		end
		
	end
end