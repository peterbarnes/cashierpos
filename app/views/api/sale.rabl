object @resource

node :id do |n|
  n.id.to_s
end

node :customer_id do |n|
  n.customer.id.to_s if n.customer
end

node :till_id do |n|
  n.till.id.to_s if n.till
end

node :user_id do |n|
  n.user.id.to_s if n.user
end

child :lines, :object_root => false do
  node :id do |n|
    n.id.to_s
  end
  
  attributes :amount, :bullets, :inventory, :note, :quantity, :sku, :taxable, :title
end

child :payment, :object_root => false do
  node :id do |n|
    n.id.to_s
  end
  
  attributes :cash, :credit, :check, :gift_card, :store_credit
end

attributes :complete, :flagged, :sku, :note, :tax_rate, :created_at, :updated_at