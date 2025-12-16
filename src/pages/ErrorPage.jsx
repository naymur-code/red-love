import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <section className="relative z-10 bg-red-600 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-[420px]">
          <h2 className="mb-2 text-[50px] font-extrabold leading-none text-white sm:text-[80px] md:text-[100px]">
            404
          </h2>

          <h4 className="mb-3 text-[22px] font-semibold text-white">
            Oops! Page Not Found
          </h4>

          <p className="mb-8 text-lg text-red-100">
            The page you are looking for doesn’t exist or was moved.
          </p>

          <Link
            to="/"
            className="inline-block rounded-lg border border-white px-8 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-red-600"
          >
            Go To Home
          </Link>
        </div>

        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 flex justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF20] to-transparent"></div>

          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF20] to-transparent"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF20] to-transparent"></div>
          </div>

          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF20] to-transparent"></div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
