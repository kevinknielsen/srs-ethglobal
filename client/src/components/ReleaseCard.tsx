import { Link } from "wouter";

interface ReleaseCardProps {
  title: string;
  artist: string;
  imageSrc: string;
  label?: string;
  isrc?: string;
  earnings?: string;
  href?: string;
  isVerified?: boolean;
}

export function ReleaseCard({
  title,
  artist,
  imageSrc,
  label = "—",
  isrc,
  earnings = "$0.00",
  href,
  isVerified = false
}: ReleaseCardProps) {
  const Card = () => (
    <div className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
      <div className="aspect-square relative">
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-white/90 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-white/60">{artist}</p>
              {isVerified && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.49 4.49 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-white/40">
          <div className="flex justify-between">
            <span>Label</span>
            <span className="text-white/60">{label}</span>
          </div>
          {isrc && (
            <div className="flex justify-between">
              <span>ISRC</span>
              <span className="text-white/60 font-mono">{isrc}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Earnings</span>
            <span className="text-white/60">{earnings}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <a className="block">
          <Card />
        </a>
      </Link>
    );
  }

  return <Card />;
}