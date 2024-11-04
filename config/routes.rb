Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  # devise_for :users
  root to: redirect('/books')
  
  get 'books', to: 'sites#index'
  get 'books/new', to: 'sites#index'
  get 'books/:id/edit', to: 'sites#index'

  get 'diaries', to: 'sites#index'
  get 'diaries/new', to: 'sites#index'
  get 'diaries/:id/edit', to: 'sites#index'

  get 'user/:id/edit', to: 'sites#index'
  
  namespace :api do 
    namespace :v1 do
      delete 'books/destroy_all', to: 'books#destroy_all'
      resources :books, only: %i[index show create edit destroy update new]
      resources :diaries, only: %i[index show create edit destroy update new]
      resources :users, only: %i[show edit update]
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
