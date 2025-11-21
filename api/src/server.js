import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";   


const app = express();  
const PORT = ENV.PORT || 5001;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {

    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body;

        if (!userId || !recipeId || !title) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newFavorite = await db.insert(favoritesTable).values({
            user_Id: userId,
            recipe_Id: recipeId,
            title,
            image,
            cookTime,
            servings,
        })
        .returning();

        res.status(201).json(newFavorite[0]);
    } catch (error) {
        console.log("error adding favorite", error);
        res.status(500).json({ error: "something went wrong" });

    }
    
});

app.get("/api/favorites/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const userFavorites = await db
        .select()
        .from(favoritesTable)
        .where(eq(favoritesTable.user_Id, userId));

        res.status(200).json(userFavorites);
    } catch (error) {
       console.log("error fetching the favorite", error);
        res.status(500).json({ error: "something went wrong" });
    }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params

        await db
        .delete(favoritesTable)
        .where(
         and(
            eq(favoritesTable.user_Id, userId),
            eq(favoritesTable.recipe_Id, parseInt(recipeId)))
            )
  
            res.status(200).json({ message: "favorite removed successfully" });
        
    } catch (error) {
        console.log("error removing a favorite", error);
        res.status(500).json({ error: "something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
