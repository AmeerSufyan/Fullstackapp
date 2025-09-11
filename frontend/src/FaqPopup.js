import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faqs = ({ isOpen, onClose, position }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { Q: 'What are your store hours?', A: 'Our store is open daily from 9:00 AM to 8:00 PM, including weekends and most holidays.' },
    { Q: 'Do you offer home delivery or curbside pickup?', A: 'Yes! We offer both home delivery and curbside pickup. You can choose your preferred option during checkout.' },
    { Q: 'How can I check if an item is in stock?', A: 'You can search our website or call our store to check availability of specific items in real-time.' },
    { Q: 'Do you have a loyalty or rewards program?', A: 'Yes, we offer a free rewards program. Earn points on every purchase and redeem them for discounts and special offers.' },
    { Q: 'Do you price match with other stores?', A: 'We do not offer price matching, but we strive to provide competitive prices on all our products.' },
    { Q: 'Are your fruits and vegetables organic or locally sourced?', A: 'We offer both conventional and organic options, and source locally whenever possible to ensure freshness.' },
    { Q: 'Do you carry gluten-free, vegan, or other specialty items?', A: 'Yes, we have dedicated sections for gluten-free, vegan, keto, and allergy-friendly products.' },
    { Q: 'Can I return or exchange a product I bought?', A: 'Yes. Please return the item with your receipt within 7 days for a full refund or exchange.' },
    { Q: 'What forms of payment do you accept?', A: 'We accept cash, credit/debit cards, mobile payments like Apple Pay/Google Pay, and EBT.' },
    { Q: 'How do I redeem my loyalty points?', A: 'At checkout, simply provide your account info and choose how many points you\'d like to apply to your purchase.' },
    { Q: 'Can I request a product you don’t currently carry?', A: 'Absolutely! You can submit a product request in-store or through our website, and we’ll do our best to stock it.' },
    { Q: 'Is there a minimum order amount for delivery?', A: 'Yes, there is a $25 minimum for delivery orders. Pickup orders have no minimum.' },
    { Q: 'What happens if an item I ordered online is out of stock?', A: 'We’ll contact you to suggest a substitute or remove the item from your order and adjust your total.' },
    { Q: 'How do I use a discount coupon online?', A: 'During online checkout, enter your coupon code in the promo code field before payment.' },
    { Q: 'How do you ensure product freshness?', A: 'Our team inspects fresh items daily and rotates stock regularly to ensure the highest quality products.' },
  ];

  if (!isOpen) return null; // Don't show the FAQ popup if isOpen is false

  return (
    <div
      className="bg-black text-white p-4 mt-8 w-full md:w-1/2"
      style={{
        position: 'fixed',              // fixed to the viewport
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // center it
        maxHeight: '60vh',
        overflowY: 'auto',
        zIndex: 1000,                  // ensure it appears on top
        borderRadius: '8px',  
      }}
    >
      <button onClick={onClose} className="text-4xl sticky left-full top-0">
        &times;
      </button>
      <h2 className="text-center text-2xl mb-5">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full text-left flex items-center gap-2 text-xl focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-xl">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
              <span className='text-lg'>{faq.Q}</span>
            </button>
            {openIndex === index && <p className="mt-1 text-lg">{faq.A}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
