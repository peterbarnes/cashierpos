class Till
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  
  field :minimum,           :type => Integer,   :default => 0
  field :name,              :type => String
  
  index({ :account_id => 1, :name => 1 })

  validates_presence_of     :minimum, :name, :store
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  embeds_many :adjustments,    cascade_callbacks: true
  has_many    :purchases
  belongs_to  :store
  has_many    :sales
  
  accepts_nested_attributes_for :adjustments, :allow_destroy => true
  
  search_in :name, :store => [:name]
end