module Api
	module V1
		class VersionsController < ApiController
			skip_before_filter :restrict_access

			def index
				render json: { code: 200, versions: Version.all }
			end

			def show
				render json: { code: 200, version: Version.last }
			end
		end
	end
end