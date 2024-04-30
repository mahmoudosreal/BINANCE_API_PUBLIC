# Project Setup Guide

## Overview

This guide will walk you through setting up a Node.js project that interacts with the Binance API to fetch cryptocurrency prices and make trades.

## Requirements

- Node.js installed on your machine
- An account on Binance with API key and secret

## Setup Instructions

1. **Clone the repository and navigate to the project directory**:
    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Rename `env.example` to `.env`.
    - Replace `BINANCE_API_KEY` and `BINANCE_API_SECRET` in the `.env` file with your actual Binance API key and secret.

4. **Understanding the Code**:
    - `getTickerPrice(symbol)`: Fetches the latest price for a given cryptocurrency symbol.
    - `makeTrade(symbol, price, action, quantity, timeInForce)`: Submits an order to buy or sell a specified amount of a cryptocurrency at a given price.

5. **Running the project**:
    ```bash
    node index.js
    ```

   This will execute the functions defined in your JavaScript file, making a trade based on the current price of the cryptocurrency.

## Notes
- Ensure that the Binance API key and secret you use have permissions to execute trades.
- Handle API rate limits and implement error handling according to your project needs.
