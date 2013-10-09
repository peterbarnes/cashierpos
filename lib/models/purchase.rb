class Purchase
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  include Mongoid::Autoinc
  
  field :complete, :type => Boolean,  :default => false
  field :note, :type => String
  field :sku, :type => Integer
  field :ratio, :type => Float,    :default => 1
  
  index({ :account_id => 1, :updated_at => 1, :sku => 1 })
  
  increments :sku, :scope => :account_id
  
  attr_accessible :lines_attributes
  attr_reader :sku_formatted
  
  validates_inclusion_of  :complete, :in => [true, false]
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  belongs_to  :customer
  embeds_many :lines,   cascade_callbacks: true
  belongs_to  :till
  belongs_to  :user
  
  after_save :_complete
  
  accepts_nested_attributes_for :lines, :allow_destroy => true
  
  search_in :sku, :note, :customer => [:first_name, :last_name, :sku], :till => [:name], :user => [:username, :email, :first_name, :last_name]
  
  def sku_formatted
    return sprintf('%09d', sku)
  end
  
  def _complete
    if complete
      if till
        till.balance += cash
        till.save
      end
      if customer
        customer.credit -= credit
        customer.save
      end
    end
    true
  end
end