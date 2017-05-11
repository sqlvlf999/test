class Grading < ActiveRecord::Base
	belongs_to :task
	
	include DataUtils
end
