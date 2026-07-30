import { useEffect, useMemo, useState } from 'react'
import manifest from './data/content-manifest.json'
import mayfleurLogo from './assets/mayfleur-logo.png'

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
}

const shopInquiryTemplate = {
  ko: `생화

□ 카카오 T 퀵

조화

□ 택배
□ 카카오 T 퀵

※ 생화는 카카오 T 퀵 배송만 가능합니다.

※ 카카오 T 퀵 배송비 지원

20만 원 이상 주문 시 최대 10,000원 지원
30만 원 이상 주문 시 최대 20,000원 지원`,
  en: `Fresh Flowers

□ Kakao T Quick

Artificial Flowers

□ Parcel Delivery
□ Kakao T Quick

※ Fresh flowers are available through Kakao T Quick delivery only.

※ Kakao T Quick delivery support

Orders over KRW 200,000: up to KRW 10,000
Orders over KRW 300,000: up to KRW 20,000`,
}

const orderGuide = {
  ko: {
    intro: ['모든 작품은 주문 후 제작되는 핸드메이드 플라워 오브제입니다.', '주문 전 상품 상세 페이지의 Order Guide를 확인해 주세요.'],
    sections: [
      ['01 | Design & Production', [
        '모든 작품은 주문 후 제작되는 핸드메이드 플라워 오브제입니다.',
        '제작 기간은 평균 7~15일 정도 소요됩니다.',
        '주문 전 상담을 통해 원하시는 색감과 무드를 반영하여 제작합니다.',
        '상품 이미지는 샘플 작품이며, 조화 및 화기는 수급 상황에 따라 유사한 소재로 대체될 수 있습니다. 전체적인 색감과 분위기를 유지하여 제작됩니다.',
        '기존 디자인의 구조를 유지하는 범위 내에서 일부 꽃 소재 및 색상 변경이 가능합니다.',
        '완성 후 출고 전 최종 확인 이미지를 전달드립니다.',
      ]],
      ['02 | Delivery', [
        '대부분의 작품은 전국 택배 발송이 가능합니다.',
        '세라믹 화기, 토분 등 파손 위험이 높은 일부 작품은 서울·경기 지역에 한하여 카카오 T 퀵(차량 배송)으로 진행됩니다.',
        '퀵 배송비는 지역에 따라 상이하며,\n20만 원 이상 주문 시 최대 10,000원,\n30만 원 이상 주문 시 최대 20,000원까지 지원해 드립니다.',
      ]],
      ['03 | Order & Cancellation Policy', [
        '모든 작품은 고객님의 주문에 맞춰 제작되는 주문 제작 상품입니다.',
        '주문 확정 후 고객님만을 위한 소재 준비 및 제작이 시작되므로, 제작 시작 이후에는 단순 변심에 의한 주문 취소·교환·환불이 어렵습니다.',
        '제품 이상이 있는 경우에는 수령 후 7일 이내 문의해 주시면 확인 후 안내드립니다.',
      ]],
      ['04 | Product Guide', [
        '모든 작품은 플로리스트가 직접 제작하는 핸드메이드 오브제로, 형태와 배치는 작품마다 조금씩 다를 수 있습니다.',
        '조화 특성상 미세한 프린팅 차이, 점, 접착 흔적 등이 있을 수 있으며 이는 불량이 아닙니다.',
        '배송 과정에서 일부 소재가 분리될 수 있으나 대부분 간단히 재정리하여 사용 가능합니다.',
        '모니터 환경에 따라 실제 색상은 다소 차이가 있을 수 있습니다.',
      ]],
    ],
  },
  en: {
    intro: ['Every piece is a handmade floral object created after your order is placed.', 'Please review the Order Guide on the product detail page before ordering.'],
    sections: [
      ['01 | Design & Production', [
        'Every piece is a handmade floral object created after your order is placed.',
        'Production typically takes approximately 7–15 days.',
        'Your preferred colour palette and mood can be discussed before production.',
        'Product images show sample pieces. Artificial flowers and vessels may be replaced with similar materials depending on availability while preserving the overall palette and mood.',
        'Selected flower materials and colours may be adjusted while maintaining the structure of the original design.',
        'A final confirmation image will be sent before dispatch.',
      ]],
      ['02 | Delivery', [
        'Most pieces can be shipped nationwide within Korea.',
        'Selected pieces with a higher risk of damage, including ceramic vessels and terracotta pots, are delivered within Seoul and Gyeonggi via Kakao T Quick vehicle delivery.',
        'Quick-delivery fees vary by location.\nOrders over KRW 200,000 receive support of up to KRW 10,000, and orders over KRW 300,000 receive support of up to KRW 20,000.',
      ]],
      ['03 | Order & Cancellation Policy', [
        'Every piece is made to order for each customer.',
        'Materials are prepared and production begins after confirmation, so cancellations, exchanges and refunds for a change of mind are not available once production has started.',
        'If there is an issue with your product, please contact us within seven days of receipt.',
      ]],
      ['04 | Product Guide', [
        'Each piece is handmade by a florist, so form and placement may vary slightly.',
        'Minor printing differences, marks or traces of adhesive can occur with artificial flowers and are not considered defects.',
        'Some materials may shift during delivery and can usually be arranged easily by hand.',
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
const under = (prefix) => manifest.files.filter((file) => file.startsWith(prefix))
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
const galleryGroups = {
  works: numericMediaSort(under('04 Gallery/Floral Works/')),
  spaces: numericMediaSort(under('04 Gallery/Space Styling/')),
}
const bookFiles = imagesOnly(under('07 Books/'))

const shopCategories = directFolders('02 Shop/', 1)
  .filter((name) => categoryNames[cleanFolderName(name)])
  .map((name) => ({
    raw: name,
    name: cleanFolderName(name),
    products: directFolders(`02 Shop/${name}/`, 2).map((product) => ({
      raw: product, name: cleanFolderName(product), category: cleanFolderName(name),
      media: numericMediaSort(under(`02 Shop/${name}/${product}/`)),
    })).filter((product) => product.media.length),
  }))

const shopProducts = shopCategories.flatMap((category) => category.products)
const portfolioProjects = directFolders('05 Portfolio/', 1)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((name) => ({
    raw: name, name: cleanFolderName(name), media: numericMediaSort(under(`05 Portfolio/${name}/`)),
  }))
const serviceOrder = ['Floral Styling', 'Brand Collaboration', 'Corporate Workshops', 'Global Workshops']
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

function Shop({ lang, detail }) {
  const ko = lang === 'ko'
  const current = detail ? shopProducts.find((p) => slug(p.name) === detail) : null
  const [category, setCategory] = useState('all')
  if (current) return <ProductDetail product={current} lang={lang} />
  const products = category === 'all' ? shopProducts : shopProducts.filter((p) => slug(p.category) === category)
  return <div className="page fade-in shop-page">
    <PageHead eyebrow={`— ${ko ? '샵' : 'Shop'}`} title={ko ? '조화 컬렉션' : 'Artificial Flower Collection'} />
    <section className="shop-layout container">
      <aside className="shop-filter"><span className="eyebrow">{ko ? '카테고리' : 'Browse'}</span><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>{ko ? '전체' : 'All'}<span>{shopProducts.length}</span></button>{shopCategories.map((cat) => <button key={cat.name} className={category === slug(cat.name) ? 'active' : ''} onClick={() => setCategory(slug(cat.name))}>{categoryNames[cat.name]?.[ko ? 1 : 0] || cat.name}<span>{cat.products.length}</span></button>)}</aside>
      <div className="product-grid">{products.map((product) => <a href={`#shop/${slug(product.name)}`} className="product-card" key={product.name}><div className="card-media"><Media file={imagesOnly(product.media)[0]} alt={product.name} /></div><span className="card-kicker">{categoryNames[product.category]?.[ko ? 1 : 0]}</span><h3>{product.name}</h3><p>{ko ? '주문 제작 · 상담 후 안내' : 'Made to order · Price on request'}</p></a>)}</div>
    </section>
    <ProductGuide lang={lang} />
    <section className="paper-panel custom-order"><div><span className="rule" /><h2>{ko ? '맞춤 플로럴 작품을 찾고 계신가요?' : 'Looking for a custom floral piece?'}</h2><p>{ko ? '공간과 행사, 원하시는 색감을 알려주세요. 메이플레르의 감각으로 맞춤 제작합니다.' : 'Tell us about your space, occasion and palette. We design bespoke arrangements to order.'}</p><a className="button primary" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">Custom Order Inquiry</a></div></section>
    <section className="fresh-collection container"><div><span className="coming-label">{ko ? '준비 중' : 'Coming Soon'}</span><h2>{ko ? '생화 컬렉션' : 'Fresh Flower Collection'}</h2><p>{ko ? '계절의 생화 어레인지먼트가 곧 준비됩니다. 가장 먼저 소식을 받아보세요.' : 'Seasonal fresh flower arrangements are arriving soon. Join us to be the first to know.'}</p></div><Media file={selectedWorks[0]} alt="Fresh flower collection" /></section>
  </div>
}

function ProductDetail({ product, lang }) {
  const ko = lang === 'ko'; const media = product.media; const guide = orderGuide[lang]
  return <div className="page fade-in product-detail container"><a className="back" href="#shop">← {ko ? '샵으로 돌아가기' : 'Back to Shop'}</a>
    <section className="product-order-notice"><span className="eyebrow">— Mayfleur Order Guide</span><div>{guide.intro.map((line) => <p key={line}>{line}</p>)}</div></section>
    <div className="detail-top"><div className="detail-main"><Media file={media[0]} alt={product.name} eager /></div><div className="detail-copy"><span className="eyebrow">{categoryNames[product.category]?.[ko ? 1 : 0]}</span><h1>{product.name}</h1><p className="detail-price">{ko ? '가격 및 제작 상담' : 'Price & production on request'}</p><p>{ko ? '프리미엄 조화를 사용하여 꽃의 자연스러운 형태와 색감, 결을 섬세하게 담아냅니다. 모든 작품은 주문 후 플로리스트가 직접 제작합니다.' : 'Made with premium artificial flowers to preserve natural form, colour and texture. Every piece is designed and handcrafted to order.'}</p><dl><div><dt>{ko ? '제작 기간' : 'Production'}</dt><dd>{ko ? '평균 7–15일' : 'Approximately 7–15 days'}</dd></div><div><dt>{ko ? '구성' : 'Design'}</dt><dd>{ko ? '색상 및 일부 소재 상담 가능' : 'Colour and selected materials customisable'}</dd></div></dl><a className="button primary" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">{ko ? '카카오채널 주문 문의' : 'Order via Kakao'}</a></div></div>
    <div className="detail-gallery">{media.slice(1).map((file, i) => <figure className="detail-gallery-item" key={file}><Media file={file} alt={`${product.name} detail ${i + 2}`} /></figure>)}</div>
    <OrderGuide guide={guide} />
  </div>
}

function OrderGuide({ guide }) {
  return <section className="product-order-guide"><span className="eyebrow">/ Order Guide</span>{guide.sections.map(([title, items]) => <article key={title}><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</section>
}

function ProductGuide({ lang }) {
  const ko = lang === 'ko'
  const items = ko ? [
    ['주문 제작', '모든 작품은 주문 후 제작되는 핸드메이드 오브제이며 평균 제작 기간은 7–15일입니다.'],
    ['디자인 안내', '전체적인 색감과 무드를 유지하는 범위에서 소재가 대체될 수 있으며 일부 색상 변경은 사전 협의가 가능합니다.'],
    ['배송', '조화 상품은 전국 택배가 가능하며, 일부 센터피스(세라믹·도자기)는 서울·경기 지역에 한해 차량 배송으로 진행합니다.'],
    ['교환 및 환불', '주문 제작 특성상 제작 시작 이후 단순 변심에 의한 교환·환불은 어렵습니다.'],
  ] : [
    ['Made to order', 'Every piece is handcrafted after confirmation. Production typically takes 7–15 days.'],
    ['Design notes', 'Materials may be substituted while retaining the overall palette and mood. Selected colour changes can be discussed.'],
    ['Delivery', 'Bouquets, vase arrangements and wreaths ship nationwide. Centerpieces and baskets require vehicle delivery.'],
    ['Returns', 'As each piece is made to order, cancellations and returns are unavailable once production begins.'],
  ]
  return <section className="guide container"><SectionTitle eyebrow="Collection Guide" title={ko ? '주문 전 확인해 주세요' : 'Before placing your order'} /><div>{items.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
}

function About({ lang }) {
  const ko = lang === 'ko'
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
  return <div className="page fade-in about-page"><section className="about-banner container"><Media file={storyPhotos[1]} alt="Mayfleur story" eager /></section><PageHead eyebrow={`— ${ko ? '소개' : 'About'}`} title="Our Story" sub={ko ? '메이플레르는 꽃과 그 꽃을 빚어내는 계절에 대한 순수한 애정에서 시작되었습니다. 자연의 색, 고요한 구성, 그리고 꽃이 일상에 따뜻함을 더해야 한다는 믿음이 우리의 철학입니다.' : 'Mayfleur began with a simple devotion to flowers and the seasons that shape them. Our philosophy is rooted in natural colour, quiet composition, and the belief that flowers should bring warmth to everyday life.'} />
    <section className="about-story-photos container"><Media file={storyPhotos[0]} alt="Mayfleur studio" /><Media file={storyPhotos[3]} alt="Flowers in the studio" /></section>
    <section className="philosophy"><span className="rule" /><span className="eyebrow">{ko ? '브랜드 철학' : 'Brand Philosophy'}</span><p>{ko ? '자연에서 길어 올린, 시간을 초월한 플로럴 디자인 — 일상의 공간에 따뜻함과 아름다움을 더합니다.' : 'Timeless floral design, drawn from nature — created to bring warmth and beauty to everyday spaces.'}</p></section>
    <section className="profile container"><div className="profile-image"><Media file={profilePhoto} alt="Yeajin Kim" /></div><div className="profile-copy"><span className="eyebrow">Profile</span><h2>{ko ? '김예진' : 'Yeajin Kim'}</h2><p className="profile-role">Floral Artist, Author & Educator</p><p>Founder of Mayfleur · Based in Korea</p><div className="credentials">{profileCredentials.map((section) => <Credential key={section.title} {...section} />)}</div></div></section>
  </div>
}

function Credential({ title, items }) { return <section className="credential-section"><h3>{title}</h3><ul className="credential-list">{items.map((item) => { const entry = typeof item === 'string' ? { name: item } : item; return <li key={`${entry.name}-${entry.meta || ''}`}><span>{entry.name}</span>{entry.meta && <small className={entry.status ? `status ${entry.status}` : ''}>{entry.meta}</small>}</li> })}</ul></section> }

function Gallery({ lang }) {
  const ko = lang === 'ko'; const [filter, setFilter] = useState('all'); const [limit, setLimit] = useState(60); const [selected, setSelected] = useState(null)
  const alternateRows = (first, second, rowSize = 4) => {
    const rows = Math.max(Math.ceil(first.length / rowSize), Math.ceil(second.length / rowSize))
    return Array.from({ length: rows }, (_, i) => [
      ...first.slice(i * rowSize, (i + 1) * rowSize),
      ...second.slice(i * rowSize, (i + 1) * rowSize),
    ]).flat()
  }
  const list = filter === 'all' ? alternateRows(galleryGroups.spaces, galleryGroups.works) : galleryGroups[filter]
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
    <section className="container"><div className="filter-chips">{[['all', ko ? '전체' : 'All'], ['works', ko ? '플로럴 작품' : 'Floral Works'], ['spaces', ko ? '공간 스타일링' : 'Space Styling']].map(([id, text]) => <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{text}</button>)}</div>
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
    <section className="services container">{services.map((service, i) => { const copy = serviceCopy[service.name]; const photos = imagesOnly(service.media); return <article key={service.name} className="service"><div className="service-copy"><div className="service-heading"><span className="service-no">0{i + 1}</span><h2>{service.name}</h2></div><p>{copy?.[lang] || copy?.en}</p>{copy?.listTitle && <span className="service-list-title">{copy.listTitle}</span>}<div className="service-list">{copy?.list.map((item) => <span key={item}>{item}</span>)}</div><a className="button ghost" href="#contact">{service.name === 'Global Workshops' ? 'Host Inquiry' : 'Inquiry'}</a></div><div className="service-images">{photos.slice(0, 4).map((file) => <Media key={file} file={file} alt={service.name} />)}</div></article>})}</section>

  </div>
}

function Books({ lang }) {
  const ko = lang === 'ko'; const books = [
    { title: ko ? '메이플레르 플라워 클래스' : 'Mayfleur Flower Class', year: '2020', file: bookFiles.find((x) => x.toLowerCase().endsWith('.jpg')) },
    { title: ko ? '꽃은 나에게 마음의 숲이 되어주었다' : 'Flowers Became My Forest', year: '2024', file: bookFiles.find((x) => x.toLowerCase().endsWith('.png')) },
  ]
  return <div className="page fade-in books-page"><PageHead title={ko ? '도서' : 'Books'} />
    <section className="books container">{books.map((book) => <article key={book.year}><div className="book-cover"><Media file={book.file} alt={`${book.title} cover`} /></div><div><span className="eyebrow">Published · {book.year}</span><h2>{book.title}</h2><a className="text-link" href="#contact">{ko ? '구매 문의' : 'Where to buy'} →</a></div></article>)}</section>
  </div>
}

function Contact({ lang }) {
  const ko = lang === 'ko'; const [sent, setSent] = useState(false); const [type, setType] = useState('Shop'); const [messages, setMessages] = useState(() => ({ Shop: shopInquiryTemplate[lang] }))
  useEffect(() => setMessages((current) => {
    const existing = current.Shop
    if (existing === shopInquiryTemplate.ko || existing === shopInquiryTemplate.en) return { ...current, Shop: shopInquiryTemplate[lang] }
    return current
  }), [lang])
  return <div className="page fade-in contact-page"><PageHead eyebrow={`— ${ko ? '문의' : 'Contact'}`} title={ko ? '문의하기' : 'Get in Touch'} sub={ko ? '프로젝트, 공간 또는 문의 내용을 알려주세요 — 모든 메시지를 정성껏 읽습니다.' : 'Tell us about your project, space, or inquiry — we read every message.'} />
    <section className="contact-grid container">{sent ? <div className="thanks"><span>✽</span><h2>{ko ? '감사합니다.' : 'Thank you.'}</h2><p>{ko ? '메시지가 접수되었습니다. 곧 연락드리겠습니다.' : 'Your message has been received. We will be in touch soon.'}</p><button className="text-link" onClick={() => setSent(false)}>{ko ? '새 문의 작성' : 'Write another message'}</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}><label>{ko ? '이름' : 'Name'}<input required name="name" placeholder={ko ? '성함' : 'Your name'} /></label><label>Email<input required type="email" name="email" placeholder="you@email.com" /></label><fieldset><legend>{ko ? '문의 유형' : 'Inquiry Type'}</legend><div className="type-buttons">{[['Shop','샵'], ['Workshop','워크샵'], ['Brand Collaboration','브랜드 협업'], ['Styling','스타일링'], ['Other','기타']].map(([item, kr]) => <button type="button" className={type === item ? 'active' : ''} onClick={() => setType(item)} key={item}>{ko ? kr : item}</button>)}</div></fieldset><label>{ko ? '메시지' : 'Message'}<textarea required name="message" rows={type === 'Shop' ? 16 : 6} className={type === 'Shop' ? 'shop-message-template' : ''} value={messages[type] || ''} onChange={(event) => setMessages((current) => ({ ...current, [type]: event.target.value }))} placeholder={ko ? '문의 내용을 입력해 주세요.' : 'Write your message…'} /></label><button className="button primary" type="submit">{ko ? '메시지 보내기' : 'Send Message'}</button></form>}
      <aside><span className="eyebrow">{ko ? '직접 연락하기' : 'Or reach us directly'}</span><div><small>Kakao Channel</small><a className="kakao-contact-link" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label={ko ? '메이플레르 카카오채널 열기' : 'Open Mayfleur Kakao Channel'}><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="14" /><path d="M13 14.5h22a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H23l-7.5 5v-5H13a5 5 0 0 1-5-5v-10a5 5 0 0 1 5-5Z" /><text x="24" y="28.5" textAnchor="middle">Ch</text></svg></a></div><div><small>Instagram</small><a href="https://www.instagram.com/may.fleur" target="_blank" rel="noreferrer">@may.fleur</a></div><div><small>Email</small><a href="mailto:mayfleurstudio@gmail.com">mayfleurstudio@gmail.com</a></div><div><small>Based</small><span>Seoul · Korea</span></div></aside></section>
  </div>
}

function KakaoChannelButton({ lang }) {
  return <a className="kakao-channel-button" href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label={lang === 'ko' ? '메이플레르 카카오채널 열기' : 'Open Mayfleur Kakao Channel'}><span className="kakao-channel-icon" aria-hidden="true" /><span>{lang === 'ko' ? '카카오 문의' : 'Kakao Chat'}</span></a>
}

function App() {
  const route = useRoute(); const page = NAV.some(([id]) => id === route[0]) ? route[0] : 'home'
  const [lang, setLang] = useState(() => localStorage.getItem('mayfleur-lang') || (navigator.language.startsWith('ko') ? 'ko' : 'en'))
  useEffect(() => { localStorage.setItem('mayfleur-lang', lang); document.documentElement.lang = lang }, [lang])
  const content = useMemo(() => ({
    home: <Home lang={lang} />, shop: <Shop lang={lang} detail={route[1]} />, about: <About lang={lang} />,
    gallery: <Gallery lang={lang} />, portfolio: <Portfolio lang={lang} detail={route[1]} />,
    services: <Services lang={lang} />, books: <Books lang={lang} />, contact: <Contact lang={lang} />,
  }), [page, route[1], lang])
  return <><Header page={page} lang={lang} setLang={setLang} /><main>{content[page]}</main><Footer lang={lang} /><KakaoChannelButton lang={lang} /></>
}

export default App
