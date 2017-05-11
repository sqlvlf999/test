class DryDetail < ActiveRecord::Base
	belongs_to :dry_tobacco

#  validates :dry_tobacco_id, :amount_weight, :amount_leafs, 
#            :leafs_zz, :leafs_wq, :leafs_q, :leafs_zs,
#            :weight_zz, :weight_wq, :weight_q, :weight_zs, presence: true

#  validates :amount_weight, :weight_zz, :weight_wq, :weight_q, :weight_zs, numericality: true
#  validates :amount_leafs, :leafs_zz, :leafs_wq, :leafs_q, :leafs_zs, numericality: { only_integer: true }

  attr_accessor :image, :image_data

  before_save   :decode_image_data

  has_attached_file :image, styles: { medium: "800x600>", thumb: "80x60>" }, default_url: "/images/:style/missing.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  include DataUtils
  
end
