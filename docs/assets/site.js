const search=document.querySelector('[data-search]');const filters=document.querySelectorAll('[data-filter]');let selected='all';function filter(){const q=(search?.value||'').toLocaleLowerCase().trim();let count=0;document.querySelectorAll('[data-project]').forEach(card=>{const show=(!q||card.textContent.toLocaleLowerCase().includes(q))&&(selected==='all'||selected===card.dataset.category);card.hidden=!show;if(show)count++});const output=document.querySelector('[data-count]');if(output)output.textContent=document.documentElement.lang==='fa'?`${count.toLocaleString('fa')} نمونه‌کار`:`${count} project editions`;filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===selected)))}filters.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.filter;filter()}));search?.addEventListener('input',filter);if(search)filter();document.querySelector('[data-copy-email]')?.addEventListener('click',async e=>{try{await navigator.clipboard.writeText('aliomrani916@gmail.com');e.target.textContent=document.documentElement.lang==='fa'?'ایمیل کپی شد':'Email copied'}catch{document.querySelector('.contact-address')?.focus()}});const form=document.querySelector('[data-inquiry-form]');form?.addEventListener('submit',e=>{e.preventDefault();const fields=new FormData(form);const fa=document.documentElement.lang==='fa';const body=[(fa?'نام: ':'Name: ')+fields.get('name'),(fa?'ایمیل پاسخ: ':'Reply email: ')+fields.get('reply'),(fa?'نیاز پروژه: ':'Project goal: ')+fields.get('goal'),(fa?'بستر و اتصال‌ها: ':'Platform / integrations: ')+fields.get('platform'),(fa?'زمان‌بندی و حدود بودجه (اختیاری): ':'Timing / budget range (optional): ')+fields.get('timing')].join('\n\n');window.location.href='mailto:aliomrani916@gmail.com?subject='+encodeURIComponent(fa?'درخواست پروژه نرم‌افزاری':'Software project inquiry')+'&body='+encodeURIComponent(body)});
// Navigation, reveals and progress are progressive enhancements of the static page.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    const closeMenu = () => { nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.hidden = false;
    nav.classList.add('menu-ready');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('menu-open')) { closeMenu(); toggle.focus(); }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
  }
  // Reveal only section headings and cards that are currently below the viewport.
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.05 });
    const targets = document.querySelectorAll('main > section:not(.catalogue-section), .inner-page .card');
    targets.forEach(target => {
      if (target.getBoundingClientRect().top > window.innerHeight) { target.classList.add('reveal-pending'); observer.observe(target); }
    });
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) { targets.forEach(target => target.classList.add('is-visible')); observer.disconnect(); }
    });
  }
  const progress = document.querySelector('.scroll-progress');
  const topButton = document.querySelector('.back-top');
  let scheduled = false;
  function syncScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    if (topButton) topButton.hidden = window.scrollY < 700;
    scheduled = false;
  }
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(syncScroll); } }, { passive: true });
  window.addEventListener('resize', syncScroll, { passive: true });
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth' }));
  // Opening the full catalogue from a direct #projects link remains useful.
  if (window.location.hash === '#projects') { const catalogue = document.querySelector('.catalogue'); if (catalogue) catalogue.open = true; }
  document.querySelectorAll('a[href$="#projects"]').forEach(link => link.addEventListener('click', () => { const catalogue = document.querySelector('.catalogue'); if (catalogue) catalogue.open = true; }));
  syncScroll();
})();
