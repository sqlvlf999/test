class CreateDryImages < ActiveRecord::Migration
  def change
    create_table :dry_images do |t|
      t.integer :dry_tobacco_id

      t.timestamps null: false
    end
  end
end
