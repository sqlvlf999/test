class AddStatusToRooms < ActiveRecord::Migration
  def change
    add_column :rooms, :status, :boolean
  end
end
