class AddTitleToDiaries < ActiveRecord::Migration[6.1]
  def change
    add_column :diaries, :title, :string
  end
end
