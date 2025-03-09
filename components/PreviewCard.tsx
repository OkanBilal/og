import React from 'react';
import { FormState, SocialItem } from '../types';

interface PreviewCardProps {
  formState: FormState;
  socialItems: SocialItem[];
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function PreviewCard({ formState, socialItems, cardRef }: PreviewCardProps) {
  return (
    <main className="main">
      <h2 className="main-title">Preview</h2>
      <div className="card-container">
        <div className="card" ref={cardRef} style={{ background: formState.bgcolor, color: formState.textcolor}}>
          <div>
            <div className="post-title"
              style={{
                fontSize: formState.titleFontSize,
                fontFamily: formState.primaryFont,
                lineHeight: formState.lineHeight
              }}>
              {formState.title && formState.title.length > 134
                ? formState.title.slice(0, 134) + "..."
                : formState.title || "Post Title"}
            </div>
            <div className="author-name" style={{ fontFamily: formState.secondaryFont }}>
              <span className="name">{formState.author}</span>
            </div>
            <div className="social" style={{ fontFamily: formState.secondaryFont }}>
              {socialItems
                .filter(item => item.value.length >= 1)
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="social-container"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.Icon />
                    <span className="social-title">{item.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}