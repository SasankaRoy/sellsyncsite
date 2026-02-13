'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";


export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is SellSync POS?',
      answer: 'SellSync POS is a modern, cloud-powered point-of-sale system designed specifically for USA retail stores. It provides comprehensive inventory management, sales tracking, and customer analytics to help businesses grow efficiently.',
    },
    {
      id: 'item-2',
      question: 'Which types of retail stores does SellSync support?',
      answer: 'SellSync works seamlessly with grocery stores, convenience stores, boutiques, salons, liquor stores, and other retail businesses. Our system adapts to your specific industry needs and workflows.',
    },
    {
      id: 'item-3',
      question: 'Can I customize SellSync for my store?',
      answer: 'Yes! SellSync is fully customizable with branded receipts, custom pricing rules, store-specific configurations, and flexible reporting. You can adapt the system to match your unique business requirements.',
    },
    {
      id: 'item-4',
      question: 'Does SellSync integrate with third-party tools?',
      answer: 'Absolutely. SellSync includes ready-to-use integrations with popular payment processors, accounting software, inventory systems, and e-commerce platforms, making it easy to connect your entire retail ecosystem.',
    },
    {
      id: 'item-5',
      question: 'Is there documentation and support available?',
      answer: 'Yes, SellSync comes with comprehensive documentation, video tutorials, and live training sessions. Our dedicated support team is available 24/7 to help you implement and optimize your POS system.',
    },
    {
      id: 'item-6',
      question: 'How secure is my data with SellSync?',
      answer: 'All data is encrypted using bank-level security and stored in secure cloud infrastructure. We comply with PCI DSS standards and implement multiple layers of protection for your customer and business data.',
    },
    {
      id: 'item-7',
      question: 'Can I manage multiple store locations?',
      answer: 'Yes, SellSync offers centralized management for multi-location businesses with real-time inventory sync across all stores, unified reporting, and location-specific configurations.',
    },
    {
      id: 'item-8',
      question: 'What hardware does SellSync support?',
      answer: 'SellSync works with a wide range of POS hardware including barcode scanners, receipt printers, cash drawers, card readers, and scales. We also offer our own complete hardware packages.',
    },
    {
      id: 'item-9',
      question: 'How much does SellSync cost?',
      answer: 'SellSync offers flexible pricing plans starting from $99/month for single stores, with volume discounts for multi-location businesses. Hardware packages are available separately or as bundled solutions. Contact our sales team for a custom quote.',
    },
    {
      id: 'item-10',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. Our onboarding team will guide you through setup and answer any questions during your trial period.',
    },
    {
      id: 'item-11',
      question: 'How long does implementation take?',
      answer: 'Most stores are up and running within 2-4 hours. Our implementation includes data migration, hardware setup, staff training, and ongoing support. Complex multi-location setups may take 1-2 weeks.',
    },
    {
      id: 'item-12',
      question: 'What kind of training is provided?',
      answer: 'We provide comprehensive training including live onboarding sessions, video tutorials, detailed documentation, and ongoing support. Training covers daily operations, advanced features, and best practices for your specific industry.',
    },
    {
      id: 'item-13',
      question: 'Can I use SellSync on mobile devices?',
      answer: 'Yes! SellSync includes mobile apps for iOS and Android devices. You can process payments, manage inventory, and access reports from anywhere. Perfect for on-the-go management and pop-up shops.',
    },
    {
      id: 'item-14',
      question: 'What happens if I lose internet connection?',
      answer: 'SellSync includes offline mode capabilities. You can continue processing transactions, and all data will sync automatically when connection is restored. Critical operations continue uninterrupted during brief outages.',
    },
    {
      id: 'item-15',
      question: 'How do I handle returns and refunds?',
      answer: 'SellSync makes returns simple with built-in return processing, automatic inventory adjustments, and refund tracking. You can process returns at any register with proper authorization and maintain detailed return history.',
    },
    {
      id: 'item-16',
      question: 'Can I track employee performance?',
      answer: 'Yes! SellSync includes comprehensive employee management with time tracking, sales performance metrics, and detailed reporting. Monitor productivity, manage schedules, and track commission-based earnings.',
    },
    {
      id: 'item-17',
      question: 'What reporting features are available?',
      answer: 'SellSync offers over 50 built-in reports including sales analysis, inventory tracking, customer insights, employee performance, and financial summaries. All reports can be customized, scheduled, and exported.',
    },
    {
      id: 'item-18',
      question: 'How do I migrate from my current POS system?',
      answer: 'Our migration team handles everything! We securely import your customer data, inventory, historical sales, and employee information. Most migrations are completed within 24-48 hours with minimal disruption to your business.',
    },
  ];


  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              Everything you need to know about SellSync POS
            </p>
            <p className="text-muted-foreground mt-6 hidden md:block">
              Can't find what you're looking for? Reach out to our{' '}
              <Link
                to="/"
                className="text-primary font-medium hover:underline"
              >
                SellSync support team
              </Link>{' '}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-gray-600">
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground mt-6 md:hidden">
            Can't find what you're looking for? Contact our{' '}
            <Link
              to="/"
              className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}


export const BlurredStagger = ({
  text = "built by sellsync.com",
}: {
  text: string;
}) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <>
      <div className="w-full">
        <motion.p
          variants={container}
          initial="hidden"
          animate="show"
          className="text-base leading-relaxed break-words whitespace-normal"
        >
          {headingText.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </>
  );
};