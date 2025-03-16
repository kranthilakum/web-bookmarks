"use client"

import { useState, useEffect, useRef } from "react";
import bookmarksData from "../data/bookmarks.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    filterBookmarks(search, category);
  }, [search, category]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsDropdownOpen(false);
  };

  const filterBookmarks = (query, selectedCategory) => {
    let filtered = bookmarksData.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategory ? bookmark.category === selectedCategory : true)
    );
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredBookmarks(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="container mx-auto max-w-5xl p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Web & Frontend Bookmarks</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full md:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative w-full md:w-1/3" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-300 p-3 rounded-lg w-full text-left bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {category || "All Categories"}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 transition-opacity duration-200 ease-in-out">
                <div
                  className="p-3 cursor-pointer hover:bg-blue-100 rounded-t-lg"
                  onClick={() => handleCategoryChange("")}
                >
                  All Categories
                </div>
                {Array.from(new Set(bookmarksData.map((b) => b.category))).map((cat) => (
                  <div
                    key={cat}
                    className="p-3 cursor-pointer hover:bg-blue-100"
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                  {bookmark.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600 mt-2">{bookmark.description}</p>
              <span className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full mt-3 inline-block">
                {bookmark.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
