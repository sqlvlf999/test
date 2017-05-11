class User < ActiveRecord::Base
  before_create :generate_token

  belongs_to :station
  has_many   :tasks

  attr_accessor :password

  validates :phone,    presence: true
  validates :password, length: { in: 6..20 }
  validates :name,     presence: true
 

  def self.encrypt_password(password, salt)
    BCrypt::Engine.hash_secret(password, salt)
  end


  def self.authenticate(phone, password)
    if user = User.find_by_phone(phone)
      if user.hashed_password == encrypt_password(password, user.salt)
        user
      end
    end
  end

  def password=(password)
    @password = password

    if password.present?
      generate_salt
      self.hashed_password = self.class.encrypt_password(password, salt)
    end
  end

  private

  def password_must_be_present
    errors.add(:password, 'Missing password') unless hashed_password.present?
  end

  def generate_salt
    self.salt = BCrypt::Engine.generate_salt
  end

  def generate_token
    begin
      self.token = SecureRandom.hex
    end while self.class.exists?(token: token)
  end

end