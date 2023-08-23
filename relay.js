import { mplex } from "@libp2p/mplex"
import { createLibp2p } from "libp2p"
import { noise } from "@chainsafe/libp2p-noise"
import { circuitRelayServer } from 'libp2p/circuit-relay'
import { webSockets } from '@libp2p/websockets'
// import * as filters from '@libp2p/websockets/filters'
import { identifyService } from 'libp2p/identify'
const PORT = process.env.PORT || 51986
async function main() {
    const server = await createLibp2p({
        peerId: "12D3KooWHXjksacSFFVYTy1EnCDm24cvBz1vkJSn1bBuMRbu7TbU",
        addresses: {
            listen: [`/ip4/127.0.0.1/tcp/${PORT}/ws`]
        },
        transports: [
            webSockets(),
        ],
        connectionEncryption: [noise()],
        streamMuxers: [mplex()],
        services: {
            identify: identifyService(),
            relay: circuitRelayServer()
        }
    })
    console.log(`Node started with id ${node.peerId.toString()}`)
    console.log('Listening on:')
    node.getMultiaddrs().forEach((ma) => console.log(ma.toString()))
}

main();
