// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// Application entry point.
///
/// This function is the first code executed when the application starts.
/// It delegates all initialization and setup to the library's `run()` function,
/// which configures Tauri plugins, registers commands, and starts the event loop.
///
/// # Platform-Specific Behavior
///
/// On Windows in release builds, the `windows_subsystem = "windows"` attribute
/// prevents an additional console window from appearing. This attribute is
/// controlled by the `cfg_attr` macro and is only active in non-debug builds.
///
/// # Examples
///
/// The entry point is automatically called by the system:
///
/// ```rust,no_run
/// fn main() {
///     tauri2_react_starter_lib::run()
/// }
/// ```
fn main() {
    tauri2_react_starter_lib::run()
}
