class Book < ApplicationRecord

  belongs_to :user
  has_many :books_categories
  has_many :diaries

end
