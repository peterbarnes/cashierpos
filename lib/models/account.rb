class Account
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :api_active,  :type => Boolean,   :default => true
  field :api_secret,  :type => String,    :default => ->{ UUID.generate(:compact) }
  field :title,       :type => String
  field :token,       :type => String,    :default => ->{ UUID.generate(:compact) }

  has_many :activities,   :dependent => :destroy
  has_many :components,   :dependent => :destroy
  has_many :conditions,   :dependent => :destroy
  has_many :customers,    :dependent => :destroy
  has_many :inventories,  :dependent => :destroy
  has_many :items,        :dependent => :destroy
  has_many :locations,    :dependent => :destroy
  has_many :purchases,    :dependent => :destroy
  has_many :tills,        :dependent => :destroy
  has_many :sales,        :dependent => :destroy
  has_many :units,        :dependent => :destroy
  has_many :users,        :dependent => :destroy
  has_many :variants,     :dependent => :destroy
  
  def self.current_id=(id)
    Thread.current[:current_id] = id
  end

  def self.current_id
    Thread.current[:current_id]
  end
  
  def set_current
    self.class.current_id = self.id
  end
end