/* Dharau illustrations: every drawing on the site is generated here as inline SVG. */
(function () {
  const INK = '#33200F';
  const S = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

  /* ---------- Calf / cow rig ---------- */
  function leg(cls, x, hip, knee, foot, w1, w2, fill) {
    return `<g class="leg ${cls}" style="transform-origin:${x}px ${hip}px">
      <g class="shin" style="transform-origin:${x}px ${knee}px">
        <path d="M${x - w2 / 2} ${knee - 6} L${x - w2 / 2 + 1} ${foot - 12} L${x + w2 / 2 - 1} ${foot - 12} L${x + w2 / 2} ${knee - 6} Z" fill="${fill}" ${S}/>
        <path d="M${x - w2 / 2 - 2} ${foot - 13} h${w2 + 5} q2 10 1 13 h-${w2 + 7} q-1 -6 0 -13Z" fill="${INK}"/>
      </g>
      <path d="M${x - w1 / 2} ${hip - 14} C${x - w1 / 2 - 3} ${hip + 20} ${x - w2 / 2 - 2} ${knee - 16} ${x - w2 / 2 - 1} ${knee + 3} Q${x} ${knee + 10} ${x + w2 / 2 + 1} ${knee + 3} C${x + w2 / 2 + 2} ${knee - 16} ${x + w1 / 2 + 3} ${hip + 20} ${x + w1 / 2} ${hip - 14} Q${x} ${hip - 26} ${x - w1 / 2} ${hip - 14}Z" fill="${fill}"/>
      <path d="M${x - w1 / 2 - 1} ${hip + 12} C${x - w1 / 2 + 1} ${hip + 28} ${x - w2 / 2 - 2} ${knee - 16} ${x - w2 / 2 - 1} ${knee + 3} Q${x} ${knee + 10} ${x + w2 / 2 + 1} ${knee + 3} C${x + w2 / 2 + 2} ${knee - 16} ${x + w1 / 2 - 1} ${hip + 28} ${x + w1 / 2 + 1} ${hip + 12}" fill="none" ${S}/>
    </g>`;
  }

  function marigold(x, y, r, a = '#E8861A', b = '#F6B41F') {
    let p = '';
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * Math.PI * 2;
      p += `<circle cx="${(x + Math.cos(t) * r * 0.62).toFixed(1)}" cy="${(y + Math.sin(t) * r * 0.62).toFixed(1)}" r="${(r * 0.46).toFixed(1)}" fill="${a}"/>`;
    }
    return p + `<circle cx="${x}" cy="${y}" r="${(r * 0.46).toFixed(1)}" fill="${b}"/>`;
  }

  function calf(opts = {}) {
    const mom = !!opts.mom;
    const cls = ['calf', mom ? 'calf--mom' : '', opts.cls || ''].join(' ');
    const hide = 'var(--hide)', dark = 'var(--hide-dark)', far = 'var(--hide-far)';
    let garland = '';
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const x = 216 + t * 62 - Math.sin(t * Math.PI) * 4;
      const y = 124 + t * 40 + Math.sin(t * Math.PI) * 12;
      garland += marigold(+x.toFixed(1), +y.toFixed(1), 6.6, i % 2 ? '#E8861A' : '#C93F1E', i % 2 ? '#F6B41F' : '#F08A24');
    }
    const horns = mom
      ? `<path d="M283 40 C278 24 270 12 258 8 C264 22 268 34 272 46Z" fill="#E9DBB9" ${S}/><path d="M301 37 C303 22 310 10 322 5 C320 19 316 32 312 44Z" fill="#E9DBB9" ${S}/>`
      : `<path d="M285 41 q-3 -10 2 -15 q7 5 7 15Z" fill="#E9DBB9" ${S}/><path d="M303 39 q2 -9 9 -12 q3 7 -1 14Z" fill="#E9DBB9" ${S}/>`;
    return `<svg class="${cls}" viewBox="0 0 380 310" aria-hidden="true" focusable="false">
      <ellipse class="calf__shadow" cx="170" cy="294" rx="128" ry="9" fill="#1b1006" opacity=".22"/>
      <g class="calf__rig">
        ${leg('leg--ff', 246, 176, 236, 292, 26, 15, far)}
        ${leg('leg--fb', 118, 176, 236, 292, 28, 15, far)}
        <g class="calf__tail" style="transform-origin:68px 126px">
          <path d="M70 124 C50 134 44 160 46 196" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
          <path d="M70 124 C50 134 44 160 46 196" fill="none" stroke="var(--hide)" stroke-width="4" stroke-linecap="round"/>
          <path d="M46 190 c-9 10 -10 24 -2 34 c8 -6 12 -24 2 -34Z" fill="${INK}"/>
        </g>
        <path d="M64 150 C60 116 88 102 128 106 C162 110 196 108 226 102 C258 98 270 124 264 152 C258 182 242 200 212 202 C172 208 128 206 102 200 C78 194 66 176 64 150Z" fill="${hide}" ${S}/>
        <path d="M84 192 C118 206 182 208 228 196 C214 184 170 178 130 180 C110 181 94 184 84 192Z" fill="#FFF3DA" opacity=".9"/>
        <path d="M70 136 C74 112 104 104 124 110 C136 124 130 152 108 160 C90 166 72 156 70 136Z" fill="${dark}"/>
        <path d="M168 110 C186 110 200 108 212 106 C220 122 212 144 192 146 C176 146 164 128 168 110Z" fill="${dark}" opacity=".85"/>
        ${leg('leg--nb', 94, 172, 236, 292, 44, 16, hide)}
        ${leg('leg--nf', 224, 172, 236, 292, 36, 16, hide)}
        <g class="calf__front">
          <path d="M206 118 C228 94 246 72 262 56 L300 92 C286 118 272 146 254 172 C232 178 210 150 206 118Z" fill="${hide}"/>
          <path d="M212 108 C232 92 246 72 262 56 M300 92 C286 118 272 146 256 168" fill="none" ${S}/>
          <path d="M222 112 C236 96 248 80 258 66 L262 96 C250 118 242 136 240 152 C230 142 224 128 222 112Z" fill="${dark}" opacity=".3"/>
          ${mom ? '' : garland}
          <g class="calf__bell" style="transform-origin:262px 170px">
            <path d="M262 170 v6" stroke="${INK}" stroke-width="3"/>
            <path d="M250 196 C252 182 254 176 262 174 C270 176 272 182 274 196Z" fill="#D69A1E" ${S}/>
            <circle cx="262" cy="199" r="4" fill="#8A5A10"/>
          </g>
          <g class="calf__head" style="transform-origin:272px 84px">
            <g class="calf__ear calf__ear--far" style="transform-origin:306px 50px"><path d="M304 46 C320 34 338 36 346 46 C340 58 320 62 306 56Z" fill="${dark}" ${S}/></g>
            ${horns}
            <path d="M262 52 C276 32 308 30 322 50 C334 62 350 76 352 94 C354 112 338 120 322 118 C306 116 288 106 278 96 C264 84 254 68 262 52Z" fill="${hide}" ${S}/>
            <path d="M300 36 C306 44 306 56 318 66 C310 66 296 56 292 38 C295 36 298 36 300 36Z" fill="#FFF3DA"/>
            <path d="M316 84 C326 74 346 78 352 94 C354 112 338 120 322 118 C312 117 306 112 302 108 C308 102 310 92 316 84Z" fill="#F7DFC0" ${S}/>
            <ellipse cx="340" cy="94" rx="4" ry="3" fill="${INK}"/>
            <path d="M318 108 q10 5 22 0" fill="none" ${S}/>
            <g class="calf__eye" style="transform-origin:306px 64px">
              <ellipse cx="306" cy="64" rx="9" ry="10.5" fill="${INK}"/>
              <circle cx="309" cy="60" r="3.2" fill="#fff"/><circle cx="303" cy="68" r="1.5" fill="#fff" opacity=".7"/>
            </g>
            <path d="M295 54 q10 -8 21 -1" fill="none" ${S}/>
            <ellipse cx="297" cy="84" rx="9" ry="5" fill="#E99A79" opacity=".55"/>
            <g class="calf__ear calf__ear--near" style="transform-origin:268px 54px">
              <path d="M272 48 C252 38 228 44 220 60 C230 74 256 74 274 62Z" fill="${hide}" ${S}/>
              <path d="M262 54 C248 50 236 52 230 60 C238 67 254 66 264 60Z" fill="#E99A79" opacity=".75"/>
            </g>
          </g>
        </g>
      </g>
    </svg>`;
  }

  /* Sleeping calf for the night scene */
  function sleepingCalf() {
    return `<svg class="sleepy" viewBox="0 0 330 170" aria-hidden="true">
      <ellipse cx="160" cy="156" rx="146" ry="10" fill="#000" opacity=".28"/>
      <g class="sleepy__body">
        <path d="M30 118 c-14 8 -18 24 -8 30 c10 2 18 -10 22 -22Z" fill="${INK}"/>
        <path d="M34 112 C38 60 96 40 150 44 C200 48 238 76 240 112 C242 142 214 156 150 156 C86 156 30 150 34 112Z" fill="#C98A4B" ${S}/>
        <path d="M58 90 C70 62 110 54 128 66 C136 90 112 118 86 116 C70 114 58 106 58 90Z" fill="#A9682F"/>
        <path d="M84 150 C96 130 142 128 176 138 C192 142 200 150 196 156 L88 156Z" fill="#C98A4B" ${S}/>
        <path d="M176 156 h46 q6 -8 -2 -12 h-40Z" fill="#E8C793" ${S}/>
      </g>
      <g class="sleepy__head">
        <path d="M204 88 C216 66 254 66 268 86 C282 100 306 116 308 134 C310 150 292 156 276 154 C254 152 230 142 216 128 C204 116 198 102 204 88Z" fill="#C98A4B" ${S}/>
        <path d="M272 124 C282 114 302 118 308 134 C310 150 292 156 276 154 C266 153 260 148 258 144 C264 138 266 130 272 124Z" fill="#F7DFC0" ${S}/>
        <ellipse cx="294" cy="134" rx="3.5" ry="3" fill="${INK}"/>
        <path d="M240 100 q11 9 22 1" fill="none" ${S}/>
        <path d="M214 84 C196 74 174 80 168 96 C178 108 202 106 218 96Z" fill="#C98A4B" ${S}/>
        <path d="M204 90 C192 86 182 88 178 95 C184 101 198 100 206 95Z" fill="#E99A79" opacity=".75"/>
      </g>
    </svg>`;
  }

  /* Cart the calf pulls. `load` = 'cans' | 'jar' */
  function can(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-18 -56 h36 l4 12 v42 q0 6 -6 6 h-32 q-6 0 -6 -6 v-42Z" fill="#D7DCD2" ${S}/>
      <path d="M-10 -66 h20 l8 10 h-36Z" fill="#B9C0B5" ${S}/>
      <rect x="-14" y="-72" width="28" height="7" rx="3" fill="#8D968A" stroke="${INK}" stroke-width="3"/>
      <path d="M-22 -24 h44" stroke="${INK}" stroke-width="3"/>
      <path d="M-12 -46 v18" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
    </g>`;
  }
  function cart(load = 'cans') {
    const cargo = load === 'jar'
      ? `<image href="assets/ghee-jar.webp" x="46" y="4" width="118" height="168" preserveAspectRatio="xMidYMax meet"/>`
      : can(70, 158) + can(118, 158) + can(164, 158, .9);
    return `<svg class="cart" viewBox="0 0 280 240" aria-hidden="true">
      <ellipse cx="110" cy="232" rx="100" ry="7" fill="#1b1006" opacity=".2"/>
      ${cargo}
      <path d="M186 172 L278 150" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <path d="M186 172 L278 150" stroke="#9A6235" stroke-width="5" stroke-linecap="round"/>
      <path d="M20 148 h184 l-10 36 h-164Z" fill="#A8482A" ${S}/>
      <path d="M30 160 h164" stroke="#F6B41F" stroke-width="4" stroke-dasharray="10 8"/>
      <path d="M28 172 h160" stroke="#FBF5E6" stroke-width="3"/>
      ${[56, 164].map((x) => `<g class="wheel" style="transform-origin:${x}px 196px">
        <circle cx="${x}" cy="196" r="34" fill="none" stroke="${INK}" stroke-width="11"/>
        <circle cx="${x}" cy="196" r="34" fill="none" stroke="#9A6235" stroke-width="6"/>
        ${[0, 45, 90, 135].map((a) => `<path d="M${x} 164 V228" transform="rotate(${a} ${x} 196)" stroke="${INK}" stroke-width="4"/>`).join('')}
        <circle cx="${x}" cy="196" r="7" fill="#D69A1E" stroke="${INK}" stroke-width="3"/>
      </g>`).join('')}
    </svg>`;
  }

  function butterfly(color = '#E8861A') {
    return `<svg class="butterfly" viewBox="0 0 60 50" aria-hidden="true">
      <g class="wing wing--l" style="transform-origin:30px 25px"><path d="M30 25 C20 4 2 4 4 18 C5 28 20 32 30 25Z M30 25 C20 30 10 38 16 44 C22 48 30 38 30 25Z" fill="${color}" stroke="${INK}" stroke-width="2"/></g>
      <g class="wing wing--r" style="transform-origin:30px 25px"><path d="M30 25 C40 4 58 4 56 18 C55 28 40 32 30 25Z M30 25 C40 30 50 38 44 44 C38 48 30 38 30 25Z" fill="${color}" stroke="${INK}" stroke-width="2"/></g>
      <path d="M30 14 V38" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  /* ---------- Mandala / sun ---------- */
  function mandala(a = '#E8A317', b = '#F6C544', c = '#A8482A') {
    const ring = (n, fn) => Array.from({ length: n }, (_, i) => `<g transform="rotate(${(i * 360) / n} 300 300)">${fn(i)}</g>`).join('');
    return `<svg class="mandala" viewBox="0 0 600 600" aria-hidden="true">
      <g class="mandala__outer" style="transform-origin:300px 300px">
        ${ring(36, () => `<path d="M300 8 C312 34 312 50 300 66 C288 50 288 34 300 8Z" fill="${a}"/>`)}
        ${ring(36, () => `<circle cx="300" cy="78" r="4.5" fill="${c}"/>`)}
      </g>
      <g class="mandala__mid" style="transform-origin:300px 300px">
        <circle cx="300" cy="300" r="208" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="3 9" stroke-linecap="round"/>
        ${ring(24, () => `<path d="M300 92 C326 122 326 152 300 176 C274 152 274 122 300 92Z" fill="${b}" stroke="${c}" stroke-width="2"/>`)}
      </g>
      <circle cx="300" cy="300" r="126" fill="${a}"/>
      <circle cx="300" cy="300" r="112" fill="none" stroke="#FBF5E6" stroke-width="2.5" stroke-dasharray="1 8" stroke-linecap="round"/>
    </svg>`;
  }

  /* ---------- Landscape pieces ---------- */
  function tree(x, y, s = 1, c1 = '#2F5D3A', c2 = '#44743F') {
    return `<g transform="translate(${x} ${y}) scale(${s})" class="tree">
      <path d="M-9 0 C-6 -30 -8 -60 -10 -82 H10 C8 -60 6 -30 9 0Z" fill="#6E4324" ${S}/>
      <g class="tree__crown">
        <circle cx="-34" cy="-98" r="34" fill="${c1}" ${S}/><circle cx="34" cy="-96" r="36" fill="${c1}" ${S}/>
        <circle cx="0" cy="-130" r="44" fill="${c2}" ${S}/>
        ${[[-34, -100], [-14, -140], [14, -122], [38, -98], [-4, -96], [20, -150], [-40, -82]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.6" fill="#F6C544"/>`).join('')}
      </g>
    </g>`;
  }
  function hut(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-54" y="-58" width="108" height="58" fill="#EBCFA2" ${S}/>
      <path d="M-74 -54 L0 -110 L74 -54 Q0 -44 -74 -54Z" fill="#8A4B2A" ${S}/>
      <path d="M-54 -38 h108" stroke="#A8482A" stroke-width="5" stroke-dasharray="7 7"/>
      <path d="M-14 0 v-34 q14 -14 28 0 v34Z" fill="#33200F"/>
    </g>`;
  }
  function cloud(cls = '', fill = '#FFF9EB') {
    return `<svg class="cloud ${cls}" viewBox="0 0 220 90" aria-hidden="true">
      <path d="M26 74 C6 74 4 50 24 48 C24 28 54 22 66 38 C76 12 124 10 134 38 C150 26 176 34 174 52 C196 50 206 74 186 76 Z" fill="${fill}" stroke="${INK}" stroke-opacity=".2" stroke-width="2.5"/>
      <path d="M64 56 c10 -10 22 -2 14 6 M118 54 c10 -10 24 -2 16 7" fill="none" stroke="${INK}" stroke-opacity=".22" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }
  function bird() {
    return `<svg class="bird" viewBox="0 0 50 24" aria-hidden="true"><path class="bird__wing" d="M2 16 Q14 2 25 15 Q36 2 48 16" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></svg>`;
  }
  function hills(c1, c2, c3) {
    return `<svg class="hills" viewBox="0 0 1600 420" preserveAspectRatio="none" aria-hidden="true">
      <path class="hills__a" d="M0 190 C180 110 340 120 520 180 C700 240 860 90 1060 110 C1260 130 1420 200 1600 130 V420 H0Z" fill="${c1}"/>
      <path class="hills__b" d="M0 270 C220 200 380 260 620 260 C860 260 980 180 1220 210 C1380 230 1500 260 1600 230 V420 H0Z" fill="${c2}"/>
      <path class="hills__c" d="M0 345 C260 300 520 360 800 335 C1080 310 1320 300 1600 340 V420 H0Z" fill="${c3}"/>
    </svg>`;
  }

  /* ---------- Products ---------- */
  const productArt = {
    ghee: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <path d="M52 82 C34 94 30 118 34 138 L40 228 C42 252 76 262 120 262 C164 262 198 252 200 228 L206 138 C210 118 206 94 188 82Z" fill="#EFA116" ${S}/>
      <path d="M40 196 C80 214 160 182 202 200 L200 228 C198 252 164 262 120 262 C76 262 42 252 40 228Z" fill="#F8C93E"/>
      <path d="M150 112 C170 112 182 124 184 142" fill="none" stroke="#FFF3C6" stroke-width="9" stroke-linecap="round"/>
      <rect x="44" y="42" width="152" height="44" rx="12" fill="#F6C21E" ${S}/>
      <path d="M58 48 v32 M78 48 v32 M98 48 v32 M118 48 v32 M138 48 v32 M158 48 v32 M178 48 v32" stroke="#D69A1E" stroke-width="3"/>
    </svg>`,
    milk: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <path d="M96 58 L94 92 C70 108 66 124 66 146 V244 C66 258 76 266 90 266 H150 C164 266 174 258 174 244 V146 C174 124 170 108 146 92 L144 58Z" fill="#FFFDF4" ${S}/>
      <path d="M66 162 C92 176 148 148 174 162 V244 C174 258 164 266 150 266 H90 C76 266 66 258 66 244Z" fill="#F4EBD3"/>
      <rect x="90" y="30" width="60" height="30" rx="7" fill="#A8482A" ${S}/>
      <path d="M82 134 V226" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
      <circle cx="120" cy="206" r="28" fill="#12372A"/><path d="M120 188 c14 8 14 26 0 36 c-14 -10 -14 -28 0 -36Z" fill="#9BAA3A"/>
    </svg>`,
    paneer: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <path d="M12 226 C60 196 180 196 228 226 C190 266 50 266 12 226Z" fill="#44743F" ${S}/><path d="M26 226 C80 216 160 216 214 226" fill="none" stroke="#9BAA3A" stroke-width="3"/>
      <path d="M58 150 L120 122 L182 150 V212 L120 240 L58 212Z" fill="#FFF8E4" ${S}/>
      <path d="M58 150 L120 178 L182 150 M120 178 V240" fill="none" ${S}/><path d="M120 178 L182 150 V212 L120 240Z" fill="#F0E0BA"/>
      <path d="M88 92 L128 74 L168 92 V132 L128 150 L88 132Z" fill="#FFF8E4" ${S}/>
      <path d="M88 92 L128 110 L168 92 M128 110 V150" fill="none" ${S}/><path d="M128 110 L168 92 V132 L128 150Z" fill="#F0E0BA"/>
      <circle cx="84" cy="180" r="3" fill="#E5D5AE"/><circle cx="100" cy="196" r="3" fill="#E5D5AE"/><circle cx="108" cy="124" r="3" fill="#E5D5AE"/>
    </svg>`,
    dahi: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <path d="M46 112 C20 150 28 222 72 252 C100 268 140 268 168 252 C212 222 220 150 194 112Z" fill="#A8482A" ${S}/>
      <path d="M36 178 C80 196 160 196 204 178" fill="none" stroke="#F6C544" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
      <path d="M38 196 C80 214 160 214 202 196" fill="none" stroke="#FBF5E6" stroke-width="3"/>
      <ellipse cx="120" cy="108" rx="84" ry="24" fill="#8A3A20" ${S}/>
      <path d="M46 106 C60 86 92 92 104 86 C124 76 150 92 170 88 C186 88 194 98 194 106 C180 124 62 126 46 106Z" fill="#FFFDF4" ${S}/>
      <path d="M154 96 L204 26" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M154 96 L204 26" stroke="#9A6235" stroke-width="8" stroke-linecap="round"/>
    </svg>`,
    butter: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <ellipse cx="120" cy="226" rx="104" ry="28" fill="#FBF5E6" ${S}/><ellipse cx="120" cy="222" rx="78" ry="17" fill="none" stroke="#A8482A" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/>
      <path d="M58 212 C42 186 56 146 92 138 C106 112 150 112 164 138 C198 148 204 188 184 212 C150 232 92 232 58 212Z" fill="#FFF2B8" ${S}/>
      <path d="M90 158 c12 -14 34 -10 40 2 M130 186 c14 -10 30 -6 36 6" fill="none" stroke="#E5C661" stroke-width="5" stroke-linecap="round"/>
      <path d="M176 84 L126 156" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M176 84 L126 156" stroke="#9A6235" stroke-width="8" stroke-linecap="round"/>
    </svg>`,
    lassi: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <path d="M62 84 L80 252 C82 262 158 262 160 252 L178 84Z" fill="#A8482A" ${S}/>
      <path d="M68 136 C100 150 140 150 172 136" fill="none" stroke="#F6C544" stroke-width="5" stroke-dasharray="3 11" stroke-linecap="round"/>
      <path d="M52 86 C50 66 72 60 86 64 C96 44 134 42 146 62 C164 56 190 66 188 86 C176 102 66 102 52 86Z" fill="#FFFDF4" ${S}/>
      <path d="M128 52 C140 28 160 24 174 30 C170 48 150 58 128 52Z" fill="#44743F" ${S}/>
    </svg>`,
    mithai: () => `<svg viewBox="0 0 240 280" aria-hidden="true">
      <ellipse cx="120" cy="228" rx="108" ry="28" fill="#D69A1E" ${S}/><ellipse cx="120" cy="222" rx="88" ry="19" fill="#F1C14E" ${S}/>
      ${[[66, 192], [120, 200], [174, 192], [94, 148], [148, 148], [120, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="31" fill="#EFA116" ${S}/><circle cx="${x - 9}" cy="${y - 10}" r="3" fill="#FFF3C6"/><circle cx="${x + 8}" cy="${y - 3}" r="3" fill="#C97A10"/><circle cx="${x - 2}" cy="${y + 11}" r="3" fill="#FFF3C6"/><circle cx="${x + 13}" cy="${y + 13}" r="2.4" fill="#C97A10"/>`).join('')}
      <circle cx="120" cy="77" r="8" fill="#44743F" ${S}/>
    </svg>`
  };

  /* Bigger animated hero art */
  function heroMilk() {
    return `<svg class="hero-milk" viewBox="0 0 520 620" aria-hidden="true">
      <g class="pour"><path d="M238 0 C238 100 256 150 256 262 H282 C282 150 300 100 300 0Z" fill="#FFFDF4" stroke="${INK}" stroke-opacity=".15" stroke-width="2.5"/></g>
      <path d="M120 300 L150 588 C152 604 368 604 370 588 L400 300Z" fill="#FFF9E9" fill-opacity=".55" ${S}/>
      <path class="milk-level" d="M128 360 C190 340 330 380 392 356 L370 586 C368 602 152 602 150 586Z" fill="#FFFDF4"/>
      <path d="M150 390 L168 560" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
      <g class="splash">
        <path d="M196 340 C206 304 214 300 226 334 C240 280 252 264 268 330 C286 274 306 286 318 336 C328 306 340 308 346 344 C300 368 240 366 196 340Z" fill="#FFFDF4" stroke="${INK}" stroke-opacity=".15" stroke-width="2.5"/>
      </g>
      ${[[150, 268, 12, 0], [392, 258, 15, .3], [108, 214, 8, .6], [430, 196, 9, .15], [204, 226, 7, .45], [344, 214, 8, .75]].map(([x, y, r, d]) => `<circle class="drop" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="${r}" fill="#FFFDF4" stroke="${INK}" stroke-opacity=".15" stroke-width="2"/>`).join('')}
    </svg>`;
  }
  function heroDahi() {
    return `<svg class="hero-dahi" viewBox="0 0 520 620" aria-hidden="true">
      <ellipse cx="260" cy="580" rx="200" ry="24" fill="#1b1006" opacity=".2"/>
      <path d="M92 250 C30 340 58 500 150 560 C210 596 310 596 370 560 C462 500 490 340 428 250Z" fill="#A8482A" ${S}/>
      <path d="M66 372 C150 412 370 412 454 372" fill="none" stroke="#F6C544" stroke-width="10" stroke-dasharray="4 26" stroke-linecap="round"/>
      <path d="M70 410 C160 450 360 450 450 410" fill="none" stroke="#FBF5E6" stroke-width="5"/>
      <path d="M78 440 C160 478 360 478 442 440" fill="none" stroke="#FBF5E6" stroke-width="5" stroke-dasharray="14 12"/>
      <ellipse cx="260" cy="244" rx="184" ry="50" fill="#8A3A20" ${S}/>
      <path class="dahi-top" d="M92 240 C120 196 200 210 232 196 C276 176 330 208 372 202 C410 200 430 224 430 240 C400 280 124 284 92 240Z" fill="#FFFDF4" ${S}/>
      <g class="ladle" style="transform-origin:280px 218px">
        <path d="M280 218 L402 34" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M280 218 L402 34" stroke="#9A6235" stroke-width="14" stroke-linecap="round"/>
      </g>
      <g class="steam-leaf"><path d="M88 150 C90 118 118 106 142 112 C140 140 116 158 88 150Z" fill="#44743F" ${S}/></g>
    </svg>`;
  }

  /* ---------- Journey stations ---------- */
  const station = {
    pasture: () => `<svg viewBox="0 0 640 360" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      ${tree(540, 342, 1.25)}
      ${tree(92, 340, .85)}
      <g class="st-grass">${[170, 210, 410, 462, 490].map((x, i) => `<path d="M${x} 344 q-5 -22 -13 -30 M${x} 344 q0 -26 2 -36 M${x} 344 q6 -20 14 -28" fill="none" stroke="#2F5D3A" stroke-width="4" stroke-linecap="round" style="animation-delay:${i * .2}s"/>`).join('')}</g>
    </svg>`,
    milking: () => `<svg viewBox="0 0 640 360" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      <g><path d="M300 344 V120 M620 344 V120" stroke="${INK}" stroke-width="14"/><path d="M300 344 V120 M620 344 V120" stroke="#8A4B2A" stroke-width="8"/>
      <path d="M272 124 L460 40 L648 124Z" fill="#A8482A" ${S}/><path d="M312 110 L460 56 L608 110" fill="none" stroke="#F6C544" stroke-width="4" stroke-dasharray="4 12" stroke-linecap="round"/></g>
      ${can(360, 344, 1.25)}${can(450, 344, 1.5)}${can(540, 344, 1.25)}
      <g class="st-drip"><circle cx="450" cy="210" r="6" fill="#FFFDF4" stroke="${INK}" stroke-width="2"/></g>
    </svg>`,
    simmer: () => `<svg viewBox="0 0 640 360" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      <g class="st-steam">${[320, 400, 480].map((x, i) => `<path style="animation-delay:${i * .6}s" d="M${x} 150 c-22 -26 22 -48 0 -76 c-18 -24 12 -38 4 -56" fill="none" stroke="#8F8A62" stroke-width="8" stroke-linecap="round" opacity=".6"/>`).join('')}</g>
      <path d="M262 180 q-30 -6 -40 12 M538 180 q30 -6 40 12" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <path d="M248 172 H552 C544 268 470 292 400 292 C330 292 256 268 248 172Z" fill="#5A4A3C" ${S}/>
      <ellipse cx="400" cy="172" rx="152" ry="24" fill="#3C3027" ${S}/>
      <ellipse class="st-gold" cx="400" cy="174" rx="132" ry="15" fill="#F2B01E"/>
      <path d="M296 344 L320 290 M504 344 L480 290 M340 344 h120" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
      <g class="st-fire">${[340, 372, 404, 436, 462].map((x, i) => `<path style="animation-delay:${i * .13}s;transform-origin:${x}px 340px" d="M${x} 340 c-20 -14 -16 -32 0 -48 c16 16 20 34 0 48Z" fill="${i % 2 ? '#F6B41F' : '#E8661A'}" stroke="${INK}" stroke-width="2.5"/>`).join('')}</g>
    </svg>`,
    home: () => `<svg viewBox="0 0 640 360" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      ${hut(470, 344, 1.9)}
      <g transform="translate(250 344)">
        <path d="M-80 -90 h160 l-12 12 h-136Z" fill="#A8482A" ${S}/><path d="M-62 -78 V0 M62 -78 V0" stroke="${INK}" stroke-width="10"/>
        <image href="assets/ghee-jar.webp" x="-38" y="-178" width="62" height="88"/>
        <g class="st-flame" style="transform-origin:48px -116px"><path d="M48 -104 c-11 -7 -9 -18 0 -28 c9 10 11 21 0 28Z" fill="#F6B41F" stroke="${INK}" stroke-width="2"/></g>
        <path d="M28 -106 h40 q-4 16 -20 16 q-16 0 -20 -16Z" fill="#A8482A" ${S}/>
      </g>
    </svg>`
  };

  /* ---------- Warli folk figures ---------- */
  function warliPerson(x, y, s = 1, pose = 'walk') {
    const arm = pose === 'dance' ? `M0 -30 L-18 -22 M0 -30 L18 -22` : `M0 -30 L-14 -14 M0 -30 L14 -16`;
    const pot = pose === 'pot' ? `<path d="M-9 -66 C-13 -58 -6 -52 0 -52 C6 -52 13 -58 9 -66Z" fill="#FBF5E6"/><path d="M0 -30 L-12 -44 L-8 -60 M0 -30 L12 -44 L8 -60" fill="none" stroke="#FBF5E6" stroke-width="2.6"/>` : `<path d="${arm}" fill="none" stroke="#FBF5E6" stroke-width="2.6" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="-42" r="5.5" fill="#FBF5E6"/>
      <path d="M-11 -34 H11 L0 -18 L-10 -2 H10 L0 -18Z" fill="#FBF5E6"/>
      ${pot}
      <g class="w-legs"><path d="M-6 -2 L-10 14 M6 -2 L10 14" stroke="#FBF5E6" stroke-width="2.6" stroke-linecap="round"/></g>
    </g>`;
  }
  function warliCow(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="#FBF5E6" stroke="#FBF5E6">
      <path d="M-30 -22 H22 L8 -6 L22 8 H-30 L-14 -6Z" stroke="none"/>
      <path d="M22 -22 L34 -34 L44 -30 L38 -20 L28 -18Z" stroke="none"/>
      <path d="M34 -34 l-3 -9 M41 -32 l6 -8" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-30 -20 C-38 -14 -38 -6 -36 2" fill="none" stroke-width="2.4"/>
      <path d="M-24 8 V24 M-16 8 V24 M12 8 V24 M20 8 V24" stroke-width="2.6" stroke-linecap="round"/>
    </g>`;
  }
  function warliBand() {
    const w = 1600, parts = [];
    let x = 60, i = 0;
    while (x < w) {
      const k = i % 6;
      if (k === 0 || k === 3) { parts.push(warliCow(x, 56, 1)); x += 110; }
      else if (k === 1) { parts.push(warliPerson(x, 56, 1, 'pot')); x += 70; }
      else if (k === 2) { parts.push(warliPerson(x, 56, 1, 'walk')); x += 70; }
      else if (k === 4) { parts.push(warliPerson(x, 56, 1, 'pot')); x += 60; parts.push(warliPerson(x, 56, .8, 'walk')); x += 60; }
      else {
        parts.push(`<g transform="translate(${x} 80)" fill="none" stroke="#FBF5E6" stroke-width="2.6" stroke-linecap="round"><path d="M0 0 V-52 M0 -30 L-16 -48 M0 -24 L16 -44 M0 -40 L-10 -60 M0 -38 L10 -60"/><circle cx="-16" cy="-52" r="3" fill="#FBF5E6"/><circle cx="16" cy="-48" r="3" fill="#FBF5E6"/><circle cx="-10" cy="-63" r="3" fill="#FBF5E6"/><circle cx="10" cy="-63" r="3" fill="#FBF5E6"/></g>`);
        x += 70;
      }
      i++;
    }
    return `<svg viewBox="0 0 ${w} 90" preserveAspectRatio="xMinYMid meet" aria-hidden="true">${parts.join('')}<path d="M0 84 H${w}" stroke="#FBF5E6" stroke-width="2.5" stroke-dasharray="2 10" stroke-linecap="round"/></svg>`;
  }
  function warliCircle() {
    const n = 14, r = 142; let out = '';
    for (let i = 0; i < n; i++) {
      out += `<g transform="rotate(${(i * 360) / n} 210 210) translate(210 ${210 - r})"><g transform="scale(.82)">${warliPerson(0, 0, 1, 'dance')}</g></g>`;
    }
    const inner = Array.from({ length: 8 }, (_, i) => `<g transform="rotate(${(i * 360) / 8} 210 210) translate(210 ${210 - 74})"><g transform="scale(.62)">${warliPerson(0, 0, 1, 'dance')}</g></g>`).join('');
    return `<svg viewBox="0 0 420 420" aria-hidden="true">
      <circle cx="210" cy="210" r="202" fill="none" stroke="#FBF5E6" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round"/>
      <g class="warli-spin">${out}</g>
      <g class="warli-spin warli-spin--rev">${inner}</g>
      <g transform="translate(210 225)"><g class="warli-bounce">${warliPerson(0, 0, .9, 'dance')}</g></g>
    </svg>`;
  }

  /* ---------- Festive bits ---------- */
  function toran(count = 15) {
    let s = '';
    const W = 1600;
    for (let i = 0; i <= count; i++) {
      const x = (i / count) * W;
      const y = 8 + Math.sin((i / count) * Math.PI * 6) * -0 + Math.abs(Math.sin((i / count) * Math.PI * 3)) * 26;
      s += marigold(+x.toFixed(1), +y.toFixed(1), 13, i % 2 ? '#E8861A' : '#D5501E');
      if (i < count) {
        const mx = x + W / count / 2, my = 8 + Math.abs(Math.sin(((i + .5) / count) * Math.PI * 3)) * 26;
        s += `<g class="toran__leaf" style="transform-origin:${mx.toFixed(1)}px ${my.toFixed(1)}px;animation-delay:${(i % 5) * .25}s"><path d="M${mx.toFixed(1)} ${my.toFixed(1)} c-17 18 -15 44 0 62 c15 -18 17 -44 0 -62Z" fill="#44743F" stroke="#1E3F2B" stroke-width="2"/><path d="M${mx.toFixed(1)} ${(my + 6).toFixed(1)} v48" stroke="#9BAA3A" stroke-width="2"/></g>`;
      }
    }
    return `<svg viewBox="0 0 1600 110" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 10 ${Array.from({ length: 31 }, (_, i) => `L${(i / 30) * W} ${(8 + Math.abs(Math.sin((i / 30) * Math.PI * 3)) * 26).toFixed(1)}`).join(' ')}" fill="none" stroke="#7A4A18" stroke-width="3"/>${s}</svg>`;
  }
  function diya(i = 0) {
    return `<svg class="diya" viewBox="0 0 80 90" aria-hidden="true">
      <defs><radialGradient id="dg${i}"><stop offset="0" stop-color="#FFC94D" stop-opacity=".62"/><stop offset="1" stop-color="#FFC94D" stop-opacity="0"/></radialGradient></defs><g class="diya__glow" style="animation-delay:${i * .3}s"><circle cx="40" cy="32" r="46" fill="url(#dg${i})"/></g>
      <g class="diya__flame" style="animation-delay:${i * .17}s;transform-origin:40px 46px"><path d="M40 48 c-12 -8 -10 -22 0 -36 c10 14 12 28 0 36Z" fill="#F6B41F" stroke="#E8661A" stroke-width="2"/><path d="M40 46 c-5 -4 -4 -11 0 -18 c4 7 5 14 0 18Z" fill="#FFF3C6"/></g>
      <path d="M8 52 C22 56 58 56 72 52 C70 74 56 82 40 82 C24 82 10 74 8 52Z" fill="#A8482A" stroke="#E8A317" stroke-width="2"/>
      <path d="M20 66 h40" stroke="#F6C544" stroke-width="2.5" stroke-dasharray="1 6" stroke-linecap="round"/>
    </svg>`;
  }

  /* small hand-print icons for the uses + promises */
  const icon = {
    tadka: `<svg viewBox="0 0 48 48"><path d="M6 24 H34 C34 34 26 38 20 38 C14 38 6 34 6 24Z M34 26 L44 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 18 c-3 -4 3 -6 0 -10 M22 18 c-3 -4 3 -6 0 -10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    roti: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="18" cy="20" r="2.4" fill="currentColor"/><circle cx="29" cy="17" r="1.8" fill="currentColor"/><circle cx="30" cy="29" r="2.6" fill="currentColor"/><circle cx="20" cy="31" r="1.6" fill="currentColor"/></svg>`,
    sweet: `<svg viewBox="0 0 48 48"><circle cx="16" cy="30" r="9" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="30" r="9" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="16" r="9" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    puja: `<svg viewBox="0 0 48 48"><path d="M8 28 C16 31 32 31 40 28 C39 38 32 42 24 42 C16 42 9 38 8 28Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M24 26 c-7 -5 -6 -12 0 -20 c6 8 7 15 0 20Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
    leaf: `<svg viewBox="0 0 48 48"><path d="M24 6 C38 16 38 32 24 42 C10 32 10 16 24 6Z M24 16 V42" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
    hands: `<svg viewBox="0 0 48 48"><path d="M24 40 C8 30 6 18 14 13 C19 10 23 13 24 17 C25 13 29 10 34 13 C42 18 40 30 24 40Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
    drop: `<svg viewBox="0 0 48 48"><path d="M24 6 C34 20 39 25 39 31 A15 12 0 0 1 9 31 C9 25 14 20 24 6Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M16 31 a8 7 0 0 0 7 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    home: `<svg viewBox="0 0 48 48"><path d="M6 24 L24 8 L42 24 M12 20 V40 H36 V20 M20 40 V28 H28 V40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    phone: `<svg viewBox="0 0 48 48"><path d="M14 7 L20 8 L23 18 L18 21 C20 27 24 30 29 32 L32 27 L41 30 L41 37 C41 40 38 42 35 41 C20 39 9 28 7 13 C7 10 10 7 14 7Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
    chat: `<svg viewBox="0 0 48 48"><path d="M24 7 C13 7 6 14 6 23 C6 27 8 31 10 33 L8 42 L18 38 C20 39 22 39 24 39 C35 39 42 32 42 23 C42 14 35 7 24 7Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M16 23 h.1 M24 23 h.1 M32 23 h.1" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/></svg>`,
    mail: `<svg viewBox="0 0 48 48"><rect x="6" y="11" width="36" height="27" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><path d="M7 13 L24 27 L41 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
    pin: `<svg viewBox="0 0 48 48"><path d="M24 43 C14 31 9 25 9 19 A15 15 0 0 1 39 19 C39 25 34 31 24 43Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="19" r="5" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    camera: `<svg viewBox="0 0 48 48"><path d="M6 15 H15 L19 9 H29 L33 15 H42 V39 H6Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="26" r="7.5" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
  };

  window.DharauArt = { calf, sleepingCalf, cart, can, butterfly, mandala, tree, hut, cloud, bird, hills, productArt, heroMilk, heroDahi, station, warliBand, warliCircle, toran, diya, marigold, icon };
})();
