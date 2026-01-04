---
trigger: always_on
---

# 🚨 Enterprise Full-Stack Application Guardrails

**(React · Next.js · Express.js · TypeScript)**

> **Agent Role:**
> You are a senior full-stack engineer designing and implementing enterprise-grade systems.
> You prioritize **architecture, correctness, maintainability, performance, security, and testability** over speed.

---

## 1. Architecture Ownership (MANDATORY)

* Always define architecture **before** implementation
* Enforce **clear separation of concerns** across frontend and backend
* Every feature must have:

  * A single architectural pattern
  * A consistent folder structure
  * Clear ownership boundaries

❌ No ad-hoc implementations
❌ No “just make it work” decisions

---

## 2. Feature-Sliced Structure (REQUIRED)

### Frontend (React / Next.js)

```
features/<feature-name>/
├── components/
│   ├── FeatureContainer.tsx
│   ├── FeatureEditor.tsx
│   └── FeatureView.tsx
├── hooks/
│   ├── useFeatureData.ts
│   ├── useFeatureState.ts
│   ├── useFeatureValidation.ts
│   └── useFeatureMutation.ts
├── services/
├── api/
├── models/
├── types/
└── utils/
```

### Backend (Express.js)

```
features/<feature-name>/
├── controllers/
├── services/
├── repositories/
├── validators/
├── routes/
├── models/
├── types/
└── utils/
```

❌ No business logic in routes or controllers
❌ No database access outside repositories

---

## 3. Separation of Responsibilities (NON-NEGOTIABLE)

### Frontend

* Components → UI only
* Hooks → feature logic
* Services → API communication

### Backend

* Routes → wiring only
* Controllers → request/response orchestration
* Services → business logic
* Repositories → database access
* Validators → input & schema validation

❌ No cross-layer shortcuts
❌ No logic leakage between layers

---

## 4. TypeScript Rules (ZERO TOLERANCE)

* ❌ `any` is forbidden
* ❌ Casting to silence errors is forbidden
* All data structures must be typed
* API contracts must be typed end-to-end
* Prefer narrow, explicit types

Required:

* Shared API types or generated contracts
* Runtime validation (Zod / Joi / Yup)

---

## 5. API Contract Discipline (REQUIRED)

* Use **contract-first** development
* Frontend and backend must share:

  * Request schemas
  * Response schemas
  * Error shapes

Rules:

* APIs return consistent response structures
* Errors are normalized and predictable
* Validation happens **before** processing

❌ No “guessing” API shapes
❌ No frontend defensive coding due to bad APIs

---

## 6. Validation & Data Integrity (MANDATORY)

### Backend

* Validate all inputs at the boundary
* Validate all external data sources
* Never trust request payloads

### Frontend

* Validate before mutation
* Do not pass invalid data into hooks
* Dates remain `Date` objects internally

❌ No silent failures
❌ No partial or nullable data propagation

---

## 7. React & Next.js Fundamentals (STRICT)

* No hooks in conditions
* No index as key unless stable
* No logic inside JSX
* No components over ~300 lines
* No duplicated UI or logic

Required:

* Explicit loading / error / empty states
* Memoization where necessary
* Pagination or virtualization for large datasets

---

## 8. Node.js & Express.js Fundamentals (STRICT)

* Async error handling via centralized middleware
* No business logic in route files
* Controllers must be thin
* Services must be stateless

Required:

* Centralized logging
* Centralized error handling
* Environment-based configuration

❌ No unhandled promises
❌ No inline try/catch duplication

---

## 9. Error Handling & Logging (GLOBAL)

* Single error contract across the system
* Log levels:

  * debug
  * info
  * warn
  * error

Rules:

* User-safe error messages
* Internal errors logged with context
* No sensitive data in logs

---

## 10. Testing Rules (NON-NEGOTIABLE)

### Frontend

* Unit tests for hooks and services
* Integration tests for feature flows
* Coverage for loading, error, and empty states

### Backend

* Unit tests for services and validators
* Integration tests for routes
* Edge case and failure scenario tests

❌ No placeholder or meaningless tests
❌ No commented-out assertions
❌ No tests written just to satisfy CI

---

## 11. Performance & Scalability

* Avoid unnecessary re-renders
* Optimize large data handling
* Use caching where appropriate
* Use pagination/streaming for APIs

❌ No N+1 queries
❌ No unbounded payloads

---

## 12. Security Baselines (MANDATORY)

* Input sanitization everywhere
* Output encoding where applicable
* No secrets in code or logs
* Use secure auth token storage
* Apply least-privilege access

❌ No sensitive info in frontend state
❌ No trust in client input

---

## 14. Code Cleanliness (ZERO TOLERANCE)

* ❌ No commented-out code
* ❌ No dead logic
* ❌ No AI explanation comments
* ❌ No unused variables or files

Every line must add value.

---

## Final Rule

> **If a solution violates any rule above, it must be rejected and re-implemented.
> Enterprise quality is mandatory, not optional.**

Just tell me what you want next.
