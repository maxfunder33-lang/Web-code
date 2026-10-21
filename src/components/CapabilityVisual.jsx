import React,{useId} from 'react';
import './CapabilityVisual.css';

export default function CapabilityVisual({kind}){
 const id=useId().replace(/:/g,'');
 const fill=`url(#${id})`;
 return <svg className="capability-visual" viewBox="0 0 240 140" fill="none" aria-hidden="true">
  <defs><linearGradient id={id} x1="25" y1="10" x2="215" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor="#d4e49a" stopOpacity=".16"/><stop offset="1" stopColor="#d4e49a" stopOpacity=".02"/></linearGradient></defs>
  <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
   {kind==='orbit'&&<>
    <path className="visual-wire" d="M54 43H86Q94 43 94 51V62M54 99H86Q94 99 94 91V78M146 70H175"/>
    <rect x="18" y="25" width="36" height="36" rx="7" fill={fill}/><path d="M29 38h14m-14 7h10"/>
    <rect x="18" y="81" width="36" height="36" rx="7" fill={fill}/><path d="M28 106v-9m8 9V92m8 14V96"/>
    <rect x="94" y="45" width="52" height="52" rx="13" fill={fill}/><path d="M120 56c0 10-4 15-13 15 9 0 13 5 13 15 0-10 4-15 13-15-9 0-13-5-13-15Z"/>
    <rect x="175" y="46" width="47" height="48" rx="8" fill={fill}/><path d="m188 70 7 7 14-15"/><circle cx="80" cy="43" r="2" fill="currentColor"/>
   </>}
   {kind==='layers'&&<>
    <path className="visual-wire" d="M72 36h27q21 0 21 22m-48 48h27q21 0 21-22m48-48h-27q-21 0-21 22m48 48h-27q-21 0-21-22"/>
    {[[26,18],[168,18],[26,88],[168,88]].map(([x,y],i)=><g key={i}><rect x={x} y={y} width="46" height="36" rx="7" fill={fill}/><circle cx={x+13} cy={y+13} r="4"/><path d={`M${x+8} ${y+25}q5-7 10 0m5-12h14m-14 7h10`}/></g>)}
    <circle cx="120" cy="70" r="18" fill={fill}/><path d="M112 65h16l-6 7v6l-4-2v-4Z"/>
   </>}
   {kind==='bars'&&<>
    <rect x="20" y="28" width="151" height="85" rx="8" fill={fill}/><path d="M20 47h151"/><circle cx="30" cy="38" r="1.5" fill="currentColor"/><circle cx="37" cy="38" r="1.5" fill="currentColor"/>
    <path d="M33 62h50m-50 9h33m-33 13h23"/><rect x="33" y="92" width="42" height="9" rx="4" fill={fill}/>
    <g transform="rotate(-12 153 85)"><path d="M104 59h43a7 7 0 0 0 14 0h47v18a8 8 0 0 0 0 16v17h-47a7 7 0 0 0-14 0h-43V93a8 8 0 0 0 0-16Z" fill="#22291b"/><path strokeDasharray="3 4" d="M181 65v40"/><circle cx="133" cy="76" r="4"/><circle cx="157" cy="96" r="4"/><path d="m133 98 25-25"/></g>
   </>}
   {kind==='communication'&&<>
    <rect x="58" y="15" width="124" height="70" rx="8" fill={fill}/>
    <path d="M58 31h124M70 23h4m5 0h4M72 44h34m-34 9h25m-25 9h18"/>
    <rect x="122" y="41" width="17" height="27" rx="3" fill={fill}/><rect x="146" y="41" width="22" height="12" rx="3" fill={fill}/><path d="m148 63 6 5 12-12"/>
    <path className="visual-wire" d="M92 85v11H48m100-11v11h44M120 85v15"/>
    <path d="M16 40q0-7 7-7h20q7 0 7 7v12q0 7-7 7h-8l-8 7v-7h-4q-7 0-7-7Z" fill={fill}/><path d="M25 43h17m-17 7h11"/>
    <path d="M190 43q0-7 7-7h20q7 0 7 7v12q0 7-7 7h-4v7l-8-7h-8q-7 0-7-7Z" fill={fill}/><path d="M199 46h16m-16 7h10"/>
    {[48,120,192].map((x,i)=><g key={x}><circle cx={x} cy="109" r="8" fill={fill}/><path d={`M${x-16} 133v-3a16 16 0 0 1 32 0v3Z`} fill={fill}/>{i===1&&<path d="m116 126 4 4 4-4"/>}</g>)}
   </>}
   {kind==='grid'&&<>
    <path className="visual-wire" d="M61 52h30m58 0h30M198 75v25q0 17-17 17H61q-19 0-19-19v-8"/><path d="m37 97 5-7 6 7"/>
    {[24,92,160].map((x,i)=><g key={i}><rect x={x} y="29" width="54" height="49" rx="10" fill={fill}/>{i===0?<path d="M38 42h25m-25 9h25m-25 9h16"/>:i===1?<path d="m108 52 8 8 15-17"/>:<><path d="M174 65V52m9 13V43m9 22V48"/></>}</g>)}
    <circle cx="120" cy="117" r="3" fill="currentColor"/>
   </>}
  </g>
 </svg>;
}
