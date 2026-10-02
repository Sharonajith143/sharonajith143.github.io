document.getElementById('projects').addEventListener('change',event=>{location.hash=event.target.value;});
const button=document.getElementById('download');
button.addEventListener('click',async()=>{
 button.disabled=true; button.textContent='Preparing PDF…';
 try{
  const parts=await Promise.all(Array.from({length:5},async(_,i)=>{const r=await fetch(`portfolio-${i}.bin`);if(!r.ok)throw Error('Download unavailable');return r.arrayBuffer();}));
  const url=URL.createObjectURL(new Blob(parts,{type:'application/pdf'}));
  const a=document.createElement('a');a.href=url;a.download='Sharoon_NK_Portfolio.pdf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  document.getElementById('status').textContent='Your portfolio PDF is ready.';
 }catch(error){document.getElementById('status').textContent='PDF download failed. Please try again.';alert('Could not download the PDF. Please try again.');}
 finally{button.disabled=false;button.textContent='Download PDF';}
});

const pages=[...document.querySelectorAll('.page')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window){
 if(!reducedMotion)document.body.classList.add('motion-ready');
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target);}}),{threshold:0.02});
 pages.forEach(page=>reveal.observe(page));
}
let queued=false;
const update=()=>{
 const height=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('.reading-progress').style.transform=`scaleX(${height>0?scrollY/height:0})`;
 const readingLine=innerHeight*.3;
 let current=1;
 for(let i=0;i<pages.length;i++){if(pages[i].getBoundingClientRect().top<=readingLine)current=i+1;else break;}
 document.querySelector('.page-counter').textContent=`${String(current).padStart(2,'0')} / 41`;
 queued=false;
};
window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();
const cursor=document.querySelector('.glass-cursor');
if(matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion){
 let x=0,y=0,cursorQueued=false;
 window.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;x=event.clientX;y=event.clientY;cursor.classList.add('active');cursor.classList.toggle('over-link',!!event.target.closest('a,button,select'));if(!cursorQueued){cursorQueued=true;requestAnimationFrame(()=>{cursor.style.transform=`translate3d(${x}px,${y}px,0)`;cursorQueued=false;});}},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>cursor.classList.remove('active'));window.addEventListener('blur',()=>cursor.classList.remove('active'));
}


const works=[{"src": "work-028.jpg", "alt": "01 / Anime World Event / Image 1", "page": 6, "kind": "image"}, {"src": "work-063.jpg", "alt": "Anime World / Stage and kiosk / Image 1", "page": 7, "kind": "image"}, {"src": "work-065.jpg", "alt": "Anime World / Stage and kiosk / Image 2", "page": 7, "kind": "image"}, {"src": "work-030.jpg", "alt": "02 / Graduation Stage I / Image 1", "page": 8, "kind": "image"}, {"src": "work-070.jpg", "alt": "Graduation Stage I / Angled view / Image 1", "page": 9, "kind": "image"}, {"src": "work-073.jpg", "alt": "Graduation Stage I / Audience perspective / Image 1", "page": 10, "kind": "image"}, {"src": "work-032.jpg", "alt": "03 / Graduation Stage II / Image 1", "page": 11, "kind": "image"}, {"src": "work-034.jpg", "alt": "04 / Graduation Photowall / Image 1", "page": 12, "kind": "image"}, {"src": "work-080.jpg", "alt": "Graduation / Illuminated photo wall / Image 1", "page": 13, "kind": "image"}, {"src": "work-036.jpg", "alt": "05 / Nafis Award Ceremony / Image 1", "page": 14, "kind": "image"}, {"src": "work-085.jpg", "alt": "Nafis Award / Photo stage and reception / Image 1", "page": 15, "kind": "image"}, {"src": "work-087.jpg", "alt": "Nafis Award / Photo stage and reception / Image 2", "page": 15, "kind": "image"}, {"src": "work-003.jpg", "alt": "06 / Eid Entrance / Image 1", "page": 16, "kind": "image"}, {"src": "work-092.jpg", "alt": "Eid Entrance / Arrival and photo corner / Image 1", "page": 17, "kind": "image"}, {"src": "work-094.jpg", "alt": "Eid Entrance / Arrival and photo corner / Image 2", "page": 17, "kind": "image"}, {"src": "work-039.jpg", "alt": "07 / Food Stations / Image 1", "page": 18, "kind": "image"}, {"src": "work-097.jpg", "alt": "07 / Food Stations / Image 2", "page": 18, "kind": "image"}, {"src": "work-041.jpg", "alt": "08 / St. Regis Ramadan 2026 / Image 1", "page": 19, "kind": "image"}, {"src": "work-100.jpg", "alt": "08 / St. Regis Ramadan 2026 / Image 2", "page": 19, "kind": "image"}, {"src": "work-102.jpg", "alt": "St. Regis / Entrance wall and production detail / Image 1", "page": 20, "kind": "image"}, {"src": "work-104.jpg", "alt": "St. Regis / Pavilion design and real installation / Image 1", "page": 21, "kind": "image"}, {"src": "work-105.jpg", "alt": "St. Regis / Pavilion design and real installation / Image 2", "page": 21, "kind": "image"}, {"src": "work-107.jpg", "alt": "St. Regis / Pavilion event setting / Image 1", "page": 22, "kind": "image"}, {"src": "work-108.jpg", "alt": "St. Regis / Pavilion event setting / Image 2", "page": 22, "kind": "image"}, {"src": "work-110.jpg", "alt": "St. Regis / Pavilion lighting concept / Image 1", "page": 23, "kind": "image"}, {"src": "work-102.jpg", "alt": "St. Regis / Production drawing - entrance wall / Image 1", "page": 24, "kind": "image"}, {"src": "work-104.jpg", "alt": "St. Regis / Production drawing - pavilion / Image 1", "page": 25, "kind": "image"}, {"src": "work-043.jpg", "alt": "09 / Fatwa Council Exhibition Booth / Image 1", "page": 26, "kind": "image"}, {"src": "work-116.jpg", "alt": "Fatwa Council Booth / Display and reception / Image 1", "page": 27, "kind": "image"}, {"src": "work-118.jpg", "alt": "Fatwa Council Booth / Display and reception / Image 2", "page": 27, "kind": "image"}, {"src": "work-121.jpg", "alt": "Fatwa Council Booth / Interior visitor route / Image 1", "page": 28, "kind": "image"}, {"src": "work-123.jpg", "alt": "10 / Abu Dhabi Chamber Exhibition Stand / Image 1", "page": 29, "kind": "image"}, {"src": "work-045.jpg", "alt": "10 / Abu Dhabi Chamber Exhibition Stand / Image 2", "page": 29, "kind": "image"}, {"src": "work-047.jpg", "alt": "11 / Ferrari World Abu Dhabi / Image 1", "page": 30, "kind": "image"}, {"src": "work-049.jpg", "alt": "12 / Spring Festival / Image 1", "page": 31, "kind": "image"}, {"src": "work-130.jpg", "alt": "Spring Festival / Photo spot and activity area / Image 1", "page": 32, "kind": "image"}, {"src": "work-132.jpg", "alt": "Spring Festival / Photo spot and activity area / Image 2", "page": 32, "kind": "image"}, {"src": "work-052.jpg", "alt": "13 / Eid Al Fitr / Image 1", "page": 33, "kind": "image"}, {"src": "work-137.jpg", "alt": "Eid Al Fitr / Evening gathering / Image 1", "page": 34, "kind": "image"}, {"src": "work-054.jpg", "alt": "14 / Art &amp; Talent Kiosk / Image 1", "page": 35, "kind": "image"}, {"src": "work-056.jpg", "alt": "15 / Ice Rink Event / Image 1", "page": 36, "kind": "image"}, {"src": "work-143.jpg", "alt": "Ice Rink Event / Arrival and market / Image 1", "page": 37, "kind": "image"}, {"src": "work-145.jpg", "alt": "Ice Rink Event / Arrival and market / Image 2", "page": 37, "kind": "image"}, {"src": "work-148.jpg", "alt": "Ice Rink Event / Spatial overview / Image 1", "page": 38, "kind": "image"}, {"src": "work-058.jpg", "alt": "16 / Al Ain Events / Image 1", "page": 39, "kind": "image"}, {"src": "work-152.jpg", "alt": "Al Ain Events / Kiosks and park stage / Image 1", "page": 40, "kind": "image"}, {"src": "work-154.jpg", "alt": "Al Ain Events / Kiosks and park stage / Image 2", "page": 40, "kind": "image"}, {"src": "work-drawing-20.jpg", "alt": "Production drawing / Page 20", "page": 20, "kind": "drawing"}, {"src": "work-drawing-24.jpg", "alt": "Production drawing / Page 24", "page": 24, "kind": "drawing"}, {"src": "work-drawing-25.jpg", "alt": "Production drawing / Page 25", "page": 25, "kind": "drawing"}];

const viewer=document.getElementById('image-viewer'),viewerImage=document.getElementById('viewer-image');
let imageIndex=0,imageScale=1,fitWidth=0,returnFocus=null;
const fitImage=()=>{imageScale=1;viewerImage.style.width='';viewerImage.style.maxWidth='';viewerImage.style.maxHeight='';requestAnimationFrame(()=>{fitWidth=viewerImage.getBoundingClientRect().width;});document.querySelector('.viewer-scroll').scrollTo(0,0);};
const showImage=index=>{imageIndex=index;const work=works[index];viewerImage.src=work.src;viewerImage.alt=work.alt;document.getElementById('viewer-label').textContent=work.alt;document.getElementById('viewer-prev').disabled=index===0;document.getElementById('viewer-next').disabled=index===works.length-1;fitImage();};
viewerImage.addEventListener('load',fitImage);
document.querySelectorAll('.render-target').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;document.body.classList.add('viewer-open');viewer.showModal();cursor.classList.remove('active');showImage(Number(button.dataset.image));document.getElementById('viewer-close').focus();}));
const changeZoom=delta=>{if(!fitWidth)fitWidth=viewerImage.getBoundingClientRect().width;imageScale=Math.max(1,Math.min(4,imageScale+delta));if(imageScale===1){fitImage();return;}viewerImage.style.maxWidth='none';viewerImage.style.maxHeight='none';viewerImage.style.width=`${fitWidth*imageScale}px`;};
document.getElementById('zoom-in').addEventListener('click',()=>changeZoom(.5));document.getElementById('zoom-out').addEventListener('click',()=>changeZoom(-.5));document.getElementById('zoom-reset').addEventListener('click',fitImage);document.getElementById('viewer-close').addEventListener('click',()=>viewer.close());
document.getElementById('viewer-prev').addEventListener('click',()=>showImage(Math.max(0,imageIndex-1)));document.getElementById('viewer-next').addEventListener('click',()=>showImage(Math.min(works.length-1,imageIndex+1)));
viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');returnFocus?.focus({preventScroll:true});});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'&&imageIndex<works.length-1){event.preventDefault();showImage(imageIndex+1);}if(event.key==='ArrowLeft'&&imageIndex>0){event.preventDefault();showImage(imageIndex-1);}});
window.addEventListener('resize',()=>{if(viewer.open)fitImage();});
// Animate only visible renders, including on touch screens.
if(!reducedMotion && 'IntersectionObserver' in window){
 const activeRenders=new Set();let motionQueued=false;
 const animateRenders=()=>{for(const el of activeRenders){const box=el.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-box.top)/(innerHeight+box.height)));el.style.setProperty('--render-scale',String(1.045-.045*progress));}motionQueued=false;};
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting?activeRenders.add(entry.target):activeRenders.delete(entry.target));animateRenders();},{rootMargin:'80px'});
 document.querySelectorAll('.render-target:not(.drawing-target)').forEach(el=>observer.observe(el));
 window.addEventListener('scroll',()=>{if(!motionQueued){motionQueued=true;requestAnimationFrame(animateRenders);}},{passive:true});
}
