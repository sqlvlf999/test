class Arbitration < ActiveRecord::Base
	belongs_to :task
	
	include DataUtils
end
