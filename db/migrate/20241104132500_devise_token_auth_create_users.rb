class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[6.1]
  def change
    change_table(:users) do |t|
      ## Required
      t.string :provider, :null => false, :default => "email"
      t.string :uid, :null => false, :default => ""

      ## Tokens
      t.text :tokens

      ## Confirmable (If needed)
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      ## Uncomment if using
      # t.boolean  :allow_password_change, :default => false
      # t.integer  :failed_attempts, :default => 0, :null => false
      # t.string   :unlock_token
      # t.datetime :locked_at
      # t.string   :nickname
      # t.string   :image
    end

    add_index :users, [:uid, :provider],     unique: true
    add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
