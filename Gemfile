source 'https://ruby.taobao.org/'

group :development, :test do
  gem 'guard'
  gem 'rb-fsevent', :require => false if RUBY_PLATFORM =~ /darwin/i
  gem 'guard-rspec'
  gem 'guard-livereload'
  gem 'rspec-rails', '~> 3.0'
  gem 'factory_girl_rails', '~> 4.0'

end

group :test do
  gem 'activerecord-jdbcsqlite3-adapter'
  gem 'faker'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', '~> 3.0'
end

gem 'sdoc', group: :doc

gem 'spring', group: :development


gem 'sidekiq'

group :development do
  gem 'capistrano', '~> 3.4'
  gem 'capistrano-rails', '~> 1.1'
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'

gem 'activerecord-jdbcpostgresql-adapter'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyrhino'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'



gem 'rails_admin'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

gem 'paperclip', git: 'git://github.com/thoughtbot/paperclip.git'

gem 'responders', '~> 2.0'

gem 'json'

#gem 'rake', '~>10.5.0'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]