import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: '서비스',
      links: [
        { name: '도시탐색', href: '/cities' },
        { name: '리뷰작성', href: '#' },
        { name: '지도보기', href: '#' },
        { name: '통계', href: '#' },
      ],
    },
    {
      title: '커뮤니티',
      links: [
        { name: '밋업', href: '#' },
        { name: '채팅', href: '#' },
        { name: '스토리', href: '#' },
        { name: '멤버', href: '#' },
      ],
    },
    {
      title: '지원',
      links: [
        { name: '가이드', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: '문의하기', href: '#' },
        { name: 'API문서', href: '#' },
      ],
    },
    {
      title: '회사',
      links: [
        { name: '회사소개', href: '#' },
        { name: '팀', href: '#' },
        { name: '채용', href: '#' },
        { name: '투자자', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 mb-6 pb-6 border-b">
          <span className="text-sm font-medium">📱 SNS:</span>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>hello@nomadkorea.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>@노마드코리아</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>©</span>
              <span>2024 노마드코리아</span>
            </span>
            <Link href="#" className="hover:text-primary transition-colors">
              개인정보처리방침
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              이용약관
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in Seoul, Korea</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
