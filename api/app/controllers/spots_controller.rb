class SpotsController < ApplicationController
  before_action :initialize_client, only: [ :index, :show ]
  before_action :set_spot, only: [ :destroy_favorite ]

  def index
    if params.has_key?("lat") && params.has_key?("lng")
      begin
        places = @client.spots(
                                params[:lat],
                                params[:lng],
                                :types=> "restaurant",
                                :radius=> 1000
                              )
                            
        places.sort_by! do |place|
          coord_origen = [ params[:lat].to_f, params[:lng].to_f ]
          coord_final = [ place[:lat], place[:lng] ]
          distance_between_coords(coord_origen, coord_final)
        end

        render json: places.take(10)
      rescue ArgumentError => e
        render_errors(e, :bad_request)
      end
    else
      render_errors("You have to pass the parameters 'lat' and 'lng'", :bad_request)
    end
  end

  def show
    array_fields =  [
                    "place_id",
                    "vicinity",
                    "lat",
                    "lng",
                    "name",
                    "rating",
                    "price_level",
                    "opening_hours"
                    ]
    begin
      spot_detail = @client.spot( params[:id], fields: array_fields.join(",") ).as_json
      spot_detail["isFavorite"] = spot_is_favorite( spot_detail["place_id"] )
      render json: spot_detail
    rescue StandardError => e
      render_errors(e, :bad_request)
    end
  end

  def destroy_favorite
    if @spot_favorite
      @spot_favorite.destroy
      render json: { message: "Favorite Spot Deleted Successfully" }
    else
      render_errors("Couldn't find Favorite Restaurant with 'id'=#{params[:id]}", :not_found)
    end
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_errors(e.message, :not_found)
  end

  private

  def initialize_client
    @client = GooglePlaces::Client.new(ENV["API_KEY_GOOGLE"])
  end

  def set_spot
    current_user
    @spot_favorite = FavoriteRestaurant.find_by(user_id: @current_user[:id], restaurant_id: params[:id])
  end

  def spot_is_favorite(place_id)
    current_user
    !FavoriteRestaurant.find_by(user_id: @current_user[:id], restaurant_id: place_id).nil?
  end

  def distance_between_coords(coord_origen, coord_final)
    rad_per_deg = Math::PI/180  # PI / 180
    radius_meters = 6371 * 1000 # Earth radius in meters
  
    dist_lat_rad = (coord_final[0] - coord_origen[0]) * rad_per_deg
    dist_lon_rad = (coord_final[1] - coord_origen[1]) * rad_per_deg
  
    lat_origen_rad, lon_origen_rad = coord_origen.map {|i| i * rad_per_deg }
    lat_final_rad,  lon_final_rad  = coord_final.map {|i| i * rad_per_deg }
  
    a = Math.sin(dist_lat_rad/2)**2 +
        Math.cos(lat_origen_rad) * Math.cos(lat_final_rad) * Math.sin(dist_lon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
  
    radius_meters * c
  end
  
end