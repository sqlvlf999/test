class CreatePackings < ActiveRecord::Migration
  def change
    create_table :packings do |t|
      t.integer :task_id
      t.string :category
      t.decimal :average_weight, precision: 6, scale: 2
      t.string :category_state
      t.integer :packing_amount
      t.string :packing_type
      t.string :rod_uniform
      t.string :uniformity
      t.string :packing_other

      t.timestamps null: false
    end
  end
end
