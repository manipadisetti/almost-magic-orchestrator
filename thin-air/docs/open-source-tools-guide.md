# Thin Air - Open-Source Tools Guide

## Overview

This guide covers all the open-source tools we use for testing, security, monitoring, and code quality. We follow an **open-source first** policy without compromising quality.

---

## 1. Testing Tools

### 1.1 Vitest (Unit & Integration Testing)

**Why Vitest?**
- ⚡ Blazing fast (powered by Vite)
- 🔄 Hot Module Replacement for tests
- 📦 Zero config for most projects
- 🎯 Jest-compatible API
- 100% open-source (MIT license)

**Installation:**
```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom happy-dom
```

**Configuration:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

**Running Tests:**
```bash
# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

**Example Test:**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserManager } from '../UserManager'

describe('UserManager', () => {
  it('renders user list', () => {
    render(<UserManager />)
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })
})
```

### 1.2 Playwright (E2E Testing)

**Why Playwright?**
- 🌐 Cross-browser testing (Chromium, Firefox, WebKit)
- 📸 Auto-wait, screenshots, videos
- 🎭 Reliable, no flaky tests
- 🚀 Fast parallel execution
- 100% open-source (Apache 2.0)

**Installation:**
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

**Configuration:** `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3002',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
```

**Running E2E Tests:**
```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI
pnpm exec playwright test --ui

# Run specific browser
pnpm exec playwright test --project=chromium
```

**Example E2E Test:**
```typescript
import { test, expect } from '@playwright/test'

test('admin can create user', async ({ page }) => {
  await page.goto('/admin')
  await page.click('text=+ Add User')
  await page.fill('[placeholder="Name"]', 'Test User')
  await page.fill('[placeholder="Email"]', 'test@example.com')
  await page.click('text=Add User')
  await expect(page.locator('text=Test User')).toBeVisible()
})
```

---

## 2. Security Tools

### 2.1 ESLint Security Plugin

**Why ESLint Security?**
- 🔒 Detects security vulnerabilities in code
- 🎯 Catches common security anti-patterns
- ⚡ Runs during development (fast feedback)
- 100% open-source (Apache 2.0)

**Installation:**
```bash
pnpm add -D eslint-plugin-security eslint-plugin-sonarjs
```

**Configuration:** `.eslintrc.json`
```json
{
  "plugins": ["security", "sonarjs"],
  "rules": {
    "security/detect-object-injection": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "error",
    "sonarjs/cognitive-complexity": ["error", 15]
  }
}
```

**Running Security Linting:**
```bash
pnpm lint
```

### 2.2 OWASP Dependency-Check

**Why OWASP Dependency-Check?**
- 🛡️ Scans dependencies for known vulnerabilities
- 📊 Generates detailed reports
- 🔄 Integrates with CI/CD
- 100% open-source (Apache 2.0)

**Installation:**
```bash
# Via npm
pnpm add -D @cyclonedx/cyclonedx-npm
```

**Generate SBOM (Software Bill of Materials):**
```bash
pnpm exec cyclonedx-npm --output-file sbom.json
```

**Scan with OWASP Dependency-Check:**
```bash
# Download and run (one-time setup)
docker run --rm -v $(pwd):/src owasp/dependency-check:latest \
  --scan /src \
  --format HTML \
  --out /src/dependency-check-report
```

### 2.3 Trivy (Container & Dependency Scanning)

**Why Trivy?**
- 🐳 Scans containers, filesystems, git repos
- 🚀 Fast and accurate
- 📦 Detects vulnerabilities in dependencies
- 100% open-source (Apache 2.0)

**Installation:**
```bash
# Via Docker
docker pull aquasec/trivy
```

**Scan Dependencies:**
```bash
docker run --rm -v $(pwd):/app aquasec/trivy fs /app
```

**Scan Docker Images:**
```bash
docker run --rm aquasec/trivy image your-image:tag
```

### 2.4 Git-Secrets (Prevent Secret Leaks)

**Why Git-Secrets?**
- 🔐 Prevents committing secrets (API keys, passwords)
- 🎯 Pre-commit hooks
- ⚡ Fast and lightweight
- 100% open-source (Apache 2.0)

**Installation:**
```bash
# Install git-secrets
git clone https://github.com/awslabs/git-secrets
cd git-secrets
make install
```

**Setup:**
```bash
# Initialize in your repo
git secrets --install
git secrets --register-aws
git secrets --add 'API_KEY.*'
git secrets --add 'SECRET.*'
```

---

## 3. Monitoring Tools

### 3.1 Prometheus (Metrics Collection)

**Why Prometheus?**
- 📊 Time-series database for metrics
- 🎯 Powerful query language (PromQL)
- 🔔 Alerting built-in
- 100% open-source (Apache 2.0)

**Installation (Docker):**
```yaml
# docker-compose.yml
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

volumes:
  prometheus-data:
```

**Configuration:** `prometheus.yml`
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'thin-air-api'
    static_configs:
      - targets: ['localhost:4000']
  
  - job_name: 'thin-air-marketing'
    static_configs:
      - targets: ['localhost:3002']
```

**Expose Metrics in Your App:**
```typescript
// apps/server/src/metrics.ts
import { register, Counter, Histogram } from 'prom-client'

export const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
})

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
})

// Endpoint to expose metrics
export async function GET() {
  return new Response(await register.metrics(), {
    headers: { 'Content-Type': register.contentType },
  })
}
```

### 3.2 Grafana (Visualization)

**Why Grafana?**
- 📈 Beautiful dashboards
- 🔗 Integrates with Prometheus
- 🔔 Alerting and notifications
- 100% open-source (AGPL 3.0)

**Installation (Docker):**
```yaml
# Add to docker-compose.yml
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  grafana-data:
```

**Access Grafana:**
- URL: http://localhost:3000
- Username: admin
- Password: admin

**Add Prometheus Data Source:**
1. Go to Configuration → Data Sources
2. Add Prometheus
3. URL: http://prometheus:9090
4. Save & Test

### 3.3 Loki (Log Aggregation)

**Why Loki?**
- 📝 Lightweight log aggregation
- 🔗 Integrates with Grafana
- 🚀 Efficient storage
- 100% open-source (AGPL 3.0)

**Installation (Docker):**
```yaml
# Add to docker-compose.yml
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - ./promtail-config.yml:/etc/promtail/config.yml
      - /var/log:/var/log
```

### 3.4 Uptime Kuma (Uptime Monitoring)

**Why Uptime Kuma?**
- ⏰ Beautiful uptime monitoring UI
- 🔔 Multiple notification channels
- 📊 Status pages
- 100% open-source (MIT)

**Installation (Docker):**
```yaml
# Add to docker-compose.yml
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data

volumes:
  uptime-kuma-data:
```

**Access:** http://localhost:3001

**Setup Monitors:**
- Marketing Site: https://thinair.dev
- 🐛 Bug detection
- 🔒 Security vulnerability detection
- 📊 Technical debt tracking
- 100% open-source (LGPL 3.0)

**Installation (Docker):**
```yaml
# docker-compose.yml
  sonarqube:
    image: sonarqube:community
    ports:
      - "9000:9000"
    environment:
      - SONAR_JDBC_URL=jdbc:postgresql://db:5432/sonar
      - SONAR_JDBC_USERNAME=sonar
      - SONAR_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube-data:/opt/sonarqube/data
      - sonarqube-extensions:/opt/sonarqube/extensions
      - sonarqube-logs:/opt/sonarqube/logs

volumes:
  sonarqube-data:
  sonarqube-extensions:
  sonarqube-logs:
```

**Run Analysis:**
```bash
# Install scanner
pnpm add -D sonarqube-scanner

# Run scan
pnpm exec sonar-scanner \
  -Dsonar.projectKey=thin-air \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=your-token
```

### 4.2 ESLint + Prettier

**Why ESLint + Prettier?**
- ✨ Code formatting and linting
- 🎯 Catches errors early
- 🔄 Auto-fix capabilities
- 100% open-source (MIT)

**Already installed!** Just run:
```bash
pnpm lint
pnpm format
```

---

## 5. CI/CD Integration

### 5.1 GitHub Actions (Free for Public Repos)

**Why GitHub Actions?**
- 🔄 Native GitHub integration
- 🚀 Fast and reliable
- 📦 Huge marketplace of actions
- 100% free for public repos

**Configuration:** `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm test:e2e
      
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

---

## 6. Performance Monitoring

### 6.1 Lighthouse CI (Performance Audits)

**Why Lighthouse CI?**
- 📊 Automated performance audits
- 🎯 Catches performance regressions
- 📈 Tracks metrics over time
- 100% open-source (Apache 2.0)

**Installation:**
```bash
pnpm add -D @lhci/cli
```

**Configuration:** `lighthouserc.js`
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3002'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
}
```

**Run Lighthouse:**
```bash
pnpm exec lhci autorun
```

---

## 7. Package Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "security:scan": "trivy fs .",
    "quality:scan": "sonar-scanner",
    "perf:audit": "lhci autorun"
  }
}
```

---

## 8. Summary

All tools are **100% open-source** and production-ready:

| Category | Tool | License | Purpose |
|----------|------|---------|---------|
| Unit Testing | Vitest | MIT | Fast unit/integration tests |
| E2E Testing | Playwright | Apache 2.0 | Cross-browser E2E tests |
| Security Linting | ESLint Security | Apache 2.0 | Code security analysis |
| Dependency Scanning | Trivy | Apache 2.0 | Vulnerability scanning |
| Code Quality | SonarQube | LGPL 3.0 | Code quality & tech debt |
| Metrics | Prometheus | Apache 2.0 | Time-series metrics |
| Visualization | Grafana | AGPL 3.0 | Dashboards & alerts |
| Logs | Loki | AGPL 3.0 | Log aggregation |
| Uptime | Uptime Kuma | MIT | Uptime monitoring |
| Performance | Lighthouse CI | Apache 2.0 | Performance audits |
| CI/CD | GitHub Actions | Free | Automation |

**No compromises on quality. All enterprise-grade. All open-source.**
