# RVM bootstrap
$:.unshift(File.expand_path("~/.rvm/lib"))
require 'rvm/capistrano'
set :rvm_ruby_string, '1.9.3'
set :rvm_type, :user

set :default_environment, {
  'PATH' => "/home/passenger/.rvm/bin/:$PATH"
}

# bundler bootstrap
require 'bundler/capistrano'

set :application, "httpizza"

ssh_options[:forward_agent] = true

# Source code
set :scm, :git
set :repository, "git@github.com:christianorawetz/httpizza.git"
set :branch, "master"
set :deploy_via, :remote_cache

set :user, "passenger"
set :use_sudo, false
set :deploy_to, "/home/passenger/www/railsapps/#{application}"

role :web, "108.166.93.18"                          # Your HTTP server, Apache/etc
role :app, "108.166.93.18"                          # This may be the same as your `Web` server
role :db,  "108.166.93.18", :primary => true # This is where Rails migrations will run

namespace :deploy do
  task :bundle_gems do
  	run "cd #{deploy_to}/current && bundle install"
  end
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
  task :precompile, :role => :app do
    run "cd #{release_path}/ && bundle exec rake assets:precompile"
  end
end

namespace :db do
  task :db_config, :except => { :no_release => true }, :role => :app do
    run "cp -f ~/database.yml #{release_path}/config/database.yml"
  end
  task :seed do
    run "cd #{deploy_to}/current && bundle exec rake db:seed RAILS_ENV=#{rails_env}"
  end
end

after "deploy", "deploy:bundle_gems"
after "deploy:bundle_gems", "deploy:restart"
after "deploy:finalize_update", "db:db_config"
after "deploy:finalize_update", "deploy:precompile"
after "deploy:migrate", "db:seed"