import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form, Badge, Card, InputGroup, Dropdown, Nav, ListGroup } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaBuilding, FaMapMarkerAlt, FaWarehouse, FaHome, FaTools, FaArrowRight } from "react-icons/fa";
import { FaBed, FaBath } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";


export default function App() {
    const [city, setCity] = useState("Islamabad");
    const [showFilters, setShowFilters] = useState(false);
    // city and location API 
    const [files, setFiles] = useState([]);
    const [coverIndex, setCoverIndex] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const cityLocationMap = {
        Lahore: [], Karachi: [], Islamabad: [], Rawalpindi: [], Multan: [],
        Faisalabad: [], Peshawar: [], Gujranwala: [], Sialkot: [], Hyderabad: [],
        Quetta: [], Bahawalpur: [], Sargodha: [], Sahiwal: [], Abbottabad: [],
        Murree: [], WahCantt: [], Mardan: [], Mansehra: [], Jhelum: [],
        AhmedpurEast: [], Arifwala: [], Attock: [], Bannu: [], Batkhela: [],
        Bhakkar: [], Burewala: [], Chakwal: [], Charsadda: [], Chiniot: [],
        Dadu: [], Daska: [], DeraGhaziKhan: [], DeraIsmailKhan: [], Gawadar: [],
        Gujrat: [], Hafizabad: [], Haripur: [], Jacobabad: [], Jaranwala: [],
        Jhang: [], Kamoke: [], Kasur: [], Khairpur: [], Khanewal: [],
        Khanpur: [], Khushab: [], Kohat: [], KotAddu: [], Kotli: [],
        Layyah: [], Lodhran: [], MandiBahauddin: [], MianChannu: [], Mianwali: [],
        MirpurAJK: [], MirpurKhas: [], Muzaffargarh: [], MuzaffarabadAJK: [],
        NankanaSahib: [], Narowal: [], Nawabshah: [], Okara: [], Pakpattan: [],
        RahimYarKhan: [], Sadiqabad: [], Sheikhupura: [], Shikarpur: [], Sukkur: [],
        Swabi: [], Swat: [], TandoAdam: [], TandoAllahyar: [], Taxila: [],
        TobaTekSingh: [], Vehari: [],
    };

    const handleTradeTypeSelect = (type) => setSelectedTradeTypeBtn(type);

    const onDrop = useCallback((acceptedFiles) => {
        const mapped = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles(curr => [...curr, ...mapped]);
        if (coverIndex === null && mapped.length) setCoverIndex(0);
    }, [coverIndex]);

    const { getRootProps, getInputProps } = useDropzone({ accept: { 'image/*': [] }, onDrop });

    useEffect(() => {
        return () => files.forEach(f => URL.revokeObjectURL(f.preview));
    }, [files]);

    useEffect(() => {
        if (!selectedCity || locationInput.length < 3) {
            setLocationSuggestions([]);
            return;
        }

        const fetchLocations = async () => {
            setLoading(true);
            try {
                const query = `${locationInput}, ${selectedCity}, Pakistan`;
                const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&limit=5&addressdetails=1&countrycodes=pk`;

                const res = await fetch(url);
                const data = await res.json();
                const suggestions = data.map((loc) => loc.display_name);
                setLocationSuggestions(suggestions);
            } catch (err) {
                console.error("Error fetching location suggestions:", err);
                setLocationSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(fetchLocations, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [locationInput, selectedCity]);

    useEffect(() => {
        setSelectedLocation('');
        setLocationInput('');
        setLocationSuggestions([]);
    }, [selectedCity]);

    const handleLocationSelect = (loc) => {
        setLocationInput(loc);
        setLocationSuggestions([]);
        setSelectedLocation(loc);
    };

    const [activeTab, setActiveTab] = useState("Homes");
    const [propertyType, setPropertyType] = useState("");
    const [budget, setBudget] = useState("");
    const [area, setArea] = useState("");

    const propertyTypes = {
        Homes: ["Houses", "Villas", "Appartment & Flats", "Farm House", "Hostels"],
        Plots: ["Residential Plot", "Commercial Plot", "Agricultural Land", "Commercial Land", "Plot File", "Plot Form"],
        Commercial: ["Office", "Shop", "Warehouse", "Factory", "Building", "Marriage Hall", "School Building", "Hostel Building", "Guest House", "Hospital Building", "Business",],
    };
    // condition: show bottom row only if all filters are selected
    const showBottomRow = city && propertyType && budget && area;


    // section 2 
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
    // browse-city section 
    const cities = [
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

    // section 5
    //   Form API Integration 
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // clear error if user types something
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    // Validate fields before submit
    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";
        return newErrors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // stop submission
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "https://bostangroupinc.com/api/qaQuestion/",
                formData
            );

            console.log("Response:", response.data);
            alert("Your question has been sent successfully!");
            setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero section  */}
            <section className='hero'>
                <div
                    style={{
                        position: "relative",
                        backgroundImage: "url('/images/newproject1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        minHeight: "500px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    {/* Overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.6)",
                        }}
                    />

                    <Container className="py-5" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                        {/* Heading */}
                        <h1 className="fw-bold mb-3">
                            Your home to find, our <br /> comfort achieved
                        </h1>
                        <p className="mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            Discover the latest real estate projects across Pakistan – only on Landdost.com
                        </p>

                        {/* Search Card */}
                        <div
                            className="shadow rounded p-3 bg-white"
                            style={{ maxWidth: "900px", margin: "0 auto" }}
                        >
                            {/* Top Row */}
                            <Row className="align-items-center g-3">
                                {/* City */}
                                <Col lg>
                                    <div className="small text-muted">City</div>
                                    <Dropdown onSelect={(val) => setCity(val)}>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="fw-semibold text-success p-0 border-0 text-decoration-none"
                                        >
                                            {city || "All Cities"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Karachi">Karachi</Dropdown.Item>
                                            <Dropdown.Item eventKey="Lahore">Lahore</Dropdown.Item>
                                            <Dropdown.Item eventKey="Islamabad">Islamabad</Dropdown.Item>
                                            <Dropdown.Item eventKey="Multan">Multan</Dropdown.Item>
                                            <Dropdown.Item eventKey="Faisalabad">Faisalabad</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                                {/* Property Type */}
                                <Col lg>
                                    <div className="small text-muted">Property Type</div>
                                    <Dropdown className="d-inline-block" onSelect={(val) => setPropertyType(val)}>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="fw-semibold text-success p-0 border-0 text-decoration-none"
                                        >
                                            {propertyType || "All"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ width: "350px", padding: "1rem" }}>
                                            <Nav
                                                variant="tabs"
                                                activeKey={activeTab}
                                                onSelect={(k) => setActiveTab(k)}
                                            >
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Homes">Homes</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Plots">Plots</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Commercial">Commercial</Nav.Link>
                                                </Nav.Item>
                                            </Nav>

                                            <div className="mt-3">
                                                {propertyTypes[activeTab].map((type, idx) => (
                                                    <Dropdown.Item eventKey={type} key={idx}>
                                                        <i className="bi bi-house-door me-2"></i> {type}
                                                    </Dropdown.Item>
                                                ))}
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                                {/* Budget */}
                                <Col lg>
                                    <div className="small text-muted">Budget Range</div>
                                    <Dropdown onSelect={(val) => setBudget(val)}>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="text-muted p-0 border-0 text-decoration-none"
                                        >
                                            {budget || "0 - Any"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="5 Lakh - 50 Lakh">
                                                5 Lakh - 50 Lakh
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="50 Lakh - 1 Crore">
                                                50 Lakh - 1 Crore
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="1 Crore - 5 Crore">
                                                1 Crore - 5 Crore
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                                {/* Area */}
                                <Col lg>
                                    <div className="small text-muted">Area Range</div>
                                    <Dropdown onSelect={(val) => setArea(val)}>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="text-muted p-0 border-0 text-decoration-none"
                                        >
                                            {area || "0 - Any"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="2 Marla - 5 Marla">
                                                2 Marla - 5 Marla
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="5 Marla - 10 Marla">
                                                5 Marla - 10 Marla
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="1 Kanal - 2 Kanal">
                                                1 Kanal - 2 Kanal
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                                {/* Search Button */}
                                <Col xs={12} md={12} lg="auto" className="text-center text-lg-end">
                                    <Button
                                        className="fw-semibold px-4 w-100 w-lg-auto"
                                        style={{ backgroundColor: "#33A137", border: "none" }}
                                    >
                                        <i className="bi bi-search me-1"></i> Search
                                    </Button>
                                </Col>
                            </Row>

                            {/* Bottom Row → only show when all filters selected */}
                            {showBottomRow && (
                                <>
                                    <hr />
                                    <Row className="g-3">
                                        {/* Project Title */}
                                        <Col lg>
                                            <div className="small text-muted">Project Title</div>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="link"
                                                    className="text-muted p-0 border-0 text-decoration-none"
                                                >
                                                    Select Projects
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Project A</Dropdown.Item>
                                                    <Dropdown.Item>Project B</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                        {/* Developer Title */}
                                        <Col lg>
                                            <div className="small text-dark fw-bold">Developer Title</div>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="link"
                                                    className="text-muted p-0 border-0 text-decoration-none"
                                                >
                                                    Select Developers
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Developer A</Dropdown.Item>
                                                    <Dropdown.Item>Developer B</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                        {/* Marketed By */}
                                        <Col lg="auto">
                                            <div
                                                className="p-2 rounded d-flex align-items-center"
                                                style={{ backgroundColor: "#f0fdf4" }}
                                            >
                                                <div>
                                                    <div className="small text-muted mb-0">Marketed By</div>
                                                    <div className="fw-semibold text-success">Landdost.com</div>
                                                </div>
                                                <div className="form-check form-switch ms-3">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </div>

                    </Container>
                </div>
            </section>

            {/* section 1 start  */}
            <section className="projects py-5 bg-white">
                <Container>
                    <h4 className="fw-semibold mb-4">Browse New Projects In Pakistan</h4>

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
            <section className="discover py-5 bg-white">
                <Container>
                    {/* Header */}
                    <Row className="mb-4 align-items-center">
                        <Col md={6}>
                            <h6 className="text-uppercase text-muted mb-1">Checkout our new</h6>
                            <h2 className="fw-bold">Discover New Projects</h2>
                            <p className="text-muted">
                                Find the latest Residential and Commercial projects across Pakistan – only on Landdost.com
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
                    <h4 className="fw-bold">Browse Projects by City in Pakistan</h4>
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
                    <h2 className="fw-bold">Find Residential Project by Landdost.com</h2>
                    <p className="text-muted" style={{ maxWidth: "500px" }}>
                        Discover the latest Residential projects across Pakistan – only on Landdost.com
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
            <section className="py-5" style={{ backgroundColor: "#d9fdd3", minHeight: "100vh", padding: "50px 0" }}>
                <Container>
                    <Row className="align-items-center">
                        {/* Left Side */}
                        <Col md={6} className="mb-4">
                            <h2 className="fw-bold mb-3">Let's Talk About Everything!</h2>
                            <p>
                                Hello there! If you'd like to ask us something, you can get in touch
                                with us here! We'd love to address any and all concerns you may have.
                            </p>

                            <div className="mt-4">
                                <h5 className="fw-bold">Head Office</h5>
                                <ul className="list-unstyled mt-3">
                                    <li className="mb-2">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-success" />
                                        7th Floor, Dolmen Executive Tower Karachi Pakistan
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faClock} className="me-2 text-success" />
                                        Monday to Saturday (9AM to 6PM)
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        {/* Right Side */}
                        <Col md={6}>
                            <Card className="p-4 shadow-sm border-0">
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="How should we address you?"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <div className="d-flex w-100">
                                            <span className="input-group-text bg-light">🇵🇰 +92</span>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Please enter a valid phone number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phone}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <div className="invalid-feedback d-block">{errors.phone}</div>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Your best email address?"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Subject *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="General Inquiry"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            isInvalid={!!errors.subject}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subject}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Message *</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="What would you like to say?"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        variant=""
                                        type="submit"
                                        className="w-100 fw-bold text-light"
                                        style={{ background: "#00A651" }}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Your Question"}
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* section 6  */}
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
