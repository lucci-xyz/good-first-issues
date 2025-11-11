"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export default function BountiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 py-12">
          <div className="inline-block text-sm text-muted-foreground mb-6">
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Earn for your<br />contributions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover issues with monetary bounties. Get paid instantly when your pull request is merged.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <h3 className="text-lg font-semibold mb-3">Instant Settlement</h3>
            <p className="text-muted-foreground leading-relaxed">
              Receive payment immediately when your PR is merged. No waiting, no paperwork.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Clear Requirements</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every bounty includes detailed scope and expected outcomes for transparency.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Fair Competition</h3>
            <p className="text-muted-foreground leading-relaxed">
              Open guidelines ensure quality contributions and fair opportunity for all.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border border-border/40 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">BountyPay Integration</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Powered by Lucci's BountyPay, the economic layer for open source. Launching soon.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8">
              <a href="/explore">Explore Quests</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <a href="https://luccilabs.xyz" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

