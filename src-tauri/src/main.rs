// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// Application entry point.
///
/// Delegates to the library's `run()` function which initializes
/// and runs the Tauri application with all configured plugins.
fn main() {
    tauri2_react_starter_lib::run()
}
