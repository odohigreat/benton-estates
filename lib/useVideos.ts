'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { fallbackVideos, toVideo, type Video, type VideoRow } from './videos';

const STORAGE_KEY = 'benton_videos_cache';
let memory: Video[] | null = null;
let storageRead = false;
const listeners = new Set<() => void>();

// The memory copy is seeded from localStorage on first read so the same array is returned until it changes.
function readCache() {
  if (!storageRead) {
    storageRead = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) memory = JSON.parse(saved) as Video[];
    } catch {}
  }
  return memory;
}

function writeCache(videos: Video[] | null) {
  memory = videos;
  try {
    if (videos) localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

// Database access stays on the server, so videos are read through /api/videos rather than a browser Supabase client.
export function useVideos() {
  const cached = useSyncExternalStore(subscribe, readCache, () => null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/videos', { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(`Videos request failed (${response.status})`);
        const result = await response.json() as { data: VideoRow[] };
        // An empty successful response means every video was removed, so stale cache is dropped too.
        writeCache(result.data.length ? result.data.map(toVideo) : null);
      })
      .catch(() => { /* Keep showing the cache or fallback list. */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const data = cached ?? (loading ? [] : fallbackVideos);
  return { data, loading: loading && !cached };
}
