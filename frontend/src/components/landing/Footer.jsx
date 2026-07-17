import { Link } from 'react-router-dom';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'],
  Company: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  Support: ['Help Center', 'Community', 'Status Page', 'Security', 'Privacy'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'GDPR', 'CCPA'],
};

const SOCIALS = [
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <HiOutlineLightningBolt className="text-white" size={16} />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              The complete AI-powered gym management platform. Trusted by 2,400+ fitness businesses worldwide.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 GymFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-green" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
