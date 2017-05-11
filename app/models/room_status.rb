
class RoomStatus < ActiveRecord::Base
	belongs_to :task

	validates :task_id, uniqueness: true
  validates :task_id, presence: true
  validates :ac, :fan, :air_inlet, :blower, :heating, :kettle, presence: true

	include DataUtils

end
