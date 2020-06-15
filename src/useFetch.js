import { useState, useEffect } from "react"


export const useFetch = (url) => {
  const [state, setState] = useState("");
  useEffect(() => {
    fetch(url).then(res => res.json())
      .then(data => {
        console.log(data.length)
      })
  }, [url])
  return state;
}