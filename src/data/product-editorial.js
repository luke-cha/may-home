const t = (ko, en = ko) => ({ ko, en })
const CARD_LINES = t(['프리미엄 플라워 오브제', '주문 제작 상품'], ['Premium Floral Object', 'Made to Order'])
const ARTIFICIAL = t('Premium Artificial Flowers')
const HANDMADE = t('Handmade Floral Arrangement')

const OBJECT_ABOUT = t([
  '메이플레르의 플라워 오브제는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 움직임과 섬세한 컬러감을 담아 제작합니다.',
  '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여 오래도록 감상할 수 있는 플라워 오브제로 완성합니다.',
], [
  'Mayfleur floral objects are crafted with premium artificial flowers to capture the natural movement and delicate colour of fresh blooms.',
  'Every stem is arranged with careful attention to direction and balance, creating a floral object designed to be enjoyed for years.',
])
const CENTER_FACING = t([
  '정면에서 가장 아름다운 실루엣이 보이도록 디자인한 센터피스입니다.',
  '정면의 풍성한 볼륨감을 중심으로 디자인하며, 뒤쪽에도 자연스러운 소재를 더해 어느 방향에서도 입체감을 느낄 수 있도록 제작합니다.',
  '벽면이나 테이블 한쪽 방향에 배치했을 때 가장 아름다운 형태가 돋보이는 디자인입니다.',
], [
  'This centrepiece is designed to present its most beautiful silhouette from the front.',
  'Generous frontal volume is balanced with natural materials at the back, giving the piece dimension from every angle.',
  'Its form is best appreciated against a wall or styled toward one side of a table.',
])
const CENTER_SPACES = t([
  '거실 테이블 장식', '다이닝 테이블 센터피스', '카페 및 쇼룸 스타일링', '웨딩 테이블 장식', '백화점 및 브랜드 공간 연출', '행사 및 공간 스타일링',
], [
  'Living room table styling', 'Dining table centrepiece', 'Café and showroom styling', 'Wedding table decoration', 'Department store and brand spaces', 'Events and spatial styling',
])
const VEHICLE_DELIVERY = t([
  '화기의 형태와 작품 보호를 위해 일반 택배 발송이 어렵습니다.',
  '서울·경기 지역은 카카오 T 퀵(자동차 배송)으로 안전하게 배송됩니다.',
], [
  'Standard parcel shipping is unavailable due to the vessel shape and the need to protect the piece.',
  'Orders within Seoul and Gyeonggi are delivered safely via Kakao T Quick vehicle delivery.',
])
const PARCEL_DELIVERY = t([
  '전국 택배 발송이 가능하며, 기본 택배 배송은 무료입니다.',
  '퀵 배송을 원하시는 경우 카카오 T 퀵 차량 배송으로 진행되며, 배송비는 지역별 안내를 확인해 주세요.',
  '상품은 완성된 형태를 최대한 유지할 수 있도록 꼼꼼하게 포장하여 안전하게 발송합니다.',
  '배송 과정에서 흔들림으로 인해 일부 소재의 위치가 변동되거나, 드물게 작은 소재가 분리될 수 있습니다. 이 경우 손으로 가볍게 방향을 정리하거나 분리된 소재를 원래 위치에 다시 꽂아주시면 자연스러운 형태로 연출하실 수 있습니다.',
], [
  'Nationwide parcel delivery is available within Korea, and standard parcel shipping is free of charge.',
  'If you prefer Quick delivery, your order will be sent by Kakao T Quick vehicle service. Please refer to the regional delivery fees below.',
  'Each product is packed carefully and shipped safely to preserve its completed form as much as possible.',
  'Some materials may shift or occasionally detach due to movement during transit. In this case, gently adjust their direction or reinsert detached materials in their original position to restore the natural form.',
])
const OBJECT_CUSTOM = t([
  '메이플레르의 디자인과 컬러 무드를 유지하는 범위 내에서 일부 화기 또는 꽃 컬러의 소폭 조정이 가능합니다.',
  '전체적인 디자인 변경이나 새로운 구성의 제작은 Custom Order를 통해 별도로 상담 가능합니다.',
], [
  'Selected vessel or flower colours can be adjusted while preserving Mayfleur’s design and colour mood.',
  'Significant design changes or entirely new compositions are available through a separate Custom Order consultation.',
])
const FLOWER_CUSTOM = t([
  '메이플레르의 디자인과 컬러 무드를 유지하는 범위 내에서 일부 꽃 컬러 또는 포장 컬러의 소폭 조정이 가능합니다.',
  '전체적인 디자인 변경이나 새로운 구성의 제작은 Custom Order를 통해 별도로 상담 가능합니다.',
], [
  'Selected flower or wrapping colours can be adjusted while preserving Mayfleur’s design and colour mood.',
  'Significant design changes or entirely new compositions are available through a separate Custom Order consultation.',
])
const VESSEL_OPTION = t([
  '현재 이미지 속 화기는 재고 소진으로 동일 화기로 제작이 어렵습니다.',
  '작품의 전체적인 컬러와 디자인 무드를 유지할 수 있는 유사한 분위기의 화기로 변경하여 제작됩니다.',
], [
  'The vessel shown is sold out and the exact same vessel is unavailable.',
  'A vessel with a similar mood will be selected to preserve the overall colour and design of the piece.',
])

const details = ({ collection, size, design = t('Handmade Floral Arrangement\nFront Facing Design (정면 중심 디자인)', 'Handmade Floral Arrangement\nFront Facing Design'), included = t('Flower Arrangement + Vessel'), extras = [] }) => [
  ['Collection', t(collection)], ['Size', size], ['Material', ARTIFICIAL], ['Design', design], ['Included', included], ...extras,
]
const prices = (...items) => items.map(([size, ko, en]) => [size, t(ko, en)])
const base = (config) => ({ cardLines: CARD_LINES, ...config })
const centerpiece = (config) => base({
  about: OBJECT_ABOUT,
  featureTitle: t('Front Facing Design | 정면 중심 디자인', 'Front Facing Design'),
  feature: CENTER_FACING,
  spaces: CENTER_SPACES,
  delivery: VEHICLE_DELIVERY,
  custom: OBJECT_CUSTOM,
  ...config,
})

const BOUQUET_ABOUT = t([
  '메이플레르의 웨딩 부케는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.',
  '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 특별한 순간 이후에도 오래도록 간직할 수 있는 플라워 오브제로 완성합니다.',
], [
  'Mayfleur wedding bouquets are crafted with premium artificial flowers to capture the natural form and delicate colour of fresh blooms.',
  'Every stem is balanced with care, creating a floral object that can be treasured long after the special moment.',
])
const BOUQUET_SPACES = t([
  '웨딩 촬영 부케', '본식 웨딩 부케', '세컨드 부케', '브라이덜 샤워', '기념일 촬영', '특별한 순간을 위한 플라워 오브제',
], [
  'Wedding photoshoots', 'Wedding ceremony bouquet', 'Second bouquet', 'Bridal showers', 'Anniversary photography', 'A floral object for special moments',
])
const WRAPPING = t('기본 상품은 부케 본품으로 제공되며,\n포장이 필요한 경우 별도 요청 부탁드립니다.', 'The standard item includes the bouquet only.\nPlease request wrapping separately if required.')
const bouquet = (config) => base({
  freeParcel: true,
  about: BOUQUET_ABOUT,
  featureTitle: t('Bouquet Design'),
  spaces: BOUQUET_SPACES,
  delivery: PARCEL_DELIVERY,
  custom: FLOWER_CUSTOM,
  ...config,
})
const bouquetDetails = (size) => details({
  collection: 'Wedding Bouquet', size, design: HANDMADE, included: t('Bouquet Arrangement'), extras: [['Wrapping Option', WRAPPING]],
})

const VASE_ABOUT = t([
  '메이플레르의 플라워 오브제는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.',
  '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 공간에 오래도록 아름다움을 더하는 플라워 오브제로 완성합니다.',
], [
  'Mayfleur floral objects are crafted with premium artificial flowers to capture the natural form and delicate colour of fresh blooms.',
  'Each stem is arranged with careful balance to create an enduring floral object for a space.',
])
const VASE_SPACES = t([
  '거실 및 다이닝 공간', '카페 및 레스토랑', '쇼룸 및 브랜드 공간', '호텔 및 리셉션 공간', '집들이 및 개업 선물', '시즌 플라워 오브제',
], [
  'Living and dining spaces', 'Cafés and restaurants', 'Showrooms and brand spaces', 'Hotels and reception areas', 'Housewarming and opening gifts', 'Seasonal floral object',
])
const PACKAGING = t('꽃과 화병은 안전한 배송을 위해 각각 포장하여 발송됩니다.\n화병 없이 꽃다발만 구매를 원하시는 경우 주문 시 별도 문의 부탁드립니다.', 'Flowers and vase are packed separately for safe delivery.\nPlease enquire when ordering if you would like the flowers without the vase.')
const vase = (config) => base({ freeParcel: true, about: VASE_ABOUT, spaces: VASE_SPACES, delivery: PARCEL_DELIVERY, custom: FLOWER_CUSTOM, ...config })
const vaseDetails = (size, collection = 'Vase Arrangement', extras = [['Packaging', PACKAGING]]) => details({ collection, size, design: HANDMADE, included: t('Flower Arrangement + Vase'), extras })

const BASKET_ABOUT = t([
  '메이플레르의 플라워 바스켓은 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.',
  '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 오래도록 아름답게 감상할 수 있는 플라워 오브제로 완성합니다.',
], [
  'Mayfleur flower baskets are crafted with premium artificial flowers to capture the natural form and delicate colour of fresh blooms.',
  'Every stem is arranged with careful balance to create a floral object that can be enjoyed for years.',
])
const BASKET_FEATURE = t([
  '정면에서 가장 아름다운 실루엣이 보이도록 디자인한 꽃바구니입니다.',
  '정면의 풍성한 볼륨감을 중심으로 디자인하며, 뒤쪽에도 자연스러운 소재를 더해 어느 방향에서도 입체감을 느낄 수 있도록 제작합니다.',
  '벽면이나 테이블 한쪽 방향에 배치했을 때 가장 아름다운 형태가 돋보이는 디자인입니다.',
], [
  'This flower basket is designed to present its most beautiful silhouette from the front.',
  'Full frontal volume is balanced with natural materials at the back for dimension from every angle.',
  'Its form is best appreciated against a wall or styled toward one side of a table.',
])
const BASKET_SPACES = t(['거실 및 다이닝 공간 장식', '카페 및 쇼룸 스타일링', '집들이 및 개업 선물', '기념일 및 특별한 선물', '브랜드 공간 연출'], ['Living and dining spaces', 'Café and showroom styling', 'Housewarming and opening gifts', 'Anniversary and special gifts', 'Brand space styling'])
const BASKET_CUSTOM = t(['메이플레르의 디자인과 컬러 무드를 유지하는 범위 내에서 일부 꽃 컬러의 소폭 조정이 가능합니다.', '전체적인 디자인 변경이나 새로운 구성의 제작은 Custom Order를 통해 별도로 상담 가능합니다.'], ['Selected flower colours can be adjusted while preserving Mayfleur’s design mood.', 'Significant changes or new compositions are available through Custom Order consultation.'])
const basket = (config) => base({ freeParcel: true, about: BASKET_ABOUT, featureTitle: t('Front Facing Design | 정면 중심 디자인', 'Front Facing Design'), feature: BASKET_FEATURE, spaces: BASKET_SPACES, delivery: PARCEL_DELIVERY, custom: BASKET_CUSTOM, ...config })

export const productEditorial = {
  '핑크 보라 센터피스': centerpiece({
    title: t('핑크 & 연보라 센터피스', 'Pink Lavender Centerpiece'), price: '250,000원',
    priceOptions: prices(['W45 × H45cm', '25만원', 'KRW 250,000'], ['W50 × H50cm', '30만원', 'KRW 300,000'], ['W55 × H55cm', '35만원', 'KRW 350,000']),
    theme: t(['핑크와 라벤더 컬러가 부드럽게 어우러진 수채화 같은 센터피스입니다.', '은은하고 로맨틱한 컬러감과 자연스럽게 흐르는 꽃의 움직임으로 공간에 따뜻한 분위기를 더합니다.'], ['A watercolour-like centrepiece where pink and lavender tones blend softly together.', 'Its romantic palette and naturally flowing movement bring warmth and softness to a space.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 25만원\n약 W50 × H50cm 30만원\n약 W55 × H55cm 35만원', 'Approx. W45 × H45cm KRW 250,000\nApprox. W50 × H50cm KRW 300,000\nApprox. W55 × H55cm KRW 350,000') }),
  }),
  '핑크 화이트 심플 센터피스': centerpiece({
    title: t('봄의 여백 센터피스', 'Blush Moment'), price: '200,000원',
    priceOptions: prices(['W40 × H50cm', '20만원', 'KRW 200,000']),
    theme: t(['봄의 여백 센터피스', '풍성하고 화려한 꽃 대신, 선과 라인이 만들어내는 아름다움에 집중한 봄의 센터피스입니다.', '밝고 화사한 튤립을 포인트로 자연스러운 흐름을 살리고, 동양적인 선과 여백의 미를 담아 절제된 아름다움을 표현했습니다.', '공간을 가득 채우기보다 여백을 남겨 작은 공간에서도 은은하게 존재감을 드러내는 꽃장식입니다.'], ['Blush Moment', 'Rather than relying on abundant, elaborate flowers, this spring centrepiece focuses on the beauty created by graceful lines and silhouettes.', 'Bright tulips add a luminous accent while natural movement, Eastern-inspired lines and considered negative space express restrained beauty.', 'Instead of filling the entire space, the design leaves room to breathe, creating a subtle presence even in a small setting.']),
    details: details({ collection: 'Medium Object', size: t('약 W40 × H50cm 20만원', 'Approx. W40 × H50cm KRW 200,000') }),
  }),
  '하늘 블루 센터피스': centerpiece({
    title: t('하늘 블루 가든 센터피스', 'Sky Blue Garden Centerpiece'), price: '500,000원',
    priceOptions: prices(['W60 × H70cm', '50만원', 'KRW 500,000'], ['W70 × H80cm', '60만원', 'KRW 600,000']),
    theme: t(['하늘빛의 부드러운 색감에 은은한 블루 포인트를 더한 가든 스타일 대형 센터피스입니다.', '맑은 하늘 아래 펼쳐진 정원을 닮은 컬러감으로, 신비로우면서도 화사한 분위기를 담았습니다.'], ['A large garden-style centrepiece in soft sky tones with subtle blue accents.', 'Its palette recalls a garden beneath a clear sky, creating a luminous and dreamlike mood.']),
    spaces: t(['거실 및 넓은 공간의 메인 장식', '다이닝 테이블 센터피스', '호텔 및 브랜드 공간 연출', '카페 및 쇼룸 스타일링', '백화점 디스플레이', '웨딩 및 행사 공간 장식', '플라워 디렉팅 및 포토존 연출'], ['Statement styling for living and large spaces', 'Dining table centrepiece', 'Hotels and brand spaces', 'Cafés and showrooms', 'Department store displays', 'Wedding and event spaces', 'Floral directing and photo zones']),
    details: details({ collection: 'Large Object', size: t('약 W60 × H70cm 50만원\n약 W70 × H80cm 60만원', 'Approx. W60 × H70cm KRW 500,000\nApprox. W70 × H80cm KRW 600,000') }),
  }),
  '연보라 하늘 센터피스': centerpiece({
    title: t('연보라 & 하늘 센터피스', 'Lavender Sky Centerpiece'), price: '250,000원',
    priceOptions: prices(['W45 × H45cm', '25만원', 'KRW 250,000'], ['W50 × H50cm', '30만원', 'KRW 300,000'], ['W55 × H55cm', '35만원', 'KRW 350,000']),
    theme: t(['연보라빛 하늘과 은은한 블루 컬러가 만나 신비롭고 몽환적인 분위기를 담은 센터피스입니다.', '부드럽게 번지는 파스텔 컬러와 섬세한 꽃의 조화가 공간에 차분하고 우아한 무드를 더합니다.'], ['Lavender sky and subtle blue tones create a mysterious, dreamlike centrepiece.', 'Soft pastels and delicate flowers add a calm and elegant mood to the space.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 25만원\n약 W50 × H50cm 30만원\n약 W55 × H55cm 35만원', 'Approx. W45 × H45cm KRW 250,000\nApprox. W50 × H50cm KRW 300,000\nApprox. W55 × H55cm KRW 350,000') }),
  }),
  '노랑 달항아리 센터피스': centerpiece({
    title: t('화사한 노랑 달항아리 센터피스', 'Sunshine Centerpiece'), price: '200,000원',
    priceOptions: prices(['W33 × H35cm', '20만원', 'KRW 200,000'], ['W43 × H43cm', '30만원', 'KRW 300,000']),
    about: t(['메이플레르의 플라워 오브제는 프리미엄 플라워 소재를 사용하여 생화의 자연스러운 움직임과 섬세한 컬러감을 담아 제작합니다.', '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여 오래도록 감상할 수 있는 디자인 오브제로 완성합니다.'], ['Mayfleur floral objects use premium materials to capture the movement and delicate colour of fresh flowers.', 'Each stem is balanced with care to create an enduring design object.']),
    theme: t(['따뜻한 햇살과 봄날의 정원을 담은 듯한 노란 컬러의 센터피스입니다.', '화사한 옐로우 플라워와 은은한 달항아리 오브제가 어우러져 공간에 밝고 따뜻한 분위기를 더합니다.', '노란 꽃이 주는 생기와 한국적인 오브제의 단아한 아름다움이 조화를 이루는 플라워 작품입니다.'], ['A yellow centrepiece inspired by warm sunlight and a spring garden.', 'Bright flowers and a subtle moon jar bring warmth and light to a space.', 'Lively yellow blooms balance beautifully with the restrained elegance of this Korean object.']),
    feature: t(['정면에서 가장 아름다운 실루엣이 보이도록 디자인한 센터피스입니다.', '달항아리의 은은한 존재감과 꽃의 자연스러운 흐름이 조화를 이루도록 앞면의 볼륨감을 중심으로 구성하였으며, 뒤쪽에도 자연스러운 소재를 더해 입체감을 살렸습니다.', '벽면이나 테이블 한쪽 방향에 배치했을 때 가장 아름다운 형태가 돋보이는 디자인입니다.'], ['Designed to reveal its most beautiful silhouette from the front.', 'Frontal volume balances the moon jar and natural floral flow, with materials at the back adding dimension.', 'The form is most beautiful against a wall or oriented toward one side of a table.']),
    spaces: t(['거실 및 다이닝 공간의 포인트 장식', '돌상 및 백일상 스타일링', '어버이날, 부모님 생신 선물', '특별한 기념일을 위한 선물', '카페 및 쇼룸 공간 연출', '브랜드 공간 스타일링'], ['Living and dining accents', 'Korean first-birthday table styling', 'Parents’ Day and birthday gifts', 'Special anniversary gifts', 'Cafés and showrooms', 'Brand spaces']),
    details: details({ collection: 'Small Object', size: t('약 W33 × H35cm 20만원\n약 W43 × H43cm 30만원', 'Approx. W33 × H35cm KRW 200,000\nApprox. W43 × H43cm KRW 300,000'), included: t('Flower Arrangement + Ceramic Moon Jar') }),
  }),
  '핑크 하늘 센터피스': centerpiece({
    title: t('핑크 & 하늘 수채화 센터피스', 'Pink Sky Centerpiece'), price: '250,000원',
    priceOptions: prices(['W45 × H45cm', '25만원', 'KRW 250,000'], ['W50 × H50cm', '30만원', 'KRW 300,000'], ['W55 × H55cm', '35만원', 'KRW 350,000']),
    theme: t(['핑크빛 꽃과 하늘빛 컬러가 어우러진 맑은 수채화 같은 센터피스입니다.', '은은한 파스텔 톤으로 어느 공간에도 자연스럽게 스며들며, 사계절 편안하게 즐길 수 있는 따뜻한 플라워 오브제입니다.'], ['Pink flowers and sky tones blend in a clear, watercolour-like centrepiece.', 'Its soft pastel palette settles naturally into any space and can be enjoyed throughout the seasons.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 25만원\n약 W50 × H50cm 30만원\n약 W55 × H55cm 35만원', 'Approx. W45 × H45cm KRW 250,000\nApprox. W50 × H50cm KRW 300,000\nApprox. W55 × H55cm KRW 350,000'), extras: [['Vessel Option', t(VESSEL_OPTION.ko.join('\n'), VESSEL_OPTION.en.join('\n'))]] }),
  }),
  '피치 화이트 센터피스': centerpiece({
    title: t('피치 & 화이트 센터피스', 'Peach White Centerpiece'), price: '230,000원',
    priceOptions: prices(['W45 × H45cm', '23만원', 'KRW 230,000'], ['W50 × H50cm', '33만원', 'KRW 330,000'], ['W55 × H55cm', '33만원', 'KRW 330,000']),
    theme: t(['부드러운 피치와 깨끗한 화이트 컬러가 조화를 이루는 내추럴 센터피스입니다.', '화려함보다 은은한 아름다움을 담아 공간에 자연스럽게 어우러지는 한 폭의 꽃 그림 같은 디자인입니다.'], ['Soft peach and clean white tones create a natural centrepiece.', 'Its understated beauty settles into a space like a gentle floral painting.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 23만원\n약 W50 × H50cm 33만원\n약 W55 × H55cm 33만원', 'Approx. W45 × H45cm KRW 230,000\nApprox. W50 × H50cm KRW 330,000\nApprox. W55 × H55cm KRW 330,000'), extras: [['Vessel Option', t(VESSEL_OPTION.ko.join('\n'), VESSEL_OPTION.en.join('\n'))]] }),
  }),
  '핑크 피치 센터피스': centerpiece({
    title: t('핑크 & 피치 센터피스', 'Pink Peach Centerpiece'), price: '250,000원',
    priceOptions: prices(['W45 × H45cm', '25만원', 'KRW 250,000'], ['W50 × H50cm', '30만원', 'KRW 300,000'], ['W55 × H55cm', '35만원', 'KRW 350,000']),
    theme: t(['사랑스러운 핑크와 따뜻한 피치 컬러를 중심으로, 은은한 옐로우 포인트를 더한 화사한 센터피스입니다.', '봄날의 꽃 정원을 닮은 밝고 로맨틱한 컬러감으로 공간에 생기를 더합니다.'], ['A bright centrepiece of lovely pink, warm peach and subtle yellow accents.', 'Its romantic palette recalls a spring garden and brings fresh energy to a space.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 25만원\n약 W50 × H50cm 30만원\n약 W55 × H55cm 35만원', 'Approx. W45 × H45cm KRW 250,000\nApprox. W50 × H50cm KRW 300,000\nApprox. W55 × H55cm KRW 350,000') }),
  }),
  '핑크 주황 노랑 하늘 센터피스': centerpiece({
    title: t('수채화 컬러 센터피스', 'Watercolor Bloom Centerpiece'), price: '250,000원',
    priceOptions: prices(['W45 × H45cm', '25만원', 'KRW 250,000'], ['W50 × H50cm', '30만원', 'KRW 300,000'], ['W55 × H55cm', '35만원', 'KRW 350,000']),
    theme: t(['봄과 여름의 정원을 한 폭의 수채화처럼 담아낸 컬러풀한 센터피스입니다.', '핑크, 오렌지, 옐로우, 블루 컬러가 조화롭게 어우러져 화사하고 생동감 넘치는 꽃의 풍경을 표현합니다.', '선명한 컬러감 속에서도 자연스러운 조화를 이루며, 공간에 밝고 따뜻한 에너지를 더하는 플라워 오브제입니다.'], ['A colourful centrepiece that captures spring and summer gardens like a watercolour.', 'Pink, orange, yellow and blue form a bright and lively floral landscape.', 'Its vivid yet balanced palette brings warm, uplifting energy to a space.']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × H45cm 25만원\n약 W50 × H50cm 30만원\n약 W55 × H55cm 35만원', 'Approx. W45 × H45cm KRW 250,000\nApprox. W50 × H50cm KRW 300,000\nApprox. W55 × H55cm KRW 350,000') }),
  }),
  '보라 피치 노랑 롱앤로우 센터피스': centerpiece({
    title: t('라벤더 & 피치 롱앤로우 센터피스', 'Lavender Peach Garden Long & Low Centerpiece'), price: '200,000원',
    priceOptions: prices(['Single', '20만원', 'KRW 200,000'], ['Pair Set', '38만원', 'KRW 380,000']),
    about: t(['메이플레르의 플라워 오브제는 프리미엄 플라워 소재를 사용하여 생화의 자연스러운 움직임과 섬세한 컬러감을 담아 제작합니다.', '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여 공간에 오래도록 아름다움을 더하는 디자인 오브제로 완성합니다.'], ['Mayfleur floral objects use premium materials to capture natural movement and delicate colour.', 'Every stem is balanced to create an enduring design object for a space.']),
    theme: t(['부드러운 라벤더와 피치 컬러에 은은한 옐로우 포인트를 더한 롱앤로우 센터피스입니다.', '낮고 길게 흐르는 꽃의 형태가 자연스러운 정원의 풍경을 연상시키며, 테이블 위에 우아하고 따뜻한 분위기를 더합니다.', '파스텔 컬러의 조화로운 대비와 풍성한 꽃의 움직임으로 특별한 순간을 위한 테이블 스타일링을 완성합니다.'], ['A long and low centrepiece of soft lavender, peach and subtle yellow.', 'Its low, flowing form recalls a natural garden and brings warmth to a table.', 'Balanced pastels and generous movement complete a table setting for special moments.']),
    feature: t(['정면에서 가장 아름다운 실루엣이 보이도록 디자인한 테이블 센터피스입니다.', '앞쪽의 풍성한 꽃의 볼륨감을 중심으로 구성하고, 옆면과 뒤쪽에도 자연스러운 소재를 더해 어느 위치에서도 입체적인 느낌을 살렸습니다.', '테이블 중앙 또는 한 방향을 바라보는 공간에 배치했을 때 가장 아름다운 형태가 돋보입니다.'], ['Designed to reveal its most beautiful silhouette from the front.', 'Full frontal volume is balanced with natural materials at the sides and back.', 'Its form is best appreciated at the centre of a table or oriented toward one direction.']),
    spaces: t(['브라이덜샤워 테이블 장식', '돌상 및 백일상 스타일링', '생일 및 파티 테이블 연출', '공간 대여 스튜디오 스타일링', '웨딩 테이블 장식', '카페 및 쇼룸 테이블 연출'], ['Bridal shower tables', 'Korean first-birthday tables', 'Birthday and party tables', 'Rental studio styling', 'Wedding tables', 'Café and showroom tables']),
    details: details({ collection: 'Medium Object', size: t('약 W45 × D20 × H30~40cm', 'Approx. W45 × D20 × H30–40cm'), design: t('Handmade Floral Arrangement\nLong & Low Design (낮고 길게 연출되는 테이블 디자인)', 'Handmade Floral Arrangement\nLong & Low Design'), included: t('Complete Floral Arrangement') }),
    delivery: PARCEL_DELIVERY,
    freeParcel: true,
  }),

  '카라 튤립 은방울 부케': bouquet({
    title: t('카라 · 튤립 · 은방울꽃 부케', 'Calla Tulip Bouquet'), price: '130,000원', priceOptions: prices(['W25 × H30~35cm', '13만원', 'KRW 130,000']),
    theme: t(['순백의 카라와 부드러운 튤립, 작은 은방울꽃의 섬세한 아름다움을 담은 내추럴 웨딩 부케입니다.', '깨끗하고 우아한 화이트 컬러와 자연스럽게 흐르는 꽃의 라인이 조화를 이루어, 클래식하면서도 따뜻한 웨딩 무드를 연출합니다.', '꾸밈없이 자연스러운 아름다움을 담은 디자인으로 본식 부케와 웨딩 촬영용 부케 모두 잘 어울리는 작품입니다.'], ['A natural wedding bouquet of pure calla lilies, soft tulips and delicate lily of the valley.', 'Clean whites and flowing lines create a classic yet warm wedding mood.', 'Its effortless beauty suits both ceremonies and wedding photography.']),
    feature: t(['꽃의 자연스러운 방향과 움직임을 살려 풍성하면서도 가벼운 실루엣으로 디자인했습니다.', '카라의 우아한 라인과 튤립의 부드러운 곡선, 은방울꽃의 섬세한 포인트가 어우러져 정돈된 듯 자연스러운 가든 부케 형태를 완성합니다.'], ['Natural direction and movement create a full yet light silhouette.', 'Elegant calla lines, soft tulip curves and lily-of-the-valley accents form a refined garden bouquet.']),
    spaces: t(['웨딩 촬영 부케', '본식 웨딩 부케', '스몰 웨딩 스타일링', '브라이덜 샤워', '기념일 촬영', '특별한 순간을 위한 플라워 오브제'], ['Wedding photoshoots', 'Wedding ceremony bouquet', 'Small wedding styling', 'Bridal showers', 'Anniversary photography', 'A floral object for special moments']),
    details: bouquetDetails(t('W25 × H30~35cm\n(꽃의 형태와 소재에 따라 약간의 차이가 있을 수 있습니다.)', 'W25 × H30–35cm\n(Size may vary slightly with flower form and materials.)')),
  }),
  '핑크 하늘 부케': bouquet({
    title: t('핑크 작약 · 로즈 · 하늘 부케', 'Pink Peony Bouquet'), price: '150,000원', priceOptions: prices(['W35 × H35cm', '15만원', 'KRW 150,000']),
    theme: t(['부드러운 핑크 작약과 로즈, 은은한 하늘빛 포인트가 어우러진 파스텔 가든 부케입니다.', '화사하면서도 차분한 컬러 조합으로 봄날의 정원 같은 따뜻하고 로맨틱한 분위기를 담았습니다.', '풍성한 작약의 볼륨감과 자연스럽게 어우러지는 꽃의 흐름이 신부의 우아하고 사랑스러운 무드를 표현하는 디자인입니다.'], ['A pastel garden bouquet of soft pink peonies, roses and subtle sky-blue accents.', 'Its bright yet calm palette evokes a warm, romantic spring garden.', 'Generous peonies and flowing flowers express an elegant, lovely bridal mood.']),
    feature: t(['작약과 로즈의 풍성한 볼륨을 중심으로 자연스럽게 흐르는 실루엣으로 디자인했습니다.', '부드러운 컬러의 조화와 꽃의 방향을 살려, 가든에서 갓 가져온 듯한 내추럴하면서도 우아한 부케 형태를 완성합니다.'], ['A naturally flowing silhouette centres on the generous volume of peonies and roses.', 'Soft colours and organic direction create an elegant bouquet freshly gathered from a garden.']),
    details: bouquetDetails(t('약 W35 × H35cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W35 × H35cm\n(Size may vary by design.)')),
  }),
  '민들레 홑씨 부케': bouquet({
    title: t('민들레 홑씨 부케', 'Dandelion Wishes'), price: '100,000원',
    priceOptions: prices(['W25~30 × H30~40cm', '10만원', 'KRW 100,000']),
    theme: t(['바람을 따라 흩날리는 민들레 홑씨가 거리를 수놓듯 가볍게 날아가는 모습에서 영감을 받아 제작한 부케입니다.', '민들레 홑씨의 심플하고 가벼운 형태에 고급스러운 스네이크 알리움을 더해 섬세한 라인과 리듬을 표현했습니다. 자연스럽게 뻗어 나가는 선이 어우러져 민들레 홑씨가 바람을 타고 흩날리는 순간을 독특한 형태로 형상화했습니다.', '몽글몽글한 질감과 여백, 유려한 라인이 만들어내는 신비롭고 몽환적인 분위기의 부케로, 특별한 날 오래도록 기억에 남는 의미 있는 꽃을 전합니다.'], ['Inspired by dandelion seeds drifting lightly on the wind as if decorating the street, this bouquet captures a fleeting, airborne moment.', 'The simple, weightless form of dandelion seeds is paired with refined snake allium to express delicate lines and rhythm. Naturally extending stems come together in a distinctive interpretation of seeds scattering on the breeze.', 'Soft clustered textures, negative space and fluid lines create a mysterious, dreamlike bouquet—a meaningful floral piece designed to remain memorable long after a special day.']),
    feature: t(['꽃의 자연스러운 방향과 움직임을 살려 가볍고 유려한 실루엣으로 디자인했습니다.', '정돈된 형태보다 자연스럽게 뻗어 나가는 라인과 여백을 강조하여, 어느 각도에서도 섬세한 흐름이 느껴지는 부케로 완성합니다.'], ['Natural direction and movement create a light, fluid silhouette.', 'Organic extending lines and negative space are emphasized over a formal shape, giving the bouquet a delicate sense of movement from every angle.']),
    details: bouquetDetails(t('약 W25~30 × H30~40cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W25–30 × H30–40cm\n(Size may vary by design.)')),
  }),
  '화이트 내추럴 부케': bouquet({
    title: t('화이트 내추럴 카라 · 튤립 · 스위트피 부케', 'White Natural Bouquet'), price: '150,000원', priceOptions: prices(['W25~30 × H35~40cm', '15만원', 'KRW 150,000']),
    about: t(['메이플레르의 웨딩 부케는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.', '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 특별한 순간 이후에도 오래도록 감상할 수 있는 플라워 오브제로 완성합니다.'], ['Mayfleur wedding bouquets use premium artificial flowers to capture the natural form and delicate colour of fresh blooms.', 'Every stem is balanced with care, creating a floral object that can be enjoyed long after the special moment.']),
    theme: t(['순백의 카라와 튤립, 그리고 가볍게 흐르는 스위트피 라인을 담은 내추럴 웨딩 부케입니다.', '깨끗하고 우아한 화이트 컬러가 어우러져 클래식한 아름다움을 표현하며, 자연스럽게 이어지는 꽃의 흐름이 마치 정원에서 막 피어난 듯한 부드러운 분위기를 연출합니다.', '절제된 컬러감과 섬세한 라인으로 웨딩 순간뿐 아니라 공간을 오래도록 아름답게 장식할 수 있는 디자인입니다.'], ['A natural wedding bouquet of pure calla lilies, tulips and lightly flowing sweet peas.', 'Clean whites and organic movement express classic beauty with a garden softness.', 'Its restrained palette and delicate lines allow it to remain a beautiful object after the wedding.']),
    feature: t(['스위트피의 자연스러운 라인을 중심으로 꽃의 방향과 움직임을 살려 디자인했습니다.', '정돈된 형태보다는 자연스럽게 흐르는 실루엣을 강조하여, 가볍고 우아한 가든 부케의 분위기를 완성합니다.', '부케로 사용한 후에는 화병에 꽂아 플라워 오브제로도 활용할 수 있어 특별한 순간의 기억을 오래 간직할 수 있습니다.'], ['Natural sweet-pea lines guide the direction and movement of the bouquet.', 'A flowing rather than formal silhouette creates a light, elegant garden mood.', 'After use, it can be displayed in a vase as a lasting floral object.']),
    spaces: t(['웨딩 촬영 부케', '본식 웨딩 부케', '세컨드 부케', '브라이덜 샤워', '화병 장식용 플라워 오브제', '특별한 공간 스타일링'], ['Wedding photoshoots', 'Wedding ceremony bouquet', 'Second bouquet', 'Bridal showers', 'Floral object for vase display', 'Special spatial styling']),
    details: bouquetDetails(t('약 W25~30 × H35~40cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W25–30 × H35–40cm\n(Size may vary by design.)')),
  }),
  '화이트 핑크 내추럴 부케': bouquet({
    title: t('화이트 & 핑크 내추럴 부케', 'Soft Garden Bouquet'), price: '200,000원', priceOptions: prices(['W30~33 × H40~45cm', '20만원', 'KRW 200,000']),
    theme: t(['순백의 카라와 튤립, 자연스럽게 흐르는 스위트피 라인에 부드러운 핑크 컬러를 더한 내추럴 가든 부케입니다.', '화이트 플라워의 깨끗하고 우아한 분위기에 핑크 튤립, 네리네, 핑크 스위트피의 사랑스러운 색감이 어우러져 은은하면서도 로맨틱한 무드를 표현합니다.', '차분한 화이트와 따뜻한 핑크의 조화가 봄날의 정원처럼 부드럽고 우아한 웨딩 스타일을 완성합니다.'], ['A natural garden bouquet of pure calla lilies, tulips, flowing sweet peas and soft pink.', 'Pink tulips, nerine and sweet peas bring romance to the clean elegance of white flowers.', 'Calm white and warm pink complete a soft, graceful spring-garden wedding style.']),
    feature: t(['스위트피의 자연스럽게 흐르는 라인을 중심으로 꽃의 방향과 움직임을 살려 디자인했습니다.', '화이트 플라워의 정돈된 아름다움과 핑크 플라워의 섬세한 포인트가 조화를 이루며, 자연스럽게 피어난 꽃의 풍경 같은 가든 부케 형태를 완성합니다.', '부케로 사용한 후에는 화병에 꽂아 공간을 장식하는 플라워 오브제로도 활용할 수 있어 특별한 순간의 기억을 오래 간직할 수 있습니다.'], ['Flowing sweet-pea lines guide the flowers’ natural direction and movement.', 'Refined whites and delicate pink accents create a garden bouquet like a naturally blooming landscape.', 'After use, it can be displayed in a vase as a lasting floral object.']),
    spaces: t(['웨딩 촬영 부케', '본식 웨딩 부케', '세컨드 부케', '브라이덜 샤워', '기념일 촬영', '화병 장식용 플라워 오브제'], ['Wedding photoshoots', 'Wedding ceremony bouquet', 'Second bouquet', 'Bridal showers', 'Anniversary photography', 'Floral object for vase display']),
    details: bouquetDetails(t('약 W30~33 × H40~45cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W30–33 × H40–45cm\n(Size may vary by design.)')),
  }),
  '케스케이드 부케 (호접부케)': bouquet({
    title: t('케스케이드 호접란 부케', 'Cascade Orchid Bouquet'), price: '150,000원', priceOptions: prices(['W20~22 × H50~55cm', '15만원', 'KRW 150,000']),
    theme: t(['호접란을 중심으로 라넌큘러스, 튤립, 줄맨드라미가 자연스럽게 어우러진 케스케이드 웨딩 부케입니다.', '우아하게 흐르는 호접란의 실루엣에 풍성한 라넌큘러스와 튤립의 부드러운 형태, 줄맨드라미의 섬세한 텍스처가 더해져 자연스럽고 깊이 있는 아름다움을 표현합니다.', '클래식한 우아함과 내추럴한 가든 무드가 조화를 이루는 디자인으로, 특별한 순간을 더욱 아름답게 완성합니다.'], ['A cascading wedding bouquet of orchids, ranunculus, tulips and textured celosia.', 'Flowing orchids, generous blooms and delicate texture create natural depth.', 'Classic elegance and a garden mood come together for a memorable moment.']),
    feature: t(['꽃마다 가진 자연스러운 방향과 움직임을 살려 아래로 부드럽게 이어지는 케스케이드 실루엣으로 디자인했습니다.', '정돈된 형태보다는 정원에서 막 가져온 듯 자연스럽게 흐르는 라인을 살렸으며, 걸을 때마다 아름답게 움직이는 우아한 실루엣이 돋보이는 작품입니다.'], ['Natural direction and movement form a softly descending cascade.', 'Garden-like flowing lines create an elegant silhouette that moves beautifully as you walk.']),
    details: bouquetDetails(t('약 W20~22 × H50~55cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W20–22 × H50–55cm\n(Size may vary by design.)')),
  }),
  '민들레 홑씨 내추럴 부케': bouquet({
    title: t('민들레 홑씨 내추럴 부케', 'Natural Dandelion Bouquet'), price: '190,000원',
    priceOptions: prices(['W25~30 × H35~40cm', '19만원', 'KRW 190,000']),
    theme: t(['바람을 따라 흩날리는 민들레 홑씨가 거리를 수놓듯 가볍게 날아가는 모습에서 영감을 받아 제작한 부케입니다.', '민들레 홑씨의 심플하고 가벼운 형태에 고급스러운 스네이크 알리움을 더해 섬세한 라인과 리듬을 표현했습니다. 여기에 카라, 클레마티스, 줄맨드라미를 더해 자연스럽게 뻗어 나가는 선과 유려한 흐름을 살렸습니다. 서로 다른 형태와 질감의 소재가 조화를 이루며 민들레 홑씨가 바람을 타고 흩날리는 순간을 독특한 형태로 형상화했습니다.', '몽글몽글한 질감과 여백, 자유롭게 흐르는 라인이 만들어내는 신비롭고 몽환적인 분위기. 자연스러운 실루엣과 감각적인 소재의 조합으로 완성한 트렌디하고 유니크한 내추럴 부케입니다.', '특별한 날, 흔하지 않은 아름다움과 의미를 담아 오래도록 기억에 남는 꽃을 전합니다.'], ['Inspired by dandelion seeds drifting lightly on the wind as if decorating the street, this bouquet captures a fleeting, airborne moment.', 'The simple, weightless form of dandelion seeds is paired with refined snake allium to express delicate lines and rhythm. Calla lilies, clematis and textured celosia add naturally extending stems and a fluid sense of movement. Their contrasting forms and textures come together in a distinctive interpretation of dandelion seeds scattering on the breeze.', 'Soft clustered textures, negative space and freely flowing lines create a mysterious, dreamlike mood. A natural silhouette and expressive mix of materials complete this trendy, distinctive natural bouquet.', 'For a special day, it conveys an uncommon beauty and meaning designed to remain memorable for years to come.']),
    details: bouquetDetails(t('약 W25~30 × H35~40cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W25–30 × H35–40cm\n(Size may vary by design.)')),
  }),
  '호접 부케': bouquet({
    title: t('호접란 티어드롭 부케', 'Teardrop Orchid Bouquet'), price: '130,000원', priceOptions: prices(['Standard', '13만원', 'KRW 130,000']),
    theme: t(['호접란, 튤립, 스카비오사, 줄맨드라미가 조화롭게 어우러진 티어드롭 웨딩 부케입니다.', '물방울을 닮은 부드러운 실루엣을 모티브로, 깔끔하고 단정한 형태 속에 자연스러운 꽃의 움직임을 담았습니다.', '케스케이드보다 컴팩트한 비율로 제작되어 우아하면서도 부담 없이 들기 좋은 디자인입니다.'], ['A teardrop wedding bouquet of orchids, tulips, scabiosa and textured celosia.', 'Its soft droplet silhouette balances a clean form with natural movement.', 'More compact than a cascade, it is elegant and comfortable to carry.']),
    feature: t(['호접란의 유려한 라인을 중심으로 튤립과 스카비오사, 줄맨드라미를 자연스럽게 배치하여 균형감 있는 티어드롭 형태를 완성했습니다.', '절제된 실루엣과 섬세한 꽃의 흐름이 조화를 이루며, 클래식하면서도 내추럴한 웨딩 스타일을 연출합니다.'], ['Flowing orchids lead tulips, scabiosa and celosia into a balanced teardrop form.', 'A restrained silhouette and delicate movement create a classic, natural wedding style.']),
    details: bouquetDetails(t('디자인에 따라 사이즈는 달라질 수 있습니다.', 'Size may vary by design.')),
  }),
  '빈티지 보라 부케': bouquet({
    title: t('빈티지 보라 튤립 부케', 'Vintage Lavender Tulip Bouquet'), price: '120,000원', priceOptions: prices(['Standard', '12만원', 'KRW 120,000']),
    theme: t(['빈티지한 보랏빛 튤립과 스위트피, 니겔라가 자연스럽게 어우러진 웨딩 부케입니다.', '은은한 라벤더 톤과 부드러운 그린이 조화를 이루어 차분하면서도 깊이 있는 분위기를 담았습니다.', '절제된 컬러감과 자연스러운 꽃의 흐름이 어우러져 빈티지하면서도 우아한 가든 무드를 표현하는 디자인입니다.'], ['A wedding bouquet of vintage purple tulips, sweet peas and nigella.', 'Subtle lavender and soft green create a calm atmosphere with depth.', 'Restrained colour and natural floral movement express an elegant vintage garden mood.']),
    feature: t(['튤립의 자연스러운 실루엣을 중심으로 스위트피의 섬세한 라인과 니겔라의 가벼운 텍스처를 더해 자연스럽게 흐르는 형태로 디자인했습니다.', '꽃마다 가진 방향과 움직임을 살려 정원에서 갓 가져온 듯한 내추럴한 분위기를 담았으며, 부케로 사용한 후에는 화병에 꽂아 플라워 오브제로도 활용할 수 있습니다.'], ['Natural tulip silhouettes combine with delicate sweet peas and airy nigella.', 'The garden-gathered form can be displayed in a vase as a floral object after use.']),
    details: bouquetDetails(t('디자인에 따라 사이즈는 달라질 수 있습니다.', 'Size may vary by design.')),
  }),

  '블루 하늘 화병': vase({
    title: t('블루 & 하늘 화병', 'Sky Blue Vase'), price: '200,000원', priceOptions: prices(['W45~50 × H50cm', '20만원', 'KRW 200,000']),
    theme: t(['블루 아네모네를 포인트로 하늘빛과 연보라, 화이트 컬러가 자연스럽게 어우러진 플라워 오브제입니다.', '맑은 하늘과 투명한 공기를 닮은 컬러감이 공간에 청량하고 편안한 분위기를 더하며, 계절에 관계없이 오래도록 감상할 수 있는 디자인입니다.', '은은한 블루 포인트가 공간에 자연스럽게 생기를 더해 거실, 다이닝 공간, 쇼룸 등 다양한 공간과 조화롭게 어우러집니다.'], ['Blue anemones accent sky, lavender and white in this floral object.', 'A clear, airy palette brings freshness and calm throughout the seasons.', 'Subtle blues add life to living rooms, dining spaces and showrooms.']),
    details: vaseDetails(t('약 W45~50 × H50cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W45–50 × H50cm\n(Size may vary by design.)')),
  }),
  '빈티지 대형 화병': vase({
    title: t('빈티지 가을 대형 화병', 'Autumn Blush Vase'), price: '350,000원', priceOptions: prices(['W50~55 × H60cm', '35만원', 'KRW 350,000']),
    about: t(['메이플레르의 플라워 오브제는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.', '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 공간의 분위기를 완성하는 플라워 오브제로 제작합니다.'], ['Mayfleur floral objects capture the natural form and delicate colour of fresh flowers with premium materials.', 'Each stem is balanced to create a floral object that completes the atmosphere of a space.']),
    theme: t(['빈티지한 핑크뮬리와 호접란, 따뜻한 빈티지 오렌지와 그레이 톤이 자연스럽게 어우러진 대형 플라워 오브제입니다.', '부드럽게 채도를 낮춘 컬러들이 조화를 이루어 차분하면서도 깊이 있는 분위기를 연출하며, 공간에 우아한 존재감을 더합니다.', '계절의 무드를 담았지만 특정 계절에만 국한되지 않는 컬러 구성으로, 클래식하면서도 세련된 공간 스타일링에 잘 어울리는 디자인입니다.'], ['A large floral object of vintage pink muhly, orchids, warm orange and grey.', 'Softly muted tones create a calm atmosphere with elegant presence.', 'Seasonal yet timeless, it suits classic and refined interiors.']),
    featureTitle: t('Design'),
    feature: t(['다양한 높이와 소재의 질감을 조화롭게 구성하여 어느 방향에서 보아도 풍성한 입체감을 느낄 수 있도록 디자인했습니다.', '대형 화병의 안정감 있는 비율과 자연스럽게 흐르는 꽃의 실루엣이 어우러져 거실, 로비, 쇼룸 등 넓은 공간의 중심이 되는 플라워 오브제입니다.'], ['Varied heights and textures create generous dimension from every angle.', 'A stable large vase and flowing silhouette make this a focal floral object for living rooms, lobbies and showrooms.']),
    spaces: t(['거실 포인트 스타일링', '호텔 및 로비 공간', '쇼룸 및 브랜드 공간', '카페 및 레스토랑', '백화점 및 상업 공간 연출', '포토존 및 행사 공간 스타일링'], ['Living room statement styling', 'Hotels and lobbies', 'Showrooms and brand spaces', 'Cafés and restaurants', 'Department stores and commercial spaces', 'Photo zones and events']),
    details: vaseDetails(t('약 W50~55 × H60cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W50–55 × H60cm\n(Size may vary by design.)'), 'Large Object', []),
    delivery: t(['본 상품은 대형 화병 완성품으로 제작됩니다.', '파손 위험이 있어 전국 택배 발송은 불가하며, 서울·경기 지역 카카오T 퀵 또는 차량 배송으로만 진행됩니다.'], ['This item is completed as a large vase arrangement.', 'Due to breakage risk, it is available only by Kakao T Quick or vehicle delivery within Seoul and Gyeonggi.']),
    custom: OBJECT_CUSTOM,
  }),
  '핑크 피치 연보라 화병': vase({
    title: t('작약 & 로즈 화병', 'Peony Bloom Vase'), price: '150,000원', priceOptions: prices(['W40~45 × H45cm', '15만원', 'KRW 150,000']),
    theme: t(['고급 핑크 작약을 메인으로 피치, 화이트, 연보라, 하늘빛 컬러가 조화롭게 어우러진 플라워 오브제입니다.', '풍성한 작약의 아름다운 볼륨감과 부드러운 파스텔 컬러가 어우러져 마치 봄날의 정원을 공간에 담아낸 듯한 사랑스러운 분위기를 표현합니다.', '따뜻하면서도 은은한 컬러 밸런스로 어느 공간에나 자연스럽게 어울리며, 사계절 내내 봄의 생기를 느낄 수 있는 디자인입니다.'], ['Premium pink peonies combine with peach, white, lavender and sky tones.', 'Generous peonies and soft pastels bring the charm of a spring garden indoors.', 'Its warm, subtle balance suits any space and carries spring energy through every season.']),
    details: vaseDetails(t('약 W40~45 × H45cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W40–45 × H45cm\n(Size may vary by design.)')),
  }),
  '피치 화이트 화병': vase({
    title: t('피치 & 화이트 화병', 'Peach White Vase'), price: '200,000원', priceOptions: prices(['W45~50 × H50cm', '20만원', 'KRW 200,000']),
    theme: t(['피치와 화이트 컬러가 부드럽게 어우러진 플라워 오브제입니다.', '은은한 피치 컬러와 깨끗한 화이트 플라워의 조화가 공간에 따뜻하고 우아한 분위기를 더하며, 어느 계절과 공간에도 자연스럽게 어울리는 디자인입니다.', '부드러운 색감과 섬세한 꽃의 형태가 마치 한 폭의 그림처럼 공간에 편안한 아름다움을 더합니다.'], ['A floral object where peach and white blend softly.', 'Subtle peach and clean white bring warmth and elegance to every season and space.', 'Gentle colour and delicate forms add the calm beauty of a painting.']),
    details: vaseDetails(t('약 W45~50 × H50cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W45–50 × H50cm\n(Size may vary by design.)')),
  }),
  '핑크 대형 화병': vase({
    title: t('핑크 가든 대형 화병', 'Pink Garden Vase'), price: '250,000원', priceOptions: prices(['W45~50 × H55~60cm', '25만원', 'KRW 250,000']),
    theme: t(['핑크 컬러의 다양한 꽃들이 조화롭게 어우러진 대형 플라워 오브제입니다.', '부드러운 핑크 톤을 중심으로 풍성한 꽃의 볼륨감과 자연스러운 형태를 살려, 마치 봄의 정원을 공간에 담아낸 듯한 따뜻하고 우아한 분위기를 표현합니다.', '웨딩 공간부터 브랜드 공간까지 특별한 순간과 공간에 화사한 아름다움을 더하는 디자인으로, 공간의 중심이 되는 플라워 오브제입니다.'], ['A large floral object where many shades of pink blend harmoniously.', 'Soft pink, generous volume and natural form bring a warm spring garden indoors.', 'From weddings to brand spaces, it creates a luminous focal point.']),
    featureTitle: t('Design'), feature: t(['다양한 높이와 소재의 질감을 조화롭게 구성하여 어느 방향에서 보아도 풍성한 입체감을 느낄 수 있도록 디자인했습니다.', '대형 화병의 안정감 있는 비율과 자연스럽게 흐르는 꽃의 실루엣이 어우러져 넓은 공간의 중심이 되는 플라워 오브제입니다.'], ['Varied heights and textures create generous dimension from every angle.', 'A stable large vase and flowing silhouette make this a focal object for spacious interiors.']),
    spaces: t(['거실 포인트 스타일링', '호텔 및 로비 공간', '쇼룸 및 브랜드 공간', '카페 및 레스토랑', '백화점 및 상업 공간 연출', '포토존 및 행사 공간 스타일링'], ['Living room statement styling', 'Hotels and lobbies', 'Showrooms and brand spaces', 'Cafés and restaurants', 'Commercial spaces', 'Photo zones and events']),
    details: vaseDetails(t('약 W45~50 × H55~60cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W45–50 × H55–60cm\n(Size may vary by design.)'), 'Large Object', []),
    delivery: t(['본 상품은 대형 화병 완성품으로 제작됩니다.', '파손 위험이 있어 전국 택배 발송은 불가하며, 서울·경기 지역 카카오T 퀵 또는 차량 배송으로만 진행됩니다.'], ['This item is completed as a large vase arrangement.', 'Due to breakage risk, it is available only by Kakao T Quick or vehicle delivery within Seoul and Gyeonggi.']), custom: OBJECT_CUSTOM,
  }),

  '핑크 하늘 보라 꽃바구니': basket({
    title: t('핑크 & 하늘 꽃바구니', 'Pink Sky Basket'), price: '180,000원', priceOptions: prices(['W35~40 × H40~45cm', '18만원', 'KRW 180,000']),
    theme: t(['핑크와 하늘빛, 연보라 컬러가 부드럽게 어우러진 꽃바구니입니다.', '메이플레르의 시그니처 컬러를 담아 사랑스럽고 우아한 분위기를 표현했으며, 은은한 파스텔 컬러가 공간에 따뜻한 생기와 편안함을 더합니다.', '선물은 물론, 공간을 화사하게 꾸미는 플라워 오브제로도 잘 어울리는 디자인입니다.'], ['A flower basket where pink, sky blue and lavender blend softly.', 'Mayfleur’s signature palette creates a lovely and elegant mood with warm vitality.', 'It works beautifully as both a gift and a floral object for a space.']),
    details: details({ collection: 'Flower Basket', size: t('약 W35~40 × H40~45cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W35–40 × H40–45cm\n(Size may vary by design.)'), design: HANDMADE, included: t('Flower Arrangement + Basket') }),
  }),
  '핑크 피치 꽃바구니': basket({
    title: t('핑크 & 피치 꽃바구니', 'Pink Peach Basket'), price: '150,000원', priceOptions: prices(['W35~40 × H40~45cm', '15만원', 'KRW 150,000']),
    theme: t(['핑크와 피치 컬러가 자연스럽게 어우러진 따뜻한 분위기의 꽃바구니입니다.', '부드럽고 화사한 컬러 조합이 공간에 온기를 더하며, 계절에 관계없이 편안하고 우아한 무드를 연출합니다.', '소중한 분을 위한 선물부터 공간 스타일링까지 자연스럽게 어우러지는 디자인입니다.'], ['A warm flower basket where pink and peach blend naturally.', 'Its soft, luminous palette brings comfort and elegance in every season.', 'It suits both meaningful gifts and spatial styling.']),
    details: details({ collection: 'Flower Basket', size: t('약 W35~40 × H40~45cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W35–40 × H40–45cm\n(Size may vary by design.)'), design: HANDMADE, included: t('Flower Arrangement + Basket') }),
  }),

  '하늘 리스': base({
    title: t('하늘 리스', 'Sky Blue Wreath'), price: '100,000원부터',
    priceOptions: prices(['35cm · Mini', '10만원', 'KRW 100,000'], ['40cm · Standard', '15만원', 'KRW 150,000'], ['45cm · Medium', '20만원', 'KRW 200,000'], ['50cm · Medium', '25만원', 'KRW 250,000'], ['55cm · Large', '30만원~', 'From KRW 300,000']),
    about: t(['아름다운 계절의 감각을 벽 위에 담아보세요.', '리스는 공간을 많이 차지하지 않으면서도 계절의 분위기와 꽃의 아름다움을 가장 자연스럽게 표현할 수 있는 플라워 오브제입니다.', '메이플레르의 리스는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.', '벽면에 오래도록 아름답게 머무르며, 계절마다 새로운 분위기를 더하는 공간 장식이자 특별한 선물로도 잘 어울립니다.'], ['Bring the feeling of a beautiful season to your wall.', 'A wreath expresses seasonal atmosphere and floral beauty without taking up space.', 'Mayfleur wreaths use premium artificial flowers to capture natural form and delicate colour.', 'They remain beautifully on the wall as both enduring décor and a special gift.']),
    theme: t(['맑은 하늘을 닮은 하늘빛과 화이트 컬러를 담아낸 플라워 리스입니다.', '은은한 블루 포인트가 공간에 청량함과 편안함을 더하며, 따뜻하면서도 신비로운 분위기를 연출합니다.', '사계절 어느 공간에도 자연스럽게 어우러져 벽면에 부드러운 포인트가 되어주는 디자인입니다.'], ['A floral wreath in sky blue and white inspired by a clear sky.', 'Subtle blue accents bring freshness, comfort and a warm sense of mystery.', 'It adds a gentle wall accent to any space throughout the seasons.']),
    featureTitle: t('Design'), feature: t(['리스는 공간과 배치에 따라 두 가지 디자인으로 제작됩니다.', '2/3 Design\n한쪽 방향에 풍성한 볼륨감을 집중하여 자연스럽고 우아한 실루엣을 표현하는 디자인입니다.', 'All Around Design\n어느 방향에서 보아도 균형감 있는 형태로 완성되는 풍성한 디자인입니다.', '기본 디자인 외 원하시는 컬러와 무드가 있으신 경우 별도 상담을 통해 제작 가능합니다.'], ['Two wreath compositions are available according to the space and placement.', '2/3 Design\nGenerous volume is focused toward one side for a natural, elegant silhouette.', 'All Around Design\nA full, balanced form from every direction.', 'Alternative colours and moods are available through consultation.']),
    spaces: t(['현관 및 벽면 장식', '거실 및 다이닝 공간', '카페 및 쇼룸 스타일링', '브랜드 공간 연출', '계절별 공간 데코레이션', '집들이 및 특별한 선물'], ['Entrances and wall décor', 'Living and dining spaces', 'Cafés and showrooms', 'Brand spaces', 'Seasonal decoration', 'Housewarming and special gifts']),
    details: [['Collection', t('All Around Design')], ['Size', t('Mini Wreath\n35cm : 100,000원\nStandard Wreath\n40cm : 150,000원\nMedium Wreath\n45cm : 200,000원\n50cm : 250,000원\nLarge Wreath\n55cm : 300,000원~\n※ 기본 사이즈 기준이며, 사용 소재·꽃의 볼륨·디자인 구성에 따라 금액이 달라질 수 있습니다.', 'Mini Wreath\n35cm: KRW 100,000\nStandard Wreath\n40cm: KRW 150,000\nMedium Wreath\n45cm: KRW 200,000\n50cm: KRW 250,000\nLarge Wreath\n55cm: from KRW 300,000\nPrices may vary with materials, volume and composition.')], ['Material', ARTIFICIAL], ['Design', HANDMADE], ['Included', t('Wreath Arrangement')]],
    delivery: PARCEL_DELIVERY,
    freeParcel: true,
    custom: t(['메이플레르의 디자인과 컬러 무드를 유지하는 범위 내에서 일부 꽃 컬러 또는 소재의 소폭 조정이 가능합니다.', '전체적인 디자인 변경이나 새로운 구성의 제작은 Custom Order를 통해 별도로 상담 가능합니다.'], ['Selected flower colours or materials can be adjusted while preserving Mayfleur’s design mood.', 'Significant changes or new compositions are available through Custom Order consultation.']),
  }),
  'Silk Flower Wedding Arch': base({
    isWeddingArch: true,
    title: t('실크 플라워 웨딩 아치', 'SILK FLOWER WEDDING ARCH'),
    price: '₩2,000,000부터',
    priceOptions: prices(['Custom Design', '₩2,000,000부터', 'From KRW 2,000,000']),
    cardLines: t(['Custom Design'], ['Custom Design']),
    about: OBJECT_ABOUT,
    archPackage: {
      included: t(['아치 구조물', '정면형 조화 플라워 장식', '기본 제작', '기본 설치'], ['Arch structure', 'Front-facing silk flower decoration', 'Standard production', 'Standard installation']),
      separate: t(['현장 운송비', '철거 및 회수비', '지방 출장비', '야간·특수 설치비', '추가 플라워'], ['On-site transport fee', 'Dismantling and collection fee', 'Travel fee outside the Seoul area', 'Night-time or special installation fee', 'Additional flowers']),
      notes: t(['공간의 규모와 웨딩 콘셉트, 플라워 구성에 따라 최종 견적이 달라질 수 있으며, 운송 및 철거 비용은 행사 장소와 일정에 따라 별도 안내됩니다.'], ['The final quote may vary according to the scale of the space, wedding concept and floral composition. Transport and dismantling fees are quoted separately according to the event location and schedule.']),
    },
    theme: t(['A Garden Between Spring & Summer', '봄과 여름 사이, 화사하게 피어난 정원', '핑크 작약의 풍성한 아름다움에 하늘빛 클레마티스와 보라 장미, 그린 수국을 더해 다채로운 색감의 플로럴 아치를 완성했습니다.', '봄의 화사함과 여름의 싱그러움이 자연스럽게 어우러지는 컬러 팔레트로, 풍성하면서도 생동감 있는 정원의 모습을 표현했습니다.', '서로 다른 색과 꽃의 형태가 조화롭게 어우러져 공간을 더욱 화사하고 로맨틱하게 연출하는 웨딩 플라워 디자인입니다.'], ['A Garden Between Spring & Summer', 'A radiant garden blooming between spring and summer', 'Lush pink peonies are layered with sky-blue clematis, purple roses and green hydrangeas to create a floral arch rich in colour.', 'A palette where the brightness of spring meets the freshness of summer expresses a generous, vibrant garden in bloom.', 'Different colours and floral forms come together in harmony, creating a luminous and romantic wedding setting.']),
    spaces: t(['웨딩 세레모니', '포토존', '웨딩홀', '스몰웨딩', '이벤트 공간'], ['Wedding ceremonies', 'Photo zones', 'Wedding halls', 'Small weddings', 'Event spaces']),
    details: [['Design Type', t('Front Facing · 정면형', 'Front Facing')], ['Arch Height', t('Approx. 180cm')], ['Finished Height', t('Approx. 200–220cm')]],
    productionTime: t('상담 후 일정에 따라 안내드립니다.', 'The production schedule will be confirmed after consultation.'),
    orderGuide: {
      ko: { sections: [
        ['01 | Design & Production', ['모든 웨딩 아치는 공간과 웨딩 콘셉트에 맞춰 제작되는 주문 제작 플라워 디자인입니다.', '상담을 통해 원하시는 색감과 분위기, 공간의 규모와 형태를 확인한 후 디자인 및 견적을 안내드립니다.', '기본 디자인을 바탕으로 플라워 구성과 컬러, 볼륨 조정이 가능합니다.', '조화 및 소재는 수급 상황에 따라 유사한 소재로 변경될 수 있으며, 전체적인 색감과 분위기를 유지하여 제작합니다.', '제작 기간은 행사 일정 및 디자인에 따라 상담 후 안내드립니다.']],
        ['02 | Delivery & Installation', ['아치 구조물 및 플라워 장식이 포함된 상품입니다.', '현장 운송비, 철거 및 회수 비용은 행사 장소와 일정에 따라 별도 안내드립니다.', '지방 출장, 야간 및 특수 설치가 필요한 경우 추가 비용이 발생할 수 있습니다.', '설치 및 철거 일정은 행사장 운영 시간과 현장 상황에 따라 사전 협의합니다.']],
        ['03 | Order & Cancellation', ['모든 웨딩 아치는 주문 후 고객님의 행사에 맞춰 제작되는 주문 제작 상품입니다.', '주문 확정 후 소재 준비 및 제작이 시작되므로, 제작 시작 이후에는 단순 변심에 의한 취소·교환·환불이 어렵습니다.', '행사 일정과 장소가 확정된 후 상담을 진행해 주세요.']],
        ['04 | Product Guide', ['플라워의 형태와 배치는 샘플 이미지와 일부 차이가 있을 수 있습니다.', '조화 특성상 소재의 미세한 차이, 접착 흔적 등이 있을 수 있습니다.', '실제 완성 형태와 색감은 공간 및 조명 환경에 따라 다소 차이가 있을 수 있습니다.']],
      ] },
      en: { sections: [
        ['01 | Design & Production', ['Every wedding arch is a bespoke floral design created for the space and wedding concept.', 'After discussing your preferred palette and atmosphere as well as the scale and form of the space, we provide a design proposal and quote.', 'The floral composition, colour and volume can be adjusted based on the standard design.', 'Artificial flowers and materials may be replaced with similar alternatives depending on availability while preserving the overall palette and atmosphere.', 'The production period is confirmed after consultation according to the event schedule and design.']],
        ['02 | Delivery & Installation', ['The product includes the arch structure and floral decoration.', 'On-site transport, dismantling and collection fees are quoted separately according to the event location and schedule.', 'Additional fees may apply for travel outside the Seoul area, night-time work or special installation.', 'Installation and dismantling schedules are agreed in advance according to venue operating hours and on-site conditions.']],
        ['03 | Order & Cancellation', ['Every wedding arch is made to order for the customer’s event.', 'Materials are prepared and production begins after order confirmation, so cancellation, exchange or refund due to a change of mind is unavailable once production has begun.', 'Please inquire after the event date and location have been confirmed.']],
        ['04 | Product Guide', ['The floral form and placement may differ slightly from the sample images.', 'Artificial flower materials may have minor variations or visible adhesive traces.', 'The finished form and colour may appear slightly different according to the space and lighting conditions.']],
      ] },
    },
  }),
  '캔들라브라': base({
    title: t('연보라 캔들라브라', 'Lavender Candelabra'), price: '300,000원', priceOptions: prices(['W40~45 × H40~45cm', '30만원', 'KRW 300,000']),
    about: t(['메이플레르의 캔들라브라는 프리미엄 조화 소재를 사용하여 생화의 자연스러운 형태와 섬세한 컬러감을 담아 제작합니다.', '꽃 한 송이마다 자연스러운 방향과 균형을 고려하여, 꽃과 빛이 조화롭게 어우러지는 플라워 오브제로 완성합니다.', '낮에는 공간을 아름답게 장식하는 오브제로, 저녁에는 캔들의 은은한 빛과 함께 더욱 깊은 분위기를 연출합니다.'], ['Mayfleur candelabras use premium artificial flowers to capture natural form and delicate colour.', 'Every stem is balanced to create harmony between flowers and light.', 'By day it decorates the space; by evening candlelight creates a deeper atmosphere.']),
    theme: t(['연보라와 라벤더, 화이트 톤의 꽃들이 은은하게 어우러진 캔들라브라입니다.', '부드럽게 번지는 보랏빛 컬러와 자연스럽게 흐르는 꽃의 형태가 마치 모네의 수련을 떠올리게 하는 몽환적인 분위기를 담아냅니다.', '꽃과 빛이 함께 어우러질 때 더욱 아름다운 실루엣을 완성하며, 공간에 차분하면서도 신비로운 분위기를 더하는 플라워 오브제입니다.'], ['A candelabra where pale violet, lavender and white flowers blend softly.', 'Flowing purple tones evoke the dreamlike mood of Monet’s water lilies.', 'Flowers and candlelight create a beautiful silhouette with calm mystery.']),
    featureTitle: t('Front Facing Design | 정면 중심 디자인', 'Front Facing Design'), feature: t(['정면에서 가장 아름다운 실루엣이 돋보이도록 디자인한 캔들라브라입니다.', '메인 플라워와 풍성한 볼륨감은 정면을 중심으로 구성하며, 뒤쪽에도 자연스러운 소재를 함께 배치하여 어느 방향에서도 입체감을 느낄 수 있도록 제작합니다.', '콘솔, 다이닝 테이블, 벽면을 배경으로 한 공간에서 가장 아름다운 형태가 돋보이는 디자인입니다.', '사방에서 동일한 볼륨감으로 감상하는 All Around Design을 원하시는 경우 별도 상담을 통해 제작 가능하며, 디자인 구성 및 사용 소재에 따라 추가 비용이 발생할 수 있습니다.'], ['Designed to reveal its most beautiful silhouette from the front.', 'Main flowers and volume focus forward, with natural materials at the back for dimension.', 'It is most beautiful on a console or dining table against a wall.', 'An All Around Design is available through consultation and may incur an additional fee.']),
    spaces: t(['다이닝 테이블 스타일링', '거실 및 콘솔 장식', '웨딩 및 브라이덜 샤워 스타일링', '카페 및 쇼룸 디스플레이', '브랜드 및 호텔 공간 연출', '계절을 담은 공간 스타일링'], ['Dining table styling', 'Living room and console décor', 'Weddings and bridal showers', 'Cafés and showrooms', 'Brand and hotel spaces', 'Seasonal spatial styling']),
    details: details({ collection: 'Floral Candelabra', size: t('약 W40~45 × H40~45cm\n(디자인에 따라 사이즈는 달라질 수 있습니다.)', 'Approx. W40–45 × H40–45cm\n(Size may vary by design.)'), included: t('Flower Arrangement + Candelabra\n(캔들은 포함되어 있지 않습니다.)', 'Flower Arrangement + Candelabra\n(Candles are not included.)') }),
    custom: t(['메이플레르의 디자인과 컬러 무드를 유지하는 범위 내에서 일부 꽃 컬러 또는 소재의 소폭 조정이 가능합니다.', '사방에서 동일한 볼륨감으로 감상하는 All Around Design 제작도 가능합니다. (추가 비용 발생)', '전체적인 디자인 변경이나 새로운 구성의 제작은 Custom Order를 통해 별도로 상담 가능합니다.'], ['Selected flower colours or materials can be adjusted while preserving Mayfleur’s design mood.', 'An All Around Design is available for an additional fee.', 'Significant changes or new compositions are available through Custom Order consultation.']),
  }),
}
