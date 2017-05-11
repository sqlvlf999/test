class AddStepToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :step, :integer
  end
end
