import { SectionData } from '@/types/builder';
import { Twitter, Linkedin, Github, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterSectionProps {
  data: SectionData['data'];
  variant?: string;
  isPreview?: boolean;
}

export function FooterSection({ data, isPreview }: FooterSectionProps) {
  const {
    logo,
    description,
    links = [],
    columns = [],
    copyright,
    backgroundColor,
    textColor,
    padding,
    variant = 'simple',
  } = data;

  const defaultLinks = links.length > 0 ? links : [
    { id: '1', text: 'About', href: '#about' },
    { id: '2', text: 'Services', href: '#services' },
    { id: '3', text: 'Contact', href: '#contact' },
    { id: '4', text: 'Blog', href: '#blog' },
  ];

  const defaultColumns = columns.length > 0 ? columns : [
    { id: '1', title: 'Product', links: [{ id: '1', text: 'Features', href: '#' }, { id: '2', text: 'Pricing', href: '#' }, { id: '3', text: 'Updates', href: '#' }] },
    { id: '2', title: 'Company', links: [{ id: '1', text: 'About', href: '#' }, { id: '2', text: 'Careers', href: '#' }, { id: '3', text: 'Press', href: '#' }] },
    { id: '3', title: 'Resources', links: [{ id: '1', text: 'Blog', href: '#' }, { id: '2', text: 'Docs', href: '#' }, { id: '3', text: 'Support', href: '#' }] },
    { id: '4', title: 'Legal', links: [{ id: '1', text: 'Privacy', href: '#' }, { id: '2', text: 'Terms', href: '#' }, { id: '3', text: 'Security', href: '#' }] },
  ];

  const socialIcons = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  if (variant === 'minimal') {
    return (
      <footer className="w-full transition-all border-t" style={{ backgroundColor: backgroundColor || '#ffffff', color: textColor || '#000000', padding: padding || '32px 24px' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{copyright || `© ${new Date().getFullYear()} ${logo || 'Company'}. All rights reserved.`}</p>
          <div className="flex gap-6 text-sm">
            {defaultLinks.slice(0, 3).map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'centered') {
    return (
      <footer className="w-full transition-all" style={{ backgroundColor: backgroundColor || '#fafafa', color: textColor || '#000000', padding: padding || '80px 24px' }}>
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-3xl">{(logo || 'L').charAt(0)}</span>
              </div>
              <span className="text-4xl font-bold">{logo || 'Logo'}</span>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description || 'Building amazing products for the modern web'}</p>
          </div>
          <div className="flex justify-center gap-4">
            {socialIcons.map((social) => <a key={social.name} href={social.href} className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-6 h-6" /></a>)}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {defaultColumns.map((column: any) => <div key={column.id} className="space-y-4"><h4 className="font-bold text-base">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
          </div>
          <div className="pt-8 border-t"><p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p></div>
        </div>
      </footer>
    );
  }

  if (variant === 'newsletter') {
    return (
      <footer className="w-full transition-all" style={{ backgroundColor: backgroundColor || '#ffffff', color: textColor || '#000000', padding: padding || '0' }}>
        <div className="w-full py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold">Stay in the Loop</h3>
              <p className="text-white/90 text-xl">Get exclusive updates, tips, and offers delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-8 py-5 rounded-2xl border-0 bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/40 text-base font-medium" disabled={isPreview} />
              <button className="px-10 py-5 bg-white text-purple-600 rounded-2xl hover:bg-gray-100 transition-all font-bold text-lg shadow-2xl hover:scale-105" disabled={isPreview}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"><span className="text-white font-bold text-xl">{(logo || 'L').charAt(0)}</span></div>
              <span className="text-2xl font-bold">{logo || 'Logo'}</span>
            </div>
            <p className="text-muted-foreground text-base">{description || 'Empowering businesses with innovative solutions'}</p>
            <div className="flex gap-3">{socialIcons.slice(0, 5).map((social) => <a key={social.name} href={social.href} className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white transition-all" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-5 h-5" /></a>)}</div>
          </div>
          {defaultColumns.slice(0, 2).map((column: any) => <div key={column.id} className="space-y-4"><h4 className="font-bold text-lg">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-indigo-600 transition-colors" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
        </div>
        <div className="border-t bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
            <div className="flex gap-6 text-sm">{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => <a key={item} href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors" onClick={(e) => isPreview && e.preventDefault()}>{item}</a>)}</div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'dark') {
    return (
      <footer className="w-full transition-all relative overflow-hidden" style={{ backgroundColor: backgroundColor || '#0a0a0a', color: textColor || '#ffffff', padding: padding || '100px 24px 40px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <span className="text-white font-bold text-3xl">{(logo || 'L').charAt(0)}</span>
                </div>
                <span className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">{logo || 'Logo'}</span>
              </div>
              <p className="text-gray-300 text-xl leading-relaxed">{description || 'Crafting digital experiences that inspire and innovate'}</p>
              <div className="flex gap-4">{socialIcons.map((social) => <a key={social.name} href={social.href} className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-7 h-7" /></a>)}</div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {defaultColumns.map((column: any) => <div key={column.id} className="space-y-5"><h4 className="font-bold text-xl text-white mb-6">{column.title}</h4><div className="flex flex-col gap-4">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-gray-400 hover:text-purple-400 transition-all hover:translate-x-2 transform duration-200 text-base" onClick={(e) => isPreview && e.preventDefault()}>→ {link.text}</a>)}</div></div>)}
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-base">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
            <div className="flex gap-8 text-base">{['Privacy', 'Terms', 'Cookies', 'Sitemap'].map(item => <a key={item} href="#" className="text-gray-400 hover:text-purple-400 transition-colors" onClick={(e) => isPreview && e.preventDefault()}>{item}</a>)}</div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'multi-column') {
    return (
      <footer className="w-full transition-all" style={{ backgroundColor: backgroundColor || '#f8f9fa', color: textColor || '#000000', padding: padding || '80px 24px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl">{(logo || 'L').charAt(0)}</span>
                </div>
                <span className="text-3xl font-bold">{logo || 'Logo'}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{description || 'Innovative solutions for modern businesses'}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground"><Mail className="w-5 h-5 text-emerald-600" /><span className="text-sm">hello@company.com</span></div>
                <div className="flex items-center gap-3 text-muted-foreground"><Phone className="w-5 h-5 text-emerald-600" /><span className="text-sm">+1 (555) 123-4567</span></div>
                <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="w-5 h-5 text-emerald-600" /><span className="text-sm">San Francisco, CA</span></div>
              </div>
            </div>
            {defaultColumns.map((column: any) => <div key={column.id} className="space-y-4"><h4 className="font-bold text-sm uppercase tracking-widest text-emerald-600 mb-5">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-emerald-600 transition-colors text-sm font-medium" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
          </div>
          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
            <div className="flex gap-3">{socialIcons.slice(0, 5).map((social) => <a key={social.name} href={social.href} className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-emerald-600 hover:text-white transition-all hover:shadow-md" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-4 h-4" /></a>)}</div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'split') {
    return (
      <footer className="w-full transition-all" style={{ backgroundColor: backgroundColor || '#ffffff', color: textColor || '#000000', padding: padding || '0' }}>
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-16 md:p-20 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{(logo || 'L').charAt(0)}</span>
                </div>
                <span className="text-4xl font-bold">{logo || 'Logo'}</span>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">{description || 'Transforming ideas into reality with cutting-edge technology'}</p>
            </div>
            <div className="flex gap-4">{socialIcons.slice(0, 5).map((social) => <a key={social.name} href={social.href} className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-110" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-6 h-6" /></a>)}</div>
          </div>
          <div className="bg-gray-50 p-16 md:p-20">
            <div className="grid grid-cols-2 gap-10">
              {defaultColumns.slice(0, 2).map((column: any) => <div key={column.id} className="space-y-5"><h4 className="font-bold text-lg text-orange-600 mb-4">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-orange-600 transition-colors font-medium" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
            </div>
            <div className="mt-12 pt-8 border-t">
              <p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'boxed') {
    return (
      <footer className="w-full transition-all" style={{ backgroundColor: backgroundColor || '#e5e7eb', color: textColor || '#000000', padding: padding || '80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl p-12 md:p-16 space-y-12">
            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl">{(logo || 'L').charAt(0)}</span>
                </div>
                <h3 className="text-3xl font-bold">{logo || 'Logo'}</h3>
                <p className="text-muted-foreground leading-relaxed">{description || 'Creating exceptional digital experiences'}</p>
                <div className="flex gap-3">{socialIcons.slice(0, 4).map((social) => <a key={social.name} href={social.href} className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-cyan-600 hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-5 h-5" /></a>)}</div>
              </div>
              {defaultColumns.slice(0, 3).map((column: any) => <div key={column.id} className="space-y-4"><h4 className="font-bold text-base uppercase tracking-wider text-cyan-600">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-cyan-600 transition-colors text-sm" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
            </div>
            <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
              <div className="flex gap-6 text-sm">{['Privacy', 'Terms', 'Cookies'].map(item => <a key={item} href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors font-medium" onClick={(e) => isPreview && e.preventDefault()}>{item}</a>)}</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'gradient') {
    return (
      <footer className="w-full transition-all relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${backgroundColor || '#667eea'} 0%, ${textColor || '#764ba2'} 100%)`, color: '#ffffff', padding: padding || '100px 24px 60px' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-8">
            <div className="inline-flex items-center gap-4">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-3xl">{(logo || 'L').charAt(0)}</span>
              </div>
              <span className="text-5xl font-bold text-white drop-shadow-lg">{logo || 'Logo'}</span>
            </div>
            <p className="text-white/95 text-xl max-w-2xl mx-auto leading-relaxed">{description || 'Pioneering the future of digital innovation'}</p>
            <div className="flex justify-center gap-4">{socialIcons.map((social) => <a key={social.name} href={social.href} className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-125 hover:shadow-2xl" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-6 h-6" /></a>)}</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {defaultColumns.map((column: any) => <div key={column.id} className="space-y-5"><h4 className="font-bold text-xl text-white">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-white/80 hover:text-white transition-colors font-medium" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
          </div>
          <div className="pt-10 border-t border-white/20 text-center">
            <p className="text-white/80 text-base">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full transition-all border-t" style={{ backgroundColor: backgroundColor || '#ffffff', color: textColor || '#000000', padding: padding || '60px 24px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">{(logo || 'L').charAt(0)}</span>
              </div>
              <span className="text-2xl font-bold">{logo || 'Logo'}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{description || 'Building the future, one line of code at a time'}</p>
            <div className="flex gap-3">{socialIcons.slice(0, 4).map((social) => <a key={social.name} href={social.href} className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all" onClick={(e) => isPreview && e.preventDefault()}><social.icon className="w-5 h-5" /></a>)}</div>
          </div>
          {defaultColumns.slice(0, 2).map((column: any) => <div key={column.id} className="space-y-4"><h4 className="font-bold text-lg">{column.title}</h4><div className="flex flex-col gap-3">{column.links.map((link: any) => <a key={link.id} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" onClick={(e) => isPreview && e.preventDefault()}>{link.text}</a>)}</div></div>)}
        </div>
        <div className="pt-8 border-t text-center">
          <p className="text-muted-foreground text-sm">{copyright || `© ${new Date().getFullYear()} All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
