import React,{lazy,Suspense,useEffect,useRef,useState} from 'react';
import './Lanyard.css';
const Lanyard=lazy(()=>import('./Lanyard'));

// Fetch Three.js and portrait textures only as the card approaches the viewport.
export default function DeferredLanyard(props){
 const root=useRef(null),[near,setNear]=useState(false);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{
   if(entry.isIntersecting){setNear(true);observer.disconnect();}
  },{rootMargin:'100px'});
  observer.observe(root.current);return()=>observer.disconnect();
 },[]);
 const placeholder=<div className="lanyard-block"><div className="lanyard-controls"/><div className="lanyard">{near&&<img className="lanyard-fallback" src={props.frontImage} alt="岳子豪的肖像" decoding="async"/>}</div></div>;
 return <div ref={root}>{near?<Suspense fallback={placeholder}><Lanyard {...props}/></Suspense>:placeholder}</div>;
}
