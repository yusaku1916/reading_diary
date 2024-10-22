Rails.application.routes.draw do

  root to: redirect('/books')
  
  get 'books', to: 'sites#index'
  get 'books/new', to: 'sites#index'
  get 'books/:id/edit', to: 'sites#index'
  
  namespace :api do 
    namespace :v1 do
      delete 'books/destroy_all', to: 'books#destroy_all'
      resources :books, only: %i[index show create edit destroy]
    end
  end

  # get 'users/edit'
  # get 'users/show'
  # get 'users/delete'
  # devise_for :users
  # root to: 'homes#top'
  # get 'homes/about'

  # resources :users
  # resources :books
  # resources :diaries
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
