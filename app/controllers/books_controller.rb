class BooksController < ApplicationController
  def new
    @book = Book.new
  end

  def create
    book = Book.new(book_params)
    book.user_id = current_user.id
    book.save
    redirect_to root_path
  end

  def index
    @books = Book.where(user_id: current_user.id)
  end

  def show
  end

  def edit
  end

  def destroy
  end

  def book_params
    params.require(:book).permit(:name, :author, :start_day)
  end
end
