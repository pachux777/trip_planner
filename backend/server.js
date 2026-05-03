const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

/* ==================================================
   MIDDLEWARE
================================================== */
app.use(cors());
app.use(express.json());

/* ==================================================
   MYSQL CONNECTION
================================================== */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, conn) => {
  if (err) {
    console.log("Database Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
    conn.release();
  }
});

/* ==================================================
   HOME
================================================== */
app.get("/", (req, res) => {
  res.send("Travel Planner Pro Backend Running");
});

/* ==================================================
   HEALTH CHECK
================================================== */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    server: "running",
    database: "connected"
  });
});

/* ==================================================
   AUTH
================================================== */
app.post("/register", (req, res) => {
  const { name, email, password, phone } = req.body;

  const sql =
    "INSERT INTO users (name,email,password,phone) VALUES (?,?,?,?)";

  db.query(sql, [name, email, password, phone], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Registered Successfully",
      user_id: result.insertId
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT id,name,email,phone,role
    FROM users
    WHERE email=? AND password=?
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    res.json({
      success: true,
      message: "Login Success",
      user: result[0]
    });
  });
});

/* ==================================================
   USERS
================================================== */
app.get("/users", (req, res) => {
  const sql = `
    SELECT id,name,email,phone,role,created_at
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      total: result.length,
      users: result
    });
  });
});

app.get("/users/:id", (req, res) => {
  db.query(
    "SELECT id,name,email,phone,role FROM users WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0] || {});
    }
  );
});

/* ==================================================
   CITIES
================================================== */
app.get("/cities", (req, res) => {
  db.query(
    "SELECT * FROM cities ORDER BY city_name ASC",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        total: result.length,
        cities: result
      });
    }
  );
});

app.post("/cities", (req, res) => {
  const {
    city_name,
    state_name,
    country_name,
    best_season,
    avg_budget_per_day
  } = req.body;

  const sql = `
    INSERT INTO cities
    (city_name,state_name,country_name,best_season,avg_budget_per_day)
    VALUES (?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      city_name,
      state_name,
      country_name || "India",
      best_season,
      avg_budget_per_day
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "City Added",
        city_id: result.insertId
      });
    }
  );
});

app.get("/cities/:id", (req, res) => {
  db.query(
    "SELECT * FROM cities WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0] || {});
    }
  );
});

/* ==================================================
   ROUTES
================================================== */
app.get("/routes", (req, res) => {
  db.query("SELECT * FROM routes ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      routes: result
    });
  });
});

app.get("/find-route", (req, res) => {
  const { from, to } = req.query;

  db.query(
    "SELECT * FROM routes WHERE from_city_id=? AND to_city_id=?",
    [from, to],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ==================================================
   TRIPS
================================================== */
app.get("/trips", (req, res) => {
  db.query("SELECT * FROM trips ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      trips: result
    });
  });
});

app.post("/trips", (req, res) => {
  const {
    user_id,
    from_city_id,
    to_city_id,
    budget,
    days,
    people_count,
    trip_type,
    transport_mode,
    total_estimated_cost
  } = req.body;

  const sql = `
    INSERT INTO trips
    (
      user_id,
      from_city_id,
      to_city_id,
      budget,
      days,
      people_count,
      trip_type,
      transport_mode,
      total_estimated_cost
    )
    VALUES (?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      user_id,
      from_city_id,
      to_city_id,
      budget,
      days,
      people_count,
      trip_type,
      transport_mode,
      total_estimated_cost
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Trip Created",
        trip_id: result.insertId
      });
    }
  );
});

app.get("/my-trips/:userId", (req, res) => {
  db.query(
    "SELECT * FROM trips WHERE user_id=? ORDER BY id DESC",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ==================================================
   HOTELS
================================================== */
app.get("/hotels", (req, res) => {
  db.query("SELECT * FROM hotels ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/hotels/:cityId", (req, res) => {
  db.query(
    "SELECT * FROM hotels WHERE city_id=?",
    [req.params.cityId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ==================================================
   BLOGS
================================================== */
app.get("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ==================================================
   REVIEWS
================================================== */
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM reviews ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/reviews", (req, res) => {
  const { user_id, city_id, hotel_id, rating, comment } = req.body;

  db.query(
    "INSERT INTO reviews (user_id,city_id,hotel_id,rating,comment) VALUES (?,?,?,?,?)",
    [user_id, city_id, hotel_id, rating, comment],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        review_id: result.insertId
      });
    }
  );
});

/* ==================================================
   PAYMENTS
================================================== */
app.get("/payments", (req, res) => {
  db.query("SELECT * FROM payments ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ==================================================
   NOTIFICATIONS
================================================== */
app.get("/notifications/:userId", (req, res) => {
  db.query(
    "SELECT * FROM notifications WHERE user_id=? ORDER BY id DESC",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ==================================================
   SEARCH
================================================== */
app.get("/search", (req, res) => {
  const keyword = req.query.q || "";

  const sql = `
    SELECT * FROM cities
    WHERE city_name LIKE ?
    OR state_name LIKE ?
    ORDER BY city_name ASC
  `;

  db.query(
    sql,
    [`%${keyword}%`, `%${keyword}%`],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        total: result.length,
        results: result
      });
    }
  );
});

/* ==================================================
   ADMIN
================================================== */
app.get("/admin/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) total FROM users", (e1, r1) => {
    stats.users = r1[0].total;

    db.query("SELECT COUNT(*) total FROM trips", (e2, r2) => {
      stats.trips = r2[0].total;

      db.query("SELECT COUNT(*) total FROM cities", (e3, r3) => {
        stats.cities = r3[0].total;

        res.json({
          success: true,
          stats
        });
      });
    });
  });
});

/* ==================================================
   GEOCODING API
================================================== */

// In-memory cache for geocoding results
const geocodeCache = new Map();

// OpenStreetMap Nominatim API configuration
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const COUNTRYCODE = "in"; // India

// Search places with auto-suggestions
app.get("/api/places/search", async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        results: []
      });
    }

    // Check cache first
    const cacheKey = `search_${q}_${limit}`;
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 3600000) { // 1 hour cache
        return res.json({
          success: true,
          results: cached.data,
          cached: true
        });
      }
    }

    // Call Nominatim API
    const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
      params: {
        q: `${q}, India`,
        format: 'json',
        addressdetails: 1,
        extratags: 1,
        limit: limit,
        countrycodes: COUNTRYCODE,
        acceptlanguage: 'en'
      },
      headers: {
        'User-Agent': 'TravelPlannerPro/1.0'
      }
    });

    // Process and filter results
    const results = response.data.map(place => ({
      id: place.place_id,
      name: place.display_name,
      displayName: place.display_name.split(',')[0].trim(),
      fullName: place.display_name,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
      type: place.type,
      importance: place.importance || 0,
      address: {
        city: place.address?.city || place.address?.town || place.address?.village,
        district: place.address?.county || place.address?.district,
        state: place.address?.state,
        country: place.address?.country,
        postcode: place.address?.postcode
      },
      category: place.class,
      icon: getCategoryIcon(place.class, place.type),
      extraTags: place.extratags
    })).filter(place => 
      place.address.state && // Must have state
      (place.category === 'place' || place.category === 'highway' || place.category === 'tourism' || place.category === 'amenity')
    );

    // Cache the results
    geocodeCache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      results: results,
      cached: false
    });

  } catch (error) {
    console.error("Geocoding search error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search places"
    });
  }
});

// Get detailed place information
app.get("/api/places/details", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude required"
      });
    }

    // Check cache
    const cacheKey = `details_${lat}_${lon}`;
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 3600000) {
        return res.json({
          success: true,
          result: cached.data,
          cached: true
        });
      }
    }

    // Reverse geocoding
    const response = await axios.get(`${NOMINATIM_BASE_URL}/reverse`, {
      params: {
        lat: lat,
        lon: lon,
        format: 'json',
        addressdetails: 1,
        extratags: 1,
        zoom: 18,
        acceptlanguage: 'en'
      },
      headers: {
        'User-Agent': 'TravelPlannerPro/1.0'
      }
    });

    const place = response.data;
    const result = {
      name: place.display_name,
      displayName: place.display_name.split(',')[0].trim(),
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
      type: place.type,
      address: {
        houseNumber: place.address?.house_number,
        road: place.address?.road,
        suburb: place.address?.suburb,
        city: place.address?.city || place.address?.town || place.address?.village,
        district: place.address?.county || place.address?.district,
        state: place.address?.state,
        country: place.address?.country,
        postcode: place.address?.postcode
      },
      category: place.class,
      icon: getCategoryIcon(place.class, place.type),
      extraTags: place.extratags
    };

    // Cache the result
    geocodeCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      result: result,
      cached: false
    });

  } catch (error) {
    console.error("Geocoding details error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get place details"
    });
  }
});

// Get nearby places
app.get("/api/places/nearby", async (req, res) => {
  try {
    const { lat, lon, radius = 5000, type } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude required"
      });
    }

    // Check cache
    const cacheKey = `nearby_${lat}_${lon}_${radius}_${type || 'all'}`;
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 3600000) {
        return res.json({
          success: true,
          results: cached.data,
          cached: true
        });
      }
    }

    // Overpass API for nearby places
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["name"](around:${radius},${lat},${lon});
        way["name"](around:${radius},${lat},${lon});
        relation["name"](around:${radius},${lat},${lon});
      );
      out geom;
    `;

    const response = await axios.get('https://overpass-api.de/api/interpreter', {
      params: { data: overpassQuery },
      headers: {
        'User-Agent': 'TravelPlannerPro/1.0'
      }
    });

    const results = response.data.elements.map(element => ({
      id: element.id,
      name: element.tags?.name,
      displayName: element.tags?.name,
      lat: element.lat || element.center?.lat,
      lon: element.lon || element.center?.lon,
      type: element.type,
      category: element.tags?.amenity || element.tags?.tourism || element.tags?.shop || element.tags?.leisure,
      icon: getCategoryIcon(element.tags?.amenity || element.tags?.tourism, element.type),
      tags: element.tags
    })).filter(place => place.name && place.lat && place.lon);

    // Cache the results
    geocodeCache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      results: results,
      cached: false
    });

  } catch (error) {
    console.error("Nearby places error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get nearby places"
    });
  }
});

// Helper function to get category icons
function getCategoryIcon(category, type) {
  const iconMap = {
    'tourism': '🏛️',
    'amenity': '🏢',
    'shop': '🛍️',
    'highway': '🛣️',
    'place': '📍',
    'natural': '🌳',
    'leisure': '🎯',
    'building': '🏠',
    'transport': '🚉',
    'restaurant': '🍽️',
    'hotel': '🏨',
    'attraction': '🎢',
    'museum': '🏛️',
    'park': '🌳',
    'beach': '🏖️',
    'temple': '🛕',
    'airport': '✈️',
    'railway': '🚂',
    'bus': '🚌',
    'hospital': '🏥',
    'school': '🏫',
    'bank': '🏦'
  };

  // Check for specific types first
  if (type === 'airport' || category === 'aeroway') return '✈️';
  if (type === 'railway_station' || category === 'railway') return '🚂';
  if (type === 'bus_station' || type === 'bus_stop') return '🚌';
  if (type === 'hotel' || category === 'accommodation') return '🏨';
  if (type === 'restaurant' || category === 'food') return '🍽️';
  if (type === 'beach' || category === 'natural') return '🏖️';
  if (type === 'temple' || type === 'church' || type === 'mosque') return '🛕';
  
  // Use category mapping
  return iconMap[category] || '📍';
}

/* ==================================================
   404
================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

/* ==================================================
   START SERVER
================================================== */
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});