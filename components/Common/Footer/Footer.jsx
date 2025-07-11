import { formatDate } from "date-fns";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-50 py-8">
      <div className="container text-center px-4 mx-auto text-gray-600 text-sm">
        <p>Easily schedule your meetings with Schedulla @ {" "}{formatDate(Date.now(),"yyyy")}</p>
      </div>
      <div className="container text-center px-4 mx-auto mt-1 text-sm text-gray-600">
        <p>
          Check our{" "}
          <a
            href="/privacy-policy"
            className="text-teal-600/80 hover:underline"
          >
            {" "}
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
