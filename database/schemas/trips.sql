CREATE TABLE trips (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,

  from_city_id INT NOT NULL,
  to_city_id INT NOT NULL,

  budget INT NOT NULL,
  days INT NOT NULL,
  people_count INT DEFAULT 1,

  trip_type VARCHAR(50),
  transport_mode VARCHAR(50),

  stay_budget INT,
  food_budget INT,
  activity_budget INT,
  total_estimated_cost INT,

  itinerary TEXT,

  status VARCHAR(30) DEFAULT 'planned',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (from_city_id) REFERENCES cities(id),
  FOREIGN KEY (to_city_id) REFERENCES cities(id)
);