class OvenChannel < ApplicationCable::Channel
  def subscribed
    @oven = Oven.find params[:oven_id]
    stream_for @oven
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
