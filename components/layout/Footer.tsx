// components/layout/Footer.tsx
'use client';

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="w-full max-w-[1100px] mx-auto border-t border-border/40 py-8 px-6 mt-12 flex flex-col gap-6 select-none relative z-10">
      
      {/* Three-column layout */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 text-center md:text-left">
        
        {/* Left Column: Logo & Name */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <img
            src="/logo.png"
            alt="Shabab Ahmed"
            className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
          />
          <span className="font-dmSans font-medium text-sm text-frost">
            Shabab Ahmed
          </span>
        </div>

        {/* Center Column: Navigation */}
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 font-dmSans font-medium text-sm text-frost/80">
          {navLinks.map((link, idx) => (
            <div key={link.label} className="flex items-center gap-3">
              <a 
                href={link.href}
                className="hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
              {idx < navLinks.length - 1 && (
                <span className="text-frost/40 select-none">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Motto */}
        <div className="md:text-right">
          <p className="font-dmSans font-medium text-sm text-frost leading-relaxed">
            Built with vision. Shipped with AI.
          </p>
        </div>

      </div>

      {/* Bottom Thin Row */}
      <div className="border-t border-border/10 pt-6 text-center">
        <span className="font-dmSans font-normal text-xs text-frost/40">
          © 2025 Shabab Ahmed. All rights reserved.
        </span>
      </div>

    </footer>
  );
}
