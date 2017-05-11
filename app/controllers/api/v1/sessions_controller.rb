module Api
  module V1
  	class SessionsController < ApiController

      skip_before_filter :restrict_access

      def create
        user = User.authenticate(params[:session][:phone],
                                 params[:session][:password])

        if user
          station = user.station
          return render json: { code: 200, user: {user_id: user.id , name: user.name, phone: user.phone, token: user.token, role: user.role },
                                station: { station_id: station.id, 
                                           title: station.title,
                                           station_code: station.code,
                                           middleware: station.middlewares.first
                                          }  
                                        }
        end
        return render json: {code: 404}
      end

      def patch
        user = User.find_by_token(request.headers['Authorization'])
        if user
          if user.update_attributes(password: params[:password])
            return render json: { code: 200}
          end
        end
        render json: { code: 400, msg: 'Can not change password'}
      end

  	end
  end
end
