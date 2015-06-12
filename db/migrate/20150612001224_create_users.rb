class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :primary_first_name
      t.string :primary_last_name
      t.string :secondary_first_name
      t.string :secondary_last_name
      t.string :primary_phone
      t.string :secondary_phone
      t.string :primary_email
      t.string :secondary_email
      t.string :address
      t.string :originization
      t.boolean :salutation
      t.boolean :phone_type

      t.timestamps null: false
    end
  end
end
