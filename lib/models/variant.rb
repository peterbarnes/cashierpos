class Variant
  include Mongoid::Document

  field :adjustment, :type => Float,    :default => 0
  field :adjustment_percentage, :type => Boolean,  :default => false
  field :adjustment_cash, :type => Float,    :default => 0
  field :adjustment_cash_percentage, :type => Boolean,  :default => false
  field :adjustment_credit, :type => Float,    :default => 0
  field :adjustment_credit_percentage, :type => Boolean,  :default => false
  field :description, :type => String
  field :identifier, :type => String
  field :identifier_type, :type => String, :default => 'UPC'
  field :name, :type => String
  
  validates_presence_of     :name, :adjustment, :adjustment_cash, :adjustment_credit, :item
  validates_inclusion_of    :adjustment_percentage, :in => [true, false]
  validates_inclusion_of    :adjustment_cash_percentage, :in => [true, false]
  validates_inclusion_of    :adjustment_credit_percentage, :in => [true, false]
  validates_inclusion_of    :identifier_type, :in => ['ASIN', 'EAN', 'ISBN', 'UPC']
  
  belongs_to  :item
  has_many    :units
end