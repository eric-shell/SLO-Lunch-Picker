import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const faqs = [
  {
    question: "What is SLO Picker?",
    answer: "SLO Picker is a fun, randomized restaurant picker for San Luis Obispo! When you and your friends can't decide where to eat, let fate decide. We've curated the best local spots for breakfast, lunch, dinner, coffee, treats, and drinks."
  },
  {
    question: "How does the picker work?",
    answer: "Simply choose a category (like Lunch or Coffee), optionally filter by cuisine type or vibe, and hit the spin button! Our slot-machine-style picker will randomly select a local restaurant for you."
  },
  {
    question: "Are all restaurants in SLO?",
    answer: "Yes! We focus exclusively on restaurants, cafes, and bars in San Luis Obispo and the immediate surrounding area. We're locals helping locals discover the best spots in town."
  },
  {
    question: "How do you choose which restaurants to include?",
    answer: "Our list is curated with love by locals who actually eat at these places. We prioritize quality, variety, and that special SLO charm. We're always updating the list as new spots open!"
  },
  {
    question: "Can I suggest a restaurant to add?",
    answer: "Absolutely! We love hearing about hidden gems. Reach out to us and let us know your favorite spots that we might have missed."
  },
  {
    question: "Is this app free to use?",
    answer: "Yes! SLO Picker is completely free. No ads, no subscriptions, no catches. Just a helpful tool for indecisive foodies."
  },
  {
    question: "Do you have an app?",
    answer: "Currently, SLO Picker is a web app optimized for mobile browsers. Add it to your home screen for the best experience! A native app may be in the works..."
  },
];

const FAQPage: React.FC = () => {
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
              FAQ
            </h1>
            <p className="text-gray-600 text-lg">
              Got questions? We've got answers.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-slate-200 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-slo-blue text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
