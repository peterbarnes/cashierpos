class Adjustment
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :amount, :type => Integer,  :default => 0
  field :description, :type => String
  
  validates_presence_of   :amount, :till, :user
  
  embedded_in              :till
  belongs_to               :user
end