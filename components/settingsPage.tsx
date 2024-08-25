import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      
      {/* Language Translator */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Language Translator</h3>
        <p className="mb-4 text-gray-700">
          Select the language you would like the chatbot to communicate in.
        </p>
        <select className="w-full p-2 border rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      {/* Data Privacy Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Data Privacy</h3>
        <p className="mb-4 text-gray-700">
          Control how your data is stored and managed by the chatbot.
        </p>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="dataRetention" className="mr-2" />
          <label htmlFor="dataRetention">Enable Data Retention</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="dataSharing" className="mr-2" />
          <label htmlFor="dataSharing">Allow Data Sharing with Third Parties</label>
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Accessibility Options</h3>
        <p className="mb-4 text-gray-700">
          Customize accessibility features to improve your experience.
        </p>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="screenReader" className="mr-2" />
          <label htmlFor="screenReader">Enable Screen Reader Support</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="textToSpeech" className="mr-2" />
          <label htmlFor="textToSpeech">Enable Text-to-Speech</label>
        </div>
      </div>

      {/* Legal & Compliance */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Legal & Compliance</h3>
        <p className="mb-4 text-gray-700">
          Review the terms, conditions, and compliance regulations.
        </p>
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          View Legal Information
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
