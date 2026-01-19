
"use client";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const contacts = [
  {
    name: "Anil Kumar Soni",
    phone: "+91 9928070606",
    email: "anilsoni7104@gmail.com",
  },
  {
    name: "Priyansh Soni",
    phone: "+91 7014533288",
    email: "priyanshabz.290@gmail.com",
  },
    {
    name: "Sunil Kumar Soni",
    phone: "+91 9829134725",
  },
];

const sectionAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }
};

const itemAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <motion.div 
        className="container mx-auto px-4 py-16 sm:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header className="text-center mb-16" {...itemAnimation}>
          <h1 className="font-headline text-5xl font-bold">Get In Touch</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            We would love to hear from you. Fill out the form below or contact our specialists directly.
          </p>
        </motion.header>

        <motion.div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start" {...sectionAnimation}>
          
          <motion.div {...itemAnimation}>
            <Card className="h-full shadow-lg border-black/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input type="text" placeholder="First Name" />
                    <Input type="text" placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button type="submit" className="w-full" size="lg">Send Message</Button>
                  <p className="text-xs text-muted-foreground pt-2 text-center">
                    This site is protected by reCAPTCHA and the Google
                    {' '}<Link href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and
                    {' '}<Link href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">Terms of Service</Link> apply.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-8" {...itemAnimation} transition={{delay: 0.2}}>
            <Card className="shadow-lg border-black/10">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Our Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.name}>
                      <p className="font-bold">{contact.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm">
                        <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                        <a href={`tel:${contact.phone}`} className="hover:text-foreground">{contact.phone}</a>
                      </div>
                      {contact.email && (
                          <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm">
                          <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                          <a href={`mailto:${contact.email}`} className="hover:text-foreground break-all">{contact.email}</a>
                          </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

            <Card className="shadow-lg border-black/10">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Our Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                    <div className="flex flex-col text-sm">
                      <span className="font-bold text-foreground">Khushi gems & Jewels</span>
                      <span>172, Badi Chopar, Mehandi Ka Chowk, Johri Bazar, Ramganj Bazar, Jaipur, Rajasthan 302003</span>
                    </div>
                  </div>
              </CardContent>
            </Card>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
