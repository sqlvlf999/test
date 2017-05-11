class FreshTobacco < ActiveRecord::Base

	belongs_to  :task
	has_many    :fresh_details
  has_many    :fresh_images
  
	before_save :decode_image_data

  validates :task_id, uniqueness: true

  validates :task_id, :breed, :part, :quality, :tobacco_type, :water_content,
            :leafs_of_immature, :leafs_of_mature, :leafs_of_over_mature, :uuid, :farmer_name,
            :weight_of_immature, :weight_of_mature, :weight_of_over_mature, presence: true

  validates :leafs_of_mature, :leafs_of_immature, :leafs_of_over_mature, numericality: { only_integer: true }

  validates :weight_of_mature, :weight_of_immature, :weight_of_over_mature, numericality: true

  attr_accessor :image, :image_data
  
	accepts_nested_attributes_for :fresh_details, allow_destroy: true
  accepts_nested_attributes_for :fresh_images, allow_destroy: true
	
  has_attached_file :image, styles: { medium: "800x600>", thumb: "80x60>" }, default_url: "/images/:style/missing.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  
  include DataUtils
end
