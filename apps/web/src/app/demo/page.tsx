"use client";
import React, { useState } from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function StarsBackgroundDemo() {
  const [settings, setSettings] = useState({
    density: 0.0009,
    allTwinkle: true,
    twinkleProbability: 0.7,
    minSpeed: 0.5,
    maxSpeed: 1,
  });

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* <StarsBackground
        starDensity={settings.density}
        allStarsTwinkle={settings.allTwinkle}
        twinkleProbability={settings.twinkleProbability}
        minTwinkleSpeed={settings.minSpeed}
        maxTwinkleSpeed={settings.maxSpeed}
      /> */}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Dynamic Stars Background
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            A customizable canvas-based starry night effect with twinkling stars
          </p>
        </motion.div>

      </div>
    </div>
  );
}