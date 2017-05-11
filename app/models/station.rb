class Station < ActiveRecord::Base

  belongs_to :county

	has_many :users
	has_many :middlewares
	has_many :rooms

	validates :title, presence: true
	validates :code,  presence: true
	validates :code, uniqueness: true
end
