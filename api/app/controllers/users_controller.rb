class UsersController < ApplicationController

  skip_before_action :require_login, only: :create

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render_errors(user.errors.full_messages.join("|"), :unprocessable_entity)
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end

end