(function(){
  var b=document.querySelector('.burger');
  if(b){b.addEventListener('click',function(){var o=document.body.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('open');b.setAttribute('aria-expanded',false)})});}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
  var f=document.getElementById('cf');
  if(f){f.addEventListener('submit',function(ev){ev.preventDefault();
    var g=function(n){return f.elements[n].value.trim()};
    var body=g('message')+'\n\n— '+g('name')+' ('+g('email')+')';
    window.location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('[iamandrojairius.com] '+g('subject'))+'&body='+encodeURIComponent(body);
  });}
})();
