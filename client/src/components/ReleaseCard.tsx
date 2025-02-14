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
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-white line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1">
              <p className="text-sm text-white/60">{artist}</p>
              {isVerified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-1 text-xs text-white/40">
          <div className="flex justify-between">
            <span>Label</span>
            <span>{label}</span>
          </div>
          {isrc && (
            <div className="flex justify-between">
              <span>ISRC</span>
              <span>{isrc}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Earnings</span>
            <span>{earnings}</span>
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
