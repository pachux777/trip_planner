CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  booking_id INT,

  payment_reference VARCHAR(150) UNIQUE,
  provider VARCHAR(80),

  amount INT NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',

  payment_method VARCHAR(50),
  payment_status VARCHAR(30) DEFAULT 'pending',

  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);