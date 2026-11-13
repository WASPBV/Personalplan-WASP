create table if not exists public.pp_share (
  token text primary key, wk text not null unique, html text not null,
  updated_at timestamptz not null default now(), expires_at timestamptz not null);
alter table public.pp_share enable row level security;
drop policy if exists pp_share_all on public.pp_share;
create policy pp_share_all on public.pp_share for all to authenticated
  using (public.pp_ok()) with check (public.pp_ok());
create or replace function public.pp_share_get(t text)
returns table (html text, updated_at timestamptz)
language sql stable security definer set search_path = public as $$
  select s.html, s.updated_at from public.pp_share s
  where s.token = t and s.expires_at > now(); $$;
revoke all on function public.pp_share_get(text) from public;
grant execute on function public.pp_share_get(text) to anon, authenticated;
