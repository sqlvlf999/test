class CreateFreshDetails < ActiveRecord::Migration
  def change
    create_table :fresh_details do |t|
      t.integer :fresh_tobacco_id
      t.decimal :weight, precision: 4, scale: 2
      t.integer :leafs
      t.integer :type

      t.timestamps null: false
    end
  end
end
