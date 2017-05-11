class StationsController < ApplicationController
  def index
  	render json: Station.all
  end
end
