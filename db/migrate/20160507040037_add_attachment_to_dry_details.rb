class AddAttachmentToDryDetails < ActiveRecord::Migration
  def change
  	add_attachment :dry_details, :image
  end
end
