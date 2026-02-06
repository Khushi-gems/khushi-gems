import React from 'react';

const testimonials = [
  {
    id: "01",
    name: "Deepa subramanian",
    image: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770311179/WhatsApp_Image_2026-02-05_at_2.45.13_PM_vk4tfp.jpg",
    text: "Looks like i’m ur brand ambassador, came for a wedding to udaipur, many people enquired abt the piece and I have given ur store name ",
  },
  {
    id: "02",
    name: "Ritu yadav",
    image: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770364424/WhatsApp_Image_2026-02-06_at_1.18.23_PM_fjondw.jpg",
    text: "Quality feels premium with flawless finishing, highly recommended for elegant, timeless and regal jewellery, loved it 💖",
  },
  {
    id: "03",
    name: " Puja gupta",
    image: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770365879/WhatsApp_Image_2026-02-06_at_1.41.30_PM_1_sp9kvi.jpg",
    text: "Absolutely gorgeous necklace set, the kundan work is stunning with ruby drops giving a royal bridal look",
  },
  {
    id: "04",
    name: "Jaansi reddy",
    image: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770364423/WhatsApp_Image_2026-02-06_at_1.17.44_PM_hmsalj.jpg",
    text: "I was looking for minimalist office wear and found the perfect stud earrings here. The packaging was beautiful and delivery was super fast!",
  }, 
  {
    id: "05",
    name: "Deepa",
    image: "https://res.cloudinary.com/dum5jqndc/image/upload/v1770311171/WhatsApp_Image_2026-02-05_at_2.45.29_PM_usnuyt.jpg",
    text: "Wore the choker for the first time today! Thankyou for the lovely piece",
  },
  
];

export default function ReviewsSection() {
  return (
    <section className="w-full bg-[hsl(40,83%,90.2%)] py-24 relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] border border-[#D4AF37]/10 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] border border-[#D4AF37]/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="max-w-3xl mb-16">
          <h2 className="text-6xl font-serif text-black leading-none mb-6">
            The <span className="text-[#D4AF37] font-headline">Legacy</span> of <br /> Our Patrons
          </h2>
          <div className="w-24 h-[1px] bg-black"></div>
        </div>

        {/* Single Line Ribbon Container */}
        <div className="relative">
          {/* Edge Fading Masks for a professional cinematic look */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[hsl(40,83%,90.2%)] to-transparent z-20 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[hsl(40,83%,90.2%)] to-transparent z-20 pointer-events-none hidden md:block" />

          {/* Horizontal Scroll Row - All cards on one line */}
          <div className="hide-scrollbar flex flex-nowrap overflow-x-auto gap-12 pb-20 px-4 md:px-10 snap-x snap-mandatory">
            {testimonials.map((item) => (
              <div 
                key={item.id}
                className="group relative w-[280px] flex-shrink-0 snap-center transition-all duration-1000"
              >
                {/* Image Container - Arch Shape */}
                <div className="relative w-full aspect-[4/6] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl bg-white">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                  />
                  
                  {/* Frosted Glass Overlay for Text */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                     <p className="text-white text-[13px] italic leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-700 font-light">
                      "{item.text}"
                     </p>
                  </div>
                </div>

                {/* Floating Nameplate */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-md py-4 px-2 text-center shadow-lg border border-[#D4AF37]/20 z-30">
                  <div className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold uppercase mb-1">Patron</div>
                  <h3 className="text-black font-serif text-sm tracking-widest uppercase truncate px-2">{item.name}</h3>
                  
                  {/* Decorative Dot */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
                </div>

                {/* Background Glow Effect */}
                <div className="absolute -inset-4 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
