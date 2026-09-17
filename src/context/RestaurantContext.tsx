import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  Testimonial,
  BusinessInfo,
  HomepageContent,
  PhotoItem,
  TableRequest,
  AdminUser,
  ActivityLogItem,
  TableRequestStatus,
  DaySchedule
} from '../types';

import copperNihariPot from '../assets/images/copper_nihari_pot_1788413488230.jpg';
import pinkLacchiGlass from '../assets/images/pink_lacchi_glass_1788413503233.jpg';
import charcoalKebabs from '../assets/images/charcoal_kebabs_1788413522345.jpg';
import butterChickenImg from '../assets/images/butter_chicken_1788413547952.jpg';

const STORAGE_KEY = 'peshwarain_restaurant_data_v1';
const AUTH_KEY = 'peshwarain_admin_auth_v1';

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', isOpen: false, openTime: '5:00 PM', closeTime: '11:00 PM' },
  { day: 'Tuesday', isOpen: false, openTime: '5:00 PM', closeTime: '11:00 PM' },
  { day: 'Wednesday', isOpen: true, openTime: '5:00 PM', closeTime: '11:30 PM' },
  { day: 'Thursday', isOpen: true, openTime: '5:00 PM', closeTime: '11:30 PM' },
  { day: 'Friday', isOpen: true, openTime: '5:00 PM', closeTime: '12:00 AM' },
  { day: 'Saturday', isOpen: true, openTime: '5:00 PM', closeTime: '11:30 PM' },
  { day: 'Sunday', isOpen: false, openTime: '5:00 PM', closeTime: '11:00 PM' }
];

const INITIAL_BUSINESS_INFO: BusinessInfo = {
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
  facebookUrl: "https://www.facebook.com/PeshwarainWari",
  hours: "Opens 5 PM Wednesday · Closed before Wednesday",
  hoursDetail: "Closed most days · Opens 5 PM on Wednesday",
  hoursSchedule: DEFAULT_SCHEDULE,
  serviceOptions: ["Dine-in", "Takeaway"],
  googleMapsUrl: "https://maps.app.goo.gl/5gVGRLH6nwFyg5vh6"
};

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "nalli-nihari",
    name: "Nalli Nihari",
    bengaliName: "নল্লী নিহারী",
    description: "Slow-cooked shank, ginger, green chili, a deep overnight gravy",
    fullThought: "Simmered patiently for hours in heavy copper degs until the marrow softens into silk and the meat yields effortlessly to a torn piece of tandoori naan. Finished with fresh julienned ginger, crisp green chilies, and a squeeze of fresh local lemon.",
    price: 520,
    category: ["EVERYTHING", "FROM THE HANDI"],
    isSignature: true,
    isPopular: true,
    isVisible: true,
    sortOrder: 1,
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
    isPopular: true,
    isVisible: true,
    sortOrder: 2,
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
    isPopular: false,
    isVisible: true,
    sortOrder: 3,
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
    isPopular: true,
    isVisible: true,
    sortOrder: 4,
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
    isPopular: false,
    isVisible: true,
    sortOrder: 5,
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
    isPopular: true,
    isVisible: true,
    sortOrder: 6,
    image: pinkLacchiGlass,
    accompaniment: "Must-try companion with every order",
    spiciness: "Mild"
  },
  {
    id: "tandoori-chicken",
    name: "Tandoori Chicken (Half/Full)",
    bengaliName: "তন্দুরি চিকেন",
    description: "Classic bone-in chicken steeped in red spice brine and roasted over pit coals",
    fullThought: "Traditional clay pit roasting gives this bone-in classic a deep crimson crust and an aroma that fills the Rankin Street alleyway every evening as coals are stirred.",
    price: 360,
    category: ["EVERYTHING", "OVER CHARCOAL", "TANDOOR"],
    isPopular: false,
    isVisible: true,
    sortOrder: 7,
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
    isPopular: true,
    isVisible: true,
    sortOrder: 8,
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
    isPopular: false,
    isVisible: true,
    sortOrder: 9,
    image: pinkLacchiGlass,
    accompaniment: "The sweet end to an unhurried dinner",
    spiciness: "Mild"
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Mus'ab Noor",
    quote: "The nihari and kebabs are the kind of food you remember on the way home.",
    role: "Local Diner",
    rating: 5,
    date: "3 months ago",
    source: "Google Review",
    isFeatured: true,
    itemMentioned: "Nalli Nihari & Seekh Kebab"
  },
  {
    id: "t2",
    author: "Touseef Hasan",
    quote: "Special Lassi is a must-try item. Cold, fresh and exactly what the meal needed.",
    role: "Regular Visitor",
    rating: 5,
    date: "2 months ago",
    source: "Google Review",
    isFeatured: true,
    itemMentioned: "Special Lacchi"
  },
  {
    id: "t3",
    author: "Morshedul Alam Sujan",
    quote: "A clean, comfortable dine-in place with generous portions and soulful Pakistani food.",
    role: "Food Explorer",
    rating: 5,
    date: "1 month ago",
    source: "Google Review",
    isFeatured: true,
    itemMentioned: "Murgh Makkhanwala & Naan"
  },
  {
    id: "t4",
    author: "Farhana Zaman",
    quote: "The garlic naan comes bubbling hot straight from the clay pit. Worth waiting for Wednesday.",
    role: "Wari Resident",
    rating: 5,
    date: "2 weeks ago",
    source: "Manual entry",
    isFeatured: false,
    itemMentioned: "Garlic Naan"
  }
];

const INITIAL_HOMEPAGE_CONTENT: HomepageContent = {
  heroLabel: "A LOVED PAKISTANI TABLE IN WARI",
  heroHeadlinePlain: "Come for the",
  heroHeadlineHighlight: "nihari",
  heroSubtext: "Generous desi food, cold lassi and the kind of welcome that makes a neighbourhood feel like home.",
  heroImageUrl: copperNihariPot,
  announcementText: "TONIGHT IN WARI — OPEN FROM 5 PM ON WEDNESDAY — CALL THE TABLE",
  feelingHeadline: "The table isn't just about dinner. It's how Wari slows down.",
  feelingBodyCopy: "At 16b Rankin Street, the degs begin simmering hours before the sun dips behind Old Dhaka's rooftops. We cook Pakistani classics the patient way: whole spices bloomed in smoking ghee, shanks reduced overnight until the marrow surrenders, and skewered kebabs turned by hand over charcoal that never goes cold.",
  feelingSideQuote: "The smoke smells like old streets, roasted coriander, and people who aren't in a hurry.",
  drinkFeature: {
    label: "A PROPER GLASS",
    headline: "The Special Lacchi",
    body: "Cold, creamy, and gently scented with rose and cardamom. In the warmth of a Wari evening, it is the quiet reset between hot gravy and blistered naan.",
    price: 180,
    imageUrl: pinkLacchiGlass,
    bestWith: "Nalli Nihari & Seekh Kebab",
    visitorNote: "Served ice-cold in heavy glass, crowned with slivered pistachios and saffron."
  }
};

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: "p1",
    url: copperNihariPot,
    title: "Nalli Nihari Slow Cooked Pot",
    tag: "Food",
    uploadedAt: "2026-08-20"
  },
  {
    id: "p2",
    url: charcoalKebabs,
    title: "Charcoal Grilled Seekh Kebabs",
    tag: "Food",
    uploadedAt: "2026-08-22"
  },
  {
    id: "p3",
    url: pinkLacchiGlass,
    title: "Special Lacchi in Cut Glass",
    tag: "Drinks",
    uploadedAt: "2026-08-25"
  },
  {
    id: "p4",
    url: butterChickenImg,
    title: "Butter Chicken & Fresh Naan",
    tag: "Food",
    uploadedAt: "2026-08-28"
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    title: "Dining Room Warm Lighting",
    tag: "Vibe",
    uploadedAt: "2026-08-30"
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    title: "Rankin Street Evening Entrance",
    tag: "Exterior",
    uploadedAt: "2026-09-01"
  }
];

const INITIAL_TABLE_REQUESTS: TableRequest[] = [
  {
    id: "req-1",
    name: "Rafiqul Islam",
    contact: "01711-234567",
    partySize: "4 Guests",
    serviceType: "Dine-in Table",
    requestedDateTime: "Wednesday, 7:30 PM",
    message: "Family gathering, craving the Nalli Nihari and butter naan.",
    status: "New",
    createdAt: "2026-09-02T19:15:00Z"
  },
  {
    id: "req-2",
    name: "Nusrat Jahan",
    contact: "01819-876543",
    partySize: "6-8 Guests",
    serviceType: "Dine-in Table",
    requestedDateTime: "Friday, 8:00 PM",
    message: "Would love a quiet corner table if possible. Birthday celebration.",
    status: "Contacted",
    createdAt: "2026-09-02T14:40:00Z"
  },
  {
    id: "req-3",
    name: "Tanvir Ahmed",
    contact: "01912-345678",
    partySize: "2 Guests",
    serviceType: "Takeaway Pre-order",
    requestedDateTime: "Thursday, 6:00 PM",
    message: "Pick up 2 portions Nalli Nihari + 4 Garlic Naan hot on way home.",
    status: "Confirmed",
    createdAt: "2026-09-01T21:10:00Z"
  }
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: "u1",
    name: "Tariq Rahman (Owner)",
    email: "admin@peshwarain.com",
    role: "Admin",
    lastLogin: "Just now",
    status: "Active"
  },
  {
    id: "u2",
    name: "Salman Khan (Head Chef)",
    email: "kitchen@peshwarain.com",
    role: "Staff",
    lastLogin: "2 hours ago",
    status: "Active"
  }
];

const INITIAL_LOGS: ActivityLogItem[] = [
  {
    id: "l1",
    action: "Butter Chicken price updated to ৳480",
    timeAgo: "2 hours ago",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    author: "Tariq Rahman"
  },
  {
    id: "l2",
    action: "New table request from Rafiqul Islam (4 guests)",
    timeAgo: "4 hours ago",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    author: "Website Visitor"
  },
  {
    id: "l3",
    action: "Weekly hours verified for Wednesday 5 PM opening",
    timeAgo: "Yesterday",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    author: "Salman Khan"
  }
];

interface RestaurantContextType {
  businessInfo: BusinessInfo;
  menuItems: MenuItem[];
  reviews: Testimonial[];
  testimonials: Testimonial[];
  homepageContent: HomepageContent;
  photos: PhotoItem[];
  tableRequests: TableRequest[];
  users: AdminUser[];
  activityLogs: ActivityLogItem[];
  currentUser: AdminUser | null;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  // Auth
  login: (emailOrPin: string, password?: string) => boolean;
  logout: () => void;
  // Menu
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleMenuItemVisibility: (id: string) => void;
  reorderMenuItems: (orderedIds: string[]) => void;
  // Reviews
  addReview: (review: Omit<Testimonial, 'id'>) => void;
  updateReview: (review: Testimonial) => void;
  deleteReview: (id: string) => void;
  toggleReviewFeatured: (id: string) => void;
  updateAggregateRating: (rating: number, count: number) => void;
  // Business Info & Content
  updateBusinessInfo: (info: BusinessInfo) => void;
  updateHomepageContent: (content: HomepageContent) => void;
  // Photos
  addPhoto: (photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => void;
  deletePhoto: (id: string) => void;
  bulkDeletePhotos: (ids: string[]) => void;
  // Table Requests
  addTableRequest: (req: { name: string; contact: string; partySize: string; serviceType: string; requestedDateTime: string; message: string }) => void;
  updateTableRequestStatus: (id: string, status: TableRequestStatus) => void;
  // Users
  addUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>) => void;
  updateUser: (user: AdminUser) => void;
  deleteUser: (id: string) => void;
  // System
  logActivity: (action: string, author?: string) => void;
  resetToDefaults: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check URL initially for ?admin or /admin
  const initialIsAdmin = typeof window !== 'undefined' && 
    (window.location.search.includes('admin') || window.location.pathname.startsWith('/admin'));

  const [currentView, setCurrentViewState] = useState<'public' | 'admin'>(initialIsAdmin ? 'admin' : 'public');

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_business');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_INFO;
    } catch {
      return INITIAL_BUSINESS_INFO;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_menu');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [homepageContent, setHomepageContent] = useState<HomepageContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_content');
      return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_CONTENT;
    } catch {
      return INITIAL_HOMEPAGE_CONTENT;
    }
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [tableRequests, setTableRequests] = useState<TableRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return INITIAL_TABLE_REQUESTS;
    } catch {
      return INITIAL_TABLE_REQUESTS;
    }
  });

  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setCurrentView = (view: 'public' | 'admin') => {
    setCurrentViewState(view);
    try {
      const url = new URL(window.location.href);
      if (view === 'admin') {
        url.searchParams.set('admin', 'true');
      } else {
        url.searchParams.delete('admin');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_business', JSON.stringify(businessInfo));
    } catch (e) {
      console.error(e);
    }
  }, [businessInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_menu', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_content', JSON.stringify(homepageContent));
    } catch (e) {
      console.error(e);
    }
  }, [homepageContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_photos', JSON.stringify(photos));
    } catch (e) {
      console.error(e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_requests', JSON.stringify(tableRequests));
    } catch (e) {
      console.error(e);
    }
  }, [tableRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_logs', JSON.stringify(activityLogs));
    } catch (e) {
      console.error(e);
    }
  }, [activityLogs]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const logActivity = (action: string, author?: string) => {
    const userAuthor = author || (currentUser ? currentUser.name : 'Staff');
    const newLog: ActivityLogItem = {
      id: 'log-' + Date.now(),
      action,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      author: userAuthor
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  const login = (emailOrPin: string, _password?: string): boolean => {
    // Check PIN: 1203 (Wari postal code) or 1234
    if (emailOrPin === '1203' || emailOrPin === '1234') {
      const admin = users.find(u => u.role === 'Admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
      logActivity('Admin logged in via PIN code', admin.name);
      return true;
    }

    const matched = users.find(u => u.email.toLowerCase() === emailOrPin.toLowerCase().trim());
    if (matched) {
      setCurrentUser(matched);
      logActivity(`${matched.name} logged into dashboard`, matched.name);
      return true;
    }

    // Default admin fallback
    if (emailOrPin.includes('admin')) {
      const admin = INITIAL_USERS[0];
      setCurrentUser(admin);
      logActivity('Admin authenticated', admin.name);
      return true;
    }

    if (emailOrPin.includes('staff') || emailOrPin.includes('kitchen')) {
      const staff = INITIAL_USERS[1];
      setCurrentUser(staff);
      logActivity('Staff authenticated', staff.name);
      return true;
    }

    return false;
  };

  const logout = () => {
    if (currentUser) {
      logActivity(`${currentUser.name} signed out`, currentUser.name);
    }
    setCurrentUser(null);
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = 'menu-' + Date.now();
    const newItem: MenuItem = {
      ...item,
      id: newId,
      isVisible: item.isVisible ?? true,
      sortOrder: item.sortOrder ?? menuItems.length + 1
    };
    setMenuItems(prev => [...prev, newItem]);
    logActivity(`Added new menu dish "${item.name}" (৳${item.price})`);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
    logActivity(`Updated menu dish "${item.name}" (৳${item.price})`);
  };

  const deleteMenuItem = (id: string) => {
    const item = menuItems.find(m => m.id === id);
    setMenuItems(prev => prev.filter(m => m.id !== id));
    if (item) {
      logActivity(`Deleted menu dish "${item.name}"`);
    }
  };

  const toggleMenuItemVisibility = (id: string) => {
    setMenuItems(prev => prev.map(m => {
      if (m.id === id) {
        const nextVis = !(m.isVisible ?? true);
        logActivity(`${nextVis ? 'Restored' : 'Hidden'} menu item "${m.name}" on live site`);
        return { ...m, isVisible: nextVis };
      }
      return m;
    }));
  };

  const reorderMenuItems = (orderedIds: string[]) => {
    const map = new Map(orderedIds.map((id, index) => [id, index + 1]));
    setMenuItems(prev => {
      const updated = prev.map(item => ({
        ...item,
        sortOrder: map.get(item.id) ?? item.sortOrder ?? 99
      }));
      return updated.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    });
    logActivity('Reordered menu items display sequence');
  };

  const addReview = (review: Omit<Testimonial, 'id'>) => {
    const newReview: Testimonial = {
      ...review,
      id: 'rev-' + Date.now()
    };
    setReviews(prev => [newReview, ...prev]);
    logActivity(`Added new review from ${review.author}`);
  };

  const updateReview = (review: Testimonial) => {
    setReviews(prev => prev.map(r => r.id === review.id ? review : r));
    logActivity(`Updated review by ${review.author}`);
  };

  const deleteReview = (id: string) => {
    const rev = reviews.find(r => r.id === id);
    setReviews(prev => prev.filter(r => r.id !== id));
    if (rev) {
      logActivity(`Deleted review from ${rev.author}`);
    }
  };

  const toggleReviewFeatured = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        const nextVal = !r.isFeatured;
        logActivity(`${nextVal ? 'Featured' : 'Unfeatured'} review from ${r.author} on homepage`);
        return { ...r, isFeatured: nextVal };
      }
      return r;
    }));
  };

  const updateAggregateRating = (rating: number, count: number) => {
    setBusinessInfo(prev => ({
      ...prev,
      rating,
      reviewCount: count
    }));
    logActivity(`Updated aggregate rating to ${rating} (${count.toLocaleString()} reviews)`);
  };

  const updateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info);
    logActivity('Updated restaurant business info & hours schedule');
  };

  const updateHomepageContent = (content: HomepageContent) => {
    setHomepageContent(content);
    logActivity('Refreshed homepage hero & brand copy');
  };

  const addPhoto = (photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => {
    const newPhoto: PhotoItem = {
      ...photo,
      id: 'photo-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setPhotos(prev => [newPhoto, ...prev]);
    logActivity(`Uploaded gallery photo "${photo.title}" (${photo.tag})`);
  };

  const deletePhoto = (id: string) => {
    const p = photos.find(item => item.id === id);
    setPhotos(prev => prev.filter(item => item.id !== id));
    if (p) {
      logActivity(`Removed photo "${p.title}" from gallery`);
    }
  };

  const bulkDeletePhotos = (ids: string[]) => {
    setPhotos(prev => prev.filter(item => !ids.includes(item.id)));
    logActivity(`Deleted ${ids.length} photos from gallery`);
  };

  const addTableRequest = (req: { name: string; contact: string; partySize: string; serviceType: string; requestedDateTime: string; message: string }) => {
    const newReq: TableRequest = {
      ...req,
      id: 'req-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setTableRequests(prev => [newReq, ...prev]);
    logActivity(`New table inquiry from ${req.name} (${req.partySize})`, 'Website Visitor');
  };

  const updateTableRequestStatus = (id: string, status: TableRequestStatus) => {
    setTableRequests(prev => prev.map(r => {
      if (r.id === id) {
        logActivity(`Marked table request from ${r.name} as ${status}`);
        return { ...r, status };
      }
      return r;
    }));
  };

  const addUser = (user: Omit<AdminUser, 'id' | 'lastLogin'>) => {
    const newUser: AdminUser = {
      ...user,
      id: 'user-' + Date.now(),
      lastLogin: 'Never'
    };
    setUsers(prev => [...prev, newUser]);
    logActivity(`Invited new staff user ${user.name} (${user.role})`);
  };

  const updateUser = (user: AdminUser) => {
    setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    logActivity(`Updated user permissions for ${user.name}`);
  };

  const deleteUser = (id: string) => {
    const u = users.find(item => item.id === id);
    setUsers(prev => prev.filter(item => item.id !== id));
    if (u) {
      logActivity(`Removed user account ${u.name}`);
    }
  };

  const resetToDefaults = () => {
    setBusinessInfo(INITIAL_BUSINESS_INFO);
    setMenuItems(INITIAL_MENU_ITEMS);
    setReviews(INITIAL_TESTIMONIALS);
    setHomepageContent(INITIAL_HOMEPAGE_CONTENT);
    setPhotos(INITIAL_PHOTOS);
    setTableRequests(INITIAL_TABLE_REQUESTS);
    setUsers(INITIAL_USERS);
    setActivityLogs(INITIAL_LOGS);
    logActivity('Reset all dashboard content to default factory seed values');
  };

  return (
    <RestaurantContext.Provider
      value={{
        businessInfo,
        menuItems,
        reviews,
        testimonials: reviews,
        homepageContent,
        photos,
        tableRequests,
        users,
        activityLogs,
        currentUser,
        currentView,
        setCurrentView,
        login,
        logout,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleMenuItemVisibility,
        reorderMenuItems,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewFeatured,
        updateAggregateRating,
        updateBusinessInfo,
        updateHomepageContent,
        addPhoto,
        deletePhoto,
        bulkDeletePhotos,
        addTableRequest,
        updateTableRequestStatus,
        addUser,
        updateUser,
        deleteUser,
        logActivity,
        resetToDefaults
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
