export const styles = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0A0C10;overflow:hidden;-webkit-font-smoothing:antialiased}
@property --laser-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
@property --shimmer-pos{syntax:'<percentage>';initial-value:-100%;inherits:false}
@property --glow-intensity{syntax:'<number>';initial-value:0;inherits:false}
@keyframes laserSpin{to{--laser-angle:360deg}}
.laser-ring{background:conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)}
@keyframes panelDown{0%{opacity:0;transform:translateY(16px) scale(.99);filter:blur(2px)}60%{filter:blur(0)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
@keyframes panelUp{0%{opacity:0;transform:translateY(-16px) scale(.99);filter:blur(2px)}60%{filter:blur(0)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
@keyframes panelIn{0%{opacity:0;transform:translateY(12px) scale(.99);filter:blur(2px)}60%{filter:blur(0)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes statusPulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes pingPulse{0%{transform:scale(1);opacity:.4}100%{transform:scale(2.5);opacity:0}}
@keyframes dotPulse{0%,100%{opacity:.15;transform:scale(1)}50%{opacity:.7;transform:scale(1.4)}}
@keyframes stagger{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes bootLine{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
@keyframes bootBar{from{width:0}to{width:100%}}
@keyframes msgIn{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes aiPulseIn{0%{opacity:0;transform:scale(.95)}30%{opacity:1;transform:scale(1.02)}100%{transform:scale(1)}}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.05);border-radius:2px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.1)}
input::placeholder{color:rgba(255,255,255,.16)}
::selection{background:rgba(74,158,255,.15)}
@keyframes nameGlow{0%,100%{filter:drop-shadow(0 2px 4px rgba(0,0,0,.2)) drop-shadow(0 0 20px rgba(196,202,214,.18)) drop-shadow(0 0 40px rgba(74,158,255,.08))}50%{filter:drop-shadow(0 2px 4px rgba(0,0,0,.2)) drop-shadow(0 0 28px rgba(196,202,214,.28)) drop-shadow(0 0 56px rgba(74,158,255,.14))}}
@keyframes ambientFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(15px,-20px) scale(1.1)}}
@keyframes progressGrow{from{width:0}to{width:var(--progress,0%)}}
@keyframes textShimmer{0%{background-position:-200% 50%}100%{background-position:200% 50%}}
@keyframes gentlePulse{0%,100%{box-shadow:0 0 15px var(--pulse-color,rgba(74,158,255,.15)),inset 0 0 15px var(--pulse-color,rgba(74,158,255,.05))}50%{box-shadow:0 0 25px var(--pulse-color,rgba(74,158,255,.25)),inset 0 0 25px var(--pulse-color,rgba(74,158,255,.08))}}
@keyframes metalSheen{0%{background-position:-200% 50%}100%{background-position:200% 50%}}
@keyframes glitchFlash{0%,100%{clip-path:inset(0)}8%{clip-path:inset(20% 0 60% 0);transform:translate(-2px)}16%{clip-path:inset(60% 0 10% 0);transform:translate(2px)}24%{clip-path:inset(40% 0 30% 0);transform:translate(-1px)}32%{clip-path:inset(0);transform:translate(0)}}
@keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
@keyframes scrambleIn{0%{opacity:0;filter:blur(4px)}30%{opacity:1;filter:blur(2px)}100%{filter:blur(0)}}
@keyframes meshFloat{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
`;
