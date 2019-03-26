// Tests that index.ts compiles without erros.

const fs = require("fs");
const asc = require("assemblyscript/cli/asc");

// Copy index.ts to a temporary subdirectory so that asc doesn't put all the
// index.ts exports in the global namespace.
fs.mkdirSync("test/temp_lib");
fs.copyFileSync("index.ts", "test/temp_lib/index.ts");

try {
    const env = {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({
        initial: 256
      }),
      table: new WebAssembly.Table({
        initial: 0,
        element: 'anyfunc'
      })
    }

    //let imports = 

  let output_path = "test/temp_out/test.wasm"
  if (asc.main(["test/test.ts", "--lib", "test", "--validate", "-b", output_path]) != 0) {
    throw Error("failed to compile")
  }
  let test_wasm = new Uint8Array(fs.readFileSync(output_path))
 
  WebAssembly.instantiate(test_wasm, {
    env
  }).then(module => {
    module.instance.exports.test();
  });

} catch(e) {
  process.exitCode = 1
  throw e
} finally {
  fs.unlinkSync("test/temp_lib/index.ts");
  fs.rmdirSync("test/temp_lib");
}
