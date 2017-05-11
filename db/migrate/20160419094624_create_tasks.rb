class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.integer :room_id
      t.string :task_number

      t.timestamps null: false
    end
  end
end
