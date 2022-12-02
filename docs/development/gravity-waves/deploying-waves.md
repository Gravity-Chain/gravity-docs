---
sidebar_position: 4
---

# Deploying Waves

Deploying waves is very simple and most work is done using the [**gravitywallet.jar**](https://gravity-web-assets.s3.amazonaws.com/gravitywallet.jar) file. You can download from the link here and run the 2 following commands

1. Connect your mobile wallet in your terminal
```
java -jar gravitywallet.jar --login='your 12 words seed phrase'
```

2. Deploy your contract file in a transaction
```
java -jar gravitywallet.jar --deploy='absolutePathOfTheFile/DemoSmartContract.kt'
```

3. Once everything checks out, you'll be asked to enter the total supply for the token
```
Enter TotalSupply (max 10000000000000000): YOUR_INPUT
```

Once the deploy command is executed, you'll get the status and Wave address that you can use to access it:
```
{
    "status": "true",
    "transactionId": "0x14b76..."
}
```