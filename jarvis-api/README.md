# Jarvis — Core

> The brain of Jarvis. This is where everything is understood, remembered, and acted upon.

---

## What This Service Is

The Core is the central intelligence of the Jarvis system. It runs as a server — either on your local machine or in the cloud — and is responsible for everything that happens after you finish speaking.

While the Desktop App handles the human side of the interaction (your voice, your screen, your local machine), the Core handles the thinking side: understanding what you said, deciding what to do, coordinating with external tools, and remembering what has happened over time.

Every channel that connects to Jarvis — the Desktop App, a Discord bot, a Telegram integration — speaks to this service. The Core does not know or care which surface you are using. It treats every conversation the same way, regardless of where it comes from.

---

## What It Does

### Understands what you mean

When a transcription of your words arrives, the Core reads it and determines intent. It does not just process the literal words — it considers the context of the ongoing conversation, your history, and what has been said in the session so far. From that, it decides what kind of response or action is appropriate.

### Orchestrates agents

The Core does not handle everything itself. For specific types of work — creating a Jira ticket, reviewing a pull request, answering a question about your codebase — it delegates to a specialized agent. Each agent is focused on a single domain and knows how to do its job well. The Core is the coordinator that routes the right work to the right agent.

### Takes action in the world

When an agent decides to do something — create a ticket, open a pull request, send a message — the Core is responsible for making that happen. It connects to external services like Jira, GitHub, and Google Chat on your behalf and carries out the action. Every action taken is recorded so you always have a full history of what Jarvis did and why.

### Remembers everything

The Core maintains two kinds of memory. The first is the conversation — everything said in the current session, kept in order, so the next response always has full context. The second is long-term memory — a growing knowledge base built from everything Jarvis has heard and done over time. When something from weeks ago becomes relevant, Jarvis can surface it without being asked.

### Manages sessions and connections

Every conversation in Jarvis is a session. The Core is responsible for creating sessions, keeping them alive, and understanding which channels are currently participating in each one. When you speak through the Desktop App and also receive a reply in Discord, the Core is what ensures both are part of the same conversation.

### Processes your voice

When audio arrives from the Desktop App or another voice-capable channel, the Core converts it into text so it can be understood and acted upon. This processing happens here rather than on the client, so that any channel — regardless of the device it runs on — can benefit from the same capability.

---

## What It Is Not

The Core does not have a user interface. You never open it or look at it directly. It runs silently in the background, doing its work in response to what comes in and sending results back out.

It is not tied to any specific AI provider or external service. The models it uses for understanding, the services it connects to, and the way it stores memory are all designed to be swappable. The Core is built around the work to be done, not around the tools currently used to do it.

---

## How It Fits Into the Bigger Picture

The Core is the piece that makes Jarvis coherent. Without it, each channel — the Desktop App, the Discord bot, the Telegram integration — would be isolated, with no shared memory, no unified understanding, and no ability to coordinate across tools.

With the Core, all of those surfaces become windows into the same intelligent system. A conversation started by voice in the Desktop App can be continued by text in Telegram. A task created in a meeting can be tracked and completed without you having to follow up manually. The memory built from a week of work sessions is available the next time you need it.

The Core is what turns a collection of separate tools into a single, coherent assistant.