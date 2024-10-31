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
    # Diary.where(user_id: 1)
    # books = Book.where(user_id: 1)
    # @user = User.find(1)
    # render json: { diaries: diaries, books: books }
    render json: diaries
  end

  def show
    diary = Diary.find(params[:id])
    book = Book.find(diary.book_id)
    render json: { diary: diary, book: book }
  end

  def edit
    diary = Diary.find(params[:id])
    books = Book.where(user_id: current_user.id)
    render json: { diary: diary, books: books }
  end

  def update
    diary = Diary.find(params[:id])
    diary.update(diary_params)
    redirect_to diaries_path
  end

  def destroy
    diary = Diary.find(params[:id])
    diary.destroy
    redirect_to diaries_path
  end

  private

  def diary_params
    params.require(:diary).permit(:comment, :time, :date, :public_id, :book_id, :title)
  end
end
