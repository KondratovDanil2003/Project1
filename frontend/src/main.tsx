import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWrapper } from './AppWrapper'

const rootElement = document.getElementById('main-react-root')!; // rootElement всегда не null

createRoot(rootElement).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
)