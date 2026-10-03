'use client';
import { useEffect, useState } from 'react';
export default function FormProgress({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
      else if (sections[0] && (document.getElementById(sections[0].id)?.getBoundingClientRect().top ?? 0) > window.innerHeight * 0.45) setActive(sections[0].id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [sections]);
  return <nav className="form-progress" aria-label="Application sections"><span className="form-progress-label">Your application</span><ol>{sections.map(({ id, label }, index) => <li key={id}><a href={`#${id}`} aria-current={active === id ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a></li>)}</ol></nav>;
}
