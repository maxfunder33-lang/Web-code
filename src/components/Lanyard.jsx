// React Bits Lanyard integration, adapted from the user-supplied Three.js
// component: local photo textures, rope simulation, raycast dragging and flip.
import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import './Lanyard.css';

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rounded=(w,h,r)=>{const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s};
const loadImage=url=>new Promise((resolve,reject)=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>resolve(i);i.onerror=reject;i.src=url});
const faceTexture=(image,w,h,fit,color)=>{const c=document.createElement('canvas');c.width=1024;c.height=Math.round(1024*h/w);const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.fillRect(0,0,c.width,c.height);const scale=(fit==='contain'?Math.min:Math.max)(c.width/image.width,c.height/image.height);const iw=image.width*scale,ih=image.height*scale;ctx.drawImage(image,(c.width-iw)/2,(c.height-ih)/2,iw,ih);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};

export default function Lanyard({frontImage,backImage,imageFit='cover',cardColor='#192014',orientation='portrait',finish='matte',cornerRadius=.3,size=.6,anchor='center',strapLength=.35,strapImage,strapColor='#20291a',strapWidth=.65,metal='graphite',gravity=1,damping=.65,elasticity=.5,breeze=.15,interactive=true,intro=true,className='',style}){
 const containerRef=useRef(null),flipRef=useRef(null),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[back,setBack]=useState(false);
 useEffect(()=>{
  const el=containerRef.current;if(!el)return;let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{setFailed(true);return}
  renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
  const canvas=renderer.domElement;canvas.className='lanyard-canvas';canvas.setAttribute('aria-hidden','true');el.appendChild(canvas);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(24,1,.1,100),loader=new THREE.TextureLoader();
  const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-3,5,7);scene.add(light,new THREE.AmbientLight(0xffffff,1.5));
  const [w,h]=orientation==='landscape'?[2.25,1.6]:[1.6,2.25],r=.04+clamp(cornerRadius,0,1)*.27;
  const shape=rounded(w,h,r),hole=new THREE.Path();hole.absellipse(0,h/2-.115,.135,.025,0,Math.PI*2,true);shape.holes.push(hole);
  const bodyGeo=new THREE.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelThickness:.009,bevelSize:.009,bevelSegments:3,curveSegments:18});bodyGeo.translate(0,0,-.0125);
  const faceGeo=new THREE.ShapeGeometry(shape,18),pos=faceGeo.attributes.position,uv=faceGeo.attributes.uv;
  for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+w/2)/w,(pos.getY(i)+h/2)/h);
  const edgeMat=new THREE.MeshStandardMaterial({color:cardColor,roughness:finish==='matte'?.85:.35,metalness:.15});
  // Unfiltered, unlit photo print preserves the supplied portrait's colours.
  const frontMat=new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false}),backMat=frontMat.clone();
  const card=new THREE.Group(),bodyMesh=new THREE.Mesh(bodyGeo,edgeMat),front=new THREE.Mesh(faceGeo,frontMat),rear=new THREE.Mesh(faceGeo.clone(),backMat);
  front.position.z=.024;rear.position.z=-.024;rear.rotation.y=Math.PI;card.add(bodyMesh,front,rear);scene.add(card);
  const metalMat=new THREE.MeshStandardMaterial({color:metal==='gold'?'#c4aa67':metal==='silver'?'#c9cdd0':'#6a725f',metalness:.8,roughness:.28});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.085,.015,12,40),metalMat);ring.position.y=h/2-.025;card.add(ring);
  const clip=new THREE.Mesh(new THREE.BoxGeometry(.22,.15,.065),metalMat);clip.position.y=h/2+.11;card.add(clip);
  const count=48,bandW=.36*clamp(strapWidth,.4,2),positions=new Float32Array(count*2*3),uvs=new Float32Array(count*2*2),indices=[];
  for(let i=0;i<count;i++){for(let k=0;k<2;k++){uvs[(i*2+k)*2]=k;uvs[(i*2+k)*2+1]=(1-i/(count-1))*2.2}if(i<count-1){const a=i*2;indices.push(a,a+2,a+1,a+1,a+2,a+3)}}
  const bandGeo=new THREE.BufferGeometry();bandGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));bandGeo.setAttribute('uv',new THREE.BufferAttribute(uvs,2));bandGeo.setIndex(indices);
  const bandMat=new THREE.MeshStandardMaterial({color:strapImage?0xffffff:strapColor,side:THREE.DoubleSide,roughness:.9,metalness:0});const band=new THREE.Mesh(bandGeo,bandMat);band.frustumCulled=false;scene.add(band);
  const nodes=Array.from({length:5},()=>new THREE.Vector3()),previous=nodes.map(n=>n.clone());let rest=.2,viewH=4.5,viewW=4.5,raf=0,last=0,time=0,visible=true,alive=true,initial=true,drag=null,press=null,turn=0,spin=0,flipVelocity=0,roll=0;
  let pointerHits=0,flipCount=0;const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,0,1),0),hitPoint=new THREE.Vector3(),delta=new THREE.Vector3();
  const textures=[];let loaded=false;
  Promise.all([loadImage(frontImage),loadImage(backImage||frontImage)]).then(([f,b])=>{if(!alive)return;const ft=faceTexture(f,w,h,imageFit,cardColor),bt=faceTexture(b,w,h,imageFit,cardColor);textures.push(ft,bt);frontMat.map=ft;backMat.map=bt;frontMat.needsUpdate=backMat.needsUpdate=true;loaded=true;setReady(true);start()}).catch(()=>{if(alive){setFailed(true);stop()}});
  if(strapImage)loader.load(strapImage,t=>{if(!alive){t.dispose();return}const image=t.image,c=document.createElement('canvas');c.width=192;c.height=Math.round(192*image.width/image.height);const ctx=c.getContext('2d');ctx.translate(c.width,0);ctx.rotate(Math.PI/2);ctx.drawImage(image,0,0,c.height,c.width);const woven=new THREE.CanvasTexture(c);woven.colorSpace=THREE.SRGBColorSpace;woven.wrapT=THREE.RepeatWrapping;woven.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());bandMat.map=woven;bandMat.needsUpdate=true;textures.push(woven);t.dispose();start()},undefined,()=>{});
  function reset(){const top=viewH/2+.12,ax=({left:-.23,center:0,right:.23}[anchor]||0)*viewW;nodes[0].set(ax,top,0);rest=(viewH*(.12+.30*clamp(strapLength,0,1))+.12)/4;for(let i=1;i<5;i++){nodes[i].copy(nodes[0]).add(new THREE.Vector3(0,-rest*i,0));if(intro&&!reduced&&initial)nodes[i].x+=rest*i*.45}nodes.forEach((n,i)=>previous[i].copy(n));initial=false;drag=null}
  function resize(){const width=Math.max(1,el.clientWidth),height=Math.max(1,el.clientHeight);viewH=h/clamp(size,.15,.9);if(viewH*width/height<w/.72)viewH=w/.72/(width/height);viewW=viewH*width/height;camera.aspect=width/height;camera.position.set(0,0,viewH/2/Math.tan(THREE.MathUtils.degToRad(12)));camera.lookAt(0,0,0);camera.updateProjectionMatrix();camera.updateMatrixWorld();renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5,Math.sqrt(1.3e6/(width*height))));renderer.setSize(width,height,false);reset();draw();start()}
  function simulate(dt){const decay=Math.pow(1-clamp(damping,0,1)*.035,dt*60),wind=reduced?0:clamp(breeze,0,1);for(let i=1;i<5;i++){const n=nodes[i],prev=previous[i],vx=(n.x-prev.x)*decay,vy=(n.y-prev.y)*decay,vz=(n.z-prev.z)*decay;prev.copy(n);n.x+=vx+Math.sin(time*.8+i*.4)*wind*dt*dt*1.5;n.y+=vy-9*clamp(gravity,0,3)*dt*dt;n.z+=vz+Math.sin(time*.6+i)*wind*dt*dt*.5}if(drag)nodes[4].copy(drag.target);for(let j=0;j<10;j++)for(let i=1;i<5;i++){delta.subVectors(nodes[i],nodes[i-1]);const len=delta.length()||.001,desired=rest*(1+(drag?clamp(elasticity,0,1)*.20:0)),error=(len-desired)/len;if(i===1){nodes[i].addScaledVector(delta,-error)}else{nodes[i-1].addScaledVector(delta,error*.5);nodes[i].addScaledVector(delta,-error*.5)}if(drag)nodes[4].lerp(drag.target,.9)}
   const bottom=nodes[4];bottom.x=clamp(bottom.x,-viewW*.40,viewW*.40);bottom.y=Math.max(-viewH/2+h+.05,bottom.y);flipVelocity+=(turn-spin)*dt*25;flipVelocity*=Math.exp(-5*dt);spin+=flipVelocity*dt;
   const lean=Math.atan2(nodes[4].x-nodes[3].x,Math.max(.04,nodes[3].y-nodes[4].y));roll+=(lean*.35-roll)*Math.min(1,dt*8);
  }
  function draw(){card.rotation.set(0,spin,roll);card.position.copy(nodes[4]);card.position.y-=h/2+.16;card.position.x+=Math.sin(roll)*h/2;
   const curve=new THREE.CatmullRomCurve3(nodes,false,'centripetal');for(let i=0;i<count;i++){const at=curve.getPoint(i/(count-1));positions[i*6]=at.x-bandW/2;positions[i*6+1]=at.y;positions[i*6+2]=at.z;positions[i*6+3]=at.x+bandW/2;positions[i*6+4]=at.y;positions[i*6+5]=at.z}bandGeo.attributes.position.needsUpdate=true;bandGeo.computeVertexNormals();renderer.render(scene,camera);
   canvas.dataset.ready=String(loaded);canvas.dataset.flips=String(flipCount);canvas.dataset.drags=String(pointerHits);canvas.dataset.side=Math.cos(spin)<0?'back':'front';canvas.dataset.settled=String(Math.abs(turn-spin)<.02);
  }
  function frame(now){raf=0;if(!alive||!visible||document.hidden||failed)return;const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;time+=dt;for(let i=0;i<3;i++)simulate(dt/3);draw();if(!reduced||drag||Math.abs(turn-spin)>.002)raf=requestAnimationFrame(frame)}
  function start(){if(!raf&&visible&&alive&&!document.hidden){last=0;raf=requestAnimationFrame(frame)}}function stop(){cancelAnimationFrame(raf);raf=0}
  function toRay(e){const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);card.updateMatrixWorld();return raycaster.intersectObjects([front,rear,bodyMesh],false)[0]}
  function flip(){turn+=Math.PI;flipCount++;setBack(flipCount%2===1);start()}flipRef.current=flip;
  function onDown(e){if(!interactive||e.button>0)return;const hit=toRay(e);if(!hit)return;raycaster.ray.intersectPlane(plane,hitPoint);drag={offset:nodes[4].clone().sub(hitPoint),target:nodes[4].clone()};press={x:e.clientX,y:e.clientY,time:performance.now()};pointerHits++;canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';e.preventDefault();start()}
  function onMove(e){if(!interactive)return;const hit=toRay(e);if(drag){raycaster.ray.intersectPlane(plane,hitPoint);drag.target.copy(hitPoint).add(drag.offset);if(press&&Math.hypot(e.clientX-press.x,e.clientY-press.y)>6)press=null;start()}else canvas.style.cursor=hit?'grab':''}
  function onUp(e){if(!drag)return;drag=null;if(press&&e.type==='pointerup'&&performance.now()-press.time<450)flip();press=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);canvas.style.cursor='grab';start()}
  function onTouch(e){if(interactive&&e.touches.length===1&&toRay(e.touches[0]))e.preventDefault()}
  canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);canvas.addEventListener('lostpointercapture',onUp);canvas.addEventListener('touchstart',onTouch,{passive:false});
  const ro=new ResizeObserver(resize);ro.observe(el);const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)start();else stop()});io.observe(el);const visibility=()=>document.hidden?stop():start();document.addEventListener('visibilitychange',visibility);resize();
  return()=>{alive=false;stop();ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('pointerdown',onDown);canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerup',onUp);canvas.removeEventListener('pointercancel',onUp);canvas.removeEventListener('lostpointercapture',onUp);canvas.removeEventListener('touchstart',onTouch);flipRef.current=null;scene.traverse(o=>{o.geometry?.dispose()});[edgeMat,frontMat,backMat,metalMat,bandMat].forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();canvas.remove()};
 },[frontImage,backImage,imageFit,cardColor,orientation,finish,cornerRadius,size,anchor,strapLength,strapImage,strapColor,strapWidth,metal,gravity,damping,elasticity,breeze,interactive,intro]);
 return <div className="lanyard-block"><div className="lanyard-controls">{ready&&!failed&&<><span>拖拽互动 · 点击翻面</span><button type="button" onClick={()=>flipRef.current?.()} aria-label={back?'查看名片正面':'查看名片背面'}>{back?'查看正面':'查看背面'} ↗</button></>}</div><div className={'lanyard '+className} style={style}><div ref={containerRef} className="lanyard-scene" role="img" aria-label="岳子豪的可拖拽挂绳名片，正面为肖像，背面为岗位与联系方式"/>{(!ready||failed)&&<img className="lanyard-fallback" src={frontImage} alt="岳子豪的蓝色摄影棚肖像"/>}</div></div>;
}
