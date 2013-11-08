class Unit
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  
  field :price, :type => Integer,       :default => 0
  field :quantity, :type => Integer,    :default => 1
  field :sku, :type => String,          :default => ->{ SecureRandom.hex(6).upcase }
  field :calculated, :type => Boolean,  :default => true
  field :filing, :type => Integer
  
  index({ :account_id => 1 })
  
  attr_reader :price_calculated, :name
  
  validates_presence_of     :sku, :price, :quantity, :item, :location
  validates_uniqueness_of   :sku, scope: :account_id
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to                    :account
  has_and_belongs_to_many       :components
  has_and_belongs_to_many       :conditions
  belongs_to                    :item
  belongs_to                    :location
  belongs_to                    :variant
  
  search_in :sku, :item => [:sku, :name, :handle, :description]
  
  def name
    if item
      item.name
    end
  end
  
  def price_calculated
    if item
      calculated_price = item.price
      item.components.each do |component|
        if component.typical && !components.include?(component)
          calculated_price -= component.adjuster(item.price)
        end
        if !component.typical && components.include?(component)
          calculated_price += component.adjuster(item.price)
        end
      end
      calculated_price += condition.adjuster(item.price) if condition
      calculated_price += variant.adjuster(item.price) if variant
      calculated_price
    else
      0
    end
  end
end