class Sale
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  include Mongoid::Autoinc
  
  field :complete, :type => Boolean,  :default => false
  field :sku, :type => Integer
  field :tax_rate, :type => Float,    :default => 0
  
  index({ :account_id => 1, :updated_at => 1, :sku => 1 })
  
  increments :sku, :scope => :account_id
  
  attr_reader :sku_formatted, :subtotal, :subtotal_taxable, :subtotal_after_store_credit, :subtotal_taxable_after_store_credit, :tax, :total, :due
  
  validates_presence_of     :tax_rate
  validates_inclusion_of    :complete, :in => [true, false]
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  belongs_to  :customer
  embeds_many :lines,   cascade_callbacks: true
  embeds_one  :payment, cascade_callbacks: true
  belongs_to  :till
  belongs_to  :user
  
  after_save :_complete
  
  accepts_nested_attributes_for :lines, :payment, :allow_destroy => true
  
  search_in :sku, :customer => [:first_name, :last_name, :sku], :till => [:name], :user => [:username, :email, :first_name, :last_name]
  
  def sku_formatted
    return sprintf('%09d', sku)
  end
  
  def subtotal
    subtotal = 0
    lines.each do |line|
      subtotal += line.subtotal
    end
    subtotal
  end
  
  def subtotal_taxable
    subtotal_taxable = 0
    lines.each do |line|
      if line.taxable
        subtotal_taxable += line.subtotal
      end
    end
    subtotal_taxable
  end
  
  def subtotal_after_store_credit
    subtotal_after = self.subtotal
    if self.payment
      subtotal_after -= self.payment.store_credit
    end
    subtotal_after
  end
  
  def subtotal_taxable_after_store_credit
    subtotal_taxable_after = self.subtotal_taxable
    if self.payment
      subtotal_taxable_after -= self.payment.store_credit
    end
    subtotal_taxable_after
  end
  
  def tax
    tax = 0
    subtotal_taxable_after_store_credit = self.subtotal_taxable_after_store_credit
    if subtotal_taxable_after_store_credit > 0
      tax += subtotal_taxable_after_store_credit * self.tax_rate
    end
    tax
  end
  
  def total
    self.subtotal_after_store_credit + self.tax
  end
  
  def due
    if self.payment
      self.total - self.payment.total
    else
      self.total
    end
  end
  
  def _complete
    if complete
      if till && payment
        till.balance += payment.cash
        till.balance += due
        till.save
      end
      if customer && payment
        customer.credit -= payment.store_credit
        customer.save
      end
      lines.each do |line|
        if line.sku
          unit = Unit.where(:sku => line.sku).first
          if unit
            unit.quantity -= 1
            unit.save
          end
        end
      end
    end
    true
  end
end