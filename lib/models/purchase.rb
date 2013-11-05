class Purchase
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  include Mongoid::Autoinc
  
  field :complete, :type => Boolean,  :default => false
  field :flagged, :type => Boolean,   :default => false
  field :note, :type => String
  field :sku, :type => Integer
  field :ratio, :type => Float,    :default => 1
  
  index({ :account_id => 1, :updated_at => 1, :sku => 1 })
  
  increments :sku, :scope => :account_id
  
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
  
  search_in :sku, :note, :lines => [:sku, :note], :customer => [:first_name, :last_name, :sku], :till => [:name], :user => [:username, :email, :first_name, :last_name]
  
  def sku_formatted
    return sprintf('%09d', sku)
  end
  
  def quantity
    quantity = 0
    lines.each do |line|
      quantity += line.quantity
    end
    quantity
  end
  
  def subtotal_cash
    subtotal = 0
    lines.each do |line|
      subtotal += line.subtotal_cash
    end
    subtotal
  end
  
  def subtotal_credit
    subtotal = 0
    lines.each do |line|
      subtotal += line.subtotal_credit
    end
    subtotal
  end
  
  def cash
    if ratio >= 0
      cash_multiplier = 1 - ratio
    else
      cash_multiplier = ratio * -1
    end
    (subtotal_cash * cash_multiplier).round.to_i
  end
  
  def credit
    if ratio >= 0
      credit_multiplier = ratio
    else
      credit_multiplier = -1 - ratio
    end
    (subtotal_credit * credit_multiplier).round.to_i
  end
  
  def due
    cash
  end
  
  def _complete
    if complete
      if till && user
        description = "SKU #{sku_formatted} #{Time.now.to_s} (#{user.fullname})"
        amount = cash * -1
        if amount < 0
          till.adjustments.create(:amount => amount, :description => description, :user => user)
        end
      end
      if customer
        customer.credit += credit
        customer.save
      end
    end
    true
  end
end