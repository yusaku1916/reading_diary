Rails.application.routes.draw do
  get 'users/edit'
  get 'users/show'
  get 'users/delete'
  devise_for :users
  root to: 'homes#top'
  get 'homes/about'

  resources :users
  resources :books
  resources :diaries
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
