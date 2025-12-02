import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../layout';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm transition-all font-bold text-sm backdrop-blur-sm transform hover:-translate-y-1 hover:shadow-md bg-white hover:bg-sky-950 hover:text-white mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-slo-blue mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: December 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-sm space-y-8">
            
            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Local Foodie, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Use of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
              Local Foodie is a free restaurant recommendation tool for entertainment purposes. By using our service, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use the service for personal, non-commercial purposes</li>
                <li>Not attempt to scrape, copy, or redistribute our data</li>
                <li>Not attempt to disrupt or overload our servers</li>
                <li>Have fun and embrace the spontaneity! 🎲</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                Local Foodie is provided "as is" without any warranties. We do our best to keep restaurant information accurate and up-to-date, but we cannot guarantee the accuracy of all information. Restaurant hours, menus, and availability may change. Always verify details directly with the restaurant before visiting.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Restaurant Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We are not affiliated with any of the restaurants listed on Local Foodie. All restaurant names, logos, and information are the property of their respective owners. Our recommendations are based on local knowledge and do not constitute endorsements.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Local Foodie and its creators shall not be liable for any damages arising from the use of this service. This includes (but is not limited to): bad dining experiences, food allergies, restaurants being closed, or any decisions made based on our recommendations.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                The Local Foodie name, logo, and website design are our intellectual property. You may not use these without express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of Local Foodie after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Questions about these Terms? Reach out at{' '}
                <a href="https://eric.sh" target="_blank" rel="noopener noreferrer" className="text-slo-blue hover:underline">
                  eric.sh
                </a>.
              </p>
            </section>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;

