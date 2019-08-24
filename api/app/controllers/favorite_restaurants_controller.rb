class FavoriteRestaurantsController < ApplicationController

  before_action :set_favorite_restaurant, only: [ :destroy ]

  def index
    current_user
    render json: FavoriteRestaurant.where(user_id: @current_user[:id])
  end
  
  def create
    favorite_restaurant = FavoriteRestaurant.new(favorite_restaurant_params)
    if favorite_restaurant.save
      times_favorite = FavoriteRestaurant.where(restaurant_id:favorite_restaurant.restaurant_id)
      if times_favorite.size > 1
        render json: { times_favorite: times_favorite.size }
      else
        render json: favorite_restaurant, status: :created
      end
    else
      render_errors(favorite_restaurant.errors.full_messages.join("|"), :unprocessable_entity)
    end
  end

  def destroy
    @favorite_restaurant.destroy
    render json: { message: "Favorite Restaurant Deleted Successfully" }
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_errors(e.message, :not_found)
  end

  private

  def set_favorite_restaurant
    @favorite_restaurant = FavoriteRestaurant.find(params[:id])
  end

  def favorite_restaurant_params
    current_user
    params[:user_id]=@current_user.id
    params.permit(:restaurant_id, :name, :latitude, :longitude, :user_id)
  end
  
end