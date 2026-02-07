/**
 * Stories Page — Editorial narrative experience
 *
 * Reference: OLYMPUS_CONSTITUTION.md
 * - Section 7: Story/Editorial System
 *
 * The emotional core — transforms Olympic data into story.
 * Contains the full StorySection that was previously on the homepage.
 */

import { StorySection } from '@/components/story';

export default function StoriesPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <StorySection />
    </div>
  );
}
