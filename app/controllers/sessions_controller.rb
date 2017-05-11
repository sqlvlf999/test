class SessionsController < ApplicationController
  def create
    @user = User.authenticate(params[:phone],params[:password])
	if @user.nil?
	  redirect_to home_path, alert: '用户ID或密码错误!'
	else
	  session[:userid] = @user.id
	  session[:role] = @user.role
	  session[:username] = @user.name
	  session[:code] = @user.code
	  
	  station = @user.station
	  session[:station_title] = station.title
	  session[:station_id] = station.id
	  time = Time.new
	  redirect_to dashboard_path(randomid: time)
	end
  end

  def delete
  	
  end
end
