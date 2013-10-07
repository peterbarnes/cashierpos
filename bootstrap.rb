require 'rubygems'
require 'bundler'
require 'bcrypt'

ENV['RACK_ENV'] ||= 'development'

Bundler.require(:default)
Mongoid.load!('config/mongoid.yml')

require 'autoinc'

Dir['lib/**/*.rb'].each {|file| require_relative file }

require_relative 'cashierpos'