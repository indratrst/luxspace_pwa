import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div>
      <section className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <link to="/">Office Room</link>
            </li>
            <li>
              <Link to="/" aria-label="current-page">
                Details
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Breadcrumbs;
