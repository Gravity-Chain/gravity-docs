---
sidebar_position: 2
---

# Getting Started with Waves

To develop Waves, you would need the [**Gravity SDK**](../gravity-sdk/android-sdk.md) added in your projects. Gravity SDK works both ways to help develop the Waves as well as to access them easily in your projects.


## Functions in Waves

Waves has a set of fixed functions that can be accessed/triggered via transactions. You can check the GravityTokenInterface.kt file for complete information

### totalSupply()
Used to get the total current supply of the token. 
- Statically called via the API. 
- Value can be changed in the future.

### tokenName()
Used to get the name of the token set at the inital deployment.
- Statically called via the API. 
- Value cannot be changed in the future.

### tokenSymbol()
Used to get the symbol of the token set at the inital deployment.
- Statically called via the API. 
- Value cannot be changed in the future.

### balanceOf(tokenOwner)
Used to get the balance token of the address on this Wave.
- Statically called via the API. 

### transfer(from, to, tokens)
Used to transfer tokens on the Wave from one address to another.
- Triggered via the transaction event containing required data for this event

### mint(to, tokens)
Mint it used to increase the supply by *tokens* passed amount and transfer those tokens to the *to* address.
- Triggered via the transaction event containing required data for this event

### burn(from, tokens)
Mint it used to decrease the supply by *tokens* passed amount and transfer those tokens from the *from* address.
- Triggered via the transaction event containing required data for this event