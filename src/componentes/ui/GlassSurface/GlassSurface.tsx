import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './GlassSurface.css';

interface GlassSurfaceProps {
  children: ReactNode;
  variant?: 'full' | 'soft';
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: CSSProperties['mixBlendMode'];
  className?: string;
  style?: CSSProperties;
}

export function GlassSurface({
  children,
  variant = 'full',
  width = '100%',
  height = 'auto',
  borderRadius = 28,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0.04,
  saturation = 1.15,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;
  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="100%" height="100%" fill="black"/><rect width="100%" height="100%" rx="${borderRadius}" fill="url(#${redGradId})"/><rect width="100%" height="100%" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  useEffect(() => {
    if (variant === 'soft') return;
    const update = () => feImageRef.current?.setAttribute('href', generateDisplacementMap());
    update();
    [
      [redChannelRef, redOffset],
      [greenChannelRef, greenOffset],
      [blueChannelRef, blueOffset],
    ].forEach(([ref, offset]) => {
      if (ref && typeof ref !== 'number' && ref.current) {
        ref.current.setAttribute('scale', `${distortionScale + Number(offset)}`);
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute('stdDeviation', `${displace}`);
  }, [
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
    variant,
  ]);

  useEffect(() => {
    if (variant === 'soft' || !containerRef.current) return;
    const resizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(() =>
        feImageRef.current?.setAttribute('href', generateDisplacementMap())
      )
    );
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [variant]);

  useEffect(() => {
    if (variant === 'soft') return;
    const isUnsupported =
      (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) ||
      /Firefox/.test(navigator.userAgent);
    if (isUnsupported) return;
    const probe = document.createElement('div');
    probe.style.backdropFilter = `url(#${filterId})`;
    setSvgSupported(probe.style.backdropFilter !== '');
  }, [filterId, variant]);

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`glass-surface glass-surface--${variant} ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      {variant === 'full' && (
        <svg
          className="glass-surface__filter"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage
                ref={feImageRef}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                ref={redChannelRef}
                in="SourceGraphic"
                in2="map"
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                result="red"
              />
              <feDisplacementMap
                ref={greenChannelRef}
                in="SourceGraphic"
                in2="map"
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
                result="green"
              />
              <feDisplacementMap
                ref={blueChannelRef}
                in="SourceGraphic"
                in2="map"
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0"
                result="blue"
              />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur ref={gaussianBlurRef} in="output" />
            </filter>
          </defs>
        </svg>
      )}
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
