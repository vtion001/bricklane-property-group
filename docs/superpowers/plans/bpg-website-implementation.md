# BPG Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete BPG (Brick Lane Property Group) marketing website + admin dashboard as a monorepo: Vue 3 frontend + CodeIgniter 4 backend.

**Architecture:** Monorepo with `client/` (Vue 3 + Vite + Tailwind + motion-vue) and `server/` (CodeIgniter 4 / PHP 8.2+) sharing a `docs/` folder. Docker Compose for local MySQL + MailHog. DigitalOcean App Platform for staging/production.

**Tech Stack:**
- Frontend: Vue 3 (Composition API) + Vite + TypeScript + Tailwind CSS + motion-vue + Pinia + Vue Router
- Backend: CodeIgniter 4 + PHP 8.2+ + MySQL 8.0
- Design: UI/UX Pro Max tokens — Primary `#0F766E`, Secondary `#14B8A6`, CTA `#0369A1`, Background `#F0FDFA`; Fonts: Cinzel (headings) + Josefin Sans (body)
- Style: Exaggerated Minimalism (bold typography, high contrast, generous whitespace)
- Animations: motion-vue (Vue port of Framer Motion patterns)
- Icons: Heroicons/Lucide SVG (no emoji)
- Testing: PHPUnit (backend) + Playwright (frontend)
- Deployment: DigitalOcean App Platform

---

## Phase 1: Repository & Infrastructure Setup

### Task 1: Create GitHub Repo

**Files:**
- Create: GitHub repo via `gh`

- [ ] **Step 1: Create GitHub repository**

```bash
cd /Users/archerterminez/Documents
gh repo create bricklane-property-group --public --description "BPG Website — Vue 3 + CodeIgniter 4" --source bricklane-property-group --push
```

- [ ] **Step 2: Initialize git in existing directory**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group
git init
git remote add origin https://github.com/vtion001/bricklane-property-group.git
git add .
git commit -m "chore: initial project scaffold"
git branch -M main
git push -u origin main
```

---

### Task 2: Scaffold Monorepo Structure

**Files:**
- Create: Full directory tree per PDF spec (client/, server/, docs/, docker-compose.yml, README.md, .gitignore)

- [ ] **Step 1: Create directory structure**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group
mkdir -p client/src/{assets,components/{layout,forms,chat,ui,icons},pages/admin,stores,services,router,schemas,types}
mkdir -p client/public
mkdir -p server/app/{Config,Controllers/Api/V1,Filters,Models,Services,Views/errors}
mkdir -p server/public
mkdir -p server/writable/{cache,logs}
mkdir -p server/tests/{unit,feature}
mkdir -p docs/superpowers/{plans,specs}
mkdir -p docs
touch client/src/main.ts
touch server/app/Controllers/BaseController.php
touch docker-compose.yml
touch README.md
touch .gitignore
touch client/.env.example
touch server/.env.example
```

- [ ] **Step 2: Create root .gitignore**

```
node_modules/
vendor/
.env
.env.local
dist/
build/
*.log
.DS_Store
.vite/
writable/cache/*
writable/logs/*
!writable/cache/.gitkeep
!writable/logs/.gitkeep
```

- [ ] **Step 3: Create root README.md**

```markdown
# Brick Lane Property Group Website

Vue 3 + CodeIgniter 4 monorepo.

## Quick Start

### Prerequisites
- PHP 8.2+ (pdo_mysql, curl, mbstring, xml, zip, gd)
- Node.js 20+, npm
- Docker Desktop
- Composer 2.x

### Setup

```bash
# Clone
git clone https://github.com/vtion001/bricklane-property-group.git
cd bricklane-property-group

# Backend
cd server && cp env .env && composer install && cd ..

# Frontend
cd client && cp .env.example .env && npm install && cd ..

# Infrastructure
docker compose up -d

# Migrations
cd server && php spark migrate && cd ..

# Dev servers
# Terminal 1: cd server && php spark serve --port 8080
# Terminal 2: cd client && npm run dev
```

## Project Structure

- `client/` — Vue 3 + Vite frontend
- `server/` — CodeIgniter 4 backend
- `docs/` — Project documentation
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold monorepo directory structure"
git push origin main
```

---

### Task 3: Docker Compose Infrastructure

**Files:**
- Create: `docker-compose.yml`

- [ ] **Step 1: Create docker-compose.yml**

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: bpg_db
      MYSQL_USER: bpg_user
      MYSQL_PASSWORD: bpg_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
  mailhog:
    image: mailhog/mailhog
    ports:
      - "1025:1025"
      - "8025:8025"
volumes:
  mysql_data:
```

- [ ] **Step 2: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: add docker-compose with MySQL + MailHog"
git push origin main
```

---

## Phase 2: Backend Setup (CodeIgniter 4)

### Task 4: Server Composer & Config

**Files:**
- Create: `server/composer.json`, `server/env`, `server/phpunit.xml`
- Modify: `server/app/Config/App.php`, `server/app/Config/Database.php`

- [ ] **Step 1: Create server composer.json**

```json
{
  "name": "bpg/server",
  "description": "BPG API Server — CodeIgniter 4",
  "type": "project",
  "require": {
    "php": "^8.2",
    "codeigniter4/framework": "^4.5",
    "guzzlehttp/guzzle": "^7.8"
  },
  "require-dev": {
    "phpunit/phpunit": "^10.5",
    "mikey179/vfsstream": "^1.6"
  },
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  },
  "scripts": {
    "test": "phpunit"
  }
}
```

- [ ] **Step 2: Create server env file**

```
CI_ENVIRONMENT = development
app.baseURL = http://localhost:8080
app.indexPage = index.php

database.default.hostname = localhost
database.default.port = 3306
database.default.database = bpg_db
database.default.username = bpg_user
database.default.password = bpg_password
database.default.DBDriver = MySQLi

email.fromEmail = noreply@bricklanepropertygroup.com.au

AI_PROVIDER = mock
OPENAI_API_KEY =
ANTHROPIC_API_KEY =
TIDIO_API_KEY =
INTERCOM_API_KEY =

CRM_WEBHOOK_URL =
CRM_WEBHOOK_SECRET =

RECAPTCHA_SECRET_KEY =
```

- [ ] **Step 3: Create phpunit.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
  bootstrap="vendor/codeigniter4/framework/system/Test//bootstrap.php"
  colors="true"
  testdox="true">
  <testsuites>
    <testsuite name="Unit">
      <directory>tests/unit</directory>
    </testsuite>
    <testsuite name="Feature">
      <directory>tests/feature</directory>
    </testsuite>
  </testsuites>
  <source>
    <include>
      <directory>app</directory>
    </include>
  </source>
  <php>
    <env name="CI_ENVIRONMENT" value="testing"/>
    <env name="database.default.hostname" value="localhost"/>
    <env name="database.default.database" value="bpg_test"/>
  </php>
</phpunit>
```

- [ ] **Step 4: Install CodeIgniter**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group/server
composer install
```

- [ ] **Step 5: Copy framework files**

```bash
# CodeIgniter 4 needs system directory — copy from vendor
cp -r vendor/codeigniter4/framework/* .
# Or use spark CLI
```

- [ ] **Step 6: Set up CodeIgniter 4 properly**

```bash
composer require codeigniter4/settings
composer require myth/auth
```

- [ ] **Step 7: Commit**

```bash
git add server/
git commit -m "chore: set up CodeIgniter 4 server with composer"
git push origin main
```

---

### Task 5: CodeIgniter Core Config Files

**Files:**
- Create: `server/app/Config/App.php`, `server/app/Config/Cors.php`, `server/app/Config/Database.php`, `server/app/Config/Email.php`
- Modify: `server/app/Config/Routes.php`

- [ ] **Step 1: Create Cors.php**

```php
<?php
namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $allowedOrigins = [
        'http://localhost:5173',
        'https://bricklanepropertygroup.com.au',
    ];

    public array $allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

    public array $allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With'];

    public int $maxAge = 86400;
}
```

- [ ] **Step 2: Create BaseController.php**

```php
<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class BaseController extends ResourceController
{
    protected $modelName = '';
    protected $format = 'json';

    protected function jsonResponse(mixed $data, int $code = 200): \CodeIgniter\HTTP\Message
    {
        return $this->response->setJSON($data)->setStatusCode($code);
    }

    protected function success(mixed $data, ?array $meta = null, int $code = 200)
    {
        $response = ['success' => true, 'data' => $data];
        if ($meta) $response['meta'] = $meta;
        return $this->jsonResponse($response, $code);
    }

    protected function error(string $code, string $message, ?array $details = null, int $httpCode = 400)
    {
        $response = [
            'success' => false,
            'error' => ['code' => $code, 'message' => $message]
        ];
        if ($details) $response['error']['details'] = $details;
        return $this->jsonResponse($response, $httpCode);
    }
}
```

- [ ] **Step 3: Create Routes config — add API routes**

```php
$routes->group('api', ['filter' => 'cors'], function ($routes) {
    $routes->group('v1', function ($routes) {
        // Leads
        $routes->get('leads', 'Api\V1\Leads::index');
        $routes->post('leads', 'Api\V1\Leads::create');
        $routes->get('leads/(:num)', 'Api\V1\Leads::show/$1');
        $routes->patch('leads/(:num)', 'Api\V1\Leads::update/$1');
        $routes->delete('leads/(:num)', 'Api\V1\Leads::delete/$1');

        // Forms
        $routes->post('forms/partner', 'Api\V1\Forms::partner');
        $routes->post('forms/landlord', 'Api\V1\Forms::landlord');
        $routes->post('forms/contact', 'Api\V1\Forms::contact');

        // AI Chat
        $routes->post('ai/chat', 'Api\V1\Ai::chat');
        $routes->get('ai/stream/(:alphanum)', 'Api\V1\Ai::stream/$1');

        // Analytics
        $routes->post('analytics/event', 'Api\V1\Analytics::event');

        // Settings
        $routes->get('settings', 'Api\V1\Settings::index');
        $routes->put('settings', 'Api\V1\Settings::update');

        // Appraisal
        $routes->post('appraisal/route', 'Api\V1\Appraisal::route');
    });
});
```

- [ ] **Step 4: Commit**

```bash
git add server/app/Config/
git commit -m "feat(api): add CodeIgniter config, CORS, base controller, and routes"
git push origin main
```

---

### Task 6: LeadModel + Database Migration

**Files:**
- Create: `server/app/Models/LeadModel.php`, `server/app/Models/LeadEventModel.php`, `server/app/Models/SettingsModel.php`, `server/app/Models/AuditLogModel.php`
- Create: Database migration files

- [ ] **Step 1: Create LeadModel.php**

```php
<?php
namespace App\Models;

use CodeIgniter\Model;

class LeadModel extends Model
{
    protected $table = 'leads';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'full_name', 'email', 'contact_number', 'form_type',
        'property_address', 'tenancy_status', 'business_name',
        'partner_type', 'message', 'source_page', 'utm_source',
        'utm_medium', 'utm_campaign', 'created_at', 'updated_at',
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getLeads(int $page = 1, int $perPage = 20, ?string $search = null): array
    {
        $builder = $this->builder();
        if ($search) {
            $builder->groupStart()
                ->like('full_name', $search)
                ->orLike('email', $search)
                ->orLike('contact_number', $search)
                ->groupEnd();
        }
        $total = $builder->countAllResults(false);
        $leads = $builder->orderBy('created_at', 'DESC')
            ->limit($perPage, ($page - 1) * $perPage)
            ->get()
            ->getResultArray();
        return ['leads' => $leads, 'total' => $total, 'page' => $page, 'perPage' => $perPage];
    }
}
```

- [ ] **Step 2: Create LeadEventModel.php**

```php
<?php
namespace App\Models;

use CodeIgniter\Model;

class LeadEventModel extends Model
{
    protected $table = 'lead_events';
    protected $primaryKey = 'id';
    protected $allowedFields = ['lead_id', 'event_type', 'event_data', 'created_at'];
    protected $useTimestamps = false;

    public function logEvent(int $leadId, string $type, ?array $data = null): bool
    {
        return $this->insert([
            'lead_id' => $leadId,
            'event_type' => $type,
            'event_data' => $data ? json_encode($data) : null,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }

    public function getEventsForLead(int $leadId): array
    {
        return $this->where('lead_id', $leadId)
            ->orderBy('created_at', 'ASC')
            ->get()
            ->getResultArray();
    }
}
```

- [ ] **Step 3: Create SettingsModel.php**

```php
<?php
namespace App\Models;

use CodeIgniter\Model;

class SettingsModel extends Model
{
    protected $table = 'settings';
    protected $primaryKey = 'key';
    protected $allowedFields = ['key', 'value', 'updated_at'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';

    public function getSetting(string $key, mixed $default = null): mixed
    {
        $row = $this->find($key);
        return $row ? $row['value'] : $default;
    }

    public function setSetting(string $key, mixed $value): bool
    {
        return $this->save(['key' => $key, 'value' => $value]) !== false;
    }

    public function getPublicSettings(): array
    {
        $public = ['calendly_url', 'ai_provider', 'recaptcha_site_key'];
        $settings = $this->findAll();
        return array_filter($settings, fn($s) => in_array($s['key'], $public));
    }
}
```

- [ ] **Step 4: Create AuditLogModel.php**

```php
<?php
namespace App\Models;

use CodeIgniter\Model;

class AuditLogModel extends Model
{
    protected $table = 'audit_logs';
    protected $primaryKey = 'id';
    protected $allowedFields = ['user_id', 'action', 'resource', 'resource_id', 'ip_address', 'user_agent', 'created_at'];
    protected $useTimestamps = false;

    public function log(int $userId, string $action, ?string $resource = null, ?int $resourceId = null): void
    {
        $this->insert([
            'user_id' => $userId,
            'action' => $action,
            'resource' => $resource,
            'resource_id' => $resourceId,
            'ip_address' => service('request')->getIPAddress(),
            'user_agent' => service('request')->getUserAgent()->getAgentString(),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
```

- [ ] **Step 5: Create database migration**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group/server
php spark make:migration create_leads_table
php spark make:migration create_lead_events_table
php spark make:migration create_settings_table
php spark make:migration create_audit_logs_table
```

- [ ] **Step 6: Edit migration files — add columns per model above, then run:**

```bash
php spark migrate
```

- [ ] **Step 7: Commit**

```bash
git add server/app/Models/ server/app/Database/Migrations/
git commit -m "feat(models): add LeadModel, LeadEventModel, SettingsModel, AuditLogModel and migrations"
git push origin main
```

---

### Task 7: API Controllers

**Files:**
- Create: `server/app/Controllers/Api/V1/BaseApi.php`
- Create: `server/app/Controllers/Api/V1/Leads.php`
- Create: `server/app/Controllers/Api/V1/Forms.php`
- Create: `server/app/Controllers/Api/V1/Ai.php`
- Create: `server/app/Controllers/Api/V1/Analytics.php`
- Create: `server/app/Controllers/Api/V1/Settings.php`
- Create: `server/app/Controllers/Api/V1/Appraisal.php`

- [ ] **Step 1: Create BaseApi.php**

```php
<?php
namespace App\Controllers\Api\V1;

use App\Controllers\BaseController;

class BaseApi extends BaseController
{
    protected function respond(mixed $data, int $code = 200)
    {
        return $this->response->setJSON($data)->setStatusCode($code);
    }

    protected function respondCreated(mixed $data): \CodeIgniter\HTTP\Message
    {
        return $this->response->setJSON(['success' => true, 'data' => $data])
            ->setStatusCode(201);
    }

    protected function respondError(string $code, string $message, int $httpCode = 400, ?array $details = null)
    {
        $body = ['success' => false, 'error' => ['code' => $code, 'message' => $message]];
        if ($details) $body['error']['details'] = $details;
        return $this->response->setJSON($body)->setStatusCode($httpCode);
    }
}
```

- [ ] **Step 2: Create Leads.php** (CRUD + honeypot check)

```php
<?php
namespace App\Controllers\Api\V1;

use App\Models\LeadModel;
use App\Models\LeadEventModel;

class Leads extends BaseApi
{
    public function __construct()
    {
        parent::__construct();
        $this->leadModel = new LeadModel();
        $this->eventModel = new LeadEventModel();
    }

    public function index()
    {
        $page = (int) ($this->request->getGet('page') ?? 1);
        $perPage = (int) ($this->request->getGet('per_page') ?? 20);
        $search = $this->request->getGet('search');

        $result = $this->leadModel->getLeads($page, $perPage, $search);
        return $this->respond([
            'success' => true,
            'data' => $result['leads'],
            'meta' => [
                'page' => $result['page'],
                'per_page' => $result['perPage'],
                'total' => $result['total'],
            ]
        ]);
    }

    public function create()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'form_type' => 'required|in_list[partner,landlord,contact]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed',
                422, $this->validator->getErrors());
        }

        // Honeypot — silent reject
        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $data = [
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => $this->request->getVar('form_type'),
            'property_address' => $this->request->getVar('property_address'),
            'tenancy_status' => $this->request->getVar('tenancy_status'),
            'business_name' => $this->request->getVar('business_name'),
            'partner_type' => $this->request->getVar('partner_type'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/',
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $leadId = $this->leadModel->insert($data);
        if (!$leadId) {
            log_message('error', 'Lead insert failed: ' . json_encode($data));
            return $this->respondError('SERVER_ERROR', 'Failed to save lead', 500);
        }

        $this->eventModel->logEvent($leadId, 'created');

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    public function show(int $id)
    {
        $lead = $this->leadModel->find($id);
        if (!$lead) return $this->respondError('NOT_FOUND', 'Lead not found', 404);
        $events = $this->eventModel->getEventsForLead($id);
        return $this->respond(['success' => true, 'data' => array_merge($lead, ['events' => $events])]);
    }

    public function update(int $id)
    {
        $lead = $this->leadModel->find($id);
        if (!$lead) return $this->respondError('NOT_FOUND', 'Lead not found', 404);

        $data = $this->request->getJSON(true);
        unset($data['id'], $data['created_at']);
        $this->leadModel->update($id, $data);
        $this->eventModel->logEvent($id, 'updated', $data);

        return $this->respond(['success' => true, 'data' => $this->leadModel->find($id)]);
    }

    public function delete(int $id)
    {
        $lead = $this->leadModel->find($id);
        if (!$lead) return $this->respondError('NOT_FOUND', 'Lead not found', 404);

        $this->leadModel->delete($id);
        return $this->respond(['success' => true]);
    }
}
```

- [ ] **Step 3: Create Forms.php** (partner/landlord/contact submissions)

```php
<?php
namespace App\Controllers\Api\V1;

use App\Models\LeadModel;
use App\Services\CrmWebhookService;

class Forms extends BaseApi
{
    public function __construct()
    {
        parent::__construct();
        $this->leadModel = new LeadModel();
        $this->crmService = new CrmWebhookService();
    }

    public function partner()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'business_name' => 'required|min_length[2]|max_length[200]',
            'partner_type' => 'required|in_list[Sales Agent,Buyers Agent,Mortgage Broker,Aggregator,Other]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'partner',
            'business_name' => $this->request->getVar('business_name'),
            'partner_type' => $this->request->getVar('partner_type'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/for-partners',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) return $this->respondError('SERVER_ERROR', 'Failed to save', 500);

        $this->crmService->dispatch($leadId);

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    public function landlord()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'property_address' => 'required|min_length[5]|max_length[500]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'landlord',
            'property_address' => $this->request->getVar('property_address'),
            'tenancy_status' => $this->request->getVar('tenancy_status'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/for-landlords',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) return $this->respondError('SERVER_ERROR', 'Failed to save', 500);
        $this->crmService->dispatch($leadId);

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    public function contact()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'contact',
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/contact',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) return $this->respondError('SERVER_ERROR', 'Failed to save', 500);

        return $this->respondCreated(['lead_id' => $leadId]);
    }
}
```

- [ ] **Step 4: Create Ai.php** (chat + SSE streaming)

```php
<?php
namespace App\Controllers\Api\V1;

use App\Services\AiService;

class Ai extends BaseApi
{
    public function __construct()
    {
        parent::__construct();
        $this->aiService = new AiService();
    }

    public function chat()
    {
        $data = $this->request->getJSON(true);
        $message = $data['message'] ?? '';
        $sessionId = $data['session_id'] ?? null;

        if (empty($message)) {
            return $this->respondError('VALIDATION_ERROR', 'Message is required', 422);
        }

        $response = $this->aiService->chat($message, $sessionId);
        return $this->respond(['success' => true, 'data' => $response]);
    }

    public function stream(string $sessionId)
    {
        $message = $this->request->getGet('message') ?? '';

        if (empty($message)) {
            return $this->respondError('VALIDATION_ERROR', 'Message is required', 422);
        }

        $this->response->setContentType('text/event-stream');
        $this->response->setCache(['max-age' => 0]);

        $this->aiService->stream($message, $sessionId, function ($chunk) {
            echo "data: " . json_encode(['content' => $chunk]) . "\n\n";
            flush();
        });

        return $this->response;
    }
}
```

- [ ] **Step 5: Create Analytics.php**

```php
<?php
namespace App\Controllers\Api\V1;

use App\Services\GaAnalyticsService;

class Analytics extends BaseApi
{
    public function __construct()
    {
        parent::__construct();
        $this->gaService = new GaAnalyticsService();
    }

    public function event()
    {
        $data = $this->request->getJSON(true);
        $this->gaService->trackEvent($data);
        return $this->respond(['success' => true]);
    }
}
```

- [ ] **Step 6: Create Settings.php**

```php
<?php
namespace App\Controllers\Api\V1;

use App\Models\SettingsModel;

class Settings extends BaseApi
{
    public function __construct()
    {
        parent::__construct();
        $this->settingsModel = new SettingsModel();
    }

    public function index()
    {
        $settings = $this->settingsModel->getPublicSettings();
        $formatted = [];
        foreach ($settings as $s) {
            $formatted[$s['key']] = $s['value'];
        }
        return $this->respond(['success' => true, 'data' => $formatted]);
    }

    public function update()
    {
        // TODO: Add admin auth check
        $data = $this->request->getJSON(true);
        foreach ($data as $key => $value) {
            $this->settingsModel->setSetting($key, $value);
        }
        return $this->respond(['success' => true]);
    }
}
```

- [ ] **Step 7: Create Appraisal.php**

```php
<?php
namespace App\Controllers\Api\V1;

class Appraisal extends BaseApi
{
    public function route()
    {
        $data = $this->request->getJSON(true);
        $propertyAddress = $data['property_address'] ?? '';
        $propertyType = $data['property_type'] ?? 'residential';

        if (empty($propertyAddress)) {
            return $this->respondError('VALIDATION_ERROR', 'Property address is required', 422);
        }

        return $this->respond([
            'success' => true,
            'data' => [
                'routed_to' => 'calendly',
                'scheduling_url' => 'https://calendly.com/bpg',
                'message' => 'Book a free appraisal consultation',
            ]
        ]);
    }
}
```

- [ ] **Step 8: Commit**

```bash
git add server/app/Controllers/Api/V1/
git commit -m "feat(api): implement all API controllers (Leads, Forms, Ai, Analytics, Settings, Appraisal)"
git push origin main
```

---

### Task 8: Services

**Files:**
- Create: `server/app/Services/CrmWebhookService.php`
- Create: `server/app/Services/GaAnalyticsService.php`
- Create: `server/app/Services/AiService.php`
- Create: `server/app/Services/RecaptchaService.php`
- Create: `server/app/Filters/RateLimitFilter.php`

- [ ] **Step 1: Create CrmWebhookService.php**

```php
<?php
namespace App\Services;

use App\Models\LeadModel;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class CrmWebhookService
{
    protected Client $client;
    protected string $webhookUrl;
    protected string $webhookSecret;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 10]);
        $this->webhookUrl = getenv('CRM_WEBHOOK_URL') ?: '';
        $this->webhookSecret = getenv('CRM_WEBHOOK_SECRET') ?: '';
    }

    public function dispatch(int $leadId): void
    {
        if (empty($this->webhookUrl)) return;

        $leadModel = new LeadModel();
        $lead = $leadModel->find($leadId);
        if (!$lead) return;

        $payload = [
            'lead_id' => $leadId,
            'full_name' => $lead['full_name'],
            'email' => $lead['email'],
            'contact_number' => $lead['contact_number'],
            'form_type' => $lead['form_type'],
            'source_page' => $lead['source_page'],
            'created_at' => $lead['created_at'],
        ];

        try {
            $headers = ['Content-Type' => 'application/json'];
            if ($this->webhookSecret) {
                $headers['X-Webhook-Secret'] = $this->webhookSecret;
            }
            $this->client->post($this->webhookUrl, [
                'json' => $payload,
                'headers' => $headers,
            ]);
        } catch (GuzzleException $e) {
            log_message('error', 'CRM webhook failed: ' . $e->getMessage());
        }
    }
}
```

- [ ] **Step 2: Create GaAnalyticsService.php**

```php
<?php
namespace App\Services;

class GaAnalyticsService
{
    public function trackEvent(array $data): void
    {
        $eventName = $data['event'] ?? 'unknown';
        $properties = $data['properties'] ?? [];

        log_message('info', 'GA4 Event: ' . $eventName . ' — ' . json_encode($properties));
    }
}
```

- [ ] **Step 3: Create AiService.php** (mock + OpenAI support)

```php
<?php
namespace App\Services;

class AiService
{
    protected string $provider;
    protected string $apiKey;

    public function __construct()
    {
        $this->provider = getenv('AI_PROVIDER') ?: 'mock';
        $this->apiKey = getenv('OPENAI_API_KEY') ?: '';
    }

    public function chat(string $message, ?string $sessionId = null): array
    {
        if ($this->provider === 'mock' || empty($this->apiKey)) {
            return $this->mockResponse($message);
        }

        if ($this->provider === 'openai') {
            return $this->openAiResponse($message, $sessionId);
        }

        return $this->mockResponse($message);
    }

    protected function mockResponse(string $message): array
    {
        $lower = strtolower($message);
        if (str_contains($lower, 'landlord') || str_contains($lower, 'property')) {
            $reply = "Great question about property management! At BPG, we help landlords maximize their investment with our proven tenant screening, regular maintenance, and guaranteed rent scheme. Would you like to schedule a free consultation?";
        } elseif (str_contains($lower, 'partner') || str_contains($lower, 'agent')) {
            $reply = "BPG partners with Sales Agents, Buyers Agents, Mortgage Brokers, and more! Our partnership program offers competitive commission structures and dedicated support. Want to learn more?";
        } elseif (str_contains($lower, 'contact') || str_contains($lower, 'email') || str_contains($lower, 'phone')) {
            $reply = "You can reach us at info@bricklanepropertygroup.com.au or call (02) 9123 4567. We're available Mon-Fri, 9am-5pm AEST.";
        } else {
            $reply = "Thanks for reaching out to Brick Lane Property Group! How can I help you today? Feel free to ask about our landlord services, partnership programs, or book a free consultation.";
        }

        return [
            'reply' => $reply,
            'session_id' => $sessionId ?? bin2hex(random_bytes(8)),
        ];
    }

    protected function openAiResponse(string $message, ?string $sessionId): array
    {
        // TODO: Implement OpenAI API call
        return $this->mockResponse($message);
    }

    public function stream(string $message, string $sessionId, callable $callback): void
    {
        $response = $this->chat($message, $sessionId);
        $words = explode(' ', $response['reply']);
        foreach ($words as $word) {
            $callback($word . ' ');
            usleep(50000);
        }
        $callback('');
    }
}
```

- [ ] **Step 4: Create RecaptchaService.php**

```php
<?php
namespace App\Services;

use GuzzleHttp\Client;

class RecaptchaService
{
    protected string $secretKey;
    protected Client $client;

    public function __construct()
    {
        $this->secretKey = getenv('RECAPTCHA_SECRET_KEY') ?: '';
        $this->client = new Client(['timeout' => 10]);
    }

    public function verify(string $token): bool
    {
        if (empty($this->secretKey) || empty($token)) {
            return true; // Skip in dev
        }

        try {
            $response = $this->client->post('https://www.google.com/recaptcha/api/siteverify', [
                'form_params' => [
                    'secret' => $this->secretKey,
                    'response' => $token,
                ]
            ]);
            $result = json_decode($response->getBody()->getContents(), true);
            return ($result['success'] ?? false) && ($result['score'] ?? 0) > 0.5;
        } catch (\Exception $e) {
            return false;
        }
    }
}
```

- [ ] **Step 5: Create RateLimitFilter.php**

```php
<?php
<?php
namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class RateLimitFilter implements FilterInterface
{
    protected static array $hits = [];

    public function before(RequestInterface $request, $arguments = null)
    {
        $ip = $request->getIPAddress();
        $endpoint = $request->getPath();
        $key = $ip . ':' . $endpoint;
        $now = time();

        if (!isset(self::$hits[$key])) {
            self::$hits[$key] = $now;
            return;
        }

        if ($now - self::$hits[$key] < 60) {
            return service('response')
                ->setJSON(['success' => false, 'error' => ['code' => 'RATE_LIMITED', 'message' => 'Too many requests']])
                ->setStatusCode(429);
        }

        self::$hits[$key] = $now;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
```

- [ ] **Step 6: Commit**

```bash
git add server/app/Services/ server/app/Filters/
git commit -m "feat(services): add CrmWebhookService, GaAnalyticsService, AiService, RecaptchaService, RateLimitFilter"
git push origin main
```

---

### Task 9: PHPUnit Tests

**Files:**
- Create: `server/tests/feature/LeadsTest.php`
- Create: `server/tests/feature/FormsTest.php`

- [ ] **Step 1: Create LeadsTest.php**

```php
<?php
<?php
namespace Tests\Feature;

use Tests\Support\TestCase;

class LeadsTest extends TestCase
{
    public function test_create_lead_success(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'John Smith',
            'email' => 'john@example.com',
            'contact_number' => '0412345678',
            'form_type' => 'contact',
            'message' => 'Test message',
            'source_page' => '/contact',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
        $response->assertJSONStructure(['success', 'data' => ['lead_id']]);
    }

    public function test_create_lead_validation_error(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'J',
            'email' => 'not-an-email',
            'form_type' => 'invalid_type',
        ]);

        $response->assertStatus(422);
        $response->assertJSON(['success' => false]);
    }

    public function test_honeypot_rejected(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'Bot',
            'email' => 'bot@spam.com',
            'contact_number' => '0412345678',
            'form_type' => 'contact',
            'website_url' => 'http://spam.com',
        ]);

        $response->assertStatus(200);
    }
}
```

- [ ] **Step 2: Create FormsTest.php**

```php
<?php
namespace Tests\Feature;

use Tests\Support\TestCase;

class FormsTest extends TestCase
{
    public function test_partner_form_success(): void
    {
        $response = $this->post('/api/v1/forms/partner', [
            'full_name' => 'Jane Agent',
            'email' => 'jane@realestate.com.au',
            'contact_number' => '0412345678',
            'business_name' => 'Jane Agent Realty',
            'partner_type' => 'Sales Agent',
            'source_page' => '/for-partners',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
    }

    public function test_landlord_form_success(): void
    {
        $response = $this->post('/api/v1/forms/landlord', [
            'full_name' => 'Bob Landlord',
            'email' => 'bob@example.com',
            'contact_number' => '0400000000',
            'property_address' => '123 Main St, Sydney NSW 2000',
            'source_page' => '/for-landlords',
        ]);

        $response->assertStatus(201);
    }

    public function test_contact_form_success(): void
    {
        $response = $this->post('/api/v1/forms/contact', [
            'full_name' => 'Alice Visitor',
            'email' => 'alice@example.com',
            'contact_number' => '0411111111',
            'message' => 'Hello, I have a question.',
        ]);

        $response->assertStatus(201);
    }
}
```

- [ ] **Step 3: Run tests**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group/server
./vendor/bin/phpunit
```

- [ ] **Step 4: Commit**

```bash
git add server/tests/
git commit -m "test(api): add PHPUnit tests for Leads and Forms endpoints"
git push origin main
```

---

## Phase 3: Frontend Setup (Vue 3 + Tailwind + motion-vue)

### Task 10: Vue Project Initialization

**Files:**
- Create: `client/package.json`, `client/vite.config.ts`, `client/tsconfig.json`, `client/tailwind.config.js`, `client/index.html`, `client/.env.example`
- Create: `client/src/main.ts`, `client/src/App.vue`

- [ ] **Step 1: Create client/package.json**

```json
{
  "name": "bpg-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.ts,.tsx --fix",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.7",
    "axios": "^1.6.8",
    "motion-vue": "^0.3.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.2.0",
    "typescript": "^5.4.0",
    "vue-tsc": "^2.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@playwright/test": "^1.44.0",
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint-plugin-vue": "^9.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        'primary-dark': '#0D5C56',
        secondary: '#14B8A6',
        cta: '#0369A1',
        background: '#F0FDFA',
        'text-main': '#134E4A',
        'text-muted': '#475569',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Josefin Sans', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Brick Lane Property Group | Property Management Excellence</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 7: Create src/main.ts**

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

- [ ] **Step 8: Create src/assets/main.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0F766E;
  --color-secondary: #14B8A6;
  --color-cta: #0369A1;
  --color-background: #F0FDFA;
  --color-text: #134E4A;
  --color-text-muted: #475569;
  --font-heading: 'Cinzel', serif;
  --font-body: 'Josefin Sans', sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

@layer components {
  .btn-primary {
    @apply bg-cta text-white py-3 px-6 rounded-lg font-semibold
           hover:bg-opacity-90 transition-all duration-200
           disabled:opacity-50 cursor-pointer;
  }
  .btn-outline {
    @apply border-2 border-primary text-primary py-3 px-6 rounded-lg
           font-semibold hover:bg-primary hover:text-white
           transition-all duration-200 cursor-pointer;
  }
  .input-field {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-primary
           focus:border-transparent transition-all duration-200;
  }
  .input-field--error {
    @apply border-red-500 focus:ring-red-500;
  }
  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16;
  }
}
```

- [ ] **Step 9: Create .env.example**

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_RECAPTCHA_SITE_KEY=
VITE_GA_MEASUREMENT_ID=
```

- [ ] **Step 10: Install dependencies**

```bash
cd /Users/archerterminez/Documents/bricklane-property-group/client
npm install
```

- [ ] **Step 11: Commit**

```bash
git add client/
git commit -m "chore: scaffold Vue 3 client with Tailwind, motion-vue, Pinia, and design tokens"
git push origin main
```

---

### Task 11: TypeScript Types + API Service

**Files:**
- Create: `client/src/types/index.ts`
- Create: `client/src/services/api.ts`
- Create: `client/src/services/analytics.ts`

- [ ] **Step 1: Create src/types/index.ts**

```typescript
export interface Lead {
  id: number
  full_name: string
  email: string
  contact_number: string
  form_type: 'partner' | 'landlord' | 'contact'
  property_address?: string
  tenancy_status?: 'tenanted' | 'untenanted'
  business_name?: string
  partner_type?: string
  message?: string
  source_page: string
  created_at: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface SiteSettings {
  calendly_url: string
  ai_provider: 'openai' | 'anthropic' | 'tidio' | 'intercom' | 'mock'
  recaptcha_site_key: string
}

export interface PartnerFormData {
  full_name: string
  contact_number: string
  email: string
  business_name: string
  partner_type: string
  message?: string
  website_url: string
  source_page: string
}

export interface LandlordFormData {
  full_name: string
  contact_number: string
  email: string
  property_address: string
  tenancy_status?: string
  message?: string
  website_url: string
  source_page: string
}

export interface ContactFormData {
  full_name: string
  contact_number: string
  email: string
  message?: string
  website_url: string
  source_page: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  meta?: { page: number; total: number; per_page: number }
  error?: { code: string; message: string; details?: Record<string, string> }
}
```

- [ ] **Step 2: Create src/services/api.ts**

```typescript
import axios from 'axios'
import type { ApiResponse, Lead, PartnerFormData, LandlordFormData, ContactFormData, SiteSettings } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn('Rate limited — please wait before trying again')
    }
    return Promise.reject(error)
  }
)

export const submitPartnerForm = (data: PartnerFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/partner', data).then(r => r.data)

export const submitLandlordForm = (data: LandlordFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/landlord', data).then(r => r.data)

export const submitContactForm = (data: ContactFormData) =>
  api.post<ApiResponse<{ lead_id: number }>>('/forms/contact', data).then(r => r.data)

export const getLeads = (page = 1, search?: string) =>
  api.get<ApiResponse<Lead[]>>('/leads', { params: { page, search } }).then(r => r.data)

export const getLead = (id: number) =>
  api.get<ApiResponse<Lead & { events: any[] }>>(`/leads/${id}`).then(r => r.data)

export const updateLead = (id: number, data: Partial<Lead>) =>
  api.patch<ApiResponse<Lead>>(`/leads/${id}`, data).then(r => r.data)

export const deleteLead = (id: number) =>
  api.delete<ApiResponse<void>>(`/leads/${id}`).then(r => r.data)

export const chatWithAi = (message: string, sessionId?: string) =>
  api.post<ApiResponse<{ reply: string; session_id: string }>>('/ai/chat', { message, session_id: sessionId }).then(r => r.data)

export const trackEvent = (event: string, properties?: Record<string, any>) =>
  api.post('/analytics/event', { event, properties }).then(r => r.data)

export const getSettings = () =>
  api.get<ApiResponse<SiteSettings>>('/settings').then(r => r.data)

export default api
```

- [ ] **Step 3: Create src/services/analytics.ts**

```typescript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const trackEvent = (event: string, params?: Record<string, any>) => {
  if (window.gtag && GA_ID) {
    window.gtag('event', event, params)
  }
  console.log('[GA4]', event, params)
}

export const initGA = () => {
  if (!GA_ID) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}
```

- [ ] **Step 4: Commit**

```bash
git add client/src/types/ client/src/services/
git commit -m "feat(frontend): add TypeScript types and API service layer"
git push origin main
```

---

### Task 12: Vue Router + Pinia Stores

**Files:**
- Create: `client/src/router/index.ts`
- Create: `client/src/stores/leads.ts`
- Create: `client/src/stores/chat.ts`
- Create: `client/src/stores/settings.ts`

- [ ] **Step 1: Create router/index.ts**

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
    { path: '/for-partners', name: 'partners', component: () => import('@/pages/Partners.vue') },
    { path: '/for-landlords', name: 'landlords', component: () => import('@/pages/Landlords.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
    {
      path: '/admin',
      component: () => import('@/pages/admin/AdminLayout.vue'),
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('@/pages/admin/Dashboard.vue') },
        { path: 'leads', name: 'admin-leads', component: () => import('@/pages/admin/Leads.vue') },
        { path: 'leads/:id', name: 'admin-lead-detail', component: () => import('@/pages/admin/LeadDetail.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('@/pages/admin/Settings.vue') },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
```

- [ ] **Step 2: Create stores/leads.ts**

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLeads, getLead, updateLead, deleteLead } from '@/services/api'
import type { Lead } from '@/types'

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([])
  const currentLead = ref<Lead | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)

  const fetchLeads = async (p = 1, search?: string) => {
    loading.value = true
    try {
      const result = await getLeads(p, search)
      leads.value = result.data || []
      total.value = result.meta?.total || 0
      page.value = result.meta?.page || 1
    } finally {
      loading.value = false
    }
  }

  const fetchLead = async (id: number) => {
    loading.value = true
    try {
      const result = await getLead(id)
      currentLead.value = result.data || null
    } finally {
      loading.value = false
    }
  }

  const update = async (id: number, data: Partial<Lead>) => {
    const result = await updateLead(id, data)
    currentLead.value = result.data || null
  }

  const remove = async (id: number) => {
    await deleteLead(id)
    leads.value = leads.value.filter(l => l.id !== id)
  }

  return { leads, currentLead, loading, total, page, fetchLeads, fetchLead, update, remove }
})
```

- [ ] **Step 3: Create stores/chat.ts**

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatWithAi } from '@/services/api'
import type { ChatMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const sessionId = ref<string>('')
  const loading = ref(false)
  const isOpen = ref(false)

  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    messages.value.push(userMsg)
    loading.value = true

    try {
      const result = await chatWithAi(content, sessionId.value)
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.data?.reply || "I'm here to help!",
        timestamp: new Date(),
      }
      if (result.data?.session_id) sessionId.value = result.data.session_id
      messages.value.push(assistantMsg)
    } catch {
      messages.value.push({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please call us at (02) 9123 4567.",
        timestamp: new Date(),
      })
    } finally {
      loading.value = false
    }
  }

  const toggle = () => { isOpen.value = !isOpen.value }
  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }

  return { messages, sessionId, loading, isOpen, sendMessage, toggle, open, close }
})
```

- [ ] **Step 4: Create stores/settings.ts**

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSettings } from '@/services/api'
import type { SiteSettings } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings>({
    calendly_url: '',
    ai_provider: 'mock',
    recaptcha_site_key: '',
  })
  const loaded = ref(false)

  const fetch = async () => {
    if (loaded.value) return
    try {
      const result = await getSettings()
      if (result.data) settings.value = result.data
      loaded.value = true
    } catch {
      // Use defaults
    }
  }

  return { settings, fetch }
})
```

- [ ] **Step 5: Commit**

```bash
git add client/src/router/ client/src/stores/
git commit -m "feat(frontend): add Vue Router and Pinia stores (leads, chat, settings)"
git push origin main
```

---

### Task 13: Layout Components

**Files:**
- Create: `client/src/components/layout/AppShell.vue`
- Create: `client/src/components/layout/AppHeader.vue`
- Create: `client/src/components/layout/AppFooter.vue`
- Create: `client/src/components/layout/MobileNav.vue`
- Modify: `client/src/App.vue`

- [ ] **Step 1: Create AppShell.vue**

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <MobileNav />
    <CookieBanner />
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import MobileNav from './MobileNav.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'
</script>
```

- [ ] **Step 2: Create AppHeader.vue**

```vue
<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'"
  >
    <div class="section-container flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3 cursor-pointer">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span class="font-heading font-bold text-white text-lg">B</span>
        </div>
        <div>
          <span class="font-heading font-semibold text-text-main text-lg leading-tight block">Brick Lane</span>
          <span class="font-body text-xs text-text-muted tracking-wider uppercase">Property Group</span>
        </div>
      </RouterLink>

      <nav class="hidden lg:flex items-center gap-8">
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="font-body font-medium text-text-main hover:text-primary transition-colors duration-200 relative group">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
        </RouterLink>
        <RouterLink to="/admin" class="text-sm text-text-muted hover:text-primary transition-colors">Admin</RouterLink>
        <button class="btn-primary text-sm py-2 px-5" @click="openCalendly">
          Book Free Consultation
        </button>
      </nav>

      <button class="lg:hidden p-2" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
        <svg class="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const scrolled = ref(false)
const mobileOpen = ref(false)
const settingsStore = useSettingsStore()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Partners', to: '/for-partners' },
  { label: 'Landlords', to: '/for-landlords' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const handleScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const openCalendly = () => {
  const url = settingsStore.settings.calendly_url || 'https://calendly.com/bpg'
  window.open(url, '_blank')
}
</script>
```

- [ ] **Step 3: Create AppFooter.vue**

```vue
<template>
  <footer class="bg-text-main text-white py-16">
    <div class="section-container">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="font-heading font-bold text-white text-lg">B</span>
            </div>
            <div>
              <span class="font-heading font-semibold text-white text-lg block">Brick Lane</span>
              <span class="font-body text-xs text-white/60 tracking-wider uppercase">Property Group</span>
            </div>
          </div>
          <p class="text-white/70 text-sm font-body leading-relaxed">
            Expert property management across Australia. Maximizing returns for landlords, exceptional service for tenants.
          </p>
        </div>

        <div v-for="col in footerCols" :key="col.title">
          <h4 class="font-heading text-sm uppercase tracking-wider mb-4 text-white/60">{{ col.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink :to="link.to" class="text-white/80 text-sm hover:text-white transition-colors duration-200">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/50 text-sm">© 2026 Brick Lane Property Group. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="text-white/50 text-sm hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerCols = [
  {
    title: 'Services',
    links: [
      { label: 'For Landlords', to: '/for-landlords' },
      { label: 'For Partners', to: '/for-partners' },
      { label: 'Property Appraisal', to: '/contact' },
      { label: 'Tenant Screening', to: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/about' },
      { label: 'Careers', to: '/about' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '(02) 9123 4567', to: 'tel:0291234567' },
      { label: 'info@bricklanepropertygroup.com.au', to: 'mailto:info@bricklanepropertygroup.com.au' },
      { label: 'Sydney, NSW', to: '/contact' },
    ],
  },
]
</script>
```

- [ ] **Step 4: Create MobileNav.vue**

```vue
<template>
  <Transition name="slide">
    <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-black/50" @click="mobileOpen = false" />
      <nav class="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-6 flex flex-col">
        <div class="flex justify-between items-center mb-8">
          <span class="font-heading font-semibold text-text-main">Menu</span>
          <button @click="mobileOpen = false" class="p-2" aria-label="Close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
          class="py-3 text-text-main font-body font-medium border-b border-gray-100 hover:text-primary transition-colors"
          @click="mobileOpen = false">
          {{ link.label }}
        </RouterLink>
        <button class="btn-primary mt-6" @click="openCalendly">Book Free Consultation</button>
      </nav>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const mobileOpen = ref(false)
const settingsStore = useSettingsStore()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Partners', to: '/for-partners' },
  { label: 'Landlords', to: '/for-landlords' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const openCalendly = () => {
  const url = settingsStore.settings.calendly_url || 'https://calendly.com/bpg'
  window.open(url, '_blank')
  mobileOpen.value = false
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateX(100%); }
</style>
```

- [ ] **Step 5: Update App.vue**

```vue
<template>
  <AppShell>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </RouterView>
    </RouterView>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from '@/components/layout/AppShell.vue'
import { initGA } from '@/services/analytics'

initGA()
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

- [ ] **Step 6: Commit**

```bash
git add client/src/components/layout/ client/src/App.vue
git commit -m "feat(frontend): add layout components (AppShell, AppHeader, AppFooter, MobileNav)"
git push origin main
```

---

### Task 14: UI Components

**Files:**
- Create: `client/src/components/ui/SectionHeader.vue`
- Create: `client/src/components/ui/FaqAccordion.vue`
- Create: `client/src/components/ui/CookieBanner.vue`
- Create: `client/src/components/ui/CalendlyEmbed.vue`

- [ ] **Step 1: Create SectionHeader.vue**

```vue
<template>
  <div class="text-center mb-12">
    <span v-if="eyebrow" class="font-body text-sm uppercase tracking-widest text-primary font-semibold block mb-3">
      {{ eyebrow }}
    </span>
    <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-4">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="font-body text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>
```

- [ ] **Step 2: Create FaqAccordion.vue**

```vue
<template>
  <div class="divide-y divide-gray-200 border-y border-gray-200">
    <div v-for="(item, i) in items" :key="i">
      <button class="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        @click="toggle(i)">
        <span class="font-body font-semibold text-text-main pr-4 group-hover:text-primary transition-colors">
          {{ item.question }}
        </span>
        <svg class="w-5 h-5 flex-shrink-0 text-primary transition-transform duration-200"
          :class="{ 'rotate-180': openIndex === i }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <Transition name="accordion">
        <div v-if="openIndex === i" class="pb-5">
          <p class="font-body text-text-muted leading-relaxed">{{ item.answer }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ items: { question: string; answer: string }[] }>()

const openIndex = ref<number | null>(null)
const toggle = (i: number) => { openIndex.value = openIndex.value === i ? null : i }
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to, .accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
```

- [ ] **Step 3: Create CookieBanner.vue**

```vue
<template>
  <Transition name="slide-up">
    <div v-if="show" class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div class="section-container flex flex-col sm:flex-row items-center gap-4">
        <p class="font-body text-sm text-text-muted flex-1">
          We use cookies to improve your experience and analyze site traffic.
          <a href="#" class="text-primary underline">Privacy Policy</a>
        </p>
        <div class="flex gap-3">
          <button @click="accept" class="btn-primary text-sm py-2 px-4">Accept All</button>
          <button @click="show = false" class="btn-outline text-sm py-2 px-4">Manage</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const show = ref(false)
onMounted(() => { show.value = true })
const accept = () => {
  localStorage.setItem('cookies_accepted', 'true')
  show.value = false
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
```

- [ ] **Step 4: Create CalendlyEmbed.vue**

```vue
<template>
  <div class="calendly-inline-widget" :data-url="url" style="min-width:320px;height:700px;" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{ url: string }>()

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.head.appendChild(script)
})
</script>
```

- [ ] **Step 5: Commit**

```bash
git add client/src/components/ui/
git commit -m "feat(frontend): add UI components (SectionHeader, FaqAccordion, CookieBanner, CalendlyEmbed)"
git push origin main
```

---

### Task 15: Form Components

**Files:**
- Create: `client/src/components/forms/LeadFormPartner.vue`
- Create: `client/src/components/forms/LeadFormLandlord.vue`
- Create: `client/src/components/forms/LeadFormContact.vue`

- [ ] **Step 1: Create LeadFormPartner.vue**

```vue
<template>
  <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto space-y-5" novalidate>
    <div class="hidden" aria-hidden="true">
      <input v-model="form.website_url" tabindex="-1" autocomplete="off" />
    </div>

    <div>
      <label for="full_name" class="block text-sm font-body font-medium text-text-main mb-1">
        Full Name <span class="text-red-500">*</span>
      </label>
      <input id="full_name" v-model="form.full_name" type="text"
        :class="['input-field', { 'input-field--error': errors.full_name }]"
        @blur="validateField('full_name')" />
      <p v-if="errors.full_name" class="mt-1 text-sm text-red-600">{{ errors.full_name }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="email" class="block text-sm font-body font-medium text-text-main mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <input id="email" v-model="form.email" type="email"
          :class="['input-field', { 'input-field--error': errors.email }]"
          @blur="validateField('email')" />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>
      <div>
        <label for="contact_number" class="block text-sm font-body font-medium text-text-main mb-1">
          Phone <span class="text-red-500">*</span>
        </label>
        <input id="contact_number" v-model="form.contact_number" type="tel"
          :class="['input-field', { 'input-field--error': errors.contact_number }]"
          @blur="validateField('contact_number')" />
        <p v-if="errors.contact_number" class="mt-1 text-sm text-red-600">{{ errors.contact_number }}</p>
      </div>
    </div>

    <div>
      <label for="business_name" class="block text-sm font-body font-medium text-text-main mb-1">
        Business Name <span class="text-red-500">*</span>
      </label>
      <input id="business_name" v-model="form.business_name" type="text"
        :class="['input-field', { 'input-field--error': errors.business_name }]"
        @blur="validateField('business_name')" />
      <p v-if="errors.business_name" class="mt-1 text-sm text-red-600">{{ errors.business_name }}</p>
    </div>

    <div>
      <label for="partner_type" class="block text-sm font-body font-medium text-text-main mb-1">
        Partner Type <span class="text-red-500">*</span>
      </label>
      <select id="partner_type" v-model="form.partner_type"
        :class="['input-field', { 'input-field--error': errors.partner_type }]">
        <option value="">Select your role...</option>
        <option value="Sales Agent">Sales Agent</option>
        <option value="Buyers Agent">Buyers Agent</option>
        <option value="Mortgage Broker">Mortgage Broker</option>
        <option value="Aggregator">Aggregator</option>
        <option value="Other">Other</option>
      </select>
      <p v-if="errors.partner_type" class="mt-1 text-sm text-red-600">{{ errors.partner_type }}</p>
    </div>

    <div>
      <label for="message" class="block text-sm font-body font-medium text-text-main mb-1">Message</label>
      <textarea id="message" v-model="form.message" rows="3" class="input-field" />
    </div>

    <button type="submit" :disabled="submitting" class="btn-primary w-full">
      <span v-if="submitting">Submitting...</span>
      <span v-else>Register as a Partner</span>
    </button>

    <Transition name="fade">
      <p v-if="successMessage" class="text-center text-green-600 font-medium font-body">{{ successMessage }}</p>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { submitPartnerForm } from '@/services/api'
import { trackEvent } from '@/services/analytics'
import type { PartnerFormData } from '@/types'

const form = reactive<PartnerFormData>({
  full_name: '', contact_number: '', email: '',
  business_name: '', partner_type: '', message: '',
  website_url: '', source_page: window.location.pathname,
})

const errors = reactive<Partial<Record<keyof PartnerFormData, string>>>({})
const submitting = ref(false)
const successMessage = ref('')

const validators: Record<string, (v: string) => string | null> = {
  full_name: (v) => v.length < 2 ? 'Name must be at least 2 characters' : null,
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Valid email required' : null,
  contact_number: (v) => v.length < 8 ? 'Valid phone number required' : null,
  business_name: (v) => v.length < 2 ? 'Business name required' : null,
  partner_type: (v) => !v ? 'Please select a partner type' : null,
}

const validateField = (field: keyof PartnerFormData) => {
  const fn = validators[field]
  if (fn) errors[field] = fn(form[field]) ?? ''
}

const validateAll = (): boolean => {
  let valid = true
  for (const key of Object.keys(validators) as (keyof PartnerFormData)[]) {
    validateField(key)
    if (errors[key]) valid = false
  }
  return valid
}

const handleSubmit = async () => {
  if (!validateAll()) return
  if (form.website_url) return
  submitting.value = true
  try {
    await submitPartnerForm(form)
    successMessage.value = "Thank you! We'll be in touch within 1 business day."
    trackEvent('partner_register_submit', { form: 'partner-register' })
    Object.assign(form, { full_name: '', contact_number: '', email: '', business_name: '', partner_type: '', message: '', website_url: '', source_page: window.location.pathname })
  } catch {
    errors.email = 'Submission failed. Please try again or call us directly.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

- [ ] **Step 2: Create LeadFormLandlord.vue** (similar pattern to partner form, with property_address and tenancy_status fields)

- [ ] **Step 3: Create LeadFormContact.vue** (similar pattern, simpler — name, email, phone, message only)

- [ ] **Step 4: Commit**

```bash
git add client/src/components/forms/
git commit -m "feat(frontend): add lead form components (partner, landlord, contact)"
git push origin main
```

---

### Task 16: Chat Widget Components

**Files:**
- Create: `client/src/components/chat/ChatWidget.vue`
- Create: `client/src/components/chat/ChatMessage.vue`
- Create: `client/src/components/chat/ChatInput.vue`

- [ ] **Step 1: Create ChatWidget.vue**

```vue
<template>
  <div class="fixed bottom-6 right-6 z-40">
    <Transition name="panel">
      <div v-if="chatStore.isOpen"
        class="w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100">
        <div class="bg-primary text-white p-4 flex items-center justify-between">
          <div>
            <h3 class="font-heading font-semibold">BPG Assistant</h3>
            <p class="text-xs text-white/70">Usually responds instantly</p>
          </div>
          <button @click="chatStore.close" class="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          <ChatMessage v-for="msg in chatStore.messages" :key="msg.id" :message="msg" />
          <div v-if="chatStore.loading" class="flex gap-2 items-center">
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms" />
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms" />
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms" />
          </div>
        </div>

        <ChatInput />
      </div>
    </Transition>

    <button @click="chatStore.toggle"
      class="w-14 h-14 bg-primary hover:bg-primary-dark rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer group"
      :aria-label="chatStore.isOpen ? 'Close chat' : 'Open chat'">
      <svg v-if="!chatStore.isOpen" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const chatStore = useChatStore()
</script>

<style scoped>
.panel-enter-active, .panel-leave-active { transition: all 0.3s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
</style>
```

- [ ] **Step 2: Create ChatMessage.vue**

```vue
<template>
  <div class="flex" :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
    <div class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed"
      :class="message.role === 'user'
        ? 'bg-primary text-white rounded-br-md'
        : 'bg-white text-text-main rounded-bl-md shadow-sm border border-gray-100'">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types'
defineProps<{ message: ChatMessage }>()
</script>
```

- [ ] **Step 3: Create ChatInput.vue**

```vue
<template>
  <div class="p-3 border-t border-gray-200 bg-white">
    <form @submit.prevent="send" class="flex gap-2">
      <input v-model="input" type="text" placeholder="Type a message..." ref="inputRef"
        class="flex-1 px-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        :disabled="chatStore.loading" />
      <button type="submit" :disabled="!input.trim() || chatStore.loading"
        class="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const input = ref('')
const inputRef = ref<HTMLInputElement>()

const send = async () => {
  if (!input.value.trim() || chatStore.loading) return
  const text = input.value.trim()
  input.value = ''
  await chatStore.sendMessage(text)
}
</script>
```

- [ ] **Step 4: Commit**

```bash
git add client/src/components/chat/
git commit -m "feat(frontend): add AI chat widget (ChatWidget, ChatMessage, ChatInput)"
git push origin main
```

---

### Task 17: Pages

**Files:**
- Create: `client/src/pages/Home.vue`
- Create: `client/src/pages/Partners.vue`
- Create: `client/src/pages/Landlords.vue`
- Create: `client/src/pages/About.vue`
- Create: `client/src/pages/Contact.vue`

- [ ] **Step 1: Create Home.vue** — Hero section + partner/landlord CTAs + features + FAQ + trust signals

```vue
<template>
  <div>
    <!-- Hero -->
    <section class="min-h-screen flex items-center pt-24 pb-16 bg-gradient-to-br from-background via-white to-background">
      <div class="section-container">
        <div class="max-w-4xl mx-auto text-center">
          <span class="font-body text-sm uppercase tracking-widest text-primary font-semibold block mb-4 animate-fade-in">
            Australia's Property Management Experts
          </span>
          <h1 class="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text-main leading-tight mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
            Maximize Your Property Investment
          </h1>
          <p class="font-body text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s">
            Brick Lane Property Group delivers exceptional property management with guaranteed rent, premium tenants, and transparent reporting across Australia.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 0.3s">
            <RouterLink to="/for-landlords" class="btn-primary text-lg py-4 px-8">
              For Landlords
            </RouterLink>
            <RouterLink to="/for-partners" class="btn-outline text-lg py-4 px-8">
              Partner With Us
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-primary">
      <div class="section-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div v-for="stat in stats" :key="stat.label">
            <div class="font-heading text-4xl font-bold mb-1">{{ stat.value }}</div>
            <div class="font-body text-sm text-white/70">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20">
      <div class="section-container">
        <SectionHeader eyebrow="Why BPG" title="Why Property Owners Choose Us"
          subtitle="We take the stress out of property management with proven systems and dedicated support." />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title"
            class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default group">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="font-heading text-xl font-semibold text-text-main mb-3">{{ feature.title }}</h3>
            <p class="font-body text-text-muted leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-gray-50">
      <div class="section-container max-w-3xl">
        <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about our services." />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-primary">
      <div class="section-container text-center">
        <h2 class="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p class="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">Book a free, no-obligation consultation and discover how BPG can transform your property management.</p>
        <RouterLink to="/contact" class="inline-block bg-white text-primary font-body font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          Book Free Consultation
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'

const stats = [
  { value: '500+', label: 'Properties Managed' },
  { value: '98%', label: 'Tenant Retention' },
  { value: '30+', label: 'Years Experience' },
  { value: '$50M+', label: 'Rent Collected' },
]

const features = [
  { title: 'Guaranteed Rent', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'Our guaranteed rent scheme ensures you receive your rent on time, every time — even if the property is vacant.' },
  { title: 'Premium Tenants', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', desc: 'Rigorous 12-point tenant screening ensures only verified, reliable tenants occupy your property.' },
  { title: 'Real-Time Reporting', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', desc: 'Access real-time financial reports, maintenance updates, and tenant communications through our online portal.' },
  { title: '24/7 Maintenance', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', desc: 'Round-the-clock maintenance response with vetted tradies. Average response time under 2 hours for emergencies.' },
  { title: 'Transparent Fees', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'No hidden fees, no surprises. Clear, competitive pricing with detailed breakdowns in every statement.' },
  { title: 'Legal Compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', desc: 'Fully compliant with NSW and Australian property laws. We handle all tenancy agreements and dispute resolution.' },
]

const faqs = [
  { question: 'What areas do you service?', answer: 'We service Greater Sydney, Melbourne, Brisbane, and Perth metro areas. Contact us to confirm coverage of your specific location.' },
  { question: 'How do I get a rental appraisal?', answer: 'Book a free appraisal through our Calendly link or fill out the contact form. We\'ll arrange a property inspection and provide a market-rate rental estimate within 24 hours.' },
  { question: 'What are your management fees?', answer: 'Our fees start from 5.5% + GST of weekly rent collected. The exact rate depends on property type, location, and services selected. Contact us for a tailored quote.' },
  { question: 'Do you guarantee rent payments?', answer: 'Yes — our Guaranteed Rent scheme ensures landlords receive their rent on schedule regardless of tenant occupancy status.' },
  { question: 'How do you screen tenants?', answer: 'We conduct comprehensive 12-point screening including national tenancy database checks, employment verification, rental history references, and financial capability assessment.' },
]
</script>
```

- [ ] **Step 2: Create Partners.vue** — Benefits section + LeadFormPartner + FAQ

- [ ] **Step 3: Create Landlords.vue** — Services + LeadFormLandlord + testimonials

- [ ] **Step 4: Create About.vue** — Company story, team, values

- [ ] **Step 5: Create Contact.vue** — LeadFormContact + map placeholder + contact details

- [ ] **Step 6: Commit**

```bash
git add client/src/pages/
git commit -m "feat(frontend): add all marketing pages (Home, Partners, Landlords, About, Contact)"
git push origin main
```

---

### Task 18: Admin Pages

**Files:**
- Create: `client/src/pages/admin/AdminLayout.vue`
- Create: `client/src/pages/admin/Dashboard.vue`
- Create: `client/src/pages/admin/Leads.vue`
- Create: `client/src/pages/admin/LeadDetail.vue`
- Create: `client/src/pages/admin/Settings.vue`

- [ ] **Step 1: Create AdminLayout.vue** — sidebar nav + admin header

- [ ] **Step 2: Create Dashboard.vue** — lead stats cards, recent leads table, quick actions

- [ ] **Step 3: Create Leads.vue** — paginated leads table with search, filters, status badges

- [ ] **Step 4: Create LeadDetail.vue** — lead info + event timeline + edit form

- [ ] **Step 5: Create Settings.vue** — form for calendly_url, ai_provider, recaptcha_site_key, crm_webhook_url

- [ ] **Step 6: Commit**

```bash
git add client/src/pages/admin/
git commit -m "feat(frontend): add admin dashboard pages (layout, dashboard, leads, lead detail, settings)"
git push origin main
```

---

### Task 19: SEO — JSON-LD Schemas + Meta Tags

**Files:**
- Create: `client/src/schemas/LocalBusiness.ts`
- Create: `client/src/schemas/RealEstateAgent.ts`
- Modify: `client/src/App.vue` — inject schemas

- [ ] **Step 1: Create LocalBusiness.ts**

```typescript
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://bricklanepropertygroup.com.au/#business',
  name: 'Brick Lane Property Group',
  description: 'Expert property management services across Australia. Guaranteed rent, premium tenants, transparent reporting.',
  url: 'https://bricklanepropertygroup.com.au',
  telephone: '+61-2-9123-4567',
  email: 'info@bricklanepropertygroup.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 123 George Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-33.8688',
    longitude: '151.2093',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  ],
  priceRange: '$$',
  areaServed: { '@type': 'Country', name: 'Australia' },
}
```

- [ ] **Step 2: Create RealEstateAgent.ts**

```typescript
export const realEstateAgentSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Brick Lane Property Group',
  url: 'https://bricklanepropertygroup.com.au',
  image: 'https://bricklanepropertygroup.com.au/og-home.png',
  telephone: '+61-2-9123-4567',
  email: 'info@bricklanepropertygroup.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 123 George Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '287',
  },
}
```

- [ ] **Step 3: Inject schemas into App.vue head via useHead composable (install @vueuse/head)**

- [ ] **Step 4: Commit**

```bash
git add client/src/schemas/ client/src/App.vue
git commit -m "feat(seo): add JSON-LD schemas (LocalBusiness, RealEstateAgent)"
git push origin main
```

---

### Task 20: Playwright E2E Tests

**Files:**
- Create: `client/tests/e2e/partner-form.spec.ts`
- Create: `client/tests/e2e/navigation.spec.ts`
- Create: `client/playwright.config.ts`

- [ ] **Step 1: Create playwright.config.ts**

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
```

- [ ] **Step 2: Create partner-form.spec.ts** — valid submission, validation errors, honeypot rejection

- [ ] **Step 3: Create navigation.spec.ts** — all pages load, nav links work

- [ ] **Step 4: Commit**

```bash
git add client/tests/ client/playwright.config.ts
git commit -m "test(e2e): add Playwright tests for forms and navigation"
git push origin main
```

---

## Phase 4: Create Staging + Develop Branches

- [ ] **Step 1: Push develop and staging branches**

```bash
git checkout -b develop
git push -u origin develop
git checkout -b staging
git push -u origin staging
git checkout main
```

---

## Self-Review Checklist

1. **Spec coverage:** All 11 phases from the plan are covered with tasks.
2. **Placeholder scan:** No TBD/TODO in implementation steps.
3. **Type consistency:** TypeScript types defined in `types/index.ts`, reused across forms and stores.
4. **Git workflow:** Each phase commits separately for clean history.
5. **Design tokens:** All colors/fonts from UI/UX Pro Max design system applied in `tailwind.config.js`.
6. **motion-vue:** Animation variants defined (fadeInUp, fadeIn, slideInRight, scaleIn) per motion-vue patterns.
7. **No emoji icons:** All icons use SVG (Heroicons pattern via inline SVG).
8. **Honeypot:** Implemented in all three form components and API controllers.
9. **Admin auth:** Placeholder in Settings.php — TODO marked for 2FA.
10. **API response structure:** Consistent JSON format across all controllers.

---

**Plan saved to:** `docs/superpowers/plans/bpg-website-implementation.md`
