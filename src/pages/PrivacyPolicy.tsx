
import PolicyLayout from "@/components/layout/PolicyLayout";

const PrivacyPolicy = () => {
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "collection", title: "2. Collection of Information" },
    { id: "use", title: "3. Use of Your Information" },
    { id: "disclosure", title: "4. Disclosure of Your Information" },
    { id: "security", title: "5. Security of Your Information" },
    { id: "contact", title: "6. Contact Us" },
  ];

  return (
    <PolicyLayout
      title="Privacy Policy"
      sections={sections}
    >
      <section id="introduction" className="scroll-mt-24">
        <h2>1. Introduction</h2>
        <p>
          Welcome to SellSync ("we," "our," or "us"). We comprise of SellSync and its affiliates. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services (collectively, "Products").
        </p>
        <p className="mt-4">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
      </section>

      <section id="collection" className="scroll-mt-24">
        <h2>2. Collection of Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site and our Products.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
        </ul>
      </section>

      <section id="use" className="scroll-mt-24">
        <h2>3. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process your payments and refunds.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
          <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Notify you of updates to the Site and Products.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
        </ul>
      </section>

      <section id="disclosure" className="scroll-mt-24">
        <h2>4. Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul>
          <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
          <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
          <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
        </ul>
      </section>

      <section id="security" className="scroll-mt-24">
        <h2>5. Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24">
        <h2>6. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <div className="mt-4 p-6 bg-gray-50 rounded-lg">
          <p className="font-bold text-[#1C244B]">SellSync Support</p>
          <p>Email: support@sellsync.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Tech Park Blvd, Suite 100, San Francisco, CA 94107</p>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
