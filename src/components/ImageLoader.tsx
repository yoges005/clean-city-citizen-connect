
import React from 'react';

type ImageLoaderProps = {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  fallbackColor?: string;
  animationClass?: string;
};

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  src, 
  alt, 
  fallbackText, 
  className = "w-full h-full object-cover", 
  fallbackColor = "9b87f5",
  animationClass = ""
}) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const textToShow = fallbackText || encodeURIComponent(alt);
  const fallbackSrc = `https://placehold.co/600x400/${fallbackColor}/white?text=${textToShow}`;

  return (
    <div className={`relative overflow-hidden ${!isLoaded ? 'bg-gray-100 animate-pulse' : ''}`}>
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${animationClass} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-clean-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
