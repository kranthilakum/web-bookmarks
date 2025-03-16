"use client"
import { useState, useEffect, useRef } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import bookmarksData from "../data/bookmarks.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    filterBookmarks(search, category, sortOrder);
  }, [search, category, sortOrder]);

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterBookmarks = (query, selectedCategory, order) => {
    let filtered = bookmarksData.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategory ? bookmark.category === selectedCategory : true)
    );
    filtered = filtered.sort((a, b) =>
      order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setFilteredBookmarks(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="container mx-auto max-w-5xl p-6 bg-white shadow-lg rounded-xl">
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 text-black text-lg font-semibold">
            Web Bookmarks
          </span>
        </div>
        <div className="sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full md:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative w-full md:w-1/3" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Filter categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 transition-opacity duration-200 ease-in-out max-h-60 overflow-y-auto">
                <div
                  className="p-3 cursor-pointer hover:bg-blue-100 rounded-t-lg"
                  onClick={() => handleCategoryChange("")}
                >
                  All Categories
                </div>
                {Array.from(new Set(bookmarksData.map((b) => b.category)))
                  .filter((cat) => cat.toLowerCase().includes(categorySearch.toLowerCase()))
                  .map((cat) => (
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
          <button
            onClick={toggleSortOrder}
            className="bg-blue-400 text-white p-3 rounded-lg shadow-md hover:bg-blue-300 transition flex items-center justify-center"
          >
            <ArrowsUpDownIcon className="size-6 text-white" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {Array(8).fill().map((_, index) => (
                <div key={index} className="bg-gray-200 h-24 rounded-xl" />
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
