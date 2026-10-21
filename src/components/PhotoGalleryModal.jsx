import React,{useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import DomeGallery from './DomeGallery';
import images from '../gallery-images.json';
import './PhotoGalleryModal.css';

const themes={food:{title:'美食和生活',en:'FOOD & LIFE'},outdoors:{title:'徒步与旅行',en:'OUTDOORS & TRAVEL'},play:{title:'游戏与音乐',en:'PLAY & MUSIC'}};
export default function PhotoGalleryModal({category,onClose}){
 const dialog=useRef(null),close=useRef(null),[mobile,setMobile]=useState(()=>innerWidth<=700);
 const theme=themes[category],photos=images[category];
 useEffect(()=>{
  const previous=document.activeElement,overflow=document.body.style.overflow;
  const background=[document.querySelector('#root>header'),document.querySelector('#root>main')].filter(Boolean);
  const inert=background.map(el=>el.inert);background.forEach(el=>{el.inert=true;});
  document.body.style.overflow='hidden';close.current.focus();
  const visibleControls=()=>[...dialog.current.querySelectorAll('button,a[href],summary,[tabindex="0"]')].filter(el=>el.tabIndex>=0&&!el.closest('[inert]')&&(!el.closest('details:not([open])')||el.tagName==='SUMMARY')&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
  const key=e=>{
   if(e.key==='Escape'){e.preventDefault();onClose();}
   if(e.key==='Tab'){
    const controls=visibleControls(),first=controls[0],last=controls.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
   }
  };
  const size=()=>setMobile(innerWidth<=700);
  document.addEventListener('keydown',key);window.addEventListener('resize',size);
  return()=>{document.body.style.overflow=overflow;background.forEach((el,i)=>{el.inert=inert[i];});document.removeEventListener('keydown',key);window.removeEventListener('resize',size);previous?.isConnected&&previous.focus({preventScroll:true});};
 },[onClose]);
 return createPortal(<div className="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title" ref={dialog}>
  <header className="gallery-header"><div><p>{theme.en} / PERSONAL INTERESTS</p><h2 id="gallery-title">{theme.title}<span> /</span></h2></div><button ref={close} type="button" onClick={onClose} aria-label="关闭兴趣图库">返回 More About Me <span>×</span></button></header>
  <div className="gallery-body"><DomeGallery images={photos} segments={mobile?20:28} fit={.58} minRadius={mobile?370:600} maxRadius={950} maxVerticalRotationDeg={12} enlargeTransitionMs={480} grayscale={false}/></div>
  <footer className="gallery-footer"><span>{category==='food'?'记录好滋味，收藏日常里的小美好':category==='outdoors'?'走向户外，记录沿途的风景':'留一点时间给游戏，也给喜欢的音乐'}</span>{photos.some(photo=>photo.source)?<details className="gallery-sources"><summary>图片来源 ↗</summary><div>{photos.map(photo=><a href={photo.source} key={photo.src} target="_blank" rel="noreferrer">{photo.alt.replace('（示例图片）','')} · Unsplash ↗</a>)}</div></details>:<span className="gallery-count">{photos.length} 张图片</span>}</footer>
 </div>,document.body);
}
