class Line
  include Mongoid::Document
  include Mongoid::Timestamps

  field :amount, :type => Integer,  :default => 0
  field :amount_cash, :type => Integer,  :default => 0
  field :amount_credit, :type => Integer,  :default => 0
  field :bullets, :type => Array, :default => []
  field :inventory, :type => Boolean, :default => false
  field :note, :type => String
  field :quantity, :type => Integer,  :default => 1
  field :sku, :type => String
  field :taxable, :type => Boolean,  :default => true
  field :title, :type => String
  
  validates_presence_of         :amount, :amount_cash, :amount_credit, :quantity
  validates_inclusion_of        :taxable, :in => [true, false]
  
  embedded_in     :purchase
  embedded_in     :sale
  
  def subtotal
    quantity * amount
  end
  
  def subtotal_cash
    quantity * amount_cash
  end
  
  def subtotal_credit
    quantity * amount_credit
  end
end