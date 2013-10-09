collection @resources

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

node :pdf_url do |n|
  "http://#{n.account.token}.cashierapp.#{settings.production? ? 'com' : 'dev'}/api/sales/#{n.id.to_s}.pdf"
end

attributes :complete, :sku, :note, :tax_rate, :created_at, :updated_at