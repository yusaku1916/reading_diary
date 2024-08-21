Rails.application.routes.draw do
  get 'diaries/new'
  get 'diaries/create'
  get 'diaries/index'
  get 'diaries/show'
  get 'diaries/edit'
  get 'diaries/destroy'
  get 'new/create'
  get 'new/index'
  get 'new/show'
  get 'new/edit'
  get 'new/update'
  get 'new/destroy'
  devise_for :users
  root to: 'homes#top'
  get 'homes/about'
  
  resources :books
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
