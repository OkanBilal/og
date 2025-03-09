import { FormState, SocialItem } from '../types';
import chroma from "chroma-js";
import { ReactSortable } from "react-sortablejs";
import { useEffect } from 'react';
import loadedFonts from './fonts';

interface OgFormProps {
  formState: FormState;
  updateFormField: (field: keyof FormState, value: string) => void;
  socialItems: SocialItem[];
  setSocialItems: (items: SocialItem[]) => void;
  onDownload: () => void;
}

export function OgForm({ formState, updateFormField, socialItems, setSocialItems, onDownload }: OgFormProps) {

  // Load stored form state on mount.
  useEffect(() => {
    const savedFormState = localStorage.getItem('formState');
    if (savedFormState) {
      try {
        const parsedState = JSON.parse(savedFormState);
        // Only update if the stored state is different.
        if (JSON.stringify(parsedState) !== JSON.stringify(formState)) {
          Object.keys(parsedState).forEach((key) => {
            updateFormField(key as keyof FormState, parsedState[key]);
          });
        }
      } catch (error) {
        console.error('Error parsing saved form state:', error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Save form state whenever it updates.
  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [formState]);

  // Optimize for mobile and readability.
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const fontSize =
      newTitle.length < 14 ? '70px' :
      newTitle.length < 26 ? '54px' :
      newTitle.length < 42 ? '46px' :
      newTitle.length < 70 ? '36px' :
      newTitle.length < 99 ? '30px' :
      '28px';
    updateFormField('title', newTitle)
    updateFormField('titleFontSize', fontSize);
  };

  const renderInput = (label: string, field: keyof FormState) => {
    const maxLength = field === "title" ? 135 : 80;
    return (
      <div key={field} className="text-inputs">
        <label className="info-label-title" htmlFor={field}>
          {label}
        </label>
        <input
          id={field}
          type="text"
          {...(maxLength && { maxLength })}
          className="input"
          value={formState[field]}
          onChange={field === "title" ? handleTitleChange : (e) => updateFormField(field, e.target.value)}
        />
      </div>
    );
  };

  const renderSocialInput = (item: SocialItem) => (
    <div key={item.key}>
      <label className="label-title" htmlFor={item.key}>{item.label}</label>
      <input
        type="text"
        className="input"
        id={item.key}
        value={item.value}
        onChange={(e) => {
          setSocialItems(
            socialItems.map(prevItem =>
              prevItem.key === item.key ? { ...prevItem, value: e.target.value } : prevItem
            )
          );
          updateFormField(item.key, e.target.value);
        }}
      />
    </div>
  );

  const renderBackground = () => {
    const bgColor = formState["bgcolor"] || "#121212";
    const textColor = formState["textcolor"] || "#ffffff";
    const contrastRatio = chroma.contrast(textColor, bgColor);
    const passes = contrastRatio >= 4.5; // WCAG AA for normal text.
    return (
      <div className="color-options">
        <div>
          <label className="info-label-title" htmlFor="background-input">
            Background
          </label>
          <input
            id="background-input"
            type="color"
            className="input"
            value={bgColor}
            onChange={(e) => updateFormField("bgcolor", e.target.value)}
          />
        </div>
        <div>
          <label className="info-label-title" htmlFor="text-color-input">
            Foreground
          </label>
          <input
            id="text-color-input"
            type="color"
            className="input"
            value={textColor}
            onChange={(e) => updateFormField("textcolor", e.target.value)}
          />
        </div>
        <div className='contrast-result'>
          Contrast
          <span className={`badge ${passes ? "pass" : "fail"}`}>
            {passes ? "Good" : "Low"}
          </span>
        </div>
      </div>
    );
  };

  const renderFontSelect = (label: string, field: keyof FormState) => {
    return (
      <div key={field} className={field}>
        <label className="info-label-title" htmlFor={field}>
          {label}
        </label>
        <select
          id={field}
          value={formState[field]}
          onChange={(e) => updateFormField(field, e.target.value)}
          className="input"
        >
          {Object.keys(loadedFonts).map((font: string) => (
            <option key={String(font)} value={String(font).replace(/_/g, ' ')}>
              {String(font)
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderLineHeightSlider = (label: string, field: keyof FormState) => {
    return (
      <div key={field} className={field}>
        <label className="info-label-title" htmlFor={field}>
          {label}
        </label>
        <input
          type="range"
          id={field}
          min="1"
          max="2"
          step="0.1"
          value={formState[field] || 1.1}
          onChange={(e) => updateFormField(field, parseFloat(e.target.value).toString())}
          className="input"
        />
      </div>
    );
  };

  return (
    <aside className="options">
      <h1 className="options-title">Open Graph Image Generator</h1>
      {renderInput("Page Title", "title")}
      {renderInput("Author or Website Name", "author")}
      {renderBackground()}
      <div className="typography">
        {renderFontSelect("Primary Font", "primaryFont")}
        {renderFontSelect("Secondary Font", "secondaryFont")}
        {renderLineHeightSlider("Line Height", "lineHeight")}
      </div>
      <details>
        <summary>Social media handles</summary>
        <ReactSortable
          list={socialItems}
          setList={setSocialItems}
          animation={200}
          delay={2}
          delayOnTouchOnly={true}
          handle=".label-title"
          className="social-inputs"
        >
          {socialItems.map((item) => (
            <div key={item.id} className="social-input-item">
              {renderSocialInput(item)}
            </div>
          ))}
        </ReactSortable>
      </details>
      <div key="download" className="download">
        <button className="download-btn" type="button" onClick={onDownload}>
          Download
        </button>
      </div>
      <p className="cookies"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1.3em" className="inline-block"><path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" fill="#fff"/></svg> This website uses your browser&apos;s local storage to save your preferences.</p>
    </aside>
  );
}