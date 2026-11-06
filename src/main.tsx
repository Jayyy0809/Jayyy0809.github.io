import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {projects} from './projects';
import './style.css';

function App(){
 const [filter,setFilter]=useState('All');
 const [selected,setSelected]=useState<typeof projects[number]|null>(null);
 const [motion,setMotion]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const close=useRef<HTMLButtonElement>(null);
 const previous=useRef<HTMLElement|null>(null);
 useEffect(()=>{document.documentElement.dataset.motion=String(motion)},[motion]);
 useEffect(()=>{
  if(!selected)return;
  previous.current=document.activeElement as HTMLElement;close.current?.focus();
  const old=document.body.style.overflow;document.body.style.overflow='hidden';
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setSelected(null);if(event.key==='Tab'){event.preventDefault();close.current?.focus()}};
  window.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);previous.current?.focus()};
 },[selected]);
 const visible=projects.filter(p=>filter==='All'||p.category===filter);
 return <><a className="skip" href="#work">Skip to work</a><header><a className="wordmark" href="#">Jay<span>®</span></a><nav aria-label="Main navigation"><a href="#work">Work <span>04</span></a><a href="#about">About ↗</a><a href="https://github.com/Jayyy0809">GitHub ↗</a></nav></header>
 <main><section className="hero"><div className="eyebrow"><span className="dot"/> A PERSONAL COLLECTION / VOL. 01</div><h1>Ideas into<br/><span className="serif">experiences.</span><span className="hero-star" aria-hidden="true">✳</span></h1><div className="hero-bottom"><p>A space for selected work, curious experiments,<br/>and the details that make a difference.</p><a href="#work" className="discover">Explore the work <span>↓</span></a></div></section>
 <section id="work" className="work"><div className="section-heading"><h2>Selected work<span> / 01—04</span></h2><span className="draft">CONCEPT PLACEHOLDERS</span></div><div className="filters" aria-label="Filter projects">{['All','Digital','Identity','Experiments'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}{f==='All'&&<sup>04</sup>}</button>)}<span className="count" aria-live="polite">{visible.length} projects</span></div>
 <div className="grid">{visible.map(p=><button className="project" key={p.id} onClick={()=>setSelected(p)} aria-label={`Explore ${p.title}`}><div className={`art ${p.theme}`}><span className="art-label">JAY / CONCEPT {p.year}</span><div className="art-object" aria-hidden="true">{p.theme==='orbit'?<><i/><i/><i/><b>o.</b></>:p.theme==='form'?<><b>F<span>&</span>f</b><i/></>:p.theme==='field'?<><i/><i/><i/><b>field<br/>notes.</b></>:<><i/><i/><i/><b>parallel_</b></>}</div><span className="view">Explore project ↗</span></div><div className="project-info"><div><h3>{p.title}</h3><p>{p.subtitle}</p></div><span>{p.category} <span className="arrow">↗</span></span></div></button>)}</div></section>
 <section id="about" className="about"><div className="eyebrow">A LITTLE ABOUT THIS SPACE</div><h2>Curiosity leads.<br/><span className="serif">The work follows.</span></h2><div className="about-bottom"><p>I'm Jay. This is my corner of the internet for sharing what I make and what I'm exploring.<br/><br/>This first edition is taking shape. Real projects and more about my practice are coming soon.</p><a className="circle-link" href="https://github.com/Jayyy0809" aria-label="Visit Jay on GitHub">↗</a></div></section>
 </main><footer><a className="wordmark" href="#">Jay<span>®</span></a><span>© {new Date().getFullYear()} Jay · A work in progress.</span><button onClick={()=>setMotion(!motion)} aria-pressed={motion}>Motion {motion?'on':'off'} <span aria-hidden="true">{motion?'◉':'○'}</span></button><a href="#">Back to top ↑</a></footer>
 {selected&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button ref={close} className="close" onClick={()=>setSelected(null)}>Close ✕</button><div className="eyebrow">CONCEPT STUDY / {selected.category}</div><h2 id="project-title">{selected.title}</h2><p className="modal-subtitle">{selected.subtitle}</p><div className={`modal-art art ${selected.theme}`} aria-hidden="true"><span>{selected.title}</span></div><h3>About this concept</h3><p>{selected.description}</p><p className="placeholder-note">Demo content · This is not a completed client project.</p></section></div>}
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
