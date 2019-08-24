require "rails_helper"

RSpec.describe SpotsController, type: :controller do
  let!(:user) do
    User.create(
      name: Faker::Name.name,
      email: "test@dominio.com",
      password: "123456"
    )
  end

  let!(:favorite1) do
    FavoriteRestaurant.create(
      restaurant_id:"ChIJpSBYQ2TOBZERrK59vkz3v9g",
      name:"La Familia",
      latitude:"-11.9913905",
      longitude:"-77.0873197",
      user_id:user.id
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

      describe "Error cases without sending parameters" do

        it "return http status bad request when you don't pass any parameters" do
          get :index
          expect(response).to have_http_status(:bad_request)
        end

        it "return a specific error message when you don't pass any parameters" do
          get :index
          expected_response = JSON.parse(response.body)["errors"]["message"]
          expect(expected_response).to eq("You have to pass the parameters 'lat' and 'lng'")
        end
      end

      describe "Error cases for lat parameter" do

        it "return http status bad request when you only pass lat parameter" do
          get :index, params: { lat: -11.9876429 }
          expect(response).to have_http_status(:bad_request)
        end

        it "return a specific error message when you only pass lat parameter" do
          get :index, params: { lat: -11.9876429 }
          expected_response = JSON.parse(response.body)["errors"]["message"]
          expect(expected_response).to eq("You have to pass the parameters 'lat' and 'lng'")
        end

        it "return http status bad request when you pass lng and lat parameters but lat is not number" do
          get :index, params: { lat: "asdasdasd", lng: -77.0909696 }
          expect(response).to have_http_status(:bad_request)
        end

        it "return a specific error message when you pass lng and lat parameters but lat is not number" do
          get :index, params: { lat: "asdasdasd", lng: -77.0909696 }
          expected_response = JSON.parse(response.body)["errors"]["message"]
          expect(expected_response).to eq("invalid value for Float(): \"asdasdasd\"")
        end
      end

      describe "Error cases for lng parameter" do
        it "return http status bad request when you only pass lng parameter" do
          get :index, params: { lng: -77.0909696 }
          expect(response).to have_http_status(:bad_request)
        end

        it "return a specific error message when you only pass lng parameter" do
          get :index, params: { lng: -77.0909696 }
          expected_response = JSON.parse(response.body)["errors"]["message"]
          expect(expected_response).to eq("You have to pass the parameters 'lat' and 'lng'")
        end

        it "return http status bad request when you pass lng and lat parameters but lng is not number" do
          get :index, params: { lat: -11.9876429, lng: "asdasdasd" }
          expect(response).to have_http_status(:bad_request)
        end

        it "return a specific error message when you pass lng and lat parameters but lng is not number" do
          get :index, params: { lat: -11.9876429, lng: "asdasdasd" }
          expected_response = JSON.parse(response.body)["errors"]["message"]
          expect(expected_response).to eq("invalid value for Float(): \"asdasdasd\"")
        end
      end

      describe "Success cases" do

        it "return http status ok" do
          get :index, params: { lat: -11.9876429, lng: -77.0909696 }
          expect(response).to have_http_status(:ok)
        end

        it "render json with all spots near to current location" do
          get :index, params: { lat: -11.9876429, lng: -77.0909696 }
          spots = JSON.parse(response.body)
          expect(spots.size).to eq 10
        end
      end
    end

  end

  describe "GET #show" do

    context "Without logging in previously" do

      it "return http status unauthorized by default" do
        get :show, params: { id: "asdsasasd" }
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        get :show, params: { id: "asdsasasd" }
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in done previously" do
      before do
        cookies.signed[:auth_token] = user.token
      end

      describe "Error cases when the id does not exist" do

        it "return http status ok" do
          get :show, params: { id: "asdsasasd" }
          expect(response).to have_http_status(:bad_request)
        end

        it "render json with all spots near to current location" do
          get :show, params: { id: "asdsasasd" }
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = "{\n   \"html_attributions\" : [],\n   \"status\" : \"INVALID_REQUEST\"\n}\n"
          expect(expected_response).to eq(real_response)
        end
      end

      describe "Success cases" do

        it "return http status ok" do
          get :show, params: { id: favorite1.restaurant_id }
          expect(response).to have_http_status(:ok)
        end

        it "render json with all keys of a restaurant" do
          get :show, params: { id: favorite1.restaurant_id }
          spot = JSON.parse(response.body)
          expect(spot["isFavorite"]).to eq(true)
        end
      end
    end

  end

  describe "DELETE #destroy_favorite_favorite" do

    context "Without logging in done previously" do

      it "return http status unauthorized by default" do
        delete :destroy_favorite, params: { id: "asdasasasdasd" }
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        delete :destroy_favorite, params: { id: "asasdassa" }
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in done previously" do

      before do
        cookies.signed[:auth_token] = user.token
      end

      it "returns http status not found when you pass an id which does not exist" do
        delete :destroy_favorite, params: { id: "sadasdas"}
        expect(response).to have_http_status(:not_found)
      end

      it "render json with a specify error message when you pass an id which does not exist" do
        delete :destroy_favorite, params: { id: "sadasdas"}
        expected_response = JSON.parse(response.body)
        real_response = "Couldn't find Favorite Restaurant with 'id'=sadasdas"
        expect(expected_response["errors"]["message"]).to eq(real_response)
      end

      it "returns http status ok when you pass an id which exists " do
        delete :destroy_favorite, params: { id: favorite2.restaurant_id }
        expect(response).to have_http_status(:ok)
      end

      it "render a specific message when you pass an id which exists" do
        delete :destroy_favorite, params: { id: favorite2.restaurant_id }
        expected_response = JSON.parse(response.body)
        expect(expected_response["message"]).to eq("Favorite Spot Deleted Successfully")
      end
    end
  end
end