class AddImageToFreshTobacco < ActiveRecord::Migration
  def change
  	add_attachment :fresh_tobaccos, :image
  end
end
