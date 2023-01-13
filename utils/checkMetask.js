import { useEffect, useState } from "react";

export default function Metamsk () {
  const [metamask, setMetamask] = useState(true);

  async function metamaskIsExist() {
      if (typeof window.ethereum !== "undefined") {
        setMetamask(true);
      } else {
        setMetamask(false);
      }  
  }
  useEffect(() => {
    metamaskIsExist();
  },[metamask])
  
  return {metamask}; 
}