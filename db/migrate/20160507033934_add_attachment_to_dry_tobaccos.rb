class AddAttachmentToDryTobaccos < ActiveRecord::Migration
  def change
    add_attachment :dry_tobaccos, :image
  end
end
