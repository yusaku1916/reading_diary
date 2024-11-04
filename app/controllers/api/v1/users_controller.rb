class Api::V1::UsersController < ApplicationController
  def edit
    user = User.find(current_user.id)
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:name, :introduction, :profile_image)
  end
end
