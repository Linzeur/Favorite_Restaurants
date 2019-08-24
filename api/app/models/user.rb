class User < ApplicationRecord

  validates :name, presence: true
  validates :email, format: { with: /[a-zA-Z0-9]*@[a-zA-Z]*.[a-zA-Z0-9]*/, message: "Bad format"  },
                    uniqueness: true

  has_secure_password
  has_secure_token
  has_secure_token :reset_digest

  has_many :locations
  has_many :favorite_restaurants

  def self.valid_login?(email, password)
    user = find_by(email: email)
    user if user&.authenticate(password)
  end

  def invalidate_token
    update(token: nil)
  end
end
