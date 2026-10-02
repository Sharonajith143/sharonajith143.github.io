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
