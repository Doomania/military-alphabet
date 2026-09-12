import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base='https://military-alphabet.pages.dev/';
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
let files=0,scripts=0,links=0;
for(const file of fs.readdirSync(root).filter(x=>x.endsWith('.html'))){
 const raw=fs.readFileSync(path.join(root,file),'utf8');
 const html=raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+': one H1');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,file+': unique element IDs');
 if(file!=='404.html'){
  const canonical=base+(file==='index.html'?'':file.replace('.html',''));
  assert.ok(raw.includes('rel="canonical" href="'+canonical+'"'),file+': canonical');
  assert.ok(sitemap.includes('<loc>'+canonical+'</loc>'),file+': sitemap');
  for(const route of ['alphabet','morse','military-time','codes','ham-radio','signal-flags','drill'])
   assert.ok(html.includes('href="'+route+'"'),file+': static navigation to '+route);
 }
 for(const m of html.matchAll(/href="([^"]+)"/g)){
  const href=m[1];if(/^(https?:|data:|mailto:)/.test(href))continue;
  const [route,fragment]=href.split('#');
  let target=route?path.join(root,route):path.join(root,file);
  if(route==='./')target=path.join(root,'index.html');
  if(!path.extname(target))target+='.html';
  assert.ok(fs.existsSync(target),file+': missing link '+href);
  if(fragment&&target.endsWith('.html'))assert.ok(fs.readFileSync(target,'utf8').includes('id="'+fragment+'"'),file+': missing anchor '+href);
  assert.ok(!route.endsWith('.html'),file+': link uses redirect '+href);links++;
 }
 for(const m of raw.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
  if(m[1].includes('application/ld+json')){
   const data=JSON.parse(m[2]);
   for(const q of data.mainEntity||[]){assert.ok(html.includes(q.name),file+': FAQ question missing');assert.ok(html.includes(q.acceptedAnswer.text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll("'",'&#x27;'))||html.includes(q.acceptedAnswer.text),file+': FAQ answer mismatch');}
  }else {new vm.Script(m[2],{filename:file});scripts++;}
 }
 files++;
}
assert.equal((sitemap.match(/<loc>/g)||[]).length,9);
const time=fs.readFileSync(path.join(root,'military-time.html'),'utf8');
const zones=time.split('id="tz-letters">')[1].split('<h2')[0];
assert.equal((zones.match(/class="card-code"/g)||[]).length,25);
assert.ok(zones.includes('Y — Yankee')&&zones.includes('UTC−12')&&zones.includes('M — Mike')&&zones.includes('UTC+12'));
const hours=time.split('id="ref-grid">')[1].split('<h2')[0];
assert.equal((hours.match(/class="card-code"/g)||[]).length,24);
new vm.Script(fs.readFileSync(path.join(root,'sw.js'),'utf8'));
JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
console.log(`PASS: ${files} HTML pages, ${scripts} scripts, ${links} local links; canonical URLs, sitemap, FAQ parity, and complete time charts.`);
