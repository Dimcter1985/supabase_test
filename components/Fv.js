import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'


const Fv = ({ id }) => {
  const router = useRouter()
  const [storageItem, setStorageItem] = useState();

  const isFavourited = storageItem?.includes(id);

  const handleToggleFavourite = () => {
    if (!isFavourited) {

      const newStorageItem = [...storageItem, id]
      setStorageItem(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem));
      router.reload(window.location.pathname)

    } else {

      const newStorageItem = storageItem.filter((savedId) => savedId !== id)
      setStorageItem(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem))
      router.reload(window.location.pathname)

    }
  }

  useEffect(() => {
    setStorageItem(JSON.parse(localStorage.getItem("favourites") || "[]"));
  }, []);


  return (
    <button
    style={{height:"30px", width:"40px"}}
    onClick={handleToggleFavourite}
    >
    {isFavourited ? "yes" : "no"}
  </button>
  );


};

export default Fv;