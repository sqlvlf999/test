class CreateGradings < ActiveRecord::Migration
  def change
    create_table :gradings do |t|
      t.integer :task_id
      t.decimal :superior, precision: 6, scale: 2
      t.decimal :medium, precision: 6, scale: 2
      t.decimal :lower, precision: 6, scale: 2
      t.decimal :no_level, precision: 6, scale: 2

      t.timestamps null: false
    end
  end
end
