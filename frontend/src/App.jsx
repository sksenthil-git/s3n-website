import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
// import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import DataDeletion from './pages/DataDeletion'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  )
}

export default App
