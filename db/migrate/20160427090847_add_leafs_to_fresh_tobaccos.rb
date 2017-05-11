class AddLeafsToFreshTobaccos < ActiveRecord::Migration
  def change
  	add_column :fresh_tobaccos, :leafs_of_immature,     :integer
  	add_column :fresh_tobaccos, :leafs_of_mature,       :integer
  	add_column :fresh_tobaccos, :leafs_of_over_mature,  :integer
  	add_column :fresh_tobaccos, :weight_of_immature,    :integer
  	add_column :fresh_tobaccos, :weight_of_mature,      :integer
  	add_column :fresh_tobaccos, :weight_of_over_mature, :integer
  	add_attachment :fresh_tobaccos, :image
  end
end
