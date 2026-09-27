# Duolingo Autostreak

A lightweight, zero-dependency Node.js script that automatically keeps your Duolingo streak alive using GitHub Actions.

## Features

- **Zero dependencies**: Uses Node.js native `fetch` and built-in `.env` loader.
- **YAGNI & Minimal**: No Docker, no external cron daemons, no unnecessary packages.
- **GitHub Actions ready**: Runs on a daily schedule with manual trigger (`workflow_dispatch`) support.
- **Anti-detection random delay**: Supports configurable random delay (`RANDOM_DELAY`) to avoid triggering streak actions at the exact same minute every day.

---

## Setup with GitHub Actions

### 1. Retrieve your Duolingo JWT Token

1. Log into [duolingo.com](https://www.duolingo.com) in your browser.
2. Open Developer Tools (`F12` or right-click -> **Inspect**) and go to the **Console** tab.
3. Paste and run the following command to copy the token directly to your clipboard:
   ```javascript
   copy(document.cookie.match(/jwt_token=([^;]+)/)?.[1]);
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
| `RANDOM_DELAY` | `0` (or `1800` in GH Actions) | Max random delay in seconds before starting (e.g. `1800` waits between 0 and 30 mins). |
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
