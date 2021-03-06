object @resource

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  n.image.url if n.image.present?
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

attributes :description, :identifier, :identifier_type, :manufacturer, :name, :price, :price_cash, :price_credit, :saleable, :sku, :taxable, :created_at, :updated_at