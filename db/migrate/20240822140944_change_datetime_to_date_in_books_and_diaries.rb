class ChangeDatetimeToDateInBooksAndDiaries < ActiveRecord::Migration[6.1]
  def change
    change_column :books, :start_day, :date

    change_column :diaries, :date, :date
  end
end
