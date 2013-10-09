class Payment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :cash,          :type => Integer,  :default => 0
  field :credit,        :type => Integer,  :default => 0
  field :check,         :type => Integer,  :default => 0
  field :gift_card,     :type => Integer,  :default => 0
  field :store_credit,  :type => Integer,  :default => 0

  validates_presence_of   :cash, :credit, :check, :gift_card, :store_credit
  
  embedded_in     :purchase
  embedded_in     :sale
  
  def total
    cash + credit + check + gift_card
  end
end