'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const DEFAULT_FALLBACK = '/placeholder-news.svg';

export default function ArticleImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = '',
  className = '',
  fill,
  width,
  height,
  sizes,
  priority = false,
  unoptimized,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : (imgSrc || fallbackSrc)}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={hasError ? true : unoptimized}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
