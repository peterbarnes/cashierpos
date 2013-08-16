require File.dirname(__FILE__) + '/bootstrap.rb'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'app/assets'
  environment.js_compressor = YUI::JavaScriptCompressor.new if Cashierpos.production?
  environment.css_compressor = YUI::CssCompressor.new if Cashierpos.production?
  run environment
end

run Cashierpos