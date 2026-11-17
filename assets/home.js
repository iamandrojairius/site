(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mobile menu
  var b=document.querySelector('.burger');
  if(b){b.addEventListener('click',function(){var o=document.body.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('open');b.setAttribute('aria-expanded',false)})});}
  // manifesto words
  var m=document.getElementById('mani'),words=[];
  if(m){
    m.innerHTML=m.innerHTML.replace(/<span class="hl">(.*?)<\/span>|([^\s<]+)/g,function(all,hl,w){return hl?'<span class="w hl">'+hl+'</span>':'<span class="w">'+w+'</span>'});
    words=[].slice.call(m.querySelectorAll('.w'));
  }
  var rail=document.getElementById('rail'),hs=document.querySelector('.hscroll'),count=document.getElementById('count');
  var stmt=document.getElementById('stmt'),stmtText=document.getElementById('stmtText'),prog=document.getElementById('progress');
  var ticking=false;
  function tick(){
    ticking=false;
    var vh=innerHeight,y=scrollY;
    if(prog)prog.style.width=(y/Math.max(1,document.documentElement.scrollHeight-vh)*100)+'%';
    if(m){var r=m.getBoundingClientRect();var p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.3)));var n=reduce?words.length:Math.floor(p*words.length*1.1);
      words.forEach(function(w,i){w.classList.toggle('on',i<n)});}
    if(hs&&rail){var hr=hs.getBoundingClientRect();var hp=Math.min(1,Math.max(0,-hr.top/(hr.height-vh)));var max=rail.scrollWidth-innerWidth;
      rail.style.transform='translateX('+(-hp*max)+'px)';if(count)count.textContent='0'+Math.min(4,1+Math.floor(hp*4))+' / 04';}
    if(stmt){var sr=stmt.getBoundingClientRect();var sp=reduce?1:Math.min(1,Math.max(0,-sr.top/(sr.height-vh)));
      stmtText.style.setProperty('--s',(3-2*sp).toFixed(3));stmtText.style.setProperty('--o',Math.min(1,sp*2).toFixed(3));}
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(tick)}},{passive:true});
  addEventListener('resize',tick);tick();
  // hero glow follows cursor / finger
  var hero=document.querySelector('.hero');
  if(hero){var mv=function(e){var t=e.touches?e.touches[0]:e;hero.style.setProperty('--mx',t.clientX/innerWidth*100+'%');hero.style.setProperty('--my',t.clientY/innerHeight*100+'%')};
    hero.addEventListener('mousemove',mv);hero.addEventListener('touchmove',mv,{passive:true});}
  // reveals
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});}else els.forEach(function(el){el.classList.add('in')});
})();
