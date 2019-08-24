class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :latitude, :longitude, :district
end
