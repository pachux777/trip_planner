CREATE TABLE routes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  from_city_id INT NOT NULL,
  to_city_id INT NOT NULL,
  distance_km INT,
  duration_hours DECIMAL(5,2),

  bus_price INT,
  train_price INT,
  flight_price INT,
  car_price INT,

  cheapest_option VARCHAR(50),
  fastest_option VARCHAR(50),
  scenic_option VARCHAR(50),

  bus_available BOOLEAN DEFAULT TRUE,
  train_available BOOLEAN DEFAULT TRUE,
  flight_available BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (from_city_id) REFERENCES cities(id),
  FOREIGN KEY (to_city_id) REFERENCES cities(id)
);