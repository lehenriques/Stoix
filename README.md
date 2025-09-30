# Sistema de Gerenciamento de Tarefas

Sistema completo de CRUD de tarefas desenvolvido com Laravel (backend) e React TypeScript (frontend).

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso da Aplicação](#uso-da-aplicação)
- [Arquitetura e Design Patterns](#arquitetura-e-design-patterns)
- [API Endpoints](#api-endpoints)

## 🚀 Tecnologias Utilizadas

### Backend
- **Laravel 11** - Framework PHP
- **MySQL 8.0** - Banco de dados
- **Laravel Sail** - Ambiente Docker
- **PHP 8.4** - Linguagem de programação

### Frontend
- **React 18** - Biblioteca JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **Inertia.js** - Framework para SPAs

## 📁 Estrutura do Projeto

```
stoix/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── TaskController.php       # Controller RESTful
│   └── Models/
│       └── Task.php                      # Model Eloquent
├── database/
│   └── migrations/
│       └── 2025_09_30_165105_create_tasks_table.php
├── resources/
│   └── js/
│       ├── components/
│       │   ├── task-form.tsx            # Formulário de tarefas
│       │   ├── task-list.tsx            # Lista de tarefas
│       │   └── toast.tsx                # Notificações
│       ├── pages/
│       │   └── tasks.tsx                # Página principal
│       ├── services/
│       │   └── taskService.ts           # Serviço de API
│       └── types/
│           └── task.ts                  # Tipos TypeScript
├── routes/
│   └── web.php                          # Rotas da aplicação
└── config/
    └── cors.php                         # Configuração CORS
```

## ✨ Funcionalidades

### CRUD Completo
- ✅ **Criar** - Adicionar novas tarefas com título e descrição
- ✅ **Listar** - Visualizar todas as tarefas ordenadas por data
- ✅ **Atualizar** - Editar título e descrição de tarefas existentes
- ✅ **Excluir** - Remover tarefas do sistema
- ✅ **Marcar como Concluída** - Toggle de status completo/pendente

### Validações
- **Frontend:**
  - Título obrigatório (mínimo 3, máximo 255 caracteres)
  - Descrição opcional (máximo 1000 caracteres)
  - Feedback visual de erros em tempo real

- **Backend:**
  - Validação Laravel com regras de negócio
  - Mensagens de erro padronizadas
  - Proteção contra dados inválidos

### Segurança
- ✅ **CSRF Token** - Proteção contra Cross-Site Request Forgery
- ✅ **CORS** - Configurado para aceitar requisições do frontend
- ✅ **Validação de Dados** - Em frontend e backend
- ✅ **Sanitização** - Proteção contra XSS

### UX/UI
- ✅ Interface responsiva (mobile-first)
- ✅ Notificações toast para feedback
- ✅ Loading states em todas as ações
- ✅ Confirmação antes de excluir
- ✅ Animações e transições suaves
- ✅ Acessibilidade (ARIA labels)

## 🔧 Instalação e Configuração

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ e NPM

### Passo a Passo

1. **Clone o repositório** (se aplicável)
```bash
cd /var/www/stoix
```

2. **Instale as dependências PHP**
```bash
composer install
```

3. **Instale as dependências JavaScript**
```bash
npm install
```

4. **Configure as variáveis de ambiente**
O arquivo `.env` já está configurado com:
```env
APP_PORT=8000
VITE_PORT=5173
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
MYSQL_EXTRA_OPTIONS=
```

5. **Inicie os containers Docker**
```bash
./vendor/bin/sail up -d
```

6. **Execute as migrations**
```bash
./vendor/bin/sail artisan migrate
```

7. **Compile os assets do frontend**
```bash
./vendor/bin/sail npm run build
```

8. **Acesse a aplicação**
- Frontend: http://localhost:8000/tasks
- API: http://localhost:8000/api/tasks

## 💻 Uso da Aplicação

### Criando uma Tarefa
1. Acesse http://localhost:8000/tasks
2. Preencha o campo "Título" (obrigatório)
3. Opcionalmente, adicione uma "Descrição"
4. Clique em "Criar"
5. Você verá uma notificação de sucesso

### Editando uma Tarefa
1. Clique no botão de editar (ícone de lápis)
2. Modifique os campos desejados
3. Clique em "Atualizar"
4. Ou clique em "Cancelar" para descartar mudanças

### Marcando como Concluída
- Clique no checkbox ao lado da tarefa
- A tarefa ficará com texto riscado
- Uma badge "Concluída" aparecerá

### Excluindo uma Tarefa
1. Clique no botão de excluir (ícone de lixeira)
2. Confirme a ação no diálogo
3. A tarefa será removida permanentemente

## 🏗️ Arquitetura e Design Patterns

### Backend (Laravel)

#### MVC Pattern
- **Model** (`Task.php`): Representação da entidade no banco
- **Controller** (`TaskController.php`): Lógica de negócio e validação
- **View** (Inertia.js): Renderização no frontend

#### RESTful API
Endpoints seguindo convenções REST:
```
GET    /api/tasks       - Listar todas
POST   /api/tasks       - Criar nova
GET    /api/tasks/{id}  - Buscar específica
PUT    /api/tasks/{id}  - Atualizar
DELETE /api/tasks/{id}  - Excluir
```

#### Repository Pattern
O service layer (`taskService.ts`) abstrai a comunicação HTTP, facilitando:
- Testes unitários
- Mudança de endpoints
- Tratamento centralizado de erros

### Frontend (React)

#### Component-Based Architecture
Componentes reutilizáveis e isolados:
- `TaskForm` - Responsável apenas pelo formulário
- `TaskList` - Responsável apenas pela listagem
- `Toast` - Componente de notificação global
- `Tasks` - Orquestrador (container component)

#### Custom Hooks Pattern
Separação de lógica de estado e apresentação

#### Service Layer Pattern
`taskService.ts` centraliza todas as chamadas à API:
```typescript
taskService.getAllTasks()
taskService.createTask(data)
taskService.updateTask(id, data)
taskService.deleteTask(id)
```

#### Type Safety
TypeScript garante segurança de tipos em toda aplicação:
```typescript
interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}
```

## 📡 API Endpoints

### GET /api/tasks
**Descrição:** Lista todas as tarefas

**Resposta (200):**
```json
[
  {
    "id": 1,
    "title": "Estudar Laravel",
    "description": "Aprender sobre Eloquent ORM",
    "completed": false,
    "created_at": "2025-09-30T16:51:05.000000Z",
    "updated_at": "2025-09-30T16:51:05.000000Z"
  }
]
```

### POST /api/tasks
**Descrição:** Cria uma nova tarefa

**Headers:**
```
Content-Type: application/json
X-CSRF-TOKEN: {token}
```

**Body:**
```json
{
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false
}
```

**Resposta (201):**
```json
{
  "id": 2,
  "title": "Nova tarefa",
  "description": "Descrição opcional",
  "completed": false,
  "created_at": "2025-09-30T17:00:00.000000Z",
  "updated_at": "2025-09-30T17:00:00.000000Z"
}
```

### PUT /api/tasks/{id}
**Descrição:** Atualiza uma tarefa existente

**Headers:**
```
Content-Type: application/json
X-CSRF-TOKEN: {token}
```

**Body:**
```json
{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true,
  "created_at": "2025-09-30T16:51:05.000000Z",
  "updated_at": "2025-09-30T17:05:00.000000Z"
}
```

### DELETE /api/tasks/{id}
**Descrição:** Exclui uma tarefa

**Headers:**
```
X-CSRF-TOKEN: {token}
```

**Resposta (204):** Sem conteúdo

### GET /api/csrf-token
**Descrição:** Obtém token CSRF para requisições autenticadas

**Resposta (200):**
```json
{
  "token": "xYz123..."
}
```

## 🔒 Segurança CSRF

O sistema implementa proteção CSRF em todas as operações de escrita:

1. O frontend solicita um token CSRF: `GET /api/csrf-token`
2. O token é armazenado no serviço
3. Todas as requisições POST/PUT/DELETE incluem o header `X-CSRF-TOKEN`
4. O Laravel valida o token automaticamente

**Interceptor Axios:**
```typescript
apiClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
    const token = await getCsrfToken();
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});
```

## 🎨 Boas Práticas Implementadas

### Código Limpo
- ✅ Nomes descritivos de variáveis e funções
- ✅ Funções pequenas e com responsabilidade única
- ✅ Comentários apenas quando necessário
- ✅ Código autodocumentado

### Performance
- ✅ Build otimizado com Vite
- ✅ Lazy loading de componentes
- ✅ Debounce em validações (se aplicável)
- ✅ Minimização de re-renders

### Acessibilidade
- ✅ Labels semânticos
- ✅ ARIA attributes
- ✅ Navegação por teclado
- ✅ Contraste adequado

### Responsividade
- ✅ Mobile-first design
- ✅ Breakpoints Tailwind
- ✅ Flex/Grid layouts
- ✅ Texto adaptativo

## 📝 Comandos Úteis

```bash
# Iniciar ambiente
./vendor/bin/sail up -d

# Parar ambiente
./vendor/bin/sail down

# Ver logs
./vendor/bin/sail logs -f

# Executar migrations
./vendor/bin/sail artisan migrate

# Criar nova migration
./vendor/bin/sail artisan make:migration nome_da_migration

# Build para produção
./vendor/bin/sail npm run build

# Desenvolvimento (watch mode)
./vendor/bin/sail npm run dev
```

## 🧪 Testando a API

### Usando cURL

**Obter token CSRF:**
```bash
curl http://localhost:8000/api/csrf-token
```

**Listar tarefas:**
```bash
curl http://localhost:8000/api/tasks
```

**Criar tarefa:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "X-CSRF-TOKEN: {seu_token}" \
  -d '{"title":"Teste","description":"Descrição teste"}'
```

---

**Desenvolvido com ❤️ usando Laravel + React + TypeScript**
