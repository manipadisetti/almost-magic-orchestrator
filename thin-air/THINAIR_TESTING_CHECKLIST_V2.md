# Thin Air - Testing Checklist

**Version:** 2.0  
**Date:** 21 November 2025  
**Purpose:** Prevent crashes and ensure quality  
**Language:** Australian English

---

## 🎯 OVERVIEW

This checklist ensures every change to Thin Air is tested thoroughly before proceeding. **DO NOT SKIP ANY STEP.**

---

## ✅ PRE-CHANGE CHECKLIST

**Before writing any code:**

- [ ] Current tests passing (100%)
- [ ] TypeScript 0 errors
- [ ] Dev server running without crashes
- [ ] Latest checkpoint saved
- [ ] Clear understanding of what to implement

**If ANY checkbox is unchecked → Fix before proceeding**

---

## 🔧 DURING-CHANGE CHECKLIST

**While writing code:**

### Code Quality

- [ ] TypeScript types defined (no `any` unless absolutely necessary)
- [ ] Error handling implemented (try/catch for all async operations)
- [ ] Loading states implemented (no silent failures)
- [ ] Success states implemented (user feedback on completion)
- [ ] Edge cases considered (empty states, null values, errors)

### AI Integration

- [ ] Gemini API key configured
- [ ] ChatGPT fallback implemented
- [ ] Error handling for AI failures
- [ ] Timeout handling (AI requests can be slow)
- [ ] Response validation (AI can return unexpected formats)

### Database

- [ ] Schema matches code (run `pnpm db:push` after schema changes)
- [ ] Queries use proper indexes
- [ ] Foreign keys respected
- [ ] CASCADE deletes configured where needed
- [ ] User authorization checked (users can only access their data)

### File Uploads

- [ ] File size limits enforced
- [ ] File type validation
- [ ] S3 upload working (use `storagePut` helper)
- [ ] S3 URLs returned correctly
- [ ] Upload progress tracked

---

## ✅ POST-CHANGE CHECKLIST

**After writing code:**

### 1. TypeScript Check

```bash
pnpm typecheck
```

**Expected:** 0 errors

**If errors → Fix before proceeding**

### 2. Automated Tests

```bash
pnpm test
```

**Expected:** All tests passing (100%)

**If failures → Fix before proceeding**

### 3. Build Check

```bash
pnpm build
```

**Expected:** Build succeeds with 0 errors

**If build fails → Fix before proceeding**

### 4. Dev Server Check

```bash
pnpm dev
```

**Expected:**
- Server starts without errors
- No console errors
- No console warnings (except known safe warnings)

**If errors → Fix before proceeding**

### 5. Manual Testing

**Test the specific feature you just implemented:**

#### Vapor Module Tests
- [ ] Voice recording starts
- [ ] Voice recording stops
- [ ] Audio transcribed correctly
- [ ] Text input saves
- [ ] Image uploads to S3
- [ ] Image analyzed by AI
- [ ] PDF uploads to S3
- [ ] PDF extracted correctly
- [ ] Timeline displays all inputs
- [ ] Delete removes input

#### Condenser Module Tests
- [ ] Extraction starts
- [ ] Thinking Stream displays
- [ ] Intent JSON generated
- [ ] Entities extracted
- [ ] Features extracted (explicit + inferred)
- [ ] Tech stack recommended
- [ ] Missing info detected
- [ ] Intent JSON editable
- [ ] Save updates database

#### Mirage Module Tests
- [ ] Simulation starts
- [ ] React Flow graph renders
- [ ] 3 scenarios generated
- [ ] Metrics dashboard displays
- [ ] Scenario switching works
- [ ] Risk assessment shown
- [ ] Comparison view works

#### Materializer Module Tests
- [ ] Code generation starts
- [ ] All files generated
- [ ] Monaco Editor displays code
- [ ] File tree navigation works
- [ ] Code editable
- [ ] Validation runs
- [ ] Download ZIP works

#### Manifest Module Tests
- [ ] Deployment preview shown
- [ ] Environment variables configurable
- [ ] Deployment starts
- [ ] Status updates in real-time
- [ ] Logs displayed
- [ ] Deployed URL returned
- [ ] Rollback works

### 6. Cross-Browser Testing

**Test in:**
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

**Expected:** Works in all browsers

### 7. Responsive Testing

**Test on:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Expected:** UI adapts properly

### 8. Error Scenario Testing

**Test these failure scenarios:**

#### Network Errors
- [ ] Disconnect internet → Proper error message shown
- [ ] Slow connection → Loading states shown
- [ ] Reconnect → App recovers gracefully

#### AI Errors
- [ ] Invalid API key → Fallback to ChatGPT
- [ ] Both AI services fail → Clear error message
- [ ] Timeout → User notified, can retry

#### Database Errors
- [ ] Invalid UUID → Validation error shown
- [ ] Missing required field → Validation error shown
- [ ] Foreign key violation → Proper error message

#### File Upload Errors
- [ ] File too large → Error message shown
- [ ] Invalid file type → Error message shown
- [ ] S3 upload fails → User notified, can retry

### 9. Performance Testing

- [ ] Page loads in < 2 seconds
- [ ] AI requests complete in < 30 seconds
- [ ] File uploads show progress
- [ ] No memory leaks (check DevTools)
- [ ] No infinite loops (check CPU usage)

---

## 🧪 INTEGRATION TESTING

**Test full workflow:**

1. [ ] Create new project
2. [ ] Navigate to Vapor
3. [ ] Upload voice input
4. [ ] Upload text input
5. [ ] Upload image input
6. [ ] Upload PDF input
7. [ ] Navigate to Condenser
8. [ ] Extract intent
9. [ ] Verify Intent JSON correct
10. [ ] Edit Intent JSON
11. [ ] Save changes
12. [ ] Navigate to Mirage
13. [ ] Run simulation
14. [ ] View all 3 scenarios
15. [ ] Navigate to Materializer
16. [ ] Generate code
17. [ ] Verify all files generated
18. [ ] Edit code
19. [ ] Validate code
20. [ ] Download ZIP
21. [ ] Navigate to Manifest
22. [ ] Configure environment variables
23. [ ] Deploy application
24. [ ] Verify deployed URL works
25. [ ] Test deployed application

**Expected:** All steps work without errors

---

## 📊 PRE-DEPLOYMENT CHECKLIST

**Before final deployment:**

### Security
- [ ] Environment variables not committed to git
- [ ] API keys stored securely
- [ ] User authentication working
- [ ] Authorization checks in all endpoints
- [ ] SQL injection prevention (using Drizzle ORM)
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF protection (tRPC handles this)

### Performance
- [ ] Database queries optimized (use indexes)
- [ ] Images optimized (compressed)
- [ ] Code split (React lazy loading)
- [ ] Bundle size reasonable (< 500KB gzipped)

### Monitoring
- [ ] Error logging configured
- [ ] Analytics tracking working
- [ ] Performance monitoring set up

### Documentation
- [ ] README written
- [ ] User guides written
- [ ] API documentation complete
- [ ] Deployment guide written

### Backup
- [ ] Database backup configured
- [ ] S3 bucket versioning enabled
- [ ] Rollback plan documented

---

## 🚨 CRASH PREVENTION RULES

### Rule 1: Test After Every Change
**Never write multiple features without testing**

❌ Bad:
```
1. Write Vapor module (500 lines)
2. Write Condenser module (500 lines)
3. Write Mirage module (500 lines)
4. Test everything
```

✅ Good:
```
1. Write Vapor voice recording (50 lines)
2. Test voice recording
3. Write Vapor text input (50 lines)
4. Test text input
5. Continue...
```

### Rule 2: Save Checkpoints Frequently
**After every sub-task completion**

✅ Save checkpoint after:
- Voice recording working
- Text input working
- Image upload working
- PDF upload working
- Intent extraction working
- Etc.

### Rule 3: Revert on Test Failures
**Never proceed with failing tests**

If tests fail:
1. Read error message carefully
2. Fix the issue
3. Re-run tests
4. If still failing after 3 attempts → Revert to last checkpoint
5. Try different approach

### Rule 4: Never Skip TypeScript Errors
**0 errors is the only acceptable number**

❌ Don't ignore:
```
// @ts-ignore
const result = someFunction();
```

✅ Fix properly:
```typescript
const result: ResultType = someFunction();
```

### Rule 5: Handle All Errors
**Every async operation needs try/catch**

❌ Bad:
```typescript
const result = await api.call();
```

✅ Good:
```typescript
try {
  const result = await api.call();
  return result;
} catch (error) {
  console.error("API call failed:", error);
  toast.error("Something went wrong. Please try again.");
  return null;
}
```

### Rule 6: Show Loading States
**Never leave user wondering if something is happening**

❌ Bad:
```typescript
const handleClick = async () => {
  await longRunningOperation();
};
```

✅ Good:
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleClick = async () => {
  setIsLoading(true);
  try {
    await longRunningOperation();
  } finally {
    setIsLoading(false);
  }
};

// In JSX
{isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
```

### Rule 7: Validate User Input
**Never trust user input**

❌ Bad:
```typescript
const result = await db.query.users.findFirst({
  where: eq(users.id, userId), // userId could be anything
});
```

✅ Good:
```typescript
const userIdSchema = z.string().uuid();
const validatedUserId = userIdSchema.parse(userId);

const result = await db.query.users.findFirst({
  where: eq(users.id, validatedUserId),
});
```

### Rule 8: Test AI Integration Separately
**AI can fail in unexpected ways**

Test scenarios:
- [ ] AI returns valid JSON
- [ ] AI returns invalid JSON → Parse error handled
- [ ] AI request times out → Timeout handled
- [ ] AI API key invalid → Fallback to ChatGPT
- [ ] Both AI services fail → Clear error message

### Rule 9: Monitor Resource Usage
**Prevent memory leaks and infinite loops**

Check:
- [ ] No `useEffect` without dependency array
- [ ] No infinite loops in `useEffect`
- [ ] No memory leaks (unmounted components cleaned up)
- [ ] No excessive re-renders (use React DevTools Profiler)

### Rule 10: Get User Verification
**After each phase, ask user to verify**

Don't assume it works. Ask:
> "Phase X complete. Please test the following features: [list]. Confirm working before I proceed to Phase X+1."

---

## 📈 QUALITY GATES

**Code CANNOT proceed unless:**

| Gate | Requirement | How to Check |
|------|-------------|--------------|
| **TypeScript** | 0 errors | `pnpm typecheck` |
| **Tests** | 100% passing | `pnpm test` |
| **Build** | Succeeds | `pnpm build` |
| **Dev Server** | No crashes | `pnpm dev` |
| **Manual Testing** | All features work | Test in browser |
| **Error Scenarios** | All handled | Test failure cases |
| **Performance** | Page loads < 2s | Test with throttling |
| **Checkpoint** | Saved | Use `webdev_save_checkpoint` |
| **User Verification** | Approved | Ask user to confirm |

**If ANY gate fails → Stop and fix**

---

## ✅ FINAL VERIFICATION

**Before marking project complete:**

- [ ] All 5 modules working
- [ ] Full workflow tested (Vapor → Manifest)
- [ ] All tests passing (100%)
- [ ] TypeScript 0 errors
- [ ] No console errors
- [ ] No console warnings (except known safe ones)
- [ ] Dark ethereal theme applied correctly
- [ ] All animations working
- [ ] Gemini API working
- [ ] ChatGPT fallback working
- [ ] Whisper API working
- [ ] Database schema complete
- [ ] All routes working
- [ ] Navigation working
- [ ] Progress indicator working
- [ ] File uploads working
- [ ] S3 storage working
- [ ] Deployment working
- [ ] Documentation complete
- [ ] User verified all features
- [ ] Final checkpoint saved

---

**Australian English. Zero tolerance for errors. Production quality only.** 🇦🇺
