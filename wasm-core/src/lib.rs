use wasm_bindgen::prelude::*;

// call function from js
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    let msg = format!("Hello, {}! This is from WASM!", name);
    // Print to browser console
    web_sys::console::log_1(&msg.clone().into());
    msg
}

// Function for initialize
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in development browsers
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
    
    web_sys::console::log_1(&"WASM module initialized!".into());
    Ok(())
}
