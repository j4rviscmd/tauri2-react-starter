/// Application information exposed to the frontend.
#[derive(serde::Serialize)]
struct AppInfo {
    /// Application name from Cargo.toml.
    name: &'static str,
    /// Application version from Cargo.toml.
    version: &'static str,
}

/// Tauri command to retrieve application information.
///
/// Returns the app name and version from compile-time environment variables.
#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        name: env!("CARGO_PKG_NAME"),
        version: env!("CARGO_PKG_VERSION"),
    }
}

/// Initializes and runs the Tauri application.
///
/// Configures plugins for:
/// - `tauri_plugin_opener`: Opening URLs in the default browser
/// - `tauri_plugin_store`: Persistent key-value storage
/// - `tauri_plugin_process`: Application relaunch capability
/// - `tauri_plugin_updater`: Automatic update checks (desktop only)
/// - `tauri_plugin_window_state`: Window position/size persistence (release only)
///
/// The window state plugin is excluded in debug builds to prevent
/// unwanted window restoration during development.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Build Tauri builder with plugins
    // Window state plugin is only enabled in release builds to prevent
    // window position restoration during development
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        });

    // Add window state plugin only in release builds
    #[cfg(not(debug_assertions))]
    let builder = builder.plugin(tauri_plugin_window_state::Builder::new().build());

    builder
        .invoke_handler(tauri::generate_handler![get_app_info])
        .run(tauri::generate_context!())
        .expect("an error occurred while running the Tauri application");
}
