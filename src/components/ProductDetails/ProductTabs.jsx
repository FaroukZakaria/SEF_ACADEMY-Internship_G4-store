import { useState } from "react";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex border-b border-amazon-border">
        <button
          onClick={() => setActiveTab("description")}
          className={`border-b-2 px-5 py-3 font-medium transition ${
            activeTab === "description"
              ? "border-amazon-orange text-amazon-orange"
              : "border-transparent text-amazon-textLight hover:text-amazon-textDark"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`border-b-2 px-5 py-3 font-medium transition ${
            activeTab === "reviews"
              ? "border-amazon-orange text-amazon-orange"
              : "border-transparent text-amazon-textLight hover:text-amazon-textDark"
          }`}
        >
          Reviews ({product.numReviews})
        </button>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === "description" ? (
          <DescriptionTab description={product.description} />
        ) : (
          <ReviewsTab product={product} />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;