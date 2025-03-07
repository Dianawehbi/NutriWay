import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Card from "../Card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Custom hook to detect if element is in view
const useInView = () => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.5 } // Trigger animation when 50% of the element is visible
        );

        const element = document.getElementById("product_section");
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return inView;
};


const products = [
    { id: 1, }, { id: 2, }, { id: 3, }, { id: 4, }, { id: 5, }, { id: 1, }, { id: 2, }, { id: 3, }
];

export default function ProductSection() {
    const inView = useInView(); // State to track visibility of the section

    return (
        <motion.div
            id="product_section"
            className=" p-6  w-full overflow-hidden" >
            <h2 className="text-2xl  text-[#234403] font-bold mb-4">Featured Products</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 p-2 items-center max-w-full">
                {products.map((product) => (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="flex-shrink-0">
                        <Card product={product} />
                    </motion.div>

                ))}
                <Link
                    to="/pages/Shop"
                    className="flex flex-col items-center justify-center  text-gray-800 hover:bg-gray-500 hover:text-white  px-4 py-2 rounded-full min-w-[80px] h-20 transition-all duration-200"
                >
                    <IoArrowForwardCircleOutline size={24} />
                    <span className="mt-2 text-sm">More</span>
                </Link>

            </div>
        </motion.div>
    );
}
