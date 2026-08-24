import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';

await mkdir('dist/client', { recursive: true });
for (const entry of await readdir('dist')) {
  if (entry === '.openai' || entry === 'client' || entry === 'server') continue;
  await rename(`dist/${entry}`, `dist/client/${entry}`);
}
await mkdir('dist/server', { recursive: true });
await writeFile('dist/server/index.js', `const SECURITY_HEADERS={
  'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'X-Content-Type-Options':'nosniff',
  'X-Frame-Options':'DENY',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy':'same-origin'
};
export default {async fetch(request,env){
  const url=new URL(request.url);
  const wantsHtml=request.headers.get('accept')?.includes('text/html');
  if(url.pathname==='/')url.pathname='/index.html';
  let response=await env.ASSETS.fetch(new Request(url,request));
  if(response.status===404&&wantsHtml){url.pathname='/index.html';response=await env.ASSETS.fetch(new Request(url,request))}
  const headers=new Headers(response.headers);
  for(const [key,value] of Object.entries(SECURITY_HEADERS))headers.set(key,value);
  if(url.pathname==='/sw.js')headers.set('Cache-Control','no-cache');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers})
}};\n`);

