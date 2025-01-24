import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [0, 1000],
    features: {
      isNew: false,
      freeShipping: false,
      inStock: false,
    },
  });

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      rating: Number(event.target.value),
    }));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = Number(event.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: newPriceRange as [number, number],
    }));
  };

  const handleFeatureChange = (feature: keyof typeof filters.features) => {
    setFilters((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const applyFilters = () => {
    console.log("Filters Applied:", filters);
    // Add logic to filter products based on `filters`.
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Rating Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Rating</h3>
        <input
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={filters.rating}
          onChange={handleRatingChange}
          className="border p-2 w-full rounded-md"
          placeholder="Min rating (e.g., 4)"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="border p-2 w-full rounded-md"
            placeholder="Min Price"
          />
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="border p-2 w-full rounded-md"
            placeholder="Max Price"
          />
        </div>
      </div>

      {/* Features Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Features</h3>
        <div className="space-y-2">
          {Object.keys(filters.features).map((feature) => (
            <label key={feature} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.features[feature as keyof typeof filters.features]}
                onChange={() => handleFeatureChange(feature as keyof typeof filters.features)}
              />
              {feature
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default Sidebar;
