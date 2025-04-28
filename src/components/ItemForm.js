import React, { useState,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
     <ItemForm onAddItem={(newItem) => setItems([...items, newItem])} />

      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
       <Item
       key={item.id}
       item={item}
       onUpdateItem={(updatedItem) => {
         const updatedItems = items.map((i) =>
           i.id === updatedItem.id ? updatedItem : i
         );
         setItems(updatedItems);
       }}
       onDeleteItem={(deletedItem) => {
         const updatedItems = items.filter((i) => i.id !== deletedItem.id);
         setItems(updatedItems);
       }}
     />
     
       
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;