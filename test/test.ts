import { ByteArray } from 'temp_lib/index'

export function test(): void {
    let byte = new ByteArray(0)
    let base58: string = <string>byte.toBase58()
    assert(base58 == "1")
}