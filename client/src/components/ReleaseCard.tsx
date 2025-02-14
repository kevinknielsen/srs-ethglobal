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
    <div className="bg-[#0A0A0A] rounded-xl border border-white/5 overflow-hidden">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-medium text-white line-clamp-1">{title}</h3>
            {isVerified && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500 flex-shrink-0">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.49 4.49 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-base text-gray-400">{artist}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Label</span>
            <span className="text-gray-300">{label}</span>
          </div>
          {isrc && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">ISRC</span>
              <span className="text-gray-300 font-mono">{isrc}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Earnings</span>
            <span className="text-gray-300">{earnings}</span>
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