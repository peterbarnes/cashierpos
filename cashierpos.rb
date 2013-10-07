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
    
    if account.respond_to?(params[:resources])
      @resources = account.send(params[:resources])
      @resources = @resources.where(:created_at.gt => 3.days.ago) if params[:filter] == 'newest'
      @resources = @resources.where(:updated_at.gt => 1.days.ago) if params[:filter] == 'recent'
      @resources = @resources.desc(:updated_at).limit(params[:limit]).offset(params[:offset])
      @resources = @resources.full_text_search(params[:query], :allow_empty_search => true)
    else
      halt 404
    end
    
    unless @resources.nil?
      rabl params[:resources].to_sym, :views => api_views
    else
      halt 404
    end
  end
  
  get '/api/:resources/count/?' do
    content_type :json
    
    params[:filter] ||= 'all'
    
    if account.respond_to?(params[:resources])
      @resources = account.send(params[:resources])
      @resources = @resources.where(:created_at.gt => 3.days.ago) if params[:filter] == 'newest'
      @resources = @resources.where(:updated_at.gt => 1.days.ago) if params[:filter] == 'recent'
      @resources = @resources.full_text_search(params[:query], :allow_empty_search => true)
      @count = @resources.count
    else
      @count = 0
    end
    
    unless @count.nil?
      {:count => @count}.to_json
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
    
    if account.respond_to?(params[:resources])
      @resource = account.send(params[:resources]).where(:id => params[:id]).first
    else
      halt 404
    end
    
    if @resource
      rabl params[:resources].singularize.to_sym, :views => api_views
    else
      halt 404
    end
  end
  
  post '/api/sales/?' do
    content_type :json
    
    @resources = account.sales
    
    unless @resources.nil?
      @resource = @resources.build(JSON.parse(request.body.read)['sale'])
      
      if @resource.save
        status 201
        rabl :sale, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
  
  put '/api/sales/:id/?' do
    content_type :json
    
    @resource = account.sales.where(:id => params[:id]).first
    
    unless @resource.nil?
      @result = @resource.update_attributes(JSON.parse(request.body.read)['sale'])
      
      if @result
        status 200
        rabl :sale, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
  
  delete '/api/sales/:id/?' do
    content_type :json
    
    @resource = account.sales.where(:id => params[:id]).first
    
    unless @resource.nil?
      @result = @resource.destroy
      
      if @result
        status 200
        {:deleted => true}.to_json
      else
        status 406
      end
    else
      halt 404
    end
  end
  
  post '/api/purchases/?' do
    content_type :json
    
    @resources = account.purchases
    
    unless @resources.nil?
      @resource = @resources.build(JSON.parse(request.body.read)['purchase'])
      
      if @resource.save
        status 201
        rabl :purchase, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
  
  put '/api/purchases/:id/?' do
    content_type :json
    
    @resource = account.purchases.where(:id => params[:id]).first
    
    unless @resource.nil?
      @result = @resource.update_attributes(JSON.parse(request.body.read)['purchase'])
      
      if @result
        status 200
        rabl :purchase, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
  
  delete '/api/purchases/:id/?' do
    content_type :json
    
    @resource = account.purchases.where(:id => params[:id]).first
    
    unless @resource.nil?
      @result = @resource.destroy
      
      if @result
        status 200
        {:deleted => true}.to_json
      else
        status 406
      end
    else
      halt 404
    end
  end
  
  post '/api/customers/?' do
    content_type :json
    
    @resources = account.customers
    
    unless @resources.nil?
      @resource = @resources.build(JSON.parse(request.body.read)['customer'])
      
      if @resource.save
        status 201
        rabl :customer, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
  
  put '/api/customers/:id/?' do
    content_type :json
    
    @resource = account.customers.where(:id => params[:id]).first
    
    unless @resource.nil?
      @result = @resource.update_attributes(JSON.parse(request.body.read)['customer'])
      
      if @result
        status 200
        rabl :customer, :views => api_views
      else
        status 406
        @resource.errors.to_json
      end
    else
      halt 404
    end
  end
end