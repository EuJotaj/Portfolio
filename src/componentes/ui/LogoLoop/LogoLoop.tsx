import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
} from 'react';
import './LogoLoop.css';

export interface LogoItem {
  node?: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 32,
  gap = 32,
  hoverSpeed = 0,
  scaleOnHover = true,
  ariaLabel = 'Tecnologias utilizadas',
  className = '',
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const measuredWidth = sequenceRef.current?.getBoundingClientRect().width ?? 0;
    if (measuredWidth <= 0) return;
    setSequenceWidth(Math.ceil(measuredWidth));
    setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / measuredWidth) + COPY_HEADROOM));
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    const measureNextFrame = requestAnimationFrame(updateDimensions);
    const handleWindowResize = () => updateDimensions();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') updateDimensions();
    };

    updateDimensions();
    window.addEventListener('resize', handleWindowResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(measureNextFrame);
      observer.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || sequenceWidth <= 0) return;
    let frame = 0;
    let lastTime: number | null = null;
    let offset = 0;
    let velocity = 0;
    const targetDirection = direction === 'left' ? 1 : -1;
    const targetSpeed = () => (isHovered ? hoverSpeed : speed) * targetDirection;

    const animate = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      const target = targetSpeed();
      velocity += (target - velocity) * (1 - Math.exp(-delta * 8));
      offset = (((offset + velocity * delta) % sequenceWidth) + sequenceWidth) % sequenceWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [direction, hoverSpeed, isHovered, sequenceWidth, speed]);

  const renderLogo = useCallback((logo: LogoItem, key: Key) => {
    const content = (
      <span className="logoloop__node" aria-hidden={Boolean(logo.href && !logo.ariaLabel)}>
        {logo.node}
      </span>
    );
    const item = logo.href ? (
      <a
        className="logoloop__link"
        href={logo.href}
        aria-label={logo.ariaLabel ?? logo.title}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : (
      content
    );
    return (
      <li className="logoloop__item" key={key}>
        {item}
      </li>
    );
  }, []);

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? sequenceRef : undefined}
        >
          {logos.map((logo, index) => renderLogo(logo, `${copyIndex}-${index}`))}
        </ul>
      )),
    [copyCount, logos, renderLogo]
  );
  const rootClass = [
    'logoloop',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={
        {
          width: typeof width === 'number' ? `${width}px` : width,
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logo-height': `${logoHeight}px`,
          ...style,
        } as CSSProperties
      }
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="logoloop__track" ref={trackRef}>
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
