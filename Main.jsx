import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import  { getRecipeFromMistral }  from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState( [])
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
       <>
       
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>

       <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <em style={{
    color: '#555',
    fontStyle: 'italic',
    fontSize: '14px',
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px'
  }}>
    Add up to 4 recipes
  </em>
</div>
        </>
    )
}