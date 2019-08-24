class RemoveIsFavoriteFromFavoriteRestaurant < ActiveRecord::Migration[5.2]
  def change
    remove_column :favorite_restaurants, :is_favorite
  end
end
