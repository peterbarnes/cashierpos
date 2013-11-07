object @resource

node :id do |n|
  n.id.to_s
end

node :image_url do |n|
  n.image.url if n.image.present?
end

child :address, :object_root => false do
  attributes :type, :city, :country, :first_line, :second_line, :state, :zip
end

child :phones, :object_root => false do
  attributes :type, :number
end

child :tills, :object_root => false do
  node :id do |n|
    n.id.to_s
  end
  
  attributes :minimum, :name, :url, :created_at, :updated_at
end

attributes :description, :legal, :name, :created_at, :updated_at