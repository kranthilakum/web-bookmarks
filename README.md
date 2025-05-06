# Web Bookmarks

## Overview
Web Bookmarks is a responsive Next.js web page designed to display and manage a collection of web bookmarks. It provides a fast and interactive experience for users to search, filter, and sort bookmarks easily. The data is loaded from a JSON file, ensuring quick access and smooth functionality.

## Features
- 🔍 **Typeahead Search**: Search bookmarks dynamically with instant filtering.
- 📂 **Category Filtering**: Select a category to view relevant bookmarks.
- 🔄 **Sorting**: Sort bookmarks in ascending or descending order.
- 📌 **Sticky Search, Filter, and Sort Bar**: The controls remain visible while scrolling.
- ✨ **Animated Placeholders**: Displays a skeleton UI while loading data.
- 📜 **Scrollable Results**: Bookmark results are contained in a scrollable area.
- 🎨 **Stylish UI**: Uses Tailwind CSS for a modern, clean design.
- 📱 **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack
- **Next.js 14**: Server-side rendering and client-side interactivity.
- **Tailwind CSS**: Utility-first styling.
- **Heroicons**: Icons for UI elements.
- **JSON Data Source**: Fast, file-based bookmark storage.

## Installation & Setup
1. Fork and Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/web-bookmarks.git
   cd web-bookmarks
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements
- [] ⭐ **Favorites**: Allow users to mark bookmarks as favorites.
- [x] 🗂️ **Multi-Tag Filtering**: Allow users to filter bookmarks by one or more tags.
- [] 📜 **Infinite Scroll or Pagination**: Instead of showing all results at once, implement infinite scroll or paginated results.
- [] 🌗 **Dark Mode**: Add support for dark theme.
- [] 🖼️ **Thumbnail Previews**: Fetch website previews dynamically.
- [] 🕵️‍♂️ **Enhanced Typeahead Search**: Show a real-time dropdown of matching bookmarks as users type.
- [x] 📊 **Bookmark Stats & Insights**: Show stats like number of bookmarks per category, number of categories, and number of tags.
- [] 📅 **Recently Added Bookmarks**: Show recently added bookmarks.
- [] 📈 **Trending Bookmarks**: Show trending bookmarks.
- [] 📄 **Dedicated Bookmark Pages**: Clicking on a bookmark could open a detailed page with additional info, tags, and related bookmarks.
- [] 🧑‍💻 **Shareable Bookmark Collections**: Let users generate a shareable link for selected bookmarks.
- [] 📵 **Offline access with Service Workers**: Allow bookmarks to be saved to local storage and loaded offline.
- [] 📡 **RSS Feed Integration**: Allow users to add RSS feeds to auto-update certain bookmark categories dynamically.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request with improvements.

## License
This project is licensed under the MIT License.