object @resource

node :id do |n|
  n.id.to_s
end

attributes :active, :administrator, :email, :first_name, :last_name, :username, :pin, :created_at, :updated_at