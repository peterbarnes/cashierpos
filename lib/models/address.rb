class Address
  include Mongoid::Document
  
  field :type, :type => String
  field :city, :type => String
  field :country, :type => String, :default => 'US'
  field :first_line, :type => String
  field :second_line, :type => String
  field :state, :type => String
  field :zip, :type => String
  
  validates_presence_of :type, :city, :country, :first_line, :state, :zip
  
  embedded_in :customer
  embedded_in :store
end