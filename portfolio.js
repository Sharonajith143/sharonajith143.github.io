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

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window && !reduceMotion){
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.04});
 document.querySelectorAll('.work-card,.page,.section-heading,.portfolio-heading').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
 const revealTarget=()=>{const el=document.getElementById(location.hash.slice(1));if(el)el.classList.add('visible');};
 window.addEventListener('hashchange',revealTarget);revealTarget();
}
let queued=false;
const updateProgress=()=>{const height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform=`scaleX(${height>0?scrollY/height:0})`;queued=false;};
window.addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(updateProgress);queued=true;}},{passive:true});
updateProgress();
