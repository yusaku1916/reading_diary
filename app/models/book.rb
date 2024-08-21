class Book < ApplicationRecord

  belongs_to :user
  has_many :books_categories

end
