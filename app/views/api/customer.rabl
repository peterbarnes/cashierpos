object @resource

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  URI.join(request.url, n.image.url).to_s
end

child :addresses, :object_root => false do
  attributes :type, :city, :country, :first_line, :second_line, :state, :zip
end

child :phones, :object_root => false do
  attributes :type, :number
end

attributes :credit, :date_of_birth, :email, :first_name, :last_name, :notes, :organization, :phone, :sku, :created_at, :updated_at