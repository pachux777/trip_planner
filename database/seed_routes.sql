-- Routes between major Indian cities with distances
-- Distance in km, transport costs calculated as per mode

-- Metro City Connections
INSERT INTO routes (from_city_id, to_city_id, distance_km, base_fare, travel_time_hours) VALUES
-- Mumbai connections
(1, 2, 1407, 2500, 20),  -- Mumbai to Delhi
(1, 3, 984, 1800, 15),   -- Mumbai to Bangalore
(1, 4, 1338, 2200, 19),  -- Mumbai to Chennai
(1, 5, 1960, 3200, 28),  -- Mumbai to Kolkata
(1, 6, 709, 1200, 10),   -- Mumbai to Hyderabad
(1, 7, 148, 300, 3),     -- Mumbai to Pune
(1, 9, 1162, 2000, 17),  -- Mumbai to Jaipur
(1, 12, 583, 1000, 9),   -- Mumbai to Goa
(1, 42, 750, 1300, 12),  -- Mumbai to Ahmedabad
(1, 30, 450, 800, 7),    -- Mumbai to Nashik
(1, 17, 330, 600, 5);    -- Mumbai to Surat

-- Delhi connections
(2, 3, 2180, 3500, 30),  -- Delhi to Bangalore
(2, 4, 2209, 3600, 32),  -- Delhi to Chennai
(2, 5, 1472, 2400, 22),  -- Delhi to Kolkata
(2, 6, 1582, 2600, 24),  -- Delhi to Hyderabad
(2, 7, 1427, 2300, 21),  -- Delhi to Pune
(2, 9, 281, 500, 5),     -- Delhi to Jaipur
(2, 110, 233, 400, 4),   -- Delhi to Agra
(2, 117, 517, 900, 8),   -- Delhi to Chandigarh
(2, 86, 490, 800, 8),    -- Delhi to Shimla
(2, 87, 570, 950, 9),    -- Delhi to Manali
(2, 95, 520, 850, 8),    -- Delhi to Dehradun
(2, 99, 240, 400, 5),    -- Delhi to Haridwar
(2, 102, 580, 1000, 10), -- Delhi to Amritsar
(2, 43, 950, 1600, 14);  -- Delhi to Ahmedabad

-- Bangalore connections
(3, 4, 348, 600, 6),     -- Bangalore to Chennai
(3, 5, 1871, 3000, 27),  -- Bangalore to Kolkata
(3, 6, 576, 1000, 9),    -- Bangalore to Hyderabad
(3, 7, 841, 1400, 12),   -- Bangalore to Pune
(3, 12, 587, 1000, 9),   -- Bangalore to Goa
(3, 13, 275, 500, 5),    -- Bangalore to Kochi
(3, 14, 371, 650, 6),    -- Bangalore to Mangalore
(3, 58, 143, 250, 3),    -- Bangalore to Mysore
(3, 55, 445, 800, 7),    -- Bangalore to Coimbatore
(3, 53, 350, 600, 5);    -- Bangalore to Ooty

-- Chennai connections
(4, 5, 1666, 2700, 25),  -- Chennai to Kolkata
(4, 6, 627, 1100, 9),    -- Chennai to Hyderabad
(4, 7, 1195, 2000, 18),   -- Chennai to Pune
(4, 9, 2000, 3200, 30),   -- Chennai to Jaipur
(4, 12, 770, 1300, 12),   -- Chennai to Goa
(4, 13, 690, 1100, 11),   -- Chennai to Kochi
(4, 55, 500, 850, 7),     -- Chennai to Coimbatore
(4, 60, 560, 950, 8),     -- Chennai to Madurai
(4, 54, 320, 550, 5);     -- Chennai to Tirupati

-- Kolkata connections
(5, 6, 1489, 2400, 22),   -- Kolkata to Hyderabad
(5, 7, 2058, 3300, 32),   -- Kolkata to Pune
(5, 9, 1515, 2500, 24),   -- Kolkata to Jaipur
(5, 4, 1666, 2700, 25),   -- Kolkata to Chennai
(5, 45, 175, 300, 4),     -- Kolkata to Darjeeling
(5, 61, 520, 900, 8),      -- Kolkata to Bhubaneswar
(5, 119, 680, 1100, 10),   -- Kolkata to Guwahati
(5, 134, 450, 750, 7);     -- Kolkata to Puri

-- Hyderabad connections
(6, 7, 560, 950, 9),      -- Hyderabad to Pune
(6, 9, 1400, 2300, 21),   -- Hyderabad to Jaipur
(6, 4, 627, 1100, 9),      -- Hyderabad to Chennai
(6, 5, 1489, 2400, 22),    -- Hyderabad to Kolkata
(6, 2, 1582, 2600, 24),    -- Hyderabad to Delhi
(6, 3, 576, 1000, 9),      -- Hyderabad to Bangalore
(6, 12, 675, 1100, 11),    -- Hyderabad to Goa
(6, 72, 150, 250, 3),      -- Hyderabad to Warangal
(6, 54, 560, 950, 8);      -- Hyderabad to Tirupati

-- Pune connections
(7, 12, 450, 750, 8),      -- Pune to Goa
(7, 1, 148, 300, 3),       -- Pune to Mumbai
(7, 30, 190, 350, 3),      -- Pune to Nashik
(7, 31, 215, 380, 4),      -- Pune to Aurangabad
(7, 33, 75, 150, 2),       -- Pune to Lonavala
(7, 34, 120, 220, 3),      -- Pune to Mahabaleshwar
(7, 42, 660, 1100, 10),    -- Pune to Ahmedabad
(7, 2, 1427, 2300, 21),    -- Pune to Delhi
(7, 3, 841, 1400, 12),    -- Pune to Bangalore
(7, 4, 1195, 2000, 18),    -- Pune to Chennai
(7, 6, 560, 950, 9);       -- Pune to Hyderabad

-- Jaipur connections
(9, 2, 281, 500, 5),       -- Jaipur to Delhi
(9, 42, 675, 1100, 10),    -- Jaipur to Ahmedabad
(9, 1, 1162, 2000, 17),    -- Jaipur to Mumbai
(9, 43, 330, 550, 6),      -- Jaipur to Udaipur
(9, 44, 340, 580, 6),      -- Jaipur to Jodhpur
(9, 47, 145, 250, 3),      -- Jaipur to Pushkar
(9, 46, 556, 950, 9),      -- Jaipur to Bikaner
(9, 103, 150, 280, 3),     -- Jaipur to Alwar
(9, 110, 240, 420, 5),     -- Jaipur to Agra
(9, 116, 195, 350, 4);     -- Jaipur to Fatehpur Sikri

-- Goa connections
(12, 1, 583, 1000, 9),     -- Goa to Mumbai
(12, 3, 587, 1000, 9),     -- Goa to Bangalore
(12, 4, 770, 1300, 12),    -- Goa to Chennai
(12, 7, 450, 750, 8),      -- Goa to Pune
(12, 6, 675, 1100, 11),    -- Goa to Hyderabad
(12, 42, 1080, 1800, 16),  -- Goa to Ahmedabad
(12, 2, 1870, 3000, 30),   -- Goa to Delhi
(12, 9, 1610, 2600, 26),   -- Goa to Jaipur
(12, 15, 200, 350, 4);      -- Goa to Panaji

-- Kochi connections
(13, 3, 550, 900, 8),      -- Kochi to Bangalore
(13, 4, 690, 1100, 11),    -- Kochi to Chennai
(13, 14, 220, 380, 4),     -- Kochi to Mangalore
(13, 56, 130, 230, 3),     -- Kochi to Munnar
(13, 57, 53, 100, 1.5),    -- Kochi to Alleppey
(13, 64, 95, 170, 2),      -- Kochi to Kovalam
(13, 66, 280, 480, 5);     -- Kochi to Wayanad

-- Kerala routes
(56, 57, 100, 180, 2.5),   -- Munnar to Alleppey
(56, 13, 130, 230, 3),     -- Munnar to Kochi
(57, 64, 160, 280, 3),     -- Alleppey to Kovalam
(58, 59, 120, 220, 2.5),   -- Mysore to Ooty
(59, 53, 125, 220, 3),     -- Ooty to Coimbatore
(60, 61, 245, 420, 4),     -- Madurai to Rameswaram
(62, 60, 245, 420, 4),     -- Kanyakumari to Madurai
(62, 13, 300, 520, 5);     -- Kanyakumari to Kochi

-- Rajasthan routes
(43, 44, 250, 420, 4),     -- Udaipur to Jodhpur
(43, 46, 325, 550, 5.5),   -- Udaipur to Bikaner
(44, 45, 285, 480, 5),     -- Jodhpur to Jaisalmer
(44, 9, 340, 580, 6),      -- Jodhpur to Jaipur
(46, 47, 350, 600, 6),     -- Bikaner to Pushkar
(103, 9, 150, 280, 3),     -- Alwar to Jaipur
(103, 104, 120, 220, 2.5), -- Alwar to Bharatpur
(104, 110, 55, 100, 1),    -- Bharatpur to Agra

-- Himachal routes
(86, 87, 240, 400, 6),      -- Shimla to Manali
(86, 88, 240, 400, 6),      -- Shimla to Dharamshala
(86, 117, 120, 200, 3),     -- Shimla to Chandigarh
(87, 88, 220, 380, 5),      -- Manali to Dharamshala
(95, 96, 35, 70, 1),        -- Dehradun to Mussoorie
(95, 97, 275, 450, 6),      -- Dehradun to Nainital
(95, 98, 45, 80, 1.5),      -- Dehradun to Rishikesh
(98, 99, 20, 40, 0.5),      -- Rishikesh to Haridwar
(86, 95, 230, 400, 5);      -- Shimla to Dehradun

-- Uttarakhand routes
(100, 101, 180, 300, 4),    -- Kedarnath to Badrinath
(95, 100, 220, 380, 6),     -- Dehradun to Kedarnath
(98, 100, 210, 350, 6),     -- Rishikesh to Kedarnath
(110, 111, 580, 1000, 10),  -- Agra to Varanasi
(110, 117, 233, 400, 4),    -- Agra to Chandigarh
(110, 9, 240, 420, 5),      -- Agra to Jaipur
(110, 2, 233, 400, 4),      -- Agra to Delhi
(116, 110, 35, 60, 0.5);    -- Fatehpur Sikri to Agra

-- Varanasi and UP
(111, 112, 120, 200, 2),    -- Varanasi to Allahabad
(111, 113, 320, 550, 5),    -- Varanasi to Lucknow
(111, 117, 320, 550, 5.5),  -- Varanasi to Chandigarh
(114, 115, 75, 130, 1.5),   -- Kanpur to Lucknow
(112, 114, 120, 200, 2);    -- Allahabad to Kanpur

-- Punjab & Haryana
(102, 117, 240, 400, 4),    -- Amritsar to Chandigarh
(102, 95, 380, 650, 7),     -- Amritsar to Dehradun
(102, 86, 320, 550, 6),     -- Amritsar to Shimla
(117, 86, 120, 200, 3),     -- Chandigarh to Shimla
(117, 95, 90, 160, 2),      -- Chandigarh to Dehradun
(118, 117, 260, 450, 4.5),  -- Gurgaon to Chandigarh
(118, 2, 35, 60, 1);        -- Gurgaon to Delhi

-- North East
(119, 120, 100, 170, 2.5),  -- Guwahati to Shillong
(119, 121, 490, 850, 9),    -- Guwahati to Imphal
(119, 122, 450, 780, 8.5),  -- Guwahati to Aizawl
(119, 123, 350, 600, 7),    -- Guwahati to Kohima
(119, 124, 330, 570, 6.5),  -- Guwahati to Agartala
(125, 119, 420, 730, 8),    -- Itanagar to Guwahati
(126, 119, 120, 210, 3),    -- Gangtok to Guwahati
(126, 45, 125, 220, 3);     -- Gangtok to Darjeeling

-- Gujarat
(42, 43, 330, 550, 6),      -- Ahmedabad to Udaipur
(42, 48, 355, 600, 6),      -- Ahmedabad to Mount Abu
(42, 50, 90, 150, 1.5),     -- Ahmedabad to Gandhinagar
(42, 51, 400, 680, 7),       -- Ahmedabad to Dwarka
(42, 52, 430, 750, 7.5),     -- Ahmedabad to Somnath
(49, 42, 100, 170, 2),       -- Surat to Ahmedabad
(49, 1, 280, 480, 5),        -- Surat to Mumbai
(42, 9, 675, 1100, 10);      -- Ahmedabad to Jaipur

-- Madhya Pradesh
(16, 17, 190, 320, 3.5),    -- Bhopal to Indore
(16, 67, 185, 320, 3.5),    -- Bhopal to Gwalior
(16, 68, 375, 650, 6.5),    -- Bhopal to Khajuraho
(16, 70, 195, 340, 4),      -- Bhopal to Pachmarhi
(67, 110, 120, 200, 2.5),   -- Gwalior to Agra
(67, 2, 320, 550, 5),        -- Gwalior to Delhi
(69, 16, 200, 350, 4),       -- Ujjain to Bhopal
(72, 74, 180, 310, 3.5);     -- Kanha to Bandhavgarh

-- Odisha & Chhattisgarh
(61, 75, 170, 290, 3.5),    -- Bhubaneswar to Puri
(61, 76, 65, 110, 1.5),     -- Bhubaneswar to Konark
(61, 134, 65, 110, 1.5),    -- Bhubaneswar to Chilika
(16, 77, 550, 950, 9),      -- Bhopal to Raipur
(78, 77, 290, 500, 5.5);    -- Jagdalpur to Raipur

-- West Bengal & Bihar
(45, 130, 75, 130, 1.5),    -- Darjeeling to Siliguri
(45, 126, 125, 220, 3),     -- Darjeeling to Gangtok
(79, 80, 80, 140, 1.5),     -- Bodh Gaya to Rajgir
(79, 81, 95, 160, 2),       -- Bodh Gaya to Nalanda
(80, 5, 450, 750, 7),        -- Rajgir to Kolkata
(111, 79, 250, 430, 4.5);   -- Varanasi to Bodh Gaya

-- Andaman & Lakshadweep
(127, 4, 1360, 5000, 2),    -- Port Blair to Chennai (flight)
(127, 3, 1600, 5500, 2.5),  -- Port Blair to Bangalore (flight)
(127, 2, 2500, 7000, 3.5),  -- Port Blair to Delhi (flight)
(135, 13, 400, 1500, 1.5),  -- Lakshadweep to Kochi (flight)

-- Wildlife routes
(136, 2, 260, 450, 6),      -- Jim Corbett to Delhi
(136, 95, 180, 310, 4),     -- Jim Corbett to Dehradun
(137, 9, 160, 280, 3),      -- Ranthambore to Jaipur
(137, 110, 260, 450, 4.5),  -- Ranthambore to Agra
(138, 119, 100, 180, 2.5),  -- Kaziranga to Guwahati
(139, 13, 110, 190, 2.5),   -- Periyar to Kochi
(140, 5, 110, 190, 2.5),    -- Sundarbans to Kolkata
(141, 42, 400, 680, 7),     -- Gir to Ahmedabad
(142, 1, 920, 1500, 15),    -- Tadoba to Mumbai
(143, 3, 220, 380, 4.5);    -- Nagarhole to Bangalore

-- Additional routes for better connectivity
(53, 55, 90, 160, 2),       -- Coimbatore to Ooty
(60, 64, 245, 420, 4),       -- Madurai to Kanyakumari
(89, 90, 140, 240, 3),       -- Matheran to Mumbai
(30, 31, 170, 290, 3),       -- Nashik to Aurangabad
(33, 34, 50, 90, 1),         -- Lonavala to Mahabaleshwar
(34, 89, 250, 430, 4.5),     -- Mahabaleshwar to Matheran
(15, 33, 420, 720, 7),       -- Panaji to Lonavala
(44, 137, 450, 780, 8.5),    -- Jodhpur to Ranthambore
(43, 137, 330, 570, 6.5),    -- Udaipur to Ranthambore
(103, 137, 110, 190, 2.5),   -- Alwar to Ranthambore
(110, 137, 260, 450, 4.5);   -- Agra to Ranthambore
