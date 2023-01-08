import React, { useEffect, useState, useRef } from "react";

const Favorite = ({ id }) => {
  const [storageItem, setStorageItem] = useState([]);

  const storagedArray = useRef(storageItem)
  const isFavourited = storagedArray.current.includes(id)

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      storagedArray.current.push(id)
      setStorageItem(JSON.stringify(storagedArray.current))
    } else {
      const indexFavouritedId = storagedArray.current.indexOf(id)
      storagedArray.current.splice(indexFavouritedId, 1)
      setStorageItem(JSON.stringify(storagedArray.current))
    }
  }

  useEffect(() => {
    setStorageItem(JSON.parse(localStorage.getItem("favourites") || "[]"));
  }, []);

  return (
    <button 
    onClick={handleToggleFavourite}
    > 
      {isFavourited ? (
        'yes'
      ) : (
        'no'
      )}
    </button>
  );


};

export default Favorite;