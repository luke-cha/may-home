import { useEffect, useMemo, useRef, useState } from 'react'
import manifest from './data/content-manifest.json'
import mayfleurLogo from './assets/mayfleur-logo.png'
import { productEditorial } from './data/product-editorial.js'
import { ORDER_NUMBER_STRUCTURE } from './data/order-tracking.js'

const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_tnxmxixb'

const NAV = [
  ['home', 'Home'], ['shop', 'Shop'], ['about', 'About'], ['gallery', 'Gallery'],
  ['portfolio', 'Portfolio'], ['services', 'Services'], ['books', 'Books'], ['contact', 'Contact'],
]

const KO = {
  home: '홈', shop: '샵', about: '소개', gallery: '갤러리', portfolio: '포트폴리오',
  services: '서비스', books: '도서', contact: '문의',
}

const categoryNames = {
  Bouquets: ['Bouquets', '부케'],
  Centerpieces: ['Centerpieces', '센터피스'],
  'Flower Basket Arrangements': ['Basket Arrangements', '꽃바구니'],
  'Vase Arrangements': ['Vase Arrangements', '화병 어레인지먼트'],
  Wreaths: ['Wreaths', '리스'],
  'Floral Objects': ['Floral Objects', '플로럴 오브제'],
  'Wedding Arch': ['Wedding Arch', '웨딩 아치'],
}

const orderGuide = {
  ko: {
    intro: ['모든 작품은 주문 후 제작되는 핸드메이드 플라워 오브제입니다.', '주문 전 상품 상세 페이지의 Order Guide를 확인해 주세요.'],
    sections: [
      ['01 | Design & Production', [
        '모든 작품은 주문 후 제작되는 핸드메이드 플라워 오브제입니다.',
        '제작 기간은 평균 7–15일이며, 주문 상황에 따라 달라질 수 있습니다.',
        '주문 전 상담을 통해 원하시는 색감과 무드를 반영하여 제작합니다.',
        '상품 이미지는 샘플 작품이며, 조화 및 화기는 수급 상황에 따라 유사한 소재로 대체될 수 있습니다. 전체적인 색감과 분위기를 유지하여 제작됩니다.',
        '기존 디자인의 구조를 유지하는 범위 내에서 일부 꽃 소재 및 색상 변경이 가능합니다.',
        '완성 후 출고 전 최종 확인 이미지를 전달드립니다.',
      ]],
      ['02 | Delivery', [
        '전국 택배 발송이 가능한 상품은 기본 택배 배송을 무료로 제공합니다.',
        '택배 가능 상품도 요청 시 카카오 T 퀵 차량 배송이 가능하며, 퀵 배송비는 지역에 따라 별도로 책정됩니다.',
        '세라믹 화기, 토분 등 파손 위험이 높은 일부 작품은 서울·경기 지역에 한하여 카카오 T 퀵 차량 배송으로 진행됩니다.',
        '퀵 배송비는 지역에 따라 상이하며,\n20만 원 이상 주문 시 최대 15,000원,\n30만 원 이상 주문 시 최대 20,000원까지 지원해 드립니다.',
      ]],
      ['03 | Order & Cancellation Policy', [
        '모든 작품은 고객님의 주문에 맞춰 제작되는 주문 제작 상품입니다.',
        '주문 확정 후 고객님만을 위한 소재 준비 및 제작이 시작되므로, 제작 시작 이후에는 단순 변심에 의한 주문 취소·교환·환불이 어렵습니다.',
        '제품 이상이 있는 경우에는 수령 후 3일 이내 문의해 주시면 확인 후 안내드립니다.',
      ]],
      ['04 | Product Guide', [
        '모든 작품은 플로리스트가 직접 제작하는 핸드메이드 오브제로, 형태와 배치는 작품마다 조금씩 다를 수 있습니다.',
        '조화 특성상 미세한 프린팅 차이, 점, 접착 흔적 등이 있을 수 있으며 이는 불량이 아닙니다.',
        '배송 과정에서 일부 소재가 분리될 수 있으나, 대부분은 간단히 다시 꽂거나 고정하여 사용하실 수 있습니다.',
        '모니터 환경에 따라 실제 색상은 다소 차이가 있을 수 있습니다.',
      ]],
    ],
  },
  en: {
    intro: ['Every piece is a handmade floral object created after your order is placed.', 'Please review the Order Guide on the product detail page before ordering.'],
    sections: [
      ['01 | Design & Production', [
        'Every piece is a handmade floral object created after your order is placed.',
        'Production typically takes approximately 7–15 days and may vary depending on current order volume.',
        'Your preferred colour palette and mood can be discussed before production.',
        'Product images show sample pieces. Artificial flowers and vessels may be replaced with similar materials depending on availability while preserving the overall palette and mood.',
        'Selected flower materials and colours may be adjusted while maintaining the structure of the original design.',
        'A final confirmation image will be sent before dispatch.',
      ]],
      ['02 | Delivery', [
        'Products eligible for nationwide parcel shipping include free standard parcel delivery.',
        'Kakao T Quick vehicle delivery is also available on request, with regional fees charged separately.',
        'Selected pieces with a higher risk of damage, including ceramic vessels and terracotta pots, are delivered within Seoul and Gyeonggi via Kakao T Quick vehicle delivery.',
        'Quick-delivery fees vary by location.\nOrders over KRW 200,000 receive support of up to KRW 15,000, and orders over KRW 300,000 receive support of up to KRW 20,000.',
      ]],
      ['03 | Order & Cancellation Policy', [
        'Every piece is made to order for each customer.',
        'Materials are prepared and production begins after confirmation, so cancellations, exchanges and refunds for a change of mind are not available once production has started.',
        'If there is an issue with your product, please contact us within three days of receipt.',
      ]],
      ['04 | Product Guide', [
        'Each piece is handmade by a florist, so form and placement may vary slightly.',
        'Minor printing differences, marks or traces of adhesive can occur with artificial flowers and are not considered defects.',
        'Some materials may become detached during delivery, but most can be reinserted or secured easily.',
        'Actual colours may vary slightly depending on your monitor settings.',
      ]],
    ],
  },
}

const serviceCopy = {
  'Floral Styling': {
    en: 'We create floral environments that enhance the atmosphere and purpose of each space — from retail displays and events to weddings and photoshoots.',
    ko: '꽃과 자연의 요소를 활용해 공간의 분위기와 목적에 맞는 플로럴 스타일링을 제공합니다.',
    listTitle: 'Areas',
    list: ['Retail & Showroom Styling', 'Brand Space Styling', 'Wedding Photoshoot Styling'],
  },
  'Brand Collaboration': {
    en: 'We collaborate with brands to create floral concepts and visual experiences that reflect their identity and values.',
    ko: '브랜드의 아이덴티티와 공간, 제품을 기반으로 플로럴 경험과 비주얼을 설계합니다.',
    listTitle: 'Services',
    list: ['Campaign & Lookbook Styling', 'Pop-up Floral Direction', 'Product Launch Styling', 'Brand Floral Concepts'],
  },
  'Corporate Workshops': {
    en: 'Floral experience programmes for companies and brands, planned around the group, place and purpose.',
    ko: '기업과 브랜드를 위한 플로럴 경험 프로그램으로 장소, 인원, 목적에 맞춰 기획합니다.',
    listTitle: 'Format',
    list: ['Private Group Sessions', 'Floral Making Experience', 'Customised Programmes', 'Pricing on Request'],
  },
  'Global Workshops': {
    en: 'International workshops exploring seasonal expression, natural composition and Mayfleur’s floral philosophy.',
    ko: '계절의 표현과 자연스러운 구성, 메이플레르의 철학을 나누는 국제 플로럴 워크숍입니다.',
    list: ['Host Invitations', 'Guest Instructor', 'Seasonal Expression', 'Spatial Composition'],
  },
}

const projectCopy = {
  'Gimpo Airport': { ko: '김포공항 국제선 터미널에서 한국의 전통과 자연의 색을 담아낸 3주간의 플로럴 설치 프로젝트입니다.', en: 'A three-week floral installation for Gimpo Airport International Terminal, inspired by Korean heritage and natural colour.' },
  'Greystone Mansion Wedding (Los Angeles)': { ko: '로스앤젤레스의 역사적인 Greystone Mansion에서 Fleurina Flowers와 함께 완성한 웨딩 플로럴 디자인입니다.', en: 'Wedding floral design at the historic Greystone Mansion in Los Angeles, created with Fleurina Flowers.' },
  'US Wedding Photoshoot (Los Angeles)': { ko: 'Fleurina Flowers와 협업해 진행한 미국 웨딩 에디토리얼 플로럴 디렉션입니다.', en: 'Floral direction for a US wedding editorial, produced in collaboration with Fleurina Flowers.' },
  'Laura Studio Floral Directing': { ko: '스튜디오의 시각적 정체성을 계절의 꽃과 자연스러운 구성으로 풀어낸 플로럴 디렉팅입니다.', en: 'Seasonal floral direction shaping the visual identity of Laura Studio.' },
  'studio madive': { ko: '화사한 색감의 꽃으로 공간에 생동감을 더한 Studio Madive 플로럴 세팅 프로젝트입니다.', en: 'A vibrant floral setting for Studio Madive, bringing the space to life with bright, expressive colour.' },
  'revemoire studio': { ko: '동화 같은 색감을 테마로, 웨딩 촬영을 위한 꽃과 공간을 함께 구성한 레브무아르 스튜디오 플라워 디렉팅 프로젝트입니다.', en: 'Floral direction for a wedding photoshoot at Revemoire Studio, composing flowers and space around a storybook-inspired colour palette.' },
  Zigzag: { ko: '지그재그 파트너 크리에이터를 위한 웰컴 플라워 기프트 프로젝트입니다.', en: 'A floral welcome-gift project created for Zigzag’s partner creators.' },
  KAKAO: { ko: '계절의 소재와 직접 만드는 경험을 중심으로 구성한 카카오 기업 워크숍입니다.', en: 'A Kakao corporate workshop centred on seasonal materials and hands-on making.' },
  NAVER: { ko: '조직의 공간과 참여자를 고려해 설계한 네이버 기업 플로럴 워크숍입니다.', en: 'A NAVER corporate floral workshop designed around its people and place.' },
  hwigyumjae: { ko: '브랜드 웨딩 장소로 사랑받는 한국 전통 한옥 휘겸재를 위해, 자연 소재와 계절 꽃으로 완성한 친환경 센터피스 프로젝트입니다.', en: 'Eco-conscious centrepieces made with natural materials and seasonal flowers for Hwigyumjae, a traditional Korean hanok celebrated as a brand wedding venue.' },
  'Los Angeles Workshop': { ko: '계절의 표현과 자연스러운 플로럴 구성을 나눈 로스앤젤레스 워크숍입니다.', en: 'A Los Angeles workshop exploring seasonal expression and natural composition.' },
  'Taiwan Workshop': { ko: '가을의 계절을 꽃으로 표현한 대만 플라워 워크숍입니다.', en: 'A Taiwan workshop sharing Mayfleur’s approach to colour and the seasons.' },
  'Private International Classes': { ko: '세계 각지의 수강생들과 함께한 1:1 및 소규모 국제 플라워 클래스입니다.', en: 'One-to-one and small-group floral classes for students from around the world.' },
}

const mediaUrl = (file) => `${import.meta.env.BASE_URL}${file.split('/').map(encodeURIComponent).join('/')}`
const label = (value) => value.normalize('NFC')
const slug = (value) => label(value).toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-|-$/g, '')
const under = (prefix) => manifest.files.filter((file) => file.normalize('NFC').startsWith(prefix.normalize('NFC')))
const imagesOnly = (files) => files.filter((file) => !/\.(mp4|mov)$/i.test(file))
const directFolders = (prefix, depth) => [...new Set(under(prefix).map((file) => file.split('/')[depth]).filter(Boolean))]
const cleanFolderName = (value) => label(value).replace(/^(?:\d+(?:\.\d+)?|new)\s+/i, '').trim()
const numericMediaSort = (files) => [...files].sort((a, b) => {
  const parts = (file) => file.split('/').pop().replace(/\.[^.]+$/, '').split('.').map(Number)
  const aa = parts(a); const bb = parts(b)
  if (aa.every(Number.isFinite) && bb.every(Number.isFinite)) {
    for (let i = 0; i < Math.max(aa.length, bb.length); i += 1) {
      if (aa[i] === undefined) return -1
      if (bb[i] === undefined) return 1
      if (aa[i] !== bb[i]) return aa[i] - bb[i]
    }
    return 0
  }
  return a.localeCompare(b, undefined, { numeric: true })
})

const hero = imagesOnly(under('01 Home/01 Hero/'))
const selectedWorks = numericMediaSort(under('01 Home/02 Selected Works/'))
const storyPhotos = imagesOnly(under('03 About/Our Story/'))
const profilePhoto = imagesOnly(under('03 About/Profile/'))[0]
const freshFlowerMedia = numericMediaSort(under('02 Shop/생화 샘플/').filter((file) => !file.normalize('NFC').includes('/시즌 상품/')))
const galleryGroups = {
  works: numericMediaSort(under('04 Gallery/Floral Works/')),
  spaces: numericMediaSort(under('04 Gallery/Space Styling/')),
  artificial: numericMediaSort(under('04 Gallery/Artificial Flower/')),
}
const bookFiles = imagesOnly(under('07 Books/'))

const hiddenShopProducts = new Set(['빈티지 대형 화병'])
const shopCategories = directFolders('02 Shop/', 1)
  .filter((name) => categoryNames[cleanFolderName(name)])
  .map((name) => ({
    raw: name,
    name: cleanFolderName(name),
    products: directFolders(`02 Shop/${name}/`, 2).map((product) => ({
      raw: product, name: cleanFolderName(product), category: cleanFolderName(name),
      media: numericMediaSort(under(`02 Shop/${name}/${product}/`)),
    })).filter((product) => product.media.length && !hiddenShopProducts.has(product.name)),
  }))

const shopProducts = shopCategories.flatMap((category) => category.products)
const portfolioProjects = directFolders('05 Portfolio/', 1)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((name) => ({
    raw: name, name: cleanFolderName(name), media: numericMediaSort(under(`05 Portfolio/${name}/`)),
  }))
const serviceOrder = ['Floral Styling', 'Brand Collaboration', 'Corporate Workshops', 'Global Workshops']
const serviceContactRoutes = {
  'Floral Styling': '#contact/brand-collaboration',
  'Brand Collaboration': '#contact/brand-collaboration',
  'Corporate Workshops': '#contact/workshop',
  'Global Workshops': '#contact/global-workshop',
}
const services = directFolders('06 Services/', 1).map((name) => ({
  raw: name, name: label(name), media: numericMediaSort(under(`06 Services/${name}/`)),
})).sort((a, b) => serviceOrder.indexOf(a.name) - serviceOrder.indexOf(b.name))

function useRoute() {
  const read = () => (location.hash || '#home').replace(/^#\/?/, '').split('/').filter(Boolean).map((part) => { try { return decodeURIComponent(part) } catch { return part } })
  const [parts, setParts] = useState(read)
  useEffect(() => {
    const update = () => { setParts(read()); window.scrollTo({ top: 0, behavior: 'instant' }) }
    addEventListener('hashchange', update)
    return () => removeEventListener('hashchange', update)
  }, [])
  return parts
}

function Media({ file, alt = '', eager = false, className = '' }) {
  if (!file) return <div className={`media-placeholder ${className}`} />
  const video = /\.(mp4|mov)$/i.test(file)
  if (video) return <video className={className} src={mediaUrl(file)} autoPlay muted loop playsInline preload="auto" aria-label={alt} />
  return <img className={className} src={mediaUrl(file)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}

function MediaLightbox({ selected, onClose, total, label, lang }) {
  const ko = lang === 'ko'
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') onClose() }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close) }
  }, [onClose])
  return <div className="project-lightbox gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${label} ${selected.index}`} onClick={onClose}><div className="project-lightbox-content" onClick={(event) => event.stopPropagation()}><button type="button" className="project-lightbox-close" onClick={onClose} aria-label={ko ? '닫기' : 'Close'}>×</button><Media file={selected.file} alt={`${label} ${selected.index}`} eager /><small>{label} · {selected.index} / {total}</small></div></div>
}

function Header({ page, lang, setLang }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [page])
  return <>
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="#home">MAYFLEUR</a>
      <div className="mobile-header-language" aria-label="Language selection"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><span>·</span><button className={lang === 'ko' ? 'active' : ''} onClick={() => setLang('ko')}>KO</button></div>
      <nav className="desktop-nav" aria-label="Main navigation">
        {NAV.map(([id, text]) => <a key={id} className={page === id ? 'active' : ''} href={`#${id}`}>{text}</a>)}
      </nav>
      <div className="language"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><i>·</i>
        <button className={lang === 'ko' ? 'active' : ''} onClick={() => setLang('ko')}>KO</button></div>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><span /><span /><span /></button>
    </div></header>
    {open && <div className="mobile-menu">
      <div className="mobile-top"><span className="wordmark">MAYFLEUR</span><button onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>
      <nav>{NAV.map(([id, text]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{text}</a>)}</nav>
      <div className="mobile-language"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button><span>·</span><button className={lang === 'ko' ? 'active' : ''} onClick={() => setLang('ko')}>한국어</button></div>
    </div>}
  </>
}

function Footer({ lang }) {
  return <footer>
    <div className="footer-main">
      <div><div className="wordmark">MAYFLEUR</div><p className="footer-tag">Nature-Inspired Floral Creations</p><small>Based in Korea</small></div>
      <div><span className="eyebrow">{lang === 'ko' ? '둘러보기' : 'Explore'}</span><nav>{NAV.map(([id, text]) => <a key={id} href={`#${id}`}>{text}</a>)}</nav></div>
      <div><span className="eyebrow">{lang === 'ko' ? '연결' : 'Connect'}</span><nav><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">{lang === 'ko' ? '카카오채널' : 'Kakao Channel'}</a><a href="https://www.instagram.com/may.fleur" target="_blank" rel="noreferrer">{lang === 'ko' ? '인스타그램' : 'Instagram'}</a><a href="mailto:mayfleurstudio@gmail.com">{lang === 'ko' ? '이메일' : 'Email'}</a></nav></div>
    </div>
    <div className="footer-legal"><nav className="footer-policy-links"><a href="#terms">{lang === 'ko' ? '이용약관' : 'Terms of Use'}</a><span>·</span><a href="#privacy">{lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}</a><span>·</span><a href="#shipping-policy">{lang === 'ko' ? '배송·취소·환불 안내' : 'Delivery, Cancellation & Refunds'}</a></nav><div className="footer-business"><p>{lang === 'ko' ? '대표자: 김예진 · 사업자등록번호: 724-31-00186' : 'Representative: Yeajin Kim · Business Registration No. 724-31-00186'}</p><p>{lang === 'ko' ? '주소: 서울특별시 강남구 논현로10길 30, 505-S341호 (개포동)' : 'Address: 505-S341, 30 Nonhyeon-ro 10-gil, Gangnam-gu, Seoul, Korea'}</p><p>{lang === 'ko' ? '이메일:' : 'Email:'} <a href="mailto:mayfleurstudio@gmail.com">mayfleurstudio@gmail.com</a></p></div></div>
    <div className="copyright"><span>© 2026 MAYFLEUR. All rights reserved.</span><span>Seoul · Korea</span></div>
  </footer>
}

function PageHead({ eyebrow, title, sub, note }) {
  return <section className="page-head">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{sub && <p>{sub}</p>}{note && <p className="page-note">{note}</p>}</section>
}

function SectionTitle({ eyebrow, title, link, href }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{link && <a className="text-link" href={href}>{link} <span>→</span></a>}</div>
}

function HomePreview({ title, href, link, files, type = 'square' }) {
  return <section className="home-preview container"><div className="preview-head"><h2>{title}</h2><a href={href}>{link} →</a></div><div className={`preview-grid ${type}`}>{files.map((file, i) => <a href={href} key={file}><Media file={file} alt={`${title} ${i + 1}`} /></a>)}</div></section>
}

function Home({ lang }) {
  const ko = lang === 'ko'
  return <div className="page fade-in home-page">
    <section className="home-hero container">
      <span className="home-kicker">Floral Atelier · Est. Korea</span>
      <h1>Mayfleur</h1>
      <p>Nature-Inspired Floral Creations</p>
      <div className="home-portrait"><Media file={hero[2] || hero[0]} alt="Mayfleur floral arrangement" eager /></div>
    </section>
    <section className="home-works container"><div className="simple-photo-grid">{selectedWorks.slice(0, 10).map((file, i) => <Media key={file} file={file} alt={`Selected work ${i + 1}`} />)}</div></section>
    <section className="paper-panel home-introduction"><div className="home-brand-logo"><img src={mayfleurLogo} alt="Mayfleur" /></div><div className="home-introduction-copy"><span className="eyebrow">{ko ? '소개' : 'Introduction'}</span><p>{ko ? '메이플레르는 자연과 색, 계절의 아름다움에서 영감을 받은 플로럴 브랜드입니다. 일상의 공간에 따뜻함과 아름다움을 더하는, 시간을 초월한 플로럴 디자인을 만듭니다.' : 'Mayfleur is a floral brand inspired by nature, colour and seasonal beauty. We create timeless floral designs that bring warmth and beauty to everyday spaces.'}</p></div></section>
    <HomePreview title="Shop" href="#shop" link={ko ? '컬렉션 보기' : 'Shop Collection'} files={shopProducts.slice(0, 4).map((p) => imagesOnly(p.media)[0])} />
    <HomePreview title="Gallery" href="#gallery" link={ko ? '갤러리 보기' : 'View Gallery'} files={imagesOnly(galleryGroups.works).slice(0, 4)} />
    <HomePreview title="Portfolio" href="#portfolio" link={ko ? '포트폴리오 보기' : 'View Portfolio'} files={portfolioProjects.slice(0, 4).map((p) => imagesOnly(p.media)[0])} type="landscape" />
    <section className="home-contact container"><div><h2>{ko ? '문의하기' : 'Get in touch'}</h2><p>{ko ? '인스타그램 / 이메일 — 언제든 연락 주세요.' : 'Instagram / Email — we would love to hear from you.'}</p></div><div className="button-row"><a className="button primary" href="#contact">Contact</a><a className="button ghost" href="#about">{ko ? '우리의 이야기' : 'Our Story'}</a></div></section>
  </div>
}

function ProductCard({ product, lang }) {
  const ko = lang === 'ko'; const editorial = productEditorial[product.name]
  return <a href={`#shop/${slug(product.name)}`} className={`product-card${editorial ? ' editorial-product-card' : ''}`}><div className="card-media"><Media file={imagesOnly(product.media)[0]} alt={editorial?.title[lang] || product.name} /></div><span className="card-kicker">{categoryNames[product.category]?.[ko ? 1 : 0]}</span>{editorial ? <><h3>{editorial.title.en}</h3><span className="product-card-local-name">{editorial.title.ko}</span><strong className="product-card-price">{editorial.price}</strong><div className="product-card-lines">{editorial.cardLines[lang].map((line) => <span key={line}>{line}</span>)}</div><span className="product-view-more">{ko ? '상품 보기' : 'View More'} →</span></> : <><h3>{product.name}</h3><p>{ko ? '주문 제작 · 상담 후 안내' : 'Made to order · Price on request'}</p></>}</a>
}

const orderProcess = {
  ko: [
    ['주문 문의', '원하시는 상품과 희망 예산, 색감 및 분위기, 희망 수령일, 배송지 등을 남겨주세요.'],
    ['주문 확인', '문의 내용을 확인한 후 상품 구성과 제작 가능 여부를 안내드립니다.'],
    ['최종 금액 안내', '상품 금액과 배송비 및 배송비 지원 여부를 확인하여 최종 금액과 입금 방법을 안내드립니다.'],
    ['결제', '최종 구성과 금액 확인 후 안내드린 계좌로 결제가 진행됩니다.'],
    ['제작', '입금이 확인되면 상품 제작이 시작됩니다.'],
    ['배송', '제작 완료 후 상품의 종류와 크기에 따라 택배 또는 카카오 T 퀵으로 안전하게 배송됩니다.'],
  ],
  en: [
    ['Order Inquiry', 'Tell us your preferred product, budget, palette and mood, delivery date and address.'],
    ['Order Review', 'We review your inquiry and confirm the proposed composition and production availability.'],
    ['Final Quote', 'We confirm the product price, delivery fee and applicable delivery support, then provide the final amount and bank transfer details.'],
    ['Payment', 'Payment is made to the provided bank account after the final composition and amount are confirmed.'],
    ['Production', 'Production begins once the transfer has been confirmed.'],
    ['Delivery', 'Your finished product is delivered safely by parcel or Kakao T Quick according to its type and size.'],
  ],
}
function OrderProcess({ lang, fresh = false }) {
  const ko = lang === 'ko'; const steps = orderProcess[lang].map((step, index) => fresh && index === 5 ? [step[0], ko ? '제작 완료 후 카카오 T 퀵으로 안전하게 배송됩니다.' : 'Once production is complete, your order is delivered safely by Kakao T Quick.'] : step)
  const notes = ko ? [
    '모든 주문은 상담 후 상품 구성과 최종 금액이 확정됩니다.',
    '현재 결제는 계좌이체로만 진행됩니다.',
    '현금영수증 발급을 원하시는 경우, 입금 시 발급 요청번호(휴대폰번호 또는 사업자등록번호)를 알려주세요.',
    '배송비는 배송 지역 및 상품에 따라 달라질 수 있으며, 주문 금액에 따라 배송비 지원이 적용됩니다.',
    '현재 방문 수령은 운영하지 않습니다.',
    '생화는 카카오 T 퀵 차량 배송만 가능합니다.',
  ] : [
    'All orders receive their final composition and price after consultation.',
    'Payment is currently available by bank transfer only.',
    'For a cash receipt, please provide the issuance number (mobile number or business registration number) when making your transfer.',
    'Delivery fees vary by area and product, and delivery support may apply according to the order total.',
    'Direct collection is currently unavailable.',
    'Fresh flowers are delivered by Kakao T Quick vehicle service only.',
  ]
  return <section className="order-process container" data-order-number-format={ORDER_NUMBER_STRUCTURE.format}><div className="order-process-head"><span className="eyebrow">Order Process</span><h2>{ko ? '주문 진행 안내' : 'Order Guide'}</h2></div><ol className="order-process-steps">{steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></li>)}</ol><div className="order-process-notes-wrap"><span>Order Notes</span><ul className="order-process-notes">{notes.map((note, index) => <li key={index}>{note}</li>)}</ul></div></section>
}

function ShopCollectionNav({ lang, active }) {
  const ko = lang === 'ko'
  return <nav className="shop-collection-nav container" aria-label={ko ? '샵 컬렉션' : 'Shop collections'}><a className={active === 'artificial' ? 'active' : ''} href="#shop"><span>01</span><div><strong>{ko ? '조화 컬렉션' : 'Artificial Flower Collection'}</strong><small>{ko ? '오래도록 머무는 플라워 오브제' : 'Floral objects made to last'}</small></div></a><a className={active === 'fresh' ? 'active' : ''} href="#shop/fresh"><span>02</span><div><strong>{ko ? '생화 컬렉션' : 'Fresh Flower Collection'}</strong><small>{ko ? '계절의 아름다움을 담은 예약제 컬렉션' : 'A seasonal collection made by reservation'}</small></div></a></nav>
}

function FreshSection({ title, children }) {
  return <article className="fresh-guide-section"><h2>{title}</h2><div>{children}</div></article>
}

function FreshFlowerCollection({ lang }) {
  const ko = lang === 'ko'; const [showAllMedia, setShowAllMedia] = useState(false); const [selectedMedia, setSelectedMedia] = useState(null)
  return <div className="page fade-in shop-page fresh-flower-page">
    <PageHead eyebrow={`— ${ko ? '샵' : 'Shop'}`} title={ko ? '메이플레르 플라워 컬렉션' : 'Mayfleur Flower Collections'} />
    <ShopCollectionNav lang={lang} active="fresh" />
    <section className="fresh-flower-intro container"><p>{ko ? <>메이플레르의 생화 컬렉션은 계절과 꽃의 아름다움을 담아<br />주문에 맞춰 하나씩 제작하는 프리미엄 플라워 컬렉션입니다.</> : <>Mayfleur’s fresh flower collection captures the beauty of flowers and the seasons,<br />with every piece individually created to order.</>}</p><div className="fresh-order-minimums"><div className="fresh-order-main"><strong>{ko ? '100% 예약제' : '100% By Reservation'}</strong><strong className="fresh-minimum">{ko ? <>기본 주문 금액 <b>20만원부터</b></> : <>Standard Orders from <b>KRW 200,000</b></>}</strong></div><span>{ko ? <>꽃다발은 <b>15만원부터</b> 주문 가능합니다.</> : <>Bouquets are available from <b>KRW 150,000</b>.</>}</span><a className="fresh-inquiry-small" href="#contact">{ko ? '문의하기' : 'Make an Inquiry'} →</a></div></section>
    <OrderProcess lang={lang} fresh />
    {freshFlowerMedia.length > 0 && <section className={`fresh-flower-gallery container ${showAllMedia ? 'expanded' : 'collapsed'}`}>{freshFlowerMedia.map((file, i) => <figure key={file}><button type="button" className="gallery-media-button" onClick={() => setSelectedMedia({ file, index: i + 1 })} aria-label={`${ko ? '생화 컬렉션 사진 크게 보기' : 'View fresh flower collection image larger'} ${i + 1}`}><Media file={file} alt={`${ko ? '프리미엄 생화 컬렉션' : 'Premium fresh flower collection'} ${i + 1}`} /></button></figure>)}{freshFlowerMedia.length > 20 && <button className="fresh-gallery-more" type="button" onClick={() => setShowAllMedia((value) => !value)}>{showAllMedia ? (ko ? '접기' : 'Show Less') : (ko ? '더보기' : 'View More')} <span>{showAllMedia ? '↑' : '↓'}</span></button>}</section>}
    <section className="fresh-flower-guide container">
      <FreshSection title="Order">{ko ? <><p>모든 생화 상품은 주문 제작으로 진행됩니다.</p><p>일반 주문은 <strong>최소 7일 전</strong>,<br />특정 꽃을 원하시는 경우 꽃의 수급을 위해 <strong>최소 2주 전</strong> 문의해 주세요.</p><p>원하시는 상품, 색감과 분위기, 예산 등을 상담한 후<br />입금이 확인되면 꽃 사입 및 제작이 진행됩니다.</p></> : <><p>All fresh flower products are made to order.</p><p>Please enquire <strong>at least 7 days in advance</strong> for general orders, or <strong>at least 2 weeks in advance</strong> when requesting specific flowers.</p><p>Flowers are sourced and production begins after discussing the product, palette, mood and budget, and confirming payment.</p></>}</FreshSection>
      <FreshSection title="Flowers">{ko ? <><p>생화는 계절과 꽃 시장의 상황에 따라<br />사용 가능한 꽃의 종류와 수급량이 달라질 수 있습니다.</p><p>사계절 만나볼 수 있는 꽃이 있는 반면,<br />특정 계절에만 잠시 만날 수 있는 꽃도 있습니다.<br />또한 같은 계절이라도 매주 시장에 들어오는 꽃이 달라질 수 있어<br />요청하신 이미지와 동일한 꽃과 구성으로 제작하기는 어렵습니다.</p><p>원하시는 이미지가 있는 경우 참고하여<br />색감과 전체적인 분위기를 최대한 가깝게 표현해 드립니다.</p></> : <><p>Flower varieties and quantities vary with the season and market availability.</p><p>Some flowers are available year-round, while others appear only briefly in a particular season. Market arrivals also change weekly, so an exact reproduction of a reference image may not be possible.</p><p>Reference images are welcome, and we will interpret their palette and overall mood as closely as possible.</p></>}</FreshSection>
      <FreshSection title="Design">{ko ? <><p>원하시는 분위기와 예산을 바탕으로<br />그에 어울리는 꽃을 선별하여 제작합니다.</p><p>같은 금액이라도 사용하는 꽃의 종류에 따라<br />전체적인 크기와 볼륨, 분위기가 달라질 수 있습니다.</p><p>비교적 합리적인 가격대의 꽃을 중심으로 구성할 경우<br />보다 풍성한 스타일로 제작할 수 있으며,<br />고가의 꽃을 사용할 경우 크기는 다소 작아질 수 있지만<br />보다 섬세하고 고급스러운 분위기를 연출할 수 있습니다.</p><p>원하시는 스타일과 예산에 맞춰<br />가장 적절한 꽃과 구성을 제안해 드립니다.</p></> : <><p>Flowers are selected to suit your preferred mood and budget.</p><p>Even at the same price, scale, volume and atmosphere vary according to the flowers used.</p><p>More accessible varieties can create a fuller design, while premium flowers may produce a smaller yet more delicate and luxurious arrangement.</p><p>We will recommend the most suitable flowers and composition for your style and budget.</p></>}</FreshSection>
      <FreshSection title="Products">{ko ? <><p>기본 주문 가능한 상품은 다음과 같습니다.</p><p className="fresh-product-list"><strong>달항아리</strong><strong>센터피스</strong><strong>꽃바구니</strong><strong>꽃다발</strong><strong>플라워박스</strong><strong>화병꽂이</strong></p><p>위 상품 외에도 공간이나 용도에 맞춘 별도 제작이 가능합니다.</p><p>원하시는 형태가 있으신 경우 상담을 통해 문의해 주세요.</p></> : <><p>Standard products available to order:</p><p className="fresh-product-list"><strong>Moon Jar</strong><strong>Centerpiece</strong><strong>Flower Basket</strong><strong>Bouquet</strong><strong>Flower Box</strong><strong>Vase Arrangement</strong></p><p>Bespoke pieces for a particular space or purpose are also available through consultation.</p></>}</FreshSection>
      <FreshSection title="Delivery">{ko ? <><p>생화 상품은 <strong>카카오퀵 차량 배송으로 진행되며, 직접 픽업은 어렵습니다.</strong></p><p>배송비는 배송 지역에 따라 별도로 책정됩니다.</p><p><strong>원하시는 도착 시간을 기준으로 배송을 예약</strong>하며, 기사 배차 및 교통 상황에 따라 실제 도착 시간은 다소 앞당겨지거나 지연될 수 있습니다.</p><div className="fresh-delivery-fees"><h3>Delivery Fee</h3><dl><div><dt>15,000원</dt><dd>서초 · 강남 · 송파 · 동작 · 광진 · 성동 · 이태원 · 한남 · 판교 · 분당 등</dd></div><div><dt>18,000원</dt><dd>용산 · 마포 · 관악 · 동대문 · 왕십리 · 이촌 · 공덕 · 여의도 · 신림 · 미금 등</dd></div><div><dt>20,000원</dt><dd>종로 · 중구 · 영등포 · 서대문 · 홍대 · 연희 · 합정 · 망원 · 성신여대 · 길음 · 구로 · 가산 · 회기 · 신이문 · 수지 등</dd></div><div><dt>22,000원</dt><dd>양천 · 목동 · 월계 · 수원 광교 등</dd></div><div><dt>25,000원</dt><dd>강서 · 강북 · 연신내 등</dd></div><div><dt>28,000원</dt><dd>노원 · 도봉 · 쌍문 등</dd></div></dl><p>표기되지 않은 지역은 배송지 확인 후 안내드립니다.</p></div><div className="fresh-delivery-benefit"><h3>Delivery Benefit</h3><p><strong>20만원 이상 주문 시 배송비 최대 15,000원 지원</strong></p><p><strong>30만원 이상 주문 시 배송비 최대 20,000원 지원</strong></p><small>주문 금액에 따라 배송비가 지원되며, 지원 금액을 초과하는 배송비는 고객님께서 부담합니다.</small></div></> : <><p>Fresh flower products are delivered <strong>by Kakao Quick vehicle service, and direct collection is unavailable.</strong></p><p>Delivery fees are calculated separately according to the delivery area.</p><p>We <strong>schedule delivery based on your preferred arrival time</strong>, but the actual arrival may be slightly earlier or delayed depending on driver availability and traffic conditions.</p><div className="fresh-delivery-fees"><h3>Delivery Fee</h3><dl><div><dt>KRW 15,000</dt><dd>Seocho · Gangnam · Songpa · Dongjak · Gwangjin · Seongdong · Itaewon · Hannam · Pangyo · Bundang and nearby areas</dd></div><div><dt>KRW 18,000</dt><dd>Yongsan · Mapo · Gwanak · Dongdaemun · Wangsimni · Ichon · Gongdeok · Yeouido · Sillim · Migeum and nearby areas</dd></div><div><dt>KRW 20,000</dt><dd>Jongno · Jung-gu · Yeongdeungpo · Seodaemun · Hongdae · Yeonhui · Hapjeong · Mangwon · Seongshin · Gireum · Guro · Gasan · Hoegi · Sinimun · Suji and nearby areas</dd></div><div><dt>KRW 22,000</dt><dd>Yangcheon · Mokdong · Wolgye · Suwon Gwanggyo and nearby areas</dd></div><div><dt>KRW 25,000</dt><dd>Gangseo · Gangbuk · Yeonsinnae and nearby areas</dd></div><div><dt>KRW 28,000</dt><dd>Nowon · Dobong · Ssangmun and nearby areas</dd></div></dl><p>For areas not listed, the fee will be confirmed after checking the delivery address.</p></div><div className="fresh-delivery-benefit"><h3>Delivery Benefit</h3><p><strong>Orders over KRW 200,000 receive up to KRW 15,000 in delivery support.</strong></p><p><strong>Orders over KRW 300,000 receive up to KRW 20,000 in delivery support.</strong></p><small>Delivery support is applied according to the order total. Any delivery fee exceeding the supported amount is payable by the customer.</small></div></>}</FreshSection>
      <FreshSection title="Cancellation">{ko ? <><p>생화는 주문이 확정되면 꽃을 사입하여 제작하기 때문에<br /><strong>선입금 확인 후 제작이 진행됩니다.</strong></p><p>주문 확정 후에는 꽃의 사입 및 제작이 진행되는 관계로<br />취소 및 환불이 어려울 수 있으니 신중한 주문을 부탁드립니다.</p><p>특히 <strong>수령일 기준 7일 전부터는 취소 및 환불이 어렵습니다.</strong></p></> : <><p>As flowers are sourced after confirmation, production begins <strong>only after advance payment is received</strong>.</p><p>Cancellation and refunds may not be possible once sourcing and production have begun.</p><p>In particular, <strong>cancellation and refunds are unavailable within 7 days of the delivery date.</strong></p></>}</FreshSection>
      <FreshSection title="Please Note">{ko ? <><p>생화는 자연에서 자라는 꽃의 특성상<br />사진과 실제 상품 사이에 차이가 있을 수 있습니다.</p><p>꽃의 개화 상태와 시장 상황에 따라<br />꽃의 종류, 색감, 크기, 형태 등이 달라질 수 있으며<br />메이플레르는 이를 고려하여 가장 아름다운 상태의 꽃을 선별합니다.</p><p>특정 꽃이나 이미지를 그대로 재현하기보다는<br />원하시는 <strong>색감과 분위기를 중심으로 가장 가까운 느낌의 디자인</strong>을 제안해 드립니다.</p><p>계절과 시장에서 만날 수 있는 가장 아름다운 꽃으로<br />메이플레르만의 플라워 디자인을 완성합니다.</p></> : <><p>As fresh flowers grow in nature, the finished product may differ from photographs.</p><p>Variety, colour, scale and form vary with bloom stage and market conditions. Mayfleur selects flowers in their most beautiful condition.</p><p>Rather than reproducing a specific flower or image exactly, we propose a design that most closely reflects your requested <strong>palette and atmosphere</strong>.</p><p>Mayfleur completes each design with the most beautiful flowers available from the season and market.</p></>}</FreshSection>
    </section>
    <section className="fresh-flower-cta paper-panel"><div><span className="rule" /><h2>{ko ? '생화 컬렉션 주문 문의' : 'Fresh Flower Order Inquiry'}</h2><p>{ko ? '원하시는 상품과 색감, 분위기, 예산, 수령일을 알려주세요.' : 'Tell us your preferred product, palette, mood, budget and delivery date.'}</p><a className="button primary" href="#contact">{ko ? '문의하기' : 'Make an Inquiry'}</a></div></section>
    {selectedMedia && <MediaLightbox selected={selectedMedia} onClose={() => setSelectedMedia(null)} total={freshFlowerMedia.length} label={ko ? '생화 컬렉션' : 'Fresh Flower Collection'} lang={lang} />}
  </div>
}

function ShopQuickDeliveryGuide({ lang }) {
  const ko = lang === 'ko'
  return <section className="shop-quick-delivery container"><span className="eyebrow">Artificial Flower Collection</span><h2>Delivery</h2><div className="shop-quick-delivery-intro">{ko ? <><p>상품의 종류와 크기에 따라 택배 또는 카카오 T 퀵으로 안전하게 배송되며, 방문 수령은 운영하지 않습니다.</p><p>배송비는 배송 지역에 따라 별도로 책정됩니다.</p><p>원하시는 도착 시간을 기준으로 배송을 예약하며, 기사 배차 및 교통 상황에 따라 실제 도착 시간은 다소 앞당겨지거나 지연될 수 있습니다.</p></> : <><p>Products are delivered safely by parcel or Kakao T Quick depending on their type and size. Direct collection is unavailable.</p><p>Delivery fees are calculated separately according to the delivery area.</p><p>We schedule delivery based on your preferred arrival time, but the actual arrival may be slightly earlier or delayed depending on driver availability and traffic conditions.</p></>}</div><QuickDeliveryFeeGuide ko={ko} /></section>
}

function Shop({ lang, detail }) {
  const ko = lang === 'ko'
  const current = detail ? shopProducts.find((p) => slug(p.name) === detail) : null
  const [category, setCategory] = useState('all')
  if (detail === 'fresh') return <FreshFlowerCollection lang={lang} />
  if (current) return <ProductDetail product={current} lang={lang} />
  const products = category === 'all' ? shopProducts : shopProducts.filter((p) => slug(p.category) === category)
  return <div className="page fade-in shop-page">
    <PageHead eyebrow={`— ${ko ? '샵' : 'Shop'}`} title={ko ? '메이플레르 플라워 컬렉션' : 'Mayfleur Flower Collections'} />
    <ShopCollectionNav lang={lang} active="artificial" />
    <OrderProcess lang={lang} />
    <section className="shop-layout container">
      <aside className="shop-filter"><span className="eyebrow">{ko ? '카테고리' : 'Browse'}</span><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>{ko ? '전체' : 'All'}<span>{shopProducts.length}</span></button>{shopCategories.map((cat) => <button key={cat.name} className={category === slug(cat.name) ? 'active' : ''} onClick={() => setCategory(slug(cat.name))}>{categoryNames[cat.name]?.[ko ? 1 : 0] || cat.name}<span>{cat.products.length}</span></button>)}</aside>
      <div className="product-grid">{products.map((product) => <ProductCard key={product.name} product={product} lang={lang} />)}</div>
    </section>
    <section className="shop-gallery-bridge container"><div className="shop-gallery-bridge-copy"><span className="eyebrow">Artificial Flower Gallery</span><h2>{ko ? <>메이플레르의 다양한 프리미엄 조화 컬렉션을 만나보세요.</> : <>Discover Mayfleur’s distinctive range of premium artificial flower collections.</>}</h2><p>{ko ? '더 많은 디자인 작품을 갤러리에서 확인하실 수 있습니다.' : 'Explore more design works in the gallery.'}</p><a className="text-link" href="#gallery/artificial">{ko ? '조화 갤러리 보기' : 'View Artificial Flower Gallery'} →</a></div><div className="shop-gallery-bridge-images">{imagesOnly(galleryGroups.artificial).slice(0, 4).map((file, i) => <a href="#gallery/artificial" key={file}><Media file={file} alt={`${ko ? '조화 갤러리' : 'Artificial flower gallery'} ${i + 1}`} /></a>)}</div></section>
    <ProductGuide lang={lang} />
    <ShopQuickDeliveryGuide lang={lang} />
    <section className="paper-panel custom-order"><div><span className="rule" /><h2>{ko ? '맞춤 플로럴 작품을 찾고 계신가요?' : 'Looking for a custom floral piece?'}</h2><p>{ko ? '공간과 행사, 원하시는 색감을 알려주세요. 메이플레르의 감각으로 맞춤 제작합니다.' : 'Tell us about your space, occasion and palette. We design bespoke arrangements to order.'}</p><a className="button primary" href="#contact">{ko ? '문의하기' : 'Custom Order Inquiry'}</a></div></section>
  </div>
}

function ProductDetail({ product, lang }) {
  const ko = lang === 'ko'; const media = product.media; const guide = orderGuide[lang]; const editorial = productEditorial[product.name]
  if (editorial) return <EditorialProductDetail product={product} editorial={editorial} lang={lang} guide={guide} />
  return <div className="page fade-in product-detail container"><a className="back" href="#shop">← {ko ? '샵으로 돌아가기' : 'Back to Shop'}</a>
    <section className="product-order-notice"><span className="eyebrow">— Mayfleur Order Guide</span><div>{guide.intro.map((line) => <p key={line}>{line}</p>)}</div></section>
    <div className="detail-top"><div className="detail-main"><Media file={media[0]} alt={product.name} eager /></div><div className="detail-copy"><span className="eyebrow">{categoryNames[product.category]?.[ko ? 1 : 0]}</span><h1>{product.name}</h1><p className="detail-price">{ko ? '가격 및 제작 상담' : 'Price & production on request'}</p><p>{ko ? '프리미엄 조화를 사용하여 꽃의 자연스러운 형태와 색감, 결을 섬세하게 담아냅니다. 모든 작품은 주문 후 플로리스트가 직접 제작합니다.' : 'Made with premium artificial flowers to preserve natural form, colour and texture. Every piece is designed and handcrafted to order.'}</p><dl><div><dt>{ko ? '제작 기간' : 'Production'}</dt><dd>{ko ? '평균 7–15일 (주문 상황에 따라 달라질 수 있습니다.)' : 'Approximately 7–15 days (may vary depending on order volume)'}</dd></div><div><dt>{ko ? '구성' : 'Design'}</dt><dd>{ko ? '색상 및 일부 소재 상담 가능' : 'Colour and selected materials customisable'}</dd></div></dl><a className="button primary" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">{ko ? '카카오채널 주문 문의' : 'Order via Kakao'}</a></div></div>
    <div className="detail-gallery">{media.slice(1).map((file, i) => <figure className="detail-gallery-item" key={file}><Media file={file} alt={`${product.name} detail ${i + 2}`} /></figure>)}</div>
    <OrderGuide guide={guide} />
  </div>
}

function ObjectSizeGuide({ lang, value }) {
  const ko = lang === 'ko'
  const sizes = ko ? [
    ['Small Object', '약 30–40cm', '미니 테이블 오브제'],
    ['Medium Object', '약 45–55cm', '메인 센터피스, 공간 포인트'],
    ['Large Object', '약 60cm 이상', '공간 중심 플라워 오브제'],
  ] : [
    ['Small Object', 'Approx. 30–40cm', 'Mini table object'],
    ['Medium Object', 'Approx. 45–55cm', 'Main centrepiece or spatial accent'],
    ['Large Object', 'Approx. 60cm and above', 'Statement floral object for a space'],
  ]
  return <details className="object-size-guide" open><summary><span>{value}</span><small>Size Guide <b aria-hidden="true" /></small></summary><div className="object-size-guide-panel"><h3>Object Size Guide</h3>{sizes.map(([name, size, description]) => <article className={name === value ? 'current' : ''} key={name}><strong>{name}</strong><span>{size}</span><p>{description}</p></article>)}</div></details>
}

function WeddingArchPackage({ editorial, lang }) {
  const ko = lang === 'ko'; const info = editorial.archPackage
  return <section className="wedding-arch-package"><div><span>{ko ? '기본 구성' : 'Included'}</span><ul>{info.included[lang].map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>{ko ? '별도 안내' : 'Quoted Separately'}</span><ul>{info.separate[lang].map((item) => <li key={item}>{item}</li>)}</ul></div><p>{info.note[lang]}</p></section>
}

function EditorialProductDetail({ product, editorial, lang, guide }) {
  const ko = lang === 'ko'; const heroFile = imagesOnly(product.media)[0]; const galleryMedia = product.media.filter((file) => file !== heroFile); const [selectedSize, setSelectedSize] = useState(editorial.priceOptions[0][0])
  const inquiryHref = `#contact/artificial/${encodeURIComponent(editorial.title[lang])}/${encodeURIComponent(selectedSize)}`
  const paragraphs = (items) => (items?.[lang] || items?.ko || []).map((item) => <p key={item}>{item}</p>)
  const detailValue = (term, values) => {
    const value = values[lang]
    if (term !== 'Vessel Option') return value
    const phrase = ko ? '재고 소진으로 동일 화기로 제작이 어렵습니다.' : 'sold out and the exact same vessel is unavailable.'
    const [before, after] = value.split(phrase)
    return before === undefined || after === undefined ? value : <>{before}<strong className="vessel-stock-notice">{phrase}</strong>{after}</>
  }
  return <div className="page fade-in product-detail editorial-product-detail container"><a className="back" href="#shop">← {ko ? '샵으로 돌아가기' : 'Back to Shop'}</a>
    <section className="product-order-notice"><span className="eyebrow">— Mayfleur Order Guide</span><div>{guide.intro.map((line) => <p key={line}>{line}</p>)}</div></section>
    <section className="editorial-product-hero"><div className="editorial-product-image"><Media file={heroFile} alt={editorial.title[lang]} eager /></div><div className="editorial-product-summary"><span className="eyebrow">Artificial Flower Collection</span><h1>{editorial.title.en}</h1><h2>{editorial.title.ko}</h2><div className="editorial-price-options"><span>{editorial.isWeddingArch ? 'Custom Design / Price' : (ko ? '사이즈별 주문 가격' : 'Size & Price')}</span><ul>{editorial.priceOptions.map(([size, prices]) => <li className={selectedSize === size ? 'selected' : ''} key={size}><button type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}><small>{size}</small><strong>{prices[lang]}</strong></button></li>)}</ul></div>{editorial.isWeddingArch && <WeddingArchPackage editorial={editorial} lang={lang} />}<div>{editorial.cardLines[lang].map((line) => <span key={line}>{line}</span>)}</div>{!editorial.isWeddingArch && <><dl><div><dt>{ko ? '제작 기간' : 'Production'}</dt><dd>{ko ? '평균 7–15일 (주문 상황에 따라 달라질 수 있습니다.)' : 'Approximately 7–15 days (may vary depending on order volume)'}</dd></div></dl><a className="button primary" href={inquiryHref}>{ko ? '주문 문의하기' : 'Order Inquiry'}</a></>}</div></section>
    {editorial.about && <section className="editorial-copy-section"><span className="eyebrow">About This Piece</span><div>{paragraphs(editorial.about)}</div></section>}
    {editorial.theme && <section className={`editorial-copy-section${editorial.isWeddingArch ? ' wedding-arch-theme' : ''}`}><span className="eyebrow">Design Theme</span><div>{paragraphs(editorial.theme)}</div></section>}
    {editorial.isWeddingArch && <section className="wedding-arch-production"><span className="eyebrow">Production</span><h2>{ko ? '제작 기간' : 'Production Period'}</h2><p>{editorial.productionTime[lang]}</p><a className="button primary" href="#contact/brand-collaboration">{ko ? '웨딩 아치 상담하기' : 'Wedding Arch Consultation'} →</a></section>}
    <section className="editorial-media-gallery">{galleryMedia.map((file, i) => <figure key={file}><Media file={file} alt={`${editorial.title[lang]} ${i + 2}`} /></figure>)}</section>
    {editorial.feature && <section className="editorial-copy-section"><span className="eyebrow">{editorial.featureTitle?.[lang] || editorial.featureTitle?.en || 'Design'}</span><div>{paragraphs(editorial.feature)}</div></section>}
    {editorial.spaces && <section className="editorial-recommended"><span className="eyebrow">Recommended Space</span><ul>{(editorial.spaces[lang] || editorial.spaces.ko).map((item) => <li key={item}>{item}</li>)}</ul></section>}
    <section className="editorial-product-details"><span className="eyebrow">Product Details</span><dl>{editorial.details.map(([term, values]) => <div key={term}><dt>{term}</dt><dd>{term === 'Collection' && product.category === 'Centerpieces' ? <ObjectSizeGuide lang={lang} value={values[lang]} /> : detailValue(term, values)}</dd></div>)}</dl></section>
    {(editorial.delivery || editorial.custom) && <section className="editorial-delivery-custom">{editorial.delivery && <article><span className="eyebrow">Delivery</span>{paragraphs(editorial.delivery)}<details className="contact-delivery-fees product-delivery-fees"><summary>{editorial.freeParcel ? (ko ? '퀵 배송비 보기' : 'View Quick Delivery Fees') : (ko ? '배송비 보기' : 'View Delivery Fees')} <b aria-hidden="true" /></summary>{editorial.freeParcel && <p className="product-quick-fee-note">{ko ? '무료 택배 대신 퀵 배송을 원하시는 경우 아래 지역별 배송비가 적용됩니다.' : 'If you prefer Quick delivery instead of free parcel shipping, the regional fees below apply.'}</p>}<QuickDeliveryFeeGuide ko={ko} /></details></article>}{editorial.custom && <article><span className="eyebrow">Custom Option</span>{paragraphs(editorial.custom)}</article>}</section>} 
    <OrderGuide guide={editorial.orderGuide?.[lang] || guide} />
  </div>
}

function OrderGuide({ guide }) {
  return <section className="product-order-guide"><span className="eyebrow">/ Order Guide</span>{guide.sections.map(([title, items]) => <article key={title}><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</section>
}

function ProductGuide({ lang }) {
  const ko = lang === 'ko'
  const items = ko ? [
    ['주문 제작', '모든 작품은 주문 후 제작되는 핸드메이드 오브제이며, 제작 기간은 평균 7–15일입니다. 주문 상황에 따라 달라질 수 있습니다.'],
    ['디자인 안내', '전체적인 색감과 무드를 유지하는 범위에서 소재가 대체될 수 있으며 일부 색상 변경은 사전 협의가 가능합니다.'],
    ['배송', '부케, 화병꽂이, 꽃바구니, 리스 및 택배 가능한 센터피스는 전국 무료 택배로 발송합니다. 요청 시 카카오 T 퀵 배송도 가능하며, 퀵 배송비는 지역에 따라 별도로 적용됩니다. 파손 위험이 높은 일부 센터피스는 차량 배송으로 진행합니다.'],
    ['교환 및 환불', '주문 제작 특성상 제작 시작 이후 단순 변심에 의한 교환·환불은 어렵습니다.'],
  ] : [
    ['Made to order', 'Every piece is handcrafted after confirmation. Production typically takes 7–15 days and may vary depending on current order volume.'],
    ['Design notes', 'Materials may be substituted while retaining the overall palette and mood. Selected colour changes can be discussed.'],
    ['Delivery', 'Bouquets, vase arrangements, baskets, wreaths and parcel-eligible centrepieces include free nationwide parcel delivery. Kakao T Quick is available on request with separate regional fees. Selected fragile centrepieces require vehicle delivery.'],
    ['Returns', 'As each piece is made to order, cancellations and returns are unavailable once production begins.'],
  ]
  return <section className="guide container"><SectionTitle eyebrow="Collection Guide" title={ko ? '주문 전 확인해 주세요' : 'Before placing your order'} /><div>{items.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
}

function About({ lang }) {
  const ko = lang === 'ko'
  const story = ko ? `꽃을 만나기 전, 저는 늘 무언가를 찾고 있었습니다.

그것이 무엇인지 정확히 알 수는 없었지만
삶을 살아있게 하는 무언가,
마음에 설렘을 더하는 무언가를 기다리고 있었습니다.

그러던 어느 날, 꽃을 만났습니다.

무채색이었던 삶은 꽃을 만나
다채로운 색과 설렘으로 물들었고,
매일이 새로운 날처럼 느껴졌습니다.

계절마다 조용히 피고 지는 꽃을 바라보며
알게 되었습니다.

꼭 필요하지 않아도 아름다운 것,
아무런 쓸모가 없어 보여도
삶에 분명한 의미를 더해주는 것들이 있다는 것을.

꽃은 제게 그런 존재였습니다.

계절의 아름다움을 발견하고,
잠시 머물다 사라지는 순간을 마음에 담는 일.

그 시간은 제게 마음의 숲이 되어주었습니다.

이제는 제가 꽃을 통해 발견한 그 아름다움을
다른 사람의 일상에도 전하고 싶습니다.

계절마다 피어나는 꽃처럼
누군가의 마음에 조용히 머무는 아름다움을 전하는 것.

그것이 메이플레르가 꽃을 만드는 이유입니다.` : `Before I encountered flowers, I was always searching for something.

I could not say exactly what it was, but I was waiting for something that would make life feel alive and bring a sense of wonder to my heart.

Then one day, I found flowers.

A life once without colour became filled with many shades and quiet excitement. Every day began to feel new.

Watching flowers gently bloom and fade with each season, I came to understand that some things can be beautiful without being necessary, and can give clear meaning to life even when they seem to serve no practical purpose.

Flowers became that kind of presence for me.

Discovering the beauty of the seasons and holding close the moments that briefly stay before disappearing became a forest for my heart.

Now I want to share with others the beauty I discovered through flowers.

Like flowers returning each season, I hope to offer a beauty that rests quietly in someone’s heart.

That is why Mayfleur creates flowers.`
  const profileCredentials = [
    { title: 'Education & Qualifications', items: [
      { name: 'L’École Artistique de Catherine Muller', meta: 'Paris' },
      { name: ko ? '화훼장식기능사' : 'Korean Floral Design Craftsman Certificate' },
      { name: ko ? '원예치료프로그램 수료' : 'Horticultural Therapy Program · Completed' },
    ] },
    { title: 'Clients & Institutions', items: [
      { name: 'NAVER' },
      { name: 'Kakao' },
      { name: 'Hyundai Department Store' },
      { name: 'Daelim Museum' },
      { name: 'Gimpo Airport' },
      { name: 'Zigzag' },
      { name: 'Seongdong Cultural Foundation' },
      { name: 'Hwigyeomjae' },
    ] },
    { title: 'International Teaching', items: [
      { name: 'Los Angeles Workshop', meta: '(2025. 3 / 2025. 11)' },
      { name: 'Taiwan Flower Workshop', meta: '(2025. 9)' },
      { name: 'Manila Flower Workshop', meta: ko ? '2026년 12월 예정' : 'Scheduled · December 2026', status: 'upcoming' },
    ] },
    { title: 'International Private Teaching', items: [
      { name: 'Singapore · Hong Kong · China · Philippines · Indonesia · Australia · France · Taiwan · USA' },
    ] },
    { title: 'Book Publications', items: [
      { name: ko ? '메이플레르 플라워 클래스' : 'Mayfleur Flower Class', meta: '2020' },
      { name: ko ? '꽃은 나에게 마음의 숲이 되어주었다' : 'Flowers Became My Forest', meta: '2024' },
    ] },
    { title: 'Exhibitions & Editorial', items: [
      { name: ko ? '플로럴 사진전' : 'Floral Photography Exhibition', meta: ko ? '아르케 갤러리 · 서울' : 'Arke Gallery · Seoul' },
      { name: ko ? '월간 플로리스트 · 월간 플로라' : 'Monthly Florist · Monthly Flora', meta: ko ? '연재' : 'Series' },
      { name: 'SK Happiness Discovery', meta: ko ? '칼럼' : 'Column' },
    ] },
  ]
  return <div className="page fade-in about-page"><section className="about-banner container"><Media file={storyPhotos[1]} alt="Mayfleur story" eager /></section><PageHead eyebrow={`— ${ko ? '소개' : 'About'}`} title="OUR STORY" sub={story} />
    <section className="about-story-photos container"><Media file={storyPhotos[0]} alt="Mayfleur studio" /><Media file={storyPhotos[3]} alt="Flowers in the studio" /></section>
    <section className="philosophy"><span className="rule" /><span className="eyebrow">{ko ? '브랜드 철학' : 'Brand Philosophy'}</span><p>{ko ? '계절의 아름다움을 담은 꽃 — 무용하지만 아름다운 것들로 삶에 의미를 더합니다.' : 'Flowers that hold the beauty of the seasons — adding meaning to life through things without utility, yet full of beauty.'}</p></section>
    <section className="profile container"><div className="profile-image"><Media file={profilePhoto} alt="Yeajin Kim" /></div><div className="profile-copy"><span className="eyebrow">Profile</span><h2>{ko ? '김예진' : 'Yeajin Kim'}</h2><p className="profile-role">Floral Artist, Author & Educator</p><p>Founder of Mayfleur · Based in Korea</p><div className="credentials">{profileCredentials.map((section) => <Credential key={section.title} {...section} />)}</div></div></section>
  </div>
}

function Credential({ title, items }) { return <section className="credential-section"><h3>{title}</h3><ul className="credential-list">{items.map((item) => { const entry = typeof item === 'string' ? { name: item } : item; return <li key={`${entry.name}-${entry.meta || ''}`}><span>{entry.name}</span>{entry.meta && <small className={entry.status ? `status ${entry.status}` : ''}>{entry.meta}</small>}</li> })}</ul></section> }

function Gallery({ lang, detail }) {
  const ko = lang === 'ko'; const initialFilter = ['works', 'spaces', 'artificial'].includes(detail) ? detail : 'all'; const [filter, setFilter] = useState(initialFilter); const [limit, setLimit] = useState(60); const [selected, setSelected] = useState(null)
  const alternateRows = (groups, rowSize = 4) => {
    const rows = Math.max(...groups.map((group) => Math.ceil(group.length / rowSize)))
    return Array.from({ length: rows }, (_, i) => groups.flatMap((group) => group.slice(i * rowSize, (i + 1) * rowSize))).flat()
  }
  const list = filter === 'all' ? alternateRows([galleryGroups.spaces, galleryGroups.works]) : galleryGroups[filter]
  useEffect(() => { if (['works', 'spaces', 'artificial'].includes(detail)) setFilter(detail); else if (!detail) setFilter('all') }, [detail])
  useEffect(() => { setLimit(60); setSelected(null) }, [filter])
  useEffect(() => {
    if (!selected) return undefined
    const close = (event) => { if (event.key === 'Escape') setSelected(null) }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close) }
  }, [selected])
  return <div className="page fade-in gallery-page"><PageHead eyebrow={`— ${ko ? '갤러리' : 'Gallery'}`} title="A Visual Archive of Mayfleur" sub={ko ? '꽃, 오브제, 계절 그리고 순간들' : 'Flowers, objects, seasons and moments'} note={ko ? '생화 · 공간 스타일링 · 워크샵 · 순간 · 작업 과정 모음집' : 'Fresh flowers · spatial styling · workshops · moments · process'} />
    <section className="container"><div className="filter-chips">{[['all', ko ? '전체' : 'All'], ['works', ko ? '플로럴 작품' : 'Floral Works'], ['spaces', ko ? '공간 스타일링' : 'Space Styling'], ['artificial', ko ? '조화' : 'Artificial Flowers']].map(([id, text]) => <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{text}</button>)}</div>
      <div className="masonry">{list.slice(0, limit).map((file, i) => <figure key={file}><button type="button" className="gallery-media-button" onClick={() => setSelected({ file, index: i + 1 })} aria-label={`${ko ? '갤러리 이미지 크게 보기' : 'View gallery image larger'} ${i + 1}`}><Media file={file} alt={`Mayfleur gallery ${i + 1}`} /></button></figure>)}</div>
      {limit < list.length && <button className="button ghost load-more" onClick={() => setLimit((v) => v + 60)}>{ko ? '더 보기' : 'Load More'}</button>}
    </section>
    {selected && <div className="project-lightbox gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${ko ? '갤러리 이미지' : 'Gallery image'} ${selected.index}`} onClick={() => setSelected(null)}><div className="project-lightbox-content" onClick={(event) => event.stopPropagation()}><button type="button" className="project-lightbox-close" onClick={() => setSelected(null)} aria-label={ko ? '닫기' : 'Close'}>×</button><Media file={selected.file} alt={`Mayfleur gallery ${selected.index}`} eager /><small>Mayfleur Gallery · {selected.index} / {list.length}</small></div></div>}
  </div>
}

function Portfolio({ lang, detail }) {
  const ko = lang === 'ko'; const project = detail ? portfolioProjects.find((p) => slug(p.name) === detail) : null
  if (project) return <ProjectDetail project={project} lang={lang} />
  return <div className="page fade-in portfolio-page"><PageHead eyebrow={`— ${ko ? '포트폴리오' : 'Portfolio'}`} title="Clients & Projects" />
    <section className="portfolio-list container">{portfolioProjects.map((item) => <a href={`#portfolio/${slug(item.name)}`} key={item.name} className="project-card"><div className="project-thumb"><Media file={imagesOnly(item.media)[0]} alt={item.name} /></div><h2>{item.name}</h2><span>{/workshop|class/i.test(item.name) ? 'Workshop' : 'Floral Project'}</span></a>)}</section>
  </div>
}

function ProjectDetail({ project, lang }) {
  const ko = lang === 'ko'; const photos = imagesOnly(project.media); const [selected, setSelected] = useState(null)
  const description = projectCopy[project.name]?.[lang] || (ko ? '브랜드와 공간의 고유한 분위기를 꽃의 색과 형태로 해석한 메이플레르의 플로럴 프로젝트입니다.' : 'A Mayfleur project translating the character of a brand and place through floral colour and form.')
  useEffect(() => {
    if (!selected) return undefined
    const close = (event) => { if (event.key === 'Escape') setSelected(null) }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close) }
  }, [selected])
  return <div className="page fade-in project-detail container"><a className="back" href="#portfolio">← {ko ? '포트폴리오로 돌아가기' : 'Back to Portfolio'}</a><section className="project-feature"><div><span className="eyebrow">Project Detail</span><h1>{project.name}</h1><p>{description}</p><small>{photos.length} Photographs · Mayfleur Archive</small></div><Media file={photos[0]} alt={project.name} eager /></section><span className="gallery-label">{ko ? '프로젝트 갤러리' : 'Project Gallery'}</span><section className="project-gallery">{photos.slice(1).map((file, i) => <button type="button" className="project-gallery-button" key={file} onClick={() => setSelected({ file, index: i + 2 })} aria-label={`${project.name} ${i + 2} ${ko ? '크게 보기' : 'view larger'}`}><Media file={file} alt={`${project.name} ${i + 2}`} /></button>)}</section>
    {selected && <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${project.name} image ${selected.index}`} onClick={() => setSelected(null)}><div className="project-lightbox-content" onClick={(event) => event.stopPropagation()}><button type="button" className="project-lightbox-close" onClick={() => setSelected(null)} aria-label={ko ? '닫기' : 'Close'}>×</button><Media file={selected.file} alt={`${project.name} ${selected.index}`} eager /><small>{project.name} · {selected.index} / {photos.length}</small></div></div>}
  </div>
}

function Services({ lang }) {
  const ko = lang === 'ko'
  return <div className="page fade-in services-page"><PageHead title="Services" />
    <section className="services container">{services.map((service, i) => { const copy = serviceCopy[service.name]; const photos = imagesOnly(service.media); return <article key={service.name} className="service"><div className="service-copy"><div className="service-heading"><span className="service-no">0{i + 1}</span><h2>{service.name}</h2></div><p>{copy?.[lang] || copy?.en}</p>{copy?.listTitle && <span className="service-list-title">{copy.listTitle}</span>}<div className="service-list">{copy?.list.map((item) => <span key={item}>{item}</span>)}</div><a className="button ghost" href={serviceContactRoutes[service.name]}>{service.name === 'Global Workshops' ? 'Host Inquiry' : 'Inquiry'}</a></div><div className="service-images">{photos.slice(0, 4).map((file) => <Media key={file} file={file} alt={service.name} />)}</div></article>})}</section>

  </div>
}

function Books({ lang }) {
  const ko = lang === 'ko'; const books = [
    { title: ko ? '메이플레르 플라워 클래스' : 'Mayfleur Flower Class', year: '2020', file: bookFiles.find((x) => x.toLowerCase().endsWith('.jpg')), url: 'https://search.shopping.naver.com/book/search?bookTabType=ALL&pageIndex=1&pageSize=40&query=%EB%A9%94%EC%9D%B4%ED%94%8C%EB%A0%88%EB%A5%B4%20%ED%94%8C%EB%9D%BC%EC%9B%8C%ED%81%B4%EB%9E%98%EC%8A%A4&sort=REL' },
    { title: ko ? '꽃은 나에게 마음의 숲이 되어주었다' : 'Flowers Became My Forest', year: '2024', file: bookFiles.find((x) => x.toLowerCase().endsWith('.png')), url: 'https://search.shopping.naver.com/book/catalog/50892865622?cat_id=50011280&frm=PBOKPRO&query=%EA%BD%83%EC%9D%80+%EB%82%98%EC%97%90%EA%B2%8C+%EB%A7%88%EC%9D%8C%EC%9D%98+%EC%88%B2%EC%9D%B4+%EB%90%98%EC%96%B4%EC%A3%BC%EC%97%88%EB%8B%A4&NaPm=ct%3Dmsy6o9aw%7Cci%3Dff94b8f6b94dc3ca993cea0fbfa2b77bbc909680%7Ctr%3Dboknx%7Csn%3D95694%7Chk%3D695071de1bd0df598e546586c6dc20c0393b8893' },
  ]
  return <div className="page fade-in books-page"><PageHead title={ko ? '도서' : 'Books'} />
    <section className="books container">{books.map((book) => <article key={book.year}><div className="book-cover"><Media file={book.file} alt={`${book.title} cover`} /></div><div><span className="eyebrow">Published · {book.year}</span><h2>{book.title}</h2><a className="text-link" href={book.url} target="_blank" rel="noreferrer">{ko ? '구매하기' : 'Buy This Book'} →</a></div></article>)}</section>
  </div>
}

function PolicyParagraph({ text }) {
  const link = text.includes('배송·취소·환불 안내') ? ['배송·취소·환불 안내', '#shipping-policy'] : text.includes('개인정보처리방침') ? ['개인정보처리방침', '#privacy'] : null
  if (!link) return <p>{text}</p>
  const [label, href] = link; const [before, after] = text.split(label)
  return <p>{before}<a className="policy-inline-link" href={href}>{label}</a>{after}</p>
}

function PolicyPage({ lang, type }) {
  const ko = lang === 'ko'
  const policies = ko ? {
    terms: {
      title: '이용약관', intro: [], sections: [
        { title: '제1조 목적', paragraphs: ['본 약관은 MAYFLEUR(이하 “사이트”)가 제공하는 상품 및 서비스의 이용과 주문, 배송 등에 관한 기본적인 사항을 정하는 것을 목적으로 합니다.'] },
        { title: '제2조 서비스의 내용', paragraphs: ['MAYFLEUR는 생화 및 조화 상품의 주문 제작과 플라워 스타일링 등의 서비스를 제공합니다.', '상품은 디자인, 소재, 계절 및 제작 방식에 따라 실제 이미지와 일부 차이가 있을 수 있으며, 주문 제작 상품의 특성상 상담을 통해 세부 내용과 금액을 확정합니다.'] },
        { title: '제3조 주문 및 상담', paragraphs: ['상품 주문은 홈페이지의 CONTACT 또는 카카오채널 등을 통한 상담을 통해 진행됩니다.', '주문 시 상품, 예산, 색감 및 분위기, 요청사항, 수령일, 배송지 등의 정보를 확인한 후 제작 가능 여부와 최종 금액을 안내드립니다.', '상담 내용 및 제작 일정이 확정되고 결제가 완료된 경우 주문이 최종 확정됩니다.'] },
        { title: '제4조 상품 제작', paragraphs: ['MAYFLEUR의 상품은 주문에 따라 제작되는 상품으로, 주문 확정 후에는 제작 상황에 따라 변경이나 취소가 제한될 수 있습니다.', '생화 상품은 계절 및 시장 상황에 따라 사용 가능한 꽃의 종류와 소재가 달라질 수 있으며, 요청하신 꽃이 확보되지 않을 경우 유사한 분위기와 색감의 소재로 변경될 수 있습니다.', '조화 상품 또한 소재의 재고 및 수급 상황에 따라 일부 소재가 변경될 수 있습니다.'] },
        { title: '제5조 결제', paragraphs: ['상품의 최종 금액은 상담을 통해 확정되며, 안내된 결제 방법에 따라 결제가 진행됩니다.', '주문 제작 상품은 결제 확인 후 제작이 시작됩니다.'] },
        { title: '제6조 배송', paragraphs: ['상품은 주문 시 안내된 배송 방법에 따라 배송됩니다.', '생화 상품은 카카오 T 퀵 차량 배송으로 진행되며, 조화 상품은 상품의 크기와 특성에 따라 택배 또는 카카오 T 퀵으로 배송될 수 있습니다.', '배송비는 배송 지역 및 방법에 따라 별도로 책정되며, 배송비 지원이 적용되는 경우 주문 금액 및 배송비 기준에 따라 안내드립니다.', '배송 시간은 기사 배차 및 교통 상황 등에 따라 실제 도착 시간이 다소 변동될 수 있습니다.'] },
        { title: '제7조 주문 취소 및 환불', paragraphs: ['주문 취소 및 환불은 상품의 제작 진행 여부와 상품의 특성에 따라 적용됩니다.', '주문 제작이 시작된 이후에는 상품의 특성상 단순 변심에 의한 취소 및 환불이 제한될 수 있습니다.', '상품에 문제가 있는 경우에는 상품 수령 후 확인할 수 있도록 가능한 빠른 시일 내에 MAYFLEUR로 문의해 주시기 바랍니다.', '자세한 내용은 별도의 배송·취소·환불 안내를 따릅니다.'] },
        { title: '제8조 저작권', paragraphs: ['사이트에 게시된 상품 이미지, 사진, 디자인, 문구 및 콘텐츠의 저작권은 MAYFLEUR 또는 해당 권리자에게 있으며, 사전 동의 없이 무단으로 복제, 수정, 배포하거나 상업적으로 이용할 수 없습니다.'] },
        { title: '제9조 개인정보', paragraphs: ['MAYFLEUR는 상품 상담 및 주문, 제작, 배송을 위해 필요한 최소한의 개인정보를 수집하며, 개인정보의 처리에 관한 자세한 사항은 별도의 개인정보처리방침을 따릅니다.'] },
        { title: '제10조 약관의 변경', paragraphs: ['본 약관은 관련 법령 및 MAYFLEUR의 운영에 따라 변경될 수 있으며, 변경된 내용은 사이트를 통해 안내합니다.'] },
      ], effective: '2026년 9월 1일',
    },
    privacy: {
      title: '개인정보처리방침',
      intro: ['MAYFLEUR(이하 “사이트”)는 고객의 개인정보를 소중하게 보호하며, 관련 법령에 따라 개인정보를 안전하게 처리합니다.'],
      sections: [
        { title: '1. 개인정보의 수집 및 이용 목적', paragraphs: ['MAYFLEUR는 다음의 목적을 위해 필요한 개인정보를 수집합니다.'], bullets: ['상품 및 주문 상담', '주문 제작 및 상품 준비', '배송 및 배송 관련 안내', '고객 문의 및 요청사항 확인', '주문 및 결제 관련 안내', '고객 문의에 대한 응대'] },
        { title: '2. 수집하는 개인정보의 항목', paragraphs: ['MAYFLEUR는 주문 및 상담 과정에서 다음과 같은 개인정보를 수집할 수 있습니다.'], groups: [{ title: '필수항목', bullets: ['주문자 성함', '주문자 연락처', '받는 분 성함', '받는 분 연락처', '배송 주소', '희망 수령일'] }, { title: '선택항목', bullets: ['상품 요청사항', '선호하는 색감 및 분위기', '상품 제작에 필요한 참고 이미지'] }], after: ['서비스 이용 과정에서 접속기록, IP주소, 쿠키 등이 자동으로 생성·수집될 수 있습니다.'] },
        { title: '3. 개인정보의 보유 및 이용기간', paragraphs: ['MAYFLEUR는 개인정보의 수집 및 이용 목적이 달성된 후에는 원칙적으로 해당 개인정보를 지체 없이 파기합니다.', '다만 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 기간 동안 안전하게 보관합니다.'] },
        { title: '4. 개인정보의 제3자 제공', paragraphs: ['MAYFLEUR는 고객의 개인정보를 원칙적으로 외부에 제공하지 않습니다.', '다만 상품 배송 등 서비스 제공을 위해 필요한 경우 고객에게 안내한 범위 내에서 개인정보가 제공될 수 있으며, 법령에 따라 필요한 경우에는 예외로 합니다.'] },
        { title: '5. 개인정보 처리의 위탁', paragraphs: ['MAYFLEUR는 원활한 서비스 제공을 위해 개인정보 처리업무를 외부 업체에 위탁할 수 있습니다.', '위탁업체 및 위탁업무의 내용이 변경되는 경우 본 개인정보처리방침을 통해 안내합니다.'] },
        { title: '6. 정보주체의 권리', paragraphs: ['고객은 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제 및 처리정지를 요청할 수 있습니다.', '개인정보와 관련한 문의 및 요청은 MAYFLEUR의 고객 문의 채널을 통해 접수할 수 있습니다.'] },
        { title: '7. 개인정보의 안전성 확보', paragraphs: ['MAYFLEUR는 고객의 개인정보를 안전하게 보호하기 위해 개인정보에 대한 접근을 제한하고, 관련 법령에서 정하는 안전성 확보 조치를 준수합니다.'] },
        { title: '8. 개인정보처리방침의 변경', paragraphs: ['본 개인정보처리방침의 내용이 변경되는 경우 변경사항을 사이트를 통해 안내합니다.'] },
      ], effective: '2026년 9월 1일',
    },
    shipping: {
      title: '배송·취소·환불 안내', intro: [], sections: [
        { title: '배송', paragraphs: ['생화는 카카오 T 퀵 차량 배송만 가능합니다.', '조화는 상품의 종류와 크기에 따라 택배 또는 카카오 T 퀵으로 배송됩니다.', '방문 수령은 운영하지 않습니다.', '배송비는 배송 지역 및 상품에 따라 별도로 책정되며, 주문 금액에 따라 배송비 지원이 적용됩니다.'] },
        { title: '제작', paragraphs: ['생화는 일반 주문의 경우 최소 7일 전, 특정 꽃을 원하시는 경우 최소 2주 전 문의해 주세요.', '조화는 상품에 따라 약 7–15일의 제작 기간이 소요됩니다.'] },
        { title: '취소 및 환불', paragraphs: ['생화는 주문 확정 후 꽃을 사입하여 제작하기 때문에 제작 준비가 시작된 이후에는 취소 및 환불이 어려울 수 있습니다.', '특히 수령일 기준 7일 전부터는 취소 및 환불이 어렵습니다.', '조화 주문 제작 및 개별 수정 상품 역시 제작이 시작된 이후에는 단순 변심에 의한 취소 및 환불이 어려울 수 있습니다.'] },
        { title: '상품의 특성', paragraphs: ['생화는 자연 소재의 특성상 꽃의 색상, 크기, 형태 및 개화 상태에 차이가 있을 수 있습니다.', '계절과 시장 상황에 따라 요청하신 꽃과 동일한 종류 및 구성으로 제작하기 어려울 수 있으며, 가능한 범위 내에서 요청하신 색감과 분위기를 반영하여 제작합니다.'] },
        { title: '상품 이상', paragraphs: ['상품 수령 후 상품의 하자, 오배송 또는 배송 과정에서 발생한 명백한 문제가 있는 경우 가능한 빠른 시일 내에 메이플레르로 문의해 주세요.', '상품 상태 확인을 위해 사진을 요청드릴 수 있습니다.', '문의는 홈페이지 CONTACT 또는 메이플레르 카카오채널을 이용해 주세요.'] },
      ],
    },
  } : {
    terms: {
      title: 'Terms of Use', intro: [
        'MAYFLEUR (“Mayfleur”) provides fresh and artificial flower products, made-to-order pieces, external flower classes and floral styling services.',
        'An order is confirmed after consultation establishes the composition, production availability, schedule and final price, and payment has been completed.',
        'Fresh flowers and made-to-order products may vary in variety and composition according to the season, market conditions and material availability.',
        'Product prices, delivery fees, production periods and order conditions are provided on each product page or during consultation.',
        'Customers must provide accurate order information, contact details, delivery address and delivery date. The customer may be responsible for issues caused by incorrect information.',
        'Matters not specified in these terms are governed by applicable law and standard commercial practice.',
      ], sections: [], effective: 'September 1, 2026',
    },
    privacy: {
      title: 'Privacy Policy', intro: ['MAYFLEUR (“Mayfleur”) values the privacy of its customers and manages personal information safely in accordance with applicable law.'], sections: [
        { title: 'Information We Collect', paragraphs: ['We may collect the following information for product inquiries and orders.'], bullets: ['Orderer name', 'Orderer contact details', 'Delivery address', 'Preferred delivery date', 'Recipient name and contact details', 'Order and inquiry details', 'Reference images'] },
        { title: 'Purpose of Use', paragraphs: ['Collected information is used for the following purposes.'], bullets: ['Product inquiries and consultation', 'Order confirmation and production', 'Delivery and delivery-related contact', 'Payment and order guidance', 'Customer inquiry handling'] },
        { title: 'Retention Period', paragraphs: ['Personal information is deleted without delay once its purpose has been fulfilled.', 'Where retention is required by law, information is retained for the applicable statutory period.'] },
        { title: 'Third-Party Provision', paragraphs: ['We do not provide personal information to external parties as a general rule.', 'The minimum information required for delivery may be shared with a delivery provider. Disclosure required by law is an exception.', 'Customers may request access to, correction of or deletion of their personal information.'] },
      ], effective: 'September 1, 2026',
    },
    shipping: {
      title: 'Delivery, Cancellation & Refunds', intro: [], sections: [
        { title: 'Delivery', paragraphs: ['Fresh flowers are delivered only by Kakao T Quick vehicle service.', 'Artificial flowers are delivered by parcel or Kakao T Quick according to product type and size.', 'Direct collection is unavailable.', 'Delivery fees are calculated separately according to the delivery area and product. Delivery support may apply according to the order total.'] },
        { title: 'Production', paragraphs: ['Please inquire at least 7 days in advance for general fresh flower orders, or at least 2 weeks in advance when requesting specific flowers.', 'Artificial flower products generally require approximately 7–15 days for production.'] },
        { title: 'Cancellation & Refunds', paragraphs: ['Fresh flowers are sourced after order confirmation, so cancellation and refunds may not be possible once preparation has begun.', 'In particular, cancellation and refunds are unavailable within 7 days of the delivery date.', 'Made-to-order or individually modified artificial flower products cannot generally be cancelled or refunded for a change of mind once production has begun.'] },
        { title: 'Product Characteristics', paragraphs: ['Fresh flowers naturally vary in colour, size, form and stage of bloom.', 'Seasonal and market conditions may prevent an exact reproduction of requested flowers or compositions. We reflect the requested palette and atmosphere as closely as possible.'] },
        { title: 'Product Issues', paragraphs: ['Please contact Mayfleur as soon as possible if a product has a defect, is delivered incorrectly or has an evident delivery-related issue.', 'Photographs may be requested to confirm the product condition.', 'Please use the website CONTACT page or Mayfleur Kakao Channel for assistance.'] },
      ],
    },
  }
  const policy = policies[type]
  return <div className="page fade-in policy-page"><PageHead eyebrow="— Policy" title={policy.title} /><section className="policy-content container"><div className="policy-intro">{policy.intro.map((paragraph) => <PolicyParagraph text={paragraph} key={paragraph} />)}</div>{policy.sections.map((section) => <article key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <PolicyParagraph text={paragraph} key={paragraph} />)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}{section.groups?.map((group) => <div className="policy-list-group" key={group.title}><h3>{group.title}</h3><ul>{group.bullets.map((item) => <li key={item}>{item}</li>)}</ul></div>)}{section.after?.map((paragraph) => <PolicyParagraph text={paragraph} key={paragraph} />)}</article>)}{policy.effective && <p className="policy-effective"><strong>{ko ? `시행일 : ${policy.effective}` : `Effective Date: ${policy.effective}`}</strong></p>}</section></div>
}

async function compressAttachment(file) {
  if (!file.type.startsWith('image/')) throw new Error('image')
  let bitmap
  try { bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }) } catch { if (file.size <= 5 * 1024 * 1024) return file; throw new Error('format') }
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close?.()
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', .78))
  if (!blob || blob.size >= file.size) return file
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.jpg`, { type: 'image/jpeg', lastModified: Date.now() })
}

function PhotoAttachment({ ko, name }) {
  const [attachments, setAttachments] = useState([]); const [error, setError] = useState('')
  useEffect(() => () => attachments.forEach((item) => URL.revokeObjectURL(item.url)), [attachments])
  const choose = async (event) => {
    const input = event.currentTarget; const selected = [...input.files].slice(0, 5); setError('')
    try {
      const files = await Promise.all(selected.map(compressAttachment))
      const next = files.map((file) => ({ file, url: URL.createObjectURL(file) }))
      setAttachments(next)
      try { const transfer = new DataTransfer(); files.forEach((file) => transfer.items.add(file)); input.files = transfer.files } catch { /* Safari keeps the selected originals if assignment is unavailable. */ }
    } catch { setAttachments([]); setError(ko ? 'JPG, PNG 또는 HEIC 사진을 선택해 주세요. 큰 HEIC 파일은 JPG로 변환 후 첨부해 주세요.' : 'Please select JPG, PNG or HEIC images. Convert large HEIC files to JPG before attaching.') }
  }
  return <fieldset className="photo-attachment"><legend>{ko ? '사진 첨부' : 'Photo Attachments'}</legend><label className="photo-upload"><span>{ko ? '+ 사진 선택' : '+ Choose Photos'}</span><input type="file" name={name} accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={choose} /></label><small>{ko ? '최대 5장 · 긴 변 1600px, 약 1MB 내외로 자동 최적화됩니다.' : 'Up to 5 images · automatically optimized to 1600px and approximately 1MB each.'}</small>{error && <p className="attachment-error">{error}</p>}{attachments.length > 0 && <div className="attachment-preview">{attachments.map(({ file, url }) => <figure key={`${file.name}-${file.lastModified}`}><img src={url} alt="" /><figcaption>{file.name}<small>{Math.max(1, Math.round(file.size / 1024))} KB</small></figcaption></figure>)}</div>}</fieldset>
}

const quickDeliveryFees = [
  ['15,000원', '서초 · 강남 · 송파 · 동작 · 광진 · 성동 · 이태원 · 한남 · 판교 · 분당 등', 'Seocho · Gangnam · Songpa · Dongjak · Gwangjin · Seongdong · Itaewon · Hannam · Pangyo · Bundang and nearby areas'],
  ['18,000원', '용산 · 마포 · 관악 · 동대문 · 왕십리 · 이촌 · 공덕 · 여의도 · 신림 · 미금 등', 'Yongsan · Mapo · Gwanak · Dongdaemun · Wangsimni · Ichon · Gongdeok · Yeouido · Sillim · Migeum and nearby areas'],
  ['20,000원', '종로 · 중구 · 영등포 · 서대문 · 홍대 · 연희 · 합정 · 망원 · 성신여대 · 길음 · 구로 · 가산 · 회기 · 신이문 · 수지 등', 'Jongno · Jung-gu · Yeongdeungpo · Seodaemun · Hongdae · Yeonhui · Hapjeong · Mangwon · Seongshin · Gireum · Guro · Gasan · Hoegi · Sinimun · Suji and nearby areas'],
  ['22,000원', '양천 · 목동 · 월계 · 수원 광교 등', 'Yangcheon · Mokdong · Wolgye · Suwon Gwanggyo and nearby areas'],
  ['25,000원', '강서 · 강북 · 연신내 등', 'Gangseo · Gangbuk · Yeonsinnae and nearby areas'],
  ['28,000원', '노원 · 도봉 · 쌍문 등', 'Nowon · Dobong · Ssangmun and nearby areas'],
]

function QuickDeliveryFeeGuide({ ko }) {
  return <div className="contact-delivery-fee-panel"><div className="fresh-delivery-fees"><h3>{ko ? '배송비' : 'Delivery Fee'}</h3><dl>{quickDeliveryFees.map(([price, areasKo, areasEn]) => <div key={price}><dt>{ko ? price : `KRW ${price.replace('원', '')}`}</dt><dd>{ko ? areasKo : areasEn}</dd></div>)}</dl><p>{ko ? '표기되지 않은 지역은 배송지 확인 후 안내드립니다.' : 'For areas not listed, the fee will be confirmed after checking the delivery address.'}</p></div><div className="fresh-delivery-benefit"><h3>{ko ? '배송비 지원' : 'Delivery Benefit'}</h3><p><strong>{ko ? '20만원 이상 주문 시 배송비 최대 15,000원 지원' : 'Orders over KRW 200,000 receive up to KRW 15,000 in delivery support.'}</strong></p><p><strong>{ko ? '30만원 이상 주문 시 배송비 최대 20,000원 지원' : 'Orders over KRW 300,000 receive up to KRW 20,000 in delivery support.'}</strong></p><small>{ko ? '주문 금액에 따라 배송비가 지원되며, 지원 금액을 초과하는 배송비는 고객님께서 부담합니다.' : 'Delivery support is applied according to the order total. Any delivery fee exceeding the supported amount is payable by the customer.'}</small></div></div>
}

function OrderInquiry({ ko, initialOrderType = 'fresh', initialProduct = '' }) {
  const [orderType, setOrderType] = useState(initialOrderType)
  const [delivery, setDelivery] = useState(initialOrderType === 'fresh' ? 'quick' : 'parcel')
  const [productName, setProductName] = useState(initialProduct)
  const changeOrderType = (value) => { setOrderType(value); setDelivery(value === 'fresh' ? 'quick' : 'parcel') }
  return <section className="order-inquiry">
    <span className="order-inquiry-title">/ Order Inquiry</span>
    <fieldset className="order-choice"><legend>{ko ? '주문 유형 *' : 'Order Type *'}</legend><div className="radio-row"><label><input required type="radio" name="orderType" value="fresh" checked={orderType === 'fresh'} onChange={() => changeOrderType('fresh')} />{ko ? '생화' : 'Fresh Flowers'}</label><label><input type="radio" name="orderType" value="artificial" checked={orderType === 'artificial'} onChange={() => changeOrderType('artificial')} />{ko ? '조화' : 'Artificial Flowers'}</label></div></fieldset>
    <div className="order-notes"><p>{ko ? '※ 생화 꽃다발은 15만 원 이상부터 주문 가능합니다.' : '※ Fresh flower bouquets are available for orders over KRW 150,000.'}</p><p>{ko ? '※ 생화 및 조화 맞춤 제작(Custom Order)은 20만 원 이상부터 진행됩니다.' : '※ Custom orders for fresh and artificial flowers are available from KRW 200,000.'}</p></div>
    <div className="order-fields">
      <label>{ko ? '문의 상품 *' : 'Product Inquiry *'}<input required name="product" value={productName} onChange={(event) => setProductName(event.target.value)} /></label>
      <label>{ko ? '예상 예산 *' : 'Estimated Budget *'}<input required name="budget" inputMode="numeric" /></label>
      <label className="full">{ko ? '선호하는 색감 및 분위기' : 'Preferred Colours & Mood'}<textarea name="colourMood" rows="2" /></label>
      <label className="full">{ko ? '요청 사항' : 'Requests'}<textarea name="requests" rows="3" /></label>
      <label>{ko ? '주문자 성함 *' : 'Orderer Name *'}<input required name="ordererName" /></label>
      <label>{ko ? '주문자 연락처 *' : 'Orderer Phone *'}<input required type="tel" name="ordererPhone" /></label>
      <label>{ko ? '받는 분 성함' : 'Recipient Name'}<input name="recipientName" /></label>
      <label>{ko ? '받는 분 연락처' : 'Recipient Phone'}<input type="tel" name="recipientPhone" /></label>
      <label className="full">{ko ? '배송 주소 *' : 'Delivery Address *'}<textarea required name="address" rows="2" /></label>
    </div>
    <div className="order-notes"><p>{ko ? '※ 배송 주소를 작성해 주시면 카카오 T 퀵 예상 배송비를 안내해 드립니다.' : '※ Enter your address to receive an estimated Kakao T Quick delivery fee.'}</p></div>
    <div className="order-fields"><label>{ko ? '희망 수령일 *' : 'Preferred Delivery Date *'}<input required type="date" name="deliveryDate" /></label></div>
    <fieldset className="delivery-choice"><legend>{ko ? '배송 방법' : 'Delivery Method'}</legend>
      <div><span>{ko ? '생화 :' : 'Fresh Flowers:'}</span><label className={orderType !== 'fresh' ? 'disabled' : ''}><input required={orderType === 'fresh'} disabled={orderType !== 'fresh'} type="radio" name="delivery" value="quick" checked={orderType === 'fresh' && delivery === 'quick'} onChange={() => setDelivery('quick')} />{ko ? '카카오 T 퀵' : 'Kakao T Quick'}</label></div>
      <div><span>{ko ? '조화 :' : 'Artificial Flowers:'}</span><label className={orderType !== 'artificial' ? 'disabled' : ''}><input required={orderType === 'artificial'} disabled={orderType !== 'artificial'} type="radio" name="delivery" value="parcel" checked={orderType === 'artificial' && delivery === 'parcel'} onChange={() => setDelivery('parcel')} />{ko ? '택배' : 'Parcel'}</label><label className={orderType !== 'artificial' ? 'disabled' : ''}><input disabled={orderType !== 'artificial'} type="radio" name="delivery" value="quick" checked={orderType === 'artificial' && delivery === 'quick'} onChange={() => setDelivery('quick')} />{ko ? '카카오 T 퀵' : 'Kakao T Quick'}</label></div>
    </fieldset>
    <div className="order-notes delivery-support"><p>{ko ? '※ 생화는 카카오 T 퀵 차량 배송만 가능합니다.' : '※ Fresh flowers are delivered by Kakao T Quick vehicle service only.'}</p><p>{ko ? '※ 조화는 상품의 크기 및 형태에 따라 배송 방법이 달라질 수 있습니다.' : '※ Delivery methods for artificial flowers may vary depending on product size and form.'}</p><p>{ko ? '※ 방문 수령은 운영하지 않습니다.' : '※ Direct collection is unavailable.'}</p><p>{ko ? '※ 20만 원 이상 주문: 배송비 최대 15,000원 지원' : '※ Orders over KRW 200,000: delivery support up to KRW 15,000'}</p><p>{ko ? '※ 30만 원 이상 주문: 배송비 최대 20,000원 지원' : '※ Orders over KRW 300,000: delivery support up to KRW 20,000'}</p></div>
    <details className="contact-delivery-fees" open><summary>/ DELIVERY <b aria-hidden="true" /></summary><div className="contact-quick-delivery-intro">{ko ? <><p>상품의 종류와 크기에 따라 택배 또는 카카오 T 퀵으로 안전하게 배송되며, 방문 수령은 운영하지 않습니다.</p><p>배송비는 배송 지역에 따라 별도로 책정됩니다.</p><p>원하시는 도착 시간을 기준으로 배송을 예약하며, 기사 배차 및 교통 상황에 따라 실제 도착 시간은 다소 앞당겨지거나 지연될 수 있습니다.</p></> : <><p>Products are delivered safely by parcel or Kakao T Quick depending on their type and size. Direct collection is unavailable.</p><p>Delivery fees are calculated separately according to the delivery area.</p><p>We schedule delivery based on your preferred arrival time, but the actual arrival may be slightly earlier or delayed depending on driver availability and traffic conditions.</p></>}</div><QuickDeliveryFeeGuide ko={ko} /></details>
    <PhotoAttachment ko={ko} name="shopPhotos" />
  </section>
}

function BrandCollaborationInquiry({ ko }) {
  const [collaborationType, setCollaborationType] = useState('wedding')
  const options = [
    ['wedding', ko ? '웨딩 & 개인 촬영' : 'Wedding & Personal Photoshoot'],
    ['content', ko ? '브랜드 콘텐츠 & 촬영' : 'Brand Content & Photoshoot'],
    ['space', ko ? '공간 & 매장 스타일링' : 'Space & Retail Styling'],
    ['event', ko ? '행사 & 이벤트 연출' : 'Event & Occasion Styling'],
  ]
  return <section className="order-inquiry brand-inquiry">
    <span className="order-inquiry-title">/ Brand Collaboration & Floral Styling</span>
    <fieldset className="order-choice square-choice"><legend>{ko ? '유형 *' : 'Type *'}</legend><div className="radio-row vertical">{options.map(([value, label]) => <label key={value}><input required={value === 'wedding'} type="radio" name="collaborationType" value={value} checked={collaborationType === value} onChange={() => setCollaborationType(value)} />{label}</label>)}</div></fieldset>
    <div className="order-fields brand-fields">
      <label className="full">{ko ? '브랜드명 / 업체명 (해당 시)' : 'Brand / Company Name (if applicable)'}<input name="brandName" /></label>
      <label className="full">{ko ? '프로젝트 내용' : 'Project Details'}<textarea name="collaborationDetails" rows="4" /></label>
      <label>{ko ? '희망 일정 *' : 'Preferred Date *'}<input required type="date" name="collaborationDate" /></label>
      <label>{ko ? '진행 장소' : 'Location'}<input name="collaborationLocation" /></label>
      <label>{ko ? '예상 예산' : 'Estimated Budget'}<input name="collaborationBudget" inputMode="numeric" /></label>
      <label className="full">{ko ? '요청 사항' : 'Additional Requests'}<textarea name="brandRequests" rows="3" /></label>
      <label>{ko ? '담당자 성함 *' : 'Contact Name *'}<input required name="brandContactName" /></label>
      <label>{ko ? '연락처 *' : 'Phone *'}<input required type="tel" name="brandPhone" /></label>
      <label className="full">{ko ? '이메일' : 'Email'}<input type="email" name="brandEmail" /></label>
    </div>
    <PhotoAttachment ko={ko} name="brandPhotos" />
  </section>
}

function WorkshopInquiry({ ko }) {
  const [workshopType, setWorkshopType] = useState('corporate')
  return <section className="order-inquiry workshop-inquiry">
    <span className="order-inquiry-title">/ Flower Workshop Inquiry</span>
    <fieldset className="order-choice square-choice"><legend>{ko ? '워크샵 유형 *' : 'Workshop Type *'}</legend><div className="radio-row"><label><input required type="radio" name="workshopType" value="corporate" checked={workshopType === 'corporate'} onChange={() => setWorkshopType('corporate')} />{ko ? '기업 / 브랜드 워크샵' : 'Corporate / Brand Workshop'}</label><label><input type="radio" name="workshopType" value="small-group" checked={workshopType === 'small-group'} onChange={() => setWorkshopType('small-group')} />{ko ? '소규모 그룹 워크샵' : 'Small Group Workshop'}</label></div></fieldset>
    <div className="order-notes"><p>{ko ? '※ 출장 워크샵은 10명 이상부터 진행 가능하며, 프로그램 구성 및 인원에 따라 견적이 산정됩니다.' : '※ On-site workshops are available for groups of 10 or more. Pricing is based on the programme and number of participants.'}</p></div>
    <div className="order-fields">
      <label className="full">{ko ? '희망 프로그램 또는 제작하고 싶은 작품' : 'Preferred Programme or Piece'}<textarea name="preferredProgramme" rows="2" /></label>
      <label>{ko ? '참여 인원 *' : 'Number of Participants *'}<input required type="number" min="1" name="participants" /></label>
      <label>{ko ? '희망 날짜 및 시간 *' : 'Preferred Date & Time *'}<input required type="datetime-local" name="workshopDate" /></label>
      <p className="field-note full">{ko ? '(평일 낮 시간 진행을 우선으로 하며, 일정에 따라 조율 가능합니다.)' : '(Weekday daytime sessions are preferred and can be coordinated depending on availability.)'}</p>
      <label className="full">{ko ? '진행 장소' : 'Location'}<input name="location" /></label>
      <p className="field-note full">{ko ? '※ 출장 진행만 가능합니다.' : '※ Workshops are available on-site only.'}</p>
      <label>{ko ? '예상 예산' : 'Estimated Budget'}<input name="workshopBudget" inputMode="numeric" /></label>
      <label className="full">{ko ? '요청 사항' : 'Requests'}<textarea name="workshopRequests" rows="3" /></label>
      <label>{ko ? '담당자 성함 *' : 'Contact Name *'}<input required name="contactName" /></label>
      <label>{ko ? '연락처 *' : 'Phone *'}<input required type="tel" name="contactPhone" /></label>
      <label className="full">{ko ? '이메일' : 'Email'}<input type="email" name="contactEmail" /></label>
    </div>
    <PhotoAttachment ko={ko} name="workshopPhotos" />
  </section>
}

function GlobalWorkshopInquiry() {
  return <section className="order-inquiry global-workshop-inquiry" lang="en">
    <span className="order-inquiry-title">/ Global Workshop Inquiry</span>
    <div className="order-fields">
      <label className="full">Organization / Name *<input required name="globalOrganization" /></label>
      <label>Contact Person *<input required name="globalContactName" /></label>
      <label>Email *<input required type="email" name="globalEmail" /></label>
      <label>Phone<input type="tel" name="globalPhone" /></label>
      <label>Country & City *<input required name="globalLocation" /></label>
      <label>Preferred Dates *<small className="label-note">(e.g. September 10–12, 2027)</small><input required name="globalDates" /></label>
      <label>Expected Participants *<input required type="number" min="1" name="globalParticipants" /></label>
      <label className="full">Workshop Venue<input name="globalVenue" /></label>
      <label className="full">Workshop Details *<small className="label-note">(Preferred program, concept, or collaboration details)</small><textarea required name="globalDetails" rows="4" /></label>
      <label>Workshop Budget<input name="globalBudget" /></label>
      <label className="full">Additional Requests<textarea name="globalRequests" rows="3" /></label>
    </div>
    <PhotoAttachment ko={false} name="globalWorkshopPhotos" />
  </section>
}

const kakaoInquiryFields = {
  Shop: [['orderType', '주문 유형', 'Order type'], ['product', '문의 상품', 'Product'], ['budget', '예상 예산', 'Estimated budget'], ['colourMood', '색감 및 분위기', 'Colours & mood'], ['requests', '요청 사항', 'Requests'], ['ordererName', '주문자 성함', 'Orderer name'], ['ordererPhone', '주문자 연락처', 'Orderer phone'], ['recipientName', '받는 분 성함', 'Recipient name'], ['recipientPhone', '받는 분 연락처', 'Recipient phone'], ['address', '배송 주소', 'Delivery address'], ['deliveryDate', '희망 수령일', 'Preferred delivery date'], ['delivery', '배송 방법', 'Delivery method']],
  Workshop: [['workshopType', '워크샵 유형', 'Workshop type'], ['preferredProgramme', '희망 프로그램 또는 작품', 'Preferred programme or piece'], ['participants', '참여 인원', 'Participants'], ['workshopDate', '희망 날짜 및 시간', 'Preferred date & time'], ['location', '진행 장소', 'Location'], ['workshopBudget', '예상 예산', 'Estimated budget'], ['workshopRequests', '요청 사항', 'Requests'], ['contactName', '담당자 성함', 'Contact name'], ['contactPhone', '연락처', 'Phone'], ['contactEmail', '이메일', 'Email']],
  'Brand Collaboration': [['collaborationType', '협업 유형', 'Collaboration type'], ['brandName', '브랜드명 / 업체명', 'Brand / company'], ['collaborationDetails', '프로젝트 내용', 'Project details'], ['collaborationDate', '희망 일정', 'Preferred date'], ['collaborationLocation', '진행 장소', 'Location'], ['collaborationBudget', '예상 예산', 'Estimated budget'], ['brandRequests', '요청 사항', 'Requests'], ['brandContactName', '담당자 성함', 'Contact name'], ['brandPhone', '연락처', 'Phone'], ['brandEmail', '이메일', 'Email']],
  'Global Workshop': [['globalOrganization', 'Organization / Name', 'Organization / Name'], ['globalContactName', 'Contact Person', 'Contact Person'], ['globalEmail', 'Email', 'Email'], ['globalPhone', 'Phone', 'Phone'], ['globalLocation', 'Country & City', 'Country & City'], ['globalDates', 'Preferred Dates', 'Preferred Dates'], ['globalParticipants', 'Expected Participants', 'Expected Participants'], ['globalVenue', 'Workshop Venue', 'Workshop Venue'], ['globalDetails', 'Workshop Details', 'Workshop Details'], ['globalBudget', 'Workshop Budget', 'Workshop Budget'], ['globalRequests', 'Additional Requests', 'Additional Requests']],
  Other: [['name', '이름', 'Name'], ['email', '이메일', 'Email'], ['phone', '연락처', 'Phone'], ['message', '문의 내용', 'Message']],
}
const kakaoTypeNames = {
  Shop: ['샵 주문', 'Shop Order'], Workshop: ['플라워 워크샵', 'Flower Workshop'], 'Brand Collaboration': ['브랜드 협업 & 플라워 스타일링', 'Brand Collaboration & Floral Styling'], 'Global Workshop': ['Global Workshop', 'Global Workshop'], Other: ['기타', 'Other'],
}
const kakaoValueNames = { fresh: ['생화', 'Fresh Flowers'], artificial: ['조화', 'Artificial Flowers'], quick: ['카카오 T 퀵', 'Kakao T Quick'], parcel: ['택배', 'Parcel'], corporate: ['기업 / 브랜드 워크샵', 'Corporate / Brand Workshop'], 'small-group': ['소규모 그룹 워크샵', 'Small Group Workshop'], wedding: ['웨딩 & 개인 촬영', 'Wedding & Personal Photoshoot'], content: ['브랜드 콘텐츠 & 촬영', 'Brand Content & Photoshoot'], space: ['공간 & 매장 스타일링', 'Space & Retail Styling'], event: ['행사 & 이벤트 연출', 'Event & Occasion Styling'] }

function KakaoInquiryBridge({ formRef, type, ko }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => setCopied(false), [type])
  const copyInquiry = async () => {
    const form = formRef.current; if (!form) return
    const data = new FormData(form); const langIndex = ko ? 0 : 1; const empty = ko ? '미입력' : 'Not entered'
    const lines = kakaoInquiryFields[type].map(([name, labelKo, labelEn]) => {
      const raw = String(data.get(name) || '').trim(); const translated = kakaoValueNames[raw]?.[langIndex] || raw
      return `${ko ? labelKo : labelEn}: ${translated || empty}`
    })
    const photoCount = [...form.querySelectorAll('input[type="file"]')].reduce((sum, input) => sum + (input.files?.length || 0), 0)
    if (photoCount) lines.push(`${ko ? '참고 사진' : 'Reference photos'}: ${photoCount}${ko ? '장 (채팅창에 별도 첨부)' : ' (attach separately in chat)'}`)
    const title = kakaoTypeNames[type][langIndex]
    const text = `[MAYFLEUR · ${title} ${ko ? '문의' : 'Inquiry'}]\n\n${lines.join('\n')}\n\n${ko ? '위 내용으로 문의드립니다.' : 'I would like to inquire with the details above.'}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const area = document.createElement('textarea'); area.value = text; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove()
    }
    setCopied(true)
  }
  return <section className="kakao-inquiry-bridge"><div><span className="eyebrow">Kakao Inquiry</span><h3>{ko ? `${kakaoTypeNames[type][0]} 문의를 카카오톡으로 보내기` : `Send Your ${kakaoTypeNames[type][1]} Inquiry via Kakao`}</h3><p>{ko ? '작성한 문의 내용이 카카오톡용 형식으로 정리됩니다. 내용을 복사한 뒤 카카오채널을 열어 채팅창에 붙여넣어 주세요.' : 'Your form details will be organized for KakaoTalk. Copy them, open our Kakao Channel, and paste them into the chat.'}</p><small>{ko ? '사진은 카카오톡 채팅창에서 별도로 첨부해 주세요.' : 'Please attach photos separately in the KakaoTalk chat.'}</small></div><div className="kakao-inquiry-actions"><button className={`button${copied ? ' copied' : ''}`} type="button" onClick={copyInquiry}>{copied ? (ko ? '복사 완료 ✓' : 'Copied ✓') : (ko ? '문의 내용 복사' : 'Copy Inquiry')}</button><a className="button kakao-open-button" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">{ko ? '카카오채널 열기' : 'Open Kakao Channel'} →</a></div></section>
}

function Contact({ lang, detail = [] }) {
  const ko = lang === 'ko'; const contactType = detail[0] === 'brand-collaboration' ? 'Brand Collaboration' : detail[0] === 'workshop' ? 'Workshop' : detail[0] === 'global-workshop' ? 'Global Workshop' : 'Shop'; const [sent, setSent] = useState(false); const [type, setType] = useState(contactType); const formRef = useRef(null)
  const initialOrderType = detail[0] === 'artificial' ? 'artificial' : 'fresh'
  const initialProduct = detail.slice(1).join(' ')
  useEffect(() => setType(contactType), [contactType])
  return <div className="page fade-in contact-page"><PageHead eyebrow={`— ${ko ? '문의' : 'Contact'}`} title={ko ? '문의하기' : 'Get in Touch'} sub={ko ? '프로젝트, 공간 또는 문의 내용을 알려주세요 — 모든 메시지를 정성껏 읽습니다.' : 'Tell us about your project, space, or inquiry — we read every message.'} />
    <section className="contact-grid container">{sent ? <div className="thanks"><span>✽</span><h2>{ko ? '감사합니다.' : 'Thank you.'}</h2><p>{ko ? '메시지가 접수되었습니다. 곧 연락드리겠습니다.' : 'Your message has been received. We will be in touch soon.'}</p><button className="text-link" onClick={() => setSent(false)}>{ko ? '새 문의 작성' : 'Write another message'}</button></div> : <form ref={formRef} encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
        <fieldset><legend>{ko ? '문의 유형' : 'Inquiry Type'}</legend><div className="type-buttons">{[['Shop','Shop','샵'], ['Workshop','Flower Workshop','플라워워크샵'], ['Brand Collaboration','Brand Collaboration & Floral Styling','브랜드 협업 & 플라워 스타일링'], ['Global Workshop','Global Workshop','Global Workshop'], ['Other','Other','기타']].map(([item, en, kr]) => <button type="button" className={type === item ? 'active' : ''} onClick={() => setType(item)} key={item}>{ko ? kr : en}</button>)}</div></fieldset>
        {type === 'Shop' ? <OrderInquiry ko={ko} initialOrderType={initialOrderType} initialProduct={initialProduct} /> : type === 'Workshop' ? <WorkshopInquiry ko={ko} /> : type === 'Global Workshop' ? <GlobalWorkshopInquiry /> : type === 'Brand Collaboration' ? <BrandCollaborationInquiry ko={ko} /> : <><label>{ko ? '이름' : 'Name'}<input required name="name" placeholder={ko ? '성함' : 'Your name'} /></label><label>Email<input required type="email" name="email" placeholder="you@email.com" /></label><label>{ko ? '연락처' : 'Phone'}<input required type="tel" name="phone" placeholder={ko ? '연락 가능한 번호' : 'Your phone number'} /></label><label>{ko ? '메시지' : 'Message'}<textarea required name="message" rows="6" placeholder={ko ? '문의 내용을 입력해 주세요.' : 'Write your message…'} /></label><PhotoAttachment ko={ko} name="inquiryPhotos" /></>}
        <button className="button primary contact-submit" type="submit">{ko ? '문의 보내기' : 'Send Inquiry'}</button>
      </form>}
      <aside><span className="eyebrow">{ko ? '직접 연락하기' : 'Or reach us directly'}</span><div><small>Kakao Channel</small><a className="kakao-contact-link" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label={ko ? '메이플레르 카카오채널 열기' : 'Open Mayfleur Kakao Channel'}><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="14" /><path d="M13 14.5h22a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H23l-7.5 5v-5H13a5 5 0 0 1-5-5v-10a5 5 0 0 1 5-5Z" /><text x="24" y="28.5" textAnchor="middle">Ch</text></svg></a></div><KakaoInquiryBridge formRef={formRef} type={type} ko={ko} /><div><small>Instagram</small><a href="https://www.instagram.com/may.fleur" target="_blank" rel="noreferrer">@may.fleur</a></div><div><small>Email</small><a href="mailto:mayfleurstudio@gmail.com">mayfleurstudio@gmail.com</a></div><div><small>Based</small><span>Seoul · Korea</span></div></aside></section>
  </div>
}

function KakaoChannelButton({ lang }) {
  return <a className="kakao-channel-button" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label={lang === 'ko' ? '메이플레르 카카오채널 열기' : 'Open Mayfleur Kakao Channel'}><span className="kakao-channel-icon" aria-hidden="true" /><span>{lang === 'ko' ? '카카오 문의' : 'Kakao Chat'}</span></a>
}

function App() {
  const route = useRoute(); const routeKey = route.join('/'); const policyPages = ['terms', 'privacy', 'shipping-policy']; const page = NAV.some(([id]) => id === route[0]) || policyPages.includes(route[0]) ? route[0] : 'home'
  const [lang, setLang] = useState(() => localStorage.getItem('mayfleur-lang') || (navigator.language.startsWith('ko') ? 'ko' : 'en'))
  useEffect(() => { localStorage.setItem('mayfleur-lang', lang); document.documentElement.lang = lang }, [lang])
  const content = useMemo(() => ({
    home: <Home lang={lang} />, shop: <Shop lang={lang} detail={route[1]} />, about: <About lang={lang} />,
    gallery: <Gallery lang={lang} detail={route[1]} />, portfolio: <Portfolio lang={lang} detail={route[1]} />,
    services: <Services lang={lang} />, books: <Books lang={lang} />, contact: <Contact lang={lang} detail={route.slice(1)} />,
    terms: <PolicyPage lang={lang} type="terms" />, privacy: <PolicyPage lang={lang} type="privacy" />, 'shipping-policy': <PolicyPage lang={lang} type="shipping" />,
  }), [page, routeKey, lang])
  return <><Header page={page} lang={lang} setLang={setLang} /><main>{content[page]}</main><Footer lang={lang} /><KakaoChannelButton lang={lang} /></>
}

export default App
