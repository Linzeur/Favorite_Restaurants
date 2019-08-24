Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    resources :locations, :only => [:index, :create, :update, :destroy]
    resources :favorite_restaurants, :only => [:index, :create, :destroy]
    resources :users, :only => [:create]
    resources :spots, :only=> [:index, :show] do
      delete :destroy, action: "destroy_favorite",  on: :member
    end
  end
  
end
