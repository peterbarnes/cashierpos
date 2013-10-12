object @resource

child :customer do
  attributes :credit, :date_of_birth, :email, :first_name, :last_name, :notes, :organization, :phone, :sku
end

child :user do
  attributes :email, :first_name, :last_name, :username
end

child :till do
  child :store do
    child :address do
      attributes :type, :city, :country, :first_line, :second_line, :state, :zip
    end
    
    child :phones, :object_root => false do
      attributes :number, :type
    end
    
    attributes :name, :description, :legal, :tax_rate
  end
  
  attributes :name
end

child :lines, :object_root => false do
  attributes :amount, :bullets, :inventory, :note, :quantity, :sku, :taxable, :title, :subtotal, :subtotal_cash, :subtotal_credit
end

attributes :complete, :flagged, :sku, :note, :ratio, :created_at, :updated_at, :quantity, :sku_formatted, :subtotal_cash, :subtotal_credit, :cash, :credit, :due