
import { useState } from 'react'
import Header from "./components/Header.jsx"
import Library from "./components/Library.jsx"

function App() {

  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main>
      <Header setSearchQuery={setSearchQuery}/>
      <Library searchQuery={searchQuery}/>
    </main>

  )
}

export default App
