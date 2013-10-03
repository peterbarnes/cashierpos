class Line
  include Mongoid::Document
  include Mongoid::Timestamps

  field :amount, :type => Integer,  :default => 0
  field :amount_cash, :type => Integer,  :default => 0
  field :amount_credit, :type => Integer,  :default => 0
  field :note, :type => String
  field :quantity, :type => Integer,  :default => 1
  field :sku, :type => String
  field :taxable, :type => Boolean,  :default => true
  field :title, :type => String
  
  validates_presence_of         :amount, :amount_cash, :amount_credit, :quantity, :title
  validates_inclusion_of        :taxable, :in => [true, false]
  
  embedded_in     :purchase
  embedded_in     :sale
end