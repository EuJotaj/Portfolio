import { useEffect, useRef, useState } from 'react';
import { usePosicaoMouse } from '@/ganchos';
import styles from './FundoAnimado.module.css';

export function FundoAnimado() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoCarregado, setVideoCarregado] = useState(false);
  const [videoFalhou, setVideoFalhou] = useState(false);
  const { x, y } = usePosicaoMouse();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLElement>(`.${styles.orbe}`);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 15;
      orb.style.transform = `translate(${offsetX * factor}px, ${offsetY * factor}px)`;
    });
  }, [x, y]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoCarregado || videoFalhou) return;

    const iniciarVideo = async () => {
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        // O autoplay pode ser bloqueado por políticas do navegador; o fallback permanece ativo.
      }
    };

    void iniciarVideo();
  }, [videoCarregado, videoFalhou]);

  return (
    <div ref={containerRef} className={styles.fundo} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.videoFundo}
        src="/assets/img/background.mp4"
        poster="/assets/img/backgroundStatic.webp"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        onLoadedData={() => setVideoCarregado(true)}
        onCanPlay={() => setVideoCarregado(true)}
        onError={() => setVideoFalhou(true)}
        style={{ opacity: videoCarregado && !videoFalhou ? 1 : 0 }}
      />
      <div
        className={styles.camadaFallback}
        style={{ opacity: videoCarregado && !videoFalhou ? 0 : 1 }}
      />
      <div className={`${styles.orbe} ${styles.orbe1}`} />
      <div className={`${styles.orbe} ${styles.orbe2}`} />
      <div className={`${styles.orbe} ${styles.orbe3}`} />
      <div className={styles.grade} />
      <div className={styles.ruido} />
    </div>
  );
}
