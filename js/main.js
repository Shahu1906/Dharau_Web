/* Dharau site engine */
(function () {
  const A = window.DharauArt, CFG = window.DHARAU;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = (u) => (/^(https?:|mailto:|tel:)/i.test(u) ? u : '#');
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------------- Paint static art into the page ---------------- */
  const paint = {
    cloud: () => A.cloud(),
    birds: () => A.bird() + A.bird() + A.bird(),
    sun: () => A.mandala(),
    sunGold: () => A.mandala('#B97C0C', '#2C5A3C', '#E8A317'),
    sunSmall: () => A.mandala('#E8A317', '#F6C544', '#A8482A'),
    homeland: () => A.hills('#A9B65A', '#6E8B3D', '#2F5D3A') +
      `<svg class="land-props land-props--a" viewBox="0 0 300 220" aria-hidden="true">${A.tree(110, 218, .9)}${A.hut(232, 218, .62)}</svg>
       <svg class="land-props land-props--b" viewBox="0 0 200 220" aria-hidden="true">${A.tree(100, 218, 1, '#264F31', '#376A3A')}</svg>`,
    grazing: () => A.calf({ mom: true, cls: 'calf--graze' }),
    heroMilk: () => A.heroMilk(),
    heroDahi: () => A.heroDahi(),
    journeyHills: () => A.hills('#BFC97C', '#9BAA3A', '#7E8F2B'),
    warliCircle: () => A.warliCircle(),
    warliBand: () => A.warliBand() + A.warliBand(),
    toran: () => A.toran(),
    nightland: () => A.hills('#123D2C', '#0E3224', '#0A241A') +
      `<svg class="land-props land-props--night" viewBox="0 0 300 220" aria-hidden="true">${A.hut(150, 218, 1)}<rect class="window-glow" x="134" y="186" width="32" height="32" fill="#F6B41F" opacity="0"/></svg>`,
    sleepy: () => A.sleepingCalf(),
    diyas: () => [0, 1, 2, 3, 4, 5, 6].map(A.diya).join('')
  };
  $$('[data-art]').forEach((el) => { const f = paint[el.dataset.art]; if (f) el.innerHTML = f(); });
  $$('[data-icon]').forEach((el) => { el.innerHTML = A.icon[el.dataset.icon] || ''; });

  $$('[data-petals]').forEach((box) => {
    let h = '';
    for (let i = 0; i < +box.dataset.petals; i++) {
      h += `<i style="left:${rand(0, 100).toFixed(1)}%;--s:${rand(.6, 1.25).toFixed(2)};animation-duration:${rand(9, 18).toFixed(1)}s;animation-delay:-${rand(0, 18).toFixed(1)}s;background:${['#E8861A', '#F6B41F', '#D5501E'][i % 3]}"></i>`;
    }
    box.innerHTML = h;
  });
  $$('[data-sparks]').forEach((box) => {
    let h = '';
    for (let i = 0; i < +box.dataset.sparks; i++) {
      h += `<i style="left:${rand(0, 100).toFixed(1)}%;--s:${rand(.5, 1.6).toFixed(2)};animation-duration:${rand(5, 12).toFixed(1)}s;animation-delay:-${rand(0, 12).toFixed(1)}s"></i>`;
    }
    box.innerHTML = h;
  });
  (function stars() {
    let h = '';
    for (let i = 0; i < 70; i++) {
      h += `<i style="left:${rand(0, 100).toFixed(1)}%;top:${rand(0, 62).toFixed(1)}%;--s:${rand(.5, 1.6).toFixed(2)};animation-delay:-${rand(0, 5).toFixed(1)}s"></i>`;
    }
    $('#stars').innerHTML = h;
  })();
  $('#year').textContent = new Date().getFullYear();

  /* Split display headings into words so they can rise one by one */
  $$('.display').forEach((h) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const o = document.createElement('span'); o.className = 'w';
            const i = document.createElement('span'); i.className = 'w__i'; i.textContent = part;
            o.append(i); frag.append(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(h);
    $$('.w__i', h).forEach((w, i) => w.style.setProperty('--i', i));
    h.setAttribute('tabindex', '-1');
  });

  /* ---------------- Scene engine ---------------- */
  const scenes = $$('.scene');
  const ids = scenes.map((s) => s.id);
  const stage = $('#stage'), intro = $('#intro');
  const walkEl = $('#walk'), seam = $('#seam'), seamFill = $('#seamFill'), parade = $('#parade');
  stage.append(intro);
  let cur = -1, busy = false, queued = null, lockUntil = 0;
  const hooks = {};

  function setHidden(active) {
    scenes.forEach((s, i) => {
      const on = i === active;
      s.toggleAttribute('inert', !on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  }

  const paradeHTML = {
    calf: () => A.calf(),
    cart: () => A.cart('cans') + A.calf(),
    jar: () => A.cart('jar') + A.calf(),
    mom: () => A.calf({ cls: 'calf--trail' }) + A.calf({ mom: true }),
    butterflies: () => A.calf() + `<span class="fly fly--a">${A.butterfly('#F6B41F')}</span><span class="fly fly--b">${A.butterfly('#FBF5E6')}</span>`,
    butterfly: () => A.calf() + `<span class="fly fly--a">${A.butterfly('#A8482A')}</span>`,
    lantern: () => A.calf() + `<span class="glowbug glowbug--a"></span><span class="glowbug glowbug--b"></span><span class="glowbug glowbug--c"></span>`
  };

  function setActiveUI(i) {
    const id = ids[i];
    $$('[data-go]').forEach((a) => {
      const on = a.dataset.go === id;
      if (on && a.closest('.nav__links, .sheet')) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    placeNavPill();
    const next = scenes[(i + 1) % scenes.length];
    $('#nextLabel').textContent = i === scenes.length - 1 ? 'Back to start' : next.dataset.title;
    $('#prevBtn').disabled = i === 0;
    placeTrail(i);
    $('#live').textContent = scenes[i].dataset.title;
    document.documentElement.dataset.scene = id;
  }

  function placeNavPill() {
    const pill = $('.nav__pill'), a = $('.nav__links [aria-current]');
    if (!a) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.width = a.offsetWidth + 'px';
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
  }

  function finish(i, from) {
    if (from) {
      from.classList.remove('is-active', 'is-leaving');
      from.style.transform = '';
      const inn = from.querySelector('.scene__in'); if (inn) inn.style.transform = '';
    }
    const s = scenes[i];
    s.classList.remove('is-entering');
    s.classList.add('is-active');
    s.style.transform = '';
    $('.scene__in', s).style.transform = '';
    walkEl.classList.remove('is-on');
    parade.innerHTML = '';
    if (intro.parentNode && from === intro) intro.remove();
    document.documentElement.classList.add('ready');
    busy = false;
    lockUntil = performance.now() + 450;
    const h = $('.display', s);
    if (h && document.activeElement && document.activeElement !== document.body && !document.activeElement.closest('.scene')) h.focus({ preventScroll: true });
    if (hooks[ids[i]] && hooks[ids[i]].enter) hooks[ids[i]].enter();
    if (queued !== null && queued !== cur) { const q = queued; queued = null; go(q); } else queued = null;
  }

  function go(to, opts = {}) {
    to = Math.max(0, Math.min(scenes.length - 1, to));
    if (to === cur) return;
    if (busy) { queued = to; return; }
    busy = true;
    closeSheet();
    const fromIdx = cur;
    const from = fromIdx >= 0 ? scenes[fromIdx] : intro;
    const next = scenes[to];
    const dir = fromIdx < 0 || to > fromIdx ? 1 : -1;
    if (fromIdx >= 0 && hooks[ids[fromIdx]] && hooks[ids[fromIdx]].leave) hooks[ids[fromIdx]].leave();
    cur = to;
    setHidden(to);
    setActiveUI(to);
    if (!opts.silent) { try { history.pushState(null, '', '#' + ids[to]); } catch (e) { /* some browsers block this on file:// pages */ } }
    if (hooks[ids[to]] && hooks[ids[to]].prep) hooks[ids[to]].prep();

    from.classList.add('is-leaving');
    next.classList.add('is-entering');
    const inner = $('.scene__in', next);

    if (reduce) {
      next.animate({ opacity: [0, 1] }, { duration: 320, easing: 'ease-out' }).onfinish = () => {
        next.classList.add('is-active'); finish(to, from);
      };
      return;
    }

    /* build the parade (calf + friends) */
    const W = innerWidth;
    const kind = next.dataset.parade || 'calf';
    parade.className = 'walk__parade walk__parade--' + kind;
    parade.innerHTML = paradeHTML[kind]();
    $$('.calf', parade).forEach((c) => c.classList.add('is-walking'));
    seamFill.setAttribute('fill', next.dataset.seam);
    walkEl.classList.add('is-on');
    const pw = parade.offsetWidth;
    const calfW = $('.calf', parade).getBoundingClientRect().width || 240;
    const travel = W + pw + 50;
    const speed = Math.max(420, Math.min(860, W * .62));   // px per second
    const dur = Math.max(1500, (travel / speed) * 1000);
    const cycles = travel / (calfW * .78);
    const cycle = dur / cycles;
    walkEl.style.setProperty('--walk', Math.max(280, cycle) + 'ms');

    const ease = 'linear', fill = 'both';
    const opt = { duration: dur, easing: ease, fill };
    const steps = (fn) => [{ transform: fn(0) }, { transform: fn(1) }];

    if (dir > 0) {
      /* seam goes -(pw+50) -> W, moving left to right, parade just ahead of it */
      const x = (t) => -pw - 50 + t * travel;
      next.animate(steps((t) => `translate3d(${x(t) - W}px,0,0)`), opt);
      inner.animate(steps((t) => `translate3d(${W - x(t)}px,0,0)`), opt);
      seam.animate(steps((t) => `translate3d(${x(t) - 8}px,0,0)`), opt);
      parade.animate(steps((t) => `translate3d(${x(t) + 38}px,0,0)`), opt);
    } else {
      /* seam goes W+pw+50 -> 0, parade walks right to left */
      const x = (t) => W + pw + 50 - t * travel;
      next.animate(steps((t) => `translate3d(${x(t)}px,0,0)`), opt);
      inner.animate(steps((t) => `translate3d(${-x(t)}px,0,0)`), opt);
      seam.animate(steps((t) => `translate3d(${x(t) + 8}px,0,0) scaleX(-1)`), opt);
      parade.animate(steps((t) => `translate3d(${x(t) - 38}px,0,0) scaleX(-1)`), opt);
    }
    /* Start the scene's own entrance as the seam starts to uncover it */
    setTimeout(() => next.classList.add('is-active'), dur * .3);
    setTimeout(() => {
      next.getAnimations().concat(inner.getAnimations(), seam.getAnimations(), parade.getAnimations()).forEach((a) => a.cancel());
      finish(to, from);
    }, dur + 40);
  }

  function step(delta, source) {
    if (busy || performance.now() < lockUntil) return;
    const h = hooks[ids[cur]];
    if (source !== 'button' && h && h.step && h.step(delta)) { lockUntil = performance.now() + 1500; return; }
    const t = cur + delta;
    if (t < 0 || t >= scenes.length) return;
    go(t);
  }

  /* ---------------- Inputs ---------------- */
  let wheelSum = 0, wheelT = 0;
  addEventListener('wheel', (e) => {
    if (e.target.closest && e.target.closest('.sheet')) return;
    e.preventDefault();
    const now = performance.now();
    if (now - wheelT > 220) wheelSum = 0;
    wheelT = now;
    if (busy || now < lockUntil) { wheelSum = 0; return; }
    wheelSum += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(wheelSum) > 42) { const d = Math.sign(wheelSum); wheelSum = 0; step(d); }
  }, { passive: false });

  let tx = 0, ty = 0, tSkip = false, tMenu = false;
  addEventListener('touchstart', (e) => {
    const t = e.touches[0]; tx = t.clientX; ty = t.clientY;
    tSkip = !!e.target.closest('[data-noswipe]');
    tMenu = !!e.target.closest('.sheet');
  }, { passive: true });
  addEventListener('touchend', (e) => {
    if (tMenu) return;
    const t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx)) step(dy < 0 ? 1 : -1);
    else if (!tSkip && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (k === 'Escape') closeSheet();
    const onCtl = e.target.closest && e.target.closest('button, a');
    if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(k) || (k === ' ' && !onCtl)) { e.preventDefault(); step(1); }
    else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(k)) { e.preventDefault(); step(-1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(scenes.length - 1); }
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-go]');
    if (!a) return;
    e.preventDefault();
    closeSheet();
    go(ids.indexOf(a.dataset.go));
  });
  addEventListener('popstate', () => {
    const i = ids.indexOf(location.hash.slice(1));
    go(i < 0 ? 0 : i, { silent: true });
  });
  $('#nextBtn').addEventListener('click', () => { if (cur === scenes.length - 1) go(0); else step(1, 'button'); });
  $('#prevBtn').addEventListener('click', () => step(-1, 'button'));

  /* Trail */
  const trailPath = $('#trailPath');
  scenes.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'trail__dot';
    b.setAttribute('aria-label', 'Go to ' + s.dataset.title);
    b.title = s.dataset.title;
    b.addEventListener('click', () => go(i));
    trailPath.append(b);
  });
  $('#trailCalf').innerHTML = A.calf({ cls: 'calf--mini' });
  let trailPrev = -1;
  function placeTrail(i) {
    const dots = $$('.trail__dot');
    dots.forEach((d, k) => { d.classList.toggle('is-past', k <= i); d.toggleAttribute('aria-current', k === i); });
    const d = dots[i], c = $('#trailCalf');
    c.style.transform = `translateX(${d.offsetLeft + d.offsetWidth / 2}px)`;
    c.classList.toggle('is-back', i < trailPrev);
    const mini = $('.calf', c);
    mini.classList.add('is-walking');
    clearTimeout(placeTrail.t);
    placeTrail.t = setTimeout(() => mini.classList.remove('is-walking'), 900);
    trailPrev = i;
  }

  /* Mobile menu */
  const sheet = $('#sheet'), burger = $('#burger');
  function closeSheet() {
    if (sheet.hidden) return;
    sheet.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    setTimeout(() => { sheet.hidden = true; }, 260);
  }
  burger.addEventListener('click', () => {
    if (burger.getAttribute('aria-expanded') === 'true') { closeSheet(); return; }
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('is-open'));
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
  });
  addEventListener('resize', () => { placeNavPill(); if (cur >= 0) placeTrail(cur); });

  /* ---------------- Hero slider ---------------- */
  (function hero() {
    const copies = $$('.slide-copy'), pieces = $$('.hero-piece');
    const dots = $('#heroDots'), sky = $('#homeSky');
    const skies = ['#FBEFD0', '#EDEFCB', '#F9DFC6'];
    const labels = ['Ghee', 'Milk', 'Dahi'];
    let i = 0, timer;
    labels.forEach((l, k) => {
      const b = document.createElement('button');
      b.textContent = l;
      b.addEventListener('click', () => { show(k); play(); });
      dots.append(b);
    });
    function show(n) {
      i = (n + copies.length) % copies.length;
      copies.forEach((c, k) => c.classList.toggle('is-on', k === i));
      pieces.forEach((c, k) => c.classList.toggle('is-on', k === i));
      $$('button', dots).forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-pressed', k === i); });
      sky.style.backgroundColor = skies[i];
    }
    function play() { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!document.hidden) show(i + 1); }, 6500); }
    show(0);
    hooks.home = { enter: play, leave: () => clearInterval(timer) };
  })();

  /* Placeholder / photo box used by products and gallery */
  function photoBox(item, fallback) {
    if (item.image) {
      return `<img class="${item.cutout ? 'is-cutout' : ''}" src="${esc(item.image)}" alt="${esc(item.name || item.caption || '')}" loading="lazy">`;
    }
    return `<div class="ph">${fallback}<span class="ph__tag">${A.icon.camera}Add photo</span></div>`;
  }

  /* ---------------- Products ---------------- */
  (function products() {
    const P = CFG.products, flow = $('#flow'), info = $('#productInfo'), scene = $('#products');
    flow.innerHTML = P.map((p, k) => `<article class="pcard" data-k="${k}" aria-label="${esc(p.name)}">
        <div class="pcard__arch"><div class="pcard__in">${photoBox(p, (A.productArt[p.art] || A.productArt.ghee)())}</div></div>
      </article>`).join('');
    const cards = $$('.pcard', flow);
    let i = 0, timer;
    function offset(k) {
      let d = k - i; const n = P.length;
      if (d > n / 2) d -= n; if (d < -n / 2) d += n;
      return d;
    }
    function layout() {
      cards.forEach((c, k) => {
        const d = offset(k), a = Math.abs(d);
        c.style.setProperty('--d', d);
        c.style.setProperty('--a', a);
        c.style.zIndex = 10 - a;
        c.classList.toggle('is-center', d === 0);
        c.classList.toggle('is-far', a > 2);
        c.classList.toggle('is-left-far', d < -1);
      });
      const p = P[i];
      info.innerHTML = `<h3><span>${esc(p.name)}</span> <span class="deva">${esc(p.local)}</span></h3><p>${esc(p.text)}</p>`;
      $('#prodCount').textContent = `${i + 1} / ${P.length}`;
      scene.style.setProperty('--tint', p.tint);
    }
    function show(n) { i = (n + P.length) % P.length; layout(); }
    function stop() { clearInterval(timer); }
    function play() { stop(); if (!reduce) timer = setInterval(() => { if (!document.hidden) show(i + 1); }, 4200); }
    $('#prodNext').addEventListener('click', () => { show(i + 1); stop(); });
    $('#prodPrev').addEventListener('click', () => { show(i - 1); stop(); });
    /* drag or swipe the shelf */
    let sx = 0, dragging = false, moved = false;
    flow.addEventListener('pointerdown', (e) => { sx = e.clientX; dragging = true; moved = false; stop(); });
    addEventListener('pointerup', (e) => {
      if (!dragging) return; dragging = false;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 40) { moved = true; show(i + (dx < 0 ? 1 : -1)); }
    });
    flow.addEventListener('click', (e) => {
      if (moved) return;
      const c = e.target.closest('.pcard');
      if (c) { show(+c.dataset.k); stop(); }
    });
    layout();
    hooks.products = { enter: play, leave: stop };
  })();

  /* ---------------- Jar tilt + hero parallax ---------------- */
  (function pointerFx() {
    if (!matchMedia('(hover:hover)').matches || reduce) return;
    const depth = $$('.depth'), jar = $('#jarTilt');
    let mx = 0, my = 0, q = false;
    addEventListener('pointermove', (e) => {
      mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
      if (q) return; q = true;
      requestAnimationFrame(() => {
        q = false;
        if (ids[cur] === 'home') depth.forEach((d) => { const k = +d.dataset.depth; d.style.transform = `translate3d(${-mx * k * 2}px,${-my * k}px,0)`; });
        if (ids[cur] === 'ghee') jar.style.transform = `perspective(900px) rotateY(${mx * 16}deg) rotateX(${-my * 9}deg)`;
      });
    }, { passive: true });
  })();

  /* ---------------- Journey ---------------- */
  (function journey() {
    const stops = [
      { art: 'pasture', label: 'Pasture', title: 'It begins on open pasture.', text: 'Green fields, slow mornings and well-loved cows.' },
      { art: 'milking', label: 'Milk', title: 'Fresh milk at first light.', text: 'Collected with care while the village is still waking up.' },
      { art: 'simmer', label: 'Simmer', title: 'Slow fire, patient hands.', text: 'Stirred until the kitchen smells of gold.' },
      { art: 'home', label: 'Home', title: 'And then, to your home.', text: 'Where it finally meets hot rotis and happy people.' }
    ];
    const world = $('#jWorld'), back = $('#jBack'), ground = $('#jGround'), calfBox = $('#jCalf'), text = $('#jText'), btns = $('#jStops');
    world.innerHTML = stops.map((s) => `<div class="jstation">${A.station[s.art]()}</div>`).join('');
    world.style.setProperty('--n', stops.length);
    calfBox.innerHTML = A.calf();
    const calfSvg = $('.calf', calfBox);
    text.innerHTML = stops.map((s, k) => `<div class="step-text" data-k="${k}"><h2 class="step-title">${esc(s.title)}</h2><p>${esc(s.text)}</p></div>`).join('');
    btns.innerHTML = stops.map((s, k) => `<button data-k="${k}"><i>${k + 1}</i><span>${esc(s.label)}</span></button>`).join('');
    let i = 0, timer, stopWalk;
    function draw(walk = true, prev = i) {
      const dur = reduce || !walk ? 0 : 1500;
      world.style.transition = back.style.transition = ground.style.transition = dur ? '' : 'none';
      world.style.transform = `translate3d(${-i * 100}vw,0,0)`;
      ground.style.transform = `translate3d(${-i * 100}vw,0,0)`;
      back.style.transform = `translate3d(${-i * 14}vw,0,0)`;
      $$('.step-text', text).forEach((t, k) => t.classList.toggle('is-on', k === i));
      $$('button', btns).forEach((b, k) => { b.classList.toggle('is-on', k === i); b.classList.toggle('is-past', k < i); b.setAttribute('aria-pressed', k === i); });
      if (dur && prev !== i) {
        calfBox.classList.toggle('is-back', i < prev);
        calfSvg.style.setProperty('--walk', '520ms');
        calfSvg.classList.add('is-walking');
        clearTimeout(stopWalk);
        stopWalk = setTimeout(() => { calfSvg.classList.remove('is-walking'); calfBox.classList.remove('is-back'); }, dur);
      }
    }
    function to(n) { const p = i; i = Math.max(0, Math.min(stops.length - 1, n)); draw(true, p); }
    function stop() { clearInterval(timer); }
    function play() { stop(); if (reduce) return; timer = setInterval(() => { if (document.hidden) return; if (i >= stops.length - 1) { stop(); return; } to(i + 1); }, 5200); }
    btns.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { to(+b.dataset.k); stop(); } });
    hooks.journey = {
      prep() { i = 0; draw(false); },
      enter: play,
      leave: stop,
      step(d) { const n = i + d; if (n < 0 || n >= stops.length) return false; stop(); to(n); return true; }
    };
    draw(false);
  })();

  /* ---------------- Gallery ---------------- */
  (function gallery() {
    const G = CFG.gallery, box = $('#galleryRows');
    const tile = (g, k) => `<figure class="gtile" style="--tilt:${[-2, 1.6, -1, 2.2, -1.6][k % 5]}deg">
      <div class="gtile__img">${g.image ? `<img class="${g.cutout ? 'is-cutout' : ''}" src="${esc(g.image)}" alt="${esc(g.caption)}" loading="lazy">` : `<div class="ph ph--plain">${A.icon.camera}<span>Add photo</span></div>`}</div>
      <figcaption>${esc(g.caption)}</figcaption></figure>`;
    const half = Math.ceil(G.length / 2);
    const rows = [G.slice(0, half), G.slice(half).concat(G.slice(0, 1))];
    box.innerHTML = rows.map((r, n) => {
      const items = r.map(tile).join('');
      return `<div class="grow grow--${n ? 'b' : 'a'}"><div class="grow__track">${items}${items}${items}${items}</div></div>`;
    }).join('');
    /* duplicates are decoration, keep them out of the reading order */
    $$('.grow__track').forEach((t) => { const c = [...t.children]; const n = c.length / 4; c.forEach((el, k) => { if (k >= n) el.setAttribute('aria-hidden', 'true'); }); });
  })();

  /* ---------------- Contact ---------------- */
  (function contact() {
    const C = CFG.contact;
    const card = (icon, label, value, href, ext) => {
      const v = value ? esc(value) : 'Coming soon';
      const tag = value && href ? 'a' : 'div';
      const attr = tag === 'a' ? `href="${esc(safeUrl(href))}"${ext ? ' target="_blank" rel="noopener"' : ''}` : '';
      return `<${tag} class="ccard ${value ? '' : 'is-empty'}" ${attr} data-in><b>${A.icon[icon]}</b><span><small>${label}</small>${v}</span></${tag}>`;
    };
    const wa = C.whatsapp ? String(C.whatsapp).replace(/\D/g, '') : '';
    const cards = [
      card('phone', 'Call us', C.phone, C.phone ? 'tel:' + String(C.phone).replace(/[^\d+]/g, '') : ''),
      card('chat', 'WhatsApp', wa ? 'Chat with us' : '', wa ? 'https://wa.me/' + wa : '', true),
      card('mail', 'Email', C.email, C.email ? 'mailto:' + C.email : ''),
      card('pin', 'Visit the dairy', C.address, C.mapLink, true)
    ];
    const box = $('#contactCards');
    box.innerHTML = cards.join('');
    $$('[data-in]', box).forEach((el, k) => el.style.setProperty('--d', .2 + k * .08 + 's'));
    const links = [['Instagram', C.instagram], ['Facebook', C.facebook]].filter((x) => x[1]);
    $('#socials').innerHTML = links.map(([n, u]) => `<a href="${esc(safeUrl(u))}" target="_blank" rel="noopener">${n}</a>`).join(' · ');
  })();

  /* ---------------- Start ---------------- */
  setHidden(-1);
  function start() {
    const i = ids.indexOf(location.hash.slice(1));
    go(i < 0 ? 0 : i, { silent: true });
  }
  const ready = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : 0,
      ...[...document.images].filter((im) => !im.complete).map((im) => new Promise((r) => { im.onload = im.onerror = r; }))
    ]),
    new Promise((r) => setTimeout(r, 1800))
  ]);
  const minShow = new Promise((r) => setTimeout(r, reduce ? 200 : 1050));
  Promise.all([ready, minShow]).then(start);
})();
