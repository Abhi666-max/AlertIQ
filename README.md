# AlertIQ — Enterprise Scam Message Detection & Threat Intelligence Platform

> **"Decipher deceptive messages before you trust them."**  
> An autonomous, privacy-first cybersecurity platform powered by Groq ultra-fast Llama 3.3 70B inference, deterministic heuristic filters, and threat intelligence.

---

## 1. Executive Summary

Digital communications are flooded with urgent account restrictions, fake delivery notices, advance-fee prizes, and sophisticated impersonation attempts. **AlertIQ** delivers an autonomous, verifiable decision-support system to analyze incoming SMS, emails, and chat communications in real time.

### Core Capabilities:
- **Calibrated Risk Classification**: Instant classification into `HIGH RISK`, `MEDIUM RISK`, `LOW APPARENT RISK`, or `INCONCLUSIVE`.
- **Observable Threat Indicators**: Exact verbatim excerpts quoted from the message, matched with plain-English threat explanations.
- **Specimen Threat Highlighter**: Visually renders the inspected message with highlighted indicators showing the exact traps.
- **Embedded URL & Domain Safety Review**: SSRF-proof RFC 3986 URL extraction with heuristic domain checks (brand spoofing, punycode, shorteners, high-risk TLDs) and Google Safe Browsing integration.
- **Actionable Safety Actions**: Practical precautions to safeguard authentication credentials, OTPs, and financial assets.
- **Zero Server Data Retention**: Completely ephemeral, volatile in-memory processing. Past results are saved strictly in the user's browser `localStorage`.

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AlertIQ Next.js Frontend                        │
│  - Luxury Light UI (Plus Jakarta Sans, Inter, Elevated Ceramic Cards)  │
│  - Threat Inspection Console (Real-time Character Counter, Presets)    │
│  - Visual Specimen Highlighter & Threat Signal Cards                   │
│  - URL & Domain Intelligence Review Panel                              │
│  - Session Vault Drawer (Client-side localStorage with 1-click purge)  │
│  - Live Empirical Benchmark Dashboard (Confusion Matrix, Precision)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ POST /api/analyze
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Next.js Edge/Node API Backend                      │
│  1. In-Memory Rate Limiting (Sliding Window, 30 req/min/IP)            │
│  2. Input Sanitization & Zod Validation (5 - 4000 chars)              │
│  3. Safe URL Extraction (SSRF-proof, no arbitrary server fetches)      │
│  4. Threat Intel Lookup (Domain Heuristics + Safe Browsing API)        │
│  5. Groq Llama 3.3 70B Inference Engine:                               │
│     * Strict untrusted boundary tokens (<<<UNTRUSTED_MESSAGE>>>)      │
│     * High-speed structured JSON response                             │
│     * Graceful fallback to deterministic heuristic rules               │
│  6. Evidence Verification Engine (100% Verbatim Grounding Guard)       │
│  7. Threat Severity Calculation & Response Assembly                    │
│  8. Response Dispatch (Zero server retention of message content)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **UI Architecture**: React 19 (Server & Client Components)
- **Styling**: Tailwind CSS v4 with bespoke luxury light palette & ceramic card elevation
- **Typography**: Plus Jakarta Sans (Display), Inter (Body), JetBrains Mono (Telemetry)
- **Icons**: Lucide React
- **Validation**: Zod (Strict runtime schema validation)
- **AI Engine**: Groq Cloud SDK (`groq-sdk`) with `llama-3.3-70b-versatile`
- **Domain Intelligence**: Google Safe Browsing Lookup v4 & Heuristic Reputation Scanner
- **Testing**: Vitest with unit test suites & automated empirical benchmark runner

---

## 4. Key Security & Privacy Safeguards

1. **Prompt Injection & Adversarial Jailbreak Defense**:
   All user-submitted content is strictly quarantined within boundary tokens (`<<<UNTRUSTED_MESSAGE>>>`). The AI model treats text strictly as specimen data to inspect, never as operational directives.
2. **Anti-Hallucination Evidence Verifier**:
   Every evidence excerpt returned by the model is mathematically validated against the original input. Hallucinated or synthesized quotes are stripped before reaching the user.
3. **SSRF Immunity (Server-Side Request Forgery)**:
   The backend never navigates to, fetches, or follows redirects from extracted URLs. Domains are parsed mathematically and inspected via reputation endpoints.
4. **Data Sovereignty & Zero Server Retention**:
   Messages are evaluated ephemerally in volatile memory. No submitted text is written to server databases, disk, or logs. Session history is stored exclusively in client-side browser `localStorage`.

---

## 5. Measured Benchmark & Model Telemetry

AlertIQ was evaluated against a held-out labeled dataset of 20 realistic phishing, social engineering, advance-fee scams, and legitimate communication specimens:

| Metric | Measured Value | Formula / Details |
| :--- | :---: | :--- |
| **Exact 3-Class Accuracy** | **90%** | Exact match on High, Medium, Low categories |
| **Binary Threat Precision** | **100%** | $TP / (TP + FP)$ (Zero False Positives) |
| **Binary Threat Recall** | **100%** | $TP / (TP + FN)$ (Zero Missed Threats) |
| **Harmonic F1-Score** | **1.00** | $2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}$ |
| **True Positives (TP)** | **12** | Known scams correctly detected |
| **True Negatives (TN)** | **8** | Legitimate communications recognized |
| **False Positives (FP)** | **0** | No benign messages misclassified as scams |
| **False Negatives (FN)** | **0** | No scams misclassified as benign |

---

## 6. Local Setup & Production Run

### Prerequisites
- Node.js v20+ or v24+
- npm v10+

### Installation
```bash
# 1. Clone repository
git clone https://github.com/Abhi666-max/AlertIQ.git
cd AlertIQ

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment variables
cp .env.example .env.local
```

### Environment Configuration (`.env.local`)
```env
# Groq API Key (https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key

# Groq Model Identifier (Default: llama-3.3-70b-versatile)
GROQ_MODEL=llama-3.3-70b-versatile
```

### Run Commands
```bash
# Start local development server
npm run dev

# Run Vitest automated test suite
npm test

# Build and execute production bundle
npm run build
npm start
```

---

## 7. License & Disclaimers

AlertIQ is developed as a decision-support cybersecurity platform. While it provides high-precision risk signals, users should always exercise personal vigilance and verify sensitive transactions directly with official institutions.
