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

const viewer=document.getElementById('image-viewer');
const viewerImage=document.getElementById('viewer-image');
const imagePages=[...document.querySelectorAll('.page>img')];
let imageIndex=0,imageScale=1,fitWidth=0,returnFocus=null;
const fitImage=()=>{imageScale=1;viewerImage.style.width='';viewerImage.style.maxWidth='';viewerImage.style.maxHeight='';requestAnimationFrame(()=>{fitWidth=viewerImage.getBoundingClientRect().width;});document.querySelector('.viewer-scroll').scrollTo(0,0);};
const showImage=index=>{imageIndex=index;viewerImage.src=imagePages[index].src;viewerImage.alt=imagePages[index].alt;document.getElementById('viewer-label').textContent=`PAGE ${String(index+1).padStart(2,'0')} / 41`;document.getElementById('viewer-prev').disabled=index===0;document.getElementById('viewer-next').disabled=index===imagePages.length-1;fitImage();};
viewerImage.addEventListener('load',fitImage);
const openImage=(index,source)=>{returnFocus=source;document.body.classList.add('viewer-open');viewer.showModal();cursor.classList.remove('active');showImage(index);document.getElementById('viewer-close').focus();};
imagePages.forEach((img,index)=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',`Open ${img.alt} full screen`);img.addEventListener('click',()=>openImage(index,img));img.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openImage(index,img);}});});
const changeZoom=delta=>{if(!fitWidth)fitWidth=viewerImage.getBoundingClientRect().width;imageScale=Math.max(1,Math.min(4,imageScale+delta));if(imageScale===1){fitImage();return;}viewerImage.style.maxWidth='none';viewerImage.style.maxHeight='none';viewerImage.style.width=`${fitWidth*imageScale}px`;};
document.getElementById('zoom-in').addEventListener('click',()=>changeZoom(.5));document.getElementById('zoom-out').addEventListener('click',()=>changeZoom(-.5));document.getElementById('zoom-reset').addEventListener('click',fitImage);document.getElementById('viewer-close').addEventListener('click',()=>viewer.close());
document.getElementById('viewer-prev').addEventListener('click',()=>showImage(Math.max(0,imageIndex-1)));document.getElementById('viewer-next').addEventListener('click',()=>showImage(Math.min(imagePages.length-1,imageIndex+1)));
viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');returnFocus?.focus({preventScroll:true});});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'&&imageIndex<imagePages.length-1){event.preventDefault();showImage(imageIndex+1);}if(event.key==='ArrowLeft'&&imageIndex>0){event.preventDefault();showImage(imageIndex-1);}});
window.addEventListener('resize',()=>{if(viewer.open)fitImage();});
