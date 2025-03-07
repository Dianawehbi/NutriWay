import { motion } from "framer-motion";
// import image from '../../assets/headerpicture.jpg';
const services = [
  {
    title: "Fat Freezing",
    description: "A non-invasive procedure to reduce fat cells and sculpt your body.",
    image: "../../assests/slimming.jpg"
  },
  {
    title: "Slimming",
    description: "Personalized slimming programs to help you achieve your ideal weight.",
    image: "/images/slimming.png"
  },
  {
    title: "Diet Plan & Body Composition",
    description: "Customized diet plans and body composition analysis for optimal health.",
    image: "/images/diet-plan.png"
  }
];

export default function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#D0DBC2] h-auto w-full px-6 py-6 lg:py-12 m-0 rounded-b-[500px] text-center font-serif"
    >
      <h2 className="lg:text-5xl text-3xl font-extrabold text-[#234403] mb-12">Our Services</h2>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white  p-6 lg:p-10 w-11/12 lg:w-auto rounded-3xl shadow-xl space-x-8 flex flex-row lg:flex-col  items-center text-start lg:text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          >
            <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-r rounded-full mb-6 shadow-lg animate-[wiggle_3s_ease-in-out_infinite]">
              <img src={service.image} alt={service.title} className="w-25 h-25 rounded-full" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800">{service.title}</h3>
              <p className=" lg:text-lg text-gray-600 mt-3 max-w-xs">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
