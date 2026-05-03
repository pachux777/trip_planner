import React, { useState } from 'react';
import { X, MapPin, Star, Calendar, DollarSign, Navigation, Camera, Compass, TrendingUp, Award, Shield, Zap, Search, Filter, ChevronDown, ChevronUp, Eye, Heart, Share2, Clock, Users, Hotel, Utensils } from 'lucide-react';
import './TripPlaces.css';

const TripPlaces = ({ onClose }) => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStates, setExpandedStates] = useState({});

  // Comprehensive database of all places from Kerala to Kashmir
  const allIndianPlaces = {
    // SOUTH INDIA
    'Kerala': {
      state: 'Kerala',
      region: 'South India',
      capital: 'Thiruvananthapuram',
      districts: [
        {
          name: 'Thiruvananthapuram',
          places: ['Kovalam Beach', 'Varkala Beach', 'Padmanabhaswamy Temple', 'Kowdiar Palace', 'Shanghumukham Beach', 'Napier Museum', 'Veli Tourist Village', 'Ponmudi Hills']
        },
        {
          name: 'Ernakulam',
          places: ['Fort Kochi', 'Marine Drive', 'Chinese Fishing Nets', 'Mattancherry Palace', 'Jew Town', 'Bolgatty Palace', 'Hill Palace', 'Wonderla']
        },
        {
          name: 'Idukki',
          places: ['Munnar', 'Thekkady', 'Idukki Dam', 'Periyar Wildlife Sanctuary', 'Mattupetty Dam', 'Echo Point', 'Top Station', 'Chinnar Wildlife Sanctuary']
        },
        {
          name: 'Alappuzha',
          places: ['Alappuzha Beach', 'Backwaters', 'Houseboat Cruises', 'Marari Beach', 'Ambalappuzha Temple', 'Krishnapuram Palace', 'Pathiramanal Island', 'Kumarakom']
        },
        {
          name: 'Kozhikode',
          places: ['Kozhikode Beach', 'Mananchira Square', 'Kappad Beach', 'Thusharagiri Waterfalls', 'Beypore Beach', 'Sarovaram Bio Park', 'Kadalundi Bird Sanctuary', 'Veliyangadi']
        },
        {
          name: 'Thrissur',
          places: ['Guruvayur Temple', 'Thrissur Zoo', 'Athirappilly Waterfalls', 'Punnathur Kotta', 'Vadakkunnathan Temple', 'Snehatheeram Beach', 'Peechi Dam', 'Chavakkad Beach']
        },
        {
          name: 'Kannur',
          places: ['Muzhappilangad Beach', 'St. Angelo Fort', 'Payyambalam Beach', 'Parassinikadavu Temple', 'Kannur Fort', 'Madayi Mosque', 'Ezhimala Beach', 'Palakkayam Thattu']
        },
        {
          name: 'Wayanad',
          places: ['Wayanad Wildlife Sanctuary', 'Chembra Peak', 'Edakkal Caves', 'Pookode Lake', 'Soochipara Waterfalls', 'Banasura Sagar Dam', 'Thirunelli Temple', 'Kuruva Island']
        }
      ]
    },
    'Tamil Nadu': {
      state: 'Tamil Nadu',
      region: 'South India',
      capital: 'Chennai',
      districts: [
        {
          name: 'Chennai',
          places: ['Marina Beach', 'Fort St. George', 'San Thome Basilica', 'Kapaleeshwarar Temple', 'Valluvar Kottam', 'Guindy National Park', 'Elliot\'s Beach', 'MGR Memorial']
        },
        {
          name: 'Coimbatore',
          places: ['Marudamalai Temple', 'Perur Temple', 'Velliangiri Hills', 'Siruvani Waterfalls', 'Anamalai Wildlife Sanctuary', 'Black Thunder', 'Kovai Kondattam', 'CODISSIA']
        },
        {
          name: 'Madurai',
          places: ['Meenakshi Temple', 'Thirumalai Nayak Palace', 'Alagar Koil', 'Koodal Azhagar Temple', 'Vandiyur Mariamman Temple', 'Thiruparankundram', 'Pazhamudir Solai', 'Samanar Hills']
        },
        {
          name: 'Ooty (Nilgiris)',
          places: ['Botanical Garden', 'Ooty Lake', 'Doddabetta Peak', 'Rose Garden', 'Pykara Falls', 'Coonoor', 'Ketti Valley', 'Tea Museum']
        },
        {
          name: 'Kanyakumari',
          places: ['Vivekananda Rock Memorial', 'Kanyakumari Beach', 'Thiruvalluvar Statue', 'Gandhi Memorial', 'Suchindram Temple', 'Padmanabhapuram Palace', 'Vattakottai Fort', 'Mathoor Hanging Bridge']
        },
        {
          name: 'Rameswaram',
          places: ['Ramanathaswamy Temple', 'Agni Teertham', 'Dhanushkodi', 'Pamban Bridge', 'Gandhamadana Parvatham', 'Satchi Hanuman Temple', 'Kothandaramaswamy Temple', 'Jatayu Tirtham']
        },
        {
          name: 'Kanchipuram',
          places: ['Kanchi Kamakshi Temple', 'Ekambareswarar Temple', 'Varadharaja Perumal Temple', 'Kailasanathar Temple', 'Sri Adhikesava Perumal Temple', 'Kanchipuram Silk Sarees', 'Ulagalanda Perumal Temple', 'Vedanthangal Bird Sanctuary']
        },
        {
          name: 'Thanjavur',
          places: ['Brihadeeswarar Temple', 'Thanjavur Palace', 'Saraswathi Mahal Library', 'Siva Ganga Garden', 'Alangudi Temple', 'Swamimalai', 'Gangaikonda Cholapuram', 'Darasuram Airavatesvara Temple']
        }
      ]
    },
    'Karnataka': {
      state: 'Karnataka',
      region: 'South India',
      capital: 'Bangalore',
      districts: [
        {
          name: 'Bangalore',
          places: ['Lalbagh', 'Cubbon Park', 'Bangalore Palace', 'ISKCON Temple', 'Vidhana Soudha', 'Ulsoor Lake', 'Nandi Hills', 'Wonderla']
        },
        {
          name: 'Mysore',
          places: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Jaganmohan Palace', 'Lalitha Mahal', 'Mysore Zoo', 'St. Philomena\'s Church', 'Karanji Lake']
        },
        {
          name: 'Hampi (Bellary)',
          places: ['Virupaksha Temple', 'Vittala Temple', 'Stone Chariot', 'Lotus Mahal', 'Elephant Stables', 'Hazara Rama Temple', 'Queen\'s Bath', 'Tungabhadra Dam']
        },
        {
          name: 'Coorg (Kodagu)',
          places: ['Abbey Falls', 'Raja\'s Seat', 'Talakaveri', 'Dubare Elephant Camp', 'Nisargadhama', 'Iruppu Falls', 'Golden Temple', 'Mandalpatti']
        },
        {
          name: 'Gokarna',
          places: ['Om Beach', 'Kudle Beach', 'Half Moon Beach', 'Paradise Beach', 'Mahabaleshwar Temple', 'Gokarna Beach', 'Mirjan Fort', 'Yana Rocks']
        },
        {
          name: 'Chikmagalur',
          places: ['Mullayanagiri Peak', 'Baba Budangiri', 'Hebbe Falls', 'Kemmangundi', 'Horticulture Garden', 'Coffee Museum', 'Bhadra Wildlife Sanctuary', 'Kalhatti Falls']
        },
        {
          name: 'Udupi',
          places: ['Sri Krishna Temple', 'Malpe Beach', 'St. Mary\'s Island', 'Manipal', 'Kaup Beach', 'Udupi Beach', 'Anegudde Vinayaka Temple', 'Karkala']
        },
        {
          name: 'Hassan',
          places: ['Belur Temple', 'Halebidu Temple', 'Shravanabelagola', 'Gorur Dam', 'Shettihalli Church', 'Bisle Ghat', 'Yagachi Dam', 'Chennakesava Temple']
        }
      ]
    },
    'Andhra Pradesh': {
      state: 'Andhra Pradesh',
      region: 'South India',
      capital: 'Amaravati',
      districts: [
        {
          name: 'Visakhapatnam',
          places: ['RK Beach', 'Rushikonda Beach', 'Bheemunipatnam Beach', 'Kailasagiri Hill Park', 'Submarine Museum', 'Dolphin\'s Nose', 'Simhachalam Temple', 'Araku Valley']
        },
        {
          name: 'Tirupati',
          places: ['Tirumala Temple', 'Sri Venkateswara', 'Alamelu Mangapuram', 'Sri Kalahasti', 'Kanipakam', 'Srinivasa Mangapuram', 'Chandragiri Fort', 'Talakona Waterfalls']
        },
        {
          name: 'Vijayawada',
          places: ['Kanaka Durga Temple', 'Prakasam Barrage', 'Bhavani Island', 'Undavalli Caves', 'Mangalagiri', 'Kondapalli Fort', 'Victoria Museum', 'Gandhi Hill']
        },
        {
          name: 'Amaravati',
          places: ['Amaravati Buddhist Site', 'Amareswara Temple', 'Dhyana Buddha Statue', 'Mahachaitya', 'Archaeological Museum', 'Ponduru', 'Pattabhiraju Temple', 'Somalingeswara Temple']
        },
        {
          name: 'Warangal',
          places: ['Warangal Fort', 'Thousand Pillar Temple', 'Bhadrakali Temple', 'Kakatiya Rock Garden', 'Ramappa Temple', 'Pakhal Lake', 'Eturnagaram Wildlife Sanctuary', 'Medaram']
        },
        {
          name: 'Nellore',
          places: ['Nelapattu Bird Sanctuary', 'Pulicat Lake', 'Mypadu Beach', 'Krishna Patnam', 'Udayagiri Fort', 'Ranganatha Temple', 'Somashila', 'Kandaleru Dam']
        },
        {
          name: 'Kurnool',
          places: ['Srisailam', 'Mahanandi', 'Ahobilam', 'Belum Caves', 'Orvakal Rock Garden', 'Rollapadu Wildlife Sanctuary', 'Yaganti', 'Nallamala Forest']
        },
        {
          name: 'Anantapur',
          places: ['Lepakshi Temple', 'Puttaparthi', 'Hampi', 'Anantapur Fort', 'Thimmamma Marrimanu', 'Penna Ahobilam', 'Gooty Fort', 'Rayadurg Fort']
        }
      ]
    },
    'Telangana': {
      state: 'Telangana',
      region: 'South India',
      capital: 'Hyderabad',
      districts: [
        {
          name: 'Hyderabad',
          places: ['Charminar', 'Golconda Fort', 'Hussain Sagar Lake', 'Salar Jung Museum', 'Qutb Shahi Tombs', 'Chowmahalla Palace', 'Ramoji Film City', 'Birla Mandir']
        },
        {
          name: 'Warangal',
          places: ['Warangal Fort', 'Thousand Pillar Temple', 'Bhadrakali Temple', 'Kakatiya Rock Garden', 'Ramappa Temple', 'Pakhal Lake', 'Eturnagaram Wildlife Sanctuary', 'Medaram']
        },
        {
          name: 'Karimnagar',
          places: ['Elgandal Fort', 'Kaleshwaram Temple', 'Vemulawada Temple', 'Sri Raja Rajeshwara Temple', 'Ujjwala Park', 'Lower Manair Dam', 'Jagtial Fort', 'Dharmapuri']
        },
        {
          name: 'Nizamabad',
          places: ['Nizamabad Fort', 'Pochampadu', 'Alisagar Reservoir', 'Sri Rama Temple', 'Kanteshwar Temple', 'Mallareddy Gardens', 'Basar Saraswati Temple', 'Nizam Sagar Dam']
        },
        {
          name: 'Khammam',
          places: ['Khammam Fort', 'Kusumanchi Temple', 'Nelakondapalli', 'Palair Reservoir', 'Bhadrachalam', 'Parnasala', 'Kinnerasani Wildlife Sanctuary', 'Perantalapalli']
        },
        {
          name: 'Mahabubnagar',
          places: ['Gadwal Fort', 'Pillalamarri', 'Koilsagar Dam', 'Gurukul Ghat', 'Srisailam', 'Mallela Theertham', 'Jurala Dam', 'Mahabubnagar Fort']
        }
      ]
    },
    'Goa': {
      state: 'Goa',
      region: 'West India',
      capital: 'Panaji',
      districts: [
        {
          name: 'North Goa',
          places: ['Baga Beach', 'Calangute Beach', 'Anjuna Beach', 'Vagator Beach', 'Aguada Fort', 'Chapora Fort', 'Dudhsagar Falls', 'Old Goa Churches']
        },
        {
          name: 'South Goa',
          places: ['Palolem Beach', 'Colva Beach', 'Benaulim Beach', 'Mobor Beach', 'Cavelossim Beach', 'Cabo de Rama Fort', 'Shri Shantadurga Temple', 'Margao']
        }
      ]
    },

    // WEST INDIA
    'Maharashtra': {
      state: 'Maharashtra',
      region: 'West India',
      capital: 'Mumbai',
      districts: [
        {
          name: 'Mumbai',
          places: ['Gateway of India', 'Marine Drive', 'Juhu Beach', 'Elephanta Caves', 'Siddhivinayak Temple', 'Haji Ali Dargah', 'Bandra-Worli Sea Link', 'Chhatrapati Shivaji Terminus']
        },
        {
          name: 'Pune',
          places: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Pataleshwar Cave', 'Raja Dinkar Kelkar Museum', 'Saras Baug', 'Parvati Hill', 'Katraj Snake Park']
        },
        {
          name: 'Nagpur',
          places: ['Deekshabhoomi', 'Tekdi Ganesh Temple', 'Futala Lake', 'Raman Science Centre', 'Maharaj Bagh', 'Sitabuldi Fort', 'Dragon Palace Temple', 'Seminary Hill']
        },
        {
          name: 'Nashik',
          places: ['Trimbakeshwar Temple', 'Saptashrungi', 'Sula Vineyards', 'Pandavleni Caves', 'Kalaram Temple', 'Someshwar Waterfalls', 'Dudhsagar Falls', 'Anjaneri Hills']
        },
        {
          name: 'Aurangabad',
          places: ['Ajanta Caves', 'Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort', 'Grishneshwar Temple', 'Aurangabad Caves', 'Panchakki', 'Siddharth Garden']
        },
        {
          name: 'Kolhapur',
          places: ['Mahalakshmi Temple', 'Jyotiba Temple', 'Rankala Lake', 'Panhala Fort', 'New Palace Museum', 'Kopeshwar Temple', 'Dajipur Wildlife Sanctuary', 'Gaganbawada']
        },
        {
          name: 'Satara',
          places: ['Kaas Plateau', 'Thoseghar Waterfalls', 'Sajjangad Fort', 'Ajinkyatara Fort', 'Mahabaleshwar', 'Panchgani', 'Wai', 'Koyna Wildlife Sanctuary']
        },
        {
          name: 'Raigad',
          places: ['Raigad Fort', 'Murud-Janjira Fort', 'Alibag Beach', 'Kashid Beach', 'Karnala Fort', 'Elephanta Island', 'Matheran', 'Pen']
        }
      ]
    },
    'Gujarat': {
      state: 'Gujarat',
      region: 'West India',
      capital: 'Gandhinagar',
      districts: [
        {
          name: 'Ahmedabad',
          places: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Kankaria Lake', 'Sidi Saiyyed Mosque', 'Bhadra Fort', 'Jama Masjid', 'Calico Museum', 'Science City']
        },
        {
          name: 'Gandhinagar',
          places: ['Akshardham Temple', 'Indroda Nature Park', 'Sarita Udyan', 'Capital Complex', 'Children\'s Park', 'Punit Van', 'Dandi Kutir', 'Sector 17 Garden']
        },
        {
          name: 'Surat',
          places: ['Dumas Beach', 'Dutch Garden', 'Sarthana Nature Park', 'ISKCON Temple', 'Gopipura', 'Chintamani Jain Temple', 'Surat Castle', 'Bardoli']
        },
        {
          name: 'Vadodara',
          places: ['Laxmi Vilas Palace', 'Sayaji Baug', 'Champaner-Pavagadh', 'EME Temple', 'Sardar Baug', 'Kirti Mandir', 'Ajwa Garden', 'Waghodiya']
        },
        {
          name: 'Rajkot',
          places: ['Watson Museum', 'Aji Dam', 'Kaba Gandhi No Delo', 'Rotary Dolls Museum', 'Lang Library', 'Jubilee Garden', 'Rashtriya Shala', 'Ishwariya Temple']
        },
        {
          name: 'Kutch',
          places: ['White Desert', 'Kutch Museum', 'Aina Mahal', 'Prag Mahal', 'Dholavira', 'Mata no Madh', 'Narayan Sarovar', 'Banni Grasslands']
        },
        {
          name: 'Junagadh',
          places: ['Girnar Hills', 'Uparkot Fort', 'Mahabat Maqbara', 'Sakkarbaug Zoo', 'Damodar Kund', 'Junagadh Museum', 'Ashok Shilalekh', 'Girnar Wildlife Sanctuary']
        },
        {
          name: 'Bhavnagar',
          places: ['Takhteshwar Temple', 'Gaurishankar Lake', 'Barton Museum', 'Victoria Park', 'Alang Ship Breaking Yard', 'Gandhi Smriti', 'Gangajalia', 'Piram Island']
        }
      ]
    },
    'Madhya Pradesh': {
      state: 'Madhya Pradesh',
      region: 'Central India',
      capital: 'Bhopal',
      districts: [
        {
          name: 'Bhopal',
          places: ['Upper Lake', 'Lower Lake', 'Van Vihar National Park', 'Bhimbetka Caves', 'Sanchi Stupa', 'Taj-ul-Masajid', 'Gohar Mahal', 'Shaukat Mahal']
        },
        {
          name: 'Indore',
          places: ['Rajwada Palace', 'Lal Bagh Palace', 'Kanch Mandir', 'Sarafa Bazaar', 'Chhatri Bagh', 'Gandhi Hall', 'Indore Museum', 'Khajrana Ganesh Temple']
        },
        {
          name: 'Gwalior',
          places: ['Gwalior Fort', 'Jai Vilas Palace', 'Tomb of Tansen', 'Sun Temple', 'Gurudwara Data Bandi Chhor', 'Phool Bagh', 'Kampoo', 'Sas-Bahu Temple']
        },
        {
          name: 'Khajuraho',
          places: ['Western Group Temples', 'Eastern Group Temples', 'Southern Group Temples', 'Lakshmana Temple', 'Kandariya Mahadeva Temple', 'Devi Jagadambi Temple', 'Chitragupta Temple', 'Archaeological Museum']
        },
        {
          name: 'Jabalpur',
          places: ['Marble Rocks', 'Dhuandhar Falls', 'Bhedaghat', 'Madan Mahal Fort', 'Rani Durgavati Museum', 'Balancing Rock', 'Kachnar City', 'Tripur Sundari Temple']
        },
        {
          name: 'Ujjain',
          places: ['Mahakaleshwar Temple', 'Kal Bhairav Temple', 'Ram Ghat', 'Kaliadeh Palace', 'Vikram Kirti Mandir', 'Bhartrihari Caves', 'Chintaman Ganesh Temple', 'Harsiddhi Temple']
        },
        {
          name: 'Sanchi',
          places: ['Sanchi Stupa', 'Ashoka Pillar', 'Buddhist Monuments', 'Udayagiri Caves', 'Gyraspur', 'Sonari', 'Satdhara', 'Andher']
        },
        {
          name: 'Pachmarhi',
          places: ['Pachmarhi Hill Station', 'Bee Falls', 'Jata Shankar Caves', 'Dhupgarh', 'Pandav Caves', 'Chauragarh', 'Handi Khoh', 'Mahadeo Hills']
        }
      ]
    },
    'Chhattisgarh': {
      state: 'Chhattisgarh',
      region: 'Central India',
      capital: 'Raipur',
      districts: [
        {
          name: 'Raipur',
          places: ['Purkhouti Muktangan', 'Naya Raipur', 'Mahant Ghasidas Memorial Museum', 'Gandhi Udyan Park', 'Dudhadhari Math', 'Shri Jagannath Temple', 'Budhapara Lake', 'MMR Fun City']
        },
        {
          name: 'Bastar',
          places: ['Chitrakote Falls', 'Tirathgarh Falls', 'Kutumsar Caves', 'Kailash Caves', 'Anthropological Museum', 'Bastar Palace', 'Danteshwari Temple', 'Jagdalpur']
        },
        {
          name: 'Bhilai',
          places: ['Maitri Bagh', 'Civic Centre', 'Jain Temple', 'Ujjawal Park', 'Dhamtari', 'Sitanadi Wildlife Sanctuary', 'Kharkhara Dam', 'Balod']
        },
        {
          name: 'Bilaspur',
          places: ['Kanan Pendari Zoo', 'Kalyanpur', 'Malhar', 'Ratanpur', 'Amarkantak', 'Kawardha Palace', 'Champa', 'Sarangarh']
        }
      ]
    },
    'Odisha': {
      state: 'Odisha',
      region: 'East India',
      capital: 'Bhubaneswar',
      districts: [
        {
          name: 'Bhubaneswar',
          places: ['Lingaraj Temple', 'Mukteswara Temple', 'Rajarani Temple', 'Konark Sun Temple', 'Udayagiri Caves', 'Khandagiri Caves', 'Nandankanan Zoo', 'Dhauli Shanti Stupa']
        },
        {
          name: 'Puri',
          places: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple', 'Chilika Lake', 'Raghurajpur', 'Sakshi Gopal', 'Alarnath Temple', 'Gundicha Temple']
        },
        {
          name: 'Cuttack',
          places: ['Barabati Fort', 'Netaji Birth Place', 'Dhabaleswar Temple', 'Kataka Chandi Temple', 'Maritime Museum', 'Madhavachandra Temple', 'Ansupa Lake', 'Chandikhol']
        },
        {
          name: 'Rourkela',
          places: ['Hanuman Vatika', 'Vedavyas Temple', 'Mandira Dam', 'Khandadhar Waterfalls', 'Darjeeng', 'Deodhar', 'Jogikuda', 'Rourkela Steel Plant']
        },
        {
          name: 'Sambalpur',
          places: ['Hirakud Dam', 'Samaleswari Temple', 'Leaning Temple', 'Ushakothi Wildlife Sanctuary', 'Debrigarh Wildlife Sanctuary', 'Cattle Island', 'Ghanteshwari Temple', 'Kalki Temple']
        },
        {
          name: 'Berhampur',
          places: ['Gopalpur Beach', 'Tara Tarini Temple', 'Chilika Lake', 'Aryapalli Beach', 'Mahendragiri', 'Taptapani Hot Springs', 'Daringbadi', 'Brahmapur']
        }
      ]
    },

    // EAST INDIA
    'West Bengal': {
      state: 'West Bengal',
      region: 'East India',
      capital: 'Kolkata',
      districts: [
        {
          name: 'Kolkata',
          places: ['Victoria Memorial', 'Howrah Bridge', 'Indian Museum', 'Kalighat Temple', 'Dakshineswar Temple', 'Belur Math', 'Park Street', 'Marble Palace']
        },
        {
          name: 'Darjeeling',
          places: ['Tiger Hill', 'Batasia Loop', 'Darjeeling Himalayan Railway', 'Padmaja Naidu Zoo', 'Japanese Peace Pagoda', 'Rock Garden', 'Ghum Monastery', 'Happy Valley Tea Estate']
        },
        {
          name: 'Murshidabad',
          places: ['Hazarduari Palace', 'Katra Mosque', 'Nashipur Palace', 'Motijhil', 'Karnasubarna', 'Jahangirnagar', 'Kashipur', 'Berhampore']
        },
        {
          name: 'Siliguri',
          places: ['Savin Kingdom', 'ISKCON Temple', 'Sevoke Kali Temple', 'Mahananda Wildlife Sanctuary', 'Surya Sen Park', 'Coronation Bridge', 'Chilapata Forest', 'Gajoldoba']
        },
        {
          name: 'Digha',
          places: ['Digha Beach', 'Shankarpur Beach', 'Mandarmani Beach', 'New Digha', 'Old Digha', 'Tajpur Beach', 'Udaipur Beach', 'Junput']
        },
        {
          name: 'Sundarbans',
          places: ['Sundarbans National Park', 'Sajnekhali Watch Tower', 'Sudhanyakhali Watch Tower', 'Netidhopani Watch Tower', 'Halliday Island', 'Lothian Island', 'Gosaba', 'Bonnie Camp']
        },
        {
          name: 'Bishnupur',
          places: ['Rasmancha', 'Jor Bangla Temple', 'Madanmohan Temple', 'Lalbandh', 'Dalmadal Cannon', 'Pathar Darwaja', 'Susunia Hills', 'Joyrambati']
        },
        {
          name: 'Shantiniketan',
          places: ['Visva Bharati University', 'Shantiniketan Ashram', 'Kala Bhavana', 'Sriniketan', 'Amar Kutir', 'Khoai', 'Sonajhuri', 'Ballabhpur Wildlife Sanctuary']
        }
      ]
    },
    'Jharkhand': {
      state: 'Jharkhand',
      region: 'East India',
      capital: 'Ranchi',
      districts: [
        {
          name: 'Ranchi',
          places: ['Tagore Hill', 'Rock Garden', 'Pahari Mandir', 'Birsa Zoological Park', 'Ranchi Lake', 'Dassam Falls', 'Hundru Falls', 'Jonha Falls']
        },
        {
          name: 'Jamshedpur',
          places: ['Jubilee Park', 'Dimna Lake', 'Jubilee Lake', 'Jadugora', 'Dalma Wildlife Sanctuary', 'Sir Dorabji Tata Park', 'Tata Steel Zoological Park', 'Bhootnath Temple']
        },
        {
          name: 'Deoghar',
          places: ['Baba Baidyanath Temple', 'Naulakha Mandir', 'Tapovan', 'Nandan Pahar', 'Basukinath Temple', 'Satsang Ashram', 'Trikuta Pahar', 'Shivgadi']
        },
        {
          name: 'Hazaribagh',
          places: ['Hazaribagh National Park', 'Canary Hill', 'Barsoi', 'Satpahar', 'Tilaiya Dam', 'Konar Dam', 'Urwan', 'Barkattha']
        }
      ]
    },
    'Bihar': {
      state: 'Bihar',
      region: 'East India',
      capital: 'Patna',
      districts: [
        {
          name: 'Patna',
          places: ['Golghar', 'Patna Museum', 'Mahavir Mandir', 'Takht Sri Patna Sahib', 'Sanjay Gandhi Biological Park', 'Kumhrar', 'Agam Kuan', 'Padri Ki Haveli']
        },
        {
          name: 'Bodh Gaya',
          places: ['Mahabodhi Temple', 'Bodhi Tree', 'Great Buddha Statue', 'Thai Monastery', 'Japanese Temple', 'Chinese Temple', 'Bhutanese Monastery', 'Sujata Temple']
        },
        {
          name: 'Nalanda',
          places: ['Nalanda University Ruins', 'Nalanda Archaeological Museum', 'Hiuen Tsang Memorial Hall', 'Bargaon', 'Silao', 'Rajgir', 'Pavapuri', 'Bihar Sharif']
        },
        {
          name: 'Vaishali',
          places: ['Ashokan Pillar', 'Buddha Stupa', 'Anand Stupa', 'Raja Vishal Ka Garh', 'Kundalpur', 'Bawan Pokhar', 'Ramchaura Temple', 'Vaishali Museum']
        },
        {
          name: 'Munger',
          places: ['Munger Fort', 'Kali Pahari', 'Sita Kund', 'Ucheswar', 'Bhimbandh Wildlife Sanctuary', 'Kastaharni Ghat', 'Pirpahar', 'Shri Krishna Vatika']
        },
        {
          name: 'Gaya',
          places: ['Vishnupad Temple', 'Mangla Gauri Temple', 'Dungeshwari Cave Temples', 'Barabar Caves', 'Nagarjuni Caves', 'Thai Temple', 'Ramshila Hill', 'Brahmayoni Hill']
        }
      ]
    },
    'Assam': {
      state: 'Assam',
      region: 'Northeast India',
      capital: 'Guwahati',
      districts: [
        {
          name: 'Guwahati',
          places: ['Kamakhya Temple', 'Umananda Temple', 'Assam State Zoo', 'Navagraha Temple', 'Saraighat Bridge', 'Dighalipukhuri', 'Basistha Temple', 'Shukreshwar Temple']
        },
        {
          name: 'Kaziranga',
          places: ['Kaziranga National Park', 'Elephant Safari', 'Jeep Safari', 'Orang National Park', 'Pobitora Wildlife Sanctuary', 'Panbari Reserve Forest', 'Kaziranga Orchid Park', 'Kaziranga National Orchid']
        },
        {
          name: 'Manas',
          places: ['Manas National Park', 'Bamboo Bridge', 'Mathanguri', 'Uchila', 'Barpeta Road', 'Kokrajhar', 'Bongaigaon', 'Goalpara']
        },
        {
          name: 'Majuli',
          places: ['Majuli Island', 'Vaishnavite Satras', 'Kamalabari Satra', 'Auniati Satra', 'Garmur', 'Dakhinpat Satra', 'Bengenaati Satra', 'Samaguri Satra']
        },
        {
          name: 'Tezpur',
          places: ['Agnigarh', 'Cole Park', 'Mahabhairab Temple', 'Bamuni Hills', 'Padum Pukhuri', 'Bhairabi Temple', 'Nameri National Park', 'Orang National Park']
        },
        {
          name: 'Shillong',
          places: ['Umiam Lake', 'Elephant Falls', 'Shillong Peak', 'Ward\'s Lake', 'Don Bosco Museum', 'Laitlum Canyons', 'Mawphlang Sacred Forest', 'Sohpetbneng Peak']
        },
        {
          name: 'Tawang',
          places: ['Tawang Monastery', 'Sela Pass', 'Pankang Teng Tso Lake', 'Jaswant Garh War Memorial', 'Gorichen Peak', 'Nuranang Falls', 'Bumla Pass', 'Madhuri Lake']
        }
      ]
    },

    // NORTH INDIA
    'Uttar Pradesh': {
      state: 'Uttar Pradesh',
      region: 'North India',
      capital: 'Lucknow',
      districts: [
        {
          name: 'Lucknow',
          places: ['Bara Imambara', 'Chota Imambara', 'Rumi Darwaza', 'Hazratganj', 'British Residency', 'Dilkusha Garden', 'Chhota Imambara', 'Aminabad']
        },
        {
          name: 'Agra',
          places: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Itmad-ud-Daulah', 'Mehtab Bagh', 'Sikandra', 'Mariam\'s Tomb', 'Mughal Heritage Walk']
        },
        {
          name: 'Varanasi',
          places: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Man Mandir Ghat', 'Sarnath', 'Sankat Mochan Temple', 'Durga Temple', 'Tulsi Manas Temple', 'Ramnagar Fort']
        },
        {
          name: 'Allahabad',
          places: ['Sangam', 'Allahabad Fort', 'Anand Bhavan', 'Khusro Bagh', 'All Saints Cathedral', 'Minto Park', 'Chandra Shekhar Azad Park', 'Jawahar Nehru Museum']
        },
        {
          name: 'Kanpur',
          places: ['Kanpur Memorial Church', 'Allen Forest Zoo', 'Phool Bagh', 'Bithoor', 'Jajmau', 'Shri Radhakrishna Temple', 'Blue World Theme Park', 'Moti Jheel']
        },
        {
          name: 'Mathura',
          places: ['Krishna Janmabhoomi', 'Dwarkadhish Temple', 'Banke Bihari Temple', 'Govardhan Hill', 'Vrindavan', 'Barsana', 'Nandgaon', 'Gokul']
        },
        {
          name: 'Ayodhya',
          places: ['Ram Janmabhoomi', 'Hanuman Garhi', 'Kanak Bhawan', 'Saryu River', 'Nageshwarnath Temple', 'Treta Ke Thakur', 'Guptar Ghat', 'Ayodhya Museum']
        },
        {
          name: 'Jhansi',
          places: ['Jhansi Fort', 'Rani Mahal', 'Government Museum', 'St. Jude\'s Shrine', 'Panchkoshi Parikrama', 'Parichha Dam', 'Barua Sagar', 'Samthar Fort']
        }
      ]
    },
    'Punjab': {
      state: 'Punjab',
      region: 'North India',
      capital: 'Chandigarh',
      districts: [
        {
          name: 'Amritsar',
          places: ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border', 'Durgiana Temple', 'Maharaja Ranjit Singh Museum', 'Gobindgarh Fort', 'Ram Tirath', 'Central Sikh Museum']
        },
        {
          name: 'Chandigarh',
          places: ['Rock Garden', 'Rose Garden', 'Sukhna Lake', 'Pinjore Gardens', 'Sector 17 Plaza', 'Capitol Complex', 'International Dolls Museum', 'Leisure Valley']
        },
        {
          name: 'Ludhiana',
          places: ['Maharaja Ranjit Singh War Museum', 'Guru Nanak Bhawan', 'Punjab Agricultural University', 'Nehru Rose Garden', 'Rakh Bagh', 'Phillaur Fort', 'Gurudwara Charan Kamal', 'Hardy\'s World']
        },
        {
          name: 'Jalandhar',
          places: ['Devi Talab Mandir', 'Wonderland Theme Park', 'St. Mary\'s Cathedral Church', 'Pushpa Gujral Science City', 'Nikku Park', 'Gurudwara Tahli Sahib', 'Prithvi\'s Planet', 'Shiv Mandir']
        },
        {
          name: 'Patiala',
          places: ['Qila Mubarak', 'Sheesh Mahal', 'Baradari Garden', 'Moti Bagh Palace', 'Gurudwara Dukh Niwaran Sahib', 'Kali Mata Temple', 'National Institute of Sports', 'Patiala Heritage Festival']
        },
        {
          name: 'Anandpur Sahib',
          places: ['Anandpur Sahib Gurudwara', 'Keshgarh Sahib', 'Virasat-e-Khalsa', 'Baisakhi Festival', 'Gurudwara Sis Ganj Sahib', 'Gurudwara Anandpur Sahib', 'Takht Sri Kesgarh Sahib', 'Gurudwara Parowar']
        }
      ]
    },
    'Haryana': {
      state: 'Haryana',
      region: 'North India',
      capital: 'Chandigarh',
      districts: [
        {
          name: 'Gurgaon',
          places: ['Kingdom of Dreams', 'Sultanpur National Park', 'Damdama Lake', 'Leisure Valley Park', 'Mata Sheetla Devi Temple', 'Sai Dham', 'Aravalli Biodiversity Park', 'Cyber Hub']
        },
        {
          name: 'Faridabad',
          places: ['Surajkund', 'Badkhal Lake', 'Aravalli Golf Course', 'Shirdi Sai Baba Temple', 'Raja Nahar Singh Palace', 'Dhauj Lake', 'Baba Farid', 'Old Faridabad']
        },
        {
          name: 'Panipat',
          places: ['Panipat Museum', 'Kala Amb', 'Ibrahim Lodi Tomb', 'Kabuli Bagh Mosque', 'Panipat Refinery', 'Samalkha', 'Tomb of Bu Ali Shah Qalandar', 'Panipat Thermal Power']
        },
        {
          name: 'Kurukshetra',
          places: ['Brahma Sarovar', 'Sannihit Sarovar', 'Jyotisar', 'Sheikh Chilli\'s Tomb', 'Kurukshetra Panorama', 'Sri Krishna Museum', 'Bhishma Kund', 'Kalpana Chawla Memorial']
        },
        {
          name: 'Ambala',
          places: ['Ambala Cantonment', 'Badshahi Bagh Gurudwara', 'Bhawani Amba Temple', 'Paget Park', 'Ambala Air Force Station', 'Jain Temples', 'Gurudwara Manji Sahib', 'Ambala City']
        }
      ]
    },
    'Himachal Pradesh': {
      state: 'Himachal Pradesh',
      region: 'North India',
      capital: 'Shimla',
      districts: [
        {
          name: 'Shimla',
          places: ['Mall Road', 'Kufri', 'Jakhoo Temple', 'Christ Church', 'Summer Hill', 'Chail', 'Naldehra', 'Tattapani']
        },
        {
          name: 'Manali',
          places: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Vashisht Hot Springs', 'Old Manali', 'Naggar Castle', 'Manikaran', 'Great Himalayan National Park']
        },
        {
          name: 'Dharamshala',
          places: ['McLeod Ganj', 'Dalai Lama Temple', 'Bhagsu Nag Temple', 'Dharamshala Cricket Stadium', 'Triund', 'Kangra Fort', 'Baijnath Temple', 'Palampur']
        },
        {
          name: 'Kullu',
          places: ['Kullu Valley', 'Raghunath Temple', 'Bijli Mahadev Temple', 'Great Himalayan National Park', 'Manikaran', 'Kasol', 'Malana', 'Tirthan Valley']
        },
        {
          name: 'Spiti Valley',
          places: ['Key Monastery', 'Kibber Village', 'Chandratal Lake', 'Pin Valley National Park', 'Tabo Monastery', 'Dhankar Monastery', 'Kaza', 'Langza Village']
        },
        {
          name: 'Kinnaur',
          places: ['Sangla Valley', 'Kalpa', 'Reckong Peo', 'Chitkul', 'Nako Lake', 'Khab', 'Ropa Valley', 'Bhaba Valley']
        },
        {
          name: 'Chamba',
          places: ['Chamba Valley', 'Laxmi Narayan Temple', 'Chamunda Devi Temple', 'Bhuri Singh Museum', 'Khajjiar', 'Dalhousie', 'Pangi Valley', 'Manimahesh Lake']
        },
        {
          name: 'Mandi',
          places: ['Bhootnath Temple', 'Triloknath Temple', 'Shikari Devi Temple', 'Rewalsar Lake', 'Janjehli', 'Prashar Lake', 'Barot Valley', 'Tattapani']
        }
      ]
    },
    'Jammu & Kashmir': {
      state: 'Jammu & Kashmir',
      region: 'North India',
      capital: 'Srinagar',
      districts: [
        {
          name: 'Srinagar',
          places: ['Dal Lake', 'Shalimar Bagh', 'Nishat Bagh', 'Pari Mahal', 'Shankaracharya Temple', 'Hazratbal Shrine', 'Chashme Shahi', 'Tulip Garden']
        },
        {
          name: 'Gulmarg',
          places: ['Gulmarg Gondola', 'Khilanmarg', 'Apharwat Peak', 'Gulmarg Golf Course', 'Maharani Temple', 'Baba Reshi Shrine', 'Alpather Lake', 'Seven Springs']
        },
        {
          name: 'Pahalgam',
          places: ['Betaab Valley', 'Aru Valley', 'Chandanwari', 'Lidder River', 'Sheshnag Lake', 'Tarsar Marsar Lakes', 'Kolahoi Glacier', 'Mamleshwar Temple']
        },
        {
          name: 'Sonamarg',
          places: ['Thajiwas Glacier', 'Zojila Pass', 'Gadsar Lake', 'Krishansar Lake', 'Vishansar Lake', 'Gangabal Lake', 'Naranag', 'Baltal']
        },
        {
          name: 'Leh',
          places: ['Pangong Lake', 'Khardung La', 'Nubra Valley', 'Shanti Stupa', 'Leh Palace', 'Magnetic Hill', 'Hemis Monastery', 'Thiksey Monastery']
        },
        {
          name: 'Kargil',
          places: ['Kargil War Memorial', 'Mulbekh', 'Suru Valley', 'Zanskar Valley', 'Rangdum Monastery', 'Parkachik', 'Drass', 'Tiger Hill']
        },
        {
          name: 'Jammu',
          places: ['Vaishno Devi', 'Raghunath Temple', 'Bahu Fort', 'Patnitop', 'Sanasar', 'Mansar Lake', 'Akhnoor Fort', 'Bagh-e-Bahu']
        },
        {
          name: 'Katra',
          places: ['Vaishno Devi Shrine', 'Banganga', 'Ardh Kuwari', 'Sanjhi Chhat', 'Charan Paduka', 'Bhairav Temple', 'Himkoti', 'Bhairavnath Temple']
        }
      ]
    },
    'Uttarakhand': {
      state: 'Uttarakhand',
      region: 'North India',
      capital: 'Dehradun',
      districts: [
        {
          name: 'Dehradun',
          places: ['Forest Research Institute', 'Robber\'s Cave', 'Sahastradhara', 'Malsi Deer Park', 'Tapkeshwar Temple', 'Mindrolling Monastery', 'Lachhiwala', 'Rajaji National Park']
        },
        {
          name: 'Mussoorie',
          places: ['Gun Hill', 'Kempty Falls', 'Mall Road', 'Lal Tibba', 'Company Garden', 'Cloud\'s End', 'Jharipani Falls', 'Bhatta Falls']
        },
        {
          name: 'Nainital',
          places: ['Naini Lake', 'Naina Devi Temple', 'Tiffin Top', 'Snow View Point', 'Mall Road', 'Cave Garden', 'Eco Cave Gardens', 'Hanuman Garhi']
        },
        {
          name: 'Ranikhet',
          places: ['Chaubatia Gardens', 'Bhalu Dam', 'Jhula Devi Temple', 'Katarmal Sun Temple', 'Majkhali', 'Upat Golf Course', 'Chaubatia Orchards', 'Haidakhan Temple']
        },
        {
          name: 'Haridwar',
          places: ['Har Ki Pauri', 'Mansa Devi Temple', 'Chandi Devi Temple', 'Maya Devi Temple', 'Daksh Prajapati Temple', 'Bharat Mata Mandir', 'Patanjali Yogpeeth', 'Shanti Kunj']
        },
        {
          name: 'Rishikesh',
          places: ['Lakshman Jhula', 'Ganga Aarti', 'River Rafting', 'Bungee Jumping', 'Neelkanth Mahadev Temple', 'Triveni Ghat', 'Parmarth Niketan', 'Beatles Ashram']
        },
        {
          name: 'Badrinath',
          places: ['Badrinath Temple', 'Tapt Kund', 'Neelkanth Peak', 'Mana Village', 'Vasudhara Falls', 'Charanpaduka', 'Bhim Pul', 'Vyas Cave']
        },
        {
          name: 'Kedarnath',
          places: ['Kedarnath Temple', 'Gaurikund', 'Vasuki Tal', 'Chorabari Tal', 'Sonprayag', 'Triyuginarayan', 'Rudranath', 'Madhyamaheshwar']
        }
      ]
    },
    'Rajasthan': {
      state: 'Rajasthan',
      region: 'North India',
      capital: 'Jaipur',
      districts: [
        {
          name: 'Jaipur',
          places: ['Hawa Mahal', 'City Palace', 'Amber Fort', 'Jantar Mantar', 'Nahargarh Fort', 'Jaigarh Fort', 'Albert Hall Museum', 'Birla Temple']
        },
        {
          name: 'Udaipur',
          places: ['Lake Pichola', 'City Palace', 'Jag Mandir', 'Saheliyon Ki Bari', 'Fateh Sagar Lake', 'Monsoon Palace', 'Jagdish Temple', 'Sajjangarh Palace']
        },
        {
          name: 'Jodhpur',
          places: ['Mehrangarh Fort', 'Umaid Bhawan Palace', 'Jaswant Thada', 'Mandore Gardens', 'Kaylana Lake', 'Balsamand Lake', 'Ghanta Ghar', 'Sardar Market']
        },
        {
          name: 'Jaisalmer',
          places: ['Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon Ki Haveli', 'Gadisar Lake', 'Kuldhara Village', 'Desert National Park', 'Tanot Mata Temple', 'Bada Bagh']
        },
        {
          name: 'Bikaner',
          places: ['Junagarh Fort', 'Karni Mata Temple', 'Lalgarh Palace', 'Gajner Palace', 'Royal Cenotaphs', 'Sadul Singh Museum', 'Ganga Government Museum', 'Devi Kund']
        },
        {
          name: 'Pushkar',
          places: ['Pushkar Lake', 'Brahma Temple', 'Savitri Temple', 'Varaha Temple', 'Pap Mochani Temple', 'Apteshwar Temple', 'Rangji Temple', 'Pushkar Fair']
        },
        {
          name: 'Mount Abu',
          places: ['Dilwara Temples', 'Nakki Lake', 'Guru Shikhar', 'Sunset Point', 'Honeymoon Point', 'Achalgarh Fort', 'Wildlife Sanctuary', 'Toad Rock']
        },
        {
          name: 'Ranthambore',
          places: ['Ranthambore Fort', 'Safari Zones', 'Padam Lake', 'Raj Bagh Ruins', 'Jogi Mahal', 'Ganesh Temple', 'Surwal Lake', 'Kachida Valley']
        }
      ]
    },
    'Delhi': {
      state: 'Delhi',
      region: 'North India',
      capital: 'New Delhi',
      districts: [
        {
          name: 'New Delhi',
          places: ['India Gate', 'Qutub Minar', 'Red Fort', 'Lotus Temple', 'Akshardham Temple', 'Humayun\'s Tomb', 'Jama Masjid', 'Chandni Chowk']
        },
        {
          name: 'Old Delhi',
          places: ['Red Fort', 'Jama Masjid', 'Chandni Chowk', 'Raj Ghat', 'Fatehpuri Masjid', 'Gurdwara Sis Ganj', 'Jain Mandir', 'Gali Paranthe Wali']
        },
        {
          name: 'South Delhi',
          places: ['Qutub Minar', 'Lotus Temple', 'Garden of Five Senses', 'Safdarjung Tomb', 'Hauz Khas Village', 'Select Citywalk', 'Dilli Haat', 'Siri Fort']
        },
        {
          name: 'East Delhi',
          places: ['Akshardham Temple', 'Yamuna Ghat', 'Sanjay Lake', 'Lal Quila', 'Shiv Mandir', 'Gurudwara Bala Sahib', 'Shri Jagannath Temple', 'Vijay Nagar']
        },
        {
          name: 'West Delhi',
          places: ['Janakpuri District Centre', 'Rajouri Garden', 'Pacific Mall', 'Dwarka Sector 21', 'Delhi Haat', 'Tughlaqabad Fort', 'Nehru Park', 'Shivaji Stadium']
        },
        {
          name: 'North Delhi',
          places: ['Delhi University', 'North Campus', 'Kamla Nagar', 'Vishwavidyalaya Metro', 'Guru Tegh Bahadur Nagar', 'Azadpur Mandi', 'Shakti Sthal', 'Shiv Mandir']
        }
      ]
    }
  };

  const toggleStateExpansion = (stateName) => {
    setExpandedStates(prev => ({
      ...prev,
      [stateName]: !prev[stateName]
    }));
  };

  const filteredStates = Object.entries(allIndianPlaces).filter(([stateName, stateData]) => {
    if (selectedState !== 'all' && stateName !== selectedState) return false;
    if (selectedType !== 'all' && stateData.region !== selectedType) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return stateName.toLowerCase().includes(searchLower) || 
             stateData.districts.some(district => 
               district.name.toLowerCase().includes(searchLower) ||
               district.places.some(place => place.toLowerCase().includes(searchLower))
             );
    }
    return true;
  });

  const getRegionIcon = (region) => {
    const icons = {
      'South India': '🌴',
      'West India': '🌊',
      'Central India': '🏛️',
      'East India': '🌅',
      'Northeast India': '🏔️',
      'North India': '❄️'
    };
    return icons[region] || '📍';
  };

  return (
    <div className="trip-places-overlay">
      <div className="trip-places-container">
        <div className="trip-places-header">
          <h2 className="trip-places-title">🗺️ Complete India Trip Places</h2>
          <p className="trip-places-subtitle">From Kerala to Kashmir - All States, Districts & Tourist Spots</p>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="trip-places-filters">
          <div className="filter-group">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search states, districts, or places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <Filter className="filter-icon" />
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="filter-select">
              <option value="all">All States</option>
              {Object.keys(allIndianPlaces).sort().map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <Compass className="filter-icon" />
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
              <option value="all">All Regions</option>
              <option value="South India">South India</option>
              <option value="West India">West India</option>
              <option value="Central India">Central India</option>
              <option value="East India">East India</option>
              <option value="Northeast India">Northeast India</option>
              <option value="North India">North India</option>
            </select>
          </div>
        </div>

        <div className="trip-places-content">
          <div className="places-stats">
            <div className="stat-card">
              <MapPin className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{Object.keys(allIndianPlaces).length}</span>
                <span className="stat-label">States</span>
              </div>
            </div>
            <div className="stat-card">
              <Navigation className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{Object.values(allIndianPlaces).reduce((total, state) => total + state.districts.length, 0)}</span>
                <span className="stat-label">Districts</span>
              </div>
            </div>
            <div className="stat-card">
              <Camera className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{Object.values(allIndianPlaces).reduce((total, state) => total + state.districts.reduce((sum, district) => sum + district.places.length, 0), 0)}</span>
                <span className="stat-label">Tourist Places</span>
              </div>
            </div>
          </div>

          <div className="states-grid">
            {filteredStates.map(([stateName, stateData]) => (
              <div key={stateName} className="state-card">
                <div className="state-header" onClick={() => toggleStateExpansion(stateName)}>
                  <div className="state-info">
                    <span className="state-icon">{getRegionIcon(stateData.region)}</span>
                    <div>
                      <h3 className="state-name">{stateName}</h3>
                      <p className="state-details">
                        {stateData.capital} • {stateData.districts.length} Districts • {stateData.districts.reduce((sum, district) => sum + district.places.length, 0)} Places
                      </p>
                    </div>
                  </div>
                  <div className="state-actions">
                    <span className="region-badge">{stateData.region}</span>
                    <ChevronDown className={`expand-icon ${expandedStates[stateName] ? 'expanded' : ''}`} />
                  </div>
                </div>

                {expandedStates[stateName] && (
                  <div className="districts-list">
                    {stateData.districts.map((district, index) => (
                      <div key={index} className="district-item">
                        <div className="district-header">
                          <h4 className="district-name">{district.name}</h4>
                          <span className="place-count">{district.places.length} places</span>
                        </div>
                        <div className="places-grid">
                          {district.places.map((place, placeIndex) => (
                            <div key={placeIndex} className="place-item">
                              <MapPin className="place-icon" />
                              <span className="place-name">{place}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlaces;
