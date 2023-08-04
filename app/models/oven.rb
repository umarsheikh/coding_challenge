class Oven < ActiveRecord::Base
  belongs_to :user
  has_many :cookies, as: :storage, dependent: :destroy

  validates :user, presence: true
end
