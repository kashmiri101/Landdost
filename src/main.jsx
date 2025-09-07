import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import About from './About.jsx'
import House from './House.jsx'
import Apartment from './Apartment.jsx'
import Plot from './Plot.jsx'
import Farmhouse from './Farmhouse.jsx';
import Newproject from './Newproject.jsx';
import Homeloan from './Homeloan.jsx';
import Construction from './Construction.jsx';
import Addproperty from './Addproperty.jsx';
import Booking from './Booking.jsx';
import Profile from './Profile.jsx';
import PostListing from './PostListing.jsx';
import Dashboard from './Dashboard.jsx';
import MyListing from './MyListing.jsx';
import Inbox from './Inbox.jsx';
import Settings from './Settings.jsx';
import BuyProducts from './BuyProducts.jsx';
import OrderHistory from './OrderHistory.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ConstructionForm from './ConstructionForm.jsx';
import ProjectForm from './ProjectForm.jsx';
import BusinessForm from './BusinessForm.jsx';
import MateralForm from './MaterialForm.jsx';
import JobsForm from './JobsForm.jsx';
import HomeServicesForm from './HomeServicesForm.jsx';
import PropertyForm from './PropertyForm.jsx';
import Contact from './Contact.jsx';
import Agents from './Agents.jsx';
import AgentdetailPage from './AgendetailPage.jsx';
import Propertypage from './Propertypage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="About" element={<About />} />
        <Route path="House" element={<House />} />
        <Route path="Apartment" element={<Apartment />} />
        <Route path="Plot" element={<Plot />} />
        <Route path="Farmhouse" element={<Farmhouse />} />
        <Route path="Newproject" element={<Newproject />} />
        <Route path="Homeloan" element={<Homeloan />} />
        <Route path="Construction" element={<Construction />} />
        <Route path="Addproperty" element={<Addproperty />} />
        <Route path="Booking" element={<Booking />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="PostListing" element={<PostListing />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="MyListing" element={<MyListing />} />
        <Route path="Inbox" element={<Inbox />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="BuyProducts" element={<BuyProducts />} />
        <Route path="OrderHistory" element={<OrderHistory />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="ConstructionForm" element={<ConstructionForm />} />
        <Route path="ProjectForm" element={<ProjectForm />} />
        <Route path="BusinessForm" element={<BusinessForm />} />
        <Route path="MaterialForm" element={<MateralForm />} />
        <Route path="JobsForm" element={<JobsForm />} />
        <Route path="HomeServicesForm" element={<HomeServicesForm />} />
        <Route path="PropertyForm" element={<PropertyForm />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Agents" element={<Agents />} />
        <Route path="AgentdetailPage" element={<AgentdetailPage />} />
        <Route path="Propertypage" element={<Propertypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
