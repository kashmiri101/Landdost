import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';

export default function RealEstateProfile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: '',
        city: '',
        location: '',
        agencyName: '',
        reraNumber: '',
        specialization: '',
        officeAddress: '',
        website: '',
        about: '',
        profilePicture: null,
    });

    const [filteredCities, setFilteredCities] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const cityLocationMap = {
        Lahore: [], Karachi: [], Islamabad: [], Rawalpindi: [], Multan: [], Faisalabad: [],
        Gujranwala: [], Sialkot: [], Hyderabad: [], Quetta: [], Bahawalpur: [], Sargodha: [],
        Abbottabad: [], Murree: [], Mardan: [], Gujrat: [], Okara: [], RahimYarKhan: [], Sukkur: []
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'city') {
            const suggestions = Object.keys(cityLocationMap).filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCities(suggestions);
        }
    };

    const handleCitySelect = (city) => {
        setFormData(prev => ({ ...prev, city }));
        setFilteredCities([]);
    };

    const handleLocationSelect = (location) => {
        setFormData(prev => ({ ...prev, location }));
        setLocationSuggestions([]);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, profilePicture: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Real Estate Profile:', formData);
        alert('Profile details submitted successfully!');
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (formData.location.length > 2) {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}&limit=5`)
                    .then(res => res.json())
                    .then(data => setLocationSuggestions(data))
                    .catch(() => setLocationSuggestions([]));
            } else {
                setLocationSuggestions([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [formData.location]);

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="p-4 shadow border-0 rounded-4 bg-white">
                        <div className="text-center mb-4">
                            <FaUserTie size={100} style={{ color: "#33A137" }} />
                            <h4 className="mt-3 mb-0">Edit Real Estate Profile</h4>
                            <p className="text-muted">Update your professional details</p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            {/* Name Fields */}
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </Col>
                            </Row>

                            {/* Contact & Email */}
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+92 300 1234567"
                                        required
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </Col>
                            </Row>

                            {/* Country */}
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Enter your country"
                                    />
                                </Col>
                            </Row>

                            {/* City & Location */}
                            <Row className="mb-3 position-relative">
                                <Col sm={6}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        autoComplete="off"
                                    />
                                    {filteredCities.length > 0 && (
                                        <ListGroup className="position-absolute w-100 shadow z-3" style={{ maxHeight: 150, overflowY: 'auto' }}>
                                            {filteredCities.map((city, index) => (
                                                <ListGroup.Item key={index} action onClick={() => handleCitySelect(city)}>
                                                    {city}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </Col>

                                <Col sm={6}>
                                    <Form.Label>Office Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter office location"
                                        autoComplete="off"
                                    />
                                    {locationSuggestions.length > 0 && (
                                        <ListGroup className="position-absolute w-100 shadow z-3" style={{ maxHeight: 150, overflowY: 'auto', top: '100%', zIndex: 10 }}>
                                            {locationSuggestions.map((loc, index) => (
                                                <ListGroup.Item key={index} action onClick={() => handleLocationSelect(loc.display_name)}>
                                                    {loc.display_name}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </Col>
                            </Row>

                            {/* Agency & RERA */}
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <Form.Label>Agency Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="agencyName"
                                        value={formData.agencyName}
                                        onChange={handleChange}
                                        placeholder="Enter your agency name"
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>RERA / Registration Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="reraNumber"
                                        value={formData.reraNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your registration number"
                                    />
                                </Col>
                            </Row>

                            {/* Specialization */}
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Label>Specialization</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        placeholder="e.g., Residential, Commercial, Plots"
                                    />
                                </Col>
                            </Row>

                            {/* Website */}
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Label>Website (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </Col>
                            </Row>

                            {/* Profile Picture */}
                            <Row className="mb-3">
                                <Col sm={12}>
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Col>
                            </Row>

                            {/* About */}
                            <Form.Group className="mb-3">
                                <Form.Label>About Your Real Estate Services</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="about"
                                    rows={4}
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder="Describe your services, experience, and specialties..."
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button
                                    type="submit"
                                    variant=""
                                    className="text-light"
                                    style={{
                                        background: "#33A137",
                                        border: "none",
                                        transition: "background 0.3s ease"
                                    }}
                                    onMouseOver={(e) => (e.target.style.background = "#2b832d")}
                                    onMouseOut={(e) => (e.target.style.background = "#33A137")}
                                >
                                    Save Profile
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
