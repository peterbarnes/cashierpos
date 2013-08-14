class Cashierpos < Sinatra::Base

  configure do
    set :views, File.join(root, 'app/views')
  end
  
  helpers do
    def stylesheet_tag(file)
      "<link rel=\"stylesheet\" href=\"/assets/stylesheets/#{file}\" type=\"text/css\" media=\"all\" />"
    end

    def javascript_tag(file)
      "<script src=\"/assets/javascripts/#{file}\" type=\"text/javascript\"></script>"
    end
  end

  get '/' do
    erb :index, :layout => :application
  end
end