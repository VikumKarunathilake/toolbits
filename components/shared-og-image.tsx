export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function SharedImage({
  title = 'TOOL COLLECTION',
  description = 'Curated Digital Resources',
}: {
  title?: string
  description?: string
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000', // Dark navy blue like the reference
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          fontSize: 85,
          fontWeight: 900,
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          marginBottom: 40,
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        {title}
      </div>

      {/* Icons Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: 40,
        }}
      >
        {/* Wrench - Blue/Grey */}
        <div style={{ display: 'flex' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            {/* Handle */}
            <path
              d="M14.7 6.3L20 11.6L16.2 15.4L10.9 10.1L14.7 6.3Z"
              fill="#94a3b8"
            />
            {/* Head */}
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              fill="#60a5fa"
            />
             <circle cx="17" cy="7" r="1.5" fill="#1e293b" />
          </svg>
        </div>

        {/* Gear - Yellow/Orange */}
        <div style={{ display: 'flex' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
             <path
              d="M10.3 2.1a1.98 1.98 0 0 1 3.4 0l1.9 3.2a2 2 0 0 0 2.5 1l3.6-1.1a2 2 0 0 1 2.4 2.4l-1.1 3.6a2 2 0 0 0 1 2.5l3.2 1.9a1.98 1.98 0 0 1 0 3.4l-3.2 1.9a2 2 0 0 0-1 2.5l1.1 3.6a2 2 0 0 1-2.4 2.4l-3.6-1.1a2 2 0 0 0-2.5 1l-1.9 3.2a1.98 1.98 0 0 1-3.4 0l-1.9-3.2a2 2 0 0 0-2.5-1l-3.6 1.1a2 2 0 0 1-2.4-2.4l1.1-3.6a2 2 0 0 0-1-2.5l-3.2-1.9a1.98 1.98 0 0 1 0-3.4l3.2-1.9a2 2 0 0 0 1-2.5l-1.1-3.6a2 2 0 0 1 2.4-2.4l3.6 1.1a2 2 0 0 0 2.5-1l1.9-3.2z"
              fill="#fbbf24"
            />
            <circle cx="12" cy="12" r="3.5" fill="#f59e0b" />
            <circle cx="12" cy="12" r="1.5" fill="#172033" />
          </svg>
        </div>

        {/* Code Window - Purple/Blue */}
        <div style={{ display: 'flex' }}>
          <svg width="90" height="80" viewBox="0 0 24 24" fill="none">
             <rect x="2" y="4" width="20" height="16" rx="2" fill="#4c1d95" opacity="0.8" />
             <rect x="2" y="4" width="20" height="16" rx="2" fill="#5b21b6" />
             <path d="M7 20h10" stroke="#8b5cf6" strokeWidth="2" /> 
             {/* Header */}
             <path d="M2 8h20V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" fill="#8b5cf6" />
             <circle cx="5" cy="6" r="1" fill="#ddd" />
             <circle cx="8" cy="6" r="1" fill="#ddd" />
             {/* Code symbols */}
             <path d="M8 12l-2 2 2 2" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
             <path d="M16 12l2 2-2 2" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
             <path d="M11 16l2-4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Megaphone - Red/Yellow */}
        <div style={{ display: 'flex' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
             {/* Handle */}
             <path d="M10 15v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-4" stroke="#fcd34d" strokeWidth="4" />
             {/* Cone */}
             <path d="M2 9v6a1 1 0 0 0 1 1h4l6 4V4l-6 4H3a1 1 0 0 0-1 1z" fill="#ef4444" />
             <path d="M13 4v16" stroke="#b91c1c" strokeWidth="1" /> 
             {/* Sound waves */}
             <path d="M17 7c1.5 1.5 1.5 8.5 0 10" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
             <path d="M20 5c3 3 3 11 0 14" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

         {/* Magnifying Glass - Blue/Teal */}
         <div style={{ display: 'flex' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
             {/* Handle */}
             <path d="M21 21l-4.35-4.35" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
             {/* GlassRim */}
             <circle cx="10.5" cy="10.5" r="7.5" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
             {/* Reflection */}
             <path d="M13 8a3 3 0 0 0-3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Footer Text */}
      <div
        style={{
          fontSize: 32,
          color: '#e2e8f0',
          fontWeight: 400,
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        {description}
      </div>
    </div>
  )
}
