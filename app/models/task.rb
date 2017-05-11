class Task < ActiveRecord::Base
	belongs_to :user
	belongs_to :room

	has_one   :room_status
	has_one   :fresh_tobacco
	has_one   :packing
	has_one   :contract
  has_one   :dry_tobacco
  has_one   :arbitration

  validate :validate_room_status, on: :create

  def task_by_step(step)

  	if step.nil?
  		step = self.step
  	end
  	
  	case step.to_i
  	  when 1
  	  	RoomStatus.find_by_task_id(self.id)
  	  when 2
  	  	FreshTobacco.find_by_task_id(self.id)
  	  when 3
        Contract.find_by_task_id(self.id)
  	  when 4
  	  	Packing.find_by_task_id(self.id)
      when 6
        DryTobacco.find_by_task_id(self.id)
      # when 6
      #   Grading.find_by_task_id(self.id)
      # when 7
      #   Arbitration.find_by_task_id(self.id)

  	end
  end


	def self.dispatch(user, room)
    Task.transaction do
      begin
        task = Task.new(user: user, room: room, task_number: generate_task_number, step: 0)
        task.save!
        room.update_attributes!(status: false)
        {code: 200, task: task, address: room.address}
      rescue ActiveRecord::RecordInvalid => invalid
        Rails.logger.error invalid.record.errors.messages.inspect
        {code: 400, errors: task.errors}
      end
    end
	end

	def self.generate_task_number
		created_at = Time.now.to_s
    SecureRandom.hex(2).upcase + created_at.slice(0, created_at.index('+')).gsub(/[^\d]/, '')
	end

  def unbound
    unless self.step > 0
      Task.transaction do
        destroy!
        self.room.update_attributes!(status: true)
        return {code: 200}
      end
      return {code: 500, error: 'can not unbound task'}
    end
    {code: 400, error: 'can not unbound a effective task'}
  end

  private
  def validate_room_status
    unless self.room.status
      errors.add(:binding, "#{self.room.address} 已经被绑定");
    end
    self.room.status
  end

end
