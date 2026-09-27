<p align="center">
  <img src="assets/banner.png" alt="Duolingo Autostreak Banner" width="100%" />
</p>

# Duolingo Autostreak

A lightweight, zero-dependency Node.js script that automatically keeps your Duolingo streak alive using GitHub Actions.

## Features

- **GitHub Actions ready**: Runs on a daily schedule with manual trigger (`workflow_dispatch`) support.
- **Anti-detection random delay**: Supports configurable random delay (`RANDOM_DELAY`) to avoid triggering streak actions at the exact same minute every day.

---

## Setup with GitHub Actions

| Step | Preview |
|---|---|
| **1. Retrieve JWT from Browser Console**<br>Run script on `duolingo.com` to extract and copy token | <img width="600" alt="cookie script" src="https://github.com/user-attachments/assets/b2dcfc12-22df-4053-a83c-3f6ee0447f2f" /> |
| **2. Add `DUOLINGO_JWT` to GitHub Secrets**<br>Save under [Repository Secrets](https://github.com/Sodiumchloridy/duolingo-autostreak/settings/secrets/actions/new) | <img width="600" alt="env-secret setting" src="https://github.com/user-attachments/assets/022fa2c4-1b44-4e72-9fdb-6256367ac0cf" /> |
| **3. Streak Maintained (0 ➔ 1 🔥)**<br>Automated daily streak check-in succeeds | <img width="500" alt="streak success" src="https://github.com/user-attachments/assets/a58cb8ac-493d-4411-b40e-e900307a04d4" /> |

### 1. Retrieve your Duolingo JWT Token

1. Log into [duolingo.com](https://www.duolingo.com) in your browser.
2. Open Developer Tools (`F12` or right-click -> **Inspect**) and switch to the **Console** tab.
3. Paste and run the following command to copy the token directly to your clipboard:
   ```javascript
   ((t) => t ? (copy(t), "✅ Copied to clipboard!") : "⚠️ jwt_token not found")(document.cookie.match(/jwt_token=([^;]+)/)?.[1]);
   ```
   *(If your browser console blocks pasting, type `allow pasting` and press Enter first).*

   *Alternatively, you can manually locate and copy the `jwt_token` cookie under **Application** (Chrome/Edge) or **Storage** (Firefox) -> **Cookies** -> `https://www.duolingo.com`.*

### 2. Configure GitHub Secret

1. Go directly to [New Repository Secret](https://github.com/Sodiumchloridy/duolingo-autostreak/settings/secrets/actions/new).
2. Set **Name** to `DUOLINGO_JWT`.
3. Paste your token into **Secret** and click **Add secret**.

### 3. Verify / Run

1. Go to the [Actions](https://github.com/Sodiumchloridy/duolingo-autostreak/actions) tab in your repository.
2. Select **Duolingo Autostreak** on the left.
3. Click **Run workflow** to test it immediately.

By default, the workflow runs daily at `04:00 UTC`. You can modify the cron schedule in [.github/workflows/autostreak.yml](.github/workflows/autostreak.yml).

---

## Configuration

You can configure these environment variables in [.github/workflows/autostreak.yml](.github/workflows/autostreak.yml) or in a local `.env` file:

| Variable | Default | Description |
|---|---|---|
| `DUOLINGO_JWT` | *Required* | Your Duolingo JWT authentication token. |
| `RANDOM_DELAY` | `0` (or `300` in GH Actions) | Max random delay in seconds before starting (e.g. `300` waits between 0 and 5 mins). |
| `LESSONS` | `1` | Number of practice sessions to complete per run. |

---

## Local Development

Requirements: Node.js 20+

1. Create a `.env` file:
   ```bash
   DUOLINGO_JWT="your_jwt_token_here"
   ```
2. Run the script:
   ```bash
   npm start
   ```
