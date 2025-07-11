"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Schedulla</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our scheduling platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Personal details such as name, email address, and contact information.</li>
        <li>Meeting and scheduling details including event title, date, and time.</li>
        <li>Usage data such as browser type, IP address, and interactions with our site.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        The data we collect is used to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and manage your meetings and events.</li>
        <li>Send confirmations, reminders, and updates.</li>
        <li>Improve our services and user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We take appropriate measures to protect your data from unauthorized access, alteration, or disclosure. However, no online platform can be 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services (like calendar APIs or email providers) to support features of our platform. These services may collect data in accordance with their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, modify, or delete your personal information. You may contact us at any time for assistance.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. Changes will be posted on this page with a revised effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:roguljayaraman15102004@gmail.com" className="text-teal-700 underline">support@schedulla.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
