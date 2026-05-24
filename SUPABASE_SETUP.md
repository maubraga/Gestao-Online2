# Supabase Setup

Este projeto ja esta preparado para usar Supabase quando estas variaveis existirem:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Sem essas variaveis, ele continua em modo local por arquivo.

## 1. Criar projeto no Supabase

Crie um projeto no plano gratuito:

- [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)

## 2. Criar tabelas

No SQL Editor do Supabase, rode este script:

```sql
create table if not exists public.users (
  username text primary key,
  password text not null,
  display_name text not null,
  role text not null default 'user'
);

create table if not exists public.projects (
  id text not null,
  owner_username text not null,
  name text not null,
  user_name text not null,
  report_type text not null,
  entries jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (owner_username, id)
);

create index if not exists projects_owner_updated_idx
  on public.projects (owner_username, updated_at desc);
```

## 3. Inserir usuario admin inicial

```sql
insert into public.users (username, password, display_name, role)
values ('maubraga', '260781Mau@', 'maubraga', 'admin')
on conflict (username) do update
set password = excluded.password,
    display_name = excluded.display_name,
    role = excluded.role;

insert into public.users (username, password, display_name, role)
values ('felipe', 'bepass123', 'Felipe', 'user')
on conflict (username) do update
set password = excluded.password,
    display_name = excluded.display_name,
    role = excluded.role;
```

## 4. Pegar credenciais

No Supabase:

- `Project Settings`
- `Data API`

Copie:

- `Project URL` -> `SUPABASE_URL`
- `service_role secret` -> `SUPABASE_SERVICE_ROLE_KEY`

## 5. Configurar no Render

No Render, em `Environment`, adicione:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Depois redeploy.

## 6. Verificacao

Quando subir com sucesso:

- `/api/config` deve responder com `storageMode: "supabase"`
- login admin continua:
  - usuario: `maubraga`
  - senha: `260781Mau@`
