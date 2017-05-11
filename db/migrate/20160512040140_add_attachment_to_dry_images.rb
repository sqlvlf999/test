class AddAttachmentToDryImages < ActiveRecord::Migration
  def change
  	add_attachment :dry_images, :image
  end
end
