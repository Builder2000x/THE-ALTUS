-- Applied to project caexfhczfzvzwwjsketu on 2026-08-27.
-- Keeps the editor allow-list check out of the exposed public API schema and
-- ensures auth helpers are evaluated once per statement in RLS policies.
create or replace function private.is_altus_editor()
returns boolean language sql stable security definer set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (select 1 from private.altus_editors where user_id = (select auth.uid()));
$$;

revoke all on function private.is_altus_editor() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_altus_editor() to authenticated, service_role;

drop policy if exists "Published posts and editor drafts are readable" on public.posts;
create policy "Published posts and editor drafts are readable" on public.posts
for select to anon, authenticated using (
  status = 'published' or (author_id = (select auth.uid()) and (select private.is_altus_editor()))
);

drop policy if exists "Editors can create their own posts" on public.posts;
create policy "Editors can create their own posts" on public.posts
for insert to authenticated with check (
  author_id = (select auth.uid()) and (select private.is_altus_editor())
);

drop policy if exists "Editors can update their own posts" on public.posts;
create policy "Editors can update their own posts" on public.posts
for update to authenticated
using (author_id = (select auth.uid()) and (select private.is_altus_editor()))
with check (author_id = (select auth.uid()) and (select private.is_altus_editor()));

drop policy if exists "Editors can delete their own posts" on public.posts;
create policy "Editors can delete their own posts" on public.posts
for delete to authenticated using (
  author_id = (select auth.uid()) and (select private.is_altus_editor())
);

drop policy if exists "Altus editors can upload media" on storage.objects;
create policy "Altus editors can upload media" on storage.objects
for insert to authenticated with check (
  bucket_id = 'altus-media' and (select private.is_altus_editor())
);

drop policy if exists "Altus editors can update media" on storage.objects;
create policy "Altus editors can update media" on storage.objects
for update to authenticated
using (bucket_id = 'altus-media' and (select private.is_altus_editor()))
with check (bucket_id = 'altus-media' and (select private.is_altus_editor()));

drop policy if exists "Altus editors can remove media" on storage.objects;
create policy "Altus editors can remove media" on storage.objects
for delete to authenticated using (
  bucket_id = 'altus-media' and (select private.is_altus_editor())
);

drop function if exists public.is_altus_editor();
