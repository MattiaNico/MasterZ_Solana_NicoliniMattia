import { Keypair, Connection, PublicKey, } from "@solana/web3.js";

import { mintTo, getOrCreateAssociatedTokenAccount, } from "@solana/spl-token";

import wallet from "./test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("5SMqHKJBovV6rzoqDV5N9kMA9THrC5j26wGppJ3xW2aT");

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey, );

    const ata = tokenAccount.address;
    console.log("associazione token all'account: ", ata.toBase58());

    const amount = 10e6;

    await mintTo(connection, keypair, mint, ata, keypair.publicKey, amount );

    console.log("minted", amount, "to", ata.toBase58());

})()