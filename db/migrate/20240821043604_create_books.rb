class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string "name"
      t.string "author"
      t.datetime "start_day"
      t.integer "user_id"
      t.timestamps
    end
  end
end
