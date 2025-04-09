
import React, { useState, useEffect } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const textToShow = fallbackText || alt.replace(/\s+/g, '+');
  const fallbackSrc = `https://placehold.co/600x400/${fallbackColor}/ffffff?text=${textToShow}`;
  
  // Enhanced error handling with retry logic
  useEffect(() => {
    if (hasError && retryCount < 2) {
      const timer = setTimeout(() => {
        console.log(`Retrying image load (${retryCount + 1}/2): ${src}`);
        setHasError(false);
        setRetryCount(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasError, retryCount, src]);

  return (
    <div className={`relative overflow-hidden ${!isLoaded ? 'bg-gray-200 dark:bg-gray-700 animate-pulse' : ''}`}>
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${animationClass} transition-opacity duration-300`}
        style={{ opacity: isLoaded ? 1 : 0 }}
        onError={() => {
          console.log(`Image failed to load: ${src}, using fallback`);
          setHasError(true);
          setIsLoaded(true);
        }}
        onLoad={() => {
          console.log(`Image loaded successfully: ${src}`);
          setIsLoaded(true);
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-clean-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
