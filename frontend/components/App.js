import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {
  const [dogs, setDogs ] = useState([])
  const [currendDogId, setCurrentDog] = useState(null)

  useEffect(() => { getDogs () }, [])

  const getDogs = () => {
    fetch('/api/dogs')
      .then(res => {
        if (!res.ok) throw new Error('Problems GETing dogs ')
        return res.json()
      })
      .then(setDogs)
      .catch(err => console.error(err))
  }
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
          dogs={dogs}
          getDogs={getDogs}
          setCurrentDog={setCurrentDog}
        />} />
        <Route path="/form" element={<DogForm 
          dog={currendDogId && dogs.find(d => d.id == currendDogId)}
          getDogs={getDogs}
          reset={() => setCurrentDog(null)}
        />} />
      </Routes>
    </div>
  )
}
