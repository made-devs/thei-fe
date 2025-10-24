// Filepath: app/components/Contact/ContactForm.js
'use client';
import { useState } from 'react';

const ContactForm = ({ dictionary }) => {
  const [requestType, setRequestType] = useState('quote');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const waMessage = `Request Type: ${requestType}\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}${
      requestType === 'parts' ? `\nPart Number: ${partNumber}` : ''
    }\nMessage: ${message}`;
    const waUrl = `https://wa.me/6285195886789?text=${encodeURIComponent(
      waMessage
    )}`;
    window.open(waUrl, '_blank');
  };

  if (!dictionary) return null;

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
        {dictionary.title}
      </h2>
      <p className="text-gray-600 mt-2 mb-6 sm:mb-8 text-sm sm:text-base">
        {dictionary.description}
      </p>

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="requestType"
            className="block text-xs sm:text-sm font-medium text-gray-700"
          >
            {dictionary.request_type_label}
          </label>
          <select
            id="requestType"
            name="requestType"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-sm sm:text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md"
          >
            <option value="Request Quote">{dictionary.options.quote}</option>
            <option value="Book Service">{dictionary.options.service}</option>
            <option value="Order Parts">{dictionary.options.parts}</option>
            <option value="Emergency Service">
              {dictionary.options.emergency}
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {dictionary.name_label}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {dictionary.company_label}
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {dictionary.email_label}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {dictionary.phone_label}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {requestType === 'parts' && (
          <div>
            <label
              htmlFor="part-number"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              {dictionary.part_number_label}
            </label>
            <input
              type="text"
              id="part-number"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-medium text-gray-700"
          >
            {dictionary.message_label}
          </label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {dictionary.submit_button}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
