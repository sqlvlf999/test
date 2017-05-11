class AddAttachmentToPackingDetails < ActiveRecord::Migration
  def change
  	add_attachment :packing_details, :image
  end
end
