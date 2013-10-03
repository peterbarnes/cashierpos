object @resource

node :id do |n|
  n.id.to_s
end

node :store_id do |n|
  n.store.id.to_s
end

attributes :minimum, :name, :created_at, :updated_at