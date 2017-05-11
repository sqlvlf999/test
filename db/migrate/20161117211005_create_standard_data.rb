class CreateStandardData < ActiveRecord::Migration
  def change
    create_table :standard_data do |t|
      t.string :code
 	  t.integer :using_rooms
      t.integer :total_bake_num
      t.decimal :fresh_weight, precision: 13, scale: 6
	  t.decimal :dry_weight, precision: 13, scale: 6

	  t.integer :d_rooms
	  t.integer :d_poles_per_room
	  t.decimal :d_fresh_weight_per_pole, precision: 13, scale: 6
	  t.decimal :d_dry_weight_per_pole, precision: 13, scale: 6
	  t.decimal :d_scale, precision: 13, scale: 6
	  t.decimal :d_fresh_weight, precision: 13, scale: 6
	  t.decimal :d_dry_weight, precision: 13, scale: 6

	  t.integer :m_rooms
	  t.integer :m_poles_per_room
	  t.decimal :m_fresh_weight_per_pole, precision: 13, scale: 6
	  t.decimal :m_dry_weight_per_pole, precision: 13, scale: 6
	  t.decimal :m_scale, precision: 13, scale: 6
	  t.decimal :m_fresh_weight, precision: 13, scale: 6
	  t.decimal :m_dry_weight, precision: 13, scale: 6

	  t.integer :u_rooms
	  t.integer :u_poles_per_room
	  t.decimal :u_fresh_weight_per_pole, precision: 13, scale: 6
	  t.decimal :u_dry_weight_per_pole, precision: 13, scale: 6
	  t.decimal :u_scale, precision: 13, scale: 6
	  t.decimal :u_fresh_weight, precision: 13, scale: 6
	  t.decimal :u_dry_weight, precision: 13, scale: 6 
      t.timestamps null: false
    end
  end
end
