class OvensController < ApplicationController
  before_action :authenticate_user!

  def index
    @ovens = current_user.ovens
  end

  def show
    @oven = current_user.ovens.find_by!(id: params[:id])
  end

  def empty
    @oven = current_user.ovens.find_by!(id: params[:id])
    @oven.cookies.select(&:ready?).each do |baked_cookie|
      baked_cookie.update!(storage: current_user)
    end
    redirect_to @oven, alert: 'Oven emptied!' if @oven.reload.cookies.empty?
  end
end
