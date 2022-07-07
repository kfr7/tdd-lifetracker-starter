import "./NutritionForm.css"
import * as React from "react"
// use above for all nutrition paths
import { useNutritionContext } from  "../../../contexts/nutrition"
import { useNavigate } from "react-router-dom"



export default function NutritionForm( {} ) {
    const navigate = useNavigate()
    // right below import the function to add a nutrition item for a user
    const { refresh, setRefresh, postNutritionItem } = useNutritionContext()

    const [form, setForm] = React.useState({
        name: "",
        calories: 1,
        category: "",
        quantity: 1,
        imageUrl: ""
    })

    const handleOnInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleOnSubmit = () => {
        if (form.name === "" || form.category == "" || form.imageUrl == "")
        {
            console.log("Error here because some field was left blank in add nutrition")
            return
        }
        postNutritionItem({name: form.name.toLowerCase(),
        calories: form.calories,
        category: form.category.toLowerCase(),
        quantity: form.quantity,
        imageUrl: form.imageUrl
    })
        setRefresh(!refresh)
        navigate("/nutrition")
    }

  return (
    <div className="nutrition-form">
        <div className="input-field">
            <label htmlFor="name">Name</label>
            <br></br>
            <input 
                type="text" 
                name="name" 
                placeholder="Nutrition name" 
                value={form.name}
                onChange={handleOnInputChange} />
        </div>
        <div className="input-field">
            <label htmlFor="calories">Calories</label>
            <br></br>
            <input 
                type="number" 
                name="calories" 
                placeholder="Nutrition calories" 
                value={form.calories}
                onChange={handleOnInputChange} />
        </div>
        <div className="input-field">
            <label htmlFor="category">Category</label>
            <br></br>
            <input 
                type="text" 
                name="category" 
                placeholder="Nutrition category" 
                value={form.category}
                onChange={handleOnInputChange} />
        </div>
        <div className="input-field">
            <label htmlFor="quantity">Quantity</label>
            <br></br>
            <input 
                type="number" 
                name="quantity" 
                placeholder="Nutrition quantity" 
                value={form.quantity}
                onChange={handleOnInputChange} />
        </div>
        <div className="input-field">
            <label htmlFor="imageUrl">Image Url</label>
            <br></br>
            <input 
                type="text" 
                name="imageUrl" 
                placeholder="Image Url" 
                value={form.imageUrl}
                onChange={handleOnInputChange} />
        </div>
        <button className="submit-nutrition" onClick={handleOnSubmit}>Save</button>
    </div>
  )
}