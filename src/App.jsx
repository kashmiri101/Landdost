import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form, Badge, Card, Accordion, Image, InputGroup, ListGroup } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaBuilding, FaMapMarkerAlt, FaWarehouse, FaHome, FaTools, FaArrowRight } from "react-icons/fa";
import { FaBed, FaBath } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faHome, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";




export default function App() {
  // State variables
  const [selectedCity, setSelectedCity] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState("");

  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Multan",
    "Faisalabad",
  ];

  const handleSearch = () => {
    console.log({
      selectedCity,
      locationInput,
      propertyType,
      priceRange,
      area,
      beds,
    });
  };
  // section 1 discover 
  const [show, setShow] = useState(false);

  const categories = [
    {
      title: "Property for Sale",
      items: [
        // Residential Section
        {
          section: "Residential", subItems: [
            "Houses",
            "Ground Portion",
            "Upper Portion",
            "Basement Portion",
            "Villas",
            "Apartment & Flats",
            "Farmhouse",
            "Guesthouse",
            "Hotels",
            "Roommates",
            "Host Residence",
            "Hostel Rooms",
          ]
        },
        // Commercial Section
        {
          section: "Commercial", subItems: [
            "Office",
            "Shop",
            "Warehouse",
            "Factory",
            "Building",
            "Marriage Hall",
            "School Building",
            "Hostel Building",
            "Hotel Building",
            "Guest House",
            "Hospital Building",
            "Business",
          ]
        },
        // Plots & Lands Section
        {
          section: "Plots & Lands", subItems: [
            "Residential Plots",
            "Commercial Plots",
            "Agricultural Land",
            "Commercial Land",
            "Plot File",
            "Plot Form",
          ]
        },
      ],
    },
    {
      title: "Property for Rent",
      items: [
        // Residential Section
        {
          section: "Residential", subItems: [
            "Houses",
            "Ground Portion",
            "Upper Portion",
            "Basement Portion",
            "Villas",
            "Apartment & Flats",
            "Farmhouse",
            "Guesthouse",
            "Hotels",
            "Roommates",
            "Host Residence",
            "Hostel Rooms",
          ]
        },
        // Commercial Section
        {
          section: "Commercial", subItems: [
            "Office",
            "Shop",
            "Warehouse",
            "Factory",
            "Building",
            "Marriage Hall",
            "School Building",
            "Hostel Building",
            "Hotel Building",
            "Guest House",
            "Hospital Building",
            "Business",
          ]
        },
        // Plots & Lands Section
        {
          section: "Plots & Lands", subItems: [
            "Residential Plots",
            "Commercial Plots",
            "Agricultural Land",
            "Commercial Land",
            "Plot File",
            "Plot Form",
          ]
        },
      ],
    },
    {
      title: "Projects",
      items: [
        // Projects Section
        {
          subItems: [
            "Residential",
            "Home ",
            "Villas ",
            "Basement Portion",
            "Apartment & Flats",
            "Farmhouse ",
            "Apartment ",
            "Plots ",
            "Penthouse ",
            "Agricultural Land",
          ]
        },
        // Commercial Section
        {
          section: "Commercial", subItems: [
            "Office",
            "Shop",
            "Floors ",
            "Building",
            "Plots ",
            "Industrial Land",
            "Commercial Plots",
          ]
        },
      ],
    },
    {
      title: "Business For Sale",
      items: [
        "Running Businesses",
        "Shops for Sale",
        "Restaurants for Sale",
        "Franchise Opportunities",
        "Industrial Units",
      ],
    },
    {
      title: "Construction Services",
      items: [
        // Building Material Section
        {
          section: "Building Materials Manufacturers", subItems: [
            "Cement companies",
            "Brick and block manufacturers",
            "Concrete manufacturers",
            "Steel and rebar producers",
            "Glass manufacturers",
            "Gypsum board / drywall manufacturers",
            "Roofing material producers",
          ]
        },
        // Construction Material Section
        {
          section: "Construction Material Suppliers / Distributors", subItems: [
            "Construction supply companies (wholesale & retail)",
            "Hardware and building supply stores (e.g., Home Depot, Bunnings)",
            "Electrical and plumbing supplies distributors",
            "Timber and lumber yards",
            "Stone and tile distributors",

          ]
        },
        // Specialized Material Section
        {
          section: "Specialized Material Companies", subItems: [
            "Timber and wood products",
            "Insulation materials (e.g., fiberglass, foam)",
            "Flooring (vinyl, hardwood, laminate, carpet)",
            "Paint and coatings",
            "Glass and glazing systems",
            "Adhesives, sealants, and waterproofing materials",
          ]
        },
        // Construction Chemicals & Additives Section
        {
          section: "Construction Chemicals & Additives", subItems: [
            "Concrete admixtures",
            "Waterproofing chemicals",
            "Sealants and bonding agents",
            "Epoxy and grouting materials",
            "Fireproofing products",
          ]
        },
        // Prefabricated Materials & Systems Section
        {
          section: "Prefabricated Materials & Systems", subItems: [
            "Precast concrete systems",
            "Modular building systems",
            "Steel frames and trusses",
            "Panelized wall systems",
          ]
        },
        // Importers & Traders Section
        {
          section: "Importers & Traders", subItems: [
            "Bulk material importers",
            "Multi-brand construction product traders",
            "Export/import firms for specialized items (e.g., marble, tiles)",
          ]
        },
        // Retail Chains / Outlets Section
        {
          section: "Retail Chains / Outlets", subItems: [
            "Large-scale retailers (e.g., Ace Hardware, Wickes)",
            "Franchise hardware stores",
            "Local building supply depots",
          ]
        },
      ],
    },
    {
      title: "Jobs Opportunities",
      items: [
        "Receptionist",
        "Executive Assistant",
        "Office Manager",
        "Data Entry Clerk",
        "Property Manager",
        "Assistant Property Manager",
        "Lease Administrator",
        "Tenancy Coordinator",
        "Facilities Coordinator",
        "Leasing Consultant",
        "Sales Administrator",
        "Client Relationship Manager",
        "Transaction Coordinator",
        "Accountant / Property Accountant",
        "Accounts Payable/Receivable Clerk",
        "Financial Analyst",
        "Payroll Specialist",
        "Billing Coordinator",
        "Marketing Coordinator",
        "Digital Marketing Specialist",
        "Social Media Manager",
        "Content Writer",
        "Graphic Designer",
        "Project Manager (Property Development)",
        "Development Coordinator",
        "Planning Analyst",
        "Construction Administrator",
        "IT Support Specialist",
        "Systems Administrator",
        "Property Management Software Specialist",
        "Data Analyst",
        "Legal Assistant",
        "Contract Administrator",
        "Compliance Officer",
        "Risk Analyst",
        "HR Coordinator",
        "Talent Acquisition Specialist",
        "Payroll & Benefits Officer",
        "Training & Development Manager",
        "Asset Manager",
        "Investment Analyst",
        "Portfolio Analyst",
        "Research Associate",
      ],
    },
  ];


  // section 1 
  // discover section 
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const discover = [
    { icon: <FaMapMarkerAlt size={30} color="#60a5fa" />, title: "Plots", projects: "509 Projects" },
    { icon: <FaBuilding size={30} color="#f87171" />, title: "Flats", projects: "509 Projects" },
    { icon: <FaWarehouse size={30} color="#38bdf8" />, title: "Apartments", projects: "509 Projects" },
    { icon: <FaHome size={30} color="#4ade80" />, title: "Houses", projects: "509 Projects" },
    { icon: <FaTools size={30} color="#a78bfa" />, title: "Construction", projects: "509 Projects" },
    { icon: <FaBuilding size={30} color="#f87171" />, title: "Flats", projects: "509 Projects" },
    { icon: <FaMapMarkerAlt size={30} color="#60a5fa" />, title: "Plots", projects: "509 Projects" },
    { icon: <FaWarehouse size={30} color="#38bdf8" />, title: "Apartments", projects: "509 Projects" },
    { icon: <FaHome size={30} color="#4ade80" />, title: "Houses", projects: "509 Projects" },
    { icon: <FaTools size={30} color="#a78bfa" />, title: "Construction", projects: "509 Projects" },
  ];

  // section 3 
  // projects section 
  const projects = [
    {
      id: 1,
      image: "/images/p1.jpg",
      badge: { text: "Popular", variant: "danger" },
      price: "$5,970",
      title: "Tranquil Haven in the Woods",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 2,
      image: "/images/p2.jpg",
      badge: { text: "New Listing", variant: "primary" },
      price: "$1,970",
      title: "Serene Retreat by the Lake",
      address: "1964 Jehovah Drive, VA 22408",
      beds: 3,
      baths: 2,
    },
    {
      id: 3,
      image: "/images/p3.jpg",
      badge: { text: "Discounted Price", variant: "success" },
      price: "$3,450",
      title: "Charming Cottage in the Meadow",
      address: "1508 Centennial Farm Road Harlan, 51537",
      beds: 4,
      baths: 4,
    },
    {
      id: 4,
      image: "/images/p4.jpg",
      badge: { text: "Popular", variant: "danger" },
      price: "$2,389",
      title: "Grand Estate on Elm Street",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 5,
      image: "/images/p5.jpg",
      badge: { text: "Popular", variant: "danger" },
      price: "$2,389",
      title: "Grand Estate on Elm Street",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 6,
      image: "/images/p6.png",
      badge: { text: "Popular", variant: "danger" },
      price: "$2,389",
      title: "Grand Estate on Elm Street",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 7,
      image: "/images/p7.webp",
      badge: { text: "Popular", variant: "danger" },
      price: "$2,389",
      title: "Grand Estate on Elm Street",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 8,
      image: "/images/p8.jpg",
      badge: { text: "Popular", variant: "danger" },
      price: "$2,389",
      title: "Grand Estate on Elm Street",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 1,
      type: "sell",  // <-- this is Sell content
      image: "/images/p1.jpg",
      badge: { text: "Popular", variant: "danger" },
      price: "$5,970",
      title: "Tranquil Haven in the Woods",
      address: "103 Wright Court Burien, WA 98168",
      beds: 4,
      baths: 3,
    },
    {
      id: 2,
      type: "buy", // <-- this is Buy content
      image: "/images/p2.jpg",
      badge: { text: "New Listing", variant: "primary" },
      price: "$1,970",
      title: "Serene Retreat by the Lake",
      address: "1964 Jehovah Drive, VA 22408",
      beds: 3,
      baths: 2,
    },
    {
      id: 3,
      type: "sell", // Sell content again
      image: "/images/p3.jpg",
      badge: { text: "Discounted Price", variant: "success" },
      price: "$3,450",
      title: "Charming Cottage in the Meadow",
      address: "1508 Centennial Farm Road Harlan, 51537",
      beds: 4,
      baths: 4,
    },

  ];

  const [filter, setFilter] = useState("all");

  // Filter projects based on selected filter
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  // section 3 
  //  Agencies by City 
  const citiees = [
    {
      name: "Lahore",
      projects: "500 Projects",
      image: "/images/lahore.jpg",
    },
    {
      name: "Islamabad",
      projects: "400 Projects",
      image: "/images/islamabad.jpg",
    },
    {
      name: "Multan",
      projects: "250 Projects",
      image: "/images/Multan.jpg",
    },
    {
      name: "Karachi",
      projects: "650 Projects",
      image: "/images/karachi.jpg",
    },

    {
      name: "Rawalpindi",
      projects: "320 Projects",
      image: "/images/rawalpindi.jpg",
    },
    {
      name: "Faisalabad",
      projects: "280 Projects",
      image: "/images/faislabad.jpg",
    },
    {
      name: "Peshawar",
      projects: "220 Projects",
      image: "/images/peshawar.jpg",
    },
    {
      name: "Quetta",
      projects: "180 Projects",
      image: "/images/queta.jpg",
    },
    {
      name: "Sialkot",
      projects: "150 Projects",
      image: "/images/sialkot.jpg",
    },
    {
      name: "Hyderabad",
      projects: "140 Projects",
      image: "/images/hyderabad.jpg",
    },
  ];


  // section 4 
  // international-projects section 
  const internationalproject = [
    {
      id: 1,
      img: "/images/int1.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 2,
      img: "/images/int2.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 3,
      img: "/images/int3.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 4,
      img: "/images/int4.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 1,
      img: "/images/int1.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 2,
      img: "/images/int2.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 3,
      img: "/images/int3.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 4,
      img: "/images/int4.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 1,
      img: "/images/int1.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 2,
      img: "/images/int2.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 3,
      img: "/images/int3.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    },
    {
      id: 4,
      img: "/images/int4.png",
      price: "PKR 1.56 Crore - 2.93 Crore",
      title: "Landdost House",
      location: "Landdost Housing Society, Lahore",
      area: "229 - 445 Sq. Yd.",
      features: "Plots"
    }
  ];

  // section 5 
  // reviews section 
  const reviews = [
    {
      id: 1,
      text: `Landdost.com helped me find the perfect 5 marla plot in Bahria Town. The process was smooth and transparent!`,
      author: "Ahmed Raza, Lahore"
    },
    {
      id: 2,
      text: `Very professional team and accurate listings. I found my dream apartment in Karachi within a week!`,
      author: "Nida Kamal, Karachi"
    },
    {
      id: 3,
      text: `Excellent customer support. They even connected me with a trusted real estate agent`,
      author: "Usman Sheikh, Islamabad"
    },

    {
      id: 4,
      text: `I listed my plot on landdost and got genuine leads within 2 days. Much better than other platforms.`,
      author: " Faisal Ali, Rawalpindi"
    },
    {
      id: 5,
      text: `Their website is user-friendly and I love the filters – helped me narrow down the exact area and price I wanted.`,
      author: " Sana Javed, Faisalabad"
    },
    {
      id: 6,
      text: `Finally, a real estate site that actually cares about the buyer. Landdost is truly helpful!`,
      author: "Kashif Mehmood, Gujranwala"
    },
    {
      id: 7,
      text: `As an overseas Pakistani, I was nervous to invest. Landdost guided me with complete trust and clarity`,
      author: " Mohsin Tariq, UAE"
    },
    {
      id: 8,
      text: `I subscribed to their WhatsApp alerts and got instant updates on new plots in DHA. Very helpful!`,
      author: " Hassan Butt, Lahore"
    },
    {
      id: 9,
      text: `Their verified listings saved me from fake dealers. Thank you Landdost!`,
      author: " Anam Shah, Sialkot"
    },
    {
      id: 10,
      text: `Investing in a commercial property became so much easier with Landdost. Highly recommended!`,
      author: " Imran Arif, Multan"
    },
    {
      id: 11,
      text: `They have a great range of societies listed – even the new upcoming ones I couldn't find anywhere else.`,
      author: "  Rabia Akhtar, Peshawar"
    },
    {
      id: 12,
      text: `Landdost’s agent network is very reliable. I got professional advice without any pressure to buy.`,
      author: " Shahid Nawaz, Hyderabad"
    },
    {
      id: 13,
      text: `The layout and design of the website is simple yet effective. Love the experience!`,
      author: "  Ali Haider, Bahawalpur"
    },
    {
      id: 14,
      text: `I sold my 10 marla plot through Landdost in less than a month. Amazing exposure!`,
      author: " Naveed Khan, Islamabad"
    },
    {
      id: 15,
      text: `From browsing to final purchase, everything was smooth thanks to Landdost’s guidance.`,
      author: "  Hira Azeem, Lahore"
    },
    {
      id: 16,
      text: `Great for comparing prices across different societies. Helped me make an informed decision.`,
      author: " Junaid Farooq, Karachi"
    },
    {
      id: 17,
      text: `I use Landdost every day to check market trends and listings. It’s my go-to platform now.`,
      author: " Zara Amin, Rawalpindi"
    },
    {
      id: 18,
      text: `They keep their listings updated – no more calling on dead numbers like other websites!`,
      author: "Bilal Hussain, Sargodha"
    },
    {
      id: 19,
      text: `As an overseas Pakistani, I was nervous to invest. Landdost guided me with complete trust and clarity`,
      author: "Mehak Khan, Lahore"
    },
    {
      id: 20,
      text: `Secure, easy, and efficient. Landdost has changed the way we search for property in Pakistan.`,
      author: " Tariq Mehmood, Abbottabad"
    },

  ];
  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "28px",
    height: "28px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer"
  };

  // section 6 
  // faq section 

  const faqData = [
    {
      question: " What is LandDost.com?",
      answer:
        "LandDost.com is an online real estate platform that connects buyers, sellers, landlords, and renters across Pakistan. We offer verified property listings, market insights, and expert assistance to help you make informed real estate decisions.",
    },
    {
      question: " How is LandDost.com different from traditional real estate agents?",
      answer:
        "Unlike traditional agents, LandDost.com gives you 24/7 access to thousands of property listings online, complete with images, prices, and location maps. We also offer expert support, property valuation tools, and project updates in real-time.",
    },
    {
      question: "Is it free to list my property on LandDost.com?",
      answer:
        "Yes, individuals can list their property for free. However, we also offer premium listing options to give your property more visibility on our platform.",
    },
    {
      question: "How do I search for properties on LandDost.com?",
      answer:
        "Simply use our search bar to filter properties by city, area, type, price range, or purpose (buy/rent). You can also use our map view to explore property locations visually.",
    },
    {
      question: "Can I trust the listings on LandDost.com?",
      answer:
        "We work hard to ensure quality and trust. Most listings are verified, and we regularly monitor the platform for accuracy. However, we always recommend visiting the property and verifying documentation before making any transactions.",
    },
    {
      question: "Do you offer services for real estate agents and developers?",
      answer:
        "Absolutely! Real estate agents and property developers can create business profiles, post multiple listings, and reach a larger audience through targeted marketing solutions on LandDost.com.",
    },
    {
      question: "Does LandDost.com help with home loans or legal advice?",
      answer:
        "Yes, we offer guidance through our partner network of banks and legal experts. Whether it’s mortgage consultation or property legal verification, we’re here to help.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team via the Contact Us page on our website, email us at support@landdost.com, or call our helpline during business hours. We’re always ready to assist you.",
    },
  ];
  const [activeKey, setActiveKey] = useState(null);

  // slider section 
  const [activeIndex, setActiveIndex] = useState(0);

  // 👇 Messages for each slide
  const bottomTexts = [
    "Most popular locations for Plots",
    "Most popular locations for Flats",
    "Most popular locations for Houses",
    "Popular Cities to Buy Properties",
  ];
  const cityData = [
    {
      city: "Lahore",
      locations: [
        "Plots for sale in DHA Defence (9,843)",
        "Plots for sale in Raiwind Road (3,349)",
        "Plots for sale in Park View City (2,314)",
        "Plots for sale in Bahria Town (1,902)",
        "Plots for sale in Bahria Orchard (1,663)",
        "Plots for sale in LDA Avenue (1,324)",
        "Plots for sale in Central Park Housing (1,085)",
        "Plots for sale in LDA Road (1,048)",
      ],
    },
    {
      city: "Karachi",
      locations: [
        "Plots for sale in Scheme 33 (3,119)",
        "Plots for sale in DHA Defence (2,376)",
        "Plots for sale in Gadap Town (1,587)",
        "Plots for sale in DHA City Karachi (1,295)",
        "Plots for sale in Bahria Town Karachi (1,103)",
        "Plots for sale in Naya Nazimabad (444)",
        "Plots for sale in Malir (230)",
        "Plots for sale in Gulistan-e-Jauhar (207)",
      ],
    },
    {
      city: "Islamabad",
      locations: [
        "Plots for sale in DHA Defence (5,346)",
        "Plots for sale in Gulberg (2,939)",
        "Plots for sale in Bahria Town (2,374)",
        "Plots for sale in B-17 (2,324)",
        "Plots for sale in Top City 1 (1,128)",
        "Plots for sale in Faisal Hills (921)",
        "Plots for sale in Faisal Town - F-18 (737)",
        "Plots for sale in D-12 (682)",
      ],
    },
    {
      city: "Lahore",
      locations: [
        "Plots for sale in DHA Defence (9,843)",
        "Plots for sale in Raiwind Road (3,349)",
        "Plots for sale in Park View City (2,314)",
        "Plots for sale in Bahria Town (1,902)",
        "Plots for sale in Bahria Orchard (1,663)",
        "Plots for sale in LDA Avenue (1,324)",
        "Plots for sale in Central Park Housing (1,085)",
        "Plots for sale in LDA Road (1,048)",
      ],
    },
    {
      city: "Karachi",
      locations: [
        "Plots for sale in Scheme 33 (3,119)",
        "Plots for sale in DHA Defence (2,376)",
        "Plots for sale in Gadap Town (1,587)",
        "Plots for sale in DHA City Karachi (1,295)",
        "Plots for sale in Bahria Town Karachi (1,103)",
        "Plots for sale in Naya Nazimabad (444)",
        "Plots for sale in Malir (230)",
        "Plots for sale in Gulistan-e-Jauhar (207)",
      ],
    },
    {
      city: "Islamabad",
      locations: [
        "Plots for sale in DHA Defence (5,346)",
        "Plots for sale in Gulberg (2,939)",
        "Plots for sale in Bahria Town (2,374)",
        "Plots for sale in B-17 (2,324)",
        "Plots for sale in Top City 1 (1,128)",
        "Plots for sale in Faisal Hills (921)",
        "Plots for sale in Faisal Town - F-18 (737)",
        "Plots for sale in D-12 (682)",
      ],
    },
  ];





  return (
    <>
      {/* Hero section  */}
      <section className="hero">
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6) url('/images/indexHero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Container>
            {/* Heading */}
            <h1 className="fw-bold display-5">Find Properties for Sale Across Pakistan</h1>
            <p className="lead" style={{ maxWidth: "650px", margin: "0 auto" }}>
              Explore a wide range of properties available for sale and rent in major cities across Pakistan.
            </p>

            {/* Category Buttons */}
            {/* Category Buttons */}
            <div className="mt-4 mb-5">
              <Button variant=""
                className="mx-2 px-4 py-2 fw-semibold border-light text-light"
                style={{ background: "#33A137" }} > BUY
              </Button>
              <Button
                variant=""
                className="mx-2 px-4 py-2 fw-semibold text-light border-light" >
                SELL
              </Button>
              <Button
                variant=""
                className="mx-2 px-4 py-2 fw-semibold border-light text-light"
                style={{ background: "#33A137" }} >
                RENT
              </Button>
               </div>

            {/* Search Bar */}
            <Form>
              <div
                className="p-3 rounded shadow-lg"
                style={{ backgroundColor: "white", color: "black", maxWidth: "900px", margin: "0 auto" }}
              >
                <Row className="g-2">
                  {/* City Dropdown */}
                  <Col lg={4}>
                    <Form.Group className="rounded bg-light border">
                      <Form.Select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="shadow-none bg-light"
                      >
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city.replace(/([A-Z])/g, " $1").trim()}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* Location Input */}
                  <Col lg={6}>
                    <Form.Group className="rounded bg-light border position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Type location here"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        autoComplete="off"
                        className="shadow-none bg-light"
                        onFocus={() => setShowFilters(true)}
                      />
                    </Form.Group>
                  </Col>

                  {/* Find Button */}
                  <Col lg={2}>
                    <Button
                      variant="light"
                      className="w-100 border text-light"
                      style={{ background: "#33A137" }}
                      onClick={handleSearch}
                    >
                      FIND
                    </Button>
                  </Col>
                </Row>

                {/* Second Row - Extra Filters */}
                {showFilters && (
                  <Row className="mt-3 g-2">
                    <Col lg={3}>
                      <Form.Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                        <option value="">Property Type</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                        <option value="Plot">Plot</option>
                      </Form.Select>
                    </Col>
                    <Col lg={3}>
                      <Form.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value="">Price</option>
                        <option value="Below 50 Lakh">Below 50 Lakh</option>
                        <option value="50 Lakh - 1 Crore">50 Lakh - 1 Crore</option>
                        <option value="Above 1 Crore">Above 1 Crore</option>
                      </Form.Select>
                    </Col>
                    <Col lg={3}>
                      <Form.Select value={area} onChange={(e) => setArea(e.target.value)}>
                        <option value="">Area (Marla)</option>
                        <option value="3 Marla">3 Marla</option>
                        <option value="5 Marla">5 Marla</option>
                        <option value="10 Marla">10 Marla</option>
                        <option value="1 Kanal">1 Kanal</option>
                      </Form.Select>
                    </Col>
                    <Col lg={3}>
                      <Form.Select value={beds} onChange={(e) => setBeds(e.target.value)}>
                        <option value="">Beds</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                      </Form.Select>
                    </Col>
                  </Row>
                )}
              </div>
            </Form>
          </Container>
        </div>
      </section>


      {/* section 1 start  */}
      <section className="discover py-5 bg-white">
        <Container>
          <div className="mega-menu-wrapper">
            <button className="mega-menu-toggle mb-3 fs-4 fw-bold" onClick={() => setShow(!show)}>
              Explore Categories {show ? "▲" : "▼"}
            </button>

            {show && (
              <div className="mega-menu">
                {categories.map((cat, index) => (
                  <div key={index} className="mega-menu-column">
                    <h6>{cat.title}</h6>
                    <ul>
                      {cat.items.map((item, idx) => (
                        typeof item === "string" ? (
                          <li key={idx}>{item}</li>
                        ) : (
                          <li key={idx}>
                            <strong>{item.section}</strong>
                            <ul style={{ paddingLeft: "15px", marginTop: "5px" }}>
                              {item.subItems.map((sub, subIdx) => (
                                <li key={subIdx}>{sub}</li>
                              ))}
                            </ul>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={5}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 10 },
              480: { slidesPerView: 2.5, spaceBetween: 10 },
              576: { slidesPerView: 3, spaceBetween: 12 },
              768: { slidesPerView: 4, spaceBetween: 15 },
              992: { slidesPerView: 5, spaceBetween: 15 },
              1200: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {discover.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="d-flex align-items-center gap-2 rounded p-2 p-sm-3"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    minHeight: 60,
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-start">
                    <p className="mb-0 fw-semibold" style={{ fontSize: "13px", lineHeight: 1.2 }}>
                      {item.title}
                    </p>
                    <small className="text-muted" style={{ fontSize: "11px" }}>
                      {item.projects}
                    </small>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div
              ref={prevRef}
              className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: "50%",
                left: 5,
                transform: "translateY(-50%)",
                zIndex: 10,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                fontSize: "18px",
              }}
            >
              &#8249;
            </div>

            <div
              ref={nextRef}
              className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: "50%",
                right: 5,
                transform: "translateY(-50%)",
                zIndex: 10,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                fontSize: "18px",
              }}
            >
              &#8250;
            </div>
          </Swiper>
        </Container>
      </section>

      {/* section 2  */}
      <section className="projects py-5 bg-white">
        <Container>
          {/* Header */}
          <Row className="mb-4 align-items-center">
            <Col md={6}>
              <h6 className="text-uppercase text-muted mb-1">Checkout our new</h6>
              <h2 className="fw-bold">Discover New Projects</h2>
              <p className="text-muted">
                Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec
                dignissim purus.
              </p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Button
                variant={filter === "all" ? "#33A137" : "outline-#33A137"}
                className="me-2 text-light"
                style={{ background: "#33A137" }}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "sell" ? "success" : "outline-success"}
                className="me-2"
                onClick={() => setFilter("sell")}
                style={{ borderColor: "#33A137" }}
              >
                Sell
              </Button>
              <Button
                variant={filter === "buy" ? "success" : "outline-success"}
                onClick={() => setFilter("buy")}
                style={{ borderColor: "#33A137" }}
              >
                Buy
              </Button>
            </Col>
          </Row>

          {/* Projects Grid */}
          <Row>
            {filteredProjects.map((project) => (
              <Col key={project.id} lg={3} md={6} className="mb-4">
                <Card className="shadow-sm border-0 h-100">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={project.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Badge
                      bg={project.badge.variant}
                      className="position-absolute"
                      style={{ top: "10px", left: "10px" }}
                    >
                      {project.badge.text}
                    </Badge>
                  </div>
                  <Card.Body>
                    <h5 className="fw-bold">{project.price}</h5>
                    <Card.Title className="mb-1">{project.title}</Card.Title>
                    <Card.Text
                      className="text-muted mb-2"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {project.address}
                    </Card.Text>
                    <div className="d-flex text-muted" style={{ fontSize: "0.85rem" }}>
                      <div className="me-3 d-flex align-items-center">
                        <FaBed className="me-1" /> {project.beds} Beds
                      </div>
                      <div className="d-flex align-items-center">
                        <FaBath className="me-1" /> {project.baths} Bath
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* section 3  */}
      <section className="browse-cities py-5 bg-white">
        <Container>
          <h4 className="fw-bold">Browse Properties by City in Pakistan</h4>
          <p className="mb-4">Explore a wide range of properties available for sale and rent in major cities across Pakistan.</p>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-next-btn",
            }}
            breakpoints={{
              0: { slidesPerView: 1.3 },
              576: { slidesPerView: 2.3 },
              768: { slidesPerView: 3.2 },
              992: { slidesPerView: 4 },
            }}
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 border rounded-3 bg-white align-items-center gap-3">
                  <div>
                    {/* City Image */}
                    <img
                      src={city.image}
                      alt={city.name}
                      className="img-fluid rounded mb-3"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <h6 className="fw-semibold mb-1">{city.name}</h6>
                    <p className="mb-0 text-muted small">{city.projects}</p>
                  </div>
                  <div className="mt-3">
                    <span>
                      <a href="#" className="text-decoration-none text-dark fw-bold">
                        View more
                      </a>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Right Arrow */}
            <div
              className="swiper-next-btn d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#33A137",
                color: "#fff",
                borderRadius: "50%",
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                cursor: "pointer",
              }}
            >
              <FaArrowRight />
            </div>
          </Swiper>
        </Container>
      </section>

      {/* section 4  */}
      <section className="international-project py-5">
        <Container>
          <h2 className="fw-bold">Project by Landdost</h2>
          <p className="text-muted" style={{ maxWidth: "500px" }}>
            Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus.
          </p>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              nextEl: ".custom-next",
              prevEl: null // disables left arrow
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 }
            }}
          >
            {internationalproject.map((item) => (
              <SwiperSlide key={item.id}>
                <Card className="h-100 shadow-sm border-0 project-card">
                  <Card.Img variant="top" src={item.img} className="project-img" />
                  <Card.Body>
                    <Card.Text className="fw-bold text-dark price-text">
                      {item.price}
                    </Card.Text>
                    <Card.Title className="fw-semibold project-title">
                      {item.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      {item.location}
                    </Card.Text>
                    <Card.Text className="small text-muted mb-0">{item.area}</Card.Text>
                    <Card.Text className="small text-muted">{item.features}</Card.Text>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Right Navigation Button */}
          <div className="custom-next">&#8250;</div>
        </Container>
      </section>

      {/* slider section  */}
      <section className="py-5">
        <Container>
          {/* Fixed Heading */}
          <h3 className="fw-bold mb-4 text-success text-center">
            Most Popular Locations
          </h3>

          {/* Dynamic Bottom Text */}
          <div className="mt-5">
            <h4 className="text-dark fw-bold">
              {bottomTexts[activeIndex % bottomTexts.length]}
            </h4>
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {cityData.map((city, idx) => (
              <SwiperSlide key={idx}>
                <Card className="shadow-sm border-0 rounded-3 h-100">
                  <Card.Body>
                    <h5 className="fw-bold text-dark mb-3">{city.city}</h5>
                    <ListGroup variant="flush">
                      {city.locations.map((loc, i) => (
                        <ListGroup.Item
                          key={i}
                          className="border-0 px-0 py-2 text-secondary location-link"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-arrow-up-right me-2"></i>
                          {loc}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>


      {/* section 5  */}
      <section className="reviews py-5 bg-light position-relative">
        <Container>
          <h3 className="fw-bold text-center mb-4">⭐️ Client Reviews for landdost.com</h3>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev"
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass:
                "swiper-pagination-bullet bg-success rounded-circle mx-1",
              bulletActiveClass: "opacity-100"
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            loop={true}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <p className="mx-auto text-center text-secondary" style={{ maxWidth: "900px" }}>
                  {review.text}
                </p>
                <p className="text-center fw-bold text-success">
                  {review.author}
                </p>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div
              className="custom-prev"
              style={{ ...buttonStyle, left: "0" }}
            >
              &#8249;
            </div>
            <div
              className="custom-next"
              style={{ ...buttonStyle, right: "0" }}
            >
              &#8250;
            </div>

            {/* Pagination */}
            <div className="custom-pagination d-flex justify-content-center mt-3"></div>
          </Swiper>
        </Container>
      </section>

      {/* section 6  */}
      <section className="faq py-5">
        <Container>
          <h3 className="text-center fw-bold mb-4">
            Frequently Asked Questions – <span style={{ cursor: "pointer" }}>LandDost.com</span>
          </h3>
          <Accordion
            activeKey={activeKey}
            onSelect={(key) => setActiveKey(activeKey === key ? null : key)}
          >
            {faqData.map((item, index) => (
              <Accordion.Item
                eventKey={index.toString()}
                key={index}
                className="faq-item"
              >
                <Accordion.Header
                  onClick={() =>
                    setActiveKey(
                      activeKey === index.toString() ? null : index.toString()
                    )
                  }
                >
                  <div className="faq-icon">
                    {activeKey === index.toString() ? (
                      <FaMinus size={14} />
                    ) : (
                      <FaPlus size={14} />
                    )}
                  </div>
                  <span className="faq-text">{item.question}</span>
                </Accordion.Header>

                <Accordion.Collapse eventKey={index.toString()}>
                  <div className="accordion-body">{item.answer}</div>
                </Accordion.Collapse>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* section 7  */}
      <section className="FAQ py-5 bg-white">
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted mb-5">
            Explore videos of our projects, events, and updates, showcasing the journey of turning dreams into reality with Landdost
          </p>

          <Row className="g-4">
            {/* Video 1 */}
            <Col lg={4} md={6} sm={12}>
              <div className="position-relative">
                <Image
                  src="/images/p1.jpg"
                  alt="FAQ 2"
                  fluid
                  rounded
                  className="shadow-sm w-100"
                />
                <a
                  href="https://www.youtube.com/watch?v=VIDEO_ID_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center bg-white bg-opacity-75 rounded-circle"
                  style={{ width: '70px', height: '70px' }}
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" color="#FF0000" />
                </a>
              </div>
            </Col>


            {/* Video 2 */}
            <Col lg={4} md={6} sm={12}>
              <div className="position-relative">
                <Image
                  src="/images/faq2.png"
                  alt="FAQ 2"
                  fluid
                  rounded
                  className="shadow-sm w-100"
                />
                <a
                  href="https://www.youtube.com/watch?v=VIDEO_ID_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center bg-white bg-opacity-75 rounded-circle"
                  style={{ width: '70px', height: '70px' }}
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" color="#FF0000" />
                </a>
              </div>
            </Col>

            {/* Video 3 */}
            <Col lg={4} md={6} sm={12} className="mx-md-auto">
              <div className="position-relative">
                <Image
                  src="/images/faq3.png"
                  alt="FAQ 3"
                  fluid
                  rounded
                  className="shadow-sm w-100"
                />
                <a
                  href="https://www.youtube.com/watch?v=VIDEO_ID_3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center bg-white bg-opacity-75 rounded-circle"
                  style={{ width: '70px', height: '70px' }}
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" color="#FF0000" />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section 8  */}
      <section className="agent py-5" style={{ background: "#62B563" }}>
        <Container>
          <Row className="align-items-center gy-4">
            {/* Image Column */}
            <Col lg={5} md={12}>
              <img
                src="images/agent.png"
                alt="Visa"
                className="img-fluid w-100"
              />
            </Col>

            {/* Text Column */}
            <Col lg={4} md={12}>
              <div>
                <h4 className="fw-bold">Become a Agent.</h4>
                <p className="mb-0 text-muted">
                  Join Landdost and grow your real estate career with trust, tools, and top listings.
                </p>
              </div>
            </Col>

            {/* Button Column */}
            <Col lg={3} md={12} className="text-md-start">
              <div>
                <Link to="/Contact">
                  <button className="btn bg-white rounded-pill py-2 px-4">
                    Register Now
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* newletter  */}
      <section className="newsletter py-5" style={{ backgroundColor: "#1F1F1F", color: "#BDBDBD" }}>
        <Container>
          <Row className="align-items-center text-center text-md-start gy-4">
            {/* Social Media Icons */}
            <Col lg={4} md={6}>
              <p className="fw-semibold mb-2">Follow Us on</p>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="cursor-pointer bg-light rounded-pill p-1 text-success"
                />
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="cursor-pointer bg-light rounded-pill p-1 text-success"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer bg-light rounded-pill p-1 text-success"
                />
              </div>
            </Col>

            {/* Company Name */}
            <Col lg={4} md={6}>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                <FontAwesomeIcon
                  icon={faHome}
                  className="bg-light p-2 bg-light rounded-pill p-1 text-success"
                />
                <h5 className="mb-0">www.landdost.com</h5>

              </div>
            </Col>

            {/* Newsletter */}
            <Col lg={4} md={12}>
              <h6 className="mb-2 text-center text-md-start">
                Subscribe to our<br></br> Newsletter!
              </h6>
              <InputGroup>
                <Form.Control type="email" placeholder="Email Address" />
                <Button
                  variant=""
                  style={{ background: "#62B563", color: "white" }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <hr className="mt-5"></hr>
      </section>




    </>
  )
}
