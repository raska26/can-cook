const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const MealAPI = {
  // search meal by name
  searchMealsByName: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error searching meals by name:", error);
      return [];
    }
  },

  // lookup full meal details by ID
  getMealDetailsById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent()}`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error("Error getting meal details by ID:", error);
      return null;
    }
  },
};
