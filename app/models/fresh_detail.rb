class FreshDetail < ActiveRecord::Base

	belongs_to :fresh_tobacco

  attr_accessor :image, :image_data

  before_save   :decode_image_data
  
  validates :type_id, :leafs_of_immature, :leafs_of_mature, :leafs_of_over_mature, presence: true
  validates :type_id, :leafs_of_immature, :leafs_of_mature, :leafs_of_over_mature, numericality: { only_integer: true }

  has_attached_file :image, styles: { medium: "800x600>", thumb: "80x60>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  private
  def decode_image_data
    if image_data
      data = StringIO.new(Base64.decode64(image_data))
      data.class.class_eval {attr_accessor :original_filename, :content_type}
      data.original_filename = "#{DateTime.now.to_i}" + '.png'
      data.content_type = 'image/png'
      self.image = data
    end
  end

end
