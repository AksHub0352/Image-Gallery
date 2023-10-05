import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(2); // Start with page 2
  const [headerImage, setHeaderImage] = useState("");

  useEffect(() => {
    fetchImages();
    fetchRandomHeaderImage();
  }, [currentPage]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${currentPage}&limit=9`
      );
      const data = response.data;
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchRandomHeaderImage = async () => {
    try {
      const response = await axios.get("https://picsum.photos/800/200");
      const randomHeaderImage = response.config.url;
      setHeaderImage(randomHeaderImage);
    } catch (error) {
      console.error("Error fetching random header image:", error);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <header>
        <nav className="p-4 bg-indigo-500">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <img
                src="https://reactjs.org/logo-og.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl text-white font-bold">Image Gallery</h1>
            </div>
            <div></div>
          </div>
        </nav>

        <img src={headerImage} alt="Random Header" className="w-full" />
      </header>

      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Image Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              className="border rounded-lg overflow-hidden shadow-md"
              key={image.id}
            >
              <img
                src={image.download_url}
                alt={image.author}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 2}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              currentPage === 2
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
