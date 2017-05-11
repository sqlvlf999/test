class CreatePackingImages < ActiveRecord::Migration
  def change
    create_table :packing_images do |t|
      t.integer :packing_id

      t.timestamps null: false
    end
  end
end
