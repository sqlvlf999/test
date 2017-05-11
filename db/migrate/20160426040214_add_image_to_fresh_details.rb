class AddImageToFreshDetails < ActiveRecord::Migration
  def change
  	add_attachment :fresh_details, :image
  end
end
