class Packing < ActiveRecord::Base
	belongs_to :task

	has_many :packing_images

  validates :task_id, uniqueness: true
	accepts_nested_attributes_for :packing_images, allow_destroy: true

	include DataUtils
end
