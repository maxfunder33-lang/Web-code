import React,{useEffect,useRef,useState} from 'react';

export default function AnimatedDetails({enabled=false,children}){
 const [open,setOpen]=useState(true);
 const animation=useRef(null),desired=useRef(true);
 useEffect(()=>()=>animation.current?.cancel(),[]);
 function toggle(event){
  if(!enabled)return;
  const summary=event.target.closest('summary');
  if(!summary&&(event.target.closest('a,button,input,textarea,select')||window.getSelection()?.toString()))return;
  event.preventDefault();
  const el=event.currentTarget;
  const from=el.getBoundingClientRect().height;
  animation.current?.cancel();
  desired.current=!desired.current;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){setOpen(desired.current);el.open=desired.current;el.style.overflow='';return;}
  el.open=true;
  setOpen(true);
  const border=getComputedStyle(el);
  const to=desired.current?el.getBoundingClientRect().height:el.querySelector('summary').getBoundingClientRect().height+parseFloat(border.borderTopWidth)+parseFloat(border.borderBottomWidth);
  el.style.overflow='hidden';
  const current=el.animate([{height:from+'px'},{height:to+'px'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
  animation.current=current;
  current.onfinish=()=>{
   if(animation.current!==current)return;
   el.open=desired.current;
   setOpen(desired.current);
   el.style.overflow='';
   animation.current=null;
  };
 }
 return <details open={open} onClick={toggle}>{children}</details>;
}
