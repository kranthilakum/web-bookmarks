"use client";

import { useState, useEffect } from "react";
import { ArrowsUpDownIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import bookmarksData from "../data/bookmarks.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isGridView, setIsGridView] = useState(true);

  const allCategories = [...new Set(bookmarksData.map((b) => b.category))];
  const allTags = [...new Set(bookmarksData.flatMap((b) => b.tags || []))];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    filterBookmarks(search, category, selectedTags, sortOrder);
  }, [search, category, selectedTags, sortOrder]);

  const handleSearch = (query) => setSearch(query);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const filterBookmarks = (query, selectedCategory, selectedTags, order) => {
    let filtered = bookmarksData.filter((bookmark) => {
      const matchesSearch = bookmark.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory ? bookmark.category === selectedCategory : true;
      const matchesTags =
        selectedTags.length === 0 ||
        (bookmark.tags || []).some((tag) => selectedTags.includes(tag));
      return matchesSearch && matchesCategory && matchesTags;
    });

    filtered = filtered.sort((a, b) =>
      order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setFilteredBookmarks(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-xl p-4 shadow sticky top-6 h-fit">
            <h3 className="font-semibold mb-3 text-gray-700">Categories</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              <li
                className={`cursor-pointer px-3 py-1 rounded hover:bg-blue-100 ${
                  category === "" ? "bg-blue-200 font-bold" : ""
                }`}
                onClick={() => setCategory("")}
              >
                All
              </li>
              {allCategories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer px-3 py-1 rounded hover:bg-blue-100 ${
                    category === cat ? "bg-blue-200 font-bold" : ""
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-6 mb-3 text-gray-700 flex justify-between items-center">
              Tags
              {selectedTags.length > 0 && (
                <button onClick={clearTags} className="text-sm text-red-500 hover:underline">
                  Clear
                </button>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <span
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`text-sm px-3 py-1 rounded-full cursor-pointer transition ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-blue-200"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
              >
                {isGridView ? (
                  <Squares2X2Icon className="size-8 text-gray-700" />
                ) : (
                  <ListBulletIcon className="size-8 text-gray-700" />
                )}
              </button>
              <button
                onClick={toggleSortOrder}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
              >
                <ArrowsUpDownIcon className="size-8 text-gray-700" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="bg-gray-200 h-24 rounded-xl" />
                    ))}
                </div>
              ) : (
                <div>
                {/* Bookmark Views */}
                {isGridView ? (
                  // Grid/Card View
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200 backdrop-blur-md bg-opacity-50 border border-gray-200"
                      >
                        <h2 className="text-lg font-semibold text-gray-800">
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          >
                            {bookmark.title}
                          </a>
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                          {bookmark.description}
                        </p>
                        <span className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full mt-3 inline-block">
                          {bookmark.category}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <ul className="divide-y divide-gray-200">
                    {filteredBookmarks.map((bookmark) => (
                      <li
                        key={bookmark.id}
                        className="flex items-center justify-between py-4 hover:bg-blue-50 px-3 rounded-lg transition"
                      >
                        <div>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {bookmark.title}
                          </a>
                          <p className="text-sm text-gray-500">{bookmark.description}</p>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {bookmark.category}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
