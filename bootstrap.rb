require 'rubygems'
require 'bundler'

ENV['RACK_ENV'] ||= 'development'

Bundler.require(:default)

require_relative 'cashierpos.rb'