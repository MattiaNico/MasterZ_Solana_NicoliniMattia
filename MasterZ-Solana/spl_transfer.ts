
import { Keypair, Connection, PublicKey, } from "@solana/web3.js";

import { getOrCreateAssociatedTokenAccount, transfer, } from "@solana/spl-token";

import wallet from "./test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("5SMqHKJBovV6rzoqDV5N9kMA9THrC5j26wGppJ3xW2aT");
const fromAta = new PublicKey("H19CgXZf5xj9kK8baxMUWQECXs2Tvk75QxWxxi6i5hK3");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("associated token account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("amount in ata: ", amountToAta.toString());

    const amount = 10e5;

    await transfer(connection, keypair, fromAta, toAta, keypair, amount);

    console.log("trasferiti", amount, "da", fromAta.toBase58(), "a", toAta.toBase58());
})()
