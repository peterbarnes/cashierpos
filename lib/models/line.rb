class Line
  include Mongoid::Document
  include Mongoid::Timestamps

  field :amount, :type => Integer,  :default => 0
  field :note, :type => String
  field :quantity, :type => Integer,  :default => 1
  field :sku, :type => String
  field :taxable, :type => Boolean,  :default => true
  field :title, :type => String
  field :trade, :type => Boolean, :default => true
  
  validates_presence_of         :amount, :quantity, :title
  validates_inclusion_of        :taxable, :in => [true, false]
  
  embedded_in     :purchase
  embedded_in     :sale
end