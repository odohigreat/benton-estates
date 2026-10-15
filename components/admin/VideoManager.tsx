'use client';

import EmptyState from '@/components/ui/EmptyState';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { getYouTubeId, getYouTubeThumbnail, today, toVideo, VIDEO_CATEGORIES, type Video, type VideoRow } from '@/lib/videos';
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

type VideoForm = { id?: string; title: string; url: string; category: string; publishedAt: string };
const emptyForm = (): VideoForm => ({ title: '', url: '', category: 'Mission', publishedAt: today() });

const inputClass = 'w-full min-h-11 px-3 rounded-md border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none';
const labelClass = 'block text-xs font-bold uppercase text-slate-700 mb-1';

export default function VideoManager({ authToken, searchTerm }: { authToken: string; searchTerm: string }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<VideoForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Video | null>(null);

  const call = useCallback(async (method: string, body?: object, query = '') => {
    const res = await fetch(`/api/admin/videos${query}`, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error('Your session has expired. Please sign out and sign in again.');
    if (!res.ok || !result.success) throw new Error(result.error || 'The request could not be completed. Please try again.');
    return result;
  }, [authToken]);

  // `loading` starts true for the first load; refresh() flags it for later reloads.
  const loadVideos = useCallback(() => call('GET')
    .then(result => { setVideos((result.data as VideoRow[]).map(toVideo)); setLoadError(null); })
    .catch(error => setLoadError(error instanceof Error ? error.message : 'Unable to load videos.'))
    .finally(() => setLoading(false)), [call]);

  useEffect(() => {
    void loadVideos();
  }, [loadVideos]);

  const refresh = () => { setLoading(true); return loadVideos(); };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form) return;
    const title = form.title.trim();
    const url = form.url.trim();
    if (!title) return void toast.error('Video title is required.');
    if (!url) return void toast.error('YouTube URL is required.');
    if (!getYouTubeId(url)) return void toast.error('Must be a valid YouTube link.');

    setSaving(true);
    try {
      const payload = { title, url, category: form.category, publishedAt: form.publishedAt || today() };
      if (form.id) await call('PATCH', { id: form.id, ...payload });
      else await call('POST', payload);
      toast.success(form.id ? 'Video updated' : 'Video added');
      setForm(null);
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'The video could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setSaving(true);
    try {
      await call('DELETE', undefined, `?id=${encodeURIComponent(pendingDelete.id)}`);
      toast.success('Video deleted');
      setPendingDelete(null);
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'The video could not be deleted.');
    } finally {
      setSaving(false);
    }
  };

  const visible = videos.filter(video => `${video.title} ${video.category} ${video.url}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <Toaster position="top-right" richColors closeButton />
      <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center bg-slate-50">
        <div>
          <span className="font-bold text-xs uppercase text-slate-700 block">Featured Videos (Home Page)</span>
          <span className="text-xs text-slate-500">{videos.length} videos · newest 20 by published date are shown publicly</span>
        </div>
        <button type="button" onClick={() => setForm(emptyForm())} className="inline-flex items-center gap-1.5 bg-[#0304CE] hover:bg-[#143F9D] text-white text-xs font-bold px-3.5 py-2.5 rounded-md transition-colors">
          <Plus className="w-4 h-4" /> Add New Video
        </button>
      </div>

      {loadError && <div role="alert" className="admin-notice m-4 bg-red-50 text-red-800">{loadError}<button className="ml-3 underline" onClick={() => void refresh()}>Retry loading</button></div>}

      {visible.length === 0 ? (
        <EmptyState
          title={loading ? 'Loading videos…' : loadError ? 'Videos unavailable' : searchTerm ? 'No matching videos' : 'No videos yet'}
          description={loading ? 'Please wait while videos are retrieved.' : loadError ? 'Use Retry loading above to reconnect.' : searchTerm ? 'Try a different title or category.' : 'Add a YouTube link to feature it on the home page.'}
        />
      ) : (
        <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map(video => {
            const thumbnail = getYouTubeThumbnail(video.url);
            return (
              <div key={video.id} className="rounded-lg border border-slate-200 overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-slate-100">
                  {thumbnail && <Image src={thumbnail} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                  {loading && <RefreshCw className="absolute right-2 top-2 w-4 h-4 animate-spin text-white" aria-hidden="true" />}
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#0304CE]">{video.category} · {video.publishedAt}</span>
                    <p className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">{video.title}</p>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button type="button" onClick={() => setForm({ ...video, category: (VIDEO_CATEGORIES as readonly string[]).includes(video.category) ? video.category : 'Mission' })} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-md">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button type="button" onClick={() => setPendingDelete(video)} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-3 py-2 rounded-md">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={form !== null} onOpenChange={open => { if (!open && !saving) setForm(null); }}>
        <DialogContent className="w-[calc(100%-32px)] bg-white max-w-lg p-6">
          <DialogTitle className="font-bold">{form?.id ? 'Edit Video' : 'Add New Video'}</DialogTitle>
          <DialogDescription className="mt-1">Videos appear in the Featured Videos carousel on the home page.</DialogDescription>
          {form && (
            <form onSubmit={handleSave} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="video-title" className={labelClass}>Video Title *</label>
                <input id="video-title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="video-url" className={labelClass}>YouTube URL *</label>
                <input id="video-url" type="url" required inputMode="url" placeholder="https://www.youtube.com/watch?v=…" aria-describedby="video-url-hint" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className={inputClass} />
                <p id="video-url-hint" className="text-[11px] text-slate-500 mt-1.5">Must be a valid YouTube link.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="video-category" className={labelClass}>Category</label>
                  <select id="video-category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                    {VIDEO_CATEGORIES.map(category => <option key={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="video-date" className={labelClass}>Published Date</label>
                  <input id="video-date" type="date" value={form.publishedAt} onChange={e => setForm({ ...form, publishedAt: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <DialogClose type="button" disabled={saving} className="px-4 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold">Cancel</DialogClose>
                <button type="submit" disabled={saving} className="px-4 py-2.5 rounded-md bg-[#0304CE] hover:bg-[#143F9D] text-white text-xs font-bold disabled:opacity-60">
                  {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={pendingDelete !== null} onOpenChange={open => { if (!open && !saving) setPendingDelete(null); }}>
        <DialogContent className="w-[calc(100%-32px)] bg-white max-w-md p-6" role="alertdialog">
          <DialogTitle className="font-bold">Delete this video?</DialogTitle>
          <DialogDescription className="mt-2">&ldquo;{pendingDelete?.title}&rdquo; will be removed from the home page. This cannot be undone.</DialogDescription>
          <div className="flex justify-end gap-2 mt-6">
            <DialogClose type="button" disabled={saving} className="px-4 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold">Cancel</DialogClose>
            <button type="button" onClick={() => void handleDelete()} disabled={saving} className="px-4 py-2.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-bold disabled:opacity-60">
              {saving ? 'Deleting…' : 'Delete Video'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
