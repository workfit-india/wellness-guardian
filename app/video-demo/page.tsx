'use client'

import YouTubeEmbed from "./components/youtube-embed";

export default function VideoDemo() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <YouTubeEmbed videoId="dQw4w9WgXcQ" title="My YouTube Video" />
    </div>
  );
}