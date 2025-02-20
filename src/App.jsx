import React, { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import { SiAwsamplify } from 'react-icons/si';

function App() {
  const [currentView, setCurrentView] = useState('add'); // 'add' or 'view'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [contacts, setContacts] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (currentView === 'view') {
      fetch('http://lamp-stack-lab-alb-1896871825.eu-west-1.elb.amazonaws.com/api/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(() => setContacts([]));
    }
  }, [currentView]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://lamp-stack-lab-alb-1896871825.eu-west-1.elb.amazonaws.com/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResponse(data);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setResponse({ error: 'Submission failed' });
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header
        className="
      fixed top-0 left-0 right-0
      flex items-center justify-between
      h-[3.2rem] p-[2ch]
      shadow-md bg-white
      "
      >
        <div
          className='
        flex items-center gap-2
        '
        >
          <SiAwsamplify className="logo" />
          <h1
            className='
          text-2xl font-bold
          '
          >
            Contact Manager
          </h1>
        </div>
        {/* Navigation */}
        <nav
          className="
          flex items-center gap-4
          cursor-pointer
        "
        >
          <button
            onClick={
              () => setCurrentView('add')
            }
            className={`
              cursor-pointer
              hover:text-blue-800
              ${currentView === 'add' ? 'text-blue-500' : 'text-black'}
            `}
          >
            Add Contact
          </button>
          <button
            onClick={
              () => setCurrentView('view')
            }
            className={`
            cursor-pointer
            hover:text-blue-800
            ${currentView === 'view' ? 'text-blue-500' : 'text-black'}
          `}
          >
            View Contacts
          </button>
        </nav>
      </header>


      {/* Content */}
      <main
        className='
      mt-[3.2rem]
      p-[2ch]
      '
      >
        {currentView === 'add' ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xs">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Submit
              </button>
            </form>
            {response && (
              <pre className="mt-4 p-2 bg-gray-100 border rounded-md text-sm text-gray-700">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>

        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact List</h2>
            {contacts.length === 0 ? (
              <p className="text-gray-600 text-center">No contacts found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white text-left">
                      <th className="px-4 py-3 border">#</th>
                      <th className="px-4 py-3 border">Name</th>
                      <th className="px-4 py-3 border">Email</th>
                      <th className="px-4 py-3 border">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr
                        key={index}
                        className="border border-slate-100 hover:bg-gray-100 transition"
                      >
                        <td className="px-4 py-3 border border-slate-100">{index + 1}</td>
                        <td className="px-4 py-3 border border-slate-100">{contact.name}</td>
                        <td className="px-4 py-3 border border-slate-100">{contact.email}</td>
                        <td className="px-4 py-3 border border-slate-100">{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        )}
      </main>
    </div>
  );
}

export default App;
