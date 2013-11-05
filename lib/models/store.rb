class Store
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip
  include Mongoid::Search
  
  field :description, :type => String
  field :legal, :type => String
  field :name, :type => String
  
  index({ :account_id => 1, :name => 1 })
  
  has_mongoid_attached_file :image,
    :default_url => '/assets/icons/missing.png',
    :styles => {
      :icon        => ['48x48#',   :png]
    }

  validates_presence_of   :name, :address
  
  default_scope ->{ where(:account_id => Account.current_id) }

  belongs_to  :account
  embeds_one  :address,     cascade_callbacks: true
  has_many    :locations
  embeds_many :phones,      cascade_callbacks: true
  has_many    :tills
  
  accepts_nested_attributes_for :address, :allow_destroy => true
  accepts_nested_attributes_for :phones, :allow_destroy => true
  
  search_in :name, :description, :address => [:first_line, :city], :phones => [:number]
end