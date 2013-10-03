class Cashierpos < Sinatra::Base

  configure do
    set :views, File.join(root, 'app/views')
    
    Rabl.register!
  end
  
  helpers do
    def auth
      @auth ||= Rack::Auth::Basic::Request.new(request.env)
    end
          
    def authorized?
      unless account.nil?
        account.api_active &&
        auth.provided? && 
        auth.basic? && 
        auth.credentials && 
        auth.credentials == ['x', account.api_secret]
      else
        false
      end
      true
    end
    
    def authenticate!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Cashier API")
        halt 401
      end
    end
      
    def account
      @account ||= Account.first
      @account.set_current
      @account
    end
    
    def api_views
      @api_views ||= File.join(settings.root, 'app/views/api')
    end
    
    def stylesheet_tag(file)
      "<link rel=\"stylesheet\" href=\"/assets/stylesheets/#{file}\" type=\"text/css\" media=\"all\" />"
    end

    def javascript_tag(file)
      "<script src=\"/assets/javascripts/#{file}\" type=\"text/javascript\"></script>"
    end
  end
  
  before '/api/*' do
    #authenticate!
  end

  get '/' do
    erb :index, :layout => :application
  end
  
  get '/login' do
    erb :login, :layout => :application
  end
  
  post '/login' do
    redirect '/'
  end
  
  get '/api/:resources/?' do
    content_type :json
    
    params[:filter] ||= 'all'
    params[:offset] ||= 0
    params[:limit] ||= 10
    
    @resources = account.send(params[:resources]).full_text_search(params[:query], :allow_empty_search => true)
    @resources = @resources.where(:created_at.gt => 3.days.ago) if params[:filter] == 'newest'
    @resources = @resources.where(:updated_at.gt => 1.days.ago) if params[:filter] == 'recent'
    @resources = @resources.asc(:updated_at).limit(params[:limit]).offset(params[:offset])
    
    unless @resources.nil?
      rabl params[:resources].to_sym, :views => api_views
    else
      halt 404
    end
  end
  
  get '/api/:resources/?' do
    content_type :json
    
    params[:filter] ||= 'all'
    params[:offset] ||= 0
    params[:limit] ||= 10
    
    @resources = account.send(params[:resources]).full_text_search(params[:query], :allow_empty_search => true)
    @resources = @resources.where(:created_at.gt => 3.days.ago) if params[:filter] == 'newest'
    @resources = @resources.where(:updated_at.gt => 1.days.ago) if params[:filter] == 'recent'
    @resources = @resources.asc(:updated_at).limit(params[:limit]).offset(params[:offset])
    
    unless @resources.nil?
      rabl params[:resources].to_sym, :views => api_views
    else
      halt 404
    end
  end
  
  get '/api/units/match/?' do
    content_type :json
    
    @resources = account.units.where(:sku => params[:query])
    
    unless @resources.nil?
      rabl :units, :views => api_views
    else
      halt 404
    end
  end
  
  get '/api/:resources/:id/?' do
    content_type :json
    
    @resource = account.send(params[:resources]).where(:id => params[:id]).first
    
    if @resource
      rabl params[:resources].singularize.to_sym, :views => api_views
    else
      halt 404
    end
  end
end