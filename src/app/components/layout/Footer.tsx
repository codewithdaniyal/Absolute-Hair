import { Link } from 'react-router';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/[0.02] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-baseline gap-1">
              <span className="font-['Raleway'] font-extralight text-xl text-white">
                absolute
              </span>
              <span className="font-['Cormorant_Garamond'] italic text-xl text-white">
                hair
              </span>
            </Link>
            <p className="text-white/60 font-['DM_Sans'] text-sm">
              Where your hair dreams meet bold flair and expert precision.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-['Raleway'] font-light text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-white/60 font-['DM_Sans']">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1 Higher Road, Urmston, Manchester, M41 9AB</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-['DM_Sans']">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>0161 748 7575</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-['DM_Sans']">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@absolutehair.co.uk</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-['Raleway'] font-light text-white">Opening Hours</h3>
            <div className="space-y-2 text-sm font-['DM_Sans']">
              <div className="flex justify-between">
                <span className="text-white/60">Monday</span>
                <span className="text-white/45">Closed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tuesday – Wednesday</span>
                <span className="text-white">9:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Thursday</span>
                <span className="text-white">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Friday</span>
                <span className="text-white">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Saturday</span>
                <span className="text-white">9:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Sunday</span>
                <span className="text-white/45">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/45 font-['DM_Sans']">
          © {new Date().getFullYear()} Absolute Hair – Urmston. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
