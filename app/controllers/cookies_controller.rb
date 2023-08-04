class CookiesController < ApplicationController
  before_action :authenticate_user!

  def new
    @oven = current_user.ovens.find_by!(id: params[:oven_id])
    if @oven.cookie.present?
      redirect_to @oven, alert: 'A cookie is already in the oven!'
    else
      @cookie = @oven.cookie.build
    end
  end

  def create
    @oven = current_user.ovens.find_by!(id: params[:oven_id])
    @cookies = @oven.cookies.create(cookie_batch_params)
    BakeOvenCookiesJob.set(wait: 30.seconds).perform_later(@oven)
    redirect_to oven_path(@oven), notice: 'Your cookies will be ready in a few minutes!'
  end

  private

  def cookie_batch_params
    Array.new(cookie_params[:cookie_count].to_i) { { fillings: cookie_params[:fillings] } }
  end

  def cookie_params
    params.require(:cookie).permit(:fillings, :cookie_count)
  end
end
