-- Personalplan WASP – Datenbank einrichten (einmal im SQL Editor ausführen)

-- 1) Tabelle für alle Plandaten
create table if not exists public.pp_docs (
  path       text primary key,
  coll       text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists pp_docs_coll on public.pp_docs (coll);

-- 2) Liste der freigeschalteten Personen (E-Mail)
create table if not exists public.pp_users (
  email text primary key
);

-- 3) Zugriffsschutz: nur angemeldete UND freigeschaltete Personen
alter table public.pp_docs  enable row level security;
alter table public.pp_users enable row level security;

create or replace function public.pp_ok() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.pp_users
                 where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

drop policy if exists pp_docs_all  on public.pp_docs;
drop policy if exists pp_users_read on public.pp_users;
create policy pp_docs_all  on public.pp_docs  for all    to authenticated using (public.pp_ok()) with check (public.pp_ok());
create policy pp_users_read on public.pp_users for select to authenticated using (public.pp_ok());

-- 4) Live-Abgleich einschalten
alter table public.pp_docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.pp_docs;
exception when duplicate_object then null; end $$;

-- 5) >>> DEINE E-Mail-Adresse hier eintragen (weitere Personen später im Table Editor) <<<
insert into public.pp_users (email) values
  ('deine.email@weissappetito.ch')
on conflict do nothing;
