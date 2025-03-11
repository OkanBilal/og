import { useState, useEffect } from 'react';
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
  Youtube,
} from '../components/icons';
import { SocialItem, FormState } from '../types';

export function useOgForm() {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    titleFontSize: '',
    primaryFont: '',
    secondaryFont: '',
    lineHeight: '',
    author: '',
    bgcolor: '',
    textcolor: '',
    website: '',
    email: '',
    bluesky: '',
    instagram: '',
    facebook: '',
    figma: '',
    github: '',
    linkedin: '',
    twitter: '',
    tiktok: '',
    youtube: '',
  });

  const updateFormField = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const [socialItems, setSocialItems] = useState<SocialItem[]>([
    {
      id: 1,
      Icon: Website,
      value: '',
      label: 'Website',
      key: 'website',
      setValue: (value: string) => updateFormField('website', value)
    },
    {
      id: 2,
      Icon: Email,
      value: '',
      label: 'Email',
      key: 'email',
      setValue: (value: string) => updateFormField('email', value)
    },
    {
      id: 3,
      Icon: Bluesky,
      value: '',
      label: 'Bluesky',
      key: 'bluesky',
      setValue: (value: string) => updateFormField('bluesky', value)
    },
    {
      id: 4,
      Icon: Instagram,
      value: '',
      label: 'Instagram',
      key: 'instagram',
      setValue: (value: string) => updateFormField('instagram', value)
    },
    {
      id: 5,
      Icon: Facebook,
      value: '',
      label: 'Facebook',
      key: 'facebook',
      setValue: (value: string) => updateFormField('facebook', value)
    },
    {
      id: 6,
      Icon: Figma,
      value: '',
      label: 'Figma',
      key: 'figma',
      setValue: (value: string) => updateFormField('figma', value)
    },
    {
      id: 7,
      Icon: GitHub,
      value: '',
      label: 'GitHub',
      key: 'github',
      setValue: (value: string) => updateFormField('github', value)
    },
    {
      id: 8,
      Icon: Linkedin,
      value: '',
      label: 'LinkedIn',
      key: 'linkedin',
      setValue: (value: string) => updateFormField('linkedin', value)
    },
    {
      id: 9,
      Icon: Twitter,
      value: '',
      label: 'Twitter/X',
      key: 'twitter',
      setValue: (value: string) => updateFormField('twitter', value)
    },
    {
      id: 10,
      Icon: Tiktok,
      value: '',
      label: 'TikTok',
      key: 'tiktok',
      setValue: (value: string) => updateFormField('tiktok', value)
    },
    {
      id: 11,
      Icon: Youtube,
      value: '',
      label: 'YouTube',
      key: 'youtube',
      setValue: (value: string) => updateFormField('youtube', value)
    },
  ]);

  useEffect(() => {
    setSocialItems(prevItems => prevItems.map(item => ({
      ...item,
      value: formState[item.key]
    })));
  }, [formState]);

  return {
    formState,
    updateFormField,
    socialItems,
    setSocialItems
  };
}