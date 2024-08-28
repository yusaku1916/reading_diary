class UsersController < ApplicationController
  def edit
    @user = User.find(current_user.id)
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    redirect_to books_path
  end

  def show
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:name, :introduction, :profile_image)
  end
end
