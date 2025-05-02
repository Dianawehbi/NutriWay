import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Make Appointment", path: "/pages/Appointment" },
    { name: "Contact Us", path: "/pages/Contact" },
    { name: "Our Dietitians", path: "/dietitians" },
    { name: "Services", path: "/services" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

  const socialLinks = [
    { icon: <FaFacebook className="text-lg" />, url: "https://facebook.com" },
    { icon: <FaTwitter className="text-lg" />, url: "https://twitter.com" },
    { icon: <FaInstagram className="text-lg" />, url: "https://instagram.com" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-[#D0DBC2] text-gray-700 py-12 px-6 font-serif w-full"
    >
      <div className="max-w-screen-xl mx-auto" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">About NutriWay</h2>
            <p className="text-gray-600">
              NutriWay is dedicated to helping you live a healthier life through personalized nutrition plans, expert consultations, and premium health products.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Quick Links</h2>
            <ul className="space-y-3">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-green-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">More Links</h2>
            <ul className="space-y-3">
              {footerLinks.slice(3).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-green-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="mt-1 text-green-600" />
                <a href="mailto:support@nutriway.com" className="text-gray-600 hover:text-green-700 transition-colors">
                  support@nutriway.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhoneAlt className="mt-1 text-green-600" />
                <span className="text-gray-600">+1 234 567 890</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors shadow-sm"
                  aria-label={social.url.split('//')[1].split('.')[0]}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section with Copyright */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-600"
        >
          <p>&copy; {new Date().getFullYear()} NutriWay. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}