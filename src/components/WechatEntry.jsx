import React,{useState,useRef,useEffect,useLayoutEffect,useId} from 'react';
import {createPortal} from 'react-dom';
import './WechatEntry.css';

export default function WechatEntry({label='微信二维码 ↗'}){
 const [open,setOpen]=useState(false),[position,setPosition]=useState({left:0,top:0});
 const anchor=useRef(null),panel=useRef(null),timer=useRef(null),pinned=useRef(false);
 const id=useId();
 const show=()=>{clearTimeout(timer.current);setOpen(true);};
 const close=()=>{clearTimeout(timer.current);pinned.current=false;setOpen(false);};
 const leave=()=>{if(!pinned.current)timer.current=setTimeout(()=>setOpen(false),150);};
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useLayoutEffect(()=>{
  if(!open)return;
  const update=()=>{const a=anchor.current.getBoundingClientRect(),height=panel.current?.offsetHeight||330,width=Math.min(280,innerWidth-32);const top=a.top>height+20?a.top-height-12:Math.min(a.bottom+12,Math.max(16,innerHeight-height-16));setPosition({left:Math.max(16,Math.min(a.left+a.width/2-width/2,innerWidth-width-16)),top});};
  update();
  let frame=0;
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;update();});};
  const key=e=>{if(e.key==='Escape')close();};
  const outside=e=>{if(!anchor.current.contains(e.target)&&!panel.current?.contains(e.target))close();};
  window.addEventListener('resize',schedule);window.addEventListener('scroll',schedule,{capture:true,passive:true});document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',schedule);window.removeEventListener('scroll',schedule,true);document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
 },[open]);
 return <>
  <button type="button" className="wechat-entry" ref={anchor} aria-expanded={open} aria-controls={open?id:undefined} aria-label="查看微信二维码" onMouseEnter={show} onMouseLeave={leave} onFocus={show} onBlur={leave} onClick={()=>{if(pinned.current)close();else{pinned.current=true;show();}}}>{label}</button>
  {open&&createPortal(<div ref={panel} id={id} className="wechat-popover" role="dialog" aria-label="微信二维码" style={position} onMouseEnter={show} onMouseLeave={leave}>
   <p className="wechat-popover-title">微信 · 扫码添加</p>
   <div className="wechat-qr-window"><img src="/assets/wechat-original.png" alt="岳子豪的微信添加好友二维码" decoding="async"/></div>
   <p className="wechat-popover-hint">使用微信扫一扫，聊聊更多</p>
  </div>,document.body)}
 </>;
}
