/**
 * Olympus Home Page — Dashboard
 *
 * CenterStage content: featured event highlight + event feed grid.
 * Schedule and medals live in the RightDrawer tabs.
 */

import { FeaturedHighlight } from '@/components/home/FeaturedHighlight';
import { EventFeed } from '@/components/home/EventFeed';

export default function Home() {
  return (
    <div className="space-y-6">
      <FeaturedHighlight />
      <EventFeed />
    </div>
  );
}
