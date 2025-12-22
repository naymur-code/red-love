import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const FeatureSupport = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCheckOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    const donateAmount = e.target.donateAmount.value;

    const formData = {
      email: user?.email,
      name: user?.displayName,
      donateAmount,
    };

    try {
      const res = await axios.post(
        "https://red-love-backend.vercel.app/create-payment-checkout",
        formData
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <section className="py-20 flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 md:flex md:gap-10">
        
        {/* Left: Info / Stats */}
        <div className="md:w-1/2 flex flex-col justify-center mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
            Support the Cause 🩸
          </h2>
          <p className="text-gray-600 mb-6">
            Every donation counts. Become a hero today or help us track the impact of your contribution.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-red-600">1,254</h3>
              <p className="text-gray-500 text-sm mt-1">Donors</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-red-600">$75,430</h3>
              <p className="text-gray-500 text-sm mt-1">Donations</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-red-600">862</h3>
              <p className="text-gray-500 text-sm mt-1">Lives Saved</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-red-600">15</h3>
              <p className="text-gray-500 text-sm mt-1">Projects</p>
            </div>
          </div>
        </div>

        {/* Right: Donate Form */}
        <div className="md:w-1/2 bg-red-50 border border-red-100 rounded-3xl p-8 shadow-lg">
          
          {user && (
            <div className="bg-white border border-red-200 rounded-xl p-3 mb-5 text-sm text-gray-700">
              <p><strong>Name:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}

          <form onSubmit={handleCheckOut} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  $
                </span>
                <input
                  name="donateAmount"
                  type="number"
                  min="1"
                  required
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              } text-white py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105`}
            >
              {loading ? "Processing..." : "Donate Now"}
            </button>

            {successMsg && (
              <p className="text-green-600 text-center mt-2">{successMsg}</p>
            )}
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSupport;
