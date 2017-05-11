class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.string :title
      t.string :code

      t.timestamps null: false
    end
  end
end
