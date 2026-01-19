
"use client";

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';

const location = {
  name: "Khushi Gems & Jewels",
  address: "172, Badi Chopar, Mehandi Ka Chowk, Johri Bazar, Ramganj Bazar, Jaipur, Rajasthan 302003",
  phone: "+91 9928070606",
  email: "anilsoni7104@gmail.com",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.49525148671!2d75.82394607510126!3d26.91963286161474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4ed3f3f019c3%3A0x8684785435415c1!2sKHUSHI%20GEMS%20%26%20JEWELS!5e0!3m2!1sen!2sin!4v1689264868519!5m2!1sen!2sin",
  imageUrl: 'https://i.ibb.co/PGt3nZkh/imgi-27-AF1-Qip-Mpa-FKx1s-Rn-WSFHxb9uwtv-FJG69gi-Rh-NXre-GDI2-s572-k-no.png',
  imageHint: 'jewelry store front',
  openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM'
};

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
};

const itemAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function LocationPage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
       <motion.div 
        className="container mx-auto px-4 py-16 sm:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header className="text-center max-w-3xl mx-auto mb-16" {...itemAnimation}>
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4">Our Store</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Visit us in the heart of Jaipur, the city of gems.
          </p>
        </motion.header>

        <motion.div className="max-w-3xl mx-auto" {...sectionAnimation}>
            <motion.div className="w-full space-y-8" {...itemAnimation}>
               <div className="space-y-6">
                <h2 className="font-headline text-3xl md:text-4xl text-foreground">{location.name}</h2>
                <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-primary" />
                        <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                        <a href={`tel:${location.phone}`} className="hover:text-foreground">{location.phone}</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                        <a href={`mailto:${location.email}`} className="hover:text-foreground">{location.email}</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{location.openingHours}</span>
                    </div>
                </div>
              </div>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
