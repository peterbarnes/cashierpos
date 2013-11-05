class Till
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  
  field :minimum,           :type => Integer,   :default => 0
  field :name,              :type => String
  field :tax_rate,          :type => Float,    :default => 0
  
  index({ :account_id => 1, :name => 1 })

  validates_presence_of     :minimum, :name, :tax_rate, :store
  validates_uniqueness_of   :user, :allow_nil => true
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  embeds_many :adjustments,    cascade_callbacks: true
  has_many    :purchases
  belongs_to  :store
  has_many    :sales
  belongs_to  :user
  
  accepts_nested_attributes_for :adjustments, :allow_destroy => true
  
  search_in :name, :store => [:name]
end