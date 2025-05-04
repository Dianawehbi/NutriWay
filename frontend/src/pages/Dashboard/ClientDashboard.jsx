// API key : 64c82e5e29dfc562e98260b122ff207a
// nutritionix

import Header from "../../components/Client/Header";
import NutritionDashboard from "../../components/Client/BodyCompositionSection";
import ServicesSection from "../../components/Client/ServicesSection";
import Footer from "../../components/Footer";
import DietitianOverview from "../../components/Client/CaloriesSection";
import RecipeSection from "../../components/Client/MealSection";
import Dietitian from "../../components/Client/DietianSection.jsx";
import { useEffect } from "react";

const ClientDashboard = () => {

    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true');
            window.location.reload();
        }
    }, []);
    return (
        <div className="h-auto bg-gray-100 flex flex-col items-center justify-center">
            <Header />
            <NutritionDashboard />
            <ServicesSection />
            <RecipeSection />
            <DietitianOverview />
            <Dietitian />
            <Footer />
        </div>
    );
}

export default ClientDashboard;