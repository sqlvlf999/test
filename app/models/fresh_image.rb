class FreshImage < ActiveRecord::Base
	
	belongs_to :fresh_tobacco

  attr_accessor :image, :image_data

  before_save   :decode_image_data

  has_attached_file :image, styles: { medium: "800x600>", thumb: "80x60>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  include DataUtils
end
