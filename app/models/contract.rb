class Contract < ActiveRecord::Base
	belongs_to :task
	
  validates :task_id, uniqueness: true

  validates :amount, :party_a, :party_b, :need_days, :price, :contract_started,
            :contract_finished, :work_started, :work_finished, :workplace, presence: true

  validates :amount, :price, numericality: { greater_than: 0 }
  validates :need_days, numericality: { only_integer: true }

	include DataUtils
end
