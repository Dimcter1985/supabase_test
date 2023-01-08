import { useEffect, useState } from 'react';
import Fv from '../components/Fv';
import { supabase } from "../supabase";

export default function Favorites({products}) {
  const [storageItem, setStorageItem] = useState();
  const filteredArr = products.map((el) => {
    if (storageItem?.includes(el.id)) {
      return el
    }
  })


  // console.log(products);
  // console.log(storageItem);

  console.log(filteredArr);

  useEffect(() => {
    setStorageItem(JSON.parse(localStorage.getItem("favourites") || "[]"));
  }, [])

  return (
    <main>
    <h1>Избранное</h1>
    <ul style={{display:"flex", listStyle:"none", gap:"20px"}}>
      {
        filteredArr.map((el) => (
          el && 
          <li key={el.id} style={{
            width:"250px",
            height:"350px",
            border:"1px solid gray",
            background:"white",
            color:"black",
            display:"flex",
            justifyContent:"space-between",
            padding:"10px"
            }}>
            <h2>{el.title}</h2>
            <Fv id={el.id}/>
            {/* <Favorite id={el.id}/> */}
          </li>
        
        ))
      }
    </ul>
  </main>
  )

}


export async function getServerSideProps() {
  
  const { data } = await supabase.from("products").select("id, title");

  return {
    props: {
      products: data
    },
  };
}