import React, { useEffect, useState } from 'react';
import './PromoBanner.css';

const PromoBanner: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100); // ativa após 100px rolados
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft('00:00:00');
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <a
      href="/promotion"
      className={`promo-banner ${isSticky ? 'sticky' : ''}`}
    >
      <p>🔥 Promoção por tempo limitado!</p>
      <p>⏳ Termina em <strong>{timeLeft}</strong></p>
    </a>
  );
};

export default PromoBanner;
