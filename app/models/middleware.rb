class Middleware < ActiveRecord::Base
	belongs_to :station

	validates :mid, presence: true
	validates :station_id, presence: true
end
