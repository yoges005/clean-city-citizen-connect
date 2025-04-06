
import React from 'react';

type ImageLoaderProps = {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  fallbackColor?: string;
};

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  src, 
  alt, 
  fallbackText, 
  className = "w-full h-full object-cover", 
  fallbackColor = "9b87f5" 
}) => {
  const [hasError, setHasError] = React.useState(false);
  const textToShow = fallbackText || encodeURIComponent(alt);
  const fallbackSrc = `https://placehold.co/600x400/${fallbackColor}/white?text=${textToShow}`;

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageLoader;
