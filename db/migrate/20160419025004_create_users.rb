class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :hashed_password
      t.string :role
      t.string :salt
      t.string :phone
      t.string :token
      t.integer :station_id
      
      t.timestamps null: false
    end
  end
end
