import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./Dashboard";

// Dummy form components (replace with your actual forms)
function PropertyForm() {
  return <h2>Property Form</h2>;
}
function ProjectsForm() {
  return <h2>Projects Form</h2>;
}
function BusinessForm() {
  return <h2>Business Form</h2>;
}
function ConstructionForm() {
  return <h2>Construction Services Form</h2>;
}
function MaterialForm() {
  return <h2>Material Companies Form</h2>;
}
function JobForm() {
  return <h2>Job Opportunities Form</h2>;
}
function HomeServicesForm() {
  return <h2>Home Services Form</h2>;
}

export default function App() {
  return (
    <Router>
      <div className="container py-4">
        {/* Show Dropdown + Button */}
        <PostListingButton />

        {/* Routes for Forms */}
        <Routes>
          <Route path="/postListing" element={<PropertyForm />} />
          <Route path="/projectForm" element={<ProjectsForm />} />
          <Route path="/BusinessForm" element={<BusinessForm />} />
          <Route path="/ConstructionForm" element={<ConstructionForm />} />
          <Route path="/MaterialForm" element={<MaterialForm />} />
          <Route path="/JobForm" element={<JobForm />} />
          <Route path="/HomeServicesForm" element={<HomeServicesForm />} />
        </Routes>
      </div>
    </Router>
  );
}
