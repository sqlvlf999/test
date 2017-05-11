module Api
	module V1
		class ApiController < ActionController::Base

			before_filter :restrict_access
			respond_to :json

			protected

			def restrict_access
				head :unauthorized unless current_user
			end

			def current_user
				User.find_by_token(request.headers['Authorization'])
			end
	  end
	end
end