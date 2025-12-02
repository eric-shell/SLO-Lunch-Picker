import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../layout';

const PrivacyPage: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: December 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-sm space-y-8">
            
            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
              Local Foodie ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect minimal information to provide you with the best experience:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Usage Data:</strong> Anonymous analytics about how you interact with the app (pages visited, buttons clicked, etc.)</li>
                <li><strong>Device Information:</strong> Browser type, device type, and screen resolution for optimization purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">What We Don't Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We believe in privacy-first design:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We don't require account creation</li>
                <li>We don't collect personal information (name, email, etc.)</li>
                <li>We don't track your location</li>
                <li>We don't sell or share your data with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use minimal cookies for anonymous analytics purposes only. These help us understand how people use the app so we can make it better.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                We may use third-party analytics services (like Google Analytics) to help us understand app usage. These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-slo-blue text-xl mb-3">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please reach out to us at{' '}
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

export default PrivacyPage;

