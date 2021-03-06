collection @resources

node :id do |n|
  n.id.to_s
end

node :till_id do |n|
  n.till.id.to_s if n.till
end

node :gravatar_url do |n|
  gravatar_id = Digest::MD5.hexdigest(n.email.downcase)
  "http://gravatar.com/avatar/#{gravatar_id}.png?s=48"
end

attributes :active, :administrator, :email, :first_name, :last_name, :username, :pin, :created_at, :updated_at