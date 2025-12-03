import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Om Thakur - Full Stack Developer & Tech Content Creator'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '60px',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              marginBottom: '20px',
            }}
          >
            Om Thakur
          </h1>
          <p
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              marginBottom: '30px',
            }}
          >
            Full Stack Developer & Tech Content Creator
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '10px 20px',
                borderRadius: '25px',
                color: 'white',
                fontSize: 18,
              }}
            >
              Web Development
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '10px 20px',
                borderRadius: '25px',
                color: 'white',
                fontSize: 18,
              }}
            >
              Photography
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '10px 20px',
                borderRadius: '25px',
                color: 'white',
                fontSize: 18,
              }}
            >
              Content Creation
            </div>
          </div>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 24,
          }}
        >
          omthakur.tech
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}