/**
 * Olympus Home Page — Video Showcase
 *
 * CenterStage content: video highlight player + queue + athlete ticker.
 * Replaces the previous FeaturedHighlight + EventFeed (rolodex drum).
 * Schedule and medals remain in the RightDrawer tabs.
 */

import { VideoShowcase } from '@/components/showcase';

export default function Home() {
  return (
    <div className="h-full">
      <VideoShowcase />
    </div>
  );
}
