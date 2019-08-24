require "rails_helper"

RSpec.describe UsersController, type: :controller do
  let!(:user) do
    User.create(
      name: "juanito",
      email: "juanito@gmail.com",
      password: "123456"
    )
  end

  describe "POST #create" do

    describe "Error cases for parameter name" do

      it "return http status unprocessable entity when you only pass a name in blank" do
        post :create, params: { name:"" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass a name in blank" do
        post :create, params: { name:"" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Name can't be blank|Email Bad format|Password can't be blank")
      end

      it "return http status unprocessable entity when you only pass a name" do
        post :create, params: { name:"Test" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass a name" do
        post :create, params: { name:"Test" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Email Bad format|Password can't be blank")
      end
    end

    describe "Error cases for parameter email" do

      it "return http status unprocessable entity when you only pass an incorrect email format" do
        post :create, params: { email:"test" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass an incorrect email format" do
        post :create, params: { email:"test" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Name can't be blank|Email Bad format|Password can't be blank")
      end

      it "return http status unprocessable entity when you only pass a correct email but is repeated" do
        post :create, params: { email:"juanito@gmail.com" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass a correct email but is repeated" do
        post :create, params: { email:"juanito@gmail.com" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        real_response = "Name can't be blank|Email has already been taken|Password can't be blank"
        expect(expected_response).to eq(real_response)
      end

      it "return http status unprocessable entity when you only pass a correct email " do
        post :create, params: { email:"test@test.com" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass a correct email" do
        post :create, params: { email:"test@test.com" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Name can't be blank|Password can't be blank")
      end

      it "return http status unprocessable entity when you only pass a password in blank" do
        post :create, params: { password:"" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    describe "Error cases for parameter password" do

      it "return specific error message when you only pass a password in blank" do
        post :create, params: { password:"" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Name can't be blank|Email Bad format|Password can't be blank")
      end

      it "return http status unprocessable entity when you only pass a password" do
        post :create, params: { password:"123456" },as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "return specific error message when you only pass a password" do
        post :create, params: { password:"123456" },as: :json
        expected_response = JSON.parse(response.body)["errors"]["message"]
        expect(expected_response).to eq("Name can't be blank|Email Bad format")
      end
    end

    it "return http status ok when you pass all fields with correct values" do
      post :create, params: {
                              name: "juanito3",
                              email: "juanito3@gmail.com",
                              password: "123456"
                            }, as: :json
      expect(response).to have_http_status(:created)
    end

    it "create a new user" do
        post :create, params: {
                                name: "juanito3",
                                email: "juanito3@gmail.com",
                                password: "123456"
                              }, as: :json
        expected_response = JSON.parse(response.body)
        expect(expected_response["name"]).to eq("juanito3")
        expect(expected_response["email"]).to eq ("juanito3@gmail.com")
    end
  end
end