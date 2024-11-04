class Api::V1::BooksController < ApplicationController
  def index
    books = Book.order(updated_at: :desc)
    user = User.find(1)
    profile_image_url = url_for(user.get_profile_image)
    render json: {books: books, user: user, profile_image_url: profile_image_url }
  end

  def show
    book = Book.find(params[:id])
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
    book = Book.find(params[:id])
    render json: book
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      books = Book.order(updated_at: :desc)
      render json: books
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