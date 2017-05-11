class Add < ActiveRecord::Migration
  def change
  	add_column :fresh_tobaccos, :uuid, :string
  	add_column :fresh_tobaccos, :farmer_name, :string
  end
end
