class Cookie < ActiveRecord::Base
  belongs_to :storage, polymorphic: :true

  validates :storage, presence: true

  attr_accessor :cookie_count

  def ready?
    self.baked
  end
end
