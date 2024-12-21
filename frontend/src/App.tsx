import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NewsList from './components/NewsList.tsx';
import AddNewsForm from './components/AddNewsForm.tsx';
import OneNewsInfo from "./components/OneNewsInfo.tsx";

const App: React.FC = () => {
  return (
      <Router>
          <div style={{ padding: '20px' }}>
            <nav>
              <Link to="/add">Add News</Link>
            </nav>
            <Routes>
              <Route path="/" element={<NewsList />} />
              <Route path="/add" element={<AddNewsForm />} />
              <Route path="/news/:id" element={<OneNewsInfo />} />
            </Routes>
          </div>
      </Router>
  );
};

export default App;
