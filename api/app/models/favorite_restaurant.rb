class FavoriteRestaurant < ApplicationRecord
  validates :restaurant_id,:name, presence: true
  validates :latitude,
            :numericality => { :greater_than_or_equal_to => -90, :less_than_or_equal_to => 90 }
  validates :longitude,
            :numericality => { :greater_than_or_equal_to => -180, :less_than_or_equal_to => 180 }

  belongs_to :user
end
