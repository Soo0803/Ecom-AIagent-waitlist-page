"use client";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle, Zap, MousePointer2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroLoad, heroItem } from '@/lib/animations';

const trustBadges = [
  { icon: Shield, text: '100% TOS Compliant AI Agent' },
  { icon: CheckCircle, text: 'Protects Account Health Rating' },
  { icon: Zap, text: 'Saves 10+ Hours/Week' },
];

const extensionTextContent = "\"We are unable to upload tracking IDs due to an interface glitch on the new FBA shipments page. Please find the attached screenshot showing the disabled input fields for shipment FBA15...\"";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDraft, setShowDraft] = useState(true);
  
  const cursorControls = useAnimation();
  const buttonControls = useAnimation();
  const extensionControls = useAnimation();

  const scrollToWaitlist = () => {
    const element = document.querySelector('#waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.querySelector('#how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation Sequence Logic
  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      console.log("Hero animation loop starting...");
      
      while (isMounted) {
        try {
          // 1. Reset Phase
          console.log("Stage 1: Reset");
          setDisplayText("");
          setIsTyping(false);
          setShowDraft(true);
          await Promise.all([
            cursorControls.set({ opacity: 0, x: 20, y: 40, scale: 1 }),
            buttonControls.set({ scale: 1, backgroundColor: "#1d4ed8" }),
            extensionControls.set({ opacity: 1 }),
          ]);
          await new Promise(r => setTimeout(r, 1200));

          // 2. Typing Phase
          console.log("Stage 2: Typing");
          if (!isMounted) break;
          setIsTyping(true);
          const text = extensionTextContent;
          for (let i = 0; i <= text.length; i++) {
            if (!isMounted) return;
            setDisplayText(text.slice(0, i));
            // Faster typing but still sequential
            await new Promise(r => setTimeout(r, 25));
          }
          setIsTyping(false);
          await new Promise(r => setTimeout(r, 800));

          // 3. Command Phase: Cursor appears and moves
          console.log("Stage 3: Cursor Move");
          if (!isMounted) break;
          await cursorControls.start({ 
            opacity: 1, 
            x: 0, 
            y: -10,
            transition: { 
              duration: 0.8, 
              ease: "easeOut" 
            }
          });
          await new Promise(r => setTimeout(r, 400));

          // 4. Click Phase
          console.log("Stage 4: Click");
          if (!isMounted) break;
          // Simultaneous click scale
          await Promise.all([
            cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } }),
            buttonControls.start({ scale: 0.94, backgroundColor: "#1e40af", transition: { duration: 0.1 } })
          ]);
          
          // Exactly at click: clear content
          setShowDraft(false);
          setDisplayText("");
          
          await new Promise(r => setTimeout(r, 150));
          
          // Release click
          await Promise.all([
            cursorControls.start({ scale: 1, transition: { duration: 0.15 } }),
            buttonControls.start({ scale: 1, backgroundColor: "#1d4ed8", transition: { duration: 0.2 } })
          ]);

          // 5. Cleanup Phase
          console.log("Stage 5: Cleanup");
          await new Promise(r => setTimeout(r, 1000));
          await cursorControls.start({ opacity: 0, transition: { duration: 0.5 } });
          
          // Wait before restart
          console.log("Loop finished, waiting for restart...");
          await new Promise(r => setTimeout(r, 3000));
          
        } catch (error) {
          console.error("Hero animation loop error:", error);
          await new Promise(r => setTimeout(r, 2000)); // wait before retry
        }
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, [cursorControls, buttonControls, extensionControls]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={heroLoad}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={heroItem} className="mb-6 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors" onClick={scrollToWaitlist}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-sm font-medium text-slate-700">Waitlist Now Open</span>
              </div>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            >
              Stop Fighting{' '}
              <span className="text-blue-700">Amazon Seller Support.</span>{' '}
              Let AI Handle the Cases.
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              SellerSupportOps is an Agentic AI assistant that connects to Seller Central,
              auto-triages your issues, drafts compliant responses, and monitors SLAs.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button onClick={scrollToWaitlist} size="lg" className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-lg">
                Join the Waitlist <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button onClick={scrollToHowItWorks} variant="outline" size="lg" className="border-2 border-slate-300 text-slate-700 hover:border-blue-700 font-semibold px-8 py-6 text-lg">
                See How It Works
              </Button>
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                  <badge.icon className="w-4 h-4 text-blue-600" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animation Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block w-full"
          >
            <div className="relative z-10 w-full flex lg:justify-end">
              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col aspect-[4/3] max-h-[500px] w-full max-w-[800px] lg:w-[115%] lg:-mr-[15%] relative">
                
                {/* Browser Header */}
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md h-6 mx-4 border border-slate-200 flex items-center px-2 text-[10px] text-slate-500 font-mono overflow-hidden">
                    <span className="truncate">sellercentral.amazon.com/help/chat</span>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 relative bg-slate-50 flex flex-col overflow-hidden">
                  <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center shrink-0">
                    <h3 className="text-sm font-bold text-slate-800">Chat with Amazon Support</h3>
                    <span className="text-xs text-slate-500">End chat</span>
                  </div>

                  <div className="p-4 flex flex-col gap-4 text-xs flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-1 items-start w-full pr-12">
                      <span className="text-[10px] text-slate-500 font-medium">Amazon Support • 1:34 AM</span>
                      <div className="bg-white border border-slate-200 p-3 rounded-r-lg rounded-bl-lg text-slate-700 shadow-sm leading-relaxed">
                        Hi I hope you are doing well.<br />
                        Could you please brief on your request?
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 items-end w-full pl-12">
                      <span className="text-[10px] text-slate-500 font-medium">Me • 1:35 AM</span>
                      <div className="bg-[#e4eff1] border border-[#d0e3e6] p-3 rounded-l-lg rounded-br-lg text-slate-800 shadow-sm leading-relaxed">
                        I am not able to add the tracking number for each box in the shipment because the text input is disabled.
                      </div>
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="p-3 bg-white border-t border-slate-200 relative overflow-hidden">
                    <div className="border border-slate-300 rounded-md h-12 flex items-center justify-between px-3 relative bg-slate-50/50">
                      <span className="text-[11px] text-slate-800 pr-10 overflow-hidden line-clamp-2">
                        {displayText}
                        {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-[1px] h-3 bg-blue-600 ml-0.5" />}
                      </span>
                      {!displayText && !isTyping && (
                        <span className="text-xs text-slate-400 italic">Write here and press Enter...</span>
                      )}
                      <Send className="w-4 h-4 text-slate-300 ml-auto" />
                    </div>
                  </div>

                  {/* Chrome Extension Mockup */}
                  <motion.div
                    animate={extensionControls}
                    className="absolute top-12 right-4 w-[280px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-20"
                  >
                    <div className="bg-blue-700 p-3 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                          <span className="text-blue-700 font-bold text-[10px]">S</span>
                        </div>
                        <span className="text-white text-[11px] font-semibold">SellerSupportOps</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 flex flex-col gap-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">AI Policy Draft</span>
                        <span className="text-[8px] text-blue-600 font-medium bg-blue-100 px-2 rounded-full py-0.5 animate-pulse">Scanning...</span>
                      </div>

                      <div className="text-[10px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 leading-relaxed shadow-sm min-h-[80px]">
                        {showDraft ? displayText : <span className="text-slate-400 italic">No draft available</span>}
                      </div>

                      <div className="relative mt-1">
                        <motion.button
                          animate={buttonControls}
                          className="w-full bg-blue-700 text-white text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>Approve & Insert</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>

                        {/* Cursor */}
                        <motion.div
                          animate={cursorControls}
                          className="absolute pointer-events-none z-[100] drop-shadow-lg"
                        >
                          <MousePointer2 className="w-5 h-5 text-slate-900 fill-white" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
