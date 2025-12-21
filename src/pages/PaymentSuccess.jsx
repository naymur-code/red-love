import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    axios
      .post(`http://localhost:3000/success-payment?session_id=${sessionId}`)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">
            ✓
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mb-6">
          Thank you for your generous donation. Your contribution helps save lives ❤️
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-left mb-6">
          <p><strong>Status:</strong> Completed</p>
          <p><strong>Transaction ID:</strong> {sessionId?.slice(0, 12)}...</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="block w-full border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          A confirmation email has been sent to you.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
