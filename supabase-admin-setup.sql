-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
-- Adds CRM fields to the leads table and the access policies the
-- admin dashboard needs (separate from the public "anyone can submit
-- the form" policy that already exists).

alter table contact_submissions
  add column if not exists status text not null default 'New',
  add column if not exists notes text;

-- Only logged-in users (i.e. you, once you have a Supabase Auth login)
-- can read the list of leads. The public/anon key can still INSERT
-- (submit the form) but can never SELECT rows back out.
create policy "Authenticated users can read leads"
  on contact_submissions for select
  to authenticated
  using (true);

-- Only logged-in users can update a lead's status/notes.
create policy "Authenticated users can update leads"
  on contact_submissions for update
  to authenticated
  using (true)
  with check (true);
