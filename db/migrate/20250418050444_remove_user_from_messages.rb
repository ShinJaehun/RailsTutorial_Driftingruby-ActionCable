class RemoveUserFromMessages < ActiveRecord::Migration[7.1]
  def change
    remove_column :messages, :user, :string
  end
end
