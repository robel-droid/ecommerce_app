import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  const [quantity, setQuanity] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
        };
        const handleSubmit = event => {
          event.preventDefault();
      
          const formData = new FormData();
          formData.append("name", name);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("quantity", quantity);
          formData.append("image", image);
      
          axios.post("http://localhost:3001/add", formData, {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          })
          .then(response => {
              console.log(response.data);
              if(response.data === 200){
                  alert("product added ");
              }
          })
          .catch(error => {
              console.log(error);
          });
      };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
      </label>
      <br/>
      <lable>
        Quantity:
        <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={event=>setQuanity(event.target.value)}
        />

      </lable>
      <br/>
      <button type="submit">Add Product</button> 
    </form>
  );
};

export default AddProduct;
