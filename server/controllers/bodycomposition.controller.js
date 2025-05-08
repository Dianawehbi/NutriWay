import Body from "../models/BodyComposition.model.js";

export const addBodyComposition = async (req, res) => {
    try {
        const { dietitian_id, client_id, bmi, fat, includeMealPlan, muscle, water, weight } = req.body;
        let newBodycomposition;
        if (includeMealPlan) {
            const weeklyMealPlan = req.body.weeklyMealPlan;

            newBodycomposition = new Body({
                dietitian_id,
                client_id,
                bmi,
                fat,
                includeMealPlan,
                muscle,
                water,
                weeklyMealPlan,
                weight
            })
            await newBodycomposition.save()
        } else {
            newBodycomposition = new Body({
                dietitian_id,
                client_id,
                bmi,
                fat,
                includeMealPlan,
                muscle,
                water,
                weight
            })
            await newBodycomposition.save()
        }
        return res.status(200).json({ success: true, body: newBodycomposition })
    } catch (error) {
        return res.status(500).json({ success: false, error: "add body composition server error" + error })
    }
}

export const getBodyCompositionById = async (req, res) => {
    const { id } = req.params;
    try {
        const bodyComposition = await Body.find({ client_id: id });

        if (!bodyComposition) {
            return res.status(404).json({ success: false, error: "Body Composition not found" });
        }
        return res.status(200).json({ success: true, bodyComposition });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while fetching Body Composition" });
    }
}