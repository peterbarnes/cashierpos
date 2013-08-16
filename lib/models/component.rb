class Component
  include Mongoid::Document

  field :adjustment, :type => Float,    :default => 0
  field :adjustment_percentage, :type => Boolean,  :default => false
  field :adjustment_cash, :type => Float,    :default => 0
  field :adjustment_cash_percentage, :type => Boolean,  :default => false
  field :adjustment_credit, :type => Float,    :default => 0
  field :adjustment_credit_percentage, :type => Boolean,  :default => false
  field :description, :type => String
  field :name, :type => String
  field :typical, :type => Boolean,  :default => false

  validates_presence_of     :name, :adjustment, :adjustment_cash, :adjustment_credit, :item
  validates_inclusion_of    :adjustment_percentage, :in => [true, false]
  validates_inclusion_of    :adjustment_cash_percentage, :in => [true, false]
  validates_inclusion_of    :adjustment_credit_percentage, :in => [true, false]
  validates_inclusion_of    :typical, :in => [true, false]

  has_and_belongs_to_many      :units
  belongs_to  :item
end