class CreatePackingDetails < ActiveRecord::Migration
  def change
    create_table :packing_details do |t|
      t.integer :packing_id
      t.decimal :weight, precision: 5, scale: 2
      t.integer :leafs
      t.integer :packing_length
      t.integer :leafs_of_twe

      t.timestamps null: false
    end
  end
end
