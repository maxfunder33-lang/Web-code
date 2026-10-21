// React Bits DomeGallery, adapted from the user-supplied JS/CSS source.
// Preserve the staggered spherical layout; scope styles and use cancellable FLIP animations.
import React,{useEffect,useLayoutEffect,useMemo,useRef,useState,useCallback} from 'react';
import {useGesture} from '@use-gesture/react';
import './DomeGallery.css';

const clamp=(v,min,max)=>Math.min(Math.max(v,min),max);
const wrap=deg=>((deg+180)%360+360)%360-180;
function buildItems(images,segments){
 if(!images.length)return [];
 return Array.from({length:segments},(_,column)=>{
  const ys=column%2?[-3,-1,1,3,5]:[-4,-2,0,2,4];
  return ys.map((y,row)=>{
   const image=images[(column*7+row)%images.length];
   const x=-(segments-1)+column*2,unit=360/segments/2;
   return {image:typeof image==='string'?{src:image,alt:'示例照片'}:image,x,y,rotateY:unit*(x+.5),rotateX:unit*(y-.5)};
  });
 }).flat();
}

export default function DomeGallery({images=[],fit=.5,fitBasis='auto',minRadius=600,maxRadius=Infinity,padFactor=.1,overlayBlurColor='#11120f',maxVerticalRotationDeg=8,dragSensitivity=20,enlargeTransitionMs=420,segments=28,dragDampening=2,openedImageWidth='min(84vw, 900px)',openedImageHeight='min(70dvh, 720px)',imageBorderRadius='15px',openedImageBorderRadius='16px',grayscale=false,introRotation=true,introDurationMs=8500,introRotationDeg=32}){
 const root=useRef(null),main=useRef(null),sphere=useRef(null),enlarged=useRef(null);
 const rotation=useRef({x:0,y:0}),start=useRef({x:0,y:0}),inertia=useRef(0),lastDrag=useRef(-Infinity),openRef=useRef(null),animation=useRef(null),closing=useRef(false),alive=useRef(true);
 const introRAF=useRef(0);
 const dragSamples=useRef([]);
 const [photo,setPhoto]=useState(null);
 const items=useMemo(()=>buildItems(images,segments),[images,segments]);
 const reduced=useRef(matchMedia('(prefers-reduced-motion: reduce)').matches);
 const syncTabStops=useCallback(()=>{
  root.current?.querySelectorAll('.dg-item__image').forEach(button=>{
   const yaw=wrap(Number(button.dataset.yaw)+rotation.current.y),pitch=Number(button.dataset.pitch)+rotation.current.x;
   button.tabIndex=Math.abs(yaw)<55&&Math.abs(pitch)<35?0:-1;
  });
 },[]);
 const stop=useCallback(()=>{cancelAnimationFrame(introRAF.current);introRAF.current=0;cancelAnimationFrame(inertia.current);inertia.current=0;syncTabStops();},[syncTabStops]);
 const apply=useCallback((x,y)=>{rotation.current={x,y};if(sphere.current)sphere.current.style.transform=`translateZ(calc(var(--radius) * -1)) rotateX(${x}deg) rotateY(${y}deg)`;},[]);
 useEffect(()=>{
  const resize=new ResizeObserver(([entry])=>{
   const {width:w,height:h}=entry.contentRect;
   const bases={min:Math.min(w,h),max:Math.max(w,h),width:w,height:h};
   const basis=bases[fitBasis]??(w/h>=1.3?w:Math.min(w,h));
   root.current.style.setProperty('--radius',`${Math.round(clamp(Math.min(basis*fit,h*1.35),minRadius,maxRadius))}px`);
   root.current.style.setProperty('--viewer-pad',`${Math.max(12,Math.min(w,h)*padFactor)}px`);
   apply(rotation.current.x,rotation.current.y);
  });resize.observe(root.current);
  const visibility=()=>{if(document.hidden)stop();};
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>{reduced.current=motion.matches;stop();};
  document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',preference);
  alive.current=true;
  return()=>{alive.current=false;resize.disconnect();stop();animation.current?.cancel();document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',preference);};
 },[fit,fitBasis,minRadius,maxRadius,padFactor,apply,stop]);
 useEffect(()=>{
  if(!introRotation||reduced.current||document.hidden)return;
  const initial={...rotation.current};let started=null;
  const tick=now=>{
   if(!alive.current||document.hidden||openRef.current){introRAF.current=0;return;}
   if(started===null)started=now;
   const progress=Math.min(1,(now-started)/Math.max(1,introDurationMs));
   const eased=progress*progress*(3-2*progress);
   apply(initial.x,initial.y+introRotationDeg*eased);
   if(progress<1)introRAF.current=requestAnimationFrame(tick);
   else{introRAF.current=0;syncTabStops();}
  };
  introRAF.current=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(introRAF.current);introRAF.current=0;};
 },[introRotation,introDurationMs,introRotationDeg,apply,syncTabStops]);
 // Carry the recent drag speed into an exponential coast, measured in degrees/second.
 const coast=(vx,vy)=>{
  stop();if(reduced.current)return;
  let x=vx,y=vy,last=performance.now(),elapsed=0;
  const resistance=2.2+.35*clamp(dragDampening,0,4);
  const tick=now=>{
   if(!alive.current||document.hidden||openRef.current)return;
   const dt=Math.min(.04,Math.max(0,(now-last)/1000));last=now;elapsed+=dt;
   const decay=Math.exp(-resistance*dt),distance=(1-decay)/resistance;
   const nextX=clamp(rotation.current.x+y*distance,-maxVerticalRotationDeg,maxVerticalRotationDeg);
   apply(nextX,wrap(rotation.current.y+x*distance));
   x*=decay;y*=decay;
   if(Math.abs(nextX)>=maxVerticalRotationDeg)y=0;
   if(Math.abs(x)+Math.abs(y)<.08||elapsed>4){inertia.current=0;syncTabStops();return;}
   inertia.current=requestAnimationFrame(tick);
  };inertia.current=requestAnimationFrame(tick);
 };
 useGesture({onDrag:({first,last,canceled,movement:[dx,dy]})=>{
  if(openRef.current)return;
  const now=performance.now();
  if(first){stop();start.current={...rotation.current};dragSamples.current=[{x:dx,y:dy,time:now}];}
  const samples=dragSamples.current,previous=samples.at(-1);
  if(!previous||previous.x!==dx||previous.y!==dy){
   samples.push({x:dx,y:dy,time:now});
   while(samples.length>2&&now-samples[0].time>140)samples.shift();
  }
  apply(clamp(start.current.x-dy/dragSensitivity,-maxVerticalRotationDeg,maxVerticalRotationDeg),wrap(start.current.y+dx/dragSensitivity));
  if(last&&Math.hypot(dx,dy)>5){
   lastDrag.current=now;
   const end=samples.at(-1),begin=[...samples].reverse().find(sample=>end.time-sample.time>=45)||samples[0];
   if(!canceled&&begin!==end&&now-end.time<160){
    const dt=Math.max(8,end.time-begin.time),freshness=Math.exp(-(now-end.time)/90),scale=1000/dragSensitivity;
    coast(clamp((end.x-begin.x)/dt,-2.5,2.5)*freshness*scale,-clamp((end.y-begin.y)/dt,-2.5,2.5)*freshness*scale);
   }
  }
 }},{target:main,drag:{filterTaps:false,threshold:0},eventOptions:{passive:true}});

 const open=(item,element)=>{
  if(openRef.current||performance.now()-lastDrag.current<160)return;
  stop();const value={...item,element,rect:element.getBoundingClientRect()};
  openRef.current=value;closing.current=false;setPhoto(value);
 };
 useLayoutEffect(()=>{
  if(!photo||!enlarged.current)return;
  const el=enlarged.current,end=el.getBoundingClientRect(),from=photo.rect;
  animation.current=el.animate([{transform:`translate(${from.left-end.left}px,${from.top-end.top}px) scale(${from.width/end.width},${from.height/end.height})`,opacity:.7},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:reduced.current?1:enlargeTransitionMs,easing:'cubic-bezier(.22,1,.36,1)'});
  el.querySelector('button')?.focus();
  return()=>animation.current?.cancel();
 },[photo,enlargeTransitionMs]);
 const closePhoto=()=>{
  if(!photo||closing.current)return;
  closing.current=true;animation.current?.cancel();
  const el=enlarged.current,from=el.getBoundingClientRect(),to=photo.element.getBoundingClientRect();
  animation.current=el.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${to.left-from.left}px,${to.top-from.top}px) scale(${to.width/from.width},${to.height/from.height})`,opacity:0}],{duration:reduced.current?1:enlargeTransitionMs,easing:'cubic-bezier(.22,1,.36,1)'});
  animation.current.finished.then(()=>{if(!alive.current)return;const tile=photo.element;openRef.current=null;closing.current=false;setPhoto(null);requestAnimationFrame(()=>{syncTabStops();tile.isConnected&&tile.focus({preventScroll:true});});}).catch(()=>{});
 };
 const turn=direction=>{stop();apply(rotation.current.x,wrap(rotation.current.y+direction*20));syncTabStops();};
 return <div ref={root} className="dg-root" data-enlarging={!!photo} onPointerDownCapture={stop} onKeyDownCapture={()=>{if(introRAF.current)stop();}} style={{'--segments-x':segments,'--segments-y':segments,'--overlay-blur-color':overlayBlurColor,'--tile-radius':imageBorderRadius,'--enlarge-radius':openedImageBorderRadius,'--image-filter':grayscale?'grayscale(1)':'none','--opened-width':openedImageWidth,'--opened-height':openedImageHeight}} onKeyDown={e=>{
  if(e.key==='Escape'&&openRef.current){e.preventDefault();e.stopPropagation();closePhoto();}
  else if(!openRef.current&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();turn(e.key==='ArrowLeft'?1:-1);}
 }}>
  <div ref={main} className="dg-main">
   <div className="dg-stage" inert={photo?true:undefined} aria-hidden={photo?true:undefined}>
    <div ref={sphere} className="dg-sphere">{items.map((item,i)=><div className="dg-item" key={i} style={{'--offset-x':item.x,'--offset-y':item.y}}>
     <button className="dg-item__image" type="button" data-yaw={item.rotateY} data-pitch={item.rotateX} tabIndex={Math.abs(item.rotateY)<55&&Math.abs(item.rotateX)<30?0:-1} aria-label={'放大：'+item.image.alt} onClick={e=>open(item,e.currentTarget)}>
      <img src={item.image.src} alt={item.image.alt} draggable="false" decoding="async"/>
     </button>
    </div>)}</div>
   </div>
   <div className="dg-overlay"/><div className="dg-edge dg-edge-top"/><div className="dg-edge dg-edge-bottom"/>
   {photo&&<div className="dg-viewer"><button type="button" className="dg-scrim" aria-label="返回球形图库" onClick={closePhoto}/><div className="dg-enlarge" ref={enlarged}>
    <img src={photo.image.full||photo.image.src} alt={photo.image.alt} decoding="async"/>
    <button type="button" className="dg-photo-close" onClick={closePhoto} aria-label="关闭放大图片">收起图片 ×</button>
    <div className="dg-caption"><span>{photo.image.alt}</span>{photo.image.source&&<a href={photo.image.source} target="_blank" rel="noreferrer">图片来源 ↗</a>}</div>
   </div></div>}
  </div>
  {!photo&&<div className="dg-controls"><button type="button" onClick={()=>turn(1)} aria-label="向左浏览图库">←</button><span>拖动浏览 · 点击放大</span><button type="button" onClick={()=>turn(-1)} aria-label="向右浏览图库">→</button></div>}
 </div>;
}
