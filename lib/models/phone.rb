class Phone
  include Mongoid::Document
  
  field :number, :type => String
  field :type, :type => String
  
  validates_presence_of :type
  
  embedded_in :customer
  embedded_in :store
end