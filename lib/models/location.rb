class Location
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Ancestry
  include Mongoid::Paperclip
  include Mongoid::Search
  
  field :description, :type => String
  field :name, :type => String
  field :restock, :type => Integer,  :default => 0
  field :sku, :type => String, :default => ->{ SecureRandom.hex(6).upcase }
  field :target, :type => Integer,  :default => 0
  
  index({ :account_id => 1, :name => 1 })
  
  has_mongoid_attached_file :image,
    :default_url => '/assets/icons/missing.png',
    :styles => {
      :icon        => ['48x48#',   :png]
    }
    
  has_ancestry
  
  default_scope ->{ where(:account_id => Account.current_id) }
  
  validates_presence_of     :name, :sku
  validates_uniqueness_of   :sku, scope: :account_id

  belongs_to  :account
  belongs_to  :store
  has_many    :units
  
  search_in :name, :description, :sku
end