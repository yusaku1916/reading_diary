class AddDeviseToUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      ## Database authenticatable
      # t.string :email, null: false, default: ""  ← 既に存在するのでコメントアウト
      # t.string :encrypted_password, null: false, default: ""  ← 既に存在するのでコメントアウト

      ## Recoverable
      # t.string   :reset_password_token  ← 既に存在するのでコメントアウト
      # t.datetime :reset_password_sent_at  ← 既に存在するのでコメントアウト

      ## Rememberable
      # t.datetime :remember_created_at  ← 既に存在するのでコメントアウト

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      ## Tokens
      t.text :tokens

      # Uncomment below if timestamps were not included in your original model.
      # t.timestamps null: false
    end

    add_index :users, :email, unique: true unless index_exists?(:users, :email)
    add_index :users, :reset_password_token, unique: true unless index_exists?(:users, :reset_password_token)
    add_index :users, :confirmation_token, unique: true unless index_exists?(:users, :confirmation_token)
    # add_index :users, :unlock_token, unique: true
  end
end
