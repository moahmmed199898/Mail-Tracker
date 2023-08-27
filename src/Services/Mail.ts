import Imap from "imap"

console.log(process.env.IMAP_USERNAME)

var imap = new Imap({
    user: process.env.IMAP_USERNAME as string,
    password: process.env.IMAP_PASSWORD as string,
    host: process.env.IMAP_HOST as string,
    port: process.env.IMAP_PORT as unknown as number,
    tls: true,
    tlsOptions: {
        host: "imap.gmail.com",
        rejectUnauthorized: false
    }
});


export async function isThereNewMail():Promise<boolean> {
    return new Promise(async (res)=>{
        await connectToIMAP()
        const newMail = await checkMail()
        res(newMail)
        imap.end()
    })
}

async function connectToIMAP(){
    return new Promise((res)=>{
        if(imap.state === "disconnected") {
            imap.connect()
            imap.on("ready", res)
        } else {
            res(null)
        }
    })
}


async function checkMail() {
    await openInbox()
    const results = await searchInbox()
    return results > 0
}


async function openInbox() {
    return new Promise((res, rej) => {
        imap.openBox('INBOX', true, () => {
            res(null)
        })
    })
}


async function searchInbox(): Promise<number> {
    return new Promise((res, rej) => {
        imap.search(['UNSEEN'], (err, results) => {
            if (err) throw rej(err)
            return res(results.length)
        });
    })
}