export const openers = [
  "Correct… looks like you’re winning AND planning our date 😏✈️",
  "You got it! Guess you’re taking me here now 😉❤️",
  "Another right answer… so when are we going? 😜🌍",
  "Wow smart and cute? Dangerous combo 😏💕",
  "Correct! I hope you’re ready to travel with me now 😄✈️",
  "You’re too good… I might have to reward you later 😉💖",
  "Another win? Okay, you’re definitely planning our trip now 😏🌎",
  "Correct! So… window seat or next to me? 😄✈️",
  "You nailed it… now I’m impressed AND curious 😏💕",
  "One more right answer and I’m booking tickets 😜❤️",
  "Correct! Guess I’m stuck traveling with you now 😄💖",
  "You’re winning… I like where this is going 😏🌍",
  "Another correct answer… you’re showing off now 😜✨",
  "Careful… I might start taking you on real trips 😏✈️",
  "Correct! I think you deserve a travel date 😉💕",
  "You got it! Now don’t run away when I say let’s go 😄❤️",
  "Another win… you’re kinda making me fall for you again 😏🌎",
  "Correct! You’re earning yourself a world tour 😉✈️",
  "Wow… brain + charm? Not fair 😜💕",
  "You’re doing too well… I might get jealous 😏❤️",
  "Correct! Now I expect you to plan the trip 😄✈️",
  "Another one? Okay, you’re definitely showing off now 😏🌍",
  "You win this… I’ll decide the destination 😉💕",
  "Correct! Guess we’re going here together now 😜❤️",
  "You’re too smooth with these answers 😏✨",
  "Another correct answer… should I be impressed or worried? 😄💕",
  "Correct! Looks like I found my travel partner 😉✈️",
  "You got it… now don’t ghost me on the trip 😜❤️",
  "You’re winning… I might let you choose our next destination 😏🌍",
  "Correct! I hope you like long flights with me 😄✈️",
  "Another win… okay, I’m officially impressed 😏💕",
  "Correct! Guess we’re making memories soon 😉🌎",
  "You’re getting too good at this… I like it 😜❤️",
  "Another answer right… are you trying to impress me? 😏✨",
  "Correct! Now don’t say no when I say let’s go 😄✈️",
  "You’re winning… I might start following you everywhere 😏💕",
  "Correct! So… beach trip or city tour with me? 😉🌍",
  "Another one right… you’re definitely up to something 😜❤️",
  "You got it… now you owe me a trip 😏✈️",
  "Correct! I think we’d look good traveling together 😄💕",
  "Another win… I’m starting to like your style 😏🌎",
  "Correct! You’re making this game too interesting 😜❤️",
  "You got it… now let’s make it real 😉✈️",
  "Another right answer… I’m watching you 😏💕",
  "Correct! You’re making it hard not to travel with you 😄🌍",
  "You’re winning… I might just come with you everywhere 😏❤️",
  "Correct! Now I expect a proper travel plan 😉✈️",
  "Another one? Okay, you’re officially impressive 😜💕",
  "You got it… looks like we’re going on a trip soon 😏🌎",
  "Correct! Careful… I might not let you travel without me 😄❤️"
];

export interface CountryData {
  name: string;
  code: string;
  difficulty: number;
  hint: string;
  activity: string;
}

export const countries: CountryData[] = [
  // Easy (difficulty: 1)
  { 
    name: "United States", code: "us", difficulty: 1, 
    hint: "Home to the Statue of Liberty and the Grand Canyon.", 
    activity: "take a road trip down Route 66 and share a giant milkshake with me." 
  },
  { 
    name: "United Kingdom", code: "gb", difficulty: 1, 
    hint: "Famous for Big Ben, red phone booths, and fish and chips.", 
    activity: "have a cozy tea date at the Ritz and walk through London under one umbrella." 
  },
  { 
    name: "France", code: "fr", difficulty: 1, 
    hint: "Known for the Eiffel Tower and world-class wine and cheese.", 
    activity: "picnic at the Champ de Mars with wine, cheese, and a kiss under the Eiffel Tower." 
  },
  { 
    name: "Germany", code: "de", difficulty: 1, 
    hint: "Famous for Oktoberfest, castles like Neuschwanstein, and precision engineering.", 
    activity: "cuddle up at a Munich beer hall and then visit a fairy-tale castle together." 
  },
  { 
    name: "Japan", code: "jp", difficulty: 1, 
    hint: "Land of cherry blossoms, Mount Fuji, and incredible sushi.", 
    activity: "go for a romantic stroll under cherry blossoms in Kyoto and eat all the sushi." 
  },
  { 
    name: "China", code: "cn", difficulty: 1, 
    hint: "Home to the Great Wall and the Forbidden City.", 
    activity: "walk hand-in-hand along the Great Wall and share some authentic dim sum." 
  },
  { 
    name: "Brazil", code: "br", difficulty: 1, 
    hint: "Famous for the Christ the Redeemer statue and the Amazon rainforest.", 
    activity: "dance samba with me in Rio and watch the sunset at Ipanema beach." 
  },
  { 
    name: "Italy", code: "it", difficulty: 1, 
    hint: "Land of the Colosseum, Leaning Tower of Pisa, and delicious pasta.", 
    activity: "take a sunset gondola ride in Venice and share a huge gelato." 
  },
  { 
    name: "Canada", code: "ca", difficulty: 1, 
    hint: "Known for maple syrup, Niagara Falls, and vast snowy landscapes.", 
    activity: "cuddle by a fire in a mountain cabin and see the Northern Lights together." 
  },
  { 
    name: "Australia", code: "au", difficulty: 1, 
    hint: "Home to the Sydney Opera House and the Great Barrier Reef.", 
    activity: "snorkel together in the reef and have a sunset BBQ on the beach." 
  },
  { 
    name: "India", code: "in", difficulty: 1, 
    hint: "Famous for the Taj Mahal and vibrant, spicy cuisine.", 
    activity: "visit the Taj Mahal at sunrise and let me feed you the best street food." 
  },
  { 
    name: "South Korea", code: "kr", difficulty: 1, 
    hint: "Known for K-pop, Gyeongbokgung Palace, and spicy kimchi.", 
    activity: "put a love lock on N Seoul Tower and go on a late-night street food date." 
  },
  { 
    name: "Spain", code: "es", difficulty: 1, 
    hint: "Famous for Sagrada Família, flamenco dancing, and tapas.", 
    activity: "watch a passionate flamenco show and share tapas and sangria until late." 
  },
  { 
    name: "Mexico", code: "mx", difficulty: 1, 
    hint: "Known for Chichén Itzá, tacos, and vibrant festivals like Day of the Dead.", 
    activity: "relax in a hidden cenote and then have a romantic dinner on a Cancun beach." 
  },
  { 
    name: "Russia", code: "ru", difficulty: 1, 
    hint: "Home to Red Square, the Kremlin, and deep history.", 
    activity: "take a romantic winter walk through Red Square and drink hot tea to stay warm." 
  },
  { 
    name: "Switzerland", code: "ch", difficulty: 1, 
    hint: "Famous for the Alps, luxury watches, and amazing chocolate.", 
    activity: "take a scenic train ride through the Alps and indulge in a chocolate fondue date." 
  },
  { 
    name: "Egypt", code: "eg", difficulty: 1, 
    hint: "Home to the Great Pyramids and the Sphinx.", 
    activity: "ride camels at sunset by the pyramids and take a romantic Nile cruise." 
  },
  { 
    name: "Greece", code: "gr", difficulty: 1, 
    hint: "Known for the Parthenon and beautiful white-washed islands like Santorini.", 
    activity: "watch the famous Oia sunset in Santorini with a glass of local wine." 
  },
  { 
    name: "Turkey", code: "tr", difficulty: 1, 
    hint: "Famous for Hagia Sophia and hot air balloons over Cappadocia.", 
    activity: "take a magical hot air balloon ride at dawn and then relax in a Turkish bath." 
  },
  { 
    name: "Argentina", code: "ar", difficulty: 1, 
    hint: "Land of the Tango and stunning Iguazu Falls.", 
    activity: "let me teach you the Tango in Buenos Aires after a romantic steak dinner." 
  },
  
  // Medium (difficulty: 2)
  { 
    name: "Belgium", code: "be", difficulty: 2, 
    hint: "Famous for waffles, chocolate, and the Atomium.", 
    activity: "go on a chocolate-tasting tour in Bruges and share hot waffles." 
  },
  { 
    name: "Netherlands", code: "nl", difficulty: 2, 
    hint: "Known for windmills, tulips, and canal cities like Amsterdam.", 
    activity: "cycle through tulip fields together and take a private canal boat cruise." 
  },
  { 
    name: "Sweden", code: "se", difficulty: 2, 
    hint: "Home to ABBA, the Vasa Museum, and the Icehotel.", 
    activity: "spend a magical night at the Icehotel and cuddle under reindeer skins." 
  },
  { 
    name: "Norway", code: "no", difficulty: 2, 
    hint: "Famous for stunning fjords and the Midnight Sun.", 
    activity: "take a boat through the Geirangerfjord and hike to a romantic viewpoint." 
  },
  { 
    name: "Denmark", code: "dk", difficulty: 2, 
    hint: "Home to the Little Mermaid statue and Lego.", 
    activity: "have a cozy 'hygge' dinner in Copenhagen and visit Tivoli Gardens at night." 
  },
  { 
    name: "Portugal", code: "pt", difficulty: 2, 
    hint: "Known for Fado music, custard tarts, and beautiful coastlines.", 
    activity: "share a box of Pastéis de Belém in Lisbon and watch the Atlantic waves." 
  },
  { 
    name: "Ireland", code: "ie", difficulty: 2, 
    hint: "The Emerald Isle, famous for rolling green hills and Guinness.", 
    activity: "visit the Cliffs of Moher and then warm up in a traditional Irish pub." 
  },
  { 
    name: "Austria", code: "at", difficulty: 2, 
    hint: "Famous for classical music, the Alps, and Vienna's coffee houses.", 
    activity: "attend a glamorous ball in Vienna and share a Sachertorte cake." 
  },
  { 
    name: "Poland", code: "pl", difficulty: 2, 
    hint: "Home to Wawel Castle and delicious pierogi.", 
    activity: "take a horse-drawn carriage ride through Krakow's old market square." 
  },
  { 
    name: "Ukraine", code: "ua", difficulty: 2, 
    hint: "Known for the Tunnel of Love and beautiful Orthodox cathedrals.", 
    activity: "walk through the magical Tunnel of Love and make a secret wish together." 
  },
  { 
    name: "Thailand", code: "th", difficulty: 2, 
    hint: "Famous for tropical beaches, ornate temples, and spicy street food.", 
    activity: "release a sky lantern together in Chiang Mai and enjoy a beach massage." 
  },
  { 
    name: "Vietnam", code: "vn", difficulty: 2, 
    hint: "Known for Halong Bay and delicious Pho.", 
    activity: "take an overnight cruise in Halong Bay and watch the limestone cliffs pass by." 
  },
  { 
    name: "South Africa", code: "za", difficulty: 2, 
    hint: "Home to Table Mountain and amazing wildlife safaris.", 
    activity: "take a cable car up Table Mountain for sunset and go on a romantic safari." 
  },
  { 
    name: "New Zealand", code: "nz", difficulty: 2, 
    hint: "Known for breathtaking landscapes and being the filming site for Hobbiton.", 
    activity: "visit Hobbiton together and then soak in a natural hot spring under the stars." 
  },
  { 
    name: "Indonesia", code: "id", difficulty: 2, 
    hint: "Home to Bali's beaches and the ancient Borobudur temple.", 
    activity: "have a romantic dinner in a jungle villa in Ubud and watch traditional dance." 
  },
  { 
    name: "Pakistan", code: "pk", difficulty: 2, 
    hint: "Famous for the Karakoram Highway and beautiful Mughal architecture.", 
    activity: "visit the stunning Badshahi Mosque and enjoy a spicy food street date in Lahore." 
  },
  { 
    name: "Chile", code: "cl", difficulty: 2, 
    hint: "Known for the Atacama Desert and Easter Island statues.", 
    activity: "stargaze in the Atacama Desert—the clearest sky you'll ever see with me." 
  },
  { 
    name: "Colombia", code: "co", difficulty: 2, 
    hint: "Known for amazing coffee and the colorful city of Cartagena.", 
    activity: "walk the colorful streets of Cartagena and take a coffee farm tour together." 
  },
  { 
    name: "Israel", code: "il", difficulty: 2, 
    hint: "Home to Jerusalem's Old City and the Dead Sea.", 
    activity: "float together in the Dead Sea and share a delicious hummus feast." 
  },
  { 
    name: "Saudi Arabia", code: "sa", difficulty: 2, 
    hint: "Home to the ancient city of AlUla and vast deserts.", 
    activity: "dine under the stars in the desert of AlUla and see the Elephant Rock." 
  },

  // Hard (difficulty: 3)
  { 
    name: "Bhutan", code: "bt", difficulty: 3, 
    hint: "Known for the Tiger's Nest monastery perched on a cliff.", 
    activity: "hike up to Tiger's Nest and breathe in the pure mountain air with me." 
  },
  { 
    name: "Vanuatu", code: "vu", difficulty: 3, 
    hint: "An island nation known for its underwater post office and blue holes.", 
    activity: "swim in a hidden blue hole and explore the lush island jungles together." 
  },
  { 
    name: "Mauritania", code: "mr", difficulty: 3, 
    hint: "Home to the Eye of the Sahara and ancient library cities.", 
    activity: "take a desert caravan journey and watch the stars over the dunes." 
  },
  { 
    name: "Kyrgyzstan", code: "kg", difficulty: 3, 
    hint: "Famous for its nomadic culture and stunning Tian Shan mountains.", 
    activity: "stay in a traditional yurt by a crystal clear alpine lake." 
  },
  { 
    name: "Djibouti", code: "dj", difficulty: 3, 
    hint: "Known for salt lakes like Lake Assal and unique landscapes.", 
    activity: "float in the super-salty Lake Assal and explore the volcanic plains." 
  },
  { 
    name: "Comoros", code: "km", difficulty: 3, 
    hint: "Known as the Perfume Islands due to fragrant plant life.", 
    activity: "relax on a secluded beach surrounded by the scent of ylang-ylang." 
  },
  { 
    name: "Benin", code: "bj", difficulty: 3, 
    hint: "Rich in history and home to stilt villages like Ganvie.", 
    activity: "take a boat trip through the floating village of Ganvie." 
  },
  { 
    name: "Burkina Faso", code: "bf", difficulty: 3, 
    hint: "Known for its vibrant arts scene and the ruins of Loropeni.", 
    activity: "visit the colorful painted houses of Tiebele and admire the local art." 
  },
  { 
    name: "Turkmenistan", code: "tm", difficulty: 3, 
    hint: "Home to the burning Darvaza gas crater, the 'Door to Hell'.", 
    activity: "camp near the glowing gas crater and see the most surreal sunset ever." 
  },
  { 
    name: "Seychelles", code: "sc", difficulty: 3, 
    hint: "A paradise of granite boulders and turquoise water.", 
    activity: "find a secret beach in La Digue and swim in the warm turquoise ocean." 
  },
  { 
    name: "Palau", code: "pw", difficulty: 3, 
    hint: "Famous for Jellyfish Lake and incredible diving.", 
    activity: "swim safely with thousands of golden jellyfish in a tropical lake." 
  },
  { 
    name: "Kiribati", code: "ki", difficulty: 3, 
    hint: "The only country in all four hemispheres.", 
    activity: "watch the first sunrise in the world from a remote Pacific atoll." 
  },
  { 
    name: "Saint Kitts and Nevis", code: "kn", difficulty: 3, 
    hint: "Known for lush rainforests and historic sugar plantations.", 
    activity: "take a scenic railway tour through the tropical island hills." 
  },
  { 
    name: "Tajikistan", code: "tj", difficulty: 3, 
    hint: "Home to the breathtaking Pamir Highway.", 
    activity: "drive through the roof of the world on the rugged Pamir Highway." 
  },
  { 
    name: "Gabon", code: "ga", difficulty: 3, 
    hint: "Known for its 'surfing hippos' and untouched rainforests.", 
    activity: "go on an eco-safari and see wildlife on a wild, beautiful beach." 
  },
  { 
    name: "Lesotho", code: "ls", difficulty: 3, 
    hint: "The Kingdom in the Sky, an entire country above 1,000 meters.", 
    activity: "go pony trekking through the dramatic mountain passes together." 
  },
  { 
    name: "Malawi", code: "mw", difficulty: 3, 
    hint: "Home to Lake Malawi, the 'Lake of Stars'.", 
    activity: "kayak on the crystal clear waters and see the stars reflect on the lake." 
  },
  { 
    name: "Suriname", code: "sr", difficulty: 3, 
    hint: "The smallest country in South America, covered in rainforest.", 
    activity: "explore the Amazonian jungle and spot exotic birds in the canopy." 
  },
  { 
    name: "Guinea-Bissau", code: "gw", difficulty: 3, 
    hint: "Famous for the Bijagos Archipelago and unique wildlife.", 
    activity: "explore the remote islands and watch rare saltwater hippos." 
  },
  { 
    name: "Equatorial Guinea", code: "gq", difficulty: 3, 
    hint: "Known for its Spanish architecture and diverse wildlife.", 
    activity: "visit the historic city of Malabo and hike through the cloud forest." 
  }
];
