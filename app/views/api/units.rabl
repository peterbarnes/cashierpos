collection @resources

node :id do |n|
  n.id.to_s
end

node :item_id do |n|
  n.item.id.to_s
end

node :filing do |n|
  n.filing_formatted
end

child :components, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name, :typical
end

child :conditions, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name
end

child :variant, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name, :identifier, :identifier_type
end

attributes :price, :quantity, :sku, :calculated, :name, :created_at, :updated_at