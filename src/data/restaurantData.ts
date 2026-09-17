import { BusinessInfo, MenuItem, Testimonial } from '../types';
import copperNihariPot from '../assets/images/copper_nihari_pot_1788413488230.jpg';
import pinkLacchiGlass from '../assets/images/pink_lacchi_glass_1788413503233.jpg';
import charcoalKebabs from '../assets/images/charcoal_kebabs_1788413522345.jpg';
import butterChickenImg from '../assets/images/butter_chicken_1788413547952.jpg';

export const BUSINESS_INFO: BusinessInfo = {
  name: "PeshWarain ~ Wari",
  bengaliName: "পেশওয়ারাইন ~ ওয়ারী",
  category: "Pakistani Restaurant",
  tagline: "A loved Pakistani table in Wari",
  rating: 4.1,
  reviewCount: 3679,
  typicalSpend: "৳400–600",
  address: "16b, 1 Rankin St, Dhaka 1203",
  phone: "+8801756853532",
  displayPhone: "01756-853532",
  hours: "Opens 5 PM Wednesday · Closed before Wednesday",
  hoursDetail: "Closed most days · Opens 5 PM on Wednesday",
  serviceOptions: ["Dine-in", "Takeaway"],
  googleMapsUrl: "https://maps.app.goo.gl/5gVGRLH6nwFyg5vh6"
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "nalli-nihari",
    name: "Nalli Nihari",
    bengaliName: "নল্লী নিহারী",
    description: "Slow-cooked shank, ginger, green chili, a deep overnight gravy",
    fullThought: "Simmered patiently for hours in heavy copper degs until the marrow softens into silk and the meat yields effortlessly to a torn piece of tandoori naan. Finished with fresh julienned ginger, crisp green chilies, and a squeeze of fresh local lemon.",
    price: 520,
    category: ["EVERYTHING", "FROM THE HANDI"],
    isSignature: true,
    image: copperNihariPot,
    accompaniment: "Fresh Garlic Naan & Special Lassi",
    spiciness: "Rich Spiced"
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    bengaliName: "বাটার চিকেন",
    description: "Charred chicken folded through a silky, gently spiced makhani",
    fullThought: "Tandoori chicken pieces basted over glowing charcoal, folded into a velvet reduction of ripe tomatoes, churned butter, and fragrant fenugreek leaves. Unhurried, creamy, and deeply comforting.",
    price: 480,
    category: ["EVERYTHING", "FROM THE HANDI"],
    image: butterChickenImg,
    accompaniment: "Butter Naan or Steamed Basmati",
    spiciness: "Mild"
  },
  {
    id: "murgh-makkhanwala",
    name: "Murgh Makkhanwala",
    bengaliName: "মুর্গ মাখনওয়ালা",
    description: "Tandoor-kissed chicken in a warm, buttery tomato masala",
    fullThought: "A hearty, rustic counterpart to the sweeter makhani — spiced with roasted coriander seeds, black cardamom, and slow-reduced caramelized onion gravy with a golden sheen of pure ghee.",
    price: 470,
    category: ["EVERYTHING", "FROM THE HANDI"],
    image: butterChickenImg,
    accompaniment: "Crispy Roghani Naan",
    spiciness: "Medium"
  },
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    bengaliName: "সিখ কাবাব",
    description: "Hand-shaped minced meat, kissed by the grill and served hot",
    fullThought: "Freshly ground meat spiced with mint, crushed coriander, raw onion, and secret Pakistani garam masala. Skewered on flat iron swords and roasted over incandescent coals for a smoky, tender bite.",
    price: 380,
    category: ["EVERYTHING", "OVER CHARCOAL", "TANDOOR"],
    isSignature: true,
    image: charcoalKebabs,
    accompaniment: "Mint & Coriander Chutney, Sliced Onions",
    spiciness: "Medium"
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    bengaliName: "চিকেন টিক্কা",
    description: "Smoky, tender pieces with the right amount of char",
    fullThought: "Marinated overnight in hung curd, Kashmiri deghi mirch, ginger, garlic, and mustard oil. The high heat of the clay tandoor chars the exterior while locking in succulent juices.",
    price: 380,
    category: ["EVERYTHING", "OVER CHARCOAL", "TANDOOR"],
    image: charcoalKebabs,
    accompaniment: "Onion Laccha, Lime Wedge",
    spiciness: "Smoky"
  },
  {
    id: "special-lassi",
    name: "Special Lacchi",
    bengaliName: "স্পেশাল লাচ্ছি",
    description: "Cold, creamy and just sweet enough. The reset between a smoky kebab and hot naan",
    fullThought: "Hand-churned whole-milk yogurt, sweetened with a hint of rose and cardamom, served ice-cold in frosted glassware topped with slivered pistachios and saffron threads. The table's essential companion.",
    price: 180,
    category: ["EVERYTHING", "COLD THINGS"],
    isSignature: true,
    image: pinkLacchiGlass,
    accompaniment: "Must-try companion with every order",
    spiciness: "Mild"
  },
  {
    id: "tandoori-chicken",
    name: "Tandoori Chicken (Quarter/Half)",
    bengaliName: "তন্দুরি চিকেন",
    description: "Classic bone-in chicken steeped in red spice brine and roasted over pit coals",
    fullThought: "Traditional clay pit roasting gives this bone-in classic a deep crimson crust and an aroma that fills the Rankin Street alleyway every evening as coals are stirred.",
    price: 360,
    category: ["EVERYTHING", "OVER CHARCOAL", "TANDOOR"],
    image: charcoalKebabs,
    accompaniment: "Pudina Raita & Tandoori Roti",
    spiciness: "Smoky"
  },
  {
    id: "garlic-butter-naan",
    name: "Garlic & Butter Naan",
    bengaliName: "গার্লিক বাটার নান",
    description: "Slapped onto the tandoor wall, puffed hot and brushed with clarified butter",
    fullThought: "Leavened flour dough hand-stretched, coated with roasted minced garlic and coriander, blistered against fiery clay and glistening with molten butter.",
    price: 70,
    category: ["EVERYTHING", "TANDOOR"],
    image: butterChickenImg,
    accompaniment: "Essential with Nihari & Masalas",
    spiciness: "Mild"
  },
  {
    id: "shahi-firni",
    name: "Shahi Firni / Rice Pudding",
    bengaliName: "শাহী ফিরনি",
    description: "Slow-reduced creamy milk, ground basmati, kewra and roasted nuts in clay",
    fullThought: "Chilled in unglazed clay pots that breathe and naturally cool the custard, subtly perfumed with kewra water, cardamom, and silver leaf.",
    price: 140,
    category: ["EVERYTHING", "COLD THINGS"],
    image: pinkLacchiGlass,
    accompaniment: "The sweet end to an unhurried dinner",
    spiciness: "Mild"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "The nihari and kebabs are the kind of food you remember on the way home.",
    author: "Mus'ab Noor",
    role: "Local Diner",
    rating: 5,
    date: "3 months ago",
    itemMentioned: "Nalli Nihari & Seekh Kebab"
  },
  {
    id: "t2",
    quote: "Special Lassi is a must-try item. Cold, fresh and exactly what the meal needed.",
    author: "Touseef Hasan",
    role: "Regular Visitor",
    rating: 5,
    date: "2 months ago",
    itemMentioned: "Special Lacchi"
  },
  {
    id: "t3",
    quote: "A clean, comfortable dine-in place with generous portions and soulful Pakistani food.",
    author: "Morshedul Alam Sujan",
    role: "Food Explorer",
    rating: 5,
    date: "1 month ago",
    itemMentioned: "Murgh Makkhanwala & Naan"
  }
];

export const STATS = [
  {
    value: "৳400–600",
    label: "Typical spend per person",
    note: "Generous plates built to share"
  },
  {
    value: "5 PM",
    label: "Open Wednesday after weekly close",
    note: "Coals lit at dusk, slow pots ready"
  },
  {
    value: "Dine in + Takeaway",
    label: "Bring your people or bring it home",
    note: "Packaged hot for the journey across town"
  }
];
