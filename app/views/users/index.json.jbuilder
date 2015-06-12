json.array!(@users) do |user|
  json.extract! user, :id, :primary_first_name, :primary_last_name, :secondary_first_name, :secondary_last_name, :primary_phone, :secondary_phone, :primary_email, :secondary_email, :address, :originization, :salutation, :phone_type
  json.url user_url(user, format: :json)
end
