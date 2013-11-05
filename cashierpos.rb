class Cashierpos < Sinatra::Base

  configure do
    set :views, File.join(root, 'app/views')
    Rabl.register!
    
    Mongoid::Search.setup do |config|
      config.match = :all
      config.allow_empty_search = true
    end
  end
  
  helpers do
    def account
      @account ||= Account.where(:token => request.cookies['cashierpos']).first
      @account.set_current if @account
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
    
    def currency(amount)
      "$#{sprintf("%.2f", amount * 0.01)}"
    end
  end
  
  before '/api/*' do
    halt 401 unless account
  end
  
  before '/receipt/*' do
    halt 401 unless account
  end

  get '/' do
    redirect '/login' unless account
    erb :index, :layout => :application
  end
  
  get '/login' do
    erb :login, :layout => :application
  end
  
  get '/logout' do
    response.set_cookie('cashierpos', false)
    redirect '/login'
  end
  
  post '/login' do
    @account = Account.where(:token => params['account']).first
    @account.set_current if @account
    
    if @account && User.authenticate(params['email'], params['password'])
      response.set_cookie('cashierpos', @account.token)
      redirect '/'
    else
      redirect '/login'
    end
  end
  
  get '/receipt/sale/:id/?' do
    @sale = account.sales.where(:id => params[:id]).first
    
    unless @sale.nil?
      erb :'receipt/sale', :layout => :receipt
    else
      halt 404
    end
  end
  
  get '/receipt/purchase/:id/?' do
    @purchase = account.purchases.where(:id => params[:id]).first
    
    unless @purchase.nil?
      erb :'receipt/purchase', :layout => :receipt
    else
      halt 404
    end
  end
  
  get '/api/:resources/?' do
    content_type :json
    
    params[:filter] ||= 'all'
    params[:offset] ||= 0
    params[:limit] ||= 10
    
    if account.respond_to?(params[:resources])
      @resources = account.send(params[:resources])
      if params[:filter] == 'assigned'
        ids = account.tills.where(:user_id.ne => nil).pluck(:user_id)
        @resources = @resources.in(:id => ids)
      end
      @resources = @resources.where(:complete => false) if params[:filter] == 'active'
      @resources = @resources.where(:complete => true) if params[:filter] == 'complete'
      @resources = @resources.where(:flagged => true) if params[:filter] == 'flagged'
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
      if params[:filter] == 'assigned'
        ids = account.tills.where(:user_id.ne => nil).pluck(:user_id)
        @resources = @resources.in(:id => ids)
      end
      @resources = @resources.where(:complete => false) if params[:filter] == 'active'
      @resources = @resources.where(:complete => true) if params[:filter] == 'complete'
      @resources = @resources.where(:flagged => true) if params[:filter] == 'flagged'
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