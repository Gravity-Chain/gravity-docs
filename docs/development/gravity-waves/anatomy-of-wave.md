---
sidebar_position: 3
---

# Anatomy of Wave

## Quick example

This example of a Wave is built in Kotlin. Kotlin is promoted to be used in Gravity as it can be used on both frontend and backend systems to easily build and deploy smart contracts.

```kotlin
package chain.gravity.gravitysdkdemo


import xyz.gravitychain.gravitysdk.smartcontract.GravityEvents
import xyz.gravitychain.gravitysdk.smartcontract.GravityTokenInterface
import xyz.gravitychain.gravitysdk.smartcontract.annotations.TokenInfo
import java.math.BigDecimal

class DemoSmartContract(
    override val gravityEvents: GravityEvents,
    override var _totalSupply: BigDecimal,
    override val _balances: MutableMap<String, BigDecimal>,
    override val _allowed: MutableMap<String, MutableMap<String, BigDecimal>>,
    ) : GravityTokenInterface {
    override val tokenInfo = TokenInfo("Demo Token", "DEMO")

    override fun totalSupply(): BigDecimal {
        return _totalSupply
    }

    override fun tokenName(): String {
        return tokenInfo._tokenName
    }

    override fun tokenSymbol(): String {
        return tokenInfo._tokenSymbol
    }

    override fun balanceOf(tokenOwner: String): BigDecimal? {
        return _balances[tokenOwner]
    }

    override fun allowance(
        tokenOwner: String,
        spender: String
    ): BigDecimal? {
        return _allowed[tokenOwner]?.get(spender)
    }

    override fun transfer(
        from: String,
        to: String,
        tokens: BigDecimal
    ): Boolean {
        require(to != "0x00000000000000")
        require(_balances[from] != null)
        require(_balances[from]!! >= tokens)

        _balances[from]?.minus(tokens)
        if (_balances[to] != null) {
            _balances[to] = _balances[to]!!.plus(tokens)
        } else {
            _balances[to] = tokens
        }
        gravityEvents.transfer(from, to, tokens)
        return true
    }

    override fun approve(
        from: String,
        spender: String,
        tokens: BigDecimal
    ): Boolean {
        require(spender != "0x00000000000000")
        if (_allowed[from] != null) {
            _allowed[from]?.put(spender, tokens)
        } else {
            _allowed[from] = mutableMapOf(spender to tokens)
        }
        gravityEvents.approve(from, spender, tokens)
        return true
    }

    override fun mint(
        to: String,
        value: BigDecimal
    ) {
        require(to != "0x00000000000000")
        require(_balances[to] != null)
        _totalSupply += value
        if (_balances[to] != null) {
            _balances[to] = value
        } else {
            _balances[to]?.plus(value)
        }
        gravityEvents.transfer("0x00000000000000", to, value)
    }

    override fun burn(
        from: String,
        value: BigDecimal
    ) {
        require(from != "0x00000000000000")
        require(_balances[from] != null)
        _balances[from]?.minus(value)
        _totalSupply -= value
        gravityEvents.transfer(from, "0x00000000000000", value)
    }
}

fun main() {
}
```

## Understanding Wave

As per the above example, we can list the important parts required in any Wave:

### Package Name
This is must to have since this will help define your contract uniquely. Example: `package chain.gravity.gravitysdkdemo`

### Class Name
This is must to have since this will help define your contract uniquely. Example: `DemoSmartContract`

### Gravity Token Interface
You need to implement the **GravityTokenInterface** provided in the Gravity SDK for contracts to work as expected. This interface provided the building blocks for any Wave.

### TokenInfo
TokenInfo is used to create the basic initial data required by the contract such as TokenName, TokenSymbol. Example: `TokenInfo("Demo Token", "DEMO")`

