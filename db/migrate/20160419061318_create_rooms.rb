class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :room_no
      t.string :tobacco_no
      t.integer :station_id

      t.timestamps null: false
    end
  end
end
