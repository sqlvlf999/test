class AddCountyIdToStation < ActiveRecord::Migration
  def change
    add_column :stations, :county_id, :integer
  end
end
