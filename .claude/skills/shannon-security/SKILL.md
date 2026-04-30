---
name: shannon-security
description: White-box security audit methodology inspired by Shannon (Keygraph) for the DigitalGrid static ecommerce site. Covers XSS, injection, client-side validation, CSP, and secure DOM manipulation.
origin: Adapted from KeygraphHQ/shannon
---

# Shannon-Inspired Security Audit — DigitalGrid

## Scope

Static HTML ecommerce site with inline JavaScript. No backend API, no database, no authentication system. Attack surface is entirely client-side.

## Audit Checklist

### 1. Cross-Site Scripting (XSS)

- [ ] **DOM-based XSS**: Check all `innerHTML`, `outerHTML`, `document.write`, `eval`, `Function()`, `setTimeout`/`setInterval` with string arguments
- [ ] **Reflected XSS**: Check URL parameter handling (`location.search`, `location.hash`)
- [ ] **Stored XSS**: Check `localStorage`, `sessionStorage`, `indexedDB` reads that reach DOM
- [ ] **Inline event handlers**: Check all `onclick`, `onerror`, `onload` attributes for user-controlled data
- [ ] **Template literals in innerHTML**: Verify all interpolated values are escaped or from trusted sources

### 2. Content Security Policy (CSP)

- [ ] CSP meta tag present in `<head>`
- [ ] `default-src` restricts unknown resources
- [ ] `script-src` controls inline scripts (use `'strict-dynamic'` or nonce if possible)
- [ ] `style-src` allows inline styles (required for this site's architecture)
- [ ] `img-src` restricts image origins
- [ ] `connect-src` restricts fetch/XHR/WebSocket endpoints
- [ ] `frame-ancestors 'none'` prevents clickjacking
- [ ] `base-uri 'self'` prevents base tag hijacking
- [ ] `form-action` restricts form submissions

### 3. Injection Attacks

- [ ] **HTML injection**: Verify no user input reaches DOM without sanitization
- [ ] **CSS injection**: Check for user input in style attributes
- [ ] **JavaScript injection**: Verify no user input in `eval`, `Function`, `setTimeout`/`setInterval`
- [ ] **mailto injection**: Verify email body/subject construction uses `encodeURIComponent`

### 4. Client-Side Validation

- [ ] All form inputs have `type` attributes (`email`, `tel`, etc.)
- [ ] Email format validated with regex before `mailto:` construction
- [ ] Required fields checked before submission
- [ ] `maxlength` attributes on text inputs
- [ ] `autocomplete` attributes for UX and security

### 5. Information Disclosure

- [ ] No hardcoded API keys, tokens, or secrets in HTML/JS
- [ ] No sensitive paths exposed in error messages
- [ ] `Referrer-Policy` meta tag set to `strict-origin-when-cross-origin` or better
- [ ] No global variables exposing internal state (`window._*`)

### 6. Secure Dependencies

- [ ] All external resources use HTTPS
- [ ] Subresource Integrity (SRI) hashes on CDN resources where possible
- [ ] `preconnect` to required origins for performance and security

### 7. Accessibility & Secure UX

- [ ] `aria-label` and `aria-required` on form inputs
- [ ] `autocomplete` attributes prevent browser autofill confusion
- [ ] Buttons have explicit `type="button"` to prevent accidental form submission

## Remediation Priority

1. **P0 — Immediate**: XSS vectors, missing CSP, insecure eval/Function usage
2. **P1 — High**: Input validation, email regex, global variable leaks
3. **P2 — Medium**: Accessibility attributes, SRI, referrer policy
4. **P3 — Low**: prefers-reduced-motion, performance optimizations

## Testing Commands

```bash
# Run a quick grep audit
grep -n "innerHTML\|outerHTML\|eval\|Function(" index.html
grep -n "document.write\|location.search\|location.hash" index.html
grep -n "onclick=\|onerror=\|onload=" index.html
grep -n "localStorage\|sessionStorage" index.html
```
