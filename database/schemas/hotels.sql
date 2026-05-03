CREATE TABLE hotels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  city_id INT NOT NULL,

  hotel_name VARCHAR(150) NOT NULL,
  slug VARCHAR(180) UNIQUE,

  hotel_type VARCHAR(50),
  price_per_night INT,

  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INT DEFAULT 0,

  address VARCHAR(255),
  image VARCHAR(255),

  amenities TEXT,
  contact_phone VARCHAR(20),
  website_url VARCHAR(255),

  available BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (city_id) REFERENCES cities(id)
);