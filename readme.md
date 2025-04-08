#  Hugging Face Management Assistant for Rocket.Chat

This Rocket.Chat app integrates with the Hugging Face Hub to allow users to manage models, get model insights, and perform AI-based tasks directly from the chat using slash commands.

## Setup
  ### Pre-requisites 
  - ```bash
    npm install -g @rocket.chat/apps-cli
  ### Setup
  - ```bash
     git clone https://github.com/HarshMethwani/HfRocketChat.git
  - ```bash
      npm install
   - ```bash
     rc-apps deploy --url "http://localhost:3000" --username admin --password adminpass
  

##  Features

-  **Login / Logout** with Hugging Face API Token
-  **List models** (public and private)
-  **Model summary generation** using Hugging Face Inference API
-  Works via simple and intuitive **slash commands**

##  Slash Commands

### `/hf login <token>`
Saves your Hugging Face API token securely.

### `/hf logout`
Removes the saved token.

### `/hf list [--private]`
Lists public models by default or your private models with `--private`.

### `/hf cardchat <model>`
Uses the Hugging Face Inference API to generate a plain English explanation of what a model does.

## Example:
```bash
/hf login <token>
/hf info <model>
/hf list
/hf list --private
/hf cardchat <model>
