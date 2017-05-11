class AddOtherToRoomStatuses < ActiveRecord::Migration
  def change
    add_column :room_statuses, :other, :string
  end
end
