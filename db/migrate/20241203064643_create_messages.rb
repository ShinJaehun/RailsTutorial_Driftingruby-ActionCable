class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.string :user
      t.text :content

      t.timestamps
    end
  end
end
