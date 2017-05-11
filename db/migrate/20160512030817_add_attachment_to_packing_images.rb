class AddAttachmentToPackingImages < ActiveRecord::Migration
  def change
  	add_attachment :packing_images, :image
  end
end
