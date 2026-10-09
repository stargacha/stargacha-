<div align="center">

# 星穹召唤 · Astral Summon

**一款 DeepSeek Harness（dsh）插件：二次元抽卡 + 和你抽到的角色聊天**
**A DeepSeek Harness (dsh) plugin: anime gacha cards you can actually talk to**

![version](https://img.shields.io/badge/version-1.2.0-7c5cff)
![dsh](https://img.shields.io/badge/dsh-Web%20profile-1f6feb)
![node](https://img.shields.io/badge/node-%3E%3D20-339933)
![license](https://img.shields.io/badge/license-PolyForm%20Noncommercial-orange)

[中文](#中文) · [English](#english)

![screenshot](docs/screenshot.jpg)

</div>

---

## 中文

### 这是什么
跑在 dsh Web 版里的抽卡小游戏。100 位角色，每位都有自己的人设和说话习惯，抽到谁就能和谁聊天。

- 🎴 **抽卡**：单抽 / 十连，SSR 带全屏立绘演出。
- 💬 **聊天**：单聊，或拉 2～4 位角色的群聊；「消息」页里随时接着聊。
- 🎁 **星辉石**：开局 16000（100 抽），每聊完一轮再送 160（1 抽）。
- 🔒 **不碰密钥**：用你在 dsh 里配好的模型，插件不读取、不保存任何 API key。

### 概率

| 稀有度 | 卡数 | 概率 |
| --- | --- | --- |
| SSR | 14 | 1% |
| SR | 30 | 10% |
| R | 56 | 89% |

同稀有度内每张卡概率均等。连续 99 抽没出 SSR，第 100 抽必出；没有 SR 保底。

### 安装
需要 **Node.js 20+** 和 dsh Web 版。

```bash
git clone https://github.com/stargacha/stargacha-.git dsh-astral-summon
npx @deepseek-ai/dsh plugin --profile web add ./dsh-astral-summon
npx @deepseek-ai/dsh web
```

打开 dsh，点左侧边栏的「星穹召唤」。聊天用你在 dsh 设置里选的模型，插件本身不用配置。

### 隐私
- 存档和聊天记录只存在你浏览器的 localStorage 里。
- 唯一的联网动作是经 dsh 把人设和聊天记录发给你选的模型，不连其他服务器。
- 接口默认只响应本机；确实要开放到局域网，设 `ASTRAL_SUMMON_ALLOW_REMOTE=1`。
- 源码全部明文，未混淆、未压缩。

### 自己写角色
1. 照 `personas/SCHEMA.md` 写 `personas/astral-XX.json`。
2. 卡面放进 `game/girl_XX.jpg`，在 `game/index.html` 的 `CARDS` 里加一条，`rarity` 填 `"SSR"`、`"SR"` 或 `"R"`（和人设文件一致）。
3. 想要 SSR 全屏演出，再放 `game/ssr_XX.jpg` 和同尺寸剪影 `game/ssr_XX_sil.png`，并把卡号加进 `SPLASH`。
4. 重新 `plugin add`，重启 dsh。

### 已知限制
- 只支持 dsh **Web 版**；存档在本地，不防作弊；dsh 升级后插件可能要跟着调整。

### 许可
[PolyForm Noncommercial 1.0.0](LICENSE)：可自由学习、修改和非商业使用，**禁止商用**。部分角色形象另有授权，复用图片前请看 [CREDITS.md](CREDITS.md)。本项目与 DeepSeek 官方无关。

---

## English

### What is it
A gacha mini-game inside the dsh Web UI. 100 characters, each with her own persona and voice. Pull a card, then chat with her.

- 🎴 **Pulls**: single / 10-pull, full-screen splash for SSRs.
- 💬 **Chat**: one-on-one or group chats with 2–4 of your cards; pick up any chat from the Messages tab.
- 🎁 **Star Stones**: 16,000 to start (100 pulls), plus 160 (1 pull) for each finished chat round.
- 🔒 **No keys touched**: chat uses the model set up in dsh; the plugin never reads or stores API keys.

### Rates

| Rarity | Cards | Rate |
| --- | --- | --- |
| SSR | 14 | 1% |
| SR | 30 | 10% |
| R | 56 | 89% |

Cards within a rarity share its rate evenly. 99 pulls without an SSR guarantees one on the 100th; no SR pity.

### Install
Requires **Node.js 20+** and the dsh Web profile.

```bash
git clone https://github.com/stargacha/stargacha-.git dsh-astral-summon
npx @deepseek-ai/dsh plugin --profile web add ./dsh-astral-summon
npx @deepseek-ai/dsh web
```

Open dsh and click **星穹召唤** in the sidebar. Chat uses the model selected in dsh; the plugin needs no setup.

### Privacy
- Saves and chat history stay in your browser's localStorage.
- The only network call sends persona + chat history to your chosen model through dsh.
- Endpoints answer localhost only; set `ASTRAL_SUMMON_ALLOW_REMOTE=1` to expose them on a LAN.
- All source is plain and unminified.

### Writing your own character
See `personas/SCHEMA.md`, add `game/girl_XX.jpg` and a `CARDS` entry in `game/index.html` (with `rarity`), optionally `ssr_XX.jpg` + `ssr_XX_sil.png` and a `SPLASH` id for SSRs, then re-run `plugin add`.

### License
[PolyForm Noncommercial 1.0.0](LICENSE): free for noncommercial use and modification, **no commercial use**. Some character designs carry their own terms; see [CREDITS.md](CREDITS.md). Not affiliated with DeepSeek.
