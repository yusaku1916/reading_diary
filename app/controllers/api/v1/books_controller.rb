class Api::V1::BooksController < ApplicationController
  def index
    books = Book.order(updated_at: :desc)
    render json: books
  end

  def show
    books = Book.find(params[:id])
    render json: book
  end

  def create
    book = Book.new(book_params)
    book.user_id = 1
    if book.save
      books = Book.order(updated_at: :desc)
      render json: books
    else
      render json: book.errors, status: 422
    end
  end

  def edit
    books = Book.find(params[:id])
    if todo.update(book_params)
      render json: book
    else
      render json: book.errors, status: 422
    end
  end

  def destroy
    if Book.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Book.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def book_params
    params.require(:book).permit(:name, :author, :start_day)
  end

end