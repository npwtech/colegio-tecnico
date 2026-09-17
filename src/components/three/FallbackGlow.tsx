/** Static, CSS-only stand-in for the 3D network scene — used when WebGL is
 * unavailable or the visitor prefers reduced motion. Keeps the same visual
 * language (navy depth + gold nodes) without any WebGL or heavy JS cost. */
export function FallbackGlow() {
  return (
    <div className="absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[6vw]" aria-hidden="true">
      <div className="relative size-[70vmin] max-w-[560px]">
        <div
          className="absolute inset-0 rounded-full opacity-70 blur-3xl"
          style={{
            background: 'radial-gradient(closest-side, rgba(255,209,0,0.28), rgba(11,45,99,0.22) 60%, transparent 75%)',
          }}
        />
        <svg viewBox="0 0 200 200" className="relative size-full opacity-80">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#5b7fc4" strokeOpacity="0.35" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#5b7fc4" strokeOpacity="0.3" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#ffd100" strokeOpacity="0.5" strokeWidth="0.7" />
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2
            const r = 70
            const x = 100 + Math.cos(angle) * r
            const y = 100 + Math.sin(angle) * r
            return <circle key={i} cx={x} cy={y} r="2.6" fill="#ffd100" />
          })}
          <circle cx="100" cy="100" r="12" fill="#ffe066" opacity="0.9" />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-display)"
            fontWeight="800"
            fontSize="13"
            fill="#0b2d63"
          >
            S
          </text>
        </svg>
      </div>
    </div>
  )
}
