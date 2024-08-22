class DiariesController < ApplicationController
  def new
    @diary = Diary.new
    @books = Book.where(user_id: current_user.id)
  end

  def create
    diary = Diary.new(diary_params)
    diary.user_id = current_user.id
    # byebug
    diary.save
    redirect_to diaries_path
  end

  def index
    @diaries = Diary.where(user_id: current_user.id)
    @books = Book.where(user_id: current_user.id)
  end

  def show
    @diary = Diary.find(params[:id])
    @book = Book.find(@diary.book_id)
  end

  def edit
    @diary = Diary.find(params[:id])
    @books = Book.where(user_id: current_user.id)
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
    params.require(:diary).permit(:comment, :time, :date, :public_id, :book_id)
  end
end
