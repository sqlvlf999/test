class DryTobacco < ActiveRecord::Base
	belongs_to :task
	has_many   :dry_details

  validates :task_id, uniqueness: true

  validates :weight, presence: true
  validates :weight, numericality: { greater_than: 0 }

	before_save   :decode_image_data

  attr_accessor :image, :image_data
  
	accepts_nested_attributes_for :dry_details, allow_destroy: true

  has_attached_file :image, styles: { medium: "800x600>", thumb: "80x60>" }, default_url: "/images/:style/missing.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  
  include DataUtils
end
