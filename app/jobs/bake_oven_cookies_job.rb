class BakeOvenCookiesJob < ApplicationJob
  def perform(oven)
    oven.cookies.each{ |cookie| cookie.update(baked: true) }
  end
end
