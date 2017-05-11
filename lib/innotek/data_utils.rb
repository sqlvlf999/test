module DataUtils

	def done(weight = 1)
		ActiveRecord::Base.transaction do
      begin
        save!
        task.update_attributes!(step: task.step + weight)
      rescue ActiveRecord::RecordInvalid => invalid
        Rails.logger.error invalid.record.errors.messages.inspect
        raise ActiveRecord::Rollback
        false
      end
    end
	end

  def decode_image_data
    if image_data
      data = StringIO.new(Base64.decode64(image_data))
      data.class.class_eval {attr_accessor :original_filename, :content_type}
      data.original_filename = "#{DateTime.now.to_i}" + '.png'
      data.content_type = 'image/png'
      self.image = data
    end
  end

end

