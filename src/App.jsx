import React, { useState } from 'react'

export default function App() {
  const [events] = useState([
    { id: 1, name: 'Emily Schmidt Wedding', staff: ['Captain', 'Server', 'Chef'] },
    { id: 2, name: 'Corporate Gala', staff: ['Captain', 'Server', 'Utility'] }
  ])
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>🍽️ EventOps Dashboard (Vite)</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h2>Events</h2>
          {events.map(e => (
            <div key={e.id}
                 style={{ border: '1px solid #ccc', margin: 5, padding: 10, cursor: 'pointer' }}
                 onClick={() => setSelected(e)}>
              {e.name}
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
          {selected ? (
            <div>
              <h2>{selected.name}</h2>
              <h3>Staff Assignment</h3>
              <ul>{selected.staff.map((r, i) => <li key={i}>{r}</li>)}</ul>
              <button onClick={() => alert('BEO Generated!')}>Generate BEO</button>
            </div>
          ) : <p>Select an event to view details</p>}
        </div>
      </div>
    </div>
  )
}
