import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Table from './components/Board.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Table />
  </StrictMode>,
)
