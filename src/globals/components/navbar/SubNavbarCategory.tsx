// src/components/SubNavbar.tsx
import React, { useState } from "react";

const categories = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Grocery", value: "grocery" },
  { label: "Furniture", value: "furniture" },
  { label: "Beauty", value: "beauty" },
  { label: "Toys", value: "toys" },
  { label: "Stationery", value: "stationery" },
  { label: "Sports", value: "sports" },
  { label: "Home Appliances", value: "homeAppliances" },
];

const SubNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    console.log(`Selected Category: ${category}`);
    // Add your logic here (e.g., filtering products based on category)
  };

  return (
    <div className="bg-gray-100 py-4 px-6 shadow-md">
      <div className="relative inline-block">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory
            ? `Category: ${selectedCategory}`
            : "Select Category"}
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {categories.map((category) => (
              <li
                key={category.value}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubNavbar;
