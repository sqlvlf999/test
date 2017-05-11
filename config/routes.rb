Rails.application.routes.draw do

  root :to => 'home#index', as: 'home'

  get '/dashboard' => 'dashboard#index'
  get '/packings/show/:code' => 'packings#show'

  get '/fresh_detail/:code' => 'fresh_detail#index'
  get '/dry_detail/:code' => 'dry_detail#index'
  get '/packing_detail/:code' => 'packing_detail#index'

  get '/getlist' => 'dashboard#getlist'

  resources :fresh
  resources :dry
  resources :rooms
  resources :packings
  resources :fresh_detail
  resources :dry_detail
  resources :packing_detail
  
  controller :sessions do
    post 'login' => :create
    delete 'logout' => :destroy
  end

  get '/stations/rooms/list' => 'rooms#list'
  get 'stations/:station_id/rooms' => 'rooms#details'

  get '/stations' => 'stations#index'

  get '/middlewares' => 'middlewares#index'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do

      get   'versions/last'          => 'versions#show'
      get   'versions'               => 'versions#index'

      # user profile
      post  'login'                  => 'sessions#create'
      patch 'changePwd'              => 'sessions#patch'

      # binding room 
      post  'binding'                => 'tasks#create'

      # unbound room
      delete 'unbound'               => 'tasks#unbound'

      # get task by task no
      get   'tasks/:task_no'         => 'tasks#show'

      # update task step
      patch 'tasks/:task_no'         => 'tasks#update'

      # list all tasks which finished baking by specified user
      get   'tasks'                  => 'tasks#finished_tasks'
      
      # list tasks by user
      get   'users/:user_id/tasks'   => 'tasks#syn_tasks'

      # list all tasks in specify station
      get   'stations/:station_id/tasks' => 'tasks#list_task'
      # upload room statuses
      post  'status'                 => 'room_statuses#create'

      # upload fresh tobaccos
      post  'fresh_tobaccos'         => 'fresh_tobaccos#create'

      # upload packings
      post  'packings'               => 'packings#create'

      # upload contracts
      post  'contracts'              => 'contracts#create'
      
      # dry tobaccos
      post  'dry_tobaccos'           => 'dry_tobaccos#create'
      # get dry tobacco by task id
      get  'dry_tobaccos/:task_id'   => 'dry_tobaccos#show'
      
      # tobacco grading
      post  'gradings'               => 'gradings#create'

      # arbitration
      post 'arbitrations'            => 'arbitrations#create'

      get  'devices'                 => 'tasks#devices'

      ################## For admin users ###################

      # spot check fresh tobaccos
      patch 'tasks/:task_id/fresh_tobaccos' => 'fresh_tobaccos#update'

    end
  end
end
