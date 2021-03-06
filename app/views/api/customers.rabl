collection @resources

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  n.image.url if n.image.present?
end

child :addresses, :object_root => false do
  attributes :type, :city, :country, :first_line, :second_line, :state, :zip
end

child :phones, :object_root => false do
  attributes :type, :number
end

attributes :credit, :date_of_birth, :email, :first_name, :identifier, :identifier_type, :last_name, :notes, :organization, :phone, :sku, :created_at, :updated_at