import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import slimming from '../../assets/slimming.jpg'
import fatfreezingimg from '../../assets/fatfreezing.png'
import dietplanimg from '../../assets/dietplan.jpg'
const services = [
  {
    title: "Fat Freezing",
    description: "A non-invasive procedure to reduce fat cells and sculpt your body.",
    image: fatfreezingimg
  },
  {
    title: "Slimming Program",
    description: "Personalized slimming programs to help you achieve your ideal weight.",
    image: slimming
  },
  {
    title: "Diet Plan & Analysis",
    description: "Customized diet plans and body composition analysis for optimal health.",
    image: dietplanimg
  }
];

export default function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-b from-[#e1e8d8] to-[#d2e1c5] h-auto w-full px-6 py-12 lg:py-20 rounded-b-[100px] lg:rounded-b-[200px] text-center font-serif"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-extrabold text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Premium Services
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Link to="/AppointmentBookingPage" className="block h-full">
                <div className="bg-white h-full p-6 rounded-3xl shadow-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:bg-gray-50">
                  <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden shadow-md border-4 border-white">
                    <motion.img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full" />
                  </div>
                  
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-1">{service.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto"
                    >
                      <button className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#1a3502] transition-colors">
                        Book Now
                      </button>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}