class County < ActiveRecord::Base

	belongs_to :city
	has_many :stations

	validates :code , uniqueness: true
end
