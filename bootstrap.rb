require 'rubygems'
require 'bundler'
require 'bcrypt'

ENV['RACK_ENV'] ||= 'development'

Bundler.require(:default)
Mongoid.load!('config/mongoid.yml')

require 'autoinc'

Dir['lib/**/*.rb'].each {|file| require_relative file }

Paperclip::Attachment.default_options.merge!(
  :storage => :s3,
  :s3_credentials => {
    :bucket => ENV['AS3_BUCKET'],
    :access_key_id => ENV['AS3_ACCESS_KEY_ID'],
    :secret_access_key => ENV['AS3_SECRET_ACCESS_KEY']
  }
)

require_relative 'cashierpos'