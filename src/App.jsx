import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [formData, setFormData] = useState({
    situation: '', // 'waiting' ou 'blocked'
    personalInfo: {
      fullName: '',
      uberId: '',
      uberEmail: '',
      city: '',
      phone: ''
    },
    videoFile: null,
    captchaToken: ''
  });

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  formData={formData} 
                  setFormData={setFormData} 
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;