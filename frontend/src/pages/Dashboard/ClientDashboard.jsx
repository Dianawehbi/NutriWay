// API key : 64c82e5e29dfc562e98260b122ff207a
// nutritionix

import Header from "../../components/Home/Header";
import NutritionDashboard from "../../components/Home/BodyCompositionSection";
import ProductSection from "../../components/Home/productSection_Home";
import ServicesSection from "../../components/Home/ServicesSection";
import Footer from "../../components/Footer";
import CaloriesOverview from "../../components/Home/CaloriesSection";
import RecipeSection from "../../components/Home/MealSection";
import  Dietitian from "../../components/Home/DietianSection";
export default function ClientDashboard() {
    return (
        <div className="h-auto bg-gray-100 flex flex-col items-center justify-center">
            <Header />
            <NutritionDashboard />
            <ProductSection />
            <ServicesSection />
            <RecipeSection />
            <CaloriesOverview />
            <Dietitian/>
            <Footer />
        </div>
    );
}