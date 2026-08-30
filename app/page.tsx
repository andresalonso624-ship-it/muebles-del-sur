import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import WhatsAppButton from "@/app/components/WhatsAppButton";
export default function Home() {
  return (
    <>
      <Header />

      <Hero />

      <Services />

      <WhyChooseUs />

      <Contact />

      <Footer />

<WhatsAppButton />

    </>
  );
}