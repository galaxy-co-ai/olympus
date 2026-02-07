'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * Konami Code Hook
 *
 * Detects the classic Konami code sequence:
 * ↑ ↑ ↓ ↓ ← → ← → B A
 *
 * Fires callback when the sequence is completed.
 * Resets if more than 2 seconds pass between keypresses.
 */

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

const RESET_DELAY = 2000; // Reset after 2s of inactivity

export function useKonamiCode(callback: () => void) {
  const sequenceIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetSequence = useCallback(() => {
    sequenceIndexRef.current = 0;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to reset
      timeoutRef.current = setTimeout(resetSequence, RESET_DELAY);

      const expectedKey = KONAMI_SEQUENCE[sequenceIndexRef.current];
      const pressedKey = event.code;

      if (pressedKey === expectedKey) {
        sequenceIndexRef.current++;

        // Complete sequence
        if (sequenceIndexRef.current === KONAMI_SEQUENCE.length) {
          resetSequence();
          callback();
        }
      } else {
        // Wrong key — reset
        resetSequence();
      }
    },
    [callback, resetSequence]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyDown]);
}
