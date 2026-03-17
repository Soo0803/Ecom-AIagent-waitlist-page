import { Navbar } from '@/sections/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSection } from '@/sections/ProblemSection';
import { HowItWorks } from '@/sections/HowItWorks';
import { AboutSection } from '@/sections/AboutSection';
import { LeadForm } from '@/sections/LeadForm';
import { Footer } from '@/sections/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <HeroSection />
                <ProblemSection />
                <HowItWorks />
                <AboutSection />
                <LeadForm />
            </main>
            <Footer />
        </div>
    );
}
