class Api::V1::DiariesController < ApplicationController
  def new
    diary = Diary.new
    books = Book.where(user_id: 1)
    render json: { diary: diary, books: books }
  end

  def create
    diary = Diary.new(diary_params)
    diary.user_id = 1
    diary.book_id = 1
    # byebug
    if diary.save
      diaries = Diary.order(updated_at: :desc)
      render json: diaries
    else
      render json: diary.errors, status: 422
    end
  end

  def index
    diaries = Diary.order(updated_at: :desc)
    user = User.find(1)
    profile_image_url = url_for(user.get_profile_image)
    render json: { diaries: diaries, user: user, profile_image_url: profile_image_url}
  end

  def show
    diary = Diary.find(params[:id])
    books = Book.where(user_id: 1)
    # render json: diary
    render json: { diary: diary, books: books }
  end

  def edit
    diary = Diary.find(params[:id])
    books = Book.where(user_id: current_user.id)
    render json: { diary: diary, books: books }
  end

  def update
    diary = Diary.find(params[:id])
    diary.update(diary_params)
  end

  def destroy
    diary = Diary.find(params[:id])
    diary.destroy
  end

  private

  def diary_params
    params.require(:diary).permit(:comment, :time, :date, :public_id, :book_id, :title)
  end
end
