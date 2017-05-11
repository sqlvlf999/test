class AddReasonToArbitrations < ActiveRecord::Migration
  def change
    add_column :arbitrations, :reason, :string
  end
end
