class Customer
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip
  include Mongoid::MultiParameterAttributes
  include Mongoid::Search
  
  field :credit, :type => Integer,  :default => 0
  field :date_of_birth, :type => Date, :default => ->{ Date.new }
  field :email, :type => String
  field :first_name, :type => String
  field :identifier, :type => String
  field :identifier_type, :type => String
  field :last_name, :type => String
  field :notes, :type => String
  field :organization, :type => String
  field :phone, :type => String
  field :sku, :type => String, :default => ->{ SecureRandom.hex(6).upcase }
  
  index({ :account_id => 1, :first_name => 1, :last_name => 1 })
  
  has_mongoid_attached_file :image,
    :default_url => '/assets/icons/missing.png',
    :styles => {
      :icon       => ['48x48#',   :png]
    }
  
  validates_presence_of     :credit
  validates_presence_of     :first_name
  validates_presence_of     :last_name
  validates_presence_of     :sku
  validates_uniqueness_of   :sku, scope: :account_id
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to    :account
  embeds_many   :addresses, cascade_callbacks: true
  embeds_many   :phones,    cascade_callbacks: true
  has_many      :purchases
  has_many      :sales
  
  accepts_nested_attributes_for :addresses, :allow_destroy => true
  accepts_nested_attributes_for :phones, :allow_destroy => true
  
  search_in :email, :first_name, :last_name, :notes, :organization, :phone, :sku, :addresses => [:first_line, :city], :phones => [:number]

  def fullname
    if first_name and last_name
      "#{first_name} #{last_name}"
    end
  end
end