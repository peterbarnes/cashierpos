require 'rubygems'
require 'bundler'
require 'bcrypt'

ENV['RACK_ENV'] ||= 'development'

Bundler.require(:default)
Mongoid.load!('config/mongoid.yml')

require 'autoinc'

Dir['lib/**/*.rb'].each {|file| require_relative file }

if ENV['RACK_ENV'] == 'production'
  Paperclip::Attachment.default_options.merge!(
    :storage => :s3,
    :s3_credentials => {
      :bucket => ENV['AWS_BUCKET'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    },
    :s3_host_name => 's3-us-west-2.amazonaws.com'
  )
end

require_relative 'cashierpos'