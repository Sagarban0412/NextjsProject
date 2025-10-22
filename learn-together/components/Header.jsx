"use client"

import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
    const { user } = useUser();
  return (
    <header className="shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">LT</span>
          </div>
          <h1 className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            LearnTogether
          </h1>
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/courses"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Courses
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Contact
          </a>
          <SignedIn>
            <a
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Profile
            </a>
          </SignedIn>
        </nav>

        {/* Search Bar - Hidden on small screens */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <SignedOut>
              <Button asChild variant="secondary">
                <Link href={`/login`}>Login</Link>
              </Button>
              <Button asChild>
                <Link href={`/signup`}>Signup</Link>
              </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-3">
              <p className="text-gray-700">Hi, {user?.firstName}</p>
              <UserButton/>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
