import {
  Website,
  Email,
  Bluesky,
  Instagram,
  Facebook,
  Figma,
  GitHub,
  Linkedin,
  Tiktok,
  Twitter,
  Youtube
} from "../components/icons";

export interface SocialItem {
  id: number;
  Icon: typeof Website | typeof Email | typeof Bluesky | typeof Instagram | typeof Facebook | typeof Figma | typeof GitHub | typeof Linkedin | typeof Tiktok | typeof Twitter | typeof Youtube;
  value: string;
  label: string;
  key: 'website' | 'email' | 'bluesky' | 'instagram' | 'facebook' | 'figma' | 'github' | 'linkedin' | 'tiktok' | 'twitter' | 'youtube';
  setValue: (value: string) => void;
}

export interface FormState {
  // Text inputs
  title: string;
  author: string;

  // Customizations
  titleFontSize: string;
  primaryFont: string;
  secondaryFont: string;
  lineHeight: string;
  bgcolor: string;
  textcolor: string;

  // Social media
  website: string;
  email: string;
  bluesky: string;
  instagram: string;
  facebook: string;
  figma: string;
  github: string;
  linkedin: string;
  tiktok: string;
  twitter: string;
  youtube: string;
}