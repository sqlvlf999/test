class CreateMiddlewares < ActiveRecord::Migration
  def change
    create_table :middlewares do |t|
      t.string :mid
      t.integer :station_id

      t.timestamps null: false
    end
  end
end
