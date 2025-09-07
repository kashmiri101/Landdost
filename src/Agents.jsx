import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col, Button, Card, InputGroup, Form } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export default function Agents() {

  // section 1 
    const [city, setCity] = useState("Islamabad");
    const [showFilters, setShowFilters] = useState(false);
    // city and location API 
    const [files, setFiles] = useState([]);
    const [coverIndex, setCoverIndex] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
      company_name: '',
      buy_or_sell: '',
      title: '',
      description: '',
      email: '',
      mobile: '',
      landline: '',
    });
  
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


  return (
    <>
      {/* section 1  */}
      <section>
        <div
          className="py-5"
          style={{
            background: "linear-gradient(to right, #e8f5e9, #f1f8f6)",
            backgroundImage: "url('/images/int1.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "cover",
            height: "70vh",
          }}
        >
          <Container className="text-center" style={{marginTop:"120px"}}>
            {/* Heading */}
            <h2 className="fw-bold text-light">
              Find Top Real Estate Agents in Pakistan
            </h2>
            <p className="text-light mb-4">
              Search the real estate agents in Pakistan dealing in properties for
              sale and rent.
            </p>

            {/* Search Form */}
            <div
              className="mt-5 p-3 rounded shadow-lg"
              style={{
                backgroundColor: "white",
                color: "black",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {/* First Row */}
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
                      {Object.keys(cityLocationMap).map((city) => (
                        <option key={city} value={city}>
                          {city.replace(/([A-Z])/g, " $1").trim()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Location Input */}
                <Col lg={6}>
                  <Form.Group className="rounded bg-light border">
                    <Form.Control
                      type="text"
                      placeholder="Type location here"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      autoComplete="off"
                      className="shadow-none bg-light"
                      onFocus={() => setShowFilters(true)}
                    />
                    {loading && <div className="position-absolute mt-1">Loading...</div>}
                    {locationSuggestions.length > 0 && (
                      <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}>
                        {locationSuggestions.map((loc, i) => (
                          <li
                            key={i}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleLocationSelect(loc)}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Form.Group>
                </Col>

                {/* Find Button */}
                <Col lg={2}>
                  <Button variant="light" className="w-100 border text-light" style={{ background: "#33A137" }}>
                    FINDE
                  </Button>
                </Col>
              </Row>

              {/* Second Row - Extra Filters */}
              {showFilters && (
                <Row className="mt-3 g-2">
                  {/* Property Type */}
                  <Col lg={3}>
                    <Form.Select>
                      <option>Property Type</option>
                      <option>House</option>
                      <option>Flat</option>
                      <option>Plot</option>
                    </Form.Select>
                  </Col>

                  {/* Price */}
                  <Col lg={3}>
                    <Form.Select>
                      <option>Price</option>
                      <option>Below 50 Lakh</option>
                      <option>50 Lakh - 1 Crore</option>
                      <option>Above 1 Crore</option>
                    </Form.Select>
                  </Col>

                  {/* Area (Marla) */}
                  <Col lg={3}>
                    <Form.Select>
                      <option>Area (Marla)</option>
                      <option>3 Marla</option>
                      <option>5 Marla</option>
                      <option>10 Marla</option>
                      <option>1 Kanal</option>
                    </Form.Select>
                  </Col>

                  {/* Beds */}
                  <Col lg={3}>
                    <Form.Select>
                      <option>Beds</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </Form.Select>
                  </Col>
                </Row>
              )}

              {/* Bottom Links */}
              <Row className="mt-2">
                <Col className="text-start">
                  <a href="#" className="me-3 text-muted small">
                    ▾ More Options
                  </a>
                  <a href="#" className="me-3 text-primary small">
                    Change Currency
                  </a>
                  <a href="#" className="me-3 text-primary small">
                    Change Area Unit
                  </a>
                  <a href="#" className="text-danger small">
                    Reset Search
                  </a>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

      </section>

      {/* section 2  */}
      <section className='py-5'>
        <Container>
          <Row className='gy-4 justify-content-center'>

            <Col lg={6} md={12} sm={12} xs={12}>
              <a href="/AgentdetailPage" className='text-decoration-none'>
                <div className="card rounded-0 py-4">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Profile Image */}
                      <div className="col-lg-3 col-md-4 col-sm-4 col-12 text-center mb-3 mb-sm-0">
                        <img
                          src="images/profile-pic.png"
                          alt="Profile"
                          className="img-fluid h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-lg-9 col-md-8 col-sm-8 col-12 text-sm-start text-center">
                        <div className="card-detail mt-2 mt-sm-3">
                          <h5 className="mb-1">Courtney claytor</h5>
                          <span style={{ fontSize: "12px" }}>
                            Assosiate <br /> Licensed in CO
                          </span>
                        </div>
                        <div className="mt-3 mt-sm-4">
                          <span className="me-2 d-block d-sm-inline">Parker</span>
                          <span className="d-block d-sm-inline">RE/MAX Alliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Keep Buttons SAME as your code — just responsive */}
              <div
                className="col-lg-12 mt-4 d-flex flex-column flex-sm-row"
                style={{ position: "relative", bottom: "24px" }}
              >
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Details
                </button>
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Email
                </button>
                <button
                  className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0"
                  style={{ width: "100%", maxWidth: "794px" }}
                >
                  Contact
                </button>
              </div>
            </Col>

            <Col lg={6} md={12} sm={12} xs={12}>
              <a href="/AgentdetailPage" className='text-decoration-none'>
                <div className="card rounded-0 py-4">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Profile Image */}
                      <div className="col-lg-3 col-md-4 col-sm-4 col-12 text-center mb-3 mb-sm-0">
                        <img
                          src="images/profile-pic.png"
                          alt="Profile"
                          className="img-fluid h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-lg-9 col-md-8 col-sm-8 col-12 text-sm-start text-center">
                        <div className="card-detail mt-2 mt-sm-3">
                          <h5 className="mb-1">Courtney claytor</h5>
                          <span style={{ fontSize: "12px" }}>
                            Assosiate <br /> Licensed in CO
                          </span>
                        </div>
                        <div className="mt-3 mt-sm-4">
                          <span className="me-2 d-block d-sm-inline">Parker</span>
                          <span className="d-block d-sm-inline">RE/MAX Alliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Keep Buttons SAME as your code — just responsive */}
              <div
                className="col-lg-12 mt-4 d-flex flex-column flex-sm-row"
                style={{ position: "relative", bottom: "24px" }}
              >
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Details
                </button>
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Email
                </button>
                <button
                  className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0"
                  style={{ width: "100%", maxWidth: "794px" }}
                >
                  Contact
                </button>
              </div>
            </Col>

            <Col lg={6} md={12} sm={12} xs={12}>
              <a href="/AgentdetailPage" className='text-decoration-none'>
                <div className="card rounded-0 py-4">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Profile Image */}
                      <div className="col-lg-3 col-md-4 col-sm-4 col-12 text-center mb-3 mb-sm-0">
                        <img
                          src="images/profile-pic.png"
                          alt="Profile"
                          className="img-fluid h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-lg-9 col-md-8 col-sm-8 col-12 text-sm-start text-center">
                        <div className="card-detail mt-2 mt-sm-3">
                          <h5 className="mb-1">Courtney claytor</h5>
                          <span style={{ fontSize: "12px" }}>
                            Assosiate <br /> Licensed in CO
                          </span>
                        </div>
                        <div className="mt-3 mt-sm-4">
                          <span className="me-2 d-block d-sm-inline">Parker</span>
                          <span className="d-block d-sm-inline">RE/MAX Alliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Keep Buttons SAME as your code — just responsive */}
              <div
                className="col-lg-12 mt-4 d-flex flex-column flex-sm-row"
                style={{ position: "relative", bottom: "24px" }}
              >
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Details
                </button>
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Email
                </button>
                <button
                  className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0"
                  style={{ width: "100%", maxWidth: "794px" }}
                >
                  Contact
                </button>
              </div>
            </Col>

            <Col lg={6} md={12} sm={12} xs={12}>
              <a href="/AgentdetailPage" className='text-decoration-none'>
                <div className="card rounded-0 py-4">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Profile Image */}
                      <div className="col-lg-3 col-md-4 col-sm-4 col-12 text-center mb-3 mb-sm-0">
                        <img
                          src="images/profile-pic.png"
                          alt="Profile"
                          className="img-fluid h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-lg-9 col-md-8 col-sm-8 col-12 text-sm-start text-center">
                        <div className="card-detail mt-2 mt-sm-3">
                          <h5 className="mb-1">Courtney claytor</h5>
                          <span style={{ fontSize: "12px" }}>
                            Assosiate <br /> Licensed in CO
                          </span>
                        </div>
                        <div className="mt-3 mt-sm-4">
                          <span className="me-2 d-block d-sm-inline">Parker</span>
                          <span className="d-block d-sm-inline">RE/MAX Alliance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Keep Buttons SAME as your code — just responsive */}
              <div
                className="col-lg-12 mt-4 d-flex flex-column flex-sm-row"
                style={{ position: "relative", bottom: "24px" }}
              >
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Details
                </button>
                <button className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0">
                  Email
                </button>
                <button
                  className="btn border p-2 px-5 rounded-0 flex-fill flex-sm-grow-0"
                  style={{ width: "100%", maxWidth: "794px" }}
                >
                  Contact
                </button>
              </div>
            </Col>


          </Row>
        </Container>
      </section>

      {/* section 3  */}
      <section className="browse-cities py-5 bg-white">
        <Container>
          <h4 className="fw-bold">Browse Real Estate Agents and Companies <br></br>by City in Pakistan</h4>
          <p className="mb-4">Easily find trusted real estate agents and property companies in your city across Pakistan.</p>
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
