class FavoriteRestaurantSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_id, :name, :latitude, :longitude
end
