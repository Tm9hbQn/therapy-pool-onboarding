import { useState, useRef } from 'react'
import './index.css'

export default function App() {
  const [goal, setGoal] = useState('')
  const [safety, setSafety] = useState({ wounds: false, seizures: false })
  const [docsUploaded, setDocsUploaded] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [appointment, setAppointment] = useState('')
  
  const screensRef = useRef<(HTMLDivElement | null)[]>([])

  const scrollToScreen = (index: number) => {
    screensRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  // --- Screen 5: Slide to Confirm ---
  const [slidePos, setSlidePos] = useState(0)
  const slideContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !slideContainerRef.current) return
    const rect = slideContainerRef.current.getBoundingClientRect()
    let newPos = e.clientX - rect.left - 30
    if (newPos < 0) newPos = 0
    if (newPos > rect.width - 60) newPos = rect.width - 60
    setSlidePos(newPos)
    
    if (newPos >= rect.width - 65) {
      setIsDragging(false)
      scrollToScreen(5)
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    if (slideContainerRef.current) {
      const rect = slideContainerRef.current.getBoundingClientRect()
      if (slidePos < rect.width - 65) {
        setSlidePos(0) // snap back
      }
    }
  }

  // --- Screen 6: Upload Simulation ---
  const handleUpload = () => {
    if (docsUploaded) return
    setUploadProgress(10)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setDocsUploaded(true)
          setTimeout(() => scrollToScreen(6), 600)
          return 100
        }
        return prev + 20
      })
    }, 300)
  }

  // --- Screen 7: Mock Calendar ---
  const dates = Array.from({length: 7}, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })

  return (
    <div className="app-container" dir="rtl">
      
      {/* Screen 1: Hook */}
      <div className="screen water-bg" ref={el => { screensRef.current[0] = el }}>
        <div className="glass-panel">
          <h1 className="title">ברוכים הבאים</h1>
          <p className="subtitle">הצוות הקליני שלנו מוכן להתחיל את המסע של שירה במים.</p>
          <button 
            className="btn bounce mx-auto" 
            style={{margin: '0 auto'}}
            onClick={() => scrollToScreen(1)}
            id="start-journey-btn"
          >
            החליקו למטה כדי להתחיל ↓
          </button>
        </div>
      </div>

      {/* Screen 2: Goal */}
      <div className="screen" ref={el => { screensRef.current[1] = el }}>
        <div className="glass-panel">
          <h2 className="title">כדי שנוכל להתאים לשירה את המרחב המדויק ביותר, מה המיקוד העיקרי שלנו?</h2>
          <div className="card-grid">
            {['חיזוק מוטורי ויציבה', 'ויסות חושי ורגיעה', 'חיזוק ביטחון במים', 'קשר ותקשורת'].map(g => (
              <div 
                key={g}
                className={`goal-card ${goal === g ? 'selected' : ''}`}
                onClick={() => {
                  setGoal(g)
                  setTimeout(() => scrollToScreen(2), 400)
                }}
              >
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen 3: Safety */}
      <div className="screen" ref={el => { screensRef.current[2] = el }}>
        <div className="glass-panel">
          <h2 className="title">הבטיחות של שירה קודמת לכול</h2>
          <p className="subtitle">אנא אשרו את הפרטים הבאים:</p>
          
          <div className="toggle-wrapper">
            <span>ללא פצעים פתוחים או זיהומים</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={safety.wounds} onChange={(e) => setSafety({...safety, wounds: e.target.checked})} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-wrapper">
            <span>ללא עבר של פרכוסים לא מאוזנים</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={safety.seizures} onChange={(e) => setSafety({...safety, seizures: e.target.checked})} />
              <span className="slider"></span>
            </label>
          </div>

          {safety.wounds && safety.seizures && (
            <button className="btn" style={{margin: '0 auto', marginTop: '2rem'}} onClick={() => scrollToScreen(3)}>
              המשך
            </button>
          )}
        </div>
      </div>

      {/* Screen 4: Prep */}
      <div className="screen" ref={el => { screensRef.current[3] = el }}>
        <div className="glass-panel">
          <h2 className="title">מה אורזים למפגש הראשון?</h2>
          <div style={{textAlign: 'right', marginBottom: '2rem'}}>
            <p>✅ מגבת גדולה</p>
            <p>✅ בגד ים נוח</p>
            <p>✅ <b>חיתול ים (חובה)</b></p>
          </div>
          
          <div style={{background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'right'}}>
            💡 <strong>טיפ מהצוות שלנו:</strong> תנו לשירה לארוז את התיק יחד איתכם. חשיפה מוקדמת...
          </div>

          <button className="btn" style={{margin: '0 auto'}} onClick={() => scrollToScreen(4)}>
            הבנתי
          </button>
        </div>
      </div>

      {/* Screen 5: Contract */}
      <div className="screen" ref={el => { screensRef.current[4] = el }}>
        <div className="glass-panel">
          <h2 className="title">הזמן והמרחב שלכם</h2>
          <p className="subtitle">אנחנו משריינים את הבריכה ואת המטפל.ת במיוחד עבור שירה. ביטול יתאפשר עד 24 שעות לפני המפגש.</p>
          
          <div 
            className="slide-container" 
            ref={slideContainerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="slide-track" style={{width: `${slidePos + 30}px`}}></div>
            <div 
              className="slide-thumb" 
              style={{transform: `translateX(${slidePos}px)`}}
              onPointerDown={() => setIsDragging(true)}
            >
              💧
            </div>
            <span style={{position:'absolute', right: '20px', top: '18px', color: '#64748b', pointerEvents:'none'}}>
              החליקו לאישור
            </span>
          </div>
        </div>
      </div>

      {/* Screen 6: Upload */}
      <div className="screen" ref={el => { screensRef.current[5] = el }}>
        <div className="glass-panel">
          <h2 className="title">שלב אחרון לפני המים</h2>
          <p className="subtitle">העלו לכאן צילום של הפניית הרופא וטופס 17.</p>
          
          <div 
            style={{border: '2px dashed #94a3b8', padding: '3rem', borderRadius: '16px', cursor: 'pointer', background: 'rgba(255,255,255,0.5)'}}
            onClick={handleUpload}
          >
            {docsUploaded ? '✅ הועלה בהצלחה!' : '📄 לחצו כאן להעלאת מסמכים'}
          </div>

          {uploadProgress > 0 && !docsUploaded && (
            <div style={{marginTop: '1rem', background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
              <div style={{background: '#3b82f6', height: '100%', width: `${uploadProgress}%`, transition: 'width 0.3s'}}></div>
            </div>
          )}
        </div>
      </div>

      {/* Screen 7: Calendar / Success */}
      <div className={`screen ${appointment ? 'success-screen' : ''}`} ref={el => { screensRef.current[6] = el }}>
        <div className="glass-panel">
          {!appointment ? (
            <>
              <h2 className="title">מתי שירה קופצת למים?</h2>
              <p className="subtitle">בחרו מועד למפגש האינטייק הראשון.</p>
              
              <div className="calendar-scroll">
                {dates.map((d, i) => (
                  <div key={i} className="date-col">
                    <div className="date-header">{d.toLocaleDateString('he-IL', {weekday: 'short', day: 'numeric', month: 'numeric'})}</div>
                    {['15:00', '16:00', '17:30'].map(time => (
                      <div 
                        key={time} 
                        className="time-slot"
                        onClick={() => setAppointment(`${d.toLocaleDateString('he-IL')} בשעה ${time}`)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{animation: 'bounce 1s'}}>
              <h1 className="title" style={{fontSize: '3rem'}}>מעולה! 🌊</h1>
              <p className="subtitle" style={{fontSize: '1.5rem', color: 'white'}}>אנחנו מחכים לשירה ב-{appointment}.</p>
              <p>נתראה במים.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
