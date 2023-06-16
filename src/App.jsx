import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const DOMAIN = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // efecto para recuperar la cita al cargar la img
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // efecto para recuperar una img a partir de las 3 palabras
  useEffect(() => {
    if (!fact) return
    const threeFisrtWord = fact.split(' ', 3).join(' ')
    console.log(threeFisrtWord)

    fetch(`https://cataas.com/cat/says/${threeFisrtWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return (

    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact} </p>}
      {imageUrl && <img src={`${DOMAIN}${imageUrl}`} alt={`imagen extraida usando las primeras tres palabras - ${fact}`} />}
    </main>
  )
}
