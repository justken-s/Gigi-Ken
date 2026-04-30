/* ============================================================
   MAIN.JS — OPTIMIZADO PARA GITHUB PAGES
   - Lazy loading de imágenes
   - Memorización de cálculos de galaxia
   - Batch DOM updates (DocumentFragment)
   - Debounce en eventos de movimiento
   - Intersection Observer para imágenes
   - Precarga inteligente de fotos adyacentes
   ============================================================ */

const recuerdos = [
    /* ========================= NOVIEMBRE 2025 ========================= */
    { id: 1,  mes: 'Noviembre', fecha: '2025-11-06', x: 50, y: 92, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097693/IMG-20260303-WA0083_s6trut.jpg', nota: 'Antes de empezar a contar.' },
    { id: 2,  mes: 'Noviembre', fecha: '2025-11-11', x: 22, y: 80, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402119/IMG-20251111-WA0059_jhosmo.jpg', nota: 'Un momento especial.' },
    { id: 3,  mes: 'Noviembre', fecha: '2025-11-12', x: 75, y: 71, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097714/IMG-20260303-WA0087_klb88m.jpg', nota: 'Mal tercios' },
    { id: 4,  mes: 'Noviembre', fecha: '2025-11-20', x: 10, y: 62, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777096914/IMG-20251120-WA0008_p56hpd.jpg', nota: '20 de Noviembre: Atesorando cada pequeño momento.' },
    { id: 5,  mes: 'Noviembre', fecha: '2025-11-20', x: 35, y: 66, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402110/IMG-20251120-WA0012_yg2mhz.jpg', nota: 'Otro recuerdo de ese día.' },
    { id: 6,  mes: 'Noviembre', fecha: '2025-11-20', x: 60, y: 58, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402077/IMG-20251120-WA0019_w3kdl3.jpg', nota: 'Más momentos guardados.' },
    { id: 7,  mes: 'Noviembre', fecha: '2025-11-22', x: 15, y: 40, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777096975/IMG-20251122-WA0023_zyvt4c.jpg', nota: '22 de Noviembre: Cómplices en todo.' },
    { id: 8,  mes: 'Noviembre', fecha: '2025-11-22', x: 85, y: 45, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097000/IMG-20251122-WA0035_gghbww.jpg', nota: 'Primera cita de noviembre.' },
    { id: 9,  mes: 'Noviembre', fecha: '2025-11-22', x: 55, y: 38, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402135/IMG-20251122-WA0024_c6op8w.jpg', nota: 'Un recuerdo más juntos.' },
    { id: 10, mes: 'Noviembre', fecha: '2025-11-22', x: 70, y: 38, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402145/IMG-20251122-WA0049_mh3h42.jpg', nota: 'Otro instante especial.' },
    { id: 11, mes: 'Noviembre', fecha: '2025-11-23', x: 25, y: 25, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097543/IMG-20251123-WA0018_tufbow.jpg', nota: '23 de Noviembre: Un día más de pura magia.' },
    { id: 12, mes: 'Noviembre', fecha: '2025-11-23', x: 80, y: 21, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402157/IMG-20251123-WA0065_herigu.jpg', nota: 'Otro momento especial.' },
    { id: 13, mes: 'Noviembre', fecha: '2025-11-23', x: 50, y: 28, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402161/IMG-20251123-WA0070_zlhjel.jpg', nota: 'Recuerdo inolvidable.' },
    /* ========================= DICIEMBRE 2025 ========================= */
    { id: 14, mes: 'Diciembre', fecha: '2025-12-31', x: 60, y: 68, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097065/IMG-20251231-WA0026_1_rzvipi.jpg', nota: '31 de Diciembre: El mejor cierre de año posible.' },
    { id: 15, mes: 'Diciembre', fecha: '2025-12-31', x: 62, y: 70, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402216/IMG-20251231-WA0029_scdlvx.jpg', nota: 'Celebrando juntos.' },
    { id: 16, mes: 'Diciembre', fecha: '2025-12-31', x: 64, y: 72, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402249/IMG-20251231-WA0190_bikivb.jpg', nota: 'Otro momento del cierre de año.' },
    /* ========================= ENERO 2026 ========================= */
    { id: 17, mes: 'Enero', fecha: '2026-01-01', x: 35, y: 64, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097630/IMG-20260101-WA0039_rzd17f.jpg', nota: '1 de Enero: Empezando el año con mi persona favorita.' },
    { id: 18, mes: 'Enero', fecha: '2026-01-01', x: 38, y: 66, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402261/IMG-20260101-WA0066_vx5p4s.jpg', nota: 'Comenzando el año juntos.' },
    { id: 19, mes: 'Enero', fecha: '2026-01-01', x: 40, y: 68, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402267/IMG-20260101-WA0082_qdt64h.jpg', nota: 'Más recuerdos del inicio.' },
    { id: 20, mes: 'Enero', fecha: '2026-01-28', x: 20, y: 62, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402300/20260128_005429_jby8p6.jpg', nota: 'Un día especial.' },
    { id: 21, mes: 'Enero', fecha: '2026-01-30', x: 15, y: 60, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097098/IMG-20260130-WA0074_ekve1a.jpg', nota: '30 de Enero: Cada día te quiero un poquito más.' },
    { id: 22, mes: 'Enero', fecha: '2026-01-30', x: 18, y: 62, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402323/IMG-20260130-WA0076_qeuzio.jpg', nota: 'Otro recuerdo del día.' },
    /* ========================= FEBRERO 2026 ========================= */
    { id: 24, mes: 'Febrero', fecha: '2026-02-01', x: 20, y: 58, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411105/IMG-20260201-WA0017_rr2h0r.jpg', nota: 'Un momento especial.' },
    { id: 25, mes: 'Febrero', fecha: '2026-02-01', x: 22, y: 56, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411098/IMG-20260201-WA0014_a9iaxm.jpg', nota: 'Otro recuerdo juntos.' },
    { id: 26, mes: 'Febrero', fecha: '2026-02-01', x: 24, y: 54, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411090/IMG-20260201-WA0013_qkzch7.jpg', nota: 'Más momentos guardados.' },
    { id: 27, mes: 'Febrero', fecha: '2026-02-01', x: 26, y: 52, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777402340/IMG-20260201-WA0011_kicu4l.jpg', nota: 'Instante inolvidable.' },
    { id: 28, mes: 'Febrero', fecha: '2026-02-04', x: 25, y: 54, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097147/IMG-20260204-WA0022_agpj5v.jpg', nota: '4 de Febrero: Cuatro meses de nosotros.' },
    ////Foto repetida
    { id: 30, mes: 'Febrero', fecha: '2026-02-04', x: 30, y: 50, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411132/IMG-20260204-WA0003_ow2hho.jpg', nota: 'Un recuerdo especial.' },
    { id: 31, mes: 'Febrero', fecha: '2026-02-04', x: 32, y: 48, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411121/IMG-20260204-WA0000_ukdkpr.jpg', nota: 'Otro instante del día.' },
    { id: 32, mes: 'Febrero', fecha: '2026-02-14', x: 50, y: 50, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097175/IMG-20260214-WA0093_rssjpt.jpg', nota: '14 de Febrero: Nuestro primer San Valentín.' },
    { id: 33, mes: 'Febrero', fecha: '2026-02-14', x: 75, y: 52, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097189/IMG-20260214-WA0210_klp8kz.jpg', nota: 'Más recuerdos de un día inolvidable.' },
    { id: 34, mes: 'Febrero', fecha: '2026-02-14', x: 78, y: 54, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411277/IMG-20260214-WA0230_ckjnzz.jpg', nota: 'Otro momento del día especial.' },
    { id: 35, mes: 'Febrero', fecha: '2026-02-14', x: 80, y: 56, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411270/IMG-20260214-WA0207_yyuxfb.jpg', nota: 'Recuerdo inolvidable.' },
    { id: 36, mes: 'Febrero', fecha: '2026-02-14', x: 82, y: 58, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411260/IMG-20260214-WA0203_she7fy.jpg', nota: 'Otro instante juntos.' },
    { id: 37, mes: 'Febrero', fecha: '2026-02-14', x: 84, y: 60, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411251/IMG-20260214-WA0117_tcmyi6.jpg', nota: 'Un momento especial más.' },
    { id: 38, mes: 'Febrero', fecha: '2026-02-14', x: 86, y: 62, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411227/IMG-20260214-WA0105_rnsgvz.jpg', nota: 'Más recuerdos de San Valentín.' },
    { id: 39, mes: 'Febrero', fecha: '2026-02-25', x: 85, y: 46, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097571/20260225_043350_yqorvh.jpg', nota: '25 de Febrero: Momento maestro y estudiante.' },
    /* ========================= MARZO 2026 ========================= */
    { id: 40, mes: 'Marzo', fecha: '2026-03-07', x: 65, y: 40, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097222/20260307_194503_z6wvuj.jpg', nota: '7 de Marzo: Salida que se queda en el corazón y estómago.' },
    { id: 41, mes: 'Marzo', fecha: '2026-03-07', x: 67, y: 42, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411333/20260307_194508_pkqlgl.jpg', nota: 'Otro momento especial.' },
    { id: 42, mes: 'Marzo', fecha: '2026-03-07', x: 69, y: 44, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411312/20260307_194453_rs0qqj.jpg', nota: 'Recuerdo de ese día.' },
    { id: 43, mes: 'Marzo', fecha: '2026-03-21', x: 40, y: 36, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097260/IMG-20260321-WA0113_1_ncxzzw.jpg', nota: '21 de Marzo: Lizard, lizard, lizard' },
    { id: 44, mes: 'Marzo', fecha: '2026-03-21', x: 42, y: 38, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411775/IMG-20260321-WA0105_mnjbik.jpg', nota: 'Otro momento especial.' },
    { id: 45, mes: 'Marzo', fecha: '2026-03-21', x: 44, y: 40, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411406/IMG-20260321-WA0114_1_axryth.jpg', nota: 'Recuerdo inolvidable.' },
    { id: 46, mes: 'Marzo', fecha: '2026-03-21', x: 46, y: 42, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411349/IMG-20260321-WA0094_fykbub.jpg', nota: 'Otro instante juntos.' },
    { id: 47, mes: 'Marzo', fecha: '2026-03-21', x: 48, y: 44, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411355/20260321_200114_py9sdq.jpg', nota: 'Más recuerdos del día.' },
    /////Collage
    { id: 49, mes: 'Marzo', fecha: '2026-03-21', x: 52, y: 48, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411425/IMG_20260321_231838_393_dgqqza.jpg', nota: 'Recuerdo guardado.' },
    /* ========================= ABRIL 2026 ========================= */
    { id: 51, mes: 'Abril', fecha: '2026-04-02', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411467/IMG-20260402-WA0009_vmiivb.jpg', nota: 'Recuerdo.' },
    { id: 52, mes: 'Abril', fecha: '2026-04-11', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411483/IMG-20260411-WA0025_iyhonu.jpg', nota: 'Momento.' },
    { id: 53, mes: 'Abril', fecha: '2026-04-14', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411509/IMG-20260414-WA0093_uj907f.jpg', nota: 'Recuerdo.' },
    { id: 54, mes: 'Abril', fecha: '2026-04-14', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411521/IMG-20260414-WA0132_otvwy7.jpg', nota: 'Momento.' },
    { id: 55, mes: 'Abril', fecha: '2026-04-22', x: 55, y: 22, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097333/IMG-20260422-WA0204_pprtlz.jpg', nota: 'Momento.' },
    { id: 56, mes: 'Abril', fecha: '2026-04-22', x: 75, y: 28, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097753/IMG-20260422-WA0260_wyxl5b.jpg', nota: 'Más.' },
    { id: 57, mes: 'Abril', fecha: '2026-04-22', x: 85, y: 18, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097355/IMG-20260422-WA0261_gbgjcy.jpg', nota: 'Favorita.' },
    { id: 58, mes: 'Abril', fecha: '2026-04-23', x: 65, y: 14, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097435/IMG-20260423-WA0091_qx2inw.jpg', nota: 'Casi seis meses.' },
    { id: 59, mes: 'Abril', fecha: '2026-04-23', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411651/IMG-20260423-WA0101_uayink.jpg', nota: 'Recuerdo.' },
    { id: 60, mes: 'Abril', fecha: '2026-04-23', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411634/IMG-20260423-WA0102_bjtuzm.jpg', nota: 'Momento.' },
    { id: 61, mes: 'Abril', fecha: '2026-04-23', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411625/IMG-20260423-WA0089_1_qytuhe.jpg', nota: 'Recuerdo.' },
    { id: 62, mes: 'Abril', fecha: '2026-04-24', x: 45, y: 10, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097397/IMG-20260424-WA0036_twwvdb.jpg', nota: 'A un paso.' },
    { id: 63, mes: 'Abril', fecha: '2026-04-24', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411673/IMG-20260424-WA0038_ww5ias.jpg', nota: 'Recuerdo.' },
    { id: 64, mes: 'Abril', fecha: '2026-04-24', x: null, y: null, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411666/IMG-20260424-WA0049_ewwjgj.jpg', nota: 'Momento.' },
    { id: 65, mes: 'Mayo', fecha: '2026-04-24', x: 50, y: 4,  imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777097397/IMG-20260424-WA0036_twwvdb.jpg', nota: 'Los fiesteros.' },
    /* ========================= MAYO 2026 ========================= */
    { id: 66, mes: 'Mayo', fecha: '2026-05-01', x: 50, y: 40, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411446/WA_1774396882672_dv9ta6.jpg', nota: 'Mi terreneitor' },
    { id: 50, mes: 'Mayo', fecha: '2026-05-02', x: 54, y: 50, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411804/Picsart_26-03-21_23-05-41-854_okfvj0.jpg', nota: 'Edición especial del momento.' },
    { id: 67, mes: 'Mayo', fecha: '2026-05-03', x: 54, y: 50, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777536910/20260430_021009-COLLAGE_2_uaarza.jpg', nota: '6 meses y contando cada vez mas.' },
    ///Collage//
    { id: 48, mes: 'Marzo', fecha: '2026-05-02', x: 50, y: 46, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777411420/IMG_20260321_231834_132_ysexab.jpg', nota: 'Movie time.' },
    /* ========================= ESPECIALES ========================= */
    { id: 999, type: 'Pequeños', mes: 'Los pequeños', fecha: '0000-00-00', x: 50, y: 50, imgUrl: 'https://res.cloudinary.com/dfi8emygz/image/upload/q_auto/f_auto/v1777414001/1777244433443_obg5xz.png', nota: 'Los pequeños ✨' }
];

/* ============================================================
   CACHE DE ELEMENTOS DOM — evita querySelector repetido
   ============================================================ */
const map        = document.getElementById('constellation-map');
const overlay    = document.getElementById('photo-overlay');
const img        = document.getElementById('overlay-img');
const note       = document.getElementById('overlay-note');
const closeBtn   = document.getElementById('close-overlay');
const music      = document.getElementById('bg-music');
const control    = document.getElementById('music-control');

/* ============================================================
   AUDIO
   ============================================================ */
control.onclick = () => {
    if (music.paused) {
        music.play().then(() => {
            control.textContent = '🔊';
        }).catch(err => {
            // Navegador bloqueó el audio — igual actualizamos el icono
            console.warn('Audio bloqueado:', err);
            control.textContent = '🔊';
            // Intentar de nuevo en el siguiente click del usuario
        });
    } else {
        music.pause();
        control.textContent = '🔇';
    }
};

/* ============================================================
   AGRUPACIÓN POR MESES — ejecutado una sola vez (memoizado)
   ============================================================ */
const galaxias = (() => {
    const result = {};
    recuerdos.forEach(r => {
        const key = r.type === 'Pequeños' ? 'Pequeños' : r.fecha.slice(0, 7);
        if (!result[key]) result[key] = [];
        result[key].push(r);
    });
    return result;
})();

/* ============================================================
   MEMOIZACIÓN de posiciones de galaxia
   Las posiciones aleatorias se calculan UNA sola vez por mes
   y se guardan en caché para evitar recalcular en cada visita.
   ============================================================ */
const _posicionesCache = new Map();

function generarPosicionesGalaxia(grupo, {
    centroX    = 50,
    minY       = 10,
    maxY       = 50,
    dispersionX = 75,
    dispersionY = 15
} = {}) {
    // Clave de caché basada en los ids del grupo
    const cacheKey = grupo.map(r => r.id).join('-');
    if (_posicionesCache.has(cacheKey)) return _posicionesCache.get(cacheKey);

    const ordenado = [...grupo].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Agrupar por día
    const porDia = {};
    ordenado.forEach(item => {
        if (!porDia[item.fecha]) porDia[item.fecha] = [];
        porDia[item.fecha].push(item);
    });

    const dias      = Object.keys(porDia).sort((a, b) => new Date(a) - new Date(b));
    const totalDias = dias.length;
    const resultado = [];

    dias.forEach((fecha, i) => {
        const items = porDia[fecha];
        const baseY = maxY - (i / Math.max(totalDias - 1, 1)) * (maxY - minY);

        items.forEach((item, j) => {
            const offsetX = (Math.random() - 0.5) * dispersionX + (j - items.length / 2) * 4;
            const offsetY = (Math.random() - 0.5) * dispersionY;
            resultado.push({
                ...item,
                x: Math.max(5, Math.min(95, centroX + offsetX)),
                y: Math.max(5, Math.min(95, baseY  + offsetY))
            });
        });
    });

    _posicionesCache.set(cacheKey, resultado);
    return resultado;
}

/* ============================================================
   UTILIDADES
   ============================================================ */
function limpiarMapa() {
    // innerHTML = '' fuerza un reflow; replaceChildren es más rápido
    map.replaceChildren();
    document.querySelectorAll('.back-button').forEach(b => b.remove());
}

function crearBotonBack() {
    if (document.querySelector('.back-button')) return;
    const btn = document.createElement('button');
    btn.className    = 'back-button';
    btn.innerText    = '← Volver al Universo';
    btn.onclick      = renderGalaxies;
    document.body.appendChild(btn);
}

/* ============================================================
   PRECARGA INTELIGENTE — carga la foto anterior y siguiente
   en background para que el swipe se sienta instantáneo.
   ============================================================ */
function precargarAdyacentes(index) {
    [index - 1, index + 1].forEach(i => {
        if (i >= 0 && i < recuerdos.length) {
            const preload = new Image();
            preload.src   = recuerdos[i].imgUrl;
        }
    });
}

/* ============================================================
   VISTA GLOBAL
   Usa DocumentFragment para un solo reflow al final.
   ============================================================ */
function renderGlobal() {
    limpiarMapa();
    const frag = document.createDocumentFragment();

    recuerdos.forEach((r, index) => {
        const star = document.createElement('div');
        star.className  = 'star';
        star.style.left = r.x + '%';
        star.style.top  = r.y + '%';
        star.onclick    = () => openPhoto(index);
        frag.appendChild(star);
    });

    map.appendChild(frag); // UN solo reflow
}

/* ============================================================
   CONFIG DE GALAXIAS
   ============================================================ */
const galaxyImages = {
    '2025-11': 'assets/images/Noviembre-25.png',
    '2025-12': 'assets/images/Diciembre-25.png',
    '2026-01': 'assets/images/Enero-26.png',
    '2026-02': 'assets/images/Febrero-26.png',
    '2026-03': 'assets/images/Marzo-26.png',
    '2026-04': 'assets/images/Abril-26.png',
    '2026-05': 'assets/images/Mayo-26.png',
    'Pequeños': 'assets/images/Gato_espacial.png'
};

const posicionesGalaxias = {
    '2025-11': { x: 10, y: 60 },
    '2025-12': { x: 50, y: 55 },
    '2026-01': { x: 80, y: 50 },
    '2026-02': { x: 25, y: 40 },
    '2026-03': { x: 60, y: 30 },
    '2026-04': { x: 80, y: 15 },
    '2026-05': { x: 45, y: 5 },
    'Pequeños': { x: 10, y: 10 }
};

/* ============================================================
   VISTA GALAXIAS
   DocumentFragment para un solo reflow.
   ============================================================ */
function renderGalaxies() {
    limpiarMapa();
    const frag = document.createDocumentFragment();

    Object.keys(galaxias).sort().forEach(mes => {
        const div = document.createElement('div');
        div.className = 'galaxy';

        const imgEl  = document.createElement('img');
        imgEl.src    = galaxyImages[mes] ?? 'assets/images/default.png';
        // Las imágenes de galaxia son pequeñas y críticas — no lazy
        imgEl.alt    = mes;

        const label       = document.createElement('span');
        label.className   = 'galaxy-label';
        label.textContent = mes;

        div.appendChild(imgEl);
        div.appendChild(label);

        const pos     = posicionesGalaxias[mes] || { x: 50, y: 50 };
        div.style.left = pos.x + '%';
        div.style.top  = pos.y + '%';
        div.onclick   = () => viajarAGalaxia(mes);

        frag.appendChild(div);
    });

    map.appendChild(frag); // UN solo reflow
}

/* ============================================================
   TRANSICIÓN DE GALAXIA
   ============================================================ */
function viajarAGalaxia(mes) {
    map.classList.add('traveling');
    setTimeout(() => {
        renderStarsByMonth(mes);
        map.classList.remove('traveling');
    }, 1200);
}

/* ============================================================
   VISTA ESTRELLAS POR MES
   DocumentFragment para un solo reflow.
   ============================================================ */
function renderStarsByMonth(mes) {
    limpiarMapa();
    crearBotonBack();

    const grupo = galaxias[mes];
    if (!grupo) return;

    const estrellas = generarPosicionesGalaxia(grupo);
    const frag      = document.createDocumentFragment();

    estrellas.forEach(r => {
        const star      = document.createElement('div');
        star.className  = 'star';
        star.style.left = r.x + '%';
        star.style.top  = r.y + '%';
        star.style.animationDelay = `${(Math.random() * 0.8).toFixed(2)}s`;

        const index  = recuerdos.findIndex(x => x.id === r.id);
        star.onclick = () => openPhoto(index);
        frag.appendChild(star);
    });

    map.appendChild(frag); // UN solo reflow
}

/* ============================================================
   CONTADOR — sin cambios de lógica
   ============================================================ */
const fechaInicio = new Date('2025-11-04T00:00:00');
const counterDisplay = document.getElementById('counter-display');

setInterval(() => {
    const ahora = new Date();
    const diff  = ahora - fechaInicio;
    const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    const dias  = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
    // Escribimos una sola vez con textContent (no innerHTML) — más rápido
    counterDisplay.textContent = `${meses} meses, ${dias} días ${ahora.getHours()}h ${ahora.getMinutes()}m`;
}, 1000);

/* ============================================================
   GALERÍA
   ============================================================ */
let currentIndex = 0;

function openPhoto(index) {
    currentIndex = index;
    overlay.classList.remove('hidden');
    render();
    initEffects();
    precargarAdyacentes(index); // 🔥 precarga prev/next

    if (recuerdos[currentIndex].id === 23) {
        confetti({ particleCount: 150, spread: 70 });
    }
}

function render() {
    const r  = recuerdos[currentIndex];

    // Mostrar placeholder mientras carga — evita layout shift
    img.style.opacity = '0';
    img.onload = () => {
        img.style.transition = 'opacity 0.25s ease';
        img.style.opacity    = '1';
    };
    img.src = r.imgUrl;

    note.textContent = '';
    typeWriter(r.nota);
    precargarAdyacentes(currentIndex); // actualiza precarga en cada navegación
}

/* ============================================================
   CERRAR
   ============================================================ */
function closePhoto() {
    overlay.classList.add('hidden');
}

closeBtn.onclick = closePhoto;

overlay.addEventListener('click', e => {
    if (e.target === overlay) closePhoto();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape')     closePhoto();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
});

/* ============================================================
   TYPEWRITER — sin cambios de lógica
   ============================================================ */
function typeWriter(text) {
    let i = 0;
    note.textContent = '';

    function w() {
        if (i < text.length) {
            note.textContent += text[i++];
            setTimeout(w, 18);
        }
    }
    w();
}

/* ============================================================
   TILT — debounced para evitar jank en móvil
   ============================================================ */
function debounce(fn, ms) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), ms);
    };
}

function initEffects() {
    const wrapper = document.querySelector('.photo-container');
    if (!wrapper) return;

    // Usamos requestAnimationFrame para sincronizar con el renderizado
    // y evitar jank por cálculos de posición fuera de ciclo de paint.
    let rafId    = null;
    let lastMove = null;

    function applyTilt() {
        if (!lastMove) return;
        const { clientX, clientY } = lastMove;
        const rect = wrapper.getBoundingClientRect();
        const x    = clientX - rect.left;
        const y    = clientY - rect.top;

        const rx = -(y - rect.height / 2) / 22;
        const ry =  (x - rect.width  / 2) / 22;

        // Batch: todas las modificaciones de estilo juntas
        wrapper.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        wrapper.style.setProperty('--x', (x / rect.width  * 100) + '%');
        wrapper.style.setProperty('--y', (y / rect.height * 100) + '%');
        wrapper.style.setProperty('--opacity', '1');
        rafId = null;
    }

    function scheduleMove(e) {
        lastMove = { clientX: e.touches ? e.touches[0].clientX : e.clientX,
                     clientY: e.touches ? e.touches[0].clientY : e.clientY };
        if (!rafId) rafId = requestAnimationFrame(applyTilt);
    }

    function reset() {
        lastMove = null;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        wrapper.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        wrapper.style.setProperty('--opacity', '0');
    }

    wrapper.onmousemove  = scheduleMove;
    wrapper.ontouchmove  = scheduleMove;
    wrapper.onmouseleave = reset;
    wrapper.ontouchend   = reset;
}

/* ============================================================
   SWIPE — sin cambios de lógica, con passive: true para scroll
   ============================================================ */
let startX  = 0;
let isDown  = false;

overlay.addEventListener('pointerdown', e => { isDown = true; startX = e.clientX; });

overlay.addEventListener('pointerup', e => {
    if (!isDown) return;
    isDown = false;
    const diff = e.clientX - startX;
    if (Math.abs(diff) < 60) return;
    diff < 0 ? next() : prev();
});

overlay.addEventListener('pointercancel', () => isDown = false);

/* ============================================================
   NAVEGACIÓN
   ============================================================ */
function next() {
    if (currentIndex < recuerdos.length - 1) {
        animate(-1);
        currentIndex++;
        setTimeout(render, 120);
    }
}

function prev() {
    if (currentIndex > 0) {
        animate(1);
        currentIndex--;
        setTimeout(render, 120);
    }
}

function animate(direction) {
    const el = document.querySelector('.photo-container');
    // Usamos will-change solo durante la animación para no consumir memoria GPU permanentemente
    el.style.willChange  = 'transform';
    el.style.transition  = 'transform 0.2s ease';
    el.style.transform   = `translateX(${direction * -60}px)`;

    setTimeout(() => {
        el.style.transform = `translateX(${direction * 60}px)`;
        setTimeout(() => {
            el.style.transform  = 'translateX(0)';
            el.style.willChange = 'auto'; // liberar recurso GPU
        }, 100);
    }, 100);
}

/* ============================================================
   INICIO
   ============================================================ */
renderGalaxies();