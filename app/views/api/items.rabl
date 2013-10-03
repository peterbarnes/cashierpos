collection @resources

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  URI.join(request.url, n.image.url).to_s
end

node :inventory_id do |n|
  n.inventory.id.to_s
end

child :components, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name, :typical
end

child :conditions, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name
end

child :variants, :object_root => false do
  attributes :adjustment, :adjustment_percentage, :adjustment_cash, :adjustment_cash_percentage, :adjustment_credit, :adjustment_credit_percentage, :description, :name, :identifier, :identifier_type
end

child :props, :object_root => false do
  attributes :key, :value
end

child :tags, :object_root => false do
  attributes :name
end

attributes :depth, :description, :dimension_measure, :flagged, :height, :identifier, :identifier_type, :manufacturer, :name, :price, :price_cash, :price_credit, :saleable, :sku, :taxable, :weight, :weight_measure, :width, :created_at, :updated_at