import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Addproperty() {
  const navigate = useNavigate();

  const categories = [
    { title: "Property", image: "/images/adpost1.jpg", link: "/dashboard" },
    { title: "Projects", image: "/images/addpost2.jpg", link: "/dashboard" },
    { title: "Business", image: "/images/adpost3.jpg", link: "/dashboard" },
    { title: "Construction Services", image: "/images/addpost4.jpg", link: "/dashboard" },
    { title: "Material Companies", image: "/images/addpost5.jpg", link: "/dashboard" },
    { title: "Job Opportunities", image: "/images/addpost6.jpg", link: "/dashboard" },
    { title: "Home Services", image: "/images/addpost7.jpg", link: "/dashboard" },
  ];

  return (
    <section className="py-5">
      <Container>
        <h3 className="text-center fw-bold mb-4">Post Your Ad</h3>
        <h5 className="mb-4">Choose a Category</h5>
        <Row className="g-4">
          {categories.map((cat, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card
                className="text-center shadow-sm border-0 h-100"
                style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
                onClick={() => navigate(cat.link)}
              >
                <Card.Body>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "150px" }}
                  />
                  <h6 className="fw-semibold">{cat.title}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
