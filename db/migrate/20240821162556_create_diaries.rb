class CreateDiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :diaries do |t|
      t.string "comment"
      t.datetime "date"
      t.integer "time"
      t.integer "public_id"
      t.integer "user_id"
      t.integer "book_id"
      t.timestamps
    end
  end
end
