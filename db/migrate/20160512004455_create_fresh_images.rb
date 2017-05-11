class CreateFreshImages < ActiveRecord::Migration
  def change
    create_table :fresh_images do |t|
      t.integer :fresh_tobacco_id

      t.timestamps null: false
    end
  end
end
