import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First Name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last Name is required';
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.email) tempErrors.email = 'E-mail is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    if (!formData.country) tempErrors.country = 'Country is required';
    if (!formData.city) tempErrors.city = 'City is required';
    if (!formData.pan) tempErrors.pan = 'PAN No. is required';
    if (!formData.aadhar) tempErrors.aadhar = 'Aadhar No. is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Registration Form</h1>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className='show-hide' type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div className="form-group">
        <label>Phone No.:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          
        </select>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
      <div className="form-group">
        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {formData.country === 'India' && (
            <>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
            </>
          )}
          {formData.country === 'USA' && (
            <>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </>
          )}
          {formData.country === 'Canada' && (
            <>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Montreal">Montreal</option>
            </>
          )}
          
        </select>
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div className="form-group">
        <label>PAN No.:</label>
        <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
        {errors.pan && <span className="error">{errors.pan}</span>}
      </div>
      <div className="form-group">
        <label>Aadhar No.:</label>
        <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
        {errors.aadhar && <span className="error">{errors.aadhar}</span>}
      </div>
      <button type="submit" className="submit-btn" disabled={Object.keys(errors).length > 0}>Submit</button>
    </form>
  );
};

const Success = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="success-container">
      <h1>Submission Successful</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Link to="/">Go back to form</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
