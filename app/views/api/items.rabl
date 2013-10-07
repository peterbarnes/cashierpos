collection @resources

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  n.image.url
end

attributes :description, :identifier, :identifier_type, :manufacturer, :name, :price, :price_cash, :price_credit, :saleable, :sku, :taxable, :created_at, :updated_at