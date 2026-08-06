import { useEffect } from 'react';
import './VideoModal.css';

export default function VideoModal({ src, onClose }) {
  // Lock background scroll + allow closing with Escape while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="video-modal__close"
          onClick={onClose}
          aria-label="Close video"
        >
          &times;
        </button>
        <video
          className="video-modal__player"
          src={src}
          controls
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  );
}