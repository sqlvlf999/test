class City < ActiveRecord::Base
	has_many :counties
end
