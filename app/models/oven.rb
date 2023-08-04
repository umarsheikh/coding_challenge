class Oven < ActiveRecord::Base
  belongs_to :user
  has_many :cookie, as: :storage, dependent: :destroy

  validates :user, presence: true
end
