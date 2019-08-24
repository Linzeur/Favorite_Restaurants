class LocationsController < ApplicationController

  before_action :set_location, only: [ :update, :destroy]

  def index
    current_user
    render json: Location.where(user_id: @current_user[:id])
  end
  
  def create
    location = Location.new(location_params)
    if location.save
      render json: location, status: :created
    else
      render_errors(location.errors.full_messages.join("|"), :unprocessable_entity)
    end
  end

  def update
    if @location.update(location_params)
      render json: @location, status: :ok
    else
      render_errors(@location.errors.full_messages.join("|"), :unprocessable_entity)
    end
  end

  def destroy
    @location.destroy
    render json: { message: "Location Deleted Successfully" }
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_errors(e.message, :not_found)
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    current_user
    params[:user_id]=@current_user.id
    params.permit(:name, :address, :latitude, :longitude, :district, :user_id)
  end

  
end