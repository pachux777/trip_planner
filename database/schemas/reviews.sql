CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  city_id INT,
  hotel_id INT,
  blog_id INT,

  rating INT NOT NULL,
  title VARCHAR(150),
  comment TEXT,

  status VARCHAR(30) DEFAULT 'approved',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (city_id) REFERENCES cities(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);