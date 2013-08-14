require File.dirname(__FILE__) + '/bootstrap.rb'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'app/assets'
  environment.js_compressor = :uglifier if Cashierpos.production?
  run environment
end

run Cashierpos