class BakeOvenCookiesJob < ApplicationJob
  def perform(oven)
    oven.cookies.each{ |cookie| cookie.update(baked: true) }

    OvenChannel.broadcast_to(oven, cookies_baked: oven.cookies.all?(&:ready?))
  end
end
