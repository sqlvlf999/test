class CreateDryDetails < ActiveRecord::Migration
  def change
    create_table :dry_details do |t|
      
      t.integer :dry_tobacco_id
      t.decimal :amount_weight, precision: 4, scale: 2
      t.integer :amount_leafs
      t.integer :leafs_zz
      t.decimal :weight_zz, precision: 4, scale: 2
      t.decimal :weight_wq, precision: 4, scale: 2
      t.integer :leafs_wq
      t.integer :leafs_q
      t.decimal :weight_q, precision: 4, scale: 2
      t.decimal :weight_zs, precision: 4, scale: 2
      t.integer :leafs_zs

      t.timestamps null: false
    end
  end
end
