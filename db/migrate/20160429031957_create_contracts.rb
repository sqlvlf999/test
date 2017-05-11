class CreateContracts < ActiveRecord::Migration
  def change
    create_table :contracts do |t|
      t.integer :taks_id
      t.string :uuid
      t.decimal :amount, precision: 6, scale: 2
      t.string :party_a
      t.string :party_b
      t.integer :need_days
      t.decimal :price, precision: 6, scale: 2
      t.date :contract_started
      t.date :contract_finished
      t.date :work_started
      t.date :work_finished
      t.string :workplace

      t.timestamps null: false
    end
  end
end
