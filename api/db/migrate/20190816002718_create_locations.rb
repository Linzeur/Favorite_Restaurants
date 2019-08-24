class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.string :latitude
      t.string :longitude
      t.string :district
      t.references :user

      t.timestamps
    end
  end
end
