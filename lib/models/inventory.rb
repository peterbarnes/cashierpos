class Inventory
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  
  field :description, :type => String
  field :name, :type => String
  
  index({ :account_id => 1, :name => 1 })
  
  default_scope ->{ where(:account_id => Account.current_id) }
  
  belongs_to  :account
  has_many    :items
  
  validates_presence_of :name
  
  search_in :name, :description
end