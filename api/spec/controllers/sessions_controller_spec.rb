require "rails_helper"

RSpec.describe SessionsController, type: :controller do
  
  let!(:user) do
    User.create(
      name: Faker::Name.name,
      email: "test@dominio.com",
      password: "123456"
    )
  end

  describe "POST #login" do
    it "return http status bad request when you do not pass parameters" do
      post :create
      expect(response).to have_http_status(:bad_request)
    end

    it "return json with a error message when you do not pass parameters" do
      post :create
      expected_response = JSON.parse(response.body)["errors"]["message"];
      expect(expected_response).to eq("You have to pass the parameters 'email' and 'password'")
    end

    it "return http status bad request when you pass an email or password incorrect" do
      post :create, params: {email:user.email, password: "asdasdhkljlasd"},as: :json
      expect(response).to have_http_status(:bad_request)
    end

    it "return json with a error message when you pass an email or password incorrect" do
      post :create, params: {email:user.email, password: "asdasdhkljlasd"},as: :json
      expected_response = JSON.parse(response.body)["errors"]["message"];
      expect(expected_response).to eq("Incorrect email or password")
    end

    it "return http status ok when you pass an email and password correct" do
      post :create, params: {email:user.email, password: user.password},as: :json
      expect(response).to have_http_status(:ok)
    end

    it "return json with attributes id, email and name" do
      post :create, params: {email:user.email, password: user.password},as: :json
      expected_response = JSON.parse(response.body);
      expect(expected_response.keys.size).to eq(2)

      expect(expected_response.keys).to include("name")
      expect(expected_response.keys).to include("email")

      expect(expected_response["name"]).to eq(user.name)
      expect(expected_response["email"]).to eq(user.email)
    end
  end

  describe "DELETE #logout" do

    context "Without logging in done previously" do
      it "return http status unauthorized" do
        delete :destroy
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "With logging in done previously" do

      before do
        cookies.signed[:auth_token] = user.token
      end

      it "return http status ok " do
        delete :destroy
        expect(response).to have_http_status(:ok)
      end
    end
  end
end