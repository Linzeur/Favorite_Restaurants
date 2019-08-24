require "rails_helper"

RSpec.describe FavoriteRestaurantsController, type: :controller do
  let!(:user) do
    User.create(
      name: Faker::Name.name,
      email: "test@dominio.com",
      password: "123456"
    )
  end

  let!(:another_user) do
    User.create(
      name: Faker::Name.name,
      email: "test2@dominio.com",
      password: "123456"
    )
  end

  let!(:favorite1) do
    FavoriteRestaurant.create(
      restaurant_id:"ChIJpSBYQ2TOBZERrK59vkz3v9g",
      name:"La Familia",
      latitude:"-11.9913905",
      longitude:"-77.0873197",
      user_id:another_user.id
    )
  end

  let!(:favorite2) do
    FavoriteRestaurant.create(
      restaurant_id: "ChIJyTFGS4XPBZER3KOQZ5MtZEk",
      name: "PIZZERIA FAMILY VEGA",
      latitude: "-11.986539",
      longitude: "-77.0886132",
      user_id:user.id
    )
  end

  let!(:favorite3) do
    FavoriteRestaurant.create(
      restaurant_id: "ChIJd3xWNW7OBZERBXa1TkEHZrU",
      name: "Cevicheria Puerto Tumbesino",
      latitude: "-11.9847463",
      longitude: "-77.089552",
      user_id:user.id
    )
  end
  
    
  describe "GET #index" do

    context "Without logging in previously" do

      it "return http status unauthorized by default" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        get :index
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in done previously" do
      before do
        cookies.signed[:auth_token] = user.token
      end

      it "return http status ok" do
        get :index
        expect(response).to have_http_status(:ok)
      end

      it "render json with all locations of the logged in user" do
        get :index
        locations = JSON.parse(response.body)
        expect(locations.size).to eq 2
        expect(locations.first.keys).to match_array([
          "id",
          "restaurant_id",
          "name",
          "latitude",
          "longitude"
        ])
      end
    end

  end

  describe "POST #create" do

    context "Without logging in previously" do

      it "return http status unauthorized by default" do
        post :create
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        post :create
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in previously" do

      before do
        cookies.signed[:auth_token] = user.token
      end

      describe "Error cases for parameter restaurant_id" do

        it "return http status unprocessable entity when you only pass a restaurant_id in blank" do
          post :create, params: { restaurant_id:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a restaurant_id in blank" do
          post :create, params: { restaurant_id:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [
                            "Restaurant can't be blank",
                            "Name can't be blank",
                            "Latitude is not a number",
                            "Longitude is not a number"
                          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a restaurant_id" do
          post :create, params: { restaurant_id:"Direccion" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a restaurant_id" do
          post :create, params: { restaurant_id:"Direccion" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Error cases for parameter name" do

        it "return http status unprocessable entity when you only pass a name in blank" do
          post :create, params: { name:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a name in blank" do
          post :create, params: { name:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
                            "Restaurant can't be blank",
                            "Name can't be blank",
                            "Latitude is not a number",
                            "Longitude is not a number"
                          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a name" do
          post :create, params: { name:"Nombre de locacion" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a name" do
          post :create, params: { name:"Nombre de locacion" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Error cases for parameter latitude" do

        it "return http status unprocessable entity when you only pass a latitude in blank" do
          post :create, params: { latitude:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a latitude in blank" do
          post :create, params: { latitude:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a latitude but is not a number" do
          post :create, params: { latitude:"asdasd" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a latitude but is not a number" do
          post :create, params: { latitude:"asdsad" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a latitude greater than 90" do
          post :create, params: { latitude:"100" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a latitude greater than 90" do
          post :create, params: { latitude:"100" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude must be less than or equal to 90",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a latitude lower than -90" do
          post :create, params: { latitude:"100" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a latitude lower than -90" do
          post :create, params: { latitude:"-100" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude must be greater than or equal to -90",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a latitude between -90 and 90" do
          post :create, params: { latitude:"-12.565" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a latitude between -90 and 90" do
          post :create, params: { latitude:"-12.565" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Error cases for parameter longitude" do

        it "return http status unprocessable entity when you only pass a longitude in blank" do
          post :create, params: { longitude:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a longitude in blank" do
          post :create, params: { longitude:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a longitude but is not a number" do
          post :create, params: { longitude:"asdasd" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a longitude but is not a number" do
          post :create, params: { longitude:"asdsad" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a longitude greater than 180" do
          post :create, params: { longitude:"200" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a longitude greater than 180" do
          post :create, params: { longitude:"200" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude must be less than or equal to 180"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a longitude lower than -180" do
          post :create, params: { longitude:"200" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a longitude lower than -180" do
          post :create, params: { longitude:"-200" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number",
            "Longitude must be greater than or equal to -180"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end

        it "return http status unprocessable entity when you only pass a longitude between -180 and 180" do
          post :create, params: { longitude:"-77.565" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a longitude between -180 and 180" do
          post :create, params: { longitude:"-77.565" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Restaurant can't be blank",
            "Name can't be blank",
            "Latitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Success cases" do

        it "return http status created when you pass all fields with correct values" do
          post :create, params: {
                                  restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
                                  name: "Nueva Restaurant Favorite",
                                  latitude: "-12.5656",
                                  longitude: "-77.334",
                                }, as: :json
          expect(response).to have_http_status(:created)
        end
    
        it "render a json with all values created when you pass all fields with correct values" do
          post :create, params: {
                                  restaurant_id: "ChIJC5ldYmTIBZERTQdPOFCzsSY",
                                  name: "Nueva Restaurant Favorite",
                                  latitude: "-12.5656",
                                  longitude: "-77.334",
                                }, as: :json
            expected_response = JSON.parse(response.body)
            expect(expected_response["restaurant_id"]).to eq("ChIJC5ldYmTIBZERTQdPOFCzsSY")
            expect(expected_response["name"]).to eq ("Nueva Restaurant Favorite")
            expect(expected_response["latitude"]).to eq ("-12.5656")
            expect(expected_response["longitude"]).to eq ("-77.334")
        end

        it "return http status ok
            when you pass all fields with correct values
            but the favorite restaurant is also favorite for another user" do
          post :create, params: {
                                  restaurant_id:"ChIJpSBYQ2TOBZERrK59vkz3v9g",
                                  name:"La Familia",
                                  latitude:"-11.9913905",
                                  longitude:"-77.0873197"
                                }, as: :json
          expect(response).to have_http_status(:ok)
        end
    
        it "render the number of times that the restaurant is favorite for users
            when you pass all fields with correct values
            but the favorite restaurant is also favorite for another user" do
          post :create, params: {
                                  restaurant_id:"ChIJpSBYQ2TOBZERrK59vkz3v9g",
                                  name:"La Familia",
                                  latitude:"-11.9913905",
                                  longitude:"-77.0873197"
                                }, as: :json
            expected_response = JSON.parse(response.body)
            expect(expected_response.keys.size).to eq(1)
            expect(expected_response["times_favorite"]).to eq(2)
        end
      end
    end
  end

  describe "DELETE #destroy" do

    context "Without logging in done previously" do

      it "return http status unauthorized by default" do
        delete :destroy, params: { id: 1 }
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        delete :destroy, params: { id: 1 }
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in done previously" do

      before do
        cookies.signed[:auth_token] = user.token
      end

      it "returns http status not found when you pass an id which is not exists" do
        delete :destroy, params: { id: "sadasdas"}
        expect(response).to have_http_status(:not_found)
      end

      it "render json with a specify error message when you pass an id which is not exists" do
        delete :destroy, params: { id: "sadasdas"}
        expected_response = JSON.parse(response.body)
        expect(expected_response["errors"]["message"]).to eq("Couldn't find FavoriteRestaurant with 'id'=sadasdas")
      end

      it "returns http status ok when you pass an id which is exists and a new name" do
        delete :destroy, params: { id: favorite2.id }
        expect(response).to have_http_status(:ok)
      end

      it "render json with all values destroyd when you pass an id which is exists and a new name" do
        delete :destroy, params: { id: favorite2.id }
        expected_response = JSON.parse(response.body)
        expect(expected_response["message"]).to eq("Favorite Restaurant Deleted Successfully")
      end
    end
  end
end