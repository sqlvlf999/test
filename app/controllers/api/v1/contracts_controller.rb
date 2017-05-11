module Api
	module V1

		class ContractsController < ApiController

			def create
				contract = Contract.new(contract_params)
				if contract.done
					return render json: { code: 200 }
				end
				render json: { code: 400, msg: contract.errors }
			end

			private

			def contract_params
				json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
				json_params.require(:contract).permit(:task_id, :amount, :party_a, :party_b,
					                                    :need_days, :price, :contract_started,
					                                    :contract_finished, :work_started, :work_finished,
					                                    :workplace)
			end

		end

	end
end