class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :restaurant_id
      t.string :name
      t.string :latitude
      t.string :longitude
      t.boolean :is_favorite
      t.references :user

      t.timestamps
    end
  end
end
