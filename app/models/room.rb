class Room < ActiveRecord::Base
	belongs_to :station
	has_many   :tasks

	validates :room_no, presence: true
	validates :station_id, presence: true
	validates :address, presence: true

end
