'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Custom Select Component
 *
 * Fully styled dropdown that matches our design system.
 * Replaces native <select> which can't be styled.
 */

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  isActive?: boolean;
  'aria-label': string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className,
  isActive = false,
  'aria-label': ariaLabel,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault();
      const firstOption = listboxRef.current?.querySelector('[role="option"]') as HTMLElement;
      firstOption?.focus();
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(optionValue || null);
      setIsOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (event.target as HTMLElement).nextElementSibling as HTMLElement;
      next?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (event.target as HTMLElement).previousElementSibling as HTMLElement;
      prev?.focus();
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-2 rounded-full border px-3 py-1.5',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2',
          isActive || value
            ? 'border-[var(--country-accent-primary)] bg-[var(--country-accent-surface)]'
            : 'border-transparent bg-[var(--color-bg-secondary)]',
          className
        )}
        style={{
          fontSize: 'var(--text-small)',
          color: isActive || value
            ? 'var(--country-accent-primary)'
            : 'var(--color-text-secondary)',
          // @ts-expect-error CSS custom property
          '--tw-ring-color': 'var(--country-accent-primary)',
        }}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown
          size={14}
          className={cn(
            'shrink-0 transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listboxRef}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'absolute left-0 z-50 mt-1 min-w-[160px] max-h-[240px]',
              'overflow-y-auto rounded-lg border p-1',
              'shadow-lg'
            )}
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border)',
            }}
            role="listbox"
            aria-label={ariaLabel}
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value || null);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-md px-3 py-2 cursor-pointer',
                    'transition-colors duration-100',
                    'outline-none',
                    isSelected
                      ? 'bg-[var(--country-accent-surface)]'
                      : 'hover:bg-[var(--color-surface-hover)] focus:bg-[var(--color-surface-hover)]'
                  )}
                  style={{
                    fontSize: 'var(--text-small)',
                    color: isSelected
                      ? 'var(--country-accent-primary)'
                      : 'var(--color-text-primary)',
                  }}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check
                      size={14}
                      style={{ color: 'var(--country-accent-primary)' }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
