class CreateFreshTobaccos < ActiveRecord::Migration
  def change
    create_table :fresh_tobaccos do |t|
      t.integer :task_id
      t.string :breed
      t.string :part
      t.string :quality
      t.string :tobacco_type
      t.string :water_content

      t.timestamps null: false
    end
  end
end
