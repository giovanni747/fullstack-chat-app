import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ... other imports and middleware ...

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = path.join(__dirname, '../../frontend/dist')
    
    app.use(express.static(frontendBuildPath))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'))
    })
}