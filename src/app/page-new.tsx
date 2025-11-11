"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Open Source Contributions Made Easy
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover Your Next<br />
            <span className="text-primary">Open Source Quest</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find good first issues, bounties, and contribution opportunities across thousands of open source projects
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <a href="/explore">Start Exploring</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/good-first-issues">Good First Issues</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Quests?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Smart Discovery</h3>
              <p className="text-muted-foreground">
                Filter by language, labels, ecosystem, and more to find the perfect issues for your skills
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Beginner Friendly</h3>
              <p className="text-muted-foreground">
                Curated good first issues help you make your first open source contribution with confidence
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Earn Bounties</h3>
              <p className="text-muted-foreground">
                Find issues with monetary rewards and get paid instantly when your PR is merged
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">2,000+</div>
              <div className="text-muted-foreground">Active Issues</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Contributing?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers making their mark on open source
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <a href="/explore">Browse All Quests</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/lucci-xyz/quests" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

