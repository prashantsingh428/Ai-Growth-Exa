import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [data, setData] = useState({ message: 'Loading...' })

    useEffect(() => {
        // Basic test fetch to server
        // Assuming proxy or CORS calls. For now hardcoded localhost:5000 
        // (Ensure CORS is enabled on server, which it is)
        axios.get('http://localhost:5000/')
            .then(res => setData(res.data))
            .catch(err => setData({ message: 'Error connecting to server' }))
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-blue-500">Ai Growth Exa</h1>
            <p className="text-xl text-gray-300">AI Based Marketing Agency</p>

            <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-2">Backend Status:</h2>
                <p className="text-green-400 font-mono">{data.message}</p>
                {data.status && <p className="text-sm text-gray-500 mt-2">Status: {data.status}</p>}
            </div>
        </div>
    )
}

export default App
