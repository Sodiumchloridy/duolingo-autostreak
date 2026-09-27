<p align="center">
  <img src="assets/banner.png" alt="Duolingo Autostreak Banner" width="100%" />
</p>

# Duolingo Autostreak

A lightweight, zero-dependency Node.js script that automatically keeps your Duolingo streak alive using GitHub Actions.

---

## Quick Overview

| Step | Preview |
|---|---|
| **1. Retrieve Token**<br>Extract `jwt_token` using the browser console | <img width="540" alt="cookie script" src="https://github.com/user-attachments/assets/b2dcfc12-22df-4053-a83c-3f6ee0447f2f" /> |
| **2. Save Secret**<br>Add `DUOLINGO_JWT` to [GitHub Secrets](https://github.com/Sodiumchloridy/duolingo-autostreak/settings/secrets/actions/new) | <img width="540" alt="env-secret setting" src="https://github.com/user-attachments/assets/022fa2c4-1b44-4e72-9fdb-6256367ac0cf" /> |
| **3. Go on fire**<br>Automated daily practice keeps your streak active (0 ➔ 1 🔥) | <img width="480" alt="streak success" src="https://github.com/user-attachments/assets/a58cb8ac-493d-4411-b40e-e900307a04d4" /> |

---

## Setup Guide

### 1. Get Your Duolingo JWT Token

1. Log into [duolingo.com](https://www.duolingo.com) in your browser.
2. Open Developer Tools (`F12` or right-click anywhere &rarr; **Inspect**) and switch to the **Console** tab.
3. Paste and run this one-liner to copy your token directly to your clipboard:

```javascript
((t) => t ? (copy(t), "✅ Copied to clipboard!") : "⚠️ jwt_token not found")(document.cookie.match(/jwt_token=([^;]+)/)?.[1]);
```

> [!TIP]
> If your browser console blocks pasting, type `allow pasting` and press **Enter** first.

---

### 2. Add to GitHub Secrets

1. Go directly to [New Repository Secret](https://github.com/Sodiumchloridy/duolingo-autostreak/settings/secrets/actions/new).
2. Set **Name** to:
   ```text
   DUOLINGO_JWT
   ```
3. Paste your token into **Secret** and click **Add secret**.

---

### 3. Verify & Run

1. Navigate to the [Actions tab](https://github.com/Sodiumchloridy/duolingo-autostreak/actions).
2. Select **Duolingo Autostreak** on the left sidebar.
3. Click **Run workflow** &rarr; **Run workflow** to test it immediately.

> [!NOTE]
> The workflow runs automatically every day at **04:00 UTC** with a randomized delay (0–5 minutes) to mimic natural activity. You can customize the schedule in [.github/workflows/autostreak.yml](.github/workflows/autostreak.yml).

---

## Configuration

Environment variables can be customized in [.github/workflows/autostreak.yml](.github/workflows/autostreak.yml) or locally via `.env`:

| Variable | Default | Description |
|---|:---:|---|
| `DUOLINGO_JWT` | *Required* | Your Duolingo authentication JWT. |
| `RANDOM_DELAY` | `300` | Max randomized wait time in seconds before running (0–5 mins in Actions, `0` locally). |
| `LESSONS` | `1` | Number of practice sessions completed per run. |

---

## Local Development

Requirements: Node.js 20+

```bash
# 1. Create a .env file with your token
echo DUOLINGO_JWT="your_jwt_token_here" > .env

# 2. Run the script
npm start
```
