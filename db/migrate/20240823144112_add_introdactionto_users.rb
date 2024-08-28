class AddIntrodactiontoUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :introduction, :text, null: true
  end
end
