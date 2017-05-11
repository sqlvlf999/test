class AddAttachmentToFreshImages < ActiveRecord::Migration
  def change
  	add_attachment :fresh_images, :image
  end
end
