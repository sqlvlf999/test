class MiddlewaresController < ApplicationController
  layout "none"

	def index
		@stations = Station.all
	end

end