---
sidebar_position: 1
---

# Android SDK

:::info SDK Stats

**Open Source Github Repo:** https://github.com/Gravity-Chain/Gravity-Android-SDK

**SDK Size:** ~45kb

**Minimum OS Version:** API Level 21+
:::

## Android app demo
Check out the demo app before getting started: https://play.google.com/store/apps/details?id=chain.gravity.gravitysdkdemo

**Gravity SDK provides 3 main functionalities:**
1. Connecting user's wallet in your app
2. Interaction with Waves
3. Letting you develop Waves

### 1. Connecting to Gravity Wallet
To begin any interaction between any user and a Wave, the first step is to connect user's Gravity Wallet in your app. This connection gives the permission to execute/trigger on the chain.

### 2. Interactions with Waves
To interact with Waves, there are two types of functionalities, permissionless and permissioned:

#### Execution (without user permission)
1. Check balance of the user for GRT or on any contract.
2. Get the address and identies connected of the user.

#### Trigger (requires user's real-time consent)
1. Start a transaction. This includes both p2p transactions as well as contract execution methods:
    - Sending a TO or FROM transaction request
    - Sending a request within a transaction for a Wave to transfer/allow/mint/burn.

### 3. Building Waves
To build Waves, you can check out the documentation here: [**Getting Started With Waves**](../gravity-waves/getting-started-with-waves.md)


# Getting Started
Let's get started by implementing the Gravity SDK

### Basic Authentication

```kotlin
// initialise Gravity instance in your Application/MainActivity
Gravity.init(this)

// to keep a seamless interaction within your app and Gravity Wallet, you should add these intent-filters
<intent-filter>
    <data
        android:host="open"
        android:scheme="yourURIScheme" />
    <action android:name="android.intent.action.VIEW" />

    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
</intent-filter>

// trigger a connection request to the Gravity Wallet
connectWalletButton.setOnClickListener {
    Gravity.getInstance()
    ?.authenticate(GravityAuth("yourURIScheme://open"))
}

// once the request is sent, then listen for the response inside onResume
// (or any other lifecyle method as per your app)
override fun onResume() {
    super.onResume()
    val gravityResponse = Gravity.getInstance()?.fetchData()

    // the below parameters are only returned non-null when 
    // the user did approve the connection request in the wallet

    /**
    * @param authToken is a unique random token to ensure the apps 
    * that have received the consent of the user for authentication 
    * can only trigger further transactions. This is also stored 
    * in the users wallet locally.
    *
    * make sure to save this in your app as this will used in trigger-based methods
    */
    val authToken: String? = gravityResponse?.authToken

    /**
    * @param userAddress is the address of user's Gravity Wallet
    */
    val userAddress: String? = gravityResponse?.userAddress

    /**
    * @param userIdentity is the default identity of user's Gravity Wallet
    */
    val userIdentity: String? = gravityResponse?.userIdentity
}    
```

### Checking user balance
You can check any users balance on Gravity using the SDK.

```kotlin
// Gravity SDK API-level calls works best within a ViewModel
val balanceResponse = MutableLiveData<String?>()

fun balanceOf(owner: String) {
    viewModelScope.launch {
        Gravity.getInstance()
            ?.balanceOf(owner)?.onSuccess {
                balanceResponse.postValue("${it.response}")
            }?.onFailure {
                balanceResponse.postValue(null)
            }
    }
}
```

### Sending a transaction
Once you have authenticated by wallet connection with the user, you can now trigger transaction requests in your app

```kotlin
// trigger the transaction with the toAddress, amount and authToken you saved before
Gravity.getInstance()?.sendTransaction(
    GravityAuth("yourURIScheme://open"),
    GravityTransaction(toAddress, BigDecimal(amount), authToken)
)

// Once again in the same flow as authentication, listen for the response inside onResume
override fun onResume() {
    super.onResume()
    val gravityResponse = Gravity.getInstance()?.fetchData()

    /**
    * @param walletTransactionStatus is only received in the case
    * when a transaction was triggered
    */
    if (!gravityResponse.walletTransactionStatus.isNullOrEmpty()) {
        val didTransactionSucceed: Boolean = gravityResponse.walletTransactionStatus.toBoolean()
        
        // if the transaction request did succeed, then you'll get the transactionId for the same
        if(didTransactionSucceed == true) {
            val transactionId: String? = gravityResponse.walletTransactionId
        }
    } else {
        val authToken: String? = gravityResponse?.authToken
        val userAddress: String? = gravityResponse?.userAddress
        val userIdentity: String? = gravityResponse?.userIdentity
    }    
}


```







