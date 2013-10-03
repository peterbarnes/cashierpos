class Purchase
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  include Mongoid::Autoinc
  
  field :complete, :type => Boolean,  :default => false
  field :sku, :type => Integer
  field :ratio, :type => Float,    :default => 1
  
  index({ :account_id => 1, :updated_at => 1, :sku => 1 })
  
  increments :sku, :scope => :account_id
  
  attr_reader :sku_formatted, :cash, :credit
  
  validates_inclusion_of  :complete, :in => [true, false]
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  belongs_to  :customer
  embeds_many :lines,   cascade_callbacks: true
  belongs_to  :till
  belongs_to  :user
  
  after_save :_complete
  
  accepts_nested_attributes_for :lines, :allow_destroy => true
  
  search_in :sku, :customer => [:first_name, :last_name, :sku], :till => [:name], :user => [:username, :email, :first_name, :last_name]
  
  def sku_formatted
    return sprintf('%09d', sku)
  end
  
  def cash
    cash = 0
    lines.each do |line|
      cash += line.subtotal unless line.trade?
    end
    cash
  end
  
  def credit
    credit = 0
    lines.each do |line|
      credit += line.subtotal if line.trade?
    end
    credit
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