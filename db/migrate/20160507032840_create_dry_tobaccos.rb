class CreateDryTobaccos < ActiveRecord::Migration
  def change
    create_table :dry_tobaccos do |t|
      t.integer :task_id
      t.decimal :weight, precision: 5, scale: 2
      t.boolean :has_issue
      t.string :issue

      t.timestamps null: false
    end
  end
end
