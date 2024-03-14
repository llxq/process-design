export interface IdGenerator<T> {
    generate(): T
}

export default class SequenceIdGenerator implements IdGenerator<number> {

    private static BASE_TIMESTAMP = 0x176B986FC00
    private host = Math.random() * 0x40000000 & 0xEF80
    private sequence = 0

    generate (): number {
        const timestamp = BigInt(Date.now() - SequenceIdGenerator.BASE_TIMESTAMP) & BigInt(0x1FFFFFFFFF)
        const sequence = (this.sequence++ & 0x7F) + this.host

        return Number(timestamp << BigInt(16)) + sequence
    }
}

export const CreateUUID = () => new SequenceIdGenerator().generate()
