require 'faker'

#Create users
User.delete_all

user1 = User.create(
  name: "Usuario Test",
  email: "test@test.com",
  password: "123456"
)

user2 = User.create(
  name: "Usuario Test 2",
  email: "test2@test.com",
  password: "123456"
)

50.times.each do |val|
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.free_email,
    password: "123456"
  )
end

p "Users created"

#Create Locations
Location.delete_all

Location.create(
  name: "Ovalo Miraflores",
  address: "Parque Kennedy",
  latitude: "-12.119109",
  longitude: "-77.029313",
  district: "Miraflores",
  user_id:user1.id
)

Location.create(
  name: "Cercanias de Larcomar",
  address: "Armendariz",
  latitude: "-12.134923", 
  longitude: "-77.025859",
  district: "Miraflores",
  user_id:user1.id
)

Location.create(
  name: "Casa de mi amigo Paul",
  address: "Calle Jorge Chavez",
  latitude: "-12.121387", 
  longitude: "-77.036953",
  district: "Miraflores",
  user_id:user1.id
)

Location.create(
  name: "Matsuri",
  address: "Avenida Manuel Cipriano Dulanto 1911",
  latitude: "-12.075754", 
  longitude: "-77.076761",
  district: "Pueblo Libre",
  user_id:user1.id
)

Location.create(
  name: "Alrededores del Matsuri",
  address: "Avenida Manuel Cipriano Dulanto 1911",
  latitude: "-12.075754", 
  longitude: "-77.076761",
  district: "Pueblo Libre",
  user_id:user2.id
)

50.times.each do |val|
  min_id = User.select("id").min.id
  max_id = User.select("id").max.id
  Location.create(
    name: Faker::Address.street_name,
    address: Faker::Address.street_address,
    latitude: Faker::Address.latitude, 
    longitude: Faker::Address.longitude,
    district: Faker::Address.city,
    user_id:rand(min_id..max_id)
  )
end

p "Locations created"

#Create Favorite Restaurants
FavoriteRestaurant.delete_all

FavoriteRestaurant.create(
  restaurant_id:"ChIJpSBYQ2TOBZERrK59vkz3v9g",
  name:"La Familia",
  latitude:"-11.9913905",
  longitude:"-77.0873197",
  user_id:user1.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJyTFGS4XPBZER3KOQZ5MtZEk",
  name: "PIZZERIA FAMILY VEGA",
  latitude: "-11.986539",
  longitude: "-77.0886132",
  user_id:user1.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJd3xWNW7OBZERBXa1TkEHZrU",
  name: "Cevicheria Puerto Tumbesino",
  latitude: "-11.9847463",
  longitude: "-77.089552",
  user_id:user1.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
  name: "Alphonse Bar",
  latitude: "-12.0917299",
  longitude: "-77.0248756",
  user_id:user1.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJralaRGfIBZERQNqvaZxldKk",
  name: "Punto Azul",
  latitude: "-12.0920862",
  longitude: "-77.03248459999999",
  user_id:user1.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJd3xWNW7OBZERBXa1TkEHZrU",
  name: "Cevicheria Puerto Tumbesino",
  latitude: "-11.9847463",
  longitude: "-77.089552",
  user_id:user2.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
  name: "Alphonse Bar",
  latitude: "-12.0917299",
  longitude: "-77.0248756",
  user_id:user2.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJralaRGfIBZERQNqvaZxldKk",
  name: "Punto Azul",
  latitude: "-12.0920862",
  longitude: "-77.03248459999999",
  user_id:user2.id
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
  name: "Alphonse Bar",
  latitude: "-12.0917299",
  longitude: "-77.0248756",
  user_id:23
)

FavoriteRestaurant.create(
  restaurant_id: "ChIJralaRGfIBZERQNqvaZxldKk",
  name: "Punto Azul",
  latitude: "-12.0920862",
  longitude: "-77.03248459999999",
  user_id:12
)

p "Favorite restaurants created"