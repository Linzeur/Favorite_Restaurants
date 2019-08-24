require "rails_helper"

RSpec.describe LocationsController, type: :controller do
  let!(:user) do
    User.create(
      name: Faker::Name.name,
      email: "test@dominio.com",
      password: "123456"
    )
  end

  let!(:location1) do
    Location.create(
      name: "Ovalo Miraflores",
      address: "Parque Kennedy",
      latitude: "-12.119109",
      longitude: "-77.029313",
      district: "Miraflores",
      user_id:user.id
    )
  end

  let!(:location2) do
    Location.create(
      name: "Cercanias de Larcomar",
      address: "Armendariz",
      latitude: "-12.134923", 
      longitude: "-77.025859",
      district: "Miraflores",
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
          "name",
          "address",
          "latitude",
          "longitude",
          "district"
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

      describe "Error cases for parameter name" do

        it "return http status unprocessable entity when you only pass a name in blank" do
          post :create, params: { name:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a name in blank" do
          post :create, params: { name:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
                            "Name can't be blank",
                            "Address can't be blank",
                            "District can't be blank",
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
            "Address can't be blank",
            "District can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Error cases for parameter address" do

        it "return http status unprocessable entity when you only pass a address in blank" do
          post :create, params: { address:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a address in blank" do
          post :create, params: { address:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
                            "Name can't be blank",
                            "Address can't be blank",
                            "District can't be blank",
                            "Latitude is not a number",
                            "Longitude is not a number"
                          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a address" do
          post :create, params: { address:"Direccion" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a address" do
          post :create, params: { address:"Direccion" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Name can't be blank",
            "District can't be blank",
            "Latitude is not a number",
            "Longitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Error cases for parameter district" do

        it "return http status unprocessable entity when you only pass a district in blank" do
          post :create, params: { district:"" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a district in blank" do
          post :create, params: { district:"" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
                            "Name can't be blank",
                            "Address can't be blank",
                            "District can't be blank",
                            "Latitude is not a number",
                            "Longitude is not a number"
                          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
  
        it "return http status unprocessable entity when you only pass a district" do
          post :create, params: { district:"Distrito" },as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
  
        it "return specific error message when you only pass a district" do
          post :create, params: { district:"Distrito" },as: :json
          expected_response = JSON.parse(response.body)["errors"]["message"]
          real_response = [ 
            "Name can't be blank",
            "Address can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
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
            "Name can't be blank",
            "Address can't be blank",
            "District can't be blank",
            "Latitude is not a number"
          ]
          expect(expected_response).to eq(real_response.join("|"))
        end
      end

      describe "Create successfully" do

        it "return http status created when you pass all fields with correct values" do
          post :create, params: {
                                  name: "Nueva locacion",
                                  address: "Avenida test 123",
                                  district: "Miraflores",
                                  latitude: "-12.5656",
                                  longitude: "-77.334"
                                }, as: :json
          expect(response).to have_http_status(:created)
        end
    
        it "render a json with all values created when you pass all fields with correct values" do
            post :create, params: {
                                    name: "Nueva locacion",
                                    address: "Avenida test 123",
                                    district: "Miraflores",
                                    latitude: "-12.5656",
                                    longitude: "-77.334"
                                  }, as: :json
            expected_response = JSON.parse(response.body)
            expect(expected_response["name"]).to eq("Nueva locacion")
            expect(expected_response["address"]).to eq ("Avenida test 123")
            expect(expected_response["district"]).to eq("Miraflores")
            expect(expected_response["latitude"]).to eq ("-12.5656")
            expect(expected_response["longitude"]).to eq ("-77.334")
        end
      end
    end
  end

  describe "PUT #update" do

    context "Without logging in previously" do

      it "return http status unauthorized by default" do
        put :update, params: { id: 1 }
        expect(response).to have_http_status(:unauthorized)
      end

      it "return a specific error message by default" do
        put :update, params: { id: 1 }
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Access denied")
      end
    end

    context "With logging in previously" do

      before do
        cookies.signed[:auth_token] = user.token
      end

      it "returns http status not found when you pass an id which is not exists" do
          put :update, params: { id: "sadasdas"}
          expect(response).to have_http_status(:not_found)
      end

      it "render json with a specify error message when you pass an id which is not exists" do
          put :update, params: { id: "sadasdas"}
          expected_response = JSON.parse(response.body)
          expect(expected_response["errors"]["message"]).to eq("Couldn't find Location with 'id'=sadasdas")
      end

      it "returns http status ok when you pass an id which is exists and a new name" do
        put :update, params: { id: location1.id, name:"Test Location"}
        expect(response).to have_http_status(:ok)
      end

      it "render json with all values updated when you pass an id which is exists and a new name" do
          put :update, params: { id: location1.id, name:"Test Location"}
          expected_response = JSON.parse(response.body)
          expect(expected_response["name"]).to eq("Test Location")
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

      it "returns http status not found when you pass an id which does not exist" do
        delete :destroy, params: { id: "sadasdas"}
        expect(response).to have_http_status(:not_found)
      end

      it "render json with a specify error message when you pass an id which does not exist" do
        delete :destroy, params: { id: "sadasdas"}
        expected_response = JSON.parse(response.body)
        expect(expected_response["errors"]["message"]).to eq("Couldn't find Location with 'id'=sadasdas")
      end

      it "returns http status ok when you pass an id which exists" do
        delete :destroy, params: { id: location2.id }
        expect(response).to have_http_status(:ok)
      end

      it "render a specific messsage when you pass an id which exists " do
        delete :destroy, params: { id: location2.id }
        expected_response = JSON.parse(response.body)
        expect(expected_response["message"]).to eq("Location Deleted Successfully")
      end
    end
  end
end