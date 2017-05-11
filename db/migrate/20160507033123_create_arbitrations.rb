class CreateArbitrations < ActiveRecord::Migration
  def change
    create_table :arbitrations do |t|
      t.integer :task_id
      t.string :farmer
      t.string :officer
      t.string :tobacco
      t.string :baking_team
      t.string :farmer_rep
      t.decimal :issue_weight, precision: 5, scale: 2
      t.decimal :compensate_per_kg, precision: 5, scale: 2

      t.timestamps null: false
    end
  end
end
