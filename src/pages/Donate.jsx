import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Donate = () => {
  const { user } = useContext(AuthContext);

  const handleCheckOut = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;

    const formData = {
      email: user?.email,
      name: user?.displayName,
      donateAmount
    };

    axios.post('http://localhost:3000/create-payment-checkout', formData)
      .then(res => {
        window.location.href = res.data.url;
      });

    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Support the Cause</h1>
          <p className="text-gray-500 mt-2">
            Your donation helps save lives ❤️
          </p>
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4 text-sm">
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        {/* Donate Form */}
        <form onSubmit={handleCheckOut} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Donation Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                name="donateAmount"
                type="number"
                min="1"
                required
                placeholder="Enter amount"
                className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Donate Now
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};

export default Donate;
