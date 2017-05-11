class CreateCounties < ActiveRecord::Migration
  def change
    create_table :counties do |t|
      t.string :title
      t.string :code
      t.integer :city_id

      t.timestamps null: false
    end
  end
end
