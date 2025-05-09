"use client";

import { useEffect } from 'react';

export default function VideoAutoplay() {
  useEffect(() => {
    // Helper function to play videos that might be blocked by browser policies
    const playVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented
            // Show poster image by setting video opacity to 0
            if (error.name === "NotAllowedError") {
              video.setAttribute('poster', '/images/hero-poster.webp');
              console.log("Video autoplay prevented by browser policy");
            }
          });
        }
      });
    };

    // Try to play videos on page load
    playVideos();

    // Also try to play videos on user interaction (which often removes autoplay restrictions)
    const handleUserInteraction = () => {
      playVideos();
      // Remove event listeners after first interaction
      ['touchstart', 'click'].forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    // Add event listeners for user interaction
    ['touchstart', 'click'].forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Cleanup
    return () => {
      ['touchstart', 'click'].forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return null; // This component doesn't render anything
} 