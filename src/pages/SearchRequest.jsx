import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SearchRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get('/districts.json')
      .then(res => setDistricts(res.data.districts))
      .catch(() => setError('Failed to load districts'));

    axios.get('/upazilas.json')
      .then(res => setUpazilas(res.data.upazilas))
      .catch(() => setError('Failed to load upazilas'));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;

    const district = form.district.value;
    const upazila = form.upazila.value;
    const bloodGroup = form.bloodGroup.value;

    axiosSecure.get(
      `/search-request?bloodGroup=${bloodGroup}&upazila=${upazila}&district=${district}`
    )
      .then(res => console.log(res.data))
      .catch(() => setError('Search failed'));
  };

  return (
    <Container>
      <div className="min-h-[70vh] flex items-center justify-center px-4">

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-600">
              Search Blood Requests
            </h1>
            <p className="text-gray-500 mt-2">
              Find blood donation requests near your location
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >

            {/* Blood Group */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select blood group
                </option>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                District
              </label>
              <select
                name="district"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select district
                </option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Upazila
              </label>
              <select
                name="upazila"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select upazila
                </option>
                {upazilas.map(u => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-3 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Search Requests
              </button>
            </div>

          </form>

        </div>
      </div>
    </Container>
  );
};

export default SearchRequest;
