import { useEffect, useState } from "react";

export default function isLoadin() {
   const [loading, setLoading ] = useState(false);
   
   useEffect(() => {
        setLoading(true);
   },[])

   return loading;
}