import React from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Directors from "./components/Directors";
import Categories from "./components/Categories";
import CategoryDetail from "./components/CategoryDetail";
import DirectorDetail from "./components/DirectorDetail";
import MovieDetail from "./components/MovieDetail";
import CategoryCreate from "./components/CategoryCreate";
import DirectorCreate from "./components/DirectorCreate";
import MovieCreate from "./components/MovieCreate";
import DirectorDelete from "./components/DirectorDelete";
import CategoryDelete from "./components/CategoryDelete";
import MovieDelete from "./components/MovieDelete";

const App = () => {
  return (
    <div className="App">
      <Header title="JENFLIX" />
      <Sidebar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/create" element={<CategoryCreate />} />
          <Route path="/director/create" element={<DirectorCreate />} />
          <Route path="/movie/create" element={<MovieCreate />} />

          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/director/:id" element={<DirectorDetail />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/director/:id/delete" element={<DirectorDelete />} />
          <Route path="/category/:id/delete" element={<CategoryDelete />} />
          <Route path="/movie/:id/delete" element={<MovieDelete />} />
          <Route path="/category/:id/update" element={<CategoryCreate />} />
          <Route path="/director/:id/update" element={<DirectorCreate />} />
          <Route path="/movie/:id/update" element={<MovieCreate />} />
        </Routes>
      </HashRouter>
    </div>
  );
};
export default App;
