class AddLeafsOfTypeToFreshDetails < ActiveRecord::Migration
  def change
  	add_column :fresh_details, :leafs_of_immature,    :integer
  	add_column :fresh_details, :leafs_of_mature,      :integer
  	add_column :fresh_details, :leafs_of_over_mature, :integer
  end
end
