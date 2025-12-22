import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Cancel Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl">
            ✕
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-500 mb-6">
          Your payment was not completed. No charges were made.
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-left mb-6">
          <p><strong>Status:</strong> Cancelled</p>
          <p><strong>Reason:</strong> Payment process was interrupted</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/donate"
            className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="block w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Go to Home
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          If you need help, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
