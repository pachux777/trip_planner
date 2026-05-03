CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  trip_id INT,
  hotel_id INT,

  booking_type VARCHAR(50) NOT NULL,
  booking_reference VARCHAR(120) UNIQUE,

  check_in_date DATE,
  check_out_date DATE,

  guests_count INT DEFAULT 1,
  amount INT NOT NULL,

  payment_status VARCHAR(30) DEFAULT 'pending',
  booking_status VARCHAR(30) DEFAULT 'confirmed',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (trip_id) REFERENCES trips(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);