-- Comprehensive Indian Places Database
-- Includes tourist attractions, landmarks, transport hubs, and important locations

-- Kerala Tourist Places
INSERT INTO indian_places (name, state, district, lat, lon, type, category, importance) VALUES
('Munnar', 'Kerala', 'Idukki', 10.0889, 77.0595, 'town', 'tourism', 90),
('Top Station', 'Kerala', 'Idukki', 10.1813, 77.3634, 'viewpoint', 'tourism', 85),
('Kolukkumalai', 'Kerala', 'Idukki', 10.0583, 77.2333, 'peak', 'tourism', 80),
('Bekal Fort', 'Kerala', 'Kasaragod', 12.6535, 75.0364, 'fort', 'tourism', 88),
('Cherupuzha', 'Kerala', 'Kasaragod', 12.3833, 75.0167, 'town', 'place', 70),
('Kasaragod', 'Kerala', 'Kasaragod', 12.4996, 74.9856, 'town', 'place', 85),
('Kannur', 'Kerala', 'Kannur', 11.8745, 75.3704, 'city', 'place', 87),
('Kochi Airport', 'Kerala', 'Ernakulam', 10.1520, 76.4019, 'airport', 'transport', 92),
('Kochi', 'Kerala', 'Ernakulam', 9.9312, 76.2673, 'city', 'place', 95),
('Alleppey', 'Kerala', 'Alappuzha', 9.4941, 76.3362, 'city', 'tourism', 90),
('Thekkady', 'Kerala', 'Idukki', 9.5965, 77.1305, 'town', 'tourism', 85),
('Wayanad', 'Kerala', 'Wayanad', 11.6089, 76.0833, 'district', 'tourism', 88),
('Varkala', 'Kerala', 'Thiruvananthapuram', 8.7379, 76.8429, 'beach', 'tourism', 86),
('Kovalam', 'Kerala', 'Thiruvananthapuram', 8.3839, 76.9782, 'beach', 'tourism', 87),
('Thiruvananthapuram', 'Kerala', 'Thiruvananthapuram', 8.5241, 76.9366, 'city', 'place', 92),
('Kumarakom', 'Kerala', 'Kottayam', 9.6175, 76.4236, 'village', 'tourism', 85),

-- Goa
('Goa Beach', 'Goa', 'North Goa', 15.6005, 73.7598, 'beach', 'tourism', 88),
('Panaji', 'Goa', 'North Goa', 15.4909, 73.8278, 'city', 'place', 85),
('Madgaon', 'Goa', 'South Goa', 15.2776, 73.9503, 'city', 'place', 80),
('Dabolim Airport', 'Goa', 'South Goa', 15.3808, 73.8314, 'airport', 'transport', 90),

-- Karnataka
('Mysore Palace', 'Karnataka', 'Mysore', 12.3054, 76.6550, 'palace', 'tourism', 92),
('Mysore', 'Karnataka', 'Mysore', 12.2958, 76.6394, 'city', 'place', 90),
('Bangalore', 'Karnataka', 'Bangalore', 12.9716, 77.5946, 'city', 'place', 95),
('Hampi', 'Karnataka', 'Bellary', 15.3350, 76.4620, 'historical', 'tourism', 90),
('Gokarna', 'Karnataka', 'Uttara Kannada', 14.5439, 74.3204, 'town', 'tourism', 85),
('Coorg', 'Karnataka', 'Kodagu', 12.4114, 75.7379, 'region', 'tourism', 88),
('Chikmagalur', 'Karnataka', 'Chikmagalur', 13.3267, 75.7797, 'town', 'tourism', 82),
('Mangalore', 'Karnataka', 'Dakshina Kannada', 12.9141, 74.8560, 'city', 'place', 87),
('Hubli', 'Karnataka', 'Dharwad', 15.3647, 75.1239, 'city', 'place', 80),
('Belgaum', 'Karnataka', 'Belgaum', 15.8481, 74.5124, 'city', 'place', 78),

-- Tamil Nadu
('Chennai', 'Tamil Nadu', 'Chennai', 13.0827, 80.2707, 'city', 'place', 95),
('Chennai Airport', 'Tamil Nadu', 'Chennai', 12.9941, 80.1811, 'airport', 'transport', 92),
('Madurai', 'Tamil Nadu', 'Madurai', 9.9252, 78.1198, 'city', 'tourism', 88),
('Rameswaram', 'Tamil Nadu', 'Ramanathapuram', 9.2876, 79.3129, 'town', 'tourism', 85),
('Kanyakumari', 'Tamil Nadu', 'Kanyakumari', 8.0883, 77.5385, 'town', 'tourism', 90),
('Ooty', 'Tamil Nadu', 'Nilgiris', 11.4087, 76.6950, 'town', 'tourism', 89),
('Kodaikanal', 'Tamil Nadu', 'Dindigul', 10.2331, 77.4833, 'town', 'tourism', 86),
('Coimbatore', 'Tamil Nadu', 'Coimbatore', 11.0168, 76.9558, 'city', 'place', 85),
('Tiruchirappalli', 'Tamil Nadu', 'Tiruchirappalli', 10.7905, 78.7047, 'city', 'place', 82),
('Tirupati', 'Andhra Pradesh', 'Chittoor', 13.6288, 79.4192, 'city', 'tourism', 90),

-- Maharashtra
('Mumbai', 'Maharashtra', 'Mumbai', 19.0760, 72.8777, 'city', 'place', 95),
('Mumbai Airport', 'Maharashtra', 'Mumbai', 19.0896, 72.8656, 'airport', 'transport', 92),
('Pune', 'Maharashtra', 'Pune', 18.5204, 73.8567, 'city', 'place', 90),
('Nashik', 'Maharashtra', 'Nashik', 19.9975, 73.7898, 'city', 'place', 82),
('Aurangabad', 'Maharashtra', 'Aurangabad', 19.8762, 75.3433, 'city', 'tourism', 83),
('Shirdi', 'Maharashtra', 'Ahmednagar', 19.7680, 74.4847, 'town', 'tourism', 88),
('Lonavala', 'Maharashtra', 'Pune', 18.6879, 73.3878, 'hill station', 'tourism', 84),
('Mahabaleshwar', 'Maharashtra', 'Satara', 17.9389, 73.6549, 'hill station', 'tourism', 85),
('Alibaug', 'Maharashtra', 'Raigad', 18.6414, 72.8722, 'beach', 'tourism', 80),
('Ratnagiri', 'Maharashtra', 'Ratnagiri', 16.9902, 73.3120, 'city', 'place', 78),

-- Delhi
('Delhi', 'Delhi', 'Delhi', 28.6139, 77.2090, 'city', 'place', 95),
('Delhi Airport', 'Delhi', 'Delhi', 28.5665, 77.1031, 'airport', 'transport', 92),
('New Delhi', 'Delhi', 'Delhi', 28.6139, 77.2090, 'city', 'place', 93),
('Connaught Place', 'Delhi', 'Delhi', 28.6313, 77.2189, 'commercial', 'place', 85),
('India Gate', 'Delhi', 'Delhi', 28.6107, 77.2300, 'monument', 'tourism', 90),
('Red Fort', 'Delhi', 'Delhi', 28.6562, 77.2410, 'fort', 'tourism', 89),
('Qutub Minar', 'Delhi', 'Delhi', 28.5244, 77.1855, 'monument', 'tourism', 88),

-- Rajasthan
('Jaipur', 'Rajasthan', 'Jaipur', 26.9124, 75.7873, 'city', 'place', 92),
('Jaipur Airport', 'Rajasthan', 'Jaipur', 26.8245, 75.8007, 'airport', 'transport', 88),
('Udaipur', 'Rajasthan', 'Udaipur', 24.5784, 73.6865, 'city', 'tourism', 90),
('Jodhpur', 'Rajasthan', 'Jodhpur', 26.2389, 73.0243, 'city', 'tourism', 88),
('Jaisalmer', 'Rajasthan', 'Jaisalmer', 26.9157, 70.9233, 'city', 'tourism', 87),
('Pushkar', 'Rajasthan', 'Ajmer', 26.4899, 74.5511, 'town', 'tourism', 85),
('Bikaner', 'Rajasthan', 'Bikaner', 28.0229, 73.3119, 'city', 'tourism', 82),
('Ajmer', 'Rajasthan', 'Ajmer', 26.4499, 74.6399, 'city', 'tourism', 83),
('Mount Abu', 'Rajasthan', 'Sirohi', 24.5925, 72.7156, 'hill station', 'tourism', 84),
('Ranthambore', 'Rajasthan', 'Sawai Madhopur', 25.9988, 76.4990, 'national park', 'tourism', 86),

-- Gujarat
('Ahmedabad', 'Gujarat', 'Ahmedabad', 23.0225, 72.5714, 'city', 'place', 90),
('Ahmedabad Airport', 'Gujarat', 'Ahmedabad', 23.0774, 72.6347, 'airport', 'transport', 88),
('Surat', 'Gujarat', 'Surat', 21.1702, 72.8311, 'city', 'place', 85),
('Vadodara', 'Gujarat', 'Vadodara', 22.3072, 73.1812, 'city', 'place', 82),
('Rajkot', 'Gujarat', 'Rajkot', 22.3039, 70.8022, 'city', 'place', 80),
('Dwarka', 'Gujarat', 'Devbhoomi Dwarka', 22.2369, 68.9678, 'city', 'tourism', 85),
('Somnath', 'Gujarat', 'Gir Somnath', 20.8883, 70.4014, 'town', 'tourism', 84),
('Kutch', 'Gujarat', 'Kutch', 23.8333, 69.6667, 'district', 'tourism', 82),
('Gir', 'Gujarat', 'Gir Somnath', 21.1333, 70.8000, 'national park', 'tourism', 86),

-- Uttar Pradesh
('Agra', 'Uttar Pradesh', 'Agra', 27.1767, 78.0081, 'city', 'tourism', 92),
('Taj Mahal', 'Uttar Pradesh', 'Agra', 27.1751, 78.0421, 'monument', 'tourism', 95),
('Agra Airport', 'Uttar Pradesh', 'Agra', 27.1558, 77.9679, 'airport', 'transport', 85),
('Fatehpur Sikri', 'Uttar Pradesh', 'Agra', 27.0952, 77.6639, 'historical', 'tourism', 88),
('Varanasi', 'Uttar Pradesh', 'Varanasi', 25.3176, 82.9739, 'city', 'tourism', 92),
('Lucknow', 'Uttar Pradesh', 'Lucknow', 26.8467, 80.9462, 'city', 'place', 88),
('Kanpur', 'Uttar Pradesh', 'Kanpur', 26.4499, 80.3319, 'city', 'place', 82),
('Allahabad', 'Uttar Pradesh', 'Allahabad', 25.4358, 81.8463, 'city', 'place', 83),
('Mathura', 'Uttar Pradesh', 'Mathura', 27.4924, 77.6737, 'city', 'tourism', 85),
('Vrindavan', 'Uttar Pradesh', 'Mathura', 27.5786, 77.6774, 'town', 'tourism', 84),

-- West Bengal
('Kolkata', 'West Bengal', 'Kolkata', 22.5726, 88.3639, 'city', 'place', 95),
('Kolkata Airport', 'West Bengal', 'Kolkata', 22.6589, 88.4476, 'airport', 'transport', 90),
('Darjeeling', 'West Bengal', 'Darjeeling', 27.0360, 88.2627, 'town', 'tourism', 91),
('Siliguri', 'West Bengal', 'Darjeeling', 26.7271, 88.3953, 'city', 'place', 82),
('Sundarbans', 'West Bengal', 'South 24 Parganas', 22.0000, 89.0000, 'national park', 'tourism', 86),
('Shantiniketan', 'West Bengal', 'Birbhum', 23.6850, 87.6422, 'town', 'tourism', 83),
('Digha', 'West Bengal', 'East Midnapore', 21.6294, 87.5199, 'beach', 'tourism', 80),

-- Bihar
('Patna', 'Bihar', 'Patna', 25.5941, 85.1376, 'city', 'place', 85),
('Bodh Gaya', 'Bihar', 'Gaya', 24.6957, 84.9927, 'town', 'tourism', 90),
('Nalanda', 'Bihar', 'Nalanda', 25.1333, 85.4167, 'historical', 'tourism', 85),
('Rajgir', 'Bihar', 'Nalanda', 25.0333, 85.4167, 'town', 'tourism', 82),

-- Madhya Pradesh
('Bhopal', 'Madhya Pradesh', 'Bhopal', 23.2599, 77.4126, 'city', 'place', 85),
('Indore', 'Madhya Pradesh', 'Indore', 22.7196, 75.8577, 'city', 'place', 83),
('Gwalior', 'Madhya Pradesh', 'Gwalior', 26.2124, 78.1773, 'city', 'tourism', 82),
('Khajuraho', 'Madhya Pradesh', 'Chhatarpur', 24.8519, 79.9188, 'historical', 'tourism', 88),
('Sanchi', 'Madhya Pradesh', 'Raisen', 23.4833, 77.7333, 'historical', 'tourism', 85),
('Pachmarhi', 'Madhya Pradesh', 'Hoshangabad', 22.4667, 78.4333, 'hill station', 'tourism', 82),
('Kanha', 'Madhya Pradesh', 'Mandla', 22.2814, 80.6344, 'national park', 'tourism', 86),
('Bandhavgarh', 'Madhya Pradesh', 'Umaria', 23.6471, 81.1761, 'national park', 'tourism', 85),

-- Punjab
('Amritsar', 'Punjab', 'Amritsar', 31.6340, 74.8723, 'city', 'tourism', 88),
('Golden Temple', 'Punjab', 'Amritsar', 31.6200, 74.8767, 'temple', 'tourism', 92),
('Amritsar Airport', 'Punjab', 'Amritsar', 31.7096, 74.7981, 'airport', 'transport', 85),
('Ludhiana', 'Punjab', 'Ludhiana', 30.9010, 75.8573, 'city', 'place', 80),
('Chandigarh', 'Punjab', 'Chandigarh', 30.7333, 76.7794, 'city', 'place', 87),

-- Himachal Pradesh
('Shimla', 'Himachal Pradesh', 'Shimla', 31.1048, 77.1734, 'city', 'tourism', 90),
('Manali', 'Himachal Pradesh', 'Kullu', 32.2397, 77.1887, 'town', 'tourism', 91),
('Dharamshala', 'Himachal Pradesh', 'Kangra', 32.2194, 76.3234, 'town', 'tourism', 88),
('McLeod Ganj', 'Himachal Pradesh', 'Kangra', 32.2432, 76.3178, 'town', 'tourism', 86),
('Kullu', 'Himachal Pradesh', 'Kullu', 31.9580, 77.1263, 'town', 'tourism', 84),
('Dalhousie', 'Himachal Pradesh', 'Chamba', 32.5333, 75.9667, 'hill station', 'tourism', 85),

-- Uttarakhand
('Dehradun', 'Uttarakhand', 'Dehradun', 30.3165, 78.0322, 'city', 'place', 85),
('Mussoorie', 'Uttarakhand', 'Dehradun', 30.4590, 78.0781, 'hill station', 'tourism', 86),
('Nainital', 'Uttarakhand', 'Nainital', 29.3839, 79.4531, 'hill station', 'tourism', 88),
('Rishikesh', 'Uttarakhand', 'Dehradun', 30.0869, 78.2676, 'town', 'tourism', 87),
('Haridwar', 'Uttarakhand', 'Haridwar', 29.9457, 78.1633, 'city', 'tourism', 85),
('Jim Corbett', 'Uttarakhand', 'Nainital', 29.5315, 78.7796, 'national park', 'tourism', 89),

-- Jammu & Kashmir
('Srinagar', 'Jammu & Kashmir', 'Srinagar', 34.0837, 74.7973, 'city', 'tourism', 88),
('Gulmarg', 'Jammu & Kashmir', 'Baramulla', 34.0837, 74.3837, 'hill station', 'tourism', 87),
('Pahalgam', 'Jammu & Kashmir', 'Anantnag', 34.0337, 75.3333, 'town', 'tourism', 85),
('Sonamarg', 'Jammu & Kashmir', 'Ganderbal', 34.3000, 75.3833, 'town', 'tourism', 84),
('Jammu', 'Jammu & Kashmir', 'Jammu', 32.7266, 74.8570, 'city', 'place', 83),

-- Ladakh
('Leh', 'Ladakh', 'Leh', 34.1526, 77.5771, 'city', 'tourism', 90),
('Kargil', 'Ladakh', 'Kargil', 34.3029, 76.4100, 'town', 'tourism', 82),
('Pangong Tso', 'Ladakh', 'Leh', 33.7333, 78.6167, 'lake', 'tourism', 88),
('Nubra Valley', 'Ladakh', 'Leh', 34.6667, 77.5833, 'valley', 'tourism', 86),

-- Odisha
('Bhubaneswar', 'Odisha', 'Khordha', 20.2961, 85.8245, 'city', 'place', 85),
('Puri', 'Odisha', 'Puri', 19.8145, 85.8312, 'city', 'tourism', 87),
('Konark', 'Odisha', 'Puri', 19.8835, 86.0945, 'historical', 'tourism', 86),
('Chilika Lake', 'Odisha', 'Khordha', 19.8667, 85.4167, 'lake', 'tourism', 84),

-- Assam
('Guwahati', 'Assam', 'Kamrup', 26.1445, 91.7362, 'city', 'place', 85),
('Kaziranga', 'Assam', 'Golaghat', 26.6667, 93.3333, 'national park', 'tourism', 90),
('Manas', 'Assam', 'Chirang', 26.6167, 90.9833, 'national park', 'tourism', 85),
('Majuli', 'Assam', 'Jorhat', 26.9500, 94.1667, 'island', 'tourism', 82),

-- Andhra Pradesh
('Hyderabad', 'Telangana', 'Hyderabad', 17.3850, 78.4867, 'city', 'place', 92),
('Hyderabad Airport', 'Telangana', 'Hyderabad', 17.2313, 78.4294, 'airport', 'transport', 90),
('Visakhapatnam', 'Andhra Pradesh', 'Visakhapatnam', 17.6868, 83.2185, 'city', 'place', 85),
('Vijayawada', 'Andhra Pradesh', 'Krishna', 16.5062, 80.6480, 'city', 'place', 82),
('Warangal', 'Telangana', 'Warangal', 17.9689, 79.5941, 'city', 'place', 78),

-- Chhattisgarh
('Raipur', 'Chhattisgarh', 'Raipur', 21.2514, 81.6296, 'city', 'place', 82),
('Jagdalpur', 'Chhattisgarh', 'Bastar', 19.0776, 82.0186, 'city', 'place', 78),

-- Jharkhand
('Ranchi', 'Jharkhand', 'Ranchi', 23.3441, 85.3096, 'city', 'place', 82),
('Jamshedpur', 'Jharkhand', 'East Singhbhum', 22.8046, 86.2022, 'city', 'place', 83),

-- North East
('Gangtok', 'Sikkim', 'East Sikkim', 27.3314, 88.6138, 'city', 'tourism', 86),
('Shillong', 'Meghalaya', 'East Khasi Hills', 25.5788, 91.8933, 'city', 'tourism', 84),
('Imphal', 'Manipur', 'Imphal East', 24.8170, 93.9368, 'city', 'place', 82),
('Aizawl', 'Mizoram', 'Aizawl', 23.7271, 92.7186, 'city', 'place', 80),
('Kohima', 'Nagaland', 'Kohima', 25.6701, 94.1078, 'city', 'place', 79),
('Agartala', 'Tripura', 'West Tripura', 23.8315, 91.2868, 'city', 'place', 78),
('Itanagar', 'Arunachal Pradesh', 'Papum Pare', 27.0844, 93.6053, 'city', 'place', 77),

-- Union Territories
('Port Blair', 'Andaman', 'South Andaman', 11.6234, 92.7325, 'city', 'place', 85),
('Puducherry', 'Puducherry', 'Puducherry', 11.9416, 79.8083, 'city', 'tourism', 84),
('Lakshadweep', 'Lakshadweep', 'Lakshadweep', 10.5726, 72.6417, 'island', 'tourism', 80),

-- Railway Stations (Major)
('Mumbai Central', 'Maharashtra', 'Mumbai', 19.0760, 72.8777, 'railway_station', 'transport', 85),
('Delhi Junction', 'Delhi', 'Delhi', 28.6418, 77.2203, 'railway_station', 'transport', 88),
('Howrah Junction', 'West Bengal', 'Kolkata', 22.5778, 88.3411, 'railway_station', 'transport', 87),
('Chennai Central', 'Tamil Nadu', 'Chennai', 13.0827, 80.2707, 'railway_station', 'transport', 86),
('Bangalore City', 'Karnataka', 'Bangalore', 12.9781, 77.5765, 'railway_station', 'transport', 84),
('Kannur Railway Station', 'Kerala', 'Kannur', 11.8745, 75.3704, 'railway_station', 'transport', 80),

-- Beaches
('Marina Beach', 'Tamil Nadu', 'Chennai', 13.0500, 80.2824, 'beach', 'tourism', 85),
('Juhu Beach', 'Maharashtra', 'Mumbai', 19.0945, 72.8260, 'beach', 'tourism', 82),
('Calangute Beach', 'Goa', 'North Goa', 15.5494, 73.7519, 'beach', 'tourism', 84),
('Baga Beach', 'Goa', 'North Goa', 15.5535, 73.7507, 'beach', 'tourism', 83),
('Marari Beach', 'Kerala', 'Alappuzha', 9.6115, 76.3763, 'beach', 'tourism', 82),

-- Temples and Religious Sites
('Tirupati Temple', 'Andhra Pradesh', 'Chittoor', 13.6838, 79.4192, 'temple', 'tourism', 92),
('Vaishno Devi', 'Jammu & Kashmir', 'Reasi', 33.0333, 74.9500, 'temple', 'tourism', 90),
('Somnath Temple', 'Gujarat', 'Gir Somnath', 20.8883, 70.4014, 'temple', 'tourism', 88),
('Golden Temple', 'Punjab', 'Amritsar', 31.6200, 74.8767, 'temple', 'tourism', 92),
('Brihadeeswarar Temple', 'Tamil Nadu', 'Thanjavur', 10.7833, 79.1333, 'temple', 'tourism', 87),
('Meenakshi Temple', 'Tamil Nadu', 'Madurai', 9.9192, 78.1193, 'temple', 'tourism', 89),

-- Hills and Mountains
('Mullayanagiri', 'Karnataka', 'Chikmagalur', 13.3797, 75.7134, 'peak', 'tourism', 82),
('Doddabetta', 'Tamil Nadu', 'Nilgiris', 11.4087, 76.6950, 'peak', 'tourism', 83),
('Anamudi', 'Kerala', 'Idukki', 10.1855, 77.0743, 'peak', 'tourism', 84),
('Kalsubai', 'Maharashtra', 'Ahmednagar', 19.5988, 73.7262, 'peak', 'tourism', 80),

-- Wildlife Sanctuaries
('Periyar', 'Kerala', 'Idukki', 9.5333, 77.1667, 'wildlife sanctuary', 'tourism', 86),
('Bandipur', 'Karnataka', 'Mysore', 11.9333, 76.6500, 'national park', 'tourism', 85),
('Mudumalai', 'Tamil Nadu', 'Nilgiris', 11.6000, 76.6000, 'national park', 'tourism', 84),
('Sariska', 'Rajasthan', 'Alwar', 27.3833, 76.4167, 'national park', 'tourism', 83),
('Ranthambore', 'Rajasthan', 'Sawai Madhopur', 25.9988, 76.4990, 'national park', 'tourism', 86);

-- Create table for Indian places
CREATE TABLE IF NOT EXISTS indian_places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  lat DECIMAL(10,8) NOT NULL,
  lon DECIMAL(11,8) NOT NULL,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  importance INT DEFAULT 50,
  INDEX idx_name (name),
  INDEX idx_state (state),
  INDEX idx_category (category),
  INDEX idx_importance (importance),
  FULLTEXT idx_search (name, state, district)
);
