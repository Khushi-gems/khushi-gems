import type { Product, Review, MegaMenu, Category, Collection, BlogPost, InstagramPost, RingSizeGuideEntry, RingSizeGuideEntryInches } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const heroSlides = [
  { id: 1, title: 'Timeless Engagement', imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204521/IMG_0054_obex9g.jpg", alt: 'Diamond engagement rings', imageHint: 'engagement rings' },
  { id: 2, title: 'Exquisite Collections', imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204520/IMG_0056_azkwbt.jpg", alt: 'A stunning jewelry collection', imageHint: 'jewelry collection' },
  { id: 3, title: 'High Jewellery', imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204519/IMG_0055_jsx1vd.jpg", alt: 'Model wearing a high jewellery diamond collection', imageHint: 'diamond model' },
  { id: 4, title: 'Artisan Craftsmanship', imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204519/IMG_0057_wcyyzc.jpg", alt: 'Luxury jewelry on display', imageHint: 'luxury jewelry' },
];

export const goldBannerSlides = [
  { id: 1, imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204551/IMG_0050_xyzfzf.jpg", alt: 'Model wearing gold jewelry', imageHint: 'gold jewelry model' },
  { id: 2,  imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204517/IMG_0051_m9qy2u.jpg", alt: 'Close-up of a gold necklace', imageHint: 'gold necklace closeup' },
  { id: 3, imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204517/IMG_0049_utxkvl.jpg", alt: 'Stack of gold bangles', imageHint: 'gold bangles stack' },
  { id: 4, imageUrl: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770204518/IMG_0052_dijhsr.jpg", alt: 'Stack of gold bangles', imageHint: 'gold bangles stack' },
];


export const silverCategories: Category[] = [
  {
    name: 'Necklaces',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029035/NECKLACES_1_rqiqxe.jpg',
    imageHint: 'necklaces jewelry',
  },
  {
    name: 'Earrings',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029034/EARRINGS_1_qfb42y.jpg',
    imageHint: 'earrings jewelry',
  },
  {
    name: 'Pendants',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029037/PENDANTS_1_qc58th.jpg',
    imageHint: 'pendant jewelry',
  },
  {
    name: 'Rings',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029035/RINGS_ic2zke.jpg',
    imageHint: 'rings jewelry',
  },
  {
    name: 'Bangles/bracelets',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770028126/BANGLES_xrijmd.jpg',
    imageHint: 'bracelet jewelry',
  },
  {
    name: 'Nosepin',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770043635/Gemini_Generated_Image_ll0d5ill0d5ill0d_1_lfdv3h.png',
    imageHint: 'nosepin jewelry',
  },
  {
    name: 'Chokers',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029041/CHOKER_NECKLACE_1_dehnuv.jpg',
    imageHint: 'choker necklace',
  },
  {
    name: 'Silver Accessories/Gift Corner',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029035/SILVER_ACCESSORIES_1_rhxqip.jpg',
    imageHint: 'fashion accessories',
  },
  {
    name: 'Maang Tikka',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770043636/Gemini_Generated_Image_nkhzbynkhzbynkhz_1_faprf0.png',
    imageHint: 'maangtikka jewelry',
  },
  {
    name: 'Diamond Jewellery',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770029034/DIAMOND_JEWELLERY_1_kyao1t.jpg',
    imageHint: 'diamond jewelry',
  },
];


export const goldCategories: Category[] = [
  {
    name: 'Necklaces',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030200/NECKLACES_cqo6xg.jpg',
    imageHint: 'necklaces jewelry',
  },
  {
    name: 'Earrings',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770041728/earrings_1_de8vvu.jpg',
    imageHint: 'earrings jewelry',
  },
  {
    name: 'Pendants',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030196/PENDANTS_anibus.jpg',
    imageHint: 'pendant jewelry',
  },
  {
    name: 'Rings',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030196/RINGS_b4s0na.jpg',
    imageHint: 'rings jewelry',
  },
  {
    name: 'Bangles/bracelets',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030191/BANGLES_e5kc88.jpg',
    imageHint: 'bracelet jewelry',
  },
  {
    name: 'Nosepin',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770043275/Gemini_Generated_Image_inzz47inzz47inzz_1_s1qfgg.png',
    imageHint: 'nosepin jewelry',
  },
  {
    name: 'Chokers',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030195/CHOKER_cymlni.jpg',
    imageHint: 'choker necklace',
  },
  {
    name: 'Gold Accessories/Gift Corner',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030197/SILVER_ACCESSORIES_yr0e43.jpg',
    imageHint: 'fashion accessories',
  },
  {
    name: 'Maang Tikka',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030192/MANGTEEKA_gglpk1.jpg',
    imageHint: 'maangtikka jewelry',
  },
  {
    name: 'Diamond Jewellery',
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770030199/DIAMOND_JEWEL_svmah6.jpg',
    imageHint: 'diamond jewelry',
  },
];


export const collections: Collection[] = [
  { 
    id: 1, 
    title: 'Chandigarh', 
    slug: 'Chandigarh', 
    description: 'Our Chandigarh exhibition presents an elegant selection of handcrafted jewelry, designed to be treasured.', 
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770200261/WhatsApp_Image_2026-02-04_at_2.34.05_PM_1_hzw0pm.jpg', 
    imageHint: 'spring collection',
    gallery: [
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1770199816/chandigarh_2024_a1uxzm.mov",
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770200521/Screenshot_2026-02-04_155114_qwbfrx.png",
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770200261/WhatsApp_Image_2026-02-04_at_2.34.05_PM_1_hzw0pm.jpg"  
    ],
    quote: "Timeless elegance, showcased in Chandigarh."
  },
  { 
    id: 2, 
    title: 'Dubai', 
    slug: 'Dubai', 
    description: 'An exclusive jewelry exhibition in Dubai, presenting refined craftsmanship and timeless luxury', 
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770197879/WhatsApp_Image_2026-02-04_at_2.34.04_PM_e85hfj.jpg', 
    imageHint: 'light jewelry',
    gallery: [
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1770200624/dubai_2023_2_zcweym.mov", 
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80", 
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1770200754/DUBAI_2023_tyci2k.mp4"  
    ],
    quote: "Where craftsmanship meets global elegance."
  },
  { 
    id: 3, 
    title: 'Hyderabad', 
    slug: 'Hyderabad', 
    description: 'A curated jewelry exhibition in Hyderabad, highlighting heritage craftsmanship and elegant design', 
    imageUrl: 'https://res.cloudinary.com/dum5jqndc/image/upload/v1770197879/WhatsApp_Image_2026-02-04_at_2.34.05_PM_ix3ve1.jpg', 
    imageHint: 'bridal jewelry',
    gallery: [
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1769761971/IMG_9198_mqmx9l.mov", 
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770197879/WhatsApp_Image_2026-02-04_at_2.34.04_PM_e85hfj.jpg", 
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770197879/WhatsApp_Image_2026-02-04_at_2.34.03_PM_apktdx.jpg"  
    ],
    quote: "Timeless jewelry, unveiled in Hyderabad"
  },
  { 
    id: 4, 
    title: 'Mumbai', 
    slug: 'Mumbai', 
    description: 'A curated jewelry exhibition in Mumbai, celebrating contemporary style and heritage craftsmanship.', 
    imageUrl:'https://res.cloudinary.com/dum5jqndc/image/upload/v1770200839/WhatsApp_Image_2026-02-04_at_2.34.04_PM_1_yj8q8t.jpg', 
    imageHint: 'eternal jewelry',
    gallery: [
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1769761971/IMG_9198_mqmx9l.mov", 
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770201059/Screenshot_2026-02-04_160030_rik8ls.png",
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770200839/WhatsApp_Image_2026-02-04_at_2.34.04_PM_1_yj8q8t.jpg"  
    ],
    quote: "Designed for modern elegance."
  },
   { 
    id: 5, 
    title: 'Delhi', 
    slug: 'Delhi', 
    description: 'An exclusive jewelry exhibition in Delhi, showcasing classic artistry with refined sophistication.', 
    imageUrl:'https://res.cloudinary.com/dum5jqndc/image/upload/v1770201191/WhatsApp_Image_2026-02-04_at_2.34.03_PM_1_tl2fzz.jpg',
    imageHint: 'royal jewelry',
    gallery: [
      "https://res.cloudinary.com/dum5jqndc/video/upload/v1770201285/hyd_2025_hmfcnz.mov", // Architecture
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770200261/WhatsApp_Image_2026-02-04_at_2.34.05_PM_1_hzw0pm.jpg", // Heavy Polki
      "https://res.cloudinary.com/dum5jqndc/image/upload/v1770201191/WhatsApp_Image_2026-02-04_at_2.34.03_PM_1_tl2fzz.jpg"  // Luxury Texture
    ],
    quote: "Heritage redefined with elegance."
  },
 /*{ 
    id: 6, 
    title: 'Jaipur By Night', 
    slug: 'jaipur-by-night', 
    description: 'Explore the mystique of Jaipur after dark with this collection of bold and enchanting designs.', 
    imageUrl: PlaceHolderImages.find(p => p.id === "coll6")?.imageUrl ?? "", 
    imageHint: 'jaipur night',
    gallery: [
      "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?auto=format&fit=crop&w=800&q=80", // Dark/Bokeh
      "https://images.unsplash.com/photo-1605218427368-43d99049ddad?auto=format&fit=crop&w=800&q=80", // Emerald/Dark
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"  // Evening Fashion
    ],
    quote: "The night is more alive and more richly colored than the day."
  },
  { 
    id: 7, 
    title: 'Desert Bloom', 
    slug: 'desert-bloom', 
    description: 'Inspired by the resilient beauty of desert flowers, this collection features delicate and organic forms.', 
    imageUrl: PlaceHolderImages.find(p => p.id === "coll7")?.imageUrl ?? "", 
    imageHint: 'desert flower',
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", // Desert/Sand
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80", // Gold on Sand
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"  // Organic Texture
    ],
    quote: "Beauty is resilience blooming where it is least expected."
  },
  { 
    id: 8, 
    title: 'Monsoon Magic', 
    slug: 'monsoon-magic', 
    description: 'A collection that captures the refreshing and transformative energy of the Indian monsoon.', 
    imageUrl: PlaceHolderImages.find(p => p.id === "coll8")?.imageUrl ?? "", 
    imageHint: 'monsoon rain',
    gallery: [
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    ],
    quote: "The earth comes alive with the rhythm of the rain, washing away the dust of yesterday."
  },*/
];

export const reviews: Review[] = [
  { id: 1, name: 'Priya S.', comment: 'Absolutely in love with my new necklace! The craftsmanship is outstanding.', avatarUrl: 'https://picsum.photos/seed/rev1/40/40' },
  { id: 2, name: 'Anjali M.', comment: 'The earrings are even more beautiful in person. Fast delivery and great customer service.', avatarUrl: 'https://picsum.photos/seed/rev2/40/40' },
  { id: 3, name: 'Rohan K.', comment: 'Bought a gift for my wife and she was thrilled. The quality is top-notch.', avatarUrl: 'https://picsum.photos/seed/rev3/40/40' },
  { id: 4, name: 'Sneha P.', comment: 'I wear my ring every day! It is so simple and elegant, exactly what I was looking for.', avatarUrl: 'https://picsum.photos/seed/rev4/40/40' },
  { id: 5, name: 'Vikram R.', comment: "The customer support was fantastic. They helped me choose the perfect anniversary gift.", avatarUrl: 'https://picsum.photos/seed/rev5/40/40' },
  { id: 6, name: 'Meera T.', comment: 'The packaging was as beautiful as the jewelry inside. It felt like opening a treasure.', avatarUrl: 'https://picsum.photos/seed/rev6/40/40' },
];

export const silverMegaMenu: MegaMenu[] = [
    {
        title: "CATEGORIES",
        items: [
            { name: "Necklaces", href: "/category/Necklaces" },
            { name: "Earrings", href: "/category/Earrings" },
            { name: "Pendants", href: "/category/Pendants" },
            { name: "Rings", href: "/category/Rings" },
            { name: "Bracelets", href: "/category/Bracelets" },
            { name: "Nosepin", href: "/category/Nosepin" },
            { name: "Chokers", href: "/category/Chokers" },
            { name: "Silver Accessories/Gift Corner", href: "/category/Silver%20Accessories%2FGift%20Corner" },
            { name: "Maang Tikka", href: "/category/Maang%20Tikka" },
            { name: "Diamond Jewellery", href: "/category/Diamond%20Jewellery" },
        ]
    },
    {
        title: "MATERIALS",
        items: [
            { name: "Gold", href: "/gold" },
            { name: "Silver", href: "/" },
        ]
    }
];

export const goldMegaMenu: MegaMenu[] = [
    {
        title: "CATEGORIES",
        items: [
            { name: "Necklaces", href: "/gold/Necklaces" },
            { name: "Earrings", href: "/gold/Earrings" },
            { name: "Pendants", href: "/gold/Pendants" },
            { name: "Rings", href: "/gold/Rings" },
            { name: "Bracelets", href: "/gold/Bracelets" },
            { name: "Nosepin", href: "/category/Nosepin" },
            { name: "Chokers", href: "/category/Chokers" },
            { name: "Gold Accessories/Gift Corner", href: "/category/Gold%20Accessories%2FGift%20Corner" },
            { name: "Maang Tikka", href: "/category/Maang%20Tikka" },
            { name: "Diamond Jewellery", href: "/category/Diamond%20Jewellery" },
        ]
    },
    {
        title: "MATERIALS",
        items: [
            { name: "Gold", href: "/gold" },
            { name: "Silver", href: "/" },
        ]
    }
];



export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Styling Philosophy",
        excerpt: "Dressing Myself Up: The Absolute Philosophy I just finished an interview wherein a lovely",
        content: "Layering necklaces is a beautiful way to express your personal style. Start with a delicate choker as your base. Add a slightly longer chain with a small pendant. For the final touch, a longer necklace with a statement piece can complete the look. Don't be afraid to mix metals like gold and silver for a modern twist. The key is to vary lengths and textures to create a balanced and interesting look.",
        imageUrl: "https://picsum.photos/seed/blog1/600/800",
        imageHint: "woman gold jacket",
        date: "2025-04-21",
        slug: "/blog/styling-philosophy"
    },
    {
        id: 2,
        title: "An Indian Musing",
        excerpt: "Is this appropriate? The other day we were at a Diwali party, and my husband Ben and I were",
        content: "The 4 Cs—cut, color, clarity, and carat—are the global standard for assessing the quality of diamonds. The cut is the most important factor for a diamond's sparkle. Color refers to the lack of color, with D being colorless. Clarity measures inclusions, and carat is the diamond's weight. Beyond the technical aspects, consider your partner's style. Do they prefer vintage, modern, or classic designs? The perfect ring is a reflection of your love and their personality.",
        imageUrl: "https://picsum.photos/seed/blog2/600/800",
        imageHint: "woman white dress",
        date: "2024-11-11",
        slug: "/blog/indian-musing"
    },
    {
        id: 3,
        title: "An Indian Summer",
        excerpt: "My utopia It's a Sunday afternoon and I'm at Ma's, sprawled out on the floor, melting off a",
        content: "To keep your handmade jewelry looking its best, avoid exposing it to harsh chemicals, perfumes, and lotions. Store each piece separately in a soft pouch to prevent scratching. To clean, use a soft, lint-free cloth. For a deeper clean, a gentle soap and water solution can be used, but be sure to dry it thoroughly. Regular care will ensure your jewelry remains a treasured part of your collection for years to come.",
        imageUrl: "https://picsum.photos/seed/blog3/600/800",
        imageHint: "hands holding mango",
        date: "2024-06-06",
        slug: "/blog/indian-summer"
    },
     {
        id: 4,
        title: "The Meaning Behind Gemstones",
        excerpt: "Every gemstone has a unique story and meaning. Explore the symbolism behind popular stones like sapphires, emeralds, and rubies, and find the one that resonates with you.",
        content: "Gemstones have been cherished for centuries not just for their beauty, but for their believed powers and symbolism. Sapphires are associated with wisdom and royalty. Emeralds symbolize hope and renewal. Rubies represent passion and protection. Choosing a gemstone with a personal meaning can add a deeper layer of significance to your jewelry. Whether it's your birthstone or a stone that resonates with your spirit, it makes your piece uniquely yours.",
        imageUrl: "https://picsum.photos/seed/blog4/800/600",
        imageHint: "gemstones meaning",
        date: "2023-11-19",
        slug: "/blog/gemstone-meanings"
    }
];

export const instagramPosts: InstagramPost[] = [
  { id: 1, imageUrl: PlaceHolderImages.find(p => p.id === "insta1")?.imageUrl ?? "", imageHint: 'jewelry flatlay', slug: '#' },
  { id: 2, imageUrl: PlaceHolderImages.find(p => p.id === "insta2")?.imageUrl ?? "", imageHint: 'earrings model', slug: '#' },
  { id: 3, imageUrl: PlaceHolderImages.find(p => p.id === "insta3")?.imageUrl ?? "", imageHint: 'ring stack', slug: '#' },
  { id: 4, imageUrl: PlaceHolderImages.find(p => p.id === "insta4")?.imageUrl ?? "", imageHint: 'necklace detail', slug: '#' },
  { id: 5, imageUrl: PlaceHolderImages.find(p => p.id === "insta5")?.imageUrl ?? "", imageHint: 'bracelet lifestyle', slug: '#' },
  { id: 6, imageUrl: PlaceHolderImages.find(p => p.id === "insta6")?.imageUrl ?? "", imageHint: 'jewelry box', slug: '#' },
];

export const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"];

export const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua new Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export const ringSizes = [
  '4', '4 ¼', '4 ½', '4 ¾', '5', '5 ¼', '5 ½', '5 ¾', '6', '6 ¼', '6 ½', '6 ¾', '7', '7 ¼', '7 ½', '7 ¾', '8', '8 ¼', '8 ½', '8 ¾', '9', '9 ¼', '9 ½', '9 ¾', 'Custom'
];

export const ringSizeGuide: RingSizeGuideEntry[] = [
    { insideDiameterMm: "11.63", insideCircumferenceMm: "36.5", usCanadaMexico: "0", ukAustralia: "", eastAsia: "", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "11.84", insideCircumferenceMm: "37.2", usCanadaMexico: "1/4", ukAustralia: "", eastAsia: "", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "12.04", insideCircumferenceMm: "37.8", usCanadaMexico: "1/2", ukAustralia: "A", eastAsia: "", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "12.24", insideCircumferenceMm: "38.5", usCanadaMexico: "3/4", ukAustralia: "A 1/2", eastAsia: "", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "12.45", insideCircumferenceMm: "39.1", usCanadaMexico: "1", ukAustralia: "B", eastAsia: "1", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "12.65", insideCircumferenceMm: "39.7", usCanadaMexico: "1 1/4", ukAustralia: "B 1/2", eastAsia: "", india: "", italySpainSwitzerland: "" },
    { insideDiameterMm: "12.85", insideCircumferenceMm: "40.4", usCanadaMexico: "1 1/2", ukAustralia: "C", eastAsia: "", india: "", italySpainSwitzerland: "0.4" },
    { insideDiameterMm: "13.06", insideCircumferenceMm: "41", usCanadaMexico: "1 3/4", ukAustralia: "C 1/2", eastAsia: "", india: "1", italySpainSwitzerland: "1" },
    { insideDiameterMm: "13.26", insideCircumferenceMm: "41.7", usCanadaMexico: "2", ukAustralia: "D", eastAsia: "2", india: "2", italySpainSwitzerland: "1.7" },
    { insideDiameterMm: "13.46", insideCircumferenceMm: "42.3", usCanadaMexico: "2 1/4", ukAustralia: "D 1/2", eastAsia: "", india: "", italySpainSwitzerland: "2.3" },
    { insideDiameterMm: "13.67", insideCircumferenceMm: "42.9", usCanadaMexico: "2 1/2", ukAustralia: "E", eastAsia: "3", india: "3", italySpainSwitzerland: "2.9" },
    { insideDiameterMm: "13.87", insideCircumferenceMm: "43.6", usCanadaMexico: "2 3/4", ukAustralia: "E 1/2", eastAsia: "", india: "4", italySpainSwitzerland: "3.6" },
    { insideDiameterMm: "14.07", insideCircumferenceMm: "44.2", usCanadaMexico: "3", ukAustralia: "F", eastAsia: "4", india: "", italySpainSwitzerland: "4.2" },
    { insideDiameterMm: "14.27", insideCircumferenceMm: "44.8", usCanadaMexico: "3 1/4", ukAustralia: "F 1/2", eastAsia: "5", india: "5", italySpainSwitzerland: "4.8" },
    { insideDiameterMm: "14.48", insideCircumferenceMm: "45.5", usCanadaMexico: "3 1/2", ukAustralia: "G", eastAsia: "", india: "", italySpainSwitzerland: "5.5" },
    { insideDiameterMm: "14.68", insideCircumferenceMm: "46.1", usCanadaMexico: "3 3/4", ukAustralia: "G 1/2", eastAsia: "6", india: "6", italySpainSwitzerland: "6.1" },
    { insideDiameterMm: "14.88", insideCircumferenceMm: "46.8", usCanadaMexico: "4", ukAustralia: "H", eastAsia: "7", india: "", italySpainSwitzerland: "6.8" },
    { insideDiameterMm: "15.09", insideCircumferenceMm: "47.4", usCanadaMexico: "4 1/4", ukAustralia: "H 1/2", eastAsia: "", india: "7", italySpainSwitzerland: "7.4" },
    { insideDiameterMm: "15.29", insideCircumferenceMm: "48", usCanadaMexico: "4 1/2", ukAustralia: "I", eastAsia: "8", india: "8", italySpainSwitzerland: "8" },
    { insideDiameterMm: "15.49", insideCircumferenceMm: "48.7", usCanadaMexico: "4 3/4", ukAustralia: "J", eastAsia: "", india: "9", italySpainSwitzerland: "8.7" },
    { insideDiameterMm: "15.7", insideCircumferenceMm: "49.3", usCanadaMexico: "5", ukAustralia: "J 1/2", eastAsia: "9", india: "", italySpainSwitzerland: "9.3" },
    { insideDiameterMm: "15.9", insideCircumferenceMm: "50", usCanadaMexico: "5 1/4", ukAustralia: "K", eastAsia: "", india: "10", italySpainSwitzerland: "10" },
    { insideDiameterMm: "16.1", insideCircumferenceMm: "50.6", usCanadaMexico: "5 1/2", ukAustralia: "K 1/2", eastAsia: "10", india: "", italySpainSwitzerland: "10.6" },
    { insideDiameterMm: "16.31", insideCircumferenceMm: "51.2", usCanadaMexico: "5 3/4", ukAustralia: "L", eastAsia: "", india: "11", italySpainSwitzerland: "11.2" },
    { insideDiameterMm: "16.51", insideCircumferenceMm: "51.9", usCanadaMexico: "6", ukAustralia: "L 1/2", eastAsia: "11", india: "12", italySpainSwitzerland: "11.9" },
    { insideDiameterMm: "16.71", insideCircumferenceMm: "52.5", usCanadaMexico: "6 1/4", ukAustralia: "M", eastAsia: "12", india: "", italySpainSwitzerland: "12.5" },
    { insideDiameterMm: "16.92", insideCircumferenceMm: "53.1", usCanadaMexico: "6 1/2", ukAustralia: "M 1/2", eastAsia: "13", india: "13", italySpainSwitzerland: "13.1" },
    { insideDiameterMm: "17.12", insideCircumferenceMm: "53.8", usCanadaMexico: "6 3/4", ukAustralia: "N", eastAsia: "", india: "", italySpainSwitzerland: "13.8" },
    { insideDiameterMm: "17.32", insideCircumferenceMm: "54.4", usCanadaMexico: "7", ukAustralia: "N 1/2", eastAsia: "14", india: "14", italySpainSwitzerland: "14.4" },
    { insideDiameterMm: "17.53", insideCircumferenceMm: "55.1", usCanadaMexico: "7 1/4", ukAustralia: "O", eastAsia: "", india: "15", italySpainSwitzerland: "15.1" },
    { insideDiameterMm: "17.73", insideCircumferenceMm: "55.7", usCanadaMexico: "7 1/2", ukAustralia: "O 1/2", eastAsia: "15", india: "", italySpainSwitzerland: "15.7" },
    { insideDiameterMm: "17.93", insideCircumferenceMm: "56.3", usCanadaMexico: "7 3/4", ukAustralia: "P", eastAsia: "", india: "16", italySpainSwitzerland: "16.3" },
    { insideDiameterMm: "18.14", insideCircumferenceMm: "57", usCanadaMexico: "8", ukAustralia: "P 1/2", eastAsia: "16", india: "17", italySpainSwitzerland: "17" },
    { insideDiameterMm: "18.34", insideCircumferenceMm: "57.6", usCanadaMexico: "8 1/4", ukAustralia: "Q", eastAsia: "", india: "", italySpainSwitzerland: "17.6" },
    { insideDiameterMm: "18.54", insideCircumferenceMm: "58.3", usCanadaMexico: "8 1/2", ukAustralia: "Q 1/2", eastAsia: "17", india: "18", italySpainSwitzerland: "18.3" },
    { insideDiameterMm: "18.75", insideCircumferenceMm: "58.9", usCanadaMexico: "8 3/4", ukAustralia: "R", eastAsia: "", india: "19", italySpainSwitzerland: "18.9" },
    { insideDiameterMm: "18.95", insideCircumferenceMm: "59.5", usCanadaMexico: "9", ukAustralia: "R 1/2", eastAsia: "18", india: "", italySpainSwitzerland: "19.5" },
    { insideDiameterMm: "19.15", insideCircumferenceMm: "60.2", usCanadaMexico: "9 1/4", ukAustralia: "S", eastAsia: "", india: "20", italySpainSwitzerland: "20.2" },
    { insideDiameterMm: "19.35", insideCircumferenceMm: "60.8", usCanadaMexico: "9 1/2", ukAustralia: "S 1/2", eastAsia: "19", india: "21", italySpainSwitzerland: "20.8" },
    { insideDiameterMm: "19.56", insideCircumferenceMm: "61.4", usCanadaMexico: "9 3/4", ukAustralia: "T", eastAsia: "", india: "", italySpainSwitzerland: "21.4" },
    { insideDiameterMm: "19.76", insideCircumferenceMm: "62.1", usCanadaMexico: "10", ukAustralia: "T 1/2", eastAsia: "20", india: "22", italySpainSwitzerland: "22.1" },
    { insideDiameterMm: "19.96", insideCircumferenceMm: "62.7", usCanadaMexico: "10 1/4", ukAustralia: "U", eastAsia: "21", india: "23", italySpainSwitzerland: "22.7" },
    { insideDiameterMm: "20.17", insideCircumferenceMm: "63.4", usCanadaMexico: "10 1/2", ukAustralia: "U 1/2", eastAsia: "22", india: "", italySpainSwitzerland: "23.4" },
    { insideDiameterMm: "20.37", insideCircumferenceMm: "64", usCanadaMexico: "10 3/4", ukAustralia: "V", eastAsia: "", india: "24", italySpainSwitzerland: "24" },
    { insideDiameterMm: "20.57", insideCircumferenceMm: "64.6", usCanadaMexico: "11", ukAustralia: "V 1/2", eastAsia: "23", india: "25", italySpainSwitzerland: "24.6" },
    { insideDiameterMm: "20.78", insideCircumferenceMm: "65.3", usCanadaMexico: "11 1/4", ukAustralia: "W", eastAsia: "", india: "", italySpainSwitzerland: "25.3" },
    { insideDiameterMm: "20.98", insideCircumferenceMm: "65.9", usCanadaMexico: "11 1/2", ukAustralia: "W 1/2", eastAsia: "24", india: "26", italySpainSwitzerland: "25.9" },
    { insideDiameterMm: "21.18", insideCircumferenceMm: "66.6", usCanadaMexico: "11 3/4", ukAustralia: "X", eastAsia: "", india: "", italySpainSwitzerland: "26.6" },
    { insideDiameterMm: "21.39", insideCircumferenceMm: "67.2", usCanadaMexico: "12", ukAustralia: "X 1/2", eastAsia: "25", india: "27", italySpainSwitzerland: "27.2" },
    { insideDiameterMm: "21.59", insideCircumferenceMm: "67.8", usCanadaMexico: "12 1/4", ukAustralia: "Y", eastAsia: "", india: "28", italySpainSwitzerland: "27.8" },
    { insideDiameterMm: "21.79", insideCircumferenceMm: "68.5", usCanadaMexico: "12 1/2", ukAustralia: "Z", eastAsia: "26", india: "", italySpainSwitzerland: "28.5" },
    { insideDiameterMm: "22.0", insideCircumferenceMm: "69.1", usCanadaMexico: "12 3/4", ukAustralia: "Z 1/2", eastAsia: "", india: "29", italySpainSwitzerland: "29.1" },
    { insideDiameterMm: "22.2", insideCircumferenceMm: "69.7", usCanadaMexico: "13", ukAustralia: "", eastAsia: "27", india: "30", italySpainSwitzerland: "29.7" },
    { insideDiameterMm: "22.4", insideCircumferenceMm: "70.4", usCanadaMexico: "13 1/4", ukAustralia: "Z1", eastAsia: "", india: "", italySpainSwitzerland: "30.4" },
    { insideDiameterMm: "22.61", insideCircumferenceMm: "71", usCanadaMexico: "13 1/2", ukAustralia: "", eastAsia: "", india: "31", italySpainSwitzerland: "31" },
    { insideDiameterMm: "22.81", insideCircumferenceMm: "71.7", usCanadaMexico: "13 3/4", ukAustralia: "Z2", eastAsia: "", india: "32", italySpainSwitzerland: "31.7" },
    { insideDiameterMm: "23.01", insideCircumferenceMm: "72.3", usCanadaMexico: "14", ukAustralia: "Z3", eastAsia: "", india: "", italySpainSwitzerland: "32.3" },
    { insideDiameterMm: "23.22", insideCircumferenceMm: "72.9", usCanadaMexico: "14 1/4", ukAustralia: "", eastAsia: "", india: "33", italySpainSwitzerland: "32.9" },
    { insideDiameterMm: "23.42", insideCircumferenceMm: "73.6", usCanadaMexico: "14 1/2", ukAustralia: "Z4", eastAsia: "", india: "", italySpainSwitzerland: "33.6" },
    { insideDiameterMm: "23.62", insideCircumferenceMm: "74.2", usCanadaMexico: "14 3/4", ukAustralia: "", eastAsia: "", india: "34", italySpainSwitzerland: "34.2" },
    { insideDiameterMm: "23.83", insideCircumferenceMm: "74.8", usCanadaMexico: "15", ukAustralia: "", eastAsia: "", india: "35", italySpainSwitzerland: "34.8" },
    { insideDiameterMm: "24.03", insideCircumferenceMm: "75.5", usCanadaMexico: "15 1/4", ukAustralia: "", eastAsia: "", india: "", italySpainSwitzerland: "35.5" },
    { insideDiameterMm: "24.23", insideCircumferenceMm: "76.1", usCanadaMexico: "15 1/2", ukAustralia: "", eastAsia: "", india: "36", italySpainSwitzerland: "36.1" },
    { insideDiameterMm: "24.43", insideCircumferenceMm: "76.8", usCanadaMexico: "15 3/4", ukAustralia: "", eastAsia: "", india: "", italySpainSwitzerland: "36.8" },
    { insideDiameterMm: "24.64", insideCircumferenceMm: "77.4", usCanadaMexico: "16", ukAustralia: "", eastAsia: "", india: "37", italySpainSwitzerland: "37.4" }
  ];

// Ring Size Guide Inches removed for brevity but can be kept as is in your file. 
export const ringSizeGuideInches: RingSizeGuideEntryInches[] = [
    { insideDiameterIn: "0.458", insideCircumferenceIn: "1.44", usCanadaMexico: "0", ukAustralia: "", eastAsia: "", india: "", italySpainSwitzerland: "" },
   
];



export const silverInstagramPosts: InstagramPost[] = [
  { 
    id: 1, 
    imageUrl: "https://i.ibb.co/9kVLGvLy/Whats-App-Image-2026-01-25-at-8-13-39-PM.jpg", 
    imageHint: 'silver reel 1', 
    slug: 'https://www.instagram.com/reel/DLnIlzLzjJq/?igsh=MWE4aDZwZ3dwbXV1cw==' 
  },
  { 
    id: 2, 
    imageUrl: "https://i.ibb.co/1YMfL4mq/Whats-App-Image-2026-01-25-at-8-13-40-PM.jpg", 
    imageHint: 'silver reel 2', 
    slug: 'https://www.instagram.com/reel/DMaYXVjzUKc/?igsh=NTJtY2NyNWNmMnVr' 
  },
  { 
    id: 3, 
    imageUrl: "https://i.ibb.co/YJnZNzd/Whats-App-Image-2026-01-25-at-8-13-40-PM-1.jpg", 
    imageHint: 'silver post 3', 
    slug: 'https://www.instagram.com/p/DMKsfXNzNSv/?igsh=MXZlaDhzNmtndGh2OQ==' 
  },
  { 
    id: 4, 
    imageUrl: "https://i.ibb.co/x93CtB8/Whats-App-Image-2026-01-25-at-8-13-40-PM-2.jpg", 
    imageHint: 'silver post 4', 
    slug: 'https://www.instagram.com/p/DLmLK36TzVY/?igsh=MWowdW1mb3F1eDBrbw==' 
  },
  { 
    id: 5, 
    imageUrl: "https://i.ibb.co/B2gprMGw/Whats-App-Image-2026-01-25-at-8-13-40-PM-3.jpg", 
    imageHint: 'silver reel 5', 
    slug: 'https://www.instagram.com/reel/DLelsr6TZ03/?igsh=MTF5aDU5ZzZqenZz' 
  },
  { 
    id: 6, 
    imageUrl: "https://i.ibb.co/8Lr2gt3V/Screenshot-2026-01-25-201726.png", 
    imageHint: 'silver post 6', 
    slug: 'https://www.instagram.com/p/DLZohcyzmI1/?igsh=aTMzOGI2Mm5oNHh1' 
  },
  { 
    id: 7, 
    imageUrl: "https://i.ibb.co/Z6gj0zJk/Whats-App-Image-2026-01-25-at-8-13-41-PM.jpg", 
    imageHint: 'silver reel 7', 
    slug: 'https://www.instagram.com/reel/DKMrMcTTrXp/?igsh=MW8zdW5lMWRwY212cA==' 
  },
];

export const goldInstagramPosts: InstagramPost[] = [
  { 
    id: 1, 
    imageUrl: "https://i.ibb.co/r2Q5qY55/Whats-App-Image-2026-01-25-at-8-05-58-PM.jpg", 
    imageHint: 'gold reel 1', 
    slug: 'https://www.instagram.com/reel/DKbJvzfxHd6/?igsh=MThicXhubzNiN3I1Ng==' 
  },
  { 
    id: 2, 
    imageUrl: "https://i.ibb.co/4gRMQzz8/Whats-App-Image-2026-01-25-at-8-05-58-PM-1.jpg", 
    imageHint: 'gold reel 2', 
    slug: 'https://www.instagram.com/reel/DQ9Sf5zD1Kg/?igsh=c3llYnB6N3FqaGJy' 
  },
  { 
    id: 3, 
    imageUrl: "https://i.ibb.co/0RsYyYzG/Whats-App-Image-2026-01-25-at-8-05-59-PM.jpg", 
    imageHint: 'gold reel 3', 
    slug: 'https://www.instagram.com/reel/DSMWgPRDylH/?igsh=MWRtdmU5M2VsYXliZg==' 
  },
  { 
    id: 4, 
    imageUrl: "https://i.ibb.co/ZRKR1HRS/Whats-App-Image-2026-01-25-at-8-05-59-PM-1.jpg",
    imageHint: 'gold reel 4', 
    slug: 'https://www.instagram.com/reel/DSRiPmQD4YJ/?igsh=anhjMmljaDhqMWdp' 
  },
  { 
    id: 5, 
    imageUrl: "https://i.ibb.co/S71HQPCs/Whats-App-Image-2026-01-25-at-8-05-59-PM-2.jpg", 
    imageHint: 'gold reel 5', 
    slug: 'https://www.instagram.com/reel/DSCCrScj-h0/?igsh=MWZ3OTNxam9jeTFyaQ==' 
  },
  { 
    id: 6, 
    imageUrl: "https://i.ibb.co/m5VjrZs8/Whats-App-Image-2026-01-25-at-8-06-00-PM.jpg", 
    imageHint: 'gold post 6', 
    slug: 'https://www.instagram.com/p/DNmuzVqxNwH/?img_index=1&igsh=bGF5dWc4ZXFscGVj' 
  },
];