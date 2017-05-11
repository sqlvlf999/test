class CreateRoomStatuses < ActiveRecord::Migration
  def change
    create_table :room_statuses do |t|
      t.integer :room_id
      t.string :ac
      t.string :fan
      t.string :air_inlet
      t.string :blower
      t.string :heating
      t.string :kettle

      t.timestamps null: false
    end
  end
end
