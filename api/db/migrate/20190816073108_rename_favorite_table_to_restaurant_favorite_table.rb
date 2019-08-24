class RenameFavoriteTableToRestaurantFavoriteTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :favorites, :favorite_restaurants
  end
end
