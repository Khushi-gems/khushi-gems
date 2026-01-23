
"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Last updated: July 29, 2024
        </p>
      </header>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <p>
          This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use our Service and explains your privacy rights and how the law protects you.
        </p>
        <p>
            We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
        </p>
        
        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Interpretation and Definitions</h2>
        <h3>Interpretation</h3>
        <p>Words with capitalized initials have meanings defined under the following conditions. The definitions shall have the same meaning whether they appear in singular or plural.</p>
        
        <h3>Definitions</h3>
        <p>For the purposes of this Privacy Policy:</p>
        <ul>
            <li><strong>Account:</strong> A unique account created for you to access our Service or parts of our Service.</li>
            <li><strong>Affiliate:</strong> Any entity that controls, is controlled by, or is under common control with a party.</li>
            <li><strong>Company:</strong> Referred to as "the Company", "We", "Us" or "Our", refers to Khushi Jewels / Khushi Gems & Jewels, E-563, 1st Floor, Murlipura Scheme, Opp Shree Jeen Mata Temple, Jaipur, Rajasthan.</li>
            <li><strong>Cookies:</strong> Small files stored on your device containing browsing details.</li>
            <li><strong>Country:</strong> Refers to Karnataka, India.</li>
            <li><strong>Device:</strong> Any device capable of accessing the Service (computer, phone, tablet, etc.)</li>
            <li><strong>Personal Data:</strong> Any information related to an identified or identifiable individual.</li>
            <li><strong>Service:</strong> Refers to the Website.</li>
            <li><strong>Service Provider:</strong> Any natural or legal person who processes the data on behalf of the Company.</li>
            <li><strong>Third-party Social Media Service:</strong> Any social network or platform enabling account login or registration.</li>
            <li><strong>Usage Data:</strong> Automatically collected data such as IP address, browser type, time spent, etc.</li>
            <li><strong>Website:</strong> Refers to Khushi Jewels, accessible from https://khushijewels.in</li>
            <li><strong>You:</strong> The individual or entity accessing the Service.</li>
        </ul>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Collecting and Using Your Personal Data</h2>
        <h3>Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>While using our Service, we may request the following identifiable information:</p>
        <ul>
            <li>Email address</li>
            <li>First and last name</li>
            <li>Phone number</li>
            <li>Address, State, City, ZIP Code</li>
            <li>Usage Data</li>
        </ul>

        <h4>Usage Data</h4>
        <p>Automatically collected data such as:</p>
        <ul>
            <li>IP address</li>
            <li>Browser details</li>
            <li>Pages visited</li>
            <li>Time spent</li>
            <li>Device information</li>
        </ul>

        <h4>Data From Mobile Devices</h4>
        <p>Includes device ID, IP, OS, browser type, and diagnostic data.</p>
        
        <h4>Information from Social Media</h4>
        <p>If you log in using Google, Facebook, Twitter, or LinkedIn, we may access name, email, contact list, and profile information linked to those accounts.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Tracking Technologies & Cookies</h2>
        <p>We use Cookies, Web Beacons, and tracking scripts to analyze and improve our Service.</p>
        <p>Types of Cookies:</p>
        <ol>
            <li><strong>Necessary Cookies (Session):</strong> Essential for authentication and security.</li>
            <li><strong>Acceptance Cookies (Persistent):</strong> Remember if you accepted cookies.</li>
            <li><strong>Functionality Cookies (Persistent):</strong> Save login details and preferences for a personalized experience.</li>
        </ol>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Use of Your Personal Data</h2>
        <p>We may use your data for:</p>
        <ul>
            <li>Providing and maintaining the Service</li>
            <li>Managing your account</li>
            <li>Processing orders and contracts</li>
            <li>Contacting you with updates or important notices</li>
            <li>Sending offers and promotions (unless you opt out)</li>
            <li>Managing customer support requests</li>
            <li>Business transfers (merger, acquisition, sale)</li>
            <li>Analytics and improvements</li>
        </ul>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Sharing Your Personal Data</h2>
        <p>We may share your data with:</p>
        <ul>
            <li><strong>Service Providers</strong> for analytics and communication</li>
            <li><strong>Affiliates</strong> with the same privacy obligations</li>
            <li><strong>Business partners</strong> for promotions</li>
            <li><strong>Public users</strong> if you share data publicly</li>
            <li>With your <strong>consent</strong> for specific purposes</li>
        </ul>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Retention of Data</h2>
        <p>We retain your Personal Data only as long as needed for legal compliance, to resolve disputes, and to enforce agreements. Usage Data may be retained longer for security or Service improvement.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Transfer of Data</h2>
        <p>Your data may be transferred outside your state/country. We ensure adequate security measures before transferring data to another location.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Delete Your Data</h2>
        <p>You may delete or update your information through your account or request manual deletion by contacting us. Some data may be retained for legal obligations.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Disclosure of Data</h2>
        <h3>Business Transactions</h3>
        <p>If involved in a merger or acquisition, your data may be transferred with notice.</p>
        <h3>Law Enforcement</h3>
        <p>We may disclose data when required by law.</p>
        <h3>Other Legal Purposes</h3>
        <p>Including protecting company rights, preventing fraud, ensuring user safety, and limiting legal liability.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Security of Data</h2>
        <p>We use commercially acceptable methods to protect your data, but no electronic storage method is 100% secure.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Children's Privacy</h2>
        <p>We do NOT collect data from anyone under 13. If you believe a child has provided data, contact us to remove it immediately.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">External Website Links</h2>
        <p>We are not responsible for third-party websites linked from our Service. Users should review the privacy policies of external sites.</p>

        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Changes to This Privacy Policy</h2>
        <p>We may update this policy from time to time. You will be notified through email and a prominent notice on our Service. Updates become effective when posted.</p>
        
        <h2 className="mt-12 font-headline text-3xl font-bold text-foreground">Contact Us</h2>
        <p>If you have questions about this Privacy Policy, you may contact us at:</p>
        <ul>
            <li> anilsoni7104@gmail.com</li>
            <li> +91 9928070606</li>
            <li> E-563, 1st Floor, Murlipura Scheme, Opp Shree Jeen Mata Temple, Jaipur, Rajasthan.</li>
        </ul>
      </div>
    </motion.div>
  );
}
