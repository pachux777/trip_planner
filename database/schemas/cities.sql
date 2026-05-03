CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  city_name VARCHAR(100) NOT NULL,
  state_name VARCHAR(100) NOT NULL,
  country_name VARCHAR(100) DEFAULT 'India',
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  best_season VARCHAR(100),
  avg_budget_per_day INT,
  image VARCHAR(255),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  popular BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);