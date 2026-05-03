import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, DollarSign, Navigation, Calendar, Users, Hotel, Utensils, Camera, Compass, TrendingUp, Award, Shield, Zap } from 'lucide-react';
import './PlaceSearch.css';

const PlaceSearch = ({ onPlaceSelect, placeholder = "Search real places in India..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Comprehensive Real Indian places database with tourist attractions and pictures
  const realIndianPlaces = [
    // MAJOR CITIES
    { id: 1, name: "Mumbai", state: "Maharashtra", type: "city", rating: 4.5, popularity: "very_high", description: "Financial capital of India, Bollywood hub", attractions: ["Gateway of India", "Marine Drive", "Juhu Beach", "Elephanta Caves", "Siddhivinayak Temple", "Haji Ali Dargah", "Bandra-Worli Sea Link", "Chhatrapati Shivaji Terminus"], bestTime: "Nov - Feb", avgBudget: 3000, coordinates: { lat: 19.0760, lng: 72.8777 }, image: "https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=800" },
    { id: 2, name: "Delhi", state: "Delhi", type: "city", rating: 4.4, popularity: "very_high", description: "Capital of India, rich history", attractions: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple", "Akshardham Temple", "Humayun's Tomb", "Jama Masjid", "Chandni Chowk"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 28.7041, lng: 77.1025 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 3, name: "Bangalore", state: "Karnataka", type: "city", rating: 4.3, popularity: "high", description: "Silicon Valley of India", attractions: ["Lalbagh", "Cubbon Park", "Bangalore Palace", "ISKCON Temple", "Vidhana Soudha", "Ulsoor Lake", "Nandi Hills", "Wonderla"], bestTime: "Sep - Mar", avgBudget: 2800, coordinates: { lat: 12.9716, lng: 77.5946 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 4, name: "Chennai", state: "Tamil Nadu", type: "city", rating: 4.2, popularity: "high", description: "Gateway to South India", attractions: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George", "San Thome Basilica", "Guindy National Park", "Valluvar Kottam", "MGR Memorial", "Elliot's Beach"], bestTime: "Nov - Feb", avgBudget: 2200, coordinates: { lat: 13.0827, lng: 80.2707 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 5, name: "Kolkata", state: "West Bengal", type: "city", rating: 4.3, popularity: "high", description: "City of Joy, cultural capital", attractions: ["Victoria Memorial", "Howrah Bridge", "Indian Museum", "Kalighat Temple", "Dakshineswar Temple", "Belur Math", "Park Street", "Marble Palace"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 22.5726, lng: 88.3639 }, image: "https://images.unsplash.com/photo-1595435934249-5ca7104a1033?w=800" },
    { id: 6, name: "Hyderabad", state: "Telangana", type: "city", rating: 4.4, popularity: "high", description: "City of Nizams and pearls", attractions: ["Charminar", "Golconda Fort", "Hussain Sagar Lake", "Salar Jung Museum", "Qutb Shahi Tombs", "Chowmahalla Palace", "Ramoji Film City", "Birla Mandir"], bestTime: "Oct - Mar", avgBudget: 2300, coordinates: { lat: 17.3850, lng: 78.4867 }, image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800" },
    { id: 7, name: "Pune", state: "Maharashtra", type: "city", rating: 4.2, popularity: "high", description: "Oxford of the East", attractions: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort", "Pataleshwar Cave", "Raja Dinkar Kelkar Museum", "Saras Baug", "Parvati Hill", "Katraj Snake Park"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 18.5204, lng: 73.8567 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 8, name: "Ahmedabad", state: "Gujarat", type: "city", rating: 4.1, popularity: "high", description: "Manchester of India", attractions: ["Sabarmati Ashram", "Adalaj Stepwell", "Kankaria Lake", "Sidi Saiyyed Mosque", "Bhadra Fort", "Jama Masjid", "Calico Museum", "Science City"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 23.0225, lng: 72.5714 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },

    // TOURIST DESTINATIONS
    { id: 9, name: "Goa", state: "Goa", type: "destination", rating: 4.7, popularity: "very_high", description: "Beach paradise with Portuguese heritage", attractions: ["Baga Beach", "Calangute Beach", "Anjuna Beach", "Old Goa Churches", "Dudhsagar Falls", "Aguada Fort", "Basilica of Bom Jesus", "Mandrem Beach"], bestTime: "Nov - Feb", avgBudget: 3500, coordinates: { lat: 15.2993, lng: 74.1240 }, image: "https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=800" },
    { id: 10, name: "Jaipur", state: "Rajasthan", type: "destination", rating: 4.6, popularity: "high", description: "Pink City of royal heritage", attractions: ["Hawa Mahal", "City Palace", "Amber Fort", "Jantar Mantar", "Nahargarh Fort", "Jaigarh Fort", "Albert Hall Museum", "Birla Temple"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 26.9124, lng: 75.7873 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 11, name: "Agra", state: "Uttar Pradesh", type: "destination", rating: 4.5, popularity: "very_high", description: "Home to the magnificent Taj Mahal", attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itmad-ud-Daulah", "Mehtab Bagh", "Sikandra", "Mariam's Tomb", "Mughal Heritage Walk"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 27.1767, lng: 78.0081 }, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800" },
    { id: 12, name: "Varanasi", state: "Uttar Pradesh", type: "destination", rating: 4.8, popularity: "high", description: "Spiritual capital of India", attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Man Mandir Ghat", "Sarnath", "Sankat Mochan Temple", "Durga Temple", "Tulsi Manas Temple", "Ramnagar Fort"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 25.3176, lng: 82.9739 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 13, name: "Udaipur", state: "Rajasthan", type: "destination", rating: 4.7, popularity: "high", description: "City of Lakes", attractions: ["Lake Pichola", "City Palace", "Jag Mandir", "Saheliyon Ki Bari", "Fateh Sagar Lake", "Monsoon Palace", "Jagdish Temple", "Sajjangarh Palace"], bestTime: "Sep - Mar", avgBudget: 3000, coordinates: { lat: 24.5806, lng: 73.6873 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 14, name: "Jodhpur", state: "Rajasthan", type: "destination", rating: 4.5, popularity: "high", description: "Blue City of Rajasthan", attractions: ["Mehrangarh Fort", "Umaid Bhawan Palace", "Jaswant Thada", "Mandore Gardens", "Kaylana Lake", "Balsamand Lake", "Ghanta Ghar", "Sardar Market"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 26.2389, lng: 73.0243 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 15, name: "Kochi", state: "Kerala", type: "destination", rating: 4.4, popularity: "high", description: "Queen of Arabian Sea", attractions: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace", "Jew Town", "St. Francis Church", "Marine Drive", "Hill Palace", "Bolgatty Palace"], bestTime: "Sep - Mar", avgBudget: 2800, coordinates: { lat: 9.9312, lng: 76.2673 }, image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800" },

    // HILL STATIONS
    { id: 16, name: "Munnar", state: "Kerala", type: "hill_station", rating: 4.8, popularity: "high", description: "Tea gardens and misty mountains", attractions: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Echo Point", "Top Station", "Kundala Lake", "Anamudi Peak", "Chinnar Wildlife Sanctuary"], bestTime: "Sep - May", avgBudget: 4000, coordinates: { lat: 10.0889, lng: 77.0595 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 17, name: "Ooty", state: "Tamil Nadu", type: "hill_station", rating: 4.5, popularity: "high", description: "Queen of Hill Stations", attractions: ["Botanical Garden", "Ooty Lake", "Doddabetta Peak", "Rose Garden", "Pykara Falls", "Coonoor", "Ketti Valley", "Tea Museum"], bestTime: "Mar - Jun", avgBudget: 3500, coordinates: { lat: 11.4102, lng: 76.6950 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 18, name: "Shimla", state: "Himachal Pradesh", type: "hill_station", rating: 4.4, popularity: "high", description: "Queen of Hills", attractions: ["Mall Road", "Kufri", "Jakhoo Temple", "Christ Church", "Summer Hill", "Chail", "Naldehra", "Tattapani"], bestTime: "Mar - Jun", avgBudget: 4500, coordinates: { lat: 31.1048, lng: 77.1734 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 19, name: "Manali", state: "Himachal Pradesh", type: "hill_station", rating: 4.6, popularity: "very_high", description: "Adventure hub in Himalayas", attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Vashisht Hot Springs", "Old Manali", "Naggar Castle", "Manikaran", "Great Himalayan National Park"], bestTime: "Mar - Jun", avgBudget: 5000, coordinates: { lat: 32.2731, lng: 77.1773 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 20, name: "Darjeeling", state: "West Bengal", type: "hill_station", rating: 4.5, popularity: "high", description: "Queen of the Himalayas", attractions: ["Tiger Hill", "Batasia Loop", "Darjeeling Himalayan Railway", "Padmaja Naidu Zoo", "Japanese Peace Pagoda", "Rock Garden", "Ghum Monastery", "Happy Valley Tea Estate"], bestTime: "Mar - Jun", avgBudget: 4000, coordinates: { lat: 27.0410, lng: 88.2663 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 21, name: "Gangtok", state: "Sikkim", type: "hill_station", rating: 4.6, popularity: "high", description: "Gateway to Northeast", attractions: ["Tsomgo Lake", "Nathula Pass", "Rumtek Monastery", "MG Marg", "Ganesh Tok", "Tashi Viewpoint", "Do Drul Chorten", "Himalayan Zoological Park"], bestTime: "Mar - Jun", avgBudget: 4500, coordinates: { lat: 27.3314, lng: 88.6138 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 22, name: "Mussoorie", state: "Uttarakhand", type: "hill_station", rating: 4.3, popularity: "high", description: "Queen of Hills", attractions: ["Gun Hill", "Kempty Falls", "Mall Road", "Lal Tibba", "Company Garden", "Cloud's End", "Jharipani Falls", "Bhatta Falls"], bestTime: "Mar - Jun", avgBudget: 3500, coordinates: { lat: 30.4590, lng: 78.0677 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },
    { id: 23, name: "Nainital", state: "Uttarakhand", type: "hill_station", rating: 4.4, popularity: "high", description: "Lake District of India", attractions: ["Naini Lake", "Naina Devi Temple", "Tiffin Top", "Snow View Point", "Mall Road", "Cave Garden", "Eco Cave Gardens", "Hanuman Garhi"], bestTime: "Mar - Jun", avgBudget: 3500, coordinates: { lat: 29.3806, lng: 79.4637 }, image: "https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800" },

    // BEACHES
    { id: 24, name: "Kovalam", state: "Kerala", type: "beach", rating: 4.6, popularity: "high", description: "Paradise beach with crescent shore", attractions: ["Lighthouse Beach", "Hawa Beach", "Samudra Beach", "Vizhinjam Marine Aquarium", "Kovalam Art Gallery", "Vellayani Lake", "Poovar Island", "Karamana River"], bestTime: "Sep - May", avgBudget: 3000, coordinates: { lat: 8.3830, lng: 76.9900 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 25, name: "Varkala", state: "Kerala", type: "beach", rating: 4.5, popularity: "medium", description: "Cliff beach with natural springs", attractions: ["Papanasam Beach", "Sivagiri Mutt", "Janardhana Swami Temple", "Varkala Cliff", "Kappil Lake", "Anjengo Fort", "Varkala Beach", "Ponnumthuruthu Island"], bestTime: "Sep - May", avgBudget: 2500, coordinates: { lat: 8.7379, lng: 76.8442 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 26, name: "Marina Beach", state: "Tamil Nadu", type: "beach", rating: 4.2, popularity: "high", description: "World's second longest urban beach", attractions: ["Marina Beach", "Aquarium", "Light House", "MGR Memorial", "Napier Bridge", "Santhome Cathedral", "Victory War Memorial", "Anna Square"], bestTime: "Nov - Feb", avgBudget: 1500, coordinates: { lat: 13.0475, lng: 80.2894 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 27, name: "Baga Beach", state: "Goa", type: "beach", rating: 4.4, popularity: "high", description: "Most happening beach in Goa", attractions: ["Baga Beach", "Calangute Beach", "Anjuna Beach", "Baga Creek", "Tito's Lane", "Britto's Restaurant", "Water Sports", "Night Markets"], bestTime: "Nov - Feb", avgBudget: 3000, coordinates: { lat: 15.5577, lng: 73.7562 }, image: "https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=800" },
    { id: 28, name: "Palolem Beach", state: "Goa", type: "beach", rating: 4.6, popularity: "medium", description: "Paradise beach in South Goa", attractions: ["Palolem Beach", "Butterfly Beach", "Patnem Beach", "Canacona Beach", "Monkey Island", "Dolphin Watching", "Beach Shacks", "Silent Noise Disco"], bestTime: "Nov - Feb", avgBudget: 2500, coordinates: { lat: 15.0099, lng: 74.0246 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 29, name: "Gokarna", state: "Karnataka", type: "beach", rating: 4.5, popularity: "medium", description: "Sacred beach town", attractions: ["Om Beach", "Kudle Beach", "Half Moon Beach", "Paradise Beach", "Mahabaleshwar Temple", "Gokarna Beach", "Mirjan Fort", "Yana Rocks"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 14.5437, lng: 74.3178 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 30, name: "Puri", state: "Odisha", type: "beach", rating: 4.3, popularity: "high", description: "Sacred beach city", attractions: ["Puri Beach", "Jagannath Temple", "Konark Sun Temple", "Chilika Lake", "Raghurajpur", "Sakshi Gopal", "Alarnath Temple", "Gundicha Temple"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 19.8135, lng: 85.8249 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },

    // HERITAGE SITES
    { id: 31, name: "Khajuraho", state: "Madhya Pradesh", type: "heritage", rating: 4.7, popularity: "medium", description: "UNESCO world heritage temples", attractions: ["Western Group Temples", "Eastern Group Temples", "Southern Group Temples", "Lakshmana Temple", "Kandariya Mahadeva Temple", "Devi Jagadambi Temple", "Chitragupta Temple", "Archaeological Museum"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 24.8317, lng: 79.9191 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 32, name: "Hampi", state: "Karnataka", type: "heritage", rating: 4.8, popularity: "high", description: "Ancient Vijayanagara empire ruins", attractions: ["Virupaksha Temple", "Vittala Temple", "Stone Chariot", "Lotus Mahal", "Elephant Stables", "Hazara Rama Temple", "Queen's Bath", "Tungabhadra Dam"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 15.3350, lng: 76.4620 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 33, name: "Mahabalipuram", state: "Tamil Nadu", type: "heritage", rating: 4.4, popularity: "medium", description: "Ancient port city with rock carvings", attractions: ["Shore Temple", "Pancha Rathas", "Arjuna's Penance", "Varaha Cave Temple", "Krishna Mandapam", "Mahishamardini Cave", "Tiger Cave", "Sculpture Museum"], bestTime: "Nov - Feb", avgBudget: 1500, coordinates: { lat: 12.6249, lng: 80.1938 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 34, name: "Fatehpur Sikri", state: "Uttar Pradesh", type: "heritage", rating: 4.5, popularity: "high", description: "Abandoned Mughal capital", attractions: ["Buland Darwaza", "Jama Masjid", "Panch Mahal", "Diwan-i-Khas", "Diwan-i-Aam", "Jodha Bai Palace", "Mariam's Palace", "Panch Mahal"], bestTime: "Oct - Mar", avgBudget: 1500, coordinates: { lat: 27.0580, lng: 77.6668 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 35, name: "Chittorgarh", state: "Rajasthan", type: "heritage", rating: 4.6, popularity: "medium", description: "Largest fort in India", attractions: ["Chittorgarh Fort", "Vijay Stambh", "Kirti Stambh", "Rani Padmini Palace", "Meera Temple", "Kalka Mata Temple", "Gaumukh Kund", "Ratan Singh Palace"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 24.8887, lng: 74.6369 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 36, name: "Konark", state: "Odisha", type: "heritage", rating: 4.7, popularity: "medium", description: "Sun Temple UNESCO site", attractions: ["Konark Sun Temple", "Konark Beach", "Archaeological Museum", "Ramachandi Temple", "Kuruma Temple", "Astranga Beach", "Kakatpur Temple", "Pipili Village"], bestTime: "Oct - Mar", avgBudget: 1500, coordinates: { lat: 19.8856, lng: 86.0935 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },

    // WILDLIFE
    { id: 37, name: "Ranthambore", state: "Rajasthan", type: "wildlife", rating: 4.6, popularity: "high", description: "Famous tiger reserve", attractions: ["Ranthambore Fort", "Safari Zones", "Padam Lake", "Raj Bagh Ruins", "Jogi Mahal", "Ganesh Temple", "Surwal Lake", "Kachida Valley"], bestTime: "Oct - Mar", avgBudget: 4000, coordinates: { lat: 25.3898, lng: 76.5030 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 38, name: "Jim Corbett", state: "Uttarakhand", type: "wildlife", rating: 4.5, popularity: "high", description: "India's oldest national park", attractions: ["Dhikala Zone", "Bijrani Zone", "Corbett Falls", "Garjiya Devi Temple", "Dhangarhi Museum", "Kalagarh Dam", "Sitabani Forest", "Jhirna Zone"], bestTime: "Nov - Jun", avgBudget: 4500, coordinates: { lat: 29.5300, lng: 78.7700 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 39, name: "Periyar", state: "Kerala", type: "wildlife", rating: 4.4, popularity: "medium", description: "Tiger and elephant reserve", attractions: ["Periyar Lake", "Boat Safari", "Spice Plantations", "Periyar Wildlife Sanctuary", "Kumily", "Mangala Devi Temple", "Murikkady", "Vandiperiyar"], bestTime: "Sep - May", avgBudget: 3000, coordinates: { lat: 9.5400, lng: 77.2100 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 40, name: "Kaziranga", state: "Assam", type: "wildlife", rating: 4.7, popularity: "high", description: "One-horned rhinoceros sanctuary", attractions: ["Kaziranga National Park", "Elephant Safari", "Jeep Safari", "Orang National Park", "Pobitora Wildlife Sanctuary", "Panbari Reserve Forest", "Kaziranga Orchid Park", "Kaziranga National Orchid"], bestTime: "Nov - Apr", avgBudget: 4000, coordinates: { lat: 26.6600, lng: 93.3500 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 41, name: "Sundarbans", state: "West Bengal", type: "wildlife", rating: 4.5, popularity: "medium", description: "World's largest mangrove forest", attractions: ["Sundarbans National Park", "Sajnekhali Watch Tower", "Sudhanyakhali Watch Tower", "Netidhopani Watch Tower", "Halliday Island", "Lothian Island", "Gosaba", "Bonnie Camp"], bestTime: "Oct - Mar", avgBudget: 3500, coordinates: { lat: 21.9497, lng: 89.1833 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 42, name: "Bandipur", state: "Karnataka", type: "wildlife", rating: 4.4, popularity: "medium", description: "Tiger reserve in Nilgiris", attractions: ["Bandipur National Park", "Gopalaswamy Betta", "Himavad Gopalaswamy Temple", "Moyar River", "Bandipur Safari", "Wildlife Safari", "Elephant Camp", "Nature Walk"], bestTime: "Oct - Mar", avgBudget: 3000, coordinates: { lat: 12.4234, lng: 76.6587 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },

    // PILGRIMAGE
    { id: 43, name: "Tirupati", state: "Andhra Pradesh", type: "pilgrimage", rating: 4.7, popularity: "very_high", description: "Most visited pilgrimage center", attractions: ["Tirumala Temple", "Sri Venkateswara", "Alamelu Mangapuram", "Sri Kalahasti", "Kanipakam", "Srinivasa Mangapuram", "Chandragiri Fort", "Talakona Waterfalls"], bestTime: "Sep - Feb", avgBudget: 1500, coordinates: { lat: 13.6288, lng: 79.4192 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 44, name: "Amritsar", state: "Punjab", type: "pilgrimage", rating: 4.6, popularity: "high", description: "Golden Temple city", attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Durgiana Temple", "Maharaja Ranjit Singh Museum", "Gobindgarh Fort", "Ram Tirath", "Central Sikh Museum"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 31.6340, lng: 74.8723 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 45, name: "Madurai", state: "Tamil Nadu", type: "pilgrimage", rating: 4.5, popularity: "high", description: "Temple city of South India", attractions: ["Meenakshi Temple", "Thirumalai Nayak Palace", "Alagar Koil", "Koodal Azhagar Temple", "Vandiyur Mariamman Temple", "Thiruparankundram", "Pazhamudir Solai", "Samanar Hills"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 9.9252, lng: 78.1198 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 46, name: "Badrinath", state: "Uttarakhand", type: "pilgrimage", rating: 4.8, popularity: "high", description: "Char Dham pilgrimage site", attractions: ["Badrinath Temple", "Tapt Kund", "Neelkanth Peak", "Mana Village", "Vasudhara Falls", "Charanpaduka", "Bhim Pul", "Vyas Cave"], bestTime: "May - Jun", avgBudget: 3000, coordinates: { lat: 30.7353, lng: 79.4910 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 47, name: "Kedarnath", state: "Uttarakhand", type: "pilgrimage", rating: 4.7, popularity: "high", description: "Char Dham pilgrimage site", attractions: ["Kedarnath Temple", "Gaurikund", "Vasuki Tal", "Chorabari Tal", "Sonprayag", "Triyuginarayan", "Rudranath", "Madhyamaheshwar"], bestTime: "May - Jun", avgBudget: 3000, coordinates: { lat: 30.7353, lng: 79.0669 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 48, name: "Rameswaram", state: "Tamil Nadu", type: "pilgrimage", rating: 4.6, popularity: "high", description: "Char Dham pilgrimage site", attractions: ["Ramanathaswamy Temple", "Agni Teertham", "Dhanushkodi", "Pamban Bridge", "Gandhamadana Parvatham", "Satchi Hanuman Temple", "Kothandaramaswamy Temple", "Jatayu Tirtham"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 9.2876, lng: 79.3129 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },
    { id: 49, name: "Dwarka", state: "Gujarat", type: "pilgrimage", rating: 4.5, popularity: "high", description: "Char Dham pilgrimage site", attractions: ["Dwarkadhish Temple", "Rukmini Temple", "Bet Dwarka", "Nageshwar Jyotirlinga", "Gomti Ghat", "Beyt Dwarka", "Gopi Talav", "Siddhivinayak Temple"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 22.2385, lng: 68.9678 }, image: "https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800" },

    // ADVENTURE
    { id: 50, name: "Rishikesh", state: "Uttarakhand", type: "adventure", rating: 4.7, popularity: "high", description: "Yoga capital and adventure hub", attractions: ["Lakshman Jhula", "Ganga Aarti", "River Rafting", "Bungee Jumping", "Neelkanth Mahadev Temple", "Triveni Ghat", "Parmarth Niketan", "Beatles Ashram"], bestTime: "Mar - Jun", avgBudget: 2500, coordinates: { lat: 30.0869, lng: 78.2676 }, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },
    { id: 51, name: "Leh Ladakh", state: "Jammu & Kashmir", type: "adventure", rating: 4.9, popularity: "very_high", description: "High altitude adventure paradise", attractions: ["Pangong Lake", "Khardung La", "Nubra Valley", "Shanti Stupa", "Leh Palace", "Magnetic Hill", "Hemis Monastery", "Thiksey Monastery"], bestTime: "Jun - Sep", avgBudget: 8000, coordinates: { lat: 34.1526, lng: 77.5771 }, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },
    { id: 52, name: "Andaman", state: "Andaman & Nicobar", type: "adventure", rating: 4.8, popularity: "high", description: "Island paradise with water sports", attractions: ["Cellular Jail", "Radhanagar Beach", "Havelock Island", "Neil Island", "Ross Island", "North Bay Island", "Baratang Island", "Mahatma Gandhi Marine National Park"], bestTime: "Nov - May", avgBudget: 6000, coordinates: { lat: 11.6234, lng: 92.4623 }, image: "https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800" },
    { id: 53, name: "Spiti Valley", state: "Himachal Pradesh", type: "adventure", rating: 4.7, popularity: "medium", description: "Cold desert mountain valley", attractions: ["Key Monastery", "Kibber Village", "Chandratal Lake", "Pin Valley National Park", "Tabo Monastery", "Dhankar Monastery", "Kaza", "Langza Village"], bestTime: "Jun - Sep", avgBudget: 5000, coordinates: { lat: 31.9380, lng: 78.6143 }, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },
    { id: 54, name: "Ladakh", state: "Jammu & Kashmir", type: "adventure", rating: 4.8, popularity: "high", description: "Land of high passes", attractions: ["Zanskar Valley", "Markha Valley", "Stok Kangri", "Lamayuru Monastery", "Alchi Monastery", "Likir Monastery", "Basgo", "Mulbekh"], bestTime: "Jun - Sep", avgBudget: 7000, coordinates: { lat: 34.1526, lng: 77.5771 }, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },

    // ADDITIONAL MAJOR CITIES
    { id: 55, name: "Lucknow", state: "Uttar Pradesh", type: "city", rating: 4.2, popularity: "high", description: "City of Nawabs", attractions: ["Bara Imambara", "Chota Imambara", "Rumi Darwaza", "Hazratganj", "British Residency", "Dilkusha Garden", "Chhota Imambara", "Aminabad"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 26.8467, lng: 80.9462 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 56, name: "Indore", state: "Madhya Pradesh", type: "city", rating: 4.1, popularity: "high", description: "Cleanest city in India", attractions: ["Rajwada Palace", "Lal Bagh Palace", "Kanch Mandir", "Sarafa Bazaar", "Chhatri Bagh", "Gandhi Hall", "Indore Museum", "Khajrana Ganesh Temple"], bestTime: "Oct - Mar", avgBudget: 2000, coordinates: { lat: 22.7196, lng: 75.8577 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 57, name: "Coimbatore", state: "Tamil Nadu", type: "city", rating: 4.0, popularity: "high", description: "Manchester of South India", attractions: ["Marudamalai Temple", "Perur Temple", "Velliangiri Hills", "Siruvani Waterfalls", "Anamalai Wildlife Sanctuary", "Black Thunder", "Kovai Kondattam", "CODISSIA Trade Fair Complex"], bestTime: "Sep - Mar", avgBudget: 2000, coordinates: { lat: 11.0168, lng: 76.9558 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 58, name: "Visakhapatnam", state: "Andhra Pradesh", type: "city", rating: 4.2, popularity: "high", description: "City of Destiny", attractions: ["RK Beach", "Rushikonda Beach", "Bheemunipatnam Beach", "Kailasagiri Hill Park", "Submarine Museum", "Dolphin's Nose", "Simhachalam Temple", "Araku Valley"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 17.6868, lng: 83.2185 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 59, name: "Nagpur", state: "Maharashtra", type: "city", rating: 4.0, popularity: "high", description: "Orange City", attractions: ["Deekshabhoomi", "Tekdi Ganesh Temple", "Futala Lake", "Raman Science Centre", "Maharaj Bagh", "Sitabuldi Fort", "Dragon Palace Temple", "Seminary Hill"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 21.1458, lng: 79.0882 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 60, name: "Bhopal", state: "Madhya Pradesh", type: "city", rating: 4.1, popularity: "high", description: "City of Lakes", attractions: ["Upper Lake", "Lower Lake", "Van Vihar National Park", "Bhimbetka Caves", "Sanchi Stupa", "Taj-ul-Masajid", "Gohar Mahal", "Shaukat Mahal"], bestTime: "Oct - Mar", avgBudget: 1800, coordinates: { lat: 23.2599, lng: 77.4126 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },

    // ADDITIONAL TOURIST DESTINATIONS
    { id: 61, name: "Mysore", state: "Karnataka", type: "destination", rating: 4.5, popularity: "high", description: "Cultural capital of Karnataka", attractions: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "Jaganmohan Palace", "Lalitha Mahal", "Mysore Zoo", "St. Philomena's Church", "Karanji Lake"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 12.2958, lng: 76.6394 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 62, name: "Pondicherry", state: "Puducherry", type: "destination", rating: 4.4, popularity: "high", description: "French Riviera of the East", attractions: ["Promenade Beach", "Aurobindo Ashram", "Auroville", "French Quarter", "Paradise Beach", "Sri Aurobindo Ashram", "Bharathi Park", "Botanical Garden"], bestTime: "Oct - Mar", avgBudget: 2500, coordinates: { lat: 11.9416, lng: 79.8083 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 63, name: "Shirdi", state: "Maharashtra", type: "pilgrimage", rating: 4.6, popularity: "very_high", description: "Home of Sai Baba", attractions: ["Shri Saibaba Sansthan Temple", "Dwarkamai", "Chavadi", "Samadhi Mandir", "Khandoba Temple", "Shani Shingnapur", "Sakori Ashram", "Maruti Mandir"], bestTime: "Oct - Mar", avgBudget: 1500, coordinates: { lat: 19.7680, lng: 74.3848 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" },
    { id: 64, name: "Shirdi", state: "Maharashtra", type: "pilgrimage", rating: 4.6, popularity: "very_high", description: "Home of Sai Baba", attractions: ["Shri Saibaba Sansthan Temple", "Dwarkamai", "Chavadi", "Samadhi Mandir", "Khandoba Temple", "Shani Shingnapur", "Sakori Ashram", "Maruti Mandir"], bestTime: "Oct - Mar", avgBudget: 1500, coordinates: { lat: 19.7680, lng: 74.3848 }, image: "https://images.unsplash.com/photo-1596445856564-9d2b2b4f2b5a?w=800" }
  ];

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = realIndianPlaces.filter(place => 
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.state.toLowerCase().includes(query.toLowerCase()) ||
          place.type.toLowerCase().includes(query.toLowerCase()) ||
          place.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);
        
        setSuggestions(filtered);
        setLoading(false);
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.name);
    setShowSuggestions(false);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlace && onPlaceSelect) {
      onPlaceSelect(selectedPlace);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      city: "🏙️",
      destination: "🏛️",
      hill_station: "⛰️",
      beach: "🏖️",
      heritage: "🏛️",
      wildlife: "🦁",
      pilgrimage: "🕉️",
      adventure: "🏔️"
    };
    return icons[type] || "📍";
  };

  const getPopularityBadge = (popularity) => {
    const badges = {
      very_high: { text: "Trending", color: "#ef4444" },
      high: { text: "Popular", color: "#f59e0b" },
      medium: { text: "Good", color: "#10b981" },
      low: { text: "Hidden", color: "#6b7280" }
    };
    return badges[popularity] || badges.medium;
  };

  return (
    <div className="place-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="search-input"
              autoComplete="off"
            />
            {loading && <div className="search-spinner"></div>}
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((place) => (
            <div
              key={place.id}
              className="suggestion-item"
              onClick={() => handlePlaceSelect(place)}
            >
              <div className="suggestion-image">
                <img src={place.image} alt={place.name} />
              </div>
              <div className="suggestion-content">
                <div className="suggestion-header">
                  <h4 className="place-name">{place.name}</h4>
                  <div className="suggestion-badges">
                    <span className="popularity-badge" style={{ backgroundColor: getPopularityBadge(place.popularity).color }}>
                      {getPopularityBadge(place.popularity).text}
                    </span>
                    <span className="rating-badge">
                      ⭐ {place.rating}
                    </span>
                  </div>
                </div>
                <p className="place-description">{place.description}</p>
                <div className="tourist-attractions">
                  <strong>Top Attractions:</strong>
                  <div className="attractions-list">
                    {place.attractions.slice(0, 4).map((attraction, index) => (
                      <span key={index} className="attraction-tag">
                        {attraction}
                      </span>
                    ))}
                    {place.attractions.length > 4 && (
                      <span className="more-attractions">+{place.attractions.length - 4} more</span>
                    )}
                  </div>
                </div>
                <div className="suggestion-meta">
                  <span className="place-state">{place.state}</span>
                  <span className="place-budget">₹{place.avgBudget}/day</span>
                  <span className="place-time">{place.bestTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;
