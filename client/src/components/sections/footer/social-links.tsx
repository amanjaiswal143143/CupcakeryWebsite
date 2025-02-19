import { Facebook, Instagram, Twitter } from "lucide-react";

interface SocialLinksProps {
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ facebookUrl, instagramUrl, twitterUrl }) => {
  return (
    <div className="flex space-x-4">
      <a href={facebookUrl} className="text-muted-foreground hover:text-primary">
        <Facebook className="h-5 w-5" />
      </a>
      <a href={instagramUrl} className="text-muted-foreground hover:text-primary">
        <Instagram className="h-5 w-5" />
      </a>
      <a href={twitterUrl} className="text-muted-foreground hover:text-primary">
        <Twitter className="h-5 w-5" />
      </a>
    </div>
  );
};

export default SocialLinks;
